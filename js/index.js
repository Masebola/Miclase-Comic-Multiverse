// Index page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbarNav = document.getElementById('navbarNav');
    
    if (mobileMenuBtn && navbarNav) {
        mobileMenuBtn.addEventListener('click', function() {
            navbarNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Update progress stats from localStorage
    function updateTotalProgress() {
        const STORAGE_KEY = 'miclaseComicProgress';
        const stored = localStorage.getItem(STORAGE_KEY);
        const progress = stored ? JSON.parse(stored) : {};
        const readCount = Object.values(progress).filter(v => v).length;
        
        const progressEl = document.getElementById('totalProgress');
        const progressFill = document.getElementById('progressFill');
        
        // Estimate total comics (can be updated with actual count)
        const totalComics = 500;
        const percentage = Math.min((readCount / totalComics) * 100, 100);
        
        if (progressEl) {
            progressEl.textContent = `${readCount} / ${totalComics} comics read`;
        }
        if (progressFill) {
            progressFill.style.width = percentage + '%';
        }
    }
    
    updateTotalProgress();
    
    // Animate cards on scroll
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});
