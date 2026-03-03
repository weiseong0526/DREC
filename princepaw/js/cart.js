// Prince Paw - Cart & Checkout Logic
const CART_KEY = 'princepaw_cart';
const BUYNOW_KEY = 'princepaw_buynow';

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch {
        return [];
    }
}

function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart(cart);
}

function setBuyNow(product) {
    localStorage.setItem(BUYNOW_KEY, JSON.stringify({ ...product, qty: 1 }));
}

function getBuyNow() {
    try {
        return JSON.parse(localStorage.getItem(BUYNOW_KEY) || 'null');
    } catch {
        return null;
    }
}

function clearBuyNow() {
    localStorage.removeItem(BUYNOW_KEY);
}

function removeFromCart(id) {
    let cart = getCart().filter(item => item.id !== id);
    saveCart(cart);
}

function updateCartQty(id, qty) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty = Math.max(1, parseInt(qty) || 1);
        saveCart(cart);
    }
}
