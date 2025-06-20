import { 
  BaseIngredient, 
  BaseCookingTechnique, 
  BaseGeneratedDish,
  CoreDishGeneratorConfig,
  IngredientRole,
  IngredientRarity,
  TechniqueCategory,
  TimeRequirement,
  DishType,
  ServingSize,
  DifficultyLevel,
  DishCompositionRules,
  IngredientCountRange,
  RarityDistribution
} from './types/core-interfaces.js';

// Framework-agnostic types imported from core-interfaces.ts
// IngredientRole, TechniqueCategory, DishType are now defined there

/**
 * Represents a single ingredient used in Air Nomad cuisine
 * Contains all necessary properties for procedural dish generation
 * 
 * Future extensibility considerations:
 * - displayName?: string; // For i18n localization support
 * - seasonal?: Season[]; // For seasonal availability mechanics
 * - region?: AirTempleRegion; // For regional ingredient variations
 */
export interface AirNomadIngredient extends BaseIngredient {
  readonly description?: string;
  readonly source?: string;
  readonly spiritualSignificance?: string;
  readonly preparationNotes?: string;
}

/**
 * Defines the available ingredient categories in Air Nomad cooking
 */
export type IngredientCategory = 'grain' | 'vegetable' | 'protein' | 'fruit' | 'seasoning' | 'liquid';

// IngredientRarity imported from core-interfaces.ts

/**
 * Represents a traditional Air Nomad cooking method
 * Each technique has cultural significance and time requirements
 */
export interface AirNomadCookingTechnique extends BaseCookingTechnique {
  readonly description?: string;
  readonly philosophy?: string;
  readonly temperatureProfile?: TemperatureProfile;
  readonly airflowRequirement?: AirflowRequirement;
  readonly spiritualAspect?: string;
}

/**
 * Defines time requirements for cooking techniques
 */
export type CookingTimeRequirement = 'quick' | 'moderate' | 'slow' | 'ceremonial';

/**
 * Represents a complete generated Air Nomad dish
 * Contains all components needed for display and gameplay
 */
export interface GeneratedAirNomadDish extends BaseGeneratedDish {
  readonly spiritualBenefit?: SpiritualBenefit;
}

/**
 * Defines difficulty levels for generated dishes
 */
export type DishDifficulty = 'novice' | 'apprentice' | 'master' | 'airbending_master';

// DishCompositionRules imported from core-interfaces.ts
// Air Nomad-specific composition rules use the framework-agnostic interface

/**
 * Configuration object for controlling dish generation behavior
 * Allows fine-tuning of randomization and complexity
 */
export interface DishGeneratorConfig extends CoreDishGeneratorConfig {}

/**
 * Represents ingredient selection criteria for role-based composition
 * Used internally by the generator to build balanced dishes
 */
export type IngredientSelectionCriteria = {
  role: IngredientRole;
  requiredCount: number;
  maxCount: number;
  preferHighCulturalWeight: boolean;
  allowSacred: boolean;
  allowLegendary: boolean;
};

/**
 * Re-export framework-agnostic types for backward compatibility
 * These are imported from core-interfaces.ts and re-exported here
 */
export {
  type IngredientRole,
  type IngredientRarity,
  type TechniqueCategory,
  type TimeRequirement,
  type DishType,
  type ServingSize,
  type DifficultyLevel,
  type DishCompositionRules,
  type IngredientCountRange,
  type RarityDistribution
};

/**
 * Air Nomad specific enums and types
 */

export type TemperatureProfile = 'ambient' | 'gentle_warmth' | 'steam_heat' | 'sun_dried';

export type AirflowRequirement = 'still_air' | 'gentle_breeze' | 'controlled_draft' | 'mountain_winds';

export type SpiritualBenefit = 
  | 'enhances_meditation_focus'
  | 'promotes_inner_peace'
  | 'stimulates_chakra_alignment'
  | 'awakens_spiritual_awareness'
  | 'fosters_community_harmony'
  | 'connects_to_ancestral_wisdom'
  | 'purifies_mind_and_body'
  | 'facilitates_air_nomad_traditions';

// Legacy type aliases for backward compatibility
export type { BaseIngredient as Ingredient };
export type { BaseCookingTechnique as CookingTechnique };
export type { BaseGeneratedDish as GeneratedDish }; 