document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".portfolio-section");
    const navButtons = document.querySelectorAll(".nav-btn");

    // 🎥 INTERSECTION OBSERVER FOR NATURAL VIDEO SNAP ENTRANCE
    const observerOptions = {
        root: null,
        threshold: 0.12, // Trigged calculation matrix
        rootMargin: "0px 0px -10% 0px"
    };

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("video-reveal-active");
                
                // 🔄 DYNAMIC SCROLL SPY: Automatically highlights top bar button on scroll
                const currentId = entry.target.getAttribute("id");
                updateActiveNavbarButton(currentId);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Function to handle navbar styling shifts safely
    function updateActiveNavbarButton(activeSectionId) {
        if (!activeSectionId) return;
        
        navButtons.forEach(btn => {
            btn.classList.remove("active");
            
            // Extracts matching targets from custom onclick tags safely
            const clickAttr = btn.getAttribute("onclick") || "";
            if (clickAttr.includes(`'${activeSectionId}'`) || clickAttr.includes(`"${activeSectionId}"`)) {
                btn.classList.add("active");
            }
        });
    }
});

// ⚡ HIGH VELOCITY SAFE INTERACTIVE SCROLLER
function scrollToSection(sectionId) {
    const targetedElement = document.getElementById(sectionId);
    if (targetedElement) {
        // Ensures element stays visible during the transition track to fix lag/black frame glitch
        targetedElement.classList.add("video-reveal-active");
        
        // Pure smooth hardware transition tracking
        targetedElement.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}
