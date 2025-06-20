import { 
  AirNomadIngredient, 
  AirNomadCookingTechnique, 
  GeneratedAirNomadDish, 
  DishGeneratorConfig,
  IngredientRarity,
  CookingTimeRequirement,
  DishDifficulty 
} from '../types.js';

// Named constants to replace magic values
const SERVING_SIZE_MIN = 2;
const SERVING_SIZE_MAX = 5;
const SERVING_SIZE_RANGE = SERVING_SIZE_MAX - SERVING_SIZE_MIN + 1;

const DIFFICULTY_THRESHOLDS = {
  NOVICE_MAX: 5,
  APPRENTICE_MAX: 10,
  MASTER_MAX: 15
} as const;

const RARITY_COMPLEXITY_SCORES: Record<IngredientRarity, number> = {
  common: 1,
  uncommon: 2,
  rare: 3,
  legendary: 4
};

const TIME_COMPLEXITY_SCORES: Record<CookingTimeRequirement, number> = {
  quick: 1,
  moderate: 2,
  slow: 3,
  ceremonial: 4
};

const DISH_NAME_ADJECTIVES = [
  'Celestial',
  'Floating', 
  'Wind-Kissed',
  'Sacred',
  'Ethereal'
] as const;

const SPIRITUAL_BENEFITS = [
  'Enhances meditation focus',
  'Promotes inner peace',
  'Strengthens connection to air currents',
  'Aids in spiritual enlightenment',
  'Balances chakras',
  undefined // Sometimes no benefit
] as const;

/**
 * Core engine for generating procedural Air Nomad dishes
 * Handles ingredient selection, technique pairing, and dish composition
 */
export class CulinaryGenerator {
  private ingredients: AirNomadIngredient[];
  private techniques: AirNomadCookingTechnique[];
  private config: DishGeneratorConfig;

  constructor(
    ingredients: AirNomadIngredient[],
    techniques: AirNomadCookingTechnique[],
    config: DishGeneratorConfig
  ) {
    if (!ingredients.length) {
      throw new Error('CulinaryGenerator: Cannot initialize with empty ingredients array. At least one ingredient must be provided.');
    }
    if (!techniques.length) {
      throw new Error('CulinaryGenerator: Cannot initialize with empty techniques array. At least one technique must be provided.');
    }
    
    this.ingredients = ingredients;
    this.techniques = techniques;
    this.config = config;
  }

  /**
   * Generates a complete Air Nomad dish with ingredients, technique, and metadata
   * Returns a fully formed dish ready for display or gameplay use
   */
  createDish(): GeneratedAirNomadDish {
    try {
      const selectedIngredients = this.selectIngredients();
      const technique = this.selectTechnique();
      const name = this.composeDishName(selectedIngredients, technique);
      const description = this.composeDishDescription(selectedIngredients, technique);

      return {
        name,
        description,
        ingredients: selectedIngredients,
        technique,
        servingSize: this.calculateServingSize(),
        difficulty: this.calculateDifficulty(selectedIngredients, technique),
        spiritualBenefit: this.assignSpiritualBenefit()
      };
    } catch (error) {
      throw new Error(`CulinaryGenerator.createDish: Failed to generate dish - ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Selects a random set of ingredients based on configuration constraints
   * Ensures no duplicate ingredients and respects count limits
   */
  private selectIngredients(): AirNomadIngredient[] {
    const count = Math.floor(
      Math.random() * (this.config.ingredientCount.max - this.config.ingredientCount.min + 1)
    ) + this.config.ingredientCount.min;

    const selected: AirNomadIngredient[] = [];
    const availableIngredients = [...this.ingredients];

    for (let i = 0; i < count && availableIngredients.length > 0; i++) {
      const index = Math.floor(Math.random() * availableIngredients.length);
      selected.push(availableIngredients.splice(index, 1)[0]);
    }

    if (selected.length === 0) {
      throw new Error('selectIngredients: Failed to select any ingredients from available pool');
    }

    return selected;
  }

  /**
   * Selects a random cooking technique from available options
   * All techniques have equal probability of selection
   */
  private selectTechnique(): AirNomadCookingTechnique {
    const randomIndex = Math.floor(Math.random() * this.techniques.length);
    return this.techniques[randomIndex];
  }

  /**
   * Generates a thematic dish name combining adjectives, technique, and primary ingredient
   * Follows Air Nomad naming conventions for authenticity
   */
  private composeDishName(ingredients: AirNomadIngredient[], technique: AirNomadCookingTechnique): string {
    if (ingredients.length === 0) {
      throw new Error('composeDishName: Cannot compose name with empty ingredients array');
    }
    
    const primaryIngredient = ingredients[0];
    const adjective = DISH_NAME_ADJECTIVES[Math.floor(Math.random() * DISH_NAME_ADJECTIVES.length)];
    
    return `${adjective} ${technique.name} ${primaryIngredient.name}`;
  }

  /**
   * Generates a descriptive text explaining the dish's preparation and cultural context
   * Emphasizes traditional Air Nomad cooking philosophy
   */
  private composeDishDescription(ingredients: AirNomadIngredient[], technique: AirNomadCookingTechnique): string {
    const ingredientNames = ingredients.map(ingredient => ingredient.name).join(', ');
    return `A traditional Air Nomad dish featuring ${ingredientNames} prepared using the ancient ${technique.name} method.`;
  }

  /**
   * Calculates random serving size within defined bounds
   * Ensures reasonable portion sizes for generated dishes
   */
  private calculateServingSize(): number {
    return Math.floor(Math.random() * SERVING_SIZE_RANGE) + SERVING_SIZE_MIN;
  }

  /**
   * Determines dish difficulty based on ingredient rarity and technique complexity
   * Uses weighted scoring system to assign appropriate difficulty levels
   */
  private calculateDifficulty(ingredients: AirNomadIngredient[], technique: AirNomadCookingTechnique): DishDifficulty {
    const ingredientComplexity = ingredients.reduce((sum, ingredient) => {
      return sum + RARITY_COMPLEXITY_SCORES[ingredient.rarity];
    }, 0);

    const techniqueComplexity = TIME_COMPLEXITY_SCORES[technique.timeRequired];
    const totalComplexity = ingredientComplexity + techniqueComplexity;

    if (totalComplexity <= DIFFICULTY_THRESHOLDS.NOVICE_MAX) return 'novice';
    if (totalComplexity <= DIFFICULTY_THRESHOLDS.APPRENTICE_MAX) return 'apprentice';
    if (totalComplexity <= DIFFICULTY_THRESHOLDS.MASTER_MAX) return 'master';
    return 'airbending_master';
  }

  /**
   * Randomly assigns a spiritual benefit to the dish
   * Some dishes may have no spiritual benefit (undefined result)
   */
  private assignSpiritualBenefit(): string | undefined {
    const randomIndex = Math.floor(Math.random() * SPIRITUAL_BENEFITS.length);
    return SPIRITUAL_BENEFITS[randomIndex];
  }
} 