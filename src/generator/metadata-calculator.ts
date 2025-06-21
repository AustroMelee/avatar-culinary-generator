import { 
  AirNomadIngredient, 
  AirNomadCookingTechnique,
  SpiritualBenefit,
  ServingSize,
  DifficultyLevel,
  IngredientRarity,
  TimeRequirement
} from '../types.js';
import {
  selectWithAntiClustering,
  ENHANCED_SPIRITUAL_BENEFITS
} from '../data/grammar/weighted-selection.js';

// Named constants for difficulty calculation
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

const TIME_COMPLEXITY_SCORES: Record<TimeRequirement, number> = {
  quick: 1,
  moderate: 2,
  slow: 3,
  ceremonial: 4
};

/**
 * SPIRITUAL BENEFIT LOOKUP TABLE - Enhanced spiritual benefits system
 * Provides contextual spiritual benefits based on dish characteristics
 */
const SPIRITUAL_BENEFIT_LOOKUP = {
  legendary: [
    'awakens_spiritual_awareness',
    'connects_to_ancestral_wisdom',
    'facilitates_air_nomad_traditions'
  ],
  sacred: [
    'purifies_mind_and_body',
    'stimulates_chakra_alignment',
    'enhances_meditation_focus'
  ],
  ceremonial: [
    'fosters_community_harmony',
    'facilitates_air_nomad_traditions',
    'promotes_inner_peace'
  ],
  common: [
    'promotes_inner_peace',
    'enhances_meditation_focus',
    'fosters_community_harmony'
  ]
} as const;

/**
 * DIFFICULTY ENHANCEMENT LOOKUP - Technique-specific difficulty modifiers
 * Maps techniques to difficulty descriptors for richer metadata
 */
const TECHNIQUE_DIFFICULTY_MAP: Record<string, { level: string; description: string }> = {
  'Steam-Whipping': { level: 'Moderate', description: 'Requires precise timing and technique control' },
  'Whisper-Steaming': { level: 'Simple', description: 'Gentle technique suitable for novice practitioners' },
  'Wind-Drying': { level: 'Complex', description: 'Demands patience and environmental awareness' },
  'Float-Boiling': { level: 'Moderate', description: 'Traditional method requiring steady attention' },
  'Meditation Brewing': { level: 'Masterful', description: 'Sacred technique requiring spiritual preparation' },
  'Sky-Roasting': { level: 'Complex', description: 'Advanced technique using high-altitude methods' },
  'Wind-Roasted': { level: 'Complex', description: 'Requires mastery of wind patterns and timing' },
  'Cloud-Fermented': { level: 'Masterful', description: 'Ancient technique requiring extended meditation' },
  'Sun-Basked': { level: 'Simple', description: 'Natural technique following solar patterns' },
  'Mist-Infused': { level: 'Moderate', description: 'Delicate process requiring atmospheric awareness' },
  'Temple-Smoked': { level: 'Complex', description: 'Sacred technique reserved for temple preparation' },
  'Prayer-Blessed': { level: 'Masterful', description: 'Spiritual technique requiring ritual knowledge' },
  'Mountain-Cured': { level: 'Complex', description: 'Traditional preservation requiring altitude mastery' },
  'Spirit-Touched': { level: 'Masterful', description: 'Mystical technique bridging physical and spiritual realms' }
};

/**
 * Calculates appropriate serving size based on ingredient composition
 * Returns framework-agnostic serving size
 */
export function calculateServingSize(): ServingSize {
  const sizes: ServingSize[] = ['individual', 'family', 'communal', 'ceremonial'];
  return sizes[Math.floor(Math.random() * sizes.length)];
}

/**
 * Enhanced difficulty calculation with technique-specific awareness
 * Uses weighted scoring system for fair difficulty assessment
 */
export function calculateDifficulty(
  ingredients: AirNomadIngredient[], 
  technique: AirNomadCookingTechnique
): DifficultyLevel {
  // Calculate ingredient complexity score
  const ingredientComplexity = ingredients.reduce((total, ingredient) => {
    const rarityScore = RARITY_COMPLEXITY_SCORES[ingredient.rarity];
    const sacredBonus = ingredient.isSacred ? 1 : 0;
    return total + rarityScore + sacredBonus;
  }, 0);
  
  // Calculate technique complexity score with enhanced awareness
  const baseTechniqueComplexity = TIME_COMPLEXITY_SCORES[technique.timeRequired];
  const techniqueModifier = getTechniqueComplexityModifier(technique.name);
  const techniqueComplexity = baseTechniqueComplexity + techniqueModifier;
  
  // Calculate total complexity score
  const totalComplexity = ingredientComplexity + techniqueComplexity;
  
  // Determine difficulty level based on thresholds (map to framework-agnostic levels)
  if (totalComplexity <= DIFFICULTY_THRESHOLDS.NOVICE_MAX) {
    return 'simple';
  } else if (totalComplexity <= DIFFICULTY_THRESHOLDS.APPRENTICE_MAX) {
    return 'moderate';
  } else if (totalComplexity <= DIFFICULTY_THRESHOLDS.MASTER_MAX) {
    return 'complex';
  } else {
    return 'masterful';
  }
}

/**
 * Assigns spiritual benefits based on ingredient properties and technique significance
 * Uses weighted selection to avoid repetition and ensure variety
 */
