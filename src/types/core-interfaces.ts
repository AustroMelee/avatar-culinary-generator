/**
 * Framework-agnostic core interfaces for dish generation
 * These interfaces should be implemented by nation-specific types
 * Keeps the core generator completely culture-neutral
 */

/**
 * Ingredient roles for composition balance
 */
export type IngredientRole = 
  | 'main' 
  | 'vegetable' 
  | 'seasoning' 
  | 'sauce' 
  | 'garnish'
  | 'base'
  | 'protein'
  | 'spice'
  | 'fruit'
  | 'liquid';

/**
 * Ingredient rarity levels
 */
export type IngredientRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

/**
 * Cooking technique categories
 */
export type TechniqueCategory = 
  | 'steaming'
  | 'boiling' 
  | 'stir-frying'
  | 'braising'
  | 'ceremonial'
  | 'preservation'
  | 'fermentation'
  | 'main_dish';

/**
 * Time requirements for techniques
 */
export type TimeRequirement = 'quick' | 'moderate' | 'slow' | 'ceremonial';

/**
 * Dish types across cultures
 */
export type DishType = 'main_course' | 'side_dish' | 'ceremonial_offering' | 'dessert' | 'beverage';

/**
 * Serving size categories
 */
export type ServingSize = 'individual' | 'family' | 'communal' | 'ceremonial';

/**
 * Difficulty levels
 */
export type DifficultyLevel = 'simple' | 'moderate' | 'complex' | 'masterful';

/**
 * Generic ingredient interface that all nations must implement
 */
export interface BaseIngredient {
  readonly name: string;
  readonly category?: string;
  readonly role: IngredientRole;
  readonly rarity: IngredientRarity;
  readonly culturalWeight: number;
  readonly isSacred?: boolean;
  readonly isLegendary?: boolean;
}

/**
 * Generic cooking technique interface that all nations must implement
 */
export interface BaseCookingTechnique {
  readonly name: string;
  readonly category: TechniqueCategory;
  readonly timeRequired: TimeRequirement;
  readonly culturalSignificance: number;
  readonly suitableForDishTypes: readonly DishType[];
}

/**
 * Generic generated dish interface that all nations must implement
 */
export interface BaseGeneratedDish {
  readonly name: string;
  readonly description: string;
  readonly ingredients: readonly BaseIngredient[];
  readonly technique: BaseCookingTechnique;
  readonly servingSize: ServingSize;
  readonly difficulty: DifficultyLevel;
  readonly culturalBenefit: string;
}

/**
 * Dish composition rules for balancing
 */
export interface DishCompositionRules {
  readonly requiredRoles: readonly IngredientRole[];
  readonly optionalRoles: readonly IngredientRole[];
  readonly maxIngredientsPerRole: Record<IngredientRole, number>;
  readonly maxSacredIngredients: number;
  readonly maxLegendaryIngredients: number;
  readonly enforceVegetarian: boolean;
  readonly culturalWeightThreshold?: number;
  readonly ingredientCount?: IngredientCountRange;
  readonly rarityDistribution?: RarityDistribution;
  readonly culturalWeightBias?: number;
  readonly allowedRarities?: IngredientRarity[];
  readonly sacredIngredientLimits?: {
    regular: number;
    ceremonial: number;
  };
  readonly legendaryIngredientLimits?: {
    regular: number;
    ceremonial: number;
  };
  readonly excludedIngredients?: string[];
  readonly preferredRoles?: IngredientRole[];
}

/**
 * Ingredient count constraints
 */
export interface IngredientCountRange {
  readonly min: number;
  readonly max: number;
}

/**
 * Rarity distribution for random selection
 */
export interface RarityDistribution {
  readonly common: number;
  readonly uncommon: number;
  readonly rare: number;
  readonly legendary: number;
}

/**
 * Core dish generator configuration interface
 */
export interface CoreDishGeneratorConfig {
  readonly dishType: DishType;
  readonly compositionRules: DishCompositionRules;
  readonly ingredientCount: IngredientCountRange;
  readonly rarityDistribution: RarityDistribution;
  readonly allowLegendaryIngredients: boolean;
  readonly culturalWeightBias: number;
}

/**
 * Comprehensive configuration for dish generation
 * Contains ALL data and parameters needed by the sovereign core generator
 */
export interface GeneratorConfig<
  TIngredient extends BaseIngredient = BaseIngredient,
  TTechnique extends BaseCookingTechnique = BaseCookingTechnique
> {
  // Nation-specific data
  ingredients: TIngredient[];
  techniques: TTechnique[];
  
  // Generation parameters
  dishType: DishType;
  compositionRules: DishCompositionRules;
  ingredientCount: IngredientCountRange;
  rarityDistribution: RarityDistribution;
  allowLegendaryIngredients: boolean;
  culturalWeightBias: number;
  
  // Nation-specific naming and prose data
  namingTemplates?: Record<string, string[]>;
  proseTemplates?: Record<string, string[]>;
  festivals?: Array<{ name: string; weight: number }>;
  
  // Nation-specific cleanup and processing rules
  cleanupRules?: {
    textReplacements?: Array<{ pattern: RegExp; replacement: string }>;
    culturalAdjustments?: Array<{ pattern: RegExp; replacement: string }>;
  };
  
  // Nation-specific metadata rules
  metadataRules?: {
    spiritualBenefits?: Array<{ condition: string; benefit: string }>;
    difficultyModifiers?: Record<string, number>;
    servingSizeMultipliers?: Record<string, number>;
  };
  
  // Dietary restrictions and cultural rules
  dietaryRules?: {
    enforceVegetarian: boolean;
    prohibitedIngredients?: string[];
    culturalTaboos?: string[];
  };
  
  // Emoji enhancement configuration
  emojiConfig?: {
    nationId: string;
    enableIngredientEmojis: boolean;
    enableDishNameEmojis: boolean;
    enableCulturalEmojis: boolean;
    fallbackEmojis: {
      ingredient: string;
      dish: string;
      cultural: string;
    };
  };
  
  // Ingredient emoji mappings
  ingredientEmojiMappings?: Record<string, string>;
} 