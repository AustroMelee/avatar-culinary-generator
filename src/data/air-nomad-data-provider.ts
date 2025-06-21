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
 * Creates emoji mappings for Air Nomad ingredients with specific matches and category labels
 * Maps ingredient names to emoji + category format for better organization
 * 
 * @param ingredients - Array of Air Nomad ingredients to map
 * @returns Record mapping ingredient names to emoji + category strings
 */
function createIngredientEmojiMappings(ingredients: AirNomadIngredient[]): Record<string, string> {
  // Meticulously crafted specific ingredient emoji mappings based on EXACT matches
  const specificMappings: Record<string, { emoji: string; category: string }> = {
    // === GRAINS & FLOURS ===
    'Basmati Rice': { emoji: '🍚', category: 'GRAIN' },
    'Flour': { emoji: '🌾', category: 'GRAIN' },
    'Glutinous Rice': { emoji: '🍚', category: 'GRAIN' },
    'Noodles': { emoji: '🍜', category: 'GRAIN' },
    'Pastry': { emoji: '🥐', category: 'GRAIN' },
    'Rice': { emoji: '🍚', category: 'GRAIN' },
    'Rice Flour': { emoji: '🌾', category: 'GRAIN' },
    'Roasted Barley Flour': { emoji: '🌾', category: 'GRAIN' },
    
    // === VEGETABLES ===
    'Bamboo Shoots': { emoji: '🎋', category: 'VEGETABLE' },
    'Bean Sprouts': { emoji: '🌱', category: 'VEGETABLE' },
    'Bell Peppers': { emoji: '🫑', category: 'VEGETABLE' },
    'Cabbage': { emoji: '🥬', category: 'VEGETABLE' },
    'Carrot': { emoji: '🥕', category: 'VEGETABLE' },
    'Chayote': { emoji: '🥒', category: 'VEGETABLE' },
    'Chrysanthemum Greens': { emoji: '🌼', category: 'VEGETABLE' },
    'Fiddlehead Ferns': { emoji: '🌿', category: 'VEGETABLE' },
    'Lotus Root': { emoji: '🪷', category: 'VEGETABLE' },
    'Onion': { emoji: '🧅', category: 'VEGETABLE' },
    'Oyster Mushroom': { emoji: '🍄', category: 'MUSHROOM' },
    'Pickles': { emoji: '🥒', category: 'PRESERVED' },
    'Potato': { emoji: '🥔', category: 'VEGETABLE' },
    'Red Cabbage': { emoji: '🥬', category: 'VEGETABLE' },
    'Scallions': { emoji: '🧅', category: 'HERB' },
    'Seaweed': { emoji: '🌊', category: 'SEA VEGETABLE' },
    'Shiitake': { emoji: '🍄', category: 'MUSHROOM' },
    'Snow Lotus Petals': { emoji: '🪷', category: 'SACRED FLOWER' },
    'Taro': { emoji: '🥔', category: 'ROOT VEGETABLE' },
    'Tomato': { emoji: '🍅', category: 'VEGETABLE' },
    'Water Chestnuts': { emoji: '🌰', category: 'AQUATIC VEGETABLE' },
    'Yam': { emoji: '🍠', category: 'ROOT VEGETABLE' },
    
    // === PROTEINS ===
    'Almonds': { emoji: '🌰', category: 'NUT' },
    'Azuki Beans': { emoji: '🫘', category: 'LEGUME' },
    'Cashews': { emoji: '🌰', category: 'NUT' },
    'Coconut': { emoji: '🥥', category: 'TROPICAL FRUIT' },
    'Egg Whites': { emoji: '🥚', category: 'PROTEIN' },
    'Eggs': { emoji: '🥚', category: 'PROTEIN' },
    'Jackfruit': { emoji: '🥭', category: 'TROPICAL FRUIT' },
    'Lychee Nuts': { emoji: '🌰', category: 'EXOTIC NUT' },
    'Mung Beans': { emoji: '🫘', category: 'LEGUME' },
    'Pine Nuts': { emoji: '🌰', category: 'TREE NUT' },
    'Silken Tofu': { emoji: '🟦', category: 'SOY PROTEIN' },
    'Tofu': { emoji: '🟫', category: 'SOY PROTEIN' },
    
    // === FRUITS ===
    'Apple': { emoji: '🍎', category: 'FRUIT' },
    'Banana': { emoji: '🍌', category: 'FRUIT' },
    'Cloudberries': { emoji: '☁️', category: 'SACRED BERRY' },
    'Dried Apricots': { emoji: '🍑', category: 'DRIED FRUIT' },
    'Goji Berries': { emoji: '🫐', category: 'SUPERFRUIT' },
    'Longan Fruit': { emoji: '🌰', category: 'EXOTIC FRUIT' },
    'Moon Peaches': { emoji: '🌙', category: 'SACRED FRUIT' },
    'Raisins': { emoji: '🍇', category: 'DRIED FRUIT' },
    
    // === SEASONINGS & AROMATICS ===
    'Butter': { emoji: '🧈', category: 'DAIRY' },
    'Crystal Cave Minerals': { emoji: '💎', category: 'SACRED MINERAL' },
    'Fruit Extracts': { emoji: '🧪', category: 'EXTRACT' },
    'Ginger': { emoji: '🫚', category: 'SPICE ROOT' },
    'Himalayan Salt': { emoji: '🧂', category: 'MINERAL SALT' },
    'Jasmine Blossoms': { emoji: '🌸', category: 'SACRED FLOWER' },
    'Lemon Zest': { emoji: '🍋', category: 'CITRUS PEEL' },
    'Lemongrass': { emoji: '🌿', category: 'AROMATIC HERB' },
    'Milk Powder': { emoji: '🥛', category: 'DAIRY POWDER' },
    'Plum Filling': { emoji: '🟣', category: 'FRUIT FILLING' },
    'Red Bean Paste': { emoji: '🫘', category: 'BEAN PASTE' },
    'Rock Sugar': { emoji: '🍯', category: 'CRYSTAL SWEETENER' },
    'Sacred Lotus Root': { emoji: '🪷', category: 'SACRED ROOT' },
    'Salt': { emoji: '🧂', category: 'BASIC SEASONING' },
    'Soy Sauce': { emoji: '🫗', category: 'FERMENTED SAUCE' },
    'Sugar': { emoji: '🟫', category: 'SWEETENER' },
    'Sweet Fillings': { emoji: '🍯', category: 'SWEET PASTE' },
    'Tea Leaves': { emoji: '🍃', category: 'TEA HERB' },
    'Toasted Sesame Seeds': { emoji: '🌰', category: 'TOASTED SEED' },
    'Wild Honey': { emoji: '🍯', category: 'WILD SWEETENER' },
    'Wind Flower Nectar': { emoji: '🌸', category: 'SACRED NECTAR' },
    
    // === LIQUIDS ===
    'Butter Tea': { emoji: '🍵', category: 'TRADITIONAL TEA' },
    'Cream': { emoji: '🥛', category: 'DAIRY LIQUID' },
    'Creamy Sauce': { emoji: '🥛', category: 'SAUCE' },
    'Milk': { emoji: '🥛', category: 'DAIRY' },
    'Sky Bison Milk': { emoji: '☁️', category: 'SACRED DAIRY' },
    'Soy Milk': { emoji: '🥛', category: 'PLANT MILK' },
    'Vegetable Broth': { emoji: '🍲', category: 'BROTH' },
    'Yak Milk': { emoji: '🥛', category: 'MOUNTAIN DAIRY' }
  };
  
  const mappings: Record<string, string> = {};
  
  // Category emoji mappings for non-specific ingredients
  const categoryMappings: Record<string, { emoji: string; category: string }> = {
    'grain': { emoji: '🌾', category: 'GRAIN' },
    'vegetable': { emoji: '🥬', category: 'VEGETABLE' },
    'fruit': { emoji: '🍎', category: 'FRUIT' },
    'protein': { emoji: '🥜', category: 'PROTEIN' },
    'seasoning': { emoji: '🧂', category: 'SEASONING' },
    'liquid': { emoji: '💧', category: 'LIQUID' }
  };
  
  for (const ingredient of ingredients) {
    // Check for exact specific match first
    if (specificMappings[ingredient.name]) {
      const mapping = specificMappings[ingredient.name];
      mappings[ingredient.name] = `${mapping.emoji}`;
      continue;
    }
    
    // Try semantic search in emoji pool for exact match
    const emojiMatches = searchEmojis(ingredient.name);
    if (emojiMatches.length > 0) {
      const categoryInfo = categoryMappings[ingredient.category] || { emoji: '🌿', category: 'INGREDIENT' };
      mappings[ingredient.name] = `${emojiMatches[0].char}`;
      continue;
    }
    
    // Use category-based mapping as final fallback
    const categoryInfo = categoryMappings[ingredient.category] || { emoji: '🌿', category: 'INGREDIENT' };
    mappings[ingredient.name] = `${categoryInfo.emoji}`;
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