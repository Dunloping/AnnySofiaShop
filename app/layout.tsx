import type { Metadata } from "next"
import { Inter, Playfair_Display, Jost } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { CartSidebar } from "@/components/cart-sidebar"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-display",
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
      <body className={`${inter.variable} ${playfair.variable} ${jost.variable} font-sans antialiased`}>
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
