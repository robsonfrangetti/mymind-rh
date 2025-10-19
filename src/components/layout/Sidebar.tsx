'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/employees', label: 'Funcionários', icon: '👥' },
  { href: '/birthdays', label: 'Aniversários', icon: '🎂' },
  { href: '/vacations', label: 'Férias', icon: '🏖️' },
  { href: '/warnings', label: 'Advertência', icon: '⚠️' },
  { href: '/suspensions', label: 'Suspensão', icon: '⏸️' },
  { href: '/dismissals', label: 'Demissão', icon: '🚪' },
  { href: '/contracts', label: 'Contrato de Trabalho', icon: '📄' },
  { href: '/entries', label: 'Lançamentos', icon: '💰' },
  { href: '/legislation', label: 'Legislação', icon: '📚' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">mymindRH</h1>
        <p className="text-gray-400 text-sm">Sistema de Gestão de RH</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      
      <div className="mt-8 pt-4 border-t border-gray-700">
        <Link
          href="/logout"
          className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <span className="text-lg">🚪</span>
          <span>Sair</span>
        </Link>
      </div>
    </div>
  )
}