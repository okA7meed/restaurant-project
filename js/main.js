// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.sticky-header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu with Buttons
const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

// Clone buttons for mobile menu
const headerButtons = document.querySelector('.header-buttons');
const mobileButtons = headerButtons.cloneNode(true);
mobileButtons.classList.add('mobile-buttons');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Add/remove buttons in mobile menu
    if (navMenu.classList.contains('active')) {
        navMenu.appendChild(mobileButtons);
    } else {
        if (navMenu.contains(mobileButtons)) {
            navMenu.removeChild(mobileButtons);
        }
    }
});

// Close menu when clicking on links or buttons
const navItems = document.querySelectorAll('.nav-menu a, .header-buttons button');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (navMenu.contains(mobileButtons)) {
            navMenu.removeChild(mobileButtons);
        }
    });
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Updated Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dotsContainer = document.querySelector('.testimonial-dots');
const prevBtn = document.querySelector('.prev-testimonial');
const nextBtn = document.querySelector('.next-testimonial');

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Event listeners
nextBtn.addEventListener('click', nextTestimonial);
prevBtn.addEventListener('click', prevTestimonial);

// Auto-rotate testimonials every 5 seconds
let sliderInterval = setInterval(nextTestimonial, 5000);

// Pause on hover
testimonialSlider = document.querySelector('.testimonial-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(sliderInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    sliderInterval = setInterval(nextTestimonial, 5000);
});

// Auto-rotate testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Form Submission
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        alert('تم استلام طلب الحجز بنجاح! سنتصل بك قريباً لتأكيد الحجز.');
        this.reset();
    });
}

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved user preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// Toggle theme function
themeToggle.addEventListener('click', function() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    document.body.classList.toggle('dark-mode', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
});

document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', function(e) {
    const nav = document.querySelector('.main-nav');
    const hamburger = document.querySelector('.hamburger-menu');
    
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('active');
        hamburger.classList.remove('open');
    }
});

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.main-nav').classList.remove('active');
        document.querySelector('.hamburger-menu').classList.remove('open');
    });
});


// التمرير إلى الأعلى عند تحميل الصفحة
window.addEventListener('load', function() {
    // الانتقال إلى القسم الرئيسي
    const homeSection = document.getElementById('home');
    if (homeSection) {
        window.scrollTo({
            top: homeSection.offsetTop,
            behavior: 'instant' // بدون تأثير حركي
        });
    }
    
    // أو الانتقال إلى أعلى الصفحة مباشرة
    window.scrollTo(0, 0);
});

// منع السلوك الافتراضي للروابط
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
