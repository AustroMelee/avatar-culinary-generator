import type { AirNomadCookingTechnique } from '../../types.js';

/**
 * Traditional Air Nomad cooking techniques passed down through generations
 * Each technique reflects the spiritual and cultural values of the Air Nomads
 * Categorized by application and suitable dish types for balanced meal planning
 */
export const airNomadTechniques: AirNomadCookingTechnique[] = [
  {
    name: 'Steam-Whipped',
    description: 'Using controlled air currents to whip ingredients while steaming',
    timeRequired: 'moderate',
    culturalSignificance: 9,
    category: 'main_dish',
    suitableForDishTypes: ['main_course', 'side_dish']
  },
  {
    name: 'Cloud-Braised',
    description: 'Slow cooking in floating moisture clouds',
    timeRequired: 'slow',
    culturalSignificance: 8,
    category: 'main_dish',
    suitableForDishTypes: ['main_course', 'side_dish']
  },
  {
    name: 'Wind-Dried',
    description: 'Dehydrating using carefully controlled air flows',
    timeRequired: 'ceremonial',
    culturalSignificance: 7,
    category: 'ceremonial',
    suitableForDishTypes: ['ceremonial_offering', 'dessert']
  },
  {
    name: 'Levitation-Cooked',
    description: 'Cooking ingredients while suspended in air through airbending',
    timeRequired: 'moderate',
    culturalSignificance: 10,
    category: 'ceremonial',
    suitableForDishTypes: ['main_course', 'ceremonial_offering']
  },
  {
    name: 'Meditation-Infused',
    description: 'Preparing food during deep meditation to infuse spiritual energy',
    timeRequired: 'ceremonial',
    culturalSignificance: 10,
    category: 'ceremonial',
    suitableForDishTypes: ['ceremonial_offering', 'beverage', 'dessert']
  },
  {
    name: 'Sky-Roasted',
    description: 'Roasting at high altitudes using controlled air temperature',
    timeRequired: 'moderate',
    culturalSignificance: 6,
    category: 'main_dish',
    suitableForDishTypes: ['main_course', 'side_dish']
  },
  {
    name: 'Whisper-Steamed',
    description: 'Gentle steaming using barely perceptible air movements',
    timeRequired: 'slow',
    culturalSignificance: 8,
    category: 'main_dish',
    suitableForDishTypes: ['main_course', 'side_dish', 'dessert']
  }
];

/**
 * Helper function to get techniques suitable for a specific dish type
 * Enables dish-type-appropriate technique selection
 */
export function getTechniquesForDishType(dishType: string): AirNomadCookingTechnique[] {
  return airNomadTechniques.filter(technique => 
    technique.suitableForDishTypes.includes(dishType as any)
  );
}

/**
 * Helper function to get techniques by category
 * Allows filtering by technique application type
 */
export function getTechniquesByCategory(category: string): AirNomadCookingTechnique[] {
  return airNomadTechniques.filter(technique => technique.category === category);
}

/**
 * Helper function to get main dish techniques with high cultural significance
 * Filters for authentic Air Nomad cooking methods suitable for primary courses
 */
export function getAuthenticMainDishTechniques(minCulturalSignificance: number = 8): AirNomadCookingTechnique[] {
  return airNomadTechniques.filter(technique => 
    technique.category === 'main_dish' && 
    technique.culturalSignificance >= minCulturalSignificance &&
    technique.suitableForDishTypes.includes('main_course')
  );
} 