"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { categories } from "@/lib/products"
import { useCatalogProducts } from "@/lib/catalog"

export default function CategoriasPage() {
  const products = useCatalogProducts()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-14">
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-luxe text-rose-600">
          Explora
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
          Categorías
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Encuentra exactamente lo que buscas, organizado por tipo de producto.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.slice(1).map((category) => {
          const count = products.filter(
            (p) => p.category === category.id
          ).length
          return (
            <Link
              key={category.id}
              href={`/tienda?category=${category.id}`}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm group-hover:shadow-luxe group-hover:-translate-y-1 transition-all duration-300">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-white/70">
                    {count} {count === 1 ? "artículo" : "artículos"}
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-white">
                    {category.name}
                  </h2>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 backdrop-blur">
                    Ver productos <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
