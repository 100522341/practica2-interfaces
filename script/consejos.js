"use strict";

/* ----Seleccionamos los elementos del DOM---- */
export const btnEnviarConsejo = document.getElementById("enviar-consejo");
const tituloConsejo = document.getElementById("titulo-consejo");
const descripcionConsejo = document.getElementById("descripcion-consejo");
const listaConsejos = document.getElementById("lista-consejos");

/* ----Funciones asociadas al apartado de consejos---- */

export function agregar_consejo() {
  const titulo = tituloConsejo.value.trim();
  const descripcion = descripcionConsejo.value.trim();

  if (!validar_formato_consejos(titulo, descripcion)) {
    alert(
      "El título debe tener al menos 15 caracteres y la descripción al menos 30. El título solo puede contener letras, no símbolos ni números."
    );
    return;
  }

  const arrayConsejos = JSON.parse(
    localStorage.getItem("arrayConsejos") || "[]"
  );

  arrayConsejos.unshift({ titulo, descripcion });

  localStorage.setItem("arrayConsejos", JSON.stringify(arrayConsejos));

  // "Limpiamos" para meter nuevos consejos
  tituloConsejo.value = "";
  descripcionConsejo.value = "";

  mostrar_ultimos_consejos();
}

export function mostrar_ultimos_consejos() {
  // Limpiamos la lista de consejos
  listaConsejos.innerHTML = "";
  const arrayConsejos = JSON.parse(
    localStorage.getItem("arrayConsejos") || "[]"
  );

  // Reverse para mostrar el consejo más reciente primero
  const ultimosTres = arrayConsejos.slice(0, 3);

  for (let i = 0; i < ultimosTres.length; i++) {
    const consejo = ultimosTres[i];

    const li = document.createElement("li");
    li.innerHTML =
      '<a href="consejo' + (i + 1) + '.html">' + consejo.titulo + "</a>";

    listaConsejos.appendChild(li);
  }
}

export function validar_formato_consejos(titulo, descripcion) {
  return validar_titulo_consejo(titulo) && validar_desc_consejo(descripcion);
}

export function validar_titulo_consejo(titulo) {
  return titulo.length >= 15 && solo_letras(titulo);
}

export function validar_desc_consejo(descripcion) {
  return descripcion.length >= 30;
}

export function solo_letras(texto) {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return regex.test(texto);
}
