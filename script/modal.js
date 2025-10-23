"use strict";
/* ----Seleccionamos el modal del DOM---- */
const modalCerrarSesion = document.querySelector(".modal-confirmacion");

/* ----Funciones asociadas al modal de cerrar sesión---- */

// Variables de estado
let scrollPosY = 0;
let scrollPosX = 0;

export function bloquear_vista() {
  // Guardar posición actual
  scrollPosX = window.scrollX;
  scrollPosY = window.scrollY;

  // Bloquear scroll
  window.onscroll = function () {
    window.scrollTo(scrollPosX, scrollPosY);
  };

  // Bloquear también con CSS
  document.body.style.overflow = "hidden";
}

export function desbloquear_vista() {
  window.onscroll = null;
  document.body.style.overflow = "";
}

export function open_modal() {
  bloquear_vista();
  modalCerrarSesion.classList.toggle("modal-visible");
}

export function modal_cancelar() {
  modalCerrarSesion.classList.toggle("modal-visible");
  desbloquear_vista();
}

export function modal_confirmar() {
  modalCerrarSesion.classList.toggle("modal-visible");
  desbloquear_vista();
  // Cerramos sesion -> vamos a index y eliminamos el usuario de sesion
  localStorage.removeItem("sesion");
  window.location.href = "index.html";
}
