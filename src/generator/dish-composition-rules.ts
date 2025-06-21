import { 
  DishCompositionRules, 
  IngredientRole, 
  DishType, 
  AirNomadIngredient, 
  IngredientRarity 
} from '../types.js';
import { RARITY_CURVES, TECHNIQUE_IDS } from './composition-constants.js';

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
 * ENHANCED: Rarity distribution system with dynamic curves
 * Selects random rarity patterns to vary dish composition across generations
 */
export function selectRarityCurve(): [number, number, number, number] {
  const randomIndex = Math.floor(Math.random() * RARITY_CURVES.length);
  return [...RARITY_CURVES[randomIndex]] as [number, number, number, number];
}

/**
 * ENHANCED: Applies dynamic rarity curve to ingredient selection
 * Uses selected curve to weight ingredient rarity distribution
 */
export function applyRarityCurveWeighting<T extends AirNomadIngredient>(
  ingredients: T[], 
  curve: [number, number, number, number]
): T[] {
  const [commonWeight, uncommonWeight, rareWeight, legendaryWeight] = curve;
  
  // Create weighted pool based on the curve
  const weightedPool: T[] = [];
  
  for (const ingredient of ingredients) {
    let weight = 0;
    switch (ingredient.rarity) {
      case 'common':
        weight = commonWeight;
        break;
      case 'uncommon':
        weight = uncommonWeight;
        break;
      case 'rare':
        weight = rareWeight;
        break;
      case 'legendary':
        weight = legendaryWeight;
        break;
    }
    
    // Add ingredient to pool based on its weight
    for (let i = 0; i < weight; i++) {
      weightedPool.push(ingredient);
    }
  }
  
  return weightedPool;
}

/**
 * ENHANCED: Technique selection with expanded pool
 * Includes new techniques from the expanded TECHNIQUE_IDS list
 */
export function selectTechniqueFromExpandedPool<TTechnique extends { name: string }>(
  techniques: TTechnique[]
): TTechnique {
  // Filter techniques to include only those in the expanded pool
  const expandedTechniques = techniques.filter(technique => 
    TECHNIQUE_IDS.some(id => 
      technique.name.toLowerCase().replace(/[\s-]/g, '-') === id ||
      technique.name.toLowerCase().includes(id.replace(/-/g, ' '))
    )
  );
  
  // If we have expanded techniques available, use them
  if (expandedTechniques.length > 0) {
    const randomIndex = Math.floor(Math.random() * expandedTechniques.length);
    return expandedTechniques[randomIndex];
  }
  
  // Fallback to original pool if expanded techniques not available
  const randomIndex = Math.floor(Math.random() * techniques.length);
  return techniques[randomIndex];
}

/**
 * Factory for creating nation and dish-type specific composition rules
 * Provides standardized rule generation with customization options
 */
export class DishCompositionRuleFactory {
  /**
   * ENHANCED: Creates composition rules with dynamic rarity curves
   * Combines universal templates with nation-specific preferences and rarity variation
   */
  static createRulesForNationAndDishType(
    nationKey: string, 
    dishType: DishType,
    useVariedRarity: boolean = true
  ): DishCompositionRules {
    const profile = NATION_CULINARY_PROFILES[nationKey];
    if (!profile) {
      throw new Error(`Unknown nation profile: ${nationKey}`);
    }

    const template = UNIVERSAL_DISH_TEMPLATES[dishType];
    if (!template) {
      throw new Error(`Unknown dish type: ${dishType}`);
    }

    const ingredientCounts = UNIVERSAL_COMPOSITION_CONSTANTS.INGREDIENT_COUNTS[dishType];
    
    // Select rarity curve for this dish if variation is enabled
    const selectedCurve = useVariedRarity ? selectRarityCurve() : [1, 1, 1, 1] as [number, number, number, number];

    return {
      requiredRoles: template.requiredRoles,
      optionalRoles: template.optionalRoles,
      maxIngredientsPerRole: template.maxIngredientsPerRole,
      maxSacredIngredients: profile.sacredIngredientLimits.regular,
      maxLegendaryIngredients: profile.legendaryIngredientLimits.regular,
      enforceVegetarian: profile.enforceVegetarian,
      culturalWeightThreshold: profile.culturalWeightThreshold,
      ingredientCount: ingredientCounts,
      rarityDistribution: {
        common: selectedCurve[0],
        uncommon: selectedCurve[1], 
        rare: selectedCurve[2],
        legendary: selectedCurve[3]
      },
      culturalWeightBias: profile.culturalWeightBias,
      allowedRarities: profile.allowedRarities,
      sacredIngredientLimits: profile.sacredIngredientLimits,
      legendaryIngredientLimits: profile.legendaryIngredientLimits,
      excludedIngredients: profile.excludedIngredients || [],
      preferredRoles: profile.preferredRoles
    };
  }

