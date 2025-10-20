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
const formularioRegistro = document.querySelector(".formulario-registro");
const inputUsuario = document.getElementById("usuario");
const inputContraseña = document.getElementById("contraseña");
// const inputCredenciales = document.getElementById("#credenciales");
// no se tiene que implementar según el enunciado
const btnIniciarSesion = document.querySelector(".boton-iniciar-sesion");
const btnRegistro = document.querySelector(".boton-registro-registro");

/* ----Creamos variables de estado---- */

/* ----Funciones del programa---- */

// Formulario de registro
function iniciar_sesion(e) {
  // Evitamos el envío automático del formulario
  e.preventDefault();
  const usuario = inputUsuario.value.trim();
  const contraseña = inputContraseña.value.trim();

  if (!usuario || !contraseña) {
    alert("Por favor, completa todos los campos de registro");
    return;
  }

  const usuariosGuardados = JSON.parse(
    localStorage.getItem("usuariosRegistrados") || "[]"
  );

  let usuarioExistente = null;

  for (let i = 0; i < usuariosGuardados.length; i++) {
    if (
      usuariosGuardados[i].usuario === usuario &&
      usuariosGuardados[i].contraseña === contraseña
    ) {
      usuarioExistente = usuariosGuardados[i];
      break; // salimos cuando lo encontramos
    }
  }

  if (usuarioExistente) {
    // Guardar credenciales SIEMPRE (no incluimos lo de recordar credenciales)

    localStorage.setItem(
      "usuarioAlmacenado",
      JSON.stringify({ usuario, contraseña })
    );

    // Redirigir a versión B
    window.location.href = "version-B.html";
  } else {
    alert("Usuario o contraseña incorrectos. Por favor, verifica tus datos.");
  }
}

function registrar(e) {
  // Solo tenemos que mandar a la version B
  e.preventDefault();
  window.location.href = "version-A.html";
}
/* ----Acciones del programa: valores iniciales y eventos---- */

// Mostramos el primer pack al cargar sin animación
packViaje1.classList.add("visible");

flechaDerecha.addEventListener("click", avanzar_pack);

flechaIzquierda.addEventListener("click", retroceder_pack);

btnIniciarSesion.addEventListener("click", iniciar_sesion);

btnRegistro.addEventListener("click", registrar);
