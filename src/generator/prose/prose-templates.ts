// Types imported in ProseTemplateData interface
import { FragmentCache } from './fragment-cache.js';
import type { ProseTemplateData } from './template-selector.js';

/**
 * Template composition functions for different prose structures
 * Each template creates a different narrative flow and focus
 */
export class ProseTemplates {
  
  /**
   * Traditional template structure: Opening → Sensory → Emotional → Serving
   */
  static composeTraditionalTemplate(data: ProseTemplateData, cache: FragmentCache): string {
    
    const openingHooks = ProseTemplates.generateOpeningHooks(data, cache);
    const sensoryIntegration = ProseTemplates.generateSensoryIntegration(data, cache);
    const emotionalResonance = ProseTemplates.generateEmotionalResonance(data, cache);
    const servingContext = ProseTemplates.generateServingContext(data, cache);
    
    return ProseTemplates.weaveProseElements(openingHooks, sensoryIntegration, emotionalResonance, servingContext, cache);
  }

  /**
   * Festival-first template: Opens with cultural context
   */
  static composeFestivalFirstTemplate(data: ProseTemplateData, cache: FragmentCache): string {
    const ingredientNames = data.ingredients.map(ing => ing.name);
    
    // Start with festival context
    const festivalOpening = ProseTemplates.generateServingContext(data, cache);
    
    // Follow with ingredient introduction
    const ingredientIntro = `${ingredientNames[0]} and ${ingredientNames.slice(1, 3).join(', ')} are ${data.technique.name.toLowerCase()} with reverent precision`;
    
    // Add sensory development
    const sensoryDevelopment = ProseTemplates.generateSensoryIntegration(data, cache);
    
    // Close with spiritual impact
    const spiritualImpact = ProseTemplates.generateEmotionalResonance(data, cache);
    
    return `${festivalOpening}. Here, ${ingredientIntro}, creating ${sensoryDevelopment}. ${spiritualImpact}.`;
  }

  /**
   * Myth-led template: Opens with lore and legend (used for legendary/rare dishes)
   */
  static composeMythLedTemplate(data: ProseTemplateData, cache: FragmentCache): string {
    const ingredientNames = data.ingredients.map(ing => ing.name);
    
    // Use legendary paragraph logic for rare/legendary dishes
    if (data.legendaryContext || data.ingredients.some(ing => ing.rarity === 'legendary' || ing.rarity === 'rare')) {
      return ProseTemplates.composeLegendaryParagraph(data, cache);
    }
    
    // Start with mythic elements for standard dishes
    const mythicOpeners = [
      `Ancient scrolls speak of a time when ${ingredientNames[0]} held the power to bridge worlds`,
      `Legend has it that Avatar Yangchen first discovered the harmony between ${ingredientNames[0]} and ${ingredientNames[1]}`,
      `The traveling monks whisper of ${data.technique.name.toLowerCase()} techniques that transform simple ingredients into spiritual sustenance`,
      `In the highest meditation chambers, masters debate whether ${ingredientNames[0]} chooses its moment or is chosen by fate`
    ];
    
    const mythicOpening = cache.selectUniqueFragment(mythicOpeners);
    
    // Follow with technique application
    const techniqueApplication = `Through the ${data.technique.name.toLowerCase()} method, these ingredients ${data.sensoryProfile.texture && data.sensoryProfile.texture.includes('transcend') ? 'transcend their earthly form' : 'achieve perfect harmony'}`;
    
    // Add sensory revelation
    const sensoryRevelation = `revealing ${data.sensoryProfile.taste} that ${data.sensoryProfile.emotionalResonance?.spiritual || 'awakens the soul to deeper truths'}`;
    
    // Close with serving context
    const servingContext = ProseTemplates.generateServingContext(data, cache);
    
    return `${mythicOpening}. ${techniqueApplication}, ${sensoryRevelation}. ${servingContext}.`;
  }

