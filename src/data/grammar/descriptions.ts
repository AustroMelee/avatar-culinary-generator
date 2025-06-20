/**
 * Air Nomad Dish Description Grammar System
 * 
 * Provides rich sensory and cultural descriptions for generated dishes.
 * Organized by sensory categories and cultural themes to create
 * immersive and authentic dish descriptions.
 * 
 * Supports modular composition for varied narrative styles.
 */

/** Visual appearance descriptors for dish presentation */
export type VisualDescriptor = 
  | 'golden'
  | 'emerald'
  | 'pearl-white'
  | 'sunset-orange'
  | 'sky-blue'
  | 'cloud-like'
  | 'translucent'
  | 'shimmering'
  | 'radiant'
  | 'delicate'
  | 'ethereal'
  | 'pristine'
  | 'luminous'
  | 'silky'
  | 'velvety'
  | 'crystalline'
  | 'gossamer'
  | 'flowing'
  | 'layered'
  | 'artfully arranged';

/** Aromatic and scent descriptors */
export type AromaDescriptor = 
  | 'fragrant'
  | 'aromatic'
  | 'perfumed'
  | 'floral'
  | 'herbal'
  | 'citrusy'
  | 'sweet'
  | 'earthy'
  | 'fresh'
  | 'crisp'
  | 'subtle'
  | 'intoxicating'
  | 'calming'
  | 'invigorating'
  | 'delicate'
  | 'complex'
  | 'harmonious'
  | 'balanced'
  | 'uplifting'
  | 'serene';

/** Taste and flavor descriptors */
export type FlavorDescriptor = 
  | 'delicate'
  | 'refined'
  | 'complex'
  | 'harmonious'
  | 'balanced'
  | 'sweet'
  | 'savory'
  | 'umami-rich'
  | 'refreshing'
  | 'cleansing'
  | 'satisfying'
  | 'nourishing'
  | 'invigorating'
  | 'comforting'
  | 'transcendent'
  | 'enlightening'
  | 'pure'
  | 'wholesome'
  | 'revitalizing'
  | 'meditative';

/** Texture and mouthfeel descriptors */
export type TextureDescriptor = 
  | 'silky'
  | 'smooth'
  | 'creamy'
  | 'tender'
  | 'light'
  | 'airy'
  | 'fluffy'
  | 'delicate'
  | 'crisp'
  | 'chewy'
  | 'soft'
  | 'velvety'
  | 'cloud-like'
  | 'ethereal'
  | 'gossamer'
  | 'pillowy'
  | 'melting'
  | 'gentle'
  | 'refined'
  | 'pristine';

/** Cultural and spiritual descriptors */
export type CulturalDescriptor = 
  | 'traditionally prepared'
  | 'ceremonially blessed'
  | 'meditation-inspired'
  | 'spiritually nourishing'
  | 'temple-crafted'
  | 'monastery-blessed'
  | 'ancestrally honored'
  | 'culturally authentic'
  | 'mindfully prepared'
  | 'harmoniously balanced'
  | 'chakra-aligning'
  | 'zen-inspired'
  | 'enlightenment-focused'
  | 'peace-bringing'
  | 'soul-nourishing'
  | 'wisdom-enhancing'
  | 'serenity-inducing'
  | 'balance-restoring'
  | 'purity-embodying'
  | 'transcendence-inspiring';

/** Complete arrays for random selection */
export const VISUAL_DESCRIPTORS: readonly VisualDescriptor[] = [
  'golden',
  'emerald',
  'pearl-white',
  'sunset-orange',
  'sky-blue',
  'cloud-like',
  'translucent',
  'shimmering',
  'radiant',
  'delicate',
  'ethereal',
  'pristine',
  'luminous',
  'silky',
  'velvety',
  'crystalline',
  'gossamer',
  'flowing',
  'layered',
  'artfully arranged',
] as const;

