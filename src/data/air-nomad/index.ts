/**
 * Air Nomad Data Module - Complete Export Interface
 * 
 * Central export point for all Air Nomad specific data, lore, and functionality
 * Provides clean imports for other modules while maintaining the expansion-proof architecture
 */

// Core Data Exports
export { 
  airNomadIngredients, 
  getHighCulturalWeightIngredients,
  getIngredientsByRole
} from './ingredients.js';

export {
  airNomadTechniques,
  getAuthenticMainDishTechniques
} from './techniques.js';

// Lore System Exports
export type {
  AirNomadLocation,
  AirNomadTechniqueLore,
  AirNomadLegendaryIngredientContext,
  AirNomadSpiritualFigure
} from './lore-system.js';

export {
  AIR_NOMAD_LOCATIONS,
  AIR_NOMAD_FESTIVALS,
  AIR_NOMAD_TECHNIQUE_LORE,
  AIR_NOMAD_INGREDIENT_SYNERGIES,
  AIR_NOMAD_LEGENDARY_INGREDIENTS,
  AIR_NOMAD_SPIRITUAL_FIGURES,
  AirNomadLoreSystem,
  airNomadLoreSystem,
  getLocationLore,
  getFestivalContext,
  getTechniqueLore,
  getIngredientSynergy,
  getLegendaryIngredientContext
} from './lore-system.js';

// Type Exports for External Use
export type {
  AirNomadIngredient,
  AirNomadCookingTechnique
} from '../../types.js'; 