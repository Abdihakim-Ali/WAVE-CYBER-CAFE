import "./css/main.css";

import navbarHtml from "./sections/navbar/navbar.html?raw";
import heroHtml from "./sections/hero/hero.html?raw";
import servicesHtml from "./sections/services/services.html?raw";
import productsHtml from "./sections/products/products.html?raw";
import trainingHtml from "./sections/training/training.html?raw";

function loadSection(id, html) {
    const container = document.getElementById(id);

    if (!container) {
        console.error(`Section container #${id} not found.`);
        return;
    }

    container.innerHTML = html;
}

loadSection("navbar", navbarHtml);
loadSection("hero", heroHtml);
loadSection("services", servicesHtml);
loadSection("products", productsHtml);
loadSection("training-section", trainingHtml);

/* =========================================
   THEME SYSTEM
========================================= */

const themeToggle = document.querySelector(".theme-toggle");

const savedTheme = localStorage.getItem("wave-theme");

const systemPrefersLight = window.matchMedia(
    "(prefers-color-scheme: light)"
).matches;

const initialTheme =
    savedTheme ||
    (systemPrefersLight ? "light" : "dark");

document.documentElement.setAttribute(
    "data-theme",
    initialTheme
);


/* =========================================
   THEME TOGGLE
========================================= */

if (themeToggle) {

    const updateToggle = () => {

        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        const isLight = currentTheme === "light";

        themeToggle.setAttribute(
            "aria-pressed",
            String(isLight)
        );

        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );
    };


    updateToggle();


    themeToggle.addEventListener("click", () => {

        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        const newTheme =
            currentTheme === "light"
                ? "dark"
                : "light";

        document.documentElement.setAttribute(
            "data-theme",
            newTheme
        );

        localStorage.setItem(
            "wave-theme",
            newTheme
        );

        updateToggle();
    });
}

console.log("🌊 Wave Technology Hub");

/* =========================================
   GLOBAL SCROLL REVEAL
========================================= */

function initScrollReveal() {
    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");

                // Reveal only once.
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.18,
            rootMargin: "0px 0px -8% 0px",
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}

initScrollReveal();

 /* =========================================
   SERVICES EXPANSION
   ========================================= */

function initServicesExpansion() {

    const serviceCards =
        document.querySelectorAll(".service-card");

    if (!serviceCards.length) return;


    let activeCard = null;


    /* -----------------------------------------
       CLOSE ONE SERVICE
       ----------------------------------------- */

    function closeService(card) {

        if (!card) return;

        const trigger =
            card.querySelector(".service-card-main");

        const details =
            card.querySelector(".service-card-details");


        card.classList.remove("is-open");


        if (trigger) {
            trigger.setAttribute(
                "aria-expanded",
                "false"
            );
        }


        if (details) {
            details.setAttribute(
                "aria-hidden",
                "true"
            );
        }


        if (activeCard === card) {
            activeCard = null;
        }
    }


    /* -----------------------------------------
       OPEN ONE SERVICE
       ----------------------------------------- */

    function openService(card) {

        const trigger =
            card.querySelector(".service-card-main");

        const details =
            card.querySelector(".service-card-details");


        if (!trigger || !details) return;


        /* Close every other card */

        serviceCards.forEach((otherCard) => {

            if (otherCard !== card) {
                closeService(otherCard);
            }

        });


        /* Open selected card */

        card.classList.add("is-open");


        trigger.setAttribute(
            "aria-expanded",
            "true"
        );


        details.setAttribute(
            "aria-hidden",
            "false"
        );


        activeCard = card;


        /* -------------------------------------
           Smoothly bring the opened card
           into a comfortable viewing position
           ------------------------------------- */

        setTimeout(() => {

            const top =
                card.getBoundingClientRect().top +
                window.scrollY -
                100;


            window.scrollTo({
                top: top,
                behavior: "smooth"
            });

        }, 180);
    }


    /* -----------------------------------------
       CARD EVENTS
       ----------------------------------------- */

    serviceCards.forEach((card) => {

        const trigger =
            card.querySelector(".service-card-main");


        if (!trigger) return;


        trigger.addEventListener("click", () => {

            const isOpen =
                card.classList.contains("is-open");


            if (isOpen) {

                closeService(card);

            } else {

                openService(card);

            }

        });


        /* Keyboard */

        trigger.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();


                    const isOpen =
                        card.classList.contains(
                            "is-open"
                        );


                    if (isOpen) {

                        closeService(card);

                    } else {

                        openService(card);

                    }

                }

            }
        );

    });


    /* -----------------------------------------
       ESCAPE
       ----------------------------------------- */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                activeCard
            ) {

                closeService(activeCard);

            }

        }
    );

}

initServicesExpansion();

if (typeof window.initTraining === "function") {
    window.initTraining();
}

/* =========================================
   PRODUCTS CATEGORY FILTERS
========================================= */

function initProductsFilters() {
    const productsSection = document.querySelector(".products");

    if (!productsSection) return;

    const filters = productsSection.querySelectorAll(".products-filter");
    const cards = productsSection.querySelectorAll(".product-card");

    filters.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.filter;

            filters.forEach((filter) => {
                const isActive = filter === button;

                filter.classList.toggle("is-active", isActive);
                filter.setAttribute("aria-pressed", String(isActive));
            });

            cards.forEach((card, index) => {
                const matches =
                    selectedCategory === "all" ||
                    card.dataset.category === selectedCategory;

                card.hidden = !matches;

                if (matches) {
                    card.style.animationDelay =
                        `${Math.min(index * 45, 225)}ms`;

                    card.classList.remove("is-filtering-in");

                    // Restart the entrance animation.
                    void card.offsetWidth;

                    card.classList.add("is-filtering-in");
                } else {
                    card.style.removeProperty("animation-delay");
                    card.classList.remove("is-filtering-in");
                }
            });
        });
    });
}

initProductsFilters();