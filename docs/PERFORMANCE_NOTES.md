# Performance Notes - TitanMaq

## Hallazgos de peso de imagenes
1. IMG/PagPiezas/imagenPiezas.png - 2470.9 KB
2. IMG/PagServicios/ImagenServicios.jpg - 848.6 KB
3. IMG/imagenprincipal.jpeg - 340.2 KB

## Impacto esperado
- Estas 3 imagenes son las principales candidatas a afectar LCP y tiempo de descarga en red movil.

## Acciones recomendadas
1. Exportar variantes WebP (calidad 70-80) y mantener fallback JPG/PNG.
2. Generar versiones responsive por ancho (480, 768, 1200).
3. Usar `srcset` y `sizes` en hero y secciones principales.
4. Mantener `fetchpriority="high"` solo para imagen hero principal.
5. Dejar `loading="lazy"` para imagenes secundarias.

## Objetivo de optimizacion
- Hero principal por debajo de 220 KB.
- Ninguna imagen secundaria por encima de 180 KB.
