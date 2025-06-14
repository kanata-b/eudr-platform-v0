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
import { useCustomers } from "@/hooks/use-customers"
import { CustomerForm } from "./customer-form"
import { CustomerTable } from "./customer-table"

export function CustomersPage() {
  const {
    customers,
    isLoading,
    isDialogOpen,
    editingCustomer,
    formData,
    handleSubmit,
    handleEdit,
    handleDelete,
    openCreateDialog,
    setIsDialogOpen,
    setFormData,
    isEditing,
  } = useCustomers()

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Customer" : "Add Customer"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update customer information" : "Create a new customer entry"}
              </DialogDescription>
            </DialogHeader>
            <CustomerForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} isEditing={isEditing} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customers List</CardTitle>
          <CardDescription>All registered customers in your system</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerTable customers={customers} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>
    </div>
  )
}
