let producto = JSON.parse(localStorage.getItem("productoSeleccionado"));
let cantidad = 1;

function mostrarDetalle() {
  if (!producto) return;

  document.getElementById("imgProducto").src = producto.imagen;
  document.getElementById("nombreProducto").innerText = producto.nombre;
  document.getElementById("detalleProducto").innerText = producto.detalle;
  document.getElementById("precioProducto").innerText = producto.precio;
  document.getElementById("stockProducto").innerText = producto.stock;
  document.getElementById("cantidad").innerText = cantidad;
}

function modificarCantidad(valor) {
  const nuevaCantidad = cantidad + valor;
  if (nuevaCantidad >= 1 && nuevaCantidad <= producto.stock) {
    cantidad = nuevaCantidad;
    document.getElementById("cantidad").innerText = cantidad;
  }
}

function agregarAlCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const existente = carrito.find(p => p.id === producto.id);

  if (existente) {
    if (existente.cantidad + cantidad <= producto.stock) {
      existente.cantidad += cantidad;
    } else {
      alert("No hay suficiente stock disponible");
      return;
    }
  } else {
    carrito.push({ ...producto, cantidad });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  window.location.href = "carrito.html";
}

mostrarDetalle();

function irAlInicio() {
  window.location.href = "index.html";
}

function irAlCarrito() {
  window.location.href = "carrito.html";
}

function filtrarDesdeDetalle(categoria) {
  localStorage.setItem("categoriaActiva", categoria);
  window.location.href = "index.html";
}

function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contador = document.getElementById("contadorcarrito");
  if (contador) contador.innerText = total;
}

document.addEventListener("DOMContentLoaded", actualizarContador);
