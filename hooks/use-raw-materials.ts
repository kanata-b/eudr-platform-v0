import { trpc } from "@/lib/trpc-client"

export function useRawMaterials(params?: {
  limit?: number
  offset?: number
  search?: string
}) {
  return trpc.rawMaterial.list.useQuery(params)
}

export function useRawMaterial(id: string) {
  return trpc.rawMaterial.get.useQuery({ id }, { enabled: !!id })
}

export function useCreateRawMaterial() {
  const utils = trpc.useUtils()

  return trpc.rawMaterial.create.useMutation({
    onSuccess: () => {
      utils.rawMaterial.list.invalidate()
    },
  })
}

export function useUpdateRawMaterial() {
  const utils = trpc.useUtils()

  return trpc.rawMaterial.update.useMutation({
    onSuccess: () => {
      utils.rawMaterial.list.invalidate()
    },
  })
}

export function useDeleteRawMaterial() {
  const utils = trpc.useUtils()

  return trpc.rawMaterial.delete.useMutation({
    onSuccess: () => {
      utils.rawMaterial.list.invalidate()
    },
  })
}
