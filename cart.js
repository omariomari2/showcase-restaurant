// Cart management using localStorage (global cart for demo)

const CART_KEY = 'cart';

function updateCartCountBadge() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  localStorage.setItem('cartCount', count);
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count } }));
}

// Get global cart
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

// Add item to cart
function addToCart(productId, quantity) {
  let cart = getCart();
  const idx = cart.findIndex(item => item.productId === productId);
  if (idx !== -1) {
    cart[idx].quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCountBadge();
}

// Update cart item quantity
function updateCartItem(productId, quantity) {
  let cart = getCart();
  const idx = cart.findIndex(item => item.productId === productId);
  if (idx !== -1) {
    cart[idx].quantity = quantity;
    if (cart[idx].quantity <= 0) {
      cart.splice(idx, 1);
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCountBadge();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.productId !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCountBadge();
}

// Clear cart
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCountBadge();
}

// Get cart total
function getCartTotal() {
  let total = 0;
  const cart = getCart();
  cart.forEach(item => {
    const product = getProductById(item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  });
  return total;
} 