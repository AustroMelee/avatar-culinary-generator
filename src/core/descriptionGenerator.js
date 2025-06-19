// src/core/descriptionGenerator.js

import { themes as allThemes } from './data/index.js';
import { getRandomElement } from '../utils/random.js';

/**
 * @typedef {import('../types.js').Ingredient} Ingredient
 * @typedef {import('../types.js').NationData} NationData
 * @typedef {import('../types.js').NationKey} NationKey
 * @typedef {import('../types.js').DishType} DishType
 * @typedef {import('../types.js').Theme} Theme
 */

/** @param {Ingredient} ing @param {boolean} [base=false] @returns {string} */
const getIngredientName = (ing, base = false) =>
  ing && ing.name
    ? base
      ? ing.name.split(' (')[0]
      : ing.name
    : 'Unknown Ingredient';

/**
 * Generates the concept and notes for the dish.
 * @param {string} generatedName
 * @param {Ingredient[]} allSelectedIngredients
 * @param {DishType} dishType
 * @param {string} baseFormat
 * @param {Theme} themeVal
 * @param {NationKey[]} finalNationKeys
 * @param {string[]} nationDisplayNames
 * @param {Record<NationKey, NationData>} nations
 * @returns {{concept: string, notes: string}} The generated concept and notes.
 */
export function generateConceptAndNotes(
  generatedName,
  allSelectedIngredients,
  dishType,
  baseFormat,
  themeVal,
  finalNationKeys,
  nationDisplayNames,
  nations
) {
  /** @type {string[]} */
  let conceptParts = [];
  /** @type {string[]} */
  let notesParts = [];

  // Concept Generation
  let actualNationsString = nationDisplayNames.join(' and ');
  let dishCategory = dishType.toLowerCase();
  conceptParts.push(
    `A ${dishCategory} creation that embodies the distinctive spirit of ${actualNationsString}.`
  );

  const currentThemeData = themeVal && allThemes[themeVal];
  if (currentThemeData && currentThemeData.conceptMod) {
    conceptParts.push(currentThemeData.conceptMod);
  }

  // Notes Generation
  let prepIntro = `This dish is brought to life through traditional techniques, honoring the traditions of ${nationDisplayNames.join(' and ')}.`;
  notesParts.push(prepIntro);

  let finalPlatingNotesForNotes = '';
  const primaryNationKeyForPlating =
    finalNationKeys && finalNationKeys.length > 0
      ? finalNationKeys[0]
      : 'earthKingdom';
  const platingNationData = nations[primaryNationKeyForPlating];
  if (platingNationData && platingNationData.platingNotes) {
    finalPlatingNotesForNotes =
      'Presentation is an art form here. ' +
      getRandomElement(platingNationData.platingNotes);
  }
  notesParts.push(finalPlatingNotesForNotes);

  const generatedConcept = conceptParts.join(' ');
  const generatedNotes = notesParts.join(' ');

  return {
    concept: generatedConcept,
    notes: generatedNotes,
  };
}
