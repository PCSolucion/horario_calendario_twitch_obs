/**
 * Calendario Horario Twitch - Script Principal
 * Aplicando principios SOLID y DRY para mejor mantenibilidad
 */

// ===== CONFIGURACIÓN DE DATOS =====
const SCHEDULE_DATA = {
  lunes: {
    image: "https://res.cloudinary.com/pcsolucion/image/upload/v1755393936/cover_ywnqgm.avif",
    times: {
      spain: "16:00",
      mexico: "09:00",
      argentina: "12:00",
      colombia: "10:00",
      chile: "11:00"
    }
  },
  martes: {
    image: "https://res.cloudinary.com/pcsolucion/image/upload/v1755393936/cover_ywnqgm.avif",
    times: {
      spain: "16:00",
      mexico: "09:00",
      argentina: "12:00",
      colombia: "10:00",
      chile: "11:00"
    }
  },
  miercoles: {
    image: "https://res.cloudinary.com/pcsolucion/image/upload/v1755393936/cover_ywnqgm.avif",
    times: {
      spain: "16:00",
      mexico: "09:00",
      argentina: "12:00",
      colombia: "10:00",
      chile: "11:00"
    }
  },
  jueves: {
    image: "https://res.cloudinary.com/pcsolucion/image/upload/v1755393936/cover_ywnqgm.avif",
    times: {
      spain: "16:00",
      mexico: "09:00",
      argentina: "12:00",
      colombia: "10:00",
      chile: "11:00"
    }
  },
  viernes: {
    image: "https://res.cloudinary.com/pcsolucion/image/upload/v1755393866/gotk_ufps2q.jpg",
    times: {
      spain: "16:00",
      mexico: "09:00",
      argentina: "12:00",
      colombia: "10:00",
      chile: "11:00"
    }
  },
  sabado: {
    image: "https://res.cloudinary.com/pcsolucion/image/upload/v1755393936/cover_ywnqgm.avif",
    times: {
      spain: "16:00",
      mexico: "09:00",
      argentina: "12:00",
      colombia: "10:00",
      chile: "11:00"
    }
  }
};

const COUNTRIES = {
  spain: { name: "España", flag: "", isSpecial: true },
  mexico: { name: "", flag: "MX", isSpecial: false },
  argentina: { name: "", flag: "AR", isSpecial: false },
  colombia: { name: "", flag: "CO", isSpecial: false },
  chile: { name: "", flag: "CL", isSpecial: false }
};

// ===== CLASE PRINCIPAL DEL CALENDARIO =====
class TwitchCalendar {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.currentDay = this.getCurrentDay();
    this.init();
  }

  /**
   * Inicializa el calendario
   */
  init() {
    this.renderCalendar();
    this.addEventListeners();
    this.highlightCurrentDay();
  }

  /**
   * Obtiene el día actual de la semana
   */
  getCurrentDay() {
    const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    return days[new Date().getDay()];
  }

  /**
   * Renderiza el calendario completo
   */
  renderCalendar() {
    if (!this.container) return;
    
    this.container.innerHTML = '';
    
    Object.entries(SCHEDULE_DATA).forEach(([day, data]) => {
      const cardElement = this.createDayCard(day, data);
      this.container.appendChild(cardElement);
    });
  }

  /**
   * Crea una tarjeta de día individual
   */
  createDayCard(day, data) {
    const article = document.createElement('article');
    article.className = 'card';
    article.dataset.day = day;
    
    // Capitalizar primera letra del día
    const dayName = day.charAt(0).toUpperCase() + day.slice(1);
    
    article.innerHTML = `
      <img src="${data.image}" alt="Imagen de portada para ${dayName}">
      <header class="card__head">${dayName}</header>
      <section class="card__time">
        <div class="time-zones">
          ${this.createTimeZones(data.times)}
        </div>
      </section>
    `;
    
    return article;
  }

  /**
   * Crea las zonas horarias para un día
   */
  createTimeZones(times) {
    return Object.entries(times).map(([country, time]) => {
      const countryData = COUNTRIES[country];
      const specialClass = countryData.isSpecial ? ' spain' : '';
      
      return `
        <div class="time-zone${specialClass}" data-country="${country}">
          <span class="flag" aria-label="Bandera de ${countryData.name}">
            ${countryData.flag}
          </span>
          <span class="country">${countryData.name}</span>
          <time class="time" datetime="${time}">${time}</time>
        </div>
      `;
    }).join('');
  }

  /**
   * Añade event listeners a las tarjetas
   */
  addEventListeners() {
    const cards = this.container.querySelectorAll('.card');
    
    cards.forEach(card => {
      card.addEventListener('click', () => this.handleCardClick(card));
      card.addEventListener('mouseenter', () => this.handleCardHover(card, true));
      card.addEventListener('mouseleave', () => this.handleCardHover(card, false));
    });
  }

  /**
   * Maneja el click en una tarjeta
   */
  handleCardClick(card) {
    const day = card.dataset.day;
    console.log(`Día seleccionado: ${day}`);
    
    // Aquí puedes añadir funcionalidad adicional
    // como mostrar detalles, abrir modal, etc.
  }

  /**
   * Maneja el hover en una tarjeta
   */
  handleCardHover(card, isHovering) {
    if (isHovering) {
      card.style.transform = 'scale(1.02)';
    } else {
      card.style.transform = 'scale(1)';
    }
  }

  /**
   * Resalta el día actual
   */
  highlightCurrentDay() {
    const currentCard = this.container.querySelector(`[data-day="${this.currentDay}"]`);
    if (currentCard) {
      currentCard.style.border = '2px solid var(--color-accent)';
      currentCard.style.boxShadow = '0 0 20px var(--color-accent)';
    }
  }

  /**
   * Actualiza los horarios para un día específico
   */
  updateDaySchedule(day, newTimes) {
    if (SCHEDULE_DATA[day]) {
      SCHEDULE_DATA[day].times = { ...SCHEDULE_DATA[day].times, ...newTimes };
      this.renderCalendar();
      this.addEventListeners();
    }
  }

  /**
   * Obtiene el horario actual de un día
   */
  getDaySchedule(day) {
    return SCHEDULE_DATA[day] ? SCHEDULE_DATA[day].times : null;
  }
}

