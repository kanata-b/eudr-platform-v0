import { trpc } from "@/lib/trpc-client"

export function useRiskAssessments(params?: {
  limit?: number
  offset?: number
  search?: string
  status?: "draft" | "completed" | "approved" | "rejected"
  risk_level?: "low" | "medium" | "high"
}) {
  return trpc.riskAssessment.list.useQuery(params)
}

export function useRiskAssessment(id: string) {
  return trpc.riskAssessment.get.useQuery({ id }, { enabled: !!id })
}

export function useCreateRiskAssessment() {
  const utils = trpc.useUtils()

  return trpc.riskAssessment.create.useMutation({
    onSuccess: () => {
      utils.riskAssessment.list.invalidate()
    },
  })
}

export function useUpdateRiskAssessment() {
  const utils = trpc.useUtils()

  return trpc.riskAssessment.update.useMutation({
    onSuccess: () => {
      utils.riskAssessment.list.invalidate()
    },
  })
}

export function useDeleteRiskAssessment() {
  const utils = trpc.useUtils()

  return trpc.riskAssessment.delete.useMutation({
    onSuccess: () => {
      utils.riskAssessment.list.invalidate()
    },
  })
}
