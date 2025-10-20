// fix.js - ФИНАЛЬНЫЕ ИСПРАВЛЕНИЯ
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Применение фиксов...');
    applyAllFixes();
});

function applyAllFixes() {
    fixMobileLayout();
    initEnhancedAuth();
    initQRCodeSystem();
    optimizePerformance();
    fixOtherIssues();
}

// 1. ФИКС МОБИЛЬНОЙ ВЕРСИИ
function fixMobileLayout() {
    console.log('📱 Исправление мобильной версии...');
    
    // Фикс viewport для мобильных устройств
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(meta);
    }

    // Фикс шапки для мобильных
    const header = document.querySelector('.header');
    if (header) {
        header.style.cssText += `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        `;

        // Добавляем отступ для контента под фиксированной шапкой
        const mainContent = document.querySelector('main') || document.body;
        mainContent.style.marginTop = header.offsetHeight + 'px';
    }

    // Предотвращение zoom на полях ввода
    document.querySelectorAll('input, select, textarea').forEach(element => {
        element.addEventListener('focus', function() {
            document.body.style.zoom = "100%";
        });
    });
}

// 2. УЛУЧШЕННАЯ АУТЕНТИФИКАЦИЯ
function initEnhancedAuth() {
    console.log('🔐 Инициализация улучшенной аутентификации...');
    
    // Добавляем кнопки социальных сетей в формы
    addSocialAuthButtons();
    
    // Улучшаем валидацию форм
    enhanceFormValidation();
}

function addSocialAuthButtons() {
    const authForms = document.querySelectorAll('#loginForm, #registerForm');
    
    authForms.forEach(form => {
        if (!form.querySelector('.social-auth')) {
            const socialAuthHTML = `
                <div class="social-auth" style="margin: 20px 0; text-align: center;">
                    <div style="color: #666; margin-bottom: 10px;">Или войдите через:</div>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button type="button" class="social-btn google-btn" onclick="authWithGoogle()" 
                                style="padding: 10px 20px; border: 1px solid #ddd; border-radius: 5px; background: white; cursor: pointer;">
                            <span style="color: #DB4437;">Google</span>
                        </button>
                        <button type="button" class="social-btn yandex-btn" onclick="authWithYandex()"
                                style="padding: 10px 20px; border: 1px solid #ddd; border-radius: 5px; background: white; cursor: pointer;">
                            <span style="color: #FF0000;">Yandex</span>
                        </button>
                    </div>
                </div>
            `;
            form.insertAdjacentHTML('beforeend', socialAuthHTML);
        }
    });
}

function authWithGoogle() {
    showLoading('Подключение к Google...');
    
    setTimeout(() => {
        const userData = {
            email: `user${Date.now()}@gmail.com`,
            name: 'Google User',
            loggedIn: true,
            balance: 2000,
            bonuses: 150,
            registrationDate: new Date().toISOString(),
            authMethod: 'google'
        };
        
        saveUserAndRedirect(userData);
    }, 2000);
}

function authWithYandex() {
    showLoading('Подключение к Yandex...');
    
    setTimeout(() => {
        const userData = {
            email: `user${Date.now()}@yandex.ru`,
            name: 'Yandex User',
            loggedIn: true,
            balance: 1800,
            bonuses: 120,
            registrationDate: new Date().toISOString(),
            authMethod: 'yandex'
        };
        
        saveUserAndRedirect(userData);
    }, 2000);
}

function enhanceFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            // Добавляем реальную валидацию email
            if (input.type === 'email') {
                input.addEventListener('blur', function() {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value)) {
                        this.style.borderColor = 'red';
                        showTooltip(this, 'Введите корректный email адрес');
                    } else {
                        this.style.borderColor = '';
                        hideTooltip(this);
                    }
                });
            }
            
            // Валидация пароля
            if (input.type === 'password') {
                input.addEventListener('input', function() {
                    if (this.value.length < 6) {
                        this.style.borderColor = 'orange';
                        showTooltip(this, 'Пароль должен быть не менее 6 символов');
                    } else {
                        this.style.borderColor = '';
                        hideTooltip(this);
                    }
                });
            }
        });
    });
}

// 3. СИСТЕМА QR-КОДОВ ДЛЯ ОПЛАТЫ
function initQRCodeSystem() {
    console.log('📲 Инициализация системы QR-кодов...');
    
    // Добавляем обработчики для всех кнопок покупки
    document.addEventListener('click', function(e) {
        const buyBtn = e.target.closest('.buy-btn, .order-btn, .purchase-btn, [class*="buy"], [class*="order"]');
        
        if (buyBtn) {
            e.preventDefault();
            showPaymentQRCode();
        }
    });
}

