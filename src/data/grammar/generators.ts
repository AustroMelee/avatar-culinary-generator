/**
 * Air Nomad Grammar Procedural Generation Utilities
 * 
 * Provides high-level functions that combine all phrasebanks
 * for procedural dish name, description, and lore generation.
 * 
 * Uses template-based approach with random selection from
 * comprehensive phrasebank collections.
 */

import { dishAdjectives, dishNouns, nameJoiners, dishFormats } from './dish-names';
import { descriptionLeadIns, preparationPhrases, servingPhrases, descriptionFormats } from './descriptions';
import { loreContexts, festivalHooks, spiritualEffects } from './lore-snippets';
import { QUALITY_ADJECTIVES, SENSORY_ADJECTIVES, CULTURAL_ADJECTIVES, ATMOSPHERIC_ADJECTIVES } from './adjectives';
import { DAILY_OCCASIONS, SEASONAL_OCCASIONS, CEREMONIAL_OCCASIONS } from './occasions';
// Verbs are available for future features

/** Random selection utility function type */
export type RandomSelector = <T>(array: readonly T[]) => T;

/** Default random selector implementation */
export const defaultRandomSelector: RandomSelector = <T>(array: readonly T[]): T => {
  if (array.length === 0) {
    throw new Error('Cannot select from empty array');
  }
  return array[Math.floor(Math.random() * array.length)];
};

/** Parameters for dish name generation */
export type DishNameParams = {
  technique: string;
  main: string;
  garnish?: string;
  secondary?: string;
  season?: string;
  randomSelector?: RandomSelector;
};

/** Parameters for dish description generation */
export type DishDescriptionParams = {
  dishType: string;
  technique: string;
  ingredients: string[];
  occasion?: string;
  randomSelector?: RandomSelector;
};

/** Parameters for lore snippet generation */
export type LoreSnippetParams = {
  dishType: string;
  culturalCombo?: string;
  festival?: string;
  randomSelector?: RandomSelector;
};

/**
 * Generates a procedural dish name using random format selection
 * @param params - Parameters including technique, main ingredient, and optional elements
 * @returns Generated dish name string
 */
