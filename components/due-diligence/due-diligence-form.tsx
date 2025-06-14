"use client"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogFooter } from "@/components/ui/dialog"
import { dueDiligenceSchema, type DueDiligenceFormData } from "@/lib/validations/forms"

interface DueDiligenceFormProps {
  initialData?: Partial<DueDiligenceFormData>
  onSubmit: (data: DueDiligenceFormData) => Promise<void>
  onClose: () => void
  isEditing?: boolean
  isLoading?: boolean
}

export function DueDiligenceForm({
  initialData,
  onSubmit,
  onClose,
  isEditing = false,
  isLoading = false,
}: DueDiligenceFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<DueDiligenceFormData>({
    resolver: zodResolver(dueDiligenceSchema),
    defaultValues: {
      reference_number: initialData?.reference_number || "",
      product_category: initialData?.product_category || "wood",
      supplier_name: initialData?.supplier_name || "",
      origin_country: initialData?.origin_country || "",
      risk_assessment: initialData?.risk_assessment || "low",
      compliance_status: initialData?.compliance_status || "pending",
      documentation_complete: initialData?.documentation_complete || false,
      verification_date: initialData?.verification_date || "",
      notes: initialData?.notes || "",
    },
  })

  const handleFormSubmit = async (data: DueDiligenceFormData) => {
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
          <Label htmlFor="reference_number" className="text-right">
            Reference Number
          </Label>
          <div className="col-span-3">
            <Input
              id="reference_number"
              {...register("reference_number")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter reference number"
            />
            {errors.reference_number && <p className="text-sm text-red-500 mt-1">{errors.reference_number.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product_category" className="text-right">
            Product Category
          </Label>
          <div className="col-span-3">
            <Controller
              name="product_category"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wood">Wood Products</SelectItem>
                    <SelectItem value="palm_oil">Palm Oil</SelectItem>
                    <SelectItem value="soy">Soy Products</SelectItem>
                    <SelectItem value="coffee">Coffee</SelectItem>
                    <SelectItem value="cocoa">Cocoa</SelectItem>
                    <SelectItem value="rubber">Rubber</SelectItem>
                    <SelectItem value="cattle">Cattle Products</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.product_category && <p className="text-sm text-red-500 mt-1">{errors.product_category.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="supplier_name" className="text-right">
            Supplier Name
          </Label>
          <div className="col-span-3">
            <Input
              id="supplier_name"
              {...register("supplier_name")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter supplier name"
            />
            {errors.supplier_name && <p className="text-sm text-red-500 mt-1">{errors.supplier_name.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="origin_country" className="text-right">
            Origin Country
          </Label>
          <div className="col-span-3">
            <Input
              id="origin_country"
              {...register("origin_country")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter origin country"
            />
            {errors.origin_country && <p className="text-sm text-red-500 mt-1">{errors.origin_country.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="risk_assessment" className="text-right">
            Risk Assessment
          </Label>
          <div className="col-span-3">
            <Controller
              name="risk_assessment"
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
            {errors.risk_assessment && <p className="text-sm text-red-500 mt-1">{errors.risk_assessment.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="compliance_status" className="text-right">
            Compliance Status
          </Label>
          <div className="col-span-3">
            <Controller
              name="compliance_status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compliant">Compliant</SelectItem>
                    <SelectItem value="non_compliant">Non-Compliant</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.compliance_status && (
              <p className="text-sm text-red-500 mt-1">{errors.compliance_status.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="verification_date" className="text-right">
            Verification Date
          </Label>
          <div className="col-span-3">
            <Input
              id="verification_date"
              type="date"
              {...register("verification_date")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
            />
            {errors.verification_date && (
              <p className="text-sm text-red-500 mt-1">{errors.verification_date.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Documentation Complete</Label>
          <div className="col-span-3 flex items-center space-x-2">
            <Controller
              name="documentation_complete"
              control={control}
              render={({ field }) => (
                <Checkbox id="documentation_complete" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <Label htmlFor="documentation_complete">All documentation is complete</Label>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="notes" className="text-right">
            Notes
          </Label>
          <div className="col-span-3">
            <Textarea
              id="notes"
              {...register("notes")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Additional notes..."
              rows={3}
            />
            {errors.notes && <p className="text-sm text-red-500 mt-1">{errors.notes.message}</p>}
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
            "Update Due Diligence"
          ) : (
            "Create Due Diligence"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}
