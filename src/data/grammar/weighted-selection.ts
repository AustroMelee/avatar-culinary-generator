/**
 * Weighted Selection System for Air Nomad Grammar
 * 
 * Prevents overuse of common phrases and creates more varied outputs
 * by tracking recent selections and reducing their probability.
 * 
 * Implements phrasebank deduplication and anti-clustering logic.
 */

/** Interface for weighted phrase entries */
export type WeightedPhrase = {
  text: string;
  weight: number;
  baseWeight: number;
  timesUsed: number;
  cooldownPeriod: number;
};

/** Global phrase usage tracking to prevent clustering */
class PhraseUsageTracker {
  private usageHistory: Map<string, number[]> = new Map();
  private readonly maxHistoryLength = 50; // Track last 50 generations

  /**
   * Records usage of a phrase and updates its weight
   */
  recordUsage(phrase: string): void {
    if (!this.usageHistory.has(phrase)) {
      this.usageHistory.set(phrase, []);
    }
    
    const history = this.usageHistory.get(phrase)!;
    history.push(Date.now());
    
    // Keep only recent history
    if (history.length > this.maxHistoryLength) {
      history.shift();
    }
  }

  /**
   * Gets the current weight modifier for a phrase based on recent usage
   * Recent usage reduces weight significantly
   */
  getWeightModifier(phrase: string, cooldownMs: number = 30000): number {
    const history = this.usageHistory.get(phrase);
    if (!history || history.length === 0) {
      return 1.0; // No usage penalty
    }

    const now = Date.now();
    const recentUsages = history.filter(time => (now - time) < cooldownMs).length;
    
    // Exponential decay: more recent usages = lower weight
    return Math.max(0.1, Math.pow(0.5, recentUsages));
  }

  /**
   * Clears usage history (for testing or reset)
   */
  clearHistory(): void {
    this.usageHistory.clear();
  }
}

// Global tracker instance
const globalTracker = new PhraseUsageTracker();

/**
 * Enhanced adjectives with variety expansion to reduce overuse
 * Adds 30+ new entries per category as recommended in Phase 2
 */

/** Expanded quality adjectives to replace overused "lovingly", "gentle", "sacred" */
export const ENHANCED_QUALITY_ADJECTIVES = [
  // Original quality adjectives
  'exquisite', 'pristine', 'refined', 'artisanal', 'masterful', 'perfect', 'flawless',
  'exceptional', 'sublime', 'elegant', 'graceful', 'harmonious', 'balanced', 'authentic',
  
  // NEW: Additional variety to reduce "lovingly" overuse
  'thoughtfully crafted', 'meticulously prepared', 'artfully composed', 'skillfully made',
  'devotedly assembled', 'reverently created', 'purposefully designed', 'intentionally balanced',
  'ceremoniously prepared', 'ritually blessed', 'spiritually infused', 'mindfully arranged',
  'contemplatively formed', 'prayerfully fashioned', 'meditatively shaped', 'zenfully aligned',
  
  // NEW: Textural and preparation variety
  'delicately handled', 'precisely seasoned', 'perfectly timed', 'expertly balanced',
  'traditionally honored', 'ancestrally guided', 'culturally authentic', 'temporally blessed',
  'seasonally attuned', 'elementally harmonized', 'chakra-aligned', 'energy-balanced',
  
  // NEW: Emotional and spiritual depth
  'soul-stirring', 'heart-warming', 'spirit-lifting', 'consciousness-expanding',
  'wisdom-enhancing', 'peace-invoking', 'serenity-inducing', 'tranquility-bringing',
  'enlightenment-inspiring', 'awakening-facilitating', 'transcendence-enabling'
] as const;

/** Expanded sensory adjectives to replace overused "gentle" */
export const ENHANCED_SENSORY_ADJECTIVES = [
  // Original sensory adjectives
  'aromatic', 'fragrant', 'flavorful', 'rich', 'delicate', 'subtle', 'complex', 'nuanced',
  'vibrant', 'intense', 'fresh', 'crisp', 'smooth', 'silky', 'velvety', 'creamy',
  
  // NEW: Replacing overused "gentle" with variety
  'whisper-soft', 'cloud-light', 'feather-delicate', 'silk-smooth', 'velvet-tender',
  'gossamer-fine', 'pearl-lustrous', 'crystal-clear', 'snow-pure', 'dew-fresh',
  'breeze-caressed', 'mist-kissed', 'sunbeam-warmed', 'moonlight-blessed',
  
  // NEW: Enhanced sensory depth
  'symphony-complex', 'harmony-balanced', 'melody-flowing', 'rhythm-pulsing',
  'crescendo-building', 'diminuendo-fading', 'legato-smooth', 'staccato-crisp',
  'fortissimo-bold', 'pianissimo-subtle', 'andante-measured', 'allegro-lively',
  
  // NEW: Nature-inspired sensory
  'mountain-pure', 'valley-deep', 'forest-earthy', 'ocean-vast', 'sky-infinite',
  'star-bright', 'aurora-shimmering', 'rainbow-prismatic', 'thunder-resonant'
] as const;

