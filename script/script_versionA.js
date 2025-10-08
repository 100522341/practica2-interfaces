/* ----Seleccionamos los elementos del DOM---- */
const form = document.getElementById("formA");
const politica = document.getElementById("politica");
const boton = document.getElementById("btn-guardar");
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const correo = document.getElementById("correo");
const correo2 = document.getElementById("correo2");
const fecha = document.getElementById("fecha");
const login = document.getElementById("login");
const password = document.getElementById("password");
const imagen = document.getElementById("imagen");

/* ----Funciones del programa---- */

// Activación del botón

function activarBoton() {
  //Funcion que activa el boton guardar si esta marcada la casilla politica de privacidad
  boton.disabled = !politica.checked;
}

// Impedir fechas no válidas

function establecerFechaMax() {
  // Establece el atributo max de la fecha a YYYY-MM-DD de hoy (date obtiene la fecha,to string lo pasa a str,y slice obtiene la fecha que son solo los 10 primeros caracteres)
  const fechaMax = new Date().toISOString().slice(0, 10);
  if (fecha) {
    fecha.setAttribute("max", fechaMax);
  }
}

// Correos iguales

function correosCoinciden() {
  return correo.value.trim() === correo2.value.trim(); //El crreo debe ser igual a "confirmar correo"
}

/* ----Acciones del programa: valores iniciales y eventos---- */

//Cada vez que el usuario marque o desmarque se ejecuta la funcion activar boton
politica.addEventListener("change", activarBoton);
activarBoton();

// Imágenes permitidas
imagen.addEventListener("change", () => {
  //Evento que se activa cuando el usuario añade el archivo
  const archivo = imagen.files[0]; //Archivo subido por el usuario
  if (
    archivo &&
    ["image/webp", "image/png", "image/jpeg"].includes(archivo.type)
  )
    return; //Si hay archivo subido y su tipo se permite no se muestra alerta,en caso contrario si
  alert("Formato de imagen no adminitido");
  imagen.value = ""; //Si el formato no es valido borra el archibo subido
});

// Requisitos para el submit
//Cuando el usuario interactua con el formulario no deja que lo envie hasta controlar todos los campos
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //Aceptar politica de privacidad
  if (!politica.checked) {
    alert("Debes aceptar la política de privacidad.");
    return;
  }

  //Se encarga de que se cumplan los minlegth,pattern etc de version-A.html
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  //Emails iguales
  if (!correosCoinciden()) {
    alert("Los correos no coinciden.");
    correo2.focus();
    return;
  }

  //Debe subirse una imagen con el formato correcto
  const archivo = imagen.files[0];
  const fotoCorrecta =
    archivo && ["image/webp", "image/png", "image/jpeg"].includes(archivo.type);
  if (!fotoCorrecta) {
    alert("Formato de imagen no admitido");
    return;
  }

  //Construimos un objeto usuario con los valores introducidos
  const usuario = {
    nombre: nombre.value.trim(), //Obtiene el texto que el usuario escribio y con trim eliminamos espacios innecesarios
    apellidos: apellidos.value.trim(),
    correo: correo.value.trim(),
    login: login.value.trim(),
  };

  //Guardamos los datos del usuario en el localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}"); //Carga los usuarios guardados o un JSON vacio si no hay
  usuarios[usuario.login] = usuario; //Guarda o actualiza al usuario
  localStorage.setItem("usuarios", JSON.stringify(usuarios)); //Actualiza el localStorage con todos los usuarios
  localStorage.setItem("sesion", JSON.stringify({ login: usuario.login })); //Guarda la sesion actual

  //Redirigimos a la version B
  window.location.href = "version-B.html";
});
