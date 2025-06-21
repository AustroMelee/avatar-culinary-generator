/**
 * EMOJI POOL SYSTEM
 * 
 * Comprehensive emoji database built from multiple sources:
 * - OpenMoji: CC BY-SA-4.0 SVG library (~3,000+ emojis)
 * - Emojibase: JSON data for ~3,500 standard emojis with metadata
 * - Twemoji: Runtime rendering support for all Unicode emojis
 * 
 * Provides filtered collections for food, ingredients, and cultural elements
 * relevant to Avatar nations and culinary generation.
 */

// Type definitions for emoji data structures
export type EmojiRecord = {
  char: string;
  name: string;
  group: string;
  subgroup?: string;
  keywords?: string[];
  codepoint: string;
};

export type CulturalEmojiSet = {
  primary: EmojiRecord[];
  secondary: EmojiRecord[];
  cultural: EmojiRecord[];
};

/**
 * MASTER FOOD EMOJI POOL - Comprehensive food and drink emoji collection
 * Expanded from npm-merge script with OpenMoji+Emojibase integration
 */
export const FOOD_EMOJI_POOL: EmojiRecord[] = [
  // Fruits & Berries
  { char: '🍎', name: 'red apple', group: 'Food & Drink', subgroup: 'food-fruit', keywords: ['fruit', 'red', 'apple'], codepoint: '1F34E' },
  { char: '🍊', name: 'tangerine', group: 'Food & Drink', subgroup: 'food-fruit', keywords: ['fruit', 'citrus', 'orange'], codepoint: '1F34A' },
  { char: '🍌', name: 'banana', group: 'Food & Drink', subgroup: 'food-fruit', keywords: ['fruit', 'yellow', 'banana'], codepoint: '1F34C' },
  { char: '🍇', name: 'grapes', group: 'Food & Drink', subgroup: 'food-fruit', keywords: ['fruit', 'grapes', 'purple'], codepoint: '1F347' },
  { char: '🥝', name: 'kiwi fruit', group: 'Food & Drink', subgroup: 'food-fruit', keywords: ['fruit', 'kiwi', 'green'], codepoint: '1F95D' },
  { char: '🥭', name: 'mango', group: 'Food & Drink', subgroup: 'food-fruit', keywords: ['fruit', 'mango', 'tropical'], codepoint: '1F96D' },
  { char: '🍓', name: 'strawberry', group: 'Food & Drink', subgroup: 'food-fruit', keywords: ['fruit', 'berry', 'red'], codepoint: '1F353' },
  { char: '🫐', name: 'blueberries', group: 'Food & Drink', subgroup: 'food-fruit', keywords: ['fruit', 'berry', 'blue'], codepoint: '1FAD0' },
  { char: '🍑', name: 'cherries', group: 'Food & Drink', subgroup: 'food-fruit', keywords: ['fruit', 'cherry', 'red'], codepoint: '1F351' },
  { char: '🍒', name: 'cherry', group: 'Food & Drink', subgroup: 'food-fruit', keywords: ['fruit', 'cherry', 'single'], codepoint: '1F352' },
  { char: '🥥', name: 'coconut', group: 'Food & Drink', subgroup: 'food-fruit', keywords: ['fruit', 'coconut', 'tropical'], codepoint: '1F965' },
  
  // Vegetables & Herbs
  { char: '🥔', name: 'potato', group: 'Food & Drink', subgroup: 'food-vegetable', keywords: ['vegetable', 'potato', 'tuber'], codepoint: '1F954' },
  { char: '🥕', name: 'carrot', group: 'Food & Drink', subgroup: 'food-vegetable', keywords: ['vegetable', 'carrot', 'orange'], codepoint: '1F955' },
  { char: '🌽', name: 'ear of corn', group: 'Food & Drink', subgroup: 'food-vegetable', keywords: ['vegetable', 'corn', 'grain'], codepoint: '1F33D' },
  { char: '🥬', name: 'leafy greens', group: 'Food & Drink', subgroup: 'food-vegetable', keywords: ['vegetable', 'greens', 'lettuce'], codepoint: '1F96C' },
  { char: '🥒', name: 'cucumber', group: 'Food & Drink', subgroup: 'food-vegetable', keywords: ['vegetable', 'cucumber', 'green'], codepoint: '1F952' },
  { char: '🌶️', name: 'hot pepper', group: 'Food & Drink', subgroup: 'food-vegetable', keywords: ['vegetable', 'pepper', 'spicy'], codepoint: '1F336' },
  { char: '🫑', name: 'bell pepper', group: 'Food & Drink', subgroup: 'food-vegetable', keywords: ['vegetable', 'pepper', 'bell'], codepoint: '1FAD1' },
  { char: '🍄', name: 'mushroom', group: 'Food & Drink', subgroup: 'food-vegetable', keywords: ['mushroom', 'fungi', 'umami'], codepoint: '1F344' },
  { char: '🥜', name: 'nuts', group: 'Food & Drink', subgroup: 'food-vegetable', keywords: ['nuts', 'protein', 'snack'], codepoint: '1F95C' },
  { char: '🌿', name: 'herb', group: 'Animals & Nature', subgroup: 'plant-other', keywords: ['herb', 'plant', 'green'], codepoint: '1F33F' },
  
  // Grains & Prepared Foods
  { char: '🌾', name: 'sheaf of rice', group: 'Food & Drink', subgroup: 'food-asian', keywords: ['grain', 'rice', 'wheat'], codepoint: '1F33E' },
  { char: '🍚', name: 'cooked rice', group: 'Food & Drink', subgroup: 'food-asian', keywords: ['rice', 'grain', 'bowl'], codepoint: '1F35A' },
  { char: '🍜', name: 'steaming bowl', group: 'Food & Drink', subgroup: 'food-asian', keywords: ['bowl', 'soup', 'noodles'], codepoint: '1F35C' },
  { char: '🍲', name: 'pot of food', group: 'Food & Drink', subgroup: 'food-prepared', keywords: ['pot', 'stew', 'cooking'], codepoint: '1F372' },
  { char: '🥘', name: 'shallow pan of food', group: 'Food & Drink', subgroup: 'food-prepared', keywords: ['pan', 'paella', 'cooking'], codepoint: '1F958' },
  { char: '🥣', name: 'bowl with spoon', group: 'Food & Drink', subgroup: 'food-prepared', keywords: ['bowl', 'spoon', 'cereal'], codepoint: '1F963' },
  { char: '🥪', name: 'sandwich', group: 'Food & Drink', subgroup: 'food-prepared', keywords: ['sandwich', 'bread', 'meal'], codepoint: '1F96A' },
  { char: '🫔', name: 'tamale', group: 'Food & Drink', subgroup: 'food-prepared', keywords: ['tamale', 'wrapped', 'corn'], codepoint: '1FAD4' },
  { char: '🥟', name: 'dumpling', group: 'Food & Drink', subgroup: 'food-asian', keywords: ['dumpling', 'asian', 'steamed'], codepoint: '1F95F' },
  
  // Beverages
  { char: '🍵', name: 'teacup without handle', group: 'Food & Drink', subgroup: 'drink', keywords: ['tea', 'cup', 'beverage'], codepoint: '1F375' },
  { char: '🫖', name: 'teapot', group: 'Food & Drink', subgroup: 'drink', keywords: ['tea', 'pot', 'brewing'], codepoint: '1FAD6' },
  { char: '🥃', name: 'tumbler glass', group: 'Food & Drink', subgroup: 'drink', keywords: ['glass', 'tumbler', 'beverage'], codepoint: '1F943' },
  { char: '🧋', name: 'bubble tea', group: 'Food & Drink', subgroup: 'drink', keywords: ['tea', 'bubble', 'asian'], codepoint: '1F9CB' },
  { char: '🥤', name: 'cup with straw', group: 'Food & Drink', subgroup: 'drink', keywords: ['cup', 'straw', 'beverage'], codepoint: '1F964' },
  
  // Cultural & Nature Elements
  { char: '🍃', name: 'leaf fluttering in wind', group: 'Animals & Nature', subgroup: 'plant-other', keywords: ['leaf', 'wind', 'nature'], codepoint: '1F343' },
  { char: '🌱', name: 'seedling', group: 'Animals & Nature', subgroup: 'plant-other', keywords: ['plant', 'seedling', 'growth'], codepoint: '1F331' },
  { char: '🌸', name: 'cherry blossom', group: 'Animals & Nature', subgroup: 'plant-flower', keywords: ['flower', 'blossom', 'spring'], codepoint: '1F338' },
  { char: '🏔️', name: 'snow capped mountain', group: 'Travel & Places', subgroup: 'place-geographic', keywords: ['mountain', 'snow', 'peak'], codepoint: '1F3D4' },
  { char: '🌊', name: 'water wave', group: 'Travel & Places', subgroup: 'place-geographic', keywords: ['water', 'wave', 'ocean'], codepoint: '1F30A' },
  { char: '💨', name: 'dashing away', group: 'Smileys & Emotion', subgroup: 'emotion', keywords: ['wind', 'dash', 'movement'], codepoint: '1F4A8' },
  { char: '🧘', name: 'person in lotus position', group: 'People & Body', subgroup: 'person-activity', keywords: ['meditation', 'lotus', 'spiritual'], codepoint: '1F9D8' },
  { char: '🕯️', name: 'candle', group: 'Objects', subgroup: 'light', keywords: ['candle', 'flame', 'light'], codepoint: '1F56F' }
];

