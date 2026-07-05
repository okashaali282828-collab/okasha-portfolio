// --- 1. LIVE MATRIX DIGITAL RAIN CODE BACKGROUND ANIMATION ---
function initMatrixBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}/+=*!@#$%^&";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = Math.random() * -100;
    }

    function drawStream() {
        ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00f2fe';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }
    setInterval(drawStream, 33);
}

// --- 2. SMOOTH SECTION SELECT LINK SCROLLS ---
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// --- 3. SCROLLING VIEW ACTIVE TRIGGER CHECKS ---
function handleNavbarHighlights() {
    const sections = document.querySelectorAll('.portfolio-section');
    const navButtons = document.querySelectorAll('.nav-btn');

    let currentSectionId = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        if (window.scrollY >= sectionTop) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(currentSectionId)) {
            btn.classList.add('active');
        }
    });
}

// --- 4. RELIABLE SCROLL ANIMATION TRACKER ---
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkVisibility() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Agar card screen par thoda sa bhi enter kare to foran show kar do
            if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9) {
                el.classList.add('visible');
            }
        });
    }

    // Load hote hi check karega
    checkVisibility();
    // Scroll aur resize par bhi continuous run hoga
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
}

// RUN CONTROLLER PACKETS ON DOM LOADED
window.addEventListener('DOMContentLoaded', () => {
    initMatrixBackground();
    initScrollAnimations();
    window.addEventListener('scroll', handleNavbarHighlights);
});
