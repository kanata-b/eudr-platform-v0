"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { hybridApi } from "@/lib/hybrid-api"
import { useOfflineMode } from "@/lib/offline-context"
import type { Supplier, CreateSupplierData } from "@/types"

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)
  const [formData, setFormData] = useState<CreateSupplierData>({
    name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    certification_status: "pending",
    risk_level: "low",
  })
  const { toast } = useToast()
  const { isOffline } = useOfflineMode()

  const loadSuppliers = async () => {
    try {
      setIsLoading(true)
      const data = await hybridApi.supplier.list()
      setSuppliers(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load suppliers",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingSupplier) {
        await hybridApi.supplier.update(editingSupplier.id, formData)
        toast({
          title: "Success",
          description: `Supplier updated successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      } else {
        await hybridApi.supplier.create(formData)
        toast({
          title: "Success",
          description: `Supplier created successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      }
      resetForm()
      loadSuppliers()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save supplier",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier)
    setFormData({
      name: supplier.name,
      contact_person: supplier.contact_person,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      country: supplier.country,
      certification_status: supplier.certification_status,
      risk_level: supplier.risk_level,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await hybridApi.supplier.delete(id)
      toast({
        title: "Success",
        description: `Supplier deleted successfully ${isOffline ? "(Demo Mode)" : ""}`,
      })
      loadSuppliers()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete supplier",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setIsDialogOpen(false)
    setEditingSupplier(null)
    setFormData({
      name: "",
      contact_person: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      certification_status: "pending",
      risk_level: "low",
    })
  }

  const openCreateDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  // Reload data when switching between offline/online modes
  useEffect(() => {
    loadSuppliers()
  }, [isOffline])

  useEffect(() => {
    loadSuppliers()
  }, [])

  return {
    // State
    suppliers,
    isLoading,
    isDialogOpen,
    editingSupplier,
    formData,

    // Actions
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    openCreateDialog,
    setIsDialogOpen,
    setFormData,

    // Computed
    isEditing: !!editingSupplier,
  }
}
