/*
  Obra de Amor — JavaScript (Variación 9)
  Carrusel, pestañas del Rosario 7P y animaciones de scroll
*/

document.addEventListener("DOMContentLoaded", () => {
  initCarousel();
  initRosarioTabs();
  initScrollReveal();
});

/* ── Guía Interactiva del Rosario 7P (Pestañas) ─────────────────── */
function initRosarioTabs() {
  const tabsContainer = document.querySelector(".rosario-tabs");
  if (!tabsContainer) return;

  const tabButtons = tabsContainer.querySelectorAll(".rosario-tab-btn");
  const panels = document.querySelectorAll(".rosario-panel");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabNumber = btn.getAttribute("data-tab");
      
      // Desactivar todos los botones y paneles
      tabButtons.forEach(b => b.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));
      
      // Activar el botón actual y el panel correspondiente
      btn.classList.add("active");
      const targetPanel = document.getElementById(`panel-${tabNumber}`);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });
}

/* ── Carrusel de Inicio ─────────────────── */
function initCarousel() {
  const container = document.querySelector(".carousel-container");
  if (!container) return;

  const slides = container.querySelectorAll(".carousel-slide");
  const dotsBox = container.querySelector(".carousel-dots");
  const prevBtn = container.querySelector(".carousel-btn.prev");
  const nextBtn = container.querySelector(".carousel-btn.next");
  if (!slides.length) return;

  let current = 0;
  let timer = null;
  const INTERVAL = 5000;

  // Crear puntos dinámicamente
  if (dotsBox) {
    dotsBox.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.classList.add("carousel-dot");
      if (i === 0) dot.classList.add("active");
      dot.setAttribute("aria-label", `Diapositiva ${i + 1}`);
      dot.addEventListener("click", () => { goTo(i); reset(); });
      dotsBox.appendChild(dot);
    });
  }

  const dots = container.querySelectorAll(".carousel-dot");

  function goTo(idx) {
    slides[current].classList.remove("active");
    if (dots[current]) dots[current].classList.remove("active");
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add("active");
    if (dots[current]) dots[current].classList.add("active");
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  function start() { timer = setInterval(next, INTERVAL); }
  function reset() { clearInterval(timer); start(); }

  if (prevBtn) prevBtn.addEventListener("click", () => { prev(); reset(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { next(); reset(); });

  start();
}

/* ── Animaciones de Scroll (Fade-Up) ───── */
function initScrollReveal() {
  // Añadir clase fade-up a los elementos principales del contenido
  const targets = document.querySelectorAll(
    ".page-wrapper > h2, .page-wrapper > h3, .page-wrapper > p, " +
    ".page-wrapper > blockquote, .page-wrapper > .carousel-container, " +
    ".page-wrapper > .wp-block-columns, .page-wrapper > .wp-block-kadence-rowlayout, " +
    ".page-wrapper > .kt-row-column-wrap, " +
    ".page-wrapper > hr, .page-wrapper > figure, " +
    ".page-wrapper > .contact-form-wrapper, .page-wrapper > .contact-grid, " +
    ".monastic-schedule-widget, .rosario-widget, .glass-panel"
  );

  targets.forEach((el) => el.classList.add("fade-up"));

  // Observar con IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    // Fallback: mostrar todo
    document.querySelectorAll(".fade-up").forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
}
