window.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const space = document.querySelector('.space-3d');
    const panels = gsap.utils.toArray('.panel');
    const navButtons = gsap.utils.toArray('.nav-btn');

    // --- 1. STARS BACKGROUND CREATION ---
    const starsBg = document.getElementById('stars-bg');
    if(starsBg) {
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.width = `${Math.random() * 2.5}px`;
            star.style.height = star.style.width;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            starsBg.appendChild(star);
        }
    }

    // --- 2. 📱 MOBILE FLOW WITH SLIDE-UP EFFECTS ---
    if (window.innerWidth <= 768) {
        panels.forEach((panel, i) => {
            const innerCard = panel.querySelector('.content');
            gsap.set(innerCard, { opacity: 0, y: 50 });

            gsap.to(innerCard, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                scrollTrigger: {
                    trigger: panel,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            ScrollTrigger.create({
                trigger: panel,
                start: "top center",
                end: "bottom center",
                onToggle: self => {
                    if (self.isActive) {
                        navButtons.forEach((btn, idx) => {
                            if (idx === i) btn.classList.add('active');
                            else btn.classList.remove('active');
                        });
                    }
                }
            });
        });

        navButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const targetIndex = parseInt(button.getAttribute('data-index'));
                const targetPanel = panels[targetIndex];
                if (targetPanel) {
                    targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        return; 
    }

    // --- 3. 💻 DESKTOP PURE HORIZONTAL SIDE-SLIDING TRACK ANIMATION ---
    // Calculates horizontal transform amount based on number of sections dynamically
    const totalPanels = panels.length;
    
    // Virtual Scroll Setup: Creates dynamic track height on body to capture vertical scrolls
    document.body.style.height = `${(totalPanels) * 100}vh`;

    gsap.to(space, {
        x: () => -(space.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Smooth scrolling anchor translate
            pin: ".container",
            invalidateOnRefresh: true
        }
    });

    // --- 4. NAVIGATION SYNCHRONIZATION (DESKTOP) ---
    function setActiveNav(index) {
        navButtons.forEach((btn, i) => {
            if (i === index) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }

    panels.forEach((_, i) => {
        ScrollTrigger.create({
            trigger: "body",
            start: () => `top+=${(i * (document.documentElement.scrollHeight - window.innerHeight) / (totalPanels - 1)) - 50} top`,
            end: () => `top+=${((i + 1) * (document.documentElement.scrollHeight - window.innerHeight) / (totalPanels - 1)) - 50} top`,
            onToggle: self => { if (self.isActive) setActiveNav(i); }
        });
    });

    // --- 5. SIDEBAR CLICKS LINK TRANSITION (DESKTOP) ---
    navButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetIndex = parseInt(button.getAttribute('data-index'));
            const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const targetScrollPos = (targetIndex / (totalPanels - 1)) * totalScrollHeight;

            window.scrollTo({
                top: targetScrollPos,
                behavior: 'smooth'
            });
        });
    });
});
