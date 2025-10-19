"use client"

import { Button } from "@/components/ui/button"
import { Plus, UserX } from "lucide-react"

export default function DismissalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Demissões</h1>
          <p className="text-gray-600">
            Gerencie as demissões dos funcionários
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nova Demissão</span>
        </Button>
      </div>

      <div className="rounded-lg bg-white p-12 text-center shadow">
        <UserX className="mx-auto h-12 w-12 text-gray-400" />
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
