/**
 * Sensory & Emotional Impact System
 * 
 * Creates deeply evocative dish descriptions that engage all five senses
 * and emotional connections, making each dish a complete sensory experience.
 * 
 * Designed for cross-nation compatibility with cultural adaptation hooks.
 */

import { selectWithAntiClustering } from './weighted-selection.js';

/** Core sensory categories that apply to all culinary experiences */
export interface SensoryProfile {
  visual: string[];
  aroma: string[];
  taste: string[];
  texture: string[];
  sound: string[];
}

/** Emotional resonance categories for deep psychological impact */
export interface EmotionalResonance {
  mood: string;
  memory: string;
  spiritual: string;
  belonging: string;
}

/** Memory echo phrases for ultra-rare, transcendent experiences */
export interface MemoryEcho {
  phrase: string;
  rarity: 'legendary' | 'sacred' | 'transcendent';
  culturalContext?: string;
}

/** Enhanced sensory adjectives organized by intensity and cultural context */
export const ENHANCED_SENSORY_ADJECTIVES = {
  visual: {
    gentle: [
      'soft amber glow',
      'delicate pearl-like sheen',
      'whisper-pale translucency',
      'morning mist ethereality',
      'gentle sunset warmth',
      'cloud-kissed whiteness',
      'serene jade undertones',
      'subtle golden highlights',
      'peaceful cream swirls',
      'tender rose blush'
    ],
    vibrant: [
      'brilliant saffron radiance',
      'deep emerald richness',
      'striking crimson depth',
      'luminous azure clarity',
      'intense amber fire',
      'vivid sunset layers',
      'bold earthen browns',
      'dramatic shadow play',
      'electric golden sparks',
      'passionate ruby gleams'
    ],
    mystical: [
      'otherworldly opalescence',
      'spirit-realm shimmer',
      'ancient starlight gleaming',
      'cosmic aurora dancing',
      'sacred flame flickering',
      'eternal moonbeam silver',
      'divine energy radiating',
      'transcendent light weaving',
      'celestial patterns forming',
      'mystical energy pulsing'
    ]
  },

  aroma: {
    gentle: [
      'whisper of mountain wildflowers',
      'soft breath of morning dew',
      'delicate temple incense',
      'subtle wind-carried herbs',
      'tender garden blossom',
      'peaceful cedar warmth',
      'gentle earth after rain',
      'quiet meadow sweetness',
      'soft lavender dreams',
      'mild sunshine fragrance'
    ],
    rich: [
      'deep forest floor complexity',
      'luxurious spice market warmth',
      'intense roasted grain depth',
      'bold herbal symphony',
      'rich caramelized sweetness',
      'powerful earth-smoke blend',
      'concentrated fruit essence',
      'robust nutty undertones',
      'full-bodied aromatic waves',
      'complex layered bouquet'
    ],
    spiritual: [
      'sacred temple ceremony',
      'ancient meditation halls',
      'divine offering smoke',
      'blessed ritual herbs',
      'enlightened master\'s tea',
      'spirit world crossing',
      'cosmic energy essence',
      'transcendent purification',
      'holy mountain air',
      'eternal wisdom fragrance'
    ]
  },

  taste: {
    subtle: [
      'barely perceptible sweetness',
      'ghost of distant spice',
      'whisper-light saltiness',
      'delicate floral notes',
      'gentle warming tingle',
      'soft mineral finish',
      'tender herb caress',
      'mild sunshine warmth',
      'peaceful cooling breeze',
      'quiet comfort embrace'
    ],
    complex: [
      'symphony of seven spices',
      'dancing sweet-savory balance',
      'evolving flavor journey',
      'layered taste revelation',
      'harmonious contrast play',
      'sophisticated depth layers',
      'intricate spice weaving',
      'masterful seasoning blend',
      'nuanced flavor development',
      'orchestrated taste crescendo'
    ],
    transcendent: [
      'taste of pure enlightenment',
      'flavor beyond earthly bounds',
      'essence of cosmic harmony',
      'spiritual awakening on tongue',
      'divine nectar concentration',
      'taste of ancient wisdom',
      'eternal bliss manifestation',
      'sacred geometry in flavor',
      'universal truth essence',
      'transcendent soul nourishment'
    ]
  },

  texture: {
    delicate: [
      'cloud-soft tenderness',
      'silk-smooth creaminess',
      'feather-light airiness',
      'velvet gentle caress',
      'gossamer delicacy',
      'butterfly wing lightness',
      'morning mist softness',
      'gentle breeze texture',
      'whisper-smooth finish',
      'tender embrace feeling'
    ],
    substantial: [
      'satisfying earthen density',
      'robust hearty chewiness',
      'substantial grain backbone',
      'rich creamy abundance',
      'solid comforting weight',
      'thick luxurious coating',
      'full-bodied presence',
      'deeply nourishing heft',
      'grounding stability',
      'fulfilling substance'
    ],
    mystical: [
      'texture that shifts and flows',
      'essence of liquid starlight',
      'material that transcends form',
      'divine substance manifestation',
      'energy-matter transformation',
      'spirit-realm consistency',
      'ethereal density paradox',
      'sacred geometry texture',
      'cosmic fabric weaving',
      'transcendent matter state'
    ]
  },

  sound: {
    gentle: [
      'soft whispered sizzle',
      'quiet bubble meditation',
      'peaceful steam exhale',
      'tender crackling warmth',
      'gentle wind-chime tinkle',
      'soft rain patter',
      'quiet temple bell echo',
      'peaceful breath rhythm',
      'gentle leaf rustle',
      'soft water flow'
    ],
    dynamic: [
      'enthusiastic bubble symphony',
      'lively crackling celebration',
      'energetic sizzle dance',
      'bold steam percussion',
      'vibrant pop-snap rhythm',
      'spirited bubble chorus',
      'dynamic heat expression',
      'lively cooking orchestra',
      'energetic preparation song',
      'vibrant kitchen symphony'
    ],
    sacred: [
      'sacred cooking ceremony',
      'divine preparation ritual',
      'holy steam ascending',
      'blessed sizzle prayer',
      'cosmic energy vibration',
      'spiritual transformation sound',
      'sacred flame whisper',
      'divine harmony resonance',
      'transcendent cooking meditation',
      'eternal wisdom bubbling'
    ]
  }
} as const;

