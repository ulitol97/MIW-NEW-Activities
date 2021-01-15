const navToggleElement = document.getElementById("nav-toggle");
const navOpenClass = "open";
const navClosedClass = "closed";

const yearElement = document.getElementById("year");

// Toggle nav on click
function toggleNav() {
  if (navToggleElement.classList.contains(navOpenClass))
    navToggleElement.classList.replace(navOpenClass, navClosedClass);
  else navToggleElement.classList.replace(navClosedClass, navOpenClass);
}

navToggleElement.addEventListener("click", toggleNav);

// Year in footer
yearElement.innerText = new Date().getFullYear();
