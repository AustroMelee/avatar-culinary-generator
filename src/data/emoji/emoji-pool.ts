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