// Admin panel functionality
document.addEventListener('DOMContentLoaded', function() {
  initializeAdminPanel();
  loadMenuItems();
  loadReservations();
  loadOrders();
});

// Initialize admin panel
function initializeAdminPanel() {
  // Tab navigation
  const navBtns = document.querySelectorAll('.admin-nav-btn');
  const tabs = document.querySelectorAll('.admin-tab');
  
  navBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      // Update active nav button
      navBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Show target tab
      tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.id === targetTab) {
          tab.classList.add('active');
        }
      });
    });
  });
  
  // Menu management
  initializeMenuManagement();
  
  // Reservation filters
  initializeReservationFilters();
  
  // Order filters
  initializeOrderFilters();
  
  // Settings forms
  initializeSettingsForms();
}

// Menu management functionality
function initializeMenuManagement() {
  const addMenuItemBtn = document.getElementById('addMenuItem');
  const menuModal = document.getElementById('menuModal');
  const closeMenuModal = document.getElementById('closeMenuModal');
  const cancelMenuItem = document.getElementById('cancelMenuItem');
  const menuItemForm = document.getElementById('menuItemForm');
  const categoryBtns = document.querySelectorAll('.category-btn');
  
  // Image upload functionality
  const imageFileInput = document.getElementById('itemImageFile');
  const imagePreview = document.getElementById('imagePreview');
  let uploadedImageData = null;
  
  imageFileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size must be less than 2MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = function(e) {
        uploadedImageData = e.target.result;
        imagePreview.innerHTML = `
          <img src="${uploadedImageData}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
          <button type="button" class="remove-image" onclick="removeUploadedImage()">×</button>
        `;
      };
      reader.readAsDataURL(file);
    }
  });
  
  // Remove uploaded image
  window.removeUploadedImage = function() {
    uploadedImageData = null;
    imageFileInput.value = '';
    imagePreview.innerHTML = `
      <div class="upload-placeholder">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2">
          <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21,15 16,10 5,21"/>
        </svg>
        <p>Click to upload image</p>
      </div>
    `;
  };
  
  // Open add menu item modal
  addMenuItemBtn.addEventListener('click', function() {
    document.getElementById('modalTitle').textContent = 'Add Menu Item';
    menuItemForm.reset();
    menuModal.style.display = 'flex';
    setTimeout(() => menuModal.classList.add('show'), 10);
  });
  
  // Close modal
  function closeModal() {
    menuModal.classList.remove('show');
    setTimeout(() => menuModal.style.display = 'none', 300);
  }
  
  closeMenuModal.addEventListener('click', closeModal);
  cancelMenuItem.addEventListener('click', closeModal);
  
  // Close modal when clicking outside
  menuModal.addEventListener('click', function(e) {
    if (e.target === menuModal) {
      closeModal();
    }
  });
  
  // Handle form submission
  menuItemForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values directly from elements
    const itemName = document.getElementById('itemName').value;
    const itemCategory = document.getElementById('itemCategory').value;
    const itemDescription = document.getElementById('itemDescription').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemAvailable = document.getElementById('itemAvailable').checked;
    
    const priceValue = parseFloat(itemPrice);
    
    // Validate required fields
    if (!itemName.trim()) {
      alert('Please enter a menu item name');
      return;
    }
    
    if (!itemCategory) {
      alert('Please select a category');
      return;
    }
    
    if (isNaN(priceValue) || priceValue <= 0) {
      alert('Please enter a valid price (greater than 0)');
      return;
    }
    
    const menuItem = {
      id: Date.now(), // Simple ID generation
      name: itemName.trim(),
      category: itemCategory,
      description: itemDescription.trim(),
      price: priceValue,
      image: uploadedImageData || 'src/images/burger.png',
      available: itemAvailable
    };
    
    // Save menu item
    saveMenuItem(menuItem);
    
    // Reset form and image
    menuItemForm.reset();
    removeUploadedImage();
    
    // Close modal and refresh display
    closeModal();
    loadMenuItems();
  });
  
  // Category filtering
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      categoryBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const category = this.dataset.category;
      filterMenuItems(category);
    });
  });
}

