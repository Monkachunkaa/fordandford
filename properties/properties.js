document.addEventListener('DOMContentLoaded', function() {
    // Initialize property filters
    initPropertyFilters();
    
    // Initialize lightGallery for property galleries
    initGalleries();
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

function initGalleries() {
    // Initialize each property gallery
    document.querySelectorAll('.property-gallery').forEach((gallery, index) => {
        if (typeof lightGallery !== 'undefined') {
            lightGallery(gallery, {
                selector: '.gallery-item',
                download: false,
                counter: true,
                slideEndAnimation: true,
                hideBarsDelay: 3000,
                controls: true
            });
            
            // Set up gallery button click handler
            const galleryButton = document.querySelectorAll('.gallery-button')[index];
            if (galleryButton) {
                galleryButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Trigger the first gallery item click
                    const firstGalleryItem = gallery.querySelector('.gallery-item');
                    if (firstGalleryItem) {
                        firstGalleryItem.click();
                    }
                });
            }
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