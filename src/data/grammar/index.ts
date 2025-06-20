/**
 * Air Nomad Grammar System - Central Export Hub
 * 
 * Provides unified access to all grammar modules for Air Nomad dish generation.
 * Organizes naming, descriptions, lore, adjectives, occasions, and verbs
 * into a cohesive system for rich narrative generation.
 * 
 * Import pattern: import { DishNameAdjective, generateDishNameByPattern } from './data/grammar'
 */

// Core grammar modules
export * from './dish-names';
export * from './descriptions';
export * from './lore-snippets';

// Modular grammar components  
export * from './adjectives';
export * from './occasions';
export * from './verbs';

// Procedural generation utilities
export * from './generators';

/**
 * Unified grammar utilities for cross-module functionality
 */

import { generateDishNameByPattern, type DishNamePattern } from './dish-names';
import { generateDescriptionByTemplate, type DescriptionTemplate } from './descriptions';
import { generateLoreByTemplate, type LoreTemplate } from './lore-snippets';
// import { selectAdjectiveByCategory } from './adjectives'; // Available for future features
import { selectOccasionByCategory } from './occasions';
import { selectVerbByCategory } from './verbs';

/** Complete dish narrative generation configuration */
export type DishNarrativeConfig = {
  namePattern: DishNamePattern;
  descriptionTemplate: DescriptionTemplate;
  loreTemplate: LoreTemplate;
  includeOccasion?: boolean;
  includeCookingInstruction?: boolean;
};

/** Default narrative configuration for balanced generation */
export const DEFAULT_NARRATIVE_CONFIG: DishNarrativeConfig = {
  namePattern: 'spiritual_adjective_noun',
  descriptionTemplate: 'cultural_sensory_complete',
  loreTemplate: 'historical_spiritual',
  includeOccasion: true,
  includeCookingInstruction: false,
} as const;

/**
 * Generates complete dish narrative using all grammar modules
 * @param config - Configuration for narrative generation
 * @param randomSelector - Function to select random elements from arrays
 * @param ingredients - Optional ingredient list for cooking instructions
 * @returns Complete narrative object with all components
 */
export function generateCompleteDishNarrative(
  config: DishNarrativeConfig,
  randomSelector: <T>(array: readonly T[]) => T,
  ingredients: string[] = []
): {
  name: string;
  description: string;
  lore: string;
  occasion?: string;
  cookingInstruction?: string;
} {
  const name = generateDishNameByPattern(config.namePattern, randomSelector);
  const description = generateDescriptionByTemplate(config.descriptionTemplate, randomSelector);
  const lore = generateLoreByTemplate(config.loreTemplate, randomSelector);
  
  const result: ReturnType<typeof generateCompleteDishNarrative> = {
    name,
    description,
    lore,
  };

  if (config.includeOccasion) {
    result.occasion = selectOccasionByCategory('ceremonial', randomSelector);
  }

  if (config.includeCookingInstruction && ingredients.length > 0) {
    const cookingVerb = selectVerbByCategory('cooking', randomSelector);
    const preparationVerb = selectVerbByCategory('preparation', randomSelector);
    const mainIngredient = randomSelector(ingredients);
    
    result.cookingInstruction = `${preparationVerb} the ${mainIngredient}, then ${cookingVerb} with mindful attention until perfectly balanced.`;
  }

  return result;
}

/**
 * Generates themed narrative variations for different contexts
 * @param theme - The narrative theme to emphasize
 * @param randomSelector - Function to select random elements from arrays
 * @returns Themed narrative configuration
 */
export function generateThemedNarrative(
  theme: 'ceremonial' | 'daily' | 'seasonal' | 'spiritual'
): DishNarrativeConfig {
  switch (theme) {
    case 'ceremonial':
      return {
        namePattern: 'adjective_spiritual_noun',
        descriptionTemplate: 'cultural_sensory_complete',
        loreTemplate: 'ceremonial_historical',
        includeOccasion: true,
        includeCookingInstruction: false,
      };
    
    case 'daily':
      return {
        namePattern: 'adjective_noun',
        descriptionTemplate: 'sensory_focus',
        loreTemplate: 'historical_focus',
        includeOccasion: true,
        includeCookingInstruction: true,
      };
    
    case 'seasonal':
      return {
        namePattern: 'spiritual_noun',
        descriptionTemplate: 'poetic_spiritual',
        loreTemplate: 'spiritual_ceremonial',
        includeOccasion: true,
        includeCookingInstruction: false,
      };
    
    case 'spiritual':
      return {
        namePattern: 'spiritual_adjective_noun',
        descriptionTemplate: 'poetic_spiritual',
        loreTemplate: 'complete_narrative',
        includeOccasion: true,
        includeCookingInstruction: false,
      };
    
    default:
      return DEFAULT_NARRATIVE_CONFIG;
  }
}

