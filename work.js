// Work Page Filter Functionality

document.addEventListener('DOMContentLoaded', function() {
    const industryFilters = document.querySelectorAll('#industryFilters .filter-btn');
    const roleFilters = document.querySelectorAll('#roleFilters .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    let selectedIndustry = 'all';
    let selectedRole = 'all';
    
    // Industry Filter Handler
    industryFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all industry buttons
            industryFilters.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update selected industry
            selectedIndustry = this.getAttribute('data-industry');
            // Filter projects
            filterProjects();
        });
    });
    
    // Role Filter Handler
    roleFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all role buttons
            roleFilters.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update selected role
            selectedRole = this.getAttribute('data-role');
            // Filter projects
            filterProjects();
        });
    });
    
    // Filter Projects Function
    function filterProjects() {
        projectCards.forEach(card => {
            const cardIndustry = card.getAttribute('data-industry');
            const cardRoles = card.getAttribute('data-role').split(',').map(r => r.trim());
            
            // Industry matching logic with aliases
            let industryMatch = false;
            if (selectedIndustry === 'all') {
                industryMatch = true;
            } else if (selectedIndustry === 'hospitality-fnb') {
                // Hospitality & F&B should match both hospitality and fnb
                industryMatch = cardIndustry === 'hospitality' || cardIndustry === 'fnb' || cardIndustry === 'hospitality-fnb';
            } else if (selectedIndustry === 'fmcg-wellness') {
                // FMCG / Wellness should match fmcg-wellness, fmcg, and wellness variations
                industryMatch = cardIndustry === 'fmcg-wellness' || cardIndustry === 'fmcg' || cardIndustry.includes('wellness');
            } else {
                industryMatch = cardIndustry === selectedIndustry;
            }
            
            // Role matching
            const roleMatch = selectedRole === 'all' || cardRoles.includes(selectedRole);
            
            // Show or hide card based on filters
            if (industryMatch && roleMatch) {
                card.classList.remove('hidden', 'fade-out');
                card.style.display = 'flex';
                // Trigger fade-in animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                // Fade out animation
                card.classList.add('fade-out');
                setTimeout(() => {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Animate grid layout change
        const grid = document.getElementById('projectsGrid');
        grid.style.transition = 'all 0.3s ease';
    }
    
    // Initialize - show all projects
    filterProjects();
    
    // Smooth scroll to top when filters change (optional)
    const handleFilterChange = () => {
        const firstVisibleCard = Array.from(projectCards).find(card => 
            !card.classList.contains('hidden')
        );
        if (firstVisibleCard) {
            firstVisibleCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    // Add scroll to top on filter change (optional - uncomment if needed)
    // industryFilters.forEach(btn => {
    //     btn.addEventListener('click', handleFilterChange);
    // });
    // roleFilters.forEach(btn => {
    //     btn.addEventListener('click', handleFilterChange);
    // });
});

// Add smooth animations for project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all project cards
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
});