  /**
   * Ingredient-focused template: Highlights the ingredients' properties and origins
   */
  static composeIngredientFocusedTemplate(data: ProseTemplateData, cache: FragmentCache): string {
    const ingredientNames = data.ingredients.map(ing => ing.name);
    const mainIngredient = ingredientNames[0];
    
    // Start with ingredient origins and properties
    const ingredientFocus = `From the sacred groves where ${mainIngredient} grows in harmony with ${ingredientNames.slice(1, 3).join(' and ')}, temple cooks gather only the finest specimens`;
    
    // Add cultural context
    const culturalContext = `Each ingredient carries the blessing of mountain winds and temple prayers, chosen for their ability to ${data.technique.name.toLowerCase() === 'steam-whipped' ? 'achieve weightless perfection' : 'harmonize with ancient cooking wisdom'}`;
    
    // Technique application with results
    const techniqueResults = `The ${data.technique.name.toLowerCase()} technique draws forth ${data.sensoryProfile.taste}, creating ${data.sensoryProfile.texture}`;
    
    // Spiritual/emotional outcome
    const outcome = ProseTemplates.generateEmotionalResonance(data, cache);
    
    return `${ingredientFocus}. ${culturalContext}, and through careful preparation, the ${techniqueResults}. ${outcome}.`;
  }

  /**
   * Creates mythic, flowing paragraphs for legendary and rare dishes
   * Uses randomized fragments to prevent template repetition across dishes
   */
  static composeLegendaryParagraph(data: ProseTemplateData, cache: FragmentCache): string {
    const ingredientNames = data.ingredients.map(ing => ing.name);
    const mainIngredient = ingredientNames[0];
    const secondaryIngredient = data.legendaryContext?.ingredient || ingredientNames[1];
    
    // Randomized opening fragments
    const openingFragments = [
      `In the shadow of forgotten temples, ancient monks gathered ${mainIngredient} and ${secondaryIngredient}, seeking wisdom woven into the wind.`,
      `Beyond the reach of mortal kitchens, where ${mainIngredient} and ${secondaryIngredient} grow in sacred groves, the masters discovered flavors that echo across lifetimes.`,
      `From the highest peaks where wind-riders soar, ${mainIngredient} and ${secondaryIngredient} are gathered only when the stars align with temple spires.`,
      `In meditation halls carved from living rock, ${mainIngredient} and ${secondaryIngredient} were first blessed by Avatar Yangchen herself.`
    ];
    
    // Randomized legendary ingredient lore
    const legendaryFragments = data.legendaryContext ? [
      `It is said that only once each century does ${data.legendaryContext.ingredient} reveal its full power, releasing ${data.sensoryProfile.visual} as the aroma stirs memory from past lives.`,
      `Legend speaks of ${data.legendaryContext.ingredient} that appears only to those pure of heart, its ${data.sensoryProfile.visual} marking the presence of ancient spirits.`,
      `The mystical ${data.legendaryContext.ingredient} has been sought by sages for generations, its power awakening when blessed by mountain winds and starlight.`,
      `Master Tenzin taught that ${data.legendaryContext.ingredient} chooses its moment, revealing ${data.sensoryProfile.visual} that bridges the mortal and spirit worlds.`
    ] : [
      `Through mists that rise from sacred peaks, ${mainIngredient} transforms beneath the ${data.technique.name.toLowerCase()} technique, each moment a prayer whispered to eternity.`,
      `As temple bells ring across the valleys, ${mainIngredient} undergoes ${data.technique.name.toLowerCase()}, its essence awakening like incense smoke.`,
      `In the quiet hours before dawn, ${mainIngredient} is transformed through ${data.technique.name.toLowerCase()}, each step a meditation in itself.`,
      `With reverent hands, temple cooks apply the ${data.technique.name.toLowerCase()} technique to ${mainIngredient}, honoring traditions older than memory.`
    ];
    
    // Randomized taste experience fragments  
    const experienceFragments = [
      `Each bite is a silent prayer, every flavor a ripple across time.`,
      `Every taste becomes a meditation, each morsel carrying sacred intention.`,
      `Each portion holds divine reverence, every sensation touching the infinite.`,
      `Every flavor whispers ancient blessings, each taste echoing through eternity.`
    ];
    
    // Randomized texture/essence descriptions
    const essenceFragments = [
      `${data.sensoryProfile.taste} unfolds like ancient scrolls, while ${data.sensoryProfile.texture} grounds the soul in forgotten truths.`,
      `${data.sensoryProfile.taste} emerges like temple incense, while ${data.sensoryProfile.texture} connects the heart to timeless knowledge.`,
      `${data.sensoryProfile.taste} develops like distant thunder, while ${data.sensoryProfile.texture} awakens memories of sacred teachings.`,
      `${data.sensoryProfile.taste} blooms like mountain flowers, while ${data.sensoryProfile.texture} anchors the spirit in ancient wisdom.`
    ];
    
    // Randomized closing fragments with festival integration
    const selectedFestival = cache.selectUniqueFestival();
    const closingFragments = [
      `Legends insist this dish is prepared only during the ${selectedFestival}, as starlight falls through clouded peaks and the veil between worlds grows thin.`,
      `Created solely during the ${selectedFestival}, when reality seems to shimmer and bend beneath celestial influence.`,
      `Reserved for the sacred ${selectedFestival}, as the boundary between sacred and mundane dissolves into eternity.`,
      `Made only in honor of the ${selectedFestival}, when temporal boundaries blur and the material world fades into spirit.`,
      `No one leaves unchanged. The temple bells echo, and somewhere in the distance, sky bison call to their ancient kin.`,
      `Those who taste this dish carry its essence forever, their spirits marked by the touch of something eternal.`,
      `The memory lingers long after the meal ends, a gentle reminder of truths that transcend the material world.`,
      `In sharing this sacred food, bonds form that stretch across lifetimes, uniting all who seek the path of enlightenment.`
    ];
    
    const mythicFragments = [
      cache.selectUniqueFragment(openingFragments),
      cache.selectUniqueFragment(legendaryFragments),
      cache.selectUniqueFragment(experienceFragments) + ' ' + cache.selectUniqueFragment(essenceFragments),
      cache.selectUniqueFragment(closingFragments)
    ];
    
    // Add occasional sound integration for legendary dishes
    if (data.sensoryProfile.sound) {
      const soundFragments = [
        `The kitchen fills with ${data.sensoryProfile.sound}, a sound that monks say carries the voices of all who came before.`,
        `The cooking space resonates with ${data.sensoryProfile.sound}, echoes of ancient wisdom reverberating through temple halls.`,
        `The sacred space hums with ${data.sensoryProfile.sound}, whispers of ancestral knowledge flowing like mountain streams.`,
        `The preparation area vibrates with ${data.sensoryProfile.sound}, a gentle reminder of the countless meals prepared in devotion.`
      ];
      mythicFragments.splice(2, 0, cache.selectUniqueFragment(soundFragments));
    }
    
    return mythicFragments.filter(Boolean).join(' ');
  }

