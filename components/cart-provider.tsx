"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useCart, CartItem } from "@/lib/store"

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (product: any, quantity?: number, selectedSize?: string, selectedColor?: string) => void
  removeItem: (productId: string, selectedSize?: string) => void
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart()

  useEffect(() => {
    setMounted(true)
  }, [])

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  if (!mounted) {
    return (
      <CartContext.Provider
        value={{
          items: [],
          isOpen: false,
          openCart: () => {},
          closeCart: () => {},
          addItem: () => {},
          removeItem: () => {},
          updateQuantity: () => {},
          clearCart: () => {},
          getTotalItems: () => 0,
          getTotalPrice: () => 0,
        }}
      >
        {children}
      </CartContext.Provider>
    )
  }

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  return context
}
