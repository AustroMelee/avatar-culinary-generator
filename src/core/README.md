# Core Logic (`src/core`)

This directory contains the heart of the Avatar Food Generator's business logic. Each module in this directory is responsible for a specific part of the dish generation process. The system is designed to be a pipeline, where data flows from the `ingredientManager` to the various generators (`name`, `lore`, `description`) and is finally assembled by the `dishGenerator`.

## Modules

### `dishGenerator.js`

**Role: The Orchestrator**

This is the main engine of the generation process. It takes the user's high-level selections (dish type, nations) and orchestrates the entire workflow:

1.  Calls `ingredientManager.js` to get a list of valid ingredients.
2.  Performs the main ingredient selection loop, assigning roles (`base`, `primary`, etc.) to the chosen ingredients.
3.  Calls the specialized generator modules (`nameGenerator.js`, `loreGenerator.js`, `descriptionGenerator.js`) to create the different parts of the dish.
4.  Assembles the final `DishResult` object and returns it.

### `ingredientManager.js`

**Role: The Quartermaster**

This module is responsible for all logic related to ingredients. Its key functions are:

1.  **Collecting:** Gathers all potential ingredients from the data files of the selected nations.
2.  **Filtering:** Weeds out ingredients that are not appropriate for the specified dish type (e.g., filtering out fish for a dessert).
3.  **Selection:** Provides helper functions to intelligently select ingredients for specific roles based on various criteria like cultural origin and ingredient rarity.

### `nameGenerator.js`

**Role: The Wordsmith**

This module's sole responsibility is to generate a plausible and culturally-fitting name for the dish. It uses a template-based system, combining adjectives, nouns, and ingredient names from the selected cultures to create a structured and creative name.

### `descriptionGenerator.js`

**Role: The Announcer**

This module generates the user-facing descriptive text for the dish, specifically the `concept` and `notes` fields.

- **Concept:** A short, enticing summary of what the dish is.
- **Notes:** Details about the dish's preparation, cooking style, and presentation.

### `loreGenerator.js`

**Role: The Storyteller**

This module creates a small piece of fiction or history for the generated dish. It draws from hints in the ingredient data and generic templates to craft a believable backstory, adding depth and flavor to the creation.

## Data Flow

A simplified view of the data flow is as follows:

`User Input` -> `dishGenerator` -> `ingredientManager` -> `(Selection Loop)` -> `name/lore/description Generators` -> `Final Dish Object`
