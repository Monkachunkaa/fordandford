document.addEventListener('DOMContentLoaded', function() {
    // Initialize property filters
    initPropertyFilters();
    
    // Setup galleries and clickable images
    setupGalleries();
});

function initPropertyFilters() {
    const filterButton = document.querySelector('.filter-button');
    const propertyTypeSelect = document.getElementById('property-type');
    const bedroomsSelect = document.getElementById('bedrooms');
    const propertyCards = document.querySelectorAll('.property-card');
    
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            const typeFilter = propertyTypeSelect.value;
            const bedroomsFilter = bedroomsSelect.value;
            
            propertyCards.forEach(card => {
                // Get data attributes for filtering
                const type = card.getAttribute('data-type');
                const bedrooms = card.getAttribute('data-bedrooms');
                
                // Check if card matches all selected filters
                const matchesType = typeFilter === 'all' || type === typeFilter;
                const matchesBedrooms = bedroomsFilter === 'all' || bedrooms === bedroomsFilter;
                
                // Show or hide card based on filter matches
                if (matchesType && matchesBedrooms) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Scroll to top of properties list
            document.querySelector('.properties-list').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Reset filters when page loads
    if (propertyTypeSelect) propertyTypeSelect.value = 'all';
    if (bedroomsSelect) bedroomsSelect.value = 'all';
}

function setupGalleries() {
    // Get all property cards
    const propertyCards = document.querySelectorAll('.property-card');
    
    // Process each property card
    propertyCards.forEach(card => {
        // Get elements
        const galleryId = card.querySelector('.gallery-button').getAttribute('href').substring(1);
        const gallery = document.getElementById(galleryId);
        const galleryButton = card.querySelector('.gallery-button');
        const propertyImage = card.querySelector('.property-image');
        
        // Initialize lightGallery
        if (gallery && typeof lightGallery !== 'undefined') {
            const lgInstance = lightGallery(gallery, {
                selector: '.gallery-item',
                download: false,
                counter: true,
                slideEndAnimation: true,
                hideBarsDelay: 3000,
                controls: true
            });
            
            // Function to open gallery
            const openGallery = function(e) {
                e.preventDefault();
                gallery.querySelector('.gallery-item').click();
            };
            
            // Add click handlers
            galleryButton.addEventListener('click', openGallery);
            propertyImage.addEventListener('click', openGallery);
        }
    });
}

// Add animation to property cards on scroll
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
    
    document.querySelectorAll('.property-card').forEach(card => {
        observer.observe(card);
    });
};

// Call animate on scroll function
animateOnScroll(); 