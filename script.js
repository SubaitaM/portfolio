// Smooth section navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Update active nav link on click
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get target section
        const targetId = link.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);
        
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section with animation
        setTimeout(() => {
            targetSection.classList.add('active');
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });
});

// Update active nav based on scroll position
const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            
            // Update nav
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// Smooth reveal on scroll
const revealElements = document.querySelectorAll('.project-card, .blog-post');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Initialize first section
document.addEventListener('DOMContentLoaded', () => {
    const firstSection = document.querySelector('.section');
    if (firstSection) {
        firstSection.classList.add('active');
    }
});
