# Changelog: 2024-06-27 - System Hardening & Validation

This update represents a major push to harden the entire generation pipeline, improve data integrity, and enhance the developer experience. The focus was on adding multiple layers of validation to prevent bad data, silent failures, and inconsistent output.

## Key Improvements:

### 1. Data Integrity & Validation
- **Ingredient Source Guarantee**: All ingredients now have their `source` nation validated upon loading. Any ingredient reaching the display logic without a source will now log a critical error.
- **Role & Type Standardization**: Defined a canonical list of `INGREDIENT_ROLES` and `INGREDIENT_TYPES` in `constants.js`. The generator now validates selected ingredients against these lists, warning about any non-standard values.
- **Strict I/O Validation**: The core data validators were significantly upgraded:
    - `validateIngredientEntry` now checks for the correct data type (string, boolean, array) of all required fields, not just their presence.
    - `validateDishResult` now performs deep validation on the final output, ensuring no required fields are empty and that the `ingredients` array is properly populated.

### 2. Generation Logic Hardening
- **Duplicate Ingredient Prevention**: Added a final `assertNoDuplicates` check after ingredient selection. This acts as a safeguard to guarantee no duplicate ingredients can ever appear in the final output, logging a critical error if this logic fails.
- **Role Coverage Guarantee**: The system now tracks which of the five core ingredient roles (`primary`, `base`, etc.) are filled. If a role cannot be filled, a user-facing warning is displayed in the UI, informing the user which roles are missing.
- **Text Generation Quality**: A new text validation utility (`validateStringAndLog`) now checks all generated text (`name`, `concept`, `notes`, `lore`) for leftover template placeholders (e.g., `{nationAdj}`). This prevents users from ever seeing unprocessed template fragments.

### 3. Developer Experience & Fail-Safes
- **Global Error Handling**: The main generation function is now wrapped in a global `try...catch` block. Any unexpected error during generation will be caught, logged to the console with its full stack trace, and result in a clean, user-friendly failure message in the UI.
- **Developer Test Suite**: A new "Run 20 Test Generations" button now appears when the app is run in developer mode (either on `localhost` or with `?dev=true` in the URL). This utility runs a batch of generations and provides a color-coded summary of passes and failures in the console, making regression testing simple and fast.
- **Uniform Formatting**: Confirmed that all ingredient display strings are rendered through the single `formatIngredient` utility, ensuring consistent styling. 