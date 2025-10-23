"use strict";

/* ----Aquí tenemos las funciones para validar cada campo de los formularios en la versión A y versión C ----*/
export function solo_letras(texto) {
  return /^[a-zA-ZñÑ\s]+$/.test(texto);
}

export function validar_email(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validar_password(pass) {
  // 8+ caracteres, ≥2 dígitos, 1 mayúscula, 1 minúscula, 1 especial
  return /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){2,})(?=.*[^A-Za-z0-9]).{8,}$/.test(
    pass
  );
}

export function validar_numero_tarjeta(num) {
  return /^(?:\d{13}|\d{15}|\d{16}|\d{19})$/.test(num);
}

export function cvv_valido(v) {
  return /^\d{3}$/.test(v);
}

// Fechas
// Obtenemos el dia de hoy lo convertimos a string y nos quedamos los caracteres necesarios
export function diaHoy() {
  return new Date().toISOString().slice(0, 10);
}

// Si detecta un input,es decir se esta añadiendo una fecha esta no debe ser mayor al dia de hoy
export function setMaxFecha(input) {
  if (input) input.setAttribute("max", diaHoy());
}

// Si detecta un input,es decir se esta añadiendo una fecha esta no debe ser menor al dia de hoy
export function setMinFecha(input) {
  if (input) input.setAttribute("min", diaHoy());
}
