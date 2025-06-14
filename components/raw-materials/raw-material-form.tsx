"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import type { CreateRawMaterialData } from "@/types"

interface RawMaterialFormProps {
  formData: CreateRawMaterialData
  setFormData: (data: CreateRawMaterialData) => void
  onSubmit: (e: React.FormEvent) => void
  isEditing: boolean
}

export function RawMaterialForm({ formData, setFormData, onSubmit, isEditing }: RawMaterialFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Type
          </Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select material type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="timber">Timber</SelectItem>
              <SelectItem value="palm_oil">Palm Oil</SelectItem>
              <SelectItem value="soy_beans">Soy Beans</SelectItem>
              <SelectItem value="coffee_beans">Coffee Beans</SelectItem>
              <SelectItem value="cocoa_beans">Cocoa Beans</SelectItem>
              <SelectItem value="rubber">Rubber</SelectItem>
              <SelectItem value="cattle">Cattle</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="origin_location" className="text-right">
            Origin Location
          </Label>
          <Input
            id="origin_location"
            value={formData.origin_location}
            onChange={(e) => setFormData({ ...formData, origin_location: e.target.value })}
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
          <Label htmlFor="harvest_date" className="text-right">
            Harvest Date
          </Label>
          <Input
            id="harvest_date"
            type="date"
            value={formData.harvest_date}
            onChange={(e) => setFormData({ ...formData, harvest_date: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="supplier_id" className="text-right">
            Supplier
          </Label>
          <Input
            id="supplier_id"
            value={formData.supplier_id}
            onChange={(e) => setFormData({ ...formData, supplier_id: e.target.value })}
            className="col-span-3"
            placeholder="Supplier ID or Name"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="volume" className="text-right">
            Volume
          </Label>
          <Input
            id="volume"
            type="number"
            value={formData.volume}
            onChange={(e) => setFormData({ ...formData, volume: Number.parseFloat(e.target.value) })}
            className="col-span-2"
            required
          />
          <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
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
          <Label htmlFor="sustainability_certificate" className="text-right">
            Certificate
          </Label>
          <Input
            id="sustainability_certificate"
            value={formData.sustainability_certificate}
            onChange={(e) => setFormData({ ...formData, sustainability_certificate: e.target.value })}
            className="col-span-3"
            placeholder="FSC, PEFC, etc."
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="risk_assessment" className="text-right">
            Risk Level
          </Label>
          <Select
            value={formData.risk_assessment}
            onValueChange={(value: "low" | "medium" | "high") => setFormData({ ...formData, risk_assessment: value })}
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
      </div>
      <DialogFooter>
        <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
      </DialogFooter>
    </form>
  )
}
