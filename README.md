# ⚡ Paradigmas Asíncronos en JavaScript (Benchmarking & Analysis)

[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Modern-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org)
[![CSS3](https://img.shields.io/badge/CSS3-BEM-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

> **Laboratorio de Concurrencia y Asincronía:** Estudio técnico, comparativa empírica y patrones de ejecución frente al consumo de APIs REST mediante tres arquitecturas asíncronas en JavaScript.  
> *Desarrollado como actividad de ingeniería práctica dentro del ciclo DAM (Instituto Nebrija).*

---

## 🔬 Objetivos del Laboratorio

El propósito de este proyecto es implementar, analizar y comparar los tres paradigmas fundamentales de gestión asíncrona en el ecosistema JavaScript frente a la API REST de pruebas [JSONPlaceholder](https://jsonplaceholder.typicode.com):

1. **Callback Clásico (`XMLHttpRequest`):**
   - Manejo del ciclo de vida de peticiones HTTP en bajo nivel (`readyState`, `status`).
   - Gestión de inversión de control y control manual de buffers y deserialización JSON.
   - Demostración de riesgos de anidamiento (*Callback Hell* / *Pyramid of Doom*).

2. **Promesas Nativas (`Fetch API` + `.then() / .catch()`):**
   - Programación reactiva/funcional basada en cadenas de promesas encadenables.
   - Flujo de resolución/rechazo mediante microtasks queue del Event Loop.
   - Propagación centralizada de excepciones y estados de red.

3. **Funciones Asíncronas Modernas (`Async / Await` + `try / catch`):**
   - Azúcar sintáctico sobre promesas nativas que simplifica el flujo secuencial no bloqueante.
   - Manejo canónico de excepciones sincrónicas y asincrónicas mediante bloques estándar `try...catch`.
   - Mayor legibilidad, mantenibilidad y depuración con stack traces transparentes.

---

## 📊 Comparativa de Arquitectura

| Paradigma | API Utilizada | Manejo de Errores | Cola en Event Loop | Complejidad Ciclomática |
| :--- | :--- | :--- | :--- | :--- |
| **Callbacks** | `XMLHttpRequest` | `onload` / `onerror` | Task Queue (Macrotasks) | Media-Alta (Anidamiento) |
| **Promises** | `fetch()` | `.catch()` encadenado | Microtask Queue | Media (Pipeline funcional) |
| **Async / Await** | `fetch()` + `await` | `try { ... } catch (e)` | Microtask Queue | Baja (Flujo imperativo) |

---

## 🛠️ Tecnologías

- **JavaScript (Vanilla ES6+)**: Implementación limpia sin dependencias ni transpilers.
- **CSS3 Moderno**: Diseño *dark mode* responsive, transiciones fluidas y feedback visual de latencia.
- **REST API**: Puntos finales de prueba en JSONPlaceholder (`/posts`).

---

## 🚀 Despliegue y Ejecución Local

No requiere bundler ni instalación de dependencias `npm`:

```bash
# 1. Clonar el repositorio
git clone https://github.com/Thepimen/javascript-async-paradigms.git
cd javascript-async-paradigms

# 2. Servir con cualquier servidor estático local (o Live Server de VSCode)
python -m http.server 8080
# o bien: npx serve .
```

Abre tu navegador en `http://localhost:8080` para interactuar con la consola interactiva.
