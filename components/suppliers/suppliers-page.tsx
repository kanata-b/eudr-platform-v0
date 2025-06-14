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
import { useSuppliers } from "@/hooks/use-suppliers"
import { SupplierForm } from "./supplier-form"
import { SupplierTable } from "./supplier-table"

export function SuppliersPage() {
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
    getVerificationBadge,
    getRiskBadgeColor,
    isEditing,
  } = useSuppliers()

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">Manage your supplier network and verification status</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Supplier" : "Add Supplier"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update supplier information" : "Create a new supplier entry"}
              </DialogDescription>
            </DialogHeader>
            <SupplierForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} isEditing={isEditing} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Suppliers List</CardTitle>
          <CardDescription>All registered suppliers with verification and risk status</CardDescription>
        </CardHeader>
        <CardContent>
          <SupplierTable
            suppliers={suppliers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            getVerificationBadge={getVerificationBadge}
            getRiskBadgeColor={getRiskBadgeColor}
          />
        </CardContent>
      </Card>
    </div>
  )
}
