// About page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Review Carousel Functionality
    const carouselTrack = document.querySelector('.review-carousel-track');
    const reviewImages = document.querySelectorAll('.review-image');
    
    if (!carouselTrack || reviewImages.length === 0) return;
    
    let currentIndex = 0;
    const totalReviews = reviewImages.length;
    
    function updateCarousel() {
        // Remove all state classes
        reviewImages.forEach((img) => {
            img.classList.remove('prev', 'active', 'next', 'hidden');
        });
        
        // Update classes based on position relative to current
        reviewImages.forEach((img, index) => {
            if (index === currentIndex) {
                img.classList.add('active');
            } else if (index === (currentIndex - 1 + totalReviews) % totalReviews) {
                img.classList.add('prev');
            } else if (index === (currentIndex + 1) % totalReviews) {
                img.classList.add('next');
            } else {
                img.classList.add('hidden');
            }
        });
        
        // Calculate offset to center the active item
        const carouselContainer = document.querySelector('.review-carousel');
        const activeImage = reviewImages[currentIndex];
        
        if (activeImage && carouselContainer) {
            const containerRect = carouselContainer.getBoundingClientRect();
            const activeRect = activeImage.getBoundingClientRect();
            const trackRect = carouselTrack.getBoundingClientRect();
            
            // Calculate how much to shift to center the active image
            const containerCenter = containerRect.width / 2;
            const activeCenter = activeRect.left - trackRect.left + activeRect.width / 2;
            const offset = containerCenter - activeCenter;
            
            carouselTrack.style.transform = `translateX(${offset}px)`;
        }
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalReviews;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalReviews) % totalReviews;
        updateCarousel();
    }
    
    // Click on next/prev images to navigate
    reviewImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            if (index === (currentIndex + 1) % totalReviews) {
                nextSlide();
            } else if (index === (currentIndex - 1 + totalReviews) % totalReviews) {
                prevSlide();
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const carouselContainer = document.querySelector('.review-carousel-container');
        if (!carouselContainer) return;
        
        const rect = carouselContainer.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            }
        }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carouselTrack.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next
                nextSlide();
            } else {
                // Swipe right - prev
                prevSlide();
            }
        }
    }
    
    // Initialize carousel
    updateCarousel();
    
    // Auto-play with pause on hover
    let autoPlayInterval = setInterval(nextSlide, 2000);
    
    const carouselContainer = document.querySelector('.review-carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 2000);
        });
    }
    
    // Pause on touch/interaction
    let isPaused = false;
    
    function pauseAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            isPaused = true;
        }
    }
    
    function resumeAutoPlay() {
        if (isPaused && carouselContainer) {
            const rect = carouselContainer.getBoundingClientRect();
            const isHovered = rect.top <= 0 || rect.bottom >= window.innerHeight;
            if (!isHovered) {
                autoPlayInterval = setInterval(nextSlide, 2000);
                isPaused = false;
            }
        }
    }
    
    // Pause when user interacts
    reviewImages.forEach((img) => {
        img.addEventListener('click', pauseAutoPlay);
    });
    
    // Resume after a delay when user stops interacting
    let resumeTimeout;
    document.addEventListener('mousemove', function() {
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            if (isPaused && carouselContainer) {
                const rect = carouselContainer.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                if (isVisible) {
                    resumeAutoPlay();
                }
            }
        }, 5000);
    });
});
