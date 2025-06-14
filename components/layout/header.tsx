"use client"

import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { OfflineToggle } from "@/components/offline-toggle"
import { useAuth } from "@/lib/auth-context"
import Image from "next/image"

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white/80 dark:bg-green-900/80 backdrop-blur-sm border-b border-green-200 dark:border-green-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="EUDR Platform Logo" width={32} height={32} className="rounded-full" />
            <h1 className="text-lg font-semibold text-green-800 dark:text-green-200">EUDR Platform</h1>
          </div>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
            Compliance Dashboard
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64 border-green-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <OfflineToggle />
          <ThemeToggle />

          <Button
            variant="ghost"
            size="sm"
            className="relative text-green-700 hover:text-green-800 hover:bg-green-100 dark:text-green-300 dark:hover:bg-green-800"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 border-2 border-green-200">
                  <AvatarImage src="/placeholder-user.jpg" alt={user?.email || "User"} />
                  <AvatarFallback className="bg-green-100 text-green-800">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border-green-200" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-green-800 dark:text-green-200">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-xs leading-none text-green-600 dark:text-green-400">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-green-200" />
              <DropdownMenuItem className="text-green-700 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-800">
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-green-700 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-800">
                Compliance Reports
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-green-200" />
              <DropdownMenuItem
                className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900"
                onClick={() => logout()}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
