# Proposal: UI/UX Refinamiento (Buscador + Página de Producto)

## Intent

Resolver dos puntos de UX rotos que afectan la conversión de la tienda:
1. El buscador del header es un botón decorativo — no permite buscar productos.
2. La página de producto está incompleta comparada con las cards: sin rating, sin badge de descuento, envío poco destacado, y los "relacionados" ignoran los precios editados por el admin.

## Scope

### In Scope
- Buscador funcional global (overlay con resultados en vivo usando `searchProducts`)
- Página de producto mejorada: rating + reviews, badge de descuento, sección de envío moderna, garantías
- Corregir "Productos relacionados" para respetar los edits del admin (`useCatalogProducts`)

### Out of Scope
- Checkout automatizado por WhatsApp (otro cambio)
- SEO/OpenGraph por producto (otro cambio)
- Base de datos / persistencia real de productos

## Capabilities

### New Capabilities
- `search-overlay`: búsqueda global con resultados en vivo, navegación por teclado, accesible

### Modified Capabilities
- Ninguna (los comportamientos existentes de producto/carrito no cambian a nivel de specs)

## Approach

- Reusar `searchProducts()` de `lib/products.ts` + hook `useCatalogProducts` para reflejar edits del admin.
- Crear componente `SearchOverlay` (dialog) manejado desde el header: results en vivo al escribir, click-outside y ESC para cerrar, focus gestionado.
- En página de producto: añadir rating estrellas (consistente con `ProductCard`), badge "-%" si hay descuento, bloque de envío premium, y migrar "relacionados" a `useCatalogProducts`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `components/header.tsx` | Modified | Conectar icono búsqueda al overlay, renderizar `<SearchOverlay>` |
| `components/search-overlay.tsx` | New | Componente de búsqueda global con resultados en vivo |
| `app/producto/[id]/page.tsx` | Modified | Rating, badge descuento, envío premium, related con admin edits |
| `lib/catalog.ts` | Modified | Exponer helper de búsqueda con productos editados |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Accesibilidad del overlay (focus/esc/click-outside) | Medium | Implementar focus trap, close en ESC/click-outside, aria-* |
| "Related" con datos admin → mismatch server/client | Medium | Usar `useCatalogProducts` con patrón mounted (ya existe en catalog.ts) |
| Input de búsqueda muy lento con muchas imágenes | Low | Debounce input, limitar resultados a 8, solo texto (sin cargar imágenes pesadas) |

## Rollback Plan

Reversible por git: `git revert` del commit del cambio. Los componentes nuevos son aditivos; si el overlay falla, se puede desmontar del header manteniendo todo lo demás.

## Dependencies

- Ninguna externa. Usa dependencias ya instaladas (lucide-react, zustand, next/image).

## Success Criteria

- [ ] Al hacer clic en la lupa se abre un buscador y filtra productos en vivo por nombre/descripción/categoría
- [ ] ESC y click-fuera cierran el buscador; el foco vuelve al trigger
- [ ] La página de producto muestra rating, badge de descuento y sección de envío premium
- [ ] "Productos relacionados" reflejan precios/nombres cambiados desde `/admin`
- [ ] `npm run build` y `tsc --noEmit` pasan sin errores
- [ ] Las 3 rutas clave (`/`, `/producto/[id]`, `/tienda`) responden HTTP 200
