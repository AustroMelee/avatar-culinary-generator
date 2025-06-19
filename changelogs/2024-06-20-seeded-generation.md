# Changelog - 2024-06-20: Seeded Generation Mode

To aid in debugging and testing, a seeded random number generation mode has been added to the application. This allows for the deterministic reproduction of generated dishes.

## Key Changes:

### 1. Seeded RNG Implementation

- The `src/utils/random.js` module has been enhanced with a new function, `createSeededRNG`, which produces a predictable sequence of numbers based on a string seed.
- An `initializeRNG` function was also added. This function is called once at startup and configures the random number generator for the entire application session, using either the seeded generator or the browser's default `Math.random`.

### 2. URL Parameter Hook

- The main application entry point, `src/main.js`, now checks for a `?seed=` parameter in the URL upon loading.
- If a seed is found, it is used to initialize the seeded RNG, ensuring that any subsequent dish generation in that session is fully reproducible.

## How to Use

To use this feature, append a `?seed=<your_seed_here>` parameter to the `index.html` URL. For example: `.../index.html?seed=sokka`

This will produce the same dish every time the page is loaded with that exact seed, making it invaluable for testing and sharing specific outcomes.
