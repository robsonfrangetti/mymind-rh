"use client"

import { Scale } from "lucide-react"

export default function LegislationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Legislação</h1>
        <p className="text-gray-600">
          Consulte informações sobre legislação trabalhista
        </p>
      </div>

      <div className="rounded-lg bg-white p-12 text-center shadow">
        <Scale className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Funcionalidade em desenvolvimento
        </h3>
        <p className="mt-2 text-gray-500">
          Esta seção será implementada em breve.
        </p>
      </div>
    </div>
  )
}
