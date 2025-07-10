document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init('3bZXI322cqKC56DBj');
    
    // Initialize contact form submission
    initContactForm();
    
    // Handle URL fragment for scrolling to form
    handleUrlFragment();
    
    // Call animate on scroll (now using the global function from main.js)
    if (typeof animateOnScroll === 'function') {
        animateOnScroll();
    }
});

function handleUrlFragment() {
    // Check if URL has #contactform fragment
    if (window.location.hash === '#contactform') {
        scrollToContactForm();
    }
}

function scrollToContactForm() {
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    
    if (contactForm) {
        // Scroll to the form
        contactForm.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Focus on the first input field after a short delay
        // (to ensure the scroll has completed)
        setTimeout(() => {
            if (nameInput) {
                nameInput.focus();
            }
        }, 800);
    }
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.querySelector('.form-response');
    const submitButton = document.querySelector('.submit-button');
    
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
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            showFormResponse('Sending your message...', 'success');
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                name: name,
                email: email,
                phone: phone || 'Not provided',
                message: message + '\n\nInquiry Type: ' + inquiryType
            };
            
            // Send email using EmailJS
            emailjs.send('honeybee_gmail_service', 'notif_to_ryan', templateParams)
                .then(function(response) {
                    console.log('Email sent successfully:', response);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    showFormResponse('Thank you for contacting us! We will get back to you shortly.', 'success');
                    
                    // Re-enable submit button
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                    
                }, function(error) {
                    console.error('Email sending failed:', error);
                    
                    // Show error message
                    showFormResponse('Sorry, there was an error sending your message. Please try again or call us directly.', 'error');
                    
                    // Re-enable submit button
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                });
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