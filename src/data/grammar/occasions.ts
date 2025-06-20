/**
 * Air Nomad Culinary Occasions and Context System
 * 
 * Provides contextual information about when and why dishes are served.
 * Organized by occasion types including ceremonies, seasons, daily life,
 * and special cultural events for authentic narrative generation.
 * 
 * Supports dynamic contextual storytelling around culinary traditions.
 */

/** Daily life and routine occasions */
export type DailyOccasion = 
  | 'morning meditation'
  | 'dawn prayers'
  | 'sunrise ceremony'
  | 'midday meal'
  | 'afternoon tea'
  | 'evening gathering'
  | 'sunset contemplation'
  | 'nighttime reflection'
  | 'daily sustenance'
  | 'communal dining'
  | 'solitary meal'
  | 'pre-meditation nourishment'
  | 'post-meditation refreshment'
  | 'temple breakfast'
  | 'monastery lunch'
  | 'communal dinner'
  | 'simple repast'
  | 'mindful eating practice'
  | 'shared sustenance'
  | 'peaceful dining';

/** Seasonal and natural cycle occasions */
export type SeasonalOccasion = 
  | 'spring awakening'
  | 'summer solstice'
  | 'autumn harvest'
  | 'winter reflection'
  | 'equinox balance'
  | 'full moon ceremony'
  | 'new moon meditation'
  | 'first frost observance'
  | 'cherry blossom season'
  | 'monsoon preparation'
  | 'dry season sustenance'
  | 'migration celebration'
  | 'planting ceremony'
  | 'harvest thanksgiving'
  | 'storm weathering'
  | 'clear sky celebration'
  | 'seasonal transition'
  | 'weather blessing'
  | 'natural cycle honor'
  | 'elemental balance';

/** Ceremonial and religious occasions */
export type CeremonialOccasion = 
  | 'Avatar Day celebration'
  | 'Air Master initiation'
  | 'monk ordination'
  | 'temple dedication'
  | 'spiritual marriage'
  | 'coming of age ceremony'
  | 'ancestral remembrance'
  | 'sky bison blessing'
  | 'wind spirit honor'
  | 'harmonic convergence'
  | 'sacred wind ceremony'
  | 'elemental balance ritual'
  | 'meditation retreat opening'
  | 'pilgrimage blessing'
  | 'temple festival'
  | 'spiritual awakening'
  | 'enlightenment celebration'
  | 'peace offering'
  | 'unity ceremony'
  | 'transcendence ritual';

/** Special events and gatherings */
export type SpecialOccasion = 
  | 'inter-temple gathering'
  | 'master visit'
  | 'distinguished guest arrival'
  | 'cultural exchange'
  | 'wisdom sharing circle'
  | 'teaching ceremony'
  | 'knowledge preservation'
  | 'tradition passing'
  | 'elder honor feast'
  | 'student achievement'
  | 'healing ceremony'
  | 'purification ritual'
  | 'blessing bestowment'
  | 'sacred quest departure'
  | 'safe return celebration'
  | 'diplomatic gathering'
  | 'peace negotiation'
  | 'alliance forming'
  | 'cultural festival'
  | 'art celebration';

/** Complete arrays for random selection */
export const DAILY_OCCASIONS: readonly DailyOccasion[] = [
  'morning meditation',
  'dawn prayers',
  'sunrise ceremony',
  'midday meal',
  'afternoon tea',
  'evening gathering',
  'sunset contemplation',
  'nighttime reflection',
  'daily sustenance',
  'communal dining',
  'solitary meal',
  'pre-meditation nourishment',
  'post-meditation refreshment',
  'temple breakfast',
  'monastery lunch',
  'communal dinner',
  'simple repast',
  'mindful eating practice',
  'shared sustenance',
  'peaceful dining',
] as const;

export const SEASONAL_OCCASIONS: readonly SeasonalOccasion[] = [
  'spring awakening',
  'summer solstice',
  'autumn harvest',
  'winter reflection',
  'equinox balance',
  'full moon ceremony',
  'new moon meditation',
  'first frost observance',
  'cherry blossom season',
  'monsoon preparation',
  'dry season sustenance',
  'migration celebration',
  'planting ceremony',
  'harvest thanksgiving',
  'storm weathering',
  'clear sky celebration',
  'seasonal transition',
  'weather blessing',
  'natural cycle honor',
  'elemental balance',
] as const;

