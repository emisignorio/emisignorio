// Traer producto seleccionado del localStorage
const productoSeleccionado = JSON.parse(localStorage.getItem('productoSeleccionado'));

const detalleContainer = document.getElementById('detalleContainer');

let cantidad = 1;

if (!productoSeleccionado) {
  detalleContainer.innerHTML = '<p>Producto no encontrado. <button onclick="volverInicio()">Volver al inicio</button></p>';
} else {
  mostrarDetalle(productoSeleccionado);
}

function mostrarDetalle(producto) {
  detalleContainer.innerHTML = `
    <div class="detalle-imagen">
      <img src="${producto.imagen}" alt="${producto.nombre}" />
    </div>
    <div class="detalle-info">
      <h1>${producto.nombre}</h1>
      <p class="descripcion">${producto.detalle}</p>
      <p class="precio">$${producto.precio}</p>
      <p class="stock">Stock disponible: ${producto.stock}</p>
      <div class="cantidad-control">
        <button onclick="disminuirCantidad()">-</button>
        <span id="cantidad">${cantidad}</span>
        <button onclick="aumentarCantidad()">+</button>
      </div>
      <button class="btn-agregar-carrito" onclick="agregarAlCarrito()">Agregar al carrito</button>
    </div>
  `;
}

function aumentarCantidad() {
  if (cantidad < productoSeleccionado.stock) {
    cantidad++;
    document.getElementById('cantidad').textContent = cantidad;
  } else {
    alert('No hay suficiente stock');
  }
}

function disminuirCantidad() {
  if (cantidad > 1) {
    cantidad--;
    document.getElementById('cantidad').textContent = cantidad;
  }
}

function agregarAlCarrito() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const itemExistente = carrito.find(item => item.id === productoSeleccionado.id);

  if (itemExistente) {
    if (itemExistente.cantidad + cantidad <= productoSeleccionado.stock) {
      itemExistente.cantidad += cantidad;
    } else {
      alert('No hay suficiente stock');
      return;
    }
  } else {
    carrito.push({...productoSeleccionado, cantidad});
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert('Producto agregado al carrito');
  actualizarContador();
}

function actualizarContador() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  // Actualizar contador en header
  const contador = document.getElementById('contadorcarrito');
  if(contador) contador.textContent = total;
}

function volverInicio() {
  window.location.href = "index.html";
}

function irAlCarrito() {
  window.location.href = "carrito.html";
}

actualizarContador();
