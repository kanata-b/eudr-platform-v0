"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter } from "@/components/ui/dialog"
import { organizationSchema, type OrganizationFormData } from "@/lib/validations/forms"

interface OrganizationFormProps {
  initialData?: Partial<OrganizationFormData>
  onSubmit: (data: OrganizationFormData) => Promise<void>
  onClose: () => void
  isEditing?: boolean
  isLoading?: boolean
}

export function OrganizationForm({
  initialData,
  onSubmit,
  onClose,
  isEditing = false,
  isLoading = false,
}: OrganizationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: initialData?.name || "",
      registration_number: initialData?.registration_number || "",
      contact_person: initialData?.contact_person || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
    },
  })

  const handleFormSubmit = async (data: OrganizationFormData) => {
    try {
      await onSubmit(data)
      onClose()
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <div className="col-span-3">
            <Input
              id="name"
              {...register("name")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter organization name"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="registration_number" className="text-right">
            Registration
          </Label>
          <div className="col-span-3">
            <Input
              id="registration_number"
              {...register("registration_number")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter registration number"
            />
            {errors.registration_number && (
              <p className="text-sm text-red-500 mt-1">{errors.registration_number.message}</p>
            )}
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
            "Update Organization"
          ) : (
            "Create Organization"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}
