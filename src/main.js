// src/main.js

// WHY: These imports bring in the core logic and UI utility functions from their separate modules.
// This keeps the entry point file clean and focused on event handling and workflow.
import { generateDish } from './core/dishGenerator.js';
import { updateUIForLoading, displayResults, displayError } from './utils/domUtils.js';

/**
 * Attaches the main event listener once the document is fully loaded.
 * WHY: Wrapping in "DOMContentLoaded" ensures the script doesn't try to find HTML elements
 * before they exist on the page, which would cause errors.
 */
document.addEventListener("DOMContentLoaded", () => {
  const dishForm = document.getElementById("dishForm");
  
  // WHY: A crucial check to ensure the form exists. If not, the app can't function.
  if (!dishForm) {
    console.error("CRITICAL ERROR: The form with id 'dishForm' was not found. Script cannot execute.");
    return;
  }

  // Attach the submit event listener to the form.
  dishForm.addEventListener("submit", (e) => {
    // WHY: `preventDefault()` stops the browser's default behavior of reloading the page on form submission.
    e.preventDefault();

    // 1. Read user selections from form fields.
    const dishType = document.getElementById("dishTypeInput").value;
    const selectedNationValues = Array.from(document.querySelectorAll("input[name='nation']:checked"))
                                 .map(input => input.value);
    const baseFormat = document.getElementById("baseFormat").value;
    const themeVal = document.getElementById("specialThemes").value;

    // 2. Update the UI to show a "loading" state.
    updateUIForLoading();

    // 3. Defer the heavy generation logic.
    // WHY: This ensures the browser renders the "Conjuring..." UI update *before* it gets busy,
    // preventing the UI from appearing to freeze.
    requestAnimationFrame(() => {
      setTimeout(() => {
        try {
          // 4. Call the core generation function.
          const dishResult = generateDish(dishType, selectedNationValues, baseFormat, themeVal);
          
          // 5. Display the results.
          displayResults(dishResult);
        } catch (error) {
          // WHY: A try...catch block is essential. It catches any errors during generation and
          // allows us to display a friendly message instead of crashing the script.
          console.error("Error during dish generation:", error);
          displayError(error);
        }
      }, 50);
    });
  });
});