import type { 
  AirNomadIngredient, 
  AirNomadCookingTechnique
} from '../types.js';

/**
 * ENHANCED NAMING CONSTANTS - Expanded thematic naming elements
 * Provides rich vocabulary for varied and meaningful dish names
 */
const THEMATIC_PREFIXES = [
  'Whispering', 'Celestial', 'Moonlit', 'Sky-borne', 'Sacred', 'Ancient', 
  'Floating', 'Temple', 'Mountain', 'Wind-kissed', 'Spirit', 'Tranquil',
  'Mystical', 'Ethereal', 'Divine', 'Blessed', 'Serene', 'Harmonious',
  'Enlightened', 'Peaceful', 'Pure', 'Radiant', 'Golden', 'Silver'
];

const THEMATIC_SUFFIXES = [
  'Harmony', 'Tranquility', 'Embrace', 'Zephyr', 'Serenity', 'Wisdom',
  'Blessing', 'Meditation', 'Prayer', 'Reverie', 'Grace', 'Enlightenment',
  'Sanctuary', 'Haven', 'Refuge', 'Journey', 'Path', 'Awakening',
  'Balance', 'Unity', 'Peace', 'Clarity', 'Truth', 'Spirit'
];

const MIDDLE_WORDS = [
  'Mountain', 'Cloud', 'Wind', 'Temple', 'Spirit', 'Sacred', 'Ancient',
  'Mystic', 'Divine', 'Eternal', 'Flowing', 'Dancing', 'Soaring', 'Floating'
];

/**
 * Composes simple, canonical Avatar-style dish names that reflect the actual ingredients
 * Examples: "Pine Nut Noodles", "Fire Flakes", "Mushroom Carrot Stew"
 * Focuses on concise, memorable names that describe the unique dish composition
 */
export function composeDishName(
  ingredients: AirNomadIngredient[], 
  technique: AirNomadCookingTechnique
): string {
  // Find the most interesting ingredients to feature in the name
  const featuredIngredients = selectFeaturedIngredients(ingredients);
  const dishType = getDishTypeFromTechnique(technique);
  
  // Check for legendary ingredients for special naming
  const legendaryIngredient = ingredients.find(ing => ing.rarity === 'legendary');
  if (legendaryIngredient) {
    return composeLegendaryName(legendaryIngredient, featuredIngredients, technique, dishType);
  }
  
  // Check for rare ingredients for enhanced naming
  const rareIngredient = ingredients.find(ing => ing.rarity === 'rare');
  if (rareIngredient) {
    return composeEnhancedName(featuredIngredients, technique, dishType);
  }
  
  // Create meaningful names based on the featured ingredients
  return composeDescriptiveName(featuredIngredients, technique, dishType);
}

/**
 * Selects the most interesting ingredients to feature in the dish name
 * Prioritizes rare ingredients and distinctive flavors
 */
function selectFeaturedIngredients(ingredients: AirNomadIngredient[]): AirNomadIngredient[] {
  // Sort by rarity and distinctiveness
  const sorted = [...ingredients].sort((a, b) => {
    const rarityScore = { legendary: 4, rare: 3, uncommon: 2, common: 1 };
    const aScore = rarityScore[a.rarity] || 0;
    const bScore = rarityScore[b.rarity] || 0;
    
    if (aScore !== bScore) return bScore - aScore;
    
    // Prefer ingredients with distinctive characteristics
    const distinctive = ['nuts', 'mushroom', 'flower', 'fruit', 'spice', 'herb'];
    const aDistinctive = distinctive.some(word => a.name.toLowerCase().includes(word));
    const bDistinctive = distinctive.some(word => b.name.toLowerCase().includes(word));
    
    if (aDistinctive && !bDistinctive) return -1;
    if (!aDistinctive && bDistinctive) return 1;
    return 0;
  });
  
  // Take 1-2 most interesting ingredients
  if (sorted.length === 1) return [sorted[0]];
  if (sorted.length === 2) return sorted;
  
  // For 3+ ingredients, take the most interesting one and one other
  const primary = sorted[0];
  const secondary = sorted[1].rarity !== 'common' ? sorted[1] : sorted.find(ing => ing.rarity === 'common') || sorted[1];
  
  return [primary, secondary];
}

/**
 * Creates legendary dish names with mystical touch but still descriptive
 * Uses three-part naming: prefix + middle + base + suffix for epic feel
 */
