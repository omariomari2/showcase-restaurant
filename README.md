# FoodTruck Website - Navbar Component

This project includes a reusable navbar component that can be easily integrated into any page of the FoodTruck website.

## Files Created

- `navbar.html` - Static HTML version of the navbar
- `navbar.js` - JavaScript class for dynamic navbar functionality
- `navbar-usage.html` - Example file showing different usage scenarios
- `README.md` - This documentation file

## Navbar Component Features

### Core Features
- **Responsive Design**: Works on desktop and mobile devices
- **Customizable Brand**: Change brand name and link
- **Dynamic Menu Items**: Add, remove, or modify navigation links
- **Interactive Elements**: Search, cart, and user profile buttons
- **Cart Counter**: Display number of items in cart
- **Active State Management**: Highlight current page
- **Event Handlers**: Customizable click events for all interactive elements

### Visual Features
- **Glass Morphism**: Backdrop blur effect with transparency
- **Hover Animations**: Smooth transitions on all interactive elements
- **Underline Effects**: Animated underlines on menu items
- **Icon Animations**: Scale effects on button hover
- **Fixed Positioning**: Stays at top of page during scroll

## Usage

### Basic Usage

```html
<!-- Include the navbar script -->
<script src="navbar.js"></script>

<!-- Add a container for the navbar -->
<div id="navbar-container"></div>

<!-- Initialize the navbar -->
<script>
const navbar = new Navbar({
  containerId: 'navbar-container',
  brandName: 'FoodTruck',
  cartCount: 2
});
</script>
```

### Advanced Usage with Custom Options

```javascript
const navbar = new Navbar({
  containerId: 'navbar-container',
  brandName: 'FoodTruck Pro',
  brandLink: '/home',
  menuItems: [
    { text: 'Home', link: '/', active: true },
    { text: 'Menu', link: '/menu', active: false },
    { text: 'About', link: '/about', active: false },
    { text: 'Contact', link: '/contact', active: false }
  ],
  showSearch: true,
  showCart: true,
  showUser: true,
  cartCount: 5
});
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | string | 'navbar-container' | ID of the container element |
| `brandName` | string | 'FoodTruck' | Brand/logo text |
| `brandLink` | string | '#' | Link for brand/logo |
| `menuItems` | array | Default menu items | Array of menu item objects |
| `showSearch` | boolean | true | Show/hide search button |
| `showCart` | boolean | true | Show/hide cart button |
| `showUser` | boolean | true | Show/hide user button |
| `cartCount` | number | 0 | Number of items in cart |

### Menu Item Structure

```javascript
{
  text: 'Menu Item Text',
  link: '/menu-link',
  active: false // true for current page
}
```

## Methods

### Public Methods

#### `updateCartCount(count)`
Update the cart item count.

```javascript
navbar.updateCartCount(5);
```

#### `updateMenuItems(menuItems)`
Update the menu items array.

```javascript
navbar.updateMenuItems([
  { text: 'Dashboard', link: '/dashboard', active: true },
  { text: 'Orders', link: '/orders', active: false }
]);
```

#### `setActiveMenuItem(index)`
Set which menu item is currently active.

```javascript
navbar.setActiveMenuItem(2); // Set third item as active
```

### Event Handlers

You can override these methods to add custom functionality:

```javascript
// Search button click
navbar.onSearchClick = function() {
  // Your search logic here
  console.log('Search clicked!');
};

// Cart button click
navbar.onCartClick = function() {
  // Your cart logic here
  console.log('Cart clicked!');
};

// User button click
navbar.onUserClick = function() {
  // Your user profile logic here
  console.log('User clicked!');
};

// Menu item click
navbar.onMenuItemClick = function(item, index, event) {
  // Your navigation logic here
  console.log(`Navigating to: ${item.text}`);
  event.preventDefault(); // Prevent default if needed
};
```

## Examples

### Example 1: Default Navbar
```javascript
const navbar = new Navbar({
  containerId: 'navbar-container'
});
```

### Example 2: Custom Menu Items
```javascript
const navbar = new Navbar({
  containerId: 'navbar-container',
  menuItems: [
    { text: 'Home', link: '#', active: true },
    { text: 'Menu', link: '#', active: false },
    { text: 'About', link: '#', active: false },
    { text: 'Locations', link: '#', active: false },
    { text: 'Contact', link: '#', active: false }
  ]
});
```

### Example 3: Without Search Button
```javascript
const navbar = new Navbar({
  containerId: 'navbar-container',
  showSearch: false,
  brandName: 'FoodTruck Lite'
});
```

### Example 4: With Cart Count
```javascript
const navbar = new Navbar({
  containerId: 'navbar-container',
  cartCount: 5,
  brandName: 'FoodTruck Pro'
});
```

## Integration with Main Site

The navbar component has been integrated into the main `index.html` file. The navbar is initialized in the `DOMContentLoaded` event with the following configuration:

```javascript
const navbar = new Navbar({
  containerId: 'navbar-container',
  brandName: 'FoodTruck',
  cartCount: 2,
  menuItems: [
    { text: 'Home', link: '#', active: true },
    { text: 'Store', link: '#', active: false },
    { text: 'Contact Us', link: '#', active: false },
    { text: 'Track Orders', link: '#', active: false }
  ]
});
```

## Browser Compatibility

The navbar component works in all modern browsers that support:
- ES6 Classes
- Template Literals
- Arrow Functions
- CSS Grid and Flexbox
- CSS Backdrop Filter (for glass morphism effect)

## Dependencies

- **Tailwind CSS**: For styling (included via CDN)
- **Lucide Icons**: For SVG icons (included via CDN)

## Customization

### Styling
The navbar uses Tailwind CSS classes. You can customize the appearance by modifying the classes in the `generateHTML()` method of the Navbar class.

### Adding New Features
To add new features, extend the Navbar class or modify the existing methods. The component is designed to be easily extensible.

## File Structure

```
foodtruck/
├── index.html          # Main website with integrated navbar
├── navbar.html         # Static navbar HTML
├── navbar.js           # Navbar component JavaScript
├── navbar-usage.html   # Usage examples
├── README.md           # This documentation
└── styles.css          # External styles (if any)
```

## Contributing

To modify the navbar component:
1. Edit the `navbar.js` file for functionality changes
2. Update the `navbar.html` file for static HTML changes
3. Test with the `navbar-usage.html` file
4. Update this README if adding new features 