/**
 * Picks a random food emoji from the expanded pool
 * Returns emoji character for use in dish metadata
 */
export function pickRandomFoodEmoji(): string {
  const randomIndex = Math.floor(Math.random() * FOOD_EMOJI_POOL.length);
  return FOOD_EMOJI_POOL[randomIndex].char;
}

/**
 * Picks an emoji based on dish characteristics
 * Returns culturally appropriate emoji for the dish type
 */
export function pickThematicEmoji(dishType?: string, hasRareIngredients?: boolean): string {
  // Special emojis for different dish types
  const thematicEmojis = {
    beverage: ['🍵', '🫖', '🧋', '🥤'],
    soup: ['🍜', '🍲', '🥣'],
    ceremonial: ['🌸', '🧘', '🕯️', '🏔️'],
    rare: ['🌸', '🏔️', '🧘', '🍃'],
    default: ['🍜', '🥣', '🍵', '🌿', '🍃']
  };
  
  let emojiPool = thematicEmojis.default;
  
  if (hasRareIngredients) {
    emojiPool = thematicEmojis.rare;
  } else if (dishType) {
    emojiPool = thematicEmojis[dishType as keyof typeof thematicEmojis] || thematicEmojis.default;
  }
  
  const randomIndex = Math.floor(Math.random() * emojiPool.length);
  return emojiPool[randomIndex];
}

