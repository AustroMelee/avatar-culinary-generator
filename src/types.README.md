# Type Definitions (`src/types.js`)

This file is the single source of truth for all complex data structures used in the Avatar Food Generator. By centralizing our type definitions here using JSDoc's `@typedef`, we achieve a level of consistency and clarity similar to TypeScript, enabling better static analysis and developer tooling across the project.

## Core Types

### `DishResult`

This is the final output object. It represents the fully generated dish and contains all the information needed for rendering in the UI.

- `name: string`: The final generated name of the dish.
- `concept: string`: The high-level conceptual description.
- `ingredients: Ingredient[]`: The list of ingredients used in the dish.
- `notes: string`: Detailed description of preparation and flavor.
- `lore: string`: The historical or cultural backstory of the dish.

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
- `flavorNotes: string[]`: Words describing its taste and texture.
- `loreHints: string[]?`: Optional keywords that link to lore templates.
- `sourceNation: string?`: Display name of the ingredient's origin nation.
- `sourceNationKey: NationKey?`: Internal key for the source nation.
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

- **`Rarity`**: `'common' | 'uncommon' | 'rare' | 'epic'`
- **`NationKey`**: `'airNomads' | 'waterTribes' | ...`
- **`DishType`**: `'Main Course' | 'Dessert' | ...`
- **`Theme`**: `'Spiritual' | 'Royal'`
- **`IngredientWeight`**: `'light' | 'medium' | 'heavy'`
- **`IngredientRole`**: `'base' | 'primary' | 'accent' | ...`
- **`NationTag`**: `string` - A generic string for all descriptive tags.
