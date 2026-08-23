import "./css/main.css";

async function loadSection(id, path) {
    const container = document.getElementById(id);

    if (!container) {
        console.error(`Section container #${id} not found.`);
        return;
    }

    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Failed to load ${path}`);
        }

        const html = await response.text();

        container.innerHTML = html;

    } catch (error) {
        console.error(error);
    }
}

loadSection("navbar", "/src/sections/navbar/navbar.html");
loadSection("hero", "/src/sections/hero/hero.html");

console.log("🌊 Wave Technology Hub");