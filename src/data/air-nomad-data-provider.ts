import type { 
  AirNomadIngredient,
  AirNomadCookingTechnique,
  GeneratedAirNomadDish,
  DishType 
} from '../types.js';
import type { GeneratorConfig } from '../types/core-interfaces.js';
import { airNomadIngredients, getHighCulturalWeightIngredients } from './air-nomad/ingredients.js';
import { airNomadTechniques, getAuthenticMainDishTechniques } from './air-nomad/techniques.js';
import { 
  DishCompositionRuleFactory, 
  IngredientFilterUtils, 
  UNIVERSAL_COMPOSITION_CONSTANTS,
  NATION_CULINARY_PROFILES 
} from '../generator/dish-composition-rules.js';
import { searchEmojis, getRandomNationEmoji } from '../data/emoji/emoji-pool.js';

/**
 * AIR NOMAD DATA PROVIDER
 * 
 * Pure data provider for Air Nomad dish generation.
 * Contains ZERO generation logic - only data, templates, and rules.
 * Used by the sovereign SovereignDishGenerator to create Air Nomad dishes.
 * 
 * ARCHITECTURAL PRINCIPLE: Data Layer Separation
 * - This module provides ONLY configuration data
 * - Zero dish generation logic
 * - Pure functions that return data structures
 */

/**
 * Creates complete Air Nomad configuration for the sovereign generator
 * All Air Nomad-specific data, rules, and templates in one place
 * 
 * @param dishType - Type of dish to configure
 * @param allowLegendaryIngredients - Whether to allow legendary ingredients
 * @returns Complete configuration object for SovereignDishGenerator
 */
export function createAirNomadConfiguration(
  dishType: DishType = 'main_course', 
  allowLegendaryIngredients: boolean = false
): GeneratorConfig<AirNomadIngredient, AirNomadCookingTechnique> {
  
  // Filter ingredients and techniques for cultural authenticity
  const authenticIngredients = filterCulturallyAuthenticIngredients(dishType);
  const authenticTechniques = filterCulturallyAuthenticTechniques(dishType);
  
  // Create dish-specific composition rules
  const compositionRules = DishCompositionRuleFactory.createAirNomadRules(dishType);
  
  // Get ingredient counts from universal constants
  const ingredientCount = UNIVERSAL_COMPOSITION_CONSTANTS.INGREDIENT_COUNTS[dishType];
  
  // Get cultural bias from Air Nomad profile
  const airNomadProfile = NATION_CULINARY_PROFILES.air_nomads;
  
  return {
    // Core data
    ingredients: authenticIngredients,
    techniques: authenticTechniques,
    
    // Generation parameters
    dishType,
    compositionRules,
    ingredientCount,
    rarityDistribution: {
      common: 0.5,
      uncommon: 0.35,
      rare: 0.12,
      legendary: 0.03
    },
    allowLegendaryIngredients,
    culturalWeightBias: airNomadProfile.culturalWeightBias,
    
    // Air Nomad-specific dietary rules
    dietaryRules: {
      enforceVegetarian: true,
      prohibitedIngredients: [
        'eggs', 'egg whites', 'butter', 'milk', 'cream', 'creamy sauce', 'milk powder',
        'honey', 'beeswax', 'gelatin', 'fish sauce', 'oyster sauce'
      ],
      culturalTaboos: ['meat', 'fish', 'poultry', 'any animal products']
    },
    
    // Air Nomad-specific cleanup rules
    cleanupRules: {
      culturalAdjustments: [
        { pattern: /\bthrough\s+used\s+for\b/gi, replacement: 'used for' },
        { pattern: /\bthrough\s+traditionally\b/gi, replacement: 'traditionally' },
        { pattern: /\bdisplayspirit-realm\b/gi, replacement: 'displays spirit-realm' },
        { pattern: /Crystal Cave Mineral/g, replacement: 'Crystal Cave Minerals' },
        { pattern: /Sky Bison Milk/g, replacement: 'Sky Bison\'s Milk' }
      ]
    },
    
    // Air Nomad-specific metadata rules
    metadataRules: {
      spiritualBenefits: [
        { condition: 'meditation_ingredients', benefit: 'enhances_meditation_focus' },
        { condition: 'sacred_ingredients', benefit: 'promotes_inner_peace' },
        { condition: 'ceremonial_techniques', benefit: 'stimulates_chakra_alignment' }
      ]
    },
    
    // Emoji enhancement configuration
    emojiConfig: {
      nationId: 'air-nomads',
      enableIngredientEmojis: true,
      enableDishNameEmojis: true,
      enableCulturalEmojis: true,
      fallbackEmojis: {
        ingredient: '🌿', // Herb emoji for ingredients
        dish: '🍜',       // Bowl emoji for dishes
        cultural: '🧘'    // Meditation emoji for cultural context
      }
    },
    
    // Ingredient emoji mappings
    ingredientEmojiMappings: createIngredientEmojiMappings(authenticIngredients)
  };
}

/**
 * Filters ingredients using centralized filtering utilities
 * Leverages universal filtering logic for consistency across nations
 * 
 * @param dishType - Type of dish being created
 * @returns Culturally filtered Air Nomad ingredients
 */
