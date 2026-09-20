import "./css/main.css";

import navbarHtml from "./sections/navbar/navbar.html?raw";
import heroHtml from "./sections/hero/hero.html?raw";

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