/** Emotional resonance snippets for deep psychological connection */
export const EMOTIONAL_RESONANCE_LIBRARY = {
  belonging: [
    'Invites a quiet sense of belonging',
    'Creates the warm feeling of coming home',
    'Instills a peaceful sense of acceptance',
    'Awakens the comfort of ancient kinship',
    'Nurtures the soul\'s need for connection',
    'Embraces the eater with familial warmth',
    'Brings the safety of temple sanctuary',
    'Offers the peace of unconditional welcome',
    'Provides the comfort of spiritual family',
    'Generates the warmth of eternal belonging'
  ],

  memory: [
    'Reminds the eater of tranquil temple gardens',
    'Evokes memories of peaceful childhood mornings',
    'Calls forth visions of serene mountain retreats',
    'Awakens recollections of sacred ceremonies',
    'Brings back the feeling of gentle guidance',
    'Recalls moments of perfect spiritual clarity',
    'Conjures images of wise teacher\'s kindness',
    'Evokes the sensation of first flight freedom',
    'Reminds of times when all felt possible',
    'Awakens memories of profound inner peace'
  ],

  mood: [
    'Cultivates a meditative state of mind',
    'Inspires gentle contemplative reflection',
    'Encourages peaceful inward journeying',
    'Promotes serene mental clarity',
    'Facilitates deep spiritual connection',
    'Generates harmonious emotional balance',
    'Nurtures compassionate understanding',
    'Awakens joyful spiritual appreciation',
    'Creates space for mindful presence',
    'Inspires grateful heart opening'
  ],

  spiritual: [
    'Connects the spirit to wind and sky',
    'Aligns the soul with cosmic harmony',
    'Opens pathways to deeper wisdom',
    'Facilitates communion with ancient teachings',
    'Harmonizes personal energy with universal flow',
    'Creates resonance with spiritual traditions',
    'Awakens dormant spiritual sensitivities',
    'Bridges the gap between earthly and divine',
    'Facilitates deeper meditation practice',
    'Connects consciousness to eternal truths'
  ],

  transformation: [
    'Marks a moment of spiritual evolution',
    'Catalyzes inner transformation processes',
    'Initiates subtle energy shifts within',
    'Facilitates release of old patterns',
    'Supports emergence of higher understanding',
    'Enables deeper levels of consciousness',
    'Triggers awakening of latent potentials',
    'Promotes healing of ancient wounds',
    'Facilitates integration of spiritual lessons',
    'Supports journey toward enlightenment'
  ]
} as const;

