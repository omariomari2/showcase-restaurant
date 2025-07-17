// Cart Management System
class CartManager {
  constructor() {
    try {
      const savedCart = localStorage.getItem('cart');
      this.cart = savedCart ? JSON.parse(savedCart) : [];
      
      // Validate cart data and remove corrupted items
      this.cart = this.cart.filter(item => {
        return item && item.id && item.name && typeof item.price === 'number' && item.price >= 0;
      });
      
      console.log('Cart loaded:', this.cart);
    } catch (error) {
      console.error('Error loading cart:', error);
      this.cart = [];
      localStorage.removeItem('cart'); // Clear corrupted data
    }
    
    this.init();
  }

  init() {
    // Always create the cart component directly to ensure it works
    this.createCartComponent();
    this.bindEvents();
    this.updateCartDisplay();
  }

  loadCartComponent() {
    // Load cart component HTML
    fetch('cart-component.html')
      .then(response => response.text())
      .then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
        this.bindEvents();
        this.updateCartDisplay();
      })
      .catch(error => {
        console.error('Error loading cart component:', error);
        // Fallback: create cart component directly
        this.createCartComponent();
      });
  }

  createCartComponent() {
    console.log('Creating cart component...');
    const cartHTML = `
      <div class="cart-component" id="cart-component">
        <div class="cart-button" id="cart-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span class="cart-count" id="cart-count">0</span>
        </div>

        <div class="cart-panel" id="cart-panel">
          <div class="cart-header">
            <h3>Your Cart</h3>
            <button class="cart-close" id="cart-close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="cart-items" id="cart-items">
          </div>
          
          <div class="cart-footer">
            <div class="cart-total">
              <span>Total:</span>
              <span class="cart-total-amount" id="cart-total-amount">$0.00</span>
            </div>
            <button class="cart-checkout-btn" id="cart-checkout-btn">
              Checkout
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', cartHTML);
    console.log('Cart component created. Checking elements...');
    console.log('Cart button:', document.getElementById('cart-button'));
    console.log('Cart panel:', document.getElementById('cart-panel'));
  }

  bindEvents() {
    const cartButton = document.getElementById('cart-button');
    const cartPanel = document.getElementById('cart-panel');
    const cartClose = document.getElementById('cart-close');
    const cartCheckout = document.getElementById('cart-checkout-btn');

    if (cartButton) {
      cartButton.addEventListener('click', () => this.toggleCart());
    }

    if (cartClose) {
      cartClose.addEventListener('click', () => this.closeCart());
    }

    if (cartCheckout) {
      cartCheckout.addEventListener('click', () => this.checkout());
    }

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
      const cartComponent = document.getElementById('cart-component');
      if (cartComponent && !cartComponent.contains(e.target)) {
        this.closeCart();
      }
    });
  }

  toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    console.log('Cart panel found:', cartPanel);
    if (cartPanel) {
      cartPanel.classList.toggle('active');
      console.log('Cart panel active:', cartPanel.classList.contains('active'));
    } else {
      console.error('Cart panel not found!');
    }
  }

  closeCart() {
    const cartPanel = document.getElementById('cart-panel');
    if (cartPanel) {
      cartPanel.classList.remove('active');
    }
  }

  addToCart(item) {
    // Validate and sanitize the item data
    if (!item || !item.id) {
      console.error('Invalid item data:', item);
      return;
    }

    const sanitizedItem = {
      id: item.id,
      name: item.name || 'Unknown Item',
      price: parseFloat(item.price) || 0,
      image: item.image || '',
      description: item.description || ''
    };

    const existingItem = this.cart.find(cartItem => cartItem.id === sanitizedItem.id);
    
    if (existingItem) {
      existingItem.quantity = (parseInt(existingItem.quantity) || 1) + 1;
    } else {
      this.cart.push({
        ...sanitizedItem,
        quantity: 1
      });
    }

    this.saveCart();
    this.updateCartDisplay();
    this.showAddToCartAnimation();
  }

  removeFromCart(itemId) {
    this.cart = this.cart.filter(item => item.id !== itemId);
    this.saveCart();
    this.updateCartDisplay();
  }

  updateQuantity(itemId, newQuantity) {
    const item = this.cart.find(cartItem => cartItem.id === itemId);
    if (item) {
      const quantity = parseInt(newQuantity) || 0;
      if (quantity <= 0) {
        this.removeFromCart(itemId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        this.updateCartDisplay();
      }
    }
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  updateCartDisplay() {
    this.updateCartCount();
    this.updateCartItems();
    this.updateCartTotal();
  }

  updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      const totalItems = this.cart.reduce((sum, item) => {
        const quantity = parseInt(item.quantity) || 1;
        return sum + quantity;
      }, 0);
      cartCount.textContent = totalItems;
      
      // Add animation if count changes
      if (totalItems > 0) {
        cartCount.style.animation = 'none';
        setTimeout(() => {
          cartCount.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
      }
    }
  }

  updateCartItems() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;

    if (this.cart.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>Your cart is empty</p>
          <p style="font-size: 14px; margin-top: 5px;">Add some delicious items to get started!</p>
        </div>
      `;
      return;
    }

    cartItems.innerHTML = this.cart.map(item => {
      // Ensure all required properties exist with fallbacks
      const itemName = item.name || 'Unknown Item';
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = parseInt(item.quantity) || 1;
      const itemImage = item.image || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><rect width="50" height="50" fill="%23f0f0f0"/><text x="25" y="25" font-size="20" text-anchor="middle" dy=".35em" fill="%23999">🍽️</text></svg>';
      const totalPrice = (itemPrice * itemQuantity).toFixed(2);
      
      return `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-details">
            <div class="cart-item-name">${itemName}</div>
            <div class="cart-item-price">$${totalPrice}</div>
          </div>
          <div class="cart-item-controls">
            <div class="cart-item-quantity">
              <button class="quantity-btn" onclick="cartManager.updateQuantity('${item.id}', ${itemQuantity - 1})">-</button>
              <span class="quantity-value">${itemQuantity}</span>
              <button class="quantity-btn" onclick="cartManager.updateQuantity('${item.id}', ${itemQuantity + 1})">+</button>
            </div>
            <button class="remove-item" onclick="cartManager.removeFromCart('${item.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  updateCartTotal() {
    const cartTotal = document.getElementById('cart-total-amount');
    if (cartTotal) {
      const total = this.cart.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;
        return sum + (price * quantity);
      }, 0);
      cartTotal.textContent = `$${total.toFixed(2)}`;
    }
  }

  showAddToCartAnimation() {
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
      cartButton.style.animation = 'none';
      setTimeout(() => {
        cartButton.style.animation = 'bounce 0.6s ease-in-out';
      }, 10);
    }
  }

  checkout() {
    if (this.cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Here you would typically redirect to a checkout page
    // For now, we'll show a simple alert
    const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Proceeding to checkout with total: $${total.toFixed(2)}`);
    
    // You can redirect to a checkout page here
    // window.location.href = '/checkout.html';
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateCartDisplay();
  }

  getCart() {
    return this.cart;
  }

  getCartTotal() {
    return this.cart.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return sum + (price * quantity);
    }, 0);
  }
}

// Initialize cart manager when DOM is loaded
let cartManager;
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing cart manager...');
  setTimeout(() => {
    cartManager = new CartManager();
    console.log('Cart manager initialized:', cartManager);
  }, 100);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;
document.head.appendChild(style);

// Global helper function (object-based) to add items to the shared cart without
// colliding with page-specific addToCart(id) helpers that may also exist.
// Usage: addItemToCart({ id, name, price, image, description })
function addItemToCart(item) {
  if (cartManager) {
    cartManager.addToCart(item);
  }
} 