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
 * Calculates appropriate serving size based on ingredient composition
 * Returns framework-agnostic serving size
 */
export function calculateServingSize(): ServingSize {
  const sizes: ServingSize[] = ['individual', 'family', 'communal', 'ceremonial'];
  return sizes[Math.floor(Math.random() * sizes.length)];
}

/**
 * Calculates dish difficulty based on ingredient complexity and technique requirements
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
  
  // Calculate technique complexity score
  const techniqueComplexity = TIME_COMPLEXITY_SCORES[technique.timeRequired];
  
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
  // Check if dish qualifies for spiritual benefits
  const hasLegendaryIngredient = ingredients.some(ing => ing.rarity === 'legendary');
  const hasSacredIngredient = ingredients.some(ing => ing.isSacred);
  const isCeremonialTechnique = technique.timeRequired === 'ceremonial';
  const isSlowTechnique = technique.timeRequired === 'slow';
  
  // 80% chance for legendary/sacred dishes to have spiritual benefits
  // 60% chance for ceremonial technique dishes
  // 40% chance for slow technique dishes
  // 20% chance for other dishes
  let benefitChance = 0.2;
  
  if (hasLegendaryIngredient || hasSacredIngredient) {
    benefitChance = 0.8;
  } else if (isCeremonialTechnique) {
    benefitChance = 0.6;
  } else if (isSlowTechnique) {
    benefitChance = 0.4;
  }
  
  // Use Air Nomad spiritual benefit types directly
  const availableBenefits: SpiritualBenefit[] = [
    'enhances_meditation_focus',
    'promotes_inner_peace', 
    'stimulates_chakra_alignment',
    'awakens_spiritual_awareness',
    'fosters_community_harmony',
    'connects_to_ancestral_wisdom',
    'purifies_mind_and_body',
    'facilitates_air_nomad_traditions'
  ];
  
  // Weight benefits based on dish characteristics
  let benefitWeights: Record<SpiritualBenefit, number> = {
    'enhances_meditation_focus': 1,
    'promotes_inner_peace': 1,
    'stimulates_chakra_alignment': 1,
    'awakens_spiritual_awareness': 1,
    'fosters_community_harmony': 1,
    'connects_to_ancestral_wisdom': 1,
    'purifies_mind_and_body': 1,
    'facilitates_air_nomad_traditions': 1
  };
  
  // Boost specific benefits for special ingredients/techniques
  if (hasLegendaryIngredient) {
    benefitWeights['awakens_spiritual_awareness'] *= 3;
    benefitWeights['connects_to_ancestral_wisdom'] *= 3;
  }
  
  if (hasSacredIngredient) {
    benefitWeights['purifies_mind_and_body'] *= 2;
    benefitWeights['stimulates_chakra_alignment'] *= 2;
  }
  
  if (isCeremonialTechnique) {
    benefitWeights['facilitates_air_nomad_traditions'] *= 2;
    benefitWeights['fosters_community_harmony'] *= 2;
  }
  
  // Create weighted pool and select
  const weightedPool: SpiritualBenefit[] = [];
  for (const [benefit, weight] of Object.entries(benefitWeights)) {
    for (let i = 0; i < weight; i++) {
      weightedPool.push(benefit as SpiritualBenefit);
    }
  }
  
  return weightedPool[Math.floor(Math.random() * weightedPool.length)];
} 