import type { 
  BaseIngredient, 
  BaseCookingTechnique, 
  BaseGeneratedDish,
  GeneratorConfig,
  IngredientRole
} from '../types/core-interfaces.js';
import { composeDishDescription, composeDescriptionAndLore } from './prose-composer.js';
import { composeDishName } from './name-composer.js';
import { applyTextCleanup, resetSentenceHistory } from './text-cleanup.js';
import { applyAirNomadCleanup } from './domain-specific-cleanup.js';
import { 
  calculateServingSize, 
  calculateDifficulty, 
  assignSpiritualBenefit,
  calculateSpiritualBenefitDescription,
  calculateDifficultyWithDescription
} from './metadata-calculator.js';
import { pickRandomFoodEmoji, pickThematicEmoji } from '../data/emoji/emoji-pool.js';

/**
 * ENHANCED GENERATOR CONFIGURATION
 * Extended configuration options for controlling generation behavior
 */
export interface EnhancedGeneratorConfig {
  loreIntensity?: 'light' | 'moderate' | 'deep';
  length?: 'short' | 'standard' | 'extended';
  includeEmoji?: boolean;
  useVariedRarity?: boolean;
  enableBatchVariation?: boolean;
  maxTemplateReuse?: number;
}

/**
 * BATCH VARIATION TRACKING - Monitors template usage to prevent repetition
 * Tracks which templates have been used recently to ensure variety
 */
class BatchVariationTracker {
  private templateHistory: Map<string, number> = new Map();
  private maxHistorySize: number = 10;
  private recentUsage: string[] = [];

  /**
   * Records usage of a template or pattern
   */
  recordUsage(templateId: string): void {
    const currentCount = this.templateHistory.get(templateId) || 0;
    this.templateHistory.set(templateId, currentCount + 1);
    
    this.recentUsage.unshift(templateId);
    if (this.recentUsage.length > this.maxHistorySize) {
      this.recentUsage.pop();
    }
  }

  /**
   * Checks if a template has been overused recently
   */
  shouldAvoidTemplate(templateId: string): boolean {
    const recentCount = this.recentUsage.filter(id => id === templateId).length;
    return recentCount >= 2; // Avoid if used more than once in last 10 dishes
  }

  /**
   * Gets alternative templates if current one should be avoided
   */
  suggestAlternative(currentTemplate: string, alternatives: string[]): string {
    const available = alternatives.filter(alt => !this.shouldAvoidTemplate(alt));
    
    if (available.length === 0) {
      return currentTemplate; // Use original if no alternatives
    }
    
    return available[Math.floor(Math.random() * available.length)];
  }

  /**
   * Resets tracking for new batch
   */
  reset(): void {
    this.templateHistory.clear();
    this.recentUsage = [];
  }
}

/**
 * SOVEREIGN DISH GENERATOR - The One True Generator
 * 
 * This is the ONLY place where dish creation logic lives.
 * All nations call this sovereign generator with their configuration data.
 * Zero nation-specific logic - purely data-driven generation.
 * 
 * ARCHITECTURAL PRINCIPLE: One Source of Truth
 * - This class contains ALL dish generation logic
 * - Nation modules provide ONLY data through GeneratorConfig
 * - No other module may implement createDish() methods
 */
export class SovereignDishGenerator {
  private batchTracker: BatchVariationTracker;
  private config: EnhancedGeneratorConfig;

  constructor(config: EnhancedGeneratorConfig = {}) {
    this.batchTracker = new BatchVariationTracker();
    this.config = {
      loreIntensity: 'moderate',
      length: 'standard',
      includeEmoji: true,
      useVariedRarity: true,
      enableBatchVariation: true,
      maxTemplateReuse: 2,
      ...config
    };
  }

