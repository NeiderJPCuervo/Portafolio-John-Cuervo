/* =====================================================================
   DATA.JS — TODO EL CONTENIDO DEL PORTAFOLIO
   =====================================================================
   Este es el ÚNICO archivo que necesitas editar para actualizar tu
   información. No toques index.html ni style.css a menos que quieras
   cambiar el diseño.

   Reglas rápidas:
   - Los textos van entre comillas "..." o '...'
   - Si necesitas una comilla dentro del texto, escríbela como \"
   - No borres las comas "," entre elementos
   - Puedes agregar o quitar elementos de una lista copiando/borrando
     un bloque { ... } completo (incluyendo la coma que lo separa)
   ===================================================================== */

window.PORTFOLIO_DATA = {

  /* -------------------- 0. DATOS GENERALES / SEO -------------------- */
  meta: {
    siteTitle: "John Neider Cuervo Quintero — Desarrollador de Sistemas",
    siteDescription: "Portafolio de John Neider Cuervo Quintero, desarrollador de sistemas de gestión, inventario y punto de venta.",
    navShortName: "J. CUERVO / DEV"
  },

  /* -------------------- 1. HERO -------------------- */
  hero: {
    eyebrow: "Ficha de perfil · Disponible para nuevas oportunidades",
    nameLine1: "John Neider",
    nameLine2: "Cuervo Quintero",
    role: "Estudiante de Ingeniería de Software y Datos",
    pitch: "Estoy formándome en Ingeniería de Software y Datos y complemento mi formación construyendo sistemas reales: control de inventario, punto de venta y aplicaciones web. Me caracterizo por aprender con facilidad lo que un proyecto requiera y por trabajar en equipo para llegar a las mejores decisiones técnicas.",
    primaryCta: { label: "Ver proyectos", href: "#proyectos" },
    secondaryCta: { label: "Escribirme", href: "#contacto" },

    // Ficha lateral tipo "registro de inventario"
    idCard: {
      registro: "REGISTRO N.º JNCQ-2026",
      estado: "Disponible",
      campos: [
        { k: "Rol", v: "Estudiante de Ingeniería de Software y Datos" },
        { k: "Enfoque", v: "Desarrollo de software & gestión de datos" },
        { k: "Stack principal", v: "Python · SQL · HTML/CSS/JS · PyQt6" },
        { k: "Proyectos activos", v: "3 proyectos en portafolio" },
        { k: "Ubicación", v: "Colombia (remoto o híbrido)" }
      ]
    }
  },

  /* -------------------- 2. SOBRE MÍ -------------------- */
  about: {
    kicker: "01 · Sobre mí",
    paragraphs: [
      "Soy John Neider Cuervo Quintero,Me encuentro en una etapa de formación en la que combino los fundamentos teóricos de mi carrera con la construcción de proyectos reales, con el propósito de consolidar buenas prácticas de desarrollo  en las áreas de software y gestión de datos.",
      "Me caracterizo por tener disposición y facilidad para aprender cualquier tecnología o herramienta que un proyecto requiera, así como por un fuerte enfoque en el trabajo en equipo, entendiendo que las mejores soluciones de software surgen del intercambio de ideas y de decisiones tomadas de manera colaborativa.",
      "He aplicado estos principios en proyectos como un sistema de control de inventario, un punto de venta para una ferretería y una aplicación web interactiva, buscando siempre que la solución sea funcional, ordenada y agradable de usar para la persona que está al otro lado de la pantalla."
    ],
    // Tarjetas de datos destacados (grid 2x2)
    facts: [
      { num: "03", label: "Proyectos construidos de principio a fin" },
      { num: "3",  label: "Tecnologías principales: Python, SQL y JavaScript" },
      { num: "6",  label: "Módulos integrados en un solo sistema (POS ferretería)" },
      { num: "100%", label: "Disposición para aprender y trabajar en equipo" }
    ]
  },

  /* -------------------- 3. HABILIDADES TÉCNICAS -------------------- */
  skills: {
    kicker: "02 · Habilidades técnicas",
    title: "Con qué construyo",
    lede: "Herramientas y lenguajes que uso en el día a día para pasar de una necesidad de negocio a un sistema funcionando.",
    // Cada grupo es una tarjeta. Agrega o quita chips en "items".
    groups: [
      {
        name: "Lenguajes & POO",
        items: ["Python", "Programación orientada a objetos", "SQL"]
      },
      {
        name: "Interfaces gráficas",
        items: ["Tkinter", "PyQt6", "Diseño de UI de escritorio"]
      },
      {
        name: "Datos & persistencia",
        items: ["Diseño de bases de datos", "SQLite / MySQL", "Control de stock e inventario"]
      },
      {
        name: "Prácticas & herramientas",
        items: ["Git & GitHub", "Roles y permisos de usuario", "Reportes & KPIs"]
      }
    ]
  },

  /* -------------------- 4. PROYECTOS -------------------- */
  projects: {
    kicker: "03 · Proyectos",
    title: "Sistemas en producción",
    lede: "Dos fichas, dos problemas reales: que la mercancía no se pierda, y que una ferretería pueda vender, controlar stock y ver sus números desde un solo lugar.",

    // Categorías para el filtro. "all" siempre debe existir.
    filters: [
      { id: "all", label: "Todos" },
      { id: "inventario", label: "Inventario" },
      { id: "pos", label: "Punto de venta" },
      { id: "web", label: "Web" }
    ],

    items: [
      {
        code: "INV-001 / SISTEMA INTERNO",
        name: "Gestión de Mercancía",
        status: "En producción",
        category: "inventario", // debe coincidir con un id de "filters"
        description: [
          "Sistema desarrollado para la empresa donde trabajo, orientado a registrar toda la mercancía de materia prima que ingresa y sale de la cava. Antes de este sistema, el control era manual y propenso a errores; ahora cada movimiento queda registrado, lo que evita pérdidas de mercancía y da trazabilidad completa sobre qué entró, qué salió y cuándo.",
          "El foco estuvo en que el registro fuera rápido de usar para el personal de bodega, sin sacrificar el control que necesita administración para auditar el inventario en cualquier momento."
        ],
        stack: "Python · SQL · Control de inventario en tiempo real",
        // Tabla pequeña de funciones (opcional)
        table: {
          headLeft: "Función",
          headRight: "Beneficio",
          rows: [
            { icon: "📥", name: "Registro de ingreso", value: "Sin pérdidas" },
            { icon: "📤", name: "Registro de salida", value: "Trazabilidad" },
            { icon: "🧊", name: "Control de cava", value: "Stock real" }
          ]
        },
        roles: null, // este proyecto no maneja roles, por eso va vacío
        link: null   // pon aquí la URL de GitHub si el proyecto es público, ej: "https://github.com/tu-usuario/gestion-mercancia"
      },
      {
        code: "POS-002 / SISTEMA DE ESCRITORIO",
        name: "Sistema POS para Ferretería",
        status: "Finalizado",
        category: "pos",
        description: [
          "Sistema de escritorio completo para gestionar productos, inventario y ventas de una ferretería, disponible en dos interfaces gráficas: Tkinter (incluida en Python) y PyQt6 (moderna y estilizada), para adaptarse a distintos equipos y preferencias visuales.",
          "Construido con roles diferenciados, para que cada persona vea exactamente lo que necesita para hacer su trabajo, ni más ni menos."
        ],
        stack: "Python · Tkinter · PyQt6 · SQL",
        table: {
          headLeft: "Módulo",
          headRight: "Acceso",
          rows: [
            { icon: "📦", name: "Productos", value: "Admin" },
            { icon: "⚙",  name: "Categorías", value: "Admin" },
            { icon: "🗂",  name: "Inventario", value: "Admin / Vendedor" },
            { icon: "🧾", name: "Ventas", value: "Admin / Vendedor" },
            { icon: "📊", name: "Reportes", value: "Admin" },
            { icon: "👤", name: "Usuarios", value: "Admin" }
          ]
        },
        roles: [
          { type: "admin",  label: "admin → acceso completo a todos los módulos" },
          { type: "vendor", label: "vendedor → ventas + inventario (lectura)" }
        ],
        link: "https://github.com/NeiderJPCuervo/Sistema-de-Inventario-Ferre.git"
      },
      {
        code: "WEB-003 / APLICACIÓN WEB",
        name: "Amigo Secreto",
        status: "Finalizado",
        category: "web",
        description: [
          "Aplicación web diseñada para realizar sorteos rápidos o dinámicas como el \"Amigo Secreto\". Permite a los usuarios registrar nombres de forma iterativa, visualizarlos en tiempo real y ejecutar un motor de selección aleatoria para escoger un ganador.",
          "El desarrollo se centró en garantizar una experiencia de usuario fluida y sin errores de entrada, validando cada nombre antes de agregarlo a la lista y ofreciendo una interfaz simple, clara e inmediata."
        ],
        stack: "HTML · CSS · JavaScript",
        table: {
          headLeft: "Función",
          headRight: "Detalle",
          rows: [
            { icon: "📝", name: "Registro iterativo de nombres", value: "Validado" },
            { icon: "👀", name: "Visualización en tiempo real", value: "Lista dinámica" },
            { icon: "🎲", name: "Motor de selección aleatoria", value: "Un ganador" }
          ]
        },
        roles: null,
        link: "https://github.com/NeiderJPCuervo/juego-del-amigo-secreto.git"
      }

      /* Para agregar otro proyecto, copia un bloque { ... } completo
         de arriba, pégalo aquí (con una coma antes) y edita sus valores. */
    ]
  },

  /* -------------------- 5. CERTIFICACIONES / ESTUDIOS -------------------- */
  formacion: {
    kicker: "04 · Certificaciones & estudios",
    title: "Formación",
    lede: "Edita esta lista con tu formación real: programas, cursos y certificaciones. Deja el nombre exacto de la institución tal como aparece en tu certificado.",
    items: [
      {
        year: "2024 — 2026",
        name: "[ La Institución Universitaria Digital de Antioquia  ]",
        org: "[ IU Digital de Antioquia]",
        tag: "En curso"
      },
    ]
  },

  /* -------------------- 6. CONTACTO -------------------- */
  contact: {
    title: "Hablemos de tu próximo sistema",
    text: "Si buscas a alguien que le dé orden y trazabilidad a la operación de tu equipo, con gusto conversamos. Respondo rápido.",
    // El botón de correo tiene copiado al portapapeles automático (ver script.js)
    email: "jhonlds155@gmail.com", // TODO: reemplaza por tu correo real
    linkedin: { label: "/in/john-neider-cuervo-quintero", url: "https://www.linkedin.com/in/john-neider-cuervo-quintero/" },
    github: { label: "/NeiderJPCuervo", url: "https://github.com/NeiderJPCuervo" },
    phoneDisplay: "+57 322 681 6736",
    phoneHref: "+573226816736"
  },

  /* -------------------- 7. PIE DE PÁGINA -------------------- */
  footer: {
    text: "© 2026 John Neider Cuervo Quintero — Ficha actualizada cada vez que aprendo algo nuevo."
  }
};
