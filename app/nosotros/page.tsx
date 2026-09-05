"use client"

import Image from "next/image"
import { Instagram, MessageCircle, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NosotrosPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="/productos/photo_30.jpg"
          alt="Nuestra tienda"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sobre AnnySofiaShop
            </h1>
            <p className="text-xl text-gray-200">
              Tu tienda de moda femenina favorita en Venezuela
            </p>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Nuestra historia 💕
            </h2>
            <div className="space-y-4 text-foreground/60 leading-relaxed">
              <p>
                AnnySofiaShop nació del amor por la moda y el deseo de ofrecer a
                las mujeres venezolanas prendas únicas y de calidad a precios
                accesibles.
              </p>
              <p>
                Desde nuestros inicios en Instagram, hemos crecido hasta tener
                más de 8,000 seguidores que confían en nosotros para vestirlos
                con estilo y elegancia.
              </p>
              <p>
                Nos dedicamos a seleccionar cuidadosamente cada prenda y
                accesorio, asegurándonos de que cumpla con nuestros estándares de
                calidad y tendencia.
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src="/productos/photo_100.jpg"
              alt="Nuestra tienda"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Nuestros valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl text-center">
              <div className="h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Pasión por la moda
              </h3>
              <p className="text-foreground/60">
                Cada prenda que seleccionamos refleja nuestro amor por la moda y
                el estilo.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl text-center">
              <div className="h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Calidad primero
              </h3>
              <p className="text-foreground/60">
                Nos aseguramos de que cada producto cumpla con nuestros altos
                estándares de calidad.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl text-center">
              <div className="h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Atención personalizada
              </h3>
              <p className="text-foreground/60">
                Estamos aquí para ayudarte en cada paso de tu compra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social media */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Síguenos en redes sociales
          </h2>
          <p className="text-muted-foreground">
            Únete a nuestra comunidad y no te pierdas ninguna novedad
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.instagram.com/annysofiashop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Instagram className="h-5 w-5 mr-2" />
              @annysofiashop
            </Button>
          </a>
          <a
            href="https://wa.me/584141234567"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-amber-600 text-white"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp
            </Button>
          </a>
        </div>
      </section>
    </div>
  )
}
