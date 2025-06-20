/**
 * Phase 3: Flow & Syntax Refinement Engine
 * 
 * Advanced sentence structure and flow system that transforms
 * disconnected phrases into flowing, natural prose.
 * 
 * Features:
 * - Context-aware punctuation and conjunctions
 * - Sentence structure variety and sophistication
 * - Adjacency filtering for phrase types
 * - Grammar pattern recognition and correction
 */

import { selectWithAntiClustering } from './weighted-selection.js';

/** Phrase type classification for adjacency filtering */
export type PhraseType = 
  | 'spiritual_opening'    // "A sacred dish blessed by..."
  | 'location_context'     // "From the Eastern Air Temple..."
  | 'preparation_method'   // "prepared using ancient techniques..."
  | 'serving_context'      // "served during the Hour of Rising Sun..."
  | 'sensory_description'  // "whisper-soft and aromatic..."
  | 'cultural_significance' // "following ancient Air Nomad traditions..."
  | 'temporal_context'     // "during the Festival of Four Winds..."
  | 'ingredient_focus'     // "with sacred mushrooms and herbs..."
  | 'technique_detail'     // "using steam-whipped methods..."
  | 'spiritual_benefit';   // "channels serene temple energy...";

/** Advanced conjunction and transition system */
export interface FlowConnector {
  type: 'simple' | 'transitional' | 'causal' | 'temporal' | 'descriptive' | 'spiritual';
  text: string;
  weight: number;
  followingPunctuation?: ',' | ';' | '.' | '';
  precedingPunctuation?: ',' | ';' | '.' | '';
}

/** Sophisticated conjunction system for natural flow */
export const ADVANCED_CONNECTORS: FlowConnector[] = [
  // Simple conjunctions (high frequency)
  { type: 'simple', text: 'and', weight: 0.4, followingPunctuation: '' },
  { type: 'simple', text: 'while', weight: 0.2, followingPunctuation: '' },
  { type: 'simple', text: 'as', weight: 0.15, followingPunctuation: '' },
  
  // Transitional phrases (medium frequency)
  { type: 'transitional', text: 'furthermore', weight: 0.1, followingPunctuation: ',' },
  { type: 'transitional', text: 'moreover', weight: 0.08, followingPunctuation: ',' },
  { type: 'transitional', text: 'in addition', weight: 0.07, followingPunctuation: ',' },
  { type: 'transitional', text: 'likewise', weight: 0.06, followingPunctuation: ',' },
  
  // Causal connections (for logical flow)
  { type: 'causal', text: 'therefore', weight: 0.05, followingPunctuation: ',' },
  { type: 'causal', text: 'thus', weight: 0.04, followingPunctuation: ',' },
  { type: 'causal', text: 'consequently', weight: 0.03, followingPunctuation: ',' },
  { type: 'causal', text: 'as a result', weight: 0.03, followingPunctuation: ',' },
  
  // Temporal connections (for time-based flow)
  { type: 'temporal', text: 'meanwhile', weight: 0.04, followingPunctuation: ',' },
  { type: 'temporal', text: 'subsequently', weight: 0.03, followingPunctuation: ',' },
  { type: 'temporal', text: 'simultaneously', weight: 0.03, followingPunctuation: ',' },
  { type: 'temporal', text: 'afterwards', weight: 0.02, followingPunctuation: ',' },
  
  // Descriptive elaborations (for detail expansion)
  { type: 'descriptive', text: 'specifically', weight: 0.03, followingPunctuation: ',' },
  { type: 'descriptive', text: 'particularly', weight: 0.03, followingPunctuation: ',' },
  { type: 'descriptive', text: 'notably', weight: 0.02, followingPunctuation: ',' },
  { type: 'descriptive', text: 'especially', weight: 0.02, followingPunctuation: ',' }
];

