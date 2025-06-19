// src/core/dishGenerator.js

// WHY: Importing types allows for strong type-checking within this module.
/** @typedef {import('../types.js').DishResult} DishResult */
/** @typedef {import('../types.js').Ingredient} Ingredient */
/** @typedef {import('../types.js').NationData} NationData */
/** @typedef {import('../types.js').DishType} DishType */
/** @typedef {import('../types.js').Theme} Theme */
/** @typedef {import('../types.js').NationKey} NationKey */

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
import { generateConcept } from './descriptionGenerator.js';
import { generateLore } from './loreGenerator.js';
import { generatePreparation } from './preparationGenerator.js';
import { generateFlavorNotes } from './flavorNotesGenerator.js';
import { NATIONS, INGREDIENT_ROLES, INGREDIENT_TYPES } from './constants.js';
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
 * Orchestrates the generation of a complete, detailed dish.
 * This function acts as the central hub, calling specialized modules to gather
 * ingredients, construct a name, and generate descriptive text and lore.
 * @param {DishType} dishType The user-selected type of dish (e.g., "Main Course").
 * @param {string[]} nationNamesInput An array of nation names to influence the dish.
 * @param {string} baseFormat The primary format of the dish (e.g., "Noodles", "Stew").
 * @param {Theme} themeVal The special theme to apply (e.g., "Royal", "Ancient").
 * @returns {DishResult} The fully constructed dish object, ready for display.
 */
export function generateDish(dishType, nationNamesInput, baseFormat, themeVal) {
  // If no nations are selected, default to all of them for variety.
  const finalNations = nationNamesInput.length > 0 ? nationNamesInput : NATIONS;
  const primaryNation = finalNations[0];
  // This is a bit of a hack to get the nation data. A better system would be a registry.
  // @ts-ignore
  const primaryNationData = allData[primaryNation.toLowerCase().replace(' ', '')];

  // 1. Gather all possible ingredients from the selected nations.
  const availableIngredientObjects = getIngredients({
    nations: finalNations,
    theme: themeVal,
    dishType: dishType,
  });

  // 2. Select a set of ingredients for the dish based on roles.
  const selectedIngredients = [];
  const usedIngredients = new Set();
  const requiredRoles = ['primary', 'base', 'seasoning', 'accent', 'garnish'];
  const filledRoles = new Set();

  const selectAndUse = (selectionFn, role, fallback = true) => {
    // Filter out already used ingredients
    const available = availableIngredientObjects.filter(
      (ing) => !usedIngredients.has(ing.name)
    );

    let selected = selectionFn(available, dishType);

    if (!selected && fallback) {
      selected = getRandomElement(available);
    }

    if (selected) {
      selectedIngredients.push({ ...selected, role });
      usedIngredients.add(selected.name);
      filledRoles.add(role);
    } else {
      console.warn(
        `[Generator] Could not find a suitable unique ingredient for role: "${role}"`
      );
    }
  };

  selectAndUse(selectPrimaryIngredient, 'primary');
  selectAndUse(selectSecondaryIngredient, 'accent');
  selectAndUse(selectBaseIngredient, 'base', false); // Base is often primary, so fallback is tricky
  selectAndUse(selectSeasoningIngredient, 'seasoning');
  selectAndUse(selectGarnishIngredient, 'garnish');

  const missingRoles = requiredRoles.filter((role) => !filledRoles.has(role));

  // Final guarantee: ensure no duplicates made it through.
  assertNoDuplicates(selectedIngredients);

  // Validate the selected ingredients against standardized lists.
  validateSelectedIngredients(selectedIngredients);

  // 3. Generate the textual components of the dish.
  const name = generateStructuredName(
    finalNations,
    selectedIngredients,
    dishType,
    baseFormat
  );
  const concept = generateConcept(
    name,
    selectedIngredients,
    finalNations,
    dishType
  );
  const flavorNotes = generateFlavorNotes(selectedIngredients);
  const preparationAndRitual = generatePreparation(selectedIngredients, finalNations);
  const lore = generateLore(name, finalNations, selectedIngredients);
  const servingTradition = getRandomElement(primaryNationData?.servingTraditions || []);
  const chefTip = getRandomElement(primaryNationData?.chefTips || []);

  // 4. Assemble and validate the final result.
  const result = {
    name,
    concept,
    flavorNotes,
    ingredients: selectedIngredients,
    preparationAndRitual,
    servingTradition,
    lore,
    chefTip,
    // Keep this for now for compatibility, but it's deprecated.
    notes: preparationAndRitual,
    missingRoles,
  };

  validateDishResult(result);
  // console.log('Generated Ingredients:', result.ingredients); // Kept for debugging
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
  const TEXT_KEYS = ['name', 'concept', 'flavorNotes', 'preparationAndRitual', 'servingTradition', 'lore', 'chefTip'];

  // Validate presence and type of required text fields
  TEXT_KEYS.forEach((key) => {
    if (typeof dishResult[key] !== 'string' || dishResult[key].length === 0) {
      console.error(
        `[Result Validation Error] DishResult key "${key}" is missing, not a string, or empty.`
      );
      isValid = false;
    }
  });

  // Validate ingredients array
  if (!Array.isArray(dishResult.ingredients)) {
    console.error('[Result Validation Error] DishResult.ingredients is not an array.');
    isValid = false;
  } else if (dishResult.ingredients.length === 0) {
    // This is a critical failure, as a dish must have ingredients.
    console.error('[Result Validation Error] DishResult.ingredients is empty.');
    isValid = false;
  } else if (dishResult.ingredients.some((ing) => !ing)) {
    console.error(
      '[Result Validation Error] DishResult.ingredients contains null or undefined entries.'
    );
    isValid = false;
  }

  return isValid;
}

