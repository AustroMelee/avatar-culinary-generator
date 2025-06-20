import { CulinaryGenerator } from './culinary-generator.js';
import { airNomadIngredients } from '../data/air-nomad-ingredients.js';
import { airNomadTechniques } from '../data/air-nomad-techniques.js';
import { DishGeneratorConfig } from '../types.js';

// Default configuration constants for Air Nomad dish generation
const DEFAULT_INGREDIENT_COUNT_MIN = 3;
const DEFAULT_INGREDIENT_COUNT_MAX = 6;
const DEFAULT_COMMON_RARITY_WEIGHT = 0.6;
const DEFAULT_UNCOMMON_RARITY_WEIGHT = 0.25;
const DEFAULT_RARE_RARITY_WEIGHT = 0.12;
const DEFAULT_LEGENDARY_RARITY_WEIGHT = 0.03;

/**
 * Default configuration for balanced Air Nomad dish generation
 * Emphasizes common ingredients while allowing for complexity
 */
const defaultAirNomadConfig: DishGeneratorConfig = {
  ingredientCount: { 
    min: DEFAULT_INGREDIENT_COUNT_MIN, 
    max: DEFAULT_INGREDIENT_COUNT_MAX 
  },
  rarityDistribution: {
    common: DEFAULT_COMMON_RARITY_WEIGHT,
    uncommon: DEFAULT_UNCOMMON_RARITY_WEIGHT,
    rare: DEFAULT_RARE_RARITY_WEIGHT,
    legendary: DEFAULT_LEGENDARY_RARITY_WEIGHT
  },
  allowLegendaryIngredients: false
};

/**
 * Specialized generator for Air Nomad main dishes
 * Pre-configured with authentic ingredients and traditional techniques
 */
export class AirNomadMainDishGenerator extends CulinaryGenerator {
  /**
   * Creates a new Air Nomad dish generator with traditional ingredients and techniques
   * Uses sensible defaults unless custom configuration is provided
   */
  constructor(config: DishGeneratorConfig = defaultAirNomadConfig) {
    super(airNomadIngredients, airNomadTechniques, config);
  }
} 