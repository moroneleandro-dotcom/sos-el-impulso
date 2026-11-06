# Ronda 1 de evaluación

**Versión evaluada:** primera versión nueva (commit "Version 2…").
**Ensayo:** 8 escenarios × 7 configuraciones (1920x1080, 1366x768, 1280x720, 1024x768, Windows 125 % y 150 % de 1920x1080, Windows 125 % de 1366x768) = 56 partidas grabadas en video, ≈ 2.000 capturas revisadas automáticamente y una muestra mirada a ojo.
**Resultado técnico:** 0 errores de consola. 49 partidas completas; las 7 del escenario "manejo" se cortaron (ver punto 13). Problemas detectados: contraste 4,44:1 en los números de las opciones tachadas (pide 4,5) y un botón "¡Al duelo final!" que asomaba 4 px por debajo de la pantalla en 1920x1080 (la nota está girada medio grado).

## Puntajes

| # | Criterio | Puntaje | Por qué |
|---|---|---|---|
| 1 | Se entiende en 10 s | 9 | Portada: título + una frase de 16 palabras + un botón. |
| 2 | Reglas en una pantalla, < 30 s | 9 | 4 reglas con ícono, 38 palabras, sin desplazamiento en ninguna resolución. |
| 3 | Siempre claro quién juega | 8 | Banda lateral con patrón y flecha, cinta con el nombre y tanteador resaltado. Pero el nombre en la cinta midió 4,7–4,9 % del alto en varias pantallas (la rúbrica pide ≥ 5 %). |
| 4 | Tanteador desde 8 m | 8 | 7,7 % del alto en 16:9, pero solo 5,8 % en el proyector 4:3 (1024x768). |
| 5 | Texto legible proyectado | 7 | Cuerpo de 31–33 px en 1920, pero en 5 pantallas el ajuste automático lo achicó a 26–27 px (robo con escena, Toby con respiración, diploma). Contraste 4,44 en opciones tachadas. |
| 6 | Ganas de competir | 9 | Nombres propios, emblemas, robo, dos doradas, duelo; el relator dice cuántos puntos quedan. En la paliza (9-2) igual hubo chance hasta la parada 5. |
| 7 | Ganas de participar | 9 | Grito, "¡todos de pie!", respirar juntos y aplauso para los dos equipos, todos anunciados en pantalla. |
| 8 | Suspenso y sorpresas | 9 | Redoble de 1,1 s, perro, trampas del duelo. |
| 9 | Música y sonidos | 8 | 4 climas con fundidos, la música baja en el suspenso y la pausa, botón visible y tecla M. Medición fuera de línea: el clima "intro" quedó ~6 dB más bajo que los otros y el robo (momento clave) era el efecto más débil. |
| 10 | Pico y final | 9 | Pico en "¡todos de pie!" y el duelo; final: campeones → diploma → mensaje con firmas. |
| 11 | Se llevan las ideas | 8 | Diploma con las 4 ideas atadas a momentos del juego, pero quedó denso y con letra chica (26 px). |
| 12 | Fiel a `CONTENIDO.md` | 10 | Auditoría completa en `auditoria-contenido.md`; se sacó "neurona". |
| 13 | Fácil para un alumno nervioso | 8 | Enter para todo, deshacer, repetir parada, pausa, ayuda, reiniciar con confirmación, recuperar tras recargar (escenario "recarga" ✓). Pero: la protección anti doble tecla ignoraba una tecla válida apretada en los primeros 0,35 s (por eso se cortó el escenario "manejo"), y abrir la ayuda no frenaba la mecha. |
| 14 | Hecho con cariño, a mano | 8 | Hoja cuadriculada, trazo vivo, emblemas dibujados, firmas. Pero en partidas con muchos errores las "quemaduras" ensucian toda la pantalla, incluso en los campeones. |

**Mínimo: 7. No se cumple la condición (todos ≥ 9).**

## Lo que diría cada persona
- **Carolina (competitiva):** "Me encanta que diga cuántos puntos quedan. Pero cuando se adelantaron en el duelo, el cartel estaba del color del otro equipo y no entendí quién había perdido."
- **Martín (distraído):** "Levanto la vista y veo la banda roja y la flecha: sé que nos toca. El '¡TODOS DE PIE!' me hizo pararme."
- **Elena (ve poco):** "Los números del tanteador se ven bien. Algunas explicaciones y el diploma tienen la letra más chica, desde el fondo me cuesta."
- **Mateo (maneja):** "Apreté rápido el 2 en el grito y no pasó nada. Y cuando abrí la ayuda, la mecha siguió corriendo."

## Para corregir
1. Contraste de las opciones tachadas (≥ 4,5).
2. Margen abajo para que la nota girada nunca asome fuera de la pantalla.
3. Nombre en la cinta más grande (≥ 5 % del alto).
4. Tanteador ≥ 7 % también en 4:3.
5. Menos texto en las pantallas que se achicaban: en el robo se oculta la escena; con doble error se muestra solo la respuesta correcta; diploma más compacto.
6. Subir el clima "intro" y el sonido del robo.
7. La ayuda y las confirmaciones pausan el juego.
8. La tecla de las opciones del grito no puede perderse (el guardián anti doble tecla solo para Enter y clics).
9. Duelo adelantado: el cartel con el color de quien se adelantó y una frase clara.
10. Máximo 6 quemaduras visibles y hoja limpia en los campeones.