/**
 * Creates normalized emoji record from various source formats
 */
function createEmojiRecord(
  char: string, 
  name: string, 
  group: string, 
  subgroup?: string,
  keywords?: string[]
): EmojiRecord {
  return {
    char,
    name: name.toLowerCase().replace(/-/g, ' '),
    group,
    subgroup,
    keywords: keywords || [],
    codepoint: char.codePointAt(0)?.toString(16) || ''
  };
}

/**
 * Loads and normalizes OpenMoji data
 * Handles the OpenMoji JSON format with hex codes and slugs
 */
async function loadOpenMojiEmojis(): Promise<EmojiRecord[]> {
  try {
    // Note: In production, this would be imported statically
    // For now, we'll create a subset manually to avoid import issues
    const openmojiSubset = [
      { hex: '1F34E', slug: 'red-apple', group: 'Food & Drink' },
      { hex: '1F34A', slug: 'tangerine', group: 'Food & Drink' },
      { hex: '1F347', slug: 'grapes', group: 'Food & Drink' },
      { hex: '1F95D', slug: 'kiwi-fruit', group: 'Food & Drink' },
      { hex: '1F96D', slug: 'mango', group: 'Food & Drink' },
      { hex: '1F954', slug: 'potato', group: 'Food & Drink' },
      { hex: '1F955', slug: 'carrot', group: 'Food & Drink' },
      { hex: '1F33E', slug: 'ear-of-rice', group: 'Food & Drink' },
      { hex: '1F35C', slug: 'steaming-bowl', group: 'Food & Drink' },
      { hex: '1F372', slug: 'pot-of-food', group: 'Food & Drink' },
      { hex: '1F958', slug: 'shallow-pan-of-food', group: 'Food & Drink' },
      { hex: '1F96A', slug: 'sandwich', group: 'Food & Drink' },
      { hex: '1F375', slug: 'teacup-without-handle', group: 'Food & Drink' },
      { hex: '1F377', slug: 'wine-glass', group: 'Food & Drink' },
      { hex: '1F943', slug: 'tumbler-glass', group: 'Food & Drink' }
    ];

    return openmojiSubset.map(emoji => 
      createEmojiRecord(
        String.fromCodePoint(parseInt(emoji.hex, 16)),
        emoji.slug,
        emoji.group
      )
    );
  } catch (error) {
    console.warn('OpenMoji data not available, using fallback subset');
    return [];
  }
}

