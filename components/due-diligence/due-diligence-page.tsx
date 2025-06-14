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
import { Plus, FileText, Send, CheckCircle, Edit } from "lucide-react"
import { useDueDiligence } from "@/hooks/use-due-diligence"
import { DueDiligenceForm } from "./due-diligence-form"
import { DueDiligenceTable } from "./due-diligence-table"

export function DueDiligencePage() {
  const {
    statements,
    isLoading,
    isDialogOpen,
    editingStatement,
    formData,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleSubmitStatement,
    openCreateDialog,
    setIsDialogOpen,
    setFormData,
    getStatusBadge,
    statistics,
    isEditing,
  } = useDueDiligence()

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Due Diligence Statements</h1>
          <p className="text-muted-foreground">Create and manage EUDR due diligence statements</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              New Statement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Due Diligence Statement" : "New Due Diligence Statement"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update due diligence statement" : "Create a new due diligence statement"}
              </DialogDescription>
            </DialogHeader>
            <DueDiligenceForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isEditing={isEditing}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Statements</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalStatements}</div>
            <p className="text-xs text-muted-foreground">Due diligence statements</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <Send className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statistics.submittedCount}</div>
            <p className="text-xs text-muted-foreground">Submitted statements</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statistics.approvedCount}</div>
            <p className="text-xs text-muted-foreground">Approved statements</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
            <Edit className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{statistics.draftCount}</div>
            <p className="text-xs text-muted-foreground">Draft statements</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Due Diligence Statements</CardTitle>
          <CardDescription>All due diligence statements with submission status</CardDescription>
        </CardHeader>
        <CardContent>
          <DueDiligenceTable
            statements={statements}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSubmit={handleSubmitStatement}
            getStatusBadge={getStatusBadge}
          />
        </CardContent>
      </Card>
    </div>
  )
}
