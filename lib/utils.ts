import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  // Formato estable entre server y client (evita hydration mismatch con Intl)
  const value = Number.isInteger(price) ? price.toString() : price.toFixed(2)
  return `$${value}`
}

export function formatPriceWithDiscount(
  price: number,
  discountPercentage: number
): string {
  const discountedPrice = price * (1 - discountPercentage / 100)
  return formatPrice(discountedPrice)
}

export function generateProductId(): string {
  return Math.random().toString(36).substring(2, 15)
}