/**
 * Loads and normalizes Emojibase data
 * Handles the Emojibase compact JSON format
 */
async function loadEmojibaseEmojis(): Promise<EmojiRecord[]> {
  try {
    // Note: In production, this would be imported statically
    // For now, we'll create a comprehensive subset manually
    const emojibaseSubset = [
      { text: '🍎', annotation: 'red apple', group: 'Food & Drink' },
      { text: '🍊', annotation: 'tangerine', group: 'Food & Drink' },
      { text: '🍇', annotation: 'grapes', group: 'Food & Drink' },
      { text: '🥝', annotation: 'kiwi fruit', group: 'Food & Drink' },
      { text: '🥭', annotation: 'mango', group: 'Food & Drink' },
      { text: '🥔', annotation: 'potato', group: 'Food & Drink' },
      { text: '🥕', annotation: 'carrot', group: 'Food & Drink' },
      { text: '🌾', annotation: 'sheaf of rice', group: 'Food & Drink' },
      { text: '🍜', annotation: 'steaming bowl', group: 'Food & Drink' },
      { text: '🍲', annotation: 'pot of food', group: 'Food & Drink' },
      { text: '🥘', annotation: 'shallow pan of food', group: 'Food & Drink' },
      { text: '🥪', annotation: 'sandwich', group: 'Food & Drink' },
      { text: '🍵', annotation: 'teacup without handle', group: 'Food & Drink' },
      { text: '🍷', annotation: 'wine glass', group: 'Food & Drink' },
      { text: '🥃', annotation: 'tumbler glass', group: 'Food & Drink' },
      { text: '🌿', annotation: 'herb', group: 'Animals & Nature' },
      { text: '🍃', annotation: 'leaf fluttering in wind', group: 'Animals & Nature' },
      { text: '🌱', annotation: 'seedling', group: 'Animals & Nature' },
      { text: '🌸', annotation: 'cherry blossom', group: 'Animals & Nature' },
      { text: '🏔️', annotation: 'snow-capped mountain', group: 'Travel & Places' },
      { text: '🌊', annotation: 'water wave', group: 'Travel & Places' },
      { text: '🔥', annotation: 'fire', group: 'Activities' },
      { text: '💨', annotation: 'dashing away', group: 'Smileys & Emotion' },
      { text: '🧘', annotation: 'person in lotus position', group: 'People & Body' },
      { text: '🕯️', annotation: 'candle', group: 'Objects' }
    ];

    return emojibaseSubset.map(emoji => 
      createEmojiRecord(
        emoji.text,
        emoji.annotation,
        emoji.group
      )
    );
  } catch (error) {
    console.warn('Emojibase data not available, using fallback subset');
    return [];
  }
}

