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
Portada → **equipos, uno por pantalla** (a cada lado de la sala el juego le dice qué sistema es y qué hace, según la página 6: Simpáticos = preparan el cuerpo para el peligro; Parasimpáticos = el cuerpo en reposo; después cada lado escribe su nombre o toca uno sugerido) → **así quedan los equipos** (cada equipo elige su **Cerebro**, el que dice la respuesta del equipo) → **reglas** en una pantalla → **6 paradas, 3 para cada equipo** (arrancan los Parasimpáticos; las dos últimas son **doradas** y valen doble, una para cada equipo, anunciadas con un cartel) con mecha de 15 s, redoble, robo de punto (10 s) y el relator que dice cuántos puntos quedan → **pregunta final** para los dos equipos a la vez (ordenar el recorrido de la señal: pie, nervios de la pierna, médula espinal, tronco del encéfalo, cerebro; 40 s; vale 2 para cada equipo que acierte; si terminan empatados, campeones los dos) → **campeones** con aplauso para los dos equipos → **diploma** con las 4 ideas de la presentación (para la foto) → **una última señal** con las firmas.

Cada equipo tiene color, patrón (rayas rojas / lunares azules, para que también lo distingan las personas daltónicas), emblema (rayo / luna) y flecha hacia su lado de la sala.

Sin música de fondo (el grupo pidió un tono serio): solo efectos de sonido cortos.

## Controles del que maneja
Desde un iPad (o cualquier pantalla táctil): todo se toca; pausa, deshacer, repetir, pantalla completa y reiniciar están en el botón **menú** (arriba a la derecha). En la pregunta final, el que maneja toca el nombre de cada equipo que acertó. Sacar el modo silencio del iPad para que suene.
Enter seguir (y prender la mecha) · 1 2 3 respuesta · Espacio pausa general · U deshacer el último punto · Retroceso repetir la parada · en la pregunta final 1 / 2 marcan qué equipo acertó · S efectos · F pantalla completa · H ayuda · R reiniciar (pregunta antes) · E en la portada: modo ensayo.
Si se recarga la página en medio de la partida, la portada ofrece "Seguir la partida" (dura 20 minutos).
Guía imprimible de una hoja: `guia.html`.

## Carpetas nuevas
- `investigacion/`: resúmenes con fuentes (atención, juegos y TV, motivación) y la síntesis que guió el diseño.
- `ensayo/`: guion de la presentación, rúbrica, público imaginario, auditoría de contenido y las rondas de evaluación.
- `pruebas/ensayo.mjs`: ensayo automatizado (8 escenarios × 7 resoluciones, con video). `node pruebas/ensayo.mjs` y después `node pruebas/resumen.mjs`.

## Resumen de la noche del 5 al 6 de noviembre
- **Última versión estable: v4** (etiqueta `v4-estable`, commit `5329089`), publicada en `main`, que es lo que abre el link de Canva. Antes: v3 (`v3-estable`, `befc303`), v2 (`v2-estable`, `a49fb2f`) y v1 (`v1-estable`, `e085cfd`).
- Para volver a una versión: `git checkout v4-estable -- index.html guia.html fonts` y subir el cambio a `main`.
- Qué cambió: equipos con nombre, emblema y patrón; turnos justos (3 y 3); 6 paradas con dos doradas, una por equipo; duelo de Cerebros con desempate; diploma con las 4 ideas; música en 4 climas; letra muy legible; herramientas para el que maneja; guía imprimible.
- Calidad: 7 rondas de ensayo automatizado (56 a 79 partidas cada una, hasta 9 configuraciones, incluido iPad). Las rondas 3 a 7 cumplieron la rúbrica con todo en 9 o más.
- **v5:** se puede manejar desde un iPad (menú táctil). Ver `ensayo/ronda-7.md`. Detalle en `ensayo/ronda-*.md` y `ensayo/informe-final.md`.
- **Revisar antes de presentar:** una pasada en la sala real con proyector y parlantes (modo ensayo con E; después R + Enter, que lo apaga), volumen, que se lea desde la última fila, quién lee cada parada, imprimir `guia.html`. Si la escuela usa Firefox, abrir el juego una vez antes (no se pudo probar en Firefox).

## Plan de trabajo ampliado
Antes de seguir, leé y cumplí `PLAN-NOCHE.md`: define qué es una presentación espectacular, cómo ensayarla y cuándo se puede dar por terminada.

## Versión 5
- Equipos en dos pasos: cada lado ve qué sistema es (con la definición de la página 6) y elige su nombre; nombres sugeridos para tocar; pantalla "Así quedan los equipos".
- El duelo final ya no usa teclas de los jugadores: los Cerebros levantan la mano y el que maneja arbitra con 1 / 2 (3 repite el rayo). Al mejor de 3, con trampas. También se puede hacer clic en la mitad del rayo que corresponde.
- Guía impresa y prueba automática actualizadas al nuevo flujo.

## Versión 6
- Tono serio: sin grito de guerra, sin música de fondo, sin "¡TODOS DE PIE!" y con nombres sugeridos serios (Equipo Médula, Vía Aferente, Equipo Cerebelo…).
- El duelo se reemplazó por una pregunta final para los dos equipos a la vez: ordenar el recorrido de la señal. Vale 2 para cada equipo que acierte. Si terminan empatados, campeones los dos.
