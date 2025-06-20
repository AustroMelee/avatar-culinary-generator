/**
 * Enhanced Air Nomad Phrasebanks - Phase 2 Completion
 * 
 * Massive expansion of phrasebanks with 20-40 new entries per category.
 * Implements Avatar-world lore variants, location/time/festival context,
 * and comprehensive banlist system for awkward combinations.
 * 
 * Replaces generic phrases with lore-driven alternatives.
 */

import { selectWithAntiClustering } from './weighted-selection.js';

/** 
 * EXPANDED LEAD-INS WITH AVATAR-WORLD VARIANTS
 * Phase 2 Task: Replace generic with lore-driven phrases
 */

/** Sacred/Spiritual Lead-ins with specific Avatar lore */
export const ENHANCED_SPIRITUAL_LEADINS = [
  // Generic spiritual (existing)
  "A sacred dish, revered for its",
  "A blessed creation, honored for its",
  "A divine offering, celebrated for its",
  
  // NEW: Avatar-world specific (20+ additions)
  "A dish blessed by the spirits of the four Air Temples for its",
  "A creation favored by Avatar Yangchen herself for its",
  "A preparation taught by Guru Pathik for its", 
  "A sacred recipe whispered by sky bison for its",
  "A dish that echoes through the spirit world for its",
  "A creation blessed by the ancient airbending masters for its",
  "A preparation honored in the Crystal Catacombs for its",
  "A dish that resonates with the Avatar State for its",
  "A creation sanctified by the Order of the White Lotus for its",
  "A recipe preserved in the Library of Wan Shi Tong for its",
  "A dish that harmonizes with cosmic energy for its",
  "A preparation blessed by the Lion Turtle's wisdom for its",
  "A creation that channels the power of Raava for its",
  "A dish infused with the essence of the Tree of Time for its",
  "A preparation honored by the Air Acolytes for its",
  "A creation that bridges the material and spirit realms for its",
  "A dish blessed during the Harmonic Convergence for its",
  "A preparation favored by the Flying Bison herds for its",
  "A creation that embodies the wisdom of Avatar Aang for its",
  "A dish consecrated by the wind spirits themselves for its",
  "A preparation that carries the memories of Monk Gyatso for its",
  "A creation blessed by the Northern Air Temple's innovation for its",
  "A dish that reflects the Eastern Air Temple's ancient traditions for its",
  "A preparation honored by the Western Air Temple's floating gardens for its",
  "A creation sanctified by the Southern Air Temple's meditation halls for its"
] as const;

/** Location-specific Lead-ins with Temple and geographical context */
export const LOCATION_SPECIFIC_LEADINS = [
  // Eastern Air Temple variants
  "From the sunrise meditation halls of the Eastern Air Temple comes this dish, prized for its",
  "Born in the ancient kitchens of the Eastern Air Temple, this creation excels in its",
  "Crafted in the windswept peaks surrounding the Eastern Air Temple for its",
  "Developed in the cherry blossom gardens of the Eastern Air Temple for its",
  "Blessed in the sacred chambers of the Eastern Air Temple for its",
  
  // Western Air Temple variants  
  "From the floating gardens of the Western Air Temple emerges this dish, celebrated for its",
  "Created in the gravity-defying halls of the Western Air Temple for its",
  "Blessed in the inverted spires of the Western Air Temple for its",
  "Developed in the cloud-touching peaks of the Western Air Temple for its",
  "Crafted in the architectural marvels of the Western Air Temple for its",
  
  // Northern Air Temple variants
  "From the innovative workshops of the Northern Air Temple comes this creation, valued for its",
  "Born in the mechanized kitchens of the Northern Air Temple for its", 
  "Developed in the steam-powered facilities of the Northern Air Temple for its",
  "Crafted in the inventive laboratories of the Northern Air Temple for its",
  "Created in the technological marvels of the Northern Air Temple for its",
  
  // Southern Air Temple variants
  "From the serene meditation chambers of the Southern Air Temple flows this dish, honored for its",
  "Born in the peaceful courtyards of the Southern Air Temple for its",
  "Developed in the tranquil gardens of the Southern Air Temple for its",
  "Blessed in the quiet halls of the Southern Air Temple for its",
  "Crafted in the contemplative spaces of the Southern Air Temple for its",
  
  // Sky Bison and mobile locations
  "Prepared during sky bison migrations across the mountain ranges for its",
  "Created in the flying temples that drift between peaks for its",
  "Developed during the great sky bison gatherings for its",
  "Blessed during aerial meditation journeys for its",
  "Crafted in the nomadic sky cities for its"
] as const;

