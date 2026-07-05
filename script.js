// 🎥 INTERSECTION OBSERVER FOR VIDEO-EDIT REVEAL TRANSITIONS
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".portfolio-section");

    const observerOptions = {
        root: null,
        threshold: 0.15, // Replays transition beautifully when 15% is on screen
        rootMargin: "0px 0px -100px 0px"
    };

    const sectionObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("video-reveal-active");
            } else {
                // Smoothly un-reveals to replay when user clicks navigation menu
                entry.target.classList.remove("video-reveal-active");
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// ⚡ HIGH VELOCITY INTERACTIVE SMOOTH SCROLLER LINKED ON BUTTON CLICKS
function scrollToSection(sectionId) {
    const targetedElement = document.getElementById(sectionId);
    if (targetedElement) {
        // Clear focus first to trigger smooth snap re-entry animation instantly
        targetedElement.classList.remove("video-reveal-active");
        
        setTimeout(() => {
            targetedElement.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 50);
    }
}
