import type { 
  BaseIngredient, 
  BaseCookingTechnique, 
  BaseGeneratedDish,
  GeneratorConfig,
  IngredientRole
} from '../types/core-interfaces.js';
import { composeDishDescription, composeDescriptionAndLore } from './prose-composer.js';
import { composeDishName } from './name-composer.js';
import { applyTextCleanup } from './text-cleanup.js';
import { 
  calculateServingSize, 
  calculateDifficulty, 
  assignSpiritualBenefit 
} from './metadata-calculator.js';

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
      
      // 4. Calculate metadata using nation-specific rules
      const metadata = this.generateMetadata(ingredients, technique, config);

      // 5. Assemble complete dish
      return {
        name: cleanName,
        description: cleanDescription,
        lore: cleanLore,
        ingredients,
        technique,
        ...metadata
      } as unknown as TDish;
      
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
   * Generates dish description using nation-provided prose templates
   */
  private generateDishDescription<TIngredient extends BaseIngredient, TTechnique extends BaseCookingTechnique>(
    ingredients: TIngredient[], 
    technique: TTechnique, 
    config: GeneratorConfig<TIngredient, TTechnique>
  ): string {
    // Use existing prose composer with the selected ingredients and technique
    return composeDishDescription(ingredients, technique);
  }

  /**
   * Generates separate description and lore sections for better readability
   * Each section is limited to 2 sentences for optimal user experience
   */
  private generateDescriptionAndLore<TIngredient extends BaseIngredient, TTechnique extends BaseCookingTechnique>(
    ingredients: TIngredient[], 
    technique: TTechnique, 
    config: GeneratorConfig<TIngredient, TTechnique>
  ): { description: string; lore: string } {
    // Use new prose composer method for separate sections
    return composeDescriptionAndLore(ingredients, technique);
  }

  /**
   * Applies nation-specific text cleanup rules
   */
  private applyNationCleanup(text: string, config: GeneratorConfig): string {
    // Apply universal text cleanup first
    let cleanedText = applyTextCleanup(text);
    
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
   * Generates metadata using nation-specific rules
   */
  private generateMetadata<TIngredient extends BaseIngredient, TTechnique extends BaseCookingTechnique>(
    ingredients: TIngredient[], 
    technique: TTechnique, 
    config: GeneratorConfig<TIngredient, TTechnique>
  ): Record<string, any> {
    const baseMetadata = {
      servingSize: calculateServingSize(),
      difficulty: calculateDifficulty(ingredients, technique)
    };

    // Add nation-specific metadata if rules are provided
    const metadata: Record<string, any> = { ...baseMetadata };
    
    if (config.metadataRules?.spiritualBenefits) {
      metadata.culturalBenefit = assignSpiritualBenefit(ingredients, technique);
    }
    
    // Apply difficulty modifiers if provided
    if (config.metadataRules?.difficultyModifiers) {
      // Could apply technique-specific difficulty adjustments here
    }
    
    return metadata;
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

    // Add optional roles if we haven't reached max ingredient count
    const remainingSlots = config.ingredientCount.max - selected.length;
    let optionalAdded = 0;

    for (const role of rules.optionalRoles) {
      if (optionalAdded >= remainingSlots) break;
      
      // 60% chance to include each optional role
      if (Math.random() < 0.6) {
        const maxForRole = Math.min(rules.maxIngredientsPerRole[role], remainingSlots - optionalAdded);
        const roleIngredients = this.selectIngredientsForRole(role, 0, maxForRole, false, config);
        selected.push(...roleIngredients);
        optionalAdded += roleIngredients.length;
      }
    }

    // Ensure minimum ingredient count
    while (selected.length < config.ingredientCount.min) {
      const remainingSlots = config.ingredientCount.max - selected.length;
      if (remainingSlots <= 0) break;
      
      let addedIngredient = false;
      
      for (const role of [...rules.requiredRoles, ...rules.optionalRoles]) {
        const currentRoleCount = selected.filter(ing => ing.role === role).length;
        const maxForRole = rules.maxIngredientsPerRole[role];
        
        if (currentRoleCount < maxForRole) {
          const additionalIngredients = this.selectIngredientsForRole(role, 0, 1, false, config);
          if (additionalIngredients.length > 0) {
            selected.push(...additionalIngredients);
            addedIngredient = true;
            break;
          }
        }
      }
      
      if (!addedIngredient) break;
    }
    
    if (selected.length < config.ingredientCount.min) {
      throw new Error(`selectIngredientsByRole: Generated ${selected.length} ingredients, minimum required is ${config.ingredientCount.min}. Available ingredient pool may be too constrained.`);
    }

    return selected;
  }

  /**
   * Selects ingredients for a specific role with cultural weight bias and constraints
   * Framework-agnostic constraint checking
   */
  private selectIngredientsForRole<TIngredient extends BaseIngredient>(
    role: IngredientRole, 
    minCount: number, 
    maxCount: number, 
    isRequired: boolean,
    config: GeneratorConfig<TIngredient>
  ): TIngredient[] {
    const allRoleIngredients = config.ingredients.filter(ing => ing.role === role);
    const roleIngredients = config.compositionRules.enforceVegetarian 
      ? allRoleIngredients.filter(ing => this.isVegetarian(ing, config))
      : allRoleIngredients;
    
    if (roleIngredients.length === 0) {
      if (isRequired) {
        throw new Error(`selectIngredientsForRole: No ingredients available for required role '${role}'`);
      }
      return [];
    }

    const biasedIngredients = this.applyCulturalWeightBias(roleIngredients, config);
    const count = minCount + Math.floor(Math.random() * (maxCount - minCount + 1));
    const selected: TIngredient[] = [];
    const availableIngredients = [...biasedIngredients];
    
    let attempts = 0;
    const maxAttempts = biasedIngredients.length * 3;
    
    while (selected.length < count && availableIngredients.length > 0 && attempts < maxAttempts) {
      const randomIndex = Math.floor(Math.random() * availableIngredients.length);
      const candidate = availableIngredients[randomIndex];
      
      if (this.canAddIngredient(candidate, selected)) {
        selected.push(candidate);
        availableIngredients.splice(randomIndex, 1);
      } else {
        availableIngredients.splice(randomIndex, 1);
      }
      
      attempts++;
    }
    
    if (selected.length < minCount && !isRequired) {
      return selected;
    }
    
    return selected;
  }

  /**
   * Framework-agnostic vegetarian checking with nation-specific dietary rules
   */
  private isVegetarian<TIngredient extends BaseIngredient>(
    ingredient: TIngredient, 
    config: GeneratorConfig<TIngredient>
  ): boolean {
    // Apply nation-specific prohibited ingredients if provided
    if (config.dietaryRules?.prohibitedIngredients) {
      const isProhibited = config.dietaryRules.prohibitedIngredients.some(prohibited => 
        ingredient.name.toLowerCase().includes(prohibited.toLowerCase())
      );
      if (isProhibited) return false;
    }
    
    // Basic vegetarian exclusions for all cultures
    const nonVegetarianKeywords = ['egg', 'milk', 'butter', 'cream', 'cheese', 'meat', 'fish', 'poultry'];
    return !nonVegetarianKeywords.some(keyword => 
      ingredient.name.toLowerCase().includes(keyword)
    );
  }

  /**
   * Applies cultural weight bias to ingredient selection
   */
  private applyCulturalWeightBias<TIngredient extends BaseIngredient>(
    ingredients: TIngredient[], 
    config: GeneratorConfig<TIngredient>
  ): TIngredient[] {
    const weightedPool: TIngredient[] = [];
    
    for (const ingredient of ingredients) {
      const weight = Math.max(1, Math.round(ingredient.culturalWeight * config.culturalWeightBias));
      for (let i = 0; i < weight; i++) {
        weightedPool.push(ingredient);
      }
    }
    
    return weightedPool;
  }

  /**
   * Checks if an ingredient can be added without violating constraints
   */
  private canAddIngredient<TIngredient extends BaseIngredient>(
    ingredient: TIngredient, 
    currentSelection: TIngredient[]
  ): boolean {
    // Prevent duplicates
    if (currentSelection.some(selected => selected.name === ingredient.name)) {
      return false;
    }

    // Check rarity constraints
    const legendaryCount = currentSelection.filter(ing => ing.rarity === 'legendary').length;
    if (ingredient.rarity === 'legendary' && legendaryCount >= 1) {
      return false;
    }

    const rareCount = currentSelection.filter(ing => ing.rarity === 'rare' || ing.rarity === 'legendary').length;
    if ((ingredient.rarity === 'rare' || ingredient.rarity === 'legendary') && rareCount >= 2) {
      return false;
    }

    return true;
  }

  /**
   * Selects a technique that complements the generated ingredients
   */
  private selectThematicTechnique<TTechnique extends BaseCookingTechnique>(
    config: GeneratorConfig<any, TTechnique>
  ): TTechnique {
    // Filter techniques suitable for the dish type
    const suitableTechniques = config.techniques.filter(technique => 
      technique.suitableForDishTypes.includes(config.dishType)
    );

    if (suitableTechniques.length === 0) {
      throw new Error(`selectThematicTechnique: No techniques available for dish type '${config.dishType}'`);
    }

    // Weight by cultural significance
    const weightedTechniques: TTechnique[] = [];
    for (const technique of suitableTechniques) {
      const weight = Math.max(1, technique.culturalSignificance);
      for (let i = 0; i < weight; i++) {
        weightedTechniques.push(technique);
      }
    }

    const randomIndex = Math.floor(Math.random() * weightedTechniques.length);
    return weightedTechniques[randomIndex];
  }

  /**
   * Validates that the dish composition meets quality standards
   */
  private validateDishComposition<TIngredient extends BaseIngredient>(
    ingredients: TIngredient[],
    config: GeneratorConfig<TIngredient>
  ): void {
    const rules = config.compositionRules;
    
    // Check required roles are present
    for (const requiredRole of rules.requiredRoles) {
      const hasRole = ingredients.some(ing => ing.role === requiredRole);
      if (!hasRole) {
        throw new Error(`validateDishComposition: Missing required role '${requiredRole}'`);
      }
    }

    // Check ingredient count limits
    if (ingredients.length < config.ingredientCount.min || ingredients.length > config.ingredientCount.max) {
      throw new Error(`validateDishComposition: Invalid ingredient count ${ingredients.length}, must be between ${config.ingredientCount.min} and ${config.ingredientCount.max}`);
    }

    // Check role limits
    for (const [role, maxCount] of Object.entries(rules.maxIngredientsPerRole)) {
      const roleCount = ingredients.filter(ing => ing.role === role).length;
      if (roleCount > maxCount) {
        throw new Error(`validateDishComposition: Too many ingredients for role '${role}': ${roleCount} > ${maxCount}`);
      }
    }
  }
}

// Export alias for backward compatibility during transition
export { SovereignDishGenerator as FrameworkCoreDishGenerator }; 