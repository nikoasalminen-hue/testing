document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("master-wrapper");
    const heroFirst = document.getElementById("hero-first");
    const heroLast = document.getElementById("hero-last");
    const progressBar = document.getElementById("scroll-progress");

    // 1. Entry Animation Sequence
    const runEntryAnimation = () => {
        // First Name: Slide from Right
        heroFirst.style.transition = "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
        heroFirst.style.opacity = "1";
        heroFirst.style.transform = "translateX(0)";

        // Last Name: Slide from Bottom (delayed)
        setTimeout(() => {
            heroLast.style.transition = "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
            heroLast.style.opacity = "1";
            heroLast.style.transform = "translateY(0)";
        }, 600);
    };

    runEntryAnimation();

    // 2. Optimized Scroll Engine
    let scrollPos = 0;
    let targetPos = 0;
    const ease = 0.08;

    window.addEventListener("wheel", (e) => {
        targetPos += e.deltaY;
        const maxScroll = container.offsetWidth - window.innerWidth;
        targetPos = Math.max(0, Math.min(targetPos, maxScroll));
    });

    // Touch support for mobile responsiveness
    let touchStart = 0;
    window.addEventListener("touchstart", (e) => touchStart = e.touches[0].screenY);
    window.addEventListener("touchmove", (e) => {
        let delta = touchStart - e.touches[0].screenY;
        targetPos += delta * 2;
        const maxScroll = container.offsetWidth - window.innerWidth;
        targetPos = Math.max(0, Math.min(targetPos, maxScroll));
        touchStart = e.touches[0].screenY;
    });

    function render() {
        scrollPos += (targetPos - scrollPos) * ease;
        container.style.transform = `translateX(-${scrollPos}px)`;

        // Update Progress Bar
        const maxScroll = container.offsetWidth - window.innerWidth;
        const progress = (scrollPos / maxScroll) * 100;
        progressBar.style.height = `${progress}%`;
        
        requestAnimationFrame(render);
    }
    render();
});
