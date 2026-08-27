# Exploration: UI/UX Refinamiento

## Current State

La web de AnnySofiaShop tiene una base sólida (Next.js 14, Tailwind, React, Zustand) y un buen look premium tras el rediseño. Sin embargo hay varios puntos de UX rotos o incompletos que se detectaron revisando el código real:

1. **Buscador no funciona**: El icono de búsqueda en el header (`components/header.tsx`) es un `<button>` decorativo sin `onClick` ni estado. No permite buscar productos, aunque `lib/products.ts` ya exporta `searchProducts()`.

2. **Página de producto incompleta**: Tiene galería, tallas/colores/cantidad y botón de agregar, pero NO muestra rating (a diferencia de las cards), ni badge de descuento, ni información de envío destacada de forma moderna.

3. **Related products usan datos no-editados**: `app/producto/[id]/page.tsx` importa `products`/`getProductById` de `lib/products`, ignorando las ediciones del admin (`useAdmin`). Si el admin cambia un precio, "related" no lo refleja.

4. **Estados vacíos / micro-interacciones**: El carrito vacío y otros estados podrían pulirse. La página de tienda usa `grid-cols-3` en disenos donde `lg:grid-cols-3` puede quedar apretado.

5. **Checkout**: flujo funcional de 3 pasos + HTML, pero la confirmación no es automatizada (depende de WhatsApp manual).

## Affected Areas

- `components/header.tsx` — buscador decorativo sin función
- `app/producto/[id]/page.tsx` — falta rating/badge, related sin admin edits
- `lib/catalog.ts` — hook para productos con admin edits (debería usarse en más lados)
- `components/cart-sidebar.tsx` — estados y micro-interacciones
- `app/tienda/page.tsx` — grid y filtros
- `components/product-card.tsx` — coherencia con página de producto

## Approaches

1. **Buscador funcional global (Overlay de búsqueda)**
   - Pros: Busca productos en tiempo real desde cualquier página; usa `searchProducts` que ya existe; UX moderna (overlay con resultados en vivo + teclas de navegación).
   - Cons: Requiere estado global del input, componente nuevo, manejo de click-outside/esc/teclado.
   - Effort: Medium

2. **Mejorar página de producto (rating + badge + envío moderno + related corregido)**
   - Pros: Coherencia con las cards; más confianza de compra; related refleja precios reales del admin.
   - Cons: Poco, es aditivo.
   - Effort: Low/Medium

3. **Checkout automatizado con WhatsApp + resumen mejorado**
   - Pros: Reduce fricción de compra; genera mensaje de WhatsApp con el pedido armado; mejora conversión.
   - Cons: Requiere armar payload del pedido; depende del número; no valida datos en serio.
   - Effort: Medium

4. **Refinamiento responsive y micro-interacciones (grid fixes, estados vacíos, animaciones)**
   - Pros: Pulido general; mejor experiencia en móvil/tablet; más "cara de marca".
   - Cons: Difuso, toca varios archivos.
   - Effort: Medium

5. **SEO/OG por página (metadatos dinámicos, sitemap)**
   - Pros: Mejor compartir en WhatsApp/Instagram; mejor indexación en Google; OpenGraph por producto.
   - Cons: Requiere API routes o generateMetadata; imágenes OG.
   - Effort: Medium

## Recommendation

Empezar por **(1) buscador funcional + (2) mejora de página de producto**, porque son los puntos de UX que más se notan: un buscador que no funciona es bloqueante para una tienda, y la página de producto es la que decide la compra. Son aditivos, de bajo/medio esfuerzo y sin riesgo de romper lo existente.

Puedo incluir (5) SEO/OG como bonus si querés, pero lo dejaría para un segundo cambio para no mezclar responsabilidades.

## Risks

- El buscador overlay necesita cuidar accesibilidad (focus, escape, click-outside).
- "Related" debe migrar a `useCatalogProducts` para respetar los edits del admin.
- No tocar la lógica del carrito/checkout en este cambio (quedan para otro).

## Ready for Proposal

Sí — el orchestrator puede pedir al usuario que confirme el scope (buscador + página de producto) y armar un cambio `ux-refinamiento` con esas mejoras. Opcionalmente incluir SEO/OG si el usuario lo quiere en el mismo cambio.
