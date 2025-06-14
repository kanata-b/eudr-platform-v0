import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Globe, BarChart3, Users, FileText } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="EUDR Platform Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-bold text-green-800 dark:text-green-200">EUDR Platform</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-green-700 hover:text-green-800 dark:text-green-300">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
            EU Deforestation Regulation Compliance
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Streamline Your Supply Chain Compliance
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Ensure EUDR compliance with our comprehensive platform for tracking, managing, and reporting on your supply
            chain's deforestation risk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need for EUDR Compliance
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform provides comprehensive tools to manage your supply chain and ensure compliance with EU
            Deforestation Regulation requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <Shield className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>
                Comprehensive risk analysis for all your supply chain partners and materials.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <Globe className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Origin Tracking</CardTitle>
              <CardDescription>Track the geographic origin of your raw materials with precision.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <FileText className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Due Diligence</CardTitle>
              <CardDescription>Automated due diligence processes to ensure regulatory compliance.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Compliance Dashboard</CardTitle>
              <CardDescription>Real-time insights and reporting on your compliance status.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <Users className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Supplier Management</CardTitle>
              <CardDescription>Manage and monitor all your suppliers and their compliance status.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CheckCircle className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Automated Reporting</CardTitle>
              <CardDescription>Generate compliance reports automatically for regulatory submissions.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-green-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Ensure EUDR Compliance?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of companies already using our platform to manage their supply chain compliance.
          </p>
          <Link href="/auth/signin">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-green-200 dark:border-green-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="EUDR Platform Logo" width={24} height={24} className="rounded-full" />
            <span className="text-sm text-gray-600 dark:text-gray-400">© 2024 EUDR Platform. All rights reserved.</span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <Link href="#" className="hover:text-green-600">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-green-600">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-green-600">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
