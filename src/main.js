// src/main.js
import '../styles/style.css';

// WHY: These imports bring in the core logic and UI utility functions from their separate modules.
// This keeps the entry point file clean and focused on event handling and workflow.
import { generateDish } from '@core/dishGenerator.js';
import { NATIONS } from '@core/constants.js';
import {
  updateUIForLoading,
  displayResults,
  displayError,
} from '@utils/domUtils.js';
import { initializeRNG } from '@utils/random.js';

/**
 * Attaches the main event listener once the document is fully loaded.
 * WHY: Wrapping in "DOMContentLoaded" ensures the script doesn't try to find HTML elements
 * before they exist on the page, which would cause errors.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the RNG at startup, checking for a URL parameter.
  const seed = new URLSearchParams(window.location.search).get('seed');
  initializeRNG(seed);

  // Since we removed the `setupControls` function, we must ensure the form exists.
  // The controls are now expected to be hardcoded in `index.html`.
  const generateBtn = document.getElementById('generate-btn');

  // WHY: A crucial check to ensure the button exists. If not, the app can't function.
  if (!generateBtn) {
    console.error(
      "CRITICAL ERROR: The button with id 'generate-btn' was not found. Script cannot execute."
    );
    return;
  }

  // Attach the click event listener to the button.
  generateBtn.addEventListener('click', (e) => {
    e.preventDefault(); // prevent form submission
    // 1. Read user selections from form fields.
    const dishType = document.getElementById('dishTypeInput').value;
    const selectedNationValues = Array.from(
      document.querySelectorAll("input[name='nation']:checked")
    ).map((input) => input.value);
    const themeVal = document.getElementById('specialThemes').value;
    const baseFormat = 'Default'; // Could be exposed later

    if (selectedNationValues.length === 0) {
      alert('Please select at least one nation!');
      return;
    }

    // 2. Update the UI to show a "loading" state.
    updateUIForLoading();

    // 3. Defer the heavy generation logic.
    // WHY: This ensures the browser renders the "Conjuring..." UI update *before* it gets busy,
    // preventing the UI from appearing to freeze.
    setTimeout(() => {
      try {
        // 4. Call the core generation function.
        const dishResult = generateDish(
          dishType,
          selectedNationValues,
          baseFormat,
          themeVal
        );

        // 5. Display the results.
        displayResults(dishResult);
      } catch (error) {
        // WHY: A try...catch block is essential. It catches any errors during generation and
        // allows us to display a friendly message instead of crashing the script.
        console.error('Error during dish generation:', error);
        displayError(error);
      }
    }, 50);
  });
});
