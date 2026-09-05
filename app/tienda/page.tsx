"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { categories } from "@/lib/products"
import { useCatalogProducts } from "@/lib/catalog"
import { CategoryIcon } from "@/components/category-icon"
import { cn } from "@/lib/utils"

export default function TiendaPage() {
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const adminProducts = useCatalogProducts()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get("category")
    const q = params.get("search")
    if (cat && categories.some((c) => c.id === cat)) {
      setSelectedCategory(cat)
    }
    if (q) {
      setSearchQuery(q)
    }
  }, [])

  const filteredProducts = useMemo(() => {
    let result = selectedCategory === "todos"
      ? adminProducts
      : adminProducts.filter((product) => product.category === selectedCategory)

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    // Sort products
    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Featured - keep original order
        break
    }

    return result
  }, [selectedCategory, searchQuery, sortBy, adminProducts])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Nuestra Tienda
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Descubre nuestra colección de moda femenina. Ropa, accesorios y todo lo
          que necesitas para lucir espectacular.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        {/* Sidebar filters */}
        <aside
          className={cn(
            "lg:w-64 flex-shrink-0",
            showFilters ? "block" : "hidden lg:block"
          )}
        >
          <div className="sticky top-24 space-y-6">
            {/* Search */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Buscar</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-foreground/40 hover:text-foreground/60" />
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Categorías</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2",
                      selectedCategory === category.id
                        ? "bg-rose-100 text-rose-600 font-medium"
                        : "hover:bg-secondary text-foreground/60"
                    )}
                  >
                    <CategoryIcon name={category.icon} className="h-4 w-4 flex-shrink-0" />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Ordenar por</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name">Nombre</option>
              </select>
            </div>

            {/* Clear filters */}
            {(selectedCategory !== "todos" || searchQuery) && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedCategory("todos")
                  setSearchQuery("")
                }}
              >
                Limpiar filtros
              </Button>
            )}
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Mostrando {filteredProducts.length} productos
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No se encontraron productos
              </p>
              <p className="text-foreground/40">
                Intenta con otros filtros o términos de búsqueda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