export function generateDishName(params: DishNameParams): string {
  const { technique, main, garnish, secondary, season, randomSelector = defaultRandomSelector } = params;
  
  // Select random format
  const format = randomSelector(dishFormats);
  
  // Create comprehensive replacement map
  const replacements: Record<string, string> = {
    // Core ingredients
    '{technique}': technique,
    '{main}': main,
    '{garnish}': garnish || randomSelector(dishNouns),
    '{secondary}': secondary || randomSelector(dishNouns),
    
    // Adjectives from different categories
    '{adjective}': randomSelector(dishAdjectives),
    '{quality}': randomSelector(QUALITY_ADJECTIVES),
    '{sensory}': randomSelector(SENSORY_ADJECTIVES),
    '{cultural}': randomSelector(CULTURAL_ADJECTIVES),
    '{atmospheric}': randomSelector(ATMOSPHERIC_ADJECTIVES),
    
    // Nouns and concepts
    '{noun}': randomSelector(dishNouns),
    '{joiner}': randomSelector(nameJoiners),
    
    // Spiritual and cultural elements
    '{spiritual}': randomSelector(['Sacred', 'Blessed', 'Divine', 'Holy', 'Enlightened']),
    '{temple}': randomSelector(['Eastern Temple', 'Western Temple', 'Northern Temple', 'Southern Temple']),
    '{master}': randomSelector(['Master\'s', 'Guru\'s', 'Elder\'s', 'Monk\'s', 'Avatar\'s']),
    '{ceremony}': randomSelector(['Ceremonial', 'Ritual', 'Sacred', 'Blessed', 'Holy']),
    
    // Seasonal and temporal
    '{season}': season || randomSelector(['Spring', 'Summer', 'Autumn', 'Winter']),
    '{time}': randomSelector(['Dawn', 'Sunset', 'Morning', 'Evening', 'Midnight']),
    '{seasonal}': randomSelector(['Seasonal', 'Equinox', 'Solstice', 'Vernal', 'Autumnal']),
    
    // Elements and nature
    '{element}': randomSelector(['Wind', 'Air', 'Sky', 'Cloud', 'Mountain', 'Storm']),
    '{elements}': randomSelector(['Elements', 'Forces', 'Energies', 'Spirits', 'Essences']),
    
    // Occasions and contexts
    '{blessing}': randomSelector(['Blessing', 'Grace', 'Prayer', 'Meditation', 'Wisdom']),
    '{authority}': randomSelector(['Elder\'s', 'Master\'s', 'Abbot\'s', 'Guru\'s', 'Sage\'s']),
    
    // CRITICAL FIX: Culture replacement (fixes {culture} template variable issue)
    '{culture}': randomSelector([
      'Air Nomad', 'Eastern Temple', 'Western Sanctuary', 'Northern Monastery', 'Southern Peaks',
      'Airbender', 'Sky Bison Rider', 'Wind Walker', 'Cloud Dancer', 'Mountain Monk'
    ]),
    
    // Additional missing replacements found in dish formats
    '{location}': randomSelector(['Eastern Air Temple', 'Western Air Temple', 'Northern Air Temple', 'Southern Air Temple']),
    '{fusion}': randomSelector(['Fusion', 'Blend', 'Harmony', 'Unity', 'Balance']),
    '{traditional}': randomSelector(['Traditional', 'Ancient', 'Time-Honored', 'Ancestral', 'Heritage']),
    '{modern}': randomSelector(['Modern', 'Contemporary', 'New Age', 'Evolved', 'Refined']),
    '{ritual}': randomSelector(['Ritual', 'Ceremonial', 'Sacred', 'Holy', 'Blessed']),
    '{texture}': randomSelector(['Silky', 'Smooth', 'Creamy', 'Light', 'Airy', 'Delicate']),
    '{preparation}': randomSelector(['Lovingly Prepared', 'Mindfully Crafted', 'Gently Made', 'Carefully Composed']),
    '{serving}': randomSelector(['Served', 'Presented', 'Offered', 'Shared', 'Bestowed']),
    '{presentation}': randomSelector(['Artfully Arranged', 'Elegantly Displayed', 'Gracefully Composed']),
    '{vegetable}': randomSelector(['Mushroom', 'Greens', 'Root', 'Herb', 'Sprout']),
    '{protein}': randomSelector(['Tofu', 'Tempeh', 'Nut', 'Seed', 'Legume']),
    '{grain}': randomSelector(['Rice', 'Quinoa', 'Barley', 'Millet', 'Oat']),
    '{fruit}': randomSelector(['Apple', 'Pear', 'Plum', 'Peach', 'Berry']),
    '{herb}': randomSelector(['Basil', 'Mint', 'Sage', 'Thyme', 'Rosemary']),
    '{spice}': randomSelector(['Ginger', 'Cardamom', 'Cinnamon', 'Star Anise', 'Nutmeg']),
    '{liquid}': randomSelector(['Broth', 'Tea', 'Water', 'Milk', 'Nectar'])
  };
  
  // Replace all placeholders in the format
  let result = format;
  for (const [placeholder, replacement] of Object.entries(replacements)) {
    result = result.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), replacement);
  }
  
  return result;
}

/**
 * Generates a procedural dish description using template assembly
 * @param params - Parameters including dish type, technique, ingredients, and occasion
 * @returns Generated description string
 */
export function generateDishDescription(params: DishDescriptionParams): string {
  const { dishType, technique, ingredients, randomSelector = defaultRandomSelector } = params;
  
  // Select random components
  const leadIn = randomSelector(descriptionLeadIns);
  const preparation = randomSelector(preparationPhrases);
  const serving = randomSelector(servingPhrases);
  const format = randomSelector(descriptionFormats);
  
  // Create replacement map for template variables
  const replacements: Record<string, string> = {
    '{leadIn}': leadIn,
    '{preparation}': preparation,
    '{serving}': serving,
    '{main}': ingredients[0] || 'sacred ingredients',
    '{secondary}': ingredients[1] || randomSelector(dishNouns),
    '{technique}': technique,
    '{ingredient}': randomSelector(ingredients.length > 0 ? ingredients : ['blessed herbs']),
    '{spice}': randomSelector(['ginger', 'star anise', 'cardamom', 'cinnamon', 'nutmeg']),
    '{season}': randomSelector(['spring', 'summer', 'autumn', 'winter']),
    '{blessing}': randomSelector(['reverence', 'gratitude', 'mindfulness', 'compassion', 'wisdom']),
    '{dishType}': dishType
  };
  
  // Replace all placeholders in the format
  let result = format;
  for (const [placeholder, replacement] of Object.entries(replacements)) {
    result = result.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), replacement);
  }
  
  // Clean up any remaining unreplaced placeholders
  result = result.replace(/{[^}]+}/g, '');
  
  return result.trim();
}

/**
 * Generates a procedural lore snippet with cultural context
 * @param params - Parameters including dish type, cultural combo, and festival context
 * @returns Generated lore snippet string
 */
