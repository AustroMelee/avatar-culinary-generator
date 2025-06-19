// src/core/preparationGenerator.js

import { getRandomElement } from '../utils/random.js';
import { validateStringAndLog } from '../utils/textUtils.js';

/**
 * @typedef {import('../types.js').Ingredient} Ingredient
 */

// --- Helper Functions ---

/**
 * Checks if an ingredient name is likely plural.
 * A simple check for "s" at the end, avoiding words that end in "ss".
 * @param {string} name The ingredient name.
 * @returns {boolean} True if the name is likely plural.
 */
function isPlural(name) {
  if (!name) return false;
  const lower = name.toLowerCase();
  return lower.endsWith('s') && !lower.endsWith('ss');
}

/**
 * Selects the verb form based on whether the ingredient is plural.
 * @param {Ingredient} ingredient The ingredient object.
 * @returns {{verb: string, pVerb: string}} 'is'/'are' and 'is'/'are'.
 */
function getVerb(ingredient) {
  return isPlural(ingredient.name)
    ? { verb: 'are', pVerb: 'are' }
    : { verb: 'is', pVerb: 'is' };
}

/**
 * Finds the most important ingredient to be the subject of the preparation.
 * Prioritizes 'base', then 'primary', then the first ingredient.
 * @param {Ingredient[]} ingredients
 *returns {Ingredient} The focal ingredient.
 */
function getFocalIngredient(ingredients) {
  return (
    ingredients.find((ing) => ing.role === 'base') ||
    ingredients.find((ing) => ing.role === 'primary') ||
    ingredients[0]
  );
}

// --- Template Fragments ---

const PREP_ACTIONS = {
  default: [
    'gently folded with {secondary}',
    'carefully layered with {secondary}',
    'artfully arranged with {secondary}',
    'quickly tossed with {secondary}',
  ],
  liquid: [
    'infused with the essence of {secondary}',
    'swirled with a hint of {secondary}',
    'gently blended with {secondary}',
  ],
};

const RITUAL_FINISHES = [
  'and served immediately to capture its vibrant essence',
  'in a spiral pattern, symbolizing the eternal cycle of seasons',
  'while a soft chant is hummed, honoring the spirits of the ingredients',
  'just as the sun sets, aligning the dish with the twilight energies',
  'to create a beautiful contrast of color and texture',
];

// --- Main Generator ---

/**
 * Generates a more logical and grammatically correct preparation description.
 * @param {Ingredient[]} ingredients
 * @returns {string} The generated preparation steps.
 */
export function generatePreparation(ingredients) {
  if (!ingredients || ingredients.length === 0) {
    return 'The ingredients are combined with care.';
  }

  const focalIngredient = getFocalIngredient(ingredients);
  const secondaryIngredient =
    ingredients.find((ing) => ing.role === 'accent') ||
    ingredients.find((ing) => ing.role === 'garnish') ||
    ingredients.find((ing) => ing !== focalIngredient);

  const { verb } = getVerb(focalIngredient);

  const mainPrep = `${focalIngredient.name} ${verb} ${getRandomElement([
    'sliced paper-thin',
    'crushed gently',
    'warmed slowly',
    'whisked until frothy',
    'steamed to perfection',
  ])}`;

  let secondaryAction = '';
  if (secondaryIngredient) {
    const actionType =
      focalIngredient.type === 'liquid' ? 'liquid' : 'default';
    secondaryAction = getRandomElement(PREP_ACTIONS[actionType]).replace(
      '{secondary}',
      secondaryIngredient.name
    );
  }

  const ritual = getRandomElement(RITUAL_FINISHES);

  const fullPreparation = `${mainPrep}, then ${secondaryAction} ${ritual}.`;

  return validateStringAndLog(fullPreparation, 'Dish Preparation');
} 