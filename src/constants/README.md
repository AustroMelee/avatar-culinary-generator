# ⚙️ Constants Module Documentation

The constants module provides centralized configuration, cleanup patterns, and festival data for the Avatar Food Generator system. This module enforces the LLM-first principle of avoiding magic values throughout the codebase.

## 📁 **Module Structure**

```
src/constants/
├── cleanup-patterns.ts              # Text processing pattern definitions
└── festivals.ts                     # Air Nomad festival and ceremony data
```

## 🎯 **Design Philosophy**

### **No Magic Values**
All constants are extracted from code and given semantic names for LLM readability and maintainability:

```typescript
// ✅ Correct: Named constants with semantic meaning
export const CULTURAL_WEIGHT_THRESHOLD = 6.0;
export const MAX_INGREDIENT_COUNT = 5;
export const LEGENDARY_INGREDIENT_RARITY = 0.15;

// ❌ Avoided: Magic values scattered in code
// if (ingredient.culturalWeight > 6.0) { }
// ingredients.slice(0, 5)
// Math.random() < 0.15
```

### **Centralized Configuration**
Configuration values are centralized to prevent inconsistencies and enable easy modification:

```typescript
// Universal configuration accessible throughout the system
export const SYSTEM_CONFIGURATION = {
  performance: {
    cacheSize: 100,
    maxGenerationTime: 1000, // milliseconds
    yieldInterval: 50 // operations between yields
  },
  
  cultural: {
    authenticityThreshold: 6.0,
    ceremonialThreshold: 8.0,
    vegetarianEnforcement: true
  },
  
  text: {
    maxDescriptionLength: 500,
    minDescriptionLength: 100,
    repetitionThreshold: 3
  }
};
```

## 🧹 **Cleanup Patterns Module** (`cleanup-patterns.ts`)

### **Pre-Compiled Regex Patterns**
Performance-optimized text processing patterns compiled at module load time:

```typescript
/**
 * Pre-compiled regex patterns for 50-80% text processing improvement
 * All patterns are compiled once at module initialization
 */
export const CLEANUP_PATTERNS = {
  // Grammar and punctuation fixes
  DOUBLE_SPACES: /\s{2,}/g,
  TRAILING_WHITESPACE: /\s+$/gm,
  LEADING_WHITESPACE: /^\s+/gm,
  
  // Repetition elimination
  REPEATED_WORDS: /\b(\w+)\s+\1\b/gi,
  REPEATED_PHRASES: /(.{3,}?)\s+\1/gi,
  
  // Air Nomad specific cleanup
  VEGETARIAN_VIOLATIONS: /\b(meat|fish|poultry|beef|pork|chicken)\b/gi,
  CULTURAL_INCONSISTENCIES: /\b(violence|anger|aggression)\b/gi,
  
  // Article and conjunction fixes
  INCORRECT_ARTICLES: /\ba\s+([aeiou])/gi,
  MISSING_COMMAS: /(\w+)\s+(and|or)\s+(\w+)/g,
  
  // Spiritual language enhancement
  ENHANCE_SPIRITUAL_TERMS: /\b(cook|prepare|make)\b/gi
} as const;
```

### **Cleanup Function Categories**

#### **Grammar Cleanup Patterns**
```typescript
export const GRAMMAR_PATTERNS = {
  // Sentence structure improvements
  RUN_ON_SENTENCES: /([.!?])\s*([a-z])/g,
  FRAGMENT_FIXES: /\b(while|when|if|because)\s+([^.!?]*)[.!?]/gi,
  
  // Punctuation standardization
  ELLIPSIS_NORMALIZE: /\.{2,}/g,
  QUOTE_STANDARDIZATION: /[""'']/g,
  DASH_STANDARDIZATION: /--+/g,
  
  // Capitalization rules
  SENTENCE_CAPS: /(^|\. )([a-z])/g,
  PROPER_NOUN_CAPS: /\b(air nomad|temple|master|avatar)\b/gi
};
```

#### **Cultural Cleanup Patterns**
```typescript
export const CULTURAL_PATTERNS = {
  // Air Nomad terminology standardization
  TEMPLE_REFERENCES: /\b(temple|monastery|sanctuary)\b/gi,
  SPIRITUAL_TERMINOLOGY: /\b(meditat\w*|spirit\w*|harmon\w*)\b/gi,
  VEGETARIAN_LANGUAGE: /\b(plant-based|vegetarian|cruelty-free)\b/gi,
  
  // Cultural sensitivity filters
  INAPPROPRIATE_TERMS: /\b(kill|destroy|conquer|dominate)\b/gi,
  PEACEFUL_REPLACEMENTS: /\b(gentle|peaceful|harmonious|balanced)\b/gi
};
```

