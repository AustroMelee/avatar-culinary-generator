# Utility Modules (`src/utils`)

This directory contains helper modules with functions that are not tied to the core business logic of dish generation but provide essential, reusable services.

## Modules

### `domUtils.js`

**Role: DOM Manipulator**

This module is the sole interface between the JavaScript application and the HTML document. It contains functions responsible for:

- Reading user input from the form elements on the page.
- Rendering the final `DishResult` object to the appropriate elements in the DOM.
- Showing or hiding UI elements, such as loading spinners or error messages.

By isolating all DOM interactions here, we keep the core logic pure and independent of the webpage's structure, which makes the core logic easier to test and maintain.

### `random.js`

**Role: Randomization Toolkit**

This module provides a set of simple, reusable functions for handling randomization. This is critical for the procedural generation aspect of the application. Its functions include:

- `getRandomElement(array)`: Safely selects a random element from an array.
- `getRandomInt(min, max)`: Returns a random integer within a specified range.

Centralizing these functions ensures that randomization is handled consistently and prevents code duplication.
