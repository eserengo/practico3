# Practico N3 - Piedra, papel o tijeras en React.

## Objetivo:
El objetivo era replicar lo mas exactamente posible la App creada en el trabajo práctico anterior, usando React.

## La implementación:
Los componentes se desarrollaron con el método funcional.
Para la aplicación el componente principal se ubica en el archivo App.js. Es el componente madre de todos los demás. Maneja el estado de la aplicación que es global, o sea ninguno de los componentes hijos manejan estado. App.js envía el estado a sus descendientes mediante props junto a la función correspondiente para modificarlo, también mediante props.
Renderiza, además de los otros componentes, el título y un box de mensajes que muestra el número de ronda y el ganador de cada una.
El estado que es el corazón de la aplicación es complejo, consta de un objeto con cuatro keys: mensaje, usuario, computadora y número de ronda. El usuario y la computadora a su vez son objetos con varias propiedades.
Aparte de useState, se usaron solamente otros dos hooks en la lógica implementada, useEffect y useRef.

Se crearon cuatro componentes hijos:
- Una form que se encarga de tomar el nombre del usuario y validarlo. Se carga al lanzarse la aplicación en forma de un modal.
- El componente que representa al usuario, consta de un box con imágenes para seleccionar su jugada y otro box que muestra la jugada seleccionada, el nombre y el score.
- El componente que representa a la computadora, consta de nombre, jugada seleccionada y score.
- Por último, el mensaje de fin del juego, que anuncia al ganador y ofrece reiniciar la partida, también se carga como un modal.

## El problema:
El mayor desafío del proyecto se presentó cuando tuve que actualizar el estado del jugador y de la computadora basado en su selección de jugada, recordemos que hay tres tipos posibles de jugadas. Resulta que cuando el usuario o la computadora elegían la misma jugada que en el turno anterior, React compara los dos estados y ve que no hay cambios, por lo que no actualiza el componente. El estado no se actualiza, los componentes no se re-renderizan, hasta que el usuario o la computadora eligieran una mano diferente. Sin embargo el usuario debe tener la posibilidad de jugar la misma mano cuantas veces quiera, por lo que al final terminé creando una especie de clave, que consta de tres dígitos generados aleatoriamente, que se le adjunta a la jugada seleccionada al momento de hacer click en la imagen correspondiente y después se usa slice para sacarla de la string con la que se actualiza el estado, por lo que la probabilidad de que el nuevo estado sea igual al anterior es una en tres mil. Una solución efectiva, pero para nada elegante.

## Lo nuevo:
El otro desafío de la aplicación fue implementar CSS a través de styled-components, biblioteca que no había utilizado anteriormente, por lo que hubo que investigar su documentación, instalar e implementar.
Al principio tuve inconvenientes porque creaba las variables styled. dentro de los componentes, por lo que saltaban varias warnings en la consola porque es algo que no debería hacerse. Recién cuando investigué y deduje que estas variables debían crearse por fuera del componente y después llamarse por dentro del mismo, solucioné los warnings de consola.

## En conclusión:
Un proyecto interesante, lleno de desafíos.