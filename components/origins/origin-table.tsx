"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Check, X } from "lucide-react"
import type { Origin } from "@/types"

interface OriginTableProps {
  origins: Origin[]
  onEdit: (origin: Origin) => void
  onDelete: (id: string) => void
  getRiskBadgeColor: (risk: string) => string
}

export function OriginTable({ origins, onEdit, onDelete, getRiskBadgeColor }: OriginTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Location</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Region</TableHead>
          <TableHead>Land Use</TableHead>
          <TableHead>Forest Coverage</TableHead>
          <TableHead>Risk Level</TableHead>
          <TableHead>Protected</TableHead>
          <TableHead>Indigenous</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {origins.map((origin) => (
          <TableRow key={origin.id}>
            <TableCell className="font-medium">{origin.location_name}</TableCell>
            <TableCell>{origin.country}</TableCell>
            <TableCell>{origin.region}</TableCell>
            <TableCell className="capitalize">{origin.land_use_type}</TableCell>
            <TableCell>{origin.forest_coverage}%</TableCell>
            <TableCell>
              <Badge className={getRiskBadgeColor(origin.deforestation_risk)}>{origin.deforestation_risk}</Badge>
            </TableCell>
            <TableCell>
              {origin.protected_area ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <X className="h-4 w-4 text-gray-400" />
              )}
            </TableCell>
            <TableCell>
              {origin.indigenous_territory ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <X className="h-4 w-4 text-gray-400" />
              )}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(origin)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(origin.id)}>
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
