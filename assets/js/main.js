/* Toni Ismail — interaksi kecil: tema, menu, nav aktif, reveal. */

(function () {
  "use strict";

  var root = document.documentElement;

  /* --- Tema terang / gelap ---------------------------------------------- */

  var toggle = document.getElementById("theme-toggle");

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* mode privat: tema berlaku sampai halaman ditutup saja */
      }
    });
  }

  /* --- Menu mobile ------------------------------------------------------- */

  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("nav");

  function closeNav() {
    if (!nav) return;
    nav.classList.remove("is-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* --- Garis bawah header saat digulir ----------------------------------- */

  var header = document.getElementById("site-header");

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Tandai menu sesuai section yang terlihat -------------------------- */

  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle(
            "is-active",
            a.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* --- Muncul perlahan saat digulir -------------------------------------- */

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(
    ".section-head, .stat, .card, .company, .timeline-item, .skill-group, " +
    ".mini-card, .certs li, .side-note, .about-photo, .about-text, " +
    ".gallery li, .contact-card"
  );

  if (!reducedMotion && "IntersectionObserver" in window) {
    var reveal = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min(i % 6, 5) * 55 + "ms";
      reveal.observe(el);
    });
  }

  /* --- Tahun di footer --------------------------------------------------- */

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
