// src/core/preparationGenerator.js

import { getRandomElement } from '../utils/random.js';
import { PREPARATION_TEMPLATES } from './data/index.js';
import { validateStringAndLog } from '../utils/textUtils.js';

/**
 * @typedef {import('../types.js').Ingredient} Ingredient
 * @typedef {import('../types.js').NationKey} NationKey
 */

/**
 * Generates the preparation steps for the dish.
 * @param {Ingredient[]} ingredients
 * @param {string[]} nations
 * @returns {string} The generated preparation steps.
 */
export function generatePreparation(ingredients, nations) {
  const primaryNation = nations[0] || 'the Four Nations';
  const template = getRandomElement(PREPARATION_TEMPLATES);

  if (!template) {
    return 'The ingredients are combined.';
  }

  const primaryIngredient = ingredients.find(ing => ing.role === 'primary')?.name || 'the main ingredient';
  const secondaryIngredient = ingredients.find(ing => ing.role === 'accent')?.name || 'another ingredient';
  const baseIngredient = ingredients.find(ing => ing.role === 'base')?.name || 'the base';
  const seasoningIngredient = ingredients.find(ing => ing.role === 'seasoning')?.name || 'spices';
  const garnishIngredient = ingredients.find(ing => ing.role === 'garnish')?.name || 'a garnish';

  const generatedPreparation = template
    .replace(/\{nation_name\}/g, primaryNation)
    .replace(/\{mainIngredient\}/g, primaryIngredient)
    .replace(/\{primaryIngredient\}/g, primaryIngredient)
    .replace(/\{secondaryIngredient\}/g, secondaryIngredient)
    .replace(/\{baseIngredient\}/g, baseIngredient)
    .replace(/\{seasoningIngredient\}/g, seasoningIngredient)
    .replace(/\{garnishIngredient\}/g, garnishIngredient)
    // A simple placeholder for cooking verbs for now
    .replace(/\{cooking_verb\}/g, getRandomElement(['prepared', 'cooked', 'mixed', 'blended']));

  return validateStringAndLog(generatedPreparation, 'Dish Preparation');
} 