"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { getProductsByCategory, categories } from "@/lib/products"

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const category = categories.find((c) => c.id === id)
  const products = getProductsByCategory(id)

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Categoría no encontrada
        </h1>
        <Link href="/categorias">
          <Button className="bg-rose-600 hover:bg-rose-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ver categorías
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-rose-600 transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/categorias" className="hover:text-rose-600 transition-colors">
          Categorías
        </Link>
        <span>/</span>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-6xl mb-4 block">{category.icon}</span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {category.name}
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Explora nuestra colección de {category.name.toLowerCase()}
        </p>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">
            No hay productos en esta categoría
          </p>
          <Link href="/tienda">
            <Button className="bg-rose-600 hover:bg-rose-700">
              Ver todos los productos
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
