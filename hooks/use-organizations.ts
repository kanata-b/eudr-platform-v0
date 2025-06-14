"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { hybridApi } from "@/lib/hybrid-api"
import { useOfflineMode } from "@/lib/offline-context"
import type { Organization, CreateOrganizationData } from "@/types"

export function useOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null)
  const [formData, setFormData] = useState<CreateOrganizationData>({
    name: "",
    address: "",
    contact_person: "",
    email: "",
    phone: "",
    registration_number: "",
  })
  const { toast } = useToast()
  const { isOffline } = useOfflineMode()

  const loadOrganizations = async () => {
    try {
      setIsLoading(true)
      const data = await hybridApi.organization.list()
      setOrganizations(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load organizations",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingOrg) {
        await hybridApi.organization.update(editingOrg.id, formData)
        toast({
          title: "Success",
          description: `Organization updated successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      } else {
        await hybridApi.organization.create(formData)
        toast({
          title: "Success",
          description: `Organization created successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      }
      resetForm()
      loadOrganizations()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save organization",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (org: Organization) => {
    setEditingOrg(org)
    setFormData({
      name: org.name,
      address: org.address,
      contact_person: org.contact_person,
      email: org.email,
      phone: org.phone,
      registration_number: org.registration_number,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await hybridApi.organization.delete(id)
      toast({
        title: "Success",
        description: `Organization deleted successfully ${isOffline ? "(Demo Mode)" : ""}`,
      })
      loadOrganizations()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete organization",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setIsDialogOpen(false)
    setEditingOrg(null)
    setFormData({
      name: "",
      address: "",
      contact_person: "",
      email: "",
      phone: "",
      registration_number: "",
    })
  }

  const openCreateDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  // Reload data when switching between offline/online modes
  useEffect(() => {
    loadOrganizations()
  }, [isOffline])

  useEffect(() => {
    loadOrganizations()
  }, [])

  return {
    // State
    organizations,
    isLoading,
    isDialogOpen,
    editingOrg,
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
    isEditing: !!editingOrg,
  }
}
