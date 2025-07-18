/**
 * Navbar Component
 * A reusable navbar component for the FoodTruck website
 */

class Navbar {
  constructor(options = {}) {
    this.options = {
      brandName: options.brandName || 'FoodTruck',
      brandLink: options.brandLink || '#',
      menuItems: options.menuItems || [
        { text: 'Home', link: '#', active: true },
        { text: 'Store', link: '#', active: false },
        { text: 'Contact Us', link: '#', active: false },
        { text: 'Track Orders', link: '#', active: false }
      ],
      showSearch: options.showSearch !== false,
      showCart: options.showCart !== false,
      showUser: options.showUser !== false,
      cartCount: options.cartCount || 0,
      containerId: options.containerId || 'navbar-container'
    };
    
    this.lastScrollY = window.scrollY;
    this.headerElement = null;
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
    // Set initial cart count from localStorage
    const count = Number(localStorage.getItem('cartCount') || 0);
    this.updateCartCount(count);
    // Listen for cart updates
    window.addEventListener('cartUpdated', (e) => {
      this.updateCartCount(e.detail.count);
    });
    window.addEventListener('storage', (e) => {
      if (e.key === 'cartCount') {
        this.updateCartCount(Number(e.newValue || 0));
      }
    });
  }

  render() {
    const container = document.getElementById(this.options.containerId);
    if (!container) {
      console.error(`Container with id "${this.options.containerId}" not found`);
      return;
    }
    container.innerHTML = ''; // Clear previous content

    const header = document.createElement("header");
    header.className = "fixed top-0 w-full bg-neutral-50/80 backdrop-blur-xl border-b border-neutral-200/50 z-40 transition-transform duration-300 ease-in-out";

    const nav = document.createElement("nav");
    nav.className = "max-w-8xl mx-auto flex items-center justify-between px-8 py-8";

    const brandDiv = document.createElement("div");
    brandDiv.className = "flex items-center";

    const menuDiv = document.createElement("div");
    menuDiv.className = "hidden md:flex items-center gap-10 text-base font-medium";

    const iconsDiv = document.createElement("div");
    iconsDiv.className = "flex items-center gap-8";

    const brandLink = document.createElement("a");
    brandLink.href = this.options.brandLink;
    brandLink.className = "text-3xl font-serif font-medium tracking-tight";
    brandLink.textContent = this.options.brandName;
    brandDiv.appendChild(brandLink);

    this.options.menuItems.forEach(item => {
      const link = document.createElement("a");
      link.href = item.link;
      link.className = "relative group";
      
      const span = document.createElement("span");
      span.className = "transition-colors duration-300 hover:text-neutral-600";
      span.textContent = item.text;

      if (item.active) {
        span.classList.add("text-neutral-900");
      }
      
      const underline = document.createElement("span");
      underline.className = "absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full";
      if (item.active) {
        underline.classList.add("w-full");
      }
      
      link.appendChild(span);
      link.appendChild(underline);
      menuDiv.appendChild(link);
    });

    // Replace search icon with check icon for admin
    if (this.options.showSearch) {
      const adminBtn = document.createElement("a");
      adminBtn.className = "relative group";
      adminBtn.id = "admin-btn";
      adminBtn.href = "admin.html";
      adminBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
          <polyline points="20 6 9 17 4 12" />
        </svg>`;
      iconsDiv.appendChild(adminBtn);
    }

    if (this.options.showCart) {
      const cartBtn = document.createElement("a");
      cartBtn.className = "relative group";
      cartBtn.id = "cart-btn";
      cartBtn.href = "cart.html";
      cartBtn.innerHTML = `
        <div class="bg-white rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
            <path d="M16 10a4 4 0 0 1-8 0"></path>
            <path d="M3.103 6.034h17.794"></path>
            <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"></path>
          </svg>
        </div>
        ${this.options.cartCount > 0 ? `<span class="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-semibold w-4 h-4 rounded-full flex items-center justify-center">${this.options.cartCount}</span>` : ''}`;
      iconsDiv.appendChild(cartBtn);
    }

    if (this.options.showUser) {
      const userBtn = document.createElement("a");
      userBtn.className = "relative group";
      userBtn.id = "user-btn";
      userBtn.href = "signin.html";
      userBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>`;
      iconsDiv.appendChild(userBtn);
    }

    nav.appendChild(brandDiv);
    nav.appendChild(menuDiv);
    nav.appendChild(iconsDiv);

    header.appendChild(nav);

    container.appendChild(header);
    this.headerElement = header;
  }

  attachEventListeners() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) searchBtn.addEventListener('click', () => this.onSearchClick());

    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) cartBtn.addEventListener('click', () => this.onCartClick());

    const userBtn = document.getElementById('user-btn');
    if (userBtn) userBtn.addEventListener('click', () => this.onUserClick());
  }

  handleScroll() {
    if (!this.headerElement) return;

    const currentScrollY = window.scrollY;
    if (currentScrollY > this.lastScrollY && currentScrollY > this.headerElement.offsetHeight) {
      // Scrolling down
      this.headerElement.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      this.headerElement.style.transform = 'translateY(0)';
    }
    this.lastScrollY = currentScrollY;
  }
  
  // --- Public API ---

  onSearchClick() { console.log('Search clicked'); }
  onCartClick() { window.location.href = 'cart.html'; }
  onUserClick() { console.log('User clicked'); }
  onMenuItemClick(item, index, event) {
    event.preventDefault();
    console.log('Menu item clicked:', item, index);
    this.setActiveMenuItem(index);
  }

  updateCartCount(count) {
    this.options.cartCount = count;
    this.render();
  }

  updateMenuItems(menuItems) {
    this.options.menuItems = menuItems;
    this.render();
  }

  setActiveMenuItem(index) {
    this.options.menuItems.forEach((item, i) => {
      item.active = i === index;
    });
    this.render();
  }

  static create(containerId, options = {}) {
    return new Navbar({ ...options, containerId });
  }
} 