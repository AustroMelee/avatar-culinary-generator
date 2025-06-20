/**
 * Air Nomad Dish Naming Grammar System
 * 
 * Provides culturally authentic name components for generating
 * Air Nomad dish names that reflect spiritual traditions,
 * geographical features, and culinary heritage.
 * 
 * Organized by semantic role for structured name composition.
 */

/** Base adjectives describing dish qualities and spiritual attributes */
export type DishNameAdjective = 
  | 'Sky'
  | 'Cloud' 
  | 'Mountain'
  | 'Sacred'
  | 'Ancient'
  | 'Floating'
  | 'Celestial'
  | 'Enlightened'
  | 'Serene'
  | 'Mystic'
  | 'Windswept'
  | 'Temple'
  | 'Monastery'
  | 'Airy'
  | 'Light'
  | 'Pure'
  | 'Blessed'
  | 'Golden'
  | 'Peaceful'
  | 'Harmonious';

/** Spiritual and geographical descriptors for cultural authenticity */
export type SpiritualDescriptor = 
  | 'Monk\'s'
  | 'Airbender\'s' 
  | 'Sky Bison\'s'
  | 'Wind Temple\'s'
  | 'Eastern Air Temple\'s'
  | 'Western Air Temple\'s'
  | 'Northern Air Temple\'s'
  | 'Southern Air Temple\'s'
  | 'Avatar\'s'
  | 'Master\'s'
  | 'Nomad\'s'
  | 'Pilgrim\'s'
  | 'Meditation'
  | 'Enlightenment'
  | 'Serenity'
  | 'Balance'
  | 'Harmony'
  | 'Wisdom'
  | 'Spirit'
  | 'Chi';

/** Core dish nouns representing food types and serving styles */
export type DishNameNoun = 
  | 'Bowl'
  | 'Soup'
  | 'Broth'
  | 'Stew'
  | 'Porridge'
  | 'Noodles'
  | 'Dumplings'
  | 'Cakes'
  | 'Buns'
  | 'Tea'
  | 'Brew'
  | 'Elixir'
  | 'Tonic'
  | 'Medley'
  | 'Harmony'
  | 'Delight'
  | 'Blessing'
  | 'Offering'
  | 'Feast'
  | 'Sustenance';

/** Complete collection of all adjectives for random selection */
export const DISH_NAME_ADJECTIVES: readonly DishNameAdjective[] = [
  'Sky',
  'Cloud', 
  'Mountain',
  'Sacred',
  'Ancient',
  'Floating',
  'Celestial',
  'Enlightened',
  'Serene',
  'Mystic',
  'Windswept',
  'Temple',
  'Monastery',
  'Airy',
  'Light',
  'Pure',
  'Blessed',
  'Golden',
  'Peaceful',
  'Harmonious',
] as const;

/** Complete collection of spiritual descriptors */
export const SPIRITUAL_DESCRIPTORS: readonly SpiritualDescriptor[] = [
  'Monk\'s',
  'Airbender\'s', 
  'Sky Bison\'s',
  'Wind Temple\'s',
  'Eastern Air Temple\'s',
  'Western Air Temple\'s',
  'Northern Air Temple\'s',
  'Southern Air Temple\'s',
  'Avatar\'s',
  'Master\'s',
  'Nomad\'s',
  'Pilgrim\'s',
  'Meditation',
  'Enlightenment',
  'Serenity',
  'Balance',
  'Harmony',
  'Wisdom',
  'Spirit',
  'Chi',
] as const;

/** Complete collection of dish nouns */
export const DISH_NAME_NOUNS: readonly DishNameNoun[] = [
  'Bowl',
  'Soup',
  'Broth',
  'Stew',
  'Porridge',
  'Noodles',
  'Dumplings',
  'Cakes',
  'Buns',
  'Tea',
  'Brew',
  'Elixir',
  'Tonic',
  'Medley',
  'Harmony',
  'Delight',
  'Blessing',
  'Offering',
  'Feast',
  'Sustenance',
] as const;

