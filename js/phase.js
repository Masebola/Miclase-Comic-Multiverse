// Phase Reading Tracker
(function() {
  const checkboxes = document.querySelectorAll('.reading-checkbox');
  const storageKey = 'miclasePhaseProgress';
  
  // Load saved state
  function loadProgress() {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const progress = JSON.parse(saved);
      const pageKey = window.location.pathname;
      
      if (progress[pageKey]) {
        progress[pageKey].forEach((isChecked, index) => {
          if (checkboxes[index]) {
            if (isChecked) {
              checkboxes[index].classList.add('checked');
              checkboxes[index].closest('.reading-item').classList.add('completed');
            }
          }
        });
      }
    }
  }
  
  // Save state
  function saveProgress() {
    const pageKey = window.location.pathname;
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    const state = Array.from(checkboxes).map(cb => cb.classList.contains('checked'));
    saved[pageKey] = state;
    localStorage.setItem(storageKey, JSON.stringify(saved));
    updateStats();
  }
  
  // Update stats
  function updateStats() {
    const checked = document.querySelectorAll('.reading-checkbox.checked').length;
    const total = checkboxes.length;
    const statsEl = document.getElementById('totalProgress');
    if (statsEl) {
      statsEl.textContent = `${checked} / ${total} comics read`;
      const progressFill = document.getElementById('progressFill');
      if (progressFill) {
        const percentage = total > 0 ? (checked / total) * 100 : 0;
        progressFill.style.width = percentage + '%';
      }
    }
  }
  
  // Add event listeners
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', function() {
      this.classList.toggle('checked');
      this.closest('.reading-item').classList.toggle('completed');
      saveProgress();
    });
  });
  
  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    updateStats();
  });
})();
