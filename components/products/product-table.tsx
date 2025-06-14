"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Check, X } from "lucide-react"
import type { Product } from "@/types"

interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Origin</TableHead>
          <TableHead>EUDR Compliant</TableHead>
          <TableHead>Certification</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.sku}</TableCell>
            <TableCell>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 capitalize">
                {product.category}
              </Badge>
            </TableCell>
            <TableCell>
              {product.weight} {product.weight_unit}
            </TableCell>
            <TableCell>{product.origin_country}</TableCell>
            <TableCell>
              {product.eudr_compliant ? (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  <Check className="h-3 w-3 mr-1" />
                  Compliant
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                  <X className="h-3 w-3 mr-1" />
                  Non-compliant
                </Badge>
              )}
            </TableCell>
            <TableCell>
              {product.certification ? (
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                  {product.certification}
                </Badge>
              ) : (
                <span className="text-gray-400">None</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(product.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
