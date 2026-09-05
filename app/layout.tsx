import type { Metadata } from "next"
import { Manrope, Fraunces } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { CartSidebar } from "@/components/cart-sidebar"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "AnnySofiaShop | Moda Femenina Venezuela",
  description:
    "Tu tienda de moda femenina favorita en Venezuela. Envíos nacionales. Ropa, accesorios y más.",
  keywords: [
    "moda femenina",
    "ropa mujer",
    "accesorios",
    "tienda online",
    "venezuela",
    "envios nacionales",
  ],
  openGraph: {
    title: "AnnySofiaShop | Moda Femenina Venezuela",
    description:
      "Tu tienda de moda femenina favorita en Venezuela. Envíos nacionales.",
    type: "website",
    locale: "es_VE",
    siteName: "AnnySofiaShop",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${fraunces.variable} font-sans antialiased`}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartSidebar />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
