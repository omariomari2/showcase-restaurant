// Product management using localStorage

const DEMO_PRODUCTS = [
  // Breakfast Items
  {
    id: '1',
    name: 'Fluffy Pancakes',
    price: 8.99,
    image: 'images/jollofrice.png',
    category: 'Breakfast'
  },
  {
    id: '2',
    name: 'Avocado Toast',
    price: 9.99,
    image: 'images/jollofrice.png',
    category: 'Breakfast'
  },
  {
    id: '3',
    name: 'Breakfast Burrito',
    price: 11.99,
    image: 'images/jollofrice.png',
    category: 'Breakfast'
  },
  {
    id: '4',
    name: 'French Toast',
    price: 10.99,
    image: 'images/jollofrice.png',
    category: 'Breakfast'
  },
  
  // Lunch Items
  {
    id: '5',
    name: 'Classic Burger',
    price: 12.99,
    image: 'images/jollofrice.png',
    category: 'Lunch'
  },
  {
    id: '6',
    name: 'Jollof Rice',
    price: 10.99,
    image: 'images/jollofrice.png',
    category: 'Lunch'
  },
  {
    id: '7',
    name: 'Chicken Caesar Wrap',
    price: 11.99,
    image: 'images/jollofrice.png',
    category: 'Lunch'
  },
  {
    id: '8',
    name: 'BBQ Pulled Pork Sandwich',
    price: 13.99,
    image: 'images/jollofrice.png',
    category: 'Lunch'
  },
  {
    id: '9',
    name: 'Grilled Chicken Salad',
    price: 12.49,
    image: 'images/jollofrice.png',
    category: 'Lunch'
  },
  {
    id: '10',
    name: 'Fish Tacos (3pc)',
    price: 14.99,
    image: 'images/jollofrice.png',
    category: 'Lunch'
  },
  {
    id: '11',
    name: 'Vegetarian Quesadilla',
    price: 10.99,
    image: 'images/jollofrice.png',
    category: 'Lunch'
  },
  {
    id: '12',
    name: 'Loaded Nachos',
    price: 11.99,
    image: 'images/jollofrice.png',
    category: 'Lunch'
  },
  
  // Dinner Items
  {
    id: '13',
    name: 'Grilled Ribeye Steak',
    price: 24.99,
    image: 'images/jollofrice.png',
    category: 'Dinner'
  },
  {
    id: '14',
    name: 'Pan-Seared Salmon',
    price: 21.99,
    image: 'images/jollofrice.png',
    category: 'Dinner'
  },
  {
    id: '15',
    name: 'Chicken Alfredo Pasta',
    price: 16.99,
    image: 'images/jollofrice.png',
    category: 'Dinner'
  },
  {
    id: '16',
    name: 'Beef Stir Fry',
    price: 17.99,
    image: 'images/jollofrice.png',
    category: 'Dinner'
  },
  {
    id: '17',
    name: 'Lamb Curry',
    price: 19.99,
    image: 'images/jollofrice.png',
    category: 'Dinner'
  },
  {
    id: '18',
    name: 'Seafood Paella',
    price: 23.99,
    image: 'images/jollofrice.png',
    category: 'Dinner'
  },
  {
    id: '19',
    name: 'Vegetarian Lasagna',
    price: 15.99,
    image: 'images/jollofrice.png',
    category: 'Dinner'
  },
  {
    id: '20',
    name: 'BBQ Ribs Platter',
    price: 22.99,
    image: 'images/jollofrice.png',
    category: 'Dinner'
  },
  
  // Complements (Sides & Appetizers)
  {
    id: '21',
    name: 'Sweet Potato Fries',
    price: 6.99,
    image: 'images/jollofrice.png',
    category: 'Complements'
  },
  {
    id: '22',
    name: 'Garlic Breadsticks',
    price: 5.99,
    image: 'images/jollofrice.png',
    category: 'Complements'
  },
  {
    id: '23',
    name: 'Buffalo Wings (6pc)',
    price: 8.99,
    image: 'images/jollofrice.png',
    category: 'Complements'
  },
  {
    id: '24',
    name: 'Onion Rings',
    price: 6.49,
    image: 'images/jollofrice.png',
    category: 'Complements'
  },
  {
    id: '25',
    name: 'Coleslaw',
    price: 4.99,
    image: 'images/jollofrice.png',
    category: 'Complements'
  },
  {
    id: '26',
    name: 'Mozzarella Sticks',
    price: 7.99,
    image: 'images/jollofrice.png',
    category: 'Complements'
  },
  {
    id: '27',
    name: 'Loaded Potato Skins',
    price: 8.49,
    image: 'images/jollofrice.png',
    category: 'Complements'
  },
  {
    id: '28',
    name: 'House Salad',
    price: 5.99,
    image: 'images/jollofrice.png',
    category: 'Complements'
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