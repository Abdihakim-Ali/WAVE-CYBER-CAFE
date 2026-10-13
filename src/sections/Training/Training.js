/* ==========================================
WAVE TECHNOLOGY HUB
TRAINING SECTION INTERACTIONS
========================================== */

/**

* Initialize pointer glow effects for training cards.
*
* This function is called by main.js after the
* training HTML has been inserted into the page.
  */
  export function initTraining() {
  const section = document.querySelector(".training");

  // Stop if the training section doesn't exist.
  if (!section) return;

  // Prevent duplicate event listeners.
  if (section.dataset.trainingInitialized === "true") {
  return;
  }

  // Pointer glow is unnecessary on touch-only devices.
  const supportsHover = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
  ).matches;

  if (!supportsHover) return;

  const cards = section.querySelectorAll(".training-card");

  // Nothing to initialize if there are no cards.
  if (!cards.length) return;

  // Mark the section as initialized.
  section.dataset.trainingInitialized = "true";

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
