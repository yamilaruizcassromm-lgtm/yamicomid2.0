// ===================================================
// BASE DE DATOS DE PRODUCTOS (Simulación Frontend)
// ===================================================
const productos = [
    { id: 1, categoria: 'hamburguesas', nombre: 'Yami Burger Suprema', descripcion: 'Doble carne, doble cheddar, tocino crujiente y salsa especial.', precio: 8.50, imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
    { id: 2, categoria: 'hamburguesas', nombre: 'Chicken Crunch', descripcion: 'Pechuga empanizada, lechuga fresca, pepinillos y mayonesa de ajo.', precio: 7.20, imagen: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500' },
    { id: 3, categoria: 'pizzas', nombre: 'Pizza Pepperoni Blast', descripcion: 'Salsa de tomate, queso mozzarella abundante y pepperoni.', precio: 11.00, imagen: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500' },
    { id: 4, categoria: 'pizzas', nombre: 'Pizza Cuatro Quesos', descripcion: 'Mozzarella, gorgonzola, parmesano y gouda.', precio: 12.50, imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500' },
    { id: 5, categoria: 'bebidas', nombre: 'Batido Oreo Supreme', descripcion: 'Helado de mantecado, galletas Oreo y crema chantilly.', precio: 4.00, imagen: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500' },
    { id: 6, categoria: 'bebidas', nombre: 'Limonada Menta y Jengibre', descripcion: 'Limonada natural batida con menta fresca y jengibre.', precio: 2.80, imagen: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500' },
    { id: 7, categoria: 'postres', nombre: 'Choco Lava Cake', descripcion: 'Pastel de chocolate con centro derretido y helado de vainilla.', precio: 5.00, imagen: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500' }
];

// Estado del Carrito
let carrito = [];
const COSTO_ENVIO = 2.00;

// Referencias del DOM
const productsGrid = document.getElementById('products-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElem = document.getElementById('cart-count');
const subtotalPriceElem = document.getElementById('subtotal-price');
const totalPriceElem = document.getElementById('total-price');
const filterBtns = document.querySelectorAll('.btn-filter');
const checkoutBtn = document.getElementById('checkout-btn');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(productos);
    setupEventListeners();
});

// Renderizar la lista de productos
function renderProducts(items) {
    productsGrid.innerHTML = items.map(prod => `
        <div class="product-card">
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <div class="product-info">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <div class="product-bottom">
                    <span class="price">$${prod.precio.toFixed(2)}</span>
                    <button class="btn-add" onclick="addToCart(${prod.id})">Agregar +</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Configurar Event Listeners
function setupEventListeners() {
    // Abrir / Cerrar Carrito
    cartToggleBtn.addEventListener('click', () => cartSidebar.classList.add('open'));
    closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('open'));

    // Filtrar por Categoría
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const category = e.target.dataset.category;
            if (category === 'todos') {
                renderProducts(productos);
            } else {
                const filtered = productos.filter(p => p.categoria === category);
                renderProducts(filtered);
            }
        });
    });

    // Checkout
    checkoutBtn.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        alert('¡Gracias por tu pedido en yamicomid2.o! Tu pedido está en proceso.');
        carrito = [];
        updateCartUI();
        cartSidebar.classList.remove('open');
    });
}

// Agregar producto al carrito
function addToCart(productId) {
    const product = productos.find(p => p.id === productId);
    const existingIndex = carrito.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        carrito[existingIndex].cantidad += 1;
    } else {
        carrito.push({ ...product, cantidad: 1 });
    }

    updateCartUI();
    cartSidebar.classList.add('open');
}

// Cambiar la cantidad de un producto
function changeQuantity(productId, delta) {
    const index = carrito.findIndex(item => item.id === productId);
    if (index > -1) {
        carrito[index].cantidad += delta;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
    }
    updateCartUI();
}

// Actualizar la interfaz del carrito
function updateCartUI() {
    // Actualizar cantidad en la Navbar
    const totalCount = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCountElem.textContent = totalCount;

    // Renderizar ítems
    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#888;">Tu carrito está vacío.</p>';
    } else {
        cartItemsContainer.innerHTML = carrito.map(item => `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.nombre}</h4>
                    <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
                    <div class="cart-item-controls">
                        <button class="btn-qty" onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span>${item.cantidad}</span>
                        <button class="btn-qty" onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Actualizar Precios
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const total = subtotal > 0 ? subtotal + COSTO_ENVIO : 0;

    subtotalPriceElem.textContent = `$${subtotal.toFixed(2)}`;
    totalPriceElem.textContent = `$${total.toFixed(2)}`;
}