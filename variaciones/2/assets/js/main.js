/*
  Obra de Amor — JavaScript
  Menú móvil, carrusel de inicio y animaciones de scroll
*/

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initCarousel();
  initScrollReveal();
});

/* ── Menú Móvil ─────────────────────────── */
function initMobileMenu() {
  const toggle = document.querySelector(".mobile-toggle");
  const menu = document.querySelector(".nav-menu");
  const dropdowns = document.querySelectorAll(".nav-item.has-dropdown");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggle.classList.toggle("active");
    menu.classList.toggle("active");
  });

  dropdowns.forEach((item) => {
    const link = item.querySelector(".nav-link");
    if (link) {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          e.stopPropagation();
          const wasActive = item.classList.contains("active");
          dropdowns.forEach((d) => d.classList.remove("active"));
          if (!wasActive) item.classList.add("active");
        }
      });
    }
  });

  document.addEventListener("click", (e) => {
    if (menu.classList.contains("active") && !menu.contains(e.target) && !toggle.contains(e.target)) {
      toggle.classList.remove("active");
      menu.classList.remove("active");
      dropdowns.forEach((d) => d.classList.remove("active"));
    }
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
    ".page-wrapper > hr, .page-wrapper > figure, " +
    ".page-wrapper > .contact-form-wrapper, .page-wrapper > .contact-grid"
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
