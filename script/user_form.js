"use strict";

/* ----Seleccionamos los elementos del DOM---- */
export const inputUsuario = document.getElementById("usuario");
export const inputContraseña = document.getElementById("contraseña");
// const inputCredenciales = document.getElementById("#credenciales"); no se tiene que implementar según el enunciado

/* ---- Funciones del formulario ---- */
export function iniciar_sesion(e) {
  // Evitamos el envío automático del formulario
  e.preventDefault();
  const usuario = inputUsuario.value.trim();
  const contraseña = inputContraseña.value.trim();

  if (!usuario || !contraseña) {
    alert("Por favor, completa todos los campos de registro");
    return;
  }

  const usuariosGuardados = JSON.parse(
    localStorage.getItem("usuarios") || "[]"
  );

  const usuarioExistente = usuariosGuardados[usuario];

  if (usuarioExistente && usuarioExistente.password === contraseña) {
    // Redirigir a versión B, guardando el usuario en el sesion
    localStorage.setItem(
      "sesion",
      JSON.stringify({
        login: usuarioExistente.login,
        imagen: usuarioExistente.imagen,
      })
    );
    window.location.href = "version-B.html";
  } else {
    alert("Usuario o contraseña incorrectos. Por favor, verifica tus datos.");
  }
}

export function registrar(e) {
  // Solo tenemos que mandar a la version B
  e.preventDefault();
  window.location.href = "version-A.html";
}
