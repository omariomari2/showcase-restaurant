// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('.nav-links a');
    const loginBtn = document.querySelector('.btn-login');
    const signupBtn = document.querySelector('.btn-signup');

    // Toggle mobile menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navRight.classList.toggle('active');
        document.body.style.overflow = navRight.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking on a nav item or button
    function closeMenu() {
        if (hamburger.classList.contains('active')) {
            toggleMenu();
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    if (loginBtn) loginBtn.addEventListener('click', closeMenu);
    if (signupBtn) signupBtn.addEventListener('click', closeMenu);

    // Update active link on scroll
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Initial call to set active link on page load
    updateActiveLink();
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && navRight.classList.contains('active')) {
            closeMenu();
        }
    });
});
