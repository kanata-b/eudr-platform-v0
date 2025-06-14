"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, CheckCircle, Clock, XCircle } from "lucide-react"
import type { Supplier } from "@/types"

interface SupplierTableProps {
  suppliers: Supplier[]
  onEdit: (supplier: Supplier) => void
  onDelete: (id: string) => void
  getVerificationBadge: (status: string) => { className: string; icon: string; text: string }
  getRiskBadgeColor: (risk: string) => string
}

export function SupplierTable({
  suppliers,
  onEdit,
  onDelete,
  getVerificationBadge,
  getRiskBadgeColor,
}: SupplierTableProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Registration</TableHead>
          <TableHead>Business Type</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Verification</TableHead>
          <TableHead>Risk Level</TableHead>
          <TableHead>Last Audit</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suppliers.map((supplier) => {
          const verificationBadge = getVerificationBadge(supplier.verification_status)
          return (
            <TableRow key={supplier.id}>
              <TableCell className="font-medium">{supplier.name}</TableCell>
              <TableCell>{supplier.company_registration}</TableCell>
              <TableCell className="capitalize">{supplier.business_type}</TableCell>
              <TableCell>{supplier.country}</TableCell>
              <TableCell>
                <Badge className={verificationBadge.className}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(supplier.verification_status)}
                    {verificationBadge.text}
                  </div>
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getRiskBadgeColor(supplier.risk_level)}>{supplier.risk_level}</Badge>
              </TableCell>
              <TableCell>{supplier.last_audit_date || "N/A"}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(supplier)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDelete(supplier.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
