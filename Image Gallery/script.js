document.addEventListener('DOMContentLoaded', function() {
    // Gallery data
    const galleryData = [
        { 
            src: '318375-nature-landscape-lake-mountain-forest-wildflowers-spring-pine_trees-path-Switzerland-HDR.jpg', 
            alt: 'Nature Landscape', 
            category: 'nature',
            title: 'Beautiful Nature',
            description: 'Scenic view of mountains and lakes'
        },
        { 
            src: 'R.jpeg', 
            alt: 'Modern Building', 
            category: 'architecture',
            title: 'Modern Architecture',
            description: 'Contemporary building design'
        },
        { 
            src: 'OIP.jpeg', 
            alt: 'Portrait', 
            category: 'people',
            title: 'Human Portrait',
            description: 'Close-up portrait of a person'
        },
        { 
            src: 'forest.jpeg', 
            alt: 'Forest', 
            category: 'nature',
            title: 'Dense Forest',
            description: 'Sunlight through the trees'
        },
        { 
            src: 'bridge.jpeg', 
            alt: 'Bridge', 
            category: 'architecture',
            title: 'Historic Bridge',
            description: 'Ancient stone bridge over river'
        },
        { 
            src: 'family.jpeg', 
            alt: 'Family', 
            category: 'people',
            title: 'Happy Family',
            description: 'Family enjoying time together'
        },
        { 
            src: 'waterfall.jpeg', 
            alt: 'Waterfall', 
            category: 'nature',
            title: 'Majestic Waterfall',
            description: 'Powerful waterfall in the jungle'
        },
        { 
            src: 'skyline.jpeg', 
            alt: 'Skyscraper', 
            category: 'architecture',
            title: 'City Skyline',
            description: 'Tall buildings in the city center'
        },
        { 
            src: 'child.jpeg', 
            alt: 'Child', 
            category: 'people',
            title: 'Playing Child',
            description: 'Child playing in the park'
        },
        { 
            src: 'mountain.jpeg', 
            alt: 'Mountain', 
            category: 'nature',
            title: 'Snowy Peak',
            description: 'High mountain with snow cap'
        },
        { 
            src: 'gothic.jpeg', 
            alt: 'Cathedral', 
            category: 'architecture',
            title: 'Gothic Cathedral',
            description: 'Historic religious building'
        },
        { 
            src: 'couple.jpeg', 
            alt: 'Couple', 
            category: 'people',
            title: 'Romantic Couple',
            description: 'Couple walking on the beach'
        }
    ];

    // DOM Elements
    const gallery = document.querySelector('.gallery');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const imageInfo = document.getElementById('image-info');

    // Variables
    let currentImageIndex = 0;
    let filteredImages = [];

    // Initialize the gallery
    function initGallery() {
        renderGallery(galleryData);
        filteredImages = galleryData;
        
        // Set up filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter images
                const filter = button.dataset.filter;
                if (filter === 'all') {
                    filteredImages = galleryData;
                } else {
                    filteredImages = galleryData.filter(image => image.category === filter);
                }
                
                renderGallery(filteredImages);
            });
        });
    }

    // Render gallery items
    function renderGallery(images) {
        gallery.innerHTML = '';
        
        images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${image.category}`;
            
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" class="gallery-img">
                <div class="image-caption">
                    <h3>${image.title}</h3>
                    <p>${image.description}</p>
                </div>
            `;
            
            galleryItem.addEventListener('click', () => openLightbox(index));
            gallery.appendChild(galleryItem);
        });
    }

    // Open lightbox with selected image
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightbox();
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Update lightbox content
    function updateLightbox() {
        const image = filteredImages[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
        imageInfo.innerHTML = `
            <h3>${image.title}</h3>
            <p>${image.description}</p>
            <p>Category: ${image.category.charAt(0).toUpperCase() + image.category.slice(1)}</p>
        `;
    }

    // Navigate to previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        updateLightbox();
    }

    // Navigate to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
        updateLightbox();
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('show')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });

    // Initialize the gallery
    initGallery();
});