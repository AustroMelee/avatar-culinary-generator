// src/utils/domUtils.js

import { formatIngredient } from '../core/ingredientManager.js';

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
    if (ingObj && ingObj.name) {
      li.textContent = formatIngredient(ingObj);
    } else {
      li.textContent = 'Invalid ingredient data';
    }
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

/**
 * Displays the generated dish details in the UI.
 * @param {DishResult | null} dishResult - The dish object to display, or null if generation failed.
 */
export function displayDish(dishResult) {
  const nameEl = document.getElementById('dish-name');
  const conceptEl = document.getElementById('dish-concept');
  const ingredientsListEl = document.getElementById('ingredients-list');
  const notesEl = document.getElementById('dish-notes');
  const loreEl = document.getElementById('dish-lore');
  const resultContainer = document.getElementById('dish-result-container');
  const warningContainer = document.getElementById('role-warning-container');

  // Always clear previous warnings
  if (warningContainer) warningContainer.innerHTML = '';
  if (ingredientsListEl) ingredientsListEl.innerHTML = '';

  if (!dishResult) {
    if (nameEl) nameEl.textContent = 'Could not generate a dish. Please try again!';
    if (conceptEl) conceptEl.textContent = '';
    if (notesEl) notesEl.textContent = '';
    if (loreEl) loreEl.textContent = '';
    if (resultContainer) resultContainer.classList.add('hidden');
    return;
  }

  // Display role warnings if any roles were not filled
  if (
    warningContainer &&
    dishResult.missingRoles &&
    dishResult.missingRoles.length > 0
  ) {
    const roles = dishResult.missingRoles.join(', ');
    warningContainer.textContent = `Warning: Could not find a suitable ingredient for the following roles: ${roles}. The generated dish may be incomplete.`;
  }

  if (nameEl) nameEl.textContent = dishResult.name;
  if (conceptEl) conceptEl.textContent = dishResult.concept;
  if (notesEl) notesEl.textContent = dishResult.notes;

  if (ingredientsListEl && dishResult.ingredients?.length > 0) {
    dishResult.ingredients.forEach((ingredient) => {
      const li = document.createElement('li');
      li.textContent = formatIngredient(ingredient);
      ingredientsListEl.appendChild(li);
    });
  }

  if (loreEl) {
    if (dishResult.lore) {
      loreEl.textContent = dishResult.lore;
      loreEl.parentElement.classList.remove('hidden');
    } else {
      loreEl.textContent = '';
      loreEl.parentElement.classList.add('hidden');
    }
  }

  if (resultContainer) resultContainer.classList.remove('hidden');
}

/**
 * Sets up the nation selection checkboxes, loading from constants.
 * @param {string[]} nations - An array of nation names.
 */
export function setupNationCheckboxes(nations) {
  // Implementation of setupNationCheckboxes function
}

/**
 * Creates a styled section for the dish output.
 * @param {string} title - The title of the section.
 * @param {string} content - The text content of the section.
 * @param {string} [icon=''] - An optional icon to display before the title.
 * @returns {HTMLElement} The created section element.
 */
function createSection(title, content, icon = '') {
  const section = document.createElement('div');
  section.className = 'dish-section';

  const titleEl = document.createElement('h3');
  titleEl.innerHTML = `${icon} ${title}`;
  section.appendChild(titleEl);

  const contentEl = document.createElement('p');
  contentEl.innerHTML = content; // Using innerHTML to allow for bolding or other simple tags
  section.appendChild(contentEl);

  return section;
}

/**
 * Displays the richly formatted dish result in the UI.
 * @param {DishResult} dishResult
 */
export function displayRichDish(dishResult) {
  const resultContainer = document.getElementById('dishResult');
  if (!resultContainer) return;

  // Clear previous results and show the container
  resultContainer.innerHTML = '';
  resultContainer.style.display = 'block';

  const {
    name,
    concept,
    flavorNotes,
    ingredients,
    preparationAndRitual,
    servingTradition,
    lore,
    chefTip,
  } = dishResult;

  // 1. Dish Name
  const nameEl = document.createElement('h2');
  nameEl.id = 'dishName';
  nameEl.textContent = name;
  resultContainer.appendChild(nameEl);

  // 2. Concept
  if (concept) {
    resultContainer.appendChild(createSection('Concept', concept, '💡'));
  }

  // 3. Flavor Notes
  if (flavorNotes) {
    resultContainer.appendChild(createSection('Flavor Notes', flavorNotes, '-'));
  }

  // 4. Key Ingredients
  if (ingredients && ingredients.length > 0) {
    const section = document.createElement('div');
    section.className = 'dish-section';
    const titleEl = document.createElement('h3');
    titleEl.innerHTML = '🌱 Key Ingredients & Roles';
    section.appendChild(titleEl);
    const listEl = document.createElement('ul');
    listEl.id = 'ingredientList';
    ingredients.forEach(ing => {
      const li = document.createElement('li');
      li.classList.add(`rarity-${ing.rarity || 'common'}`);
      
      const roleAndType = `(${ing.role}, ${ing.type})`;
      const shortDesc = ing.shortDescription ? `— <em>${ing.shortDescription}</em>` : '';
      
      li.innerHTML = `<strong>${ing.name}</strong> ${roleAndType} ${shortDesc}`;
      listEl.appendChild(li);
    });
    section.appendChild(listEl);
    resultContainer.appendChild(section);
  }
  
  // 5. Preparation & Ritual
  if (preparationAndRitual) {
    resultContainer.appendChild(createSection('Preparation & Ritual', preparationAndRitual, '🥣'));
  }
  
  // 6. Serving Tradition
  if (servingTradition) {
    resultContainer.appendChild(createSection('Serving Tradition', servingTradition, '🏮'));
  }

  // 7. Lore
  if (lore) {
    resultContainer.appendChild(createSection('Lore', lore, '📜'));
  }

  // 8. Chef's Tip
  if (chefTip) {
    const tipSection = createSection("Chef's Tip", chefTip, '🧑‍🍳');
    tipSection.classList.add('chef-tip');
    resultContainer.appendChild(tipSection);
  }
}
