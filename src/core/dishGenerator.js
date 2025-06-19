// src/core/dishGenerator.js

// WHY: Importing types allows for strong type-checking within this module.
/** @typedef {import('@src/types.js').DishResult} DishResult */
/** @typedef {import('@src/types.js').Ingredient} Ingredient */
/** @typedef {import('@src/types.js').NationData} NationData */
/** @typedef {import('@src/types.js').DishType} DishType */
/** @typedef {import('@src/types.js').Theme} Theme */
/** @typedef {import('@src/types.js').NationKey} NationKey */

// WHY: Importing functions from other modules keeps this file focused on orchestration.
// It delegates specific tasks (managing ingredients, generating names) to specialized modules.
// Using `.js` in the import path is often necessary for browser-based ES modules.
import {
  getIngredients,
  selectPrimaryIngredient,
  selectSecondaryIngredient,
  selectTertiaryIngredient,
  selectBaseIngredient,
  selectSeasoningIngredient,
  selectGarnishIngredient,
  formatIngredient,
} from './ingredientManager.js';
import { generateStructuredName } from './nameGenerator.js';
import { generateDescription } from './descriptionGenerator.js';
import { generateLore } from './loreGenerator.js';
import { NATIONS } from './constants.js';
import * as allData from './data/index.js';
import { getRandomElement, rollSeed } from '../utils/random.js';

/**
 * @param {Ingredient} ing
 * @param {boolean} [base=false]
 * @returns {string}
 */
const getIngredientName = (ing, base = false) =>
  ing && ing.name
    ? base
      ? ing.name.split(' (')[0]
      : ing.name
    : 'Unknown Ingredient';

/**
 * Main function to generate a complete dish.
 * @param {DishType} dishType The type of dish (e.g., "Main Course", "Dessert").
 * @param {string[]} nationNamesInput An array of selected nation display names.
 * @param {string} baseFormat The base format of the dish.
 * @param {Theme} themeVal The selected theme.
 * @returns {DishResult} The generated dish object.
 */
export function generateDish(dishType, nationNamesInput, baseFormat, themeVal) {
  const finalNations = nationNamesInput.length > 0 ? nationNamesInput : NATIONS;

  const availableIngredientObjects = getIngredients({
    nations: finalNations,
    theme: themeVal,
    dishType: dishType,
  });

  // Simplified ingredient selection - this is a placeholder for a more robust
  // selection strategy that should be implemented later.
  const primaryIngredient =
    selectPrimaryIngredient(availableIngredientObjects, dishType) ||
    getRandomElement(availableIngredientObjects);
  const secondaryIngredient =
    selectSecondaryIngredient(
      availableIngredientObjects,
      dishType,
      primaryIngredient
    ) || getRandomElement(availableIngredientObjects);
  const baseIngredient =
    selectBaseIngredient(
      availableIngredientObjects,
      dishType,
      primaryIngredient
    ) || primaryIngredient;
  const seasoningIngredient =
    selectSeasoningIngredient(availableIngredientObjects, dishType) ||
    getRandomElement(availableIngredientObjects);
  const garnishIngredient =
    selectGarnishIngredient(availableIngredientObjects, dishType) ||
    getRandomElement(availableIngredientObjects);

  const selectedIngredients = [
    primaryIngredient,
    secondaryIngredient,
    baseIngredient,
    seasoningIngredient,
    garnishIngredient,
  ].filter(Boolean); // Filter out any undefined ingredients

  const name = generateStructuredName(
    finalNations,
    selectedIngredients,
    dishType,
    baseFormat
  );
  const description = generateDescription(
    name,
    selectedIngredients,
    finalNations
  );
  const lore = generateLore(name, finalNations, selectedIngredients);

  const result = {
    name,
    concept: description.concept,
    ingredients: selectedIngredients,
    notes: description.notes,
    lore,
  };

  validateDishResult(result);
  console.log('Generated Ingredients:', result.ingredients);
  return result;
}

/**
 * Validates the final dish result object to ensure all keys exist and are of the correct type.
 * Logs warnings for any validation failures.
 * @param {DishResult} dishResult - The dish result object to validate.
 * @returns {boolean} True if the dish result is valid, false otherwise.
 */
function validateDishResult(dishResult) {
  let isValid = true;
  const requiredKeys = ['name', 'concept', 'ingredients', 'notes'];

  for (const key of requiredKeys) {
    if (!dishResult.hasOwnProperty(key)) {
      console.warn(`[Validation] DishResult is missing required key: "${key}"`);
      isValid = false;
    }
  }

  if (dishResult.hasOwnProperty('ingredients')) {
    if (!Array.isArray(dishResult.ingredients)) {
      console.warn(`[Validation] DishResult "ingredients" is not an array.`);
      isValid = false;
    } else if (dishResult.ingredients.length === 0) {
      console.warn(`[Validation] DishResult "ingredients" array is empty.`);
      // This might be a valid state, so not setting isValid to false, just warning.
    }
  }

  return isValid;
}

/**
 * Generates a static, default dish for demonstration purposes.
 * This provides a consistent, well-structured example of the generator's output.
 * @returns {DishResult} A pre-defined Air Nomad main course.
 */
export function generateDefaultDish() {
  const defaultIngredients = [
    { name: 'Sky Bison Yoghurt', role: 'base', type: 'dairy', source: 'Air Nomads' },
    { name: 'Aero-Melon', role: 'primary', type: 'Fruit', source: 'Air Nomads', rarity: 'uncommon' },
    { name: 'Lavender Buds', role: 'seasoning', type: 'herb', source: 'Air Nomads', rarity: 'uncommon' },
    { name: 'Sky Sprouts', role: 'accent', type: 'Vegetable', source: 'Air Nomads' },
    { name: 'Whisperwind Petals', role: 'garnish', type: 'Edible Flower', source: 'Air Nomads', rarity: 'uncommon' },
  ];

  return {
    name: 'Sky Temple Aero-Melon Salad',
    concept: 'A refreshing main course that embodies the light and spiritual nature of the Air Nomads, focusing on fresh, vegetarian ingredients.',
    ingredients: defaultIngredients,
    notes: 'The Aero-Melon is lightly tossed with a Sky Bison Yoghurt dressing infused with crushed Lavender Buds. Tender Sky Sprouts add a crisp texture, while delicate Whisperwind Petals provide a beautiful and fragrant garnish. The dish is served chilled in a simple, hand-carved wooden bowl.',
    lore: 'A meditative dish often prepared by young acolytes to practice mindfulness. It is said that the subtle hum of the Aero-Melon can only be heard when one\'s mind is truly at peace, making its preparation a spiritual exercise.',
  };
}
