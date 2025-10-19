"use client"

import { Button } from "@/components/ui/button"
import { Plus, FileText } from "lucide-react"

export default function ContractsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contratos de Trabalho</h1>
          <p className="text-gray-600">
            Gerencie os contratos dos funcionários
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Novo Contrato</span>
        </Button>
      </div>

      <div className="rounded-lg bg-white p-12 text-center shadow">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
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
