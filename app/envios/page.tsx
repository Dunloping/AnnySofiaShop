"use client"

import { Truck, Clock, MapPin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function EnviosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Envíos
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Realizamos envíos a todo Venezuela. Conoce nuestros tiempos y
          condiciones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {/* Shipping info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Envío nacional
                  </h3>
                  <p className="text-foreground/60">
                    Enviamos a todo Venezuela a través de empresas de transporte
                    confiables. El costo del envío varía según la ubicación y el
                    peso del paquete.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Tiempos de entrega
                  </h3>
                  <ul className="text-foreground/60 space-y-2">
                    <li>• Caracas: 1-2 días hábiles</li>
                    <li>• Ciudades principales: 2-4 días hábiles</li>
                    <li>• Resto del país: 3-7 días hábiles</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Recoger en tienda
                  </h3>
                  <p className="text-foreground/60">
                    También puedes recoger tu pedido gratis en nuestra ubicación:
                  </p>
                  <p className="text-foreground font-medium mt-2">
                    Urb. La Coromoto Av 40, Venezuela
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* How it works */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              ¿Cómo funciona?
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Realiza tu pedido
                  </h3>
                  <p className="text-foreground/60">
                    Agrega los productos al carrito y completa el checkout.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Confirma por WhatsApp
                  </h3>
                  <p className="text-foreground/60">
                    Te contactaremos para confirmar tu pedido y los detalles de
                    envío.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Recibe tu pedido
                  </h3>
                  <p className="text-foreground/60">
                    Entregamos tu pedido en la dirección indicada o puedes
                    recogerlo en tienda.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-3">
                ¿Tienes preguntas sobre envíos?
              </h3>
              <p className="text-foreground/60 mb-4">
                Escríbenos por WhatsApp y te ayudamos con gusto.
              </p>
              <a
                href="https://wa.me/584141234567"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-accent hover:bg-amber-600">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contactar por WhatsApp
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
