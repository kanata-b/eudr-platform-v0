"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { hybridApi } from "@/lib/hybrid-api"
import { useOfflineMode } from "@/lib/offline-context"
import type { DueDiligenceStatement, CreateDueDiligenceStatementData, StatementStatus } from "@/types"

export function useDueDiligence() {
  const [statements, setStatements] = useState<DueDiligenceStatement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStatement, setEditingStatement] = useState<DueDiligenceStatement | null>(null)
  const [formData, setFormData] = useState<CreateDueDiligenceStatementData>({
    statement_number: "",
    company_name: "",
    reporting_period_start: "",
    reporting_period_end: "",
    product_categories: "",
    total_volume: 0,
    volume_unit: "",
    countries_of_origin: "",
    risk_assessment_completed: false,
    mitigation_measures: "",
    monitoring_system: "",
    third_party_verification: false,
    declaration_text: "",
    signatory_name: "",
    signatory_position: "",
    signature_date: "",
    status: "draft" as StatementStatus,
    submission_date: "",
  })
  const { toast } = useToast()
  const { isOffline } = useOfflineMode()

  const loadStatements = async () => {
    try {
      setIsLoading(true)
      const data = await hybridApi.dueDiligenceStatement.list()
      setStatements(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load due diligence statements",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingStatement) {
        await hybridApi.dueDiligenceStatement.update(editingStatement.id, formData)
        toast({
          title: "Success",
          description: `Due diligence statement updated successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      } else {
        await hybridApi.dueDiligenceStatement.create({
          ...formData,
          statement_number: `DDS-${Date.now()}`,
        })
        toast({
          title: "Success",
          description: `Due diligence statement created successfully ${isOffline ? "(Demo Mode)" : ""}`,
        })
      }
      resetForm()
      loadStatements()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save due diligence statement",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (statement: DueDiligenceStatement) => {
    setEditingStatement(statement)
    setFormData({
      statement_number: statement.statement_number,
      company_name: statement.company_name,
      reporting_period_start: statement.reporting_period_start,
      reporting_period_end: statement.reporting_period_end,
      product_categories: statement.product_categories,
      total_volume: statement.total_volume,
      volume_unit: statement.volume_unit,
      countries_of_origin: statement.countries_of_origin,
      risk_assessment_completed: statement.risk_assessment_completed,
      mitigation_measures: statement.mitigation_measures,
      monitoring_system: statement.monitoring_system,
      third_party_verification: statement.third_party_verification,
      declaration_text: statement.declaration_text,
      signatory_name: statement.signatory_name,
      signatory_position: statement.signatory_position,
      signature_date: statement.signature_date,
      status: statement.status,
      submission_date: statement.submission_date,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await hybridApi.dueDiligenceStatement.delete(id)
      toast({
        title: "Success",
        description: `Due diligence statement deleted successfully ${isOffline ? "(Demo Mode)" : ""}`,
      })
      loadStatements()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete due diligence statement",
        variant: "destructive",
      })
    }
  }

  const handleSubmitStatement = async (id: string) => {
    try {
      await hybridApi.dueDiligenceStatement.submit(id)
      toast({
        title: "Success",
        description: `Due diligence statement submitted successfully ${isOffline ? "(Demo Mode)" : ""}`,
      })
      loadStatements()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit statement",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setIsDialogOpen(false)
    setEditingStatement(null)
    setFormData({
      statement_number: "",
      company_name: "",
      reporting_period_start: "",
      reporting_period_end: "",
      product_categories: "",
      total_volume: 0,
      volume_unit: "",
      countries_of_origin: "",
      risk_assessment_completed: false,
      mitigation_measures: "",
      monitoring_system: "",
      third_party_verification: false,
      declaration_text: "",
      signatory_name: "",
      signatory_position: "",
      signature_date: "",
      status: "draft",
      submission_date: "",
    })
  }

  const openCreateDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: { className: "bg-gray-100 text-gray-800", icon: "Edit", text: "Draft" },
      submitted: { className: "bg-blue-100 text-blue-800", icon: "Clock", text: "Submitted" },
      approved: { className: "bg-green-100 text-green-800", icon: "CheckCircle", text: "Approved" },
      rejected: { className: "bg-red-100 text-red-800", icon: "XCircle", text: "Rejected" },
    }
    return (
      badges[status as keyof typeof badges] || {
        className: "bg-gray-100 text-gray-800",
        icon: "Unknown",
        text: "Unknown",
      }
    )
  }

  // Statistics
  const totalStatements = statements.length
  const submittedCount = statements.filter((s) => s.status === "submitted").length
  const approvedCount = statements.filter((s) => s.status === "approved").length
  const draftCount = statements.filter((s) => s.status === "draft").length

  // Reload data when switching between offline/online modes
  useEffect(() => {
    loadStatements()
  }, [isOffline])

  useEffect(() => {
    loadStatements()
  }, [])

  return {
    // State
    statements,
    isLoading,
    isDialogOpen,
    editingStatement,
    formData,

    // Actions
    handleSubmit,
    handleEdit,
    handleDelete,
    handleSubmitStatement,
    resetForm,
    openCreateDialog,
    setIsDialogOpen,
    setFormData,

    // Utilities
    getStatusBadge,

    // Statistics
    statistics: {
      totalStatements,
      submittedCount,
      approvedCount,
      draftCount,
    },

    // Computed
    isEditing: !!editingStatement,
  }
}
