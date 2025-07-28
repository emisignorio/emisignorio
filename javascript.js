// =======================
// Datos de productos
// =======================
const productos = [
  {
    id: 1,
    nombre: "Vela Lavanda",
    categoria: "velas",
    precio: 1200,
    imagen: "img/vela-lavanda.jpg",
    detalle: "Relajante aroma a lavanda en frasco de vidrio.",
    stock: 10
  },
  {
    id: 2,
    nombre: "Pack x3 Velas",
    categoria: "velas",
    precio: 3200,
    imagen: "img/pack-velas.jpg",
    detalle: "Set con esencias de vainilla, jazmín y canela.",
    stock: 6
  },
  {
    id: 3,
    nombre: "Centro de Mesa Floral",
    categoria: "decoraciones",
    precio: 4500,
    imagen: "img/centro-mesa.jpg",
    detalle: "Decoración rústica con flores secas.",
    stock: 5
  },
  {
    id: 4,
    nombre: "Adorno de Madera",
    categoria: "decoraciones",
    precio: 2800,
    imagen: "img/adorno-madera.jpg",
    detalle: "Figura tallada a mano, estilo vintage.",
    stock: 3
  },
  {
    id: 5,
    nombre: "Vela Aromática Vainilla",
    categoria: "velas",
    precio: 1400,
    imagen: "img/vela-vainilla.jpg",
    detalle: "Aroma cálido y suave, ideal para ambientes relajantes.",
    stock: 8
  },
  {
    id: 6,
    nombre: "Guirnalda Rústica",
    categoria: "decoraciones",
    precio: 3900,
    imagen: "img/guirnalda.jpg",
    detalle: "Guirnalda de yute y madera para colgar.",
    stock: 4
  }
];

// =======================
// Mostrar productos
// =======================
function mostrarProductos(lista) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  for (const producto of lista) {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button onclick="verDetalle(${producto.id})">Ver Detalle</button>
    `;

    contenedor.appendChild(div);
  }
}

// =======================
// Filtros por categoría
// =======================
function filtrarProductos(categoria) {
  if (categoria === "todos") {
    mostrarProductos(productos);
  } else {
    const filtrados = productos.filter(p => p.categoria === categoria);
    mostrarProductos(filtrados);
  }
}

// =======================
// Ver detalle del producto
// =======================
function verDetalle(id) {
  const producto = productos.find(p => p.id === id);
  if (producto) {
    localStorage.setItem("productoSeleccionado", JSON.stringify(producto));
    window.location.href = "detalle.html";
  }
}

// =======================
// Ir al carrito
// =======================
function irAlCarrito() {
  window.location.href = "carrito.html";
}

// =======================
// Contador del carrito
// =======================
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  document.getElementById("contadorcarrito").innerText = total;
}

// =======================
// Inicialización
// =======================
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos(productos);
  actualizarContadorCarrito();
});