/** Expanded spiritual adjectives to reduce "transcendent", "profound" clustering */
export const ENHANCED_SPIRITUAL_ADJECTIVES = [
  // Original spiritual adjectives  
  'sacred', 'blessed', 'holy', 'divine', 'spiritual', 'enlightened', 'pure', 'serene',
  'peaceful', 'harmonious', 'balanced', 'mindful', 'contemplative', 'meditative',
  
  // NEW: Spiritual depth variety (reduces "transcendent" overuse)
  'soul-awakening', 'spirit-elevating', 'consciousness-expanding', 'awareness-heightening',
  'wisdom-deepening', 'understanding-broadening', 'insight-sharpening', 'clarity-bringing',
  'truth-revealing', 'mystery-unveiling', 'illusion-dispelling', 'ego-dissolving',
  
  // NEW: Eastern philosophy terms
  'dharma-aligned', 'karma-balancing', 'samsara-transcending', 'nirvana-approaching',
  'bodhi-inspired', 'moksha-seeking', 'samadhi-inducing', 'satori-triggering',
  'zen-embodying', 'tao-following', 'chi-flowing', 'prana-breathing',
  
  // NEW: Temple and monastic references
  'monastery-blessed', 'temple-sanctified', 'shrine-honored', 'altar-consecrated',
  'chapel-graced', 'sanctuary-protected', 'cloister-sheltered', 'abbey-nurtured',
  'hermitage-isolated', 'retreat-focused', 'pilgrimage-guided', 'journey-blessed'
] as const;

/**
 * Banned phrase combinations to prevent awkward juxtapositions
 * As recommended in Phase 2 audit
 */
export const BANNED_COMBINATIONS: [string, string][] = [
  ['in perfect peace', 'transcendent experience'],
  ['gentle as sky bison breath', 'profound spiritual significance'],
  ['temple atmosphere', 'spiritual growth and development'],
  ['lovingly', 'transcendent'],
  ['gentle', 'gentle'], // No double gentle
  ['sacred', 'sacred'], // No double sacred
  ['profound', 'transcendent'], // Too heavy together
  ['peaceful', 'serene'], // Redundant calm
  ['harmonious', 'balanced'], // Redundant equilibrium
];

/**
 * Weighted random selector that prevents phrase clustering
 * Implements the anti-clustering logic recommended in Phase 2
 */
export function selectWithAntiClustering<T extends string>(
  phrases: readonly T[],
  recentlyUsed: string[] = [],
  avoidCombinations: [string, string][] = BANNED_COMBINATIONS
): T {
  // Create weighted selection based on recent usage
  const weighted = phrases.map(phrase => {
    let weight = 1.0;
    
    // Reduce weight for recently used phrases
    const recentUsageCount = recentlyUsed.filter(used => used === phrase).length;
    weight *= Math.pow(0.3, recentUsageCount); // Exponential decay
    
    // Apply global usage tracking
    weight *= globalTracker.getWeightModifier(phrase);
    
    // Check for banned combinations with recently used phrases
    for (const recent of recentlyUsed.slice(-3)) { // Check last 3 phrases
      for (const [banned1, banned2] of avoidCombinations) {
        if ((phrase === banned1 && recent === banned2) || 
            (phrase === banned2 && recent === banned1)) {
          weight *= 0.1; // Heavily penalize banned combinations
        }
      }
    }
    
    return { phrase, weight };
  });
  
  // Weighted random selection
  const totalWeight = weighted.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const item of weighted) {
    random -= item.weight;
    if (random <= 0) {
      globalTracker.recordUsage(item.phrase);
      return item.phrase;
    }
  }
  
  // Fallback to last item
  const fallback = weighted[weighted.length - 1].phrase;
  globalTracker.recordUsage(fallback);
  return fallback;
}

/**
 * Context-aware phrase joining to improve flow
 * PHASE 3 ENHANCEMENT: Enhanced with advanced flow patterns
 * Addresses "poor flow" issues identified in Phase 1 audit
 */
