# Search Overlay Specification

## Purpose

Define el buscador global de la tienda: un overlay que permite al usuario buscar productos por nombre, descripción o categoría con resultados en vivo, navegación por teclado y cierre accesible.

## Requirements

### Requirement: Visibilidad de búsqueda

La tienda DEBE ofrecer un acceso visible al buscador desde el encabezado en todas las páginas. El icono de búsqueda DEBE estar presente y ser clicable en desktop, y el buscador DEBE ser accesible también en móvil.

#### Scenario: Abrir buscador desde el header

- GIVEN el usuario está en cualquier página
- WHEN el usuario hace clic en el icono de búsqueda del header
- THEN se abre un overlay de búsqueda con un campo de texto enfocado

### Requirement: Búsqueda en vivo

El overlay DEBE filtrar productos en tiempo real mientras el usuario escribe, usando el término como substring (case-insensitive) sobre nombre, descripción y categoría. El sistema DEBE mostrar las coincidencias en una lista.

#### Scenario: Buscar por nombre

- GIVEN el overlay abierto y productos cargados
- WHEN el usuario escribe "vestido" en el campo
- THEN se muestran los productos cuyo nombre contiene "vestido"

#### Scenario: Búsqueda sin coincidencias

- GIVEN el overlay abierto
- WHEN el usuario escribe un término sin coincidencias
- THEN se muestra un mensaje de "sin resultados" y no se listan productos

### Requirement: Selector de resultado

El usuario DEBE poder hacer clic en un resultado para ir a la página de ese producto, y el overlay DEBE cerrarse.

#### Scenario: Seleccionar un producto

- GIVEN la lista de resultados visible
- WHEN el usuario hace clic en un producto
- THEN el navegador navega a `/producto/{id}` y el overlay se cierra

### Requirement: Cierre del overlay

El overlay DEBE cerrarse al presionar la tecla Escape o al hacer clic fuera del panel. El foco DEBE volver al elemento que lo abrió.

#### Scenario: Cerrar con Escape

- GIVEN el overlay abierto
- WHEN el usuario presiona la tecla Escape
- THEN el overlay se cierra y el foco vuelve al icono de búsqueda

#### Scenario: Cerrar con click-fuera

- GIVEN el overlay abierto
- WHEN el usuario hace clic en el fondo oscuro
- THEN el overlay se cierra

### Requirement: Resultados acotados

El sistema DEBE limitar la cantidad de resultados mostrados para mantener el rendimiento, sin paginación en el overlay.

#### Scenario: Límite de resultados

- GIVEN una búsqueda que coincide con más de 8 productos
- WHEN se muestra la lista
- THEN se muestran como máximo 8 productos y el resto se indica con "mostrar todo" opcional