  /**
   * Creates Air Nomad specific rules with enhanced rarity variation
   */
  static createAirNomadRules(dishType: DishType, useVariedRarity: boolean = true): DishCompositionRules {
    return this.createRulesForNationAndDishType('air_nomads', dishType, useVariedRarity);
  }
}

export class IngredientFilterUtils {
  /**
   * ENHANCED: Filters ingredients by nation profile with rarity curve support
   */
  static filterByNationProfile<T extends AirNomadIngredient>(
    ingredients: T[], 
    nationKey: string,
    applyCurve: boolean = false,
    selectedCurve?: [number, number, number, number]
    // dishType: DishType = 'main_course' // Available for future dish-type specific filtering
  ): T[] {
    const profile = NATION_CULINARY_PROFILES[nationKey];
    if (!profile) {
      throw new Error(`Unknown nation profile: ${nationKey}`);
    }

    let filtered = ingredients.filter(ingredient => {
      // Apply vegetarian filter if enforced
      if (profile.enforceVegetarian && this.isMeatProduct(ingredient)) {
        return false;
      }

      // Apply excluded ingredients filter
      if (profile.excludedIngredients?.includes(ingredient.name)) {
        return false;
      }

      // Apply rarity filter
      if (!profile.allowedRarities.includes(ingredient.rarity)) {
        return false;
      }

      return true;
    });

    // Apply cultural weight bias
    filtered = this.applyCulturalWeightBias(filtered, profile.culturalWeightBias);

    // Apply rarity curve if requested
    if (applyCurve && selectedCurve) {
      filtered = applyRarityCurveWeighting(filtered, selectedCurve);
    }

    return filtered;
  }

  /**
   * Determines if an ingredient is a meat product for vegetarian filtering
   */
  private static isMeatProduct<T extends AirNomadIngredient>(ingredient: T): boolean {
    const meatKeywords = ['meat', 'fish', 'chicken', 'beef', 'pork', 'lamb', 'seafood', 'egg'];
    const ingredientName = ingredient.name.toLowerCase();
    
    return meatKeywords.some(keyword => ingredientName.includes(keyword));
  }

  /**
   * Applies cultural weight bias to ingredient selection
   * Enhances probability of selecting culturally appropriate ingredients
   */
  static applyCulturalWeightBias<T extends AirNomadIngredient>(
    ingredients: T[], 
    biasMultiplier: number
  ): T[] {
    if (biasMultiplier <= 1.0) {
      return ingredients;
    }

    const biasedPool: T[] = [...ingredients];
    
    // Add extra copies of high cultural weight ingredients
    ingredients.forEach(ingredient => {
      if (ingredient.culturalWeight >= 7.0) {
        const extraCopies = Math.floor(biasMultiplier);
        for (let i = 0; i < extraCopies; i++) {
          biasedPool.push(ingredient);
        }
      }
    });

    return biasedPool;
  }

