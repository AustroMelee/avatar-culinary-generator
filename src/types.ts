// src/types.ts

export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary';
export type DishType = 'main-course' | 'side-dish' | 'snack' | 'dessert' | 'soup-stew' | 'salad' | 'beverage';
export type Nation = 'air-nomads' | 'water-tribe' | 'earth-kingdom' | 'fire-nation';

export type IngredientCategory = 'base' | 'vegetable' | 'fruit' | 'protein' | 'garnish' | 'dairy' | 'flavoring' | 'fungi';
export type DishTheme = 'Humble & Meditative' | 'Ceremonial & Celebratory' | 'Invigorating & Playful' | 'Ancient & Traditional';
export type FragmentTag = 'dish_centric' | 'ingredient_centric' | 'style_centric' | 'theme_centric' | 'tradition' | 'philosophy' | 'legend' | 'practical';
export type FlavorProfile = 'sweet' | 'savory' | 'umami' | 'neutral' | 'pungent';

export interface SentenceFragment {
    tag: FragmentTag;
    text: (context: DishContext) => string;
}

export interface Ingredient {
  name: string;
  emoji: string;
  rarity: Rarity;
  description: string;
  category: IngredientCategory;
  flavorProfile: FlavorProfile;
  isPlural: boolean;
  suitability: string[]; // e.g., ['pie', 'bake', 'stew']
}

export interface CookingStyle {
    name: string;
    description: string;
    dishSubtype: string;
}

export interface DishContext {
  theme: DishTheme;
  primaryIngredient: Ingredient;
  secondaryIngredient: Ingredient;
  cookingStyle: CookingStyle;
  allIngredients: Ingredient[];
  nationData: NationData; // <-- ADD THIS LINE
}

export interface Dish {
  name: string;
  emoji: string;
  nation: Nation;
  dishType: DishType;
  description: string;
  lore: string;
  ingredients: Ingredient[];
  cookingStyle: CookingStyle;
}

export interface NationData {
  nation: Nation;
  nameParts: {
    prefixes: string[];
    middles: string[];
    suffixes: string[];
  };
  dishEmojis: string[];
}