export const AROMA_DESCRIPTORS: readonly AromaDescriptor[] = [
  'fragrant',
  'aromatic',
  'perfumed',
  'floral',
  'herbal',
  'citrusy',
  'sweet',
  'earthy',
  'fresh',
  'crisp',
  'subtle',
  'intoxicating',
  'calming',
  'invigorating',
  'delicate',
  'complex',
  'harmonious',
  'balanced',
  'uplifting',
  'serene',
] as const;

export const FLAVOR_DESCRIPTORS: readonly FlavorDescriptor[] = [
  'delicate',
  'refined',
  'complex',
  'harmonious',
  'balanced',
  'sweet',
  'savory',
  'umami-rich',
  'refreshing',
  'cleansing',
  'satisfying',
  'nourishing',
  'invigorating',
  'comforting',
  'transcendent',
  'enlightening',
  'pure',
  'wholesome',
  'revitalizing',
  'meditative',
] as const;

export const TEXTURE_DESCRIPTORS: readonly TextureDescriptor[] = [
  'silky',
  'smooth',
  'creamy',
  'tender',
  'light',
  'airy',
  'fluffy',
  'delicate',
  'crisp',
  'chewy',
  'soft',
  'velvety',
  'cloud-like',
  'ethereal',
  'gossamer',
  'pillowy',
  'melting',
  'gentle',
  'refined',
  'pristine',
] as const;

export const CULTURAL_DESCRIPTORS: readonly CulturalDescriptor[] = [
  'traditionally prepared',
  'ceremonially blessed',
  'meditation-inspired',
  'spiritually nourishing',
  'temple-crafted',
  'monastery-blessed',
  'ancestrally honored',
  'culturally authentic',
  'mindfully prepared',
  'harmoniously balanced',
  'chakra-aligning',
  'zen-inspired',
  'enlightenment-focused',
  'peace-bringing',
  'soul-nourishing',
  'wisdom-enhancing',
  'serenity-inducing',
  'balance-restoring',
  'purity-embodying',
  'transcendence-inspiring',
] as const;

/** Description composition templates */
export type DescriptionTemplate = 
  | 'visual_aroma_flavor'        // "Golden and fragrant with delicate flavors"
  | 'texture_cultural_flavor'    // "Silky, traditionally prepared with complex taste"
  | 'aroma_visual_texture'       // "Aromatic appearance with cloud-like texture"
  | 'cultural_sensory_complete'  // "Spiritually nourishing with radiant appearance..."
  | 'poetic_spiritual'           // Enhanced spiritual/poetic descriptions
  | 'sensory_focus';             // Pure sensory experience

/**
 * Retrieves all visual descriptors
 * @returns Array of visual appearance descriptors
 */
export function getVisualDescriptors(): readonly VisualDescriptor[] {
  return VISUAL_DESCRIPTORS;
}

/**
 * Retrieves all aroma descriptors
 * @returns Array of scent and aromatic descriptors
 */
export function getAromaDescriptors(): readonly AromaDescriptor[] {
  return AROMA_DESCRIPTORS;
}

/**
 * Retrieves all flavor descriptors
 * @returns Array of taste and flavor descriptors
 */
export function getFlavorDescriptors(): readonly FlavorDescriptor[] {
  return FLAVOR_DESCRIPTORS;
}

/**
 * Retrieves all texture descriptors
 * @returns Array of mouthfeel and texture descriptors
 */
export function getTextureDescriptors(): readonly TextureDescriptor[] {
  return TEXTURE_DESCRIPTORS;
}

/**
 * Retrieves all cultural descriptors
 * @returns Array of cultural and spiritual descriptors
 */
export function getCulturalDescriptors(): readonly CulturalDescriptor[] {
  return CULTURAL_DESCRIPTORS;
}

/**
 * Generates a dish description using specified template
 * @param template - The description template to use
 * @param randomSelector - Function to select random elements from arrays
 * @returns Generated description string
 */
