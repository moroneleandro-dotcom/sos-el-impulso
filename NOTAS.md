# Sos el Impulso — notas del proyecto

Juego que un grupo de alumnos (Franco, Facundo, Valentino, Felipe y Mateo) muestra al final de su presentación escolar de Canva "El Sistema Nervioso". **El público son los padres**, en una sala, con el juego proyectado. Una persona del grupo lo maneja desde la compu.

## Cómo está hecho
- `index.html`: todo el juego (HTML + CSS + JS, sin librerías). Se publica tal cual con GitHub Pages desde la rama `main`.
- `fonts/`: las letras en .woff2 (sin depender de internet, por si el wifi de la escuela es malo). Kalam (SIL Open Font License), Permanent Marker y Homemade Apple (Apache 2.0), de Google Fonts.
- `CONTENIDO.md`: texto exacto de la presentación. **El juego no puede usar contenido que no esté ahí.**
- Los sonidos se sintetizan con Web Audio (no hay archivos de audio).

## Reglas que pidió el grupo
1. Todo el contenido sale de `CONTENIDO.md`.
2. **No puede aparecer ninguna marca de IA ni de las herramientas usadas para hacerlo** en ningún lado: ni en la página, ni en comentarios, ni en commits.
3. Solo nombres de pila de los chicos (es público).
4. Simple y claro para una presentación escolar corta (5–7 minutos), pero que emocione: ganas de competir, participar y ganar.
5. La dirección pública no cambia: https://moroneleandro-dotcom.github.io/sos-el-impulso/ (está linkeada desde Canva).

## Estructura actual del juego
Intro → elección de bandos (Simpáticos vs Parasimpáticos, gritos de guerra, primer punto) → 7 paradas en las que una "señal" viaja por un dibujo de palitos (pie → nervios → médula → tronco del encéfalo → cerebro → eferente → músculo; perro → simpático; calma → parasimpático) con mecha de 20 s, suspenso, robo de punto y la última parada dorada que vale doble → duelo final de capitanas (teclas A y L, con trampas) → campeones → diploma → cierre emotivo "Una última señal".

Controles del que maneja: Enter avanza · 1, 2, 3 eligen · P pausa la mecha · en el duelo A y L.

## Plan de trabajo ampliado
Antes de seguir, leé y cumplí `PLAN-NOCHE.md`: define qué es una presentación espectacular, cómo ensayarla y cuándo se puede dar por terminada.
