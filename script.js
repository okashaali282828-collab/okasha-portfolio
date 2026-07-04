// Pure DOM ke load hone ka wait karte hain taake koi element miss na ho
window.addEventListener('DOMContentLoaded', () => {
    
    // GSAP ScrollTrigger plugin ko register karte hain
    gsap.registerPlugin(ScrollTrigger);

    const space = document.querySelector('.space-3d');
    const panels = gsap.utils.toArray('.panel');
    const navButtons = gsap.utils.toArray('.nav-btn');

    // --- 1. DYNAMIC STARS BACKGROUND ---
    // Background me floating stars generate karne ka loop
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

    // --- 2. MOBILE CHECK & RESETS ---
    // Agar mobile screen (768px se choti) ho toh 3D space animations ko disable kar do
    if (window.innerWidth <= 768) {
        // Mobile par buttons click karne se smoothly scrolling ka logic
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

        // Mobile par automatic active navigation class switch karna
        panels.forEach((panel, i) => {
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

        // Mobile check complete, baqi desktop ka 3D logic execute nahi hoga
        return; 
    }


    // --- 3. DESKTOP 3D INITIALIZATION ---
    // Desktop par saare panels ko 3D space me peeche (z-axis par) push karna
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

    // --- 4. DESKTOP GSAP TIMELINE LOGIC ---
    // Scroll karne par camera moving effect generate karna
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5, // Buttery smooth scroll translation
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

    // --- 5. DESKTOP NAVIGATION SYNCHRONIZATION ---
    // Scroll ke mutabiq navigation buttons ke active state ko badalna
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

    // --- 6. DESKTOP SIDEBAR BUTTON CLICK LOGIC ---
    // Button par click karne se specific 3D layer/section par jump karna
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
