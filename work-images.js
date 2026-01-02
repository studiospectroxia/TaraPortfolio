// Map projects to their case study hero images
const projectHeroImages = {
    'case-study-supr.html': 'Case studies/SUPR/SUPR-Web-Banner.jpg.webp',
    'case-study-fm-orry.html': 'Case studies/Flying Machine x Orry/Hey Delhi, it’s SHOWTIME! 🔥Orry is taking over DLF Mall of India today, September 28th at 4 PM!.mp4',
    'case-study-shangri-la.html': 'Case studies/SHANGRILA_/01.-BL-Story-Set-2.png.webp',
    'case-study-suneet-verma.html': 'Case studies/SUNEET VARMA/Screenshot-2025-03-06-at-1.17.31 AM-min.png.webp',
    'case-study-furlicks.html': 'Case studies/FURLICKS/Furlicks-All-Product-Shots_result-scaled.jpg',
    'case-study-boulevard.html': 'Case studies/The Boulevard/BLVD-WEBSITE-BANNER.jpg.webp',
    'case-study-olive.html': 'Case studies/OLIVE/Shaken, stirred, and served with a little Olive charm 🌿.mp4', // Video hero
    'case-study-sue-mue.html': 'Case studies/SUE MUE/The handcrafted grandeur of Sue Mue’s latest collection, Threads of Love, draws on the glorious .jpg',
    'case-study-golden-grain.html': 'Case studies/GOLDEN GRAIN/When the aroma draws a crowd and the flavors steal the spotlight — it’s not just a meal, it’s a .jpg',
    'case-study-joi.html': 'Case studies/JOI/Small-Cargo-Truck-Mockup.jpg',
    'case-study-blur-the-border.html': 'Case studies/BLUR THE BORDER/Blur-The-Border-Website.jpg',
    'case-study-amari-raaya.html': 'Case studies/AMARI RAAYA/22DA0BCE-4E6F-4B7D-85D1-BE26FEBB1708.jpg'
};

function encodeFilePath(path) {
    const segments = path.split('/');
    const encoded = segments.map(segment => encodeURIComponent(segment));
    return encoded.join('/');
}

// Update work page images
document.addEventListener('DOMContentLoaded', function() {
    // Update work page project images - replace all localhost URLs
    document.querySelectorAll('.project-card-link').forEach(link => {
        const href = link.getAttribute('href');
        if (projectHeroImages[href]) {
            const imageContainer = link.querySelector('.project-image');
            if (imageContainer) {
                const img = imageContainer.querySelector('img');
                const mediaPath = projectHeroImages[href];
                
                if (mediaPath.endsWith('.mp4')) {
                    // For videos, create a video element
                    if (img) {
                        const video = document.createElement('video');
                        video.muted = true;
                        video.loop = true;
                        video.playsInline = true;
                        video.autoplay = true;
                        video.preload = 'metadata';
                        video.style.width = '100%';
                        video.style.height = '100%';
                        video.style.objectFit = 'cover';
                        video.style.display = 'block';
                        
                        const source = document.createElement('source');
                        const encodedPath = encodeFilePath(mediaPath);
                        source.src = encodedPath;
                        source.type = 'video/mp4';
                        video.appendChild(source);
                        
                        // Replace img with video
                        img.parentNode.replaceChild(video, img);
                        
                        // Try to play video
                        setTimeout(() => {
                            video.play().catch(e => {
                                console.log('Video autoplay prevented:', e);
                            });
                        }, 100);
                    }
                } else {
                    // For images, update src normally
                    if (img) {
                        const encodedPath = encodeFilePath(mediaPath);
                        img.src = encodedPath;
                        img.onerror = function() {
                            console.error('Failed to load image:', encodedPath);
                        };
                    }
                }
            }
        }
    });
    
    // Also replace any remaining localhost URLs in work page
    document.querySelectorAll('.project-image img[src*="localhost:3845"]').forEach(img => {
        const link = img.closest('.project-card-link');
        if (link) {
            const href = link.getAttribute('href');
            if (projectHeroImages[href]) {
                const mediaPath = projectHeroImages[href];
                if (mediaPath.endsWith('.mp4')) {
                    // Convert to video
                    const video = document.createElement('video');
                    video.muted = true;
                    video.loop = true;
                    video.playsInline = true;
                    video.autoplay = true;
                    video.preload = 'metadata';
                    video.style.width = '100%';
                    video.style.height = '100%';
                    video.style.objectFit = 'cover';
                    video.style.display = 'block';
                    
                    const source = document.createElement('source');
                    source.src = encodeFilePath(mediaPath);
                    source.type = 'video/mp4';
                    video.appendChild(source);
                    
                    img.parentNode.replaceChild(video, img);
                    setTimeout(() => {
                        video.play().catch(e => console.log('Video autoplay prevented:', e));
                    }, 100);
                } else {
                    const encodedPath = encodeFilePath(mediaPath);
                    img.src = encodedPath;
                }
            }
        }
    });
    
    // Update homepage work section images
    const homepageProjects = {
        'SUPR': 'Case studies/SUPR/SUPR-Web-Banner.jpg.webp',
        'Shangri-La': 'Case studies/SHANGRILA_/01.-BL-Story-Set-2.png.webp',
        'Furlicks': 'Case studies/FURLICKS/Furlicks-All-Product-Shots_result-scaled.jpg'
    };
    
    // Update homepage work section images
    document.querySelectorAll('#work .project-item').forEach((item, index) => {
        const title = item.querySelector('.project-title')?.textContent || '';
        const img = item.querySelector('.project-image img');
        if (img) {
            if (title.includes('SUPR')) {
                img.src = encodeFilePath(homepageProjects['SUPR']);
            } else if (title.includes('Shangri-La') || title.includes('Burger & Lobster')) {
                img.src = encodeFilePath(homepageProjects['Shangri-La']);
            } else if (title.includes('Furlicks')) {
                img.src = encodeFilePath(homepageProjects['Furlicks']);
            }
        }
    });
    
    // Also update by data attribute if present
    document.querySelectorAll('img[data-project="supr"]').forEach(img => {
        img.src = encodeFilePath(homepageProjects['SUPR']);
    });
    
    document.querySelectorAll('img[data-project="shangri-la"]').forEach(img => {
        img.src = encodeFilePath(homepageProjects['Shangri-La']);
    });
    
    document.querySelectorAll('img[data-project="furlicks"]').forEach(img => {
        img.src = encodeFilePath(homepageProjects['Furlicks']);
    });
});

