"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Building2, Users, Package, Truck, MapPin, Shield, FileText, Leaf, ChevronRight } from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
    badge: null,
  },
  {
    name: "Organizations",
    href: "/organizations",
    icon: Building2,
    badge: null,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
    badge: "12",
  },
  {
    name: "Suppliers",
    href: "/suppliers",
    icon: Truck,
    badge: "8",
  },
  {
    name: "Products",
    href: "/products",
    icon: Package,
    badge: null,
  },
  {
    name: "Raw Materials",
    href: "/raw-materials",
    icon: Leaf,
    badge: "3",
  },
  {
    name: "Origins",
    href: "/origins",
    icon: MapPin,
    badge: null,
  },
  {
    name: "Due Diligence",
    href: "/due-diligence",
    icon: FileText,
    badge: "5",
  },
  {
    name: "Risk Assessment",
    href: "/risk-assessment",
    icon: Shield,
    badge: "2",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white/90 dark:bg-green-900/90 backdrop-blur-sm border-r border-green-200 dark:border-green-800">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-green-800 dark:text-green-200">Supply Chain</h2>
              <p className="text-xs text-green-600 dark:text-green-400">Compliance Hub</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-10 px-3",
                      isActive
                        ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700"
                        : "text-green-700 hover:bg-green-50 hover:text-green-800 dark:text-green-300 dark:hover:bg-green-800/50",
                    )}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.badge && <Badge className="ml-auto bg-green-600 text-white text-xs">{item.badge}</Badge>}
                    {isActive && <ChevronRight className="ml-2 h-4 w-4" />}
                  </Button>
                </Link>
              )
            })}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-green-200 dark:border-green-800">
          <div className="bg-green-50 dark:bg-green-900/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">Compliance Status</span>
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">
              <div className="flex justify-between mb-1">
                <span>EUDR Ready</span>
                <span className="font-medium">87%</span>
              </div>
              <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-1.5">
                <div className="bg-green-600 h-1.5 rounded-full" style={{ width: "87%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
