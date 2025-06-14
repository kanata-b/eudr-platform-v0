"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Check, X } from "lucide-react"
import type { RawMaterial } from "@/types"

interface RawMaterialTableProps {
  rawMaterials: RawMaterial[]
  onEdit: (material: RawMaterial) => void
  onDelete: (id: string) => void
  getRiskBadgeColor: (risk: string) => string
}

export function RawMaterialTable({ rawMaterials, onEdit, onDelete, getRiskBadgeColor }: RawMaterialTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Origin</TableHead>
          <TableHead>Risk Level</TableHead>
          <TableHead>Certified</TableHead>
          <TableHead>Harvest Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rawMaterials.map((material) => (
          <TableRow key={material.id}>
            <TableCell className="font-medium">{material.name}</TableCell>
            <TableCell>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 capitalize">
                {material.type}
              </Badge>
            </TableCell>
            <TableCell>
              {material.quantity} {material.unit}
            </TableCell>
            <TableCell>{material.origin_country}</TableCell>
            <TableCell>
              <Badge className={getRiskBadgeColor(material.risk_level)}>{material.risk_level}</Badge>
            </TableCell>
            <TableCell>
              {material.sustainability_certificate ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <X className="h-4 w-4 text-gray-400" />
              )}
            </TableCell>
            <TableCell>{material.harvest_date}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(material)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(material.id)}>
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