  /**
   * ENHANCED: Validates ingredient constraints with rarity curve awareness
   */
  static validateIngredientConstraints<T extends AirNomadIngredient>(
    ingredient: T,
    currentSelection: T[],
    rules: DishCompositionRules,
    allowLegendaryIngredients: boolean,
    respectRarityCurve: boolean = false
  ): boolean {
    // Basic role constraint validation
    const currentRoleCount = currentSelection.filter(ing => ing.role === ingredient.role).length;
    const maxForRole = rules.maxIngredientsPerRole[ingredient.role] || 0;
    
    if (currentRoleCount >= maxForRole) {
      return false;
    }

    // Sacred ingredient limits
    if (ingredient.isSacred) {
      const currentSacredCount = currentSelection.filter(ing => ing.isSacred).length;
      if (currentSacredCount >= rules.sacredIngredientLimits.regular) {
        return false;
      }
    }

    // Legendary ingredient limits
    if (ingredient.rarity === 'legendary') {
      if (!allowLegendaryIngredients) {
        return false;
      }
      
      const currentLegendaryCount = currentSelection.filter(ing => ing.rarity === 'legendary').length;
      if (currentLegendaryCount >= rules.legendaryIngredientLimits.regular) {
        return false;
      }
    }

    // Rarity curve constraints (if enabled)
    if (respectRarityCurve && rules.rarityDistribution) {
      const rarityWeight = rules.rarityDistribution[ingredient.rarity];
      if (rarityWeight === 0) {
        return false; // This rarity is not allowed in the current curve
      }
    }

    return true;
  }
}

export class DishCompositionValidator {
  /**
   * Validates complete dish composition against rules
   */
  static validateComposition<T extends AirNomadIngredient>(
    ingredients: T[],
    rules: DishCompositionRules,
    dishName: string = 'dish'
  ): void {
    const analysis = this.analyzeComposition(ingredients, rules);
    
    if (!analysis.isValid) {
      const violations = analysis.violations.join('; ');
      throw new Error(`Invalid dish composition for "${dishName}": ${violations}`);
    }
  }

  /**
   * ENHANCED: Analyzes composition with rarity curve awareness
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
    rarityDistribution: Record<IngredientRarity, number>;
    violations: string[];
  } {
    const violations: string[] = [];
    const roleDistribution: Record<IngredientRole, number> = {} as Record<IngredientRole, number>;
    const rarityDistribution: Record<IngredientRarity, number> = {
      common: 0,
      uncommon: 0,
      rare: 0,
      legendary: 0
    };

    // Initialize role counts
    const allRoles: IngredientRole[] = ['main', 'vegetable', 'seasoning', 'sauce', 'garnish', 'base', 'protein', 'spice', 'fruit', 'liquid'];
    allRoles.forEach(role => {
      roleDistribution[role] = 0;
    });

    // Count ingredients by role and rarity
    ingredients.forEach(ingredient => {
      roleDistribution[ingredient.role]++;
      rarityDistribution[ingredient.rarity]++;
    });

    // Validate required roles
    rules.requiredRoles.forEach(role => {
      if (roleDistribution[role] === 0) {
        violations.push(`Missing required role: ${role}`);
      }
    });

    // Validate role limits
    Object.entries(rules.maxIngredientsPerRole).forEach(([role, maxCount]) => {
      const currentCount = roleDistribution[role as IngredientRole];
      if (currentCount > maxCount) {
        violations.push(`Too many ${role} ingredients: ${currentCount} > ${maxCount}`);
      }
    });

    // Calculate metrics
    const culturalWeightSum = ingredients.reduce((sum, ing) => sum + ing.culturalWeight, 0);
    const culturalWeightAverage = ingredients.length > 0 ? culturalWeightSum / ingredients.length : 0;
    const sacredCount = ingredients.filter(ing => ing.isSacred).length;
    const legendaryCount = ingredients.filter(ing => ing.rarity === 'legendary').length;

    // Validate cultural weight threshold
    if (culturalWeightAverage < rules.culturalWeightThreshold) {
      violations.push(`Cultural weight too low: ${culturalWeightAverage.toFixed(1)} < ${rules.culturalWeightThreshold}`);
    }

    // Validate sacred limits
    if (sacredCount > rules.sacredIngredientLimits.regular) {
      violations.push(`Too many sacred ingredients: ${sacredCount} > ${rules.sacredIngredientLimits.regular}`);
    }

    // Validate legendary limits
    if (legendaryCount > rules.legendaryIngredientLimits.regular) {
      violations.push(`Too many legendary ingredients: ${legendaryCount} > ${rules.legendaryIngredientLimits.regular}`);
    }

    return {
      isValid: violations.length === 0,
      roleDistribution,
      culturalWeightAverage,
      sacredCount,
      legendaryCount,
      rarityDistribution,
      violations
    };
  }
} 