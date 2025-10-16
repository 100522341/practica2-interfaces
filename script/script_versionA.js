"use strict";
/* ----Imports---- */
import {
  solo_letras,
  validar_email,
  validar_password,
  setMaxFecha,
} from "./script_datos_formulario.js";

/* ----Seleccionamos los elementos del DOM---- */
const form      = document.getElementById('formA');
const nombre    = document.getElementById('nombre');
const apellidos = document.getElementById('apellidos');
const correo    = document.getElementById('correo');
const correo2   = document.getElementById('correo2');
const fecha     = document.getElementById('fecha');
const login     = document.getElementById('login');
const password  = document.getElementById('password');
const imagen    = document.getElementById('imagen');
const politica  = document.getElementById('politica');
const boton     = document.getElementById('btn-guardar');

/*Funciones el programa*/
function activarBoton() {
  boton.disabled = !politica.checked;
}

function activarFormulario() {
  //Establece la fecha maxima en el dia de hoy
  setMaxFecha(fecha);
  //Activar o desactivar botón según si se acepta la política o no
}
// Llamas a la función al cargar
activarFormulario();



/* ----Acciones del programa--- */
politica.addEventListener('change', activarBoton);
activarBoton(); // El boton guardar datos se desactiva

form.addEventListener('submit', function (event) {
  event.preventDefault();//Proporciona los errores al pulsar el boton guardar datos

  // Aceptar la politica de privacidad
  if (!politica.checked) {
    alert('Debes aceptar la política de privacidad.');
    politica.focus();
    return;
  }

  // Longitud del nombre y que solo contenga letras
  const nom = nombre.value.trim();
  if (nom.length < 3 || !solo_letras(nom)) {
    alert('El nombre debe tener al menos 3 letras y solo contener letras y espacios.');
    nombre.focus();
    return;
  }

  // Dos apellidos con ciertos requisitos
  const apellido = apellidos.value.trim();
  // Valida que haya al menos dos apellidos, cada uno con 3+ letras 
  if (!/^[A-Za-zñÑ]{3,}\s+[A-Za-zñÑ]{3,}.*$/.test(apellido)) {
    alert('Introduce al menos dos apellidos, cada uno con 3 o más letras.');
    apellidos.focus();
    return;
  }

  // Los correos deben ser iguales
  const mail1 = correo.value.trim();
  const mail2 = correo2.value.trim();
  if (!validar_email(mail1)) {
    alert('Correo electrónico no válido');
    correo.focus();
    return;
  }
  if (mail1 !== mail2) {
    alert('Los correos no coinciden.');
    correo2.focus();
    return;
  }

  // Fecha de nacimiento que no sea posterior a la actual
  const fechaHoy = fecha.value;
  const hoy = new Date().toISOString().slice(0, 10);
  if (!fechaHoy || fechaHoy > hoy) {
    alert('Fecha de nacimiento no válida');
    fecha.focus();
    return;
  }

  // Login
  const log = login.value.trim();
  if (log.length < 5) {
    alert('El login debe tener al menos 5 caracteres.');
    login.focus();
    return;
  }

  // Password
  const pass = password.value.trim();
  if (!validar_password(pass)) {
    alert('La contraseña debe tener 8 caracteres, al menos 2 números, 1 carácter especial, 1 mayúscula y 1 minúscula.');
    password.focus();
    return;
  }

  // Imagen (webp/png/jpg)
  const file = imagen.files[0];
  const tiposPermitidos = ['image/webp', 'image/png', 'image/jpeg'];
  if (!file || !tiposPermitidos.includes(file.type)) {
    alert('Selecciona una imagen válida (webp, png o jpg).');
    imagen.focus();
    return;
  }

  /*---------Guardado del usuario-------- */

  // Construimos un objeto usuario con los valores introducidos
  const usuario = {
    nombre: nom,
    apellidos: apellido,
    correo: mail1,
    login: log,
  };

  // Guardamos los datos del usuario en el localStorage (diccionario por login)
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}"); // Carga los usuarios guardados o un objeto vacío
  usuarios[usuario.login] = usuario; // Guarda o actualiza al usuario
  localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Actualiza el localStorage con todos los usuarios
  localStorage.setItem("sesion", JSON.stringify({ login: usuario.login })); // Guarda la sesión actual (clave 'sesion', como la usabas)

  window.location.href = 'version-B.html';
});
