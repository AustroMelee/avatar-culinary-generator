/**
 * Pure text processing cleanup engine 
 * Handles grammar fixes, anti-repetition, and text flow without domain-specific knowledge
 * Focused on linguistic patterns rather than cultural context
 */

/**
 * SENTENCE-LEVEL DEDUPLICATION SYSTEM
 * Tracks full sentences to prevent repetition across dish generations
 */
let sentenceHistory: Set<string> = new Set();
const MAX_SENTENCE_HISTORY = 50; // Track last 50 unique sentences

/**
 * RITUAL JARGON DETECTION PATTERNS
 * Identifies overly dense cultural language for lightening
 */
const RITUAL_DENSITY_PATTERNS = [
  /\b(sacred|divine|blessed|holy|mystical|spiritual)\b/gi,
  /\b(ancient|eternal|timeless|ageless)\b/gi,
  /\b(ritual|ceremony|meditation|prayer)\b/gi,
  /\b(temple|shrine|altar|monastery)\b/gi
];

const RITUAL_REPLACEMENTS: Record<string, string[]> = {
  'sacred': ['special', 'treasured', 'honored', 'revered'],
  'divine': ['wonderful', 'exceptional', 'remarkable', 'inspiring'],
  'blessed': ['favored', 'cherished', 'prized', 'valued'],
  'mystical': ['unique', 'distinctive', 'intriguing', 'fascinating'],
  'ancient': ['traditional', 'time-honored', 'classic', 'enduring'],
  'eternal': ['lasting', 'enduring', 'persistent', 'ongoing'],
  'ritual': ['tradition', 'practice', 'custom', 'method'],
  'ceremony': ['celebration', 'gathering', 'occasion', 'event']
};

/**
 * Core text cleanup engine with enhanced deduplication and jargon control
 * Applies comprehensive cleanup optimizations for Avatar world dish descriptions
 */
export function applyTextCleanup(text: string): string {
  let cleaned = text;
  
  // Apply basic cleanup passes
  cleaned = applyCritiqueFixes(cleaned);
  cleaned = applySingleCleanupPass(cleaned);
  cleaned = fixBrokenSentences(cleaned);
  cleaned = fixWordRepetition(cleaned);
  cleaned = fixArticleGrammar(cleaned);
  cleaned = fixCompoundWords(cleaned);
  cleaned = fixSentenceStructure(cleaned);
  cleaned = fixPunctuationAndCapitalization(cleaned);
  cleaned = fixListFormatting(cleaned);
  cleaned = fixSpiritualBenefits(cleaned);
  
  // NEW: Apply sentence-level deduplication
  cleaned = applySentenceDeduplication(cleaned);
  
  // NEW: Lighten excessive ritual jargon if detected
  cleaned = lightenRitualJargon(cleaned);
  
  return cleaned;
}

/**
 * NEW: Applies sentence-level deduplication to prevent repetitive prose
 * Tracks sentences across multiple dish generations to ensure variety
 */
function applySentenceDeduplication(text: string): string {
  const sentences = text.split(/\.\s+/).filter(s => s.trim().length > 10);
  const modifiedSentences: string[] = [];
  
  for (let sentence of sentences) {
    // Normalize sentence for comparison (remove minor variations)
    const normalized = sentence.toLowerCase().replace(/[^a-z\s]/g, '').trim();
    
    if (sentenceHistory.has(normalized)) {
      // Sentence has been used recently, try to modify it
      sentence = modifySentenceForVariety(sentence);
    } else {
      // Track this new sentence
      sentenceHistory.add(normalized);
      
      // Limit history size
      if (sentenceHistory.size > MAX_SENTENCE_HISTORY) {
        const firstSentence = Array.from(sentenceHistory)[0];
        sentenceHistory.delete(firstSentence);
      }
    }
    
    modifiedSentences.push(sentence);
  }
  
  return modifiedSentences.join('. ') + '.';
}

/**
 * NEW: Modifies repeated sentences to create variety
 * Uses synonym replacement and structural variation
 */
