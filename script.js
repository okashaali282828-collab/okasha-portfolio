window.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const space = document.querySelector('.space-3d');
    const panels = gsap.utils.toArray('.panel');
    const navButtons = gsap.utils.toArray('.nav-btn');

    // --- 1. DYNAMIC STARS BACKGROUND ---
    const starsBg = document.getElementById('stars-bg');
    if(starsBg) {
        for (let i = 0; i < 60; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.width = `${Math.random() * 3}px`;
            star.style.height = star.style.width;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            starsBg.appendChild(star);
        }
    }

    // --- 2. 📱 MOBILE SMOOTH SLIDE-UP ANIMATIONS ---
    if (window.innerWidth <= 768) {
        panels.forEach((panel, i) => {
            const contentCard = panel.querySelector('.content');
            
            // Set initial state for mobile entry animation
            gsap.set(contentCard, { opacity: 0, y: 60 });

            // Create scroll triggers for each individual card on mobile
            gsap.to(contentCard, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: panel,
                    start: "top 85%", 
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                }
            });

            // Toggle active classes on bottom nav buttons while scrolling mobile view
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

        // Click transitions on mobile bottom navbar links
        navButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const targetIndex = parseInt(button.getAttribute('data-index'));
                const targetPanel = panels[targetIndex];
                if (targetPanel) {
                    targetPanel.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        return; // Stops here for mobile, rest is desktop logic
    }

    // --- 3. 💻 DESKTOP 3D VIEWPORT INITIALIZATION ---
    panels.forEach((panel, i) => {
        if (i === 0) {
            gsap.set(panel, { opacity: 1, z: 0, rotationY: 0 });
        } else {
            gsap.set(panel, { 
                opacity: 0, 
                z: -i * 2000, 
                rotationY: i % 2 === 0 ? 30 : -30 
            });
        }
    });

    // --- 4. DESKTOP 3D SCROLL TIMELINE ---
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
            pin: ".container",
            invalidateOnRefresh: true
        }
    });

    panels.forEach((panel, i) => {
        if (i > 0) {
            const prevPanel = panels[i - 1];
            tl.to(prevPanel, { opacity: 0, z: 1200, rotationY: i % 2 === 0 ? -45 : 45, duration: 1 }, i - 0.4)
              .to(panel, { opacity: 1, z: 0, rotationY: 0, duration: 1 }, i - 0.4);
        }
    });

    // --- 5. DESKTOP SIDEBAR STATE UPDATE ---
    function updateNav(index) {
        navButtons.forEach((btn, i) => {
            if (i === index) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }

    panels.forEach((_, i) => {
        ScrollTrigger.create({
            trigger: "body",
            start: () => `top+=${(i * (document.documentElement.scrollHeight - window.innerHeight) / (panels.length - 1)) - 100} top`,
            end: () => `top+=${((i + 1) * (document.documentElement.scrollHeight - window.innerHeight) / (panels.length - 1)) - 100} top`,
            onToggle: self => { if (self.isActive) updateNav(i); }
        });
    });

    // --- 6. DESKTOP SIDEBAR CLICK LOGIC ---
    navButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetIndex = parseInt(button.getAttribute('data-index'));
            const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const targetScrollPos = (targetIndex / (panels.length - 1)) * totalScrollHeight;

            window.scrollTo({
                top: targetScrollPos,
                behavior: 'smooth'
            });
        });
    });
});
