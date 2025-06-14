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
import { rawMaterialSchema, type RawMaterialFormData } from "@/lib/validations/forms"

interface RawMaterialFormProps {
  initialData?: Partial<RawMaterialFormData>
  onSubmit: (data: RawMaterialFormData) => Promise<void>
  onClose: () => void
  isEditing?: boolean
  isLoading?: boolean
}

export function RawMaterialForm({
  initialData,
  onSubmit,
  onClose,
  isEditing = false,
  isLoading = false,
}: RawMaterialFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RawMaterialFormData>({
    resolver: zodResolver(rawMaterialSchema),
    defaultValues: {
      name: initialData?.name || "",
      type: initialData?.type || "wood",
      description: initialData?.description || "",
      quantity: initialData?.quantity || 0,
      unit: initialData?.unit || "kg",
      origin_country: initialData?.origin_country || "",
      harvest_date: initialData?.harvest_date || "",
      risk_level: initialData?.risk_level || "low",
      sustainability_certificate: initialData?.sustainability_certificate || false,
    },
  })

  const handleFormSubmit = async (data: RawMaterialFormData) => {
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
          <Label htmlFor="name" className="text-right">
            Material Name
          </Label>
          <div className="col-span-3">
            <Input
              id="name"
              {...register("name")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter material name"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Type
          </Label>
          <div className="col-span-3">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Select material type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wood">Wood</SelectItem>
                    <SelectItem value="palm_oil">Palm Oil</SelectItem>
                    <SelectItem value="soy">Soy</SelectItem>
                    <SelectItem value="coffee">Coffee</SelectItem>
                    <SelectItem value="cocoa">Cocoa</SelectItem>
                    <SelectItem value="rubber">Rubber</SelectItem>
                    <SelectItem value="cattle">Cattle</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <div className="col-span-3">
            <Textarea
              id="description"
              {...register("description")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Material description..."
              rows={3}
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quantity" className="text-right">
            Quantity
          </Label>
          <div className="col-span-2">
            <Input
              id="quantity"
              type="number"
              min="0"
              step="0.01"
              {...register("quantity", { valueAsNumber: true })}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter quantity"
            />
            {errors.quantity && <p className="text-sm text-red-500 mt-1">{errors.quantity.message}</p>}
          </div>
          <div>
            <Controller
              name="unit"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms</SelectItem>
                    <SelectItem value="tons">Tons</SelectItem>
                    <SelectItem value="m3">Cubic Meters</SelectItem>
                    <SelectItem value="liters">Liters</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
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
          <Label htmlFor="harvest_date" className="text-right">
            Harvest Date
          </Label>
          <div className="col-span-3">
            <Input
              id="harvest_date"
              type="date"
              {...register("harvest_date")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
            />
            {errors.harvest_date && <p className="text-sm text-red-500 mt-1">{errors.harvest_date.message}</p>}
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
          <Label className="text-right">Sustainability Certificate</Label>
          <div className="col-span-3 flex items-center space-x-2">
            <Controller
              name="sustainability_certificate"
              control={control}
              render={({ field }) => (
                <Checkbox id="sustainability_certificate" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <Label htmlFor="sustainability_certificate">Has sustainability certificate</Label>
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
            "Update Raw Material"
          ) : (
            "Create Raw Material"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}
