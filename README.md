# 👗 AURA Boutique - Tienda de Ropa Online (Modo Oscuro de Lujo)

Una página web moderna, sofisticada y completamente funcional para una tienda de ropa y moda contemporánea. Diseñada con una paleta **Dark Luxury** (fondo negro carbón/noche `#090a0f`, textos marfil/blancos y acentos dorados/ámbar). Desarrollada con **HTML5**, **Tailwind CSS** y **JavaScript Vanilla**.

---

## ✨ Características y Estilo Visual

1. **Paleta de Diseño Modo Oscuro de Lujo**:
   * Fondo principal negro carbón nocturno (`#090a0f` y `#0d0f17`).
   * Tipografías y textos refinados en blanco puro y marfil (`#f8fafc` / `#e2e8f0`).
   * Acentos en tonos dorado y ámbar suave (`#fbbf24` / `#f59e0b`) para destacar precios, badges y botones interactivos.
   * Tarjetas con efectos de elevación, bordes discretos e iluminación sutil al pasar el cursor.

2. **Catálogo Dinámico de Productos**:
   * Prendas para mujer, hombre, calzado y accesorios.
   * Imágenes de alta calidad con badges de *"Más Vendido"*, *"Nuevo"* y descuentos porcentuales calculados en tiempo real.

3. **Filtros y Búsqueda en Vivo**:
   * Filtros instantáneos por categoría (Todos, Mujer, Hombre, Calzado, Accesorios) con indicador dorado activo.
   * Barra de búsqueda reactiva por nombre, descripción o categoría.
   * Selector de ordenamiento (precio menor a mayor, mayor a menor, mejor calificados).

4. **Bolsa de Compras (Carrito Lateral / Drawer)**:
   * Añadir productos directamente o con selector de tallas y colores.
   * Modificar cantidades (+ / -) o eliminar artículos.
   * Cálculo dinámico de subtotal, envío gratis condicional y total.
   * Persistencia en el navegador mediante `localStorage`.

5. **Modal de Vista Rápida (Quick View)**:
   * Ventana emergente con selector interactivo de tallas (`XS`, `S`, `M`, `L`, etc.) y colores.
   * Selector de cantidad antes de añadir al carrito.

6. **Simulación de Checkout y Notificaciones**:
   * Formulario de entrega, método de pago y confirmación de orden.
   * Notificaciones flotantes tipo Toast con diseño oscuro y dorado.

---

## 🚀 ¿Cómo Abrir la Página?

### Opción 1: Abrir directamente en el navegador (Sin instalar nada)
Haz doble clic sobre el archivo `index.html` en tu explorador de archivos, o ábrelo directamente con Chrome, Edge o tu navegador favorito:
```text
C:\Users\Luis Carlos Tez\.gemini\antigravity\scratch\web tienda\index.html
```

### Opción 2: Abrir desde la terminal con PowerShell
```powershell
Start-Process "C:\Users\Luis Carlos Tez\.gemini\antigravity\scratch\web tienda\index.html"
```

---

## 📂 Estructura de Archivos

```text
web tienda/
├── index.html        # Estructura principal y componentes con diseño oscuro
├── css/
│   └── styles.css    # Animaciones, scrollbar oscura y estilos del Toast
├── js/
│   ├── products.js   # Catálogo y datos de las prendas de ropa
│   └── app.js        # Lógica del carrito, filtros, modales y renderizado reactivo
└── README.md         # Documentación del proyecto
```

---

## 💡 Cómo Personalizar Productos
Para agregar, cambiar o eliminar prendas, abre [js/products.js](file:///C:/Users/Luis%20Carlos%20Tez/.gemini/antigravity/scratch/web%20tienda/js/products.js) y edita los objetos del arreglo `PRODUCTS`.
