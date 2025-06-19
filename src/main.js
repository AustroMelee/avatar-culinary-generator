// src/main.js
import '../styles/style.css';
import bannerSrc from './assets/banner.webp';
import { generateDish } from './core/dishGenerator.js';
import { NATIONS } from './core/constants.js';
import {
  displayRichDish,
  setupNationCheckboxes,
  showLoadingState,
} from './utils/domUtils.js';
import { initializeRNG } from './utils/random.js';

/**
 * Attaches the main event listener once the document is fully loaded.
 * WHY: Wrapping in "DOMContentLoaded" ensures the script doesn't try to find HTML elements
 * before they exist on the page, which would cause errors.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Set banner image
  const bannerImage = document.getElementById('banner-image');
  if (bannerImage) {
    bannerImage.src = bannerSrc;
  }

  // Initialize RNG from URL seed if present
  const urlParams = new URLSearchParams(window.location.search);
  const seed = urlParams.get('seed');
  initializeRNG(seed);

  // Set up dynamic nation checkboxes
  setupNationCheckboxes(Object.values(NATIONS));

  // Find the main generation button
  const generateBtn = document.getElementById('generate-btn');
  if (!generateBtn) {
    console.error(
      "CRITICAL ERROR: The button with id 'generate-btn' was not found. Script cannot execute."
    );
    return;
  }

  // Attach the single, definitive click event listener
  generateBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent form submission

    // 1. Show the loading state in the UI.
    showLoadingState('Conjuring a new culinary masterpiece...');

    // 2. Gather user selections from the form.
    const dishType = document.getElementById('dishTypeInput').value;
    const selectedNationValues = Array.from(
      document.querySelectorAll("input[name='nation']:checked")
    ).map((input) => input.value);
    const themeVal = document.getElementById('specialThemes').value;
    const baseFormat = document.getElementById('baseFormat').value;

    if (selectedNationValues.length === 0) {
      showLoadingState('Please select at least one nation to draw inspiration from.', true);
      return;
    }

    // 3. Defer generation slightly to ensure UI update.
    setTimeout(async () => {
      try {
        // 4. Call the core generation function with all parameters.
        const dishResult = await generateDish(
          dishType,
          selectedNationValues,
          baseFormat,
          themeVal
        );

        // 5. Display the complete, rich result.
        displayRichDish(dishResult);
      } catch (error) {
        // 6. If an error occurs, log it and display a user-friendly message.
        console.error('Error during dish generation:', error);
        showLoadingState(
          'A culinary mishap has occurred! The spirits are in disarray.',
          true
        );
      }
    }, 50);
  });
});
