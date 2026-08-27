"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Star } from "lucide-react"
import { useCartContext } from "@/components/cart-provider"
import { Product } from "@/lib/store"
import { formatPrice } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  rating?: number
  reviews?: number
  isNew?: boolean
  discount?: number
}

export function ProductCard({
  product,
  rating = 4.7,
  reviews = 40,
  isNew = false,
  discount = 0,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem, openCart } = useCartContext()

  const discountedPrice =
    discount > 0 ? product.price * (1 - discount / 100) : product.price

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({ ...product, name: product.name }, 1)
    openCart()
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Link href={`/producto/${product.id}`} className="block h-full">
      <div
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-luxe hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <span className="rounded-full bg-rose-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                -{discount}%
              </span>
            )}
            {isNew ? (
              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-rose-700 shadow-sm backdrop-blur">
                Nuevo
              </span>
            ) : null}
          </div>

          {/* Floating add-to-cart */}
          <div
            className={cn(
              "absolute inset-x-3 bottom-3 transition-all duration-300",
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            )}
          >
            <button
              onClick={handleAddToCart}
              className="btn-shine flex w-full items-center justify-center gap-2 rounded-full bg-gray-900/90 py-2.5 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-gray-900"
            >
              <ShoppingCart className="h-4 w-4" />
              Agregar
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col p-3.5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] font-medium uppercase tracking-wide text-rose-600">
              {product.category}
            </p>
            <button
              onClick={handleToggleFavorite}
              aria-label="Favorito"
              className="text-muted-foreground transition-colors hover:text-rose-600"
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isFavorite && "fill-rose-600 text-rose-600"
                )}
              />
            </button>
          </div>

          <h3 className="font-display text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-rose-700 transition-colors">
            {product.name}
          </h3>

          <div className="mt-1 flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i <= Math.round(rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">
              ({reviews})
            </span>
          </div>

          <div className="mt-auto flex items-baseline gap-2 pt-2.5">
            <span className="font-serif text-lg font-semibold text-gray-900">
              {formatPrice(discountedPrice)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
