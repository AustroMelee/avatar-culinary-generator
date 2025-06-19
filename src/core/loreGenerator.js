// src/core/loreGenerator.js

import { getRandomElement } from '../utils/random.js';
import { LORE_LIBRARY } from './data/index.js';

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
 * Selects a lore template based on the ingredients provided.
 * @param {Ingredient[]} ingredients The ingredients in the dish.
 * @returns {string} A lore template string.
 */
export function getLoreTemplate(ingredients) {
  let potentialLore = [];

  // 1. Check for special, rare combinations
  const ingredientNames = new Set(ingredients.map(ing => ing.name));
  if (ingredientNames.has('Moon Peach') && ingredientNames.has('Summit Ginseng')) {
    return getRandomElement(LORE_LIBRARY.ECLIPSE_DISH);
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
  
  return getRandomElement(potentialLore) || LORE_LIBRARY.default[0];
}
