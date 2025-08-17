/**
 * Configuración del Calendario Horario Twitch
 * Archivo centralizado para todas las configuraciones
 */

// ===== CONFIGURACIÓN DE ZONAS HORARIAS =====
export const TIME_ZONE_CONFIG = {
  // Diferencia horaria respecto a España (UTC+1)
  offsets: {
    spain: 0,        // España: UTC+1
    mexico: -7,      // México: UTC-6
    argentina: -4,   // Argentina: UTC-3
    colombia: -6,    // Colombia: UTC-5
    chile: -5        // Chile: UTC-4
  },
  
  // Configuración de países
  countries: {
    spain: {
      name: "España",
      flag: "",
      isSpecial: true,
      timezone: "Europe/Madrid",
      language: "es"
    },
    mexico: {
      name: "México",
      flag: "MX",
      isSpecial: false,
      timezone: "America/Mexico_City",
      language: "es"
    },
    argentina: {
      name: "Argentina",
      flag: "AR",
      isSpecial: false,
      timezone: "America/Argentina/Buenos_Aires",
      language: "es"
    },
    colombia: {
      name: "Colombia",
      flag: "CO",
      isSpecial: false,
      timezone: "America/Bogota",
      language: "es"
    },
    chile: {
      name: "Chile",
      flag: "CL",
      isSpecial: false,
      timezone: "America/Santiago",
      language: "es"
    }
  }
};

// ===== CONFIGURACIÓN DE HORARIOS =====
export const SCHEDULE_CONFIG = {
  // Horarios base (hora de España)
  baseTime: "16:00",
  
  // Horarios por día
  days: {
    lunes: {
      name: "Lunes",
      image: "https://res.cloudinary.com/pcsolucion/image/upload/v1755393936/cover_ywnqgm.avif",
      active: true,
      specialNotes: ""
    },
    martes: {
      name: "Martes",
      image: "https://res.cloudinary.com/pcsolucion/image/upload/v1755393936/cover_ywnqgm.avif",
      active: true,
      specialNotes: ""
    },
    miercoles: {
      name: "Miércoles",
      image: "https://res.cloudinary.com/pcsolucion/image/upload/v1755393936/cover_ywnqgm.avif",
      active: true,
      specialNotes: ""
    },
    jueves: {
      name: "Jueves",
      image: "https://res.cloudinary.com/pcsolucion/image/upload/v1755393936/cover_ywnqgm.avif",
      active: true,
      specialNotes: ""
    },
    viernes: {
      name: "Viernes",
      image: "https://res.cloudinary.com/pcsolucion/image/upload/v1755393866/gotk_ufps2q.jpg",
      active: true,
      specialNotes: "Game of Thrones"
    }
  }
};

// ===== CONFIGURACIÓN DE ESTILOS =====
export const STYLE_CONFIG = {
  // Colores del tema
  colors: {
    primary: "#9147FF",
    primaryDark: "#7c3aed",
    primaryDarker: "#6d28d9",
    accent: "#fbbf24",
    textLight: "#e5e7eb",
    textWhite: "#ffffff",
    background: "#000000"
  },
  
  // Espaciado
  spacing: {
    xs: "0.2em",
    sm: "0.4em",
    md: "0.6em",
    lg: "0.8em",
    xl: "1em",
    xxl: "1.2em"
  },
  
  // Tamaños de fuente
  fontSizes: {
    xs: "0.75em",
    sm: "0.8em",
    md: "0.9em",
    lg: "1.4em"
  },
  
  // Bordes y sombras
  borders: {
    radius: {
      sm: "12px",
      md: "25px",
      lg: "2px"
    },
    shadows: {
      light: "rgba(255, 255, 255, 0.1)",
      medium: "rgba(255, 255, 255, 0.2)",
      dark: "rgba(255, 255, 255, 0.3)",
      primary: "rgba(145, 71, 255, 0.3)"
    }
  },
  
  // Transiciones
  transitions: {
    fast: "0.2s ease",
    medium: "0.3s ease",
    slow: "0.5s ease",
    verySlow: "1s ease-in-out"
  }
};

// ===== CONFIGURACIÓN DE ANIMACIONES =====
export const ANIMATION_CONFIG = {
  // Efectos de hover
  hover: {
    scale: 1.02,
    translateY: "-2px",
    duration: "0.2s"
  },
  
  // Efectos de tarjeta
  card: {
    skew: "5deg",
    height: "75vmin",
    marginRight: "1em"
  },
  
  // Efectos de zona horaria especial
  special: {
    scale: 1.15,
    zIndex: 15
  }
};

