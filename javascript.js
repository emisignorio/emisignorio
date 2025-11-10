// === Importar Firebase y Firestore ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";

// === Configuración de tu proyecto Firebase ===
const firebaseConfig = {
  apiKey: "AIzaSyDI0Y7fuSDlxYG0Tis3iiog_Qg88zhaVXA",
  authDomain: "carrito-de-compras-89e5d.firebaseapp.com",
  projectId: "carrito-de-compras-89e5d",
  storageBucket: "carrito-de-compras-89e5d.firebasestorage.app",
  messagingSenderId: "298993060219",
  appId: "1:298993060219:web:977af26a679345a32795de",
  measurementId: "G-GWXTT3ZXF4"
};

// === Inicializar Firebase ===
const app = initializeApp(firebaseConfig);
let analytics;
isSupported()
  .then((ok) => {
    if (ok) {
      analytics = getAnalytics(app);
      console.log('Analytics OK');
    } else {
      console.log('Analytics no soportado en este contexto');
    }
  })
  .catch((e) => console.warn('Analytics error:', e));
const db = getFirestore(app);

// === Variables globales ===
let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedorProductos = document.getElementById("productosContainer");
const contadorCarrito = document.getElementById("contadorcarrito");

// Normalizar categoría (tolerante a mayúsculas/espacios)
function normalizarCategoria(valor) {
  return (valor ?? "").toString().trim().toLowerCase();
}

// === Obtener productos desde Firestore ===
async function obtenerProductos() {
  try {
    const querySnapshot = await getDocs(collection(db, "productos"));
    productos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Productos cargados:', productos.length, productos);
    mostrarProductos("todos");
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
}

// === Mostrar productos ===
function mostrarProductos(categoria = "todos") {
  contenedorProductos.innerHTML = "";

  const cat = normalizarCategoria(categoria);
  const filtrados = cat === "todos"
    ? productos
    : productos.filter(prod => normalizarCategoria(prod.categoria) === cat);

  filtrados.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
<img src="${producto.imagen}" alt="${producto.nombre}"> <div class="producto-info"> <h3>${producto.nombre}</h3> <p>${producto.detalle}</p> <div class="precio">$${producto.precio}</div> <div class="botones-producto"> <button class="btn-detalle" onclick="verDetalle('${producto.id}')">Ver detalle del producto</button> <button onclick="agregarPorId('${producto.id}')">Agregar al carrito</button> </div> </div> `;
    contenedorProductos.appendChild(div);
  });
}

// === Ver detalle del producto ===
function verDetalle(id) {
  const producto = productos.find(p => p.id === id);
  if (producto) {
    localStorage.setItem("productoSeleccionado", JSON.stringify(producto));
    window.location.href = "detalle.html";
  }
}

// === Filtrar productos ===
function filtrarProductos(categoria) {
  mostrarProductos(categoria);
  // Cerrar menú móvil si está abierto y llevar la vista a productos
  const navMenu = document.getElementById("nav-menu");
  const hamburger = document.querySelector(".hamburger");
  if (navMenu && navMenu.classList.contains("open")) {
    navMenu.classList.remove("open");
    if (hamburger) hamburger.setAttribute("aria-expanded", "false");
  }
  const cont = document.getElementById("productosContainer");
  if (cont && typeof cont.scrollIntoView === 'function') {
    cont.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// === Agregar producto al carrito ===
function agregarAlCarrito(producto) {
  const existente = carrito.find(p => p.id === producto.id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

// === Agregar por id (botón de card) ===
function agregarPorId(id) {
  const p = productos.find(x => x.id === id);
  if (p) agregarAlCarrito(p);
}

// === Actualizar contador del carrito ===
function actualizarContador() {
  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  contadorCarrito.textContent = total;
}

// === Ir al carrito ===
function irAlCarrito() {
  window.location.href = "carrito.html";
}

// === Evento del menú hamburguesa ===
const hamburger = document.querySelector(".hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
    hamburger.setAttribute("aria-expanded", !expanded);
    navMenu.classList.toggle("open");
  });
}

// === Cargar productos al iniciar ===
document.addEventListener("DOMContentLoaded", () => {
  obtenerProductos();
  actualizarContador();
  initFooterIcons();
  const hero = document.querySelector('.carousel img');
  if (hero && hero.getAttribute('src') === 'img/Puesto.png') {
    hero.setAttribute('src', './img/Puesto.png');
  }
});

// Exponer funciones para handlers inline en index.html
window.verDetalle = verDetalle;
window.agregarPorId = agregarPorId;
window.filtrarProductos = filtrarProductos;
window.irAlCarrito = irAlCarrito;

// Renderizar íconos SVG en el footer sin tocar el HTML
function initFooterIcons() {
  const enlaces = document.querySelectorAll('footer .redes a[aria-label]');
  enlaces.forEach(a => {
    const label = (a.getAttribute('aria-label') || '').toLowerCase();
    let svg = '';
    if (label.includes('instagram')) {
      svg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.5-2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/></svg>';
    } else if (label.includes('facebook')) {
      svg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-2.9h2v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.9h2.3L15 14.9h-2v7A10 10 0 0 0 22 12z"/></svg>';
    } else if (label.includes('whatsapp')) {
      svg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.5 3.5A10 10 0 0 0 3.4 17.6L2 22l4.5-1.4A10 10 0 1 0 20.5 3.5zM12 4a8 8 0 0 1 0 16 8 8 0 0 1-7-12.1A8 8 0 0 1 12 4zm-3.5 3.7c-.2 0-.4 0-.6.3-.2.4-.9 1-.9 2.3 0 1.3.9 2.6 1 2.8.1.2 1.8 2.9 4.5 4 2.7 1.1 2.9.7 3.4.7s1.7-.6 1.9-1.2.2-1.1.1-1.2c-.1-.1-.4-.2-1-.5-.5-.3-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.9 1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.5-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.4.1-.6.1-.2.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.3 0-.5-.1-.2-.6-1.5-.8-2-.2-.5-.4-.5-.6-.5z"/></svg>';
    }
    if (svg) a.innerHTML = svg;
  });
}
