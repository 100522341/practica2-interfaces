/*Aqui combinaremos lo que se repita a la hora de introducir los datos del usuario*/
"use strict";
/*Aqui se encuentran todas las validaciones comunes entre el script A y C */
export function solo_letras(texto) {
  return /^[a-zA-ZñÑ\s]+$/.test(texto);
}

export function validar_email(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validar_password(pass) {
  // 8+ caracteres, ≥2 dígitos, 1 mayúscula, 1 minúscula, 1 especial
  return /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){2,})(?=.*[^A-Za-z0-9]).{8,}$/.test(pass);
}

export function numero_tarjeta_valido(num) {
  return /^(?:\d{13}|\d{15}|\d{16}|\d{19})$/.test(num);
}

export function cvv_valido(v) {
  return /^\d{3}$/.test(v);
}

/*Fechas*/
function diaHoy() {
  return new Date().toISOString().slice(0, 10);
}

export function setMaxFecha(input) {
  if (input) 
    input.setAttribute("max", diaHoy());
}

export function setMinFecha(input) {
  if (input) 
    input.setAttribute("min", diaHoy());
}
