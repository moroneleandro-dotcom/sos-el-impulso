# Plan ampliado: la presentación del sueño

Este plan amplía el encargo inicial. Si estás trabajando en este repositorio, seguilo además del encargo original. Tiene que alcanzar para unas 8 horas de trabajo sostenido, terminado y publicado para el **viernes 6 de noviembre de 2026 a la mañana (hora de Argentina)**.

La pregunta que guía todo es: **¿quedó espectacular? Si la respuesta honesta es "no", seguí trabajando.**

Reglas que no cambian: todo el contenido sale de `CONTENIDO.md`; no aparece ninguna marca de IA en la página, el código, los comentarios ni los commits (sin trailers de coautoría); solo nombres de pila; sin servicios externos; la URL pública no cambia; `main` nunca queda roto (está linkeado desde Canva).

---

## Bloque 1 — Definir qué es "espectacular" (antes de tocar código)

1. Escribí `ensayo/guion.md`: el guion **minuto a minuto** de la presentación ideal. Incluí la parte de Canva (páginas 1 a 7, unos 5 minutos), la transición a la página 8 "¿JUGAMOS?" y el juego entero (5 a 7 minutos). Detallá qué dice cada chico (Franco, Facundo, Valentino, Felipe y Mateo), quién maneja la compu, qué hacen los padres y qué tienen que sentir en cada momento.
2. Escribí `ensayo/rubrica.md` con al menos estos 14 criterios, cada uno puntuado de 1 a 10, con una definición concreta y observable de qué es un 10:
   - Se entiende en los primeros 10 segundos de qué se trata.
   - Las reglas se entienden en una sola pantalla y en menos de 30 segundos.
   - Siempre queda clarísimo qué equipo está jugando, desde el fondo de la sala.
   - El tanteador se lee desde 8 metros.
   - Todo el texto se lee proyectado: tamaño, contraste y largo de las frases.
   - Da ganas de competir: rivalidad, identidad de equipo, remontadas posibles.
   - Da ganas de participar: hay momentos para pararse, gritar y aplaudir.
   - Suspenso y sorpresas bien dosificados, sin cansar.
   - Música y sonidos que suman y no molestan.
   - Hay un pico emocional claro y un final emocionante (regla pico-final).
   - Los padres se van con las ideas principales de la presentación.
   - Todo el contenido es fiel a `CONTENIDO.md` (cero datos inventados).
   - Es fácil de manejar para un alumno nervioso: imposible de romper y con forma de corregir errores.
   - Se ve hecho con cariño y a mano, no genérico ni "de plantilla".
3. Escribí `ensayo/publico.md` con 4 personas imaginarias que van a evaluar cada ronda: una madre competitiva, un padre distraído con el celular, una abuela que ve poco de lejos y el alumno que maneja el juego, nervioso. Para cada una: qué le importa, qué la aburre y qué la emociona.

## Bloque 2 — Ensayo automatizado de la presentación del sueño

4. Creá `pruebas/ensayo.mjs` con Playwright que juegue partidas completas de principio a fin, grabe **video** (la opción `recordVideo` de Playwright) y saque una captura de cada pantalla. Escenarios mínimos:
   - partido parejo que se define en el duelo;
   - paliza de un equipo;
   - remontada en la parada dorada;
   - empate final;
   - todos los errores posibles y la mecha vencida dos veces seguidas;
   - adelantarse en el duelo (con una trampa y antes de tiempo);
   - nadie aprieta en el duelo;
   - el que maneja se equivoca de tecla, aprieta dos veces o pausa la mecha;
   - recargar la página en medio de la partida.
5. Corré cada escenario en 1920x1080, 1366x768, 1280x720 y 1024x768 (proyector 4:3), y simulá el escalado de Windows al 125% y al 150% (con `deviceScaleFactor` o zoom). En la captura del dueño, con zoom, el título se partía en dos líneas y se encimaba con el texto de abajo: ese tipo de error no puede volver a pasar.
6. Medí la **duración real** de la partida con pausas humanas realistas: 8 segundos para leer en voz alta, 6 a 10 segundos para que la sala discuta, etc. Tiene que dar entre 5 y 7 minutos. Si se pasa, recortá.
7. Verificá en cada corrida que la consola no tenga errores ni advertencias, que no haya textos encimados o cortados (medí los rectángulos con `getBoundingClientRect`), y que nada quede fuera de la pantalla.

