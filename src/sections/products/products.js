/* ==========================================
   WAVE TECHNOLOGY HUB
   PRODUCTS INTERACTIONS
========================================== */

/**
 * Initialize the Products section.
 *
 * Called by main.js after the Products HTML
 * has been inserted into the document.
 */
export function initProducts() {
    const productsSection = document.querySelector(".products");

    // Stop safely if the section is not present.
    if (!productsSection) return;

    // Prevent duplicate event listeners.
    if (productsSection.dataset.productsInitialized === "true") {
        return;
    }

    const filters = productsSection.querySelectorAll(".products-filter");
    const cards = productsSection.querySelectorAll(".product-card");
    const emptyState = productsSection.querySelector(".products-empty");

    /*
       The featured showcase currently does not contain
       catalogue filters or product cards.

       Leave it untouched until those elements exist.
    */
    if (!filters.length || !cards.length) return;

    // Mark initialized only after validating the catalogue.
    productsSection.dataset.productsInitialized = "true";

    /* ======================================
       PRODUCT CATEGORY FILTERS
    ====================================== */

    function filterProducts(category) {
        let visibleCount = 0;

        cards.forEach((card, index) => {
            const cardCategory = card.dataset.category;

            const shouldShow =
                category === "all" ||
                cardCategory === category;

            card.classList.remove(
                "is-filtering-in",
                "is-filtering-out"
            );

            card.style.removeProperty("animation-delay");

            if (shouldShow) {
                card.hidden = false;
                card.removeAttribute("aria-hidden");

                // Restart the entrance animation.
                void card.offsetWidth;

                card.classList.add("is-filtering-in");

                card.style.animationDelay =
                    `${Math.min(index * 45, 225)}ms`;

                visibleCount++;
            } else {
                card.hidden = true;
                card.setAttribute("aria-hidden", "true");
            }
        });

        if (emptyState) {
            emptyState.hidden = visibleCount !== 0;
        }
    }

    /* ======================================
       FILTER BUTTON STATES
    ====================================== */

    filters.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.filter;

            filters.forEach((filter) => {
                const isActive = filter === button;

                filter.classList.toggle("is-active", isActive);

                filter.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            filterProducts(selectedCategory);
        });
    });

    /* ======================================
       PRODUCT IMAGE FALLBACK
    ====================================== */

    const images = productsSection.querySelectorAll(
        ".product-image img"
    );

    images.forEach((img) => {
        img.addEventListener(
            "error",
            () => {
                const imageContainer =
                    img.closest(".product-image");

                if (!imageContainer) return;

                imageContainer.classList.add(
                    "product-image-missing"
                );

                img.hidden = true;
            },
            { once: true }
        );

        // Handle images that failed before initialization.
        if (img.complete && img.naturalWidth === 0) {
            img.dispatchEvent(new Event("error"));
        }
    });

    /* ======================================
       CLEAN UP ENTRANCE ANIMATIONS
    ====================================== */

    productsSection.addEventListener("animationend", (event) => {
        if (event.animationName !== "productCardIn") return;

        const card = event.target;

        if (!card.classList.contains("product-card")) return;

        card.classList.remove("is-filtering-in");
        card.style.removeProperty("animation-delay");
    });

    /* ======================================
       INITIAL FILTER STATE
    ====================================== */

    const activeFilter = Array.from(filters).find(
        (button) => button.classList.contains("is-active")
    );

    const initialCategory =
        activeFilter?.dataset.filter || "all";

    filters.forEach((button) => {
        const isActive =
            button.dataset.filter === initialCategory;

        button.classList.toggle("is-active", isActive);

        button.setAttribute(
            "aria-pressed",
            String(isActive)
        );
    });

    filterProducts(initialCategory);
}