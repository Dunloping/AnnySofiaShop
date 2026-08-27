"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Instagram, MessageCircle, Truck, Shield, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { categories } from "@/lib/products"
import { useCatalogProducts } from "@/lib/catalog"

const heroSlides = [
  {
    eyebrow: "Nueva colección",
    title: "Nueva Colección Verano",
    subtitle: "Descubre las tendencias de la temporada que te harán brillar",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop",
    cta: "Ver colección",
    link: "/tienda",
  },
  {
    eyebrow: "Ofertas especiales",
    title: "Hasta 30% de Descuento",
    subtitle: "Ofertas imperdibles en tu moda favorita. ¡Aprovechá antes que se agote!",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop",
    cta: "Comprar ahora",
    link: "/tienda",
  },
  {
    eyebrow: "Envíos nacionales",
    title: "Envíos a Todo Venezuela",
    subtitle: "Recibe tus pedidos donde estés. Elegí entre envío o retiro en tienda.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=1080&fit=crop",
    cta: "Más información",
    link: "/envios",
  },
]

const features = [
  {
    icon: Truck,
    title: "Envíos Nacionales",
    description: "Enviamos a todo Venezuela",
  },
  {
    icon: Shield,
    title: "Compra Segura",
    description: "Tus datos están protegidos",
  },
  {
    icon: CreditCard,
    title: "Pago Fácil",
    description: "Múltiples métodos de pago",
  },
]

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="text-center mb-12">
      {eyebrow && (
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-luxe text-rose-600">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  )
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const allProducts = useCatalogProducts()
  const featuredProducts = allProducts.slice(0, 8)

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[580px] md:h-[720px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`absolute inset-0 ${
                currentSlide === index ? "animate-kenburns" : ""
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        ))}

        {/* Hero content */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <span
              className={`inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-luxe mb-6 backdrop-blur-sm transition-all duration-700 delay-200 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
              {heroSlides[currentSlide].eyebrow}
            </span>
            <h1
              className={`font-serif text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] mb-5 transition-all duration-700 delay-300 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {heroSlides[currentSlide].title}
            </h1>
            <p
              className={`text-lg md:text-xl text-white/85 mb-9 max-w-lg transition-all duration-700 delay-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {heroSlides[currentSlide].subtitle}
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Link href={heroSlides[currentSlide].link}>
                <Button
                  size="xl"
                  className="group w-full sm:w-auto btn-shine bg-white text-rose-700 hover:bg-rose-50"
                >
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contacto">
                <Button
                  size="xl"
                  variant="outline"
                  className="w-full sm:w-auto border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/60"
                >
                  Contáctanos
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-10 bg-white"
                  : "w-4 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 p-6 rounded-2xl border border-border bg-card hover:shadow-luxe hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-rose-500/20">
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Explora"
          title="Categorías"
          description="Encuentra exactamente lo que buscas. Tenemos una variedad de prendas y accesorios para que luzcas increíble."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.slice(1).map((category) => {
            const count = allProducts.filter(
              (p) => p.category === category.id
            ).length
            return (
              <Link
                key={category.id}
                href={`/categorias/${category.id}`}
                className="group"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-luxe group-hover:-translate-y-1 transition-all duration-300">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-white/70">
                      {count} {count === 1 ? "artículo" : "artículos"}
                    </p>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {category.name}
                    </h3>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-900 backdrop-blur">
                      Ver <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-luxe text-rose-600">
              Lo más vendido
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900">
              Productos Destacados
            </h2>
            <p className="text-muted-foreground mt-2">
              Nuestras prendas y accesorios más populares
            </p>
          </div>
          <Link href="/tienda" className="flex-shrink-0">
            <Button variant="outline" className="group rounded-full">
              Ver todos
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 p-10 md:p-14 text-center text-white">
          <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-luxe backdrop-blur">
              Oferta por tiempo limitado
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold mb-3">
              Hasta 30% de descuento
            </h2>
            <p className="text-white/85 max-w-xl mx-auto mb-8">
              En prendas y accesorios seleccionados. ¡No te lo pierdas!
            </p>
            <Link href="/tienda">
              <Button
                size="xl"
                className="rounded-full bg-white px-10 text-rose-700 hover:bg-rose-50 group"
              >
                Comprar ahora
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nuevos Llegados */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-luxe text-rose-600">
              Recién llegados
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900">
              Nuevos Llegados
            </h2>
            <p className="text-muted-foreground mt-2">
              Lo último que llegó a la tienda
            </p>
          </div>
          <Link href="/tienda" className="flex-shrink-0">
            <Button variant="outline" className="group rounded-full">
              Ver todo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {allProducts.slice(8, 14).map((product) => (
            <ProductCard key={product.id} product={product} isNew />
          ))}
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="bg-[#0f0f0f] py-20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-rose-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-pink-600/20 blur-3xl" />
        <div className="container mx-auto px-4 text-center relative">
          <Instagram className="h-12 w-12 text-white mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
            Síguenos en Instagram
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-10">
            Únete a nuestra comunidad de más de 8,000 seguidores. Compartimos
            outfit ideas, ofertas exclusivas y mucho más.
          </p>
          <a
            href="https://www.instagram.com/annysofiashop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="xl"
              className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 hover:opacity-90 text-white group rounded-full px-10"
            >
              <Instagram className="mr-2 h-5 w-5" />
              @annysofiashop
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <div className="mt-12 grid grid-cols-3 md:grid-cols-6 gap-3 max-w-3xl mx-auto">
            {featuredProducts.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className="relative aspect-square rounded-xl overflow-hidden opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 to-emerald-700 p-8 md:p-14 flex flex-col md:flex-row items-center gap-8 text-white">
          <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="flex-1 relative">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              ¿Tienes preguntas? 💬
            </h2>
            <p className="text-green-50/90 mb-8 max-w-md">
              Nuestro equipo está listo para ayudarte. Escríbenos por WhatsApp y
              te atenderemos lo antes posible.
            </p>
            <a
              href="https://wa.me/584141234567"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="xl"
                className="bg-white text-green-700 hover:bg-green-50 group rounded-full px-8"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Escribir por WhatsApp
              </Button>
            </a>
          </div>
          <div className="flex-shrink-0 relative">
            <div className="h-36 w-36 rounded-full bg-white/10 flex items-center justify-center">
              <MessageCircle className="h-20 w-20 text-white/80" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