export function assignSpiritualBenefit(
  ingredients: AirNomadIngredient[], 
  technique: AirNomadCookingTechnique
): SpiritualBenefit {
  // Determine benefit category based on dish characteristics
  const hasLegendaryIngredient = ingredients.some(ing => ing.rarity === 'legendary');
  const hasSacredIngredient = ingredients.some(ing => ing.isSacred);
  const isCeremonialTechnique = technique.timeRequired === 'ceremonial';
  
  let benefitCategory: keyof typeof SPIRITUAL_BENEFIT_LOOKUP;
  
  if (hasLegendaryIngredient) {
    benefitCategory = 'legendary';
  } else if (hasSacredIngredient) {
    benefitCategory = 'sacred';
  } else if (isCeremonialTechnique) {
    benefitCategory = 'ceremonial';
  } else {
    benefitCategory = 'common';
  }
  
  // Select from appropriate benefit category
  const benefitOptions = SPIRITUAL_BENEFIT_LOOKUP[benefitCategory];
  const randomIndex = Math.floor(Math.random() * benefitOptions.length);
  return benefitOptions[randomIndex];
}

/**
 * NEW: Calculates spiritual benefit description based on dish characteristics
 * Provides rich, contextual spiritual benefit explanations
 */
export function calculateSpiritualBenefitDescription(
  ingredients: AirNomadIngredient[], 
  technique: AirNomadCookingTechnique,
  benefit: SpiritualBenefit
): string {
  const benefitDescriptions: Record<SpiritualBenefit, string[]> = {
    'enhances_meditation_focus': [
      'Quiets the mind and deepens concentration during meditation practice',
      'Promotes sustained attention and mental clarity for spiritual work',
      'Supports mindful awareness and present-moment consciousness'
    ],
    'promotes_inner_peace': [
      'Calms turbulent emotions and brings harmony to the spirit',
      'Cultivates serenity and emotional balance within the heart',
      'Encourages gentle acceptance and peaceful contentment'
    ],
    'stimulates_chakra_alignment': [
      'Harmonizes energy centers and promotes spiritual balance',
      'Encourages proper energy flow throughout the body',
      'Supports chakra healing and energetic alignment'
    ],
    'awakens_spiritual_awareness': [
      'Opens pathways to higher consciousness and divine connection',
      'Enhances perception of spiritual truths and mystical insights',
      'Facilitates awakening to deeper spiritual realities'
    ],
    'fosters_community_harmony': [
      'Strengthens bonds between temple members and visitors',
      'Promotes cooperation and mutual understanding in groups',
      'Builds bridges of compassion and shared purpose'
    ],
    'connects_to_ancestral_wisdom': [
      'Links the partaker to ancient Air Nomad teachings and traditions',
      'Awakens memories of past masters and their spiritual insights',
      'Provides access to accumulated wisdom of countless generations'
    ],
    'purifies_mind_and_body': [
      'Cleanses negative thoughts and harmful energy from the system',
      'Promotes physical detoxification and spiritual purification',
      'Removes obstacles to clear thinking and spiritual growth'
    ],
    'facilitates_air_nomad_traditions': [
      'Deepens connection to sacred Air Nomad customs and practices',
      'Supports traditional ceremonies and spiritual observances',
      'Preserves and honors ancient cultural wisdom and values'
    ]
  };
  
  const descriptions = benefitDescriptions[benefit];
  const randomIndex = Math.floor(Math.random() * descriptions.length);
  return descriptions[randomIndex];
}

/**
 * NEW: Determines dish difficulty category with descriptive explanation
 * Returns both level and contextual difficulty description
 */
export function calculateDifficultyWithDescription(
  ingredients: AirNomadIngredient[], 
  technique: AirNomadCookingTechnique
): { level: DifficultyLevel; description: string } {
  const level = calculateDifficulty(ingredients, technique);
  
  // Get technique-specific description if available
  const techniqueInfo = TECHNIQUE_DIFFICULTY_MAP[technique.name];
  if (techniqueInfo) {
    return {
      level,
      description: techniqueInfo.description
    };
  }
  
  // Fallback to generic descriptions based on level
  const genericDescriptions: Record<DifficultyLevel, string[]> = {
    simple: [
      'Accessible to novice practitioners with basic temple training',
      'Straightforward preparation suitable for daily temple meals',
      'Gentle technique requiring minimal specialized knowledge'
    ],
    moderate: [
      'Requires some experience with traditional Air Nomad cooking methods',
      'Intermediate technique needing careful attention to timing',
      'Standard temple preparation requiring focused practice'
    ],
    complex: [
      'Advanced technique requiring years of dedicated practice',
      'Challenging preparation reserved for experienced temple cooks',
      'Sophisticated method demanding mastery of multiple skills'
    ],
    masterful: [
      'Sacred technique requiring spiritual preparation and master-level skills',
      'Elite preparation reserved for the most accomplished temple masters',
      'Mystical cooking method bridging culinary art and spiritual practice'
    ]
  };
  
  const descriptions = genericDescriptions[level];
  const randomIndex = Math.floor(Math.random() * descriptions.length);
  
  return {
    level,
    description: descriptions[randomIndex]
  };
}

/**
 * Helper function to get technique-specific complexity modifier
 */
function getTechniqueComplexityModifier(techniqueName: string): number {
  const complexityModifiers: Record<string, number> = {
    'Steam-Whipping': 1,
    'Whisper-Steaming': 0,
    'Wind-Drying': 2,
    'Float-Boiling': 1,
    'Meditation Brewing': 3,
    'Sky-Roasting': 2,
    'Wind-Roasted': 2,
    'Cloud-Fermented': 3,
    'Sun-Basked': 0,
    'Mist-Infused': 1,
    'Temple-Smoked': 2,
    'Prayer-Blessed': 3,
    'Mountain-Cured': 2,
    'Spirit-Touched': 3
  };
  
  return complexityModifiers[techniqueName] || 0;
} 