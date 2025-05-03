document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ accordion
    initFAQAccordion();
    
    // Initialize contact form submission
    initContactForm();
});

function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all accordion items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // If this item wasn't active before, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.querySelector('.form-response');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const inquiryType = document.getElementById('inquiry-type').value;
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !message || !inquiryType) {
                showFormResponse('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showFormResponse('Please enter a valid email address.', 'error');
                return;
            }
            
            // In a real scenario, you would send the form data to your server here
            // For demo purposes, we'll simulate a successful submission
            
            // Simulate form submission with a timeout to mimic server request
            showFormResponse('Sending your message...', 'success');
            
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                showFormResponse('Thank you for contacting us! We will get back to you shortly.', 'success');
            }, 1500);
        });
    }
}

function showFormResponse(message, type) {
    const formResponse = document.querySelector('.form-response');
    
    if (formResponse) {
        formResponse.textContent = message;
        formResponse.className = 'form-response';
        formResponse.classList.add(type);
        
        // Scroll to the response if not visible
        formResponse.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
}

function isValidEmail(email) {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add animation on scroll for testimonial items
const animateOnScroll = function() {
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
    
    document.querySelectorAll('.testimonial-item, .contact-method, .faq-item').forEach(element => {
        observer.observe(element);
    });
};

// Call animate on scroll function
animateOnScroll(); 