/** Time and Festival Context Lead-ins */
export const TEMPORAL_FESTIVAL_LEADINS = [
  // Daily cycle variations
  "Served at the first light of dawn when temple bells ring, this dish shines for its",
  "Prepared during the golden hour of sunset meditation for its",
  "Crafted in the quiet hours before midnight prayers for its",
  "Created during the peaceful pre-dawn silence for its",
  "Blessed during the midday contemplation periods for its",
  
  // Seasonal variations
  "Traditional during the Cherry Blossom Festival for its",
  "Essential to the Autumn Equinox celebrations for its", 
  "Central to the Winter Solstice meditation retreats for its",
  "Vital during the Spring Awakening ceremonies for its",
  "Sacred to the Summer Sky Bison migrations for its",
  
  // Avatar-specific festivals (NEW LORE)
  "Prepared annually for the Festival of Four Winds for its",
  "Traditional during the Day of Ascending celebrations for its",
  "Sacred to the Sky Bison Appreciation Ceremony for its",
  "Essential to the Monk's Awakening Festival for its", // Replaces "Spring Imagination"
  "Central to the Bison's Reverie celebrations for its", // Replaces generic names
  "Vital during the Airbender's Convergence for its",
  "Traditional at the Temple Unification Gathering for its",
  "Sacred to the Wind Walker's Pilgrimage for its",
  "Essential during the Cloud Dancer's Festival for its",
  "Central to the Mountain Sage's Symposium for its",
  "Prepared for the Floating Lantern Night for its",
  "Traditional during the Sacred Windstorm Ceremony for its",
  "Sacred to the Avatar's Visiting Days for its",
  "Essential during the New Acolyte Blessing for its",
  "Central to the Master's Enlightenment Celebration for its"
] as const;

/**
 * MASSIVELY EXPANDED PREPARATION PHRASES
 * Phase 2 Task: Add 20-40 new entries with ingredient/context handling
 */

export const ENHANCED_PREPARATION_PHRASES = [
  // Technique-focused with ingredients (handles missing context gracefully)
  "using the ancient {technique} method perfected over generations",
  "employing the sacred {technique} ritual with {ingredient} and mountain spring water",
  "following the time-honored {technique} tradition blessed by temple elders",
  "applying the divine {technique} ceremony with ingredients gathered at dawn",
  "utilizing the blessed {technique} practice taught by airbending masters",
  
  // NEW: Sky Bison inspired preparations (20+ additions)
  "prepared using techniques learned from observing sky bison feeding habits",
  "crafted with the gentle care sky bison show their young",
  "assembled using the methodical approach of sky bison grooming rituals",
  "created with the patience sky bison display during migration",
  "formed using the harmonious movements of sky bison in flight",
  "shaped with the protective instincts sky bison show their riders",
  "molded using the communal feeding patterns of sky bison herds",
  "designed with the nurturing behavior sky bison show toward temple gardens",
  "constructed using the seasonal rhythms sky bison follow across continents",
  "composed with the meditative stillness sky bison achieve in rest",
  
  // NEW: Airbending-inspired preparations
  "prepared using principles of circular breathing and air meditation",
  "crafted with the flowing movements of airbending forms",
  "assembled using the spiraling techniques of advanced airbending",
  "created with the lightness and agility of airbending philosophy",
  "formed using the defensive principles of airbending redirection",
  "shaped with the spiritual connectivity of airbending chakras",
  "molded using the evasive techniques of airbending combat",
  "designed with the peaceful resolution methods of airbending masters",
  "constructed using the temperature regulation of airbending meditation",
  "composed with the levitation principles of advanced airbending",
  
  // NEW: Spirit World connections
  "infused with essence drawn from the spirit world during meditation",
  "blessed with energy channeled through spirit portals",
  "enhanced with wisdom gathered from spirit world journeys",
  "fortified with power borrowed from benevolent spirits",
  "perfumed with fragrances that drift between world boundaries",
  "seasoned with knowledge shared by ancient air spirits",
  "flavored with memories preserved in the spirit realm",
  "scented with the eternal springtime of the spirit world",
  "enriched with harmonies that echo through spiritual dimensions",
  "imbued with the timeless patience of spirit world guardians",
  
  // NEW: Cosmic and elemental connections  
  "aligned with the cosmic dance of celestial airbending",
  "harmonized with the universal breath that flows through all beings",
  "synchronized with the planetary air currents that circle the globe",
  "calibrated with the atmospheric pressures of high mountain peaks",
  "attuned to the magnetic fields that guide sky bison navigation",
  "integrated with the aurora patterns that dance in polar skies",
  "unified with the storm systems that bring life-giving rains",
  "merged with the trade winds that carry seeds across oceans",
  "fused with the jet streams that connect distant continents",
  "bonded with the atmospheric rivers that nourish mountain valleys"
] as const;

