// Generar nuevas noticias infinitamente a medida que se va bajando en
// la página con el listado de noticias

// Elementos a tener en cuenta
const newsListElement = document.querySelector(".news-list");

// Datos de "mentira" en las nuevas páginas generadas
const newsTitle = "Lorem ipsum dolor sit amet: consectetur adipiscing elit";
const newsSubtitle =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis...";

// Número de nuevas noticias a añadir
const nNews = 5;

/* INTERSECTION OBSERVER */
const options = {
  rootMargin: "0px",
  threshold: 0, // Trigger immediately
};

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    // Last new was intersected, trigger logic
    console.info("INTERSECTED: Inserting news.");

    // Stop observing current target
    observer.unobserve(entry.target);

    // Insert new elements
    addNews();

    // Update target and observe it
    observer.observe(lastNew());
  });
};

// Método auxiliar: obtener la última noticia renderizada
const lastNew = () => {
  return document.querySelector(".news-list li:last-child");
};

const observer = new IntersectionObserver(callback, options);
observer.observe(lastNew());

// Método auxiliar: añadir nuevas noticias al DOM
const addNews = () => {
  // Use a fragment to add all children together to the DOM
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < nNews; i++) {
    const li = document.createElement("li");
    li.classList.add("bullet-chart");
    li.classList.add("news");

    const title = document.createElement("h4");
    title.classList.add("news-title");

    const link = document.createElement("a");
    link.href = "/news_detail.html";
    link.innerText = newsTitle;
    title.appendChild(link);

    const subtitle = document.createElement("h5");
    subtitle.innerText = newsSubtitle;
    subtitle.classList.add("news-subtitle");

    li.appendChild(title);
    li.appendChild(subtitle);
    fragment.appendChild(li);
  }
  newsListElement.appendChild(fragment);
};
