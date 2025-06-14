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
import { productSchema, type ProductFormData } from "@/lib/validations/forms"

interface ProductFormProps {
  initialData?: Partial<ProductFormData>
  onSubmit: (data: ProductFormData) => Promise<void>
  onClose: () => void
  isEditing?: boolean
  isLoading?: boolean
}

export function ProductForm({
  initialData,
  onSubmit,
  onClose,
  isEditing = false,
  isLoading = false,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      sku: initialData?.sku || "",
      category: initialData?.category || "wood",
      description: initialData?.description || "",
      weight: initialData?.weight || 0,
      weight_unit: initialData?.weight_unit || "kg",
      origin_country: initialData?.origin_country || "",
      harvest_date: initialData?.harvest_date || "",
      certification: initialData?.certification || "",
      eudr_compliant: initialData?.eudr_compliant || false,
    },
  })

  const handleFormSubmit = async (data: ProductFormData) => {
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
            Product Name
          </Label>
          <div className="col-span-3">
            <Input
              id="name"
              {...register("name")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="sku" className="text-right">
            SKU
          </Label>
          <div className="col-span-3">
            <Input
              id="sku"
              {...register("sku")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter SKU"
            />
            {errors.sku && <p className="text-sm text-red-500 mt-1">{errors.sku.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <div className="col-span-3">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Select category" />
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
            {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}
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
              placeholder="Product description..."
              rows={3}
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="weight" className="text-right">
            Weight
          </Label>
          <div className="col-span-2">
            <Input
              id="weight"
              type="number"
              min="0"
              step="0.01"
              {...register("weight", { valueAsNumber: true })}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter weight"
            />
            {errors.weight && <p className="text-sm text-red-500 mt-1">{errors.weight.message}</p>}
          </div>
          <div>
            <Controller
              name="weight_unit"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms</SelectItem>
                    <SelectItem value="g">Grams</SelectItem>
                    <SelectItem value="tons">Tons</SelectItem>
                    <SelectItem value="lbs">Pounds</SelectItem>
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
          <Label htmlFor="certification" className="text-right">
            Certification
          </Label>
          <div className="col-span-3">
            <Input
              id="certification"
              {...register("certification")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="FSC, RSPO, etc."
            />
            {errors.certification && <p className="text-sm text-red-500 mt-1">{errors.certification.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">EUDR Compliant</Label>
          <div className="col-span-3 flex items-center space-x-2">
            <Controller
              name="eudr_compliant"
              control={control}
              render={({ field }) => (
                <Checkbox id="eudr_compliant" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <Label htmlFor="eudr_compliant">This product is EUDR compliant</Label>
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
            "Update Product"
          ) : (
            "Create Product"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}
