/*
 *
 * Requisitos:
 * 1. El laberinto está formado por un cuadrado de 6x6 celdas.
 * 2. Los valores de las celdas serán:
 *    - ⬜️ Vacío
 *    - ⬛️ Obstáculo
 *    - 🐭 Mickey
 *    - 🚪 Salida
 * Acciones:
 * 1. Crea una matriz que represente el laberinto (no hace falta
 * que se genere de manera automática).
 * 2. Interactúa con el usuario por consola para preguntarle hacia
 * donde se tiene que desplazar (arriba, abajo, izquierda o derecha).
 * 3. Muestra la actualización del laberinto tras cada desplazamiento.
 * 4. Valida todos los movimientos, teniendo en cuenta los límites
 * del laberinto y los obstáculos. Notifica al usuario.
 * 5. Finaliza el programa cuando Mickey llegue a la salida.
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin, // For user input from the console
  output: process.stdout, // For displaying output to the console
});
let labfacil = [
  ["🐭", "⬛️", "⬛️", "⬛️", "⬛️", "⬛️"], //tengo un arr.length de 6
  ["⬜️", "⬛️", "⬛️", "⬛️", "⬜️", "⬛️"], //tengo 6 columnas o 6 arr
  ["⬜️", "⬛️", "⬛️", "⬛️", "⬜️", "⬛️"], //x <> es en horixontal y ^es en vertical
  ["⬜️", "⬜️", "⬜️", "⬜️", "⬜️", "⬜️"],
  ["⬛️", "⬜️", "⬛️", "⬜️", "⬛️", "⬛️"],
  ["⬛️", "⬜️", "⬛️", "⬜️", "⬜️", "🚪"],
];
let labDificil = [
  ["⬛️", "⬜", "⬜", "⬜", "⬜", "⬛️"], //tengo un arr.length de 6
  ["⬜️", "⬜", "⬛️", "⬛️", "⬜️", "⬛️"], //tengo 6 columnas o 6 arr
  ["⬜️", "⬛️", "🐭", "⬛️", "⬜️", "⬛️"], //x <> es en horixontal y ^es en vertical
  ["⬜️", "⬜️", "⬜️", "⬛️", "⬜️", "⬜️"],
  ["⬛️", "⬜️", "⬛️", "⬛️", "⬛️", "⬜️"],
  ["⬛️", "⬜", "⬛️", "⬛️", "⬛️", "🚪"],
];
let labnegro = [
  ["⬛️", "⬛️", "⬛️", "⬛️", "⬛️", "⬛️"], //voy pintando el laverinto en consola
  ["⬛️", "⬛️", "⬛️", "⬛️", "⬛️", "⬛️"],
  ["⬛️", "⬛️", "⬛️", "⬛️", "⬛️", "⬛️"],
  ["⬛️", "⬛️", "⬛️", "⬛️", "⬛️", "⬛️"],
  ["⬛️", "⬛️", "⬛️", "⬛️", "⬛️", "⬛️"],
  ["⬛️", "⬛️", "⬛️", "⬛️", "⬛️", "⬛️"],
];
let currentMickey;
let currentLab


function displayLabyrinth(laber) {
  // Puedes limpiar la consola antes de redibujar para una mejor visualización
  // console.clear(); // Descomenta si tu terminal lo soporta y te gusta el efecto
  laber.forEach((row) => console.log(row.join(" ")));
}

function laberinto(respuesta) {
  const oldMickeyX = currentMickey.x;
  const oldMickeyY = currentMickey.y;

  // Calculate new position based on input
  let newMickeyX = currentMickey.x;
  let newMickeyY = currentMickey.y;

  if (respuesta === "w") {
    newMickeyY -= 1; // 'w' moves up, so decrease y (row index)
  } else if (respuesta === "s") {
    newMickeyY += 1; // 's' moves down, so increase y (row index)
  } else if (respuesta === "a") {
    newMickeyX -= 1; // 'a' moves left, so decrease x (column index)
  } else if (respuesta === "d") {
    newMickeyX += 1; // 'd' moves right, so increase x (column index)
  } else {
    console.log("Movimiento inválido. Usa 'w', 's', 'a', o 'd'.");
    comenzar(); // Prompt again for valid input
    return; // Exit this turn
  }
  console.log("sumo o resto y & x")
  console.log(currentLab[newMickeyY][newMickeyX])

  //si es menor a 0 o mayor a 6 entonces no puedes por que es el limite de la pared
  

  if (
    newMickeyX >= 0 &&
    newMickeyX < 6 &&
    newMickeyY >= 0 &&
    newMickeyY < 6
  ) {
    if (currentLab[newMickeyY][newMickeyX] === "⬜️") {
      console.log("avanzas");
      currentMickey["y"] = newMickeyY;
      currentMickey["x"] = newMickeyX;
      currentLab[currentMickey.y][currentMickey.x] = "🐭";
      currentLab[oldMickeyY][oldMickeyX] = "⬜️";
      labnegro[currentMickey.y][currentMickey.x] = "🐭";
      labnegro[oldMickeyY][oldMickeyX] = "⬜️";
      console.log(currentMickey)
      displayLabyrinth(labnegro);
      comenzar();
    }else if (currentLab[newMickeyY][newMickeyX] === "⬛️") {
      console.log("Hay un muro en esa direccion");
      displayLabyrinth(labnegro);
      comenzar();
    }else if (currentLab[newMickeyY][newMickeyX] === "🚪") {
      console.log("Ganaste =)");
      displayLabyrinth(currentLab);
      init();
    }

    
  } else {
    console.log("no puedes salirte de las paredes");
    displayLabyrinth(labnegro);
    comenzar()

    
  }
}

function comenzar() {
  rl.question(
    "Puedes desplazarte para arriba: 'w', abajo:'s' 'izquierda:'a', derecha'd'",
    (respuesta) => {
      laberinto(respuesta);
    }
  );
}

function init() {
  rl.question(
    "Elije la dificultad de jue 'f' para Facil y 'd' para dificil",
    (respuesta) => {
      if (respuesta === "f") {
        currentMickey = { x: 0, y: 0 };
        console.log(currentMickey)
        currentLab = labfacil;
        console.log(currentLab)
        labnegro[currentMickey.y][currentMickey.x] = "🐭"
        console.log("Eljuego esta en dificultad Facil")
        console.log(labnegro)
        comenzar()
      }
      if(respuesta === 'd'){
        currentMickey= {x:2, y:2}
        currentLab = JSON.parse(JSON.stringify(labDificil))
        labnegro[currentMickey.y][currentMickey.x] = "🐭"
        console.log("Eljuego esta en dificultad Dificil")
        console.log(labnegro)
        comenzar()

      }else{
        console.log("Difcultadi no reconocida favor de volve a intentar")
        init()
      }
    }
  );
}

console.log(
  "Bienvenido al juego de MickeyMouse ayuda a mickey a encontrar la salida"
);
displayLabyrinth(labnegro);
init();




// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let labfacil = [
//   ["🐭", "⬛️", "⬛️", "⬛️", "⬛️", "⬛️"],
//   ["⬜️", "⬛️", "⬛️", "⬛️", "⬜️", "⬛️"],
//   ["⬜️", "⬛️", "⬛️", "⬛️", "⬜️", "⬛️"],
//   ["⬜️", "⬜️", "⬜️", "⬜️", "⬜️", "⬜️"],
//   ["⬛️", "⬜️", "⬛️", "⬜️", "⬛️", "⬛️"],
//   ["⬛️", "⬜️", "⬛️", "⬜️", "⬜️", "🚪"],
// ];

// let labDificil = [
//   ["⬛️", "⬜️", "⬜️", "⬜️", "⬜️", "⬛️"],
//   ["⬜️", "⬜️", "⬛️", "⬛️", "⬜️", "⬛️"],
//   ["⬜️", "⬛️", "🐭", "⬛️", "⬜️", "⬛️"],
//   ["⬜️", "⬜️", "⬜️", "⬛️", "⬜️", "⬜️"],
//   ["⬛️", "⬜️", "⬛️", "⬛️", "⬛️", "⬜️"],
//   ["⬛️", "⬜️", "⬛️", "⬛️", "⬛️", "🚪"],
// ];

// // Inicializa labnegro con todos los cuadrados negros
// let labnegro = Array(6)
//   .fill(null)
//   .map(() => Array(6).fill("⬛️"));

// let currentMickey;
// let currentLab;

// function displayLabyrinth(laber) {
//   laber.forEach((row) => console.log(row.join(" ")));
// }

// function laberinto(respuesta) {
//   const oldMickeyX = currentMickey.x;
//   const oldMickeyY = currentMickey.y;

//   let newMickeyX = currentMickey.x;
//   let newMickeyY = currentMickey.y;

//   // Determina las posibles nuevas coordenadas basándose en la entrada
//   if (respuesta === "w") {
//     newMickeyY -= 1;
//   } else if (respuesta === "s") {
//     newMickeyY += 1;
//   } else if (respuesta === "a") {
//     newMickeyX -= 1;
//   } else if (respuesta === "d") {
//     newMickeyX += 1;
//   } else {
//     console.log("Movimiento inválido. Usa 'w', 's', 'a', o 'd'.");
//     displayLabyrinth(labnegro); // Muestra el estado actual si la entrada es incorrecta
//     comenzar();
//     return;
//   }

//   // Valida la nueva posición
//   if (
//     newMickeyX >= 0 &&
//     newMickeyX < 6 && // Cambiado a < 6 ya que los índices de los arrays son 0-5
//     newMickeyY >= 0 &&
//     newMickeyY < 6 // Cambiado a < 6
//   ) {
//     const targetCell = currentLab[newMickeyY][newMickeyX];

//     if (targetCell === "⬜️") {
//       // Movimiento válido a un espacio vacío
//       console.log("¡Avanzas!");
//       currentMickey.y = newMickeyY;
//       currentMickey.x = newMickeyX;

//       // Actualiza labnegro para la visualización
//       labnegro[oldMickeyY][oldMickeyX] = "⬜️"; // Limpia la antigua posición de Mickey
//       labnegro[currentMickey.y][currentMickey.x] = "🐭"; // Coloca a Mickey en la nueva posición

//       displayLabyrinth(labnegro);
//       comenzar();
//     } else if (targetCell === "⬛️") {
//       // Chocó con un obstáculo
//       console.log("¡Hay un muro en esa dirección!");
//       displayLabyrinth(labnegro); // Muestra el estado actual, Mickey no se movió
//       comenzar();
//     } else if (targetCell === "🚪") {
//       // Llegó a la salida
//       console.log("¡Ganaste! =)");
//       currentMickey.y = newMickeyY;
//       currentMickey.x = newMickeyX;
//       labnegro[oldMickeyY][oldMickeyX] = "⬜️";
//       labnegro[currentMickey.y][currentMickey.x] = "🐭";
//       displayLabyrinth(labnegro); // Muestra el estado final con Mickey en la salida
//       rl.close(); // Cierra la interfaz readline
//       return; // Termina el juego
//     }
//   } else {
//     // Intentó moverse fuera de los límites
//     console.log("¡No puedes salirte del laberinto!");
//     displayLabyrinth(labnegro); // Muestra el estado actual, Mickey no se movió
//     comenzar();
//   }
// }

// function comenzar() {
//   rl.question(
//     "Puedes desplazarte: 'w' (arriba), 's' (abajo), 'a' (izquierda), 'd' (derecha): ",
//     (respuesta) => {
//       laberinto(respuesta);
//     }
//   );
// }

// function init() {
//   rl.question(
//     "Elige la dificultad del juego: 'f' para Fácil y 'd' para Difícil: ",
//     (respuesta) => {
//       // Reinicia labnegro para un nuevo juego
//       labnegro = Array(6)
//         .fill(null)
//         .map(() => Array(6).fill("⬛️"));

//       if (respuesta === "f") {
//         currentMickey = { x: 0, y: 0 };
//         currentLab = JSON.parse(JSON.stringify(labfacil)); // Clona el laberinto
//         console.log("El juego está en dificultad Fácil.");
//       } else if (respuesta === "d") {
//         currentMickey = { x: 2, y: 2 }; // Posición inicial de Mickey para dificultad difícil
//         currentLab = JSON.parse(JSON.stringify(labDificil)); // Clona el laberinto
//         console.log("El juego está en dificultad Difícil.");
//       } else {
//         console.log("Dificultad no reconocida. Por favor, intenta de nuevo.");
//         init();
//         return; // Sale para no continuar con el flujo si la dificultad es inválida
//       }
//       // Asegúrate de que Mickey se coloque en labnegro al inicio
//       labnegro[currentMickey.y][currentMickey.x] = "🐭";
//       displayLabyrinth(labnegro);
//       comenzar();
//     }
//   );
// }

// console.log(
//   "¡Bienvenido al juego de Mickey Mouse! Ayuda a Mickey a encontrar la salida."
// );
// displayLabyrinth(labnegro); // Muestra el laberinto inicial vacío
// init();