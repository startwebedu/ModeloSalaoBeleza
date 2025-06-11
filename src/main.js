// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background and hero fade on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    const scrollY = window.scrollY;
    
    // Header background change
    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    // Hero fade effect
    if (hero) {
        const heroHeight = hero.offsetHeight;
        const fadeStart = heroHeight * 0.3;
        const fadeEnd = heroHeight * 0.8;
        
        if (scrollY >= fadeStart && scrollY <= fadeEnd) {
            const fadeProgress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
            const opacity = 1 - fadeProgress;
            hero.style.opacity = Math.max(0, opacity);
        } else if (scrollY > fadeEnd) {
            hero.style.opacity = '0';
        } else {
            hero.style.opacity = '1';
        }
    }
});

// Gallery image hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Service cards animation on scroll - immediate visibility
const observerOptions = {
    threshold: 0.05,
    rootMargin: '50px 0px -20px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and testimonial cards with immediate visibility
document.querySelectorAll('.service-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(card);
});

// Gallery items - immediate visibility
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '1';
    item.style.transform = 'translateY(0)';
});

// WhatsApp button click tracking
document.querySelector('.whatsapp-float').addEventListener('click', () => {
    console.log('WhatsApp button clicked');
});

document.querySelectorAll('.whatsapp-button').forEach(button => {
    button.addEventListener('click', () => {
        console.log('WhatsApp CTA button clicked');
    });
});

// Form validation (if needed in future)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Improved image loading with immediate visibility for gallery
document.querySelectorAll('img').forEach(img => {
    // Gallery images should be immediately visible
    if (img.closest('.gallery-item')) {
        img.style.opacity = '1';
        img.style.transition = 'transform 0.3s ease';
        return;
    }
    
    // Other images with loading animation
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Parallax effect for hero section (reduced for better performance)
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Add smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
    revealObserver.observe(section);
});

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 5px rgba(231, 76, 60, 0.3) !important;
    }
`;
document.head.appendChild(style);

// Mobile touch improvements
if ('ontouchstart' in window) {
    document.querySelectorAll('.service-card, .testimonial-card, .contact-item').forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
            }, 150);
        });
    });
}

// Improved scroll to top for "Início" link
document.querySelector('a[href="#inicio"]').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});