export function generateDescriptionByTemplate(
  template: DescriptionTemplate,
  randomSelector: <T>(array: readonly T[]) => T
): string {
  const visual = randomSelector(VISUAL_DESCRIPTORS);
  const aroma = randomSelector(AROMA_DESCRIPTORS);
  const flavor = randomSelector(FLAVOR_DESCRIPTORS);
  const texture = randomSelector(TEXTURE_DESCRIPTORS);
  const cultural = randomSelector(CULTURAL_DESCRIPTORS);

  switch (template) {
    case 'visual_aroma_flavor':
      return `This ${visual} dish releases ${aroma} aromas and delivers ${flavor} flavors that dance on the palate.`;
    
    case 'texture_cultural_flavor':
      return `A ${texture} creation that is ${cultural}, offering ${flavor} notes that satisfy both body and spirit.`;
    
    case 'aroma_visual_texture':
      return `The ${aroma} bouquet complements its ${visual} presentation, while the ${texture} texture provides perfect harmony.`;
    
    case 'cultural_sensory_complete':
      return `This ${cultural} dish presents a ${visual} appearance with ${aroma} aromas. The ${texture} texture carries ${flavor} flavors that nourish the soul.`;
    
    case 'poetic_spiritual':
      return `Like clouds floating across mountain peaks, this ${cultural} creation embodies ${visual} beauty with ${aroma} essence and ${flavor} enlightenment.`;
    
    case 'sensory_focus':
      return `Experience the ${texture} texture, ${visual} beauty, ${aroma} fragrance, and ${flavor} taste in perfect harmony.`;
    
    default:
      // Fallback to simple description
      return `A ${visual} and ${aroma} dish with ${flavor} flavors.`;
  }
}

/**
 * Gets all available description templates
 * @returns Array of all description templates
 */
export function getDescriptionTemplates(): readonly DescriptionTemplate[] {
  return [
    'visual_aroma_flavor',
    'texture_cultural_flavor', 
    'aroma_visual_texture',
    'cultural_sensory_complete',
    'poetic_spiritual',
    'sensory_focus'
  ] as const;
}

/** 
 * COMPREHENSIVE FLAT ARRAYS FOR BRUTE-FORCE DESCRIPTION GENERATION
 * Dense phrasebanks for rich, varied description building
 */

/** Opening phrases and description lead-ins */
export const descriptionLeadIns: string[] = [
  // Sacred/Spiritual Lead-ins
  "A sacred dish, revered for its",
  "A blessed creation, honored for its",
  "A divine offering, celebrated for its",
  "A holy preparation, treasured for its",
  "A consecrated meal, prized for its",
  "A sanctified dish, beloved for its",
  "A spiritual nourishment, cherished for its",
  "A transcendent creation, esteemed for its",
  "A enlightened preparation, valued for its",
  "A meditative dish, appreciated for its",
  
  // Traditional/Cultural Lead-ins
  "Traditionally prepared during",
  "Ceremonially crafted for",
  "Ritually blessed during",
  "Customarily served at",
  "Ancestrally honored during",
  "Culturally significant for",
  "Historically prepared for",
  "Authentically crafted during",
  "Conventionally offered at",
  "Traditionally blessed for",
  
  // Monastic/Temple Lead-ins
  "Cherished by Air Nomad monks for its",
  "Beloved by temple dwellers for its",
  "Treasured by monastery chefs for its",
  "Honored by spiritual masters for its",
  "Revered by ancient abbots for its",
  "Prized by temple elders for its",
  "Celebrated by monastic communities for its",
  "Esteemed by Air Temple residents for its",
  "Valued by contemplative monks for its",
  "Appreciated by meditation masters for its",
  
  // Seasonal/Temporal Lead-ins
  "Perfectly suited for",
  "Ideally prepared during",
  "Seasonally crafted for",
  "Timely offered during",
  "Appropriately served at",
  "Fittingly prepared for",
  "Suitably blessed during",
  "Harmoniously timed for",
  "Balanced for the season of",
  "Aligned with the energy of",
  
  // Sensory/Experience Lead-ins
  "A dish that captivates with its",
  "A creation that enchants through its",
  "A preparation that mesmerizes with its",
  "A culinary experience defined by its",
  "A gastronomic journey featuring its",
  "A sensory adventure highlighted by its",
  "A flavor symphony conducted through its",
  "A aromatic masterpiece showcasing its",
  "A textural delight distinguished by its",
  "A visual feast celebrated for its",
  
  // Philosophical/Poetic Lead-ins
  "Like morning mist on mountain peaks, this dish embodies",
  "As gentle as sky bison breath, this creation offers",
  "Flowing like wind through temple halls, this preparation brings",
  "Drifting like clouds across azure skies, this dish provides",
  "Resonating like temple bells at dawn, this offering delivers",
  "Whispering like ancient prayers, this creation shares",
  "Glowing like lotus lanterns, this dish illuminates",
  "Floating like cherry blossoms, this preparation carries",
  "Echoing like mountain silence, this dish speaks of",
  "Shimmering like starlight on snow, this creation reveals"
];

