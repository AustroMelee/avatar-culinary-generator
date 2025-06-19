# Avatar Food Generator - Project Overview

## 1. Project Goal

The primary goal of this project is to create a web-based, procedural generator that creates fictional dish concepts inspired by the world of "Avatar: The Last Airbender" and "The Legend of Korra." The generator aims for a high degree of creativity, thematic consistency, and user interactivity, producing not just a name but a concept, a list of ingredients, and a piece of lore for each dish.

## 2. Core Features

- **Procedural Dish Generation**: The application procedurally generates a dish based on user selections.
- **Multi-Nation Fusion**: Users can select one or more nations to inspire the dish, allowing for culinary fusion (e.g., a Fire Nation / Earth Kingdom collaboration).
- **Thematic Influence**: Users can select a "theme" (e.g., "Ancient," "Spirited," "Modern") that influences the generated name, description, and lore.
- **Detailed Output**: Each generation produces:
  - A **Dish Name**: Stylistically appropriate for the selected nations.
  - A **Concept**: A short, evocative description of the dish.
  - An **Ingredient List**: The specific components of the dish.
  - **Flavor Notes**: A brief on the dish's taste profile.
  - **Lore**: A small story or historical note about the dish's origins.
- **Seeded Generation**: The generator supports a seeded pseudo-random number generator via a `?seed=your_seed` URL parameter for reproducible results and debugging.
- **Thematic Influence**: Users can select a "theme" (e.g., "Ancient," "Spirited," "Modern") that influences the output.
- **Rich, Narrative Output**: Each generation produces a detailed, sectioned breakdown:
    - A **Dish Name**: Stylistically appropriate for the selected nations, sometimes with thematic icons.
    - A **Concept**: An evocative, multi-sentence description of the dish's identity and spirit.
    - **Flavor Notes**: A sommelier-style summary of the dish's taste and aroma profile.
    - A **Key Ingredients List**: A formatted list showing each ingredient's name, role, type, and a short piece of "micro-lore." Rare ingredients are visually highlighted.
    - **Preparation & Ritual**: A description of how the dish is made, often including cultural or spiritual rituals.
    - **Serving Tradition**: A culturally specific note on how the dish is traditionally served or presented.
    - **Lore**: A small story or historical note about the dish's origins.
    - **Chef's Tip**: A fun, flavorful piece of advice for enjoying the dish.

## 3. Technical Architecture

The project is a modern, front-end application built with vanilla JavaScript (ES Modules). The architecture emphasizes separation of concerns, data-driven logic, and maintainability.

- **Build Tool**: The project uses **Vite** for its development server and production builds. This provides features like Hot Module Replacement (HMR) and optimized build outputs.
- **Directory Structure**:
  - `src/core/`: Contains the main business logic for generation. This includes the central `dishGenerator.js` orchestrator, as well as specialized, template-based generators for each text section (`nameGenerator.js`, `conceptGenerator.js`, `flavorNotesGenerator.js`, `preparationGenerator.js`, `loreGenerator.js`).
  - `src/core/data/`: Houses all the raw data for the generator. Nation-specific data (ingredients, serving traditions, chef tips) is broken down into individual files (e.g., `fireNation.js`). Generic data and text templates (`conceptTemplates.js`, `dishLoreTemplates.js`) also reside here.
  - `src/utils/`: Contains helper functions for DOM manipulation (`domUtils.js`) and randomization (`random.js`).
  - `src/`: The root source directory, containing the main entry point (`main.js`) and type definitions (`types.js`).
  - `src/assets`: Contains static assets like images.
- **Module Imports**: For maximum build stability, the project exclusively uses relative paths for all ES module imports (e.g., `../utils/random.js`). Path aliases are not used.
- **Data-Driven Design**: The generator's logic is heavily reliant on the structured data in `src/core/data/`. The creative output comes from combining these data points in novel ways, rather than hardcoded logic. All nation data is exported via a single barrel file (`src/core/data/index.js`) for easy consumption by the core logic.
- **Code Style & Formatting**: Code consistency is enforced by **Prettier**, with rules defined in `.prettierrc.json`. An `.editorconfig` file ensures consistent editor settings.

## 4. How to Run the Project

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run the Development Server**:

    ```bash
    npm run dev
    ```

    This will start the Vite development server, typically available at `http://localhost:5173`.

3.  **Format Code**:
    ```bash
    npm run format
    ```
    This will automatically format all project files according to the Prettier rules.

## 5. How to Contribute

Please refer to the `.cursorcontext` file in the project root. It contains detailed guidelines for contributing, including step-by-step instructions for adding new ingredients and a summary of the architectural patterns to follow.

## Project Context: Avatar Food Generator