export const CEREMONIAL_OCCASIONS: readonly CeremonialOccasion[] = [
  'Avatar Day celebration',
  'Air Master initiation',
  'monk ordination',
  'temple dedication',
  'spiritual marriage',
  'coming of age ceremony',
  'ancestral remembrance',
  'sky bison blessing',
  'wind spirit honor',
  'harmonic convergence',
  'sacred wind ceremony',
  'elemental balance ritual',
  'meditation retreat opening',
  'pilgrimage blessing',
  'temple festival',
  'spiritual awakening',
  'enlightenment celebration',
  'peace offering',
  'unity ceremony',
  'transcendence ritual',
] as const;

export const SPECIAL_OCCASIONS: readonly SpecialOccasion[] = [
  'inter-temple gathering',
  'master visit',
  'distinguished guest arrival',
  'cultural exchange',
  'wisdom sharing circle',
  'teaching ceremony',
  'knowledge preservation',
  'tradition passing',
  'elder honor feast',
  'student achievement',
  'healing ceremony',
  'purification ritual',
  'blessing bestowment',
  'sacred quest departure',
  'safe return celebration',
  'diplomatic gathering',
  'peace negotiation',
  'alliance forming',
  'cultural festival',
  'art celebration',
] as const;

/**
 * Retrieves all daily occasions
 * @returns Array of daily life and routine occasions
 */
export function getDailyOccasions(): readonly DailyOccasion[] {
  return DAILY_OCCASIONS;
}

/**
 * Retrieves all seasonal occasions
 * @returns Array of seasonal and natural cycle occasions
 */
export function getSeasonalOccasions(): readonly SeasonalOccasion[] {
  return SEASONAL_OCCASIONS;
}

/**
 * Retrieves all ceremonial occasions
 * @returns Array of ceremonial and religious occasions
 */
export function getCeremonialOccasions(): readonly CeremonialOccasion[] {
  return CEREMONIAL_OCCASIONS;
}

/**
 * Retrieves all special occasions
 * @returns Array of special events and gatherings
 */
export function getSpecialOccasions(): readonly SpecialOccasion[] {
  return SPECIAL_OCCASIONS;
}

/**
 * Retrieves all occasions from all categories
 * @returns Combined array of all occasions
 */
export function getAllOccasions(): readonly (DailyOccasion | SeasonalOccasion | CeremonialOccasion | SpecialOccasion)[] {
  return [
    ...DAILY_OCCASIONS,
    ...SEASONAL_OCCASIONS,
    ...CEREMONIAL_OCCASIONS,
    ...SPECIAL_OCCASIONS,
  ] as const;
}

/**
 * Selects a random occasion from specified category
 * @param category - The occasion category to select from
 * @param randomSelector - Function to select random elements from arrays
 * @returns Random occasion from the specified category
 */
export function selectOccasionByCategory(
  category: 'daily' | 'seasonal' | 'ceremonial' | 'special',
  randomSelector: <T>(array: readonly T[]) => T
): string {
  switch (category) {
    case 'daily':
      return randomSelector(DAILY_OCCASIONS);
    case 'seasonal':
      return randomSelector(SEASONAL_OCCASIONS);
    case 'ceremonial':
      return randomSelector(CEREMONIAL_OCCASIONS);
    case 'special':
      return randomSelector(SPECIAL_OCCASIONS);
    default:
      // Fallback to daily occasions
      return randomSelector(DAILY_OCCASIONS);
  }
}

/**
 * Generates contextual phrase for dish serving
 * @param occasion - The occasion when the dish is served
 * @returns Contextual phrase describing when/why the dish is served
 */
export function generateOccasionContext(occasion: string): string {
  return `Perfect for ${occasion}`;
}

/**
 * Generates detailed occasion narrative
 * @param occasion - The occasion when the dish is served
 * @param dishName - Name of the dish being served
 * @returns Detailed narrative about the dish's occasion
 */
export function generateOccasionNarrative(occasion: string, dishName: string): string {
  return `This ${dishName} is traditionally served during ${occasion}, bringing nourishment and spiritual connection to the gathering.`;
} 