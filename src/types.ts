/**
 * Represents a single ingredient used in Air Nomad cuisine
 * Contains all necessary properties for procedural dish generation
 */
export type AirNomadIngredient = {
  name: string;
  category: IngredientCategory;
  rarity: IngredientRarity;
  culturalWeight: number; // Semantic weight from 1-10 indicating Air Nomad authenticity
};

/**
 * Defines the available ingredient categories in Air Nomad cooking
 */
export type IngredientCategory = 'grain' | 'vegetable' | 'protein' | 'seasoning' | 'liquid';

/**
 * Defines rarity levels for ingredients, affecting dish difficulty calculation
 */
export type IngredientRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

/**
 * Represents a traditional Air Nomad cooking method
 * Each technique has cultural significance and time requirements
 */
export type AirNomadCookingTechnique = {
  name: string;
  description: string;
  timeRequired: CookingTimeRequirement;
  culturalSignificance: number; // Cultural importance score from 1-10
};

/**
 * Defines time requirements for cooking techniques
 */
export type CookingTimeRequirement = 'quick' | 'moderate' | 'slow' | 'ceremonial';

/**
 * Represents a complete generated Air Nomad dish
 * Contains all components needed for display and gameplay
 */
export type GeneratedAirNomadDish = {
  name: string;
  description: string;
  ingredients: AirNomadIngredient[];
  technique: AirNomadCookingTechnique;
  servingSize: number;
  difficulty: DishDifficulty;
  spiritualBenefit?: string;
};

/**
 * Defines difficulty levels for generated dishes
 */
export type DishDifficulty = 'novice' | 'apprentice' | 'master' | 'airbending_master';

/**
 * Configuration object for controlling dish generation behavior
 * Allows fine-tuning of randomization and complexity
 */
export type DishGeneratorConfig = {
  ingredientCount: { min: number; max: number };
  rarityDistribution: Record<IngredientRarity, number>;
  allowLegendaryIngredients: boolean;
}; 