/**
 * EXPANDED SERVING PHRASES WITH CONTEXT
 * Phase 2 Task: Include location, time, and festival context
 */

export const ENHANCED_SERVING_PHRASES = [
  // Daily ritual servings with specific times
  "served during the Hour of Rising Sun when temple bells chime",
  "offered at the Moment of Golden Light when shadows grow long",
  "presented during the Time of Descending Mist when day becomes night",
  "shared at the Period of Silent Stars when monks enter deep meditation",
  "distributed during the Phase of Climbing Moon when spirits are nearest",
  
  // Temple-specific serving contexts
  "traditionally shared in the Eastern Air Temple's circular dining hall",
  "customarily offered in the Western Air Temple's gravity-defying feast chambers",
  "ceremonially presented in the Northern Air Temple's innovative cafeteria", 
  "ritually distributed in the Southern Air Temple's peaceful courtyard",
  "formally served in the floating pavilions between temple spires",
  
  // Festival and celebration contexts
  "joyfully shared during the Festival of Four Winds celebration",
  "reverently offered during the Day of Ascending ceremonies",
  "gratefully distributed during the Sky Bison Appreciation rituals",
  "peacefully presented during the Monk's Awakening Festival",
  "harmoniously served during the Bison's Reverie gathering",
  "serenely offered during the Airbender's Convergence",
  "mindfully shared during the Temple Unification feast",
  "spiritually distributed during the Wind Walker's Pilgrimage",
  "meditatively presented during the Cloud Dancer's Festival",
  "contemplatively served during the Mountain Sage's Symposium",
  
  // Seasonal and natural cycle contexts
  "offered when cherry blossoms bloom in temple gardens",
  "served as autumn leaves spiral in mountain winds", 
  "presented when winter snow blankets temple roofs",
  "shared as spring rains awaken dormant seeds",
  "distributed when summer thermals lift sky bison skyward",
  "offered during the rare appearance of cloud rainbows",
  "served when atmospheric rivers bring life to valleys",
  "presented during the mysterious mountain aurora displays",
  "shared when meteor showers illuminate night skies",
  "distributed during the sacred alignment of celestial bodies",
  
  // Interpersonal and community contexts
  "warmly shared among fellow travelers on spiritual journeys",
  "lovingly offered to honored guests visiting temple grounds",
  "graciously presented to new acolytes beginning their training",
  "respectfully served to visiting masters from other temples",
  "humbly distributed to pilgrims completing sacred walks",
  "cheerfully shared during inter-temple cultural exchanges",
  "peacefully offered during conflict resolution gatherings",
  "mindfully presented during community service projects",
  "compassionately served to those seeking spiritual guidance",
  "generously distributed during times of celebration and mourning alike"
] as const;

/**
 * COMPREHENSIVE BANLIST SYSTEM
 * Phase 2 Task: Prevent awkward combinations
 */

