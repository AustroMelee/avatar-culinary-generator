// src/core/descriptionGenerator.js

import { getRandomElement } from '../utils/random.js';
import { CONCEPT_TEMPLATES } from './data/index.js';
import { validateStringAndLog } from '../utils/textUtils.js';

/**
 * @typedef {import('../types.js').Ingredient} Ingredient
 * @typedef {import('../types.js').NationKey} NationKey
 * @typedef {import('../types.js').DishType} DishType
 */

/**
 * Generates the concept for the dish using templates.
 * @param {string} name The name of the dish.
 * @param {Ingredient[]} ingredients The ingredients in the dish.
 * @param {string[]} nations The nations associated with the dish.
 * @param {DishType} dishType The type of dish.
 * @returns {string} The generated concept.
 */
export function generateConcept(name, ingredients, nations, dishType) {
  const primaryNation = nations[0] || 'the Four Nations';
  const template = getRandomElement(CONCEPT_TEMPLATES);

  if (!template) {
    return 'A dish of mysterious origins.';
  }

  // A real implementation would have a more robust way to get a temple name
  const templeName = `the ${getRandomElement(['Western', 'Eastern', 'Northern', 'Southern'])} Air Temple`;

  const generatedConcept = template
    .replace(/\{nation_name\}/g, primaryNation)
    .replace(/\{dishType\}/g, dishType)
    .replace(/\{temple_name\}/g, templeName);

  return validateStringAndLog(generatedConcept, 'Dish Concept');
}
