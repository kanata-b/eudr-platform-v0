"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Users,
  Package,
  Shield,
  FileText,
  BarChart3,
  Globe,
  Leaf,
  Building2,
} from "lucide-react"

export function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200">EUDR Compliance Dashboard</h1>
          <p className="text-green-600 dark:text-green-400 mt-1">
            Monitor your supply chain compliance status and risk assessment
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
            Last Updated: 2 hours ago
          </Badge>
          <Button className="bg-green-600 hover:bg-green-700 text-white">Generate Report</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Compliance Score</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">87%</div>
            <div className="flex items-center space-x-2 mt-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <p className="text-xs text-green-600 dark:text-green-400">+5% from last month</p>
            </div>
            <Progress value={87} className="mt-3 bg-green-100 dark:bg-green-800" />
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Active Suppliers</CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">24</div>
            <div className="flex items-center space-x-2 mt-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <p className="text-xs text-green-600 dark:text-green-400">+2 new this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Risk Assessments</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">12</div>
            <div className="flex items-center space-x-2 mt-2">
              <TrendingDown className="h-4 w-4 text-amber-600" />
              <p className="text-xs text-amber-600 dark:text-amber-400">3 pending review</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Verified Origins</CardTitle>
            <Globe className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">156</div>
            <div className="flex items-center space-x-2 mt-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <p className="text-xs text-green-600 dark:text-green-400">98% verified</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Compliance Overview */}
        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-green-600" />
              Compliance Overview
            </CardTitle>
            <CardDescription className="text-green-600 dark:text-green-400">
              Current status across all compliance areas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700 dark:text-green-300">Due Diligence</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Complete</Badge>
              </div>
              <Progress value={100} className="bg-green-100 dark:bg-green-800" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700 dark:text-green-300">Risk Assessment</span>
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100">In Progress</Badge>
              </div>
              <Progress value={75} className="bg-green-100 dark:bg-green-800" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700 dark:text-green-300">Documentation</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Complete</Badge>
              </div>
              <Progress value={95} className="bg-green-100 dark:bg-green-800" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700 dark:text-green-300">Supplier Verification</span>
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100">Pending</Badge>
              </div>
              <Progress value={60} className="bg-green-100 dark:bg-green-800" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-green-600" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-green-600 dark:text-green-400">
              Latest updates and actions in your supply chain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    New supplier verification completed for <strong>Amazon Forest Co.</strong>
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Risk assessment flagged for <strong>Palm Oil Batch #2024-001</strong>
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">4 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Due diligence report generated for <strong>Q4 2024</strong>
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    New origin location added: <strong>Sustainable Farm, Brazil</strong>
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
            <Leaf className="mr-2 h-5 w-5 text-green-600" />
            Quick Actions
          </CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            Common tasks and shortcuts for EUDR compliance management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-auto p-4 bg-green-600 hover:bg-green-700 text-white flex flex-col items-center space-y-2">
              <Users className="h-6 w-6" />
              <span>Add Supplier</span>
            </Button>
            <Button className="h-auto p-4 bg-green-600 hover:bg-green-700 text-white flex flex-col items-center space-y-2">
              <Package className="h-6 w-6" />
              <span>New Product</span>
            </Button>
            <Button className="h-auto p-4 bg-green-600 hover:bg-green-700 text-white flex flex-col items-center space-y-2">
              <Shield className="h-6 w-6" />
              <span>Risk Assessment</span>
            </Button>
            <Button className="h-auto p-4 bg-green-600 hover:bg-green-700 text-white flex flex-col items-center space-y-2">
              <FileText className="h-6 w-6" />
              <span>Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