/** Phrases describing preparation methods and techniques */
export const preparationPhrases: string[] = [
  // Ancient/Traditional Methods
  "using ancient {technique} methods",
  "employing time-honored {technique} traditions",
  "following ancestral {technique} practices",
  "applying sacred {technique} rituals",
  "utilizing blessed {technique} ceremonies",
  "implementing holy {technique} procedures",
  "adopting venerable {technique} approaches",
  "embracing classical {technique} wisdom",
  "honoring traditional {technique} teachings",
  "respecting ancient {technique} knowledge",
  
  // Ingredient-Focused Preparations
  "steeped in wild honey and {ingredient}",
  "infused with {ingredient} and mountain spring water",
  "blessed with {ingredient} gathered at dawn",
  "enriched with {ingredient} from sacred groves",
  "enhanced with {ingredient} picked during meditation",
  "fortified with {ingredient} collected by moonlight",
  "perfumed with {ingredient} from temple gardens",
  "seasoned with {ingredient} blessed by monks",
  "flavored with {ingredient} from high mountain meadows",
  "scented with {ingredient} from windswept peaks",
  
  // Spiritual/Mindful Preparations
  "prepared with mindful intention and loving care",
  "crafted during deep meditation and prayer",
  "created with focused attention and spiritual devotion",
  "assembled with contemplative practice and reverence",
  "composed with meditative awareness and gratitude",
  "formed with sacred intention and humble service",
  "shaped with enlightened purpose and compassion",
  "molded with spiritual dedication and wisdom",
  "designed with transcendent vision and peace",
  "constructed with divine inspiration and harmony",
  
  // Elemental/Natural Preparations
  "balanced with the four elements in perfect harmony",
  "aligned with wind currents and atmospheric pressure",
  "harmonized with seasonal energies and natural cycles",
  "synchronized with lunar phases and celestial movements",
  "calibrated with earth rhythms and sky patterns",
  "attuned to air currents and mountain breezes",
  "integrated with storm energies and calm stillness",
  "unified with elemental forces and natural balance",
  "merged with cosmic energies and earthly wisdom",
  "fused with atmospheric chi and spiritual essence",
  
  // Time/Seasonal Preparations
  "slowly developed over three full moon cycles",
  "patiently aged through the changing seasons",
  "carefully tended during the monsoon meditation",
  "gently nurtured through winter contemplation",
  "lovingly cultivated during spring awakening",
  "mindfully evolved through summer abundance",
  "peacefully matured during autumn reflection",
  "serenely processed through seasonal transitions",
  "quietly perfected during equinox balance",
  "calmly refined through solstice transformation"
];

