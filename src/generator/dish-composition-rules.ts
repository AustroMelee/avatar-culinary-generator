import { 
  DishCompositionRules, 
  IngredientRole, 
  DishType, 
  AirNomadIngredient, 
  IngredientRarity 
} from '../types.js';

/**
 * Universal dish composition constants applicable across all nations
 * Provides baseline structure for traditional Avatar world cuisine
 */
export const UNIVERSAL_COMPOSITION_CONSTANTS = {
  // Ingredient count ranges by dish type
  INGREDIENT_COUNTS: {
    main_course: { min: 3, max: 5 },
    side_dish: { min: 2, max: 4 },
    dessert: { min: 2, max: 4 },
    beverage: { min: 1, max: 3 },
    ceremonial_offering: { min: 4, max: 7 }
  },
  
  // Cultural authenticity thresholds
  CULTURAL_THRESHOLDS: {
    standard: 6.0,
    high: 7.0,
    ceremonial: 8.0
  },
  
  // Sacred and legendary ingredient limits
  SACRED_LIMITS: {
    regular: 1,
    ceremonial: 2,
    special_occasion: 3
  },
  
  LEGENDARY_LIMITS: {
    standard: 1,
    ceremonial: 1,
    epic: 2
  },
  
  // Cultural weight bias multipliers
  CULTURAL_BIAS: {
    neutral: 1.0,
    moderate: 1.4,
    high: 1.8,
    extreme: 2.5
  }
} as const;

/**
 * Role-based composition templates for different dish types
 * Defines the structural foundation for authentic Avatar world cuisine
 */
export const UNIVERSAL_DISH_TEMPLATES = {
  main_course: {
    requiredRoles: ['main', 'vegetable', 'seasoning'] as IngredientRole[],
    optionalRoles: ['garnish', 'liquid'] as IngredientRole[],
    maxIngredientsPerRole: {
      main: 1,
      vegetable: 2,
      seasoning: 2,
      sauce: 0,
      garnish: 1,
      base: 0,
      protein: 1,
      spice: 1,
      fruit: 1,
      liquid: 1
    }
  },
  
  side_dish: {
    requiredRoles: ['vegetable', 'seasoning'] as IngredientRole[],
    optionalRoles: ['garnish', 'fruit'] as IngredientRole[],
    maxIngredientsPerRole: {
      main: 0,
      vegetable: 2,
      seasoning: 1,
      sauce: 0,
      garnish: 1,
      base: 0,
      protein: 0,
      spice: 0,
      fruit: 1,
      liquid: 1
    }
  },
  
  dessert: {
    requiredRoles: ['fruit', 'seasoning'] as IngredientRole[],
    optionalRoles: ['garnish', 'liquid'] as IngredientRole[],
    maxIngredientsPerRole: {
      main: 1,
      vegetable: 0,
      seasoning: 2,
      sauce: 0,
      garnish: 1,
      base: 0,
      protein: 0,
      spice: 1,
      fruit: 2,
      liquid: 1
    }
  },
  
  beverage: {
    requiredRoles: ['liquid'] as IngredientRole[],
    optionalRoles: ['seasoning', 'fruit', 'garnish'] as IngredientRole[],
    maxIngredientsPerRole: {
      main: 0,
      vegetable: 0,
      seasoning: 2,
      sauce: 0,
      garnish: 1,
      base: 0,
      protein: 0,
      spice: 0,
      fruit: 1,
      liquid: 1
    }
  },
  
  ceremonial_offering: {
    requiredRoles: ['main', 'seasoning'] as IngredientRole[],
    optionalRoles: ['vegetable', 'fruit', 'garnish', 'liquid'] as IngredientRole[],
    maxIngredientsPerRole: {
      main: 1,
      vegetable: 2,
      seasoning: 2,
      sauce: 0,
      garnish: 2,
      base: 0,
      protein: 1,
      spice: 1,
      fruit: 2,
      liquid: 1
    }
  }
} as const;

/**
 * Configuration for nation-specific dietary restrictions and cultural preferences
 * Enables customization while maintaining structural consistency
 */
