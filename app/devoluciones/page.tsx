"use client"

import { ArrowLeft, Check, X, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function DevolucionesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Política de Devoluciones y Cambios
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Queremos que estés satisfecha con tu compra. Conoce nuestras políticas
          de devolución y cambio.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Changes */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              Cambios
            </h2>
            <div className="space-y-3 text-foreground/60">
              <p>
                Aceptamos cambios dentro de los primeros{" "}
                <strong>7 días</strong> posteriores a la recepción del pedido.
              </p>
              <p>Para realizar un cambio, la prenda debe:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Estar en perfectas condiciones (sin uso, sin lavar)</li>
                <li>Tener todas las etiquetas originales</li>
                <li>Estar en su empaque original</li>
              </ul>
              <p>
                Los cambios están sujetos a disponibilidad de talla/color.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Returns */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <ArrowLeft className="h-5 w-5 text-rose-600" />
              Devoluciones
            </h2>
            <div className="space-y-3 text-foreground/60">
              <p>
                Las devoluciones se realizan únicamente si el producto presenta{" "}
                <strong>defectos de fabricación</strong>.
              </p>
              <p>
                Si recibes un producto con defectos, contáctanos dentro de las
                primeras 48 horas con fotos del defecto y coordinaremos la
                devolución.
              </p>
              <p>
                Una vez recibido y verificado el producto, te ofrecemos un reembolso
                completo o un reemplazo, según tu preferencia.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Non-returnable items */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <X className="h-5 w-5 text-red-600" />
              Productos no elegibles para devolución
            </h2>
            <div className="space-y-3 text-foreground/60">
              <p>No se aceptan devoluciones en los siguientes casos:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Productos usados o lavados</li>
                <li>Productos sin etiquetas originales</li>
                <li>Productos dañados por mal uso</li>
                <li>Accesorios íntimos por razones de higiene</li>
                <li>Productos en oferta o liquidación (solo defectos)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Process */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              ¿Cómo solicitar un cambio o devolución?
            </h2>
            <div className="space-y-4 text-foreground/60">
              <div className="flex gap-3">
                <span className="h-6 w-6 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  1
                </span>
                <p>
                  Contáctanos por WhatsApp al +58 414 123 4567 con tu número de
                  pedido y una explicación del motivo.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="h-6 w-6 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  2
                </span>
                <p>
                  Si es un defecto, envía fotos claras del problema.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="h-6 w-6 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  3
                </span>
                <p>
                  Coordinaremos la recolección del producto (sin costo para ti
                  en caso de defecto).
                </p>
              </div>
              <div className="flex gap-3">
                <span className="h-6 w-6 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  4
                </span>
                <p>
                  Una vez recibido, procesaremos tu cambio o reembolso en un
                  plazo de 3-5 días hábiles.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            ¿Tienes alguna duda sobre nuestra política de devoluciones?
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
        </div>
      </div>
    </div>
  )
}
