"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { hybridApi } from "@/lib/hybrid-api"
import { useOfflineMode } from "@/lib/offline-context"
import type { Customer, CreateCustomerData } from "@/types"

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [formData, setFormData] = useState<CreateCustomerData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    contact_person: "",
  })
  const { toast } = useToast()
  const { isOffline } = useOfflineMode()

  const loadCustomers = async () => {
    try {
      setIsLoading(true)
      const data = await hybridApi.customer.list()
      setCustomers(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load customers",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCustomer) {
        await hybridApi.customer.update(editingCustomer.id, formData)
        toast({
          title: "Success",
          description: `Customer updated successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      } else {
        await hybridApi.customer.create(formData)
        toast({
          title: "Success",
          description: `Customer created successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      }
      resetForm()
      loadCustomers()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save customer",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer)
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      company: customer.company,
      contact_person: customer.contact_person,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await hybridApi.customer.delete(id)
      toast({
        title: "Success",
        description: `Customer deleted successfully ${isOffline ? "(Demo Mode)" : ""}`,
      })
      loadCustomers()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setIsDialogOpen(false)
    setEditingCustomer(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      company: "",
      contact_person: "",
    })
  }

  const openCreateDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  // Reload data when switching between offline/online modes
  useEffect(() => {
    loadCustomers()
  }, [isOffline])

  useEffect(() => {
    loadCustomers()
  }, [])

  return {
    // State
    customers,
    isLoading,
    isDialogOpen,
    editingCustomer,
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
    isEditing: !!editingCustomer,
  }
}
