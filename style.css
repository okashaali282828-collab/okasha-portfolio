// --- 1. LIVE MATRIX DIGITAL RAIN CODE BACKGROUND ANIMATION ---
function initMatrixBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Handle viewport changes cleanly
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters pool
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}/+=*!@#$%^&";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Track state of down streams arrays
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = Math.random() * -100; // staggered drop positions
    }

    function drawStream() {
        ctx.fillStyle = 'rgba(2, 6, 23, 0.05)'; // slight trail fade overlay
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00f2fe'; // Neon cyan style drop color
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
        const offset = 80; // height buffer for top bar header
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
        const sectionTop = section.offsetTop - 120; // threshold marker matching padding heights
        if (window.scrollY >= sectionTop) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navButtons.forEach(btn => {
        btn.classList.remove('active');
        // Extract string targets inside custom inline attributes safely
        if (btn.getAttribute('onclick').includes(currentSectionId)) {
            btn.classList.add('active');
        }
    });
}

// --- 4. VANILLA INTERSECTION OBSERVER FOR ARRANGING SKILLS/CARDS ON SCROLL ---
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        threshold: 0.1, // Element enters 10% inside viewport
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If this is the language blocks container, staggered cascade triggers
                const skillBlocks = entry.target.querySelectorAll('.skill-block');
                if(skillBlocks.length > 0) {
                    skillBlocks.forEach((block, idx) => {
                        setTimeout(() => {
                            block.style.opacity = '1';
                            block.style.transform = 'translateY(0)';
                        }, idx * 60); // Clean 60ms delay waterfall cascade effect
                    });
                }
                observer.unobserve(entry.target); // Trigger logic once safely
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// RUN CONTROLLER PACKETS ON DOM LOADED
window.addEventListener('DOMContentLoaded', () => {
    initMatrixBackground();
    initScrollAnimations();
    
    // Bind global listener loops safely
    window.addEventListener('scroll', handleNavbarHighlights);
});