  /**
   * Generates varied opening hooks based on dish significance and lore
   */
  private static generateOpeningHooks(data: ProseTemplateData, cache: FragmentCache): string {
    const ingredientNames = data.ingredients.map(ing => ing.name);
    const mainIngredient = ingredientNames[0];
    
    // Add occasional lore snippets (1 in 3 chance)
    const addLoreSnippet = Math.random() < 0.33;
    let loreSnippet = '';
    
    if (addLoreSnippet) {
      const loreSnippets = [
        `Legend has it that Avatar Yangchen first prepared this dish during a diplomatic summit between the four nations. `,
        `Monk Gyatso once broke a month-long meditation silence with a single spoonful of this sacred preparation. `,
        `Ancient texts speak of sky bison gathering whenever this dish is prepared in the high temples. `,
        `Master Tenzin taught that this recipe carries the wisdom of a thousand generations of Air Nomads. `,
        `The traveling monks of the Eastern Temple would prepare this dish only under the full moon. `
      ];
      loreSnippet = cache.selectUniqueFragment(loreSnippets);
    }
    
    if (data.legendaryContext) {
      const legendaryOpeners = [
        `${loreSnippet}In the deepest caverns of the Crystal Catacombs, where ${data.legendaryContext.ingredient} forms over centuries, the ancient monks discovered ingredients that shimmer with ${data.sensoryProfile.visual}. This transcendent creation`,
        `${loreSnippet}When ${data.legendaryContext.ingredient} is blessed by starlight and mountain winds, it transforms ordinary cooking into something sacred. ${mainIngredient} and ${ingredientNames.slice(1, 3).join(', ')}, ${data.technique.name.toLowerCase()} with reverent precision,`,
        `${loreSnippet}The mystical ${data.legendaryContext.ingredient} has been sought by Air Nomad masters for generations. Combined with ${ingredientNames.slice(0, 2).join(' and ')}, then ${data.technique.name.toLowerCase()} until ${data.sensoryProfile.visual} dances through the mixture,`
      ];
      return cache.selectUniqueFragment(legendaryOpeners);
    }
    
    if (data.techniqueLore) {
      const formattedTraditionalUse = data.techniqueLore.traditionalUse.toLowerCase()
        .replace(/^used for\s*/i, '')
        .replace(/^traditionally\s*/i, '');
      
      const techniqueOpeners = [
        `${loreSnippet}Master ${cache.selectUniqueFragment(data.techniqueLore.legendaryPractitioners)} perfected the art of ${data.technique.name.toLowerCase()}, teaching that ${mainIngredient} and ${ingredientNames.slice(1, 2).join(', ')} must be prepared with the patience of mountain stones. Through this ancient method, ingredients ${formattedTraditionalUse}, while`,
        `${loreSnippet}The ${data.technique.name} technique, passed down through generations of Air Nomad cooks, transforms simple ${ingredientNames.slice(0, 2).join(' and ')} into something profound. As steam rises and ${data.sensoryProfile.aroma} fills the temple kitchen,`,
        `${loreSnippet}Following the wisdom of ${cache.selectUniqueFragment(data.techniqueLore.legendaryPractitioners)}, this preparation honors the ancient ${data.technique.name} method. ${mainIngredient}, ${ingredientNames.slice(1, 3).join(', ')}, each ingredient ${formattedTraditionalUse} as they`
      ];
      return cache.selectUniqueFragment(techniqueOpeners);
    }
    
    // Standard openings with natural variety
    const standardOpeners = [
      `${loreSnippet}In the high temples where wind carries prayers across mountain peaks, ${mainIngredient} is ${data.technique.name.toLowerCase()} with ${ingredientNames.slice(1, 2).join(' and ')}, creating`,
      `${loreSnippet}When temple bells ring across the valleys, Air Nomad cooks gather ${ingredientNames.slice(0, 3).join(', ')} for this time-honored preparation. The ${data.technique.name.toLowerCase()} process fills the kitchen with ${data.sensoryProfile.aroma}, as`,
      `${loreSnippet}Beneath prayer flags fluttering in mountain winds, this dish brings together ${ingredientNames.slice(0, 2).join(' and ')} through the gentle art of ${data.technique.name.toLowerCase()}. Each ingredient`,
      `${loreSnippet}From the floating gardens of the Western Air Temple comes this harmonious blend of ${mainIngredient} and ${ingredientNames.slice(1, 2).join(', ')}, ${data.technique.name.toLowerCase()} until ${data.sensoryProfile.visual} weaves through the mixture, and`
    ];
    return cache.selectUniqueFragment(standardOpeners);
  }

