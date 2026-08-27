"use client"

import { useState } from "react"
import Image from "next/image"
import { Save, RotateCcw, Check, Package, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCatalogProducts } from "@/lib/catalog"
import { useAdmin } from "@/lib/admin-store"
import { categories } from "@/lib/products"
import { formatPrice, cn } from "@/lib/utils"

export default function AdminPage() {
  const products = useCatalogProducts()
  const { updateProduct, resetProduct, resetAll } = useAdmin()
  const [savedId, setSavedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSave = (id: string) => {
    setSavedId(id)
    setTimeout(() => setSavedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Panel de Administración</h1>
              <p className="text-gray-400 text-sm mt-1">
                Gestiona productos, precios y stock. Los cambios se guardan en tu navegador.
              </p>
            </div>
            <Button
              onClick={resetAll}
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800 hover:text-white"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Restablecer todos
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Products list */}
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((product) => (
            <ProductEditor
              key={product.id}
              product={product}
              onSave={() => handleSave(product.id)}
              saved={savedId === product.id}
              onReset={() => resetProduct(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductEditor({
  product,
  onSave,
  saved,
  onReset,
}: {
  product: ReturnType<typeof useCatalogProducts>[number]
  onSave: () => void
  saved: boolean
  onReset: () => void
}) {
  const { updateProduct } = useAdmin()
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(String(product.price))
  const [category, setCategory] = useState(product.category)
  const [inStock, setInStock] = useState(product.inStock)

  const save = () => {
    updateProduct(product.id, {
      name,
      price: parseFloat(price) || 0,
      category,
      inStock,
    })
    onSave()
  }

  const inputClass =
    "w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent text-sm"

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row gap-4">
      {/* Image */}
      <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Fields */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 items-start">
        <div className="lg:col-span-2">
          <label className="block text-xs text-gray-500 mb-1">Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Precio ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Categoría</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Stock</label>
          <button
            onClick={() => setInStock(!inStock)}
            className={cn(
              "w-full px-3 py-2 rounded-lg text-sm font-medium border-2 transition-colors",
              inStock
                ? "border-green-500 text-green-600 bg-green-50"
                : "border-red-400 text-red-600 bg-red-50"
            )}
          >
            {inStock ? "● Disponible" : "○ Agotado"}
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 sm:self-center">
        <Button
          onClick={save}
          className={cn(
            "text-white",
            saved ? "bg-green-600 hover:bg-green-600" : "bg-rose-600 hover:bg-rose-700"
          )}
        >
          {saved ? <Check className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          {saved ? "Guardado" : "Guardar"}
        </Button>
        <Button variant="ghost" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
