// Product management using localStorage

const DEMO_PRODUCTS = [
  {
    id: '1',
    name: 'Classic Burger',
    price: 12.99,
    image: 'images/jollofrice.png',
    category: 'Lunch'
  },
  {
    id: '2',
    name: 'Jollof Rice',
    price: 10.99,
    image: 'images/jollofrice.png',
    category: 'Lunch'
  },
  {
    id: '3',
    name: 'Pancakes',
    price: 8.99,
    image: 'images/jollofrice.png',
    category: 'Breakfast'
  }
];

// Ensure demo products exist in localStorage
function ensureDemoProducts() {
  let products = JSON.parse(localStorage.getItem('products') || '[]');
  if (products.length === 0) {
    localStorage.setItem('products', JSON.stringify(DEMO_PRODUCTS));
  }
}
ensureDemoProducts();

// Get all products
function getProducts() {
  return JSON.parse(localStorage.getItem('products') || '[]');
}

// Add a new product (admin)
function addProduct(product) {
  let products = getProducts();
  // Generate a new unique id
  const newId = Date.now().toString();
  product.id = newId;
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
  return product;
}

// Update a product (admin)
function updateProduct(productId, updatedProduct) {
  let products = getProducts();
  const idx = products.findIndex(p => p.id === productId);
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...updatedProduct, id: productId };
    localStorage.setItem('products', JSON.stringify(products));
    return true;
  }
  return false;
}

// Delete a product (admin)
function deleteProduct(productId) {
  let products = getProducts();
  products = products.filter(p => p.id !== productId);
  localStorage.setItem('products', JSON.stringify(products));
}

// Get product by ID
function getProductById(productId) {
  let products = getProducts();
  return products.find(p => p.id === productId);
} 