/** Memory echo phrases for ultra-rare, transcendent experiences */
export const MEMORY_ECHO_LIBRARY: MemoryEcho[] = [
  {
    phrase: 'Said to linger on the soul for lifetimes',
    rarity: 'transcendent',
    culturalContext: 'universal spiritual truth'
  },
  {
    phrase: 'Whispered to echo in the spirit realm',
    rarity: 'sacred',
    culturalContext: 'mystical bridge between worlds'
  },
  {
    phrase: 'Believed to awaken past-life memories',
    rarity: 'legendary',
    culturalContext: 'karmic resonance and soul recognition'
  },
  {
    phrase: 'Rumored to grant visions of future lives',
    rarity: 'transcendent',
    culturalContext: 'temporal spiritual perception'
  },
  {
    phrase: 'Known to imprint itself upon the eternal soul',
    rarity: 'sacred',
    culturalContext: 'permanent spiritual transformation'
  },
  {
    phrase: 'Alleged to be remembered in meditation years later',
    rarity: 'legendary',
    culturalContext: 'deep spiritual impression'
  },
  {
    phrase: 'Claimed to visit the eater in dreams',
    rarity: 'sacred',
    culturalContext: 'subconscious spiritual continuation'
  },
  {
    phrase: 'Thought to create bonds that transcend death',
    rarity: 'transcendent',
    culturalContext: 'eternal spiritual connection'
  },
  {
    phrase: 'Believed to carry the wisdom of ancient masters',
    rarity: 'legendary',
    culturalContext: 'lineage transmission through taste'
  },
  {
    phrase: 'Said to unlock cosmic consciousness',
    rarity: 'transcendent',
    culturalContext: 'ultimate spiritual awakening'
  }
];

/** Preparation phrases that enhance the sensory narrative */
export const ENHANCED_PREPARATION_PHRASES = {
  gentle: [
    'tenderly coaxed to perfection',
    'lovingly guided through transformation',
    'patiently nurtured to readiness',
    'gently encouraged to reveal its essence',
    'softly whispered into harmony',
    'carefully shepherded through each stage',
    'mindfully attended at every moment',
    'gracefully allowed to unfold naturally',
    'peacefully brought to fulfillment',
    'serenely guided to completion'
  ],

  masterful: [
    'skillfully orchestrated through precise technique',
    'expertly balanced across multiple elements',
    'masterfully woven into culinary poetry',
    'artfully shaped by generations of wisdom',
    'precisely calibrated for optimal harmony',
    'ingeniously combined using ancient methods',
    'brilliantly executed with spiritual intention',
    'flawlessly synchronized in perfect timing',
    'magnificently crafted through devoted practice',
    'supremely refined through master-level technique'
  ],

  mystical: [
    'transformed through sacred ritual process',
    'elevated by spiritual energy infusion',
    'blessed through ceremonial preparation',
    'consecrated via ancient spiritual practices',
    'sanctified through mindful meditation',
    'purified by cosmic energy alignment',
    'transfigured through divine inspiration',
    'spiritually enhanced through ritual blessing',
    'transcendentally prepared via sacred methods',
    'mystically refined through enlightened practice'
  ]
} as const;

/**
 * Generates comprehensive sensory description with emotional resonance
 */
