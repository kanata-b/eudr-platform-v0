"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useProducts } from "@/hooks/use-products"
import { ProductForm } from "./product-form"
import { ProductTable } from "./product-table"

export function ProductsPage() {
  const {
    products,
    isLoading,
    isDialogOpen,
    editingProduct,
    formData,
    handleSubmit,
    handleEdit,
    handleDelete,
    openCreateDialog,
    setIsDialogOpen,
    setFormData,
    getRiskBadgeColor,
    isEditing,
  } = useProducts()

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog and compliance data</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Product" : "Add Product"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update product information" : "Create a new product entry"}
              </DialogDescription>
            </DialogHeader>
            <ProductForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} isEditing={isEditing} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products List</CardTitle>
          <CardDescription>All registered products in your system</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            getRiskBadgeColor={getRiskBadgeColor}
          />
        </CardContent>
      </Card>
    </div>
  )
}
