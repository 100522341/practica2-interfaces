"use strict";
/* ----Imports---- */
import {
  flechaIzquierda,
  flechaDerecha,
  packViaje1,
  avanzar_pack,
  retroceder_pack,
} from "./carrusel.js";

import {
  btnCerrarSesion,
  btnModalCancelar,
  btnModalConfirmar,
  open_modal,
  modal_cancelar,
  modal_confirmar,
} from "./modal.js";

import {
  btnEnviarConsejo,
  agregar_consejo,
  mostrar_ultimos_consejos,
} from "./consejos.js";

/* ----Seleccionamos los elementos del DOM---- */

// Cerrar sesion

// Usuario
const fotoUsuario = document.querySelector(".imagen-perfil-usuario");
const nombreUsuario = document.getElementById("texto-usuario");

/* ----Funciones del programa---- */

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