export function generateSensoryDescription(
  intensity: 'gentle' | 'vibrant' | 'mystical' = 'gentle',
  includeEmotionalResonance: boolean = true,
  rarityLevel: 'common' | 'uncommon' | 'rare' | 'legendary' | 'sacred' = 'common'
): {
  visual: string;
  aroma: string;
  taste: string;
  texture: string;
  sound?: string;
  emotionalResonance?: EmotionalResonance;
  memoryEcho?: string;
} {
  const visual = selectWithAntiClustering(ENHANCED_SENSORY_ADJECTIVES.visual[intensity]);
  const aroma = selectWithAntiClustering(ENHANCED_SENSORY_ADJECTIVES.aroma[intensity === 'mystical' ? 'spiritual' : intensity === 'vibrant' ? 'rich' : 'gentle']);
  const taste = selectWithAntiClustering(ENHANCED_SENSORY_ADJECTIVES.taste[intensity === 'mystical' ? 'transcendent' : intensity === 'vibrant' ? 'complex' : 'subtle']);
  const texture = selectWithAntiClustering(ENHANCED_SENSORY_ADJECTIVES.texture[intensity === 'mystical' ? 'mystical' : intensity === 'vibrant' ? 'substantial' : 'delicate']);
  
  const result: any = { visual, aroma, texture, taste };

  // Add sound for more intense preparations
  if (intensity !== 'gentle' || Math.random() < 0.3) {
    const soundCategory = intensity === 'mystical' ? 'sacred' : intensity === 'vibrant' ? 'dynamic' : 'gentle';
    result.sound = selectWithAntiClustering(ENHANCED_SENSORY_ADJECTIVES.sound[soundCategory]);
  }

  // Add emotional resonance
  if (includeEmotionalResonance) {
    result.emotionalResonance = {
      mood: selectWithAntiClustering(EMOTIONAL_RESONANCE_LIBRARY.mood),
      memory: selectWithAntiClustering(EMOTIONAL_RESONANCE_LIBRARY.memory),
      spiritual: selectWithAntiClustering(EMOTIONAL_RESONANCE_LIBRARY.spiritual),
      belonging: selectWithAntiClustering(EMOTIONAL_RESONANCE_LIBRARY.belonging)
    };
  }

  // Add memory echo for rare items
  if ((rarityLevel === 'legendary' && Math.random() < 0.15) ||
      (rarityLevel === 'sacred' && Math.random() < 0.35) ||
      (rarityLevel === 'rare' && Math.random() < 0.05)) {
    
    const availableEchoes = MEMORY_ECHO_LIBRARY.filter(echo => {
      if (rarityLevel === 'legendary') return echo.rarity === 'legendary';
      if (rarityLevel === 'sacred') return echo.rarity === 'sacred' || echo.rarity === 'transcendent';
      return true;
    });
    
    if (availableEchoes.length > 0) {
      const selectedEcho = selectWithAntiClustering(availableEchoes.map(e => e.phrase));
      result.memoryEcho = selectedEcho;
    }
  }

  return result;
}

/**
 * Creates enhanced preparation description with sensory elements
 */
export function generatePreparationNarrative(
  technique: string,
  intensity: 'gentle' | 'masterful' | 'mystical' = 'gentle'
): string {
  const basePhrase = selectWithAntiClustering(ENHANCED_PREPARATION_PHRASES[intensity]);
  const techniqueVerb = technique.toLowerCase().includes('steam') ? 'steamed' :
                       technique.toLowerCase().includes('whip') ? 'whipped' :
                       technique.toLowerCase().includes('roast') ? 'roasted' :
                       technique.toLowerCase().includes('dry') ? 'dried' :
                       technique.toLowerCase().includes('braise') ? 'braised' :
                       technique.toLowerCase().includes('levitation') ? 'elevated' :
                       technique.toLowerCase().includes('meditation') ? 'infused' :
                       'prepared';
  
  return `The ingredients are ${techniqueVerb} ${basePhrase}`;
}

/**
 * Determines sensory intensity based on ingredient rarity and technique complexity
 */
export function calculateSensoryIntensity(
  hasLegendaryIngredients: boolean,
  techniqueComplexity: 'simple' | 'moderate' | 'complex' | 'masterful',
  spiritualSignificance: boolean
): 'gentle' | 'vibrant' | 'mystical' {
  if (spiritualSignificance || hasLegendaryIngredients) {
    return 'mystical';
  }
  
  if (techniqueComplexity === 'masterful' || techniqueComplexity === 'complex') {
    return 'vibrant';
  }
  
  return 'gentle';
} 