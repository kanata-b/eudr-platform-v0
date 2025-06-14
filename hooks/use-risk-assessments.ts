"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { hybridApi } from "@/lib/hybrid-api"
import { useOfflineMode } from "@/lib/offline-context"
import type { RiskAssessment, CreateRiskAssessmentData } from "@/types"

export function useRiskAssessments() {
  const [riskAssessments, setRiskAssessments] = useState<RiskAssessment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAssessment, setEditingAssessment] = useState<RiskAssessment | null>(null)
  const [formData, setFormData] = useState<CreateRiskAssessmentData>({
    product_id: "",
    supplier_id: "",
    risk_category: "",
    risk_level: "low",
    assessment_date: "",
    assessor: "",
    findings: "",
    mitigation_measures: "",
    status: "pending",
  })
  const { toast } = useToast()
  const { isOffline } = useOfflineMode()

  const loadRiskAssessments = async () => {
    try {
      setIsLoading(true)
      const data = await hybridApi.riskAssessment.list()
      setRiskAssessments(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load risk assessments",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingAssessment) {
        await hybridApi.riskAssessment.update(editingAssessment.id, formData)
        toast({
          title: "Success",
          description: `Risk assessment updated successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      } else {
        await hybridApi.riskAssessment.create(formData)
        toast({
          title: "Success",
          description: `Risk assessment created successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      }
      resetForm()
      loadRiskAssessments()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save risk assessment",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (assessment: RiskAssessment) => {
    setEditingAssessment(assessment)
    setFormData({
      product_id: assessment.product_id,
      supplier_id: assessment.supplier_id,
      risk_category: assessment.risk_category,
      risk_level: assessment.risk_level,
      assessment_date: assessment.assessment_date,
      assessor: assessment.assessor,
      findings: assessment.findings,
      mitigation_measures: assessment.mitigation_measures,
      status: assessment.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await hybridApi.riskAssessment.delete(id)
      toast({
        title: "Success",
        description: `Risk assessment deleted successfully ${isOffline ? "(Demo Mode)" : ""}`,
      })
      loadRiskAssessments()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete risk assessment",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setIsDialogOpen(false)
    setEditingAssessment(null)
    setFormData({
      product_id: "",
      supplier_id: "",
      risk_category: "",
      risk_level: "low",
      assessment_date: "",
      assessor: "",
      findings: "",
      mitigation_measures: "",
      status: "pending",
    })
  }

  const openCreateDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { className: "bg-yellow-100 text-yellow-800", text: "Pending" },
      in_progress: { className: "bg-blue-100 text-blue-800", text: "In Progress" },
      completed: { className: "bg-green-100 text-green-800", text: "Completed" },
      requires_action: { className: "bg-red-100 text-red-800", text: "Requires Action" },
    }
    return (
      badges[status as keyof typeof badges] || {
        className: "bg-gray-100 text-gray-800",
        text: "Unknown",
      }
    )
  }

  // Reload data when switching between offline/online modes
  useEffect(() => {
    loadRiskAssessments()
  }, [isOffline])

  useEffect(() => {
    loadRiskAssessments()
  }, [])

  return {
    // State
    riskAssessments,
    isLoading,
    isDialogOpen,
    editingAssessment,
    formData,

    // Actions
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    openCreateDialog,
    setIsDialogOpen,
    setFormData,

    // Utilities
    getStatusBadge,

    // Computed
    isEditing: !!editingAssessment,
  }
}
