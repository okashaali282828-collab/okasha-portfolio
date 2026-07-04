gsap.registerPlugin(ScrollTrigger);

const space = document.querySelector('.space-3d');
const panels = gsap.utils.toArray('.panel');
const navButtons = gsap.utils.toArray('.nav-btn');

// --- 1. Dynamic 3D Stars Generator ---
const starsBg = document.getElementById('stars-bg');
for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    // Add custom floating animations using basic GSAP
    gsap.to(star, {
        y: "-=300",
        x: `+=${Math.random() * 100 - 50}`,
        repeat: -1,
        duration: Math.random() * 20 + 10,
        ease: "none",
        delay: Math.random() * -20
    });
    
    starsBg.appendChild(star);
}

// --- 2. 3D Panels Setup ---
panels.forEach((panel, i) => {
    if (i === 0) {
        gsap.set(panel, { opacity: 1, z: 0, rotationY: 0 });
    } else {
        gsap.set(panel, { 
            opacity: 0, 
            z: -i * 2000, // Safe deep space placement
            rotationY: i % 2 === 0 ? 20 : -20 
        });
    }
});

// --- 3. Main GSAP Timeline for Scroll ---
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-spacer",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Smooth lag effect
    }
});

panels.forEach((panel, i) => {
    if (i > 0) {
        const prevPanel = panels[i - 1];
        
        // Dynamic Zoom Out and Zoom In transitions
        tl.to(prevPanel, { opacity: 0, z: 1200, rotationY: i % 2 === 0 ? -35 : 35, duration: 1 }, i - 0.4)
          .to(panel, { opacity: 1, z: 0, rotationY: 0, duration: 1 }, i - 0.4);
    }
});

// --- 4. Sidebar Sync with Scrolling State ---
function updateNavActiveState(index) {
    navButtons.forEach((btn, i) => {
        if (i === index) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

panels.forEach((_, i) => {
    ScrollTrigger.create({
        trigger: ".scroll-spacer",
        start: () => `top+=${(i / panels.length) * document.querySelector('.scroll-spacer').scrollHeight} top`,
        end: () => `top+=${((i + 1) / panels.length) * document.querySelector('.scroll-spacer').scrollHeight} top`,
        onToggle: self => { if (self.isActive) updateNavActiveState(i); }
    });
});

// --- 5. Navigation Button Click Events ---
navButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const targetIndex = parseInt(button.getAttribute('data-index'));
        const spacerHeight = document.querySelector('.scroll-spacer').scrollHeight;
        const targetScrollPos = (targetIndex / panels.length) * spacerHeight + 50;

        window.scrollTo({
            top: targetScrollPos,
            behavior: 'smooth'
        });
    });
});
