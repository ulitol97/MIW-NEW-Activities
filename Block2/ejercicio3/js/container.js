const iframeSrc = "http://156.35.95.118:8083/exercise3/iframe.html";
const serverDomain = "http://156.35.95.118:8083";
const image = document.querySelector("img");
const newImageButton = document.getElementById("newBtn");

// Helpers
function createIframe() {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("id", "iframe");
  iframe.setAttribute("src", iframeSrc);

  document.getElementById("text").appendChild(iframe);
  return iframe;
}

function log(message) {
  console.info("[Client]", message);
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Functionality

// Generar el iframe programáticamente y mandar datos al servidor en cuanto esté listo.
const iframe = createIframe();

iframe.addEventListener("load", () => {
  log("iframe del servidor cargado y listo para generar imágenes.");
  sendData();
});

// Enviar datos al servidor (los segundos actuales)
function sendData() {
  const data = new Date().getSeconds();
  log(`Enviando datos:${data} al dominio ${serverDomain}`);
  iframe.contentWindow.postMessage(data, serverDomain);
}

// Al recibir un mensaje, modificar el src de la imagen con la respuesta (si es una url válida)
window.addEventListener("message", receiveData, false);
function receiveData(data) {
  data = data.data;
  log(`Datos recibidos del servidor:${data}`);

  if (isValidUrl(data)) {
    image.src = data;
  } else {
    log("Los datos recibidos del servidor no contienen una URL válida");
  }
}

// Permitir mandar de nuevo un mensaje al servidor sin necesidad de refrescar con un botón
newImageButton.addEventListener("click", sendData);
