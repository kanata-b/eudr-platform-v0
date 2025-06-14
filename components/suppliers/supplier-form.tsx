"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import type { CreateSupplierData } from "@/types"

interface SupplierFormProps {
  formData: CreateSupplierData
  setFormData: (data: CreateSupplierData) => void
  onSubmit: (e: React.FormEvent) => void
  isEditing: boolean
}

export function SupplierForm({ formData, setFormData, onSubmit, isEditing }: SupplierFormProps) {
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
          <Label htmlFor="company_registration" className="text-right">
            Registration
          </Label>
          <Input
            id="company_registration"
            value={formData.company_registration}
            onChange={(e) => setFormData({ ...formData, company_registration: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="contact_person" className="text-right">
            Contact Person
          </Label>
          <Input
            id="contact_person"
            value={formData.contact_person}
            onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
          <Label htmlFor="business_type" className="text-right">
            Business Type
          </Label>
          <Select
            value={formData.business_type}
            onValueChange={(value) => setFormData({ ...formData, business_type: value })}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="producer">Producer</SelectItem>
              <SelectItem value="processor">Processor</SelectItem>
              <SelectItem value="trader">Trader</SelectItem>
              <SelectItem value="manufacturer">Manufacturer</SelectItem>
              <SelectItem value="distributor">Distributor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="verification_status" className="text-right">
            Status
          </Label>
          <Select
            value={formData.verification_status}
            onValueChange={(value: "verified" | "pending" | "rejected") =>
              setFormData({ ...formData, verification_status: value })
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
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
          <Label htmlFor="last_audit_date" className="text-right">
            Last Audit
          </Label>
          <Input
            id="last_audit_date"
            type="date"
            value={formData.last_audit_date}
            onChange={(e) => setFormData({ ...formData, last_audit_date: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="address" className="text-right">
            Address
          </Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="certifications" className="text-right">
            Certifications
          </Label>
          <Textarea
            id="certifications"
            value={formData.certifications}
            onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
            className="col-span-3"
            placeholder="FSC, PEFC, etc."
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
      </DialogFooter>
    </form>
  )
}