// Load and display menu items
function loadMenuItems() {
  const menuItems = JSON.parse(localStorage.getItem('craveMenuItems') || '[]');
  const adminMenuGrid = document.getElementById('adminMenuGrid');
  
  // If no items in storage, use default items
  if (menuItems.length === 0) {
    const defaultItems = [
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
    
    localStorage.setItem('craveMenuItems', JSON.stringify(defaultItems));
    displayMenuItems(defaultItems);
  } else {
    displayMenuItems(menuItems);
  }
}

function displayMenuItems(items) {
  const adminMenuGrid = document.getElementById('adminMenuGrid');
  adminMenuGrid.innerHTML = '';
  
  items.forEach(item => {
    const menuItem = createAdminMenuItemElement(item);
    adminMenuGrid.appendChild(menuItem);
  });
}

function createAdminMenuItemElement(item) {
  const menuItem = document.createElement('div');
  menuItem.className = 'admin-menu-item';
  
  // Handle null or invalid price values
  const price = item.price && !isNaN(item.price) ? parseFloat(item.price).toFixed(2) : '0.00';
  
  menuItem.innerHTML = `
    <div class="menu-item-image">
      <img src="${item.image}" alt="${item.name}" onerror="this.src='src/images/burger.png'">
    </div>
    <div class="menu-item-content">
      <h3>${item.name || 'Unnamed Item'}</h3>
      <p class="menu-item-description">${item.description || 'No description available'}</p>
      <div class="menu-item-meta">
        <span class="category-badge">${item.category || 'Uncategorized'}</span>
        <span class="price">$${price}</span>
        <span class="status ${item.available ? 'available' : 'unavailable'}">
          ${item.available ? 'Available' : 'Unavailable'}
        </span>
      </div>
    </div>
    <div class="menu-item-actions">
      <button class="edit-btn" onclick="editMenuItem(${item.id})">Edit</button>
      <button class="delete-btn" onclick="deleteMenuItem(${item.id})">Delete</button>
    </div>
  `;
  return menuItem;
}

function filterMenuItems(category) {
  const menuItems = JSON.parse(localStorage.getItem('craveMenuItems') || '[]');
  const filteredItems = category === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === category);
  
  displayMenuItems(filteredItems);
}

function saveMenuItem(menuItem) {
  const menuItems = JSON.parse(localStorage.getItem('craveMenuItems') || '[]');
  
  // Check if editing existing item
  const editId = menuItemForm.dataset.editId;
  if (editId) {
    const existingIndex = menuItems.findIndex(item => item.id === parseInt(editId));
    if (existingIndex !== -1) {
      menuItem.id = parseInt(editId);
      menuItems[existingIndex] = menuItem;
    }
    // Clear edit mode
    delete menuItemForm.dataset.editId;
  } else {
    menuItems.push(menuItem);
  }
  
  localStorage.setItem('craveMenuItems', JSON.stringify(menuItems));
}

function editMenuItem(itemId) {
  const menuItems = JSON.parse(localStorage.getItem('craveMenuItems') || '[]');
  const item = menuItems.find(item => item.id === itemId);
  
  if (item) {
    document.getElementById('modalTitle').textContent = 'Edit Menu Item';
    document.getElementById('itemName').value = item.name || '';
    document.getElementById('itemCategory').value = item.category || '';
    document.getElementById('itemDescription').value = item.description || '';
    document.getElementById('itemPrice').value = (item.price && !isNaN(item.price)) ? item.price : '';
    document.getElementById('itemAvailable').checked = item.available || false;
    
    // Handle image display
    if (item.image && item.image !== 'src/images/burger.png') {
      uploadedImageData = item.image;
      imagePreview.innerHTML = `
        <img src="${item.image}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
        <button type="button" class="remove-image" onclick="removeUploadedImage()">×</button>
      `;
    } else {
      removeUploadedImage();
    }
    
    // Store the item ID for updating
    menuItemForm.dataset.editId = itemId;
    
    const menuModal = document.getElementById('menuModal');
    menuModal.style.display = 'flex';
    setTimeout(() => menuModal.classList.add('show'), 10);
  }
}

function deleteMenuItem(itemId) {
  if (confirm('Are you sure you want to delete this menu item?')) {
    const menuItems = JSON.parse(localStorage.getItem('craveMenuItems') || '[]');
    const updatedItems = menuItems.filter(item => item.id !== itemId);
    localStorage.setItem('craveMenuItems', JSON.stringify(updatedItems));
    loadMenuItems();
  }
}

// Reservation management
function initializeReservationFilters() {
  const filterSelect = document.getElementById('reservationFilter');
  filterSelect.addEventListener('change', function() {
    filterReservations(this.value);
  });
}

function loadReservations() {
  const reservations = JSON.parse(localStorage.getItem('craveReservations') || '[]');
  displayReservations(reservations);
}

