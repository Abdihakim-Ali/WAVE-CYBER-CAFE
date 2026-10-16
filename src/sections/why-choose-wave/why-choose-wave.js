/* ==========================================
   WAVE TECHNOLOGY HUB
   WHY CHOOSE WAVE
========================================== */

import "./why-choose-wave.css";


/* ==========================================
   INITIALIZE SECTION
========================================== */

export function initWhyChooseWave() {
    const section = document.getElementById("why-choose-wave");

    if (!section) {
        console.error(
            "Why Choose Wave section could not be initialized."
        );

        return;
    }

    // Prevent duplicate event listeners.
    if (section.dataset.initialized === "true") {
        return;
    }

    section.dataset.initialized = "true";


    /* ======================================
       CTA SCROLLING
    ====================================== */

    const cta = section.querySelector(".why-choose-wave__cta");

    if (!cta) return;

    cta.addEventListener("click", (event) => {
        const targetId = cta.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
        });

        // Keep the URL in sync with the destination.
        history.replaceState(null, "", targetId);
    });


    console.log("🌊 Why Choose Wave initialized.");
}