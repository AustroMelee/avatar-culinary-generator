import { getRandomElement, shuffleArray } from '../utils/random.js';
import { validateStringAndLog } from '../utils/textUtils.js';

/**
 * @typedef {import('../types.js').Ingredient} Ingredient
 */

const FLAVOR_TEMPLATES = [
  'A delicate balance of {note1} and {note2}, with a surprising finish of {note3}.',
  'Opens with a wave of {note1}, followed by gentle notes of {note2} and a whisper of {note3}.',
  'The profile is led by {note1}, complemented by an undercurrent of {note2} and a hint of {note3}.',
  'Earthy {note1} and bright {note2} mingle, grounded by a touch of {note3}.',
  'Aromatic {note1} gives way to a complex palate of {note2}, finishing with a clean {note3} note.',
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

  // Filter out notes that are substrings of other notes to avoid repetition
  const filteredNotes = uniqueNotes.filter(note => 
    !uniqueNotes.some(otherNote => note !== otherNote && otherNote.includes(note))
  );

  const shuffledNotes = shuffleArray(filteredNotes);
  
  const note1 = shuffledNotes[0] || 'subtlety';
  const note2 = shuffledNotes[1] || 'complexity';
  const note3 = shuffledNotes[2] || 'character';

  const template = getRandomElement(FLAVOR_TEMPLATES);

  const noteString = template
    .replace('{note1}', note1)
    .replace('{note2}', note2)
    .replace('{note3}', note3);

  return validateStringAndLog(capitalize(noteString), 'Flavor Notes');
} 