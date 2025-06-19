// src/core/loreGenerator.js

import { getRandomElement } from '../utils/random.js';
import { DISH_LORE_TEMPLATES } from './data/index.js';
import { lore as allLore } from './data/index.js';
import { getPrimaryIngredient } from './utils.js';
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
 * Generates lore for the dish.
 * @param {string[]} nations
 * @param {Ingredient[]} ingredients
 * @returns {string} The generated dish lore.
 */
export function generateLore(name, nations, ingredients) {
  const loreTemplates = DISH_LORE_TEMPLATES || { byIngredientHint: {}, generic: [] };
  const primaryNation = nations.length > 0 ? nations[0] : 'an unknown land';

  // Find a lore-worthy ingredient
  const notableIngredient = ingredients.find(
    (ing) =>
      ing &&
      ing.loreHints &&
      ing.loreHints.some((hint) => loreTemplates.byIngredientHint[hint])
  );

  let template = getRandomElement(loreTemplates.generic) || 'A dish with a long and storied history...';

  if (notableIngredient) {
    const hint = notableIngredient.loreHints.find(
      (h) => loreTemplates.byIngredientHint[h]
    );
    if (hint) {
      template = getRandomElement(loreTemplates.byIngredientHint[hint]);
    }
  }

  const generatedLore = template.replace(/\{nation_name\}/g, primaryNation).replace(/\{Dish_Name\}/g, name);

  const finalLore = generatedLore.replace(/{mainIngredient}/gi, getPrimaryIngredient(ingredients).name);

  return validateStringAndLog(finalLore, 'Dish Lore');
}
