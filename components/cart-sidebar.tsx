"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartContext } from "@/components/cart-provider"
import { formatPrice } from "@/lib/utils"
import { cn } from "@/lib/utils"

export function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCartContext()

  // Close cart on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, closeCart])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-rose-600" />
              <h2 className="text-lg font-semibold">Mi Carrito</h2>
              <span className="text-sm text-gray-500">
                ({getTotalItems()} {getTotalItems() === 1 ? "artículo" : "artículos"})
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-gray-500 mb-6">
                  ¡Explora nuestra tienda y encuentra algo que te encante!
                </p>
                <Button onClick={closeCart} className="bg-rose-600 hover:bg-rose-700">
                  <Link href="/tienda">Ir a la tienda</Link>
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  {/* Product image */}
                  <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 line-clamp-1">
                      {item.name}
                    </h3>
                    {(item.selectedSize || item.selectedColor) && (
                      <p className="text-sm text-gray-500 mt-1">
                        {item.selectedSize && `Talla: ${item.selectedSize}`}
                        {item.selectedSize && item.selectedColor && " • "}
                        {item.selectedColor && `Color: ${item.selectedColor}`}
                      </p>
                    )}
                    <p className="text-rose-600 font-semibold mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-rose-600 transition-colors self-start"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              {/* Subtotal */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Envío</span>
                  <span className="text-gray-500">Se calcula en el checkout</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-rose-600">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              {/* Checkout button */}
              <Link href="/checkout" onClick={closeCart}>
                <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3">
                  Ir al checkout
                </Button>
              </Link>

              {/* Continue shopping */}
              <Button
                variant="ghost"
                className="w-full"
                onClick={closeCart}
              >
                Seguir comprando
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
