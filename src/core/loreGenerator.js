// src/core/loreGenerator.js

import { getRandomElement } from '../utils/random.js';
import { DISH_LORE_TEMPLATES } from './data/index.js';
import { lore as allLore } from './data/index.js';
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
 * Generates a lore snippet for a given dish.
 * @param {string} name The name of the dish.
 * @param {string[]} nations The nations associated with the dish.
 * @param {import('../types.js').Ingredient[]} ingredients The ingredients in the dish.
 * @returns {string | null} A lore snippet, or null if none could be generated.
 */
export function generateLore(name, nations, ingredients) {
  if (!nations || nations.length === 0) {
    return null;
  }
  const primaryNation = nations[0];
  const primaryIngredient = ingredients.find((ing) => ing.role === 'primary');
  
  if (!DISH_LORE_TEMPLATES || DISH_LORE_TEMPLATES.length === 0) {
    return null;
  }
  
  const template = getRandomElement(DISH_LORE_TEMPLATES);
  
  if (!template) {
    return null;
  }
  
  let generatedLore = template
    .replace(/\{nation_name\}/g, primaryNation)
    .replace(/\{Dish_Name\}/g, name);
    
  if (primaryIngredient) {
    generatedLore = generatedLore.replace(/\{mainIngredient\}/gi, primaryIngredient.name);
  }

  return validateStringAndLog(generatedLore, 'Dish Lore');
}
