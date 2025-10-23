"use strict";
/* ----Seleccionamos los elementos del DOM---- */

const fotoUsuario = document.querySelector(".imagen-perfil-usuario");
const nombreUsuario = document.getElementById("texto-usuario");

export function establecer_usuario() {
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

export function establecer_nombre_usuario(login) {
  if (nombreUsuario) {
    nombreUsuario.textContent = login;
  }
}

export function establecer_imagen_usuario(imagen) {
  if (fotoUsuario) {
    fotoUsuario.src = imagen;
  }
}
