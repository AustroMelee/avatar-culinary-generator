// src/utils/domUtils.js

/**
 * @typedef {import('../types.js').DishResult} DishResult
 * @typedef {import('../types.js').Ingredient} Ingredient
 */

/**
 * Cleans redundant phrases and corrects articles in a given text.
 * @param {string} text The text to clean.
 * @returns {string} The cleaned text.
 */
function cleanRedundantPhrases(text) {
  if (typeof text !== 'string') return text;
  let cleanedText = text;

  const vowels = 'aeiou';

  cleanedText = cleanedText.replace(
    /\b(an)\s+([uU][nN][iI][qQ][uU][eE]|[uU][nN][iI][FfSsTtCc]|[eE][uU])/g,
    'a $2'
  );
  cleanedText = cleanedText.replace(/\b(a|an)\s+\1\b/gi, '$1');

  cleanedText = cleanedText.replace(
    /\b(a|an) +([a-zA-Z\{][\w\{]*)/gi,
    (match, article, word) => {
      const firstLetter = word[0].toLowerCase();
      const isVowelSound =
        vowels.includes(firstLetter) &&
        !word.toLowerCase().startsWith('uni') &&
        !word.toLowerCase().startsWith('eu') &&
        !word.toLowerCase().startsWith('one');

      if (article.toLowerCase() === 'a' && isVowelSound) {
        return `an ${word}`;
      } else if (article.toLowerCase() === 'an' && !isVowelSound) {
        return `a ${word}`;
      }
      return match;
    }
  );

  cleanedText = cleanedText.replace(
    /its (a|an) (\w+ [\w_'-]+) and (its|the) (a|an)? \2/gi,
    'its $2'
  );
  cleanedText = cleanedText.replace(
    /its (a|an) (\w+ [\w_'-]+) and \2/gi,
    'its $2'
  );
  cleanedText = cleanedText.replace(
    /its (a|an) (\w+) character/gi,
    'its $2 character'
  );
  cleanedText = cleanedText.replace(
    /its (a|an) (\w+) essence/gi,
    'its $2 essence'
  );
  cleanedText = cleanedText.replace(
    /\bof an? ancient set of an? ancient\b/gi,
    'of a set of ancient'
  );
  cleanedText = cleanedText.replace(/\b(\w+)\s+\1\b/gi, '$1');
  cleanedText = cleanedText.replace(
    /a touch of an elegant touch/gi,
    'an elegant touch'
  );

  return cleanedText.replace(/\s+/g, ' ').trim();
}

/**
 * Updates the UI to show a loading state before generation.
 * @returns {void}
 */
export function updateUIForLoading() {
  document.getElementById('dishName').textContent =
    'Conjuring a new culinary masterpiece...';
  document.getElementById('dishConcept').textContent =
    'The spirits of the four nations are whispering their secrets...';
  document.getElementById('ingredientList').innerHTML = '';
  document.getElementById('dishNotes').textContent =
    'Please wait while the elemental kitchens are hard at work.';
  document.getElementById('dishLore').style.display = 'none';
  document.getElementById('dishResult').style.display = 'block';
}

/**
 * Displays the final generated dish results in the UI.
 * @param {DishResult} dishResult The generated dish object.
 * @returns {void}
 */
export function displayResults(dishResult) {
  const { name, concept, ingredients, notes, lore } = dishResult;

  document.getElementById('dishName').textContent = cleanRedundantPhrases(name);
  document.getElementById('dishConcept').textContent =
    cleanRedundantPhrases(concept);

  const ingredientListEl = document.getElementById('ingredientList');
  ingredientListEl.innerHTML = '';
  ingredients.forEach((ingObj) => {
    const li = document.createElement('li');
    const rarityText =
      ingObj.rarity && ingObj.rarity !== 'common'
        ? `; Rarity: ${ingObj.rarity}`
        : '';
    li.textContent = `${ingObj.name} (Role: ${ingObj.role || 'unknown'}; Type: ${ingObj.type}; Source: ${ingObj.sourceNation || 'Unknown'})${rarityText}`;
    ingredientListEl.appendChild(li);
  });

  document.getElementById('dishNotes').textContent =
    cleanRedundantPhrases(notes);

  if (lore) {
    document.getElementById('loreText').textContent =
      cleanRedundantPhrases(lore);
    document.getElementById('dishLore').style.display = 'block';
  } else {
    document.getElementById('dishLore').style.display = 'none';
  }

  document.getElementById('dishResult').style.display = 'block';
}

/**
 * Displays an error message in the UI.
 * @param {Error} error The error object to display.
 * @returns {void}
 */
export function displayError(error) {
  document.getElementById('dishName').textContent = 'A Culinary Mishap!';
  document.getElementById('dishConcept').textContent =
    'The spirits seem to be in disarray. An error occurred during generation.';
  document.getElementById('ingredientList').innerHTML = '';
  document.getElementById('dishNotes').textContent =
    `Error details: ${error.message}. Please check the console for more information.`;
  document.getElementById('dishLore').style.display = 'none';
  document.getElementById('dishResult').style.display = 'block';
}
