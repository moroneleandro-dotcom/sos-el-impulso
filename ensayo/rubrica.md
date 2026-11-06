# Rúbrica: ¿quedó espectacular?

Cada criterio va de 1 a 10. Para cada uno se define qué es un 10 (observable), qué es un 7 y cómo se mide en el ensayo.
**Condición para terminar:** todos los criterios en 9 o más durante dos rondas seguidas. Si hay duda, el puntaje es el más bajo.

| # | Criterio | Un 10 es… | Un 7 es… | Cómo se mide |
|---|---|---|---|---|
| 1 | Se entiende en los primeros 10 segundos de qué se trata | La portada tiene título + **una** frase ("ustedes son la señal nerviosa y compiten en dos equipos") y una sola acción. Leerla en voz alta lleva menos de 10 s. | Se entiende, pero hay más de una frase o texto chico que distrae. | Contar palabras de la portada (≤ 25) y cronometrar la lectura. |
| 2 | Las reglas se entienden en una sola pantalla y en menos de 30 s | Una pantalla con 4 reglas visuales (ícono + ≤ 8 palabras cada una), sin desplazamiento. | Las reglas están en una pantalla pero con frases largas o repartidas en dos. | Contar palabras (≤ 45) y verificar que nada quede fuera de pantalla. |
| 3 | Siempre queda clarísimo qué equipo está jugando, desde el fondo de la sala | En toda pantalla de pregunta hay: banda lateral del color y patrón del equipo, flecha hacia su lado de la sala, y el nombre en letras de ≥ 5 % del alto de la pantalla. El tanteador resalta al equipo de turno. En el robo, todo cambia de lado con sonido. | Hay color y nombre, pero falta la flecha o el nombre es chico. | Captura de cada pregunta y robo; medir el alto del nombre. |
| 4 | El tanteador se lee desde 8 metros | Los números miden ≥ 7 % del alto de la pantalla (en una pantalla de 2 m de alto a 8 m, eso es ≈ 14 cm, muy por encima de lo mínimo) y están siempre visibles desde que se forman los equipos. | Se lee pero los números son chicos (< 5 %) o desaparecen en algunas pantallas. | Medir con `getBoundingClientRect` en cada resolución. |
| 5 | Todo el texto se lee proyectado | Cuerpo ≥ 28 px en 1920 de ancho, letra de alta legibilidad, contraste ≥ 4,5:1 (AA) calculado, frases de ≤ 15 palabras, sin texto encimado ni cortado. | Hay algún texto de apoyo chico o con contraste justo. | Medir tamaños, calcular contraste, detectar superposiciones. |
| 6 | Da ganas de competir | Nombres de equipo propios, emblemas, robo de puntos, paradas doradas al final, duelo, el relator dice cuántos puntos quedan en juego (siempre hay remontada posible hasta el duelo). | Hay rivalidad pero el resultado se define temprano o el relator es genérico. | Jugar una paliza y una remontada: ¿hay chance hasta el final? |
| 7 | Da ganas de participar | Al menos 3 momentos anunciados en pantalla: gritar (grito de guerra), pararse (el perro), respirar juntos (Toby) y aplaudir (campeones). Ninguno ridiculiza a nadie. | Hay momentos pero no están anunciados claramente. | Revisar capturas de esos momentos. |
| 8 | Suspenso y sorpresas bien dosificados | Redoble breve (≈ 1 s) antes de cada respuesta, sorpresas puntuales (perro, trampas del duelo), ninguna espera > 3 s sin acción. | Suspenso repetido igual en todas o esperas largas. | Cronometrar las animaciones en el ensayo. |
| 9 | Música y sonidos que suman y no molestan | 4 climas (intro, mecha, festejo, cierre) con transiciones suaves; la música baja cuando hay efectos o suspenso; botón de silencio visible y tecla M. | Hay música pero no cambia o tapa los efectos. | Escuchar/inspeccionar el motor de audio; probar silencio y volumen. |
| 10 | Pico emocional claro y final emocionante | Pico: "¡todos de pie!" y el duelo; final: campeones con aplauso para los dos equipos → diploma con lo aprendido → mensaje final con los nombres. | Hay final pero es largo o plano. | Revisar el recorrido final completo. |
| 11 | Los padres se van con las ideas principales | Pantalla de cierre con las 4 ideas (central/periférico, aferente/eferente, somático/autónomo, simpático/parasimpático), cada una atada a un momento del juego. | Las ideas aparecen solo en las preguntas. | Revisar la pantalla del diploma. |
| 12 | Todo el contenido es fiel a `CONTENIDO.md` | Cada pregunta, opción y explicación tiene una frase de respaldo en `ensayo/auditoria-contenido.md`. Cero datos extra. | Algún matiz no está en la presentación. | Auditoría línea por línea. |
| 13 | Fácil de manejar para un alumno nervioso | Enter para todo; teclas repetidas y doble clic no rompen nada; deshacer punto (U), repetir parada (Retroceso), pausa general (Espacio), ayuda (H), reiniciar con confirmación (R), recuperar tras recargar; modo ensayo. | Funciona, pero un error de tecla no tiene arreglo. | Escenario "el que maneja se equivoca" del ensayo. |
| 14 | Se ve hecho con cariño y a mano | Hoja de carpeta, dibujos con trazo vivo, emblemas dibujados, firmas de los chicos; nada parece plantilla. | Se ve prolijo pero genérico en algunas pantallas. | Mirar todas las capturas una al lado de la otra. |

## Escala
- **10:** no se me ocurre nada que mejorar para este público.
- **9:** detalles menores que nadie en la sala notaría.
- **7–8:** funciona, pero alguien del público lo notaría.
- **5–6:** hay un problema visible.
- **1–4:** no cumple.
