# Crave Restaurant Website

A modern, responsive restaurant website with full admin functionality for managing menus, reservations, and restaurant operations.

## Features

### Customer-Facing Features

#### 🏠 Home Page
- Beautiful landing page with animated elements
- Restaurant motto and branding
- Contact information and social media links
- Customer ratings and reviews
- Call-to-action buttons

#### 🍽️ Menu Page
- Interactive menu with category filtering
- Beautiful food item cards with images and descriptions
- Shopping cart functionality
- Add to cart with quantity controls
- Real-time cart updates
- Checkout process

#### 📖 About Page
- Restaurant story and history
- Core values and mission
- Team member profiles
- Professional presentation

#### 📅 Reservation System
- Easy-to-use reservation form
- Date and time selection
- Guest count and occasion options
- Special requests field
- Form validation
- Success confirmation
- Restaurant hours and policies

### Admin Panel Features

#### 📊 Dashboard
- Real-time statistics overview
- Today's reservations count
- Active orders tracking
- Revenue analytics
- Popular menu items
- Performance metrics

#### 🍴 Menu Management
- Add new menu items
- Edit existing items
- Delete items
- Category organization
- Price management
- Availability toggle
- Image upload support

#### 📋 Reservation Management
- View all reservations
- Filter by date (today, upcoming, past)
- Reservation details
- Status management
- Delete reservations
- Contact information

#### 📦 Order Management
- Track order status
- Update order progress
- Customer information
- Order details
- Status workflow (pending → preparing → ready → completed)

#### 📈 Analytics
- Revenue trends
- Customer demographics
- Peak hours analysis
- Popular items tracking
- Date range filtering
- Performance insights

#### ⚙️ Settings
- Restaurant information management
- Operating hours configuration
- Contact details
- Business settings

## Technical Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Local Storage**: Data persistence using browser localStorage
- **Form Validation**: Comprehensive client-side validation
- **Real-time Updates**: Dynamic content updates without page refresh
- **Cross-browser Compatible**: Works on all modern browsers

## File Structure

```
webpage/
├── index.html              # Home page
├── menu.html               # Menu page with cart
├── about.html              # About page
├── reservation.html        # Reservation system
├── admin.html              # Admin panel
├── navbar.html             # Navigation component
├── README.md               # Documentation
└── src/
    ├── index.css           # Main stylesheet
    ├── menu.js             # Menu and cart functionality
    ├── reservation.js      # Reservation system
    ├── admin.js            # Admin panel functionality
    └── images/
        ├── burger.png      # Food images
        ├── collage.png
        ├── jollof.png
        └── stats.png
```

## Getting Started

1. **Download/Clone** the project files
2. **Open** `index.html` in your web browser
3. **Navigate** through the different pages using the navigation menu
4. **Access Admin Panel** by clicking "Admin" in the navigation

## Usage Guide

### For Customers

1. **Browse Menu**: Visit the Menu page to see all available dishes
2. **Add to Cart**: Click "Add to Cart" on any menu item
3. **View Cart**: Click the cart icon in the navigation to see your order
4. **Make Reservations**: Use the Reservation page to book a table
5. **Learn About Us**: Visit the About page to learn more about the restaurant

### For Administrators

1. **Access Admin Panel**: Click "Admin" in the navigation
2. **Dashboard**: View real-time statistics and performance metrics
3. **Manage Menu**: Add, edit, or delete menu items
4. **Handle Reservations**: View and manage customer reservations
5. **Track Orders**: Monitor order status and update progress
6. **Analytics**: Review business performance and trends
7. **Settings**: Update restaurant information and operating hours

## Admin Panel Tabs

- **Dashboard**: Overview of restaurant operations
- **Menu Management**: Add, edit, and delete menu items
- **Reservations**: View and manage customer bookings
- **Orders**: Track and update order status
- **Analytics**: Business performance insights
- **Settings**: Restaurant configuration

## Data Storage

The website uses browser localStorage for data persistence:
- Menu items are stored in `craveMenuItems`
- Reservations are stored in `craveReservations`
- Cart data is stored in `craveCart`

## Customization

### Colors and Branding
The website uses a consistent color scheme:
- Primary: #FF9900 (Orange)
- Secondary: #222 (Dark Gray)
- Accent: #FFB347 (Light Orange)

### Adding Menu Items
1. Go to Admin Panel → Menu Management
2. Click "Add New Item"
3. Fill in the details (name, category, description, price, image)
4. Save the item

### Modifying Restaurant Information
1. Go to Admin Panel → Settings
2. Update restaurant details, hours, or contact information
3. Save changes

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Future Enhancements

- Backend integration with database
- Payment processing
- Email notifications
- Advanced analytics
- Customer accounts
- Online ordering system
- Inventory management
- Staff management

## Support

For technical support or questions about the website functionality, please refer to the documentation or contact the development team.

---

**Note**: This is a frontend-only implementation using localStorage for data persistence. For production use, consider integrating with a backend server and database for secure data storage and management. 