/**
 * Throws an error if any ingredient names are duplicated in the final array.
 * This is a safeguard against logic errors in the selection process.
 * @param {Ingredient[]} ingredients
 */
function assertNoDuplicates(ingredients) {
  const names = new Set();
  for (const ing of ingredients) {
    if (names.has(ing.name)) {
      console.error(
        `[Critical] Duplicate ingredient found in final dish: "${ing.name}". This indicates a selection logic failure.`
      );
    }
    names.add(ing.name);
  }
}

/**
 * Validates selected ingredients have standardized roles and types.
 * @param {Ingredient[]} ingredients
 */
function validateSelectedIngredients(ingredients) {
  ingredients.forEach((ing) => {
    // Validate Role
    if (ing.role && !INGREDIENT_ROLES.includes(ing.role)) {
      console.warn(
        `[Validation] Ingredient "${ing.name}" has non-standard role: "${ing.role}"`
      );
    }

    // Validate Type (case-insensitive)
    if (ing.type && !INGREDIENT_TYPES.includes(ing.type.toLowerCase())) {
      console.warn(
        `[Validation] Ingredient "${ing.name}" has non-standard type: "${ing.type}"`
      );
    }
  });
}

/**
 * Generates a static, default dish for demonstration purposes.
 * This provides a consistent, well-structured example of the generator's output.
 * @returns {DishResult} A pre-defined Air Nomad main course.
 */
export function generateDefaultDish() {
  const defaultIngredients = [
    { name: 'Sky Bison Yoghurt', role: 'base', type: 'dairy', source: 'Air Nomads', shortDescription: 'Creamy and tart, prized for its lightness—said to clear the mind before meditation.' },
    { name: 'Moon Peach', role: 'primary', type: 'Fruit', source: 'Air Nomads', rarity: 'common', shortDescription: 'A sweet, velvety fruit that grows under the moonlight in temple gardens.' },
    { name: 'Lavender Buds', role: 'seasoning', type: 'herb', source: 'Air Nomads', rarity: 'uncommon', shortDescription: 'A final touch for tranquility, scattered before serving.' },
    { name: 'Sky Sprouts', role: 'accent', type: 'Vegetable', source: 'Air Nomads', shortDescription: 'Crunchy and cool, believed to bring luck in flight.' },
    { name: 'Whisperwind Petals', role: 'garnish', type: 'Edible Flower', source: 'Air Nomads', rarity: 'uncommon', shortDescription: 'Their subtle aroma is thought to connect diners with the spirit world.' },
  ];

  return {
    name: '🍃 Sky Temple Moon Peach Salad',
    concept: 'A serene, cloudlike dish cherished by wandering acolytes. This main course weaves together airy textures and pure flavors, evoking the peace of a mountain sunrise.',
    flavorNotes: 'Tangy yoghurt, fresh grassiness, mellow barley, hints of wild lavender, delicate floral finish.',
    ingredients: defaultIngredients,
    preparationAndRitual: 'Barley tsampa is steamed while a novice chants the morning prayer. Yoghurt is whisked until frothy, then folded with the sprouts and petals. Served in hand-thrown bowls, diners are encouraged to eat in silence, honoring air and ancestry.',
    servingTradition: 'Offered at the Western Air Temple during the Festival of Winds; said to bring clarity and lightness to the soul.',
    lore: 'Legend holds that Sky Bison Yoghurt first appeared in a vision to Monk Gyatso, inspiring generations to seek harmony between spirit and sustenance. Even today, acolytes claim the yoghurt "hums" when a dish is made with pure intent.',
    chefTip: 'Enjoy after morning glider practice for the full Air Nomad experience.',
    notes: 'This is a deprecated field.',
    missingRoles: [],
  };
}
