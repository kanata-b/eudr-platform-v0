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
import { useOrigins } from "@/hooks/use-origins"
import { OriginForm } from "./origin-form"
import { OriginTable } from "./origin-table"

export function OriginsPage() {
  const {
    origins,
    isLoading,
    isDialogOpen,
    editingOrigin,
    formData,
    handleSubmit,
    handleEdit,
    handleDelete,
    openCreateDialog,
    setIsDialogOpen,
    setFormData,
    getRiskBadgeColor,
    isEditing,
  } = useOrigins()

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Origins</h1>
          <p className="text-muted-foreground">Track geographical origins and land use information</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Origin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Origin" : "Add Origin"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update origin information" : "Create a new origin entry"}
              </DialogDescription>
            </DialogHeader>
            <OriginForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} isEditing={isEditing} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Origins List</CardTitle>
          <CardDescription>All tracked geographical origins with land use and risk data</CardDescription>
        </CardHeader>
        <CardContent>
          <OriginTable
            origins={origins}
            onEdit={handleEdit}
            onDelete={handleDelete}
            getRiskBadgeColor={getRiskBadgeColor}
          />
        </CardContent>
      </Card>
    </div>
  )
}
