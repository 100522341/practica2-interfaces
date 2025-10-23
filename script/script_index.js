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
  btnIniciarSesion,
  btnRegistro,
  iniciar_sesion,
  registrar,
} from "./user_form.js";

/* ----Acciones del programa: valores iniciales y eventos---- */

// Mostramos el primer pack al cargar sin animación
packViaje1.classList.add("visible");

flechaDerecha.addEventListener("click", avanzar_pack);

flechaIzquierda.addEventListener("click", retroceder_pack);

btnIniciarSesion.addEventListener("click", iniciar_sesion);

btnRegistro.addEventListener("click", registrar);
