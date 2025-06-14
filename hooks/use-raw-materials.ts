"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { hybridApi } from "@/lib/hybrid-api"
import { useOfflineMode } from "@/lib/offline-context"
import type { RawMaterial, CreateRawMaterialData } from "@/types"

export function useRawMaterials() {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null)
  const [formData, setFormData] = useState<CreateRawMaterialData>({
    name: "",
    description: "",
    category: "",
    origin_id: "",
    supplier_id: "",
    risk_level: "low",
    certification_required: false,
  })
  const { toast } = useToast()
  const { isOffline } = useOfflineMode()

  const loadRawMaterials = async () => {
    try {
      setIsLoading(true)
      const data = await hybridApi.rawMaterial.list()
      setRawMaterials(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load raw materials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingMaterial) {
        await hybridApi.rawMaterial.update(editingMaterial.id, formData)
        toast({
          title: "Success",
          description: `Raw material updated successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      } else {
        await hybridApi.rawMaterial.create(formData)
        toast({
          title: "Success",
          description: `Raw material created successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      }
      resetForm()
      loadRawMaterials()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save raw material",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (material: RawMaterial) => {
    setEditingMaterial(material)
    setFormData({
      name: material.name,
      description: material.description,
      category: material.category,
      origin_id: material.origin_id,
      supplier_id: material.supplier_id,
      risk_level: material.risk_level,
      certification_required: material.certification_required,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await hybridApi.rawMaterial.delete(id)
      toast({
        title: "Success",
        description: `Raw material deleted successfully ${isOffline ? "(Demo Mode)" : ""}`,
      })
      loadRawMaterials()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete raw material",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setIsDialogOpen(false)
    setEditingMaterial(null)
    setFormData({
      name: "",
      description: "",
      category: "",
      origin_id: "",
      supplier_id: "",
      risk_level: "low",
      certification_required: false,
    })
  }

  const openCreateDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  // Reload data when switching between offline/online modes
  useEffect(() => {
    loadRawMaterials()
  }, [isOffline])

  useEffect(() => {
    loadRawMaterials()
  }, [])

  return {
    // State
    rawMaterials,
    isLoading,
    isDialogOpen,
    editingMaterial,
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
    isEditing: !!editingMaterial,
  }
}
