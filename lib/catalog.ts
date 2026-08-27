"use client"

import { useEffect, useMemo, useState } from "react"
import { Product } from "./store"
import { useAdmin } from "./admin-store"
import { getDefaultProducts } from "./products"

export function useCatalogProducts(): Product[] {
  const { getAllProducts } = useAdmin()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return useMemo(() => {
    if (!mounted) return getDefaultProducts()
    return getAllProducts()
  }, [mounted, getAllProducts])
}