/** Expanded banned phrase combinations */
export const COMPREHENSIVE_BANNED_COMBINATIONS = [
  // Original bans from weighted-selection.ts
  ['in perfect peace', 'transcendent experience'],
  ['gentle as sky bison breath', 'profound spiritual significance'],
  ['temple atmosphere', 'spiritual growth and development'],
  ['lovingly', 'transcendent'],
  
  // NEW: Repetition prevention
  ['gentle', 'gentle'],
  ['sacred', 'sacred'],
  ['blessed', 'blessed'], 
  ['profound', 'profound'],
  ['transcendent', 'transcendent'],
  ['spiritual', 'spiritual'],
  ['peaceful', 'peaceful'],
  ['serene', 'serene'],
  ['harmonious', 'harmonious'],
  ['balanced', 'balanced'],
  
  // NEW: Redundant meaning clusters
  ['peaceful', 'serene'],          // Both mean calm
  ['harmonious', 'balanced'],      // Both mean equilibrium
  ['sacred', 'blessed'],           // Both mean holy
  ['divine', 'sacred'],            // Both mean holy
  ['profound', 'transcendent'],    // Too heavy together
  ['mystical', 'spiritual'],       // Overlap in meaning
  ['ancient', 'traditional'],      // Time overlap
  ['pure', 'pristine'],           // Cleanliness overlap
  ['luminous', 'radiant'],        // Light overlap
  ['flowing', 'drifting'],        // Movement overlap
  
  // NEW: Awkward grammar combinations
  ['lovingly cultivated', 'during spring'],     // Grammar issue from audit
  ['gently prepared', 'with gentle'],           // Double gentle
  ['mindfully created', 'with mindful'],        // Double mindful
  ['carefully crafted', 'with careful'],        // Double careful
  ['perfectly balanced', 'in perfect'],         // Double perfect
  
  // NEW: Cultural contradiction prevention
  ['Eastern Air Temple', 'Western Air Temple'],   // Geographic conflict
  ['Northern Air Temple', 'Southern Air Temple'], // Geographic conflict
  ['dawn', 'sunset'],                            // Time conflict
  ['winter', 'summer'],                          // Season conflict
  ['Festival of Four Winds', 'Day of Ascending'], // Festival overlap
  
  // NEW: Tonal mismatches
  ['innovative workshops', 'ancient traditions'], // Old vs new conflict
  ['technological marvels', 'primitive simplicity'], // Tech vs simple conflict
  ['mechanized kitchens', 'hand-crafted methods'], // Machine vs manual conflict
  ['gravity-defying', 'grounded in earth'], // Physics conflict
  ['floating gardens', 'deeply rooted'], // Attachment conflict
  
  // NEW: Overuse prevention for specific phrases
  ['sky bison', 'sky bison'],                    // No double sky bison
  ['temple atmosphere', 'temple environment'],   // Temple redundancy
  ['spiritual significance', 'spiritual meaning'], // Spiritual redundancy
  ['meditation practice', 'meditative state'],   // Meditation redundancy
  ['airbending masters', 'airbending techniques'], // Airbending redundancy
] as const;

/**
 * Context-aware phrase selection with enhanced banlist checking
 * Phase 2 Enhancement: More sophisticated combination detection
 */
export function selectPhrasesWithContextualBanning(
  primaryPhrases: readonly string[],
  secondaryPhrases: readonly string[],
  recentlyUsed: string[] = [],
  bannedCombos: [string, string][] = COMPREHENSIVE_BANNED_COMBINATIONS as any
): [string, string] {
  
  let attempts = 0;
  const maxAttempts = 50; // Prevent infinite loops
  
  while (attempts < maxAttempts) {
    const primary = selectWithAntiClustering(primaryPhrases, recentlyUsed, bannedCombos);
    const secondary = selectWithAntiClustering(secondaryPhrases, [...recentlyUsed, primary], bannedCombos);
    
    // Check for banned combinations (both directions)
    const isBanned = bannedCombos.some(([banned1, banned2]) => 
      (primary.includes(banned1) && secondary.includes(banned2)) ||
      (primary.includes(banned2) && secondary.includes(banned1)) ||
      (secondary.includes(banned1) && primary.includes(banned2)) ||
      (secondary.includes(banned2) && primary.includes(banned1))
    );
    
    // Check for word overlap (no shared words except common articles)
    const primaryWords = primary.toLowerCase().split(/\s+/).filter(word => 
      !['the', 'of', 'and', 'with', 'in', 'on', 'at', 'for', 'by', 'a', 'an'].includes(word)
    );
    const secondaryWords = secondary.toLowerCase().split(/\s+/).filter(word => 
      !['the', 'of', 'and', 'with', 'in', 'on', 'at', 'for', 'by', 'a', 'an'].includes(word)
    );
    
    const hasOverlap = primaryWords.some(word => secondaryWords.includes(word));
    
    if (!isBanned && !hasOverlap) {
      return [primary, secondary];
    }
    
    attempts++;
  }
  
  // Fallback if no good combination found
  return [primaryPhrases[0], secondaryPhrases[0]];
}

