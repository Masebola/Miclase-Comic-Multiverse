// Miclase Comic Multiverse - Main JavaScript

// Mobile Navigation Toggle
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Reading Progress Tracker
const STORAGE_KEY = 'miclaseComicProgress';

function getProgress() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function toggleComicRead(comicId, checkbox) {
    const progress = getProgress();
    progress[comicId] = checkbox.checked;
    saveProgress(progress);
    updateProgressStats();
    
    // Add visual feedback
    const card = checkbox.closest('.comic-card, .reading-item');
    if (card) {
        if (checkbox.checked) {
            card.classList.add('read');
        } else {
            card.classList.remove('read');
        }
    }
}

function initProgressTracking() {
    const progress = getProgress();
    
    document.querySelectorAll('.read-checkbox').forEach(checkbox => {
        const comicId = checkbox.dataset.comicId;
        if (progress[comicId]) {
            checkbox.checked = true;
            const card = checkbox.closest('.comic-card, .reading-item');
            if (card) card.classList.add('read');
        }
        
        checkbox.addEventListener('change', function() {
            toggleComicRead(comicId, this);
        });
    });
    
    updateProgressStats();
}

function updateProgressStats() {
    const progress = getProgress();
    const totalCheckboxes = document.querySelectorAll('.read-checkbox').length;
    const checkedCount = Object.values(progress).filter(v => v).length;
    
    const statsEl = document.querySelector('.progress-stats');
    if (statsEl && totalCheckboxes > 0) {
        const percentage = Math.round((checkedCount / totalCheckboxes) * 100);
        statsEl.innerHTML = `<span class="progress-text">Progress: ${checkedCount}/${totalCheckboxes} (${percentage}%)</span>`;
        
        // Update progress bar if exists
        const progressBar = document.querySelector('.progress-bar-fill');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
    }
}

// Phase Accordion
function initPhaseAccordions() {
    document.querySelectorAll('.phase-header').forEach(header => {
        header.addEventListener('click', () => {
            const phase = header.closest('.phase');
            const content = phase.querySelector('.phase-content');
            const icon = header.querySelector('.toggle-icon');
            
            phase.classList.toggle('expanded');
            
            if (phase.classList.contains('expanded')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.textContent = '−';
            } else {
                content.style.maxHeight = '0';
                if (icon) icon.textContent = '+';
            }
        });
    });
}

// Search Functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const items = document.querySelectorAll('.comic-card, .reading-item, .character-card');
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (query === '' || text.includes(query)) {
                item.style.display = '';
                item.classList.remove('hidden');
            } else {
                item.style.display = 'none';
                item.classList.add('hidden');
            }
        });
        
        // Update section visibility
        document.querySelectorAll('.phase, .era-section').forEach(section => {
            const visibleItems = section.querySelectorAll('.comic-card:not(.hidden), .reading-item:not(.hidden)');
            if (visibleItems.length === 0 && query !== '') {
                section.style.display = 'none';
            } else {
                section.style.display = '';
            }
        });
    });
}

// Filter by Category/Era
function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            const items = document.querySelectorAll('.comic-card, .phase');
            items.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter || item.dataset.era === filter) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Tab Navigation
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabGroup = tab.closest('.tab-container');
            const targetId = tab.dataset.tab;
            
            // Update active tab
            tabGroup.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show target content
            tabGroup.querySelectorAll('.tab-content').forEach(content => {
                if (content.id === targetId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Theme Toggle (Dark/Light mode)
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('miclaseTheme') || 'dark';
    document.body.dataset.theme = savedTheme;
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.dataset.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.dataset.theme = newTheme;
        localStorage.setItem('miclaseTheme', newTheme);
    });
}

// Reading List Export
function exportReadingList() {
    const progress = getProgress();
    const readComics = [];
    
    document.querySelectorAll('.read-checkbox:checked').forEach(checkbox => {
        const item = checkbox.closest('.comic-card, .reading-item');
        if (item) {
            const title = item.querySelector('.comic-title, .item-title')?.textContent || checkbox.dataset.comicId;
            readComics.push(title);
        }
    });
    
    const text = 'Miclase Comic Multiverse - Reading Progress\n\n' + 
                 'Comics Read:\n' + readComics.map(c => '- ' + c).join('\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'miclase-reading-progress.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Reset Progress
function resetProgress() {
    if (confirm('Are you sure you want to reset all reading progress? This cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEY);
        document.querySelectorAll('.read-checkbox').forEach(checkbox => {
            checkbox.checked = false;
            const card = checkbox.closest('.comic-card, .reading-item');
            if (card) card.classList.remove('read');
        });
        updateProgressStats();
    }
}

// Animate on Scroll
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.phase, .comic-card, .character-card, .era-section').forEach(el => {
        observer.observe(el);
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initProgressTracking();
    initPhaseAccordions();
    initSearch();
    initFilters();
    initTabs();
    initSmoothScroll();
    initBackToTop();
    initThemeToggle();
    initScrollAnimations();
    
    // Expose functions globally for onclick handlers
    window.exportReadingList = exportReadingList;
    window.resetProgress = resetProgress;
});
