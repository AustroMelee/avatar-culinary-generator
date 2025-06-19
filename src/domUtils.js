// src/core/dishGenerator.js

// WHY: Importing types allows for strong type-checking within this module.
/** @typedef {import('../types.js').DishResult} DishResult */
/** @typedef {import('../types.js').Ingredient} Ingredient */
/** @typedef {import('../types.js').NationData} NationData */

// WHY: Importing functions from other modules keeps this file focused on orchestration.
// It delegates specific tasks (managing ingredients, generating names) to specialized modules.
// Using `.js` in the import path is often necessary for browser-based ES modules.
import { collectAndFilterAvailableIngredients, selectIngredientByRoleFromCandidates, isValidIngredientForDishType } from './ingredientManager.js';
import { generateStructuredName } from './nameGenerator.js';
import { generateDishLore } from './loreGenerator.js';
import { generateConceptAndNotes } from './descriptionGenerator.js';

/**
 * Orchestrates the entire dish generation process.
 * WHY: This function acts as the "main conductor". It takes user input, calls specialized modules,
 * and assembles the final, structured result. This separation of concerns makes the code easier to manage.
 * @param {string} dishType The type of dish selected by the user.
 * @param {string[]} nationNamesInput The nations selected by the user.
 * @param {string} baseFormat The culinary format selected by the user.
 * @param {string} themeVal The special theme selected by the user.
 * @returns {DishResult} A structured DishResult object.
 */
export function generateDish(dishType, nationNamesInput, baseFormat, themeVal) {
  // 1. Collect and filter all possible ingredients.
  // WHY: This creates the "palette" of ingredients, respecting the user's cultural choices.
  const { availableIngredientObjects, selectedNationsData, finalNationKeys, nationDisplayNames } = 
    collectAndFilterAvailableIngredients(nationNamesInput, dishType, themeVal);

  /** @type {Ingredient[]} */
  const allSelectedIngredients = [];
  /** @type {Set<string>} */
  const currentDishIngredientsTracker = new Set();
  /** @type {Record<string, number>} */
  const nationContribution = {};
  finalNationKeys.forEach(key => (nationContribution[key] = 0));

  // 2. Define and fill the required roles for the dish structure.
  // WHY: This ensures every dish has a coherent structure (e.g., base, primary).
  const rolesToFill = ['base', 'primary', 'accent', 'seasoning', 'garnish'];
  const MINIMUM_INGREDIENTS = (dishType === "Beverage" || dishType === "Sauce/Condiment") ? 2 : 3;

  for (const role of rolesToFill) {
      const candidates = availableIngredientObjects.filter(ing => 
          isValidIngredientForDishType(ing, role, dishType, finalNationKeys)
      );
      const itemToAdd = selectIngredientByRoleFromCandidates(
          role, candidates, currentDishIngredientsTracker, finalNationKeys, nationContribution
      );
      if (itemToAdd) {
          itemToAdd.role = /** @type {Ingredient['role']} */ (role);
          allSelectedIngredients.push(itemToAdd);
          currentDishIngredientsTracker.add(itemToAdd.name);
          if (itemToAdd.sourceNationKey && finalNationKeys.includes(itemToAdd.sourceNationKey)) {
              nationContribution[itemToAdd.sourceNationKey]++;
          }
      }
  }

  // 3. Ensure minimum ingredient count.
  // WHY: This prevents overly simple dishes by adding fallback ingredients if needed.
  while (allSelectedIngredients.length < MINIMUM_INGREDIENTS) {
      const fallbackIngredient = availableIngredientObjects.find(ing => !currentDishIngredientsTracker.has(ing.name));
      if (fallbackIngredient) {
          fallbackIngredient.role = 'accent';
          allSelectedIngredients.push(fallbackIngredient);
          currentDishIngredientsTracker.add(fallbackIngredient.name);
      } else { break; }
  }
  
  // 4. Generate each part of the dish description by calling specialized modules.
  // WHY: Delegating tasks makes each function smaller and more focused.
  const generatedName = generateStructuredName(selectedNationsData, allSelectedIngredients, dishType, baseFormat, themeVal, finalNationKeys, nationDisplayNames);
  const { concept, notes } = generateConceptAndNotes(generatedName, allSelectedIngredients, dishType, baseFormat, themeVal, finalNationKeys, nationDisplayNames);
  const generatedLore = generateDishLore(allSelectedIngredients, nationDisplayNames, finalNationKeys, themeVal, dishType, generatedName);

  // 5. Assemble and return the final, structured result object.
  // WHY: Returning a single, well-defined object provides a clean contract between the logic and UI layers.
  return {
    name: generatedName,
    concept: concept,
    ingredients: allSelectedIngredients,
    notes: notes,
    lore: generatedLore,
  };
}