/**
 * ENHANCED TEMPLATE HANDLING
 * Phase 2 Task: Patch "empty slot" bugs and ensure graceful handling
 */

/** Safe template variable replacement with fallbacks */
export function replaceTemplateVariables(
  template: string,
  variables: Record<string, string | undefined>,
  fallbacks: Record<string, string> = {}
): string {
  
  // Default fallbacks for common variables
  const defaultFallbacks: Record<string, string> = {
    technique: 'traditional preparation',
    ingredient: 'sacred herbs',
    main: 'blessed ingredients',
    garnish: 'mountain herbs',
    spice: 'warming spices',
    season: 'harmonious seasons',
    time: 'peaceful moments',
    temple: 'temple grounds',
    master: 'wise teachers',
    festival: 'sacred gatherings',
    ...fallbacks
  };
  
  let result = template;
  
  // Replace all template variables with values or fallbacks
  result = result.replace(/\{([^}]+)\}/g, (_match, varName) => {
    const value = variables[varName] || defaultFallbacks[varName] || varName;
    return value;
  });
  
  // Clean up any remaining issues
  result = result.replace(/\s+/g, ' ').trim();
  
  // Ensure proper sentence ending
  if (result && !result.match(/[.!?]$/)) {
    result += '.';
  }
  
  return result;
}

/**
 * Avatar-world name variant replacements
 * Phase 2 Task: Replace generic names with lore-driven alternatives
 */
export const AVATAR_WORLD_REPLACEMENTS: Record<string, string[]> = {
  // Replace generic with lore-driven names
  'Spring Imagination': ['Bison\'s Reverie', 'Monk\'s Awakening', 'Temple\'s Dawn', 'Air\'s Blessing'],
  'Western Service': ['Eastern Temple Offering', 'Sky Sanctuary Feast', 'Windswept Peak Meal'],
  'Mountain Bowl': ['Skyward Peaks Harmony', 'Floating Temple Bowl', 'Cloud Walker\'s Sustenance'],
  'Sacred Soup': ['Guru\'s Wisdom Broth', 'Avatar\'s Nourishment', 'Sky Bison\'s Comfort'],
  'Temple Brew': ['Airbender\'s Meditation Tea', 'Monk\'s Clarity Elixir', 'Wind Spirit\'s Nectar'],
  'Holy Water': ['Sacred Spring Flow', 'Mountain Spirit\'s Gift', 'Cloud Essence Water'],
  'Blessed Meal': ['Temple Unity Feast', 'Air Master\'s Banquet', 'Harmonic Convergence Dish'],
  'Ancient Recipe': ['Yangchen\'s Legacy', 'First Airbender\'s Creation', 'Sky Bison\'s Teaching'],
  'Traditional Dish': ['Four Temple Heritage', 'Nomad\'s Wandering Sustenance', 'Wind Walker\'s Provision'],
  'Sacred Offering': ['Spirit World Bridge', 'Avatar State Nourishment', 'Cosmic Balance Gift']
};

/**
 * Apply Avatar-world name enhancement
 * Replaces generic names with lore-driven alternatives
 */
export function enhanceWithAvatarLore(name: string): string {
  for (const [generic, alternatives] of Object.entries(AVATAR_WORLD_REPLACEMENTS)) {
    if (name.includes(generic)) {
      const replacement = selectWithAntiClustering(alternatives, []);
      return name.replace(generic, replacement);
    }
  }
  return name;
}

/**
 * Enhanced dish description lead-ins with rarity-based weighting
 * to prevent the "A dish blessed by the spirits" repetition problem
 */