export type NationCulinaryProfile = {
  name: string;
  enforceVegetarian: boolean;
  culturalWeightThreshold: number;
  culturalWeightBias: number;
  allowedRarities: IngredientRarity[];
  sacredIngredientLimits: {
    regular: number;
    ceremonial: number;
  };
  legendaryIngredientLimits: {
    regular: number;
    ceremonial: number;
  };
  excludedIngredients?: string[]; // Ingredient names to exclude
  preferredRoles?: IngredientRole[]; // Roles to emphasize in selection
};

/**
 * Pre-configured culinary profiles for each nation
 * Reflects cultural values and dietary traditions
 */
export const NATION_CULINARY_PROFILES: Record<string, NationCulinaryProfile> = {
  air_nomads: {
    name: 'Air Nomads',
    enforceVegetarian: true,
    culturalWeightThreshold: UNIVERSAL_COMPOSITION_CONSTANTS.CULTURAL_THRESHOLDS.standard,
    culturalWeightBias: UNIVERSAL_COMPOSITION_CONSTANTS.CULTURAL_BIAS.high,
    allowedRarities: ['common', 'uncommon', 'rare', 'legendary'] as IngredientRarity[],
    sacredIngredientLimits: {
      regular: UNIVERSAL_COMPOSITION_CONSTANTS.SACRED_LIMITS.regular,
      ceremonial: UNIVERSAL_COMPOSITION_CONSTANTS.SACRED_LIMITS.ceremonial
    },
    legendaryIngredientLimits: {
      regular: UNIVERSAL_COMPOSITION_CONSTANTS.LEGENDARY_LIMITS.standard,
      ceremonial: UNIVERSAL_COMPOSITION_CONSTANTS.LEGENDARY_LIMITS.ceremonial
    },
    excludedIngredients: ['Eggs', 'Egg Whites', 'Butter', 'Milk', 'Cream', 'Creamy Sauce', 'Milk Powder'] as string[],
    preferredRoles: ['vegetable', 'fruit', 'seasoning'] as IngredientRole[]
  }
} as const;

/**
 * Factory for creating nation and dish-type specific composition rules
 * Provides standardized rule generation with customization options
 */
export class DishCompositionRuleFactory {
  /**
   * Creates composition rules for a specific nation and dish type
   * Combines universal templates with nation-specific preferences
   */
  static createRulesForNationAndDishType(
    nationKey: string, 
    dishType: DishType,
    customOverrides?: Partial<DishCompositionRules>
  ): DishCompositionRules {
    const profile = NATION_CULINARY_PROFILES[nationKey];
    if (!profile) {
      throw new Error(`DishCompositionRuleFactory: Unknown nation key '${nationKey}'`);
    }

    const template = UNIVERSAL_DISH_TEMPLATES[dishType];
    if (!template) {
      throw new Error(`DishCompositionRuleFactory: Unknown dish type '${dishType}'`);
    }

    // Determine sacred/legendary limits based on dish type
    const isSpecialOccasion = dishType === 'ceremonial_offering';
    const sacredLimit = isSpecialOccasion 
      ? profile.sacredIngredientLimits.ceremonial 
      : profile.sacredIngredientLimits.regular;
    const legendaryLimit = isSpecialOccasion 
      ? profile.legendaryIngredientLimits.ceremonial 
      : profile.legendaryIngredientLimits.regular;

    const baseRules: DishCompositionRules = {
      requiredRoles: template.requiredRoles,
      optionalRoles: template.optionalRoles,
      maxIngredientsPerRole: template.maxIngredientsPerRole,
      maxSacredIngredients: sacredLimit,
      maxLegendaryIngredients: legendaryLimit,
      culturalWeightThreshold: profile.culturalWeightThreshold,
      enforceVegetarian: profile.enforceVegetarian
    };

    // Apply any custom overrides
    return customOverrides ? { ...baseRules, ...customOverrides } : baseRules;
  }

  /**
   * Creates Air Nomad specific composition rules
   * Enforces vegetarian restrictions and high cultural standards
   */
  static createAirNomadRules(dishType: DishType): DishCompositionRules {
    return this.createRulesForNationAndDishType('air_nomads', dishType);
  }
}

/**
 * Utility class for filtering ingredients based on composition rules
 * Provides consistent filtering logic across all generators
 */