function filterCulturallyAuthenticIngredients(dishType: DishType): AirNomadIngredient[] {
  // Use centralized filtering utility
  let filteredIngredients = IngredientFilterUtils.filterByNationProfile(
    airNomadIngredients, 
    'air_nomads'
  );

  // For ceremonial offerings, enhance with sacred ingredients
  if (dishType === 'ceremonial_offering') {
    const sacredIngredients = filteredIngredients.filter(ingredient => ingredient.isSacred);
    const highCulturalIngredients = getHighCulturalWeightIngredients(8, true);
    
    // Combine sacred and high cultural weight ingredients, removing duplicates
    const ceremonialPool = [...sacredIngredients];
    for (const ingredient of highCulturalIngredients) {
      if (!ceremonialPool.some(existing => existing.name === ingredient.name)) {
        ceremonialPool.push(ingredient);
      }
    }
    filteredIngredients = ceremonialPool;
  }

  return filteredIngredients;
}

/**
 * Filters techniques for dish type compatibility and cultural significance
 * Ensures only authentic Air Nomad cooking methods are used
 * 
 * @param dishType - Type of dish being created
 * @returns Culturally filtered Air Nomad techniques
 */
function filterCulturallyAuthenticTechniques(dishType: DishType): AirNomadCookingTechnique[] {
  // Filter techniques suitable for the dish type
  const suitableTechniques = airNomadTechniques.filter(technique => 
    technique.suitableForDishTypes.includes(dishType)
  );

  // For main courses, prioritize high cultural significance techniques
  if (dishType === 'main_course') {
    return getAuthenticMainDishTechniques(7); // High cultural significance threshold
  }

  // For ceremonial offerings, include all ceremonial techniques
  if (dishType === 'ceremonial_offering') {
    return suitableTechniques.filter(technique => 
      technique.category === 'ceremonial' || technique.culturalSignificance >= 8
    );
  }

  // For other dish types, use standard filtering
  return suitableTechniques.filter(technique => technique.culturalSignificance >= 6);
}

/**
 * Creates emoji mappings for Air Nomad ingredients
 * Maps ingredient names to appropriate emojis for visual enhancement
 * 
 * @param ingredients - Array of Air Nomad ingredients to map
 * @returns Record mapping ingredient names to emoji characters
 */
function createIngredientEmojiMappings(ingredients: AirNomadIngredient[]): Record<string, string> {
  const mappings: Record<string, string> = {};
  
  for (const ingredient of ingredients) {
    const ingredientName = ingredient.name.toLowerCase();
    
    // Try to find appropriate emoji based on ingredient name
    const emojiMatches = searchEmojis(ingredientName);
    if (emojiMatches.length > 0) {
      mappings[ingredient.name] = emojiMatches[0].char;
    } else {
      // Fallback mappings for common Air Nomad ingredients
      if (ingredientName.includes('fruit') || ingredientName.includes('apple') || ingredientName.includes('pear')) {
        mappings[ingredient.name] = '🍎';
      } else if (ingredientName.includes('vegetable') || ingredientName.includes('carrot') || ingredientName.includes('root')) {
        mappings[ingredient.name] = '🥕';
      } else if (ingredientName.includes('herb') || ingredientName.includes('leaf') || ingredientName.includes('basil')) {
        mappings[ingredient.name] = '🌿';
      } else if (ingredientName.includes('mushroom') || ingredientName.includes('fungus')) {
        mappings[ingredient.name] = '🍄';
      } else if (ingredientName.includes('grain') || ingredientName.includes('rice') || ingredientName.includes('wheat')) {
        mappings[ingredient.name] = '🌾';
      } else if (ingredientName.includes('tea') || ingredientName.includes('drink')) {
        mappings[ingredient.name] = '🍵';
      } else if (ingredientName.includes('flower') || ingredientName.includes('blossom')) {
        mappings[ingredient.name] = '🌸';
      } else if (ingredientName.includes('seed') || ingredientName.includes('nut')) {
        mappings[ingredient.name] = '🌰';
      } else {
        // Default fallback for Air Nomad ingredients
        mappings[ingredient.name] = '🌿'; // Herb emoji as general fallback
      }
    }
  }
  
  return mappings;
}

/**
 * AIR NOMAD DATA FACTORY
 * Convenience factory methods for common dish types
 * Pure data providers - zero generation logic
 */
export const AirNomadDataProvider = {
  /**
   * Creates configuration for an authentic Air Nomad main course
   */
  forMainCourse: (allowLegendaryIngredients: boolean = false) => 
    createAirNomadConfiguration('main_course', allowLegendaryIngredients),
  
  /**
   * Creates configuration for a traditional Air Nomad side dish
   */
  forSideDish: (allowLegendaryIngredients: boolean = false) => 
    createAirNomadConfiguration('side_dish', allowLegendaryIngredients),
  
  /**
   * Creates configuration for a sacred ceremonial offering
   */
  forCeremonialOffering: (allowLegendaryIngredients: boolean = true) => 
    createAirNomadConfiguration('ceremonial_offering', allowLegendaryIngredients)
};

// Export alias for backward compatibility during transition
export { createAirNomadConfiguration as createAirNomadConfig };
export { AirNomadDataProvider as AirNomadConfigs }; 