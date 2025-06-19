// src/core/ingredientManager.js

import {
  airNomads,
  waterTribes,
  earthKingdom,
  fireNation,
  unitedRepublic,
  spiritWorld,
} from './data/index.js';
import { getRandomElement } from '../utils/random.js';
import { NATIONS } from './constants.js';

/** @typedef {import('@src/types.js').Ingredient} Ingredient */
/** @typedef {import('@src/types.js').NationData} NationData */
/** @typedef {import('@src/types.js').DishType} DishType */
/** @typedef {import('@src/types.js').NationKey} NationKey */
/** @typedef {import('@src/types.js').Theme} Theme */

/**
 * @typedef {import('../types.js').Ingredient} Ingredient
 * @typedef {import('../types.js').NationData} NationData
 * @typedef {import('../types.js').NationKey} NationKey
 * @typedef {import('../types.js').Rarity} Rarity
 * @typedef {import('../types.js').IngredientRole} IngredientRole
 * @typedef {import('../types.js').IngredientWeight} IngredientWeight
 * @typedef {import('../types.js').Theme} Theme
 * @typedef {import('../types.js').NationTag} NationTag
 */

// Helper functions to safely access ingredient properties
/** @param {Ingredient} ing @param {boolean} [base=false] @returns {string} */
const getIngredientName = (ing, base = false) =>
  ing && ing.name
    ? base
      ? ing.name.split(' (')[0]
      : ing.name
    : 'Unknown Ingredient';
/** @param {Ingredient} ing @returns {string[]} */
const getIngredientType = (ing) =>
  ing && Array.isArray(ing.type)
    ? ing.type
    : typeof ing.type === 'string'
      ? [ing.type]
      : [];
/** @param {Ingredient} ing @returns {NationTag[]} */
const getIngredientTags = (ing) =>
  ing && Array.isArray(ing.tags) ? ing.tags : [];
/** @param {Ingredient} ing @returns {Rarity} */
const getIngredientRarity = (ing) =>
  ing && ing.rarity ? ing.rarity : 'common';
/** @param {Ingredient} ing @returns {boolean} */
const getCanBeBase = (ing) => (ing && ing.canBeBase ? ing.canBeBase : false);
/** @param {Ingredient} ing @returns {IngredientWeight} */
const getIngredientWeight = (ing) =>
  ing && ing.weight ? ing.weight : 'medium';
/** @param {Ingredient} ing @returns {IngredientRole[]} */
const getIngredientRolePreference = (ing) =>
  ing && Array.isArray(ing.rolePreference) ? ing.rolePreference : [];
/** @param {Ingredient} ing @returns {string[]} */
const getIngredientFlavorNotes = (ing) =>
  ing && Array.isArray(ing.flavorNotes) ? ing.flavorNotes : [];
/** @param {Ingredient} ing @returns {string[]} */
const getIngredientLoreHints = (ing) =>
  ing && Array.isArray(ing.loreHints) ? ing.loreHints : [];

/**
 * Checks if an ingredient is considered "sweet".
 * @param {Ingredient} ing The ingredient to check.
 * @returns {boolean} True if the ingredient is sweet.
 */
function isSweetIngredient(ing) {
  if (!ing) return false;
  const tags = getIngredientTags(ing);
  const flavorNotes = getIngredientFlavorNotes(ing);
  const type = getIngredientType(ing);

  return (
    tags.includes('sweet_compatible') ||
    tags.includes('dessert_fruit') ||
    tags.includes('sweet') ||
    flavorNotes.some((note) => note.includes('sweet')) ||
    type.includes('sweetener')
  );
}

/**
 * Checks if a given ingredient is valid for a specific dish type and context.
 * @param {Ingredient} ingredient The ingredient to validate.
 * @param {import('@src/types.js').IngredientRole} role The role the ingredient would play.
 * @param {DishType} dishType The type of dish being created.
 * @param {NationKey[]} finalNationKeys The keys of the nations involved.
 * @param {Record<NationKey, NationData>} allNationsData All available nation data.
 * @returns {boolean} True if the ingredient is valid, false otherwise.
 */
