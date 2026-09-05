"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, CreditCard, Banknote, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCartContext } from "@/components/cart-provider"
import { formatPrice } from "@/lib/utils"

type CheckoutStep = "information" | "shipping" | "payment"

interface FormData {
  name: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  shippingMethod: "envio" | "retiro"
  paymentMethod: "transferencia" | "pago-movil" | "efectivo"
  notes: string
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("information")
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    shippingMethod: "envio",
    paymentMethod: "transferencia",
    notes: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const { items, getTotalPrice, clearCart } = useCartContext()

  const totalItems = items.reduce((a, i) => a + i.quantity, 0)
  const shippingCost = form.shippingMethod === "envio" ? 0 : 0

  const buildWhatsAppMessage = useMemo(() => {
    if (!isOrderComplete) return ""
    let msg = `🛒 *Pedido AnnySofiaShop*\n\n`
    msg += `👤 ${form.name}\n`
    msg += `📱 ${form.phone}\n`
    if (form.email) msg += `📧 ${form.email}\n\n`
    msg += `📦 *Productos:*\n`
    items.forEach((item) => {
      const size = item.selectedSize ? ` (${item.selectedSize})` : ""
      const color = item.selectedColor ? ` - ${item.selectedColor}` : ""
      msg += `• ${item.name}${size}${color} x${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`
    })
    msg += `\n💰 *Total: ${formatPrice(getTotalPrice())}*\n\n`
    msg += `📍 *Envío:* ${form.shippingMethod === "envio" ? `Envío a ${form.city}, ${form.state}` : "Retiro en tienda"}\n`
    msg += `🏠 *Dirección:* ${form.address}\n\n`
    msg += `💳 *Pago:* ${form.paymentMethod === "transferencia" ? "Transferencia bancaria" : form.paymentMethod === "pago-movil" ? "Pago móvil" : "Efectivo"}\n`
    if (form.notes) msg += `📝 *Notas:* ${form.notes}\n`
    return encodeURIComponent(msg)
  }, [form, items, getTotalPrice, isOrderComplete])

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (currentStep === "information") {
      if (!form.name.trim()) newErrors.name = "Nombre requerido"
      if (!form.phone.trim()) newErrors.phone = "Teléfono requerido"
      if (!form.address.trim()) newErrors.address = "Dirección requerida"
      if (!form.city.trim()) newErrors.city = "Ciudad requerida"
      if (!form.state.trim()) newErrors.state = "Estado requerido"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      const idx = steps.findIndex((s) => s.id === currentStep)
      if (idx < steps.length - 1) setCurrentStep(steps[idx + 1].id)
    }
  }

  const handlePrev = () => {
    const idx = steps.findIndex((s) => s.id === currentStep)
    if (idx > 0) setCurrentStep(steps[idx - 1].id)
  }

  const handleSubmitOrder = () => {
    setIsOrderComplete(true)
    clearCart()
  }

  const inputClass =
    "w-full px-4 py-2.5 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"

  if (items.length === 0 && !isOrderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-8">Agrega algunos productos antes de continuar.</p>
        <Link href="/tienda">
          <Button className="bg-accent hover:bg-amber-600 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Ir a la tienda
          </Button>
        </Link>
      </div>
    )
  }

  if (isOrderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">¡Pedido confirmado!</h1>
          <p className="text-muted-foreground mb-8">
            Tu pedido ha sido registrado. Envíanos el resumen por WhatsApp para confirmarlo.
          </p>
          <div className="space-y-3">
            <a
              href={`https://wa.me/584141234567?text=${buildWhatsAppMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-accent hover:bg-amber-600 text-white">
                <MessageCircle className="mr-2 h-5 w-5" /> Confirmar por WhatsApp
              </Button>
            </a>
            <Link href="/tienda">
              <Button variant="outline" className="w-full">Seguir comprando</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const steps: { id: CheckoutStep; label: string }[] = [
    { id: "information", label: "Información" },
    { id: "shipping", label: "Envío" },
    { id: "payment", label: "Pago" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/tienda" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-8">
        <ArrowLeft className="h-4 w-4 mr-1" /> Seguir comprando
      </Link>

      <div className="mb-12">
        <div className="flex items-center justify-center gap-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center gap-2 ${currentStep === step.id ? "text-accent" : steps.findIndex((s) => s.id === currentStep) > index ? "text-accent" : "text-foreground/40"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === step.id ? "bg-accent text-white" : steps.findIndex((s) => s.id === currentStep) > index ? "bg-accent text-white" : "bg-secondary text-foreground/60"}`}>
                  {steps.findIndex((s) => s.id === currentStep) > index ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <span className="hidden sm:block font-medium">{step.label}</span>
              </div>
              {index < steps.length - 1 && <div className={`w-12 h-0.5 mx-2 ${steps.findIndex((s) => s.id === currentStep) > index ? "bg-accent" : "bg-secondary"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentStep === "information" && (
            <Card className="bg-card border-border">
              <CardHeader><CardTitle className="font-serif text-xl text-foreground">Información personal</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Nombre *</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={cn(inputClass, errors.name && "border-red-500")} placeholder="Tu nombre" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Teléfono *</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={cn(inputClass, errors.phone && "border-red-500")} placeholder="+58 414 123 4567" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Email (opcional)</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="tu@email.com" />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Dirección *</label>
                  <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={cn(inputClass, errors.address && "border-red-500")} placeholder="Calle, número, urbanización" />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Ciudad *</label>
                    <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={cn(inputClass, errors.city && "border-red-500")} placeholder="Ciudad" />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Estado *</label>
                    <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={cn(inputClass, errors.state && "border-red-500")} placeholder="Estado" />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                </div>
                <Button onClick={handleNext} className="w-full bg-accent hover:bg-amber-600 text-white">Continuar al envío</Button>
              </CardContent>
            </Card>
          )}

          {currentStep === "shipping" && (
            <Card className="bg-card border-border">
              <CardHeader><CardTitle className="font-serif text-xl text-foreground">Método de envío</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className={cn("flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors", form.shippingMethod === "envio" ? "border-accent bg-accent/5" : "border-border hover:border-foreground/20")}>
                    <input type="radio" name="shipping" checked={form.shippingMethod === "envio"} onChange={() => setForm({ ...form, shippingMethod: "envio" })} className="mt-1" />
                    <div className="flex-1">
                      <span className="font-medium text-foreground">Envío nacional</span>
                      <p className="text-sm text-muted-foreground">El costo se calculará según tu ubicación.</p>
                    </div>
                  </label>
                  <label className={cn("flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors", form.shippingMethod === "retiro" ? "border-accent bg-accent/5" : "border-border hover:border-foreground/20")}>
                    <input type="radio" name="shipping" checked={form.shippingMethod === "retiro"} onChange={() => setForm({ ...form, shippingMethod: "retiro" })} className="mt-1" />
                    <div className="flex-1">
                      <span className="font-medium text-foreground">Retiro en tienda</span>
                      <p className="text-sm text-muted-foreground">Urb. La Coromoto Av 40, Venezuela — Gratis</p>
                    </div>
                  </label>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={handlePrev}>Atrás</Button>
                  <Button onClick={handleNext} className="flex-1 bg-accent hover:bg-amber-600 text-white">Continuar al pago</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === "payment" && (
            <Card className="bg-card border-border">
              <CardHeader><CardTitle className="font-serif text-xl text-foreground">Método de pago</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { id: "transferencia" as const, label: "Transferencia bancaria", desc: "Te enviaremos los datos por WhatsApp" },
                    { id: "pago-movil" as const, label: "Pago móvil", desc: "Envía el comprobante por WhatsApp" },
                    { id: "efectivo" as const, label: "Efectivo", desc: "Paga contra entrega o en persona" },
                  ].map((pm) => (
                    <label key={pm.id} className={cn("flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors", form.paymentMethod === pm.id ? "border-accent bg-accent/5" : "border-border hover:border-foreground/20")}>
                      <input type="radio" name="payment" checked={form.paymentMethod === pm.id} onChange={() => setForm({ ...form, paymentMethod: pm.id })} className="mt-1" />
                      <div>
                        <span className="font-medium text-foreground">{pm.label}</span>
                        <p className="text-sm text-muted-foreground">{pm.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Notas (opcional)</label>
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className={inputClass + " resize-none"} placeholder="Instrucciones especiales de entrega..." />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={handlePrev}>Atrás</Button>
                  <Button onClick={handleSubmitOrder} className="flex-1 bg-accent hover:bg-amber-600 text-white">
                    <Check className="mr-2 h-4 w-4" /> Confirmar pedido
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border sticky top-24">
            <CardHeader><CardTitle className="font-serif text-xl text-foreground">Tu pedido</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => {
                  const key = `${item.id}-${item.selectedSize}-${item.selectedColor}`
                  return (
                    <div key={key} className="flex gap-3">
                      <div className="relative h-14 w-14 flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-foreground/80 text-white text-xs rounded-full flex items-center justify-center font-medium">{item.quantity}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedSize && `Talla: ${item.selectedSize}`}
                          {item.selectedSize && item.selectedColor && " · "}
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-foreground">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({totalItems} {totalItems === 1 ? "artículo" : "artículos"})</span>
                  <span className="text-foreground">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="text-muted-foreground">{form.shippingMethod === "envio" ? "Se calcula" : "Gratis"}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-accent">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-3 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">¿Ayuda?</p>
                <p>Escríbenos por <a href="https://wa.me/584141234567" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">WhatsApp</a></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
