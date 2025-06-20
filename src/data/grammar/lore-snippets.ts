/**
 * Air Nomad Lore and Cultural Narrative System
 * 
 * Provides rich cultural and historical context for Air Nomad dishes.
 * Organized by narrative themes including spiritual traditions,
 * historical significance, and ceremonial importance.
 * 
 * Enables dynamic storytelling around culinary heritage.
 */

/** Historical and traditional context snippets */
export type HistoricalLoreSnippet = 
  | 'Passed down through generations of Air Nomad masters'
  | 'Originally created in the Eastern Air Temple kitchens'
  | 'A recipe preserved since the time of Avatar Yangchen'
  | 'Traditional preparation taught to young acolytes'
  | 'Ancient wisdom encoded in simple ingredients'
  | 'Prepared for centuries during meditation retreats'
  | 'A dish that survived the Great Genocide in memory'
  | 'Created by the first Air Nomad monks'
  | 'Inspired by the feeding habits of sky bison'
  | 'Traditional fare for temple festivals'
  | 'A recipe found in ancient monastery scrolls'
  | 'Prepared during the seasonal pilgrimages'
  | 'Created to honor the spirits of the air'
  | 'A dish born from mountain monastery wisdom'
  | 'Traditional sustenance for long meditations'
  | 'Originally served only to Air Masters'
  | 'A recipe that bridges the mortal and spirit worlds'
  | 'Prepared during the Avatar\'s visits to air temples'
  | 'Ancient tradition of the Western Air Temple'
  | 'Created during the first Air Nomad gatherings';

/** Spiritual and philosophical context */
export type SpiritualLoreSnippet = 
  | 'Said to enhance spiritual connection and inner peace'
  | 'Believed to align the chakras and center the mind'
  | 'Prepared with mindful intention and loving kindness'
  | 'Each ingredient chosen for its spiritual properties'
  | 'Consumed during meditation to deepen awareness'
  | 'Nourishes both body and soul in perfect harmony'
  | 'Prepared as an offering to the spirits of air'
  | 'Said to lighten the spirit and elevate consciousness'
  | 'Traditional food for achieving enlightenment'
  | 'Blessed by monks before every preparation'
  | 'Eaten in silence to honor its sacred nature'
  | 'Believed to purify the body and cleanse the aura'
  | 'Prepared during the full moon for maximum potency'
  | 'Each bite taken as a form of moving meditation'
  | 'Said to grant wisdom and clarity of thought'
  | 'Consumed to honor the balance of all elements'
  | 'Traditional sustenance for spiritual fasting'
  | 'Believed to strengthen the connection to past lives'
  | 'Prepared with prayers and sacred mantras'
  | 'Said to open the heart to universal compassion';

/** Ceremonial and ritual context */
export type CeremonialLoreSnippet = 
  | 'Served during the sacred Harmonic Convergence'
  | 'Traditional dish for Air Master initiation ceremonies'
  | 'Prepared for the annual Sky Bison blessing ritual'
  | 'Central to the Ceremony of Sacred Winds'
  | 'Offered during temple dedication ceremonies'
  | 'Traditional feast dish for spiritual marriages'
  | 'Served at the celebration of new acolytes'
  | 'Prepared for the Festival of Flying Leaves'
  | 'Traditional offering during equinox ceremonies'
  | 'Served at gatherings of the four Air Temples'
  | 'Prepared for visiting dignitaries and Avatar'
  | 'Central dish in coming-of-age ceremonies'
  | 'Traditional sustenance for temple pilgrimages'
  | 'Served during the Ritual of Ascending Spirits'
  | 'Prepared for the ceremony of eternal bonds'
  | 'Traditional dish for honoring fallen masters'
  | 'Served during the Festival of Floating Lanterns'
  | 'Prepared for the sacred Windstorm Ceremony'
  | 'Central to the Ritual of Balanced Elements'
  | 'Traditional offering during ancestral remembrance';

/** Complete arrays for random selection */
export const HISTORICAL_LORE_SNIPPETS: readonly HistoricalLoreSnippet[] = [
  'Passed down through generations of Air Nomad masters',
  'Originally created in the Eastern Air Temple kitchens',
  'A recipe preserved since the time of Avatar Yangchen',
  'Traditional preparation taught to young acolytes',
  'Ancient wisdom encoded in simple ingredients',
  'Prepared for centuries during meditation retreats',
  'A dish that survived the Great Genocide in memory',
  'Created by the first Air Nomad monks',
  'Inspired by the feeding habits of sky bison',
  'Traditional fare for temple festivals',
  'A recipe found in ancient monastery scrolls',
  'Prepared during the seasonal pilgrimages',
  'Created to honor the spirits of the air',
  'A dish born from mountain monastery wisdom',
  'Traditional sustenance for long meditations',
  'Originally served only to Air Masters',
  'A recipe that bridges the mortal and spirit worlds',
  'Prepared during the Avatar\'s visits to air temples',
  'Ancient tradition of the Western Air Temple',
  'Created during the first Air Nomad gatherings',
] as const;

