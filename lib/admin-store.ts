import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Product } from "./store"
import { getDefaultProducts } from "./products"

export interface ProductEdit extends Partial<Product> {
  id: string
}

interface AdminState {
  edits: Record<string, ProductEdit>
  overrides: Record<string, Partial<Product>>
  updateProduct: (id: string, updates: Partial<Product>) => void
  resetProduct: (id: string) => void
  resetAll: () => void
  getAllProducts: () => Product[]
}

export const useAdmin = create<AdminState>()(
  persist(
    (set, get) => ({
      edits: {},
      overrides: {},

      updateProduct: (id, updates) =>
        set((state) => ({
          overrides: {
            ...state.overrides,
            [id]: { ...state.overrides[id], ...updates },
          },
        })),

      resetProduct: (id) =>
        set((state) => {
          const overrides = { ...state.overrides }
          delete overrides[id]
          return { overrides }
        }),

      resetAll: () => set({ overrides: {} }),

      getAllProducts: () => {
        const { overrides } = get()
        return getDefaultProducts().map((product) => ({
          ...product,
          ...overrides[product.id],
          images: overrides[product.id]?.images ?? product.images,
        }))
      },
    }),
    {
      name: "annysofia-admin",
    }
  )
)
