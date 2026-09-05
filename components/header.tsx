"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X, Search, Instagram, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartContext } from "@/components/cart-provider"
import { cn } from "@/lib/utils"
import { SearchOverlay } from "@/components/search-overlay"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/categorias", label: "Categorías" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
  { href: "/admin", label: "Admin" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { getTotalItems, openCart } = useCartContext()
  const totalItems = getTotalItems()

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement bar */}
      <div className="overflow-hidden bg-gray-900 text-white">
        <div className="flex max-w-full whitespace-nowrap animate-marquee py-2">
          <div className="flex shrink-0 items-center gap-12 pr-12 text-[13px] font-medium tracking-wide">
            <span>✦ Envíos Nacionales a toda Venezuela</span>
            <span>✦ Hasta 30% OFF en seleccionados</span>
            <span>✦ Escríbenos al DM o WhatsApp</span>
            <span>✦ Pago contra entrega disponible</span>
            <span>✦ Envíos Nacionales a toda Venezuela</span>
            <span>✦ Hasta 30% OFF en seleccionados</span>
            <span>✦ Escríbenos al DM o WhatsApp</span>
            <span>✦ Pago contra entrega disponible</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <button
              className="md:hidden -ml-2 p-2 text-foreground/80 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex flex-col items-center leading-none">
                <span className="font-serif text-2xl font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">
                  Anny<span className="text-accent">Sofia</span>
                </span>
                <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-luxe text-muted-foreground">
                  Shop
                </span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium text-foreground/80 hover:text-accent transition-colors relative group",
                    link.label === "Admin" && "text-muted-foreground"
                  )}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Buscar"
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 hover:bg-muted transition-colors"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/annysofiashop"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 hover:bg-muted transition-colors"
            >
              <Instagram className="h-[18px] w-[18px]" />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/584141234567"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 hover:bg-muted transition-colors"
            >
              <MessageCircle className="h-[18px] w-[18px]" />
            </a>

            {/* Cart */}
            <button
              onClick={openCart}
              aria-label="Abrir carrito"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 hover:bg-muted transition-colors"
            >
              <ShoppingCart className="h-[18px] w-[18px]" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4.5 min-w-4.5 rounded-full bg-accent px-1 text-[11px] font-semibold leading-4 text-white animate-bounce-in">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 border-t" : "max-h-0"
        )}
      >
        <nav className="container mx-auto px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 px-4 text-foreground/80 hover:bg-muted hover:text-accent rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t flex gap-4">
            <a
              href="https://www.instagram.com/annysofiashop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground/70 hover:text-accent"
            >
              <Instagram className="h-5 w-5" />
              <span>Instagram</span>
            </a>
            <a
              href="https://wa.me/584141234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground/70 hover:text-accent"
            >
              <MessageCircle className="h-5 w-5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </nav>
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}
