// Order management using localStorage

// Place an order
function placeOrder() {
  const user = getCurrentUser();
  if (!user) return { success: false, message: 'Not logged in.' };
  const cart = getCart();
  if (!cart.length) return { success: false, message: 'Cart is empty.' };
  const total = getCartTotal();
  const order = {
    id: Date.now().toString(),
    user: user.username,
    items: cart,
    total,
    status: 'pending',
    timestamp: new Date().toISOString()
  };
  let orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  clearCart();
  return { success: true, order };
}

// Get orders for current user
function getUserOrders() {
  const user = getCurrentUser();
  if (!user) return [];
  let orders = JSON.parse(localStorage.getItem('orders') || '[]');
  return orders.filter(o => o.user === user.username);
}

// Get all orders (admin)
function getAllOrders() {
  return JSON.parse(localStorage.getItem('orders') || '[]');
}

// Update order status (admin)
function updateOrderStatus(orderId, status) {
  let orders = getAllOrders();
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx !== -1) {
    orders[idx].status = status;
    localStorage.setItem('orders', JSON.stringify(orders));
    return true;
  }
  return false;
} 