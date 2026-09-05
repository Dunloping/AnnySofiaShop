"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "¿Cómo realizo un pedido?",
    answer:
      "Simplemente agrega los productos que deseas al carrito, completa el checkout con tus datos y te contactaremos por WhatsApp para confirmar el pedido y los detalles de envío.",
  },
  {
    question: "¿Cuáles son los métodos de pago aceptados?",
    answer:
      "Aceptamos transferencia bancaria, pago móvil y efectivo (contra entrega o en persona). Los datos bancarios te los enviaremos por WhatsApp una vez confirmado tu pedido.",
  },
  {
    question: "¿Hacen envíos a todo Venezuela?",
    answer:
      "Sí, realizamos envíos nacionales a todo el país. El costo del envío varía según la ubicación y se calcula una vez que nos confirmes tu dirección.",
  },
  {
    question: "¿Cuánto tarda el envío?",
    answer:
      "El tiempo de entrega depende de tu ubicación: Caracas 1-2 días hábiles, ciudades principales 2-4 días hábiles, y resto del país 3-7 días hábiles.",
  },
  {
    question: "¿Puedo recoger mi pedido en tienda?",
    answer:
      "Sí, puedes recoger tu pedido gratis en nuestra ubicación en Urb. La Coromoto Av 40, Venezuela. Te confirmaremos cuando esté listo.",
  },
  {
    question: "¿Qué hago si un producto no me queda bien?",
    answer:
      "Contáctanos por WhatsApp y te ayudamos con el cambio. Aceptamos cambios dentro de los primeros 7 días posteriores a la recepción del pedido, siempre que la prenda esté en perfectas condiciones.",
  },
  {
    question: "¿Puedo devolver un producto?",
    answer:
      "Las devoluciones se realizan únicamente si el producto presenta defectos de fabricación. Contáctanos por WhatsApp para coordinar la devolución.",
  },
  {
    question: "¿Cómo sé el estado de mi pedido?",
    answer:
      "Te mantenemos informado throughout el proceso por WhatsApp. Desde la confirmación del pedido hasta la entrega, recibirás actualizaciones.",
  },
  {
    question: "¿Tienen tienda física?",
    answer:
      "Actualmente operamos principalmente como tienda online, pero puedes recoger tu pedido en nuestra ubicación en Urb. La Coromoto Av 40, Venezuela.",
  },
  {
    question: "¿Cómo puedo contactarlos?",
    answer:
      "Puedes contactarnos por WhatsApp al +58 414 123 4567, por Instagram @annysofiashop, o a través del formulario de contacto en nuestra página.",
  },
]

export default function PreguntasFrecuentesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Preguntas Frecuentes
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Encuentra respuestas a las preguntas más comunes sobre nuestros
          productos, envíos y políticas.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary transition-colors"
              >
                <span className="font-medium text-foreground pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="p-4 pt-0 text-foreground/60">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
