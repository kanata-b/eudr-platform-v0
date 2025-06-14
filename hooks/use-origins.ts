"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { hybridApi } from "@/lib/hybrid-api"
import { useOfflineMode } from "@/lib/offline-context"
import type { Origin, CreateOriginData } from "@/types"

export function useOrigins() {
  const [origins, setOrigins] = useState<Origin[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingOrigin, setEditingOrigin] = useState<Origin | null>(null)
  const [formData, setFormData] = useState<CreateOriginData>({
    country: "",
    region: "",
    coordinates: "",
    risk_level: "low",
    certification_status: "pending",
    description: "",
  })
  const { toast } = useToast()
  const { isOffline } = useOfflineMode()

  const loadOrigins = async () => {
    try {
      setIsLoading(true)
      const data = await hybridApi.origin.list()
      setOrigins(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load origins",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingOrigin) {
        await hybridApi.origin.update(editingOrigin.id, formData)
        toast({
          title: "Success",
          description: `Origin updated successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      } else {
        await hybridApi.origin.create(formData)
        toast({
          title: "Success",
          description: `Origin created successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      }
      resetForm()
      loadOrigins()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save origin",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (origin: Origin) => {
    setEditingOrigin(origin)
    setFormData({
      country: origin.country,
      region: origin.region,
      coordinates: origin.coordinates,
      risk_level: origin.risk_level,
      certification_status: origin.certification_status,
      description: origin.description,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await hybridApi.origin.delete(id)
      toast({
        title: "Success",
        description: `Origin deleted successfully ${isOffline ? "(Demo Mode)" : ""}`,
      })
      loadOrigins()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete origin",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setIsDialogOpen(false)
    setEditingOrigin(null)
    setFormData({
      country: "",
      region: "",
      coordinates: "",
      risk_level: "low",
      certification_status: "pending",
      description: "",
    })
  }

  const openCreateDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  // Reload data when switching between offline/online modes
  useEffect(() => {
    loadOrigins()
  }, [isOffline])

  useEffect(() => {
    loadOrigins()
  }, [])

  return {
    // State
    origins,
    isLoading,
    isDialogOpen,
    editingOrigin,
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
    isEditing: !!editingOrigin,
  }
}
