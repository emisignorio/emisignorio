const productos = [
  { id:1, nombre:"Vela Lavanda", categoria:"velas", precio:4200, imagen:"img/Vela aromática.jpg", detalle:"Relajante aroma a lavanda", stock:10 },
  { id:2, nombre:"Pack x3 Velas", categoria:"velas", precio:3200, imagen:"img/Vela-2.webp", detalle:"Set con esencias de vainilla, jazmín y canela", stock:5 },
  { id:3, nombre:"Centro de Mesa Floral", categoria:"decoraciones", precio:4500, imagen:"img/vela-3.jpg", detalle:"Decoración con flores secas", stock:10 },
  { id:4, nombre:"Adorno de Madera", categoria:"decoraciones", precio:2800, imagen:"img/Vela-4.webp", detalle:"Figura tallada artesanalmente", stock:5 },
  { id:5, nombre:"Vela Aromática Premium", categoria:"velas", precio:5200, imagen:"img/Vela aromática.jpg", detalle:"Relajante aroma a lavanda", stock:10 },
  { id:6, nombre:"Vela de Cera Natural", categoria:"velas", precio:3600, imagen:"img/vela-1.jpg", detalle:"Set con esencias de vainilla, jazmín y canela", stock:10 },
  { id:7, nombre:"Centro de Mesa Artesanal", categoria:"decoraciones", precio:5700, imagen:"img/Velas De Lavanda.jpg", detalle:"Decoración con flores secas", stock:8 },
  { id:8, nombre:"Adorno Artesanal", categoria:"decoraciones", precio:4800, imagen:"img/vela-1.jpg", detalle:"Figura tallada artesanalmente", stock:12 }
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
