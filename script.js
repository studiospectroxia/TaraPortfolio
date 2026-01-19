// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Enhanced Intersection Observer for smooth animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for multiple elements
            setTimeout(() => {
                entry.target.classList.add('animated');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Enhanced animation system
document.addEventListener('DOMContentLoaded', function() {
    // Animate hero elements
    const heroGreeting = document.querySelector('.hero-greeting');
    const heroName = document.querySelector('.hero-name');
    const heroTagline = document.querySelector('.hero-tagline');
    
    if (heroGreeting) {
        setTimeout(() => {
            heroGreeting.style.animation = 'fadeInUp 0.8s ease-out';
        }, 100);
    }
    if (heroName) {
        setTimeout(() => {
            heroName.style.animation = 'fadeInScale 1s ease-out 0.2s backwards';
        }, 200);
    }
    if (heroTagline) {
        setTimeout(() => {
            heroTagline.style.animation = 'fadeInUp 0.8s ease-out 0.4s backwards';
        }, 300);
    }
    
    // Animate project items with stagger
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((el, index) => {
        el.classList.add('animate-on-scroll', 'fade-in-up');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Animate testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((el, index) => {
        el.classList.add('animate-on-scroll', 'fade-in-scale');
        el.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(el);
    });
    
    // Animate service items
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((el, index) => {
        el.classList.add('animate-on-scroll', 'fade-in-up');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Animate stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((el, index) => {
        el.classList.add('animate-on-scroll', 'fade-in-scale');
        el.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(el);
    });
    
    // Animate section headings
    const sectionHeadings = document.querySelectorAll('.stats-heading, .about-heading, .brands-heading, .services-heading');
    sectionHeadings.forEach((el, index) => {
        el.classList.add('animate-on-scroll', 'fade-in-up');
        observer.observe(el);
    });
    
    // Animate images
    const images = document.querySelectorAll('img:not(.hero-image):not(.phone-content):not(.gallery-image)');
    images.forEach((img, index) => {
        img.classList.add('animate-on-scroll', 'fade-in-scale');
        img.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(img);
    });
    
    // Animate buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-contact, .btn-testimonial');
    buttons.forEach((btn, index) => {
        btn.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Enhanced header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}, { passive: true });

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!hamburger || !mobileMenuOverlay) return;
    
    // Toggle menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking overlay
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            hamburger.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Initialize mobile menu on page load
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});

window.addEventListener('resize', function() {
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const hamburger = document.querySelector('.hamburger');
    
    // Close menu if resizing to desktop
    if (window.innerWidth > 768 && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Add loading="lazy" to images for better performance
document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
    }
    
    // Add smooth fade-in on image load
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in-out';
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    }
});

// Smooth page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Custom Resume Cursor
document.addEventListener('DOMContentLoaded', function() {
    const resumeCursor = document.getElementById('resumeCursor');
    if (!resumeCursor) return;
    
    const heroSection = document.querySelector('.hero');
    const aboutSection = document.querySelector('.about');
    const brandsSection = document.querySelector('.brands');
    const header = document.querySelector('.header');
    
    if (!heroSection || !aboutSection) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isOverNavbar = false;
    let isOverBrands = false;
    let isOverButton = false;
    
    // Update cursor position with smooth following
    function updateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        resumeCursor.style.left = cursorX + 'px';
        resumeCursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    // Check if cursor should be visible based on scroll position and hover state
    function checkCursorVisibility() {
        const scrollY = window.scrollY;
        const heroTop = heroSection.offsetTop;
        const heroBottom = heroTop + heroSection.offsetHeight;
        const aboutTop = aboutSection.offsetTop;
        const aboutBottom = aboutTop + aboutSection.offsetHeight;
        const brandsTop = brandsSection ? brandsSection.offsetTop : Infinity;
        
        // Hide cursor if over navbar or buttons
        if (isOverNavbar || isOverButton) {
            resumeCursor.classList.remove('active');
            resumeCursor.classList.add('fading');
            resumeCursor.style.opacity = '0';
            document.body.classList.remove('show-resume-cursor');
            return;
        }
        
        // Calculate fade progress when entering brands section
        let fadeProgress = 1;
        if (brandsSection && scrollY >= brandsTop - 200) {
            const scrollIntoBrands = scrollY - (brandsTop - 200);
            // Fade out over first 200px of scrolling into brands section
            fadeProgress = Math.max(0, 1 - (scrollIntoBrands / 200));
            isOverBrands = true;
            
            // Completely hide if scrolled past fade zone
            if (fadeProgress <= 0) {
                resumeCursor.classList.remove('active');
                resumeCursor.classList.add('fading');
                resumeCursor.style.opacity = '0';
                document.body.classList.remove('show-resume-cursor');
                return;
            }
        } else {
            isOverBrands = false;
        }
        
        // Show cursor if we're between hero start and about section end
        if (scrollY >= heroTop - 100 && scrollY <= aboutBottom) {
            // Apply fade progress if transitioning into brands
            if (fadeProgress < 1 && fadeProgress > 0) {
                resumeCursor.style.opacity = fadeProgress.toString();
                resumeCursor.classList.add('active');
                resumeCursor.classList.remove('fading');
                document.body.classList.add('show-resume-cursor');
            } else if (fadeProgress >= 1) {
                resumeCursor.classList.add('active');
                resumeCursor.classList.remove('fading');
                resumeCursor.style.opacity = '';
                document.body.classList.add('show-resume-cursor');
            }
        } else {
            resumeCursor.classList.remove('active');
            resumeCursor.classList.add('fading');
            resumeCursor.style.opacity = '0';
            document.body.classList.remove('show-resume-cursor');
        }
    }
    
    // Check if mouse is over navbar
    function checkNavbarHover(e) {
        if (!header) return;
        const headerRect = header.getBoundingClientRect();
        isOverNavbar = (
            e.clientY >= headerRect.top &&
            e.clientY <= headerRect.bottom &&
            e.clientX >= headerRect.left &&
            e.clientX <= headerRect.right
        );
        checkCursorVisibility();
    }
    
    // Check if mouse is over a button or link
    function checkButtonHover(e) {
        const target = e.target;
        // Check if hovering over buttons, links, or clickable elements
        isOverButton = (
            target.tagName === 'A' ||
            target.tagName === 'BUTTON' ||
            target.closest('a') !== null ||
            target.closest('button') !== null ||
            target.classList.contains('btn-primary') ||
            target.classList.contains('btn-contact') ||
            target.classList.contains('btn-service') ||
            target.classList.contains('btn-testimonial') ||
            target.classList.contains('nav-link') ||
            target.closest('.btn-primary') !== null ||
            target.closest('.btn-contact') !== null ||
            target.closest('.nav-link') !== null
        );
        checkCursorVisibility();
    }
    
    // Track mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Check if over navbar
        checkNavbarHover(e);
        
        // Check if over buttons
        checkButtonHover(e);
        
        // Check visibility on mouse move
        checkCursorVisibility();
    }, { passive: true });
    
    // Check visibility on scroll
    window.addEventListener('scroll', checkCursorVisibility, { passive: true });
    
    // Handle mouse enter/leave on header
    if (header) {
        header.addEventListener('mouseenter', function() {
            isOverNavbar = true;
            checkCursorVisibility();
        });
        
        header.addEventListener('mouseleave', function() {
            isOverNavbar = false;
            checkCursorVisibility();
        });
    }
    
    // Handle mouse enter/leave on buttons and links
    const buttonsAndLinks = document.querySelectorAll('a, button, .btn-primary, .btn-contact, .btn-service, .btn-testimonial, .nav-link');
    buttonsAndLinks.forEach(element => {
        element.addEventListener('mouseenter', function() {
            isOverButton = true;
            checkCursorVisibility();
        });
        
        element.addEventListener('mouseleave', function() {
            isOverButton = false;
            checkCursorVisibility();
        });
    });
    
    // Initial visibility check
    checkCursorVisibility();
    
    // Start cursor animation
    updateCursor();
    
    // Handle click - placeholder for resume functionality
    resumeCursor.addEventListener('click', function(e) {
        e.preventDefault();
        // TODO: Add resume display functionality here
        console.log('Resume clicked - functionality to be added');
        // Example: Could open a modal or PDF viewer here
    });
    
    // Make cursor clickable only when active
    resumeCursor.style.pointerEvents = 'none';
});