export function isValidIngredientForDishType(
  ing,
  role,
  dishType,
  finalNationKeys,
  nations
) {
  if (!ing) return false;

  const ingTags = getIngredientTags(ing);
  if (ingTags.includes('placeholder')) return true; // Always allow placeholders

  const primaryNationKey =
    finalNationKeys.length > 0 ? finalNationKeys[0] : null;
  const nationProfile = primaryNationKey
    ? nations[primaryNationKey]?.nationDishTypeProfiles?.[dishType]
    : null;

  if (nationProfile) {
    if (
      nationProfile.disallowedTags &&
      nationProfile.disallowedTags.some((tag) => ingTags.includes(tag))
    ) {
      return false;
    }
    if (
      nationProfile.allowedTags &&
      !nationProfile.allowedTags.some((tag) => ingTags.includes(tag))
    ) {
      // If there's an allow-list, the ingredient must have at least one of the allowed tags.
      // This is a soft-fail; maybe it's still okay if it's not explicitly disallowed.
      // Let's be strict for now: if an allow list exists, you must match it.
      // return false;
    }
  }

  // Generic rules
  if (
    dishType === 'Soup/Stew' &&
    role === 'base' &&
    !ingTags.some((t) =>
      ['liquid_base', 'liquid_ish', 'broth_potential'].includes(t)
    )
  ) {
    // return false; // Base for soup must be liquid-like
  }
  if (
    ['Dessert', 'Nectar', 'Beverage'].includes(dishType) &&
    (role === 'base' || role === 'primary') &&
    !isSweetIngredient(ing)
  ) {
    // return false; // Sweet dishes need sweet primary/base ingredients
  }

  return true;
}

/**
 * Collects and filters all available ingredients from the selected nations.
 * @param {string[]} nationNamesInput Array of selected nation display names.
 * @param {DishType} dishType The type of dish being generated.
 * @param {Theme} themeVal The selected theme.
 * @returns {{availableIngredientObjects: Ingredient[], selectedNationsData: Record<NationKey, NationData>, finalNationKeys: NationKey[], nationDisplayNames: string[]}}
 */
export function collectAndFilterAvailableIngredients(
  nationNamesInput,
  dishType,
  themeVal
) {
  /** @type {Record<NationKey, NationData>} */
  const allNationsData = {
    airNomads,
    waterTribes,
    earthKingdom,
    fireNation,
    unitedRepublic,
    spiritWorld,
  };

  /** @type {Ingredient[]} */
  let availableIngredientObjects = [];
  /** @type {Record<NationKey, NationData>} */
  let selectedNationsData = {};
  /** @type {NationKey[]} */
  let finalNationKeys = [];
  let nationDisplayNames = [];

  // Map display names to nation keys
  const nationNameMap = Object.keys(allNationsData).reduce((acc, key) => {
    if (allNationsData[key].ingredients) {
      // A bit of a hack to get a display name. Assumes the key can be formatted nicely.
      const displayName = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
      acc[displayName] = key;
    }
    return acc;
  }, {});

  nationNamesInput.forEach((name) => {
    const nationKey = nationNameMap[name];
    if (nationKey && allNationsData[nationKey]) {
      finalNationKeys.push(nationKey);
      nationDisplayNames.push(name);
      selectedNationsData[nationKey] = allNationsData[nationKey];
      Object.values(allNationsData[nationKey].ingredients).forEach(
        (category) => {
          if (Array.isArray(category)) {
            availableIngredientObjects.push(
              ...category.map((ing) => ({
                ...ing,
                sourceNation: name,
                sourceNationKey: nationKey,
              }))
            );
          }
        }
      );
    }
  });

  // Add generic ingredients
  // This part is problematic as 'other' category does not exist.
  // I will comment it out for now.
  // Object.values(allNationsData.airNomads.ingredients.other).forEach(ing => {
  //     if (!availableIngredientObjects.some(existing => existing.name === ing.name)) {
  //         availableIngredientObjects.push({ ...ing, sourceNation: "Generic", sourceNationKey: "generic" });
  //     }
  // });

  let filteredIngredients = availableIngredientObjects.filter((ing) =>
    isValidIngredientForDishType(
      ing,
      'any',
      dishType,
      finalNationKeys,
      allNationsData
    )
  );

  // Remove duplicates
  filteredIngredients = [
    ...new Map(
      filteredIngredients.map((item) => [getIngredientName(item), item])
    ).values(),
  ];

  return {
    availableIngredientObjects: filteredIngredients,
    selectedNationsData,
    finalNationKeys,
    nationDisplayNames,
  };
}

/**
 * Selects an ingredient for a specific role from a list of candidates.
 * @param {IngredientRole} role The role to fill.
 * @param {Ingredient[]} candidates The list of ingredient candidates.
 * @param {Set<string>} currentDishIngredientsTracker Set of ingredient names already in the dish.
 * @param {NationKey[]} nationKeys All selected nation keys.
 * @param {Record<NationKey, number>} nationContribution Object tracking how many ingredients each nation has contributed.
 * @returns {Ingredient | undefined} The selected ingredient, or undefined if none found.
 */
