import { 
  AirNomadIngredient, 
  AirNomadCookingTechnique
} from '../types.js';
import { FragmentCache } from './prose/fragment-cache.js';
import { TemplateSelector, TemplateType } from './prose/template-selector.js';
import { ProseTemplates } from './prose/prose-templates.js';

/**
 * ENHANCED DESCRIPTION FRAGMENT SETS - Expanded sensory-focused templates
 * Provides rich variety in description generation with multiple variants per slot
 */
const TEXTURE_FOCUSED_FRAGMENTS = [
  'each grain pops like a trapped cloud, releasing bursts of flavor',
  'the texture dances between silk and starlight, ethereal yet grounding',
  'every bite dissolves like morning mist, leaving essence behind',
  'the surface crackles with temple energy, tender within like meditation',
  'each morsel flows like wind through prayer flags, light and meaningful',
  'the consistency shifts like changing seasons, complex and harmonious'
];

const AROMA_FOCUSED_FRAGMENTS = [
  'lemongrass wafts like distant thunder, awakening ancient memories',
  'mountain spices spiral upward like incense smoke from temple altars',
  'the scent carries whispers of high peaks and sacred gardens',
  'fragrance blooms like dawn over temple spires, pure and inspiring',
  'aromatic vapors dance like sky bison on invisible currents',
  'the bouquet unfolds like prayer scrolls, revealing hidden wisdom'
];

const TEMPERATURE_FOCUSED_FRAGMENTS = [
  'warmth lingers on your tongue like sunset rays through temple windows',
  'coolness spreads like mountain stream water, refreshing the spirit',
  'heat builds slowly like meditation fire, warming from within',
  'temperature flows like breathing, rhythmic and perfectly balanced',
  'gentle warmth embraces like temple robes in winter wind',
  'cooling sensation washes like morning mist across temple courtyards'
];

const VISUAL_FOCUSED_FRAGMENTS = [
  'colors shift like Aurora Borealis dancing above the temples',
  'the presentation gleams like polished prayer wheels in candlelight',
  'hues flow together like watercolors in temple manuscript illumination',
  'the appearance radiates like stained glass filtering divine light',
  'visual harmony reflects like still temple pools at twilight',
  'the sight enchants like floating lanterns during festivals'
];

const SOUND_FOCUSED_FRAGMENTS = [
  'preparation whispers like wind chimes in gentle temple breezes',
  'cooking sounds echo like distant temple bells across valleys',
  'the sizzle harmonizes like monks chanting in perfect unison',
  'preparation resonates like prayer bowls struck at sunset',
  'cooking creates symphony like rain on temple roof tiles',
  'the process hums like sacred mantras carried on mountain air'
];

const EMOTIONAL_FOCUSED_FRAGMENTS = [
  'each taste awakens memories of childhood temple festivals',
  'the experience connects diners to something greater than themselves',
  'flavors resonate with the peaceful heart of Air Nomad philosophy',
  'the meal creates moments of perfect presence and mindful awareness',
  'consumption becomes meditation, transforming simple eating into reverence',
  'each bite deepens connection to the ancient wisdom of the temples'
];

/**
 * BITE-SIZED LORE OPTIONS - Streamlined cultural lore for lighter reading
 * Provides quick cultural context without overwhelming prose density
 */
const LIGHT_LORE_FRAGMENTS = [
  'Temple tradition honors simplicity',
  'Monks prepare this mindfully',
  'Ancient recipe brings peace',
  'Sacred ingredients blessed daily',
  'Community dish shared lovingly',
  'Traditional temple meal',
  'Spiritual nourishment provided',
  'Meditation-inspired cooking',
  'Harmony in every portion',
  'Blessed temple preparation'
];

const MODERATE_LORE_FRAGMENTS = [
  'This recipe connects generations of Air Nomad wisdom',
  'Temple elders pass down preparation secrets through centuries',
  'Sacred cooking methods honor the spiritual path of nourishment',
  'Community gathering strengthens bonds through shared meals',
  'Meditation and mindfulness guide every step of preparation',
  'Ancient traditions live on in temple kitchen practices'
];

/**
 * Main prose composition engine for Air Nomad dish descriptions
 * Orchestrates template selection, fragment caching, and prose generation
 * Uses modular architecture to eliminate global state and ensure maintainability
 */
export class ProseComposer {
  private fragmentCache: FragmentCache;
  private templateSelector: TemplateSelector;
  private loreIntensity: 'light' | 'moderate' | 'deep';