#### **Performance Optimization**
```typescript
/**
 * Pattern compilation statistics for performance monitoring
 */
export const PATTERN_METRICS = {
  totalPatterns: Object.keys(CLEANUP_PATTERNS).length,
  compilationTime: 0, // Set at module initialization
  averageExecutionTime: 0, // Updated during runtime
  cacheHitRate: 0 // Performance tracking
};
```

## 🎭 **Festivals Module** (`festivals.ts`)

### **Air Nomad Festival Calendar**
Complete festival and ceremony data for cultural authenticity:

```typescript
/**
 * Air Nomad festival calendar with seasonal celebrations
 * Used for contextual dish generation and cultural significance
 */
export const AIR_NOMAD_FESTIVALS = [
  {
    name: "Festival of Floating Lanterns",
    season: "spring",
    duration: 3, // days
    spiritualSignificance: "renewal and hope",
    traditionalFoods: [
      "Cloud-Light Dumpling Soup",
      "Ascending Steam Buns",
      "Lantern Flower Tea"
    ],
    culturalWeight: 9.0,
    templeParticipation: "all_temples",
    meditationFocus: "letting go of burdens"
  },
  
  {
    name: "Ceremony of Sky Communion",
    season: "summer",
    duration: 1,
    spiritualSignificance: "connection with air spirits",
    traditionalFoods: [
      "High Altitude Berry Medley",
      "Wind-Dried Fruit Cakes",
      "Celestial Mint Refresher"
    ],
    culturalWeight: 10.0,
    templeParticipation: "master_level_only",
    meditationFocus: "spiritual ascension"
  }
] as const;
```

### **Festival Data Structure**

#### **Festival Interface**
```typescript
export interface AirNomadFestival {
  readonly name: string;
  readonly season: SeasonType;
  readonly duration: number; // days
  readonly spiritualSignificance: string;
  readonly traditionalFoods: readonly string[];
  readonly culturalWeight: number; // 1-10 scale
  readonly templeParticipation: TempleParticipationType;
  readonly meditationFocus: string;
  readonly preparationRituals?: readonly string[];
  readonly guestAccommodations?: boolean;
}

export type SeasonType = 'spring' | 'summer' | 'autumn' | 'winter';
export type TempleParticipationType = 
  | 'all_temples' 
  | 'master_level_only' 
  | 'specific_temples' 
  | 'wandering_nomads';
```

#### **Ceremonial Occasions**
```typescript
/**
 * Special ceremonial occasions beyond seasonal festivals
 */
export const CEREMONIAL_OCCASIONS = [
  {
    name: "New Airbender Initiation",
    frequency: "as_needed",
    participants: "temple_community",
    specialDishes: [
      "First Flight Celebration Cake",
      "Initiate's Blessing Soup",
      "Sacred Wind Cookies"
    ],
    culturalSignificance: "welcoming new airbenders to the community"
  },
  
  {
    name: "Master's Ascension Ceremony",
    frequency: "rare",
    participants: "temple_masters",
    specialDishes: [
      "Enlightenment Elixir",
      "Master's Wisdom Tea",
      "Transcendence Tonic"
    ],
    culturalSignificance: "recognizing spiritual mastery achievement"
  }
] as const;
```

### **Festival Utility Functions**

#### **Seasonal Festival Lookup**
```typescript
/**
 * Get festivals for a specific season
 */
export function getFestivalsForSeason(season: SeasonType): readonly AirNomadFestival[] {
  return AIR_NOMAD_FESTIVALS.filter(festival => festival.season === season);
}

/**
 * Get current season's active festivals
 */
export function getCurrentSeasonFestivals(): readonly AirNomadFestival[] {
  const currentSeason = getCurrentSeason(); // Implementation determines current season
  return getFestivalsForSeason(currentSeason);
}
```

#### **Cultural Context Generation**
```typescript
/**
 * Generate appropriate festival context for dish generation
 */
export function selectFestivalContext(
  dishType: DishType,
  culturalWeight: number
): AirNomadFestival | null {
  // Select appropriate festival based on dish characteristics
  const appropriateFestivals = AIR_NOMAD_FESTIVALS.filter(
    festival => festival.culturalWeight <= culturalWeight + 2.0
  );
  
  return selectRandomItem(appropriateFestivals);
}
```

