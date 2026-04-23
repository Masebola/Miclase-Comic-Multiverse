// Essential Reads page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const STORAGE_KEY = 'miclaseComicProgress';
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbarNav = document.getElementById('navbarNav');
    
    if (mobileMenuBtn && navbarNav) {
        mobileMenuBtn.addEventListener('click', function() {
            navbarNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Tab switching
    window.switchTab = function(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Find and activate the correct tab button
        document.querySelectorAll('.tab-btn').forEach(btn => {
            if (btn.textContent.toLowerCase().includes(tabName)) {
                btn.classList.add('active');
            }
        });
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const targetTab = document.getElementById(tabName + '-tab');
        if (targetTab) {
            targetTab.classList.add('active');
        }
    };
    
    // Toggle read status
    window.toggleRead = function(checkbox) {
        const item = checkbox.closest('.reading-item');
        const title = item.querySelector('.reading-title')?.textContent || '';
        const comicId = 'essential-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        const stored = localStorage.getItem(STORAGE_KEY);
        const progress = stored ? JSON.parse(stored) : {};
        
        const isRead = checkbox.classList.toggle('checked');
        progress[comicId] = isRead;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        
        if (isRead) {
            item.classList.add('read');
        } else {
            item.classList.remove('read');
        }
    };
    
    // Initialize read states
    function initReadStates() {
        const stored = localStorage.getItem(STORAGE_KEY);
        const progress = stored ? JSON.parse(stored) : {};
        
        document.querySelectorAll('.reading-item').forEach(item => {
            const title = item.querySelector('.reading-title')?.textContent || '';
            const comicId = 'essential-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-');
            
            if (progress[comicId]) {
                const checkbox = item.querySelector('.reading-checkbox');
                if (checkbox) checkbox.classList.add('checked');
                item.classList.add('read');
            }
        });
    }
    
    initReadStates();
});
