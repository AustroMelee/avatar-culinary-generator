import { getRandomElement, shuffleArray } from '../utils/random.js';
import { validateStringAndLog } from '../utils/textUtils.js';

/**
 * @typedef {import('../types.js').Ingredient} Ingredient
 */

const FLAVOR_TEMPLATES = [
  'Delicate aromas of {notes} mingle, creating a harmonious tasting experience.',
  'A complex profile of {notes}, balanced with a subtle finish.',
  'This dish features notes of {notes}, evoking the essence of its homeland.',
  'Expect a delightful journey through flavors of {notes}.',
  'Tangy {note1} and earthy {note2} are balanced by hints of sweet {note3} and floral {note4}.',
  'Cool {note1} and fresh {note2} give way to a warm, {note3} finish.',
];

/**
 * Generates a descriptive flavor notes string for the dish.
 * @param {Ingredient[]} ingredients
 * @returns {string} The generated flavor notes.
 */
export function generateFlavorNotes(ingredients) {
  const allNotes = ingredients.flatMap(ing => ing.flavorNotes || []);
  if (allNotes.length === 0) {
    return 'A dish with a mysterious flavor profile.';
  }

  const uniqueNotes = shuffleArray([...new Set(allNotes)]);
  const template = getRandomElement(FLAVOR_TEMPLATES);

  let noteString;
  if (template.includes('{note1}')) {
    // Handle specific note templates
    noteString = template
      .replace('{note1}', uniqueNotes[0] || 'subtlety')
      .replace('{note2}', uniqueNotes[1] || 'complexity')
      .replace('{note3}', uniqueNotes[2] || 'character')
      .replace('{note4}', uniqueNotes[3] || 'freshness');
  } else {
    // Handle generic list template
    const selectedNotes = uniqueNotes.slice(0, Math.min(uniqueNotes.length, 4));
    if (selectedNotes.length > 1) {
      const lastNote = selectedNotes.pop();
      noteString = template.replace('{notes}', `${selectedNotes.join(', ')}, and ${lastNote}`);
    } else {
      noteString = template.replace('{notes}', selectedNotes[0] || 'a unique taste');
    }
  }

  return validateStringAndLog(noteString, 'Flavor Notes');
} 