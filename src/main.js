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

console.log("🌊 Wave Technology Hub");