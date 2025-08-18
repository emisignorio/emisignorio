const tablaBody = document.getElementById('tablaBody');
const totalSpan = document.getElementById('total');

function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  tablaBody.innerHTML = '';

  if (carrito.length === 0) {
    tablaBody.innerHTML = '<tr><td colspan="5">Tu carrito está vacío</td></tr>';
    totalSpan.textContent = '0';
    return;
  }

  let total = 0;

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td data-label="Producto">${item.nombre}</td>
      <td data-label="Cantidad">${item.cantidad}</td>
      <td data-label="Precio Unitario">$${item.precio}</td>
      <td data-label="Subtotal">$${subtotal}</td>
      <td data-label="Acción"><button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button></td>
    `;

    tablaBody.appendChild(fila);
  });

  totalSpan.textContent = total.toFixed(2);
}

function eliminarProducto(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  cargarCarrito();
  actualizarContador();
}

function vaciarCarrito() {
  if (confirm('¿Querés vaciar todo el carrito?')) {
    localStorage.removeItem('carrito');
    cargarCarrito();
    actualizarContador();
  }
}

function actualizarContador() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contador = document.querySelector('.carrito span');
  if (contador) contador.textContent = total;
}

function volverInicio() {
  window.location.href = 'index.html';
}

function irAlCarrito() {
  window.location.href = 'carrito.html';
}

cargarCarrito();
actualizarContador();

const botonPagar = document.getElementById('btnPagar');
const mensajePago = document.getElementById('mensajePago');

botonPagar.addEventListener('click', () => {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  mensajePago.textContent = '¡Gracias por su compra! Su pedido está siendo procesado.';

  localStorage.removeItem('carrito');
  actualizarContador();

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 4000);
});