/** 
 * CONVENIENCE UTILITIES FOR AGENTIC ACCESS
 * High-level functions that demonstrate common usage patterns
 */

import { 
  generateDishName as genDishName, 
    // generateDishDescription as genDishDescription, // Available for future features
  // generateLoreSnippet as genLoreSnippet, // Available for future features 
  generateCompleteDishNarrative as genCompleteDishNarrative,
  generateThemedDishNarrative as genThemedDishNarrative,
  defaultRandomSelector,
  // type DishNameParams, // Available for future features
  // type DishDescriptionParams, // Available for future features  
  // type LoreSnippetParams // Available for future features
} from './generators';

/**
 * Quick dish generation with minimal parameters
 * @param technique - Cooking technique
 * @param mainIngredient - Primary ingredient
 * @param ingredients - Array of all ingredients
 * @returns Complete dish with name, description, and lore
 */
export function quickGenerateDish(
  technique: string,
  mainIngredient: string,
  ingredients: string[]
): {
  name: string;
  description: string;
  lore: string;
} {
  return genCompleteDishNarrative({
    technique,
    mainIngredient,
    ingredients,
    dishType: 'main_course',
    randomSelector: defaultRandomSelector
  });
}

/**
 * Generate ceremonial dish for special occasions
 * @param technique - Cooking technique
 * @param mainIngredient - Primary ingredient
 * @param ingredients - Array of all ingredients
 * @returns Ceremonial dish with enhanced spiritual context
 */
export function generateCeremonialDish(
  technique: string,
  mainIngredient: string,
  ingredients: string[]
): {
  name: string;
  description: string;
  lore: string;
  occasion: string;
} {
  return genThemedDishNarrative('ceremonial', {
    technique,
    mainIngredient,
    ingredients,
    dishType: 'ceremonial_offering',
    randomSelector: defaultRandomSelector
  });
}

/**
 * Generate multiple dish name options for selection
 * @param technique - Cooking technique
 * @param mainIngredient - Primary ingredient
 * @param count - Number of name variations (default: 3)
 * @returns Array of dish name options
 */
export function generateDishNameOptions(
  technique: string,
  mainIngredient: string,
  count: number = 3
): string[] {
  const names: string[] = [];
  for (let i = 0; i < count; i++) {
    names.push(genDishName({
      technique,
      main: mainIngredient,
      randomSelector: defaultRandomSelector
    }));
  }
  return names;
}

/**
 * Generate dish content optimized for AI agent consumption
 * @param params - Generation parameters
 * @returns Structured dish data for AI processing
 */
export function generateAIOptimizedDish(params: {
  technique: string;
  mainIngredient: string;
  ingredients: string[];
  theme?: 'ceremonial' | 'daily' | 'seasonal' | 'spiritual';
}): {
  dish: {
    name: string;
    description: string;
    lore: string;
    occasion?: string;
  };
  metadata: {
    technique: string;
    mainIngredient: string;
    ingredients: string[];
    theme: string;
    generatedAt: string;
  };
} {
  const theme = params.theme || 'daily';
  
  const dish = params.theme 
    ? genThemedDishNarrative(theme, {
        technique: params.technique,
        mainIngredient: params.mainIngredient,
        ingredients: params.ingredients,
        dishType: 'main_course',
        randomSelector: defaultRandomSelector
      })
    : genCompleteDishNarrative({
        technique: params.technique,
        mainIngredient: params.mainIngredient,
        ingredients: params.ingredients,
        dishType: 'main_course',
        randomSelector: defaultRandomSelector
      });

  return {
    dish,
    metadata: {
      technique: params.technique,
      mainIngredient: params.mainIngredient,
      ingredients: params.ingredients,
      theme,
      generatedAt: new Date().toISOString()
    }
  };
} 