# Tasks: UI/UX Refinamiento (Buscador + Página de Producto)

## Phase 1: Buscador global (SearchOverlay)

- [ ] 1.1 Crear `components/search-overlay.tsx`: dialog con input, estado `query`, lista de resultados
- [ ] 1.2 Usar `useCatalogProducts()` + `searchProducts` para filtrar en vivo (debounce ~180ms, límite 8 resultados)
- [ ] 1.3 Resultados como `<Link>` a `/producto/{id}`; cerrar overlay al hacer clic
- [ ] 1.4 Accesibilidad: `role="dialog"`, `aria-modal`, autofocus al abrir
- [ ] 1.5 Cerrar con tecla Escape y click-fuera; devolver foco al trigger

## Phase 2: Integrar buscador en el header

- [ ] 2.1 En `components/header.tsx`: añadir estado `isSearchOpen`
- [ ] 2.2 Conectar el icono de búsqueda al overlay (onClick abre)
- [ ] 2.3 Renderizar `<SearchOverlay isOpen={isSearchOpen} onClose={...} />` en el header
- [ ] 2.4 Hacer visible el botón de búsqueda en móvil (ya `hidden sm:flex`; ajustar para mostrar)

## Phase 3: Mejorar página de producto

- [ ] 3.1 Añadir rating estrellas + contador de reviews en `app/producto/[id]/page.tsx`
- [ ] 3.2 Mostrar badge de descuento "-%" junto al precio (si aplica)
- [ ] 3.3 Rediseñar bloque de envío: recuadro con icono Truck y copy claro
- [ ] 3.4 Migrar "relacionados" de `getProductById`/`products` a `useCatalogProducts()`

## Phase 4: Verificación

- [ ] 4.1 `npx tsc --noEmit` sin errores
- [ ] 4.2 `npm run build` sin errores (14/14 páginas)
- [ ] 4.3 Verificar HTTP 200 en `/`, `/tienda`, y una página de producto
- [ ] 4.4 Probar manualmente: abrir buscador, buscar "vestido", cerrar con ESC, seleccionar resultado
- [ ] 4.5 Verificar que relacionados reflejen un precio editado desde `/admin`
