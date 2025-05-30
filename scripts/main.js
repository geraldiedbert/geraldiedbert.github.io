// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

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
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'var(--background)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Book Review Toggle
document.querySelectorAll('.review-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const review = button.nextElementSibling;
        const isActive = review.classList.contains('active');
        
        // Toggle the current review
        review.classList.toggle('active');
        
        // Update button text
        button.textContent = isActive ? 'Read Review' : 'Hide Review';
        
        // Smooth scroll to review if opening
        if (!isActive) {
            review.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});

// Books Slider
const booksTrack = document.querySelector('.books-track');
const bookCards = document.querySelectorAll('.book-card');
const prevButton = document.querySelector('.slider-prev');
const nextButton = document.querySelector('.slider-next');

let currentIndex = 0;
const cardWidth = 400; // Width of each card including gap
const gap = 32; // Gap between cards

function updateSlider() {
    const offset = currentIndex * -(cardWidth + gap);
    booksTrack.style.transform = `translateX(${offset}px)`;
    
    // Update active state
    bookCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentIndex);
    });
}

function slideNext() {
    if (currentIndex < bookCards.length - 1) {
        currentIndex++;
        updateSlider();
    }
}

function slidePrev() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
}

// Event listeners for slider controls
prevButton.addEventListener('click', slidePrev);
nextButton.addEventListener('click', slideNext);

// Initialize slider
updateSlider();

// Optional: Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        slidePrev();
    } else if (e.key === 'ArrowRight') {
        slideNext();
    }
}); 