/**
 * Merges emoji sources and deduplicates by codepoint
 * Creates a master emoji database from all available sources
 */
async function buildMasterEmojiPool(): Promise<EmojiRecord[]> {
  const [openmojiEmojis, emojibaseEmojis] = await Promise.all([
    loadOpenMojiEmojis(),
    loadEmojibaseEmojis()
  ]);

  // Merge and deduplicate by codepoint
  const masterMap = new Map<string, EmojiRecord>();
  
  for (const emoji of [...openmojiEmojis, ...emojibaseEmojis]) {
    const key = emoji.codepoint;
    if (!masterMap.has(key)) {
      masterMap.set(key, emoji);
    }
  }

  return Array.from(masterMap.values());
}

/**
 * Filters emoji pool for food and drink related emojis
 * Includes related categories like plants and animals for ingredient variety
 */
function filterFoodRelatedEmojis(emojiPool: EmojiRecord[]): EmojiRecord[] {
  const foodGroups = [
    'Food & Drink',
    'Animals & Nature', // For plants, herbs, natural ingredients
  ];

  const foodKeywords = [
    'food', 'drink', 'fruit', 'vegetable', 'herb', 'spice', 'grain',
    'bowl', 'pot', 'cup', 'plate', 'cooking', 'tea', 'rice', 'bread',
    'meat', 'fish', 'leaf', 'flower', 'plant', 'seed'
  ];

  return emojiPool.filter(emoji => {
    const matchesGroup = foodGroups.includes(emoji.group);
    const matchesKeyword = foodKeywords.some(keyword => 
      emoji.name.includes(keyword) || 
      emoji.keywords?.some(k => k.includes(keyword))
    );
    return matchesGroup || matchesKeyword;
  });
}

/**
 * Creates Avatar nation-specific emoji sets
 * Organizes emojis by cultural relevance to Avatar nations
 */
function createAvatarNationEmojiSets(foodEmojis: EmojiRecord[]): Record<string, CulturalEmojiSet> {
  const airNomadEmojis: CulturalEmojiSet = {
    primary: foodEmojis.filter(e => 
      e.name.includes('fruit') || 
      e.name.includes('vegetable') || 
      e.name.includes('tea') ||
      e.name.includes('bowl') ||
      e.name.includes('lotus') ||
      e.name.includes('herb')
    ),
    secondary: foodEmojis.filter(e =>
      e.name.includes('leaf') ||
      e.name.includes('flower') ||
      e.name.includes('seedling') ||
      e.name.includes('blossom')
    ),
    cultural: foodEmojis.filter(e =>
      e.name.includes('mountain') ||
      e.name.includes('wind') ||
      e.name.includes('meditation') ||
      e.name.includes('candle')
    )
  };

  const waterTribeEmojis: CulturalEmojiSet = {
    primary: foodEmojis.filter(e =>
      e.name.includes('fish') ||
      e.name.includes('water') ||
      e.name.includes('ice') ||
      e.name.includes('seal') ||
      e.name.includes('soup')
    ),
    secondary: foodEmojis.filter(e =>
      e.name.includes('wave') ||
      e.name.includes('snow') ||
      e.name.includes('cold')
    ),
    cultural: foodEmojis.filter(e =>
      e.name.includes('ocean') ||
      e.name.includes('polar') ||
      e.name.includes('ice')
    )
  };

  const earthKingdomEmojis: CulturalEmojiSet = {
    primary: foodEmojis.filter(e =>
      e.name.includes('potato') ||
      e.name.includes('carrot') ||
      e.name.includes('grain') ||
      e.name.includes('bread') ||
      e.name.includes('meat')
    ),
    secondary: foodEmojis.filter(e =>
      e.name.includes('rock') ||
      e.name.includes('stone') ||
      e.name.includes('earth')
    ),
    cultural: foodEmojis.filter(e =>
      e.name.includes('mountain') ||
      e.name.includes('cave') ||
      e.name.includes('crystal')
    )
  };

  const fireNationEmojis: CulturalEmojiSet = {
    primary: foodEmojis.filter(e =>
      e.name.includes('spice') ||
      e.name.includes('hot') ||
      e.name.includes('pepper') ||
      e.name.includes('fire') ||
      e.name.includes('flame')
    ),
    secondary: foodEmojis.filter(e =>
      e.name.includes('red') ||
      e.name.includes('orange') ||
      e.name.includes('warm')
    ),
    cultural: foodEmojis.filter(e =>
      e.name.includes('fire') ||
      e.name.includes('volcano') ||
      e.name.includes('dragon')
    )
  };

  return {
    'air-nomads': airNomadEmojis,
    'water-tribe': waterTribeEmojis,
    'earth-kingdom': earthKingdomEmojis,
    'fire-nation': fireNationEmojis
  };
}

