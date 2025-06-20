import type { 
  AirNomadIngredient, 
  AirNomadCookingTechnique
} from '../types.js';
import {
  selectWithAntiClustering
} from '../data/grammar/weighted-selection.js';
import {
  getLegendaryIngredientContext
} from '../data/air-nomad/lore-system.js';

/**
 * Composes authentic Air Nomad dish names with cultural titles and ingredient integration
 * Handles legendary ingredients with special naming conventions
 */
export function composeDishName(
  ingredients: AirNomadIngredient[], 
  technique: AirNomadCookingTechnique
): string {
  const ingredientNames = ingredients.map(ing => ing.name);
  const legendaryContext = findLegendaryIngredient(ingredientNames);
  
  // Cultural titles based on ingredient rarity and sacred status
  const culturalTitle = selectCulturalTitle(ingredients, legendaryContext);
  
  // Main ingredient and technique integration
  const mainIngredient = ingredientNames[0];
  const secondaryIngredient = ingredientNames.length > 1 ? ingredientNames[1] : null;
  
  // Special naming for legendary ingredients
  if (legendaryContext) {
    return composeLegendaryName(culturalTitle, mainIngredient, technique, legendaryContext);
  }
  
  // Standard naming patterns
  return composeStandardName(culturalTitle, mainIngredient, secondaryIngredient, technique);
}

/**
 * Finds legendary ingredient context for special naming
 */
function findLegendaryIngredient(ingredientNames: string[]): any {
  for (const ingredientName of ingredientNames) {
    const context = getLegendaryIngredientContext(ingredientName);
    if (context) {
      return context;
    }
  }
  return null;
}

/**
 * Selects cultural title based on ingredient rarity and sacred significance
 */
function selectCulturalTitle(ingredients: AirNomadIngredient[], legendaryContext: any): string {
  const hasLegendary = !!legendaryContext;
  const hasSacred = ingredients.some(ing => ing.isSacred);
  const maxRarity = Math.max(...ingredients.map(ing => 
    ing.rarity === 'legendary' ? 4 : ing.rarity === 'rare' ? 3 : ing.rarity === 'uncommon' ? 2 : 1
  ));
  
  if (hasLegendary) {
    const legendaryTitles = [
      "Avatar's", "Ancient Master's", "Sky Father's", "Temple Guardian's", 
      "Eternal Monk's", "Sacred Elder's", "Celestial Master's"
    ];
    return selectWithAntiClustering(legendaryTitles);
  }
  
  if (hasSacred || maxRarity >= 3) {
    const sacredTitles = [
      "Temple Elder's", "Master's", "Guru's", "High Monk's", 
      "Sacred", "Blessed", "Enlightened"
    ];
    return selectWithAntiClustering(sacredTitles);
  }
  
  if (maxRarity >= 2) {
    const uncommonTitles = [
      "Cloud Dancer's", "Wind Walker's", "Mountain Sage's", "Temple Cook's",
      "Traveling Monk's", "Sky Nomad's", "Meditation Master's"
    ];
    return selectWithAntiClustering(uncommonTitles);
  }
  
  // Common ingredient titles
  const commonTitles = [
    "Novice's", "Student's", "Young Monk's", "Temple", "Simple", 
    "Humble", "Daily", "Community"
  ];
  return selectWithAntiClustering(commonTitles);
}

/**
 * Composes names for dishes with legendary ingredients
 */
function composeLegendaryName(
  culturalTitle: string, 
  mainIngredient: string, 
  technique: AirNomadCookingTechnique,
  legendaryContext: any
): string {
  const techniqueDescriptor = getTechniqueDescriptor(technique);
  
  // Legendary naming patterns emphasize the mystical ingredient
  const legendaryIngredientName = (legendaryContext as any)?.ingredient || mainIngredient;
  const legendaryPatterns = [
    `${culturalTitle} ${legendaryIngredientName} ${techniqueDescriptor}`,
    `${culturalTitle} Transcendent ${techniqueDescriptor} ${mainIngredient}`,
    `${culturalTitle} Sacred ${legendaryIngredientName} Preparation`,
    `${culturalTitle} Celestial ${techniqueDescriptor} with ${legendaryIngredientName}`
  ];
  
  return selectWithAntiClustering(legendaryPatterns);
}

/**
 * Composes standard dish names with varied patterns
 */
function composeStandardName(
  culturalTitle: string, 
  mainIngredient: string, 
  secondaryIngredient: string | null,
  technique: AirNomadCookingTechnique
): string {
  const techniqueDescriptor = getTechniqueDescriptor(technique);
  
  // Multiple naming patterns for variety
  const namingPatterns = [
    // Single ingredient focus
    `${culturalTitle} ${techniqueDescriptor} ${mainIngredient}`,
    `${culturalTitle} ${mainIngredient} ${techniqueDescriptor}`,
    
    // Dual ingredient when available
    ...(secondaryIngredient ? [
      `${culturalTitle} ${techniqueDescriptor} ${mainIngredient} and ${secondaryIngredient}`,
      `${culturalTitle} ${mainIngredient} with ${secondaryIngredient}`,
      `${culturalTitle} Balanced ${techniqueDescriptor} ${mainIngredient}`
    ] : []),
    
    // Technique-focused
    `${culturalTitle} ${techniqueDescriptor} Creation`,
    `${culturalTitle} ${getTechniqueAdjective(technique)} ${mainIngredient}`
  ];
  
  return selectWithAntiClustering(namingPatterns);
}

/**
 * Gets descriptive name for cooking technique
 */
function getTechniqueDescriptor(technique: AirNomadCookingTechnique): string {
  const techniqueDescriptors: Record<string, string[]> = {
    'Steam-Whipping': ['Steam-Whipped', 'Cloud-Whipped', 'Mist-Whipped'],
    'Whisper-Steaming': ['Whisper-Steamed', 'Gentle-Steamed', 'Breath-Steamed'],
    'Wind-Drying': ['Wind-Dried', 'Air-Dried', 'Breeze-Dried'],
    'Float-Boiling': ['Float-Boiled', 'Levitating', 'Floating'],
    'Meditation Brewing': ['Meditation-Brewed', 'Contemplative', 'Mindful'],
    'Sky-Roasting': ['Sky-Roasted', 'Cloud-Roasted', 'Wind-Roasted']
  };
  
  const descriptors = techniqueDescriptors[technique.name] || [technique.name];
  return selectWithAntiClustering(descriptors);
}

/**
 * Gets adjective form of cooking technique
 */
function getTechniqueAdjective(technique: AirNomadCookingTechnique): string {
  const techniqueAdjectives: Record<string, string[]> = {
    'Steam-Whipping': ['Ethereal', 'Floating', 'Elevated'],
    'Whisper-Steaming': ['Gentle', 'Soft', 'Pure'],
    'Wind-Drying': ['Preserved', 'Concentrated', 'Essential'],
    'Float-Boiling': ['Levitated', 'Suspended', 'Weightless'],
    'Meditation Brewing': ['Contemplative', 'Peaceful', 'Centered'],
    'Sky-Roasting': ['Elevated', 'Ascending', 'Lifted']
  };
  
  const adjectives = techniqueAdjectives[technique.name] || ['Sacred'];
  return selectWithAntiClustering(adjectives);
} 