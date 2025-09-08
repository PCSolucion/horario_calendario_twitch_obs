/**
 * Calendario Horario Twitch - Script Principal
 * Aplicando principios SOLID y DRY para mejor mantenibilidad
 */

// ===== CONFIGURACIÓN DE DATOS =====
const SCHEDULE_DATA = {
  lunes: {
    image: "https://artfiles.alphacoders.com/121/121227.jpg",
    game: "A PLAGUE TALE: INNOCENCE",
    times: {
      spain: "19:00",
      mexico: "12:00", /* 7 horas menos que España (20:00 - 7 = 13:00) */
      argentina: "115:00", /* 4 horas menos que España (20:00 - 4 = 16:00) */
      colombia: "13:00", /* 6 horas menos que España (20:00 - 6 = 14:00) */
      chile: "12:00" /* 5 horas menos que España (20:00 - 5 = 15:00) */
    }
  },
  martes: {
    image: "https://cdn.prod.website-files.com/66bb5e6110dac0834d635a32/66bc751fc6927534f728c4da_NW_OPENGRAPH_1200x630.webp",
    game: "NEW WORLD AETERNUM",
    times: {
      spain: "20:00",
      mexico: "13:00", /* 7 horas menos que España (20:00 - 7 = 13:00) */
      argentina: "16:00", /* 4 horas menos que España (20:00 - 4 = 16:00) */
      colombia: "14:00", /* 6 horas menos que España (20:00 - 6 = 14:00) */
      chile: "15:00" /* 5 horas menos que España (20:00 - 5 = 15:00) */
    }
  },
  miercoles: {
    image: "https://artfiles.alphacoders.com/121/121227.jpg",
    game: "A PLAGUE TALE: INNOCENCE",
    times: {
      spain: "20:00",
      mexico: "13:00", /* 7 horas menos que España (20:00 - 7 = 13:00) */
      argentina: "16:00", /* 4 horas menos que España (20:00 - 4 = 16:00) */
      colombia: "14:00", /* 6 horas menos que España (20:00 - 6 = 14:00) */
      chile: "15:00" /* 5 horas menos que España (20:00 - 5 = 15:00) */
    }
  },
  jueves: {
    image: "https://artfiles.alphacoders.com/121/121227.jpg",
    game: "A PLAGUE TALE: INNOCENCE",
    times: {
      spain: "20:00",
      mexico: "13:00", /* 7 horas menos que España (20:00 - 7 = 13:00) */
      argentina: "16:00", /* 4 horas menos que España (20:00 - 4 = 16:00) */
      colombia: "14:00", /* 6 horas menos que España (20:00 - 6 = 14:00) */
      chile: "15:00" /* 5 horas menos que España (20:00 - 5 = 15:00) */
    }
  },
  viernes: {
    image: "https://res.cloudinary.com/pcsolucion/image/upload/v1755408278/game-of-thrones-1-1920x1080_ffobjf.webp",
    game: "GOT: KINGSROAD",
    times: {
      spain: "19:00",
      mexico: "12:00", /* 7 horas menos que España (20:00 - 7 = 13:00) */
      argentina: "15:00", /* 4 horas menos que España (20:00 - 7 = 11:00) */
      colombia: "13:00", /* 6 horas menos que España (20:00 - 6 = 14:00) */
      chile: "14:00" /* 5 horas menos que España (20:00 - 5 = 15:00) */
    }
  },
  sabado: {
    image: "https://cdn.prod.website-files.com/66bb5e6110dac0834d635a32/66bc751fc6927534f728c4da_NW_OPENGRAPH_1200x630.webp",
    game: "NEW WORLD AETERNUM",
    times: {
      spain: "11:00", /* Cambiado de 16:00 a 11:00 (mañana) */
      mexico: "04:00", /* 7 horas menos que España (11:00 - 7 = 04:00) */
      argentina: "07:00", /* 4 horas menos que España (11:00 - 4 = 07:00) */
      colombia: "05:00", /* 6 horas menos que España (11:00 - 6 = 05:00) */
      chile: "06:00" /* 5 horas menos que España (11:00 - 5 = 06:00) */
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

// ===== CLASE PARA MANEJO DE ANIMACIONES =====
class AnimationManager {
  constructor() {
    this.isAnimating = false;
    this.animationDelay = 900; // Delay entre cada card (aumentado de 600ms a 900ms)
    this.animationDuration = 2000; // Duración de la animación (ajustado para salida muy pausada como baraja)
    this.hasCompletedOnce = false; // Control para ejecutar solo una vez
  }

  /**
   * Anima la entrada de las cards de una en una desde la izquierda
   */
  async animateCardsIn(cards) {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    
    // Ocultar todas las cards inicialmente
    cards.forEach(card => {
      card.classList.add('animating-in');
      card.style.transform = 'translateX(-100vw)';
      card.style.opacity = '0';
    });

    // Pequeño delay para asegurar que las cards estén ocultas
    await this.delay(100);

    // Animar entrada de cada card
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      
      // Sin rotación, solo movimiento horizontal recto
      
      // Animar entrada
      card.style.transform = 'translateX(0)';
      card.style.opacity = '1';
      
      // Esperar antes de la siguiente card
      if (i < cards.length - 1) {
        await this.delay(this.animationDelay);
      }
    }

    // Esperar a que termine la última animación
    await this.delay(this.animationDuration);
    
    // Limpiar clases de animación
    cards.forEach(card => {
      card.classList.remove('animating-in');
    });
    
    this.isAnimating = false;
  }

  /**
   * Anima la salida de las cards como una baraja que se juntan rápidamente hacia la izquierda
   */
  async animateCardsOut(cards) {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    
    // Añadir clase de animación de salida a todas las cards simultáneamente
    cards.forEach(card => {
      card.classList.add('animating-out');
    });
    
    // Animar salida de todas las cards al mismo tiempo (como una baraja)
    cards.forEach((card, index) => {
      // Sin rotación, solo movimiento horizontal recto
      card.style.transform = 'translateX(-100vw)';
      card.style.opacity = '0';
    });

    // Esperar a que termine la animación (mucho más lento)
    await this.delay(2000); // Ajustado para salida muy pausada como baraja
    
    // Limpiar clases de animación
    cards.forEach(card => {
      card.classList.remove('animating-out');
    });
    
    this.isAnimating = false;
    this.hasCompletedOnce = true; // Marcar como completada
  }

  /**
   * Función de utilidad para delays
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Reinicia las cards a su estado normal
   */
  resetCards(cards) {
    cards.forEach(card => {
      card.classList.remove('animating-in', 'animating-out');
      card.style.transform = '';
      card.style.opacity = '';
      
      // NO tocar los estilos de borde y sombra si es la tarjeta del día actual
      // La animación de parpadeo se maneja por separado
    });
  }

  /**
   * Pausa la animación
   */
  pause() {
    this.isAnimating = true;
  }

  /**
   * Reanuda la animación
   */
  resume() {
    this.isAnimating = false;
  }

  /**
   * Verifica si la animación ya se completó una vez
   */
  hasCompleted() {
    return this.hasCompletedOnce;
  }

  /**
   * Resetea el estado de completado
   */
  resetCompleted() {
    this.hasCompletedOnce = false;
  }
}

// ===== CLASE PRINCIPAL DEL CALENDARIO =====
class TwitchCalendar {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.currentDay = this.getCurrentDay();
    this.animationManager = new AnimationManager();
    this.init();
  }

  /**
   * Inicializa el calendario
   */
  init() {
    this.renderCalendar();
    this.addEventListeners();
    this.highlightCurrentDay();
    
    // Configurar estado inicial del botón
    this.updateAnimationButtonState();
    
    // Iniciar animación de entrada solo si no se ha completado antes
    if (!this.animationManager.hasCompleted()) {
      this.startEntryAnimation();
    } else {
      // Si ya se completó, mostrar mensaje de completado
      this.updateAnimationStatus('Animación completada - Usa el botón para repetir', 'completed');
    }
  }

  /**
   * Inicia la animación de entrada de las cards
   */
  async startEntryAnimation() {
    const cards = this.container.querySelectorAll('.card');
    this.updateAnimationStatus('Entrando cards...', 'entering');
    this.updateAnimationButtonState();
    await this.animationManager.animateCardsIn(Array.from(cards));
    
    // Asegurar que el resaltado del día actual persista después de la animación
    this.ensureCurrentDayHighlight();
    
    // Después de que todas las cards estén visibles, esperar 5 segundos antes de iniciar la salida
    this.updateAnimationStatus('Cards visibles - Esperando 5 segundos...', 'waiting');
    this.updateAnimationButtonState();
    setTimeout(() => {
      this.startExitAnimation();
    }, 660000); // 660 segundos de pausa antes de empezar a salir
  }

  /**
   * Inicia la animación de salida de las cards
   */
  async startExitAnimation() {
    const cards = this.container.querySelectorAll('.card');
    this.updateAnimationStatus('Saliendo cards...', 'exiting');
    this.updateAnimationButtonState();
    await this.animationManager.animateCardsOut(Array.from(cards));
    
    // Después de que todas las cards hayan salido, mostrar mensaje de completado
    this.updateAnimationStatus('Animación completada - Usa el botón para repetir', 'completed');
    this.updateAnimationButtonState();
  }

  /**
   * Reinicia el ciclo de animación
   */
  async restartAnimationCycle() {
    const cards = this.container.querySelectorAll('.card');
    
    // Detener todas las animaciones de parpadeo
    this.stopAllBlinkingAnimations();
    
    // Reiniciar estado de las cards
    this.animationManager.resetCards(Array.from(cards));
    
    // Resetear el estado de completado
    this.animationManager.resetCompleted();
    
    // Pequeño delay y reiniciar
    await this.animationManager.delay(500);
    this.startEntryAnimation();
  }

  /**
   * Detiene todas las animaciones de parpadeo
   */
  stopAllBlinkingAnimations() {
    const cards = this.container.querySelectorAll('.card');
    cards.forEach(card => {
      if (card.dataset.blinkInterval) {
        clearInterval(parseInt(card.dataset.blinkInterval));
        delete card.dataset.blinkInterval;
      }
    });
  }

  /**
   * Asegura que el resaltado del día actual persista después de las animaciones
   */
  ensureCurrentDayHighlight() {
    // Pequeño delay para asegurar que las animaciones hayan terminado
    setTimeout(() => {
      this.highlightCurrentDay();
      // Forzar la animación de parpadeo con JavaScript
      this.startBlinkingAnimation();
    }, 100);
  }

  /**
   * Inicia la animación de parpadeo usando JavaScript para mayor control
   */
  startBlinkingAnimation() {
    const currentCard = this.container.querySelector(`[data-day="${this.currentDay}"]`);
    if (!currentCard) return;

    // Remover cualquier animación CSS previa
    currentCard.style.animation = '';
    
    // Aplicar estilos iniciales
    currentCard.style.border = '3px solid var(--color-primary)';
    currentCard.style.boxShadow = '0 0 25px var(--color-primary)';
    
    let isVisible = true;
    const blinkInterval = setInterval(() => {
      if (isVisible) {
        // Estado "apagado"
        currentCard.style.border = '3px solid rgba(145, 71, 255, 0.3)';
        currentCard.style.boxShadow = '0 0 10px rgba(145, 71, 255, 0.3)';
        isVisible = false;
      } else {
        // Estado "encendido"
        currentCard.style.border = '3px solid var(--color-primary)';
        currentCard.style.boxShadow = '0 0 25px var(--color-primary)';
        isVisible = true;
      }
    }, 1500); // Cambio cada 1.5 segundos (3 segundos total por ciclo)

    // Guardar el intervalo para poder detenerlo si es necesario
    currentCard.dataset.blinkInterval = blinkInterval;
    
    console.log('Animación de parpadeo iniciada con JavaScript');
  }

  /**
   * Actualiza el indicador de estado de la animación
   */
  updateAnimationStatus(message, state = 'default') {
    const statusElement = document.getElementById('animation-status');
    if (statusElement) {
      const statusText = statusElement.querySelector('.status-text');
      if (statusText) {
        statusText.textContent = message;
      }
      
      // Actualizar clases CSS según el estado
      statusElement.className = `animation-status status-${state}`;
    }
  }

  /**
   * Pausa la animación
   */
  pauseAnimation() {
    this.animationManager.pause();
    this.updateAnimationStatus('Animación pausada', 'paused');
    this.updateAnimationButtonState();
    console.log('Animación pausada');
  }

  /**
   * Reanuda la animación
   */
  resumeAnimation() {
    this.animationManager.resume();
    this.updateAnimationStatus('Animación reanudada', 'resumed');
    this.updateAnimationButtonState();
    console.log('Animación reanudada');
  }

  /**
   * Detiene completamente la animación
   */
  stopAnimation() {
    this.animationManager.pause();
    const cards = this.container.querySelectorAll('.card');
    this.animationManager.resetCards(Array.from(cards));
    this.updateAnimationStatus('Animación detenida', 'stopped');
    this.updateAnimationButtonState();
    console.log('Animación detenida');
  }

  /**
   * Reinicia la animación desde el principio
   */
  restartAnimation() {
    this.stopAnimation();
    this.updateAnimationStatus('Reiniciando animación...', 'restarting');
    this.updateAnimationButtonState();
    setTimeout(() => {
      this.startEntryAnimation();
    }, 1000);
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
    
    // Re-aplicar el resaltado del día actual después del renderizado
    this.highlightCurrentDay();
  }

  /**
   * Crea una tarjeta de día individual
   */
  createDayCard(day, data) {
    const article = document.createElement('article');
    // Añadir clase 'sabado' además de 'card' si es sábado
    article.className = day === 'sabado' ? 'card sabado' : 'card';
    article.dataset.day = day;
    
    // Capitalizar primera letra del día
    const dayName = day.charAt(0).toUpperCase() + day.slice(1);
    
    // Obtener la fecha real del día de la semana
    const realDate = this.getRealDateForDay(day);
    
    article.innerHTML = `
      <img src="${data.image}" alt="Imagen de portada para ${dayName}">
      <div class="card__game">${data.game}</div>
      <header class="card__head">${dayName} ${realDate}</header>
      <section class="card__time">
        <div class="time-zones">
          ${this.createTimeZones(data.times)}
        </div>
      </section>
    `;
    
    return article;
  }

  /**
   * Obtiene la fecha real para un día específico de la semana actual
   */
  getRealDateForDay(targetDay) {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Domingo, 1 = Lunes, etc.
    
    // Mapeo de días de la semana
    const dayMap = {
      'domingo': 0,
      'lunes': 1,
      'martes': 2,
      'miercoles': 3,
      'jueves': 4,
      'viernes': 5,
      'sabado': 6
    };
    
    const targetDayNumber = dayMap[targetDay];
    const daysUntilTarget = (targetDayNumber - currentDay + 7) % 7;
    
    // Calcular la fecha para todos los días
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysUntilTarget);
    return targetDate.getDate(); // Solo el número del día
  }

  /**
   * Crea las zonas horarias para un día
   */
  createTimeZones(times) {
    // España primero
    const spainData = COUNTRIES.spain;
    const spainTime = times.spain;
    
    // Otros países en orden
    const otherCountries = ['mexico', 'argentina', 'colombia', 'chile'];
    const otherTimeZones = otherCountries.map(country => {
      const countryData = COUNTRIES[country];
      const time = times[country];
      
      return `
        <div class="time-zone" data-country="${country}">
          <span class="flag" aria-label="Bandera de ${countryData.name}">
            ${countryData.flag}
          </span>
          <span class="country">${countryData.name}</span>
          <time class="time" datetime="${time}">${time}</time>
        </div>
      `;
    }).join('');
    
    return `
      <div class="time-zone spain" data-country="spain">
        <span class="flag" aria-label="Bandera de ${spainData.name}">
          ${spainData.flag}
        </span>
        <span class="country">${spainData.name}</span>
        <time class="time" datetime="${spainTime}">${spainTime}</time>
      </div>
      <div class="other-time-zones">
        ${otherTimeZones}
      </div>
    `;
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

    // Añadir controles de teclado para la animación
    this.addKeyboardControls();
    
    // Añadir event listener para el botón de animación
    this.addAnimationButtonListener();
  }

  /**
   * Añade event listener para el botón de animación
   */
  addAnimationButtonListener() {
    const animationBtn = document.getElementById('start-animation-btn');
    if (animationBtn) {
      animationBtn.addEventListener('click', () => {
        this.startManualAnimation();
      });
    }
    
    // Añadir event listener para el botón toggle
    const toggleBtn = document.getElementById('toggle-animation-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.toggleAnimationMode();
      });
    }
  }

  /**
   * Inicia la animación manualmente desde el botón
   */
  startManualAnimation() {
    // Solo permitir si no hay una animación en curso
    if (!this.animationManager.isAnimating) {
      this.restartAnimation();
      this.updateAnimationStatus('Iniciando animación manual...', 'restarting');
    }
  }

  /**
   * Alterna entre modo con animación y sin animación
   */
  toggleAnimationMode() {
    const toggleBtn = document.getElementById('toggle-animation-btn');
    if (!toggleBtn) return;
    
    if (toggleBtn.classList.contains('active')) {
      // Desactivar modo sin animación
      this.enableAnimationMode();
      toggleBtn.classList.remove('active');
      toggleBtn.textContent = '⏸️ Modo Sin Animación';
      this.updateAnimationStatus('Modo con animación activado', 'resumed');
    } else {
      // Activar modo sin animación
      this.disableAnimationMode();
      toggleBtn.classList.add('active');
      toggleBtn.textContent = '▶️ Modo Con Animación';
      this.updateAnimationStatus('Modo sin animación activado', 'paused');
    }
  }

  /**
   * Desactiva el modo de animación
   */
  disableAnimationMode() {
    // Detener cualquier animación en curso
    if (this.animationManager.isAnimating) {
      this.stopAnimation();
    }
    
    // Mostrar todas las cards inmediatamente
    const cards = this.container.querySelectorAll('.card');
    cards.forEach(card => {
      card.style.transform = 'translateX(0)';
      card.style.opacity = '1';
      card.classList.remove('animating-in', 'animating-out');
    });
    
    // Marcar como completado para evitar auto-inicio
    this.animationManager.hasCompletedOnce = true;
    
    console.log('Modo sin animación activado');
  }

  /**
   * Activa el modo de animación
   */
  enableAnimationMode() {
    // Resetear el estado de completado para permitir animaciones
    this.animationManager.resetCompleted();
    
    console.log('Modo con animación activado');
  }

  /**
   * Actualiza el estado del botón de animación
   */
  updateAnimationButtonState() {
    const animationBtn = document.getElementById('start-animation-btn');
    const toggleBtn = document.getElementById('toggle-animation-btn');
    
    if (animationBtn) {
      if (this.animationManager.isAnimating) {
        animationBtn.disabled = true;
        animationBtn.textContent = '⏳ Animando...';
      } else if (this.animationManager.hasCompleted()) {
        animationBtn.disabled = false;
        animationBtn.textContent = '🎬 Repetir Animación';
      } else {
        animationBtn.disabled = false;
        animationBtn.textContent = '🎬 Iniciar Animación';
      }
    }
    
    if (toggleBtn) {
      // El botón toggle siempre está habilitado
      toggleBtn.disabled = false;
    }
  }

  /**
   * Añade controles de teclado para la animación
   */
  addKeyboardControls() {
    document.addEventListener('keydown', (event) => {
      switch(event.key.toLowerCase()) {
        case ' ': // Espacio - Pausar/Reanudar
          event.preventDefault();
          if (this.animationManager.isAnimating) {
            this.pauseAnimation();
          } else {
            this.resumeAnimation();
          }
          break;
        case 's': // S - Detener
          this.stopAnimation();
          break;
        case 'r': // R - Reiniciar
          this.restartAnimation();
          break;
        case 'escape': // Escape - Detener
          this.stopAnimation();
          break;
      }
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
      // Remover la clase anterior si existe
      this.container.querySelectorAll('.current-day-highlight').forEach(card => {
        card.classList.remove('current-day-highlight');
        // Detener cualquier animación de parpadeo previa
        if (card.dataset.blinkInterval) {
          clearInterval(parseInt(card.dataset.blinkInterval));
          delete card.dataset.blinkInterval;
        }
      });
      
      // Añadir la clase al día actual
      currentCard.classList.add('current-day-highlight');
      
      // Verificar que la clase se aplicó correctamente
      console.log(`Día actual resaltado: ${this.currentDay}`);
      console.log('Clases de la tarjeta:', currentCard.className);
      console.log('¿Tiene la clase current-day-highlight?', currentCard.classList.contains('current-day-highlight'));
      
      // Iniciar la animación de parpadeo inmediatamente
      this.startBlinkingAnimation();
    } else {
      console.log(`No se encontró la tarjeta para el día: ${this.currentDay}`);
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
  console.log('=== CONTROLES DE ANIMACIÓN ===');
  console.log('Espacio: Pausar/Reanudar animación');
  console.log('S: Detener animación');
  console.log('R: Reiniciar animación');
  console.log('Escape: Detener animación');
  console.log('==============================');
  
  // Exponer métodos de control globalmente para debugging
  window.pauseAnimation = () => calendar.pauseAnimation();
  window.resumeAnimation = () => calendar.resumeAnimation();
  window.stopAnimation = () => calendar.stopAnimation();
  window.restartAnimation = () => calendar.restartAnimation();
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
