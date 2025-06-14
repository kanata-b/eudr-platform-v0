import { trpc } from "@/lib/trpc-client"

export function useOrigins(params?: {
  limit?: number
  offset?: number
  search?: string
}) {
  return trpc.origin.list.useQuery(params)
}

export function useOrigin(id: string) {
  return trpc.origin.get.useQuery({ id }, { enabled: !!id })
}

export function useCreateOrigin() {
  const utils = trpc.useUtils()

  return trpc.origin.create.useMutation({
    onSuccess: () => {
      utils.origin.list.invalidate()
    },
  })
}

export function useUpdateOrigin() {
  const utils = trpc.useUtils()

  return trpc.origin.update.useMutation({
    onSuccess: () => {
      utils.origin.list.invalidate()
    },
  })
}

export function useDeleteOrigin() {
  const utils = trpc.useUtils()

  return trpc.origin.delete.useMutation({
    onSuccess: () => {
      utils.origin.list.invalidate()
    },
  })
}
