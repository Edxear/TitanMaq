# Plan de Ejecucion - TitanMaq

## Objetivo
Dejar el sitio visualmente consistente, tecnicamente mantenible y listo para escalar.

## Pasos
1. Sistema visual unificado (tipografia, color, espaciado)
2. Normalizacion de layout y espaciado entre secciones
3. Componentizacion de layout global (header/footer)
4. Flujo SCSS -> CSS como unica fuente de estilos
5. Optimizacion de imagenes y carga
6. Accesibilidad y formularios
7. SEO tecnico y metadatos sociales
8. QA visual multi-dispositivo
9. Hardening de repositorio y despliegue

## Estado de avance
- Paso 1: completado (sistema visual base unificado)
- Paso 2: completado (espaciado y layout homogenizados en vistas principales)
- Paso 3: completado (header/footer compartidos implementados con inyeccion por templates)
- Paso 4: completado (pipeline SCSS->CSS configurado y operativo)
- Paso 5: completado (variantes WebP generadas e integradas en heroes criticos)
- Paso 6: completado (mejoras de accesibilidad en formularios y navegacion activa)
- Paso 7: completado (metadatos OG/Twitter en vistas principales e internas)
- Paso 8: completado (QA automatica final ejecutada y documentada)
- Paso 9: completado (repo saneado: ignore rules y scripts)

## Siguiente bloque recomendado
- Ejecutar QA visual manual en breakpoints 360/768/1024/1440 para cierre final de release
- Auditar metricas Lighthouse en produccion y ajustar LCP segun resultado real de red
