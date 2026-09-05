"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { categories } from "@/lib/products"
import { useCatalogProducts } from "@/lib/catalog"
import { CategoryIcon } from "@/components/category-icon"

export default function CategoryPage({ params }: { params: { id: string } }) {
  const { id } = params
  const allProducts = useCatalogProducts()
  const category = categories.find((c) => c.id === id)
  const products = allProducts.filter((p) => p.category === id)

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">
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
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-rose-600 transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/categorias" className="hover:text-rose-600 transition-colors">
          Categorías
        </Link>
        <span>/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
          <CategoryIcon name={category.icon} className="h-8 w-8 text-accent" />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
          {category.name}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explora nuestra colección de {category.name.toLowerCase()}
        </p>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-4">
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
