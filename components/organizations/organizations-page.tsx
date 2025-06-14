"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { OrganizationTable } from "./organization-table"
import { OrganizationForm } from "./organization-form"
import { useOrganizations } from "@/hooks/use-organizations"
import { Building2, Plus, Search, Filter, Download } from "lucide-react"

export function OrganizationsPage() {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { organizations, isLoading } = useOrganizations()

  const filteredOrganizations = organizations?.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200 flex items-center">
            <Building2 className="mr-3 h-8 w-8 text-green-600" />
            Organizations
          </h1>
          <p className="text-green-600 dark:text-green-400 mt-1">
            Manage your business partners and organizational relationships
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
            {organizations?.length || 0} Total Organizations
          </Badge>
          <Button onClick={() => setShowForm(true)} className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Organization
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
              Total Organizations
            </CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">{organizations?.length || 0}</div>
            <p className="text-xs text-green-600 dark:text-green-400">Active partnerships</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Suppliers</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {organizations?.filter((org) => org.type === "supplier").length || 0}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Supply chain partners</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Customers</CardTitle>
            <Building2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {organizations?.filter((org) => org.type === "customer").length || 0}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Business customers</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Partners</CardTitle>
            <Building2 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {organizations?.filter((org) => org.type === "partner").length || 0}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Strategic alliances</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">Search & Filter</CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            Find organizations by name, type, or other criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
              <Input
                placeholder="Search organizations..."
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

      {/* Organizations Table */}
      <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">Organizations Directory</CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            Complete list of all registered organizations and their details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrganizationTable organizations={filteredOrganizations || []} isLoading={isLoading} />
        </CardContent>
      </Card>

      {/* Organization Form Modal */}
      {showForm && <OrganizationForm onClose={() => setShowForm(false)} />}
    </div>
  )
}
