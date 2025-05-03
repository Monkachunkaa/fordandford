document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    if (mobileNavToggle && nav) {
        mobileNavToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling to document
            nav.classList.toggle('active');
            body.classList.toggle('menu-open');
            const isExpanded = nav.classList.contains('active');
            
            // Change icon based on state
            this.innerHTML = isExpanded ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
            
            // Set aria attributes for accessibility
            this.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav && nav.contains(event.target);
        const isClickOnToggle = mobileNavToggle && mobileNavToggle.contains(event.target);
        
        if (nav && nav.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
            nav.classList.remove('active');
            body.classList.remove('menu-open');
            if (mobileNavToggle) {
                mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Close mobile nav when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                body.classList.remove('menu-open');
                if (mobileNavToggle) {
                    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value.trim() !== '') {
                // Here you would typically send this to your backend
                // For demo purposes, we'll just show an alert
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Add animation on scroll using Intersection Observer
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .benefit-item, .property-card, .testimonial-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Call animate on scroll function
    animateOnScroll();
}); 