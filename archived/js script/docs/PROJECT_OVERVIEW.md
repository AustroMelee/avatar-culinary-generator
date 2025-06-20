# Avatar Food Generator - Project Overview

## 1. Project Goal

The primary goal of this project is to create a web-based, procedural generator that produces fictional dish concepts inspired by the world of "Avatar: The Last Airbender" and "The Legend of Korra." The generator aims for a high degree of creativity, thematic consistency, and user interactivity, producing not just a name but a complete, rich narrative for each dish.

## 2. Core Features

- **Procedural Dish Generation**: The application procedurally generates a dish based on user selections for culture and theme.
- **Multi-Nation Fusion**: Users can select one or more nations to inspire the dish, allowing for culinary fusion.
- **Seeded Generation**: Supports a `?seed=your_seed` URL parameter for reproducible results and debugging.
- **Rich, Narrative Output**: Each generation produces a detailed, sectioned breakdown:
  - A **Dish Name**: Stylistically appropriate for the selected nations, sometimes with thematic icons.
  - A **Concept**: An evocative, multi-sentence description of the dish's identity and spirit.
  - **Flavor Notes**: A sommelier-style summary of the dish's taste and aroma profile. This is context-aware and will specially highlight the flavors of rare or legendary ingredients.
  - A **Key Ingredients List**: A formatted list showing each ingredient's name, role, type, and a short piece of "micro-lore." The list is sorted by rarity to emphasize the most special ingredients, which are visually highlighted with colors, bolding, and a tooltip that reveals their cultural significance.
  - **Preparation & Ritual**: A description of how the dish is made, written with correct grammar for plural ingredients (e.g., "buds are sliced") and a focus on the most important component.
  - **Serving Tradition**: A culturally specific note on how the dish is traditionally served.
  - **Lore**: A small story or historical note about the dish's origins.
  - **Chef's Tip**: A fun, flavorful piece of advice for enjoying the dish, drawn from a large pool of varied tips.

## 3. Technical Architecture

The project is a modern, front-end application built with vanilla JavaScript (ES Modules), managed with **Vite**. The architecture emphasizes separation of concerns, data-driven logic, and maintainability.

- **Directory Structure**:
  - `src/core/`: Contains the main business logic. This includes the central `dishGenerator.js` orchestrator, as well as specialized, template-based generators for each text section (`nameGenerator.js`, `flavorNotesGenerator.js`, `preparationGenerator.js`, etc.).
  - `src/core/data/`: Houses all the raw data. Nation-specific data is broken into individual files (e.g., `fireNation.js`). Generic data pools and text templates also reside here.
  - `src/utils/`: Contains helper functions for DOM manipulation (`domUtils.js`) and randomization (`random.js`).
- **Module Imports**: Exclusively uses relative paths for all ES module imports (e.g., `../utils/random.js`) for build stability.
- **Data-Driven Design**: The generator's creativity comes from combining structured data points in novel ways. All data is exported via a single barrel file (`src/core/data/index.js`) for easy consumption.

## 4. How to Run the Project

1.  **Install Dependencies**: `npm install`
2.  **Run Development Server**: `npm run dev`
3.  **Format Code**: `npm run format`

## 5. How to Contribute

### How to Add a New Ingredient
Adding new ingredients is a core part of expanding this project. Follow these steps carefully:

1.  **Locate the Correct File**: Ingredient data is separated by nation. Open the relevant file in `src/core/data/`, for example, `src/core/data/fireNation.js`.
2.  **Find the Category**: Inside the `ingredients` property of the nation object, find the correct category array (e.g., `vegetables`, `proteins`, `spices`).
3.  **Add the Ingredient Object**: Add a new JavaScript object to the array for your ingredient. It **must** have the following structure. Pay close attention to the data types and the phrasing of text fields.

    ```javascript
    {
      name: 'Your Ingredient Name', // (string) Must be unique across all nations!
      type: 'vegetable', // (string)
      rolePreference: ['primary', 'accent'], // (string[]) e.g., 'base', 'seasoning', 'garnish'
      canBeBase: false, // (boolean)
      weight: 'medium', // (string) 'light', 'medium', or 'heavy'
      rawCompatible: true, // (boolean)
      tags: ['spicy', 'common'], // (string[]) Descriptive tags for logic hooks
      rarity: 'common', // (string) 'common', 'uncommon', 'rare', 'epic', 'legendary'
      flavorNotes: [
        'a nutty character',
        'an earthy sweetness',
        'a wholesome quality'
      ], // (string[]) MUST be descriptive phrases, not single words.
      shortDescription: 'A brief, in-game description for the ingredient list.', // (string)
      culturalSignificance: 'A sentence for the tooltip on rare+ ingredients.', // (string) (Optional)
      loreHints: ['ash_yam_origin'] // (string[]) (Optional) Keys for the lore generator
    }
    ```
4.  **Validate Your Changes**: Open `scripts/validateData.html` in your browser and check the developer console for errors.

### How the Generation Works (High-Level)
1.  **Collection & Validation**: The generator collects ingredients from the selected nations, validating each one.
2.  **Selection & Sorting**: It selects ingredients for required roles. It then sorts the selected ingredients by rarity.
3.  **Text Generation**: The ingredients and nation data are passed to a series of specialized generators:
    - `generatePreparation` uses correct grammar for plural ingredients.
    - `generateFlavorNotes` uses special templates if a rare ingredient is present.
    - `generateLore` uses special templates if a specific combination of ingredients is found.
4.  **Fallback Logic**: For `servingTradition` and `chefTip`, the generator uses a fallback system, prioritizing special lore-based text, then nation-specific text, and finally a large pool of generic text.
5.  **Display**: The final, rich result is rendered by `displayRichDish` in `src/utils/domUtils.js`.

## GOLDEN MODULE RULE

No module may exceed 12KB. REFACTOR AT ONCE IF IT OCCURS!
