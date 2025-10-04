// auth.js - ФИНАЛЬНАЯ РАБОЧАЯ ВЕРСИЯ
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Инициализация аутентификации');
    initAuthForms();
});

function initAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('Заполните все поля');
        return;
    }
    
    showLoading('Вход в систему...');
    
    setTimeout(() => {
        const userData = {
            email: email,
            name: email.split('@')[0],
            loggedIn: true,
            balance: 1500,
            bonuses: 100,
            registrationDate: new Date().toISOString()
        };
        
        // СОХРАНЯЕМ И ПЕРЕДАЕМ ЧЕРЕЗ URL
        saveUserAndRedirect(userData);
    }, 1500);
}

function handleRegister(e) {
    e.preventDefault();
    
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (!fullname || !email || !password) {
        alert('Заполните все поля');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Пароли не совпадают');
        return;
    }
    
    showLoading('Создание аккаунта...');
    
    setTimeout(() => {
        const userData = {
            email: email,
            name: fullname,
            loggedIn: true,
            balance: 1000,
            bonuses: 200,
            registrationDate: new Date().toISOString()
        };
        
        // СОХРАНЯЕМ И ПЕРЕДАЕМ ЧЕРЕЗ URL
        saveUserAndRedirect(userData);
    }, 1500);
}

function saveUserAndRedirect(userData) {
    // Сохраняем в localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Также передаем через URL параметр для надежности
    const userString = encodeURIComponent(JSON.stringify(userData));
    
    console.log('💾 Данные сохранены, переходим...');
    window.location.href = `lichcab.html?user=${userString}`;
}

function showLoading(message) {
    const loader = document.createElement('div');
    loader.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:10000;color:white;font-size:18px;">
            <div style="width:50px;height:50px;border:3px solid #fff;border-top:3px solid #667eea;border-radius:50%;animation:spin 1s linear infinite;margin-bottom:20px;"></div>
            <div>${message}</div>
        </div>
        <style>@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>
    `;
    document.body.appendChild(loader);
}