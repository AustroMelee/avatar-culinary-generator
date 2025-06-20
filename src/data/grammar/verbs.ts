/**
 * Air Nomad Culinary Verbs System
 * 
 * Comprehensive collection of verbs categorized by culinary actions
 * for dynamic dish descriptions. Provides cooking methods, preparation
 * techniques, and serving actions that reflect Air Nomad traditions.
 * 
 * Organized for maximum narrative flexibility and cultural authenticity.
 */

/** Cooking and preparation verbs */
export type CookingVerb = 
  | 'steam'
  | 'simmer'
  | 'boil'
  | 'blanch'
  | 'poach'
  | 'braise'
  | 'stew'
  | 'infuse'
  | 'steep'
  | 'brew'
  | 'blend'
  | 'whisk'
  | 'fold'
  | 'mix'
  | 'combine'
  | 'meld'
  | 'harmonize'
  | 'balance'
  | 'temper'
  | 'gentle-cook';

/** Preparation and handling verbs */
export type PreparationVerb = 
  | 'slice'
  | 'dice'
  | 'chop'
  | 'mince'
  | 'julienne'
  | 'shred'
  | 'grate'
  | 'peel'
  | 'trim'
  | 'clean'
  | 'wash'
  | 'purify'
  | 'prepare'
  | 'arrange'
  | 'compose'
  | 'assemble'
  | 'craft'
  | 'shape'
  | 'form'
  | 'mold';

/** Serving and presentation verbs */
export type ServingVerb = 
  | 'serve'
  | 'present'
  | 'offer'
  | 'share'
  | 'distribute'
  | 'portion'
  | 'plate'
  | 'arrange'
  | 'display'
  | 'showcase'
  | 'deliver'
  | 'provide'
  | 'bestow'
  | 'grace'
  | 'honor'
  | 'bless'
  | 'consecrate'
  | 'dedicate'
  | 'celebrate'
  | 'commemorate';

/** Spiritual and ceremonial verbs */
export type SpiritualVerb = 
  | 'bless'
  | 'consecrate'
  | 'sanctify'
  | 'purify'
  | 'cleanse'
  | 'honor'
  | 'revere'
  | 'cherish'
  | 'meditate'
  | 'contemplate'
  | 'reflect'
  | 'center'
  | 'ground'
  | 'balance'
  | 'harmonize'
  | 'unite'
  | 'connect'
  | 'transcend'
  | 'enlighten'
  | 'inspire';

/** Complete arrays for random selection */
export const COOKING_VERBS: readonly CookingVerb[] = [
  'steam',
  'simmer',
  'boil',
  'blanch',
  'poach',
  'braise',
  'stew',
  'infuse',
  'steep',
  'brew',
  'blend',
  'whisk',
  'fold',
  'mix',
  'combine',
  'meld',
  'harmonize',
  'balance',
  'temper',
  'gentle-cook',
] as const;

export const PREPARATION_VERBS: readonly PreparationVerb[] = [
  'slice',
  'dice',
  'chop',
  'mince',
  'julienne',
  'shred',
  'grate',
  'peel',
  'trim',
  'clean',
  'wash',
  'purify',
  'prepare',
  'arrange',
  'compose',
  'assemble',
  'craft',
  'shape',
  'form',
  'mold',
] as const;

export const SERVING_VERBS: readonly ServingVerb[] = [
  'serve',
  'present',
  'offer',
  'share',
  'distribute',
  'portion',
  'plate',
  'arrange',
  'display',
  'showcase',
  'deliver',
  'provide',
  'bestow',
  'grace',
  'honor',
  'bless',
  'consecrate',
  'dedicate',
  'celebrate',
  'commemorate',
] as const;

export const SPIRITUAL_VERBS: readonly SpiritualVerb[] = [
  'bless',
  'consecrate',
  'sanctify',
  'purify',
  'cleanse',
  'honor',
  'revere',
  'cherish',
  'meditate',
  'contemplate',
  'reflect',
  'center',
  'ground',
  'balance',
  'harmonize',
  'unite',
  'connect',
  'transcend',
  'enlighten',
  'inspire',
] as const;

/**
 * Retrieves all cooking verbs
 * @returns Array of cooking and preparation method verbs
 */
export function getCookingVerbs(): readonly CookingVerb[] {
  return COOKING_VERBS;
}

/**
 * Retrieves all preparation verbs
 * @returns Array of preparation and handling verbs
 */
export function getPreparationVerbs(): readonly PreparationVerb[] {
  return PREPARATION_VERBS;
}

/**
 * Retrieves all serving verbs
 * @returns Array of serving and presentation verbs
 */
export function getServingVerbs(): readonly ServingVerb[] {
  return SERVING_VERBS;
}

/**
 * Retrieves all spiritual verbs
 * @returns Array of spiritual and ceremonial verbs
 */
export function getSpiritualVerbs(): readonly SpiritualVerb[] {
  return SPIRITUAL_VERBS;
}

/**
 * Retrieves all verbs from all categories
 * @returns Combined array of all verbs
 */
export function getAllVerbs(): readonly (CookingVerb | PreparationVerb | ServingVerb | SpiritualVerb)[] {
  return [
    ...COOKING_VERBS,
    ...PREPARATION_VERBS,
    ...SERVING_VERBS,
    ...SPIRITUAL_VERBS,
  ] as const;
}

/**
 * Selects a random verb from specified category
 * @param category - The verb category to select from
 * @param randomSelector - Function to select random elements from arrays
 * @returns Random verb from the specified category
 */
export function selectVerbByCategory(
  category: 'cooking' | 'preparation' | 'serving' | 'spiritual',
  randomSelector: <T>(array: readonly T[]) => T
): string {
  switch (category) {
    case 'cooking':
      return randomSelector(COOKING_VERBS);
    case 'preparation':
      return randomSelector(PREPARATION_VERBS);
    case 'serving':
      return randomSelector(SERVING_VERBS);
    case 'spiritual':
      return randomSelector(SPIRITUAL_VERBS);
    default:
      // Fallback to cooking verbs
      return randomSelector(COOKING_VERBS);
  }
}

/**
 * Generates cooking instruction using random verb
 * @param ingredients - List of ingredients to use in instruction
 * @param randomSelector - Function to select random elements from arrays
 * @returns Cooking instruction string
 */
export function generateCookingInstruction(
  ingredients: string[],
  randomSelector: <T>(array: readonly T[]) => T
): string {
  const cookingVerb = randomSelector(COOKING_VERBS);
  const preparationVerb = randomSelector(PREPARATION_VERBS);
  
  if (ingredients.length === 0) {
    return `${preparationVerb} ingredients with care, then ${cookingVerb} gently until ready.`;
  }
  
  const mainIngredient = randomSelector(ingredients);
  return `${preparationVerb} the ${mainIngredient}, then ${cookingVerb} with mindful attention until perfectly balanced.`;
}

/**
 * Generates serving suggestion using spiritual context
 * @param dishName - Name of the dish being served
 * @param randomSelector - Function to select random elements from arrays
 * @returns Serving suggestion string
 */
export function generateServingSuggestion(
  dishName: string,
  randomSelector: <T>(array: readonly T[]) => T
): string {
  const servingVerb = randomSelector(SERVING_VERBS);
  const spiritualVerb = randomSelector(SPIRITUAL_VERBS);
  
  return `${servingVerb} this ${dishName} with intention, allowing each bite to ${spiritualVerb} your practice.`;
} 