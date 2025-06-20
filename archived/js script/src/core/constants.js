/**
 * @fileoverview Centralized constants for the application.
 * Using frozen objects to emulate enums, preventing typos and magic strings
 * across the codebase. This ensures a single source of truth for common values.
 */

/**
 * Enum for the nations in the Avatar world.
 * The keys are used for programmatic access, while the values are for display.
 * @readonly
 * @enum {string}
 */
export const NATIONS = Object.freeze({
  FIRE: 'Fire Nation',
  WATER: 'Water Tribes',
  AIR: 'Air Nomads',
  EARTH: 'Earth Kingdom',
  SPIRIT: 'Spirit World',
  REPUBLIC: 'United Republic',
});

/**
 * Enum for the different categories of dishes that can be generated.
 * @readonly
 * @enum {string}
 */
export const DISH_CATEGORIES = Object.freeze({
  MAIN_COURSE: 'Main Course',
  SIDE_DISH: 'Side Dish',
  DESSERT: 'Dessert',
  SOUP: 'Soup',
  SALAD: 'Salad',
  BEVERAGE: 'Beverage',
  NECTAR: 'Nectar',
  SAUCE_CONDIMENT: 'Sauce/Condiment',
});

/**
 * A reverse mapping to get the programmatic key from a nation's display name.
 * Useful for lookups. e.g., "Fire Nation" -> "FIRE"
 * @type {Object<string, string>}
 */
export const NATION_KEYS = Object.freeze(
  Object.fromEntries(
    Object.entries(NATIONS).map(([key, value]) => [value, key])
  )
);

export const DISH_TYPES = Object.freeze([
  'Appetizer',
  'Main Course',
  'Dessert',
  'Beverage',
  'Soup/Stew',
  'Salad',
]);

export const INGREDIENT_ROLES = Object.freeze([
  'primary',
  'liquid',
  'base',
  'accent',
  'garnish',
  'seasoning',
  'snack',
  'binder',
]);

export const INGREDIENT_TYPES = Object.freeze([
  'dairy',
  'herb',
  'edible flower',
  'fruit',
  'vegetable',
  'root vegetable',
  'grain',
  'fungus',
  'liquid',
  'crystal',
  'meat',
  'spice',
  'legume / protein',
  'noodle',
  'salt',
  'protein',
  'seafood (roe)',
  'seafood (crustacean)',
  'seaweed / vegetable',
  'fermented',
  'spice blend',
  'condiment / paste',
  'sweetener / snack',
]);
