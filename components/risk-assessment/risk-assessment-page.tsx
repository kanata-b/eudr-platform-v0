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
import { Plus, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { useRiskAssessments } from "@/hooks/use-risk-assessments"
import { RiskAssessmentForm } from "./risk-assessment-form"
import { RiskAssessmentTable } from "./risk-assessment-table"

export function RiskAssessmentPage() {
  const {
    assessments,
    isLoading,
    isDialogOpen,
    editingAssessment,
    formData,
    handleSubmit,
    handleEdit,
    handleDelete,
    openCreateDialog,
    setIsDialogOpen,
    setFormData,
    getRiskBadgeColor,
    getStatusBadge,
    getComplianceBadge,
    statistics,
    isEditing,
  } = useRiskAssessments()

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Assessment</h1>
          <p className="text-muted-foreground">Evaluate and track deforestation and compliance risks</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              New Assessment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Risk Assessment" : "New Risk Assessment"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update risk assessment information" : "Create a new risk assessment"}
              </DialogDescription>
            </DialogHeader>
            <RiskAssessmentForm
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
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalAssessments}</div>
            <p className="text-xs text-muted-foreground">Risk assessments completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{statistics.highRiskCount}</div>
            <p className="text-xs text-muted-foreground">High risk assessments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statistics.approvedCount}</div>
            <p className="text-xs text-muted-foreground">Approved assessments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.averageRiskScore}</div>
            <p className="text-xs text-muted-foreground">Average risk score</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Assessments</CardTitle>
          <CardDescription>All risk assessments with compliance and status information</CardDescription>
        </CardHeader>
        <CardContent>
          <RiskAssessmentTable
            assessments={assessments}
            onEdit={handleEdit}
            onDelete={handleDelete}
            getRiskBadgeColor={getRiskBadgeColor}
            getStatusBadge={getStatusBadge}
            getComplianceBadge={getComplianceBadge}
          />
        </CardContent>
      </Card>
    </div>
  )
}
