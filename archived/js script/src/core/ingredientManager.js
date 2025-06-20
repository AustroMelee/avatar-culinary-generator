// src/core/ingredientManager.js

import {
  airNomads,
  waterTribes,
  earthKingdom,
  fireNation,
  unitedRepublic,
  spiritWorld,
} from './data/index.js';
import { getRandomElement } from '../utils/random.js';
import { NATIONS } from './constants.js';

/** @typedef {import('../types.js').Ingredient} Ingredient */
/** @typedef {import('../types.js').DishType} DishType */

const NATION_DATA_MAP = {
  'Air Nomads': airNomads,
  'Water Tribes': waterTribes,
  'Earth Kingdom': earthKingdom,
  'Fire Nation': fireNation,
  'United Republic': unitedRepublic,
  'Spirit World': spiritWorld,
};

/**
 * Validates a single ingredient entry to ensure it has all required fields and correct types.
 * This is the primary gatekeeper for data quality from the source files.
 * @param {object} ingredient - The ingredient object to validate.
 * @param {string} id - A unique identifier for the ingredient (e.g., 'fireNation-spices-0') for logging.
 * @returns {boolean} True if the ingredient is valid, false otherwise.
 */
export function validateIngredientEntry(ingredient, id) {
  let isValid = true;
  const logError = (field, message) => {
    console.error(
      `[Ingredient Validation Error] Ingredient "${
        ingredient.name || 'UNKNOWN'
      }" (id: ${id}): Field "${field}" ${message}.`
    );
    isValid = false;
  };

  // Check for required string fields
  ['name', 'type', 'source'].forEach((field) => {
    if (typeof ingredient[field] !== 'string' || ingredient[field].length === 0) {
      logError(field, 'is missing, not a string, or empty');
    }
  });

  // Check for required boolean fields
  ['canBeBase', 'rawCompatible'].forEach((field) => {
    if (typeof ingredient[field] !== 'boolean') {
      logError(field, 'is missing or not a boolean');
    }
  });

  // Check for required array-of-strings fields
  ['rolePreference', 'tags', 'flavorNotes'].forEach((field) => {
    if (
      !Array.isArray(ingredient[field]) ||
      ingredient[field].length === 0 ||
      !ingredient[field].every((item) => typeof item === 'string')
    ) {
      logError(
        field,
        'is missing, not an array, empty, or contains non-string values'
      );
    }
  });

  return isValid;
}

/**
 * Formats a single ingredient object into a user-friendly string with fallbacks.
 * This is used to create the display text in the UI.
 * @param {Ingredient} ingredient - The ingredient object to format.
 * @returns {string} A formatted string describing the ingredient.
 */
export function formatIngredient(ingredient) {
  const name = ingredient.name || 'Unknown Ingredient';
  const parts = [name];
  const details = [];

  details.push(`Role: ${ingredient.role || 'unknown'}`);
  details.push(`Type: ${ingredient.type || 'unknown'}`);

  if (!ingredient.source) {
    console.error('[Formatting Error] Ingredient is missing a source:', ingredient);
    details.push(`Source: Unknown`);
  } else {
    details.push(`Source: ${ingredient.source}`);
  }

  if (ingredient.rarity && ingredient.rarity !== 'common') {
    details.push(`Rarity: ${ingredient.rarity}`);
  }

  if (details.length > 0) {
    parts.push(`(${details.join('; ')})`);
  }

  return parts.join(' ');
}

/**
 * Gathers all ingredients from the specified nations and tags them with their source.
 * @param {{nations?: string[], theme?: string, dishType?: DishType}} options - The filtering options.
 * @returns {Ingredient[]} A combined array of all available ingredients.
 */
export function getIngredients(options) {
  const { nations = [] } = options;
  const allIngredients = [];

  // Add ingredients from selected nations, tagging them with their source nation.
  nations.forEach((nation) => {
    const nationData = NATION_DATA_MAP[nation];
    if (nationData && nationData.ingredients) {
      for (const category in nationData.ingredients) {
        nationData.ingredients[category].forEach((ing, index) => {
          const ingredientWithSource = { ...ing, source: nation };
          // It's a good place to validate each ingredient as it's added.
           if (validateIngredientEntry(ingredientWithSource, `${nation}-${category}-${index}`)) {
            allIngredients.push(ingredientWithSource);
          }
        });
      }
    }
  });

  return allIngredients;
}

/**
 * Selects an ingredient suitable for a primary role in a dish.
 * @param {Ingredient[]} ingredients - The pool of available ingredients.
 * @param {DishType} dishType - The type of dish being made.
 * @returns {Ingredient | undefined} A suitable primary ingredient.
 */
export function selectPrimaryIngredient(ingredients, dishType) {
  const candidates = ingredients.filter(
    (ing) => ing.rolePreference && ing.rolePreference.includes('primary')
  );
  return getRandomElement(candidates);
}

/**
 * Selects an ingredient suitable for a secondary/accent role.
 * @param {Ingredient[]} ingredients - The pool of available ingredients.
 * @param {DishType} dishType - The type of dish being made.
 * @param {Ingredient} primary - The already selected primary ingredient, to avoid duplication.
 * @returns {Ingredient | undefined} A suitable secondary ingredient.
 */
export function selectSecondaryIngredient(ingredients, dishType, primary) {
  const candidates = ingredients.filter(
    (ing) =>
      ing.name !== primary?.name &&
      ing.rolePreference &&
      ing.rolePreference.includes('accent')
  );
  return getRandomElement(candidates);
}

/**
 * Selects an ingredient suitable for a base role.
 * @param {Ingredient[]} ingredients - The pool of available ingredients.
 * @param {DishType} dishType - The type of dish being made.
 * @returns {Ingredient | undefined} A suitable base ingredient.
 */
export function selectBaseIngredient(ingredients, dishType) {
  const candidates = ingredients.filter((ing) => ing.canBeBase);
  return getRandomElement(candidates);
}

/**
 * Selects an ingredient suitable for a seasoning role.
 * @param {Ingredient[]} ingredients - The pool of available ingredients.
 * @param {DishType} dishType - The type of dish being made.
 * @returns {Ingredient | undefined} A suitable seasoning.
 */
export function selectSeasoningIngredient(ingredients, dishType) {
  const candidates = ingredients.filter(
    (ing) => ing.rolePreference && ing.rolePreference.includes('seasoning')
  );
  return getRandomElement(candidates);
}

/**
 * Selects an ingredient suitable for a garnish.
 * @param {Ingredient[]} ingredients - The pool of available ingredients.
 * @param {DishType} dishType - The type of dish being made.
 * @returns {Ingredient | undefined} A suitable garnish.
 */
export function selectGarnishIngredient(ingredients, dishType) {
  const candidates = ingredients.filter(
    (ing) => ing.rolePreference && ing.rolePreference.includes('garnish')
  );
  return getRandomElement(candidates);
}
