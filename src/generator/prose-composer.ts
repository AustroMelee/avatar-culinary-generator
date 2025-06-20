import { 
  AirNomadIngredient, 
  AirNomadCookingTechnique
} from '../types.js';
import { FragmentCache } from './prose/fragment-cache.js';
import { TemplateSelector, TemplateType } from './prose/template-selector.js';
import { ProseTemplates } from './prose/prose-templates.js';

/**
 * Main prose composition engine for Air Nomad dish descriptions
 * Orchestrates template selection, fragment caching, and prose generation
 * Uses modular architecture to eliminate global state and ensure maintainability
 */
export class ProseComposer {
  private fragmentCache: FragmentCache;
  private templateSelector: TemplateSelector;

  constructor() {
    this.fragmentCache = new FragmentCache();
    this.templateSelector = new TemplateSelector();
  }

  /**
   * Composes natural, varied prose description for an Air Nomad dish
   * Handles legendary/rare dishes with mythic treatment and standard dishes with varied patterns
   */
  composeDishDescription(
    ingredients: AirNomadIngredient[], 
    technique: AirNomadCookingTechnique
  ): string {
    try {
      // Select appropriate template and gather data
      const { templateType, templateData } = this.templateSelector.selectTemplate(
        ingredients, 
        technique, 
        this.fragmentCache
      );

      // Generate prose using selected template
      let description = this.generateProseByTemplate(templateType, templateData);

      // Apply wildcard events for structural variety (every 3rd-5th dish)
      if (this.templateSelector.shouldApplyWildcard()) {
        description = this.fragmentCache.insertWildcardEvent(description);
      }

      return description;
    } catch (error) {
      throw new Error(`ProseComposer.composeDishDescription: Failed to compose description - ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generates prose using the selected template type
   */
  private generateProseByTemplate(templateType: TemplateType, templateData: any): string {
    switch (templateType) {
      case TemplateType.TRADITIONAL:
        return ProseTemplates.composeTraditionalTemplate(templateData, this.fragmentCache);
      
      case TemplateType.FESTIVAL_FIRST:
        return ProseTemplates.composeFestivalFirstTemplate(templateData, this.fragmentCache);
      
      case TemplateType.MYTH_LED:
        return ProseTemplates.composeMythLedTemplate(templateData, this.fragmentCache);
      
      case TemplateType.INGREDIENT_FOCUSED:
        return ProseTemplates.composeIngredientFocusedTemplate(templateData, this.fragmentCache);
      
      default:
        return ProseTemplates.composeTraditionalTemplate(templateData, this.fragmentCache);
    }
  }

  /**
   * Resets internal state for new generation batch
   */
  reset(): void {
    this.fragmentCache.reset();
    this.templateSelector.reset();
  }

  /**
   * Soft reset - reduces cache sensitivity without full clear
   */
  softReset(): void {
    this.fragmentCache.softReset();
  }

  /**
   * Gets current dish generation counter for debugging
   */
  getDishCounter(): number {
    return this.templateSelector.getDishCounter();
  }
}

/**
 * Global prose composer instance for backward compatibility
 * Maintains single instance to preserve cross-dish novelty tracking
 */
const globalProseComposer = new ProseComposer();

/**
 * Main entry point for dish description composition
 * Maintains backward compatibility with existing code while using new architecture
 */
export function composeDishDescription(
  ingredients: AirNomadIngredient[], 
  technique: AirNomadCookingTechnique
): string {
  return globalProseComposer.composeDishDescription(ingredients, technique);
}

/**
 * Resets global composer state for new generation batch
 */
export function resetProseComposer(): void {
  globalProseComposer.reset();
}

/**
 * Soft reset for global composer
 */
export function softResetProseComposer(): void {
  globalProseComposer.softReset();
} 