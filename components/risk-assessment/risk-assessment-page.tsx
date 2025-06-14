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
import { RiskAssessmentTable } from "./risk-assessment-table"
import { RiskAssessmentForm } from "./risk-assessment-form"
import { useRiskAssessments } from "@/hooks/use-risk-assessments"
import { Shield, Plus, Search, Filter, Download, AlertTriangle, CheckCircle } from "lucide-react"

export function RiskAssessmentPage() {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const {
    riskAssessments,
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
    statistics,
    isEditing,
  } = useRiskAssessments()

  const filteredAssessments = riskAssessments?.filter(
    (assessment) =>
      assessment.assessment_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.risk_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.assessor_name.toLowerCase().includes(searchTerm.toLowerCase()),
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
            <Shield className="mr-3 h-8 w-8 text-green-600" />
            Risk Assessment
          </h1>
          <p className="text-green-600 dark:text-green-400 mt-1">
            Evaluate and monitor risks in your supply chain for EUDR compliance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
            {statistics?.totalAssessments || 0} Assessments
          </Badge>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog} className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                New Assessment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{isEditing ? "Edit Risk Assessment" : "New Risk Assessment"}</DialogTitle>
                <DialogDescription>
                  {isEditing ? "Update risk assessment details" : "Create a new risk assessment for your supply chain"}
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
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Assessments</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {statistics?.totalAssessments || 0}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Risk evaluations</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {statistics?.highRiskCount || 0}
            </div>
            <p className="text-xs text-red-600 dark:text-red-400">Critical assessments</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {statistics?.approvedCount || 0}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Completed assessments</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Average Score</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {statistics?.averageRiskScore || 0}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Risk score average</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">Search & Filter</CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            Find risk assessments by name, category, assessor, or status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
              <Input
                placeholder="Search assessments..."
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

      {/* Risk Assessments Table */}
      <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">Risk Assessments</CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            Complete list of all risk assessments and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RiskAssessmentTable
            assessments={filteredAssessments || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
            getRiskBadgeColor={getRiskBadgeColor}
            getStatusBadge={getStatusBadge}
          />
        </CardContent>
      </Card>
    </div>
  )
}