// ===== CLASE PARA MANEJO DE ZONAS HORARIAS =====
class TimeZoneManager {
  constructor() {
    this.timeZones = {
      'Europe/Madrid': 'spain',
      'America/Mexico_City': 'mexico',
      'America/Argentina/Buenos_Aires': 'argentina',
      'America/Bogota': 'colombia',
      'America/Santiago': 'chile'
    };
  }

  /**
   * Convierte una hora a diferentes zonas horarias
   */
  convertTime(baseTime, baseTimeZone, targetTimeZones) {
    // Implementación básica - en producción usar librería como moment-timezone
    const conversions = {};
    
    targetTimeZones.forEach(zone => {
      // Aquí iría la lógica real de conversión de zonas horarias
      conversions[zone] = this.calculateTimeDifference(baseTime, zone);
    });
    
    return conversions;
  }

  /**
   * Calcula la diferencia horaria (simplificado)
   */
  calculateTimeDifference(baseTime, targetZone) {
    // Implementación simplificada - en producción usar librería real
    const timeDiffs = {
      spain: 0,
      mexico: -7,
      argentina: -4,
      colombia: -6,
      chile: -5
    };
    
    const [hours, minutes] = baseTime.split(':').map(Number);
    let newHours = hours + timeDiffs[targetZone];
    
    if (newHours < 0) newHours += 24;
    if (newHours >= 24) newHours -= 24;
    
    return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}

// ===== CLASE PARA MANEJO DE ESTADOS =====
class CalendarStateManager {
  constructor() {
    this.state = {
      currentTheme: 'default',
      language: 'es',
      show24Hour: true,
      highlightCurrentDay: true
    };
  }

  /**
   * Cambia el tema del calendario
   */
  setTheme(theme) {
    this.state.currentTheme = theme;
    document.body.className = `theme-${theme}`;
    this.saveState();
  }

  /**
   * Cambia el idioma
   */
  setLanguage(lang) {
    this.state.language = lang;
    this.saveState();
    // Aquí se implementaría la internacionalización
  }

  /**
   * Guarda el estado en localStorage
   */
  saveState() {
    localStorage.setItem('twitchCalendarState', JSON.stringify(this.state));
  }

  /**
   * Carga el estado desde localStorage
   */
  loadState() {
    const saved = localStorage.getItem('twitchCalendarState');
    if (saved) {
      this.state = { ...this.state, ...JSON.parse(saved) };
    }
  }
}

// ===== INICIALIZACIÓN CUANDO EL DOM ESTÉ LISTO =====
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar el calendario
  const calendar = new TwitchCalendar('.container');
  
  // Inicializar el manejador de zonas horarias
  const timeZoneManager = new TimeZoneManager();
  
  // Inicializar el manejador de estado
  const stateManager = new CalendarStateManager();
  stateManager.loadState();
  
  // Exponer instancias globalmente para debugging
  window.twitchCalendar = calendar;
  window.timeZoneManager = timeZoneManager;
  window.stateManager = stateManager;
  
  console.log('Calendario Twitch inicializado correctamente');
});

// ===== FUNCIONES UTILITARIAS =====
const Utils = {
  /**
   * Formatea una hora en formato legible
   */
  formatTime: (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  },

  /**
   * Valida si una hora es válida
   */
  isValidTime: (time) => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  },

  /**
   * Obtiene el nombre del día en español
   */
  getDayName: (dayNumber) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dayNumber] || 'Desconocido';
  }
};
