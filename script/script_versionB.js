"use strict";
/* ----Imports---- */
import {
  flechaIzquierda,
  flechaDerecha,
  packViaje1,
  avanzar_pack,
  retroceder_pack,
} from "./carrusel.js";

/* ----Seleccionamos los elementos del DOM---- */
// Cerrar sesion
const btnCerrarSesion = document.querySelector(".boton-cerrar-B");
const modalCerrarSesion = document.querySelector(".modal-confirmacion");
const btnModalCancelar = document.querySelector(
  ".modal-confirmacion .btn-cancelar"
);
const btnModalConfirmar = document.querySelector(
  ".modal-confirmacion .btn-confirmar"
);
// Consejos
const tituloConsejo = document.getElementById("titulo-consejo");
const descripcionConsejo = document.getElementById("descripcion-consejo");
const btnEnviarConsejo = document.getElementById("enviar-consejo");
const listaConsejos = document.getElementById("lista-consejos");

/* ----Creamos variables de estado---- */
// Cerrar sesion
let scrollPosY = 0;
let scrollPosX = 0;

/* ----Funciones del programa---- */

// Modal cerrar sesión

function open_modal() {
  bloquear_vista();
  modalCerrarSesion.classList.toggle("modal-visible");
}

function bloquear_vista() {
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

function desbloquear_vista() {
  window.onscroll = null;
  document.body.style.overflow = "";
}

function modal_cancelar() {
  modalCerrarSesion.classList.toggle("modal-visible");
  desbloquear_vista();
}

function modal_confirmar() {
  modalCerrarSesion.classList.toggle("modal-visible");
  desbloquear_vista();
  window.location.href = "index.html";
}

// Sección últimos consejos
function agregar_consejo() {
  const titulo = tituloConsejo.value.trim();
  const descripcion = descripcionConsejo.value.trim();

  if (!validar_formato_consejos(titulo, descripcion)) {
    alert(
      "El título debe tener al menos 15 caracteres y la descripción al menos 30. El título solo puede contener letras, no símbolos ni números."
    );
    return;
  }

  const arrayConsejos = JSON.parse(
    localStorage.getItem("arrayConsejos") || "[]"
  );

  arrayConsejos.unshift({ titulo, descripcion });

  localStorage.setItem("arrayConsejos", JSON.stringify(arrayConsejos));

  // "Limpiamos" para meter nuevos consejos
  tituloConsejo.value = "";
  descripcionConsejo.value = "";

  mostrar_ultimos_consejos();
}

function mostrar_ultimos_consejos() {
  // Limpiamos la lista de consejos
  listaConsejos.innerHTML = "";
  const arrayConsejos = JSON.parse(
    localStorage.getItem("arrayConsejos") || "[]"
  );

  // Reverse para mostrar el consejo más reciente primero
  const ultimosTres = arrayConsejos.slice(0, 3);

  for (let i = 0; i < ultimosTres.length; i++) {
    const consejo = ultimosTres[i];

    const li = document.createElement("li");
    li.innerHTML =
      '<a href="consejo' + (i + 1) + '.html">' + consejo.titulo + "</a>";

    listaConsejos.appendChild(li);
  }
}

function validar_formato_consejos(titulo, descripcion) {
  return validar_titulo_consejo(titulo) && validar_desc_consejo(descripcion);
}

function validar_titulo_consejo(titulo) {
  return titulo.length >= 15 && solo_letras(titulo);
}

function validar_desc_consejo(descripcion) {
  return descripcion.length >= 30;
}

function solo_letras(texto) {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return regex.test(texto);
}

/* ----Acciones del programa: valores iniciales y eventos---- */

// Mostramos el primer pack al cargar sin animación
packViaje1.classList.add("visible");

// Carrusel
flechaDerecha.addEventListener("click", avanzar_pack);
flechaIzquierda.addEventListener("click", retroceder_pack);

// Modal cerrar sesión
btnCerrarSesion.addEventListener("click", open_modal);
btnModalCancelar.addEventListener("click", modal_cancelar);
btnModalConfirmar.addEventListener("click", modal_confirmar);

// Consejos
btnEnviarConsejo.addEventListener("click", agregar_consejo);
document.addEventListener("DOMContentLoaded", mostrar_ultimos_consejos);
