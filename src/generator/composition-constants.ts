import type { DishType, IngredientRole, IngredientRarity } from '../types.js';

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
      fruit: 1,
      liquid: 1,
      garnish: 1
    }
  },
  
  side_dish: {
    requiredRoles: ['vegetable', 'seasoning'] as IngredientRole[],
    optionalRoles: ['garnish', 'fruit'] as IngredientRole[],
    maxIngredientsPerRole: {
      main: 0,
      vegetable: 2,
      seasoning: 1,
      fruit: 1,
      liquid: 1,
      garnish: 1
    }
  },
  
  dessert: {
    requiredRoles: ['fruit', 'seasoning'] as IngredientRole[],
    optionalRoles: ['garnish', 'liquid'] as IngredientRole[],
    maxIngredientsPerRole: {
      main: 1,
      vegetable: 0,
      seasoning: 2,
      fruit: 2,
      liquid: 1,
      garnish: 1
    }
  },
  
  beverage: {
    requiredRoles: ['liquid' as IngredientRole],
    optionalRoles: ['seasoning' as IngredientRole, 'fruit' as IngredientRole, 'garnish' as IngredientRole],
    maxIngredientsPerRole: {
      main: 0,
      vegetable: 0,
      seasoning: 2,
      fruit: 1,
      liquid: 1,
      garnish: 1
    }
  },
  
  ceremonial_offering: {
    requiredRoles: ['main', 'seasoning'] as IngredientRole[],
    optionalRoles: ['vegetable', 'fruit', 'garnish', 'liquid'] as IngredientRole[],
    maxIngredientsPerRole: {
      main: 1,
      vegetable: 2,
      seasoning: 2,
      fruit: 2,
      liquid: 1,
      garnish: 2
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
 * RARITY CURVES - Dynamic rarity distribution patterns
 * Provides variety in ingredient rarity selection for different dish types
 * Format: [common_weight, uncommon_weight, rare_weight, legendary_weight]
 */
export const RARITY_CURVES = [
  [3, 1, 0, 0], // Common-heavy: everyday dishes
  [2, 2, 0, 0], // Balanced common/uncommon
  [1, 2, 1, 0], // Uncommon-focused: special occasions
  [1, 1, 1, 1], // Equal distribution: ceremonial
  [2, 1, 1, 0], // Moderate variety
  [4, 0, 0, 0], // Pure common: simple meals
] as const;

/**
 * TECHNIQUE EXPANSION - Extended cooking technique pool
 * Includes traditional Air Nomad techniques plus new variants for variety
 */
export const TECHNIQUE_IDS = [
  // Existing traditional techniques
  'steam-whipped',
  'whisper-steaming', 
  'wind-drying',
  'float-boiling',
  'meditation-brewing',
  'sky-roasting',
  
  // New technique variants for expanded variety
  'wind-roasted',
  'cloud-fermented',
  'sun-basked',
  'mist-infused',
  'temple-smoked',
  'prayer-blessed',
  'mountain-cured',
  'spirit-touched',
  'dawn-dried',
  'moonlight-steeped',
  'breeze-chilled',
  'storm-charged'
] as const;

/**
 * LORE INTENSITY LEVELS - Controls depth of cultural lore in descriptions
 * Allows fine-tuning of prose complexity and cultural depth
 */
export const LORE_INTENSITY_LEVELS = {
  light: {
    maxWords: 15,
    useMythicElements: false,
    festivalFrequency: 0.1,
    spiritualDepth: 'basic'
  },
  moderate: {
    maxWords: 25,
    useMythicElements: true,
    festivalFrequency: 0.3,
    spiritualDepth: 'moderate'
  },
  deep: {
    maxWords: 50,
    useMythicElements: true,
    festivalFrequency: 0.5,
    spiritualDepth: 'profound'
  }
} as const; 