export const SPIRITUAL_LORE_SNIPPETS: readonly SpiritualLoreSnippet[] = [
  'Said to enhance spiritual connection and inner peace',
  'Believed to align the chakras and center the mind',
  'Prepared with mindful intention and loving kindness',
  'Each ingredient chosen for its spiritual properties',
  'Consumed during meditation to deepen awareness',
  'Nourishes both body and soul in perfect harmony',
  'Prepared as an offering to the spirits of air',
  'Said to lighten the spirit and elevate consciousness',
  'Traditional food for achieving enlightenment',
  'Blessed by monks before every preparation',
  'Eaten in silence to honor its sacred nature',
  'Believed to purify the body and cleanse the aura',
  'Prepared during the full moon for maximum potency',
  'Each bite taken as a form of moving meditation',
  'Said to grant wisdom and clarity of thought',
  'Consumed to honor the balance of all elements',
  'Traditional sustenance for spiritual fasting',
  'Believed to strengthen the connection to past lives',
  'Prepared with prayers and sacred mantras',
  'Said to open the heart to universal compassion',
] as const;

export const CEREMONIAL_LORE_SNIPPETS: readonly CeremonialLoreSnippet[] = [
  'Served during the sacred Harmonic Convergence',
  'Traditional dish for Air Master initiation ceremonies',
  'Prepared for the annual Sky Bison blessing ritual',
  'Central to the Ceremony of Sacred Winds',
  'Offered during temple dedication ceremonies',
  'Traditional feast dish for spiritual marriages',
  'Served at the celebration of new acolytes',
  'Prepared for the Festival of Flying Leaves',
  'Traditional offering during equinox ceremonies',
  'Served at gatherings of the four Air Temples',
  'Prepared for visiting dignitaries and Avatar',
  'Central dish in coming-of-age ceremonies',
  'Traditional sustenance for temple pilgrimages',
  'Served during the Ritual of Ascending Spirits',
  'Prepared for the ceremony of eternal bonds',
  'Traditional dish for honoring fallen masters',
  'Served during the Festival of Floating Lanterns',
  'Prepared for the sacred Windstorm Ceremony',
  'Central to the Ritual of Balanced Elements',
  'Traditional offering during ancestral remembrance',
] as const;

/** Lore composition templates for different narrative styles */
export type LoreTemplate = 
  | 'historical_spiritual'      // Historical + spiritual context
  | 'ceremonial_historical'     // Ceremonial + historical context
  | 'spiritual_ceremonial'      // Spiritual + ceremonial context
  | 'complete_narrative'        // All three contexts combined
  | 'historical_focus'          // Pure historical context
  | 'spiritual_focus'           // Pure spiritual context
  | 'ceremonial_focus';         // Pure ceremonial context

/**
 * Retrieves all historical lore snippets
 * @returns Array of historical and traditional context snippets
 */
export function getHistoricalLoreSnippets(): readonly HistoricalLoreSnippet[] {
  return HISTORICAL_LORE_SNIPPETS;
}

/**
 * Retrieves all spiritual lore snippets
 * @returns Array of spiritual and philosophical context snippets
 */
export function getSpiritualLoreSnippets(): readonly SpiritualLoreSnippet[] {
  return SPIRITUAL_LORE_SNIPPETS;
}

/**
 * Retrieves all ceremonial lore snippets
 * @returns Array of ceremonial and ritual context snippets
 */
export function getCeremonialLoreSnippets(): readonly CeremonialLoreSnippet[] {
  return CEREMONIAL_LORE_SNIPPETS;
}

/**
 * Generates a lore narrative using specified template
 * @param template - The lore template to use for composition
 * @param randomSelector - Function to select random elements from arrays
 * @returns Generated lore narrative string
 */
export function generateLoreByTemplate(
  template: LoreTemplate,
  randomSelector: <T>(array: readonly T[]) => T
): string {
  const historical = randomSelector(HISTORICAL_LORE_SNIPPETS);
  const spiritual = randomSelector(SPIRITUAL_LORE_SNIPPETS);
  const ceremonial = randomSelector(CEREMONIAL_LORE_SNIPPETS);

  switch (template) {
    case 'historical_spiritual':
      return `${historical}. ${spiritual}.`;
    
    case 'ceremonial_historical':
      return `${ceremonial}. ${historical}.`;
    
    case 'spiritual_ceremonial':
      return `${spiritual}. ${ceremonial}.`;
    
    case 'complete_narrative':
      return `${historical}. ${spiritual}. ${ceremonial}.`;
    
    case 'historical_focus':
      return `${historical}.`;
    
    case 'spiritual_focus':
      return `${spiritual}.`;
    
    case 'ceremonial_focus':
      return `${ceremonial}.`;
    
    default:
      // Fallback to historical focus
      return `${historical}.`;
  }
}

