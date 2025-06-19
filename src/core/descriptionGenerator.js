// src/core/descriptionGenerator.js

import { themes as allThemes } from './data/index.js';
import { getRandomElement } from '../utils/random.js';
import { validateStringAndLog } from '../utils/textUtils.js';

/**
 * @typedef {import('../types.js').Ingredient} Ingredient
 * @typedef {import('../types.js').NationData} NationData
 * @typedef {import('../types.js').NationKey} NationKey
 * @typedef {import('../types.js').DishType} DishType
 * @typedef {import('../types.js').Theme} Theme
 */

/**
 * Generates the concept and notes for the dish.
 * @param {string} name
 * @param {Ingredient[]} ingredients
 * @param {string[]} nations
 * @returns {{concept: string, notes: string}} The generated concept and notes.
 */
export function generateDescription(name, ingredients, nations) {
  /** @type {string[]} */
  let conceptParts = [];
  /** @type {string[]} */
  let notesParts = [];

  // Concept Generation
  let actualNationsString = nations.join(' and ');
  conceptParts.push(
    `A main course creation that embodies the distinctive spirit of ${actualNationsString}.`
  );

  // Notes Generation
  let prepIntro = `This dish is brought to life through traditional techniques, honoring the traditions of ${nations.join(
    ' and '
  )}.`;
  notesParts.push(prepIntro);

  let finalPlatingNotesForNotes =
    'Presentation is an art form here. Served with minimalist elegance on simple, unadorned pottery.';
  notesParts.push(finalPlatingNotesForNotes);

  const generatedConcept = conceptParts.join(' ');
  const generatedNotes = notesParts.join(' ');

  return {
    concept: validateStringAndLog(generatedConcept, 'Dish Concept'),
    notes: validateStringAndLog(generatedNotes, 'Preparation Notes'),
  };
}
