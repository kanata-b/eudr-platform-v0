"use client"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import { riskAssessmentSchema, type RiskAssessmentFormData } from "@/lib/validations/forms"

interface RiskAssessmentFormProps {
  initialData?: Partial<RiskAssessmentFormData>
  onSubmit: (data: RiskAssessmentFormData) => Promise<void>
  onClose: () => void
  isEditing?: boolean
  isLoading?: boolean
}

export function RiskAssessmentForm({
  initialData,
  onSubmit,
  onClose,
  isEditing = false,
  isLoading = false,
}: RiskAssessmentFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RiskAssessmentFormData>({
    resolver: zodResolver(riskAssessmentSchema),
    defaultValues: {
      assessment_name: initialData?.assessment_name || "",
      assessment_date: initialData?.assessment_date || "",
      risk_category: initialData?.risk_category || "deforestation",
      risk_level: initialData?.risk_level || "low",
      overall_risk_score: initialData?.overall_risk_score || 1,
      assessor_name: initialData?.assessor_name || "",
      findings: initialData?.findings || "",
      mitigation_measures: initialData?.mitigation_measures || "",
      status: initialData?.status || "pending",
      follow_up_date: initialData?.follow_up_date || "",
    },
  })

  const handleFormSubmit = async (data: RiskAssessmentFormData) => {
    try {
      await onSubmit(data)
      onClose()
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="assessment_name" className="text-right">
            Assessment Name
          </Label>
          <div className="col-span-3">
            <Input
              id="assessment_name"
              {...register("assessment_name")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter assessment name"
            />
            {errors.assessment_name && <p className="text-sm text-red-500 mt-1">{errors.assessment_name.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="assessment_date" className="text-right">
            Assessment Date
          </Label>
          <div className="col-span-3">
            <Input
              id="assessment_date"
              type="date"
              {...register("assessment_date")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
            />
            {errors.assessment_date && <p className="text-sm text-red-500 mt-1">{errors.assessment_date.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="risk_category" className="text-right">
            Risk Category
          </Label>
          <div className="col-span-3">
            <Controller
              name="risk_category"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Select risk category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deforestation">Deforestation</SelectItem>
                    <SelectItem value="human_rights">Human Rights</SelectItem>
                    <SelectItem value="environmental">Environmental</SelectItem>
                    <SelectItem value="supply_chain">Supply Chain</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.risk_category && <p className="text-sm text-red-500 mt-1">{errors.risk_category.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="risk_level" className="text-right">
            Risk Level
          </Label>
          <div className="col-span-3">
            <Controller
              name="risk_level"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.risk_level && <p className="text-sm text-red-500 mt-1">{errors.risk_level.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="overall_risk_score" className="text-right">
            Risk Score (1-100)
          </Label>
          <div className="col-span-3">
            <Input
              id="overall_risk_score"
              type="number"
              min="1"
              max="100"
              {...register("overall_risk_score", { valueAsNumber: true })}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter risk score"
            />
            {errors.overall_risk_score && (
              <p className="text-sm text-red-500 mt-1">{errors.overall_risk_score.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="assessor_name" className="text-right">
            Assessor Name
          </Label>
          <div className="col-span-3">
            <Input
              id="assessor_name"
              {...register("assessor_name")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter assessor name"
            />
            {errors.assessor_name && <p className="text-sm text-red-500 mt-1">{errors.assessor_name.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="findings" className="text-right">
            Findings
          </Label>
          <div className="col-span-3">
            <Textarea
              id="findings"
              {...register("findings")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Assessment findings and observations..."
              rows={3}
            />
            {errors.findings && <p className="text-sm text-red-500 mt-1">{errors.findings.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="mitigation_measures" className="text-right">
            Mitigation Measures
          </Label>
          <div className="col-span-3">
            <Textarea
              id="mitigation_measures"
              {...register("mitigation_measures")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Recommended mitigation measures..."
              rows={3}
            />
            {errors.mitigation_measures && (
              <p className="text-sm text-red-500 mt-1">{errors.mitigation_measures.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <div className="col-span-3">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="requires_action">Requires Action</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="follow_up_date" className="text-right">
            Follow-up Date
          </Label>
          <div className="col-span-3">
            <Input
              id="follow_up_date"
              type="date"
              {...register("follow_up_date")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
            />
            {errors.follow_up_date && <p className="text-sm text-red-500 mt-1">{errors.follow_up_date.message}</p>}
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting || isLoading}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : isEditing ? (
            "Update Assessment"
          ) : (
            "Create Assessment"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}
