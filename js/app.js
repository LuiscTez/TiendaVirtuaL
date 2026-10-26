// Lógica principal de la aplicación de la tienda de ropa

let cart = JSON.parse(localStorage.getItem('aura_cart')) || [];
let currentCategory = 'all';
let searchQuery = '';
let currentSort = 'featured';
let selectedQuickViewProduct = null;
let selectedSize = '';
let selectedColor = '';

// Elementos del DOM
const productsGrid = document.getElementById('productsGrid');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartBadge = document.getElementById('cartBadge');
const cartSubtotalEl = document.getElementById('cartSubtotal');
const cartTotalEl = document.getElementById('cartTotal');
const cartShippingEl = document.getElementById('cartShipping');
const quickViewModal = document.getElementById('quickViewModal');
const checkoutModal = document.getElementById('checkoutModal');
const toastEl = document.getElementById('toast');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  setupFilterButtons();
  setupSearchAndSort();
});

// Renderizar tarjetas de productos
function renderProducts() {
  let filtered = [...PRODUCTS];

  // Filtro por categoría
  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  // Filtro por búsqueda
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  // Ordenamiento
  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Si no hay resultados
  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-500">
        <i class="fa-solid fa-shirt text-4xl mb-3 text-slate-300"></i>
        <h3 class="text-base font-semibold text-slate-700">No encontramos productos</h3>
        <p class="text-xs text-slate-400 mt-1">Prueba con otra palabra clave o limpia los filtros.</p>
        <button onclick="resetFilters()" class="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition">
          Ver todos los productos
        </button>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map(product => {
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const discountPercent = hasDiscount 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
      : null;

    return `
      <div class="product-card bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group">
        <!-- Contenedor Imagen -->
        <div class="relative bg-slate-50 aspect-[4/5] overflow-hidden">
          <img 
            src="${product.image}" 
            alt="${escapeHtml(product.name)}" 
            class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          >
          
          <!-- Badges -->
          <div class="absolute top-3 left-3 flex flex-col gap-1.5">
            ${product.badge ? `
              <span class="px-2.5 py-1 text-[11px] font-bold bg-slate-900/90 text-white rounded-full backdrop-blur-sm shadow-sm">
                ${product.badge}
              </span>
            ` : ''}
            ${hasDiscount ? `
              <span class="px-2.5 py-1 text-[11px] font-bold bg-rose-600 text-white rounded-full shadow-sm">
                -${discountPercent}%
              </span>
            ` : ''}
          </div>

          <!-- Botón de Vista Rápida -->
          <div class="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
            <button 
              onclick="openQuickView(${product.id})" 
              class="bg-white/95 hover:bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-semibold shadow-lg transition transform hover:scale-105 flex items-center gap-2"
            >
              <i class="fa-regular fa-eye"></i> Vista Rápida
            </button>
          </div>
        </div>

        <!-- Info del Producto -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span class="uppercase tracking-wider font-medium text-[10px]">${product.category}</span>
              <span class="flex items-center text-amber-500 font-semibold gap-1">
                <i class="fa-solid fa-star text-[11px]"></i> ${product.rating}
              </span>
            </div>
            <h3 class="font-semibold text-slate-900 text-sm hover:text-indigo-600 transition cursor-pointer" onclick="openQuickView(${product.id})">
              ${escapeHtml(product.name)}
            </h3>
            <p class="text-xs text-slate-500 mt-1 line-clamp-2">${escapeHtml(product.description)}</p>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div class="flex items-baseline gap-2">
              <span class="text-base font-bold text-slate-900">$${product.price.toFixed(2)}</span>
              ${hasDiscount ? `
                <span class="text-xs text-slate-400 line-through">$${product.originalPrice.toFixed(2)}</span>
              ` : ''}
            </div>
            <button 
              onclick="quickAddToCart(${product.id})" 
              class="w-9 h-9 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white flex items-center justify-center transition shadow-sm hover:scale-105 active:scale-95"
              title="Añadir al carrito"
            >
              <i class="fa-solid fa-bag-shopping text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Configurar botones de categorías
function setupFilterButtons() {
  const buttons = document.querySelectorAll('.cat-filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('bg-slate-900', 'text-white');
        b.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
      });
      btn.classList.add('bg-slate-900', 'text-white');
      btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');

      currentCategory = btn.dataset.category;
      renderProducts();
    });
  });
}

// Configurar barra de búsqueda y select de orden
function setupSearchAndSort() {
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
  });

  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
  });
}

function resetFilters() {
  currentCategory = 'all';
  searchQuery = '';
  document.getElementById('searchInput').value = '';
  setupFilterButtons();
  renderProducts();
}

// ==================== CARRITO DE COMPRAS ====================

function quickAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const defaultSize = product.sizes[0] || 'M';
  const defaultColor = product.colors[0] || 'Original';
  addToCart(product, defaultSize, defaultColor, 1);
}

function addToCart(product, size, color, quantity = 1) {
  const cartKey = `${product.id}-${size}-${color}`;
  const existingIndex = cart.findIndex(item => item.cartKey === cartKey);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      cartKey,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      color,
      quantity
    });
  }

  saveCart();
  updateCartUI();
  showToast(`¡"${product.name}" añadido al carrito!`);
}

function updateCartQuantity(cartKey, change) {
  const itemIndex = cart.findIndex(item => item.cartKey === cartKey);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity += change;
  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
  }

  saveCart();
  updateCartUI();
}

function removeCartItem(cartKey) {
  cart = cart.filter(item => item.cartKey !== cartKey);
  saveCart();
  updateCartUI();
  showToast('Producto eliminado del carrito');
}

function saveCart() {
  localStorage.setItem('aura_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartBadge.textContent = totalItems;
  cartBadge.classList.toggle('hidden', totalItems === 0);

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="py-16 text-center text-slate-400">
        <i class="fa-solid fa-basket-shopping text-4xl mb-3 text-slate-200"></i>
        <p class="text-sm font-medium text-slate-600">Tu carrito está vacío</p>
        <p class="text-xs text-slate-400 mt-1">Explora nuestras prendas y añade tus favoritas.</p>
      </div>
    `;
    cartSubtotalEl.textContent = '$0.00';
    cartShippingEl.textContent = '$0.00';
    cartTotalEl.textContent = '$0.00';
    return;
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 60 || subtotal === 0 ? 0 : 5.00; // Envío gratis sobre $60
  const total = subtotal + shipping;

  cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  cartShippingEl.textContent = shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`;
  cartTotalEl.textContent = `$${total.toFixed(2)}`;

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="flex gap-3 py-3 border-b border-slate-100 last:border-b-0">
      <img src="${item.image}" alt="${escapeHtml(item.name)}" class="w-16 h-20 object-cover rounded-xl bg-slate-50 flex-shrink-0">
      <div class="flex-1 flex flex-col justify-between">
        <div class="flex justify-between items-start gap-2">
          <div>
            <h4 class="text-xs font-semibold text-slate-900 leading-snug">${escapeHtml(item.name)}</h4>
            <p class="text-[11px] text-slate-400 mt-0.5">${item.size} • ${item.color}</p>
          </div>
          <button onclick="removeCartItem('${item.cartKey}')" class="text-slate-300 hover:text-rose-500 transition text-xs p-1" title="Eliminar">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>

        <div class="flex justify-between items-center mt-2">
          <div class="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
            <button onclick="updateCartQuantity('${item.cartKey}', -1)" class="w-6 h-6 flex items-center justify-center text-xs text-slate-600 hover:bg-slate-200 transition">-</button>
            <span class="w-7 text-center text-xs font-semibold text-slate-800">${item.quantity}</span>
            <button onclick="updateCartQuantity('${item.cartKey}', 1)" class="w-6 h-6 flex items-center justify-center text-xs text-slate-600 hover:bg-slate-200 transition">+</button>
          </div>
          <span class="text-xs font-bold text-slate-900">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Drawer del Carrito
function toggleCart(open) {
  if (open) {
    cartOverlay.classList.remove('hidden');
    cartDrawer.classList.remove('translate-x-full');
    cartDrawer.classList.add('translate-x-0');
  } else {
    cartOverlay.classList.add('hidden');
    cartDrawer.classList.remove('translate-x-0');
    cartDrawer.classList.add('translate-x-full');
  }
}

// ==================== MODAL VISTA RÁPIDA ====================

function openQuickView(productId) {
  selectedQuickViewProduct = PRODUCTS.find(p => p.id === productId);
  if (!selectedQuickViewProduct) return;

  selectedSize = selectedQuickViewProduct.sizes[0] || '';
  selectedColor = selectedQuickViewProduct.colors[0] || '';

  document.getElementById('qvImage').src = selectedQuickViewProduct.image;
  document.getElementById('qvCategory').textContent = selectedQuickViewProduct.category;
  document.getElementById('qvTitle').textContent = selectedQuickViewProduct.name;
  document.getElementById('qvDescription').textContent = selectedQuickViewProduct.description;
  document.getElementById('qvPrice').textContent = `$${selectedQuickViewProduct.price.toFixed(2)}`;
  document.getElementById('qvRating').textContent = selectedQuickViewProduct.rating;
  document.getElementById('qvReviews').textContent = `(${selectedQuickViewProduct.reviews} opiniones)`;

  // Selector de tallas
  const sizesContainer = document.getElementById('qvSizes');
  sizesContainer.innerHTML = selectedQuickViewProduct.sizes.map((s, idx) => `
    <button 
      type="button" 
      onclick="selectSize('${s}', this)" 
      class="qv-size-btn text-xs font-semibold px-3 py-1.5 rounded-lg border ${idx === 0 ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'} transition hover:border-slate-900"
    >
      ${s}
    </button>
  `).join('');

  // Selector de colores
  const colorsContainer = document.getElementById('qvColors');
  colorsContainer.innerHTML = selectedQuickViewProduct.colors.map((c, idx) => `
    <button 
      type="button" 
      onclick="selectColor('${c}', this)" 
      class="qv-color-btn text-xs font-medium px-3 py-1.5 rounded-lg border ${idx === 0 ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'} transition hover:border-slate-900"
    >
      ${c}
    </button>
  `).join('');

  document.getElementById('qvQuantity').value = 1;

  quickViewModal.classList.remove('hidden');
}

function selectSize(size, btn) {
  selectedSize = size;
  document.querySelectorAll('.qv-size-btn').forEach(b => {
    b.classList.remove('bg-slate-900', 'text-white', 'border-slate-900');
    b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
  });
  btn.classList.add('bg-slate-900', 'text-white', 'border-slate-900');
  btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
}

function selectColor(color, btn) {
  selectedColor = color;
  document.querySelectorAll('.qv-color-btn').forEach(b => {
    b.classList.remove('bg-slate-900', 'text-white', 'border-slate-900');
    b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
  });
  btn.classList.add('bg-slate-900', 'text-white', 'border-slate-900');
  btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
}

function addFromQuickView() {
  if (!selectedQuickViewProduct) return;
  const qty = parseInt(document.getElementById('qvQuantity').value) || 1;
  addToCart(selectedQuickViewProduct, selectedSize, selectedColor, qty);
  closeQuickView();
  toggleCart(true);
}

function closeQuickView() {
  quickViewModal.classList.add('hidden');
  selectedQuickViewProduct = null;
}

// ==================== CHECKOUT SIMULADO ====================

function openCheckout() {
  if (cart.length === 0) {
    showToast('El carrito está vacío. Agrega prendas para continuar.');
    return;
  }
  toggleCart(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 60 ? 0 : 5.00;
  const total = subtotal + shipping;

  document.getElementById('checkoutItemsCount').textContent = cart.reduce((acc, i) => acc + i.quantity, 0);
  document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;

  checkoutModal.classList.remove('hidden');
}

function closeCheckout() {
  checkoutModal.classList.add('hidden');
}

function processCheckout(e) {
  e.preventDefault();
  const name = document.getElementById('checkoutName').value;
  const email = document.getElementById('checkoutEmail').value;

  // Simular confirmación
  checkoutModal.classList.add('hidden');
  cart = [];
  saveCart();
  updateCartUI();

  alert(`¡Gracias por tu compra, ${name}!\n\nHemos enviado la confirmación y el número de seguimiento a:\n${email}\n\n¡Tu pedido está en camino!`);
}

// ==================== UTILIDADES ====================

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2500);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