/** Name composition patterns for different dish types */
export type DishNamePattern = 
  | 'adjective_noun'           // "Sacred Bowl"
  | 'spiritual_noun'           // "Monk's Soup"
  | 'adjective_spiritual_noun' // "Ancient Airbender's Stew"
  | 'spiritual_adjective_noun'; // "Avatar's Golden Tea"

/** 
 * Retrieves all available dish name adjectives
 * @returns Array of culturally appropriate adjectives
 */
export function getDishNameAdjectives(): readonly DishNameAdjective[] {
  return DISH_NAME_ADJECTIVES;
}

/** 
 * Retrieves all available spiritual descriptors
 * @returns Array of spiritual and cultural descriptors
 */
export function getSpiritualDescriptors(): readonly SpiritualDescriptor[] {
  return SPIRITUAL_DESCRIPTORS;
}

/** 
 * Retrieves all available dish nouns
 * @returns Array of dish type nouns
 */
export function getDishNameNouns(): readonly DishNameNoun[] {
  return DISH_NAME_NOUNS;
}

/**
 * Generates a random dish name using specified pattern
 * @param pattern - The naming pattern to use
 * @param randomSelector - Function to select random elements from arrays
 * @returns Generated dish name string
 */
export function generateDishNameByPattern(
  pattern: DishNamePattern,
  randomSelector: <T>(array: readonly T[]) => T
): string {
  switch (pattern) {
    case 'adjective_noun':
      return `${randomSelector(DISH_NAME_ADJECTIVES)} ${randomSelector(DISH_NAME_NOUNS)}`;
    
    case 'spiritual_noun':
      return `${randomSelector(SPIRITUAL_DESCRIPTORS)} ${randomSelector(DISH_NAME_NOUNS)}`;
    
    case 'adjective_spiritual_noun':
      return `${randomSelector(DISH_NAME_ADJECTIVES)} ${randomSelector(SPIRITUAL_DESCRIPTORS)} ${randomSelector(DISH_NAME_NOUNS)}`;
    
    case 'spiritual_adjective_noun':
      return `${randomSelector(SPIRITUAL_DESCRIPTORS)} ${randomSelector(DISH_NAME_ADJECTIVES)} ${randomSelector(DISH_NAME_NOUNS)}`;
    
    default:
      // Fallback to simple adjective + noun pattern
      return `${randomSelector(DISH_NAME_ADJECTIVES)} ${randomSelector(DISH_NAME_NOUNS)}`;
  }
}

/**
 * Gets all available naming patterns
 * @returns Array of all dish naming patterns
 */
export function getDishNamePatterns(): readonly DishNamePattern[] {
  return ['adjective_noun', 'spiritual_noun', 'adjective_spiritual_noun', 'spiritual_adjective_noun'] as const;
}

/** 
 * COMPREHENSIVE FLAT ARRAYS FOR BRUTE-FORCE NAME GENERATION
 * Exhaustive collections covering all thematic categories
 */

