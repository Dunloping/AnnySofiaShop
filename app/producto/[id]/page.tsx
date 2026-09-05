"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Share2, ArrowLeft, Check, Truck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartContext } from "@/components/cart-provider"
import { useCatalogProducts } from "@/lib/catalog"
import { getStockForSize, getAvailableStock } from "@/lib/store"
import { formatPrice, cn } from "@/lib/utils"
import { ProductCard } from "@/components/product-card"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>()
  const [selectedColor, setSelectedColor] = useState<string | undefined>()
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem, openCart, items } = useCartContext()
  const products = useCatalogProducts()

  const product = products.find((p) => p.id === id)
  const availableStock = product
    ? getAvailableStock(product, selectedSize, items)
    : 0

  // Initialize selected options
  useEffect(() => {
    if (product) {
      if (product.sizes?.length) setSelectedSize(product.sizes[0])
      if (product.colors?.length) setSelectedColor(product.colors[0])
    }
  }, [product])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Producto no encontrado
        </h1>
        <p className="text-muted-foreground mb-8">
          El producto que buscas no existe o ha sido removido.
        </p>
        <Link href="/tienda">
          <Button className="bg-rose-600 hover:bg-rose-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la tienda
          </Button>
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (availableStock <= 0) return
    const qty = Math.min(quantity, availableStock)
    addItem(product, qty, selectedSize, selectedColor)
    openCart()
  }

  // Get related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-rose-600 transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/tienda" className="hover:text-rose-600 transition-colors">
          Tienda
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
            <Image
              src={
                product.images?.[activeImage] ??
                product.image
              }
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {(product.images?.length ?? 0) > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden bg-secondary border-2 transition-all ${
                    activeImage === index
                      ? "border-rose-600"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - vista ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-6">
          {/* Title and price */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700">
                {product.category}
              </span>
              {product.inStock ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  En stock
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600">
                  Agotado
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold text-foreground">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">Descripción</h3>
            <p className="text-foreground/60 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Talla</h3>
                {selectedSize && (
                  <span className="text-sm text-muted-foreground">
                    {getAvailableStock(product, selectedSize, items) > 0
                      ? `${getAvailableStock(product, selectedSize, items)} disponibles`
                      : "Agotada"}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const stock = getAvailableStock(product, size, items)
                  const disabled = stock <= 0
                  return (
                    <button
                      key={size}
                      onClick={() => !disabled && setSelectedSize(size)}
                      disabled={disabled}
                      className={`relative px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedSize === size
                          ? "border-accent bg-accent text-white"
                          : disabled
                          ? "border-border opacity-40 cursor-not-allowed"
                          : "border-border hover:border-foreground/30"
                      }`}
                    >
                      {size}
                      {!disabled && stock <= 3 && (
                        <span className="absolute -top-1.5 -right-1.5 rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white">
                          {stock}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedColor === color
                        ? "border-accent bg-accent text-white"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Cantidad</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-secondary transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
                  className="px-4 py-2 hover:bg-secondary transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.inStock ? "En stock" : "Agotado"}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="flex-1 bg-accent hover:bg-amber-600 text-white"
              onClick={handleAddToCart}
              disabled={availableStock <= 0}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {availableStock > 0 ? "Agregar al carrito" : "Agotado"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsFavorite(!isFavorite)}
              className={isFavorite ? "border-accent text-accent" : ""}
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Shipping info */}
          <div className="rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-rose-100">
                <Truck className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  Envío a todo Venezuela
                </h4>
                <p className="text-sm text-muted-foreground">
                  Envío nacional o retiro en tienda. Costo según ubicación.
                </p>
              </div>
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5 text-sm text-foreground/80">
              <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span>Compra segura</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5 text-sm text-foreground/80">
              <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span>Devolución fácil</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <Check className="h-4 w-4 text-green-600" />
              <span>Pago contra entrega</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5 text-sm text-foreground/80">
              <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span>Atención personalizada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="h-5 w-5 text-rose-600" />
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Productos relacionados
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