export function joinPhrasesContextually(phrases: string[]): string {
  if (phrases.length === 0) return '';
  if (phrases.length === 1) return phrases[0];
  
  // PHASE 3: Enhanced conjunctions with sophisticated options
  const conjunctions = [
    'and', 'while', 'as', 'with', 'featuring', 'bringing together',
    'simultaneously', 'moreover', 'furthermore', 'in harmony with'
  ];
  const transitions = [
    'enhancing', 'complementing', 'balancing', 'harmonizing with',
    'thereby creating', 'thus achieving', 'consequently offering'
  ];
  
  // PHASE 3: Advanced punctuation patterns
  const advancedConnectors = [
    ';', '; while', '; as', '; with', '; thereby',
    ', which', ', creating', ', offering'
  ];
  
  // For 2 phrases: sophisticated conjunction choice
  if (phrases.length === 2) {
    const useAdvanced = Math.random() < 0.3; // 30% chance for advanced patterns
    if (useAdvanced) {
      const connector = selectWithAntiClustering(advancedConnectors);
      return `${phrases[0]}${connector} ${phrases[1]}`;
    } else {
      const connector = Math.random() < 0.7 ? 'and' : selectWithAntiClustering(conjunctions);
      return `${phrases[0]} ${connector} ${phrases[1]}`;
    }
  }
  
  // For 3+ phrases: PHASE 3 enhanced structure variety
  const result = [phrases[0]];
  
  for (let i = 1; i < phrases.length; i++) {
    if (i === phrases.length - 1) {
      // Last phrase: sophisticated final connectors
      const useSemicolon = Math.random() < 0.2; // 20% chance for semicolon
      if (useSemicolon) {
        result.push('; ultimately', phrases[i]);
      } else {
        const finalConnector = Math.random() < 0.5 ? 'and' : selectWithAntiClustering(transitions);
        result.push(finalConnector, phrases[i]);
      }
    } else {
      // Middle phrases: PHASE 3 enhanced variety
      const structureChoice = Math.random();
      if (structureChoice < 0.2) {
        // Semicolon structure (sophisticated)
        result.push(';', phrases[i]);
      } else if (structureChoice < 0.4) {
        // No connector (clean comma)
        result.push(',', phrases[i]);
      } else if (structureChoice < 0.7) {
        // Traditional transitional
        const connector = selectWithAntiClustering([', while', ', as', ', with']);
        result.push(connector, phrases[i]);
      } else {
        // Advanced transitional
        const connector = selectWithAntiClustering([', thereby', ', consequently', ', moreover']);
        result.push(connector, phrases[i]);
      }
    }
  }
  
  return result.join(' ').replace(/\s+/g, ' ').trim();
}

/**
 * Enhanced spiritual benefit generator with variety
 * Fixes "empty spiritual benefit" and "redundant phrasing" issues
 */
export const ENHANCED_SPIRITUAL_BENEFITS = [
  // Original benefits expanded
  'Awakens dormant chakras and aligns spiritual energy pathways throughout the body',
  'Facilitates deep meditative states and enhances connection to universal consciousness',
  'Purifies the aura and creates protective energetic boundaries against negative influences',
  'Stimulates the third eye chakra and opens channels for intuitive wisdom reception',
  'Balances the five elements within the body and harmonizes with natural cosmic rhythms',
  
  // Air Nomad specific lore-rich benefits
  'Echoes the ancient wisdom of Guru Pathik, bringing clarity to life\'s spiritual journey',
  'Channels the serene energy of the Eastern Air Temple meditation halls during sunrise',
  'Invokes the protective spirit of Appa, surrounding the eater with loyal, gentle strength',
  'Resonates with the frequencies used by Air Nomad masters for levitation practice',
  'Connects the consumer to the sacred wind currents that guide sky bison migration',
  
  // Seasonal and festival specific
  'Traditionally consumed during the Autumn Equinox to prepare for winter contemplation',
  'Sacred to the Festival of Four Winds, when Air Nomads honor the cardinal directions',
  'Blessed during the Sky Bison Appreciation Ceremony for harmony with flying companions',
  'Prepared exclusively for the Day of Ascending, marking young airbenders\' first flight',
  'Ceremonially shared during the Vow of Silence retreats in mountain hermitages',
  
  // Memory and emotional resonance
  'Evokes memories of peaceful temple courtyards filled with cherry blossom petals',
  'Reminds the soul of floating meditation sessions above cloud-covered peaks',
  'Brings back the sensation of gentle mountain breezes during evening prayer',
  'Recalls the laughter of young monks playing airball in temple gardens',
  'Awakens ancestral memories of the first airbenders learning from flying bison'
] as const;

/**
 * Clears global phrase tracking (useful for testing)
 */
export function clearPhraseHistory(): void {
  globalTracker.clearHistory();
}

export { globalTracker as phraseTracker }; 