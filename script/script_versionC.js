"use strict";

/* ----Imports---- */
import {
  validar_email,
  validar_numero_tarjeta,
  cvv_valido,
  diaHoy,
  setMinFecha,
} from "./datos_form.js";

/* ----Seleccionamos los elementos del DOM---- */
const formC = document.getElementById("formC");
const nombreC = document.getElementById("nombreC"); // Nombre completo / titular
const correoC = document.getElementById("correoC");
const tarjeta = document.getElementById("tarjeta"); // Select tipo de tarjeta
const loginC = document.getElementById("loginC"); // Nº de tarjeta
const passwordC = document.getElementById("passwordC"); // Nombre del titular (en tu HTML)
const fechaC = document.getElementById("fechaC"); // Fecha de caducidad
const cvvC = document.getElementById("cvvC"); // CVV

/* ----Acciones del programa: valores iniciales y eventos---- */

// Establecemos la fecha
setMinFecha(fechaC);

/* Función de validación del formulario */
function validar_formulario_compra(event) {
  event.preventDefault();

  // Nombre completo: 3+ caracteres
  const nom = nombreC.value.trim();
  if (nom.length < 3) {
    alert("El nombre completo debe tener al menos 3 caracteres.");
    nombreC.focus();
    return;
  }

  // Email válido
  const mail = correoC.value.trim();
  if (!validar_email(mail)) {
    alert(
      "Correo electrónico no válido debe seguir el formato nombre@dominio.ext)."
    );
    correoC.focus();
    return;
  }

  // Tipo de tarjeta seleccionado
  if (!tarjeta.value) {
    alert(
      "Selecciona un tipo de tarjeta (Visa, Mastercard o American Express)."
    );
    tarjeta.focus();
    return;
  }

  // Número de tarjeta: 13, 15, 16 o 19 dígitos
  const numTarjeta = loginC.value.trim();
  if (!validar_numero_tarjeta(numTarjeta)) {
    alert("Número de tarjeta inválido: debe tener 13, 15, 16 o 19 dígitos.");
    loginC.focus();
    return;
  }

  // Nombre del titular
  const titular = passwordC.value.trim();
  if (titular.length < 3) {
    alert("El nombre del titular debe tener al menos 3 caracteres.");
    passwordC.focus();
    return;
  }

  // Fecha de caducidad
  const cad = fechaC.value;
  if (!cad || cad < diaHoy()) {
    alert("La tarjeta está caducada");
    fechaC.focus();
    return;
  }

  // CVV: 3 dígitos
  const cvv = cvvC.value.trim();
  if (!cvv_valido(cvv)) {
    alert("El CVV debe tener exactamente 3 dígitos.");
    cvvC.focus();
    return;
  }

  // Todo OK → simular compra
  alert("Compra realizada");
}

/* Pulsar el boton comprar */
formC.addEventListener("submit", validar_formulario_compra);
