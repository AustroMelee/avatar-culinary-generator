// src/core/nameGenerator.js

import {
  genericAdjectives,
  genericDishNouns,
  themes as allThemes,
} from '@data/index.js';
import { getRandomElement } from '@utils/random.js';

/**
 * @typedef {import('@src/types.js').Ingredient} Ingredient
 * @typedef {import('@src/types.js').NationData} NationData
 * @typedef {import('@src/types.js').NationKey} NationKey
 * @typedef {import('@src/types.js').DishType} DishType
 * @typedef {import('@src/types.js').Theme} Theme
 * @typedef {import('@src/types.js').NationTag} NationTag
 * @typedef {import('@src/types.js').NameFormat} NameFormat
 */

/** @param {Ingredient} ing @param {boolean} [base=false] @returns {string} */
const getIngredientName = (ing, base = false) =>
  ing && ing.name
    ? base
      ? ing.name.split(' (')[0]
      : ing.name
    : 'Unknown Ingredient';
/** @param {Ingredient} ing @returns {NationTag[]} */
const getIngredientTags = (ing) =>
  ing && Array.isArray(ing.tags) ? ing.tags : [];
/** @param {Ingredient} ing @returns {string[]} */
const getIngredientType = (ing) =>
  ing && Array.isArray(ing.type)
    ? ing.type
    : typeof ing.type === 'string'
      ? [ing.type]
      : [];
/** @param {Ingredient} ing @returns {string[]} */
const getIngredientFlavorNotes = (ing) =>
  ing && Array.isArray(ing.flavorNotes) ? ing.flavorNotes : [];

/**
 * Replaces placeholders in a template string with values from a data object.
 * @param {string} templateString The string containing placeholders (e.g., "{adj} {noun}").
 * @param {Record<string, any>} dataObject The object with keys matching the placeholders.
 * @returns {string} The interpolated string.
 */
function interpolateTemplate(templateString, dataObject) {
  if (typeof templateString !== 'string') {
    return '';
  }
  let result = templateString;

  result = result.replace(/\{(.*?)\}/g, (match, key) => {
    const trimmedKey = key.trim();
    if (dataObject.hasOwnProperty(trimmedKey)) {
      let value = dataObject[trimmedKey];
      if (typeof value === 'object' && value !== null && value.name) {
        value = getIngredientName(value, true);
      }
      return String(value);
    }
    return match;
  });

  return result.replace(/\{([A-Za-z_]+)\}/g, (match, p1) => {
    return dataObject[p1] !== undefined
      ? String(dataObject[p1])
      : `[${p1.replace(/_/g, ' ').toLowerCase()}]`;
  });
}

/**
 * Generates a structured name for the dish.
 * @param {Record<NationKey, NationData>} selectedNationsData
 * @param {Ingredient[]} allSelectedIngredients
 * @param {DishType} dishType
 * @param {string} baseFormat
 * @param {Theme} themeVal
 * @param {NationKey[]} finalNationKeys
 * @param {string[]} nationDisplayNames
 * @returns {string} The generated dish name.
 */
export function generateStructuredName(
  selectedNationsData,
  allSelectedIngredients,
  dishType,
  baseFormat,
  themeVal,
  finalNationKeys,
  nationDisplayNames
) {
  /** @type {NameFormat[]} */
  let potentialNameFormats = [];
  const primaryNationKey =
    finalNationKeys && finalNationKeys.length > 0 ? finalNationKeys[0] : null;
  const primaryNationData = primaryNationKey
    ? selectedNationsData[primaryNationKey]
    : null;
  const primaryNationDisplayName =
    nationDisplayNames && nationDisplayNames.length > 0
      ? nationDisplayNames[0]
      : 'Elemental';
  const themeData = allThemes[themeVal];

  let nameData = {
    dishType: dishType,
    format: baseFormat || dishType,
    mainIngredient: 'Essence',
    secondaryIngredient: 'Whispers',
    themeAdj:
      themeData && Array.isArray(themeData.adj)
        ? getRandomElement(themeData.adj)
        : '',
    nationAdj:
      primaryNationData && Array.isArray(primaryNationData.adjectives)
        ? getRandomElement(primaryNationData.adjectives)
        : primaryNationDisplayName.split(' ')[0],
    flavorAdj:
      getRandomElement(
        genericAdjectives.filter(
          (adj) => !adj.endsWith('y') && !adj.endsWith('ing') && adj.length > 5
        )
      ) || 'Flavorful',
    culturalSymbol: 'Elemental Harmony',
    avatarName: getRandomElement([
      'Roku',
      'Kyoshi',
      'Yangchen',
      'Aang',
      'Korra',
      'Wan',
    ]),
    emotion: getRandomElement([
      'Joyful',
      'Nostalgic',
      'Spirited',
      'Bold',
      'Comforting',
    ]),
    mainIngredient1: 'Component A',
    mainIngredient2: 'Component B',
  };

  const primaryIngObj = allSelectedIngredients.find(
    (i) =>
      i && i.role === 'primary' && !getIngredientTags(i).includes('placeholder')
  );
  const baseIngObj = allSelectedIngredients.find(
    (i) =>
      i && i.role === 'base' && !getIngredientTags(i).includes('placeholder')
  );
  let mainNameIngredientObj = primaryIngObj || baseIngObj;

  if (mainNameIngredientObj) {
    nameData.mainIngredient = getIngredientName(mainNameIngredientObj, true);
  } else {
    nameData.mainIngredient = getRandomElement(genericDishNouns);
  }
  nameData.mainIngredient1 = nameData.mainIngredient;

  let secondaryNameIngredientObj = allSelectedIngredients.find(
    (i) =>
      i &&
      i.role === 'accent' &&
      !getIngredientTags(i).includes('placeholder') &&
      getIngredientName(i) !== getIngredientName(mainNameIngredientObj)
  );
  if (secondaryNameIngredientObj) {
    nameData.secondaryIngredient = getIngredientName(
      secondaryNameIngredientObj,
      true
    );
  } else {
    nameData.secondaryIngredient =
      (getIngredientFlavorNotes(mainNameIngredientObj)[0] || 'Subtle').split(
        '_'
      )[0] + ' Notes';
  }
  nameData.mainIngredient2 = nameData.secondaryIngredient;

  if (finalNationKeys && finalNationKeys.length > 0) {
    finalNationKeys.forEach((key) => {
      if (selectedNationsData[key] && selectedNationsData[key].nameFormats) {
        potentialNameFormats.push(...selectedNationsData[key].nameFormats);
      }
    });
  }
  if (themeData && themeData.nameFormats) {
    potentialNameFormats.push(...themeData.nameFormats);
  }

  let nameFormatTemplate = getRandomElement(
    potentialNameFormats.filter((f) => f && f.pattern)
  );

  if (!nameFormatTemplate) {
    /** @type {NameFormat} */
    nameFormatTemplate = {
      pattern: `{nationAdj} {mainIngredient} {format}`,
      slots: {},
    };
  }

  let generatedNameStr = interpolateTemplate(
    nameFormatTemplate.pattern,
    nameData
  );

  return (
    generatedNameStr.replace(/\s+/g, ' ').trim() || 'Unnamed Culinary Creation'
  );
}