function composeLegendaryName(
  legendaryIngredient: AirNomadIngredient,
  featuredIngredients: AirNomadIngredient[],
  technique: AirNomadCookingTechnique,
  dishType: string
): string {
  const legendaryName = getSimpleIngredientName(legendaryIngredient.name);
  const otherIngredient = featuredIngredients.find(ing => ing !== legendaryIngredient);
  const otherName = otherIngredient ? getSimpleIngredientName(otherIngredient.name) : null;
  
  // Use three-part epic naming for legendary dishes
  const prefix = randomChoice(THEMATIC_PREFIXES);
  const middle = randomChoice(MIDDLE_WORDS);
  const suffix = randomChoice(THEMATIC_SUFFIXES);
  
  const patterns = [
    `${prefix} ${middle} ${legendaryName} of ${suffix}`,
    `${legendaryName} of ${prefix} ${suffix}`,
    `${prefix} ${legendaryName} ${middle} ${dishType}`,
    `Sacred ${legendaryName}${otherName ? ' ' + middle + ' ' + otherName : ''} of ${suffix}`,
    `${prefix} ${middle} ${dishType} of ${suffix}`
  ];
  
  return randomChoice(patterns);
}

/**
 * Creates enhanced dish names for rare ingredients with moderate theming
 */
function composeEnhancedName(
  featuredIngredients: AirNomadIngredient[],
  technique: AirNomadCookingTechnique,
  dishType: string
): string {
  const primaryName = getSimpleIngredientName(featuredIngredients[0].name);
  const secondaryName = featuredIngredients.length > 1 ? getSimpleIngredientName(featuredIngredients[1].name) : null;
  
  // Add light theming for rare dishes
  const prefix = randomChoice(THEMATIC_PREFIXES.slice(0, 12)); // Use first half for subtlety
  const suffix = randomChoice(THEMATIC_SUFFIXES.slice(0, 12));
  
  const patterns = [
    `${prefix} ${primaryName} ${dishType}`,
    `${primaryName} of ${suffix}`,
    `${prefix} ${primaryName}${secondaryName ? ' ' + secondaryName : ''}`,
    `Temple ${primaryName}${secondaryName ? ' ' + secondaryName : ''} ${dishType}`,
    `Mountain ${primaryName} ${dishType}`
  ];
  
  return randomChoice(patterns);
}

/**
 * Creates descriptive dish names that reflect the actual ingredients
 */
function composeDescriptiveName(
  featuredIngredients: AirNomadIngredient[],
  technique: AirNomadCookingTechnique,
  dishType: string
): string {
  const primaryName = getSimpleIngredientName(featuredIngredients[0].name);
  const secondaryName = featuredIngredients.length > 1 ? getSimpleIngredientName(featuredIngredients[1].name) : null;
  const techniqueName = getSimpleTechniqueName(technique);
  
  // Always create descriptive names that include ingredients
  const patterns = [
    // Primary ingredient + dish type: "Pine Nut Noodles", "Mushroom Soup"
    `${primaryName} ${dishType}`,
    
    // Dual ingredient combinations: "Pine Nut Mushroom Stew", "Carrot Apple Soup"
    ...(secondaryName ? [
      `${primaryName} ${secondaryName} ${dishType}`,
      `${secondaryName} ${primaryName} ${dishType}`,
      `${primaryName} and ${secondaryName}`
    ] : []),
    
    // Technique + primary ingredient: "Steamed Pine Nuts", "Roasted Mushrooms"
    `${techniqueName} ${primaryName}`,
    
    // Air Nomad themed but still descriptive
    `Wind ${primaryName} ${dishType}`,
    `Sky ${primaryName}${secondaryName ? ' ' + secondaryName : ''}`,
    `Temple ${primaryName} ${dishType}`,
    
    // Special combinations for certain ingredients
    ...(getSpecialCombinations(primaryName, secondaryName, dishType))
  ];
  
  return randomChoice(patterns);
}

/**
 * Creates special name combinations for certain ingredient pairs
 */
function getSpecialCombinations(primaryName: string, secondaryName: string | null, dishType: string): string[] {
  const special: string[] = [];
  
  // Noodle dishes should emphasize what's WITH the noodles
  if (dishType.toLowerCase().includes('noodle') && secondaryName) {
    special.push(`${secondaryName} Noodles`);
  }
  
  // Soup combinations
  if (dishType.toLowerCase().includes('soup') && secondaryName) {
    special.push(`${primaryName} ${secondaryName} Soup`);
  }
  
  // Fruit combinations
  if (primaryName.toLowerCase().includes('apple') || primaryName.toLowerCase().includes('fruit')) {
    special.push(`Sweet ${primaryName}${secondaryName ? ' ' + secondaryName : ''}`);
  }
  
  return special;
}

