"use client"

export default function PoliticaPrivacidadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Política de Privacidad
        </h1>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Información que recopilamos
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Cuando realizas una compra en AnnySofiaShop, recopilamos la
              siguiente información:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4 mt-2">
              <li>Nombre completo</li>
              <li>Número de teléfono</li>
              <li>Dirección de envío</li>
              <li>Correo electrónico (opcional)</li>
              <li>Información de tu pedido</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Cómo utilizamos tu información
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Utilizamos tu información para:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4 mt-2">
              <li>Procesar y entregar tu pedido</li>
              <li>Comunicarnos contigo sobre el estado de tu pedido</li>
              <li>Enviarte ofertas y novedades (solo si te suscribes)</li>
              <li>Mejorar nuestro servicio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Protección de datos
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Tu información personal es tratada con total confidencialidad. No
              vendemos, compartimos ni distribuimos tu información a terceros,
              excepto cuando sea necesario para procesar tu envío.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Nuestro sitio web utiliza cookies para mejorar tu experiencia de
              navegación. Puedes configurar tu navegador para rechazar cookies,
              aunque esto podría afectar algunas funcionalidades del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Tus derechos
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Tienes derecho a:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4 mt-2">
              <li>Acceder a tu información personal</li>
              <li>Solicitar la corrección de datos incorrectos</li>
              <li>Solicitar la eliminación de tu información</li>
              <li>Oponerte al procesamiento de tus datos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Contacto
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Si tienes preguntas sobre esta política de privacidad, puedes
              contactarnos a través de:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4 mt-2">
              <li>WhatsApp: +58 414 123 4567</li>
              <li>Instagram: @annysofiashop</li>
              <li>Email: info@annysofiashop.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Cambios en esta política
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Nos reservamos el derecho de actualizar esta política de privacidad
              en cualquier momento. Los cambios serán publicados en esta página.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Última actualización: Enero 2024</p>
        </div>
      </div>
    </div>
  )
}
