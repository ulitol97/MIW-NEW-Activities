const imageSize = [400, 300];
const placeholder = "PHOTO_ID";
const baseUrl = `https://picsum.photos/id/${placeholder}/${imageSize[0]}/${imageSize[1]}`;

const dataText = document.getElementById("data");
const urlText = document.getElementById("url");

// Helpers
function log(message) {
  console.info("[Server]", message);
}

// Functionality

/* Al recibir datos del cliente, devolver la URL de una imagen de picsum según el segundo de la fecha
 recibida del cliente */
window.addEventListener("message", receiveData, false);

function receiveData(data) {
  data = data.data;
  log(`Datos recibidos:${data} desde el cliente`);
  const imageUrl = baseUrl.replace(placeholder, data);
  log(`Enviando datos:${imageUrl} al cliente`);
  parent.postMessage(imageUrl, "*");

  updateUI(data, imageUrl);
}

// Update the iframe with the data received
function updateUI(data, url) {
  dataText.innerHTML = data;

  urlText.innerHTML = url;
  urlText.setAttribute("href", url);
}
