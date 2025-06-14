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
import { useRawMaterials } from "@/hooks/use-raw-materials"
import { RawMaterialForm } from "./raw-material-form"
import { RawMaterialTable } from "./raw-material-table"

export function RawMaterialsPage() {
  const {
    rawMaterials,
    isLoading,
    isDialogOpen,
    editingMaterial,
    formData,
    handleSubmit,
    handleEdit,
    handleDelete,
    openCreateDialog,
    setIsDialogOpen,
    setFormData,
    getRiskBadgeColor,
    isEditing,
  } = useRawMaterials()

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Raw Materials</h1>
          <p className="text-muted-foreground">Track raw materials and their origins</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Raw Material
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Raw Material" : "Add Raw Material"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update raw material information" : "Create a new raw material entry"}
              </DialogDescription>
            </DialogHeader>
            <RawMaterialForm
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
          <CardTitle>Raw Materials List</CardTitle>
          <CardDescription>All tracked raw materials with origin and sustainability data</CardDescription>
        </CardHeader>
        <CardContent>
          <RawMaterialTable
            rawMaterials={rawMaterials}
            onEdit={handleEdit}
            onDelete={handleDelete}
            getRiskBadgeColor={getRiskBadgeColor}
          />
        </CardContent>
      </Card>
    </div>
  )
}
