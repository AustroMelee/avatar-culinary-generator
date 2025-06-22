/**
 * Utility functions for the food generator
 */

/**
 * Randomly selects an element from an array
 * @param arr - The array to pick from
 * @returns A random element from the array, or undefined if array is empty
 */
export const pick = <T>(arr: T[]): T | undefined => {
    if (arr.length === 0) return undefined;
    return arr[Math.floor(Math.random() * arr.length)];
}; 