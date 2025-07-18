class FoodTruckNavbar extends HTMLElement {
  connectedCallback() {
    // Ensure the element has an ID so Navbar can target it
    if (!this.id) {
      this.id = `navbar-container-${Math.random().toString(36).substring(2, 9)}`;
    }

    // Determine which menu item should be active
    const explicitActive = this.getAttribute('active');
    const pathname = window.location.pathname.split('/').pop() || 'index.html';
    const pageKey = explicitActive || (pathname.includes('store') ? 'store' : pathname.includes('contact') ? 'contact' : pathname.includes('track-orders') ? 'track-orders' : 'home');

    // Cart count can be supplied via attribute or read from localStorage
    const cartAttr = this.getAttribute('cart');
    const cartCount = cartAttr !== null ? Number(cartAttr) : Number(localStorage.getItem('cartCount') || 0);

    const menuItems = [
      { text: 'Home',       link: 'index.html',   active: pageKey === 'home' },
      { text: 'Store',      link: 'store.html',   active: pageKey === 'store' },
      { text: 'Contact Us', link: 'contact.html', active: pageKey === 'contact' },
      { text: 'Track Orders', link: 'track-orders.html', active: pageKey === 'track-orders' }
    ];

    // Create the Navbar instance and expose it
    this.navbar = new Navbar({
      containerId: this.id,
      brandName: 'FoodTruck',
      menuItems,
      cartCount
    });

    // Make the instance globally accessible if pages need it
    window.foodtruckNavbar = this.navbar;
  }
}

// Define the custom element
customElements.define('foodtruck-navbar', FoodTruckNavbar); 