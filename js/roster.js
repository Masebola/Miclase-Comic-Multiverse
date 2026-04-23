// Character Roster page specific JavaScript
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
    
    // Universe switching
    window.switchUniverse = function(universeId) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Find and activate the correct tab button
        const activeBtn = document.querySelector(`[onclick*="${universeId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const targetTab = document.getElementById(universeId);
        if (targetTab) {
            targetTab.classList.add('active');
        }
    };
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            document.querySelectorAll('.roster-item').forEach(item => {
                const text = item.textContent.toLowerCase();
                if (query === '' || text.includes(query)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});
