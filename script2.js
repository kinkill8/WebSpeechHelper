const btngrabar = document.getElementById('btngrabar');
const btdetener = document.getElementById('btndetener');
const texto = document.getElementById('textoG');

let recognition = new webkitSpeechRecognition();
recognition.lang = 'es-ES';
recognition.continuous = true;
recognition.interimResults = false;

btngrabar.addEventListener('click', () =>{
    recognition.start();
});

btdetener.addEventListener('click', () =>{
    recognition.abort();
});

recognition.onresult = (Event) =>{
    const results = Event.results;
    const frase = results[results.length - 1][0].transcript;
    texto.value += frase;
};