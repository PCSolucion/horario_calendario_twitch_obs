# Calendario Horario Twitch - Código Refactorizado

## 📋 Descripción

Este proyecto ha sido refactorizado siguiendo principios SOLID y buenas prácticas de desarrollo para mejorar la mantenibilidad, legibilidad y escalabilidad del código.

## 🚀 Mejoras Implementadas

### 1. **Principios SOLID Aplicados**

#### **S - Single Responsibility Principle (Principio de Responsabilidad Única)**
- **`TwitchCalendar`**: Maneja solo la lógica del calendario
- **`TimeZoneManager`**: Responsable únicamente de conversiones de zona horaria
- **`CalendarStateManager`**: Gestiona solo el estado de la aplicación

#### **O - Open/Closed Principle (Principio Abierto/Cerrado)**
- Las clases están abiertas para extensión pero cerradas para modificación
- Nuevas funcionalidades se pueden añadir sin cambiar el código existente

#### **L - Liskov Substitution Principle (Principio de Sustitución de Liskov)**
- Las clases derivadas pueden sustituir a las clases base sin afectar la funcionalidad

#### **I - Interface Segregation Principle (Principio de Segregación de Interfaces)**
- Cada clase tiene interfaces específicas y cohesivas
- No hay dependencias innecesarias entre componentes

#### **D - Dependency Inversion Principle (Principio de Inversión de Dependencias)**
- Las clases dependen de abstracciones, no de implementaciones concretas

### 2. **Mejoras en CSS**

#### **Variables CSS (Custom Properties)**
```css
:root {
  --color-primary: #9147FF;
  --color-primary-dark: #7c3aed;
  --spacing-lg: 0.8em;
  --transition-medium: 0.3s ease;
}
```

#### **Estructura Modular**
- **Reset y Base**: Estilos base y reset
- **Layout**: Estructura principal
- **Componentes**: Estilos de tarjetas y elementos
- **Estados**: Hover y interacciones
- **Responsividad**: Media queries para móviles

### 3. **Mejoras en HTML**

#### **Semántica Mejorada**
- Uso de `<main>`, `<article>`, `<header>`, `<section>`
- Atributos `data-*` para funcionalidad JavaScript
- Elementos `<time>` con atributo `datetime`
- Atributos `aria-label` para accesibilidad


### 4. **JavaScript Modular y Mantenible**

#### **Arquitectura de Clases**
```javascript
class TwitchCalendar {
  constructor(containerSelector) { ... }
  init() { ... }
  renderCalendar() { ... }
  // ... más métodos
}
```

#### **Configuración Centralizada**
```javascript
const SCHEDULE_DATA = {
  lunes: {
    image: "...",
    times: { spain: "16:00", mexico: "09:00", ... }
  }
  // ... más días
};
```

#### **Manejo de Eventos**
- Event listeners centralizados
- Delegación de eventos eficiente
- Hover effects y interacciones

## 🛠️ Estructura de Archivos

```
calendario-obs/
├── index.html          # HTML semántico y limpio
├── style.css           # CSS modular con variables
├── script.js           # JavaScript orientado a objetos
└── README.md           # Esta documentación
```

## 📱 Características

### **Funcionalidades Principales**
- ✅ Calendario de 5 días (Lunes a Viernes)
- ✅ Zonas horarias para 5 países
- ✅ Destacado especial para España
- ✅ Responsive design
- ✅ Hover effects y animaciones
- ✅ Resaltado del día actual

### **Características Técnicas**
- ✅ Código modular y mantenible
- ✅ Principios SOLID implementados
- ✅ Variables CSS para fácil personalización
- ✅ JavaScript orientado a objetos
- ✅ Manejo de estado persistente
- ✅ Accesibilidad mejorada

## 🎨 Personalización

### **Cambiar Colores**
```css
:root {
  --color-primary: #tu-color;
  --color-accent: #tu-accento;
}
```

### **Modificar Horarios**
```javascript
const SCHEDULE_DATA = {
  lunes: {
    times: {
      spain: "18:00",    // Cambiar hora de España
      mexico: "11:00"    // Cambiar hora de México
    }
  }
};
```

### **Añadir Nuevos Países**
```javascript
const COUNTRIES = {
  // ... países existentes
  peru: { name: "Perú", flag: "PE", isSpecial: false }
};
```

## 🔧 Uso

### **Inicialización Automática**
El calendario se inicializa automáticamente cuando se carga la página.

### **API Pública**
```javascript
// Acceder a instancias globales
window.twitchCalendar.updateDaySchedule('lunes', { spain: '17:00' });
window.stateManager.setTheme('dark');
window.timeZoneManager.convertTime('16:00', 'spain', ['mexico', 'argentina']);
```

## 📱 Responsividad

- **Desktop**: Layout horizontal con skew effect
- **Móvil**: Layout vertical sin transformaciones
- **Breakpoint**: 768px

## 🚀 Futuras Mejoras

1. **Temas**: Sistema de temas claro/oscuro
2. **Internacionalización**: Soporte para múltiples idiomas
3. **Persistencia**: Guardar preferencias en localStorage
4. **API**: Integración con APIs de Twitch
5. **Notificaciones**: Recordatorios de transmisiones

## 🤝 Contribución

Para contribuir al proyecto:

1. Mantén los principios SOLID
2. Usa las variables CSS existentes
3. Documenta nuevas funcionalidades
4. Prueba en diferentes dispositivos

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y comerciales.

---

**Desarrollado con ❤️ aplicando principios SOLID y buenas prácticas de desarrollo web.**
