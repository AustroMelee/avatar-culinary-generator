/**
 * Checks a generated string for any leftover placeholder tokens (e.g., "{placeholder}").
 * If found, it logs a detailed error to the console. This is a critical quality check
 * to ensure users never see raw, unprocessed template fragments.
 *
 * @param {string} text - The generated text to validate.
 * @param {string} source - The origin of the text (e.g., 'Dish Name', 'Concept').
 * @returns {string} The original, validated text.
 */
export function validateStringAndLog(text, source) {
  if (typeof text !== 'string') {
    console.error(`[Validation Error] Expected a string from ${source}, but received:`, text);
    return ''; // Return an empty string to prevent further errors.
  }

  const leftovers = text.match(/\{[^{}]+\}/g);

  if (leftovers && leftovers.length > 0) {
    console.error(
      `[Text Generation Error] Found unprocessed placeholders in "${source}": ${leftovers.join(
        ', '
      )}`,
      `\nFull Text: "${text}"`
    );
  }

  return text;
} 