import { trpc } from "@/lib/trpc-client"

export function useProducts(params?: {
  limit?: number
  offset?: number
  search?: string
  category?: string
  risk_level?: "low" | "medium" | "high"
}) {
  return trpc.product.list.useQuery(params)
}

export function useProduct(id: string) {
  return trpc.product.get.useQuery({ id }, { enabled: !!id })
}

export function useCreateProduct() {
  const utils = trpc.useUtils()

  return trpc.product.create.useMutation({
    onSuccess: () => {
      utils.product.list.invalidate()
    },
  })
}

export function useUpdateProduct() {
  const utils = trpc.useUtils()

  return trpc.product.update.useMutation({
    onSuccess: () => {
      utils.product.list.invalidate()
    },
  })
}

export function useDeleteProduct() {
  const utils = trpc.useUtils()

  return trpc.product.delete.useMutation({
    onSuccess: () => {
      utils.product.list.invalidate()
    },
  })
}
