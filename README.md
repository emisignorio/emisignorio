# Artesanía Aromática - Tienda Online

Una tienda online elegante y responsiva especializada en velas artesanales y decoraciones aromáticas. Desarrollada con tecnologías web modernas para ofrecer una experiencia de compra fluida en cualquier dispositivo.

## 📋 Descripción del Proyecto

**Artesanía Aromática** es un e-commerce completo que permite a los usuarios navegar por un catálogo de productos artesanales, ver detalles de cada producto, agregar items al carrito de compras y procesar pedidos. El sitio está optimizado para dispositivos móviles, tablets y desktop.

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica y accesible
- **CSS3** - Diseño responsivo con Flexbox y CSS Grid
- **JavaScript (ES6+)** - Funcionalidad interactiva y manejo del DOM
- **LocalStorage** - Persistencia de datos del carrito

### Características Técnicas
- **Diseño Responsivo** - Mobile-first approach con breakpoints para:
  - Móvil pequeño: 320px - 480px
  - Móvil: 481px - 768px  
  - Tablet: 768px - 1024px
  - Desktop: >1024px
- **PWA Ready** - Optimizado para comportarse como app nativa
- **Accesibilidad** - ARIA labels y navegación por teclado
- **Performance** - Imágenes optimizadas y CSS minificado

## 🚀 Funcionalidades

### Página Principal (index.html)
- ✅ Catálogo de productos con filtros por categoría
- ✅ Menú hamburguesa responsivo
- ✅ Contador de items en carrito en tiempo real
- ✅ Cards de productos con vista previa

### Página de Detalle (detalle.html)
- ✅ Vista detallada de cada producto
- ✅ Control de cantidad con validación de stock
- ✅ Botón para agregar al carrito
- ✅ Navegación responsive

### Carrito de Compras (carrito.html)
- ✅ Tabla responsive con items del carrito
- ✅ Modificación de cantidades
- ✅ Eliminación de productos
- ✅ Cálculo automático de totales
- ✅ Proceso de checkout simulado

### Características Destacadas
- 🎨 **Diseño Artesanal** - Paleta de colores cálidos y naturales
- 📱 **100% Responsive** - Perfecto en todos los dispositivos
- 🛒 **Carrito Persistente** - Los datos se mantienen entre sesiones
- ⚡ **Carga Rápida** - Optimizado para performance
- 🎯 **UX/UI Intuitiva** - Navegación fluida y botones touch-friendly

## 📁 Estructura del Proyecto

```
artesania-aromatica/
├── index.html              # Página principal
├── detalle.html            # Página de detalle del producto
├── carrito.html            # Página del carrito de compras
├── estilo.css              # Estilos principales
├── detalle.css             # Estilos específicos de detalle
├── carrito.css             # Estilos específicos del carrito
├── javascript.js           # Lógica principal de la app
├── detalle.js              # Funcionalidad de página de detalle
├── carrito.js              # Funcionalidad del carrito
├── img/                    # Carpeta de imágenes
│   ├── Logo.png            # Logo de la empresa
│   ├── Vela aromática.jpg  # Imagen hero
│   ├── Vela-2.webp         # Producto 1
│   ├── vela-1.jpg          # Producto 2
│   ├── vela-3.jpg          # Producto 3
│   ├── Vela-4.webp         # Producto 4
│   └── Velas De Lavanda.jpg # Producto 5
└── README.md               # Este archivo
```

## 🎯 Cómo Probar el Proyecto

### Opción 1: Servidor Local Simple
```bash
# Navega al directorio del proyecto
cd ruta/del/proyecto

# Inicia un servidor HTTP simple con Python 3
python -m http.server 8000

# O con Python 2
python -m SimpleHTTPServer 8000

# Abre tu navegador en: http://localhost:8000
```

### Opción 2: Live Server (VS Code)
1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

### Opción 3: Navegador Directo
1. Abre tu navegador web
2. Arrastra el archivo `index.html` a la ventana del navegador
3. ¡Listo para navegar!

## 📱 Pruebas en Dispositivos Móviles

### Simulador de Dispositivos (Chrome DevTools)
1. Abre Chrome DevTools (F12)
2. Activa el "Device Toolbar" (Ctrl+Shift+M)
3. Selecciona diferentes dispositivos para probar:
   - iPhone SE (375x667)
   - iPad Air (820x1180)
   - Samsung Galaxy S20 (360x800)

### Pruebas Reales
- Asegúrate de probar en dispositivos reales para validar touch gestures
- Verifica el menú hamburguesa en móviles
- Confirma que los botones sean fáciles de presionar

## 🛍️ Flujo de Usuario Recomendado

1. **Explora el Catálogo** - Navega por las categorías "Velas" y "Decoraciones"
2. **Ve Detalles** - Haz clic en "Ver detalle del producto" en cualquier card
3. **Ajusta Cantidad** - Usa los controles + y - para seleccionar cantidad
4. **Agrega al Carrito** - Haz clic en "Agregar al carrito"
5. **Revisa el Carrito** - Haz clic en el ícono del carrito 🛒
6. **Modifica Pedido** - Cambia cantidades o elimina productos si deseas
7. **Finaliza Compra** - Haz clic en "Pagar" para completar el pedido

## 🎨 Personalización

### Colores del Tema
```css
/* Variables de color principales */
--primary-bg: #fcf7f0;      /* Fondo principal */
--secondary-bg: #f8f2e7;    /* Fondo del header */
--accent-color: #b08e46;    /* Color de acento */
--text-primary: #5a4a3c;    /* Texto principal */
--text-secondary: #7f6b4a;  /* Texto secundario */
```

### Agregando Nuevos Productos
1. Agrega la imagen del producto a la carpeta `img/`
2. Modifica el array `productos` en `javascript.js`
3. Sigue la estructura existente para mantener consistencia

## 🚀 Futuras Mejoras

- [ ] Sistema de autenticación de usuarios
- [ ] Base de datos para productos
- [ ] Pasarela de pago real
- [ ] Sistema de reviews y calificaciones
- [ ] Wishlist de productos favoritos
- [ ] Búsqueda avanzada con filtros
- [ ] Integración con redes sociales

## 📞 Soporte

¿Encontraste un bug o tienes una sugerencia? 
- Abre un issue en el repositorio del proyecto
- Envía tus comentarios y mejoras

---

**Desarrollado con ❤️ para amantes de las velas artesanales**

*Versión: 1.0.0 | Última actualización: 2025*