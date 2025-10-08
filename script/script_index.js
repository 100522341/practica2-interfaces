/* ----Seleccionamos los elementos del DOM---- */
const flechaIzquierda = document.querySelector(".flecha-izquierda");
const flechaDerecha = document.querySelector(".flecha-derecha");
const packsViajes = document.querySelector(".packs-viajes");
const packViaje1 = document.querySelector(".pack-viaje1");
const packViaje2 = document.querySelector(".pack-viaje2");
const packViaje3 = document.querySelector(".pack-viaje3");

/* ----Creamos variables de estado---- */
let indiceActual = 0;
let autoPlayTimer = setInterval(avanzar_pack, 2000);
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
}

function avanzar_pack() {
  indiceActual = (indiceActual + 1) % 3;
  mostrar_packs(indiceActual);
  reiniciar_intervalo();
}

function retroceder_pack() {
  indiceActual = (indiceActual - 1 + 3) % 3;
  mostrar_packs(indiceActual);
  reiniciar_intervalo();
}

function reiniciar_intervalo() {
  clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(avanzar_pack, 2000);
}

/* ----Acciones del programa: valores iniciales y eventos---- */

// Mostramos el primer pack al cargar sin animación
packViaje1.classList.add("visible");

flechaDerecha.addEventListener("click", avanzar_pack);

flechaIzquierda.addEventListener("click", retroceder_pack);
