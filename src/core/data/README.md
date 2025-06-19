# Data Modules (`src/core/data`)

This directory houses the foundational data that drives the entire food generation system. The data has been intentionally modularized to make it easy to manage, update, and extend. All modules within this directory are consolidated and exported by the `index.js` barrel file for clean, simple importing into the core logic.

## Data Philosophy

The data is structured to be as descriptive as possible. Ingredients, for example, are not just names; they are rich objects containing `tags`, `rarity`, `flavorNotes`, and `loreHints`. This richness is what allows the generator to make intelligent, context-aware decisions.

When adding new data, the goal is to provide as much context as possible to empower the generation logic.

## Architectural Constraints

- **ES Modules:** All data files are JavaScript ES Modules (`.js`), not pure JSON. This allows for comments and more flexible formatting.
- **JSON-Compatible Objects:** All exported data structures must be serializable, plain JavaScript objects. They should not contain functions, `Set`, `Map`, or other complex types that aren't directly representable in JSON. This ensures data purity and compatibility with potential future extensions.
- **Barrel Exports:** All data modules must be exported through the `index.js` barrel file. This maintains a clean and consistent import pattern for the rest of the application.

## Modules

### `nations.js`

This is the largest and most critical data module. It exports a constant for each culture (e.g., `airNomads`, `fireNation`). Each nation object contains:

- **ingredients:** A categorized list of all ingredients specific to that culture.
- **cookingStyles:** Typical cooking methods.
- **adjectives:** Words used in name generation.
- **nameFormats:** The structural patterns for dish names.
- **platingNotes:** Descriptions of how a dish might be presented.
- **nationDishTypeProfiles:** Rules for what kinds of ingredients are allowed or disallowed for certain dish types.

### `cooking.js`

This module contains data related to the general process of cooking that isn't tied to one specific culture. It includes:

- `baseComponents`: Generic bases like noodles and rice.
- `flavorProfiles`: Broad flavor categories like "savory" and "sweet".
- `cookingMethodsByDishType`: Maps dish types to appropriate cooking methods.

### `generic.js`

A small module for lists of generic words used in name generation, such as `genericAdjectives` and `genericDishNouns`.

### `lore.js`

Contains the `DISH_LORE_TEMPLATES` object, which provides the templates and placeholder text for generating dish backstories.

### `themes.js`

Defines special "themes" that can be applied to a dish, such as "Royal" or "Spiritual." These themes can add unique adjectives, modify the dish concept, and influence naming.

### `index.js`

This is a barrel file. It imports all the other modules in this directory and exports them from a single source. This allows the application's logic to import any data it needs with a single, clean import statement:
`import { airNomads, themes } from './data/index.js';`