function modifySentenceForVariety(sentence: string): string {
  const synonymSets = {
    'creates': ['forms', 'produces', 'generates', 'develops'],
    'provides': ['offers', 'delivers', 'brings', 'gives'],
    'enhances': ['improves', 'strengthens', 'amplifies', 'deepens'],
    'promotes': ['encourages', 'supports', 'fosters', 'cultivates'],
    'tradition': ['custom', 'practice', 'heritage', 'legacy'],
    'harmony': ['balance', 'unity', 'accord', 'peace'],
    'wisdom': ['knowledge', 'insight', 'understanding', 'guidance']
  };
  
  let modified = sentence;
  
  // Apply synonym replacements
  for (const [original, synonyms] of Object.entries(synonymSets)) {
    const regex = new RegExp(`\\b${original}\\b`, 'gi');
    if (regex.test(modified)) {
      const randomSynonym = synonyms[Math.floor(Math.random() * synonyms.length)];
      modified = modified.replace(regex, randomSynonym);
      break; // Only replace one word to maintain readability
    }
  }
  
  return modified;
}

/**
 * NEW: Lightens excessive ritual jargon when density is too high
 * Detects overly dense cultural language and applies lighter alternatives
 */
function lightenRitualJargon(text: string): string {
  // Count ritual/ceremony references
  const ritualMatches = (text.match(/\b(ritual|ceremony|sacred|divine|mystical)\b/gi) || []).length;
  const wordCount = text.split(/\s+/).length;
  const ritualDensity = ritualMatches / wordCount;
  
  // If more than 15% of words are ritual-related, lighten the language
  if (ritualDensity > 0.15) {
    let lightened = text;
    
    // Apply lighter alternatives to overly dense ritual language
    for (const [heavy, alternatives] of Object.entries(RITUAL_REPLACEMENTS)) {
      const regex = new RegExp(`\\b${heavy}\\b`, 'gi');
      const matches = text.match(regex);
      
      if (matches && matches.length > 2) {
        // If a word appears more than twice, replace some instances
        let replacementCount = 0;
        lightened = lightened.replace(regex, (match) => {
          replacementCount++;
          if (replacementCount > 2) {
            return alternatives[Math.floor(Math.random() * alternatives.length)];
          }
          return match;
        });
      }
    }
    
    return lightened;
  }
  
  return text;
}

/**
 * Applies specific fixes identified in critique passes
 */
function applyCritiqueFixes(text: string): string {
  return text
    // Fix doubled determiners specific to critique
    .replace(/for the sacred the ([^,]+)/gi, 'for the sacred $1')
    .replace(/for the sacred monk the ([^,]+)/gi, 'for the sacred $1')
    .replace(/during the sacred the ([^,]+)/gi, 'during the sacred $1')
    .replace(/in the ancient the ([^,]+)/gi, 'in the ancient $1');
}

/**
 * Applies single comprehensive cleanup pass with optimized patterns
 */
function applySingleCleanupPass(text: string): string {
  return text
    // Fix redundant word patterns  
    .replace(/flavors dance between flavors/gi, 'flavors dance between transcendence')
    .replace(/tastes blend with tastes/gi, 'tastes blend with essence')
    .replace(/aromas mix with aromas/gi, 'aromas mix with fragrances')
    .replace(/essence merges with essence/gi, 'essence merges with spirit')
    
    // Fix missing connectors
    .replace(/(\w+) cornerstone of (\w+) festivities, prepared/gi, '$1 and becomes a cornerstone of $2 festivities, prepared')
    .replace(/(\w+)\. Essential to (\w+) traditions, this dish/gi, '$1. Essential to $2 traditions, this dish')
    .replace(/(\w+)\. Central to (\w+) rituals, it embraces/gi, '$1. Central to $2 rituals, it embraces')
    .replace(/(\w+)\. Fundamental to (\w+) ceremonies, it honors/gi, '$1. Fundamental to $2 ceremonies, it honors');
}

/**
 * Fixes broken sentence constructions and missing words
 */
