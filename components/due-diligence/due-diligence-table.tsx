"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Send, Check, X } from "lucide-react"
import type { DueDiligenceStatement } from "@/types"

interface DueDiligenceTableProps {
  statements: DueDiligenceStatement[]
  onEdit: (statement: DueDiligenceStatement) => void
  onDelete: (id: string) => void
  onSubmit: (id: string) => void
  getStatusBadge: (status: string) => { className: string; icon: string; text: string }
}

export function DueDiligenceTable({ statements, onEdit, onDelete, onSubmit, getStatusBadge }: DueDiligenceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Statement Number</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Period</TableHead>
          <TableHead>Volume</TableHead>
          <TableHead>Risk Assessment</TableHead>
          <TableHead>Third Party</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {statements.map((statement) => {
          const statusBadge = getStatusBadge(statement.status)
          return (
            <TableRow key={statement.id}>
              <TableCell className="font-medium">{statement.statement_number}</TableCell>
              <TableCell>{statement.company_name}</TableCell>
              <TableCell>
                {statement.reporting_period_start} to {statement.reporting_period_end}
              </TableCell>
              <TableCell>
                {statement.total_volume} {statement.volume_unit}
              </TableCell>
              <TableCell>
                {statement.risk_assessment_completed ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </TableCell>
              <TableCell>
                {statement.third_party_verification ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </TableCell>
              <TableCell>
                <Badge className={statusBadge.className}>{statusBadge.text}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(statement)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  {statement.status === "draft" && (
                    <Button variant="outline" size="sm" onClick={() => onSubmit(statement.id)}>
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => onDelete(statement.id)}>
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
