import { trpc } from "@/lib/trpc-client"

export function useSuppliers(params?: {
  limit?: number
  offset?: number
  search?: string
  verification_status?: "verified" | "pending" | "rejected"
  risk_level?: "low" | "medium" | "high"
}) {
  return trpc.supplier.list.useQuery(params)
}

export function useSupplier(id: string) {
  return trpc.supplier.get.useQuery({ id }, { enabled: !!id })
}

export function useCreateSupplier() {
  const utils = trpc.useUtils()

  return trpc.supplier.create.useMutation({
    onSuccess: () => {
      utils.supplier.list.invalidate()
    },
  })
}

export function useUpdateSupplier() {
  const utils = trpc.useUtils()

  return trpc.supplier.update.useMutation({
    onSuccess: () => {
      utils.supplier.list.invalidate()
    },
  })
}

export function useDeleteSupplier() {
  const utils = trpc.useUtils()

  return trpc.supplier.delete.useMutation({
    onSuccess: () => {
      utils.supplier.list.invalidate()
    },
  })
}