This file provides essential context for working on the Avatar Food Generator project. Understanding these guidelines will help you make changes that are consistent with the existing architecture.

### Core Architecture & Validation

The project is built using modern JavaScript (ES Modules) and managed with Vite. The architecture is designed to be **data-driven and highly resilient**. To ensure stability and prevent common errors, a multi-layered validation system is enforced.

1.  **Relative Paths Only**: For maximum compatibility with the production build environment (Netlify), all module imports **must** use relative paths (e.g., `./`, `../`). Do not use path aliases.

2.  **Strict Data Validation**:
    -   **Ingredient-Level**: Before any ingredient is added to the pool, `validateIngredientEntry` in `ingredientManager.js` performs a rigorous check on all required fields, validating not just their presence but also their **data types** (e.g., `name` must be a non-empty string, `canBeBase` must be a boolean).
    -   **Output-Level**: Before a dish is returned, `validateDishResult` in `dishGenerator.js` audits the final object, ensuring all text fields are non-empty and the `ingredients` array is correctly populated.
    -   **Text-Level**: All user-facing text (name, concept, notes, lore) is validated to ensure it contains **no unprocessed template placeholders** (e.g., `{nationAdj}`).

3.  **Data-Driven Design & Constants**: All "magic strings" are stored as constants.
    -   **Constants File**: Before using recurring strings like nation names, dish types, or ingredient roles, check `src/core/constants.js`. If the value doesn't exist, add it there first. This is especially true for `INGREDIENT_ROLES` and `INGREDIENT_TYPES`.

### How to Add a New Ingredient

Adding new ingredients is a core part of expanding this project. Follow these steps carefully:

1.  **Locate the Correct File**: Ingredient data is separated by nation. Open the relevant file in `src/core/data/`, for example `src/core/data/fireNation.js`.
2.  **Find the Nation Object**: The file contains a single exported object (e.g., `export const fireNation = { ... };`).
3.  **Find the Category**: Inside the `ingredients` property of the nation object, find the correct category array (e.g., `vegetables`, `proteins`, `spices`).
4.  **Add the Ingredient Object**: Add a new JavaScript object to the array for your ingredient. It **must** have the following structure. Pay close attention to the data types.

    ```javascript
    {
      name: 'Your Ingredient Name', // (string) Must be unique across all nations!
      type: 'vegetable', // (string) Must be a value from INGREDIENT_TYPES in constants.js
      rolePreference: ['primary', 'accent'], // (string[]) Must be values from INGREDIENT_ROLES
      canBeBase: false, // (boolean)
      weight: 'medium', // (string) 'light', 'medium', or 'heavy'
      rawCompatible: true, // (boolean)
      tags: ['spicy', 'common'], // (string[]) Descriptive tags for logic hooks
      rarity: 'common', // (string) 'common', 'uncommon', 'rare', 'legendary'
      flavorNotes: ['smoky', 'fiery'], // (string[]) Primary flavor descriptors
      loreHints: ['ash_yam_origin'] // (string[]) (Optional) Keys for the lore generator
    }
    ```
5.  **Validate Your Changes**: After adding your ingredient(s), open the `scripts/validateData.html` file in your browser to check for basic errors. Then, run the application in **Dev Mode** (by loading on localhost or adding `?dev=true` to the URL) and use the **"Run 20 Test Generations"** button. Check the developer console for any red "FAIL" messages, which will pinpoint errors in your new data. **Do not skip this step.**

### How the Generation Works (High-Level)
1.  **Error Boundary**: The entire process is wrapped in a `try...catch` block in `main.js`. Any critical failure will be caught and will display a clean error message to the user while logging the full error details in the console.
2.  **Collection & Validation**: It collects all ingredients from the selected nations, validating each one with `validateIngredientEntry`.
3.  **Selection**: It selects ingredients for required roles (`primary`, `base`, `accent`, `seasoning`, `garnish`). It logs warnings if roles cannot be filled and guarantees no duplicate ingredients in the final dish.
4.  **Text Generation & Validation**: The selected ingredients and nation data are passed to a series of specialized text generators (`generateConcept`, `generateFlavorNotes`, `generatePreparation`, `generateLore`). Each generator uses a template-based system to create rich, varied text. The output is validated for leftover placeholders.
5.  **Final Audit**: The complete `DishResult` object is validated one last time before being sent to the UI.
6.  **Display**: The final, rich result is rendered by `displayRichDish` in `src/utils/domUtils.js`, which builds a sectioned, visually styled output in the DOM. If any roles were missing, a user-facing warning is shown.

By following these guidelines, you can help keep the project clean, consistent, and easy to maintain.

## GOLDEN MODULE RULE

No module may exceed 12KB. REFACTOR AT ONCE IF IT OCCURS!