function fixBrokenSentences(text: string): string {
  return text
    .replace(/through used for (\w+)/gi, 'used for $1')
    .replace(/through traditionally (\w+)/gi, 'traditionally $1')
    .replace(/through for (\w+) (\w+)/gi, '$1 for $2')
    .replace(/as the ingredients/gi, 'as the ingredients')
    .replace(/as (\w+) is (\w+)/gi, 'as $1 is $2')
    
    // Fix broken conjunctions
    .replace(/moments where brings/gi, 'creating moments that bring')
    .replace(/while generates/gi, 'and generates')
    .replace(/where brings the safety/gi, 'that brings the safety')
    .replace(/while creates/gi, 'and creates')
    .replace(/while nurtures/gi, 'and nurtures')
    .replace(/while promotes/gi, 'and promotes')
    
    // Fix missing determiners
    .replace(/reveals taste of/gi, 'reveals the taste of')
    .replace(/shows essence of/gi, 'shows the essence of')
    .replace(/displays flavor of/gi, 'displays the flavor of')
    .replace(/carries wisdom of/gi, 'carries the wisdom of');
}

/**
 * Fixes word repetition and cascading phrase issues
 */
function fixWordRepetition(text: string): string {
  return text
    // Fix cascading phrase repetitions
    .replace(/cascading selected for/gi, 'selected for')
    .replace(/chosen for selected/gi, 'chosen for')
    .replace(/selected for chosen/gi, 'selected for')
    
    // Fix direct word repetition
    .replace(/(\b\w+\b)\s+\1\b/gi, '$1')
    .replace(/\bthe\s+the\b/gi, 'the')
    .replace(/\band\s+and\b/gi, 'and')
    .replace(/\bwith\s+with\b/gi, 'with')
    .replace(/\bthrough\s+through\b/gi, 'through')
    .replace(/\bwhile\s+while\b/gi, 'while')
    .replace(/\benhancing\s+enhancing\b/gi, 'enhancing')
    .replace(/\bembodies\s+embodies\b/gi, 'embodies')
    .replace(/\brepresents\s+represents\b/gi, 'represents')
    
    // Fix synonym repetition
    .replace(/embodies represents/gi, 'embodies')
    .replace(/represents embodies/gi, 'represents')
    .replace(/enhancing improving/gi, 'enhancing')
    .replace(/improving enhancing/gi, 'improving')
    .replace(/ancient traditional/gi, 'ancient')
    .replace(/traditional ancient/gi, 'traditional')
    
    // Fix broken word combinations
    .replace(/profoundish/gi, 'profound')
    .replace(/transcendental transcendent/gi, 'transcendent')
    .replace(/spiritual spirituality/gi, 'spiritual')
    .replace(/meditative meditation/gi, 'meditative');
}

/**
 * Fixes article and basic grammar issues
 */
function fixArticleGrammar(text: string): string {
  return text
    // Fix article issues
    .replace(/\ba essence\b/gi, 'an essence')
    .replace(/\ba aroma\b/gi, 'an aroma')
    .replace(/\ba ancient\b/gi, 'an ancient')
    .replace(/\ba elevated\b/gi, 'an elevated')
    .replace(/\ba ethereal\b/gi, 'an ethereal')
    .replace(/\ba inner\b/gi, 'an inner')
    .replace(/\ba understanding\b/gi, 'an understanding')
    
    // Fix plural/singular mismatches
    .replace(/ingredient are/gi, 'ingredient is')
    .replace(/technique are/gi, 'technique is');
}

/**
 * Fixes compound words and spacing issues
 */
function fixCompoundWords(text: string): string {
  return text
    // Fix missing spaces in compound words
    .replace(/displayspirit-realm/gi, 'displays spirit-realm')
    .replace(/starlighthat/gi, 'starlight that')
    .replace(/windthat/gi, 'wind that')
    .replace(/templekitchen/gi, 'temple kitchen')
    .replace(/mountainpeaks/gi, 'mountain peaks')
    .replace(/prayerwheels/gi, 'prayer wheels')
    
    // Fix hyphenation issues
    .replace(/spirit\s+realm/gi, 'spirit-realm')
    .replace(/mountain\s+top/gi, 'mountain-top')
    .replace(/temple\s+bells/gi, 'temple bells')
    .replace(/prayer\s+flags/gi, 'prayer flags');
}

