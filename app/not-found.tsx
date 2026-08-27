"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <span className="text-8xl mb-6 block">🔍</span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Página no encontrada
        </h1>
        <p className="text-gray-500 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link href="/">
          <Button className="bg-rose-600 hover:bg-rose-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  )
}