export class IngredientFilterUtils {
  /**
   * Filters ingredients based on nation profile and dish type requirements
   * Applies dietary restrictions, cultural thresholds, and rarity limits
   */
  static filterByNationProfile<T extends AirNomadIngredient>(
    ingredients: T[], 
    nationKey: string
    // dishType: DishType = 'main_course' // Available for future dish-type specific filtering
  ): T[] {
    const profile = NATION_CULINARY_PROFILES[nationKey];
    if (!profile) {
      throw new Error(`IngredientFilterUtils: Unknown nation key '${nationKey}'`);
    }

    let filtered = [...ingredients];

    // Apply dietary restrictions
    if (profile.enforceVegetarian && profile.excludedIngredients) {
      filtered = filtered.filter(ingredient => 
        !profile.excludedIngredients!.includes(ingredient.name)
      );
    }

    // Apply cultural weight threshold
    filtered = filtered.filter(ingredient => 
      ingredient.culturalWeight >= profile.culturalWeightThreshold
    );

    // Apply rarity restrictions
    filtered = filtered.filter(ingredient => 
      profile.allowedRarities.includes(ingredient.rarity)
    );

    // Note: Role preferences are available for future implementation
    // Currently, all roles are needed for balanced dish composition
    // The preferredRoles setting could be used for weighted selection in the future

    return filtered;
  }

  /**
   * Applies cultural weight bias to ingredient selection probability
   * Higher cultural weight ingredients become more likely to be selected
   */
  static applyCulturalWeightBias<T extends AirNomadIngredient>(
    ingredients: T[], 
    biasMultiplier: number
  ): T[] {
    if (biasMultiplier === 1.0) {
      return ingredients; // No bias applied
    }

    const biased: T[] = [];
    
    for (const ingredient of ingredients) {
      const weight = ingredient.culturalWeight;
      const normalizedWeight = weight / 10; // Normalize to 0-1 range
      const biasMultiplier_actual = Math.pow(normalizedWeight, biasMultiplier - 1);
      const copies = Math.max(1, Math.round(biasMultiplier_actual * 3)); // 1-3 copies
      
      for (let i = 0; i < copies; i++) {
        biased.push(ingredient);
      }
    }

    return biased;
  }

  /**
   * Validates ingredient against composition constraints
   * Checks sacred/legendary limits and compatibility
   */
  static validateIngredientConstraints<T extends AirNomadIngredient>(
    ingredient: T,
    currentSelection: T[],
    rules: DishCompositionRules,
    allowLegendaryIngredients: boolean
  ): boolean {
    // Check legendary ingredient limit
    if (ingredient.rarity === 'legendary') {
      if (!allowLegendaryIngredients) return false;
      
      const currentLegendaryCount = currentSelection.filter(ing => ing.rarity === 'legendary').length;
      if (currentLegendaryCount >= rules.maxLegendaryIngredients) {
        return false;
      }
    }

    // Check sacred ingredient limit
    if (ingredient.isSacred) {
      const currentSacredCount = currentSelection.filter(ing => ing.isSacred).length;
      if (currentSacredCount >= rules.maxSacredIngredients) {
        return false;
      }
    }

    // Check for duplicates
    if (currentSelection.some(existing => existing.name === ingredient.name)) {
      return false;
    }

    return true;
  }
}

/**
 * Validation utility for dish composition analysis
 * Provides comprehensive validation and analysis tools
 */
