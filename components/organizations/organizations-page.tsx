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
import { useOrganizations } from "@/hooks/use-organizations"
import { OrganizationForm } from "./organization-form"
import { OrganizationTable } from "./organization-table"

export function OrganizationsPage() {
  const {
    organizations,
    isLoading,
    isDialogOpen,
    editingOrg,
    formData,
    handleSubmit,
    handleEdit,
    handleDelete,
    openCreateDialog,
    setIsDialogOpen,
    setFormData,
    isEditing,
  } = useOrganizations()

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
          <p className="text-muted-foreground">Manage your organization information</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Organization
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Organization" : "Add Organization"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update organization information" : "Create a new organization entry"}
              </DialogDescription>
            </DialogHeader>
            <OrganizationForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isEditing={isEditing}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organizations List</CardTitle>
          <CardDescription>All registered organizations in your system</CardDescription>
        </CardHeader>
        <CardContent>
          <OrganizationTable organizations={organizations} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>
    </div>
  )
}
