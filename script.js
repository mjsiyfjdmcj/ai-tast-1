// Product Data
const products = [
    {
        id: 1,
        name: 'Bamboo Utensil Set',
        category: 'home',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1606090931120-fb62b7917481?w=400',
        description: 'Sustainable bamboo utensils for eco-friendly dining',
        badge: 'Bestseller'
    },
    {
        id: 2,
        name: 'Organic Cotton Tote',
        category: 'personal',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1611651625032-153048f0da00?w=400',
        description: 'Reusable shopping bag made from 100% organic cotton',
        badge: null
    },
    {
        id: 3,
        name: 'Stainless Steel Water Bottle',
        category: 'outdoor',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1601257774527-a5b80a1f13ac?w=400',
        description: 'Insulated bottle keeps drinks cold for 24 hours',
        badge: 'Popular'
    },
    {
        id: 4,
        name: 'Natural Soap Bar Set',
        category: 'personal',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1662307790126-1fa497aa637a?w=400',
        description: 'Handmade soaps with organic ingredients',
        badge: null
    },
    {
        id: 5,
        name: 'Recycled Yoga Mat',
        category: 'outdoor',
        price: 45.99,
        image: 'https://images.unsplash.com/photo-1654856486373-480e1a5db20f?w=400',
        description: 'Eco-friendly mat made from recycled materials',
        badge: 'New'
    },
    {
        id: 6,
        name: 'Beeswax Food Wraps',
        category: 'home',
        price: 22.99,
        image: 'https://images.unsplash.com/photo-1637873208775-65190a1662a3?w=400',
        description: 'Reusable alternative to plastic wrap',
        badge: null
    },
    {
        id: 7,
        name: 'Bamboo Toothbrush Pack',
        category: 'personal',
        price: 12.99,
        image: 'https://pixabay.com/get/g251b5834d2c7106cfa01fafe561ccdbf0b1055101829fe8438fb021e8e93f783c5ff80410c05be54bb967080cee2db99.png',
        description: 'Biodegradable toothbrushes, pack of 4',
        badge: 'Eco Choice'
    },
    {
        id: 8,
        name: 'Solar Power Bank',
        category: 'outdoor',
        price: 39.99,
        image: 'https://pixabay.com/get/g7276034d305416c3d96662d9f18c9041bfad80a58af7eb3948a899b2d641f595b406c3cc632084c867dcef195a64b8b7.png',
        description: 'Portable charger powered by solar energy',
        badge: 'Bestseller'
    },
    {
        id: 9,
        name: 'Compostable Phone Case',
        category: 'personal',
        price: 27.99,
        image: 'https://images.unsplash.com/photo-1611651625032-153048f0da00?w=400',
        description: 'Protective case that biodegrades naturally',
        badge: null
    }
];

// Cart State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCart');
const cartBadge = document.getElementById('cartBadge');
const cartItems = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const totalAmount = document.getElementById('totalAmount');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    setupEventListeners();
    loadCartFromStorage();
});

// Render Products
function renderProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            renderProducts(category);
        });
    });
    
    // Cart toggle
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                closeCart();
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
    });
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    saveCartToStorage();
    
    // Show feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Added!';
    btn.style.background = '#8DB600';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 1000);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCartToStorage();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
            saveCartToStorage();
        }
    }
}

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <img src="icons/cart.svg" alt="Empty cart" class="empty-cart-icon">
                <p>Your cart is empty</p>
                <a href="#products" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmount.textContent = `$${total.toFixed(2)}`;
        cartFooter.style.display = 'block';
    }
}

function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Local Storage
function saveCartToStorage() {
    localStorage.setItem('brightersCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('brightersCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Newsletter Form
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('.newsletter-input');
    const email = input.value;
    
    if (email) {
        alert('Thank you for subscribing! You\'ll receive updates on our climate initiatives.');
        input.value = '';
    }
});

// Product card click animation
productGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (card && !e.target.classList.contains('add-to-cart-btn')) {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    }
});