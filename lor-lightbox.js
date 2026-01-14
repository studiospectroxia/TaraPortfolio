// LOR Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    // LOR file paths - mapped to testimonial order
    const lorFiles = [
        'LOR\'s/Letter of Recommendation - Shivranjani (Tara) Anand.pdf', // Ruhani Mann - LOR
        'LOR\'s/Letter of Recommendation - Shivranjani (Tara) Anand.pdf', // Ruhani Mann - LOR
        'LOR\'s/RecommendationLetter_TaraAnand.pdf', // Ishita Aggarwal - AGENC
        'LOR\'s/Tara Anand - LR.pdf' // Ishita Aggarwal - LR
    ];
    
    // Function to encode file path properly
    function encodeLORPath(path) {
        // Split by forward slash and encode each segment
        const segments = path.split('/');
        return segments.map(segment => encodeURIComponent(segment)).join('/');
    }
    
    // Create lightbox HTML
    const lightboxHTML = `
        <div id="lor-lightbox" class="lor-lightbox" style="display: none;">
            <div class="lor-lightbox-overlay"></div>
            <div class="lor-lightbox-content">
                <button class="lor-lightbox-close" aria-label="Close">&times;</button>
                <div class="lor-lightbox-container">
                    <iframe id="lor-iframe" src="" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    const lightbox = document.getElementById('lor-lightbox');
    const closeBtn = document.querySelector('.lor-lightbox-close');
    const overlay = document.querySelector('.lor-lightbox-overlay');
    const iframe = document.getElementById('lor-iframe');
    
    // Open lightbox
    function openLOR(index) {
        if (lorFiles[index]) {
            // Encode the file path properly
            const encodedPath = encodeLORPath(lorFiles[index]);
            iframe.src = encodedPath;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            console.log('Opening LOR:', encodedPath);
        }
    }
    
    // Close lightbox
    function closeLOR() {
        lightbox.style.display = 'none';
        iframe.src = '';
        document.body.style.overflow = '';
    }
    
    // Map testimonials to LOR files
    // First testimonial (Ruhani Mann) -> Letter of Recommendation
    // Second testimonial (Ishita Aggarwal - AGENC) -> RecommendationLetter_TaraAnand.pdf
    // Third testimonial (Ishita Aggarwal) -> Tara Anand - LR.pdf
    const testimonialToLOR = {
        0: 0, // Ruhani Mann -> Letter of Recommendation
        1: 2, // Ishita Aggarwal (AGENC) -> RecommendationLetter_TaraAnand.pdf
        2: 3  // Ishita Aggarwal -> Tara Anand - LR.pdf
    };
    
    // Attach click handlers to LOR buttons
    document.querySelectorAll('.btn-testimonial').forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lorIndex = testimonialToLOR[index] !== undefined ? testimonialToLOR[index] : index;
            openLOR(lorIndex);
        });
    });
    
    // Close on button/overlay click
    closeBtn.addEventListener('click', closeLOR);
    overlay.addEventListener('click', closeLOR);
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLOR();
        }
    });
});

