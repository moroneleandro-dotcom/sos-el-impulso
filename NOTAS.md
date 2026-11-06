# Sos el Impulso — notas del proyecto

Juego que un grupo de alumnos (Franco, Facundo, Valentino, Felipe y Mateo) muestra al final de su presentación escolar de Canva "El Sistema Nervioso". **El público son los padres**, en una sala, con el juego proyectado. Una persona del grupo lo maneja desde la compu.

## Cómo está hecho
- `index.html`: todo el juego (HTML + CSS + JS, sin librerías). Se publica tal cual con GitHub Pages desde la rama `main`.
- `fonts/`: las letras en .woff2 (sin depender de internet, por si el wifi de la escuela es malo), bajadas de Google Fonts:
  - **Atkinson Hyperlegible** (400 y 700), del Braille Institute, para todo el texto de lectura: está diseñada para distinguir bien cada letra de lejos. Licencia **SIL Open Font License 1.1** (uso libre, también en proyectos públicos).
  - Permanent Marker (títulos a mano) y Homemade Apple (firmas): Apache 2.0. Kalam (rótulos del dibujo): SIL Open Font License.
- `CONTENIDO.md`: texto exacto de la presentación. **El juego no puede usar contenido que no esté ahí.**
- Los sonidos se sintetizan con Web Audio (no hay archivos de audio).

## Reglas que pidió el grupo
1. Todo el contenido sale de `CONTENIDO.md`.
2. **No puede aparecer ninguna marca de IA ni de las herramientas usadas para hacerlo** en ningún lado: ni en la página, ni en comentarios, ni en commits.
3. Solo nombres de pila de los chicos (es público).
4. Simple y claro para una presentación escolar corta (5–7 minutos), pero que emocione: ganas de competir, participar y ganar.
5. La dirección pública no cambia: https://moroneleandro-dotcom.github.io/sos-el-impulso/ (está linkeada desde Canva).

## Estructura actual del juego (versión 2)
Portada → **equipos** (cada lado elige su nombre: hay sugeridos sacados de la presentación, se escriben en el campo o se cambian con ↓; cada equipo elige su **Cerebro**, el que dice la respuesta) → **grito de guerra** (cuenta 3-2-1, primer punto; empate = un punto para cada uno) → **reglas** en una pantalla → **6 paradas, 3 para cada equipo** (arrancan los Parasimpáticos; las dos últimas son **doradas** y valen doble, una para cada equipo, anunciadas con un cartel) con mecha de 15 s, redoble, robo de punto (10 s) y el relator que dice cuántos puntos quedan → **duelo de Cerebros** (A y L, con trampas; vale 2; si hay empate, desempate que vale 1) → **campeones** con aplauso para los dos equipos → **diploma** con las 4 ideas de la presentación (para la foto) → **una última señal** con las firmas.

Cada equipo tiene color, patrón (rayas rojas / lunares azules, para que también lo distingan las personas daltónicas), emblema (rayo / luna) y flecha hacia su lado de la sala.

Música original sintetizada con 4 climas: tranquila (portada, equipos, lectura), tensa (mecha y duelo), festiva (campeones y diploma) y emotiva (cierre). Baja sola durante el suspenso.

## Controles del que maneja
Enter seguir (y prender la mecha) · 1 2 3 respuesta · Espacio pausa general · U deshacer el último punto · Retroceso repetir la parada · A y L en el duelo · M música (y + − volumen) · S efectos · F pantalla completa · H ayuda · R reiniciar (pregunta antes) · E en la portada: modo ensayo.
Si se recarga la página en medio de la partida, la portada ofrece "Seguir la partida" (dura 20 minutos).
Guía imprimible de una hoja: `guia.html`.

## Carpetas nuevas
- `investigacion/`: resúmenes con fuentes (atención, juegos y TV, motivación) y la síntesis que guió el diseño.
- `ensayo/`: guion de la presentación, rúbrica, público imaginario, auditoría de contenido y las rondas de evaluación.
- `pruebas/ensayo.mjs`: ensayo automatizado (8 escenarios × 7 resoluciones, con video). `node pruebas/ensayo.mjs` y después `node pruebas/resumen.mjs`.

## Plan de trabajo ampliado
Antes de seguir, leé y cumplí `PLAN-NOCHE.md`: define qué es una presentación espectacular, cómo ensayarla y cuándo se puede dar por terminada.