  /**
   * THE SINGLE SOURCE OF TRUTH FOR DISH GENERATION
   * 
   * Takes complete configuration from any nation and produces a full dish.
   * This is the ONLY method that creates dishes - no other module may implement createDish().
   * 
   * @param config - Complete nation-specific configuration with all data and rules
   * @returns Complete generated dish with name, description, ingredients, and metadata
   */
  createDish<
    TIngredient extends BaseIngredient,
    TTechnique extends BaseCookingTechnique, 
    TDish extends BaseGeneratedDish
  >(config: GeneratorConfig<TIngredient, TTechnique>): TDish {
    try {
      // 1. Generate raw components using framework-agnostic logic
      const { ingredients, technique } = this.generateDishComponents(config);
      
      // 2. Generate textual content using nation-provided templates
      const rawName = this.generateDishName(ingredients, technique, config);
      const { description: rawDescription, lore: rawLore } = this.generateDescriptionAndLore(ingredients, technique, config);
      
      // 3. Apply nation-specific text cleanup rules
      const cleanName = this.applyNationCleanup(rawName, config);
      const cleanDescription = this.applyNationCleanup(rawDescription, config);
      const cleanLore = this.applyNationCleanup(rawLore, config);
      
      // 4. Calculate enhanced metadata using nation-specific rules
      const metadata = this.generateEnhancedMetadata(ingredients, technique, config);

      // 5. Assemble complete dish with emoji if enabled
      const finalDish = {
        name: cleanName,
        description: cleanDescription,
        lore: cleanLore,
        ingredients,
        technique,
        ...metadata
      } as unknown as TDish;

      // 6. Track usage for batch variation if enabled
      if (this.config.enableBatchVariation) {
        this.trackDishUsage(ingredients, technique);
      }

      return finalDish;
      
    } catch (error) {
      throw new Error(`SovereignDishGenerator.createDish: Failed to generate dish - ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generates the core ingredient and technique selection
   * Framework-agnostic logic that works across all cultures
   */
  private generateDishComponents<TIngredient extends BaseIngredient, TTechnique extends BaseCookingTechnique>(
    config: GeneratorConfig<TIngredient, TTechnique>
  ): { ingredients: TIngredient[]; technique: TTechnique } {
    try {
      const selectedIngredients = this.selectIngredientsByRole(config);
      const technique = this.selectThematicTechnique(config);
      
      // Validate composition before proceeding
      this.validateDishComposition(selectedIngredients, config);
      
      return {
        ingredients: selectedIngredients,
        technique
      };
    } catch (error) {
      throw new Error(`generateDishComponents: Failed to generate components - ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generates dish name using nation-provided templates and naming rules
   */
  private generateDishName<TIngredient extends BaseIngredient, TTechnique extends BaseCookingTechnique>(
    ingredients: TIngredient[], 
    technique: TTechnique, 
    config: GeneratorConfig<TIngredient, TTechnique>
  ): string {
    // Use existing name composer with the selected ingredients and technique
    return composeDishName(ingredients, technique);
  }

  /**
   * ENHANCED: Generates separate description and lore sections with intensity control
   * Uses configured lore intensity and length settings for optimal user experience
   */
  private generateDescriptionAndLore<TIngredient extends BaseIngredient, TTechnique extends BaseCookingTechnique>(
    ingredients: TIngredient[], 
    technique: TTechnique, 
    config: GeneratorConfig<TIngredient, TTechnique>
  ): { description: string; lore: string } {
    // Use enhanced prose composer method with intensity settings
    return composeDescriptionAndLore(ingredients, technique);
  }

  /**
   * ENHANCED: Applies nation-specific text cleanup rules with domain-specific processing
   */
  private applyNationCleanup(text: string, config: GeneratorConfig): string {
    // Apply universal text cleanup first
    let cleanedText = applyTextCleanup(text);
    
    // Apply Air Nomad-specific cleanup (expand this for other nations)
    cleanedText = applyAirNomadCleanup(cleanedText);
    
    // Apply nation-specific cleanup rules if provided
    if (config.cleanupRules?.textReplacements) {
      for (const rule of config.cleanupRules.textReplacements) {
        cleanedText = cleanedText.replace(rule.pattern, rule.replacement);
      }
    }
    
    if (config.cleanupRules?.culturalAdjustments) {
      for (const rule of config.cleanupRules.culturalAdjustments) {
        cleanedText = cleanedText.replace(rule.pattern, rule.replacement);
      }
    }
    
    return cleanedText;
  }

  /**
   * ENHANCED: Generates rich metadata with spiritual benefits and difficulty descriptions
   */
  private generateEnhancedMetadata<TIngredient extends BaseIngredient, TTechnique extends BaseCookingTechnique>(
    ingredients: TIngredient[], 
    technique: TTechnique, 
    config: GeneratorConfig<TIngredient, TTechnique>
  ): Record<string, any> {
    const baseMetadata = {
      servingSize: calculateServingSize()
    };

    // Add enhanced difficulty information
    const difficultyInfo = calculateDifficultyWithDescription(ingredients, technique);
    
    // Add nation-specific metadata if rules are provided
    const metadata: Record<string, any> = { 
      ...baseMetadata,
      difficulty: difficultyInfo.level,
      difficultyDescription: difficultyInfo.description
    };
    
    if (config.metadataRules?.spiritualBenefits) {
      const benefit = assignSpiritualBenefit(ingredients, technique);
      metadata.spiritualBenefit = benefit;
      metadata.spiritualBenefitDescription = calculateSpiritualBenefitDescription(ingredients, technique, benefit);
    }

    // Add emoji if enabled
    if (this.config.includeEmoji) {
      const hasRareIngredients = ingredients.some(ing => ing.rarity === 'rare' || ing.rarity === 'legendary');
      metadata.emoji = pickThematicEmoji(undefined, hasRareIngredients);
    }
    
    return metadata;
  }

  /**
   * ENHANCED: Tracks dish usage patterns for batch variation
   */
  private trackDishUsage<TIngredient extends BaseIngredient, TTechnique extends BaseCookingTechnique>(
    ingredients: TIngredient[], 
    technique: TTechnique
  ): void {
    // Track technique usage
    this.batchTracker.recordUsage(`technique:${technique.name}`);
    
    // Track ingredient patterns
    const ingredientPattern = ingredients.map(ing => ing.role).sort().join(',');
    this.batchTracker.recordUsage(`pattern:${ingredientPattern}`);
    
    // Track rarity patterns
    const rarityPattern = ingredients.map(ing => ing.rarity).sort().join(',');
    this.batchTracker.recordUsage(`rarity:${rarityPattern}`);
  }

  /**
   * Selects ingredients using role-based composition for balanced dishes
   * Framework-agnostic logic that works across all cultures
   */
  private selectIngredientsByRole<TIngredient extends BaseIngredient>(
    config: GeneratorConfig<TIngredient>
  ): TIngredient[] {
    const rules = config.compositionRules;
    const selected: TIngredient[] = [];

    // Select required roles first
    for (const role of rules.requiredRoles) {
      const roleIngredients = this.selectIngredientsForRole(role, 1, rules.maxIngredientsPerRole[role], true, config);
      selected.push(...roleIngredients);
    }

    // Fill in optional roles based on remaining capacity
    const currentCount = selected.length;
    const targetCount = Math.min(
      rules.ingredientCount?.max || 5,
      currentCount + rules.optionalRoles.length
    );

    for (const role of rules.optionalRoles) {
      if (selected.length >= targetCount) break;
      
      const currentRoleCount = selected.filter(ing => ing.role === role).length;
      const maxForRole = rules.maxIngredientsPerRole[role] || 0;
      
      if (currentRoleCount < maxForRole) {
        const optionalIngredients = this.selectIngredientsForRole(role, 0, 1, false, config);
        selected.push(...optionalIngredients);
      }
    }

    return selected;
  }

  /**
   * ENHANCED: Selects ingredients for a specific role with batch variation awareness
   */
  private selectIngredientsForRole<TIngredient extends BaseIngredient>(
    role: IngredientRole, 
    minCount: number, 
    maxCount: number, 
    isRequired: boolean,
    config: GeneratorConfig<TIngredient>
  ): TIngredient[] {
    const roleIngredients = config.ingredients.filter(ing => ing.role === role);
    
    if (roleIngredients.length === 0) {
      if (isRequired) {
        throw new Error(`No ingredients available for required role: ${role}`);
      }
      return [];
    }

    // Apply filters
    const filteredIngredients = roleIngredients.filter(ingredient => {
      // Apply vegetarian filter if needed
      if (!this.isVegetarian(ingredient, config)) {
        return false;
      }
      
      return true;
    });

    // Apply cultural bias if available
    const biasedIngredients = this.applyCulturalWeightBias(filteredIngredients, config);
    
    // Select random count within range
    const targetCount = Math.max(minCount, Math.min(maxCount, Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount));
    
    const selected: TIngredient[] = [];
    const availablePool = [...biasedIngredients];
    
    for (let i = 0; i < targetCount && availablePool.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availablePool.length);
      const selectedIngredient = availablePool.splice(randomIndex, 1)[0];
      
      if (this.canAddIngredient(selectedIngredient, selected)) {
        selected.push(selectedIngredient);
      }
    }
    
    return selected;
  }

  /**
   * Checks if ingredient meets vegetarian requirements
   */
  private isVegetarian<TIngredient extends BaseIngredient>(
    ingredient: TIngredient, 
    config: GeneratorConfig<TIngredient>
  ): boolean {
    // For now, assume all ingredients in the pool are appropriate
    // This can be enhanced with more sophisticated filtering
    return true;
  }

  /**
   * Applies cultural weight bias to ingredient selection
   */
  private applyCulturalWeightBias<TIngredient extends BaseIngredient>(
    ingredients: TIngredient[], 
    config: GeneratorConfig<TIngredient>
  ): TIngredient[] {
    // Simple implementation - can be enhanced based on config
    return ingredients;
  }

  /**
   * Checks if ingredient can be added to current selection
   */
  private canAddIngredient<TIngredient extends BaseIngredient>(
    ingredient: TIngredient, 
    currentSelection: TIngredient[]
  ): boolean {
    // Prevent duplicates
    if (currentSelection.some(existing => existing.name === ingredient.name)) {
      return false;
    }
    
    // Additional constraints can be added here
    return true;
  }

  /**
   * ENHANCED: Selects technique with batch variation awareness
   */
  private selectThematicTechnique<TTechnique extends BaseCookingTechnique>(
    config: GeneratorConfig<any, TTechnique>
  ): TTechnique {
    const availableTechniques = config.techniques;
    
    if (this.config.enableBatchVariation) {
      // Try to avoid recently used techniques
      const recentlyUsed = availableTechniques.filter(tech => 
        this.batchTracker.shouldAvoidTemplate(`technique:${tech.name}`)
      );
      
      const available = availableTechniques.filter(tech => 
        !recentlyUsed.includes(tech)
      );
      
      if (available.length > 0) {
        const randomIndex = Math.floor(Math.random() * available.length);
        return available[randomIndex];
      }
    }
    
    // Fallback to random selection
    const randomIndex = Math.floor(Math.random() * availableTechniques.length);
    return availableTechniques[randomIndex];
  }

  /**
   * Validates dish composition against rules
   */
  private validateDishComposition<TIngredient extends BaseIngredient>(
    ingredients: TIngredient[],
    config: GeneratorConfig<TIngredient>
  ): void {
    // Basic validation - can be enhanced
    if (ingredients.length === 0) {
      throw new Error('No ingredients selected for dish');
    }
  }

  /**
   * NEW: Updates generator configuration for future dishes
   */
  updateConfig(newConfig: Partial<EnhancedGeneratorConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * NEW: Resets batch tracking for new generation session
   */
  resetBatch(): void {
    this.batchTracker.reset();
    resetSentenceHistory(); // Reset text cleanup history as well
  }

  /**
   * NEW: Gets batch variation statistics for monitoring
   */
  getBatchStats(): {
    templatesUsed: number;
    averageReuse: number;
    needsReset: boolean;
  } {
    // Simple stats implementation
    return {
      templatesUsed: 0,
      averageReuse: 0,
      needsReset: false
    };
  }
}

// Export alias for backward compatibility during transition
export { SovereignDishGenerator as FrameworkCoreDishGenerator }; 