/** Extensive adjectives covering spiritual, elemental, seasonal, color, and monastic themes */
export const dishAdjectives: string[] = [
  // Spiritual & Monastic
  "Sacred", "Celestial", "Monastic", "Blessed", "Divine", "Holy", "Enlightened", "Transcendent", 
  "Meditative", "Contemplative", "Serene", "Peaceful", "Harmonious", "Spiritual", "Mystical", 
  "Ethereal", "Zen", "Mindful", "Sacred", "Venerable", "Ancient", "Timeless", "Eternal", 
  "Pure", "Pristine", "Immaculate", "Reverent", "Pious", "Devotional", "Sanctified",
  
  // Elemental & Air-themed
  "Wind-Blessed", "Cloud-Touched", "Sky-Born", "Air-Kissed", "Breeze-Swept", "Storm-Blessed", 
  "Gale-Touched", "Zephyr", "Tempest", "Hurricane", "Typhoon", "Cyclone", "Whirlwind", 
  "Updraft", "Downdraft", "Thermal", "Atmospheric", "Stratospheric", "Tropospheric",
  
  // Seasonal & Time
  "Spring", "Summer", "Autumn", "Winter", "Dawn", "Sunset", "Twilight", "Midnight", 
  "Equinox", "Solstice", "Seasonal", "Vernal", "Autumnal", "Hibernal", "Estival", 
  "Morning", "Evening", "Noontime", "Vespers", "Matins", "Daybreak", "Dusk",
  
  // Colors & Visual
  "Golden", "Silver", "Platinum", "Pearl", "Ivory", "Amber", "Bronze", "Copper", 
  "Jade", "Emerald", "Sapphire", "Ruby", "Opal", "Crystal", "Diamond", "Moonstone", 
  "Sunstone", "Starlight", "Rainbow", "Prismatic", "Iridescent", "Luminous", "Radiant", 
  "Glowing", "Shimmering", "Sparkling", "Gleaming", "Brilliant", "Incandescent",
  
  // Qualities & Attributes  
  "Gentle", "Soft", "Tender", "Delicate", "Subtle", "Refined", "Elegant", "Graceful", 
  "Flowing", "Drifting", "Floating", "Soaring", "Ascending", "Elevated", "Uplifting", 
  "Inspiring", "Awakening", "Enlightening", "Transformative", "Healing", "Nourishing", 
  "Sustaining", "Comforting", "Soothing", "Calming", "Tranquil", "Quiet", "Silent", 
  "Whispering", "Murmuring", "Echoing", "Resonant", "Melodic", "Harmonious", "Balanced",
  
  // Temple & Location
  "Temple", "Monastery", "Shrine", "Sanctuary", "Pavilion", "Pagoda", "Chapel", 
  "Cathedral", "Basilica", "Altar", "Eastern", "Western", "Northern", "Southern", 
  "Mountain", "Peak", "Summit", "Highland", "Alpine", "Himalayan", "Tibetan", 
  "Cloistered", "Secluded", "Hidden", "Remote", "Isolated", "Distant",
  
  // Cultural & Traditional
  "Traditional", "Ancestral", "Heritage", "Legacy", "Classic", "Vintage", "Antique", 
  "Time-Honored", "Conventional", "Customary", "Ritualistic", "Ceremonial", "Festival", 
  "Celebration", "Commemorative", "Memorial", "Tribute", "Honor", "Respect", "Reverence",
  
  // Sky Bison & Avatar Lore
  "Bison's", "Avatar's", "Aang's", "Yangchen's", "Master's", "Guru's", "Sage's", 
  "Elder's", "Abbot's", "Prior's", "Monk's", "Nun's", "Acolyte's", "Novice's", 
  "Initiate's", "Student's", "Disciple's", "Follower's", "Pilgrim's", "Wanderer's"
];

