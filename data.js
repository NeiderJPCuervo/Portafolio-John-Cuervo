/* =====================================================================
   DATA.JS — TODO EL CONTENIDO DEL PORTAFOLIO VIVE AQUÍ
   =====================================================================
   Para actualizar tu portafolio solo edita este archivo. script.js lo
   lee y construye la página. Reglas rápidas:
   - Los textos van entre comillas.
   - Si un campo dice null, esa parte simplemente no se muestra.
   - Para agregar un elemento a una lista, copia un bloque { ... } completo,
     pégalo con una coma antes y edita sus valores.
   ===================================================================== */

window.PORTFOLIO_DATA = {

  /* -------------------- 0. DATOS GENERALES / SEO -------------------- */
  meta: {
    siteTitle: "John Neider Cuervo Quintero — Desarrollador de software y datos",
    siteDescription: "Portafolio de John Neider Cuervo Quintero: estudiante de Ingeniería de Software y Datos en Medellín. Sistemas de inventario, punto de venta y dashboards de datos industriales.",
    navName: "John Cuervo"
  },

  /* -------------------- 1. HERO -------------------- */
  hero: {
    availability: "Disponible para prácticas y roles junior",
    nameLine1: "John Neider",
    nameLine2: "Cuervo Quintero",
    headline: "Construyo software para problemas reales de operación: control de inventario, puntos de venta y dashboards que convierten datos de planta en decisiones.",
    roleLine: "Estudiante de Ingeniería de Software y Datos · IU Digital de Antioquia",

    // Foto de perfil (cuadrada). Pon null para mostrar tus iniciales.
    photo: "assets/john-cuervo.jpg",

    // Hoja de vida: guarda tu PDF como cv.pdf en esta carpeta y cambia null
    // por "cv.pdf". Aparecerá un botón "Descargar CV" en el menú y el hero.
    cv: null,

    primaryCta: { label: "Ver proyectos", href: "#proyectos" },
    secondaryCta: { label: "Contactarme", href: "#contacto" },

    // Ficha lateral tipo "registro de inventario"
    idCard: {
      code: "REG · JNCQ-2026",
      estado: "Disponible",
      campos: [
        { k: "Busco", v: "Práctica profesional o rol junior en software / datos" },
        { k: "Stack", v: "Python · SQL · JavaScript · React" },
        { k: "En producción", v: "Control de mercancía en la empresa donde trabajo" },
        { k: "Ubicación", v: "Medellín, Colombia" }
      ]
    }
  },

  /* Cifras bajo el hero. Usa solo datos verificables en tus proyectos. */
  highlights: [
    { num: "1", label: "sistema en producción dentro de la empresa donde trabajo" },
    { num: "34", label: "señales de sensores organizadas en un dashboard industrial" },
    { num: "489", label: "paros de planta detectados automáticamente en 4 meses de datos" },
    { num: "6", label: "módulos con roles y permisos en el POS de ferretería" }
  ],

  /* -------------------- 2. PROYECTOS -------------------- */
  projects: {
    kicker: "01 · Proyectos",
    title: "Proyectos destacados",
    lede: "Cada proyecto parte de un problema concreto. En cada uno cuento qué había que resolver, cómo lo construí y qué resultado dio.",

    // Categorías del filtro. "all" siempre debe existir.
    filters: [
      { id: "all", label: "Todos" },
      { id: "gestion", label: "Software de gestión" },
      { id: "datos", label: "Datos" },
      { id: "web", label: "Web" }
    ],

    /* Proyectos grandes, en formato caso de estudio.
       status.tone: "green" (en producción), "blue" (demo), "gray" (finalizado), "violet" (académico)
       visual: usa "image" si tienes captura; si no, "table" dibuja una ventana con módulos. */
    featured: [
      {
        code: "DASH-01",
        type: "Dashboard web · Datos industriales",
        name: "Monitoreo de planta hidratadora de cal",
        status: { label: "Demo funcional", tone: "blue" },
        categories: ["datos", "web"],
        summary: "Dashboard que convierte cuatro meses de lecturas de sensores en KPIs, alarmas y una línea de tiempo de paros.",
        problem: "Las lecturas de mayo a agosto de la planta estaban repartidas en archivos Excel mensuales. Era imposible ver de un vistazo cuándo se detuvo la planta o qué equipo superó sus límites.",
        solution: "Un script ETL en Node.js lee los Excel, normaliza 34 señales y precalcula promedios diarios, horarios y KPIs por mes. El frontend en React + Recharts organiza las señales en 7 áreas del proceso, con umbrales de alarma y filtro por mes.",
        result: "489 paros detectados automáticamente (836,9 h de planta detenida) y una disponibilidad global de 71,6 %, todo visible en una sola pantalla.",
        decisions: [
          "Un paro se detecta cuando pasan más de 15 minutos sin lecturas: una regla simple y fácil de explicar al equipo de operación.",
          "Los agregados se calculan una sola vez en el ETL, no en el navegador, para que las gráficas respondan rápido al cambiar de mes.",
          "Mapeo explícito de los códigos de sensor (ej. TT 411201) a nombres legibles, para que el código sea fácil de mantener."
        ],
        stack: ["React", "Vite", "Recharts", "Node.js", "SheetJS (xlsx)"],
        image: {
          src: "assets/projects/dashboard-planta.png",
          alt: "Dashboard de la planta: tarjetas de disponibilidad, paros y alarmas, línea de tiempo de estado operativo y gráficas de temperatura por etapa.",
          width: 1440,
          height: 900,
          frameTitle: "planta-hidratadora · mayo–agosto"
        },
        table: null,
        roles: null,
        links: {
          code: "https://github.com/NeiderJPCuervo/DASHBOARD-DEMO",
          demo: null // pon aquí la URL de Netlify cuando publiques el dashboard
        },
        note: null
      },
      {
        code: "INV-02",
        type: "Sistema interno · Inventario",
        name: "Gestión de mercancía en cava",
        status: { label: "En producción", tone: "green" },
        categories: ["gestion", "datos"],
        summary: "Registro de entradas y salidas de materia prima que reemplazó el control manual en la empresa donde trabajo.",
        problem: "El control de la materia prima que entraba y salía de la cava era manual: había errores, se perdía mercancía y no existía forma de auditar qué había pasado.",
        solution: "Desarrollé un sistema en Python con base de datos SQL donde cada ingreso y cada salida quedan registrados, con trazabilidad completa de qué entró, qué salió y cuándo.",
        result: "Hoy lo usa el personal de bodega, y administración puede auditar el inventario real en cualquier momento.",
        decisions: [
          "Prioricé que registrar un movimiento fuera rápido: si es lento, el personal de bodega deja de usarlo.",
          "Cada movimiento queda guardado con su fecha, así el historial sirve para auditar y no solo para consultar el stock."
        ],
        stack: ["Python", "SQL", "Control de inventario"],
        image: null,
        table: {
          frameTitle: "gestion_mercancia",
          headLeft: "Función",
          headRight: "Beneficio",
          rows: [
            { icon: "📥", name: "Registro de ingreso", value: "Sin pérdidas" },
            { icon: "📤", name: "Registro de salida", value: "Trazabilidad" },
            { icon: "🧊", name: "Control de cava", value: "Stock real" },
            { icon: "🔎", name: "Historial de movimientos", value: "Auditoría" }
          ]
        },
        roles: null,
        links: { code: null, demo: null },
        note: "Código privado: es un sistema interno de la empresa."
      },
      {
        code: "POS-03",
        type: "App de escritorio · Punto de venta",
        name: "Sistema POS para ferretería",
        status: { label: "Finalizado", tone: "gray" },
        categories: ["gestion"],
        summary: "Aplicación de escritorio para vender, controlar el stock y revisar los números de una ferretería desde un solo lugar.",
        problem: "Una ferretería necesita vender, controlar su inventario y revisar sus números en un solo lugar, con permisos distintos para el administrador y los vendedores.",
        solution: "App en Python con SQLite y 6 módulos: productos, categorías, inventario con alertas de reposición, ventas con carrito, reportes con KPIs y gestión de usuarios.",
        result: "Cada rol ve solo lo que necesita: el administrador accede a todo y el vendedor solo a ventas e inventario en modo lectura.",
        decisions: [
          "Contraseñas guardadas como hash SHA-256, nunca en texto plano.",
          "Dos interfaces con la misma funcionalidad: Tkinter, que viene incluida con Python, y PyQt6, más moderna.",
          "Permisos por rol: cada persona ve exactamente los módulos que necesita para su trabajo."
        ],
        stack: ["Python", "SQLite", "Tkinter", "PyQt6"],
        image: null,
        table: {
          frameTitle: "ferreteria_gui.py",
          headLeft: "Módulo",
          headRight: "Acceso",
          rows: [
            { icon: "📦", name: "Productos", value: "Admin" },
            { icon: "⚙", name: "Categorías", value: "Admin" },
            { icon: "🗂", name: "Inventario", value: "Admin / Vendedor" },
            { icon: "🧾", name: "Ventas", value: "Admin / Vendedor" },
            { icon: "📊", name: "Reportes", value: "Admin" },
            { icon: "👤", name: "Usuarios", value: "Admin" }
          ]
        },
        roles: [
          { type: "admin", label: "admin → todos los módulos" },
          { type: "vendor", label: "vendedor → ventas + inventario (lectura)" }
        ],
        links: {
          code: "https://github.com/NeiderJPCuervo/Sistema-de-Inventario-Ferre",
          demo: null
        },
        note: null
      }
    ],

    /* Proyectos más pequeños, en tarjetas compactas.
       visual: "image" (captura), "snippet" (líneas de código reales) o "steps" (fases). */
    more: [
      {
        code: "SIM-04",
        name: "Simulación de colas bancarias",
        status: { label: "Finalizado", tone: "gray" },
        categories: ["datos"],
        summary: "Modelo Monte Carlo que compara configuraciones de cajeros para reducir la espera de los clientes de un banco.",
        details: "Simula una jornada de 8 horas con 10 réplicas, llegadas y servicios exponenciales, y dos tipos de transacción con cuatro velocidades de atención. Calcula la espera en cola (Wq) y la utilización (ρ), y recomienda agregar cajeros si Wq > 5 min o ρ > 85 %.",
        stack: ["Python", "NumPy", "pandas", "Monte Carlo"],
        visual: {
          type: "snippet",
          title: "simu2.py",
          lines: [
            "# ¿Se necesita un nuevo cajero?",
            "# Umbral: Wq > 5 min o ρ > 0.85",
            "necesario = overall_wait > 5.0 or rho > 0.85",
            "",
            "# Cajeros dedicados (retiros, pagos)",
            "configs = [(1, 2), (2, 1)]"
          ]
        },
        links: { code: "https://github.com/NeiderJPCuervo/Simulacion_Banco", demo: null }
      },
      {
        code: "BIG-05",
        name: "Big Data con Databricks",
        status: { label: "Académico · en pareja", tone: "violet" },
        categories: ["datos"],
        summary: "Análisis de un dataset de calidad del aire de Kaggle en Databricks, resuelto en equipo de dos.",
        details: "Diseñamos el esquema con StructType, cargamos los datos como tabla Delta en Unity Catalog y validamos su calidad (nulos, estadísticas, agrupaciones, top 10 de países) con PySpark y Spark SQL en paralelo, comparando ambos enfoques y sus planes de ejecución.",
        stack: ["Databricks", "PySpark", "Spark SQL", "Delta Lake"],
        visual: {
          type: "steps",
          title: "notebook · 5 fases",
          lines: [
            "Diseño del esquema",
            "Configuración del entorno",
            "Carga y tabla Delta",
            "Validaciones Spark ⇄ SQL",
            "Comparación de enfoques"
          ]
        },
        links: { code: "https://github.com/NeiderJPCuervo/Actividad_2_BigData", demo: null }
      },
      {
        code: "WEB-06",
        name: "Amigo Secreto",
        status: { label: "Finalizado", tone: "gray" },
        categories: ["web"],
        summary: "App web para sorteos rápidos: agrega nombres con validación, los muestra en vivo y elige uno al azar.",
        details: "Validación de entradas vacías, lista que se actualiza en tiempo real y opción para reiniciar el juego. Construida sin librerías, con manipulación directa del DOM.",
        stack: ["HTML", "CSS", "JavaScript"],
        visual: {
          type: "image",
          src: "assets/projects/amigo-secreto.png",
          alt: "Pantalla de Amigo Secreto con el campo para escribir nombres y los botones Sortear amigo y Reiniciar juego.",
          width: 1280,
          height: 800,
          title: "amigo-secreto"
        },
        links: { code: "https://github.com/NeiderJPCuervo/juego-del-amigo-secreto", demo: null }
      }
    ]
  },

  /* -------------------- 3. SOBRE MÍ -------------------- */
  about: {
    kicker: "02 · Sobre mí",
    title: "Aprendo construyendo cosas que alguien usa",
    paragraphs: [
      "Soy estudiante de Ingeniería de Software y Datos en la IU Digital de Antioquia. Estudio y trabajo al mismo tiempo, y esa combinación define cómo programo: primero entiendo el problema de la persona que va a usar el sistema y después elijo la herramienta.",
      "Mi primer sistema en producción nació en mi trabajo: el control de la mercancía en la cava era manual y se perdía producto. Lo resolví con Python y SQL. Desde entonces he construido un punto de venta con roles para una ferretería, un dashboard industrial en React y análisis de datos con Python y Spark.",
      "Aprendo rápido lo que un proyecto necesite y disfruto el trabajo en equipo: las mejores soluciones de software surgen del intercambio de ideas y de decisiones tomadas en conjunto."
    ],
    principlesTitle: "Cómo trabajo",
    principles: [
      { title: "Funcional primero", text: "Que resuelva el problema real: que la mercancía no se pierda, que la venta cuadre, que el paro se vea." },
      { title: "Pensado para quien lo usa", text: "Interfaces claras para el personal de bodega o los vendedores, no para programadores." },
      { title: "Aprendo lo que haga falta", text: "De Tkinter a PyQt6, de Python a React, de SQL a Spark, según lo pida el proyecto." },
      { title: "Decisiones en equipo", text: "Prefiero discutir una decisión técnica con el equipo antes que tomarla a ciegas." }
    ]
  },

  /* -------------------- 4. HABILIDADES -------------------- */
  skills: {
    kicker: "03 · Habilidades",
    title: "Con qué construyo",
    lede: "Cada habilidad está respaldada por al menos un proyecto de esta página.",
    groups: [
      {
        name: "Lenguajes",
        items: ["Python", "SQL", "JavaScript", "Java"],
        evidence: "POS, inventario y simulación en Python · dashboard en JavaScript · POO en Java"
      },
      {
        name: "Web & frontend",
        items: ["HTML", "CSS", "React", "Vite", "Recharts"],
        evidence: "Dashboard de planta · Amigo Secreto · este portafolio"
      },
      {
        name: "Datos",
        items: ["SQLite / MySQL", "pandas", "NumPy", "PySpark", "Spark SQL", "Databricks", "ETL"],
        evidence: "ETL del dashboard · simulación bancaria · Big Data con Databricks"
      },
      {
        name: "Escritorio",
        items: ["Tkinter", "PyQt6", "Diseño de interfaces"],
        evidence: "Sistema POS para ferretería"
      },
      {
        name: "Buenas prácticas",
        items: ["POO", "Diseño de bases de datos", "Roles y permisos", "Hash de contraseñas", "KPIs y reportes"],
        evidence: "POS para ferretería · gestión de mercancía"
      },
      {
        name: "Herramientas",
        items: ["Git & GitHub", "Netlify", "PyCharm"],
        evidence: "Todo mi código está en GitHub; este sitio se publica en Netlify"
      }
    ]
  },

  /* -------------------- 5. TRAYECTORIA -------------------- */
  trayectoria: {
    kicker: "04 · Trayectoria",
    title: "Formación y experiencia",   // se usa cuando hay experiencia
    titleSoloFormacion: "Formación",    // se usa mientras "experiencia" esté vacía

    /* Experiencia laboral: si la agregas, aparece una columna nueva.
       Ejemplo (copia, quita las barras // y edita):
       { year: "2025 — Actual", name: "Tu cargo", org: "Nombre de la empresa", tag: "Actual",
         text: "Desarrollé el sistema de gestión de mercancía que hoy usa la bodega." } */
    experiencia: [],

    formacion: [
      {
        year: "2024 — 2026",
        name: "Ingeniería de Software y Datos",
        org: "Institución Universitaria Digital de Antioquia (IU Digital)",
        tag: "En curso",
        text: null
      }
      /* Agrega aquí cursos o certificaciones con el mismo formato:
         { year: "2025", name: "Nombre del curso", org: "Plataforma o institución", tag: "Certificado", text: null } */
    ]
  },

  /* -------------------- 6. CONTACTO -------------------- */
  contact: {
    title: "¿Tienes una vacante o una práctica? Hablemos.",
    text: "Busco una práctica profesional o un rol junior en desarrollo de software o datos, donde pueda aportar desde el primer día y seguir aprendiendo de un equipo con experiencia. Respondo rápido.",
    email: "jhonlds155@gmail.com",
    linkedin: { label: "/in/john-neider-cuervo-quintero", url: "https://www.linkedin.com/in/john-neider-cuervo-quintero/" },
    github: { label: "/NeiderJPCuervo", url: "https://github.com/NeiderJPCuervo" },
    phoneDisplay: "+57 322 681 6736",
    phoneHref: "+573226816736"
  },

  /* -------------------- 7. PIE DE PÁGINA -------------------- */
  footer: {
    name: "John Neider Cuervo Quintero",
    madeWith: "Diseñado y programado a mano con HTML, CSS y JavaScript.",
    sourceUrl: "https://github.com/NeiderJPCuervo/Portafolio-John-Cuervo"
  }
};
