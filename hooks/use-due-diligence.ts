"use client"

import type React from "react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { trpc } from "@/lib/trpc-client"
import type { DueDiligenceStatement, CreateDueDiligenceStatementData, StatementStatus } from "@/types"

export function useDueDiligence() {
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

  // tRPC queries and mutations
  const { data: statements = [], isLoading, refetch } = trpc.dueDiligenceStatement.list.useQuery()
  const createMutation = trpc.dueDiligenceStatement.create.useMutation()
  const updateMutation = trpc.dueDiligenceStatement.update.useMutation()
  const deleteMutation = trpc.dueDiligenceStatement.delete.useMutation()
  const submitMutation = trpc.dueDiligenceStatement.submit.useMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingStatement) {
        await updateMutation.mutateAsync({ id: editingStatement.id, data: formData })
        toast({
          title: "Success",
          description: "Due diligence statement updated successfully",
        })
      } else {
        await createMutation.mutateAsync({
          ...formData,
          statement_number: `DDS-${Date.now()}`,
        })
        toast({
          title: "Success",
          description: "Due diligence statement created successfully",
        })
      }
      resetForm()
      refetch()
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
      await deleteMutation.mutateAsync({ id })
      toast({
        title: "Success",
        description: "Due diligence statement deleted successfully",
      })
      refetch()
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
      await submitMutation.mutateAsync({ id })
      toast({
        title: "Success",
        description: "Due diligence statement submitted successfully",
      })
      refetch()
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

// Additional granular hooks for specific use cases
export function useDueDiligenceStatements(params?: {
  limit?: number
  offset?: number
  search?: string
  status?: "draft" | "submitted" | "approved" | "rejected"
}) {
  return trpc.dueDiligenceStatement.list.useQuery(params)
}

export function useDueDiligenceStatement(id: string) {
  return trpc.dueDiligenceStatement.get.useQuery({ id }, { enabled: !!id })
}

export function useCreateDueDiligenceStatement() {
  const utils = trpc.useUtils()

  return trpc.dueDiligenceStatement.create.useMutation({
    onSuccess: () => {
      utils.dueDiligenceStatement.list.invalidate()
    },
  })
}

export function useUpdateDueDiligenceStatement() {
  const utils = trpc.useUtils()

  return trpc.dueDiligenceStatement.update.useMutation({
    onSuccess: () => {
      utils.dueDiligenceStatement.list.invalidate()
    },
  })
}

export function useDeleteDueDiligenceStatement() {
  const utils = trpc.useUtils()

  return trpc.dueDiligenceStatement.delete.useMutation({
    onSuccess: () => {
      utils.dueDiligenceStatement.list.invalidate()
    },
  })
}

export function useSubmitDueDiligenceStatement() {
  const utils = trpc.useUtils()

  return trpc.dueDiligenceStatement.submit.useMutation({
    onSuccess: () => {
      utils.dueDiligenceStatement.list.invalidate()
    },
  })
}