/** Extensive nouns including generic concepts and specific food types */
export const dishNouns: string[] = [
  // Generic Spiritual/Abstract
  "Harmony", "Balance", "Serenity", "Peace", "Tranquility", "Bliss", "Joy", "Ecstasy", 
  "Rapture", "Enlightenment", "Awakening", "Nirvana", "Satori", "Samadhi", "Moksha", 
  "Liberation", "Freedom", "Release", "Transcendence", "Ascension", "Elevation", 
  "Unity", "Oneness", "Wholeness", "Completeness", "Perfection", "Purity", "Essence", 
  "Spirit", "Soul", "Heart", "Mind", "Consciousness", "Awareness", "Presence", 
  "Being", "Existence", "Life", "Vitality", "Energy", "Force", "Power", "Strength",
  
  // Poetic/Atmospheric
  "Whisper", "Murmur", "Echo", "Resonance", "Vibration", "Frequency", "Wave", "Ripple", 
  "Breeze", "Gust", "Zephyr", "Wind", "Gale", "Storm", "Tempest", "Cyclone", 
  "Cloud", "Mist", "Fog", "Vapor", "Steam", "Smoke", "Haze", "Shimmer", "Mirage", 
  "Dream", "Vision", "Reverie", "Fantasy", "Imagination", "Wonder", "Miracle", "Mystery",
  
  // Sanctuary/Place
  "Sanctuary", "Haven", "Refuge", "Retreat", "Shelter", "Oasis", "Paradise", "Utopia", 
  "Eden", "Garden", "Grove", "Meadow", "Valley", "Dell", "Glade", "Clearing", 
  "Temple", "Shrine", "Altar", "Chapel", "Cathedral", "Monastery", "Cloister", "Cell",
  
  // Food-Specific Traditional
  "Soup", "Broth", "Stew", "Bisque", "Consommé", "Chowder", "Gazpacho", "Minestrone", 
  "Pho", "Ramen", "Udon", "Soba", "Miso", "Dashi", "Stock", "Bone Broth", 
  "Salad", "Slaw", "Medley", "Mix", "Blend", "Fusion", "Combination", "Mixture", 
  "Bowl", "Plate", "Platter", "Tray", "Dish", "Course", "Serving", "Portion",
  
  // Specific Dishes
  "Dumplings", "Wontons", "Gyoza", "Potstickers", "Steamed Buns", "Baozi", "Mantou", 
  "Spring Rolls", "Summer Rolls", "Egg Rolls", "Crepes", "Pancakes", "Fritters", 
  "Tempura", "Noodles", "Pasta", "Vermicelli", "Rice Paper", "Wrappers", "Pockets", 
  "Parcels", "Bundles", "Rolls", "Wraps", "Folds", "Layers", "Stacks", "Towers",
  
  // Beverages & Liquids
  "Tea", "Chai", "Tisane", "Infusion", "Decoction", "Brew", "Elixir", "Tonic", 
  "Potion", "Draught", "Cordial", "Nectar", "Ambrosia", "Essence", "Extract", 
  "Concentrate", "Reduction", "Syrup", "Honey", "Nectar", "Juice", "Smoothie", 
  "Lassi", "Milk", "Cream", "Butter", "Yogurt", "Kefir", "Kombucha", "Kvass",
  
  // Grains & Starches  
  "Rice", "Quinoa", "Barley", "Oats", "Wheat", "Millet", "Buckwheat", "Amaranth", 
  "Teff", "Sorghum", "Bulgur", "Couscous", "Polenta", "Grits", "Porridge", "Congee", 
  "Risotto", "Pilaf", "Biryani", "Fried Rice", "Sticky Rice", "Wild Rice", "Brown Rice",
  
  // Sweets & Desserts
  "Cake", "Tart", "Pie", "Pastry", "Cookie", "Biscuit", "Scone", "Muffin", "Bread", 
  "Pudding", "Custard", "Mousse", "Soufflé", "Parfait", "Sundae", "Sorbet", "Gelato", 
  "Ice Cream", "Frozen Yogurt", "Popsicle", "Candy", "Confection", "Sweet", "Treat", 
  "Delight", "Pleasure", "Indulgence", "Temptation", "Craving", "Desire", "Satisfaction",
  
  // Ceremonial/Ritual
  "Offering", "Oblation", "Sacrifice", "Gift", "Present", "Tribute", "Honor", "Blessing", 
  "Benediction", "Grace", "Prayer", "Mantra", "Chant", "Hymn", "Song", "Melody", 
  "Ritual", "Ceremony", "Rite", "Sacrament", "Communion", "Eucharist", "Mass", "Service",
  
  // Elements & Nature
  "Fire", "Water", "Earth", "Air", "Metal", "Wood", "Stone", "Crystal", "Gem", 
  "Flower", "Blossom", "Petal", "Leaf", "Branch", "Root", "Seed", "Fruit", "Berry", 
  "Nut", "Grain", "Herb", "Spice", "Seasoning", "Flavor", "Taste", "Aroma", "Fragrance"
];

/** Joining words and connectors for complex names */
export const nameJoiners: string[] = [
  "of", "from", "with", "and", "by", "in", "on", "under", "over", "through", 
  "within", "beyond", "beneath", "above", "beside", "among", "between", "during", 
  "throughout", "across", "along", "around", "behind", "before", "after", "near", 
  "beside", "alongside", "atop", "underneath", "inside", "outside", "without", 
  "despite", "including", "excluding", "plus", "minus", "via", "per", "unto", 
  "towards", "against", "concerning", "regarding", "respecting", "considering", 
  "featuring", "containing", "holding", "bearing", "carrying", "bringing", 
  "offering", "presenting", "delivering", "providing", "serving", "sharing", 
  "&", "+", "-", "~", "x", "meets", "joins", "blends", "fuses", "combines", 
  "unites", "merges", "mingles", "mixes", "marries", "pairs", "matches", "complements"
];