/** Avatar-world specific conjunctions for cultural authenticity */
export const AVATAR_WORLD_CONNECTORS: FlowConnector[] = [
  { type: 'spiritual', text: 'in harmonious balance with', weight: 0.15, followingPunctuation: '' },
  { type: 'spiritual', text: 'while channeling the wisdom of', weight: 0.12, followingPunctuation: '' },
  { type: 'spiritual', text: 'as the ancient teachings guide', weight: 0.10, followingPunctuation: '' },
  { type: 'spiritual', text: 'following the path of', weight: 0.08, followingPunctuation: '' },
  { type: 'spiritual', text: 'in accordance with', weight: 0.07, followingPunctuation: '' },
  { type: 'spiritual', text: 'as sky bison demonstrate through', weight: 0.06, followingPunctuation: '' },
  { type: 'spiritual', text: 'while honoring the tradition of', weight: 0.05, followingPunctuation: '' },
  { type: 'spiritual', text: 'embracing the philosophy that', weight: 0.04, followingPunctuation: '' }
];

/** Sentence opening variety patterns */
export interface SentencePattern {
  name: string;
  structure: 'standalone' | 'dependent_clause' | 'compound' | 'complex';
  openingType: 'subject_first' | 'adverbial' | 'participial' | 'prepositional';
  example: string;
  weight: number;
}

export const SENTENCE_PATTERNS: SentencePattern[] = [
  // Standalone sentences (simple and direct)
  {
    name: 'simple_subject_first',
    structure: 'standalone', 
    openingType: 'subject_first',
    example: 'This sacred dish embodies ancient wisdom.',
    weight: 0.25
  },
  {
    name: 'simple_with_adjective',
    structure: 'standalone',
    openingType: 'subject_first', 
    example: 'Cherished by Air Nomad monks, this creation inspires tranquility.',
    weight: 0.20
  },
  
  // Dependent clause starters (sophisticated flow)
  {
    name: 'adverbial_opening',
    structure: 'dependent_clause',
    openingType: 'adverbial',
    example: 'While temple bells chime at dawn, this dish nourishes both body and spirit.',
    weight: 0.15
  },
  {
    name: 'participial_opening', 
    structure: 'dependent_clause',
    openingType: 'participial',
    example: 'Blessed by ancient airbending masters, this preparation transcends ordinary sustenance.',
    weight: 0.12
  },
  
  // Prepositional phrase openings (varied rhythm)
  {
    name: 'prepositional_location',
    structure: 'complex',
    openingType: 'prepositional',
    example: 'From the floating gardens of the Western Air Temple, this dish emerges as a testament to spiritual harmony.',
    weight: 0.10
  },
  {
    name: 'prepositional_time',
    structure: 'complex', 
    openingType: 'prepositional',
    example: 'During the Festival of Four Winds, this sacred offering connects diners to cosmic energy.',
    weight: 0.08
  },
  
  // Compound structures (sophisticated joining)
  {
    name: 'compound_balanced',
    structure: 'compound',
    openingType: 'subject_first',
    example: 'This ethereal creation honors ancient traditions, and its preparation channels the wisdom of sky bison.',
    weight: 0.10
  }
];

/**
 * Classifies phrase type for adjacency filtering
 * Phase 3 Task: Prevent back-to-back phrases of same type
 */
