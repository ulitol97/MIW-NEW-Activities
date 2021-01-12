const mainElement = document.getElementById("main");

// Images
const imageDimensions = [400, 400];
const imagesPerRow = 3;
const initialRows = Math.floor(window.innerHeight / (window.innerWidth * 0.25)); // Images are 25vw tall.
const initialImages = initialRows * imagesPerRow;
const baseUrl = `https://picsum.photos/id/IMAGE_ID/${imageDimensions[0]}/${imageDimensions[1]}`;

let currentImages = 0;

const addImages = (n) => {
  // Use a fragment to add all children together to the DOM
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < n; i++) {
    currentImages += 1;

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    const img = document.createElement("img");
    img.setAttribute("src", baseUrl.replace("IMAGE_ID", currentImages));

    wrapper.appendChild(img);
    fragment.appendChild(wrapper);
  }
  mainElement.appendChild(fragment);
};

addImages(initialImages);

// Intersector observer

const options = {
  rootMargin: "0px",
  threshold: 0, // Trigger immediately
};

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    // Last image was intersected, trigger logic
    console.info("INTERSECTED");

    // Stop observing current target
    observer.unobserve(entry.target);

    // Insert new elements
    addImages(initialImages);

    // Update target and observe it
    const target = document.querySelector(".wrapper:last-child");
    observer.observe(target);
  });
};

observer = new IntersectionObserver(callback, options);
observer.observe(document.querySelector(".wrapper:last-child"));
