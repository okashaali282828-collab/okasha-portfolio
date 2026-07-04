gsap.registerPlugin(ScrollTrigger);

const space = document.querySelector('.space-3d');
const panels = gsap.utils.toArray('.panel');
const navButtons = gsap.utils.toArray('.nav-btn');

// --- 1. Dynamic 3D Stars Generator ---
const starsBg = document.getElementById('stars-bg');
for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 10}s`;
    starsBg.appendChild(star);
}

// --- 2. 3D Panels Initial Depth Setup ---
panels.forEach((panel, i) => {
    if (i === 0) {
        gsap.set(panel, { opacity: 1, z: 0, rotationY: 0 });
    } else {
        // Pushing subsequent panels deep into the 3D space and giving alternating rotations
        gsap.set(panel, { 
            opacity: 0, 
            z: -i * 1800, 
            rotationY: i % 2 === 0 ? 25 : -25 
        });
    }
});

// --- 3. Main GSAP Timeline for 3D Camera Travel ---
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2, // Ultra-smooth scrolling transition
        pin: ".container",
        invalidateOnRefresh: true
    }
});

// Animate panels dynamically through the 3D space on scroll
panels.forEach((panel, i) => {
    if (i > 0) {
        const prevPanel = panels[i - 1];
        
        // Flight path simulation (Zoom out previous panel, Zoom in current panel)
        tl.to(prevPanel, { opacity: 0, z: 1000, rotationY: i % 2 === 0 ? -45 : 45, duration: 1 }, i - 0.4)
          .to(panel, { opacity: 1, z: 0, rotationY: 0, duration: 1 }, i - 0.4);
    }
});

// --- 4. Sidebar Active State & Synchronization ---
function updateNavActiveState(index) {
    navButtons.forEach((btn, i) => {
        if (i === index) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

// Track page scroll to light up current active navigation button automatically
panels.forEach((_, i) => {
    ScrollTrigger.create({
        trigger: "body",
        start: () => `top+=${(i * 1000) - 200} top`,
        end: () => `top+=${((i + 1) * 1000) - 200} top`,
        onToggle: self => { if (self.isActive) updateNavActiveState(i); }
    });
});

// --- 5. Sidebar Button Click to Smooth 3D Travel ---
navButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const targetIndex = parseInt(button.getAttribute('data-index'));
        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const targetScrollPos = (targetIndex / (panels.length - 1)) * totalScrollHeight;

        // Smoothly scroll the screen to the absolute position representing that 3D layer
        window.scrollTo({
            top: targetScrollPos,
            behavior: 'smooth'
        });
    });
});