export const enhancedDishLeadIns = {
  common: [
    "This humble creation reflects the gentle wisdom of Air Nomad tradition",
    "Crafted in the quiet halls of the temple kitchens",
    "Born from the simple teachings of mindful preparation",
    "A modest offering that speaks to the heart of Air Nomad philosophy",
    "Following time-honored methods passed down through generations",
    "Emerging from the contemplative practice of temple cooking",
    "This gentle preparation honors the principles of balance and harmony",
    "Rooted in the everyday wisdom of monastic life",
    "A peaceful expression of Air Nomad culinary heritage",
    "Drawn from the fundamental teachings of mindful nourishment",
    "This serene creation embodies the spirit of temple simplicity",
    "Cultivated through patient practice and quiet devotion",
    "A harmonious blend born from centuries of temple tradition",
    "This tranquil dish emerges from the meditative art of cooking",
    "Shaped by the gentle hands of devoted temple cooks"
  ],
  
  uncommon: [
    "Within the sacred groves where sky bison rest, this dish takes form",
    "From the elevated gardens floating above temple grounds comes this creation",
    "This thoughtful preparation draws upon the deeper mysteries of Air Nomad lore",
    "Blessed by the mountain winds that carry ancient prayers",
    "In the quiet hours before dawn, temple masters craft this delicate offering",
    "This refined dish speaks to those who walk the path of spiritual awakening",
    "Born from the intersection of culinary art and spiritual practice",
    "This elevated creation honors the connection between earth and sky",
    "From the sacred cookbook of the traveling monks emerges this dish",
    "This contemplative preparation bridges the gap between sustenance and enlightenment",
    "Crafted in moments of deep meditation and spiritual clarity",
    "This nuanced dish reflects the subtle teachings of advanced practitioners",
    "From the kitchens of those who commune with the spirit world"
  ],
  
  rare: [
    "In the ethereal silence of mountain peaks, where few mortals tread, this dish manifests",
    "From the secret chambers beneath the Western Air Temple comes this mystical creation",
    "This transcendent offering emerges from the realm where cooking becomes divine art",
    "Born in the sacred space where the physical and spiritual worlds converge",
    "This extraordinary dish channels the ancient power of the first Airbenders",
    "From the hands of masters who have touched the very essence of wind itself",
    "This profound creation springs forth from the deepest wells of Air Nomad wisdom",
    "In the liminal space between dream and waking, this dish takes sacred form",
    "This remarkable offering draws upon the forgotten techniques of legendary masters",
    "From the intersection of mortal craft and divine inspiration comes this creation",
    "This sublime dish emerges from the practice of those who dance with spirits",
    "Born from the fusion of earthly ingredients and celestial influence"
  ],
  
  legendary: [
    "From the primordial mists of the spirit world itself emerges this transcendent creation",
    "In the presence of Avatar Yangchen's lingering essence, this sacred dish manifests",
    "This divine offering descends from the realm of pure consciousness and infinite possibility",
    "From the cosmic dance of elements in their most perfect harmony springs this creation",
    "This otherworldly dish emerges from the very breath of Raava during the age of spirits",
    "Born from the convergence of a thousand lifetimes of spiritual mastery",
    "This celestial creation materializes at the nexus of all Air Nomad wisdom",
    "From the eternal meditation of the cosmic turtle-lions comes this sacred offering",
    "This divine dish manifests from the collective dreams of all enlightened masters",
    "Born from the moment when the first sky bison touched the realm of pure spirit"
  ]
} as const;

/**
 * Enhanced serving contexts with intelligent variation and cultural depth
 * to replace the repetitive "Traditionally joyfully shared" patterns
 */
