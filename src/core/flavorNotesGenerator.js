import { getRandomElement, shuffleArray } from '../utils/random.js';
import { validateStringAndLog } from '../utils/textUtils.js';

/**
 * @typedef {import('../types.js').Ingredient} Ingredient
 */

const STANDARD_TEMPLATES = [
  'A delicate balance of {note1} and {note2}, with a surprising finish of {note3}.',
  'Opens with a wave of {note1}, followed by gentle notes of {note2} and a whisper of {note3}.',
  'The profile is led by {note1}, complemented by an undercurrent of {note2} and a hint of {note3}.',
];

const RARE_FLAVOR_TEMPLATES = [
  'The experience begins with {note1} and {note2}, but is defined by the rare, lingering sensation of {rare_note}.',
  'While notes of {note1} are present, the true character comes from {rare_note}, finishing with a touch of {note2}.',
  'A complex journey of flavor, starting with {note1} and culminating in the extraordinary taste of {rare_note}.',
];

/**
 * Capitalizes the first letter of a string.
 * @param {string} s
 * @returns {string}
 */
const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || '';

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
      .replace('{rare_note}', rareNote)
      .replace('{note1}', commonNotes[0] || 'subtlety')
      .replace('{note2}', commonNotes[1] || 'complexity');
  } else {
    template = getRandomElement(STANDARD_TEMPLATES);
    noteString = template
      .replace('{note1}', shuffledNotes[0] || 'subtlety')
      .replace('{note2}', shuffledNotes[1] || 'complexity')
      .replace('{note3}', shuffledNotes[2] || 'character');
  }

  return validateStringAndLog(capitalize(noteString), 'Flavor Notes');
} 