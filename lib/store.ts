import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Product {
  id: string
  name: string
  price: number
  image: string
  images?: string[]
  category: string
  description?: string
  sizes?: string[]
  colors?: string[]
  inStock: boolean
  /** Inventario por talla: talla -> stock disponible */
  inventory?: Record<string, number>
}

export function getStockForSize(product: Product, size?: string): number {
  if (product.inventory && size && product.inventory[size] !== undefined) {
    return product.inventory[size]
  }
  if (product.inventory) {
    // sumar todas las tallas
    return Object.values(product.inventory).reduce((a, b) => a + b, 0)
  }
  return product.inStock ? 99 : 0
}

export function isProductInStock(product: Product, size?: string): boolean {
  return getStockForSize(product, size) > 0
}

/** Stock disponible de un producto/talla restando lo ya reservado en el carrito */
export function getAvailableStock(
  product: Product,
  size: string | undefined,
  items: CartItem[],
  ignoreItemId?: string
): number {
  const base = getStockForSize(product, size)
  const inCart = items
    .filter(
      (i) =>
        i.id === product.id &&
        i.selectedSize === size &&
        i.id !== ignoreItemId
    )
    .reduce((a, i) => a + i.quantity, 0)
  return Math.max(0, base - inCart)
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void
  removeItem: (productId: string, selectedSize?: string) => void
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1, selectedSize, selectedColor) =>
        set((state) => {
          const size = selectedSize ?? product.sizes?.[0]
          const color = selectedColor ?? product.colors?.[0]
          const existingItem = state.items.find(
            (item) =>
              item.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor === color
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id &&
                item.selectedSize === size &&
                item.selectedColor === color
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }

          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity,
                selectedSize: size,
                selectedColor: color,
              },
            ],
          }
        }),

      removeItem: (productId, selectedSize) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              item.id !== productId ||
              (selectedSize !== undefined && item.selectedSize !== selectedSize)
          ),
        })),

      updateQuantity: (productId, quantity, selectedSize) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (item) =>
                    item.id !== productId ||
                    (selectedSize !== undefined && item.selectedSize !== selectedSize)
                )
              : state.items.map((item) =>
                  item.id === productId &&
                  (selectedSize === undefined || item.selectedSize === selectedSize)
                    ? { ...item, quantity }
                    : item
                ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "annysofia-cart",
    }
  )
)
