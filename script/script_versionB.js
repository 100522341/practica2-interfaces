"use strict";
/* ----Seleccionamos los elementos del DOM---- */
// Carrusel
const flechaIzquierda = document.querySelector(".flecha-izquierda");
const flechaDerecha = document.querySelector(".flecha-derecha");
const packsViajes = document.querySelector(".packs-viajes");
const packViaje1 = document.querySelector(".pack-viaje1");
const packViaje2 = document.querySelector(".pack-viaje2");
const packViaje3 = document.querySelector(".pack-viaje3");
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
// Carrusel
let indiceActual = 0;
let autoPlayTimer = setInterval(avanzar_pack, 2000);
let pack = 0;
// Cerrar sesion
let scrollPosY = 0;
let scrollPosX = 0;

/* ----Funciones del programa---- */

// Carrusel

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

  if (!titulo || !descripcion) {
    alert("Debes escribir un título y un consejo");
    return;
  }

  const arrayConsejos = JSON.parse(
    localStorage.getItem("arrayConsejos") || "[]"
  );

  arrayConsejos.push({ titulo, descripcion });

  localStorage.setItem("arrayConsejos", JSON.stringify(arrayConsejos));

  // "Limpiamos" para meter nuevos consejos
  tituloConsejo.value = "";
  descripcionConsejo.value = "";

  mostrarUltimosConsejos();
}

function mostrarUltimosConsejos() {
  // Limpiamos la lista de consejos
  listaConsejos.innerHTML = "";
  const arrayConsejos = JSON.parse(
    localStorage.getItem("arrayConsejos") || "[]"
  );

  // Reverse para mostrar el consejo más reciente primero
  const ultimosTres = arrayConsejos.slice(-3).reverse();

  for (let i = 0; i < ultimosTres.length; i++) {
    const consejo = ultimosTres[i];

    const li = document.createElement("li");
    li.innerHTML =
      '<a href="consejo' + (i + 1) + '.html">' + consejo.titulo + "</a>";

    listaConsejos.appendChild(li);
  }
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
document.addEventListener("DOMContentLoaded", mostrarUltimosConsejos);
