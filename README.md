# 👗 AURA Boutique - Tienda de Ropa Online

Una página web moderna, elegante y completamente funcional para una tienda de ropa y moda contemporánea. Desarrollada con **HTML5**, **Tailwind CSS** y **JavaScript Vanilla**.

---

## ✨ Características Incluidas

1. **Catálogo Dinámico de Productos**:
   * Prendas para mujer, hombre, calzado y accesorios.
   * Imágenes de alta calidad con badges de *"Más Vendido"*, *"Nuevo"* y descuentos porcentuales calculados en tiempo real.
2. **Filtros y Búsqueda en Vivo**:
   * Filtros instantáneos por categoría (Todos, Mujer, Hombre, Calzado, Accesorios).
   * Barra de búsqueda reactiva por nombre, descripción o categoría.
   * Selector de ordenamiento (precio menor a mayor, mayor a menor, mejor calificados).
3. **Bolsa de Compras (Carrito Lateral / Drawer)**:
   * Añadir productos directamente o con selector de tallas y colores.
   * Modificar cantidades (+ / -) o eliminar artículos.
   * Cálculo dinámico de subtotal, envío gratis condicional y total.
   * Persistencia en el navegador mediante `localStorage` (no se pierden los datos al recargar).
4. **Modal de Vista Rápida (Quick View)**:
   * Ventana emergente con selector interactivo de tallas (`XS`, `S`, `M`, `L`, etc.) y colores.
   * Selector de cantidad antes de añadir al carrito.
5. **Simulación de Checkout**:
   * Formulario de entrega, método de pago y confirmación de orden.
6. **Diseño Responsive & UI Moderna**:
   * Tipografías refinadas (*Playfair Display* e *Inter*).
   * Notificaciones flotantes tipo Toast para retroalimentación visual al usuario.

---

## 🚀 ¿Cómo Abrir la Página?

### Opción 1: Abrir directamente en el navegador (Sin instalar nada)
Haz doble clic sobre el archivo `index.html` en tu explorador de archivos, o ábrelo directamente con Chrome, Edge o tu navegador favorito:
```text
C:\Users\Luis Carlos Tez\.gemini\antigravity\scratch\tienda-ropa\index.html
```

### Opción 2: Servidor local ligero con Python
Si prefieres servirla localmente mediante HTTP:

```powershell
cd "C:\Users\Luis Carlos Tez\.gemini\antigravity\scratch\tienda-ropa"
python -m http.server 3000
```
Luego abre tu navegador en: [http://localhost:3000](http://localhost:3000)

---

## 📂 Estructura de Archivos

```text
tienda-ropa/
├── index.html        # Estructura principal y componentes de la tienda
├── css/
│   └── styles.css    # Animaciones, scrollbars estéticas y estilos Toast
├── js/
│   ├── products.js   # Catálogo y datos de las prendas de ropa
│   └── app.js        # Lógica del carrito, filtros, modales y checkout
└── README.md         # Documentación de uso
```

---

## 💡 Cómo Personalizar Productos
Para agregar, cambiar o eliminar prendas, solo abre [js/products.js](file:///C:/Users/Luis%20Carlos%20Tez/.gemini/antigravity/scratch/tienda-ropa/js/products.js) y edita los objetos del arreglo `PRODUCTS`.
