// src/utils/random.js

/**
 * Gets a random element from an array.
 * WHY: This is a common utility function, and centralizing it prevents code duplication.
 * Using `@template T` in JSDoc provides generic type support, allowing this function
 * to work with arrays of any type while preserving type information for the caller.
 * @template T
 * @param {T[]} arr The array to pick from.
 * @returns {T | undefined} A random element from the array, or undefined if the array is empty.
 */
export function getRandomElement(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Gets a random integer between a min and max (inclusive).
 * WHY: Encapsulates the logic for getting a random integer, making it easier to use correctly elsewhere.
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * @returns {number} A random integer within the specified range.
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) return min;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}