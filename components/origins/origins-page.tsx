"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { OriginTable } from "./origin-table"
import { OriginForm } from "./origin-form"
import { useOrigins } from "@/hooks/use-origins"
import { MapPin, Plus, Search, Filter, Download, Globe, Shield, Leaf, AlertTriangle } from "lucide-react"

export function OriginsPage() {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const {
    origins,
    isLoading,
    isDialogOpen,
    editingOrigin,
    formData,
    handleSubmit,
    handleEdit,
    handleDelete,
    openCreateDialog,
    setIsDialogOpen,
    setFormData,
    getRiskBadgeColor,
    isEditing,
  } = useOrigins()

  const filteredOrigins = origins?.filter(
    (origin) =>
      origin.location_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      origin.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      origin.region.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200 flex items-center">
            <MapPin className="mr-3 h-8 w-8 text-green-600" />
            Origins
          </h1>
          <p className="text-green-600 dark:text-green-400 mt-1">
            Track and verify the geographical origins of your raw materials
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
            {origins?.length || 0} Verified Origins
          </Badge>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog} className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Origin
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{isEditing ? "Edit Origin" : "Add Origin"}</DialogTitle>
                <DialogDescription>
                  {isEditing ? "Update origin information" : "Add a new geographical origin location"}
                </DialogDescription>
              </DialogHeader>
              <OriginForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} isEditing={isEditing} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Origins</CardTitle>
            <Globe className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">{origins?.length || 0}</div>
            <p className="text-xs text-green-600 dark:text-green-400">Verified locations</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Protected Areas</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {origins?.filter((o) => o.protected_area).length || 0}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Conservation zones</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">High Risk Areas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {origins?.filter((o) => o.deforestation_risk === "high").length || 0}
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400">Require monitoring</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Forest Coverage</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {origins?.length > 0
                ? Math.round(origins.reduce((sum, o) => sum + (o.forest_coverage || 0), 0) / origins.length)
                : 0}
              %
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Average coverage</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">Search & Filter</CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            Find origins by location, country, or risk level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
              <Input
                placeholder="Search origins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Origins Table */}
      <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">Origins Directory</CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            Complete list of all verified geographical origins
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OriginTable
            origins={filteredOrigins || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
            getRiskBadgeColor={getRiskBadgeColor}
          />
        </CardContent>
      </Card>
    </div>
  )
}