// ===== CONFIGURACIÓN DE RESPONSIVIDAD =====
export const RESPONSIVE_CONFIG = {
  breakpoints: {
    mobile: "768px",
    tablet: "1024px",
    desktop: "1200px"
  },
  
  mobile: {
    container: {
      flexDirection: "column",
      transform: "none",
      margin: "5vmin"
    },
    card: {
      height: "50vmin",
      marginRight: "0",
      marginBottom: "1em"
    },
    timeZones: {
      flexDirection: "column",
      gap: "0.4em"
    }
  }
};

// ===== CONFIGURACIÓN DE ACCESIBILIDAD =====
export const ACCESSIBILITY_CONFIG = {
  // Textos alternativos para imágenes
  altTexts: {
    lunes: "Imagen de portada para Lunes",
    martes: "Imagen de portada para Martes",
    miercoles: "Imagen de portada para Miércoles",
    jueves: "Imagen de portada para Jueves",
    viernes: "Imagen de portada para Viernes"
  },
  
  // Labels para banderas
  flagLabels: {
    spain: "Bandera de España",
    mexico: "Bandera de México",
    argentina: "Bandera de Argentina",
    colombia: "Bandera de Colombia",
    chile: "Bandera de Chile"
  },
  
  // Roles ARIA
  ariaRoles: {
    main: "main",
    article: "article",
    header: "banner",
    section: "region"
  }
};

// ===== CONFIGURACIÓN DE LOCALIZACIÓN =====
export const LOCALIZATION_CONFIG = {
  defaultLanguage: "es",
  supportedLanguages: ["es", "en"],
  
  translations: {
    es: {
      days: {
        lunes: "Lunes",
        martes: "Martes",
        miercoles: "Miércoles",
        jueves: "Jueves",
        viernes: "Viernes"
      },
      countries: {
        spain: "España",
        mexico: "México",
        argentina: "Argentina",
        colombia: "Colombia",
        chile: "Chile"
      }
    },
    en: {
      days: {
        lunes: "Monday",
        martes: "Tuesday",
        miercoles: "Wednesday",
        jueves: "Thursday",
        viernes: "Friday"
      },
      countries: {
        spain: "Spain",
        mexico: "Mexico",
        argentina: "Argentina",
        colombia: "Colombia",
        chile: "Chile"
      }
    }
  }
};

// ===== CONFIGURACIÓN DE DESARROLLO =====
export const DEV_CONFIG = {
  // Modo debug
  debug: false,
  
  // Logging
  logging: {
    enabled: true,
    level: "info" // debug, info, warn, error
  },
  
  // Performance
  performance: {
    enableAnimations: true,
    enableHoverEffects: true,
    enableTransitions: true
  }
};

// ===== FUNCIÓN PARA OBTENER CONFIGURACIÓN COMPLETA =====
export function getFullConfig() {
  return {
    timeZones: TIME_ZONE_CONFIG,
    schedule: SCHEDULE_CONFIG,
    styles: STYLE_CONFIG,
    animations: ANIMATION_CONFIG,
    responsive: RESPONSIVE_CONFIG,
    accessibility: ACCESSIBILITY_CONFIG,
    localization: LOCALIZATION_CONFIG,
    development: DEV_CONFIG
  };
}

// ===== FUNCIÓN PARA VALIDAR CONFIGURACIÓN =====
export function validateConfig() {
  const errors = [];
  
  // Validar que todos los días tengan configuración
  Object.entries(SCHEDULE_CONFIG.days).forEach(([day, config]) => {
    if (!config.name || !config.image) {
      errors.push(`Configuración incompleta para ${day}`);
    }
  });
  
  // Validar que todos los países tengan configuración
  Object.entries(TIME_ZONE_CONFIG.countries).forEach(([country, config]) => {
    if (!config.name || !config.timezone) {
      errors.push(`Configuración incompleta para ${country}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// ===== EXPORTACIÓN POR DEFECTO =====
export default {
  TIME_ZONE_CONFIG,
  SCHEDULE_CONFIG,
  STYLE_CONFIG,
  ANIMATION_CONFIG,
  RESPONSIVE_CONFIG,
  ACCESSIBILITY_CONFIG,
  LOCALIZATION_CONFIG,
  DEV_CONFIG,
  getFullConfig,
  validateConfig
};