/**
 * Gets all available lore templates
 * @returns Array of all lore composition templates
 */
export function getLoreTemplates(): readonly LoreTemplate[] {
  return [
    'historical_spiritual',
    'ceremonial_historical',
    'spiritual_ceremonial',
    'complete_narrative',
    'historical_focus',
    'spiritual_focus',
    'ceremonial_focus'
  ] as const;
}

/**
 * Generates a random lore snippet from any category
 * @param randomSelector - Function to select random elements from arrays
 * @returns Random lore snippet from any category
 */
export function generateRandomLoreSnippet(
  randomSelector: <T>(array: readonly T[]) => T
): string {
  const allSnippets = [
    ...HISTORICAL_LORE_SNIPPETS,
    ...SPIRITUAL_LORE_SNIPPETS,
    ...CEREMONIAL_LORE_SNIPPETS
  ];
  
  return randomSelector(allSnippets);
}

/** 
 * COMPREHENSIVE FLAT ARRAYS FOR BRUTE-FORCE LORE GENERATION
 * Exhaustive collections of lore fragments and ceremonial text
 */

/** Contextual lore about dish significance and cultural meaning */
export const loreContexts: string[] = [
  // Mental/Spiritual Clarity
  "Inspires clarity of mind and focused intention",
  "Enhances mental acuity during deep meditation",
  "Promotes cognitive balance and thoughtful reflection",
  "Awakens inner wisdom and spiritual insight",
  "Clears mental fog and brings sharp awareness",
  "Stimulates enlightened thinking and divine understanding",
  "Focuses the wandering mind on sacred purpose",
  "Illuminates the path to higher consciousness",
  "Sharpens spiritual perception and inner sight",
  "Cultivates mental tranquility and peaceful thoughts",
  
  // Elemental/Spiritual Alignment
  "Said to align the spirit with the wind",
  "Harmonizes the soul with atmospheric currents",
  "Balances inner chi with elemental forces",
  "Synchronizes personal energy with cosmic winds",
  "Attunes the practitioner to air temple frequencies",
  "Connects the diner to ancient sky bison wisdom",
  "Merges human consciousness with celestial patterns",
  "Aligns chakras with seasonal wind directions",
  "Integrates bodily rhythms with mountain breezes",
  "Unifies personal aura with temple atmosphere",
  
  // Temple/Location Exclusivity
  "Prepared only at the highest temples",
  "Reserved for the most sacred mountain shrines",
  "Crafted exclusively in windswept pavilions",
  "Made solely within ancient monastery walls",
  "Created only during temple peak ceremonies",
  "Prepared exclusively by temple master chefs",
  "Reserved for the Eastern Air Temple sanctuary",
  "Crafted only in the Western Temple's inner court",
  "Made exclusively at Northern Temple heights",
  "Prepared solely within Southern Temple grounds",
  
  // Mastery/Skill Requirements
  "Requires decades of culinary meditation to master",
  "Demands perfect harmony between chef and elements",
  "Necessitates advanced spiritual cooking techniques",
  "Calls for enlightened understanding of ingredients",
  "Requires mastery of ancient preparation rituals",
  "Demands synchronized breathing during preparation",
  "Necessitates complete mental stillness while cooking",
  "Calls for perfect balance of physical and spiritual skills",
  "Requires deep communion with ingredient spirits",
  "Demands absolute devotion to culinary dharma",
  
  // Historical/Legendary Significance
  "Legend speaks of its power to grant visions",
  "Ancient texts describe its transformative properties",
  "Mythology credits it with healing broken spirits",
  "Sacred scrolls mention its ability to unite souls",
  "Historical accounts praise its wisdom-granting essence",
  "Temple records document its miraculous effects",
  "Ancient masters wrote extensively of its benefits",
  "Legendary figures attributed their insights to it",
  "Historical chronicles celebrate its spiritual power",
  "Sacred histories honor its transformative legacy",
  
  // Rarity/Preciousness
  "Considered more precious than temple gold",
  "Valued above the rarest mountain crystals",
  "Treasured beyond ancient monastery artifacts",
  "Prized more than sacred wind temple bells",
  "Cherished above celestial meditation beads",
  "Esteemed higher than blessed prayer scrolls",
  "Revered beyond ancient sky bison saddles",
  "Honored more than temple founder statues",
  "Sacred beyond the holiest ritual implements",
  "Precious as the breath of sleeping dragons"
];

