# Design: UI/UX Refinamiento (Buscador + Página de Producto)

## Overview

Mejorar la experiencia de búsqueda y la página de producto. Dos cambios de UI aditivos, sin lógica de negocio compleja.

## Architecture Decisions

### AD-1: Buscador como overlay (dialog) controlado por estado en el header
- Un único componente `SearchOverlay` montado en el header, controlado por un `boolean`.
- Reutiliza `useCatalogProducts()` para respetar los edits del admin (precios/nombres).
- Debounce de ~150-200ms en el input para no recalcular en cada tecla.
- Resultados limitados a 8; links a `/producto/{id}`.
- Accesibilidad: `role="dialog"`, `aria-modal`, focus al abrir, ESC y click-fuera cierran, focus vuelve al trigger.

### AD-2: Página de producto coherente con ProductCard
- Añadir rating (5 estrellas) + contador de reviews junto al precio.
- Badge de descuento si existe `discount` (consistente con la card).
- Bloque de envío rediseñado (recuadro con icono Truck + copy claro).
- Migrar "Productos relacionados" de `products`/`getProductById` a `useCatalogProducts()` para reflejar edits del admin.

### AD-3: No cambiar lógica de carrito/checkout
- El `addItem` sigue igual. Solo se mejora la presentación de la página de producto.

## Data Flow

- `SearchOverlay` → `useCatalogProducts()` → filtra en cliente con `searchProducts` (ya existe) → lista de resultados.
- Al hacer clic → `router.push(/producto/{id})` + cerrar overlay.

## Component Structure

```
components/
├── search-overlay.tsx   ← NEW: dialog de búsqueda
└── header.tsx           ← MODIFIED: renderiza SearchOverlay + estado isSearchOpen

app/
└── producto/[id]/page.tsx  ← MODIFIED: rating, badge, envío, related con catalog
```

## Effort
- Bajo-Medio. Aditivo, sin migraciones de datos ni cambios de estado global.
