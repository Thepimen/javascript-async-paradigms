/**
 * Actividad 2: Paradigmas Asíncronos en JavaScript
 * Desarrollo de Interfaces - Grado / Ciclo Universitario Nebrija
 * 
 * Este script implementa de forma rigurosa y diferenciada tres mecanismos para
 * realizar peticiones asíncronas HTTP consumiendo la API REST de JSONPlaceholder:
 * 1. Callback clásico (XMLHttpRequest)
 * 2. Promesas nativas mediante la API Fetch (.then / .catch)
 * 3. Funciones asíncronas modernas (async / await con try / catch)
 */

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// =============================================================================
// CASO 1: Callback clásico mediante XMLHttpRequest
// Firma exigida: (url, callback)
// Patrón Error-First Callback: callback(error, data)
// =============================================================================
function peticionCallbackClasico(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Éxito: entregamos null como error y el cuerpo de respuesta
            const responseData = xhr.response !== null ? xhr.response : JSON.parse(xhr.responseText);
            callback(null, responseData);
        } else {
            // Error HTTP (4xx / 5xx)
            const httpError = new Error(`Error HTTP ${xhr.status}: ${xhr.statusText}`);
            callback(httpError, null);
        }
    };

    xhr.onerror = function () {
        // Error a nivel de red
        const networkError = new Error("Fallo de red en XMLHttpRequest");
        callback(networkError, null);
    };

    xhr.send();
}

function ejecutarCaso1() {
    const endpoint = `${API_BASE_URL}/posts/1`;
    console.log("%c\n=======================================================", "color: #f39c12; font-weight: bold;");
    console.log("%c--- CASO 1: Callback Clásico (XMLHttpRequest) ---", "color: #f39c12; font-weight: bold; font-size: 13px;");
    console.log("%cEndpoint: " + endpoint, "color: #bdc3c7; font-style: italic;");
    
    peticionCallbackClasico(endpoint, (error, data) => {
        if (error) {
            console.error("%c[CASO 1 ERROR]:", "color: #e74c3c; font-weight: bold;", error);
            mostrarEnVisor("error", "CASO 1: Error en XMLHttpRequest", error.message);
            return;
        }
        console.log("%c[CASO 1 DATOS RECIBIDOS]:", "color: #f39c12; font-weight: bold;", data);
        console.log("%c=======================================================", "color: #f39c12; font-weight: bold;");
        mostrarEnVisor("caso1", "CASO 1: XMLHttpRequest (Callback Clásico)", data);
    });
}


