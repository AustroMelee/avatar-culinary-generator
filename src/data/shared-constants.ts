/**
 * Centralized shared constants for the Air Nomad dish generation system
 * Eliminates duplication and creates single source of truth for all cultural data
 * Supports dynamic loading for multi-nation expansion with minimal bundle impact
 */

/**
 * Core constants that are always needed (small footprint)
 */
export const CORE_CONSTANTS = Object.freeze({
  /**
   * Cultural significance thresholds for authentic dishes
   */
  CULTURAL_THRESHOLDS: {
    MINIMUM_CULTURAL_WEIGHT: 6,
    HIGH_CULTURAL_WEIGHT: 8,
    SACRED_CULTURAL_WEIGHT: 9,
    MAXIMUM_CULTURAL_WEIGHT: 10
  },

  /**
   * Composition balance ratios for authentic Air Nomad meals
   */
  COMPOSITION_RATIOS: {
    MAIN_COURSE: {
      main: { min: 1, max: 1 },
      vegetable: { min: 1, max: 2 },
      seasoning: { min: 1, max: 1 },
      garnish: { min: 0, max: 1 }
    },
    SIDE_DISH: {
      vegetable: { min: 1, max: 2 },
      seasoning: { min: 0, max: 1 },
      garnish: { min: 0, max: 1 }
    },
    CEREMONIAL_OFFERING: {
      main: { min: 1, max: 2 },
      vegetable: { min: 1, max: 3 },
      seasoning: { min: 1, max: 2 },
      garnish: { min: 1, max: 2 }
    }
  }
} as const);

/**
 * Immediately available constants for Air Nomad generation
 * These are loaded synchronously for optimal performance in single-nation mode
 */

/**
 * Festival and ceremonial event names used across the system
 * Prevents hardcoded strings in multiple modules
 */
export const FESTIVAL_NAMES = Object.freeze([
  'Day of Ascending',
  'Vow of Silence Retreat',
  'Harmony of Winds Festival',
  'Celestial Meditation Ceremony',
  'Sacred Mountain Pilgrimage',
  'Festival of Flying Leaves',
  'Temple Cleansing Ritual',
  'Air Scooter Racing Day',
  'Meditation Master\'s Gathering',
  'Wind Walker\'s Celebration'
] as const);

/**
 * Spiritual adjectives for dish descriptions
 * Used in prose composition for authentic Air Nomad language
 */
export const SPIRITUAL_ADJECTIVES = Object.freeze([
  'transcendent',
  'enlightened', 
  'harmonious',
  'sacred',
  'blessed',
  'purifying',
  'meditative',
  'celestial',
  'divine',
  'ethereal'
] as const);

/**
 * Traditional Air Nomad cooking verbs
 * For consistent culinary language across descriptions
 */
export const COOKING_VERBS = Object.freeze([
  'steam',
  'meditate',
  'harmonize',
  'elevate',
  'purify',
  'balance',
  'awaken',
  'transcend',
  'bless',
  'commune'
] as const);

/**
 * Philosophical concepts for technique descriptions
 * Maintains authentic Air Nomad spiritual framework
 */
export const PHILOSOPHICAL_CONCEPTS = Object.freeze([
  'the harmony of all elements',
  'the wisdom of the ancient masters',
  'the sacred connection to nature',
  'the peaceful mind in all things',
  'the balance between sky and earth',
  'the gentle strength of wind',
  'the patience of mountain meditation',
  'the freedom of untethered spirit'
] as const);

/**
 * Sacred ingredient properties used across modules
 * Centralizes sacred ingredient identification
 */
export const SACRED_INGREDIENT_INDICATORS = Object.freeze([
  'lotus',
  'sacred',
  'blessed',
  'temple',
  'ceremonial',
  'divine',
  'holy',
  'spiritual'
] as const);

/**
 * Legendary ingredient properties
 * Used for special dish generation logic
 */
export const LEGENDARY_INGREDIENT_INDICATORS = Object.freeze([
  'legendary',
  'ancient',
  'mystical',
  'eternal',
  'transcendent',
  'primordial'
] as const);

/**
 * Air Nomad dietary restrictions
 * Centralized vegetarian compliance checking
 */
export const PROHIBITED_INGREDIENTS = Object.freeze([
  'eggs',
  'egg whites', 
  'butter',
  'milk',
  'cream',
  'creamy sauce',
  'milk powder',
  'honey',
  'beeswax',
  'gelatin',
  'fish sauce',
  'oyster sauce',
  'meat',
  'fish',
  'poultry',
  'beef',
  'pork',
  'chicken',
  'seafood'
] as const);

/**
 * Template phrase alternatives to prevent repetition
 * Used by prose system for variety across dishes
 */
export const TEMPLATE_ALTERNATIVES = Object.freeze({
  OPENING_PHRASES: [
    'This traditional dish',
    'This sacred preparation', 
    'This harmonious creation',
    'This mindful composition',
    'This blessed offering'
  ],
  TRANSITION_PHRASES: [
    'Each ingredient',
    'Every component',
    'All elements',
    'The chosen ingredients',
    'These sacred components'
  ],
  CLOSING_PHRASES: [
    'marks the sacred turning of seasons',
    'celebrates the ancient wisdom',
    'honors the traditional ways',
    'embodies the Air Nomad spirit',
    'reflects the harmony of nature'
  ]
} as const);

/**
 * Dynamic loading system for future multi-nation expansion
 * Enables lazy loading of nation-specific data to minimize initial bundle size
 */
export class DynamicDataLoader {
  private static loadedNations = new Set<string>();

  /**
   * Loads nation-specific data on demand
   * Future implementation will use dynamic imports for bundle optimization
   */
  static async loadNationData(nation: 'air-nomad' | 'water-tribe' | 'earth-kingdom' | 'fire-nation'): Promise<void> {
    if (this.loadedNations.has(nation)) {
      return; // Already loaded
    }

    switch (nation) {
      case 'air-nomad':
        // Air Nomad data is already loaded synchronously for optimal performance
        this.loadedNations.add(nation);
        break;
        
      case 'water-tribe':
        // Future: await import('./water-tribe/index.js');
        this.loadedNations.add(nation);
        break;
        
      case 'earth-kingdom':
        // Future: await import('./earth-kingdom/index.js');
        this.loadedNations.add(nation);
        break;
        
      case 'fire-nation':
        // Future: await import('./fire-nation/index.js');
        this.loadedNations.add(nation);
        break;
        
      default:
        throw new Error(`loadNationData: Unknown nation '${nation}'. Supported nations: air-nomad, water-tribe, earth-kingdom, fire-nation`);
    }
  }

  /**
   * Preloads multiple nations for improved user experience
   * Useful for applications that will likely need multiple nations
   */
  static async preloadNations(nations: string[]): Promise<void> {
    const loadPromises = nations.map(nation => 
      this.loadNationData(nation as 'air-nomad' | 'water-tribe' | 'earth-kingdom' | 'fire-nation')
    );
    
    await Promise.all(loadPromises);
  }

  /**
   * Gets list of currently loaded nations
   */
  static getLoadedNations(): string[] {
    return Array.from(this.loadedNations);
  }
}

// Type exports for use across modules
export type FestivalName = typeof FESTIVAL_NAMES[number];
export type SpiritualAdjective = typeof SPIRITUAL_ADJECTIVES[number];
export type CookingVerb = typeof COOKING_VERBS[number];
export type PhilosophicalConcept = typeof PHILOSOPHICAL_CONCEPTS[number]; 