/** Festival and ceremonial contexts */
export const festivalHooks: string[] = [
  // Major Air Nomad Festivals
  "for the Festival of Four Winds",
  "during the Celebration of Soaring Spirits",
  "at the Ceremony of Ascending Souls",
  "for the Festival of Flying Leaves",
  "during the Ritual of Sacred Breezes",
  "at the Ceremony of Celestial Alignment",
  "for the Festival of Mountain Mists",
  "during the Celebration of Sky Dancing",
  "at the Ceremony of Wind Whispers",
  "for the Festival of Cloud Watching",
  
  // Sky Bison Related Ceremonies
  "during the Bison Bonding Rite",
  "at the Sky Bison Blessing Ceremony",
  "for the Ritual of Bison Partnership",
  "during the Ceremony of First Flight",
  "at the Bison Migration Celebration",
  "for the Ritual of Sky Bison Communion",
  "during the Ceremony of Aerial Brotherhood",
  "at the Festival of Sky Bison Gratitude",
  "for the Ritual of Flying Meditation",
  "during the Ceremony of Wind Riding",
  
  // Seasonal/Temporal Ceremonies
  "during the Spring Awakening Ritual",
  "at the Summer Solstice Celebration",
  "for the Autumn Reflection Ceremony",
  "during the Winter Contemplation Rite",
  "at the Equinox Balance Festival",
  "for the New Moon Meditation Ceremony",
  "during the Full Moon Illumination Rite",
  "at the Dawn Greeting Ritual",
  "for the Sunset Gratitude Ceremony",
  "during the Midnight Vigil Observance",
  
  // Avatar/Master Related Events
  "for the Avatar's Temple Visitation",
  "during the Master's Enlightenment Ceremony",
  "at the Guru's Wisdom Teaching Gathering",
  "for the Elder's Final Blessing Ritual",
  "during the Monk's Ordination Celebration",
  "at the Acolyte's Coming of Age Ceremony",
  "for the Pilgrim's Journey Blessing Rite",
  "during the Student's Achievement Recognition",
  "at the Teacher's Honored Retirement Feast",
  "for the Sage's Sacred Knowledge Sharing"
];

/** Spiritual and meditative effects */
export const spiritualEffects: string[] = [
  // Balance and Harmony
  "restores spiritual balance and inner equilibrium",
  "brings harmony between body, mind, and spirit",
  "establishes perfect balance of elemental energies",
  "creates harmonious resonance with natural cycles",
  "balances masculine and feminine spiritual aspects",
  "harmonizes past, present, and future consciousness",
  "restores equilibrium between earthly and divine",
  "balances active meditation with passive reflection",
  "harmonizes individual will with universal flow",
  "establishes balance between solitude and community",
  
  // Meditation and Contemplation
  "brings tranquility before meditation practice",
  "enhances concentration during contemplative prayer",
  "deepens meditative states and spiritual absorption",
  "facilitates entry into transcendent awareness",
  "supports extended periods of mindful sitting",
  "enhances visualization during guided meditation",
  "promotes stillness of mind and peaceful reflection",
  "encourages profound inner silence and calm",
  "supports advanced breathing meditation techniques",
  "deepens connection with universal consciousness",
  
  // Purification and Cleansing
  "purifies the aura and cleanses negative energy",
  "clears karmic blockages and past-life trauma",
  "cleanses the chakras and energy meridians",
  "purifies thoughts and emotional disturbances",
  "clears mental confusion and spiritual doubt",
  "cleanses the spirit of worldly attachments",
  "purifies intentions and motivates pure action",
  "clears obstacles to spiritual advancement",
  "cleanses the soul of accumulated suffering",
  "purifies the heart of selfish desires",
  
  // Wisdom and Insight
  "grants profound spiritual insight and understanding",
  "awakens dormant wisdom and inner knowing",
  "provides clarity for important life decisions",
  "reveals hidden truths and spiritual mysteries",
  "grants access to ancestral wisdom and guidance",
  "awakens intuitive abilities and psychic sensitivity",
  "provides understanding of cosmic principles",
  "grants insight into the nature of existence",
  "reveals the interconnectedness of all beings",
  "awakens compassionate wisdom and loving kindness",
  
  // Transformation and Growth
  "facilitates profound spiritual transformation",
  "catalyzes rapid spiritual growth and development",
  "accelerates the journey toward enlightenment",
  "promotes evolutionary consciousness expansion",
  "facilitates healing of deep spiritual wounds",
  "catalyzes release of limiting beliefs and patterns",
  "promotes integration of spiritual experiences",
  "facilitates alignment with highest spiritual purpose",
  "catalyzes awakening of latent spiritual abilities",
  "promotes embodiment of divine qualities and virtues"
]; 