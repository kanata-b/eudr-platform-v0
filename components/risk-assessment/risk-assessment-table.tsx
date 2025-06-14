"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import type { RiskAssessment } from "@/types"

interface RiskAssessmentTableProps {
  assessments: RiskAssessment[]
  onEdit: (assessment: RiskAssessment) => void
  onDelete: (id: string) => void
  getRiskBadgeColor: (risk: string) => string
  getStatusBadge: (status: string) => { className: string; text: string }
}

export function RiskAssessmentTable({
  assessments,
  onEdit,
  onDelete,
  getRiskBadgeColor,
  getStatusBadge,
}: RiskAssessmentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Assessment Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Risk Level</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Assessor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assessments.map((assessment) => {
          const statusBadge = getStatusBadge(assessment.status)
          return (
            <TableRow key={assessment.id}>
              <TableCell className="font-medium">{assessment.assessment_name}</TableCell>
              <TableCell>{assessment.assessment_date}</TableCell>
              <TableCell>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 capitalize">
                  {assessment.risk_category.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getRiskBadgeColor(assessment.risk_level)}>{assessment.risk_level}</Badge>
              </TableCell>
              <TableCell>
                <span className="font-medium">{assessment.overall_risk_score}/100</span>
              </TableCell>
              <TableCell>{assessment.assessor_name}</TableCell>
              <TableCell>
                <Badge className={statusBadge.className}>{statusBadge.text}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(assessment)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDelete(assessment.id)}>
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
