"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Save, RotateCcw, Check, Search, Package, Boxes, AlertTriangle, Sparkles, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCatalogProducts } from "@/lib/catalog"
import { useAdmin } from "@/lib/admin-store"
import { categories } from "@/lib/products"
import { formatPrice, cn } from "@/lib/utils"
import { Product, getStockForSize } from "@/lib/store"

type StockFilter = "todos" | "disponibles" | "agotados"

export default function AdminPage() {
  const products = useCatalogProducts()
  const { resetAll, isModified } = useAdmin()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("todos")
  const [stockFilter, setStockFilter] = useState<StockFilter>("todos")

  const stats = useMemo(() => {
    const total = products.length
    const available = products.filter((p) => p.inStock).length
    const soldOut = total - available
    const modified = products.filter((p) => isModified(p.id)).length
    return { total, available, soldOut, modified }
  }, [products, isModified])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesCategory =
        categoryFilter === "todos" || p.category === categoryFilter
      const matchesStock =
        stockFilter === "todos" ||
        (stockFilter === "disponibles" && p.inStock) ||
        (stockFilter === "agotados" && !p.inStock)
      return matchesSearch && matchesCategory && matchesStock
    })
  }, [products, searchQuery, categoryFilter, stockFilter])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <span className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-luxe text-accent">
                Administración
              </span>
              <h1 className="font-serif text-3xl font-semibold text-foreground">
                Panel de Productos
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Gestión de catálogo, precios y stock.
              </p>
            </div>
            <Button
              onClick={resetAll}
              variant="outline"
              className="border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Restablecer todos
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Dashboard stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Boxes}
            label="Total productos"
            value={stats.total}
            accent="text-foreground"
          />
          <StatCard
            icon={Package}
            label="Disponibles"
            value={stats.available}
            accent="text-accent"
          />
          <StatCard
            icon={AlertTriangle}
            label="Agotados"
            value={stats.soldOut}
            accent="text-red-400"
          />
          <StatCard
            icon={Pencil}
            label="Editados"
            value={stats.modified}
            accent="text-amber-400"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2.5 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          >
            <option value="todos">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as StockFilter)}
            className="w-full px-3 py-2.5 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          >
            <option value="todos">Todo el stock</option>
            <option value="disponibles">Disponibles</option>
            <option value="agotados">Agotados</option>
          </select>
        </div>

        {/* Products list */}
        <div className="grid grid-cols-1 gap-4">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card py-16 text-center">
              <Package className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-foreground font-medium">Sin resultados</p>
              <p className="text-muted-foreground text-sm">
                Ajusta los filtros para ver productos.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
            </p>
          )}
          {filtered.map((product) => (
            <ProductEditor key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Boxes
  label: string
  value: number
  accent: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className={cn("rounded-xl bg-secondary p-2.5", accent)}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-semibold text-foreground leading-none">
            {value}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{label}</p>
        </div>
      </div>
    </div>
  )
}

function ProductEditor({ product }: { product: Product }) {
  const { updateProduct, resetProduct, isModified } = useAdmin()
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(String(product.price))
  const [category, setCategory] = useState(product.category)
  const [sizes, setSizes] = useState<string[]>(() => [...(product.sizes ?? [])])
  const [colors, setColors] = useState<string[]>(() => [...(product.colors ?? [])])
  const [inventory, setInventory] = useState<Record<string, number>>(
    () => product.inventory ?? {}
  )
  const [description, setDescription] = useState(product.description ?? "")
  const [saved, setSaved] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [newSize, setNewSize] = useState("")
  const [newColor, setNewColor] = useState("")
  const [modified, setModified] = useState(false)

  const totalStock = Object.values(inventory).reduce((a, b) => a + b, 0)

  const markModified = () => setModified(true)

  const save = () => {
    const inv = { ...inventory }
    sizes.forEach((s) => {
      if (inv[s] === undefined) inv[s] = 0
    })
    updateProduct(product.id, {
      name,
      price: parseFloat(price) || 0,
      category,
      sizes: sizes.length > 0 ? sizes : undefined,
      colors: colors.length > 0 ? colors : undefined,
      inStock: totalStock > 0,
      inventory: inv,
      description: description.trim() || undefined,
    })
    setSaved(true)
    setModified(false)
    setTimeout(() => setSaved(false), 1500)
  }

  const reset = () => {
    resetProduct(product.id)
    setName(product.name)
    setPrice(String(product.price))
    setCategory(product.category)
    setSizes([...(product.sizes ?? [])])
    setColors([...(product.colors ?? [])])
    setInventory(product.inventory ?? {})
    setDescription(product.description ?? "")
    setModified(false)
  }

  const addSize = () => {
    const s = newSize.trim()
    if (s && !sizes.includes(s)) {
      setSizes([...sizes, s])
      if (!(s in inventory)) setInventory((inv) => ({ ...inv, [s]: 0 }))
      setNewSize("")
      markModified()
    }
  }

  const removeSize = (s: string) => {
    setSizes((prev) => prev.filter((x) => x !== s))
    setInventory((inv) => {
      const copy = { ...inv }
      delete copy[s]
      return copy
    })
    markModified()
  }

  const addColor = () => {
    const c = newColor.trim()
    if (c && !colors.includes(c)) {
      setColors([...colors, c])
      setNewColor("")
      markModified()
    }
  }

  const removeColor = (c: string) => {
    setColors((prev) => prev.filter((x) => x !== c))
    markModified()
  }

  const inputClass =
    "w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-4 transition-colors",
        modified ? "border-accent/50" : "border-border"
      )}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="relative h-24 w-24 flex-shrink-0 rounded-xl overflow-hidden bg-secondary group"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
        </button>

        {/* Fields */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 items-start">
          <div className="lg:col-span-2">
            <label className="block text-xs text-muted-foreground mb-1">Nombre</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Precio ($)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Categoría</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Stock total: {totalStock}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sizes.length > 0 ? (
                sizes.map((s) => (
                  <div key={s} className="flex flex-col items-center gap-0.5">
                    <input
                      type="number"
                      min={0}
                      value={inventory[s] ?? 0}
                      onChange={(e) =>
                        setInventory((inv) => ({
                          ...inv,
                          [s]: Math.max(0, parseInt(e.target.value) || 0),
                        }))
                      }
                      className="w-12 px-1 py-1.5 bg-input border border-border rounded-md text-center text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                    <span className="text-[10px] text-muted-foreground">{s}</span>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center gap-0.5">
                  <input
                    type="number"
                    min={0}
                    value={totalStock}
                    onChange={(e) =>
                      setInventory({ único: Math.max(0, parseInt(e.target.value) || 0) })
                    }
                    className="w-12 px-1 py-1.5 bg-input border border-border rounded-md text-center text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <span className="text-[10px] text-muted-foreground">uds</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            {sizes.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
                {s}
                <button onClick={() => removeSize(s)} className="hover:text-red-400">×</button>
              </span>
            ))}
            <input
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSize()}
              placeholder="+ talla"
              className="w-14 px-1 py-0.5 bg-input border border-border rounded text-xs text-center focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        )}

        {/* Colors */}
        {colors.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            {colors.map((c) => (
              <span key={c} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs text-foreground/80">
                {c}
                <button onClick={() => removeColor(c)} className="hover:text-red-400">×</button>
              </span>
            ))}
            <input
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addColor()}
              placeholder="+ color"
              className="w-14 px-1 py-0.5 bg-input border border-border rounded text-xs text-center focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        )}

        {/* Add sizes/colors if empty */}
        {sizes.length === 0 && colors.length === 0 && (
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground">Tallas:</span>
              <input
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSize()}
                placeholder="Ej: S,M,L"
                className="w-20 px-1 py-0.5 bg-input border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <Button onClick={addSize} variant="ghost" size="sm" className="h-6 px-1 text-accent">+</Button>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground">Colores:</span>
              <input
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addColor()}
                placeholder="Ej: Rojo,Azul"
                className="w-20 px-1 py-0.5 bg-input border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <Button onClick={addColor} variant="ghost" size="sm" className="h-6 px-1 text-accent">+</Button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-start gap-2">
          <Button
            onClick={save}
            className={cn("text-white", saved ? "bg-green-600 hover:bg-green-600" : "bg-accent hover:bg-amber-600")}
          >
            {saved ? <Check className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            {saved ? "Guardado" : "Guardar"}
          </Button>
          {modified && (
            <Button variant="ghost" onClick={reset} title="Restablecer">
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={() => setExpanded((v) => !v)}
            title="Descripción"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Description editor */}
      {expanded && (
        <div className="mt-3 border-t border-border pt-3">
          <label className="block text-xs text-muted-foreground mb-1">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => { setDescription(e.target.value); markModified() }}
            rows={2}
            placeholder="Descripción del producto..."
            className={cn(inputClass, "resize-none")}
          />
        </div>
      )}
    </div>
  )
}