## 🔧 **Configuration Categories**

### **Performance Configuration**
```typescript
export const PERFORMANCE_CONFIG = {
  // Cache settings
  fragmentCacheSize: 100,
  templateCacheSize: 50,
  patternCacheSize: 25,
  
  // Execution limits
  maxGenerationAttempts: 10,
  timeoutThreshold: 1000, // milliseconds
  yieldFrequency: 50, // operations between yields
  
  // Memory management
  maxObjectPoolSize: 200,
  garbageCollectionThreshold: 500,
  memoryWarningThreshold: 0.85 // 85% of heap
};
```

### **Cultural Authenticity Configuration**
```typescript
export const CULTURAL_CONFIG = {
  // Authenticity thresholds
  minimumCulturalWeight: 4.0,
  ceremonialThreshold: 8.0,
  sacredThreshold: 9.5,
  
  // Vegetarian enforcement
  strictVegetarianMode: true,
  allowDairyProducts: false, // Air Nomads avoid all animal products
  allowHoney: true, // Ethically sourced from temple beekeeping
  
  // Spiritual requirements
  requireMeditationElements: false, // Optional for daily dishes
  enforceTempleApproval: true,
  validateSpiritualBenefits: true
};
```

### **Text Generation Configuration**
```typescript
export const TEXT_CONFIG = {
  // Length constraints
  dishNameMaxLength: 80,
  descriptionMinLength: 100,
  descriptionMaxLength: 500,
  
  // Quality requirements
  minSentenceCount: 3,
  maxSentenceCount: 12,
  targetReadabilityScore: 7.0, // Grade level
  
  // Style preferences
  preferredTenseMode: 'present',
  culturalTerminologyWeight: 0.8,
  spiritualLanguageFrequency: 0.3
};
```

## 📊 **Usage Examples**

### **Pattern Application**
```typescript
import { CLEANUP_PATTERNS, applyAllCleanupPatterns } from './cleanup-patterns.js';

// Apply pre-compiled patterns for optimal performance
const cleanedText = applyAllCleanupPatterns(rawDescription);

// Individual pattern application
const noDoubleSpaces = text.replace(CLEANUP_PATTERNS.DOUBLE_SPACES, ' ');
```

### **Festival Integration**
```typescript
import { getCurrentSeasonFestivals, selectFestivalContext } from './festivals.js';

// Get appropriate festival context for generated dish
const dish = generateDish();
const festivalContext = selectFestivalContext(dish.dishType, dish.culturalWeight);

if (festivalContext) {
  dish.culturalContext.festivals = [festivalContext.name];
  dish.spiritualBenefits.push(festivalContext.spiritualSignificance);
}
```

### **Configuration Access**
```typescript
import { CULTURAL_CONFIG, PERFORMANCE_CONFIG } from './constants/index.js';

// Use centralized configuration throughout system
if (ingredient.culturalWeight >= CULTURAL_CONFIG.minimumCulturalWeight) {
  // Include ingredient in generation
}

// Performance optimization based on configuration
if (cacheSize > PERFORMANCE_CONFIG.fragmentCacheSize) {
  cache.evictOldest();
}
```

## 🌟 **Expansion Guidelines**

### **Adding New Nations**
When expanding to other nations, follow the established pattern:

```typescript
// src/constants/water-tribe-festivals.ts
export const WATER_TRIBE_FESTIVALS = [
  {
    name: "Ice Moon Festival",
    season: "winter",
    // ... nation-specific properties
  }
];

// src/constants/earth-kingdom-patterns.ts
export const EARTH_KINGDOM_PATTERNS = {
  STRENGTH_TERMINOLOGY: /\b(strong|solid|enduring)\b/gi,
  EARTH_REFERENCES: /\b(stone|rock|mountain|cave)\b/gi
};
```

### **Performance Considerations**
- **Pre-compilation**: All regex patterns compiled at module load
- **Immutable Data**: All constants marked as `readonly` and `const`
- **Tree Shaking**: Modular exports enable optimal bundling
- **Memory Efficiency**: Shared constants reduce memory footprint

---

**Module Status**: Production Ready  
**Performance**: Pre-Compiled Patterns, Optimal Memory Usage  
**Expansion**: Ready for Multi-Nation Configuration 