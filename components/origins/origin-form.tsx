"use client"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogFooter } from "@/components/ui/dialog"
import { originSchema, type OriginFormData } from "@/lib/validations/forms"

interface OriginFormProps {
  initialData?: Partial<OriginFormData>
  onSubmit: (data: OriginFormData) => Promise<void>
  onClose: () => void
  isEditing?: boolean
  isLoading?: boolean
}

export function OriginForm({ initialData, onSubmit, onClose, isEditing = false, isLoading = false }: OriginFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OriginFormData>({
    resolver: zodResolver(originSchema),
    defaultValues: {
      location_name: initialData?.location_name || "",
      country: initialData?.country || "",
      region: initialData?.region || "",
      coordinates: initialData?.coordinates || "",
      land_use_type: initialData?.land_use_type || "forest",
      forest_coverage: initialData?.forest_coverage || 0,
      deforestation_risk: initialData?.deforestation_risk || "low",
      land_ownership: initialData?.land_ownership || "private",
      monitoring_system: initialData?.monitoring_system || "",
      last_verification_date: initialData?.last_verification_date || "",
      protected_area: initialData?.protected_area || false,
      indigenous_territory: initialData?.indigenous_territory || false,
      satellite_data_available: initialData?.satellite_data_available || false,
    },
  })

  const handleFormSubmit = async (data: OriginFormData) => {
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
          <Label htmlFor="location_name" className="text-right">
            Location Name
          </Label>
          <div className="col-span-3">
            <Input
              id="location_name"
              {...register("location_name")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter location name"
            />
            {errors.location_name && <p className="text-sm text-red-500 mt-1">{errors.location_name.message}</p>}
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
          <Label htmlFor="region" className="text-right">
            Region
          </Label>
          <div className="col-span-3">
            <Input
              id="region"
              {...register("region")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter region"
            />
            {errors.region && <p className="text-sm text-red-500 mt-1">{errors.region.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="coordinates" className="text-right">
            GPS Coordinates
          </Label>
          <div className="col-span-3">
            <Input
              id="coordinates"
              {...register("coordinates")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="lat,lng (e.g., -23.5505,-46.6333)"
            />
            {errors.coordinates && <p className="text-sm text-red-500 mt-1">{errors.coordinates.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="land_use_type" className="text-right">
            Land Use Type
          </Label>
          <div className="col-span-3">
            <Controller
              name="land_use_type"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Select land use type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="forest">Forest</SelectItem>
                    <SelectItem value="agricultural">Agricultural</SelectItem>
                    <SelectItem value="plantation">Plantation</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                    <SelectItem value="grassland">Grassland</SelectItem>
                    <SelectItem value="wetland">Wetland</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.land_use_type && <p className="text-sm text-red-500 mt-1">{errors.land_use_type.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="forest_coverage" className="text-right">
            Forest Coverage (%)
          </Label>
          <div className="col-span-3">
            <Input
              id="forest_coverage"
              type="number"
              min="0"
              max="100"
              {...register("forest_coverage", { valueAsNumber: true })}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Enter forest coverage percentage"
            />
            {errors.forest_coverage && <p className="text-sm text-red-500 mt-1">{errors.forest_coverage.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="deforestation_risk" className="text-right">
            Deforestation Risk
          </Label>
          <div className="col-span-3">
            <Controller
              name="deforestation_risk"
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
            {errors.deforestation_risk && (
              <p className="text-sm text-red-500 mt-1">{errors.deforestation_risk.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="monitoring_system" className="text-right">
            Monitoring System
          </Label>
          <div className="col-span-3">
            <Input
              id="monitoring_system"
              {...register("monitoring_system")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
              placeholder="Satellite, Ground-based, etc."
            />
            {errors.monitoring_system && (
              <p className="text-sm text-red-500 mt-1">{errors.monitoring_system.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="last_verification_date" className="text-right">
            Last Verification
          </Label>
          <div className="col-span-3">
            <Input
              id="last_verification_date"
              type="date"
              {...register("last_verification_date")}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
            />
            {errors.last_verification_date && (
              <p className="text-sm text-red-500 mt-1">{errors.last_verification_date.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Protected Area</Label>
          <div className="col-span-3 flex items-center space-x-2">
            <Controller
              name="protected_area"
              control={control}
              render={({ field }) => (
                <Checkbox id="protected_area" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <Label htmlFor="protected_area">This area is protected</Label>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Indigenous Territory</Label>
          <div className="col-span-3 flex items-center space-x-2">
            <Controller
              name="indigenous_territory"
              control={control}
              render={({ field }) => (
                <Checkbox id="indigenous_territory" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <Label htmlFor="indigenous_territory">This is indigenous territory</Label>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Satellite Data</Label>
          <div className="col-span-3 flex items-center space-x-2">
            <Controller
              name="satellite_data_available"
              control={control}
              render={({ field }) => (
                <Checkbox id="satellite_data_available" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <Label htmlFor="satellite_data_available">Satellite data available</Label>
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
            "Update Origin"
          ) : (
            "Create Origin"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}