/**
 * Simplifies ingredient names to core descriptive terms
 * "Crystal Cave Minerals" -> "Crystal"
 * "Sacred Sky Bison Horn Powder" -> "Bison Horn"
 * "Pine Nuts" -> "Pine Nut" (keeps meaningful descriptors)
 */
function getSimpleIngredientName(fullName: string): string {
  // Remove overly mystical descriptive words but keep meaningful ones
  const cleaned = fullName
    .replace(/\b(sacred|blessed|ancient|mystical|pure|spiritual|divine|eternal)\b/gi, '')
    .replace(/\b(powder|extract|essence|oil|crystals?|minerals?)\b/gi, '')
    .trim();
  
  // Extract meaningful words, preserving important descriptors
  const words = cleaned.split(/\s+/).filter(word => word.length > 2);
  
  if (words.length === 0) {
    // Fallback: take first meaningful word from original
    const originalWords = fullName.split(/\s+/).filter(word => word.length > 2);
    return originalWords[0] || fullName;
  } else if (words.length === 1) {
    return words[0];
  } else if (words.length === 2) {
    // Keep both words for descriptive combinations like "Pine Nut"
    return words.join(' ');
  } else {
    // For longer names, take the most descriptive 1-2 words
    // Prefer the last two words as they're usually most specific
    const important = words.slice(-2);
    return important.join(' ');
  }
}

/**
 * Maps cooking techniques to appropriate dish types
 * Now includes noodle dishes and more variety
 */
function getDishTypeFromTechnique(technique: AirNomadCookingTechnique): string {
  const techniqueMap: Record<string, string[]> = {
    'Steam-Whipping': ['Noodles', 'Soup', 'Stew', 'Broth'],
    'Whisper-Steaming': ['Steamed Dish', 'Bowl', 'Dumplings'],
    'Wind-Drying': ['Chips', 'Flakes', 'Crisps', 'Jerky'],
    'Float-Boiling': ['Soup', 'Broth', 'Stew', 'Porridge'],
    'Meditation Brewing': ['Tea', 'Brew', 'Elixir'],
    'Sky-Roasting': ['Roast', 'Nuts', 'Crisps', 'Toast'],
    
    // New technique mappings
    'Wind-Roasted': ['Roast', 'Crisps', 'Toast'],
    'Cloud-Fermented': ['Preserve', 'Ferment', 'Aged Dish'],
    'Sun-Basked': ['Dried Dish', 'Concentrate', 'Essence'],
    'Mist-Infused': ['Infusion', 'Tea', 'Elixir'],
    'Temple-Smoked': ['Smoked Dish', 'Preserve', 'Jerky'],
    'Prayer-Blessed': ['Blessed Dish', 'Offering', 'Sacred Meal'],
    'Mountain-Cured': ['Cured Dish', 'Preserve', 'Aged Food'],
    'Spirit-Touched': ['Sacred Dish', 'Spiritual Meal', 'Blessed Food']
  };
  
  const dishTypes = techniqueMap[technique.name] || ['Bowl', 'Dish', 'Meal'];
  return randomChoice(dishTypes);
}

function getSimpleTechniqueName(technique: AirNomadCookingTechnique): string {
  const techniqueMap: Record<string, string> = {
    'Steam-Whipping': 'Steamed',
    'Whisper-Steaming': 'Gently Steamed',
    'Wind-Drying': 'Wind-Dried',
    'Float-Boiling': 'Simmered',
    'Meditation Brewing': 'Brewed',
    'Sky-Roasting': 'Roasted',
    'Wind-Roasted': 'Wind-Roasted',
    'Cloud-Fermented': 'Fermented',
    'Sun-Basked': 'Sun-Dried',
    'Mist-Infused': 'Infused',
    'Temple-Smoked': 'Smoked',
    'Prayer-Blessed': 'Blessed',
    'Mountain-Cured': 'Cured',
    'Spirit-Touched': 'Spirit-Touched'
  };
  
  return techniqueMap[technique.name] || 'Prepared';
}

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
} 