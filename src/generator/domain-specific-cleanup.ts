/**
 * DOMAIN-SPECIFIC CLEANUP ENGINE
 * Handles Air Nomad cultural patterns, lore density, and nation-specific text issues
 * Separates cultural knowledge from generic text processing following architectural guidelines
 */

/**
 * AIR NOMAD CULTURAL PATTERNS - Nation-specific cleanup rules
 * Handles ingredient names, cultural terms, and temple-specific language
 */
const AIR_NOMAD_INGREDIENT_FIXES: Record<string, string> = {
  'Crystal Cave Mineral': 'Crystal Cave Minerals',
  'Sky Bison Milk': "Sky Bison's Milk",
  'Mountain Berry': 'Mountain Berries',
  'Temple Herb': 'Temple Herbs',
  'Sacred Mushroom': 'Sacred Mushrooms',
  'Wind Flower': 'Wind Flowers'
};

const AIR_NOMAD_CULTURAL_STANDARDIZATIONS: Record<string, string> = {
  'sky-bison': 'sky bison',
  'air-bending': 'airbending',
  'air-nomad': 'Air Nomad',
  'temple-bells': 'temple bells',
  'prayer-wheels': 'prayer wheels',
  'monk robes': 'monastic robes',
  'temple kitchens': 'temple kitchen',
  'meditation halls': 'meditation hall'
};

const TEMPLE_HIERARCHY_TERMS: Record<string, string> = {
  'master monk': 'Master',
  'elder monk': 'Elder',
  'temple master': 'Temple Master',
  'air nomad master': 'Air Nomad Master',
  'spiritual master': 'Spiritual Master'
};

/**
 * RITUAL DENSITY DETECTION - Identifies overly dense lore patterns
 * Detects when cultural references become overwhelming and provides alternatives
 */
const DENSE_LORE_PATTERNS = [
  /\b(ritual|ceremony|sacred|divine|mystical|spiritual|ancient|temple)\b/gi,
  /\b(meditation|prayer|blessing|worship|reverence)\b/gi,
  /\b(enlightenment|transcendence|awakening|harmony)\b/gi
];

const LORE_ALTERNATIVES = {
  heavy: {
    'sacred ritual': 'special tradition',
    'divine ceremony': 'important gathering',
    'mystical meditation': 'peaceful reflection',
    'ancient blessing': 'time-honored practice',
    'spiritual awakening': 'personal insight',
    'transcendent harmony': 'perfect balance'
  },
  moderate: {
    'sacred': 'treasured',
    'divine': 'remarkable',
    'mystical': 'unique',
    'ancient': 'traditional',
    'transcendent': 'elevated',
    'enlightened': 'wise'
  }
};

/**
 * Applies Air Nomad-specific cultural cleanup and standardization
 * Handles nation-specific ingredient names, cultural terms, and linguistic patterns
 */
export function applyAirNomadCleanup(text: string): string {
  let cleaned = text;
  
  // Apply ingredient name standardization
  cleaned = fixAirNomadIngredientPlurals(cleaned);
  
  // Standardize cultural terminology
  cleaned = standardizeAirNomadTerms(cleaned);
  
  // Fix temple hierarchy references
  cleaned = standardizeTempleHierarchy(cleaned);
  
  // Apply festival name consistency
  cleaned = standardizeFestivalNames(cleaned);
  
  // Detect and lighten overly dense lore if needed
  cleaned = adjustLoreDensity(cleaned);
  
  return cleaned;
}

/**
 * Fixes Air Nomad ingredient pluralization and possessive forms
 * Handles cultural knowledge about specific ingredients and their proper forms
 */
function fixAirNomadIngredientPlurals(text: string): string {
  let cleaned = text;
  
  // Apply specific ingredient fixes
  for (const [incorrect, correct] of Object.entries(AIR_NOMAD_INGREDIENT_FIXES)) {
    const regex = new RegExp(`\\b${incorrect}s?\\b`, 'gi');
    cleaned = cleaned.replace(regex, correct);
  }
  
  // Fix possessive forms for sacred ingredients
  cleaned = cleaned
    .replace(/Sky Bison Milk/gi, "Sky Bison's Milk")
    .replace(/Avatar Yangchen Blessing/gi, "Avatar Yangchen's Blessing")
    .replace(/Master Gyatso Recipe/gi, "Master Gyatso's Recipe")
    .replace(/Temple Elder Wisdom/gi, "Temple Elder's Wisdom");
  
  return cleaned;
}

/**
 * Standardizes Air Nomad cultural terminology and hyphenation
 * Ensures consistent representation of cultural concepts
 */
function standardizeAirNomadTerms(text: string): string {
  let cleaned = text;
  
  // Apply cultural standardizations
  for (const [incorrect, correct] of Object.entries(AIR_NOMAD_CULTURAL_STANDARDIZATIONS)) {
    const regex = new RegExp(`\\b${incorrect}\\b`, 'gi');
    cleaned = cleaned.replace(regex, correct);
  }
  
  // Standardize temple names
  cleaned = cleaned
    .replace(/eastern air temple/gi, 'Eastern Air Temple')
    .replace(/western air temple/gi, 'Western Air Temple')
    .replace(/northern air temple/gi, 'Northern Air Temple')
    .replace(/southern air temple/gi, 'Southern Air Temple');
  
  return cleaned;
}

