const IDIOMAS_PREFERIDOS = ["es-MX", "es-US", "es-ES", "es_US", "es_ES"];

// carga del DOM
document.addEventListener("DOMContentLoaded", () => {
  const $voces = document.querySelector("#voces"),
    $boton = document.querySelector("#btnEscuchar"),
    $mensaje = document.querySelector("#mensaje");
  let posibleIndice = 0, vocesDisponibles = [];

  // insertando las voces dentro del campo select
  const cargarVoces = () => {
    if (vocesDisponibles.length > 0) {
      console.log("No se cargan las voces porque ya existen: ", vocesDisponibles);
      return;
    }
    vocesDisponibles = speechSynthesis.getVoices();
    console.log({ vocesDisponibles })
    posibleIndice = vocesDisponibles.findIndex(voz => IDIOMAS_PREFERIDOS.includes(voz.lang));
    if (posibleIndice === -1) posibleIndice = 0;
    vocesDisponibles.forEach((voz, indice) => {
      const opcion = document.createElement("option");
      opcion.value = indice;
      opcion.innerHTML = voz.name;
      opcion.selected = indice === posibleIndice;
      $voces.appendChild(opcion);
    });
  };

  // mensaje por si no se encuentra la api
  if (!'speechSynthesis' in window) return alert("Lo siento, tu navegador no soporta esta tecnología");


  cargarVoces();
  // Si hay evento, entonces lo esperamos
  if ('onvoiceschanged' in speechSynthesis) {
    speechSynthesis.onvoiceschanged = function () {
      cargarVoces();
    };
  }
  // evento para que se escuche el texto
  $boton.addEventListener("click", () => {
    let textoAEscuchar = $mensaje.value;
    if (!textoAEscuchar) return alert("Escribe el texto");
    let mensaje = new SpeechSynthesisUtterance();
    mensaje.voice = vocesDisponibles[$voces.value];
    mensaje.volume = 1;
    mensaje.rate = 1;
    mensaje.text = textoAEscuchar;
    mensaje.pitch = 1;
    // linea para ordenar que se lea el texto
    speechSynthesis.speak(mensaje);
  });
});