export function classifyPhraseType(phrase: string): PhraseType {
  const lowerPhrase = phrase.toLowerCase();
  
  // Spiritual/Sacred openings
  if (lowerPhrase.includes('sacred') || lowerPhrase.includes('blessed') || 
      lowerPhrase.includes('divine') || lowerPhrase.includes('holy') ||
      lowerPhrase.includes('spirit') || lowerPhrase.includes('avatar')) {
    return 'spiritual_opening';
  }
  
  // Location context (temple, geographical)
  if (lowerPhrase.includes('temple') || lowerPhrase.includes('eastern') || 
      lowerPhrase.includes('western') || lowerPhrase.includes('northern') ||
      lowerPhrase.includes('southern') || lowerPhrase.includes('mountain') ||
      lowerPhrase.includes('from the')) {
    return 'location_context';
  }
  
  // Preparation methods
  if (lowerPhrase.includes('prepared') || lowerPhrase.includes('crafted') || 
      lowerPhrase.includes('created') || lowerPhrase.includes('formed') ||
      lowerPhrase.includes('using') || lowerPhrase.includes('employing') ||
      lowerPhrase.includes('method') || lowerPhrase.includes('technique')) {
    return 'preparation_method';
  }
  
  // Serving context
  if (lowerPhrase.includes('served') || lowerPhrase.includes('offered') || 
      lowerPhrase.includes('shared') || lowerPhrase.includes('presented') ||
      lowerPhrase.includes('distributed') || lowerPhrase.includes('during')) {
    return 'serving_context';
  }
  
  // Temporal context (festivals, seasons, times)
  if (lowerPhrase.includes('festival') || lowerPhrase.includes('ceremony') ||
      lowerPhrase.includes('celebration') || lowerPhrase.includes('dawn') ||
      lowerPhrase.includes('sunset') || lowerPhrase.includes('season')) {
    return 'temporal_context';
  }
  
  // Sensory descriptions
  if (lowerPhrase.includes('aromatic') || lowerPhrase.includes('fragrant') ||
      lowerPhrase.includes('whisper-soft') || lowerPhrase.includes('delicate') ||
      lowerPhrase.includes('texture') || lowerPhrase.includes('flavor')) {
    return 'sensory_description';
  }
  
  // Ingredient focus
  if (lowerPhrase.includes('mushroom') || lowerPhrase.includes('herb') ||
      lowerPhrase.includes('fruit') || lowerPhrase.includes('vegetable') ||
      lowerPhrase.includes('with ') || lowerPhrase.includes('ingredient')) {
    return 'ingredient_focus';
  }
  
  // Technique details
  if (lowerPhrase.includes('steam') || lowerPhrase.includes('simmer') ||
      lowerPhrase.includes('whipped') || lowerPhrase.includes('dried') ||
      lowerPhrase.includes('bending') || lowerPhrase.includes('circular')) {
    return 'technique_detail';
  }
  
  // Spiritual benefits
  if (lowerPhrase.includes('channels') || lowerPhrase.includes('awakens') ||
      lowerPhrase.includes('enhances') || lowerPhrase.includes('aligns') ||
      lowerPhrase.includes('chakra') || lowerPhrase.includes('energy')) {
    return 'spiritual_benefit';
  }
  
  // Default to cultural significance
  return 'cultural_significance';
}

/**
 * Advanced adjacency filter to prevent same-type clustering
 * Phase 3 Task: Don't allow back-to-back phrases of same type
 */