export const enhancedServingContexts = {
  festivals: [
    "during the ethereal Lotus Bloom Convergence",
    "at the annual Sky Bison Migration Celebration", 
    "during the sacred Festival of Ascending Winds",
    "at the mystical Convergence of Four Temples",
    "during the joyous Celebration of Renewed Vows",
    "at the peaceful Festival of Floating Lanterns",
    "during the contemplative Day of Silent Gratitude",
    "at the sacred Ceremony of Sky and Earth Unity",
    "during the meditative Festival of Inner Light",
    "at the harmonious Gathering of Distant Temples"
  ],
  
  locations: [
    "within the crystal chambers of the Northern Temple's heart",
    "beside the eternal flame gardens of the Eastern Temple",
    "in the gravity-defying halls where apprentices learn to fly",
    "beneath the star-viewing domes of master astronomers",
    "within the whisper-quiet libraries of ancient texts",
    "in the circular meditation chambers overlooking endless sky",
    "beside the sacred pools where sky bison come to drink",
    "within the floating pavilions that drift between temple spires",
    "in the garden terraces where clouds gather like guests",
    "beneath the singing wind chimes of the prayer towers"
  ],
  
  occasions: [
    "when young monks complete their first sky bison flight",
    "during the quiet hours of pre-dawn contemplation",
    "when masters gather to discuss the deepest mysteries",
    "during the seasonal blessing of the four winds",
    "when travelers arrive after long spiritual journeys",
    "during the sacred time of temple door ceremonies",
    "when elders share stories of the ancient days",
    "during the peaceful hours of sunset meditation",
    "when sky bison calves take their first flight",
    "during the ceremonial changing of temple guardians"
  ],
  
  memories: [
    "evoking memories of childhood laughter echoing through temple halls",
    "recalling the gentle wisdom of beloved teachers now passed",
    "bringing back the taste of home for monks far from their temples",
    "awakening recollections of the first taste of enlightenment",
    "stirring memories of quiet conversations under starlit skies",
    "evoking the warm embrace of community during difficult times",
    "recalling moments of pure joy discovered in simple pleasures",
    "bringing back the sensation of wind-song during meditation",
    "awakening memories of sacred ceremonies witnessed in youth",
    "stirring recollections of profound silence shared with masters"
  ]
} as const;

/**
 * Enhanced emotional resonance patterns with contextual appropriateness
 * to prevent mismatched emotions like "homey feelings" with mystical ingredients
 */
export const enhancedEmotionalResonance = {
  // For common/everyday dishes
  nurturing: [
    "Embraces the eater with the warmth of temple community",
    "Provides the quiet comfort of familiar traditions",
    "Offers the gentle nourishment of home-cooked care",
    "Delivers the satisfaction of shared meals among friends",
    "Brings the simple joy of sustenance mindfully prepared",
    "Creates the peaceful feeling of belonging to something greater",
    "Instills the calm confidence of well-practiced traditions",
    "Awakens appreciation for life's fundamental blessings"
  ],
  
  // For uncommon/elevated dishes  
  contemplative: [
    "Invites deeper reflection on the nature of nourishment",
    "Encourages mindful appreciation of each sensory moment",
    "Inspires gentle contemplation of life's interconnectedness",
    "Facilitates communion with the wisdom of ancient practices",
    "Opens pathways to understanding through mindful consumption",
    "Nurtures the soul's capacity for gratitude and wonder",
    "Cultivates awareness of the sacred within the everyday",
    "Promotes inner stillness and clarity of thought"
  ],
  
  // For rare/mystical dishes
  transformative: [
    "Catalyzes profound shifts in spiritual awareness",
    "Triggers awakening of dormant inner potentials",
    "Facilitates deep connection with the cosmic flow",
    "Opens gateways to enhanced spiritual perception",
    "Activates ancient memories embedded in the soul",
    "Aligns the eater with higher dimensional frequencies",
    "Initiates communion with the essence of pure spirit",
    "Unlocks understanding of the universe's hidden harmonies"
  ],
  
  // For legendary/transcendent dishes
  transcendent: [
    "Dissolves the boundaries between self and infinite consciousness",
    "Merges the eater's awareness with the eternal dance of creation",
    "Bridges the gap between mortal experience and divine understanding",
    "Awakens recognition of one's true nature as pure spirit",
    "Facilitates direct communion with the cosmic source of all life",
    "Transforms the very essence of the eater's spiritual DNA",
    "Opens permanent gateways to multi-dimensional awareness",
    "Initiates the eater into the mysteries known only to Avatar spirits"
  ]
} as const;

/**
 * Memory echo phrases for ultra-rare transcendent experiences
 * with proper rarity-based triggering (5-35% chance based on ingredient power)
 */
