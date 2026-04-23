// Theme and Stars Animation
(function() {
    // Star field animation
    const canvas = document.getElementById('stars');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        }
        
        function initStars() {
            stars = [];
            const numStars = Math.floor((canvas.width * canvas.height) / 8000);
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.8 + 0.2,
                    speed: Math.random() * 0.02 + 0.005
                });
            }
        }
        
        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                star.opacity += star.speed;
                if (star.opacity > 1 || star.opacity < 0.2) {
                    star.speed *= -1;
                }
                
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();
            });
            
            requestAnimationFrame(drawStars);
        }
        
        window.addEventListener('resize', resize);
        resize();
        drawStars();
    }
    
    // Theme toggle
    const savedTheme = localStorage.getItem('miclaseTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Toggle theme function
    window.toggleTheme = function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('miclaseTheme', newTheme);
        
        // Update button icon
        const btn = document.getElementById('themeToggle');
        if (btn) {
            btn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        }
    };
})();
