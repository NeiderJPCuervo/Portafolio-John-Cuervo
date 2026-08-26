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
    role: "Desarrollador de sistemas de gestión & inventario",
    pitch: "Diseño y construyo software que le pone orden a la operación: desde el control de materia prima que entra y sale de una bodega, hasta el punto de venta que un vendedor usa todos los días. Me interesa que cada proceso quede registrado, trazable y sin margen para que algo se pierda.",
    primaryCta: { label: "Ver proyectos", href: "#proyectos" },
    secondaryCta: { label: "Escribirme", href: "#contacto" },

    // Ficha lateral tipo "registro de inventario"
    idCard: {
      registro: "REGISTRO N.º JNCQ-2026",
      estado: "Disponible",
      campos: [
        { k: "Rol", v: "Desarrollador de software" },
        { k: "Enfoque", v: "Sistemas de inventario & POS" },
        { k: "Stack principal", v: "Python · SQL · PyQt6 · Tkinter" },
        { k: "Proyectos activos", v: "2 sistemas en producción" },
        { k: "Ubicación", v: "Colombia (remoto o híbrido)" }
      ]
    }
  },

  /* -------------------- 2. SOBRE MÍ -------------------- */
  about: {
    kicker: "01 · Sobre mí",
    title: "De la bodega al código",
    paragraphs: [
      "Soy John Neider Cuervo Quintero, desarrollador enfocado en construir herramientas que resuelven problemas reales de operación: inventarios que cuadran, ventas que quedan registradas y equipos que dejan de perseguir información en cuadernos o Excel sueltos.",
      "Mi trabajo nace de la práctica: empecé automatizando el control de materia prima en la empresa donde trabajo y de ahí pasé a construir un sistema completo de punto de venta para una ferretería, pensando siempre en cómo lo va a usar la persona detrás del mostrador, no solo en cómo se ve el código por dentro.",
      "Me gusta el software de escritorio y los sistemas con roles y permisos claros: quién puede ver qué, quién puede vender y quién administra. Ese orden es, en el fondo, la misma idea que aplico a cualquier proyecto en el que trabajo."
    ],
    // Tarjetas de datos destacados (grid 2x2)
    facts: [
      { num: "02", label: "Sistemas de gestión construidos de principio a fin" },
      { num: "2",  label: "Interfaces gráficas dominadas: Tkinter y PyQt6" },
      { num: "6",  label: "Módulos integrados en un solo sistema (POS ferretería)" },
      { num: "100%", label: "Enfoque en trazabilidad: nada entra o sale sin quedar registrado" }
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
      { id: "pos", label: "Punto de venta" }
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
        link: null // ej: "https://github.com/tu-usuario/pos-ferreteria"
      }

      /* Para agregar un tercer proyecto, copia un bloque { ... } completo
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
        year: "2023 — 2025",
        name: "[ Nombre de tu programa de estudios ]",
        org: "[ Institución — ej. SENA, universidad, academia ]",
        tag: "En curso / Finalizado"
      },
      {
        year: "2024",
        name: "[ Nombre de la certificación, ej. Python Intermedio ]",
        org: "[ Plataforma o institución ]",
        tag: "Certificado"
      },
      {
        year: "2024",
        name: "[ Curso de bases de datos / SQL ]",
        org: "[ Plataforma o institución ]",
        tag: "Certificado"
      }
      /* Copia un bloque { ... } para agregar más certificaciones. */
    ]
  },

  /* -------------------- 6. CONTACTO -------------------- */
  contact: {
    title: "Hablemos de tu próximo sistema",
    text: "Si buscas a alguien que le dé orden y trazabilidad a la operación de tu equipo, con gusto conversamos. Respondo rápido.",
    // El botón de correo tiene copiado al portapapeles automático (ver script.js)
    email: "tu-correo@ejemplo.com",
    linkedin: { label: "/in/tu-usuario", url: "https://www.linkedin.com/in/tu-usuario" },
    github: { label: "/tu-usuario", url: "https://github.com/tu-usuario" },
    phoneDisplay: "+57 XXX XXX XXXX",
    phoneHref: "+57XXXXXXXXXX"
  },

  /* -------------------- 7. PIE DE PÁGINA -------------------- */
  footer: {
    text: "© 2026 John Neider Cuervo Quintero — Ficha actualizada cada vez que aprendo algo nuevo."
  }
};
