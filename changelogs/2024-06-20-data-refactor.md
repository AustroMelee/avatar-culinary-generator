# Changelog - 2024-06-20: Data Layer Refactor

This update addresses the growing complexity of the project's data management. The primary data file, `src/core/data.js`, was becoming a large monolith that was difficult to navigate and maintain. This refactor modularizes the entire data layer for improved scalability and developer experience.

## Key Changes:

### 1. Data Modularization

The single `CANON_DATA` object has been dismantled and broken down into smaller, more focused modules within a new `src/core/data/` directory.

The new data structure is as follows:

- `cooking.js`: Contains `baseComponents`, `flavorProfiles`, and `cookingMethodsByDishType`.
- `generic.js`: Contains `genericAdjectives` and `genericDishNouns`.
- `lore.js`: Contains the `DISH_LORE_TEMPLATES`.
- `nations.js`: Contains all nation-specific data objects (`airNomads`, `waterTribes`, etc.).
- `themes.js`: Contains the `themes` object.
- `index.js`: A barrel file that exports all data modules for easy importing.

### 2. Core Logic Refactoring

All core modules that previously depended on `CANON_DATA` have been refactored:

- **`dishGenerator.js`**, **`ingredientManager.js`**, **`nameGenerator.js`**, **`loreGenerator.js`**, and **`descriptionGenerator.js`** now import data from the new, specific modules via `src/core/data/index.js`.
- Functions that required broad sets of data (like the complete collection of nations) have been updated to accept this data as a parameter, making them purer and less reliant on globally-scoped imports.

### 3. Cleanup

- The monolithic `src/core/data.js` file has been deleted, as its contents are now properly organized in the new structure.

## Current Project State

The project remains fully functional but is now significantly more organized. This clean data architecture will make it much easier to add new ingredients, nations, or other data points without creating conflicts or making any single file unwieldy. The codebase is more robust and maintainable.
