// User management using localStorage

const DEMO_USERS = [
  { username: 'user', password: 'user123', role: 'user' },
  { username: 'admin', password: 'admin123', role: 'admin' }
];

// Ensure demo users exist in localStorage
function ensureDemoUsers() {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  DEMO_USERS.forEach(demo => {
    if (!users.find(u => u.username === demo.username)) {
      users.push(demo);
    }
  });
  localStorage.setItem('users', JSON.stringify(users));
}
ensureDemoUsers();

// Register a new user
function registerUser(username, password) {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(u => u.username === username)) {
    return { success: false, message: 'Username already exists.' };
  }
  users.push({ username, password, role: 'user' });
  localStorage.setItem('users', JSON.stringify(users));
  return { success: true };
}

// Login user
function loginUser(username, password) {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, user };
  } else {
    return { success: false, message: 'Invalid username or password.' };
  }
}

// Logout user
function logoutUser() {
  localStorage.removeItem('currentUser');
}

// Get current logged-in user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

// Check if current user is admin
function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === 'admin';
}

// --- Sign-in form logic for signin.html ---
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('signin-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      const result = loginUser(username, password);
      const msg = document.getElementById('signin-message');
      if (result.success) {
        msg.textContent = '';
        // Redirect based on role
        if (result.user.role === 'admin') {
          window.location.href = 'admin.html';
        } else {
          window.location.href = 'store.html';
        }
      } else {
        msg.textContent = result.message;
      }
    });
  }
}); 