const elements = document.querySelectorAll(".wrapper");
const colors = ["red", "blue", "orange", "green", "pink", "purple", "brown"];

elements.forEach(
  (el) =>
    (el.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)])
);
