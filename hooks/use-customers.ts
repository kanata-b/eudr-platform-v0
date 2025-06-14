import { trpc } from "@/lib/trpc-client"

export function useCustomers(params?: {
  limit?: number
  offset?: number
  search?: string
}) {
  return trpc.customer.list.useQuery(params)
}

export function useCustomer(id: string) {
  return trpc.customer.get.useQuery({ id }, { enabled: !!id })
}

export function useCreateCustomer() {
  const utils = trpc.useUtils()

  return trpc.customer.create.useMutation({
    onSuccess: () => {
      utils.customer.list.invalidate()
    },
  })
}

export function useUpdateCustomer() {
  const utils = trpc.useUtils()

  return trpc.customer.update.useMutation({
    onSuccess: () => {
      utils.customer.list.invalidate()
    },
  })
}

export function useDeleteCustomer() {
  const utils = trpc.useUtils()

  return trpc.customer.delete.useMutation({
    onSuccess: () => {
      utils.customer.list.invalidate()
    },
  })
}
