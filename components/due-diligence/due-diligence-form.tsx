"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogFooter } from "@/components/ui/dialog"
import type { CreateDueDiligenceStatementData } from "@/types"

interface DueDiligenceFormProps {
  formData: CreateDueDiligenceStatementData
  setFormData: (data: CreateDueDiligenceStatementData) => void
  onSubmit: (e: React.FormEvent) => void
  isEditing: boolean
}

export function DueDiligenceForm({ formData, setFormData, onSubmit, isEditing }: DueDiligenceFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="company_name" className="text-right">
            Company Name
          </Label>
          <Input
            id="company_name"
            value={formData.company_name}
            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="reporting_period_start" className="text-right">
            Period Start
          </Label>
          <Input
            id="reporting_period_start"
            type="date"
            value={formData.reporting_period_start}
            onChange={(e) => setFormData({ ...formData, reporting_period_start: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="reporting_period_end" className="text-right">
            Period End
          </Label>
          <Input
            id="reporting_period_end"
            type="date"
            value={formData.reporting_period_end}
            onChange={(e) => setFormData({ ...formData, reporting_period_end: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product_categories" className="text-right">
            Product Categories
          </Label>
          <Textarea
            id="product_categories"
            value={formData.product_categories}
            onChange={(e) => setFormData({ ...formData, product_categories: e.target.value })}
            className="col-span-3"
            placeholder="Wood, Palm Oil, Soy, etc."
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="total_volume" className="text-right">
            Total Volume
          </Label>
          <Input
            id="total_volume"
            type="number"
            min="0"
            value={formData.total_volume}
            onChange={(e) => setFormData({ ...formData, total_volume: Number.parseFloat(e.target.value) })}
            className="col-span-2"
            required
          />
          <Select
            value={formData.volume_unit}
            onValueChange={(value) => setFormData({ ...formData, volume_unit: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kilograms</SelectItem>
              <SelectItem value="tons">Tons</SelectItem>
              <SelectItem value="m3">Cubic Meters</SelectItem>
              <SelectItem value="liters">Liters</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="countries_of_origin" className="text-right">
            Countries of Origin
          </Label>
          <Textarea
            id="countries_of_origin"
            value={formData.countries_of_origin}
            onChange={(e) => setFormData({ ...formData, countries_of_origin: e.target.value })}
            className="col-span-3"
            placeholder="Brazil, Indonesia, etc."
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="monitoring_system" className="text-right">
            Monitoring System
          </Label>
          <Textarea
            id="monitoring_system"
            value={formData.monitoring_system}
            onChange={(e) => setFormData({ ...formData, monitoring_system: e.target.value })}
            className="col-span-3"
            placeholder="Describe monitoring and verification systems..."
            required
          />
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
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="signatory_name" className="text-right">
            Signatory Name
          </Label>
          <Input
            id="signatory_name"
            value={formData.signatory_name}
            onChange={(e) => setFormData({ ...formData, signatory_name: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="signatory_position" className="text-right">
            Signatory Position
          </Label>
          <Input
            id="signatory_position"
            value={formData.signatory_position}
            onChange={(e) => setFormData({ ...formData, signatory_position: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="signature_date" className="text-right">
            Signature Date
          </Label>
          <Input
            id="signature_date"
            type="date"
            value={formData.signature_date}
            onChange={(e) => setFormData({ ...formData, signature_date: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Risk Assessment</Label>
          <div className="col-span-3 flex items-center space-x-2">
            <Checkbox
              id="risk_assessment_completed"
              checked={formData.risk_assessment_completed}
              onCheckedChange={(checked) => setFormData({ ...formData, risk_assessment_completed: !!checked })}
            />
            <Label htmlFor="risk_assessment_completed">Risk assessment completed</Label>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Third Party Verification</Label>
          <div className="col-span-3 flex items-center space-x-2">
            <Checkbox
              id="third_party_verification"
              checked={formData.third_party_verification}
              onCheckedChange={(checked) => setFormData({ ...formData, third_party_verification: !!checked })}
            />
            <Label htmlFor="third_party_verification">Third party verification completed</Label>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="declaration_text" className="text-right">
            Declaration
          </Label>
          <Textarea
            id="declaration_text"
            value={formData.declaration_text}
            onChange={(e) => setFormData({ ...formData, declaration_text: e.target.value })}
            className="col-span-3"
            placeholder="Declaration statement..."
            required
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
      </DialogFooter>
    </form>
  )
}
