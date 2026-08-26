/* =====================================================================
   SCRIPT.JS — RENDERIZADO + INTERACTIVIDAD DEL PORTAFOLIO
   =====================================================================
   No necesitas tocar este archivo para actualizar tu contenido: eso se
   hace en data.js. Este archivo solo LEE data.js y construye la página.
   ===================================================================== */

(function () {
  "use strict";

  const D = window.PORTFOLIO_DATA;
  if (!D) {
    console.error("No se encontró PORTFOLIO_DATA. Verifica que data.js se cargue antes que script.js.");
    return;
  }

  /* ---------------------------------------------------------------
     Utilidad: crea HTML seguro escapando texto plano por defecto.
     Úsala para cualquier texto que venga de data.js.
  --------------------------------------------------------------- */
  const esc = (str) =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  /* =========================== META / SEO =========================== */
  function renderMeta() {
    document.title = D.meta.siteTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", D.meta.siteDescription);
    document.querySelectorAll("[data-nav-shortname]").forEach((el) => {
      el.textContent = D.meta.navShortName;
    });
  }

  /* =========================== HERO =========================== */
  function renderHero() {
    const h = D.hero;
    document.getElementById("hero-eyebrow").textContent = h.eyebrow;
    document.getElementById("hero-name-1").textContent = h.nameLine1;
    document.getElementById("hero-name-2").textContent = h.nameLine2;
    document.getElementById("hero-role").textContent = h.role;
    document.getElementById("hero-pitch").textContent = h.pitch;

    const primary = document.getElementById("hero-cta-primary");
    primary.textContent = h.primaryCta.label;
    primary.href = h.primaryCta.href;

    const secondary = document.getElementById("hero-cta-secondary");
    secondary.textContent = h.secondaryCta.label;
    secondary.href = h.secondaryCta.href;

    document.getElementById("idcard-registro").textContent = h.idCard.registro;
    document.getElementById("idcard-estado").textContent = h.idCard.estado;

    const fieldsWrap = document.getElementById("idcard-fields");
    fieldsWrap.innerHTML = h.idCard.campos
      .map(
        (f) => `
        <div class="id-field">
          <span class="k">${esc(f.k)}</span>
          <span class="v">${esc(f.v)}</span>
        </div>`
      )
      .join("");
  }

  /* =========================== SOBRE MÍ =========================== */
  function renderAbout() {
    const a = D.about;
    document.getElementById("about-kicker").textContent = a.kicker;
    document.getElementById("about-title").textContent = a.title;

    document.getElementById("about-paragraphs").innerHTML = a.paragraphs
      .map((p) => `<p>${esc(p)}</p>`)
      .join("");

    document.getElementById("about-facts").innerHTML = a.facts
      .map(
        (f) => `
        <div class="fact">
          <span class="num">${esc(f.num)}</span>
          <span class="label">${esc(f.label)}</span>
        </div>`
      )
      .join("");
  }

  /* =========================== HABILIDADES =========================== */
  function renderSkills() {
    const s = D.skills;
    document.getElementById("skills-kicker").textContent = s.kicker;
    document.getElementById("skills-title").textContent = s.title;
    document.getElementById("skills-lede").textContent = s.lede;

    document.getElementById("skills-groups").innerHTML = s.groups
      .map(
        (g) => `
        <div class="skill-group reveal">
          <h3>${esc(g.name)}</h3>
          <div class="chip-row">
            ${g.items.map((item) => `<span class="chip">${esc(item)}</span>`).join("")}
          </div>
        </div>`
      )
      .join("");
  }

  /* =========================== PROYECTOS =========================== */
  function renderProjects() {
    const p = D.projects;
    document.getElementById("projects-kicker").textContent = p.kicker;
    document.getElementById("projects-title").textContent = p.title;
    document.getElementById("projects-lede").textContent = p.lede;

    // Filtros
    document.getElementById("project-filters").innerHTML = p.filters
      .map(
        (f, i) => `
        <button type="button" class="filter-chip${i === 0 ? " active" : ""}" data-filter="${esc(f.id)}">
          ${esc(f.label)}
        </button>`
      )
      .join("");

    // Tarjetas de proyecto
    document.getElementById("projects-list").innerHTML = p.items
      .map((proj) => {
        const roles = proj.roles
          ? `<div class="roles-line">
               ${proj.roles
                 .map(
                   (r) =>
                     `<span class="role-pill ${esc(r.type)}">${esc(r.label)}</span>`
                 )
                 .join("")}
             </div>`
          : "";

        const link = proj.link
          ? `<a class="btn" href="${esc(proj.link)}" target="_blank" rel="noopener" style="margin-top:18px;">Ver código →</a>`
          : "";

        const table = proj.table
          ? `<div class="module-table">
               <div class="mt-head">
                 <span>${esc(proj.table.headLeft)}</span>
                 <span>${esc(proj.table.headRight)}</span>
               </div>
               ${proj.table.rows
                 .map(
                   (row) => `
                 <div class="module-row">
                   <div class="mod-name">${row.icon ? esc(row.icon) + " " : ""}${esc(row.name)}</div>
                   <div class="mod-access">${esc(row.value)}</div>
                 </div>`
                 )
                 .join("")}
             </div>`
          : "";

        return `
        <article class="project-card reveal" data-category="${esc(proj.category)}">
          <div class="project-head">
            <div>
              <span class="project-code">${esc(proj.code)}</span>
              <h3>${esc(proj.name)}</h3>
            </div>
            <span class="project-status">${esc(proj.status)}</span>
          </div>
          <div class="project-body">
            <div class="project-desc">
              ${proj.description.map((d) => `<p>${esc(d)}</p>`).join("")}
              ${roles}
              <div class="stack-line"><b>Stack:</b> ${esc(proj.stack)}</div>
              ${link}
            </div>
            <div>${table}</div>
          </div>
        </article>`;
      })
      .join("");
  }

  /* =========================== FORMACIÓN =========================== */
  function renderFormacion() {
    const f = D.formacion;
    document.getElementById("formacion-kicker").textContent = f.kicker;
    document.getElementById("formacion-title").textContent = f.title;
    document.getElementById("formacion-lede").textContent = f.lede;

    document.getElementById("formacion-list").innerHTML = f.items
      .map(
        (item) => `
        <div class="cert-item">
          <span class="cert-year">${esc(item.year)}</span>
          <div>
            <div class="cert-name">${esc(item.name)}</div>
            <div class="cert-org">${esc(item.org)}</div>
          </div>
          <span class="cert-tag">${esc(item.tag)}</span>
        </div>`
      )
      .join("");
  }

  /* =========================== CONTACTO =========================== */
  function renderContact() {
    const c = D.contact;
    document.getElementById("contact-title").textContent = c.title;
    document.getElementById("contact-text").textContent = c.text;

    document.getElementById("contact-links").innerHTML = `
      <a href="mailto:${esc(c.email)}" id="contact-email-link">
        <span>Correo</span><span class="arrow">${esc(c.email)} →</span>
      </a>
      <a href="${esc(c.linkedin.url)}" target="_blank" rel="noopener">
        <span>LinkedIn</span><span class="arrow">${esc(c.linkedin.label)} →</span>
      </a>
      <a href="${esc(c.github.url)}" target="_blank" rel="noopener">
        <span>GitHub</span><span class="arrow">${esc(c.github.label)} →</span>
      </a>
      <a href="tel:${esc(c.phoneHref)}">
        <span>Teléfono</span><span class="arrow">${esc(c.phoneDisplay)} →</span>
      </a>`;
  }

  /* =========================== FOOTER =========================== */
  function renderFooter() {
    document.getElementById("footer-text").textContent = D.footer.text;
  }

  /* =====================================================================
     INTERACTIVIDAD
     ===================================================================== */

  // ---- Barra de progreso de lectura ----
  function initScrollProgress() {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  // ---- Menú móvil ----
  function initMobileMenu() {
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Resalta el link activo del menú según la sección visible ----
  function initScrollSpy() {
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const navLinks = Array.from(document.querySelectorAll("nav.links a, .mobile-menu a"));
    if (!sections.length || !navLinks.length) return;

    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((sec) => spyObserver.observe(sec));
  }

  // ---- Botón "volver arriba" ----
  function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      () => {
        btn.classList.toggle("visible", window.scrollY > 600);
      },
      { passive: true }
    );

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---- Copiar correo al portapapeles ----
  function initCopyEmail() {
    const link = document.getElementById("contact-email-link");
    const toast = document.getElementById("copy-toast");
    if (!link || !toast) return;

    link.addEventListener("click", (e) => {
      const email = D.contact.email;
      if (!navigator.clipboard) return; // deja el mailto: normal como respaldo

      e.preventDefault();
      navigator.clipboard
        .writeText(email)
        .then(() => {
          toast.textContent = "Correo copiado: " + email;
          toast.classList.add("visible");
          setTimeout(() => toast.classList.remove("visible"), 2200);
          // Además de copiar, abre el cliente de correo
          window.location.href = "mailto:" + email;
        })
        .catch(() => {
          window.location.href = "mailto:" + email;
        });
    });
  }

  // ---- Filtro de proyectos ----
  function initProjectFilters() {
    const filterBar = document.getElementById("project-filters");
    const cards = () => Array.from(document.querySelectorAll(".project-card"));
    if (!filterBar) return;

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-chip");
      if (!btn) return;

      filterBar.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      cards().forEach((card) => {
        const match = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("is-hidden", !match);
      });
    });
  }

  // ---- Animación de aparición al hacer scroll ----
  function initReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal, .project-card").forEach((el) => observer.observe(el));
  }

  // ---- Año automático en el footer (si se usa) ----
  function initYear() {
    document.querySelectorAll("[data-current-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* =====================================================================
     ARRANQUE
     ===================================================================== */
  function init() {
    renderMeta();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderFormacion();
    renderContact();
    renderFooter();

    initScrollProgress();
    initMobileMenu();
    initScrollSpy();
    initBackToTop();
    initCopyEmail();
    initProjectFilters();
    initReveal();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