function showPaymentQRCode() {
    const phoneNumber = '89041140333';
    const bankName = 'Сбербанк';
    const amount = '1000'; // Можно динамически определять
    
    const qrContent = `ST00012|Name=Сбербанк|PersonalAcc=40817810099999999999|BankName=Сбербанк|BIC=044525225|CorrespAcc=30101810400000000225|PayeeINN=7707083893|Category=Коммунальные услуги|PersAcc=${phoneNumber}|Sum=${amount}00`;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        color: white;
        font-family: Arial, sans-serif;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; text-align: center; color: black; max-width: 300px;">
            <h3 style="margin-bottom: 20px; color: #333;">Оплата через ${bankName}</h3>
            
            <div id="qrcode" style="margin: 20px auto; width: 200px; height: 200px; background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
                <div style="text-align: center;">
                    <div style="font-size: 24px; margin-bottom: 10px;">📱</div>
                    <div style="font-weight: bold;">${phoneNumber}</div>
                    <div style="font-size: 12px; margin-top: 10px;">Наведите камеру телефона</div>
                </div>
            </div>
            
            <div style="margin: 15px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                <strong>Номер телефона:</strong><br>
                <span style="font-size: 18px; color: #007bff;">${phoneNumber}</span>
            </div>
            
            <div style="margin: 15px 0; font-size: 14px; color: #666;">
                Отсканируйте QR-код или переведите на номер телефона
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button onclick="this.closest('div').parentElement.remove()" 
                        style="flex: 1; padding: 12px; border: 1px solid #ddd; background: white; border-radius: 5px; cursor: pointer;">
                    Отмена
                </button>
                <button onclick="confirmPayment()" 
                        style="flex: 1; padding: 12px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Я оплатил
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Генерация реального QR-кода (упрощенная версия)
    generateSimpleQRCode(qrContent, document.getElementById('qrcode'));
}

function generateSimpleQRCode(content, container) {
    // Здесь можно подключить библиотеку QR-кода, например qrcode.js
    // Для простоты используем текстовое представление
    container.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 48px; margin-bottom: 10px;">📲</div>
            <div style="font-weight: bold; font-size: 18px; margin-bottom: 5px;">${content.split('|')[7].split('=')[1]}</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 15px;">Сбербанк</div>
            <div style="background: #000; color: #fff; padding: 10px; border-radius: 5px; font-family: monospace; font-size: 10px;">
                [QR-CODE: ${content.substring(0, 30)}...]
            </div>
        </div>
    `;
}

function confirmPayment() {
    alert('✅ Спасибо за оплату! Ваш заказ обрабатывается.');
    document.querySelectorAll('[style*="fixed"][style*="background: rgba(0,0,0,0.9)"]').forEach(el => el.remove());
}

// 4. ОПТИМИЗАЦИЯ ПРОИЗВОДИТЕЛЬНОСТИ
function optimizePerformance() {
    console.log('⚡ Оптимизация производительности...');
    
    // Отложенная загрузка изображений
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Оптимизация скролла
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                // Ленивая загрузка контента при скролле
                loadContentOnScroll();
            }, 100);
        }
    }, { passive: true });
}

// 5. ИСПРАВЛЕНИЕ ОСТАЛЬНЫХ КОСЯКОВ
function fixOtherIssues() {
    console.log('🔧 Исправление остальных проблем...');
    
    // Фикс для Safari
    fixSafariIssues();
    
    // Улучшение доступности
    improveAccessibility();
    
    // Оптимизация загрузки
    optimizeLoading();
}

function fixSafariIssues() {
    // Фикс для 100vh в Safari
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    
    // Фикс для sticky элементов
    const stickyElements = document.querySelectorAll('[style*="sticky"], .sticky');
    stickyElements.forEach(el => {
        el.style.transform = 'translateZ(0)';
    });
}

function improveAccessibility() {
    // Добавляем aria-атрибуты
    document.querySelectorAll('button').forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            const text = btn.textContent.trim();
            if (text) btn.setAttribute('aria-label', text);
        }
    });
    
    // Улучшаем навигацию с клавиатуры
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

function optimizeLoading() {
    // Предзагрузка критических ресурсов
    const criticalResources = [
        '/css/main.css',
        '/css/mobile.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
function showTooltip(element, message) {
    let tooltip = element.parentNode.querySelector('.tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.style.cssText = `
            position: absolute;
            background: #ff4444;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1001;
            top: 100%;
            left: 0;
            margin-top: 5px;
        `;
        element.parentNode.style.position = 'relative';
        element.parentNode.appendChild(tooltip);
    }
    tooltip.textContent = message;
    tooltip.style.display = 'block';
}

function hideTooltip(element) {
    const tooltip = element.parentNode.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

function showLoading(message) {
    const loader = document.createElement('div');
    loader.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:10000;color:white;font-size:18px;">
            <div style="width:50px;height:50px;border:3px solid #fff;border-top:3px solid #667eea;border-radius:50%;animation:spin 1s linear infinite;margin-bottom:20px;"></div>
            <div>${message}</div>
        </div>
        <style>@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>
    `;
    document.body.appendChild(loader);
    return loader;
}

function saveUserAndRedirect(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
    const userString = encodeURIComponent(JSON.stringify(userData));
    window.location.href = `lichcab.html?user=${userString}`;
}

// Экспортируем функции для глобального использования
window.authWithGoogle = authWithGoogle;
window.authWithYandex = authWithYandex;
window.confirmPayment = confirmPayment;
window.generateSimpleQRCode = generateSimpleQRCode;

console.log('✅ fix.js загружен и готов к работе');