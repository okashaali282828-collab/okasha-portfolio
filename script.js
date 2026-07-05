document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".portfolio-section");
    const navButtons = document.querySelectorAll(".nav-btn");

    // 🎥 INTERSECTION OBSERVER FOR NATURAL VIDEO SNAP ENTRANCE
    const observerOptions = {
        root: null,
        threshold: 0.1, // Smooth entry logic
        rootMargin: "0px 0px -15% 0px"
    };

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("video-reveal-active");
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 🔄 REVOLUTIONARY BULLETPROOF SCROLL SPY TRACKER
    window.addEventListener("scroll", function () {
        let currentActiveSectionId = "";
        
        // Mid-viewport focus coordinate calculation
        const scrollTriggerLine = window.scrollY + (window.innerHeight * 0.35); 

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollTriggerLine >= sectionTop && scrollTriggerLine < (sectionTop + sectionHeight)) {
                currentActiveSectionId = section.getAttribute("id");
            }
        });

        // Safe Fallback: If at the very top of the webpage, enforce Intro active
        if (window.scrollY < 150) {
            currentActiveSectionId = "intro-section"; // Replace with your exact introductory section HTML id if different
        }

        if (currentActiveSectionId) {
            navButtons.forEach(btn => {
                btn.classList.remove("active");
                
                const clickActionString = btn.getAttribute("onclick") || "";
                if (clickActionString.includes(`'${currentActiveSectionId}'`) || clickActionString.includes(`"${currentActiveSectionId}"`)) {
                    btn.classList.add("active");
                }
            });
        }
    });
});

// ⚡ HIGH VELOCITY SAFE INTERACTIVE SCROLLER
function scrollToSection(sectionId) {
    const targetedElement = document.getElementById(sectionId);
    if (targetedElement) {
        // Enforce visible presentation frames instantly to eliminate black lag drops
        targetedElement.classList.add("video-reveal-active");
        
        targetedElement.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}
