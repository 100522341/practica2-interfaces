"use strict";
/* ----Seleccionamos los elementos del DOM---- */
const formC     = document.getElementById('formC');
const nombreC   = document.getElementById('nombreC');
const correoC   = document.getElementById('correoC');
const tarjeta   = document.getElementById('tarjeta');
const loginC    = document.getElementById('loginC');
const passwordC = document.getElementById('passwordC');
const fechaC    = document.getElementById('fechaC');
const cvvC      = document.getElementById('cvvC');

/* ----Funciones del programa---- */

// Impedir fechas no válidas

function establecerFechaMin() {
  // Establece el atributo max de la fecha a YYYY-MM-DD de hoy (date obtiene la fecha,to string lo pasa a str,y slice obtiene la fecha que son solo los 10 primeros caracteres)
  const fechaMin = new Date().toISOString().slice(0, 10);
  if (fechaC) {
    fechaC.setAttribute("min", fechaMin);
  }
}
establecerFechaMin()
/* ----Acciones del programa: valores iniciales y eventos---- */

formC.addEventListener('submit', (e) => {
  e.preventDefault();

  // required, type, minlength, pattern...
  if (!formC.checkValidity()) {
    formC.reportValidity(); // muestra los mensajes del navegador
    return;
  }

  // Select tipo de tarjeta o asegurarse de que no esté vacío
  if (!tarjeta.value) {
    alert("Selecciona un tipo de tarjeta");
    tarjeta.focus();
    return;
  }

  // Fecha no caducada 
  const fechaMin = new Date().toISOString().slice(0, 10);
  if (!fechaC.value || fechaC.value < fechaMin) {
    alert("La tarjeta está caducada");
    fechaC.focus();
    return;
  }

  // Simular compra
  alert('Compra realizada');

});

