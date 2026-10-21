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

  document.documentElement.classList.add("js");

  /* ---------------------------------------------------------------
     Utilidades
  --------------------------------------------------------------- */
  // Escapa texto plano para insertarlo en HTML o en atributos.
  const esc = (str) =>
    String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const $ = (id) => document.getElementById(id);
  const list = (arr, fn) => (arr || []).map(fn).join("");

  // Íconos SVG (trazos heredan el color del texto)
  const ICONS = {
    github:
      '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    phone:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14"/></svg>',
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    expand: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>'
  };

  // Preferencias del visitante: sin animaciones extra si pidió reducir movimiento,
  // y efectos de cursor solo con mouse (no en pantallas táctiles).
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Logo de una tecnología (icons.js). Si no hay logo, devuelve "" y queda solo el texto.
  function techIcon(name) {
    const icons = window.TECH_ICONS || {};
    const aliases = window.TECH_ICON_ALIASES || {};
    const icon = icons[aliases[String(name).toLowerCase()]];
    if (!icon) return "";
    return `<svg viewBox="0 0 24 24" aria-hidden="true" class="fill tech-icon" style="color:${esc(icon.color)}"><path d="${esc(icon.path)}"/></svg>`;
  }

  /* =========================== META / SEO =========================== */
  function renderMeta() {
    document.title = D.meta.siteTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", D.meta.siteDescription);
    document.querySelectorAll("[data-nav-name]").forEach((el) => {
      el.textContent = D.meta.navName;
    });

    const navCv = $("nav-cv");
    if (D.hero.cv && navCv) {
      navCv.href = D.hero.cv;
      navCv.hidden = false;
    }
  }

  /* =========================== HERO =========================== */
  function renderHero() {
    const h = D.hero;
    const c = D.contact;
    $("hero-availability").textContent = h.availability;
    $("hero-name-1").textContent = h.nameLine1;
    $("hero-name-2").textContent = h.nameLine2;
    $("hero-headline").textContent = h.headline;
    $("hero-role").textContent = h.roleLine;

    const cvBtn = h.cv
      ? `<a class="btn" href="${esc(h.cv)}" download>${ICONS.download} Descargar CV</a>`
      : `<a class="btn" href="${esc(h.secondaryCta.href)}">${esc(h.secondaryCta.label)}</a>`;

    $("hero-actions").innerHTML = `
      <a class="btn primary" href="${esc(h.primaryCta.href)}">${esc(h.primaryCta.label)} ${ICONS.arrow}</a>
      ${cvBtn}
      <span class="icon-links">
        <a class="icon-btn" href="${esc(c.github.url)}" target="_blank" rel="noopener" aria-label="GitHub">${ICONS.github}</a>
        <a class="icon-btn" href="${esc(c.linkedin.url)}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICONS.linkedin}</a>
        <a class="icon-btn" href="mailto:${esc(c.email)}" aria-label="Correo">${ICONS.mail}</a>
      </span>`;

    // Ficha lateral
    const initials = (h.nameLine1.charAt(0) + h.nameLine2.charAt(0)).toUpperCase();
    $("idcard-avatar").innerHTML = h.photo
      ? `<img src="${esc(h.photo)}" alt="Foto de ${esc(h.nameLine1)} ${esc(h.nameLine2)}" width="64" height="64">`
      : `<span>${esc(initials)}</span>`;
    $("idcard-name").textContent = `${h.nameLine1} ${h.nameLine2}`;
    $("idcard-estado").textContent = h.idCard.estado;
    $("idcard-code").textContent = h.idCard.code;
    $("idcard-fields").innerHTML = list(
      h.idCard.campos,
      (f) => `<div class="id-field"><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`
    );

    // Roles que se escriben bajo el nombre; el texto completo queda para lectores de pantalla
    if (h.roles && h.roles.length) {
      $("hero-typer-label").textContent = h.roles.join(", ");
      $("hero-typer").hidden = false;
    }

    // Las cifras enteras mayores que 1 llevan data-count para animarlas al aparecer
    $("highlights").innerHTML = list(
      D.highlights,
      (x) => {
        const count = /^\d+$/.test(String(x.num)) && Number(x.num) > 1 ? ` data-count="${esc(x.num)}"` : "";
        return `<li><span class="num"${count}>${esc(x.num)}</span><span class="label">${esc(x.label)}</span></li>`;
      }
    );
  }

  /* =========================== PROYECTOS =========================== */
  // Barra superior de "ventana" que enmarca capturas y tablas
  const frameBar = (title) => `
    <div class="frame-bar" aria-hidden="true">
      <span class="dots"><i></i><i></i><i></i></span>
      <span class="frame-title">${esc(title)}</span>
    </div>`;

  const statusPill = (s) => `<span class="status tone-${esc(s.tone)}">${esc(s.label)}</span>`;

  const stackList = (items) => `<ul class="stack" aria-label="Tecnologías">${list(items, (t) => `<li>${techIcon(t)}${esc(t)}</li>`)}</ul>`;

  function projectLinks(links, note) {
    const parts = [];
    if (links && links.code) {
      parts.push(`<a class="btn btn-sm" href="${esc(links.code)}" target="_blank" rel="noopener">${ICONS.github} Ver código</a>`);
    }
    if (links && links.demo) {
      parts.push(`<a class="btn btn-sm primary" href="${esc(links.demo)}" target="_blank" rel="noopener">${ICONS.external} Ver demo</a>`);
    }
    if (note) {
      parts.push(`<span class="project-note">${ICONS.lock} ${esc(note)}</span>`);
    }
    return parts.length ? `<div class="project-links">${parts.join("")}</div>` : "";
  }

  // Captura clicable que se abre en el visor ampliado
  const shot = (img, title) => `
    <button type="button" class="frame shot" data-lightbox="${esc(img.src)}" data-alt="${esc(img.alt)}" aria-label="Ampliar captura: ${esc(title)}">
      ${frameBar(img.frameTitle || img.title || title)}
      <img src="${esc(img.src)}" alt="${esc(img.alt)}" width="${esc(img.width)}" height="${esc(img.height)}" loading="lazy" decoding="async">
      <span class="shot-hint">${ICONS.expand} Ampliar</span>
    </button>`;

  function moduleTable(t, roles) {
    const roleLine = roles
      ? `<div class="roles-line">${list(roles, (r) => `<span class="role-pill ${esc(r.type)}">${esc(r.label)}</span>`)}</div>`
      : "";
    return `
      <div class="frame">
        ${frameBar(t.frameTitle)}
        <div class="module-table">
          <div class="mt-head"><span>${esc(t.headLeft)}</span><span>${esc(t.headRight)}</span></div>
          ${list(
            t.rows,
            (row) => `
            <div class="module-row">
              <span class="mod-name"><span aria-hidden="true">${esc(row.icon)}</span> ${esc(row.name)}</span>
              <span class="mod-access">${esc(row.value)}</span>
            </div>`
          )}
        </div>
        ${roleLine}
      </div>`;
  }

  function renderFeatured(proj) {
    const visual = proj.image ? shot(proj.image, proj.name) : proj.table ? moduleTable(proj.table, proj.roles) : "";
    const decisions = proj.decisions && proj.decisions.length
      ? `<div class="decisions">
           <h4>Decisiones técnicas</h4>
           <ul>${list(proj.decisions, (d) => `<li>${esc(d)}</li>`)}</ul>
         </div>`
      : "";

    return `
      <article class="project-card reveal" data-categories="${esc(proj.categories.join(" "))}">
        <div class="project-visual">
          ${visual}
          ${decisions}
        </div>
        <div class="project-content">
          <div class="project-meta">
            <span class="project-code">${esc(proj.code)} · ${esc(proj.type)}</span>
            ${statusPill(proj.status)}
          </div>
          <h3>${esc(proj.name)}</h3>
          <p class="project-summary">${esc(proj.summary)}</p>
          <dl class="case">
            <div><dt>Problema</dt><dd>${esc(proj.problem)}</dd></div>
            <div><dt>Solución</dt><dd>${esc(proj.solution)}</dd></div>
            <div class="is-result"><dt>Resultado</dt><dd>${esc(proj.result)}</dd></div>
          </dl>
          ${stackList(proj.stack)}
          ${projectLinks(proj.links, proj.note)}
        </div>
      </article>`;
  }

  function compactVisual(v, name) {
    if (!v) return "";
    if (v.type === "image") return shot(v, name);
    if (v.type === "snippet") {
      return `
        <div class="frame">
          ${frameBar(v.title)}
          <pre class="snippet"><code>${list(v.lines, (l) => {
            const line = esc(l) || " ";
            return l.trim().startsWith("#") ? `<span class="c">${line}</span>\n` : `${line}\n`;
          })}</code></pre>
        </div>`;
    }
    if (v.type === "steps") {
      return `
        <div class="frame">
          ${frameBar(v.title)}
          <ol class="steps">${list(v.lines, (l) => `<li>${esc(l)}</li>`)}</ol>
        </div>`;
    }
    return "";
  }

  function renderCompact(proj) {
    return `
      <article class="mini-card reveal" data-categories="${esc(proj.categories.join(" "))}">
        ${compactVisual(proj.visual, proj.name)}
        <div class="mini-body">
          <div class="project-meta">
            <span class="project-code">${esc(proj.code)}</span>
            ${statusPill(proj.status)}
          </div>
          <h4>${esc(proj.name)}</h4>
          <p class="project-summary">${esc(proj.summary)}</p>
          <p class="mini-details">${esc(proj.details)}</p>
          ${stackList(proj.stack)}
          ${projectLinks(proj.links, proj.note)}
        </div>
      </article>`;
  }

  function renderProjects() {
    const p = D.projects;
    $("projects-kicker").textContent = p.kicker;
    $("projects-title").textContent = p.title;
    $("projects-lede").textContent = p.lede;

    $("project-filters").innerHTML = list(
      p.filters,
      (f, i) => `
        <button type="button" class="filter-chip" data-filter="${esc(f.id)}" aria-pressed="${i === 0}">
          ${esc(f.label)}
        </button>`
    );

    $("projects-featured").innerHTML = list(p.featured, renderFeatured);
    $("projects-more").innerHTML = list(p.more, renderCompact);
    if (!p.more || !p.more.length) $("more-title").hidden = true;
  }

  /* =========================== SOBRE MÍ =========================== */
  function renderAbout() {
    const a = D.about;
    $("about-kicker").textContent = a.kicker;
    $("about-title").textContent = a.title;
    $("about-paragraphs").innerHTML = list(a.paragraphs, (p) => `<p>${esc(p)}</p>`);
    $("principles-title").textContent = a.principlesTitle;
    $("principles-list").innerHTML = list(
      a.principles,
      (x) => `<li><strong>${esc(x.title)}</strong><span>${esc(x.text)}</span></li>`
    );
  }

  /* =========================== HABILIDADES =========================== */
  function renderSkills() {
    const s = D.skills;
    $("skills-kicker").textContent = s.kicker;
    $("skills-title").textContent = s.title;
    $("skills-lede").textContent = s.lede;

    $("skills-groups").innerHTML = list(
      s.groups,
      (g) => `
        <div class="skill-group reveal">
          <h3>${esc(g.name)}</h3>
          <ul class="chip-row">${list(g.items, (item) => `<li class="chip">${techIcon(item)}${esc(item)}</li>`)}</ul>
          ${g.evidence ? `<p class="evidence"><span aria-hidden="true">↳</span> ${esc(g.evidence)}</p>` : ""}
        </div>`
    );
  }

  /* =========================== TRAYECTORIA =========================== */
  function renderTrayectoria() {
    const t = D.trayectoria;
    const hasExp = t.experiencia && t.experiencia.length > 0;
    $("trayectoria-kicker").textContent = t.kicker;
    $("trayectoria-title").textContent = hasExp ? t.title : t.titleSoloFormacion;

    const column = (title, items) => `
      <div class="timeline-col">
        <h3>${esc(title)}</h3>
        <ol class="timeline">
          ${list(
            items,
            (item) => `
            <li>
              <span class="tl-year">${esc(item.year)}</span>
              <div class="tl-body">
                <div class="tl-name">${esc(item.name)}</div>
                <div class="tl-org">${esc(item.org)}</div>
                ${item.text ? `<p class="tl-text">${esc(item.text)}</p>` : ""}
              </div>
              ${item.tag ? `<span class="tl-tag">${esc(item.tag)}</span>` : ""}
            </li>`
          )}
        </ol>
      </div>`;

    const cols = [];
    if (hasExp) cols.push(column("Experiencia", t.experiencia));
    if (t.formacion && t.formacion.length) cols.push(column("Formación", t.formacion));
    const wrap = $("trayectoria-cols");
    wrap.innerHTML = cols.join("");
    wrap.classList.toggle("is-single", cols.length === 1);
  }

  /* =========================== CONTACTO =========================== */
  function renderContact() {
    const c = D.contact;
    $("contact-title").textContent = c.title;
    $("contact-text").textContent = c.text;

    $("contact-actions").innerHTML = `
      <a class="btn primary" href="mailto:${esc(c.email)}">${ICONS.mail} Escribirme un correo</a>
      <button type="button" class="btn" id="copy-email">${ICONS.copy} Copiar correo</button>
      ${D.hero.cv ? `<a class="btn" href="${esc(D.hero.cv)}" download>${ICONS.download} Descargar CV</a>` : ""}`;

    const row = (icon, label, value, href, external) => `
      <a href="${esc(href)}"${external ? ' target="_blank" rel="noopener"' : ""}>
        <span class="cl-icon">${icon}</span>
        <span class="cl-text"><span class="cl-label">${esc(label)}</span><span class="cl-value">${esc(value)}</span></span>
        <span class="cl-arrow" aria-hidden="true">${ICONS.external}</span>
      </a>`;

    $("contact-links").innerHTML = [
      row(ICONS.mail, "Correo", c.email, `mailto:${c.email}`, false),
      row(ICONS.linkedin, "LinkedIn", c.linkedin.label, c.linkedin.url, true),
      row(ICONS.github, "GitHub", c.github.label, c.github.url, true),
      row(ICONS.phone, "Teléfono", c.phoneDisplay, `tel:${c.phoneHref}`, false)
    ].join("");
  }

  /* =========================== FOOTER =========================== */
  function renderFooter() {
    const f = D.footer;
    $("footer-copy").textContent = `© ${new Date().getFullYear()} ${f.name}`;
    $("footer-made").innerHTML = `${esc(f.madeWith)}${
      f.sourceUrl ? ` <a href="${esc(f.sourceUrl)}" target="_blank" rel="noopener">Ver el código</a>` : ""
    }`;
  }

  /* =====================================================================
     INTERACTIVIDAD
     ===================================================================== */

  // ---- Aviso flotante ----
  let toastTimer;
  function showToast(msg) {
    const toast = $("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 2400);
  }

  // ---- Barra de progreso de lectura + botón "volver arriba" ----
  function initScrollUi() {
    const bar = $("scroll-progress");
    const btn = $("back-to-top");
    let ticking = false;

    const update = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      if (bar) bar.style.transform = `scaleX(${pct / 100})`;
      if (btn) btn.classList.toggle("visible", window.scrollY > 700);
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();

    if (btn) btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // ---- Menú móvil ----
  function initMobileMenu() {
    const toggle = $("nav-toggle");
    const menu = $("mobile-menu");
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      menu.classList.toggle("is-open", open);
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    };

    toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // ---- Resalta el link activo del menú según la sección visible ----
  function initScrollSpy() {
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const navLinks = Array.from(document.querySelectorAll("nav.links a, .mobile-menu a"));
    if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) return;

    const setActive = (id) => {
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    };
    const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    const lastId = sections[sections.length - 1].id;

    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !atBottom()) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((sec) => spyObserver.observe(sec));

    // La última sección es corta y nunca cruza la mitad de la pantalla:
    // al llegar al final de la página se marca directamente.
    window.addEventListener("scroll", () => { if (atBottom()) setActive(lastId); }, { passive: true });
  }

  // ---- Copiar correo al portapapeles ----
  function initCopyEmail() {
    const btn = $("copy-email");
    if (!btn) return;
    const email = D.contact.email;

    btn.addEventListener("click", () => {
      if (!navigator.clipboard) {
        showToast(email);
        return;
      }
      navigator.clipboard
        .writeText(email)
        .then(() => showToast("Correo copiado: " + email))
        .catch(() => showToast(email));
    });
  }

  // ---- Filtro de proyectos ----
  function initProjectFilters() {
    const filterBar = $("project-filters");
    if (!filterBar) return;
    const cards = Array.from(document.querySelectorAll("[data-categories]"));
    const moreTitle = $("more-title");
    const empty = $("projects-empty");

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-chip");
      if (!btn) return;

      filterBar.querySelectorAll(".filter-chip").forEach((c) => c.setAttribute("aria-pressed", String(c === btn)));

      const filter = btn.getAttribute("data-filter");
      let visibleMore = 0;
      let visibleAll = 0;
      cards.forEach((card) => {
        const match = filter === "all" || card.getAttribute("data-categories").split(" ").includes(filter);
        card.classList.toggle("is-hidden", !match);
        if (match) {
          card.classList.add("in-view");
          visibleAll++;
          if (card.classList.contains("mini-card")) visibleMore++;
        }
      });
      if (moreTitle && D.projects.more && D.projects.more.length) moreTitle.hidden = visibleMore === 0;
      if (empty) empty.hidden = visibleAll > 0;
    });
  }

  // ---- Visor ampliado de capturas ----
  function initLightbox() {
    const dialog = $("lightbox");
    if (!dialog || typeof dialog.showModal !== "function") return;
    const img = $("lightbox-img");
    const caption = $("lightbox-caption");

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-lightbox]");
      if (!trigger) return;
      img.src = trigger.getAttribute("data-lightbox");
      img.alt = trigger.getAttribute("data-alt") || "";
      caption.textContent = img.alt;
      dialog.showModal();
    });

    dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
    // Cierra al hacer clic fuera de la imagen
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  // ---- Roles que se escriben y se borran bajo el nombre ----
  function initTyper() {
    const roles = D.hero.roles || [];
    const el = $("hero-typer");
    if (!el || !roles.length) return;
    const text = el.querySelector(".typer-text");

    if (reduceMotion) {
      text.textContent = roles.join(" · ");
      el.classList.add("is-static");
      return;
    }

    let role = 0;
    let chars = 0;
    let deleting = false;
    const tick = () => {
      const word = roles[role];
      chars += deleting ? -1 : 1;
      text.textContent = word.slice(0, chars);

      let delay = deleting ? 38 : 80;
      if (!deleting && chars === word.length) {
        deleting = true;
        delay = 1900;
      } else if (deleting && chars === 0) {
        deleting = false;
        role = (role + 1) % roles.length;
        delay = 380;
      }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 700);
  }

  // ---- Cifras que cuentan desde 0 cuando aparecen en pantalla ----
  function initCountUp() {
    const nums = Array.from(document.querySelectorAll("[data-count]"));
    if (!nums.length || reduceMotion || !("IntersectionObserver" in window)) return;

    const animate = (el) => {
      const target = Number(el.getAttribute("data-count"));
      const duration = 1300;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    // El 0 se escribe en el primer cuadro de la animación: si no llega a correr,
    // queda la cifra final. Arranca un poco antes de entrar en pantalla.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px 10% 0px" }
    );
    nums.forEach((el) => observer.observe(el));
  }

  // ---- Brillo del hero y bordes de tarjetas que siguen al cursor ----
  function initPointerGlow() {
    if (reduceMotion || !finePointer) return;

    const hero = document.querySelector(".hero");
    if (hero) {
      let frame = 0;
      hero.addEventListener("pointermove", (e) => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          hero.style.setProperty("--gx", `${e.clientX - rect.left}px`);
          hero.style.setProperty("--gy", `${e.clientY - rect.top}px`);
          hero.classList.add("is-lit");
          frame = 0;
        });
      });
      hero.addEventListener("pointerleave", () => hero.classList.remove("is-lit"));
    }

    document.querySelectorAll(".project-card, .mini-card, .skill-group").forEach((card) => {
      card.classList.add("spot");
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    });
  }

  // ---- Animación de aparición al hacer scroll ----
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
  }

  /* =====================================================================
     ARRANQUE
     ===================================================================== */
  function init() {
    renderMeta();
    renderHero();
    renderProjects();
    renderAbout();
    renderSkills();
    renderTrayectoria();
    renderContact();
    renderFooter();

    initScrollUi();
    initMobileMenu();
    initScrollSpy();
    initCopyEmail();
    initProjectFilters();
    initLightbox();
    initReveal();
    initTyper();
    initCountUp();
    initPointerGlow();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
