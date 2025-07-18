// Menu data - loaded from localStorage or default items
let menuItems = [];

// Load menu items from localStorage or use defaults
function loadMenuItems() {
  const storedItems = JSON.parse(localStorage.getItem('craveMenuItems') || '[]');
  
  if (storedItems.length === 0) {
    // Default menu items if none exist
    menuItems = [
      {
        id: 1,
        name: "Jollof Rice",
        category: "main-courses",
        description: "Traditional Ghanaian rice cooked with tomatoes, peppers, and aromatic spices",
        price: 25.00,
        image: "src/images/jollof.png",
        available: true
      },
      {
        id: 2,
        name: "Grilled Chicken",
        category: "main-courses",
        description: "Tender chicken breast marinated in herbs and grilled to perfection",
        price: 30.00,
        image: "src/images/burger.png",
        available: true
      },
      {
        id: 3,
        name: "Beef Burger",
        category: "main-courses",
        description: "Juicy beef patty with fresh vegetables and special sauce",
        price: 22.00,
        image: "src/images/burger.png",
        available: true
      },
      {
        id: 4,
        name: "Chicken Wings",
        category: "appetizers",
        description: "Crispy wings tossed in your choice of sauce",
        price: 18.00,
        image: "src/images/burger.png",
        available: true
      },
      {
        id: 5,
        name: "Caesar Salad",
        category: "appetizers",
        description: "Fresh romaine lettuce with Caesar dressing and croutons",
        price: 15.00,
        image: "src/images/collage.png",
        available: true
      },
      {
        id: 6,
        name: "Chocolate Cake",
        category: "desserts",
        description: "Rich chocolate cake with vanilla ice cream",
        price: 12.00,
        image: "src/images/stats.png",
        available: true
      },
      {
        id: 7,
        name: "Fresh Juice",
        category: "beverages",
        description: "Freshly squeezed orange or pineapple juice",
        price: 8.00,
        image: "src/images/jollof.png",
        available: true
      },
      {
        id: 8,
        name: "Coffee",
        category: "beverages",
        description: "Premium coffee beans brewed to perfection",
        price: 6.00,
        image: "src/images/burger.png",
        available: true
      }
    ];
    
    // Save default items to localStorage
    localStorage.setItem('craveMenuItems', JSON.stringify(menuItems));
  } else {
    menuItems = storedItems;
  }
}

// Cart functionality
let cart = [];

// DOM elements
const menuGrid = document.getElementById('menuGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  loadMenuItems(); // Load menu items first
  displayMenuItems('all');
  
  // Only update cart display if using local cart system
  if (!window.cartManager) {
    updateCartDisplay();
  }
  
  // Set minimum date for date inputs
  const today = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    input.min = today;
  });
});

// Display menu items
function displayMenuItems(category) {
  const filteredItems = category === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === category);
  
  menuGrid.innerHTML = '';
  
  filteredItems.forEach(item => {
    const menuItem = createMenuItemElement(item);
    menuGrid.appendChild(menuItem);
  });
}

// Create menu item element
function createMenuItemElement(item) {
  const menuItem = document.createElement('div');
  menuItem.className = 'menu-item';
  
  // Handle null or invalid price values
  const price = item.price && !isNaN(item.price) ? parseFloat(item.price).toFixed(2) : '0.00';
  
  menuItem.innerHTML = `
    <div class="menu-item-image">
      <img src="${item.image}" alt="${item.name}" onerror="this.src='src/images/burger.png'">
    </div>
    <div class="menu-item-content">
      <h3>${item.name || 'Unnamed Item'}</h3>
      <p class="menu-item-description">${item.description || 'No description available'}</p>
      <div class="menu-item-footer">
        <span class="menu-item-price">₵${price}</span>
        <button class="add-to-cart-btn" onclick="addToCart(${item.id})" ${!item.available ? 'disabled' : ''}>
          ${item.available ? 'Add to Cart' : 'Not Available'}
        </button>
      </div>
    </div>
  `;
  return menuItem;
}

// Filter functionality
filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    this.classList.add('active');
    
    const category = this.dataset.category;
    displayMenuItems(category);
  });
});

// Cart functionality - integrated with new cart component
function addToCart(itemId) {
  const item = menuItems.find(item => item.id === itemId);
  if (!item) return;
  
  // Use the global cart manager if available
  if (typeof cartManager !== 'undefined' && cartManager) {
    cartManager.addToCart(item);
  } else {
    // Fallback to local cart system
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...item,
        quantity: 1
      });
    }
    
    updateCartDisplay();
  }
  
  showCartNotification();
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  updateCartDisplay();
}

function updateQuantity(itemId, newQuantity) {
  const item = cart.find(item => item.id === itemId);
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      item.quantity = newQuantity;
      updateCartDisplay();
    }
  }
}

function updateCartDisplay() {
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    cartTotal.textContent = '₵0.00';
    return;
  }
  
  let total = 0;
  
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    // Handle null or invalid price values
    const itemPrice = item.price && !isNaN(item.price) ? parseFloat(item.price) : 0;
    const formattedPrice = itemPrice.toFixed(2);
    
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='src/images/burger.png'">
      </div>
      <div class="cart-item-details">
        <h4>${item.name || 'Unnamed Item'}</h4>
        <p>₵${formattedPrice}</p>
        <div class="quantity-controls">
          <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
      </div>
      <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
    `;
    cartItems.appendChild(cartItem);
    
    total += itemPrice * item.quantity;
  });
  
  cartTotal.textContent = `₵${total.toFixed(2)}`;
  
  // Update cart badge
  const cartBadge = document.querySelector('.cart-badge');
  if (cartBadge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
  }
}

// Cart sidebar functionality
function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
}

function closeCartSidebar() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
}

// Event listeners
closeCart.addEventListener('click', closeCartSidebar);
cartOverlay.addEventListener('click', closeCartSidebar);

// Cart button in navbar
document.addEventListener('click', function(e) {
  if (e.target.closest('.cart-btn')) {
    openCart();
  }
});

// Checkout functionality
checkoutBtn.addEventListener('click', function() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  // In a real app, this would redirect to a checkout page
  alert('Redirecting to checkout...');
  // For demo purposes, we'll just clear the cart
  cart = [];
  updateCartDisplay();
  closeCartSidebar();
});

// Notification for adding to cart
function showCartNotification() {
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = 'Item added to cart!';
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('craveCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('craveCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartDisplay();
  }
}

// Save cart when it changes
function updateCartDisplay() {
  // ... existing code ...
  saveCart();
}

// Load cart on page load
document.addEventListener('DOMContentLoaded', function() {
  loadCart();
  // ... existing code ...
}); 