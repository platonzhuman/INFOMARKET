// Mobile menu functionality
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.main-menu').classList.toggle('active');
    this.setAttribute('aria-expanded', this.classList.contains('active'));
});

// Close menu when clicking on links
document.querySelectorAll('.main-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.mobile-menu-toggle').classList.remove('active');
        document.querySelector('.main-menu').classList.remove('active');
    });
});

// Close menu when pressing Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelector('.mobile-menu-toggle').classList.remove('active');
        document.querySelector('.main-menu').classList.remove('active');
    }
});