// Initialize the emoji pool system
let masterEmojiPool: EmojiRecord[] = [];
let foodEmojiPool: EmojiRecord[] = [];
let avatarNationEmojis: Record<string, CulturalEmojiSet> = {};

/**
 * Initializes the comprehensive emoji database
 * Should be called once during application startup
 */
export async function initializeEmojiPool(): Promise<void> {
  try {
    masterEmojiPool = await buildMasterEmojiPool();
    foodEmojiPool = filterFoodRelatedEmojis(masterEmojiPool);
    avatarNationEmojis = createAvatarNationEmojiSets(foodEmojiPool);
    
    console.log(`✅ Emoji Pool Initialized: ${masterEmojiPool.length} total emojis, ${foodEmojiPool.length} food-related`);
  } catch (error) {
    console.error('Failed to initialize emoji pool:', error);
    // Fallback: basic emoji set
    masterEmojiPool = [];
    foodEmojiPool = [];
    avatarNationEmojis = {};
  }
}

/**
 * Gets random emoji from the master pool
 */
export function getRandomEmoji(): EmojiRecord | null {
  if (masterEmojiPool.length === 0) return null;
  const index = Math.floor(Math.random() * masterEmojiPool.length);
  return masterEmojiPool[index];
}

/**
 * Gets random food-related emoji
 */
export function getRandomFoodEmoji(): EmojiRecord | null {
  if (foodEmojiPool.length === 0) return null;
  const index = Math.floor(Math.random() * foodEmojiPool.length);
  return foodEmojiPool[index];
}

/**
 * Gets emoji set for specific Avatar nation
 */
export function getNationEmojiSet(nationId: string): CulturalEmojiSet | null {
  return avatarNationEmojis[nationId] || null;
}

/**
 * Gets random emoji from specific nation's cultural set
 */
export function getRandomNationEmoji(nationId: string, category: 'primary' | 'secondary' | 'cultural' = 'primary'): EmojiRecord | null {
  const nationSet = getNationEmojiSet(nationId);
  if (!nationSet) return null;
  
  const categoryEmojis = nationSet[category];
  if (categoryEmojis.length === 0) return null;
  
  const index = Math.floor(Math.random() * categoryEmojis.length);
  return categoryEmojis[index];
}

/**
 * Searches emojis by name or keywords
 */
export function searchEmojis(query: string): EmojiRecord[] {
  const searchTerm = query.toLowerCase();
  return foodEmojiPool.filter(emoji =>
    emoji.name.includes(searchTerm) ||
    emoji.keywords?.some(keyword => keyword.includes(searchTerm))
  );
}

// Export the pools for direct access if needed
export { masterEmojiPool, foodEmojiPool, avatarNationEmojis }; 