  /**
   * Generates natural sensory integration woven into the narrative
   */
  private static generateSensoryIntegration(data: ProseTemplateData, cache: FragmentCache): string {
    const sensoryPatterns = [
      `the ${data.sensoryProfile.taste} unfolds like morning mist over temple gardens, while ${data.sensoryProfile.texture} provides the grounding comfort that only sacred food can offer`,
      `flavors dance between ${data.sensoryProfile.taste} and something deeper—a ${data.sensoryProfile.texture} that seems to carry the essence of mountain air itself`,
      `each spoonful reveals ${data.sensoryProfile.taste} layered with the wisdom of generations, its ${data.sensoryProfile.texture} reminiscent of clouds gathering before dawn`,
      `the dish awakens with ${data.sensoryProfile.taste} that speaks of ancient recipes, while its ${data.sensoryProfile.texture} mirrors the gentle strength of Air Nomad philosophy`
    ];
    
    let sensoryText = cache.selectUniqueFragment(sensoryPatterns);
    
    if (data.sensoryProfile.sound) {
      const soundIntegrations = [
        `. During preparation, the kitchen fills with ${data.sensoryProfile.sound}, a meditation in itself`,
        `. The ${data.sensoryProfile.sound} during cooking becomes part of the temple's daily rhythm`,
        `, accompanied by the gentle ${data.sensoryProfile.sound} that draws monks from their studies`
      ];
      sensoryText += cache.selectUniqueFragment(soundIntegrations);
    }
    
    return sensoryText;
  }

