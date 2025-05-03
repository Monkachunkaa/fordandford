document.addEventListener('DOMContentLoaded', function() {
    // Initialize property filters
    initPropertyFilters();
    
    // Setup galleries and clickable images
    setupGalleries();
    
    // Call animate on scroll (now using the global function from main.js)
    if (typeof animateOnScroll === 'function') {
        animateOnScroll();
    }
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
    // Process each gallery button
    document.querySelectorAll('.gallery-button').forEach(button => {
        // Get elements
        const galleryId = button.getAttribute('href').substring(1);
        const gallery = document.getElementById(galleryId);
        const propertyCard = button.closest('.property-card');
        const propertyImage = propertyCard.querySelector('.property-image');
        
        // Initialize lightGallery if available
        if (gallery && typeof lightGallery !== 'undefined') {
            lightGallery(gallery, {
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
            button.addEventListener('click', openGallery);
            propertyImage.addEventListener('click', openGallery);
        }
    });
} 