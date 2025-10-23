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

import { establecer_usuario } from "./user_show.js";

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