/** Procedural name formats with placeholder patterns */
export const dishFormats: string[] = [
  // Simple Patterns
  "{adjective} {noun}",
  "{adjective} {adjective} {noun}",
  "{noun} {joiner} {adjective}",
  "{adjective} {noun} {joiner} {noun}",
  
  // Complex Patterns with Ingredients
  "{adjective} {technique} {main} {garnish}",
  "{adjective} {main} {noun}",
  "{technique} {main} with {garnish}",
  "{main} {joiner} {garnish} {noun}",
  "{adjective} {main} {joiner} {seasonal} {garnish}",
  
  // Spiritual/Cultural Patterns
  "{spiritual} {adjective} {noun}",
  "{temple} {technique} {main}",
  "{master} {adjective} {noun} {joiner} {garnish}",
  "{ceremony} {main} {joiner} {seasonal} {elements}",
  
  // Seasonal/Temporal Patterns
  "{season} {adjective} {noun}",
  "{time} {technique} {main}",
  "{season} {main} {joiner} {garnish} {noun}",
  "{time} {adjective} {technique} {joiner} {elements}",
  
  // Elemental Patterns
  "{element} {adjective} {noun}",
  "{element} {technique} {main} {garnish}",
  "{adjective} {element} {noun} {joiner} {garnish}",
  "{element} {joiner} {element} {noun}",
  
  // Location/Temple Patterns  
  "{temple} {adjective} {noun}",
  "{location} {technique} {main}",
  "{temple} {main} {joiner} {garnish} {noun}",
  "{location} {adjective} {technique} {joiner} {elements}",
  
  // Master/Authority Patterns
  "{master} {noun}",
  "{master} {adjective} {technique}",
  "{master} {main} {joiner} {garnish}",
  "{authority} {adjective} {noun} {joiner} {elements}",
  
  // Ceremonial/Ritual Patterns
  "{ceremony} {noun}",
  "{ritual} {adjective} {main}",
  "{ceremony} {technique} {joiner} {garnish}",
  "{ritual} {adjective} {noun} {joiner} {blessing}",
  
  // Multi-Element Complex Patterns
  "{adjective} {adjective} {noun} {joiner} {adjective} {garnish}",
  "{spiritual} {adjective} {technique} {joiner} {seasonal} {elements}",
  "{temple} {ceremony} {main} {joiner} {adjective} {garnish} {noun}",
  "{master} {seasonal} {technique} {joiner} {element} {joiner} {element} {noun}",
  "{time} {spiritual} {adjective} {main} {joiner} {garnish} {joiner} {blessing}",
  
  // Poetic/Flowing Patterns
  "{adjective} {noun} {joiner} {adjective} {noun}",
  "{technique} {joiner} {technique} {noun}",
  "{element} {joiner} {element} {joiner} {element} {noun}",
  "{spiritual} {noun} {joiner} {temporal} {blessing}",
  
  // Cultural Fusion Patterns
  "{culture} {adjective} {noun}",
  "{culture} {technique} {main} {garnish}",
  "{culture} {joiner} {culture} {fusion} {noun}",
  "{traditional} {culture} {technique} {joiner} {modern} {elements}",
  
  // Ingredient-Focused Patterns
  "{main} {joiner} {vegetable} {noun}",
  "{protein} {technique} {joiner} {grain} {garnish}",
  "{fruit} {joiner} {herb} {adjective} {noun}",
  "{spice} {main} {joiner} {liquid} {technique} {noun}",
  
  // Texture/Preparation Patterns
  "{texture} {adjective} {noun}",
  "{preparation} {main} {joiner} {garnish}",
  "{texture} {technique} {main} {joiner} {liquid} {noun}",
  "{preparation} {joiner} {preparation} {adjective} {noun}",
  
  // Serving/Presentation Patterns
  "{serving} {adjective} {noun}",
  "{presentation} {technique} {main}",
  "{serving} {main} {joiner} {garnish} {noun}",
  "{presentation} {adjective} {technique} {joiner} {blessing}"
]; 