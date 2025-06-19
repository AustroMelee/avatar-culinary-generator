// src/core/loreGenerator.js

import { getRandomElement } from '../utils/random.js';
import { LORE_LIBRARY, LORE_PLACEHOLDERS } from './data/index.js';
import { validateStringAndLog } from '../utils/textUtils.js';

/**
 * @typedef {import('../types.js').Ingredient} Ingredient
 * @typedef {import('../types.js').NationKey} NationKey
 * @typedef {import('../types.js').DishType} DishType
 * @typedef {import('../types.js').Theme} Theme
 * @typedef {import('../types.js').Rarity} Rarity
 * @typedef {import('../types.js').NationTag} NationTag
 */

/** @param {Ingredient} ing @param {boolean} [base=false] @returns {string} */
const getIngredientName = (ing, base = false) =>
  ing && ing.name
    ? base
      ? ing.name.split(' (')[0]
      : ing.name
    : 'Unknown Ingredient';
/** @param {Ingredient} ing @returns {NationTag[]} */
const getIngredientTags = (ing) =>
  ing && Array.isArray(ing.tags) ? ing.tags : [];
/** @param {Ingredient} ing @returns {string[]} */
const getIngredientLoreHints = (ing) =>
  ing && Array.isArray(ing.loreHints) ? ing.loreHints : [];
/** @param {Ingredient} ing @returns {Rarity} */
const getIngredientRarity = (ing) =>
  ing && ing.rarity ? ing.rarity : 'common';

/** @type {Set<string>} */
let globalLoreHistory = new Set();
const MAX_LORE_HISTORY = 10;

/**
 * Fills placeholders in a lore template with specific names from the lore library.
 * @param {string} template The lore template string.
 * @returns {string} The processed lore string.
 */
function populateLoreTemplate(template) {
  return template
    .replace(/\{monk_name\}/g, getRandomElement(LORE_PLACEHOLDERS.monks))
    .replace(/\{temple_name\}/g, getRandomElement(LORE_PLACEHOLDERS.temples))
    .replace(/\{bison_name\}/g, getRandomElement(LORE_PLACEHOLDERS.bison));
}

/**
 * Generates a lore snippet for a given dish, prioritizing ingredient-specific lore.
 * @param {string} name The name of the dish.
 * @param {string[]} nations The nations associated with the dish.
 * @param {Ingredient[]} ingredients The ingredients in the dish.
 * @returns {string | null} A lore snippet, or null if none could be generated.
 */
export function generateLore(name, nations, ingredients) {
  let potentialLore = [];

  // 1. Check for special, rare combinations
  const ingredientNames = new Set(ingredients.map(ing => ing.name));
  if (ingredientNames.has('Moon Peach') && ingredientNames.has('Summit Ginseng')) {
    potentialLore.push(...LORE_LIBRARY.ECLIPSE_DISH);
  }

  // 2. Gather lore from ingredient hints
  const hints = ingredients.flatMap(ing => ing.loreHints || []);
  const uniqueHints = [...new Set(hints)];

  uniqueHints.forEach(hint => {
    if (LORE_LIBRARY[hint]) {
      potentialLore.push(...LORE_LIBRARY[hint]);
    }
  });

  // 3. If no specific lore was found, use the default
  if (potentialLore.length === 0) {
    potentialLore.push(...LORE_LIBRARY.default);
  }
  
  // 4. Select a template and populate it
  const template = getRandomElement(potentialLore);
  if (!template) {
    return null; // Should be rare
  }

  let generatedLore = populateLoreTemplate(template)
    .replace(/\{nation_name\}/g, nations[0] || 'the Four Nations')
    .replace(/\{Dish_Name\}/g, name);
    
  const primaryIngredient = ingredients.find(ing => ing.role === 'primary');
  if (primaryIngredient) {
    generatedLore = generatedLore.replace(/\{mainIngredient\}/gi, primaryIngredient.name);
  }

  return validateStringAndLog(generatedLore, 'Dish Lore');
}
