// src/utils/random.js

// By default, the application will use the browser's built-in Math.random.
let rng = Math.random;

/**
 * Creates a simple pseudo-random number generator (PRNG) using a Linear Congruential Generator.
 * This creates a stateful function that will produce a predictable sequence of numbers based on the initial seed.
 * @param {string} seedStr The string to use as the initial seed.
 * @returns {() => number} A function that returns a new pseudo-random number between 0 and 1 each time it's called.
 */
function createSeededRNG(seedStr) {
  // Create a numeric hash from the seed string.
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed << 5) - seed + seedStr.charCodeAt(i);
    seed |= 0; // Convert to 32bit integer
  }

  // Return a function that acts as the RNG.
  return function () {
    seed = (1664525 * seed + 1013904223) % 2 ** 32;
    return seed / 2 ** 32;
  };
}

/**
 * Initializes the random number generator for the entire application session.
 * This should be called once at startup.
 * @param {string | null | undefined} seed The seed to use. If null or undefined, defaults to Math.random.
 * @returns {void}
 */
export function initializeRNG(seed) {
  if (seed) {
    console.log(`Using seeded RNG with seed: "${seed}"`);
    rng = createSeededRNG(seed);
  } else {
    console.log('Using standard RNG (Math.random).');
    rng = Math.random;
  }
}

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
  return arr[Math.floor(rng() * arr.length)];
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
  return Math.floor(rng() * (max - min + 1)) + min;
}
