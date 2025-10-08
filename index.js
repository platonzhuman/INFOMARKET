// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (mobileMenuToggle && mainMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', this.classList.contains('active'));
            
            // Блокировка скролла при открытом меню
            document.body.style.overflow = mainMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.main-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mainMenu.classList.contains('active') &&
                !mainMenu.contains(e.target) &&
                !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize particles
    initParticles();
});

// Particle system initialization
function initParticles() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Check authentication status
function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('user'));
    const headerActions = document.querySelector('.header-actions');
    
    if (!headerActions) return;
    
    if (user && user.loggedIn) {
        headerActions.innerHTML = `
            <span style="color: var(--text-white); margin-right: 1rem;">Привет, ${user.name}</span>
            <button class="btn btn-login" onclick="window.location.href='lichcab.html'">Личный кабинет</button>
            <button class="btn btn-register" onclick="logout()">Выйти</button>
        `;
    } else {
        headerActions.innerHTML = `
            <button class="btn btn-login" onclick="window.location.href='login.html'">Вход</button>
            <button class="btn btn-register" onclick="window.location.href='register.html'">Регистрация</button>
        `;
    }
}

function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        localStorage.removeItem('user');
        location.reload();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', checkAuthStatus);


