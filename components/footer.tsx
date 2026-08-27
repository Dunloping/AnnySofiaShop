"use client"

import Link from "next/link"
import { Instagram, MessageCircle, Mail, MapPin, Phone, ArrowRight } from "lucide-react"

const footerLinks = {
  tienda: [
    { href: "/tienda", label: "Todos los productos" },
    { href: "/categorias/vestidos", label: "Vestidos" },
    { href: "/categorias/blusas", label: "Blusas" },
    { href: "/categorias/accesorios", label: "Accesorios" },
  ],
  ayuda: [
    { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
    { href: "/envios", label: "Envíos" },
    { href: "/devoluciones", label: "Devoluciones" },
    { href: "/politica-privacidad", label: "Política de privacidad" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#0f0f0f] text-white">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="container mx-auto px-4 py-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-serif text-3xl font-semibold text-white mb-2">
                Únete a nuestra comunidad
              </h3>
              <p className="text-rose-100">
                Recibe ofertas exclusivas y novedades antes que nadie
              </p>
            </div>
            <form className="flex w-full lg:w-auto gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 lg:w-72 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-rose-100 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/20 transition-all"
              />
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
              >
                Suscribirme
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-semibold text-white">
                Anny<span className="text-rose-500">Sofia</span>
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-luxe text-white/50">
                Shop
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60">
              Tu tienda de moda femenina favorita en Venezuela. Ropa, accesorios
              y todo lo que necesitas para lucir espectacular.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/annysofiashop"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-rose-600 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/584141234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-rose-600 hover:text-white"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@annysofiashop.com"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-rose-600 hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="font-display mb-4 text-sm font-semibold uppercase tracking-luxe text-white">
              Tienda
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.tienda.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="font-display mb-4 text-sm font-semibold uppercase tracking-luxe text-white">
              Ayuda
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.ayuda.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-display mb-4 text-sm font-semibold uppercase tracking-luxe text-white">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-500" />
                <span>Urb. La Coromoto Av 40, Venezuela</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-500" />
                <span>+58 414 123 4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-500" />
                <span>info@annysofiashop.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>© {new Date().getFullYear()} AnnySofiaShop. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1">
              Hecho con <span className="text-rose-500">❤️</span> en Venezuela
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
