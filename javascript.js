const productos = [
  { id:1, nombre:"Vela Vainilla", categoria:"velas", precio:8000, imagen:"img/vela de vainilla.jpeg", detalle:"Relajante aroma a Vainilla.", stock:10 },
  { id:2, nombre:"Vela Lavanda", categoria:"velas", precio:5000, imagen:"img/vela de lavanda.jpeg", detalle:"Velas con esencias de Lavanda.", stock:5 },
  { id:3, nombre:"Posavasos", categoria:"decoraciones", precio:3500, imagen:"img/posavasos.jpeg", detalle:"Posavasos tejidos a crochet.", stock:10 },
  { id:4, nombre:"Funda de almohadón", categoria:"decoraciones", precio:7800, imagen:"img/funda de almohada.jpeg", detalle:"Funda de almohadón de 70 cm x 50 cm.", stock:5 },
  { id:5, nombre:"Vela Aromática", categoria:"velas", precio:7200, imagen:"img/Vela aromática.jpg", detalle:"Vela Aromática de Coco y Vainilla.", stock:10 },
  { id:6, nombre:"Vela de Jazmín y Canela", categoria:"velas", precio:6700, imagen:"img/velas con tapa.jpeg", detalle:"Velas con esencias de jazmín y canela.", stock:10 },
  { id:7, nombre:"Guirnalda de espiral", categoria:"decoraciones", precio:7000, imagen:"img/decoracion espiral.jpeg", detalle:"Guirnaldas de colores en forma de espiral.", stock:8 },
  { id:8, nombre:"Atrapasueños", categoria:"decoraciones", precio:10800, imagen:"img/atrapasueños.jpeg", detalle:"Atrapa sueños Decorativo Artesanal Tejido en Crochet de lana color natural/rosado.", stock:12 }
];

const contenedorProductos = document.getElementById('productosContainer');
const contadorCarrito = document.getElementById('contadorcarrito');
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarProductos(categoria = 'todos') {
  contenedorProductos.innerHTML = '';
  let productosFiltrados = categoria === 'todos' ? productos : productos.filter(p => p.categoria === categoria);
  for (const p of productosFiltrados) {
    const card = document.createElement('div');
    card.className = 'producto';
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" />
      <div class="producto-info">
        <h3>${p.nombre}</h3>
        <p>${p.detalle}</p>
        <div class="precio">$${p.precio}</div>
        <div class="botones-producto">
          <button onclick="verDetalle(${p.id})" class="btn-detalle">Ver detalle del producto</button>
          <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
        </div>
      </div>
    `;
    contenedorProductos.appendChild(card);
  }
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;
  const itemCarrito = carrito.find(i => i.id === id);
  if (itemCarrito) {
    if (itemCarrito.cantidad < producto.stock) {
      itemCarrito.cantidad++;
    } else {
      alert('No hay suficiente stock');
      return;
    }
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();
}

function actualizarContador() {
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  contadorCarrito.textContent = total;
}

function filtrarProductos(categoria) {
  mostrarProductos(categoria);
}

function irAlCarrito() {
  window.location.href = "carrito.html";
}

function verDetalle(id) {
  const producto = productos.find(p => p.id === id);
  if (producto) {
    localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
    window.location.href = "detalle.html";
  }
}

mostrarProductos();
actualizarContador();

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
  hamburger.setAttribute('aria-expanded', !expanded);
  navMenu.classList.toggle('open');
  menuOverlay.classList.toggle('show');

  if (!expanded) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeMenu() {
  hamburger.setAttribute('aria-expanded', 'false');
  navMenu.classList.remove('open');
  menuOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', toggleMenu);

menuOverlay.addEventListener('click', closeMenu);

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    closeMenu();
  }
});
