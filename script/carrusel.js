"use strict";

/* ---- Selección de elementos del DOM ---- */
export const flechaIzquierda = document.querySelector(".flecha-izquierda");
export const flechaDerecha = document.querySelector(".flecha-derecha");
export const packViaje1 = document.querySelector(".pack-viaje1");
export const packViaje2 = document.querySelector(".pack-viaje2");
export const packViaje3 = document.querySelector(".pack-viaje3");

/* ---- Variables de estado ---- */
let indiceActual = 0;
let autoPlayTimer = setInterval(avanzar_pack, 2000);

/* ---- Funciones del carrusel ---- */
export function mostrar_packs(indice) {
  packViaje1.classList.remove("visible", "fade");
  packViaje2.classList.remove("visible", "fade");
  packViaje3.classList.remove("visible", "fade");

  if (indice === 0) packViaje1.classList.add("visible", "fade");
  else if (indice === 1) packViaje2.classList.add("visible", "fade");
  else if (indice === 2) packViaje3.classList.add("visible", "fade");
}

export function avanzar_pack() {
  indiceActual = (indiceActual + 1) % 3;
  mostrar_packs(indiceActual);
  reiniciar_intervalo();
}

export function retroceder_pack() {
  indiceActual = (indiceActual - 1 + 3) % 3;
  mostrar_packs(indiceActual);
  reiniciar_intervalo();
}

function reiniciar_intervalo() {
  clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(avanzar_pack, 2000);
}