export class DishCompositionValidator {
  /**
   * Validates a complete dish composition against composition rules
   * Throws descriptive errors if validation fails
   */
  static validateComposition<T extends AirNomadIngredient>(
    ingredients: T[],
    rules: DishCompositionRules,
    dishName: string = 'dish'
  ): void {
    // Check required roles
    for (const requiredRole of rules.requiredRoles) {
      const hasRole = ingredients.some(ingredient => ingredient.role === requiredRole);
      if (!hasRole) {
        throw new Error(`${dishName}: Missing required ingredient role '${requiredRole}'`);
      }
    }

    // Check role limits
    const roleCounts: Partial<Record<IngredientRole, number>> = {};
    for (const ingredient of ingredients) {
      roleCounts[ingredient.role] = (roleCounts[ingredient.role] || 0) + 1;
    }

    for (const [role, count] of Object.entries(roleCounts)) {
      const maxAllowed = rules.maxIngredientsPerRole[role as IngredientRole];
      if (count > maxAllowed) {
        throw new Error(`${dishName}: Too many '${role}' ingredients (${count}), maximum allowed is ${maxAllowed}`);
      }
    }

    // Check sacred ingredient limit
    const sacredCount = ingredients.filter(ingredient => ingredient.isSacred).length;
    if (sacredCount > rules.maxSacredIngredients) {
      throw new Error(`${dishName}: Too many sacred ingredients (${sacredCount}), maximum allowed is ${rules.maxSacredIngredients}`);
    }

    // Check legendary ingredient limit
    const legendaryCount = ingredients.filter(ingredient => ingredient.rarity === 'legendary').length;
    if (legendaryCount > rules.maxLegendaryIngredients) {
      throw new Error(`${dishName}: Too many legendary ingredients (${legendaryCount}), maximum allowed is ${rules.maxLegendaryIngredients}`);
    }

    // Check cultural weight threshold
    const averageCulturalWeight = ingredients.reduce((sum, ingredient) => sum + ingredient.culturalWeight, 0) / ingredients.length;
    if (averageCulturalWeight < rules.culturalWeightThreshold) {
      throw new Error(`${dishName}: Average cultural weight (${averageCulturalWeight.toFixed(1)}) below threshold (${rules.culturalWeightThreshold})`);
    }

    // Check vegetarian enforcement
    if (rules.enforceVegetarian) {
      const nonVegetarianItems = ['Eggs', 'Egg Whites', 'Butter', 'Milk', 'Cream', 'Creamy Sauce', 'Milk Powder'];
      const hasNonVegetarian = ingredients.some(ingredient => nonVegetarianItems.includes(ingredient.name));
      if (hasNonVegetarian) {
        throw new Error(`${dishName}: Non-vegetarian ingredients found with vegetarian enforcement enabled`);
      }
    }
  }

  /**
   * Analyzes dish composition and returns detailed metrics
   * Provides insights into role distribution, cultural weight, and constraint adherence
   */
  static analyzeComposition<T extends AirNomadIngredient>(
    ingredients: T[],
    rules: DishCompositionRules
  ): {
    isValid: boolean;
    roleDistribution: Record<IngredientRole, number>;
    culturalWeightAverage: number;
    sacredCount: number;
    legendaryCount: number;
    violations: string[];
  } {
    const violations: string[] = [];
    
    // Analyze role distribution
    const roleDistribution: Record<IngredientRole, number> = {
      main: 0,
      vegetable: 0,
      seasoning: 0,
      sauce: 0,
      garnish: 0,
      base: 0,
      protein: 0,
      spice: 0,
      fruit: 0,
      liquid: 0
    };
    
    for (const ingredient of ingredients) {
      roleDistribution[ingredient.role]++;
    }

    // Check required roles
    for (const requiredRole of rules.requiredRoles) {
      if (roleDistribution[requiredRole] === 0) {
        violations.push(`Missing required role: ${requiredRole}`);
      }
    }

    // Check role limits
    for (const [role, count] of Object.entries(roleDistribution)) {
      const maxAllowed = rules.maxIngredientsPerRole[role as IngredientRole];
      if (count > maxAllowed) {
        violations.push(`Too many ${role} ingredients: ${count} (max: ${maxAllowed})`);
      }
    }

    // Calculate metrics
    const culturalWeightAverage = ingredients.reduce((sum, ing) => sum + ing.culturalWeight, 0) / ingredients.length;
    const sacredCount = ingredients.filter(ing => ing.isSacred).length;
    const legendaryCount = ingredients.filter(ing => ing.rarity === 'legendary').length;

    // Check constraints
    if (sacredCount > rules.maxSacredIngredients) {
      violations.push(`Too many sacred ingredients: ${sacredCount} (max: ${rules.maxSacredIngredients})`);
    }

    if (legendaryCount > rules.maxLegendaryIngredients) {
      violations.push(`Too many legendary ingredients: ${legendaryCount} (max: ${rules.maxLegendaryIngredients})`);
    }

    if (culturalWeightAverage < rules.culturalWeightThreshold) {
      violations.push(`Cultural weight below threshold: ${culturalWeightAverage.toFixed(1)} (min: ${rules.culturalWeightThreshold})`);
    }

    return {
      isValid: violations.length === 0,
      roleDistribution,
      culturalWeightAverage,
      sacredCount,
      legendaryCount,
      violations
    };
  }
} 