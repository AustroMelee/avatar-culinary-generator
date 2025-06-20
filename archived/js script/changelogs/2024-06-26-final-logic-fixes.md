# Changelog: 2024-06-26 - Final Logic & Naming Fixes

This update addresses the last remaining bugs in the generator's output, ensuring the results are logical, correct, and well-formatted.

## 🛠️ Logic & Naming Fixes

-   **Unique Ingredient Selection**: Fixed a critical bug where the generator could select the same ingredient for multiple roles (e.g., as both a seasoning and a garnish). The selection logic now ensures every ingredient in a dish is unique.
-   **Correct Role Assignment**: Resolved an issue where all ingredients were being assigned "Role: unknown". The generator now correctly tracks and assigns the specific role (e.g., "primary", "base") to each ingredient.
-   **Improved Dish Naming**: The dish naming logic was enhanced to handle cases where no specific culinary format is selected. Instead of inserting the word "Default" into the name, the generator now uses the `dishType` (e.g., "Main Course") for a more natural and descriptive title. 