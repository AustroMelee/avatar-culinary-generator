// src/types.ts

// NEW: Define the possible physical forms of a dish
export type DishForm = 'pie' | 'stew' | 'roast' | 'congee' | 'dumpling' | 'salad' | 'beverage' | 'handheld' | 'plated' | 'skewer' | 'liquid';

export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary';
export type DishType = 'main-course' | 'side-dish' | 'snack' | 'dessert' | 'soup-stew' | 'salad' | 'beverage';
export type Nation = 'air-nomads' | 'water-tribe' | 'earth-kingdom' | 'fire-nation';

export type IngredientCategory = 'base' | 'vegetable' | 'fruit' | 'protein' | 'garnish' | 'dairy' | 'flavoring' | 'fungi';
export type DishTheme = 'Humble & Meditative' | 'Ceremonial & Celebratory' | 'Invigorating & Playful' | 'Ancient & Traditional';
export type FragmentTag = 'ingredient_centric' | 'style_centric' | 'theme_centric' | 'tradition' | 'philosophy' | 'legend' | 'practical' | 'fusion';
export type FlavorProfile = 'sweet' | 'savory' | 'umami' | 'neutral' | 'pungent';

export interface SentenceFragment {
    tag: FragmentTag;
    text: (context: DishContext) => string;
}

// NEW: Define the structure for a description rule entry
export interface DescriptionRule {
    id: string;
    text: (context: DishContext) => string;
    weighting: {
        nations?: Nation[];
        fusion?: boolean;
        styles?: string[];
        dishTypes?: DishType[];
        categories?: IngredientCategory[];
        flavorProfiles?: FlavorProfile[];
        themes?: DishTheme[];
        minIngredients?: number;
        maxIngredients?: number;
        minRarity?: Rarity;
        minNations?: number;
        compatibleForms?: DishForm[];
    };
}

// NEW: Define the structure for a naming rule entry
export interface NamingRule {
    id: string;
    title: (context: DishContext) => string;
    weighting: {
        fusion: boolean;
        minNations?: number;
        maxNations?: number;
        dishTypes?: DishType[];
        ingredients?: string[];
        themes?: DishTheme[];
        nations?: Nation[];
        noMeat?: boolean;
    };
}

// NEW: Define possible ingredient locations
export type IngredientLocation = 'Generic' | 'Air Temple' | 'Water Tribe' | 'Kyoshi Island' | 'The Swamp' | 'Si Wong Desert' | 'Ba Sing Se' | 'Zaofu' | 'Fire Nation Capital' | 'Ember Island';

export interface Ingredient {
  name: string;
  emoji: string;
  rarity: Rarity;
  description: string;
  category: IngredientCategory;
  flavorProfile: FlavorProfile;
  isPlural: boolean;
  suitability: string[]; // e.g., ['pie', 'bake', 'stew']
  nation: Nation; // The nation this ingredient belongs to
  location: IngredientLocation; // The specific region it's from
  synergies?: Record<string, number>; // Maps ingredient names to a synergy score (e.g., { 'Pork Belly': 10 })
  loreSnippet?: string; // Optional snippet of lore about this ingredient
}

export interface CookingStyle {
    name: string;
    description: string;
    dishSubtype: string;
    form: DishForm;
}

export interface DishContext {
  theme: DishTheme;
  primaryIngredient: Ingredient;
  secondaryIngredient: Ingredient;
  cookingStyle: CookingStyle;
  allIngredients: Ingredient[];
  fusionData: FusionData;
  dishType: DishType;
}

export interface Dish {
  name: string;
  emoji: string;
  nations: Nation[];
  dishType: DishType;
  description: string;
  rationale: string[]; // An array of sentences explaining the dish
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
  dishEmojis: Record<DishType, string[]>;
}

// NEW: Represents the combined data for a fusion dish
export interface FusionData {
    selectedNations: Nation[];
    nameParts: {
      prefixes: string[];
      middles: string[];
      suffixes: string[];
    };
    dishEmojis: Record<DishType, string[]>;
}