export function hasAdjacentTypeConflict(phrases: string[]): boolean {
  if (phrases.length < 2) return false;
  
  const types = phrases.map(classifyPhraseType);
  
  // Check for adjacent same types
  for (let i = 0; i < types.length - 1; i++) {
    if (types[i] === types[i + 1]) {
      return true;
    }
  }
  
  // Check for problematic patterns
  const problematicPatterns = [
    ['spiritual_opening', 'spiritual_benefit'],  // Too much spirituality clustering
    ['location_context', 'temporal_context'],    // Geographic + time can conflict
    ['preparation_method', 'technique_detail'],  // Redundant technique focus
    ['serving_context', 'temporal_context']      // Time serving redundancy
  ];
  
  for (const [type1, type2] of problematicPatterns) {
    for (let i = 0; i < types.length - 1; i++) {
      if ((types[i] === type1 && types[i + 1] === type2) ||
          (types[i] === type2 && types[i + 1] === type1)) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Advanced phrase concatenation with context-aware punctuation
 * Phase 3 Task: Join with context-aware punctuation, not just commas
 */
export function joinPhrasesWithAdvancedFlow(phrases: string[]): string {
  if (phrases.length === 0) return '';
  if (phrases.length === 1) return ensureProperEnding(phrases[0]);
  
  // Verify no adjacency conflicts
  if (hasAdjacentTypeConflict(phrases)) {
    console.warn('Adjacent type conflict detected in phrase joining');
  }
  
  const result: string[] = [];
  
  for (let i = 0; i < phrases.length; i++) {
    const currentPhrase = phrases[i];
    const nextPhrase = phrases[i + 1];
    
    // Add the current phrase
    result.push(currentPhrase);
    
    // If not the last phrase, add appropriate connector
    if (nextPhrase) {
      const connector = selectOptimalConnector(currentPhrase, nextPhrase, i, phrases.length);
      result.push(connector);
    }
  }
  
  let joinedText = result.join(' ');
  
  // Clean up spacing and punctuation
  joinedText = cleanupPunctuation(joinedText);
  
  return ensureProperEnding(joinedText);
}

/**
 * Selects optimal connector based on phrase context and position
 */
function selectOptimalConnector(
  currentPhrase: string, 
  nextPhrase: string, 
  position: number, 
  totalPhrases: number
): string {
  const currentType = classifyPhraseType(currentPhrase);
  const nextType = classifyPhraseType(nextPhrase);
  const isLast = position === totalPhrases - 2;
  
  // For final connections, prefer strong conjunctions
  if (isLast) {
    const finalConnectors = [
      'and', 'while', 'as it', 'thereby', 'ultimately'
    ];
    return selectWithAntiClustering(finalConnectors);
  }
  
  // Context-specific connector selection
  const connectorChoices = getContextualConnectors(currentType, nextType);
  
  // Avatar-world spiritual connectors for certain combinations
  if ((currentType === 'spiritual_opening' && nextType === 'preparation_method') ||
      (currentType === 'preparation_method' && nextType === 'spiritual_benefit')) {
    const avatarConnector = selectWithAntiClustering(AVATAR_WORLD_CONNECTORS.map(c => c.text));
    if (Math.random() < 0.3) { // 30% chance for Avatar-specific connectors
      return avatarConnector;
    }
  }
  
  // Select from appropriate connectors
  const selectedConnector = selectWithAntiClustering(connectorChoices);
  
  // Add punctuation based on connector type
  const connectorData = ADVANCED_CONNECTORS.find(c => c.text === selectedConnector);
  if (connectorData?.followingPunctuation) {
    return selectedConnector + connectorData.followingPunctuation;
  }
  
  return selectedConnector;
}

/**
 * Gets contextually appropriate connectors for phrase type combinations
 */
function getContextualConnectors(currentType: PhraseType, nextType: PhraseType): string[] {
  // Spiritual to preparation: flowing spiritual language
  if (currentType === 'spiritual_opening' && nextType === 'preparation_method') {
    return ['while', 'as', 'through', 'by', 'via'];
  }
  
  // Preparation to serving: temporal flow
  if (currentType === 'preparation_method' && nextType === 'serving_context') {
    return ['and', 'then', 'before being', 'subsequently', 'thereafter'];
  }
  
  // Location to preparation: establishing context
  if (currentType === 'location_context' && nextType === 'preparation_method') {
    return ['where it is', 'through', 'using', 'by means of', 'via'];
  }
  
  // Serving to spiritual: conclusion flow
  if (currentType === 'serving_context' && nextType === 'spiritual_benefit') {
    return ['to', 'thereby', 'thus', 'in order to', 'so as to'];
  }
  
  // Default connectors for other combinations
  return ['and', 'while', 'as', 'with', 'through'];
}

/**
 * Varies sentence structure by applying different opening patterns
 * Phase 3 Task: Vary opening structure; sometimes standalone, other times as clause
 */
export function applyStructuralVariety(phrases: string[]): string[] {
  if (phrases.length < 2) return phrases;
  
  const patterns = selectWithAntiClustering(SENTENCE_PATTERNS.map(p => p.name));
  const selectedPattern = SENTENCE_PATTERNS.find(p => p.name === patterns);
  
  if (!selectedPattern) return phrases;
  
  // Apply structural transformation based on pattern
  switch (selectedPattern.structure) {
    case 'standalone':
      return transformToStandalone(phrases);
    
    case 'dependent_clause':
      return transformToDependentClause(phrases);
    
    case 'compound':
      return transformToCompound(phrases);
    
    case 'complex':
      return transformToComplex(phrases);
    
    default:
      return phrases;
  }
}

/**
 * Transforms phrases into standalone sentence structure
 */
function transformToStandalone(phrases: string[]): string[] {
  // Simple transformation: capitalize first phrase, ensure others flow
  const result = [...phrases];
  result[0] = capitalizeFirstLetter(result[0]);
  return result;
}

/**
 * Transforms phrases into dependent clause structure
 */
function transformToDependentClause(phrases: string[]): string[] {
  if (phrases.length < 2) return phrases;
  
  const dependentStarters = [
    'While', 'As', 'When', 'Although', 'Because', 'Since', 'If', 'Unless', 'Before', 'After'
  ];
  
  const starter = selectWithAntiClustering(dependentStarters);
  const result = [...phrases];
  
  // Transform first phrase into dependent clause
  result[0] = `${starter} ${result[0].toLowerCase()}`;
  
  return result;
}

/**
 * Transforms phrases into compound sentence structure
 */
function transformToCompound(phrases: string[]): string[] {
  if (phrases.length < 2) return phrases;
  
  const midPoint = Math.floor(phrases.length / 2);
  const firstHalf = phrases.slice(0, midPoint);
  const secondHalf = phrases.slice(midPoint);
  
  // Join halves with compound connector
  const compoundConnectors = ['and', 'but', 'yet', 'for', 'so'];
  const connector = selectWithAntiClustering(compoundConnectors);
  
  return [
    joinPhrasesWithAdvancedFlow(firstHalf),
    connector,
    joinPhrasesWithAdvancedFlow(secondHalf)
  ];
}

/**
 * Transforms phrases into complex sentence structure
 */
function transformToComplex(phrases: string[]): string[] {
  // Add subordinating elements and relative clauses
  const result = [...phrases];
  
  // Insert relative clause connectors
  const relatives = ['which', 'that', 'where', 'when', 'whose'];
  const relative = selectWithAntiClustering(relatives);
  
  if (result.length >= 2) {
    result.splice(1, 0, `, ${relative}`);
  }
  
  return result;
}

/**
 * Cleanup and standardization functions
 */
function cleanupPunctuation(text: string): string {
  return text
    .replace(/\s+/g, ' ')              // Multiple spaces to single
    .replace(/\s+,/g, ',')             // Space before comma
    .replace(/\s+\./g, '.')            // Space before period
    .replace(/,\s*,/g, ',')            // Double commas
    .replace(/\.\s*\./g, '.')          // Double periods
    .replace(/,\s*\./g, '.')           // Comma before period
    .replace(/\s+;/g, ';')             // Space before semicolon
    .trim();
}

function ensureProperEnding(text: string): string {
  if (!text) return text;
  
  const trimmed = text.trim();
  if (!trimmed.match(/[.!?]$/)) {
    return trimmed + '.';
  }
  
  return trimmed;
}

function capitalizeFirstLetter(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Lightweight grammar correction patterns
 * Phase 3 Optional Task: Grammar correction pass
 */
export interface GrammarRule {
  pattern: RegExp;
  replacement: string;
  description: string;
}

export const GRAMMAR_CORRECTION_RULES: GrammarRule[] = [
  {
    pattern: /\s+for its\s+([a-z])/gi,
    replacement: ' for its $1',
    description: 'Fix "for its lovingly" pattern issues'
  },
  {
    pattern: /\b(a|an)\s+(a|an)\s+/gi,
    replacement: '$1 ',
    description: 'Remove duplicate articles'
  },
  {
    pattern: /\b(the)\s+(the)\s+/gi,
    replacement: 'the ',
    description: 'Remove duplicate "the"'
  },
  {
    pattern: /\b(and)\s+(and)\s+/gi,
    replacement: 'and ',
    description: 'Remove duplicate "and"'
  },
  {
    pattern: /\b(with)\s+(with)\s+/gi,
    replacement: 'with ',
    description: 'Remove duplicate "with"'
  },
  {
    pattern: /\b(in)\s+(in)\s+/gi,
    replacement: 'in ',
    description: 'Remove duplicate "in"'
  },
  {
    pattern: /,\s*and\s*,/gi,
    replacement: ', and',
    description: 'Fix comma and comma patterns'
  },
  {
    pattern: /\.\s*\.\s*/g,
    replacement: '. ',
    description: 'Remove duplicate periods'
  }
];

/**
 * Applies lightweight grammar correction
 * Phase 3 Optional Task: Integrate grammar correction pass
 */
export function applyGrammarCorrection(text: string): string {
  let corrected = text;
  
  for (const rule of GRAMMAR_CORRECTION_RULES) {
    corrected = corrected.replace(rule.pattern, rule.replacement);
  }
  
  return corrected;
}

/**
 * Main Phase 3 flow processing function
 * Combines all flow enhancements into single interface
 */
export function processWithAdvancedFlow(phrases: string[]): string {
  // Step 1: Apply structural variety
  const structuredPhrases = applyStructuralVariety(phrases);
  
  // Step 2: Advanced phrase joining with flow
  const joinedText = joinPhrasesWithAdvancedFlow(structuredPhrases);
  
  // Step 3: Apply grammar correction
  const correctedText = applyGrammarCorrection(joinedText);
  
  return correctedText;
} 