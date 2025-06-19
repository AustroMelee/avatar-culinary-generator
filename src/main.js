// src/main.js
import '../styles/style.css';
import bannerSrc from './assets/banner.webp';

// WHY: These imports bring in the core logic and UI utility functions from their separate modules.
// This keeps the entry point file clean and focused on event handling and workflow.
import { generateDish, generateDefaultDish } from './core/dishGenerator.js';
import { NATIONS } from './core/constants.js';
import {
  updateUIForLoading,
  displayResults,
  displayError,
  displayRichDish,
} from './utils/domUtils.js';
import { initializeRNG } from './utils/random.js';

/**
 * Attaches the main event listener once the document is fully loaded.
 * WHY: Wrapping in "DOMContentLoaded" ensures the script doesn't try to find HTML elements
 * before they exist on the page, which would cause errors.
 */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('banner-image').src = bannerSrc;
  const urlParams = new URLSearchParams(window.location.search);
  const isDemoMode = urlParams.get('demo') === 'true';

  // Initialize the RNG at startup, checking for a URL parameter.
  const seed = urlParams.get('seed');
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

  // If in demo mode, generate and display the default dish immediately.
  if (isDemoMode) {
    const defaultDish = generateDefaultDish();
    displayResults(defaultDish);
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

        // FOR UI TESTING: Use the default dish to avoid data loading errors
        // const dishResult = generateDefaultDish();

        // 5. Display the results.
        displayRichDish(dishResult);
      } catch (error) {
        // WHY: A try...catch block is essential. It catches any errors during generation and
        // allows us to display a friendly message instead of crashing the script.
        console.error('Error during dish generation:', error);
        displayError(error);
      }
    }, 50);
  });
});

async function generateAndDisplayDish() {
  const resultContainer = document.getElementById('dish-result-container');
  const loadingIndicator = document.getElementById('loading-indicator');

  try {
    // Show loading indicator and hide previous result
    resultContainer.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');

    // Simulate a short delay to make the loading feel more substantial
    await new Promise((resolve) => setTimeout(resolve, 300));

    const selectedNations = getSelectedNations();
    const dishType = document.getElementById('dish-type-select').value;
    const dish = generateDish(dishType, selectedNations);

    displayDish(dish);
  } catch (error) {
    console.error('[Critical Generation Failure]', 'An unexpected error occurred during dish generation.', error);
    displayDish(null); // Display a generic failure message to the user
  } finally {
    // Always hide the loading indicator
    loadingIndicator.classList.add('hidden');
  }
}

/**
 * Runs a single generation-and-validation cycle for testing purposes.
 * @returns {{dishName: string, errors: string[]}} The result of the test run.
 */
function runSingleTestGeneration() {
  const errors = [];
  const dish = generateDish('Main Course', ['Air Nomads']);

  if (!dish || !dish.name) {
    errors.push('Dish generation failed completely, returned null or no name.');
    return { dishName: 'GENERATION FAILED', errors };
  }

  // 1. Check for missing roles
  if (dish.missingRoles && dish.missingRoles.length > 0) {
    errors.push(`Missing Roles: ${dish.missingRoles.join(', ')}`);
  }

  // 2. Check for empty ingredients
  if (!dish.ingredients || dish.ingredients.length === 0) {
    errors.push('Ingredients array is empty.');
  }

  // 3. Check for duplicate ingredients
  const ingredientNames = new Set();
  dish.ingredients.forEach((ing) => {
    if (ingredientNames.has(ing.name)) {
      errors.push(`Duplicate Ingredient: ${ing.name}`);
    }
    ingredientNames.add(ing.name);
  });

  // 4. Check for leftover placeholders
  const textFields = {
    Name: dish.name,
    Concept: dish.concept,
    Notes: dish.notes,
    Lore: dish.lore,
  };
  for (const [field, text] of Object.entries(textFields)) {
    if (text && /\{[^{}]+\}/.test(text)) {
      errors.push(`Unprocessed placeholder in ${field}: ${text}`);
    }
  }

  return { dishName: dish.name, errors };
}

/**
 * Runs a suite of 20 test generations and logs results to the console.
 */
async function runTestSuite() {
  console.clear();
  console.log('--- 🧪 Starting Test Suite: 20 Air Nomad Main Courses 🧪 ---');
  const loadingIndicator = document.getElementById('loading-indicator');
  loadingIndicator.classList.remove('hidden');

  await new Promise((resolve) => setTimeout(resolve, 100)); // Brief delay for UI update

  for (let i = 1; i <= 20; i++) {
    const result = runSingleTestGeneration();
    if (result.errors.length === 0) {
      console.log(
        `%cPASS (%c${i}/20%c) - ${result.dishName}`,
        'color: #22c55e; font-weight: bold;',
        'color: #a3a3a3; font-weight: normal;',
        'color: #f0f0f0; font-weight: normal;'
      );
    } else {
      console.log(
        `%cFAIL (%c${i}/20%c) - ${result.dishName}`,
        'color: #ef4444; font-weight: bold;',
        'color: #a3a3a3; font-weight: normal;',
        'color: #f0f0f0; font-weight: normal;'
      );
      result.errors.forEach((err) => console.log(`  %c↳ ${err}`, 'color: #fca5a5;'));
    }
  }

  loadingIndicator.classList.add('hidden');
  console.log('--- ✅ Test Suite Complete ---');
}

/**
 * Initializes the application, sets up event listeners, and performs initial setup.
 */
function initializeApp() {
  // Check for Dev Mode via hostname or URL parameter (?dev=true)
  const urlParams = new URLSearchParams(window.location.search);
  const isDevHost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';
  const isDevParam = urlParams.get('dev') === 'true';

  if (isDevHost || isDevParam) {
    const devTools = document.getElementById('dev-tools');
    if (devTools) {
      devTools.classList.remove('hidden');
      document
        .getElementById('run-test-suite-btn')
        .addEventListener('click', runTestSuite);
    }
  }

  const generateBtn = document.getElementById('generate-btn');
  const nationCheckboxes = document.querySelectorAll('.nation-checkbox');

  // ... existing code ...
}
