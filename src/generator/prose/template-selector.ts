import type { 
  AirNomadIngredient, 
  AirNomadCookingTechnique
} from '../../types.js';
import { FragmentCache } from './fragment-cache.js';
import {
  getTechniqueLore,
  getIngredientSynergy,
  getLegendaryIngredientContext,
  getFestivalContext
} from '../../data/air-nomad/lore-system.js';
import {
  generateSensoryDescription,
  generatePreparationNarrative,
  calculateSensoryIntensity
} from '../../data/grammar/sensory-emotional-system.js';

/**
 * Template selection parameters for prose composition
 */
export type ProseTemplateData = {
  ingredients: AirNomadIngredient[];
  technique: AirNomadCookingTechnique;
  legendaryContext: any;
  techniqueLore: any;
  ingredientSynergy: any;
  festivalContext: any;
  sensoryProfile: any;
  preparationNarrative: string;
};

/**
 * Template types for combinatorial variety
 */
export enum TemplateType {
  TRADITIONAL = 0,
  FESTIVAL_FIRST = 1, 
  MYTH_LED = 2,
  INGREDIENT_FOCUSED = 3
}

/**
 * Template selector with combinatorial logic for structural variety
 * Handles template randomization and legendary dish detection
 */
export class TemplateSelector {
  private dishCounter = 0;

  /**
   * Determines appropriate template type based on dish characteristics
   */
  selectTemplate(
    ingredients: AirNomadIngredient[], 
    technique: AirNomadCookingTechnique,
    _cache: FragmentCache
  ): { templateType: TemplateType; templateData: ProseTemplateData } {
    this.dishCounter++;
    
    const ingredientNames = ingredients.map(ing => ing.name);
    
    // Gather contextual information
    const legendaryContext = this.findLegendaryIngredient(ingredientNames);
    const techniqueLore = getTechniqueLore(technique.name);
    const ingredientSynergy = getIngredientSynergy(ingredientNames, technique.name);
    const festivalContext = getFestivalContext();
    
    // Generate sensory profile
    const hasLegendary = !!legendaryContext;
    const hasSacredIngredients = ingredients.some(ing => ing.isSacred);
    const techniqueComplexity = technique.timeRequired === 'ceremonial' ? 'masterful' : 
                               technique.timeRequired === 'slow' ? 'complex' :
                               technique.timeRequired === 'moderate' ? 'moderate' : 'simple';
    const spiritualSignificance = hasLegendary || hasSacredIngredients || !!techniqueLore;
    
    const sensoryIntensity = calculateSensoryIntensity(hasLegendary, techniqueComplexity, spiritualSignificance);
    const maxRarity = Math.max(...ingredients.map(ing => 
      ing.rarity === 'legendary' ? 4 : ing.rarity === 'rare' ? 3 : ing.rarity === 'uncommon' ? 2 : 1
    ));
    const rarityLevel = maxRarity === 4 ? 'legendary' : maxRarity === 3 ? 'rare' : maxRarity === 2 ? 'uncommon' : 'common';
    
    const sensoryProfile = generateSensoryDescription(sensoryIntensity, true, rarityLevel as any);
    const preparationIntensity = sensoryIntensity === 'vibrant' ? 'masterful' : sensoryIntensity;
    const preparationNarrative = generatePreparationNarrative(technique.name, preparationIntensity);

    const templateData: ProseTemplateData = {
      ingredients,
      technique,
      legendaryContext,
      techniqueLore,
      ingredientSynergy,
      festivalContext,
      sensoryProfile,
      preparationNarrative
    };

    // Check if this should use legendary/mythic prose style
    const isRare = maxRarity >= 3;
    if (hasLegendary || isRare) {
      return {
        templateType: TemplateType.MYTH_LED, // Force mythic style for legendary/rare
        templateData
      };
    }
    
    // Combinatorial template logic - randomize structure order for common dishes
    const templateType = Math.floor(Math.random() * 4) as TemplateType;
    
    return {
      templateType,
      templateData
    };
  }

  /**
   * Finds legendary ingredient context for special lore handling
   */
  private findLegendaryIngredient(ingredientNames: string[]): any {
    for (const ingredientName of ingredientNames) {
      const context = getLegendaryIngredientContext(ingredientName);
      if (context) {
        return context;
      }
    }
    return null;
  }

  /**
   * Checks if wildcard events should be applied based on dish counter
   */
  shouldApplyWildcard(): boolean {
    return this.dishCounter % 3 === 0 || this.dishCounter % 5 === 0;
  }

  /**
   * Gets current dish generation counter
   */
  getDishCounter(): number {
    return this.dishCounter;
  }

  /**
   * Resets dish counter for new generation batch
   */
  reset(): void {
    this.dishCounter = 0;
  }
} 