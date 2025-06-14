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
  getComplianceBadge: (compliance: string) => { className: string; text: string }
}

export function RiskAssessmentTable({
  assessments,
  onEdit,
  onDelete,
  getRiskBadgeColor,
  getStatusBadge,
  getComplianceBadge,
}: RiskAssessmentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Assessment Name</TableHead>
          <TableHead>Assessor</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Risk Score</TableHead>
          <TableHead>Deforestation Risk</TableHead>
          <TableHead>Legal Compliance</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assessments.map((assessment) => {
          const statusBadge = getStatusBadge(assessment.status)
          const complianceBadge = getComplianceBadge(assessment.legal_compliance)
          return (
            <TableRow key={assessment.id}>
              <TableCell className="font-medium">{assessment.assessment_name}</TableCell>
              <TableCell>{assessment.assessor_name}</TableCell>
              <TableCell>{assessment.assessment_date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{assessment.overall_risk_score}</span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getRiskBadgeColor(assessment.deforestation_risk)}>
                  {assessment.deforestation_risk}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={complianceBadge.className}>{complianceBadge.text}</Badge>
              </TableCell>
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
