// src/core/loreGenerator.js

import { getRandomElement } from '@utils/random.js';
import { DISH_LORE_TEMPLATES } from '@data/index.js';

/**
 * @typedef {import('@src/types.js').Ingredient} Ingredient
 * @typedef {import('@src/types.js').NationKey} NationKey
 * @typedef {import('@src/types.js').DishType} DishType
 * @typedef {import('@src/types.js').Theme} Theme
 * @typedef {import('@src/types.js').Rarity} Rarity
 * @typedef {import('@src/types.js').NationTag} NationTag
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
 * @param {Ingredient[]} allSelectedIngredients
 * @param {string[]} nationDisplayNames
 * @param {NationKey[]} finalNationKeys
 * @param {Theme} themeVal
 * @param {DishType} dishType
 * @param {string} generatedName
 * @returns {string} The generated dish lore.
 */
export function generateDishLore(
  allSelectedIngredients,
  nationDisplayNames,
  finalNationKeys,
  themeVal,
  dishType,
  generatedName
) {
  const LORE_TEMPLATES = DISH_LORE_TEMPLATES || {
    byIngredientHint: {},
    byTheme: {},
    byNation: {},
    generic: [],
    _placeholders: {},
  };
  /** @type {{text: string, priority: number}[]} */
  let loreCandidates = [];
  const placeholders = LORE_TEMPLATES._placeholders;
  const primaryNationForLore =
    nationDisplayNames && nationDisplayNames.length > 0
      ? nationDisplayNames[0]
      : 'an unknown land';

  allSelectedIngredients
    .filter((i) => i && !getIngredientTags(i).includes('placeholder'))
    .forEach((ing) => {
      const ingNameStripped = getIngredientName(ing, true);
      const hints = getIngredientLoreHints(ing);
      if (LORE_TEMPLATES.byIngredientHint[ingNameStripped]) {
        loreCandidates.push({
          text: getRandomElement(
            LORE_TEMPLATES.byIngredientHint[ingNameStripped]
          ),
          priority: 0.5,
        });
      }
      hints.forEach((hintKey) => {
        if (LORE_TEMPLATES.byIngredientHint[hintKey]) {
          loreCandidates.push({
            text: getRandomElement(LORE_TEMPLATES.byIngredientHint[hintKey]),
            priority: 1,
          });
        }
      });
    });

  // Add more lore candidates based on theme, nation, etc.
  // ... (This would be a simplified version of the blob logic)

  if (LORE_TEMPLATES.generic) {
    loreCandidates.push({
      text: getRandomElement(LORE_TEMPLATES.generic),
      priority: 3,
    });
  }

  if (loreCandidates.length === 0)
    return 'The history of this dish is shrouded in delicious mystery.';

  loreCandidates.sort((a, b) => a.priority - b.priority);
  let chosenLore = loreCandidates[0].text;

  /** @type {Record<string, string>} */
  let loreData = {
    nation_name: primaryNationForLore,
    Dish_Name: generatedName,
    Dish_Type: dishType.toLowerCase(),
    ...Object.keys(placeholders).reduce((acc, key) => {
      if (placeholders[key] && Array.isArray(placeholders[key])) {
        acc[key] = getRandomElement(placeholders[key]);
      }
      return acc;
    }, {}),
  };

  return chosenLore.replace(
    /\{(\w+)\}/g,
    (match, key) => loreData[key] || match
  );
}