  /**
   * Generates varied emotional and spiritual resonance expressions
   */
  private static generateEmotionalResonance(data: ProseTemplateData, cache: FragmentCache): string {
    if (!data.sensoryProfile.emotionalResonance) return '';
    
    const emotions = [
      data.sensoryProfile.emotionalResonance.mood,
      data.sensoryProfile.emotionalResonance.belonging,
      data.sensoryProfile.emotionalResonance.memory,
      data.sensoryProfile.emotionalResonance.spiritual
    ].filter(Boolean);
    
    if (emotions.length === 0) return '';
    
    // Varied expression patterns instead of templated "while also" chains
    const expressionPatterns = [
      `This sacred meal ${emotions[0]}, ${emotions[1] ? `and in doing so, ${emotions[1]}` : ''}`,
      `Each bite ${emotions[0]}, creating moments where ${emotions[1] || 'peace settles over the soul'}`,
      `The dish ${emotions[0]} while ${emotions[1] || 'connecting diners to something eternal'}`,
      `Beyond nourishment, this preparation ${emotions[0]}, ${emotions[1] ? `gently ${emotions[1]}` : ''}`,
      `Those who share this meal find that it ${emotions[0]}, and through this simple act, ${emotions[1] || 'discover the interconnectedness of all things'}`
    ];
    
    let resonanceText = cache.selectUniqueFragment(expressionPatterns);
    
    // Add memory echo naturally if present
    if (data.sensoryProfile.memoryEcho) {
      const memoryIntegrations = [
        `. ${data.sensoryProfile.memoryEcho}`,
        `, ${data.sensoryProfile.memoryEcho.toLowerCase()}`,
        `. Many say ${data.sensoryProfile.memoryEcho.toLowerCase()}`
      ];
      resonanceText += cache.selectUniqueFragment(memoryIntegrations);
    }
    
    return resonanceText;
  }

  /**
   * Generates natural serving context integrated with cultural elements
   * Uses enhanced festival variety with anti-repetition tracking
   */
  private static generateServingContext(data: ProseTemplateData, cache: FragmentCache): string {
    const contextPatterns = [
      `Shared in the circular halls of the Eastern Air Temple, where floating prayer wheels cast shifting shadows`,
      `Served during the golden hour when sky bison return to their roosts and temple bells echo across valleys`,
      `Offered in the Western Temple's gravity-defying dining chambers, where monks gather in grateful silence`,
      `Prepared for travelers seeking shelter in mountain monasteries, a gesture of Air Nomad hospitality`,
      `Traditional during meditation retreats, when the community gathers to break contemplative silence`,
      `Served at dawn ceremonies when the temple awakens with chanted prayers and incense smoke`
    ];
    
    // Use enhanced festival system with 70% chance
    if (data.festivalContext?.name || Math.random() < 0.7) {
      const selectedFestival = cache.selectUniqueFestival();
      
      const festivalPatterns = [
        `Central to the ${selectedFestival} celebration, when all four temples unite in joyous ceremony`,
        `A cornerstone of ${selectedFestival} festivities, prepared by master cooks for hundreds of pilgrims`,
        `Essential to ${selectedFestival} traditions, this dish celebrates the cycle of renewal`,
        `Fundamental to ${selectedFestival} observances, honoring the passage of celestial time`,
        `Sacred to the ${selectedFestival} ceremony, acknowledging the rhythm of temple life`,
        `Central to ${selectedFestival} rituals, embracing the flow of natural change`,
        `Treasured during the ${selectedFestival}, when ancient wisdom flows like mountain streams`,
        `Revered in the ${selectedFestival} gathering, where spirits and mortals commune in peace`
      ];
      return cache.selectUniqueFragment(festivalPatterns);
    }
    
    return cache.selectUniqueFragment(contextPatterns);
  }

  /**
   * Weaves prose elements together with natural flow and varied sentence structures
   */
  private static weaveProseElements(opening: string, sensory: string, emotional: string, serving: string, cache: FragmentCache): string {
    // Multiple composition patterns for variety
    const compositionPatterns = [
      // Pattern 1: Opening -> Sensory -> Emotional -> Serving
      `${opening} ${sensory}. ${emotional}. ${serving}.`,
      
      // Pattern 2: Opening -> Combined sensory/emotional -> Serving
      `${opening} ${sensory}, and ${emotional.toLowerCase()}. ${serving}.`,
      
      // Pattern 3: Opening -> Sensory -> Serving with emotional integration
      `${opening} ${sensory}. ${serving}, where ${emotional.toLowerCase()}.`,
      
      // Pattern 4: Emotional opening -> Sensory -> Serving
      `${opening} ${emotional.toLowerCase()}, through ${sensory}. ${serving}.`,
      
      // Pattern 5: Integrated flow
      `${opening} ${sensory}. ${emotional} ${serving.toLowerCase()}.`
    ];
    
    return cache.selectUniqueFragment(compositionPatterns);
  }
} 