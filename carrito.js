let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function cargarCarrito() {
  const cont = document.getElementById("filasCarrito");
  let total = 0;
  cont.innerHTML = "";

  carrito.forEach((prod, index) => {
    let subtotal = prod.precio * prod.cantidad;
    total += subtotal;

    let fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${prod.nombre}</td>
      <td>${prod.cantidad}</td>
      <td>$${prod.precio}</td>
      <td>$${subtotal}</td>
      <td><button onclick="eliminar(${index})">❌</button></td>
    `;
    cont.appendChild(fila);
  });

  document.getElementById("totalFinal").innerText = total;
}

function eliminar(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

function finalizarCompra() {
  alert("¡Gracias por tu compra!");
  localStorage.removeItem("carrito");
  window.location.href = "index.html";
}

cargarCarrito();

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
