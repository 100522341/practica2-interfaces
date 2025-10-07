/*  AQUÍ IRÁ TODO NUESTRO SCRIPT  (creo que es como
el style.css, aunque en el enunciado pone SCRIPTS. Mejor si lo hacemos
separado creo)*/

/* HE creado 4 pero quizás sobre 1 (el de la versión idéntica a index.html)*/

/* ----Seleccionamos los elementos del DOM---- */
const flechaIzquierda = document.querySelector(".flecha-izquierda");
const flechaDerecha = document.querySelector(".flecha-derecha");
const packsViajes = document.querySelector(".packs-viajes");
const packViaje1 = document.querySelector(".pack-viaje1");
const packViaje2 = document.querySelector(".pack-viaje2");
const packViaje3 = document.querySelector(".pack-viaje3");

/* ----Creamos variables de estado---- */
let indiceActual = 0;
let autoPlayTimer = 0;
let pack = 0;

/* ----Funciones del programa---- */

function mostrar_packs(indice) {
  // Quitar clases visible y fade de todos
  packViaje1.classList.remove("visible", "fade");
  packViaje2.classList.remove("visible", "fade");
  packViaje3.classList.remove("visible", "fade");

  if (indice === 0) {
    packViaje1.classList.add("visible", "fade");
  } else if (indice === 1) {
    packViaje2.classList.add("visible", "fade");
  } else if (indice === 2) {
    packViaje3.classList.add("visible", "fade");
  }

  // Mostrar pack y activar animación fade
  pack.classList.add("visible", "fade");
}

function iniciar_autoplay_packs() {
  clearTimeout(autoPlayTimer);

  // Hacemos que ocurra la acción cada 2 segundos
  autoPlayTimer = setTimeout(function () {
    avanzar_pack();
    iniciar_autoplay_packs();
  }, 2000);
}

function avanzar_pack() {
  indiceActual = (indiceActual + 1) % 3;
  mostrar_packs(indiceActual);
}

function retroceder_pack() {
  indiceActual = (indiceActual - 1 + 3) % 3;
  mostrar_packs(indiceActual);
}

/* ----Acciones del programa: valores iniciales y eventos---- */

// Mostramos el primer pack al cargar sin animación
packViaje1.classList.add("visible");

// Iniciamos el contador de los packs
iniciar_autoplay_packs();

flechaDerecha.addEventListener("click", function () {
  avanzar_pack();
  iniciar_autoplay_packs(); // Reiniciar la espera
});

flechaIzquierda.addEventListener("click", function () {
  retroceder_pack();
  iniciar_autoplay_packs(); // Reiniciar la espera
});