export const memoryEchoPhrases = [
  "Said to echo in the soul for countless lifetimes, transforming all future rebirths",
  "Whispered to plant seeds of enlightenment that bloom across multiple incarnations",
  "Believed to create soul-deep memories that survive even the Avatar cycle",
  "Known to imprint experiences so profound they become part of one's eternal essence",
  "Rumored to awaken genetic memories from the first Air Nomads who learned from sky bison",
  "Thought to unlock ancestral wisdom passed down through the spiritual DNA of bloodlines",
  "Alleged to grant temporary access to the Avatar State through pure spiritual resonance",
  "Claimed to create echoes that resonate through the spirit world itself",
  "Whispered to leave traces detectable by spirit mediums generations later",
  "Said to create karma so pure it attracts the attention of cosmic spirits",
  "Believed to forge connections that transcend the boundaries of individual lifetimes",
  "Known to plant spiritual seeds that influence the eater's next incarnation",
  "Rumored to create taste memories that follow the soul through rebirth cycles",
  "Thought to establish permanent links with the collective consciousness of Air Nomads",
  "Alleged to leave energetic signatures readable by masters of the spirit world",
  "Claimed to awaken past-life memories of flying with the first sky bison",
  "Whispered to grant visions of possible futures across multiple timelines",
  "Said to create spiritual resonance detectable by enlightened beings across realms",
  "Believed to activate dormant Avatar-level spiritual capacities in rare individuals",
  "Known to forge eternal bonds between the eater and the cosmic forces of air itself"
] as const;

/**
 * Enhanced sound descriptions with cooking-method appropriateness
 * to prevent "sizzling air-dried" mismatches
 */
export const enhancedSoundDescriptions = {
  'Steam-Lifted': [
    "accompanied by the gentle whisper of rising vapors",
    "surrounded by the soft melody of steam finding release",
    "embraced by the quiet symphony of moisture transforming to air",
    "enhanced by the peaceful hiss of steam carrying flavors skyward"
  ],
  
  'Whisper-Steamed': [
    "accompanied by the barely audible sigh of gentle heating",
    "enhanced by the subtle murmur of steam moving like prayer",
    "surrounded by the quiet conversation of water and heat",
    "embraced by the delicate whisper of transformation"
  ],
  
  'Wind-Whipped': [
    "accompanied by the rhythmic dance of air through ingredients",
    "enhanced by the musical whir of wind-powered preparation",
    "surrounded by the symphony of elemental forces in harmony",
    "embraced by the energetic song of air currents working"
  ],
  
  'Air-Dried': [
    "accompanied by the silent patience of time's gentle work",
    "enhanced by the quiet rustle of ingredients slowly concentrating",
    "surrounded by the meditative stillness of gradual transformation",
    "embraced by the peaceful absence of forceful preparation"
  ],
  
  'Breath-Infused': [
    "accompanied by the sacred rhythm of mindful breathing",
    "enhanced by the gentle pulse of life force being shared",
    "surrounded by the quiet meditation of breath becoming food",
    "embraced by the spiritual harmony of chi infusion"
  ],
  
  'Meditation-Enhanced': [
    "accompanied by the profound silence of deep contemplation",
    "enhanced by the subtle vibration of focused intention",
    "surrounded by the peaceful resonance of mindful preparation",
    "embraced by the quiet power of spiritual concentration"
  ],
  
  'Levitation-Prepared': [
    "accompanied by the ethereal hum of weightless preparation",
    "enhanced by the otherworldly silence of floating ingredients",
    "surrounded by the mystical absence of gravitational constraint",
    "embraced by the cosmic harmony of airbending mastery"
  ],
  
  'Gentle Braised': [
    "accompanied by the contented bubbling of slow transformation",
    "enhanced by the rhythmic symphony of liquid and heat",
    "surrounded by the comforting murmur of ingredients melding",
    "embraced by the patient song of time-honored cooking"
  ]
} as const;

// Export aliases for compatibility
export const SPIRITUAL_LEADINS = ENHANCED_SPIRITUAL_LEADINS;
export const PREPARATION_PHRASES = ENHANCED_PREPARATION_PHRASES;
export const SERVING_PHRASES = ENHANCED_SERVING_PHRASES; 