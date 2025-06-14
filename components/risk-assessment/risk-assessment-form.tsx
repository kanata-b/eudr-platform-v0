"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogFooter } from "@/components/ui/dialog"
import type { CreateRiskAssessmentData } from "@/types"

interface RiskAssessmentFormProps {
  formData: CreateRiskAssessmentData
  setFormData: (data: CreateRiskAssessmentData) => void
  onSubmit: (e: React.FormEvent) => void
  isEditing: boolean
}

export function RiskAssessmentForm({ formData, setFormData, onSubmit, isEditing }: RiskAssessmentFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="assessment_name" className="text-right">
            Assessment Name
          </Label>
          <Input
            id="assessment_name"
            value={formData.assessment_name}
            onChange={(e) => setFormData({ ...formData, assessment_name: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="assessor_name" className="text-right">
            Assessor Name
          </Label>
          <Input
            id="assessor_name"
            value={formData.assessor_name}
            onChange={(e) => setFormData({ ...formData, assessor_name: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="assessment_date" className="text-right">
            Assessment Date
          </Label>
          <Input
            id="assessment_date"
            type="date"
            value={formData.assessment_date}
            onChange={(e) => setFormData({ ...formData, assessment_date: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product_id" className="text-right">
            Product ID
          </Label>
          <Input
            id="product_id"
            value={formData.product_id}
            onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
            className="col-span-3"
            placeholder="Product identifier"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="supplier_id" className="text-right">
            Supplier ID
          </Label>
          <Input
            id="supplier_id"
            value={formData.supplier_id}
            onChange={(e) => setFormData({ ...formData, supplier_id: e.target.value })}
            className="col-span-3"
            placeholder="Supplier identifier"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="origin_id" className="text-right">
            Origin ID
          </Label>
          <Input
            id="origin_id"
            value={formData.origin_id}
            onChange={(e) => setFormData({ ...formData, origin_id: e.target.value })}
            className="col-span-3"
            placeholder="Origin identifier"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="overall_risk_score" className="text-right">
            Risk Score (0-100)
          </Label>
          <Input
            id="overall_risk_score"
            type="number"
            min="0"
            max="100"
            value={formData.overall_risk_score}
            onChange={(e) => setFormData({ ...formData, overall_risk_score: Number.parseFloat(e.target.value) })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="deforestation_risk" className="text-right">
            Deforestation Risk
          </Label>
          <Select
            value={formData.deforestation_risk}
            onValueChange={(value: "low" | "medium" | "high") =>
              setFormData({ ...formData, deforestation_risk: value })
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="legal_compliance" className="text-right">
            Legal Compliance
          </Label>
          <Select
            value={formData.legal_compliance}
            onValueChange={(value: "compliant" | "non_compliant" | "under_review") =>
              setFormData({ ...formData, legal_compliance: value })
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compliant">Compliant</SelectItem>
              <SelectItem value="non_compliant">Non-Compliant</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="environmental_impact" className="text-right">
            Environmental Impact (0-10)
          </Label>
          <Input
            id="environmental_impact"
            type="number"
            min="0"
            max="10"
            value={formData.environmental_impact}
            onChange={(e) => setFormData({ ...formData, environmental_impact: Number.parseFloat(e.target.value) })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="social_impact" className="text-right">
            Social Impact (0-10)
          </Label>
          <Input
            id="social_impact"
            type="number"
            min="0"
            max="10"
            value={formData.social_impact}
            onChange={(e) => setFormData({ ...formData, social_impact: Number.parseFloat(e.target.value) })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <Select
            value={formData.status}
            onValueChange={(value: "draft" | "completed" | "approved" | "rejected") =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="next_review_date" className="text-right">
            Next Review Date
          </Label>
          <Input
            id="next_review_date"
            type="date"
            value={formData.next_review_date}
            onChange={(e) => setFormData({ ...formData, next_review_date: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Follow-up Required</Label>
          <div className="col-span-3 flex items-center space-x-2">
            <Checkbox
              id="follow_up_required"
              checked={formData.follow_up_required}
              onCheckedChange={(checked) => setFormData({ ...formData, follow_up_required: !!checked })}
            />
            <Label htmlFor="follow_up_required">Follow-up action required</Label>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="mitigation_measures" className="text-right">
            Mitigation Measures
          </Label>
          <Textarea
            id="mitigation_measures"
            value={formData.mitigation_measures}
            onChange={(e) => setFormData({ ...formData, mitigation_measures: e.target.value })}
            className="col-span-3"
            placeholder="Describe mitigation measures..."
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
      </DialogFooter>
    </form>
  )
}
