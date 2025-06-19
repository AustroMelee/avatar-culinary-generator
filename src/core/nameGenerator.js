// src/core/nameGenerator.js

import {
  genericAdjectives,
  genericDishNouns,
  themes as allThemes,
} from './data/index.js';
import { getRandomElement } from '../utils/random.js';
import { getPrimaryIngredient, getSecondaryIngredient } from './utils.js';
import { validateStringAndLog } from '../utils/textUtils.js';

/**
 * @typedef {import('../types.js').Ingredient} Ingredient
 * @typedef {import('../types.js').NationData} NationData
 * @typedef {import('../types.js').NationKey} NationKey
 * @typedef {import('../types.js').DishType} DishType
 * @typedef {import('../types.js').Theme} Theme
 * @typedef {import('../types.js').NationTag} NationTag
 * @typedef {import('../types.js').NameFormat} NameFormat
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
const getIngredientType = (ing) =>
  ing && Array.isArray(ing.type)
    ? ing.type
    : typeof ing.type === 'string'
      ? [ing.type]
      : [];
/** @param {Ingredient} ing @returns {string[]} */
const getIngredientFlavorNotes = (ing) =>
  ing && Array.isArray(ing.flavorNotes) ? ing.flavorNotes : [];

/**
 * Replaces placeholders in a template string with values from a data object.
 * @param {string} templateString The string containing placeholders (e.g., "{adj} {noun}").
 * @param {Record<string, any>} dataObject The object with keys matching the placeholders.
 * @returns {string} The interpolated string.
 */
function interpolateTemplate(templateString, dataObject) {
  if (typeof templateString !== 'string') {
    return '';
  }
  let result = templateString;

  result = result.replace(/\{(.*?)\}/g, (match, key) => {
    const trimmedKey = key.trim();
    if (dataObject.hasOwnProperty(trimmedKey)) {
      let value = dataObject[trimmedKey];
      if (typeof value === 'object' && value !== null && value.name) {
        value = getIngredientName(value, true);
      }
      return String(value);
    }
    return match;
  });

  return result.replace(/\{([A-Za-z_]+)\}/g, (match, p1) => {
    return dataObject[p1] !== undefined
      ? String(dataObject[p1])
      : `[${p1.replace(/_/g, ' ').toLowerCase()}]`;
  });
}

/**
 * Generates a structured name for the dish.
 * @param {Ingredient[]} ingredients
 * @param {DishType} dishType
 * @param {string} baseFormat
 * @returns {string} The generated dish name.
 */
export function generateStructuredName(
  nations,
  ingredients,
  dishType,
  baseFormat
) {
  const nameData = {};
  const primaryIngredient = ingredients.find(ing => ing.role === 'primary');

  // If baseFormat is 'Default' or falsy, use the dishType as the format.
  nameData.format = (baseFormat && baseFormat !== 'Default') ? baseFormat : dishType;
  nameData.mainIngredient = primaryIngredient ? primaryIngredient.name : getRandomElement(genericDishNouns);
  nameData.nationAdj = nations.length > 0 ? nations[0].split(' ')[0] : 'Elemental'; // e.g., "Fire" from "Fire Nation"
  
  // A simple, default name pattern. More complex patterns could be chosen from data files.
  const nameTemplate = `{nationAdj} {mainIngredient} {format}`;

  const generatedName = interpolateTemplate(nameTemplate, nameData)
    .replace(/\s+/g, ' ')
    .trim() || 'Unnamed Culinary Creation';

  const finalName = generatedName.replace(/\s+/g, ' ').trim();
  return validateStringAndLog(finalName, 'Dish Name');
}

/**
 * Finds the most suitable adjective for the dish based on nation and theme.
 */
function findMostSuitableAdjective(dishName) {
  // Implementation of findMostSuitableAdjective function
}
