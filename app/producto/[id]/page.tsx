"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Share2, ArrowLeft, Check, Truck, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartContext } from "@/components/cart-provider"
import { useCatalogProducts } from "@/lib/catalog"
import { formatPrice, cn } from "@/lib/utils"
import { ProductCard } from "@/components/product-card"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>()
  const [selectedColor, setSelectedColor] = useState<string | undefined>()
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem, openCart } = useCartContext()
  const products = useCatalogProducts()

  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Producto no encontrado
        </h1>
        <p className="text-gray-500 mb-8">
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

  // Initialize selected options
  if (!selectedSize && product.sizes?.length) {
    setSelectedSize(product.sizes[0])
  }
  if (!selectedColor && product.colors?.length) {
    setSelectedColor(product.colors[0])
  }

  const handleAddToCart = () => {
    addItem({
      ...product,
      sizes: selectedSize ? [selectedSize] : undefined,
      colors: selectedColor ? [selectedColor] : undefined,
    }, quantity)
    openCart()
  }

  // Get related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-rose-600 transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/tienda" className="hover:text-rose-600 transition-colors">
          Tienda
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
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
                  className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 transition-all ${
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

            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i <= 5 ? "fill-amber-400 text-amber-400" : "text-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-900">4.8</span>
              <span className="text-sm text-muted-foreground">
                ({Math.floor(product.price * 7) + 12} reseñas)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold text-gray-900">
                {formatPrice(product.price)}
              </span>
              <span className="rounded-full bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white">
                -15%
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price * 1.15)}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Talla</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedSize === size
                        ? "border-rose-600 bg-rose-50 text-rose-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedColor === color
                        ? "border-rose-600 bg-rose-50 text-rose-600"
                        : "border-gray-200 hover:border-gray-300"
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
            <h3 className="font-semibold text-gray-900 mb-3">Cantidad</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {product.inStock ? "En stock" : "Agotado"}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Agregar al carrito
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsFavorite(!isFavorite)}
              className={isFavorite ? "border-rose-600 text-rose-600" : ""}
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
                <h4 className="font-semibold text-gray-900">
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
            <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5 text-sm text-gray-700">
              <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span>Compra segura</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5 text-sm text-gray-700">
              <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span>Devolución fácil</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Check className="h-4 w-4 text-green-600" />
              <span>Pago contra entrega</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5 text-sm text-gray-700">
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
            <h2 className="font-serif text-2xl font-semibold text-gray-900">
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