function displayReservations(reservations) {
  const tbody = document.getElementById('reservationsTableBody');
  tbody.innerHTML = '';
  
  if (reservations.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="no-data">No reservations found</td></tr>';
    return;
  }
  
  reservations.forEach(reservation => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${reservation.name}</td>
      <td>${formatDate(reservation.date)} at ${formatTime(reservation.time)}</td>
      <td>${reservation.guests} ${parseInt(reservation.guests) === 1 ? 'person' : 'people'}</td>
      <td>${reservation.email}<br>${reservation.phone}</td>
      <td><span class="status-badge ${reservation.status}">${reservation.status}</span></td>
      <td>
        <button class="action-btn view-btn" onclick="viewReservation(${reservation.id})">View</button>
        <button class="action-btn delete-btn" onclick="deleteReservation(${reservation.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function filterReservations(filter) {
  const reservations = JSON.parse(localStorage.getItem('craveReservations') || '[]');
  const today = new Date().toISOString().split('T')[0];
  
  let filteredReservations = [];
  
  switch (filter) {
    case 'today':
      filteredReservations = reservations.filter(r => r.date === today);
      break;
    case 'upcoming':
      filteredReservations = reservations.filter(r => r.date >= today);
      break;
    case 'past':
      filteredReservations = reservations.filter(r => r.date < today);
      break;
    default:
      filteredReservations = reservations;
  }
  
  displayReservations(filteredReservations);
}

function deleteReservation(reservationId) {
  if (confirm('Are you sure you want to delete this reservation?')) {
    const reservations = JSON.parse(localStorage.getItem('craveReservations') || '[]');
    const updatedReservations = reservations.filter(r => r.id !== reservationId);
    localStorage.setItem('craveReservations', JSON.stringify(updatedReservations));
    loadReservations();
  }
}

// Order management
function initializeOrderFilters() {
  const filterSelect = document.getElementById('orderFilter');
  filterSelect.addEventListener('change', function() {
    filterOrders(this.value);
  });
}

function loadOrders() {
  // In a real app, this would load from a database
  const orders = [
    {
      id: 1,
      customer: "John Doe",
      items: ["Jollof Rice", "Grilled Chicken"],
      total: 55.00,
      status: "pending",
      time: "2024-01-15T18:30:00"
    },
    {
      id: 2,
      customer: "Jane Smith",
      items: ["Beef Burger", "Coffee"],
      total: 28.00,
      status: "preparing",
      time: "2024-01-15T19:15:00"
    }
  ];
  
  displayOrders(orders);
}

function displayOrders(orders) {
  const ordersGrid = document.getElementById('ordersGrid');
  ordersGrid.innerHTML = '';
  
  orders.forEach(order => {
    const orderCard = document.createElement('div');
    orderCard.className = 'order-card';
    orderCard.innerHTML = `
      <div class="order-header">
        <h3>Order #${order.id}</h3>
        <span class="order-status ${order.status}">${order.status}</span>
      </div>
      <div class="order-details">
        <p><strong>Customer:</strong> ${order.customer}</p>
        <p><strong>Items:</strong> ${order.items.join(', ')}</p>
        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        <p><strong>Time:</strong> ${formatDateTime(order.time)}</p>
      </div>
      <div class="order-actions">
        <button class="action-btn" onclick="updateOrderStatus(${order.id}, 'preparing')">Start Preparing</button>
        <button class="action-btn" onclick="updateOrderStatus(${order.id}, 'ready')">Mark Ready</button>
        <button class="action-btn" onclick="updateOrderStatus(${order.id}, 'completed')">Complete</button>
      </div>
    `;
    ordersGrid.appendChild(orderCard);
  });
}

function filterOrders(filter) {
  // In a real app, this would filter from a database
  console.log('Filtering orders by:', filter);
}

function updateOrderStatus(orderId, status) {
  // In a real app, this would update the database
  console.log('Updating order', orderId, 'to status:', status);
  alert(`Order #${orderId} status updated to ${status}`);
}

// Settings management
function initializeSettingsForms() {
  const settingsForms = document.querySelectorAll('.settings-form');
  
  settingsForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real app, this would save to a database
      alert('Settings saved successfully!');
    });
  });
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

// Dashboard statistics update
function updateDashboardStats() {
  const reservations = JSON.parse(localStorage.getItem('craveReservations') || '[]');
  const today = new Date().toISOString().split('T')[0];
  const todayReservations = reservations.filter(r => r.date === today);
  
  // Update today's reservations count
  const reservationsStat = document.querySelector('.stat-card:nth-child(1) .stat-number');
  if (reservationsStat) {
    reservationsStat.textContent = todayReservations.length;
  }
}

// Auto-refresh dashboard
setInterval(updateDashboardStats, 30000); // Update every 30 seconds 