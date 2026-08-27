# AnnySofiaShop - Tienda Online

Tu tienda de moda femenina favorita en Venezuela. 🇻🇪

## Características

- **Diseño Moderno**: Interfaz elegante y responsive
- **Carrito de Compras**: Persistente con localStorage
- **Catálogo de Productos**: Con filtros por categoría y búsqueda
- **Checkout Completo**: Flujo de compra con múltiples opciones de pago
- **Integración WhatsApp**: Confirmación de pedidos por WhatsApp
- **Diseño Mobile-First**: Optimizado para todos los dispositivos

## Tecnologías

- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Estado**: Zustand
- **Iconos**: Lucide React

## Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar en desarrollo

```bash
npm run dev
```

### 3. Abrir en el navegador

Visita [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
annysofia shop/
├── app/                    # Páginas (App Router)
│   ├── page.tsx           # Página principal
│   ├── tienda/            # Catálogo de productos
│   ├── producto/          # Detalle de producto
│   ├── checkout/          # Proceso de compra
│   ├── categorias/        # Categorías
│   ├── nosotros/          # Sobre nosotros
│   ├── contacto/          # Contacto
│   ├── envios/            # Información de envíos
│   └── ...                # Otras páginas
├── components/            # Componentes React
│   ├── header.tsx         # Cabecera
│   ├── footer.tsx         # Pie de página
│   ├── product-card.tsx   # Tarjeta de producto
│   ├── cart-sidebar.tsx   # Carrito lateral
│   └── ui/               # Componentes de UI
├── lib/                   # Utilidades
│   ├── store.ts          # Estado del carrito
│   ├── products.ts       # Datos de productos
│   └── utils.ts          # Funciones auxiliares
└── openspec/              # Documentación SDD
```

## Personalización

### Cambiar número de WhatsApp

Edita el archivo `components/header.tsx` y busca:

```tsx
href="https://wa.me/584141234567"
```

Cambia `584141234567` por tu número real.

### Agregar productos

Edita el archivo `lib/products.ts` y agrega nuevos productos al array `products`.

### Cambiar colores

Edita `tailwind.config.js` para modificar la paleta de colores.

## Despliegue

### Vercel (Recomendado)

```bash
npm i -g vercel
vercel
```

### Otros proveedores

El proyecto es una aplicación Next.js estática que se puede desplegar en cualquier proveedor compatible.

## Soporte

¿Tienes preguntas? Contáctanos:

- **Instagram**: [@annysofiashop](https://www.instagram.com/annysofiashop)
- **WhatsApp**: [+58 414 123 4567](https://wa.me/584141234567)

## Licencia

© 2024 AnnySofiaShop. Todos los derechos reservados.
