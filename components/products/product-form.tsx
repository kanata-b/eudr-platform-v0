"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import type { CreateProductData } from "@/types"

interface ProductFormProps {
  formData: CreateProductData
  setFormData: (data: CreateProductData) => void
  onSubmit: (e: React.FormEvent) => void
  isEditing: boolean
}

export function ProductForm({ formData, setFormData, onSubmit, isEditing }: ProductFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4">
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
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger className="col-span-3">
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
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="hs_code" className="text-right">
            HS Code
          </Label>
          <Input
            id="hs_code"
            value={formData.hs_code}
            onChange={(e) => setFormData({ ...formData, hs_code: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="origin_country" className="text-right">
            Origin Country
          </Label>
          <Input
            id="origin_country"
            value={formData.origin_country}
            onChange={(e) => setFormData({ ...formData, origin_country: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="risk_level" className="text-right">
            Risk Level
          </Label>
          <Select
            value={formData.risk_level}
            onValueChange={(value: "low" | "medium" | "high") => setFormData({ ...formData, risk_level: value })}
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
          <Label htmlFor="certification" className="text-right">
            Certification
          </Label>
          <Input
            id="certification"
            value={formData.certification}
            onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
            className="col-span-3"
            placeholder="FSC, PEFC, etc."
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
      </DialogFooter>
    </form>
  )
}
