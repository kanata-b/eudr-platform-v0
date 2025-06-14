"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import type { Supplier } from "@/types"

interface SupplierTableProps {
  suppliers: Supplier[]
  onEdit: (supplier: Supplier) => void
  onDelete: (id: string) => void
}

export function SupplierTable({ suppliers, onEdit, onDelete }: SupplierTableProps) {
  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "premium":
        return "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100"
      case "primary":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
      case "secondary":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
      default:
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Contact Person</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Verification</TableHead>
          <TableHead>Certification</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suppliers.map((supplier) => (
          <TableRow key={supplier.id}>
            <TableCell className="font-medium">{supplier.name}</TableCell>
            <TableCell>{supplier.contact_person}</TableCell>
            <TableCell>{supplier.email}</TableCell>
            <TableCell>{supplier.country}</TableCell>
            <TableCell>
              <Badge className={getTypeBadge(supplier.supplier_type)} variant="secondary">
                {supplier.supplier_type}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={getVerificationBadge(supplier.verification_status)}>
                {supplier.verification_status}
              </Badge>
            </TableCell>
            <TableCell>
              {supplier.certification ? (
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                  {supplier.certification}
                </Badge>
              ) : (
                <span className="text-gray-400">None</span>
              )}
            </TableCell>
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
        ))}
      </TableBody>
    </Table>
  )
}
