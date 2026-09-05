# Proposal: Rediseño de Marca Premium (Design System)

## Intent

Aplicar el Design System generado por UI UX Pro Max para una tienda e-commerce de moda femenina de lujo: transición del look rosa genérico a una identidad **premium oscura con acento dorado**, tipografía de lujo (Cormorant + Montserrat), y corrección de anti-patrones (emojis como iconos).

## Scope

### In Scope
- Paleta premium dark + dorado (opuesto al rosa saturado)
- Tipografías: Cormorant (títulos serif) + Montserrat (cuerpo)
- Reemplazar emojis de categorías por iconos Lucide
- Actualizar componentes clave al nuevo sistema

### Out of Scope
- Backend / base de datos
- Nuevas funcionalidades
- Otros cambios de UX ya implementados

## Capabilities

### New Capabilities
- `brand-design-system`: identidad visual premium (colores, tipografía, iconos)

### Modified Capabilities
- Ninguna

## Approach

Aplicar el Design System generado: paleta con Primary `#1C1917`, Accent dorado `#A16207`, fondo `#FAFAF9`; tipografía Cormorant para headings y Montserrat para body; reemplazar emojis por iconos Lucide en categorías.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/layout.tsx` | Modified | Fuentes Cormorant + Montserrat |
| `app/globals.css` | Modified | Nueva paleta premium |
| `tailwind.config.js` | Modified | Variables de color, fuentes |
| `lib/products.ts` | Modified | Iconos Lucide en categorías |
| `components/*` | Modified | Header, footer, cards, home |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|-------------|
| Cambio de marca disruptivo | Medium | Mantener coherencia, verificar cada sección |
| Accesibilidad contraste | Low | Usar las variables del sistema (contraste 4.5:1 verificado) |

## Rollback Plan

Revert por git. Los cambios son de estilos; si no convence, `git revert`.

## Success Criteria

- [ ] Paleta premium aplicada en variables de CSS
- [ ] Fuentes Cormorant + Montserrat aplicadas
- [ ] Sin emojis como iconos en categorías
- [ ] build + tsc pasan