## Bloque 3 — Evaluación honesta, ronda por ronda

8. Después de cada ensayo, mirá las capturas y escribí `ensayo/ronda-N.md`: el puntaje de cada criterio de la rúbrica, lo que diría cada una de las 4 personas y la lista concreta de cosas a corregir.
9. **Condición para terminar:** todos los criterios en 9 o más durante **dos rondas seguidas**. Si no se cumple, arreglá y repetí. No te pongas puntaje alto por compromiso: si dudás, el puntaje es más bajo.

## Bloque 4 — Mejoras específicas que tienen que estar

10. **Identidad de equipo:** cada bando elige su nombre al empezar, con sugerencias graciosas sacadas de la presentación (por ejemplo "Los Aferentes Furiosos" o "Las Médulas Veloces"). También tiene un emblema simple dibujado a mano y un color con patrón (no solo el color, para que lo distingan las personas daltónicas). El nombre aparece en todos lados.
11. **Turnos justos:** los dos equipos responden la misma cantidad de veces.
12. **Herramientas del que maneja:**
    - una tecla para **deshacer el último punto**;
    - pausa general (no solo de la mecha);
    - una pantalla de ayuda con las teclas;
    - confirmación antes de reiniciar;
    - un "modo ensayo" rápido;
    - que nada se rompa con teclas repetidas.
13. **Qué se llevan los padres:** antes del cierre, una pantalla corta de "lo que acaban de recorrer" con las 3 o 4 ideas clave de la presentación (aferente/eferente, central/periférico, somático/autónomo, simpático/parasimpático), contadas de forma visual y emotiva.
14. **Música:** música de fondo original sintetizada, con 4 climas (intro, tensión con la mecha, festejo, cierre emotivo), transiciones suaves, sin cortes en las repeticiones y balanceada con los efectos. Botón de silencio visible.
15. **Lectura:**
    - el cuerpo del texto con una letra muy legible, de al menos 28 px en 1920 de ancho;
    - contraste AA o más (verificalo calculándolo);
    - frases cortas;
    - un solo foco por pantalla.
16. **Momentos para participar:** que los padres se paren, griten y aplaudan en momentos claros y anunciados, sin forzarlos ni hacerlos sentir en ridículo.
17. **Accesibilidad y robustez:** que funcione en Chrome, Edge y Firefox, con teclado o con toque, en pantalla completa y sin internet (todo local). Que respete "reducir movimiento". Que no se trabe si la ventana queda tapada.
18. **Auditoría de contenido:** `ensayo/auditoria-contenido.md`, una tabla que une cada pregunta, opción y explicación del juego con la frase exacta de `CONTENIDO.md` que la respalda. Si algo no tiene respaldo, se saca.

## Bloque 5 — Pulido final y entrega

19. Hacé una revisión completa de textos (ortografía, tono natural rioplatense, voseo coherente), de ritmo (que ninguna pantalla aburra) y de visuales (que nada se vea genérico).
20. Creá `guia.html`: una guía imprimible de una sola hoja para el alumno que maneja, con las teclas, qué decir en cada momento y qué hacer si algo sale mal.
21. Pasá la versión final a `main`, etiquetala (`vN-estable`) y verificá la URL pública con Playwright después de que se publique.
22. Escribí `ensayo/informe-final.md`: el veredicto honesto de si se logró una presentación espectacular, con los puntajes finales, qué se mejoró, qué no se pudo y qué tiene que ensayar el grupo antes de presentar. Resumilo también en `NOTAS.md`.

Si terminás todo y todavía queda tiempo antes del viernes a la mañana, empezá otra ronda del Bloque 3 con ojos nuevos. Siempre hay algo que se puede hacer más claro, más emocionante o más simple.
