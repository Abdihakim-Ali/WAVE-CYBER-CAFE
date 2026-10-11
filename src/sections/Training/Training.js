/* ==========================================
   WAVE TECHNOLOGY HUB
   TRAINING INTERACTIONS
========================================== */

function initTraining() {
    const section = document.querySelector(".training");

    if (!section) return;

    // Prevent duplicate event listeners.
    if (section.dataset.trainingInitialized === "true") {
        return;
    }

    section.dataset.trainingInitialized = "true";

    const cards = section.querySelectorAll(".training-card");

    // Pointer glow is only useful on devices with a fine pointer.
    const supportsHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (!supportsHover) return;

    cards.forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.setProperty("--pointer-x", `${x}px`);
            card.style.setProperty("--pointer-y", `${y}px`);
        });

        card.addEventListener("pointerleave", () => {
            card.style.removeProperty("--pointer-x");
            card.style.removeProperty("--pointer-y");
        });
    });
}


// Support both normal page loading and dynamically inserted sections.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTraining, {
        once: true
    });
} else {
    initTraining();
}

// Allows main.js to initialize the section after injecting training.html.
window.initTraining = initTraining;