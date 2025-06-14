"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProductTable } from "./product-table"
import { ProductForm } from "./product-form"
import { useProducts } from "@/hooks/use-products"
import { Package, Plus, Search, Filter, Download, TrendingUp, Leaf, Shield } from "lucide-react"

export function ProductsPage() {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
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
    isEditing,
  } = useProducts()

  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200 flex items-center">
            <Package className="mr-3 h-8 w-8 text-green-600" />
            Products
          </h1>
          <p className="text-green-600 dark:text-green-400 mt-1">
            Manage your product catalog and EUDR compliance status
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
            {products?.length || 0} Products
          </Badge>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog} className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{isEditing ? "Edit Product" : "Add Product"}</DialogTitle>
                <DialogDescription>
                  {isEditing ? "Update product information" : "Add a new product to your catalog"}
                </DialogDescription>
              </DialogHeader>
              <ProductForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isEditing={isEditing}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Products</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">{products?.length || 0}</div>
            <div className="flex items-center space-x-2 mt-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <p className="text-xs text-green-600 dark:text-green-400">+8% this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">EUDR Compliant</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {products?.filter((p) => p.eudr_compliant).length || 0}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Verified products</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Categories</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {new Set(products?.map((p) => p.category)).size || 0}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Product categories</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Compliance Rate</CardTitle>
            <Badge className="bg-green-100 text-green-800 text-xs">
              {products?.length > 0
                ? Math.round((products.filter((p) => p.eudr_compliant).length / products.length) * 100)
                : 0}
              %
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {products?.length > 0
                ? Math.round((products.filter((p) => p.eudr_compliant).length / products.length) * 100)
                : 0}
              %
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">EUDR compliance</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">Search & Filter</CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            Find products by name, category, SKU, or compliance status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">Product Catalog</CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            Complete list of all products and their compliance status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductTable products={filteredProducts || []} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>
    </div>
  )
}
