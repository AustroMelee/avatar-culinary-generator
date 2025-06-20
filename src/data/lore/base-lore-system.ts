/**
 * Base Lore System - Generic Cultural Integration Framework
 * 
 * Defines the core interfaces and types that can be extended for any nation
 * (Air Nomads, Water Tribes, Earth Kingdom, Fire Nation, United Republic)
 * 
 * This provides expansion-proofing for future nation implementations
 */

/** Base location interface that can be extended for any nation */
export interface BaseLocation {
  name: string;
  type: string; // Made flexible to allow nation-specific types
  region: string;
  specialties: string[];
  culturalFocus: string[];
  historicalSignificance: number;
}

/** Base festival interface that can be extended for any nation */
export interface BaseFestival {
  name: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter' | 'year_round';
  purpose: string;
  traditionalFoods: string[];
  spiritualFocus: string[];
  participants: string[];
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
}

/** Base technique lore interface that can be extended for any nation */
export interface BaseTechniqueLore {
  technique: string;
  origin: string;
  traditionalUse: string;
  spiritualSignificance: string;
  legendaryPractitioners: string[];
  seasonalConnections?: string[];
  ingredientSynergies?: string[];
}

/** Base ingredient synergy interface that can be extended for any nation */
export interface BaseIngredientSynergy {
  ingredients: string[];
  technique: string;
  context: string;
  loreHook: string;
  spiritualMeaning: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
}

/** Base legendary ingredient context interface that can be extended for any nation */
export interface BaseLegendaryIngredientContext {
  ingredient: string;
  rarity: 'rare' | 'legendary' | 'sacred';
  origin: string;
  loreText: string;
  preparationRequirements?: string[];
  spiritualPowers: string[];
  culturalRestrictions?: string[];
}

/** Base spiritual figure interface that can be extended for any nation */
export interface BaseSpiritualFigure {
  name: string;
  specialty: string;
  signature: string;
  wisdom: string;
  nation?: string;
}

/** 
 * Base Nation Lore System Interface
 * 
 * Any nation's lore system should implement this interface to ensure
 * consistent functionality across all cultural implementations
 */
export interface BaseNationLoreSystem {
  locations: BaseLocation[];
  festivals: BaseFestival[];
  techniqueLore: BaseTechniqueLore[];
  ingredientSynergies: BaseIngredientSynergy[];
  legendaryIngredients: BaseLegendaryIngredientContext[];
  spiritualFigures: BaseSpiritualFigure[];
  
  // Core lookup functions that every nation should implement
  getLocationLore(locationName: string): BaseLocation | undefined;
  getFestivalContext(): BaseFestival;
  getTechniqueLore(techniqueName: string): BaseTechniqueLore | undefined;
  getIngredientSynergy(ingredients: string[], technique: string): BaseIngredientSynergy | undefined;
  getLegendaryIngredientContext(ingredientName: string): BaseLegendaryIngredientContext | undefined;
}

/** 
 * Generic Lore Lookup Utilities
 * 
 * These can be used by any nation's lore system implementation
 */
export class BaseLoreUtils {
  /**
   * Generic technique lore lookup
   */
  static findTechniqueLore<T extends BaseTechniqueLore>(
    techniqueLoreArray: T[], 
    techniqueName: string
  ): T | undefined {
    return techniqueLoreArray.find(lore => 
      lore.technique.toLowerCase() === techniqueName.toLowerCase()
    );
  }

  /**
   * Generic ingredient synergy lookup
   */
  static findIngredientSynergy<T extends BaseIngredientSynergy>(
    synergyArray: T[], 
    ingredients: string[], 
    technique: string
  ): T | undefined {
    return synergyArray.find(synergy => {
      const hasMatchingIngredients = synergy.ingredients.some(synergyIngredient =>
        ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(synergyIngredient.toLowerCase()) ||
          synergyIngredient.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
      const hasMatchingTechnique = synergy.technique.toLowerCase() === technique.toLowerCase();
      return hasMatchingIngredients && hasMatchingTechnique;
    });
  }

  /**
   * Generic legendary ingredient context lookup
   */
  static findLegendaryIngredientContext<T extends BaseLegendaryIngredientContext>(
    legendaryArray: T[], 
    ingredientName: string
  ): T | undefined {
    return legendaryArray.find(context =>
      context.ingredient.toLowerCase().includes(ingredientName.toLowerCase()) ||
      ingredientName.toLowerCase().includes(context.ingredient.toLowerCase())
    );
  }

  /**
   * Generic location lore lookup
   */
  static findLocationLore<T extends BaseLocation>(
    locationArray: T[], 
    locationName: string
  ): T | undefined {
    return locationArray.find(location => 
      location.name.toLowerCase().includes(locationName.toLowerCase())
    );
  }
}

/** 
 * Nation Types for Expansion
 * 
 * Defines the nations that can have lore systems implemented
 */
export type Nation = 'air_nomads' | 'water_tribes' | 'earth_kingdom' | 'fire_nation' | 'united_republic';

/**
 * Lore System Registry Interface
 * 
 * For managing multiple nation lore systems
 */
export interface LoreSystemRegistry {
  registerNationLore(nation: Nation, loreSystem: BaseNationLoreSystem): void;
  getNationLore(nation: Nation): BaseNationLoreSystem | undefined;
  getAvailableNations(): Nation[];
} 