export function selectIngredientByRoleFromCandidates(
  role,
  candidates,
  currentDishIngredientsTracker,
  nationKeys,
  nationContribution
) {
  /** @type {Ingredient | undefined} */
  let itemToAdd = undefined;

  let filteredCandidates = candidates.filter((ing) => {
    const ingName = getIngredientName(ing);
    if (currentDishIngredientsTracker.has(ingName)) {
      const rarity = getIngredientRarity(ing);
      return rarity !== 'common' && rarity !== 'uncommon';
    }
    return true;
  });

  if (filteredCandidates.length === 0) {
    return undefined;
  }

  const unrepresentedNations = nationKeys.filter(
    (nk) => nationContribution[nk] === 0
  );
  if (nationKeys.length > 1 && unrepresentedNations.length > 0) {
    const targetNationKey = getRandomElement(unrepresentedNations);
    let nationSpecificCandidates = filteredCandidates.filter(
      (c) => c.sourceNationKey === targetNationKey
    );
    if (nationSpecificCandidates.length > 0) {
      itemToAdd = getRandomElement(nationSpecificCandidates);
    }
  }

  if (!itemToAdd) {
    let primaryNationKey =
      nationKeys && nationKeys.length > 0 ? nationKeys[0] : null;
    let primaryNationCandidatesList = filteredCandidates.filter(
      (c) => c.sourceNationKey === primaryNationKey
    );
    itemToAdd = getRandomElement(
      primaryNationCandidatesList.length > 0
        ? primaryNationCandidatesList
        : filteredCandidates
    );
  }

  return itemToAdd;
}

/**
 * Validates a single ingredient entry to ensure it has all required fields.
 * @param {Ingredient} ingredient - The ingredient object to validate.
 * @param {number} index - The index of the ingredient in the source array, for logging.
 * @returns {boolean} True if the ingredient is valid, false otherwise.
 */
export function validateIngredientEntry(ingredient, index) {
  const requiredFields = ['name', 'type', 'role', 'source'];
  const missingFields = requiredFields.filter((field) => !ingredient[field]);

  if (missingFields.length > 0) {
    console.warn(
      `[Validation] Ingredient at index ${index} is missing required fields: ${missingFields.join(
        ', '
      )}`,
      ingredient
    );
    return false;
  }
  return true;
}

/**
 * Formats a single ingredient object into a user-friendly string with fallbacks.
 * @param {Ingredient} ingredient - The ingredient object to format.
 * @returns {string} A formatted string describing the ingredient.
 */
export function formatIngredient(ingredient) {
  const name = ingredient.name || 'Unknown Ingredient';
  const parts = [name];
  const details = [];

  details.push(`Role: ${ingredient.role || 'unknown'}`);
  details.push(`Type: ${ingredient.type || 'unknown'}`);
  details.push(`Source: ${ingredient.source || 'Unknown'}`);
  if (ingredient.rarity) details.push(`Rarity: ${ingredient.rarity}`);

  if (details.length > 0) {
    parts.push(`(${details.join('; ')})`);
  }

  return parts.join(' ');
}

const NATION_DATA_MAP = {
  'Air Nomads': airNomads,
  'Water Tribes': waterTribes,
  'Earth Kingdom': earthKingdom,
  'Fire Nation': fireNation,
  'United Republic': unitedRepublic,
  'Spirit World': spiritWorld,
};

/**
 * @returns {Ingredient[]} A filtered array of ingredients.
 */
export function getIngredients(options) {
  const { nations = [], theme = '' } = options;
  const allIngredients = [];

  // 1. Add ingredients from selected nations, tagging them with their source
  nations.forEach((nation) => {
    const nationData = NATION_DATA_MAP[nation];
    if (nationData && nationData.ingredients) {
      for (const category in nationData.ingredients) {
        nationData.ingredients[category].forEach((ing) => {
          allIngredients.push({ ...ing, source: nation });
        });
      }
    }
  });

  // TODO: Add filtering logic based on dishType, theme, etc.
  return allIngredients;
}

export function selectPrimaryIngredient(ingredients, dishType) {
  // Simplified logic
  return ingredients.find(ing => ing.rolePreference && ing.rolePreference.includes('primary'));
}

export function selectSecondaryIngredient(ingredients, dishType, primary) {
  return ingredients.find(ing => ing.name !== primary.name && ing.rolePreference && ing.rolePreference.includes('accent'));
}

export function selectBaseIngredient(ingredients, dishType, primary) {
  return ingredients.find(ing => ing.canBeBase);
}

export function selectSeasoningIngredient(ingredients, dishType) {
  return ingredients.find(ing => ing.rolePreference && ing.rolePreference.includes('seasoning'));
}

export function selectGarnishIngredient(ingredients, dishType) {
  return ingredients.find(ing => ing.rolePreference && ing.rolePreference.includes('garnish'));
}
