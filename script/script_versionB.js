"use strict";
/* ----Imports---- */
import {
  flechaIzquierda,
  flechaDerecha,
  packViaje1,
  avanzar_pack,
  retroceder_pack,
} from "./carrusel.js";

import { open_modal, modal_cancelar, modal_confirmar } from "./modal.js";
import {
  btnEnviarConsejo,
  agregar_consejo,
  mostrar_ultimos_consejos,
} from "./consejos.js";

/* ----Seleccionamos los elementos del DOM---- */

// Cerrar sesion
const btnCerrarSesion = document.querySelector(".boton-cerrar-B");
const btnModalCancelar = document.querySelector(
  ".modal-confirmacion .btn-cancelar"
);
const btnModalConfirmar = document.querySelector(
  ".modal-confirmacion .btn-confirmar"
);
// Usuario
const fotoUsuario = document.querySelector(".imagen-perfil-usuario");
const nombreUsuario = document.getElementById("texto-usuario");

// Consejos

/* ----Funciones del programa---- */
/*
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
*/
// Usuario: nombre y foto de perfil
function establecer_usuario() {
  // Obtener de sesion la informacion
  const sesion = JSON.parse(localStorage.getItem("sesion") || "{}");
  if (!sesion.login) {
    // Si no hay sesión activa, redirigimos al login
    window.location.href = "index.html";
    return;
  }
  // Establecemos la información del usuario
  establecer_nombre_usuario(sesion.login);
  establecer_imagen_usuario(sesion.imagen);
}

function establecer_nombre_usuario(login) {
  if (nombreUsuario) {
    nombreUsuario.textContent = login;
  }
}

function establecer_imagen_usuario(imagen) {
  if (fotoUsuario) {
    fotoUsuario.src = imagen;
  }
}

/* ----Acciones del programa: valores iniciales y eventos---- */

// Mostramos el primer pack al cargar sin animación
packViaje1.classList.add("visible");
establecer_usuario();

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