// =============================================================================
// CASO 2: Petición mediante fetch() consumiendo promesas (.then / .catch)
// =============================================================================
function peticionFetchPromesas(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Respuesta insatisfactoria HTTP: ${response.status} ${response.statusText}`);
            }
            return response.json();
        });
}

function ejecutarCaso2() {
    const endpoint = `${API_BASE_URL}/posts/2`;
    console.log("%c\n=======================================================", "color: #3498db; font-weight: bold;");
    console.log("%c--- CASO 2: Fetch con Promesas (.then / .catch) ---", "color: #3498db; font-weight: bold; font-size: 13px;");
    console.log("%cEndpoint: " + endpoint, "color: #bdc3c7; font-style: italic;");

    peticionFetchPromesas(endpoint)
        .then(data => {
            console.log("%c[CASO 2 DATOS RECIBIDOS]:", "color: #3498db; font-weight: bold;", data);
            console.log("%c=======================================================", "color: #3498db; font-weight: bold;");
            mostrarEnVisor("caso2", "CASO 2: Fetch con Promesas (.then / .catch)", data);
        })
        .catch(error => {
            console.error("%c[CASO 2 ERROR]:", "color: #e74c3c; font-weight: bold;", error);
            mostrarEnVisor("error", "CASO 2: Error en Fetch (.catch)", error.message);
        });
}


// =============================================================================
// CASO 3: Petición asíncrona moderna con async / await y try / catch
// =============================================================================
async function peticionAsyncAwait(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Respuesta insatisfactoria HTTP: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

async function ejecutarCaso3() {
    const endpoint = `${API_BASE_URL}/posts/3`;
    console.log("%c\n=======================================================", "color: #2ecc71; font-weight: bold;");
    console.log("%c--- CASO 3: Async / Await con Try / Catch ---", "color: #2ecc71; font-weight: bold; font-size: 13px;");
    console.log("%cEndpoint: " + endpoint, "color: #bdc3c7; font-style: italic;");

    try {
        const data = await peticionAsyncAwait(endpoint);
        console.log("%c[CASO 3 DATOS RECIBIDOS]:", "color: #2ecc71; font-weight: bold;", data);
        console.log("%c=======================================================", "color: #2ecc71; font-weight: bold;");
        mostrarEnVisor("caso3", "CASO 3: Async / Await Moderno", data);
    } catch (error) {
        console.error("%c[CASO 3 ERROR]:", "color: #e74c3c; font-weight: bold;", error);
        mostrarEnVisor("error", "CASO 3: Error en Async/Await", error.message);
    }
}


// =============================================================================
// INVOCACIÓN CONTROLADA Y ORDENADA DE LOS 3 CASOS
// =============================================================================
async function ejecutarTodosLosCasos() {
    console.clear();
    console.log(
        "%c▶ INICIANDO EJECUCIÓN SECUENCIAL CONTROLADA DE LOS 3 CASOS ◀",
        "background: #1e293b; color: #38bdf8; font-weight: bold; font-size: 14px; padding: 6px 12px; border-radius: 4px;"
    );

    // Caso 1: Envolvemos en promesa temporal para garantizar la salida secuencial limpia
    await new Promise(resolve => {
        const endpoint = `${API_BASE_URL}/posts/1`;
        console.log("%c\n=======================================================", "color: #f39c12; font-weight: bold;");
        console.log("%c--- CASO 1: Callback Clásico (XMLHttpRequest) ---", "color: #f39c12; font-weight: bold; font-size: 13px;");
        console.log("%cEndpoint: " + endpoint, "color: #bdc3c7; font-style: italic;");

        peticionCallbackClasico(endpoint, (error, data) => {
            if (error) {
                console.error("%c[CASO 1 ERROR]:", "color: #e74c3c; font-weight: bold;", error);
            } else {
                console.log("%c[CASO 1 DATOS RECIBIDOS]:", "color: #f39c12; font-weight: bold;", data);
                console.log("%c=======================================================", "color: #f39c12; font-weight: bold;");
            }
            resolve();
        });
    });

    // Caso 2
    await new Promise(resolve => {
        const endpoint = `${API_BASE_URL}/posts/2`;
        console.log("%c\n=======================================================", "color: #3498db; font-weight: bold;");
        console.log("%c--- CASO 2: Fetch con Promesas (.then / .catch) ---", "color: #3498db; font-weight: bold; font-size: 13px;");
        console.log("%cEndpoint: " + endpoint, "color: #bdc3c7; font-style: italic;");

        peticionFetchPromesas(endpoint)
            .then(data => {
                console.log("%c[CASO 2 DATOS RECIBIDOS]:", "color: #3498db; font-weight: bold;", data);
                console.log("%c=======================================================", "color: #3498db; font-weight: bold;");
            })
            .catch(error => {
                console.error("%c[CASO 2 ERROR]:", "color: #e74c3c; font-weight: bold;", error);
            })
            .finally(() => resolve());
    });

    // Caso 3
    await (async () => {
        const endpoint = `${API_BASE_URL}/posts/3`;
        console.log("%c\n=======================================================", "color: #2ecc71; font-weight: bold;");
        console.log("%c--- CASO 3: Async / Await con Try / Catch ---", "color: #2ecc71; font-weight: bold; font-size: 13px;");
        console.log("%cEndpoint: " + endpoint, "color: #bdc3c7; font-style: italic;");

        try {
            const data = await peticionAsyncAwait(endpoint);
            console.log("%c[CASO 3 DATOS RECIBIDOS]:", "color: #2ecc71; font-weight: bold;", data);
            console.log("%c=======================================================", "color: #2ecc71; font-weight: bold;");
        } catch (error) {
            console.error("%c[CASO 3 ERROR]:", "color: #e74c3c; font-weight: bold;", error);
        }
    })();

    console.log(
        "%c✔ LOS 3 CASOS HAN SIDO EJECUTADOS CORRECTAMENTE EN CONSOLA",
        "background: #064e3b; color: #34d399; font-weight: bold; font-size: 12px; padding: 4px 8px; border-radius: 4px;"
    );
}

// =============================================================================
// HELPER PARA REFLEJAR RESULTADOS EN LA INTERFAZ
// =============================================================================
function mostrarEnVisor(tipo, titulo, contenido) {
    const outputTitle = document.getElementById("output-title");
    const outputContent = document.getElementById("output-content");
    const outputStatus = document.getElementById("output-status");

    if (!outputTitle || !outputContent || !outputStatus) return;

    outputTitle.textContent = titulo;
    outputStatus.className = `status-pill status-${tipo}`;
    outputStatus.textContent = tipo === "error" ? "ERROR" : "RESPUESTA HTTP 200 OK";

    if (typeof contenido === "object") {
        outputContent.textContent = JSON.stringify(contenido, null, 2);
    } else {
        outputContent.textContent = contenido;
    }
}

// Exponer funciones al entorno global (window) para los botones interactivos
window.peticionCallbackClasico = peticionCallbackClasico;
window.peticionFetchPromesas = peticionFetchPromesas;
window.peticionAsyncAwait = peticionAsyncAwait;
window.ejecutarCaso1 = ejecutarCaso1;
window.ejecutarCaso2 = ejecutarCaso2;
window.ejecutarCaso3 = ejecutarCaso3;
window.ejecutarTodosLosCasos = ejecutarTodosLosCasos;

// Invocación inicial automática requerida para que se impriman en DevTools al cargar
document.addEventListener("DOMContentLoaded", () => {
    ejecutarTodosLosCasos();
});
