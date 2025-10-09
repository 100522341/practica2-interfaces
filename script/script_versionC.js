"use strict";

/* ----Selección de elementos del DOM---- */
const formC     = document.getElementById('formC');
const nombreC   = document.getElementById('nombreC');   // Nombre completo / titular
const correoC   = document.getElementById('correoC');
const tarjeta   = document.getElementById('tarjeta');    // Select tipo de tarjeta
const loginC    = document.getElementById('loginC');     // Nº de tarjeta
const passwordC = document.getElementById('passwordC');  // Nombre del titular (en tu HTML)
const fechaC    = document.getElementById('fechaC');     // Fecha de caducidad
const cvvC      = document.getElementById('cvvC');       // CVV

/* ----Funciones del programa---- */
function validar_email(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function numero_tarjeta_valido(num) {
  const regex=/^(?:\d{13}|\d{15}|\d{16}|\d{19})$/
  return regex.test(num);
}

function cvv_valido(v) {
  const regex=/^\d{3}$/
  return regex.test(v);
}

// Fecha de caducidad: mínimo hoy (no puede estar caducada)
function setMinFechaHoy() {
  const hoyISO = new Date().toISOString().slice(0, 10);
  if (fechaC) fechaC.setAttribute('min', hoyISO);
}

/* ----Acciones del programa---- */
setMinFechaHoy();

formC.addEventListener('submit', function (event) {
  event.preventDefault();

  // Nombre completo (mínimo 3 caracteres)
  const nom = nombreC.value.trim();
  if (nom.length < 3) {
    alert('El nombre completo debe tener al menos 3 caracteres.');
    nombreC.focus();
    return;
  }

  // Correo electrónico
  const mail = correoC.value.trim();
  if (!validar_email(mail)) {
    alert('Correo electrónico no válido (formato nombre@dominio.ext).');
    correoC.focus();
    return;
  }

  // Tipo de tarjeta (debe elegir una opción distinta de vacío)
  if (!tarjeta.value) {
    alert('Selecciona un tipo de tarjeta (Visa, Mastercard o American Express).');
    tarjeta.focus();
    return;
  }

  // Número de tarjeta (13, 15, 16 o 19 dígitos)
  const numTarjeta = loginC.value.trim();
  if (!numero_tarjeta_valido(numTarjeta)) {
    alert('Número de tarjeta inválido: debe tener 13, 15, 16 o 19 dígitos.');
    loginC.focus();
    return;
  }

  // Nombre del titular (mínimo 3 caracteres)
  const titular = passwordC.value.trim();
  if (titular.length < 3) {
    alert('El nombre del titular debe tener al menos 3 caracteres.');
    passwordC.focus();
    return;
  }

  // Fecha de caducidad (no caducada)
  const cad = fechaC.value;
  const hoyISO = new Date().toISOString().slice(0, 10);
  if (!cad || cad < hoyISO) {
    alert('La tarjeta está caducada. Elige una fecha de caducidad futura.');
    fechaC.focus();
    return;
  }

  // CVV (3 dígitos)
  const cvv = cvvC.value.trim();
  if (!cvv_valido(cvv)) {
    alert('El CVV debe tener exactamente 3 dígitos.');
    cvvC.focus();
    return;
  }

  // Todo OK → simular compra
  alert('Compra realizada')
});
