"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Calendar,
  Plane,
  AlertTriangle,
  Pause,
  UserX,
  FileText,
  Receipt,
  Scale,
  LogOut
} from "lucide-react"

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Funcionários", href: "/employees", icon: Users },
  { name: "Aniversários", href: "/birthdays", icon: Calendar },
  { name: "Férias", href: "/vacations", icon: Plane },
  { name: "Advertência", href: "/warnings", icon: AlertTriangle },
  { name: "Suspensão", href: "/suspensions", icon: Pause },
  { name: "Demissão", href: "/dismissals", icon: UserX },
  { name: "Contrato de Trabalho", href: "/contracts", icon: FileText },
  { name: "Lançamentos", href: "/entries", icon: Receipt },
  { name: "Legislação", href: "/legislation", icon: Scale },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-700">
        <h1 className="text-xl font-bold">mymindRH</h1>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
      
      <div className="border-t border-gray-700 p-4">
        <button className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
          <LogOut className="h-5 w-5" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  )
}