export function generateLoreSnippet(params: LoreSnippetParams): string {
  const { culturalCombo, festival, randomSelector = defaultRandomSelector } = params;
  
  // Select random lore components
  const context = randomSelector(loreContexts);
  const effect = randomSelector(spiritualEffects);
  const festivalHook = festival || randomSelector(festivalHooks);
  
  // Determine lore composition style
  const loreStyles = [
    'context_effect',
    'festival_context',
    'effect_festival',
    'context_festival_effect',
    'cultural_significance'
  ];
  
  const style = randomSelector(loreStyles);
  
  // Generate lore based on selected style
  switch (style) {
    case 'context_effect':
      return `${context} and ${effect}.`;
    
    case 'festival_context':
      return `Traditionally served ${festivalHook}, this dish ${context.toLowerCase()}.`;
    
    case 'effect_festival':
      return `Known to ${effect.toLowerCase()}, especially when prepared ${festivalHook}.`;
    
    case 'context_festival_effect':
      return `${context}, traditionally prepared ${festivalHook}, and ${effect.toLowerCase()}.`;
    
    case 'cultural_significance':
      if (culturalCombo) {
        return `This sacred combination of ${culturalCombo} ${context.toLowerCase()} and ${effect.toLowerCase()}.`;
      } else {
        return `A dish of profound spiritual significance that ${context.toLowerCase()} and ${effect.toLowerCase()}.`;
      }
    
    default:
      return `${context} and ${effect}.`;
  }
}

/**
 * Generates a complete dish narrative with name, description, and lore
 * @param params - Comprehensive parameters for complete generation
 * @returns Object containing name, description, and lore
 */
export function generateCompleteDishNarrative(params: {
  technique: string;
  mainIngredient: string;
  ingredients: string[];
  dishType: string;
  garnish?: string;
  culturalCombo?: string;
  festival?: string;
  randomSelector?: RandomSelector;
}): {
  name: string;
  description: string;
  lore: string;
} {
  const randomSelector = params.randomSelector || defaultRandomSelector;
  
  const name = generateDishName({
    technique: params.technique,
    main: params.mainIngredient,
    garnish: params.garnish,
    randomSelector
  });
  
  const description = generateDishDescription({
    dishType: params.dishType,
    technique: params.technique,
    ingredients: params.ingredients,
    randomSelector
  });
  
  const lore = generateLoreSnippet({
    dishType: params.dishType,
    culturalCombo: params.culturalCombo,
    festival: params.festival,
    randomSelector
  });
  
  return { name, description, lore };
}

/**
 * Generates multiple dish name variations for comparison
 * @param params - Base parameters for name generation
 * @param count - Number of variations to generate (default: 5)
 * @returns Array of generated name variations
 */
export function generateDishNameVariations(params: DishNameParams, count: number = 5): string[] {
  const variations: string[] = [];
  const randomSelector = params.randomSelector || defaultRandomSelector;
  
  for (let i = 0; i < count; i++) {
    variations.push(generateDishName({ ...params, randomSelector }));
  }
  
  return variations;
}

/**
 * Generates themed dish content based on specific occasions
 * @param theme - Theme category for generation
 * @param params - Base parameters for generation
 * @returns Themed dish narrative
 */
export function generateThemedDishNarrative(
  theme: 'ceremonial' | 'daily' | 'seasonal' | 'spiritual',
  params: {
    technique: string;
    mainIngredient: string;
    ingredients: string[];
    dishType: string;
    randomSelector?: RandomSelector;
  }
): {
  name: string;
  description: string;
  lore: string;
  occasion: string;
} {
  const randomSelector = params.randomSelector || defaultRandomSelector;
  
  // Select theme-appropriate elements
  let occasion: string;
  let festival: string;
  
  switch (theme) {
    case 'ceremonial':
      occasion = randomSelector(CEREMONIAL_OCCASIONS);
      festival = randomSelector(['for the Festival of Four Winds', 'during the Bison Bonding Rite', 'at the Sky Bison Blessing Ceremony']);
      break;
    case 'daily':
      occasion = randomSelector(DAILY_OCCASIONS);
      festival = randomSelector(['for daily sustenance', 'during morning meditation', 'at evening gathering']);
      break;
    case 'seasonal':
      occasion = randomSelector(SEASONAL_OCCASIONS);
      festival = randomSelector(['during the Spring Awakening Ritual', 'at the Summer Solstice Celebration', 'for the Autumn Reflection Ceremony']);
      break;
    case 'spiritual':
      occasion = randomSelector(['meditation practice', 'spiritual retreat', 'enlightenment ceremony']);
      festival = randomSelector(['for spiritual advancement', 'during transcendent meditation', 'at wisdom teachings']);
      break;
    default:
      occasion = randomSelector(DAILY_OCCASIONS);
      festival = 'for daily nourishment';
  }
  
  const narrative = generateCompleteDishNarrative({
    ...params,
    festival,
    randomSelector
  });
  
  return {
    ...narrative,
    occasion
  };
} 