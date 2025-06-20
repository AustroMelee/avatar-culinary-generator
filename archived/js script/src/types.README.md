# Type Definitions (`src/types.js`)

This file is the single source of truth for all complex data structures used in the Avatar Food Generator. By centralizing our type definitions here using JSDoc's `@typedef`, we achieve a level of consistency and clarity similar to TypeScript, enabling better static analysis and developer tooling across the project.

## Core Types

### `DishResult`

This is the final output object. It represents the fully generated dish and contains all the information needed for the rich, sectioned rendering in the UI.

- `name: string`: The final generated name of the dish.
- `concept: string`: The high-level conceptual description.
- `flavorNotes: string`: A sommelier-style summary of the taste profile.
- `ingredients: Ingredient[]`: The list of ingredients used in the dish, sorted by rarity.
- `preparationAndRitual: string`: A description of how the dish is made.
- `servingTradition: string`: A note on how the dish is traditionally served.
- `lore: string`: The historical or cultural backstory of the dish.
- `chefTip: string`: A piece of advice for enjoying the dish.
- `missingRoles: IngredientRole[]`: An array of any roles that could not be filled.

### `Ingredient`

This is one of the most important and detailed types. It defines everything there is to know about a single ingredient.

- `name: string`: The display name of the ingredient.
- `type: string`: The general category (e.g., 'fruit', 'spice').
- `rolePreference: IngredientRole[]`: Preferred roles it can fill.
- `canBeBase: boolean`: If it can serve as a dish's foundation.
- `weight: IngredientWeight`: The 'heaviness' of the ingredient.
- `rawCompatible: boolean`: If it can be used without cooking.
- `tags: NationTag[]`: Descriptive tags for filtering and logic (e.g., 'sweet', 'spicy').
- `rarity: Rarity`: How common the ingredient is.
- `flavorNotes: string[]`: Phrases describing its taste and texture (e.g., "a silken texture").
- `shortDescription: string`: A brief, in-game description for the ingredient list.
- `culturalSignificance: string?`: (Optional) A sentence for the tooltip on rare+ ingredients.
- `loreHints: string[]?`: (Optional) Keywords that link to lore templates.
- `source: string?`: The source nation of the ingredient (added during processing).
- `role: IngredientRole?`: The actual role assigned in a generated dish.

### `NationData`

This object holds all the data specific to a single culture.

- `ingredients: Record<string, Ingredient[]>`: A categorized map of ingredients.
- `cookingStyles: CookingStyle[]`: Typical cooking methods.
- `adjectives: string[]`: Words that capture the nation's feel.
- `nameFormats: NameFormat[]`: Templates for generating dish names.
- `platingNotes: string[]`: Descriptions of presentation styles.
- `nationDishTypeProfiles: Record<string, { allowedTags: NationTag[], disallowedTags: NationTag[] }>`: Rules for ingredient compatibility with dish types.

---

## Utility Types

These are string literal union types that act like enums, restricting the possible values for certain properties to ensure consistency.

- **`Rarity`**: `'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'`
- **`NationKey`**: `'airNomads' | 'waterTribes' | ...`
- **`DishType`**: `'Main Course' | 'Dessert' | ...`
- **`Theme`**: `'Spiritual' | 'Royal'`
- **`IngredientWeight`**: `'light' | 'medium' | 'heavy'`
- **`IngredientRole`**: `'base' | 'primary' | 'accent' | ...`
- **`NationTag`**: `string` - A generic string for all descriptive tags.
