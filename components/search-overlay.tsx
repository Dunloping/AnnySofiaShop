"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, X, ArrowRight, PackageSearch } from "lucide-react"
import { useCatalogProducts } from "@/lib/catalog"
import { formatPrice } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const products = useCatalogProducts()

  // Debounce the query
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 180)
    return () => clearTimeout(t)
  }, [query])

  // Focus input on open + return focus to trigger on close
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = "unset"
      }
    }
  }, [isOpen])

  // Lock scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Reset query on open
  useEffect(() => {
    if (isOpen) setQuery("")
  }, [isOpen])

  const results = debouncedQuery.trim()
    ? products
        .filter((p) => {
          const q = debouncedQuery.toLowerCase()
          return (
            p.name.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
          )
        })
        .slice(0, 8)
    : []

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 p-4 pt-[10vh]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Buscar productos"
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-luxe animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose()
            }}
            placeholder="Buscar productos, categorías..."
            className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={onClose}
            aria-label="Cerrar búsqueda"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {debouncedQuery.trim() === "" ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              Escribe para buscar en la tienda
            </p>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
              <PackageSearch className="h-10 w-10 text-muted" />
              <p className="font-medium text-gray-900">Sin resultados</p>
              <p className="text-sm text-muted-foreground">
                No encontramos nada para &quot;{debouncedQuery}&quot;
              </p>
            </div>
          ) : (
            <ul className="space-y-1">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/producto/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted"
                  >
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-rose-600">
                        {product.category}
                      </p>
                    </div>
                    <span className="flex-shrink-0 text-sm font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              ))}
              {results.length >= 8 && (
                <li className="px-3 py-2 text-center">
                  <Link
                    href={`/tienda?search=${encodeURIComponent(debouncedQuery)}`}
                    onClick={onClose}
                    className="text-sm font-medium text-rose-600 hover:underline"
                  >
                    Ver todos los resultados
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
