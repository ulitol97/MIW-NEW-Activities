const iframe = document.getElementById("iframe");
const serverDomain = "http://127.0.0.1:5500";
const image = document.querySelector("img");
const newImageButton = document.getElementById("newBtn");

// Helpers
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

iframe.addEventListener("load", () => {
  log("iframe del servidor cargado y listo para generar imágenes.");
  sendData();
});

// Enviar los segundos actuales
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

newImageButton.addEventListener("click", sendData);