  constructor(loreIntensity: 'light' | 'moderate' | 'deep' = 'moderate') {
    this.fragmentCache = new FragmentCache();
    this.templateSelector = new TemplateSelector();
    this.loreIntensity = loreIntensity;
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
   * ENHANCED: Composes separate description and lore sections with intensity control
   * Each section is limited based on lore intensity setting for optimal readability
   */
  composeDescriptionAndLore(
    ingredients: AirNomadIngredient[], 
    technique: AirNomadCookingTechnique
  ): { description: string; lore: string } {
    try {
      const description = this.generateEnhancedDescription(ingredients, technique);
      const lore = this.generateContextualLore(ingredients, technique);
      
      return { description, lore };
    } catch (error) {
      throw new Error(`ProseComposer.composeDescriptionAndLore: Failed to compose separate sections - ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * NEW: Generates enhanced descriptions using expanded fragment sets
   * Rotates between texture, aroma, temperature, visual, sound, and emotional focus
   */
  private generateEnhancedDescription(
    ingredients: AirNomadIngredient[], 
    technique: AirNomadCookingTechnique
  ): string {
    const mainIngredient = ingredients.find(ing => ing.role === 'base') || ingredients[0];
    const rareIngredient = ingredients.find(ing => ing.rarity === 'legendary' || ing.rarity === 'rare');
    
    // Rotate focus types to ensure variety
    const focusTypes = ['texture', 'aroma', 'temperature', 'visual', 'sound', 'emotional'];
    const selectedFocus = this.randomChoice(focusTypes);
    
    let focusFragment = '';
    switch (selectedFocus) {
      case 'texture':
        focusFragment = this.fragmentCache.selectUniqueFragment(TEXTURE_FOCUSED_FRAGMENTS);
        break;
      case 'aroma':
        focusFragment = this.fragmentCache.selectUniqueFragment(AROMA_FOCUSED_FRAGMENTS);
        break;
      case 'temperature':
        focusFragment = this.fragmentCache.selectUniqueFragment(TEMPERATURE_FOCUSED_FRAGMENTS);
        break;
      case 'visual':
        focusFragment = this.fragmentCache.selectUniqueFragment(VISUAL_FOCUSED_FRAGMENTS);
        break;
      case 'sound':
        focusFragment = this.fragmentCache.selectUniqueFragment(SOUND_FOCUSED_FRAGMENTS);
        break;
      case 'emotional':
        focusFragment = this.fragmentCache.selectUniqueFragment(EMOTIONAL_FOCUSED_FRAGMENTS);
        break;
    }
    
    // First sentence: ingredient introduction with focus element
    const firstSentence = rareIngredient 
      ? `This sacred creation features ${rareIngredient.name}, where ${focusFragment}.`
      : `A masterful blend of ${mainIngredient.name} and complementary ingredients creates a dish where ${focusFragment}.`;
    
    // Second sentence: technique and result
    const secondSentence = `Through ${technique.name.toLowerCase()}, the harmony achieves perfect balance, nourishing both body and spirit.`;
    
    return `${firstSentence} ${secondSentence}`;
  }

  /**
   * NEW: Generates contextual lore based on intensity setting
   * Provides appropriate cultural depth without overwhelming the description
   */
  private generateContextualLore(
    ingredients: AirNomadIngredient[], 
    technique: AirNomadCookingTechnique
  ): string {
    const rareIngredient = ingredients.find(ing => ing.rarity === 'legendary' || ing.rarity === 'rare');
    const isLegendary = ingredients.some(ing => ing.rarity === 'legendary');
    
    switch (this.loreIntensity) {
      case 'light':
        return this.generateLightLore(rareIngredient, isLegendary);
      
      case 'moderate':
        return this.generateModerateLore(ingredients, technique, rareIngredient, isLegendary);
      
      case 'deep':
        return this.generateDeepLore(ingredients, technique, rareIngredient, isLegendary);
      
      default:
        return this.generateModerateLore(ingredients, technique, rareIngredient, isLegendary);
    }
  }

  /**
   * Generates bite-sized lore (10-15 words) for quick reads
   */
  private generateLightLore(rareIngredient?: AirNomadIngredient, isLegendary?: boolean): string {
    if (isLegendary) {
      const legendaryLore = [
        'Sacred recipe whispered among the highest temple masters.',
        'Ancient dish blessed by Avatar Yangchen herself.',
        'Mystical preparation reserved for spiritual awakenings.'
      ];
      return this.randomChoice(legendaryLore);
    }
    
    return this.fragmentCache.selectUniqueFragment(LIGHT_LORE_FRAGMENTS);
  }

  /**
   * Generates moderate lore (15-25 words) for balanced cultural context
   */
  private generateModerateLore(
    ingredients: AirNomadIngredient[], 
    technique: AirNomadCookingTechnique,
    rareIngredient?: AirNomadIngredient, 
    isLegendary?: boolean
  ): string {
    if (isLegendary) {
      return 'Ancient texts speak of this sacred recipe, prepared only when the stars align with temple spires. Those who partake are blessed with profound spiritual insights.';
    }
    
    const baseFragment = this.fragmentCache.selectUniqueFragment(MODERATE_LORE_FRAGMENTS);
    const temples = ['Eastern Air Temple', 'Western Air Temple', 'Northern Air Temple', 'Southern Air Temple'];
    const selectedTemple = this.randomChoice(temples);
    
    return `${baseFragment} At the ${selectedTemple}, this dish strengthens community bonds and honors tradition.`;
  }

  /**
   * Generates deep lore (25-50 words) for full cultural immersion
   */
  private generateDeepLore(
    ingredients: AirNomadIngredient[], 
    technique: AirNomadCookingTechnique,
    rareIngredient?: AirNomadIngredient, 
    isLegendary?: boolean
  ): string {
    // Use existing deep lore generation from generateTwoSentenceLore
    return this.generateTwoSentenceLore(ingredients, technique);
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
   * NEW: Sets lore intensity for future generations
   */
  setLoreIntensity(intensity: 'light' | 'moderate' | 'deep'): void {
    this.loreIntensity = intensity;
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