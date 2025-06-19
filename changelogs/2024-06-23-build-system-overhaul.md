# Changelog: 2024-06-23 - Build System Overhaul & Stability Refactor

This update addresses a series of critical build failures and modernizes the project's architecture for improved stability and maintainability.

## ✨ New Features

-   **Demo Mode**: The application now supports a demo mode. Appending `?demo=true` to the URL will instantly display a pre-generated default dish, allowing for quick previews of the output format.
-   **Site Banner**: A banner image has been added to the top of the page for improved visual appeal.

## 🛠️ Major Fixes & Refactoring

-   **Build System Overhaul**: After numerous deployment failures on Netlify, the project's module resolution strategy has been completely refactored.
    -   **Removed Path Aliases**: All Vite path aliases (e.g., `@core`, `@data`) have been replaced with standard relative paths (`../`, `./`). This resolves the root cause of the persistent build errors.
    -   **Corrected Module Exports**: A full audit of the codebase was performed to find and fix dozens of missing or incorrect `export` statements across all core generator modules (`dishGenerator`, `ingredientManager`, `loreGenerator`, `descriptionGenerator`).
-   **Ingredient Source Tracking**: Fixed a critical bug where the nation of origin for ingredients was being lost, causing all ingredients to display `Source: Unknown`. Ingredients are now correctly tagged as they are collected.
-   **Rendering Logic**: Corrected an issue where the ingredient rendering logic expected data in a different format than the generator was providing, resulting in `undefined` values in the UI.
-   **Dependency Management**: Added `sharp` and other required packages to the project's dependencies to satisfy the production build environment's requirements.

## ✅ Validation & Housekeeping

-   **Input Validation**: Added new validation functions (`validateDishResult`, `validateIngredientEntry`) to ensure data integrity during the generation process and provide clearer warnings for malformed data.
-   **Code Cleanup**: Removed numerous unused functions, variables, and outdated logic left over from previous refactoring attempts.
-   **Updated Documentation**: The project's `.cursorcontext` file has been updated to reflect the new "relative paths only" rule and to provide accurate instructions for developers. 