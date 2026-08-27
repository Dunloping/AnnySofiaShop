"use client"

import { Instagram, MessageCircle, Mail, MapPin, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Contáctanos
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Escríbenos por
          cualquiera de nuestros canales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact form */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Envíanos un mensaje
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                    placeholder="+58 414 123 4567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asunto
                </label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent">
                  <option>Consulta general</option>
                  <option>Sobre un producto</option>
                  <option>Estado del pedido</option>
                  <option>Devolución o cambio</option>
                  <option>Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>
              <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">
                Enviar mensaje
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact info */}
        <div className="space-y-6">
          {/* WhatsApp */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    WhatsApp
                  </h3>
                  <p className="text-gray-600 mb-3">
                    La forma más rápida de contactarnos
                  </p>
                  <a
                    href="https://wa.me/584141234567"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-green-600 hover:bg-green-700">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Escribir ahora
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instagram */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Instagram className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Instagram
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Síguenos para ver nuevos productos y ofertas
                  </p>
                  <a
                    href="https://www.instagram.com/annysofiashop"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Instagram className="h-4 w-4 mr-2" />
                      @annysofiashop
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Ubicación
                  </h3>
                  <p className="text-gray-600">
                    Urb. La Coromoto Av 40
                    <br />
                    Venezuela
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hours */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Horario de atención
                  </h3>
                  <p className="text-gray-600">
                    Lunes a Sábado: 9:00 AM - 6:00 PM
                    <br />
                    Domingo: Cerrado
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
