const mainElement = document.getElementById("main");
const elements = document.querySelectorAll(".wrapper > img");

const imageDimensions = [800, 450];
const baseUrl = `https://picsum.photos/id/IMAGE_ID/${imageDimensions[0]}/${imageDimensions[1]}`;
const maxId = 200;

elements.forEach((el) => {
  const id = Math.floor(Math.random() * maxId);
  el.src = baseUrl.replace("IMAGE_ID", id);
});