/** Phrases describing serving contexts and occasions */
export const servingPhrases: string[] = [
  // Daily Ritual Servings
  "served at dawn after morning prayers",
  "offered during evening meditation",
  "presented before sunrise ceremony",
  "shared after sunset contemplation",
  "distributed during midday reflection",
  "provided following midnight vigil",
  "given after pre-dawn practice",
  "offered during twilight gathering",
  "served following morning chanting",
  "presented during evening devotion",
  
  // Ceremonial/Festival Servings
  "offered during the Equinox feast",
  "served at the Solstice celebration",
  "presented during Harmonic Convergence",
  "shared at the Festival of Flying Leaves",
  "distributed during Avatar Day honors",
  "provided at Air Master initiation rites",
  "given during temple dedication ceremonies",
  "offered at inter-temple gatherings",
  "served during spiritual marriage blessings",
  "presented at coming-of-age rituals",
  
  // Seasonal/Natural Servings
  "enjoyed during cherry blossom season",
  "savored throughout the monsoon retreat",
  "appreciated during harvest thanksgiving",
  "relished during winter solitude",
  "consumed during spring awakening",
  "tasted during summer abundance",
  "experienced during autumn reflection",
  "partaken during seasonal transitions",
  "sampled during lunar celebrations",
  "indulged during celestial alignments",
  
  // Spiritual/Meditative Servings
  "consumed in silence during meditation",
  "eaten mindfully during contemplation",
  "shared communally during prayer circles",
  "offered individually during personal practice",
  "distributed during group meditation",
  "provided during spiritual retreats",
  "given during enlightenment ceremonies",
  "served during transcendence rituals",
  "presented during wisdom teachings",
  "offered during compassion practices",
  
  // Guest/Hospitality Servings
  "graciously offered to honored guests",
  "warmly presented to visiting dignitaries",
  "humbly shared with traveling pilgrims",
  "respectfully served to spiritual teachers",
  "lovingly provided to temple visitors",
  "generously offered to cultural ambassadors",
  "kindly presented to diplomatic envoys",
  "courteously served to scholarly researchers",
  "thoughtfully provided to meditation students",
  "carefully offered to healing practitioners",
  
  // Special Context Servings
  "traditionally served on blessed temple grounds",
  "ceremonially presented in sacred dining halls",
  "ritually offered at mountain peak shrines",
  "customarily shared in monastery courtyards",
  "formally presented in temple sanctuaries",
  "historically served in ancient meditation caves",
  "authentically offered in windswept pavilions",
  "conventionally shared in cloistered gardens",
  "appropriately presented in sky-high temples",
  "fittingly served beneath starlit skies"
];

/** Procedural template strings for complete descriptions */
export const descriptionFormats: string[] = [
  // Basic Structure Formats
  "{leadIn} {main}, {preparation}, {serving}",
  "{leadIn} {preparation}, {serving}",
  "{preparation}, {leadIn} {serving}",
  "{serving}, {leadIn} {preparation}",
  
  // Enhanced Structure Formats
  "{leadIn} {main} and {secondary}, {preparation}, {serving}",
  "{leadIn} {preparation} with {ingredient}, {serving}",
  "{preparation} {leadIn} {main}, {serving} with reverence",
  "{serving}, {leadIn} {preparation} using {technique}",
  
  // Spiritual/Cultural Formats
  "{leadIn} spiritual significance, {preparation}, {serving}",
  "{preparation} with sacred intention, {leadIn} {serving}",
  "{serving} in holy communion, {leadIn} {preparation}",
  "{leadIn} divine essence, {preparation}, {serving} with gratitude",
  
  // Sensory-Focused Formats
  "{leadIn} aromatic complexity, {preparation}, {serving}",
  "{preparation} for perfect texture, {leadIn} {serving}",
  "{serving} to awaken the senses, {leadIn} {preparation}",
  "{leadIn} flavor harmony, {preparation}, {serving} with mindfulness",
  
  // Poetic/Flowing Formats
  "{leadIn} ethereal beauty, {preparation} like morning mist, {serving}",
  "{preparation} with celestial grace, {leadIn} {serving}",
  "{serving} as gentle as sky bison breath, {leadIn} {preparation}",
  "{leadIn} transcendent experience, {preparation}, {serving} in perfect peace",
  
  // Complex Multi-Element Formats
  "{leadIn} {main} enhanced with {secondary}, {preparation}, {serving}",
  "{preparation} combining {ingredient} and {spice}, {leadIn} {serving}",
  "{serving} during {season} celebrations, {leadIn} {preparation}",
  "{leadIn} {technique} mastery, {preparation}, {serving} with {blessing}"
]; 