// src/types.js

// WHY: This file centralizes all custom type definitions for the project.
// Using `@typedef` allows us to define complex object shapes, similar to TypeScript's `interface`.
// Other files can then import these types for JSDoc annotations, promoting consistency
// and enabling robust type-checking across the entire application.

/**
 * @typedef {'common' | 'uncommon' | 'rare' | 'epic'} Rarity
 */

/**
 * @typedef {'airNomads' | 'waterTribes' | 'earthKingdom' | 'fireNation' | 'unitedRepublic' | 'spiritWorld'} NationKey
 */

/**
 * @typedef {'Main Course' | 'Dessert' | 'Soup/Stew' | 'Beverage' | 'Nectar' | 'Appetizer' | 'Salad' | 'Sauce/Condiment'} DishType
 */

/**
 * @typedef {'Spiritual' | 'Royal'} Theme
 */

/**
 * @typedef {string} NationTag - A generic string representing any tag.
 * This is a placeholder for what could be a very large union type of all possible tags
 * in the system (e.g., 'creamy', 'spicy', 'air_nomad', 'staple', etc.).
 */

/**
 * @typedef {'light' | 'medium' | 'heavy'} IngredientWeight
 */

/**
 * @typedef {'base' | 'primary' | 'accent' | 'seasoning' | 'garnish' | 'unknown'} IngredientRole
 */

/**
 * Defines the shape of a single ingredient object.
 * @typedef {object} Ingredient
 * @property {string} name - The display name of the ingredient.
 * @property {string} type - The general category of the ingredient (e.g., 'fruit', 'spice').
 * @property {string[]} rolePreference - The preferred roles this ingredient can fill in a dish.
 * @property {boolean} canBeBase - Whether this ingredient can serve as the foundation of a dish.
 * @property {IngredientWeight} weight - The perceived 'heaviness' of the ingredient.
 * @property {boolean} rawCompatible - If the ingredient can be used without cooking.
 * @property {string[]} tags - Descriptive tags for filtering and logic (e.g., 'sweet', 'spicy').
 * @property {Rarity} rarity - How common the ingredient is.
 * @property {string[]} flavorNotes - Words describing its taste and texture.
 * @property {string[]} [loreHints] - Optional keywords that link to lore templates.
 * @property {string} [sourceNation] - The display name of the nation this ingredient comes from.
 * @property {string} [sourceNationKey] - The internal key for the source nation (e.g., 'fireNation').
 * @property {IngredientRole} [role] - The actual role assigned to the ingredient in a generated dish.
 */

/**
 * Defines the structure for a cooking style.
 * @typedef {object} CookingStyle
 * @property {string} name - The name of the cooking method (e.g., 'gentle steaming').
 * @property {string[]} tags - Tags associated with the style for logic (e.g., 'airNomadTradition').
 */

/**
 * Defines the structure for a name format template.
 * @typedef {object} NameFormat
 * @property {string} pattern - The template string with placeholders (e.g., '{nationAdj} {mainIngredient}').
 * @property {Record<string, any>} slots - Data or instructions for filling the placeholders.
 */

/**
 * Defines the structure for a nation's specific data.
 * @typedef {object} NationData
 * @property {Record<string, Ingredient[]>} ingredients - A categorized map of ingredients.
 * @property {CookingStyle[]} cookingStyles - Cooking methods specific to the nation.
 * @property {string[]} adjectives - Adjectives that capture the nation's feel.
 * @property {NameFormat[]} nameFormats - Templates for generating dish names.
 * @property {string[]} platingNotes - Descriptions of presentation styles.
 * @property {Record<string, { allowedTags: NationTag[], disallowedTags: NationTag[] }>} nationDishTypeProfiles - Rules for ingredient compatibility with dish types.
 * @property {string[]} [famousMonks] - Optional list of famous figures.
 */

/**
 * Represents the final, structured output of a generated dish.
 * @typedef {object} DishResult
 * @property {string} name - The final, generated name of the dish.
 * @property {string} concept - A brief description of the dish's concept and cultural origins.
 * @property {Ingredient[]} ingredients - An array of the ingredient objects used in the dish.
 * @property {string} notes - A paragraph detailing the preparation, presentation, and flavor profile.
 * @property {string | null} lore - An optional snippet of historical or cultural lore related to the dish.
 * @property {string[]} [missingRoles] - An optional array of roles that could not be filled.
 */

// This export is just to satisfy the module system; the file's main purpose is for type definitions.
export {};