/**
 * Standardizes temple hierarchy and title references
 * Handles proper forms of monastic titles and temple positions
 */
function standardizeTempleHierarchy(text: string): string {
  let cleaned = text;
  
  // Apply hierarchy standardizations
  for (const [verbose, concise] of Object.entries(TEMPLE_HIERARCHY_TERMS)) {
    const regex = new RegExp(`\\b${verbose}\\b`, 'gi');
    cleaned = cleaned.replace(regex, concise);
  }
  
  return cleaned;
}

/**
 * Standardizes festival and celebration names
 * Ensures consistent capitalization and naming of Air Nomad festivals
 */
function standardizeFestivalNames(text: string): string {
  return text
    .replace(/autumn festival/gi, 'Autumn Festival')
    .replace(/harvest celebration/gi, 'Harvest Celebration')
    .replace(/wind festival/gi, 'Wind Festival')
    .replace(/meditation retreat/gi, 'Meditation Retreat')
    .replace(/temple gathering/gi, 'Temple Gathering')
    .replace(/spiritual ceremony/gi, 'Spiritual Ceremony');
}

/**
 * ADVANCED: Detects and adjusts lore density for readability
 * Identifies overly dense cultural language and provides lighter alternatives
 */
function adjustLoreDensity(text: string): string {
  // Count total lore density
  let totalLoreWords = 0;
  const wordCount = text.split(/\s+/).length;
  
  for (const pattern of DENSE_LORE_PATTERNS) {
    const matches = text.match(pattern) || [];
    totalLoreWords += matches.length;
  }
  
  const loreDensity = totalLoreWords / wordCount;
  
  // If more than 20% of words are lore-heavy, apply lightening
  if (loreDensity > 0.20) {
    return lightenOverlyDenseLore(text);
  }
  
  // If more than 15% but less than 20%, apply moderate lightening
  if (loreDensity > 0.15) {
    return moderatelyLightenLore(text);
  }
  
  return text;
}

/**
 * Applies heavy lore lightening for very dense cultural language
 */
function lightenOverlyDenseLore(text: string): string {
  let lightened = text;
  
  // Apply heavy alternatives to reduce density
  for (const [heavy, light] of Object.entries(LORE_ALTERNATIVES.heavy)) {
    const regex = new RegExp(`\\b${heavy}\\b`, 'gi');
    lightened = lightened.replace(regex, light);
  }
  
  return lightened;
}

/**
 * Applies moderate lore lightening for moderately dense cultural language
 */
function moderatelyLightenLore(text: string): string {
  let lightened = text;
  
  // Count occurrences and only replace excess instances
  for (const [heavy, light] of Object.entries(LORE_ALTERNATIVES.moderate)) {
    const regex = new RegExp(`\\b${heavy}\\b`, 'gi');
    const matches = text.match(regex) || [];
    
    if (matches.length > 2) {
      // Replace every third occurrence to reduce density gradually
      let replacementCount = 0;
      lightened = lightened.replace(regex, (match) => {
        replacementCount++;
        if (replacementCount % 3 === 0) {
          return light;
        }
        return match;
      });
    }
  }
  
  return lightened;
}

/**
 * Detects excessive ritual language patterns for monitoring
 * Returns density metrics for external analysis
 */
export function analyzeRitualDensity(text: string): {
  density: number;
  totalWords: number;
  ritualWords: number;
  needsLightening: boolean;
} {
  let totalRitualWords = 0;
  const wordCount = text.split(/\s+/).length;
  
  for (const pattern of DENSE_LORE_PATTERNS) {
    const matches = text.match(pattern) || [];
    totalRitualWords += matches.length;
  }
  
  const density = totalRitualWords / wordCount;
  
  return {
    density,
    totalWords: wordCount,
    ritualWords: totalRitualWords,
    needsLightening: density > 0.15
  };
}

/**
 * Applies specific Air Nomad contextual fixes based on common patterns
 * Handles specific linguistic patterns unique to Air Nomad cuisine descriptions
 */
export function applyAirNomadContextualFixes(text: string): string {
  return text
    // Fix common Air Nomad phrase structures
    .replace(/through the winds of/gi, 'through winds of')
    .replace(/within the temples of/gi, 'within temples of')
    .replace(/among the peaks of/gi, 'among peaks of')
    .replace(/beneath the guidance of/gi, 'under guidance of')
    
    // Fix meditation and spiritual context
    .replace(/during moments of deep meditation/gi, 'during deep meditation')
    .replace(/through practices of mindful/gi, 'through mindful')
    .replace(/in states of spiritual/gi, 'in spiritual')
    
    // Fix ingredient context specifics
    .replace(/gathered from the sacred/gi, 'gathered from sacred')
    .replace(/blessed by the temple/gi, 'blessed by temple')
    .replace(/prepared with the wisdom/gi, 'prepared with wisdom')
    
    // Simplify overly complex constructions
    .replace(/in accordance with the ancient traditions of/gi, 'following ancient traditions of')
    .replace(/through the application of traditional/gi, 'through traditional')
    .replace(/by means of the sacred/gi, 'by sacred');
} 