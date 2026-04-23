// Marvel Universe page specific JavaScript
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
    
    // Phase toggle
    window.togglePhase = function(header) {
        const phaseCard = header.closest('.phase-card');
        const content = phaseCard.querySelector('.phase-content');
        const toggle = header.querySelector('.phase-toggle');
        
        phaseCard.classList.toggle('expanded');
        
        if (phaseCard.classList.contains('expanded')) {
            content.style.maxHeight = content.scrollHeight + 'px';
            toggle.style.transform = 'rotate(180deg)';
        } else {
            content.style.maxHeight = '0';
            toggle.style.transform = 'rotate(0)';
        }
    };
    
    // Comic read toggle
    window.toggleComicRead = function(checkbox) {
        const comicId = checkbox.dataset.id;
        const stored = localStorage.getItem(STORAGE_KEY);
        const progress = stored ? JSON.parse(stored) : {};
        
        progress[comicId] = checkbox.checked;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        
        const item = checkbox.closest('.comic-item');
        if (item) {
            if (checkbox.checked) {
                item.classList.add('read');
            } else {
                item.classList.remove('read');
            }
        }
        
        updateProgress();
    };
    
    // Initialize checkboxes from storage
    function initCheckboxes() {
        const stored = localStorage.getItem(STORAGE_KEY);
        const progress = stored ? JSON.parse(stored) : {};
        
        document.querySelectorAll('.read-checkbox').forEach(checkbox => {
            const comicId = checkbox.dataset.id;
            if (progress[comicId]) {
                checkbox.checked = true;
                const item = checkbox.closest('.comic-item');
                if (item) item.classList.add('read');
            }
        });
    }
    
    // Update progress bar
    function updateProgress() {
        const checkboxes = document.querySelectorAll('.read-checkbox');
        const total = checkboxes.length;
        const checked = document.querySelectorAll('.read-checkbox:checked').length;
        const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;
        
        const progressEl = document.getElementById('marvelProgress');
        const progressFill = document.getElementById('marvelProgressFill');
        
        if (progressEl) {
            progressEl.textContent = `${checked} / ${total} comics read`;
        }
        if (progressFill) {
            progressFill.style.width = percentage + '%';
        }
    }
    
    // Search functionality
    const searchInput = document.getElementById('marvelSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            document.querySelectorAll('.comic-item').forEach(item => {
                const text = item.textContent.toLowerCase();
                if (query === '' || text.includes(query)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide phases based on visible items
            document.querySelectorAll('.phase-card').forEach(phase => {
                const visibleItems = phase.querySelectorAll('.comic-item:not([style*="display: none"])');
                phase.style.display = visibleItems.length > 0 || query === '' ? '' : 'none';
            });
        });
    }
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            document.querySelectorAll('.comic-item').forEach(item => {
                const category = item.dataset.category || '';
                if (filter === 'all' || category.includes(filter)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Expand All / Collapse All
    window.expandAll = function() {
        document.querySelectorAll('.phase-card').forEach(phase => {
            const content = phase.querySelector('.phase-content');
            const toggle = phase.querySelector('.phase-toggle');
            phase.classList.add('expanded');
            content.style.maxHeight = content.scrollHeight + 'px';
            if (toggle) toggle.style.transform = 'rotate(180deg)';
        });
    };
    
    window.collapseAll = function() {
        document.querySelectorAll('.phase-card').forEach(phase => {
            const content = phase.querySelector('.phase-content');
            const toggle = phase.querySelector('.phase-toggle');
            phase.classList.remove('expanded');
            content.style.maxHeight = '0';
            if (toggle) toggle.style.transform = 'rotate(0)';
        });
    };
    
    initCheckboxes();
    updateProgress();
});
