const navElement = document.querySelector("nav");
const navContentsElement = document.querySelector(".nav-container");
const navToggleElement = document.getElementById("nav-toggle");
const navOpenClass = "open";
const navStickyClass = "sticky";
const navClosedClass = "closed";

const yearElement = document.getElementById("year");

// Toggle nav on click
function toggleNav() {
  if (navToggleElement.classList.contains(navOpenClass)) {
    // navContentsElement.classList.add("hidden");
    navElement.classList.add(navStickyClass);
    navToggleElement.classList.replace(navOpenClass, navClosedClass);
  } else {
    // navContentsElement.classList.remove("hidden");
    navElement.classList.remove(navStickyClass);
    navToggleElement.classList.replace(navClosedClass, navOpenClass);
  }
}

navToggleElement.addEventListener("click", toggleNav);

// Year in footer
yearElement.innerText = new Date().getFullYear();
