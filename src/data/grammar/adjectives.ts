/**
 * Air Nomad Culinary Adjectives System
 * 
 * Comprehensive collection of adjectives categorized by semantic meaning
 * for flexible dish generation. Provides quality, sensory, cultural,
 * and spiritual descriptors for rich narrative composition.
 * 
 * Organized for maximum reusability across all grammar components.
 */

/** Quality and preparation adjectives */
export type QualityAdjective = 
  | 'exquisite'
  | 'pristine' 
  | 'refined'
  | 'artisanal'
  | 'masterful'
  | 'perfect'
  | 'flawless'
  | 'exceptional'
  | 'sublime'
  | 'elegant'
  | 'graceful'
  | 'harmonious'
  | 'balanced'
  | 'authentic'
  | 'traditional'
  | 'handcrafted'
  | 'carefully prepared'
  | 'lovingly made'
  | 'mindfully created'
  | 'expertly composed';

/** Sensory experience adjectives */
export type SensoryAdjective = 
  | 'aromatic'
  | 'fragrant'
  | 'flavorful'
  | 'rich'
  | 'delicate'
  | 'subtle'
  | 'complex'
  | 'nuanced'
  | 'vibrant'
  | 'intense'
  | 'fresh'
  | 'crisp'
  | 'smooth'
  | 'silky'
  | 'velvety'
  | 'creamy'
  | 'light'
  | 'airy'
  | 'tender'
  | 'satisfying';

/** Cultural and spiritual adjectives */
export type CulturalAdjective = 
  | 'sacred'
  | 'blessed'
  | 'holy'
  | 'divine'
  | 'spiritual'
  | 'enlightened'
  | 'transcendent'
  | 'pure'
  | 'serene'
  | 'peaceful'
  | 'harmonious'
  | 'balanced'
  | 'mindful'
  | 'contemplative'
  | 'meditative'
  | 'ceremonial'
  | 'ritual'
  | 'traditional'
  | 'ancestral'
  | 'timeless';

/** Atmospheric and poetic adjectives */
export type AtmosphericAdjective = 
  | 'celestial'
  | 'ethereal'
  | 'mystical'
  | 'magical'
  | 'enchanting'
  | 'captivating'
  | 'mesmerizing'
  | 'dreamlike'
  | 'otherworldly'
  | 'floating'
  | 'drifting'
  | 'soaring'
  | 'elevated'
  | 'uplifting'
  | 'inspiring'
  | 'transformative'
  | 'transcendent'
  | 'luminous'
  | 'radiant'
  | 'glowing';

/** Complete arrays for random selection */
export const QUALITY_ADJECTIVES: readonly QualityAdjective[] = [
  'exquisite',
  'pristine', 
  'refined',
  'artisanal',
  'masterful',
  'perfect',
  'flawless',
  'exceptional',
  'sublime',
  'elegant',
  'graceful',
  'harmonious',
  'balanced',
  'authentic',
  'traditional',
  'handcrafted',
  'carefully prepared',
  'lovingly made',
  'mindfully created',
  'expertly composed',
] as const;

export const SENSORY_ADJECTIVES: readonly SensoryAdjective[] = [
  'aromatic',
  'fragrant',
  'flavorful',
  'rich',
  'delicate',
  'subtle',
  'complex',
  'nuanced',
  'vibrant',
  'intense',
  'fresh',
  'crisp',
  'smooth',
  'silky',
  'velvety',
  'creamy',
  'light',
  'airy',
  'tender',
  'satisfying',
] as const;

export const CULTURAL_ADJECTIVES: readonly CulturalAdjective[] = [
  'sacred',
  'blessed',
  'holy',
  'divine',
  'spiritual',
  'enlightened',
  'transcendent',
  'pure',
  'serene',
  'peaceful',
  'harmonious',
  'balanced',
  'mindful',
  'contemplative',
  'meditative',
  'ceremonial',
  'ritual',
  'traditional',
  'ancestral',
  'timeless',
] as const;

export const ATMOSPHERIC_ADJECTIVES: readonly AtmosphericAdjective[] = [
  'celestial',
  'ethereal',
  'mystical',
  'magical',
  'enchanting',
  'captivating',
  'mesmerizing',
  'dreamlike',
  'otherworldly',
  'floating',
  'drifting',
  'soaring',
  'elevated',
  'uplifting',
  'inspiring',
  'transformative',
  'transcendent',
  'luminous',
  'radiant',
  'glowing',
] as const;

/**
 * Retrieves all quality adjectives
 * @returns Array of quality and preparation adjectives
 */
export function getQualityAdjectives(): readonly QualityAdjective[] {
  return QUALITY_ADJECTIVES;
}

/**
 * Retrieves all sensory adjectives
 * @returns Array of sensory experience adjectives
 */
export function getSensoryAdjectives(): readonly SensoryAdjective[] {
  return SENSORY_ADJECTIVES;
}

/**
 * Retrieves all cultural adjectives
 * @returns Array of cultural and spiritual adjectives
 */
export function getCulturalAdjectives(): readonly CulturalAdjective[] {
  return CULTURAL_ADJECTIVES;
}

/**
 * Retrieves all atmospheric adjectives
 * @returns Array of atmospheric and poetic adjectives
 */
export function getAtmosphericAdjectives(): readonly AtmosphericAdjective[] {
  return ATMOSPHERIC_ADJECTIVES;
}

/**
 * Retrieves all adjectives from all categories
 * @returns Combined array of all adjectives
 */
export function getAllAdjectives(): readonly (QualityAdjective | SensoryAdjective | CulturalAdjective | AtmosphericAdjective)[] {
  return [
    ...QUALITY_ADJECTIVES,
    ...SENSORY_ADJECTIVES,
    ...CULTURAL_ADJECTIVES,
    ...ATMOSPHERIC_ADJECTIVES,
  ] as const;
}

/**
 * Selects a random adjective from specified category
 * @param category - The adjective category to select from
 * @param randomSelector - Function to select random elements from arrays
 * @returns Random adjective from the specified category
 */
export function selectAdjectiveByCategory(
  category: 'quality' | 'sensory' | 'cultural' | 'atmospheric',
  randomSelector: <T>(array: readonly T[]) => T
): string {
  switch (category) {
    case 'quality':
      return randomSelector(QUALITY_ADJECTIVES);
    case 'sensory':
      return randomSelector(SENSORY_ADJECTIVES);
    case 'cultural':
      return randomSelector(CULTURAL_ADJECTIVES);
    case 'atmospheric':
      return randomSelector(ATMOSPHERIC_ADJECTIVES);
    default:
      // Fallback to quality adjectives
      return randomSelector(QUALITY_ADJECTIVES);
  }
} 