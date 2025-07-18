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
    this.mobileMenuOpen = false;
    this.init();
  }

  init() {
    this.render();
    // Use setTimeout to ensure DOM elements are ready
    setTimeout(() => {
      this.attachEventListeners();
    }, 0);
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
    header.className = "fixed top-0 w-full bg-neutral-50/80 backdrop-blur-xl border-b border-neutral-200/50 z-[10001] transition-transform duration-300 ease-in-out";

    const nav = document.createElement("nav");
    nav.className = "max-w-8xl mx-auto flex items-center justify-between px-8 py-8";

    const brandDiv = document.createElement("div");
    brandDiv.className = "flex items-center";

    const menuDiv = document.createElement("div");
    menuDiv.className = "hidden md:flex items-center gap-10 text-base font-medium";
    menuDiv.id = "desktop-menu";

    // Mobile menu container
    const mobileMenuDiv = document.createElement("div");
    mobileMenuDiv.className = "md:hidden fixed inset-0 w-full h-screen bg-white transform -translate-x-full transition-transform duration-300 ease-in-out z-[9999]";
    mobileMenuDiv.id = "mobile-menu";

    // Mobile menu content
    const mobileMenuContent = document.createElement("div");
    mobileMenuContent.className = "flex flex-col h-screen overflow-y-auto relative";

    const iconsDiv = document.createElement("div");
    iconsDiv.className = "flex items-center gap-8";

    // Hamburger menu button
    const hamburgerBtn = document.createElement("button");
    hamburgerBtn.className = "md:hidden flex flex-col items-center justify-center w-6 h-6 space-y-1 relative z-[10000]";
    hamburgerBtn.id = "hamburger-btn";
    hamburgerBtn.innerHTML = `
      <span class="block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out hamburger-line-1"></span>
      <span class="block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out hamburger-line-2"></span>
      <span class="block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out hamburger-line-3"></span>
    `;

    const brandLink = document.createElement("a");
    brandLink.href = this.options.brandLink;
    brandLink.className = "text-3xl font-serif font-medium tracking-tight";
    brandLink.textContent = this.options.brandName;
    brandDiv.appendChild(brandLink);

    // Desktop menu items
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

    // Welcome section
    const welcomeSection = document.createElement("div");
    welcomeSection.className = "bg-orange-50 px-6 py-8 flex items-center";
    welcomeSection.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900">Welcome, Guest!</h3>
          <p class="text-sm text-gray-600">Browse our delicious menu</p>
        </div>
      </div>
    `;

    // Navigation section
    const navSection = document.createElement("div");
    navSection.className = "flex-1 px-6 py-8 space-y-4";

    // Mobile menu items with icons
    const menuItemsData = [
      { 
        text: 'Home', 
        link: 'index.html', 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9,22 9,12 15,12 15,22"></polyline></svg>`,
        description: 'Back to homepage'
      },
      { 
        text: 'Store', 
        link: 'store.html', 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" x2="21" y1="6" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
        description: 'Browse our menu'
      },
      { 
        text: 'Contact Us', 
        link: 'contact.html', 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
        description: 'Get in touch'
      },
      { 
        text: 'Track Orders', 
        link: 'track-orders.html', 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
        description: 'Track your orders'
      }
    ];

    menuItemsData.forEach((item, index) => {
      const isActive = this.options.menuItems[index]?.active;
      const link = document.createElement("a");
      link.href = item.link;
      link.className = `flex items-center gap-4 p-4 rounded-xl transition-all duration-300 mobile-menu-item group ${
        isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'
      }`;
      
      link.innerHTML = `
        <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center ${
          isActive ? 'bg-orange-100 text-orange-600' : 'text-gray-500 group-hover:bg-gray-200'
        }">
          ${item.icon}
        </div>
        <div class="flex-1">
          <div class="font-medium">${item.text}</div>
          <div class="text-sm text-gray-500">${item.description}</div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-30">
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      `;
      
      navSection.appendChild(link);
    });

    // Footer section with sign up
    const footerSection = document.createElement("div");
    footerSection.className = "px-6 py-8 bg-orange-50 mt-auto";
    footerSection.innerHTML = `
      <div class="text-center space-y-4">
        <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-600">
            <path d="M20 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 mb-1">Join ${this.options.brandName}</h3>
          <p class="text-sm text-gray-600 mb-4">Sign up for exclusive offers and faster checkout</p>
          <div class="space-y-2">
            <button class="w-full bg-orange-500 text-white py-3 rounded-lg font-medium">Sign Up</button>
            <button class="w-full text-gray-600 py-2">Sign In</button>
          </div>
        </div>
        <div class="text-xs text-gray-500 mt-4">
          © 2025 ${this.options.brandName}. All rights reserved.
        </div>
      </div>
    `;

    // Close button for mobile menu
    const closeBtn = document.createElement("button");
    closeBtn.className = "absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800";
    closeBtn.id = "mobile-menu-close";
    closeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;

    mobileMenuContent.appendChild(welcomeSection);
    mobileMenuContent.appendChild(navSection);
    mobileMenuContent.appendChild(footerSection);
    mobileMenuDiv.appendChild(closeBtn);
    mobileMenuDiv.appendChild(mobileMenuContent);

    // Admin icon - check authentication
    if (this.options.showSearch) {
      const adminBtn = document.createElement("a");
      adminBtn.className = "relative group";
      adminBtn.id = "admin-btn";
      adminBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>`;
      
      // Check if user is authenticated
      adminBtn.addEventListener('click', (e) => {
        e.preventDefault();
        try {
          const auth = JSON.parse(localStorage.getItem('adminAuth') || '{}');
          if (auth.authenticated) {
            const expiryTime = new Date(auth.expiryTime);
            if (new Date() <= expiryTime) {
              window.location.href = 'admin.html';
            } else {
              localStorage.removeItem('adminAuth');
              window.location.href = 'login.html';
            }
          } else {
            window.location.href = 'login.html';
          }
        } catch {
          window.location.href = 'login.html';
        }
      });
      
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

    // Add hamburger button to icons section
    iconsDiv.appendChild(hamburgerBtn);

    nav.appendChild(brandDiv);
    nav.appendChild(menuDiv);
    nav.appendChild(iconsDiv);

    header.appendChild(nav);
    header.appendChild(mobileMenuDiv);

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

    const hamburgerBtn = document.getElementById('hamburger-btn');
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
    }

    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    if (mobileMenuCloseBtn) {
      mobileMenuCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeMobileMenu();
      });
    }

    // Close mobile menu when clicking on menu items
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    mobileMenuItems.forEach(item => {
      item.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const hamburgerBtn = document.getElementById('hamburger-btn');
      
      if (!hamburgerBtn || !mobileMenu) return;
      
      const isClickInside = hamburgerBtn.contains(event.target) || mobileMenu.contains(event.target);

      if (mobileMenu.classList.contains('translate-x-0') && !isClickInside) {
        this.closeMobileMenu();
      }
    });
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

  toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerLines = document.querySelectorAll('.hamburger-line-1, .hamburger-line-2, .hamburger-line-3');

    if (!mobileMenu) return;

    if (this.mobileMenuOpen) {
      mobileMenu.classList.add('-translate-x-full');
      mobileMenu.classList.remove('translate-x-0');
      hamburgerLines[0].style.transform = 'rotate(0deg) translateY(0px)';
      hamburgerLines[1].style.opacity = '1';
      hamburgerLines[2].style.transform = 'rotate(0deg) translateY(0px)';
      document.body.classList.remove('mobile-menu-open');
    } else {
      mobileMenu.classList.remove('-translate-x-full');
      mobileMenu.classList.add('translate-x-0');
      hamburgerLines[0].style.transform = 'rotate(45deg) translateY(7px)';
      hamburgerLines[1].style.opacity = '0';
      hamburgerLines[2].style.transform = 'rotate(-45deg) translateY(-7px)';
      document.body.classList.add('mobile-menu-open');
    }
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerLines = document.querySelectorAll('.hamburger-line-1, .hamburger-line-2, .hamburger-line-3');

    mobileMenu.classList.add('-translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    hamburgerLines[0].style.transform = 'rotate(0deg) translateY(0px)';
    hamburgerLines[1].style.opacity = '1';
    hamburgerLines[2].style.transform = 'rotate(0deg) translateY(0px)';
    document.body.classList.remove('mobile-menu-open');
    this.mobileMenuOpen = false;
  }

  static create(containerId, options = {}) {
    return new Navbar({ ...options, containerId });
  }
} 