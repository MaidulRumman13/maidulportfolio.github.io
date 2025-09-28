// Mobile Navigation Toggle - Works on ALL pages
document.addEventListener('DOMContentLoaded', function() {
    const navMenuToggle = document.querySelector('.nav-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navMenuToggle && navLinks) {
        navMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
});