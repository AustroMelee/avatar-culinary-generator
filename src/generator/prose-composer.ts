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
   * Composes separate description and lore sections for Air Nomad dishes
   * Each section is limited to 2 sentences for readability
   */
  composeDescriptionAndLore(
    ingredients: AirNomadIngredient[], 
    technique: AirNomadCookingTechnique
  ): { description: string; lore: string } {
    try {
      const description = this.generateTwoSentenceDescription(ingredients, technique);
      const lore = this.generateTwoSentenceLore(ingredients, technique);
      
      return { description, lore };
    } catch (error) {
      throw new Error(`ProseComposer.composeDescriptionAndLore: Failed to compose separate sections - ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generates a concise 2-sentence description focusing on sensory and preparation details
   */
  private generateTwoSentenceDescription(
    ingredients: AirNomadIngredient[], 
    technique: AirNomadCookingTechnique
  ): string {
    const mainIngredient = ingredients.find(ing => ing.role === 'base') || ingredients[0];
    const rareIngredient = ingredients.find(ing => ing.rarity === 'legendary' || ing.rarity === 'rare');
    
    // Visual and aroma descriptors
    const visuals = ['ethereal', 'golden', 'cloud-like', 'pristine', 'radiant', 'delicate', 'luminous'];
    const aromas = ['fragrant', 'aromatic', 'soul-stirring', 'mystical', 'enchanting', 'peaceful', 'harmonious'];
    const textures = ['silky', 'tender', 'perfectly balanced', 'light yet satisfying', 'harmoniously textured'];
    
    const visual = this.randomChoice(visuals);
    const aroma = this.randomChoice(aromas);
    const texture = this.randomChoice(textures);
    
    // First sentence: appearance and aroma
    const firstSentence = rareIngredient 
      ? `This ${visual} creation features the sacred ${rareIngredient.name}, releasing ${aroma} vapors that awaken the senses.`
      : `A ${visual} dish showcasing ${mainIngredient.name}, with ${aroma} aromas that drift like mountain mist.`;
    
    // Second sentence: technique and texture
    const secondSentence = `${technique.name} with mindful attention creates a ${texture} experience that nourishes both body and spirit.`;
    
    return `${firstSentence} ${secondSentence}`;
  }

  /**
   * Generates a concise 2-sentence lore section focusing on cultural and historical context
   */
  private generateTwoSentenceLore(
    ingredients: AirNomadIngredient[], 
    technique: AirNomadCookingTechnique
  ): string {
    const rareIngredient = ingredients.find(ing => ing.rarity === 'legendary' || ing.rarity === 'rare');
    const isLegendary = ingredients.some(ing => ing.rarity === 'legendary');
    
    // Cultural contexts
    const temples = ['Eastern Air Temple', 'Western Air Temple', 'Northern Air Temple', 'Southern Air Temple'];
    const monks = ['wandering monks', 'temple elders', 'young acolytes', 'meditation masters'];
    const occasions = ['spiritual gatherings', 'seasonal celebrations', 'meditation retreats', 'wisdom teachings'];
    const qualities = ['inner peace', 'spiritual clarity', 'chakra alignment', 'connection to the spirit world'];
    
    const temple = this.randomChoice(temples);
    const monk = this.randomChoice(monks);
    const occasion = this.randomChoice(occasions);
    const quality = this.randomChoice(qualities);
    
    // Generate lore based on rarity
    if (isLegendary) {
      const legendaryContexts = [
        `Ancient texts speak of this sacred recipe, whispered only among the highest masters of the ${temple}.`,
        `Legend holds that this dish was first prepared by Avatar Yangchen during a profound spiritual revelation.`,
        `This mystical creation is said to have been gifted to the Air Nomads by the spirit world itself.`
      ];
      
      const spiritualEffects = [
        `Those who partake are blessed with glimpses of past lives and enhanced ${quality}.`,
        `It is believed to open doorways between the physical and spirit worlds, granting profound ${quality}.`,
        `Consumption during meditation is said to unlock the deepest mysteries of airbending and ${quality}.`
      ];
      
      return `${this.randomChoice(legendaryContexts)} ${this.randomChoice(spiritualEffects)}`;
    } else if (rareIngredient) {
      return `This treasured recipe was traditionally prepared by ${monk} for special ${occasion}, using ingredients gathered with great reverence. The dish is cherished for its ability to promote ${quality} and strengthen bonds within the Air Nomad community.`;
    } else {
      return `A beloved dish commonly shared among ${monk} during ${occasion}, representing the Air Nomad values of simplicity and mindfulness. Its preparation serves as a meditation in itself, fostering ${quality} and communal harmony.`;
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
   * Simple random choice helper
   */
  private randomChoice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
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
 * Composes separate description and lore sections for better readability
 * Each section is limited to 2 sentences for optimal user experience
 */
export function composeDescriptionAndLore(
  ingredients: AirNomadIngredient[], 
  technique: AirNomadCookingTechnique
): { description: string; lore: string } {
  return globalProseComposer.composeDescriptionAndLore(ingredients, technique);
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