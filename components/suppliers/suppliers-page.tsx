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
import { SupplierTable } from "./supplier-table"
import { SupplierForm } from "./supplier-form"
import { useSuppliers } from "@/hooks/use-suppliers"
import { Truck, Plus, Search, Filter, Download, TrendingUp, Shield, Globe, Star } from "lucide-react"

export function SuppliersPage() {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const {
    suppliers,
    isLoading,
    isDialogOpen,
    editingSupplier,
    formData,
    handleSubmit,
    handleEdit,
    handleDelete,
    openCreateDialog,
    setIsDialogOpen,
    setFormData,
    isEditing,
  } = useSuppliers()

  const filteredSuppliers = suppliers?.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.country.toLowerCase().includes(searchTerm.toLowerCase()),
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
            <Truck className="mr-3 h-8 w-8 text-green-600" />
            Suppliers
          </h1>
          <p className="text-green-600 dark:text-green-400 mt-1">
            Manage your supplier network and compliance verification
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
            {suppliers?.length || 0} Active Suppliers
          </Badge>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog} className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{isEditing ? "Edit Supplier" : "Add Supplier"}</DialogTitle>
                <DialogDescription>
                  {isEditing ? "Update supplier information" : "Add a new supplier to your network"}
                </DialogDescription>
              </DialogHeader>
              <SupplierForm
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
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Suppliers</CardTitle>
            <Truck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">{suppliers?.length || 0}</div>
            <div className="flex items-center space-x-2 mt-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <p className="text-xs text-green-600 dark:text-green-400">+6% this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Verified</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {suppliers?.filter((s) => s.verification_status === "verified").length || 0}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">EUDR compliant</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Countries</CardTitle>
            <Globe className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {new Set(suppliers?.map((s) => s.country)).size || 0}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Global reach</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Premium Partners</CardTitle>
            <Star className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {suppliers?.filter((s) => s.supplier_type === "premium").length || 0}
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400">Top tier suppliers</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">Search & Filter</CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            Find suppliers by name, email, country, or verification status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
              <Input
                placeholder="Search suppliers..."
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

      {/* Suppliers Table */}
      <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">Supplier Network</CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            Complete list of all suppliers and their verification status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SupplierTable suppliers={filteredSuppliers || []} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>
    </div>
  )
}
