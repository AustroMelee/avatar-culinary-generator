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
   * Generates enhanced description with sophisticated patterns for 5-star quality
   * Eliminates repetitive structures and adds cultural depth
   */
  private generateEnhancedDescription(
    ingredients: AirNomadIngredient[], 
    technique: AirNomadCookingTechnique
  ): string {
    const mainIngredient = ingredients.find(ing => ing.role === 'base') || ingredients[0];
    const rareIngredient = ingredients.find(ing => ing.rarity === 'legendary' || ing.rarity === 'rare');
    
    // Enhanced focus fragments with cultural depth
    const focusFragments = [
      'each morsel flows like wind through prayer flags, light and meaningful',
      'the preparation creates moments of perfect presence and mindful awareness',
      'cooking creates a symphony like rain on temple roof tiles',
      'the technique reveals hidden flavors that dance on the palate',
      'each ingredient finds its perfect place in the harmonious whole',
      'the process awakens natural flavors that nourish the soul',
      'the method transforms simple elements into something transcendent',
      'the preparation honors the spiritual path of nourishment',
      'the technique embodies the wisdom of ancient culinary traditions',
      'the process creates a bridge between earthly sustenance and spiritual nourishment',
      'the cooking method reveals the hidden potential within each component',
      'the technique ensures every bite carries the essence of mindful preparation',
      'the process transforms ordinary ingredients into extraordinary experiences',
      'the method celebrates the harmony between technique and intuition',
      'the technique honors the natural properties of each element',
      'the preparation creates a perfect balance of flavors and textures',
      'the method demonstrates the art of mindful food preparation',
      'the technique reveals the wisdom embedded in ancient practices',
      'the process honors the sacred nature of nourishment',
      'the method creates harmony between tradition and innovation',
      'the technique ensures every element works in perfect harmony',
      'the preparation reveals the hidden beauty of simple ingredients',
      'the method creates moments of perfect culinary balance',
      'the technique honors the sacred art of food preparation',
      'the process transforms humble ingredients into divine nourishment',
      'the technique reveals the hidden potential of each ingredient',
      'the method creates a symphony of flavors and textures',
      'the process honors the wisdom of ancient cooking methods',
      'the technique ensures perfect balance in every aspect',
      'the method reveals the essence of mindful preparation'
    ];
    
    const focusFragment = this.fragmentCache.selectUniqueFragment(focusFragments);
    
    // SOPHISTICATED FIRST SENTENCE PATTERNS for 5-star quality
    const firstSentencePatterns = rareIngredient 
      ? [
          `This sacred creation features ${rareIngredient.name}, where ${focusFragment}.`,
          `A transcendent dish showcases the mystical ${rareIngredient.name}, where ${focusFragment}.`,
          `The legendary ${rareIngredient.name} takes center stage in this dish, where ${focusFragment}.`,
          `This divine offering highlights the rare ${rareIngredient.name}, where ${focusFragment}.`,
          `A blessed preparation celebrates the extraordinary ${rareIngredient.name}, where ${focusFragment}.`,
          `This holy creation honors the sacred ${rareIngredient.name}, where ${focusFragment}.`,
          `A spiritual dish reveals the mystical ${rareIngredient.name}, where ${focusFragment}.`,
          `This consecrated preparation features the divine ${rareIngredient.name}, where ${focusFragment}.`,
          `This sacred dish showcases the legendary ${rareIngredient.name}, where ${focusFragment}.`,
          `A divine creation honors the mystical ${rareIngredient.name}, where ${focusFragment}.`
        ]
      : [
          `A masterful blend of ${mainIngredient.name} and complementary ingredients creates a dish where ${focusFragment}.`,
          `This harmonious preparation combines ${mainIngredient.name} with carefully selected companions, where ${focusFragment}.`,
          `The gentle art of combining ${mainIngredient.name} with supporting elements yields a dish where ${focusFragment}.`,
          `Through mindful selection, ${mainIngredient.name} joins with other ingredients to create a dish where ${focusFragment}.`,
          `This carefully crafted dish brings together ${mainIngredient.name} and complementary flavors, where ${focusFragment}.`,
          `A thoughtful composition of ${mainIngredient.name} and harmonious elements produces a dish where ${focusFragment}.`,
          `The sacred practice of combining ${mainIngredient.name} with other ingredients results in a dish where ${focusFragment}.`,
          `This mindful creation unites ${mainIngredient.name} with carefully chosen companions, where ${focusFragment}.`,
          `A balanced preparation of ${mainIngredient.name} and supporting ingredients creates a dish where ${focusFragment}.`,
          `This refined combination of ${mainIngredient.name} and complementary elements forms a dish where ${focusFragment}.`,
          `A skillful blend of ${mainIngredient.name} and other ingredients creates a dish where ${focusFragment}.`,
          `This elegant preparation of ${mainIngredient.name} with supporting elements produces a dish where ${focusFragment}.`,
          `A mindful combination of ${mainIngredient.name} and harmonious ingredients creates a dish where ${focusFragment}.`,
          `This artful blend of ${mainIngredient.name} with complementary elements forms a dish where ${focusFragment}.`,
          `A careful selection of ${mainIngredient.name} and supporting ingredients creates a dish where ${focusFragment}.`,
          `This spiritual preparation of ${mainIngredient.name} with sacred elements creates a dish where ${focusFragment}.`,
          `A divine combination of ${mainIngredient.name} and blessed ingredients creates a dish where ${focusFragment}.`,
          `This holy blend of ${mainIngredient.name} with consecrated elements forms a dish where ${focusFragment}.`,
          `This sacred preparation of ${mainIngredient.name} with spiritual elements creates a dish where ${focusFragment}.`,
          `A blessed combination of ${mainIngredient.name} and divine ingredients creates a dish where ${focusFragment}.`
        ];
    
    const firstSentence = this.randomChoice(firstSentencePatterns);
    
    // SOPHISTICATED SECOND SENTENCE PATTERNS for 5-star quality
    const secondSentencePatterns = [
      `Through ${technique.name.toLowerCase()}, the harmony achieves perfect balance, nourishing both body and spirit.`,
      `The ${technique.name.toLowerCase()} method transforms these ingredients into a harmonious whole that sustains the soul.`,
      `Using the ancient ${technique.name.toLowerCase()} technique, each element finds its perfect place in the final creation.`,
      `The ${technique.name.toLowerCase()} process awakens the natural flavors, creating a dish that feeds both hunger and spirit.`,
      `Through careful ${technique.name.toLowerCase()}, the ingredients unite in a symphony of taste and texture.`,
      `The ${technique.name.toLowerCase()} method reveals the hidden potential within each component.`,
      `Applying the ${technique.name.toLowerCase()} technique, the dish emerges as a testament to Air Nomad culinary wisdom.`,
      `The ${technique.name.toLowerCase()} process ensures every bite carries the essence of mindful preparation.`,
      `Through the ${technique.name.toLowerCase()} method, simple ingredients become something transcendent.`,
      `The ${technique.name.toLowerCase()} technique honors the natural properties of each element.`,
      `This ${technique.name.toLowerCase()} approach creates a bridge between tradition and innovation.`,
      `The ${technique.name.toLowerCase()} method embodies the patience and precision of monastic cooking.`,
      `Through ${technique.name.toLowerCase()}, the dish becomes a meditation on the art of nourishment.`,
      `The ${technique.name.toLowerCase()} technique transforms ordinary ingredients into extraordinary experiences.`,
      `This ${technique.name.toLowerCase()} process celebrates the harmony between technique and intuition.`,
      `The ${technique.name.toLowerCase()} method reveals the wisdom embedded in ancient culinary practices.`,
      `Through ${technique.name.toLowerCase()}, each ingredient contributes to a greater whole.`,
      `The ${technique.name.toLowerCase()} technique demonstrates the art of mindful food preparation.`,
      `This ${technique.name.toLowerCase()} process honors the sacred nature of nourishment.`,
      `The ${technique.name.toLowerCase()} method creates a perfect balance of flavors and textures.`,
      `The ${technique.name.toLowerCase()} technique ensures every element works in perfect harmony.`,
      `Through ${technique.name.toLowerCase()}, the dish achieves its full potential.`,
      `The ${technique.name.toLowerCase()} method creates a symphony of flavors and textures.`,
      `This ${technique.name.toLowerCase()} process transforms simple ingredients into culinary art.`,
      `The ${technique.name.toLowerCase()} technique honors the wisdom of ancient cooking methods.`,
      `The ${technique.name.toLowerCase()} method reveals the sacred nature of food preparation.`,
      `Through ${technique.name.toLowerCase()}, the dish becomes a celebration of culinary wisdom.`,
      `The ${technique.name.toLowerCase()} technique creates harmony between all elements.`,
      `This ${technique.name.toLowerCase()} process honors the divine nature of nourishment.`,
      `The ${technique.name.toLowerCase()} method ensures perfect balance in every aspect.`,
      `Through ${technique.name.toLowerCase()}, the dish embodies culinary excellence.`,
      `The ${technique.name.toLowerCase()} technique reveals the hidden potential of ingredients.`,
      `This ${technique.name.toLowerCase()} process creates moments of perfect harmony.`,
      `The ${technique.name.toLowerCase()} method honors the sacred art of cooking.`,
      `Through ${technique.name.toLowerCase()}, the dish becomes a work of culinary art.`,
      `The ${technique.name.toLowerCase()} technique ensures every bite is perfect.`,
      `This ${technique.name.toLowerCase()} process creates a symphony of flavors.`,
      `The ${technique.name.toLowerCase()} method reveals the essence of mindful cooking.`,
      `The ${technique.name.toLowerCase()} technique creates perfect harmony in every element.`,
      `Through ${technique.name.toLowerCase()}, the dish achieves culinary perfection.`,
      `The ${technique.name.toLowerCase()} method honors the wisdom of ancient traditions.`,
      `This ${technique.name.toLowerCase()} process creates divine nourishment.`,
      `The ${technique.name.toLowerCase()} technique reveals the sacred nature of ingredients.`
    ];
    
    const secondSentence = this.randomChoice(secondSentencePatterns);
    
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
   * Enhanced with sophisticated cultural patterns for 5-star quality
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
    
    // SOPHISTICATED LORE ENDINGS for 5-star cultural depth
    const loreEndings = [
      `At the ${selectedTemple}, this dish strengthens community bonds and honors tradition.`,
      `This recipe connects generations of Air Nomad wisdom at the ${selectedTemple}.`,
      `The ${selectedTemple} preserves this preparation as a form of active meditation.`,
      `Monks at the ${selectedTemple} cherish this dish for its spiritual significance.`,
      `The ${selectedTemple} tradition holds this recipe as a bridge between past and present.`,
      `This dish embodies the ${selectedTemple}'s commitment to mindful nourishment.`,
      `The ${selectedTemple} serves this preparation during moments of spiritual reflection.`,
      `This recipe represents the ${selectedTemple}'s dedication to culinary wisdom.`,
      `The ${selectedTemple} tradition celebrates this dish as a symbol of harmony.`,
      `This preparation honors the ${selectedTemple}'s ancient culinary heritage.`,
      `The ${selectedTemple} monks prepare this dish as an offering to spiritual growth.`,
      `This recipe reflects the ${selectedTemple}'s philosophy of mindful living.`,
      `The ${selectedTemple} tradition views this dish as a meditation on nourishment.`,
      `This preparation embodies the ${selectedTemple}'s reverence for natural ingredients.`,
      `The ${selectedTemple} serves this dish as a reminder of life's simple pleasures.`,
      `Monastic gatherings at the ${selectedTemple} strengthen bonds during shared meals.`,
      `The ${selectedTemple} tradition of celebrating this dish honors ancient wisdom.`,
      `This recipe represents the ${selectedTemple}'s time-honored custom of mindful preparation.`,
      `The ${selectedTemple} preserves this dish as a testament to spiritual nourishment.`,
      `This preparation reflects the ${selectedTemple}'s commitment to culinary excellence.`,
      `The ${selectedTemple} tradition honors this dish as a symbol of peace and harmony.`,
      `This recipe embodies the ${selectedTemple}'s dedication to mindful cooking.`,
      `The ${selectedTemple} serves this preparation as a celebration of culinary art.`,
      `This dish represents the ${selectedTemple}'s wisdom in food preparation.`,
      `The ${selectedTemple} tradition cherishes this recipe as a gift of nourishment.`,
      `This preparation honors the ${selectedTemple}'s commitment to spiritual growth.`,
      `The ${selectedTemple} monks view this dish as a meditation on sustenance.`,
      `This recipe reflects the ${selectedTemple}'s reverence for natural ingredients.`,
      `Temple family gatherings at the ${selectedTemple} strengthen community bonds.`,
      `The ${selectedTemple} tradition honors this dish as a symbol of unity.`,
      `This recipe represents the ${selectedTemple}'s dedication to spiritual nourishment.`,
      `The ${selectedTemple} monks celebrate this dish as a gift of wisdom.`,
      `This preparation embodies the ${selectedTemple}'s commitment to harmony.`,
      `The ${selectedTemple} tradition views this dish as a meditation on community.`,
      `This recipe honors the ${selectedTemple}'s ancient culinary wisdom.`,
      `The ${selectedTemple} serves this dish as a celebration of spiritual growth.`,
      `This preparation reflects the ${selectedTemple}'s reverence for mindful cooking.`,
      `The ${selectedTemple} tradition cherishes this dish as a symbol of peace.`
    ];
    
    const selectedEnding = this.randomChoice(loreEndings);
    
    return `${baseFragment} ${selectedEnding}`;
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