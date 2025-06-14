"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
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
          <TableHead>Origin Location</TableHead>
          <TableHead>Volume</TableHead>
          <TableHead>Harvest Date</TableHead>
          <TableHead>Risk Level</TableHead>
          <TableHead>Certificate</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rawMaterials.map((material) => (
          <TableRow key={material.id}>
            <TableCell className="font-medium">{material.name}</TableCell>
            <TableCell>{material.type}</TableCell>
            <TableCell>{material.origin_location}</TableCell>
            <TableCell>
              {material.volume} {material.unit}
            </TableCell>
            <TableCell>{material.harvest_date}</TableCell>
            <TableCell>
              <Badge className={getRiskBadgeColor(material.risk_assessment)}>{material.risk_assessment}</Badge>
            </TableCell>
            <TableCell>{material.sustainability_certificate || "N/A"}</TableCell>
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