/**
 * Fixes complex sentence structure and flow issues
 */
function fixSentenceStructure(text: string): string {
  return text
    // Fix run-on sentences with missing punctuation
    .replace(/([^.]+)\. ([^,]+), ([^,]+), and ([^—]+)—each/gi, '$1. $2, $3, and $4—each')
    .replace(/([^.]+)\. ([^,]+) and ([^—]+)—each/gi, '$1. $2 and $3—each')
    
    // Fix comma splices in long sentences
    .replace(/([^,]+), especially when ([^.]+)\. ([^.]+) as ([^.]+)/gi, '$1, especially when $2. $3 as $4')
    .replace(/([^,]+), especially when paired with ([^.]+)\. As ([^.]+)/gi, '$1, especially when paired with $2. As $3')
    
    // Fix complex run-on sentences with multiple clauses
    .replace(/fills the temple kitchen\. ([^.]+) unfolds/gi, 'fills the temple kitchen. $1 unfolds')
    .replace(/cosmic energy essence fills ([^.]+)\. The ([^.]+)/gi, 'cosmic energy essence fills $1. The $2')
    .replace(/([^.]+) and ([^.]+)\. In doing so, it ([^.]+)/gi, '$1 and $2. In doing so, it $3')
    
    // Fix specific grammar issues identified in critique
    .replace(/Flavors that transcend earthly bounds unfold/gi, 'Flavors that transcend earthly bounds unfold')
    .replace(/([^.]+) unfold like ancient scrolls, while ([^.]+) ground/gi, '$1 unfold like ancient scrolls, while $2 ground');
}

/**
 * Fixes punctuation and capitalization issues
 */
function fixPunctuationAndCapitalization(text: string): string {
  return text
    // Fix basic punctuation
    .replace(/\.\./g, '.')
    .replace(/,,/g, ',')
    .replace(/;;/g, ';')
    
    // Fix spacing around punctuation
    .replace(/\s+,/g, ',')
    .replace(/,(?!\s)/g, ', ')
    .replace(/\s+\./g, '.')
    .replace(/\.(?!\s|$)/g, '. ')
    
    // Fix capitalization after periods
    .replace(/\.\s*([a-z])/g, (_, letter) => '. ' + letter.toUpperCase())
    
    // Fix capitalization after colons in some cases
    .replace(/:\s*([a-z])/g, (_, letter) => ': ' + letter.toUpperCase());
}

/**
 * Fixes list formatting and enumeration issues
 */
function fixListFormatting(text: string): string {
  return text
    // Fix missing commas in lists
    .replace(/(\w+) (\w+) and (\w+) (\w+)/g, '$1, $2, and $3 $4')
    
    // Fix Oxford comma consistency
    .replace(/(\w+), (\w+) and (\w+)/g, '$1, $2, and $3')
    
    // Fix list continuation issues
    .replace(/; and (\w+)/g, ', and $1');
}

/**
 * Fixes spiritual benefits formatting and redundancy
 */
function fixSpiritualBenefits(text: string): string {
  return text
    // Fix benefit description formatting
    .replace(/spiritual benefit:\s*([a-z])/gi, 'spiritual benefit: $1')
    
    // Fix redundant benefit statements
    .replace(/enhances meditation enhances/gi, 'enhances meditation and')
    .replace(/promotes peace promotes/gi, 'promotes peace and');
}

/**
 * NEW: Resets sentence history for fresh generation cycles
 * Call this when starting a new batch of dish generation
 */
export function resetSentenceHistory(): void {
  sentenceHistory.clear();
}

/**
 * NEW: Gets current sentence history size for monitoring
 */
export function getSentenceHistorySize(): number {
  return sentenceHistory.size;
} 