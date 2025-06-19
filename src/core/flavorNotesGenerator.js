import { getRandomElement, shuffleArray } from '../utils/random.js';
import { validateStringAndLog } from '../utils/textUtils.js';

/**
 * @typedef {import('../types.js').Ingredient} Ingredient
 */

const STANDARD_TEMPLATES = [
  '{note1} and {note2} are balanced by a surprising finish of {note3}.',
  '{note1} opens the palate, followed by {note2} and a whisper of {note3}.',
  '{note1} leads the profile, complemented by an undercurrent of {note2} and a hint of {note3}.',
];

const RARE_FLAVOR_TEMPLATES = [
  '{note1} mingles with {rare_note}, lingering long after a final touch of {note2}.',
  '{rare_note} defines the experience, weaving through threads of {note1} and {note2}.',
  '{note1} provides a base for the extraordinary taste of {rare_note}, which is lifted by {note2}.',
];

/**
 * Capitalizes the first letter of a string.
 * @param {string} s
 * @returns {string}
 */
const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || '';

/**
 * Decapitalizes the first letter of a string.
 * @param {string} s
 * @returns {string}
 */
const decapitalize = (s) => (s && s[0].toLowerCase() + s.slice(1)) || '';

/**
 * Generates a descriptive flavor notes string for the dish.
 * @param {Ingredient[]} ingredients
 * @returns {string} The generated flavor notes.
 */
export function generateFlavorNotes(ingredients) {
  const allNotes = ingredients.flatMap((ing) => ing.flavorNotes || []);
  if (allNotes.length < 3) {
    return 'A dish with a simple, harmonious flavor profile.';
  }

  const uniqueNotes = [...new Set(allNotes)];
  const shuffledNotes = shuffleArray(uniqueNotes);

  const rareIngredient = ingredients.find(
    (ing) =>
      ing.rarity === 'rare' ||
      ing.rarity === 'epic' ||
      ing.rarity === 'legendary'
  );
  
  let template;
  let noteString;

  if (rareIngredient && rareIngredient.flavorNotes?.length > 0) {
    template = getRandomElement(RARE_FLAVOR_TEMPLATES);
    const rareNote = getRandomElement(rareIngredient.flavorNotes);
    
    // Ensure the rare note isn't also used as a common note
    const commonNotes = shuffledNotes.filter(n => n !== rareNote);

    noteString = template
      .replace('{rare_note}', decapitalize(rareNote))
      .replace('{note1}', decapitalize(commonNotes[0] || 'subtlety'))
      .replace('{note2}', decapitalize(commonNotes[1] || 'complexity'));
  } else {
    template = getRandomElement(STANDARD_TEMPLATES);
    noteString = template
      .replace('{note1}', decapitalize(shuffledNotes[0] || 'subtlety'))
      .replace('{note2}', decapitalize(shuffledNotes[1] || 'complexity'))
      .replace('{note3}', decapitalize(shuffledNotes[2] || 'character'));
  }

  return validateStringAndLog(capitalize(noteString), 'Flavor Notes');
} 