"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { hybridApi } from "@/lib/hybrid-api"
import { useOfflineMode } from "@/lib/offline-context"
import type { Product, CreateProductData } from "@/types"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<CreateProductData>({
    name: "",
    description: "",
    category: "",
    sku: "",
    price: 0,
    supplier_id: "",
    origin_id: "",
    raw_materials: [],
  })
  const { toast } = useToast()
  const { isOffline } = useOfflineMode()

  const loadProducts = async () => {
    try {
      setIsLoading(true)
      const data = await hybridApi.product.list()
      setProducts(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        await hybridApi.product.update(editingProduct.id, formData)
        toast({
          title: "Success",
          description: `Product updated successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      } else {
        await hybridApi.product.create(formData)
        toast({
          title: "Success",
          description: `Product created successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      }
      resetForm()
      loadProducts()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      sku: product.sku,
      price: product.price,
      supplier_id: product.supplier_id,
      origin_id: product.origin_id,
      raw_materials: product.raw_materials || [],
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await hybridApi.product.delete(id)
      toast({
        title: "Success",
        description: `Product deleted successfully ${isOffline ? "(Demo Mode)" : ""}`,
      })
      loadProducts()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setIsDialogOpen(false)
    setEditingProduct(null)
    setFormData({
      name: "",
      description: "",
      category: "",
      sku: "",
      price: 0,
      supplier_id: "",
      origin_id: "",
      raw_materials: [],
    })
  }

  const openCreateDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  // Reload data when switching between offline/online modes
  useEffect(() => {
    loadProducts()
  }, [isOffline])

  useEffect(() => {
    loadProducts()
  }, [])

  return {
    // State
    products,
    isLoading,
    isDialogOpen,
    editingProduct,
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
    isEditing: !!editingProduct,
  }
}
