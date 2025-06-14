"use client"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import { supplierSchema, type SupplierFormData } from "@/lib/validations/forms"

interface SupplierFormProps {
  initialData?: Partial<SupplierFormData>
  onSubmit: (data: SupplierFormData) => Promise<void>
  onClose: () => void
  isEditing?: boolean
  isLoading?: boolean
}

export function SupplierForm({
  initialData,
  onSubmit,
  onClose,
  isEditing = false,
  isLoading = false,
}: SupplierFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: initialData?.name || "",
      contact_person: initialData?.contact_person || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      country: initialData?.country || "",
      address: initialData?.address || "",
      supplier_type: initialData?.supplier_type || "standard",
      products_supplied: initialData?.products_supplied || "",
      verification_status: initialData?.verification_status || "pending",
      certification: initialData?.certification || "",
    },
  })

  const handleFormSubmit = async (data: SupplierFormData) => {
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
            Supplier Name
          </Label>
          <div className="col-span-3">
            <Input
              id="name"
              {...register("name")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter supplier name"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="contact_person" className="text-right">
            Contact Person
          </Label>
          <div className="col-span-3">
            <Input
              id="contact_person"
              {...register("contact_person")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter contact person name"
            />
            {errors.contact_person && <p className="text-sm text-red-500 mt-1">{errors.contact_person.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <div className="col-span-3">
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter email address"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <div className="col-span-3">
            <Input
              id="phone"
              {...register("phone")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter phone number"
            />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="country" className="text-right">
            Country
          </Label>
          <div className="col-span-3">
            <Input
              id="country"
              {...register("country")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter country"
            />
            {errors.country && <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="address" className="text-right">
            Address
          </Label>
          <div className="col-span-3">
            <Textarea
              id="address"
              {...register("address")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter full address"
              rows={3}
            />
            {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="supplier_type" className="text-right">
            Supplier Type
          </Label>
          <div className="col-span-3">
            <Controller
              name="supplier_type"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Select supplier type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.supplier_type && <p className="text-sm text-red-500 mt-1">{errors.supplier_type.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="products_supplied" className="text-right">
            Products Supplied
          </Label>
          <div className="col-span-3">
            <Textarea
              id="products_supplied"
              {...register("products_supplied")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Wood, Palm Oil, Soy, etc."
              rows={2}
            />
            {errors.products_supplied && (
              <p className="text-sm text-red-500 mt-1">{errors.products_supplied.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="verification_status" className="text-right">
            Verification Status
          </Label>
          <div className="col-span-3">
            <Controller
              name="verification_status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.verification_status && (
              <p className="text-sm text-red-500 mt-1">{errors.verification_status.message}</p>
            )}
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
            "Update Supplier"
          ) : (
            "Create Supplier"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}
