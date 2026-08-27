"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CreditCard, Banknote, Truck, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCartContext } from "@/components/cart-provider"
import { formatPrice } from "@/lib/utils"

type CheckoutStep = "information" | "shipping" | "payment"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("information")
  const [paymentMethod, setPaymentMethod] = useState<"transferencia" | "pago-movil" | "efectivo">("transferencia")
  const { items, getTotalPrice, clearCart } = useCartContext()
  const [isOrderComplete, setIsOrderComplete] = useState(false)

  const steps: { id: CheckoutStep; label: string }[] = [
    { id: "information", label: "Información" },
    { id: "shipping", label: "Envío" },
    { id: "payment", label: "Pago" },
  ]

  const handleNextStep = () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id)
    }
  }

  const handlePrevStep = () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id)
    }
  }

  const handleSubmitOrder = () => {
    setIsOrderComplete(true)
    clearCart()
  }

  if (items.length === 0 && !isOrderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Tu carrito está vacío
        </h1>
        <p className="text-gray-500 mb-8">
          Agrega algunos productos antes de continuar con la compra.
        </p>
        <Link href="/tienda">
          <Button className="bg-rose-600 hover:bg-rose-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ir a la tienda
          </Button>
        </Link>
      </div>
    )
  }

  if (isOrderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Pedido confirmado!
          </h1>
          <p className="text-gray-500 mb-8">
            Gracias por tu compra. Recibirás un mensaje de confirmación por
            WhatsApp con los detalles de tu pedido.
          </p>
          <div className="space-y-4">
            <a href="https://wa.me/584141234567" target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Confirmar pedido por WhatsApp
              </Button>
            </a>
            <Link href="/tienda">
              <Button variant="outline" className="w-full">
                Seguir comprando
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        href="/tienda"
        className="inline-flex items-center text-sm text-gray-500 hover:text-rose-600 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Seguir comprando
      </Link>

      {/* Progress steps */}
      <div className="mb-12">
        <div className="flex items-center justify-center gap-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center gap-2 ${
                  currentStep === step.id
                    ? "text-rose-600"
                    : steps.findIndex((s) => s.id === currentStep) > index
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step.id
                      ? "bg-rose-600 text-white"
                      : steps.findIndex((s) => s.id === currentStep) > index
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {steps.findIndex((s) => s.id === currentStep) > index ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="hidden sm:block font-medium">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 mx-2 ${
                    steps.findIndex((s) => s.id === currentStep) > index
                      ? "bg-green-600"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main form */}
        <div className="lg:col-span-2">
          {/* Information step */}
          {currentStep === "information" && (
            <Card>
              <CardHeader>
                <CardTitle>Información personal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                    placeholder="Calle, número, urbanización"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                      placeholder="Ciudad"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                      placeholder="Estado"
                    />
                  </div>
                </div>
                <Button
                  className="w-full bg-rose-600 hover:bg-rose-700"
                  onClick={handleNextStep}
                >
                  Continuar al envío
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Shipping step */}
          {currentStep === "shipping" && (
            <Card>
              <CardHeader>
                <CardTitle>Método de envío</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-start gap-4 p-4 border-2 border-rose-600 rounded-lg bg-rose-50 cursor-pointer">
                    <input
                      type="radio"
                      name="shipping"
                      defaultChecked
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Envío nacional</span>
                        <span className="font-medium text-rose-600">
                          A convenir
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        El costo del envío se calculará según tu ubicación.
                        Te contactaremos por WhatsApp.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                    <input type="radio" name="shipping" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Recoger en tienda</span>
                        <span className="font-medium text-green-600">Gratis</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Urb. La Coromoto Av 40, Venezuela
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Atrás
                  </Button>
                  <Button
                    className="flex-1 bg-rose-600 hover:bg-rose-700"
                    onClick={handleNextStep}
                  >
                    Continuar al pago
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment step */}
          {currentStep === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle>Método de pago</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "transferencia"
                        ? "border-rose-600 bg-rose-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("transferencia")}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "transferencia"}
                      onChange={() => setPaymentMethod("transferencia")}
                    />
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <div>
                      <span className="font-medium">Transferencia bancaria</span>
                      <p className="text-sm text-gray-500">
                        Te enviaremos los datos por WhatsApp
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "pago-movil"
                        ? "border-rose-600 bg-rose-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("pago-movil")}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "pago-movil"}
                      onChange={() => setPaymentMethod("pago-movil")}
                    />
                    <Banknote className="h-5 w-5 text-gray-600" />
                    <div>
                      <span className="font-medium">Pago móvil</span>
                      <p className="text-sm text-gray-500">
                        Envía el comprobante por WhatsApp
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "efectivo"
                        ? "border-rose-600 bg-rose-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("efectivo")}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "efectivo"}
                      onChange={() => setPaymentMethod("efectivo")}
                    />
                    <Banknote className="h-5 w-5 text-gray-600" />
                    <div>
                      <span className="font-medium">Efectivo</span>
                      <p className="text-sm text-gray-500">
                        Paga contra entrega o en persona
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Atrás
                  </Button>
                  <Button
                    className="flex-1 bg-rose-600 hover:bg-rose-700"
                    onClick={handleSubmitOrder}
                  >
                    Confirmar pedido
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-3"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-gray-600 text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.selectedSize && `Talla: ${item.selectedSize}`}
                        {item.selectedSize && item.selectedColor && " • "}
                        {item.selectedColor && `Color: ${item.selectedColor}`}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Envío</span>
                  <span className="text-gray-500">A calcular</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-rose-600">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
              </div>

              {/* Help */}
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                <p className="font-medium text-gray-900 mb-1">
                  ¿Necesitas ayuda?
                </p>
                <p>
                  Escríbenos por{" "}
                  <a
                    href="https://wa.me/584141234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-600 hover:underline"
                  >
                    WhatsApp
                  </a>{" "}
                  y te atenderemos.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
