"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogFooter } from "@/components/ui/dialog"
import type { CreateOriginData } from "@/types"

interface OriginFormProps {
  formData: CreateOriginData
  setFormData: (data: CreateOriginData) => void
  onSubmit: (e: React.FormEvent) => void
  isEditing: boolean
}

export function OriginForm({ formData, setFormData, onSubmit, isEditing }: OriginFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="location_name" className="text-right">
            Location Name
          </Label>
          <Input
            id="location_name"
            value={formData.location_name}
            onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="country" className="text-right">
            Country
          </Label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="region" className="text-right">
            Region
          </Label>
          <Input
            id="region"
            value={formData.region}
            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="coordinates" className="text-right">
            GPS Coordinates
          </Label>
          <Input
            id="coordinates"
            value={formData.coordinates}
            onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
            className="col-span-3"
            placeholder="lat, lng"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="land_use_type" className="text-right">
            Land Use Type
          </Label>
          <Select
            value={formData.land_use_type}
            onValueChange={(value) => setFormData({ ...formData, land_use_type: value })}
          >
            <SelectTrigger className="col-span-3">
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
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="forest_coverage" className="text-right">
            Forest Coverage (%)
          </Label>
          <Input
            id="forest_coverage"
            type="number"
            min="0"
            max="100"
            value={formData.forest_coverage}
            onChange={(e) => setFormData({ ...formData, forest_coverage: Number.parseFloat(e.target.value) })}
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
          <Label htmlFor="land_ownership" className="text-right">
            Land Ownership
          </Label>
          <Select
            value={formData.land_ownership}
            onValueChange={(value) => setFormData({ ...formData, land_ownership: value })}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select ownership type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="community">Community</SelectItem>
              <SelectItem value="indigenous">Indigenous</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="monitoring_system" className="text-right">
            Monitoring System
          </Label>
          <Input
            id="monitoring_system"
            value={formData.monitoring_system}
            onChange={(e) => setFormData({ ...formData, monitoring_system: e.target.value })}
            className="col-span-3"
            placeholder="Satellite, Ground-based, etc."
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="last_verification_date" className="text-right">
            Last Verification
          </Label>
          <Input
            id="last_verification_date"
            type="date"
            value={formData.last_verification_date}
            onChange={(e) => setFormData({ ...formData, last_verification_date: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Protected Area</Label>
          <div className="col-span-3 flex items-center space-x-2">
            <Checkbox
              id="protected_area"
              checked={formData.protected_area}
              onCheckedChange={(checked) => setFormData({ ...formData, protected_area: !!checked })}
            />
            <Label htmlFor="protected_area">This area is protected</Label>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Indigenous Territory</Label>
          <div className="col-span-3 flex items-center space-x-2">
            <Checkbox
              id="indigenous_territory"
              checked={formData.indigenous_territory}
              onCheckedChange={(checked) => setFormData({ ...formData, indigenous_territory: !!checked })}
            />
            <Label htmlFor="indigenous_territory">This is indigenous territory</Label>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Satellite Data</Label>
          <div className="col-span-3 flex items-center space-x-2">
            <Checkbox
              id="satellite_data_available"
              checked={formData.satellite_data_available}
              onCheckedChange={(checked) => setFormData({ ...formData, satellite_data_available: !!checked })}
            />
            <Label htmlFor="satellite_data_available">Satellite data available</Label>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
      </DialogFooter>
    </form>
  )
}
