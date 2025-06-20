/**
 * Text cleanup patterns and phrase alternatives
 * Centralized constants for anti-repetition and grammar fixes
 */

/**
 * Alternative phrases to replace common repetitive patterns
 * Used by text cleanup system to enforce variety across dishes
 */
export const PHRASE_ALTERNATIVES: Record<string, readonly string[]> = {
  'grounds the soul in forgotten truths': [
    'anchors the spirit in ancient wisdom',
    'connects the heart to timeless knowledge',
    'awakens memories of sacred teachings',
    'reveals the depth of spiritual understanding'
  ],
  'each bite is a silent prayer': [
    'every taste becomes a meditation',
    'each morsel carries sacred intention',
    'every flavor whispers ancient blessings',
    'each portion holds divine reverence'
  ],
  'every flavor a ripple across time': [
    'each taste echoing through eternity',
    'every note resonating with the ages',
    'each essence bridging past and present',
    'every sensation touching the infinite'
  ],
  'prepared only during': [
    'crafted exclusively for',
    'created solely during',
    'reserved for the sacred',
    'made only in honor of'
  ],
  'the kitchen fills with': [
    'the cooking space resonates with',
    'the temple kitchen echoes with',
    'the sacred space hums with',
    'the preparation area vibrates with'
  ],
  'chosen for cleansing ceremonies and purification rituals': [
    'selected for their spiritual properties in sacred rites',
    'gathered for their role in temple purification',
    'chosen for their power in cleansing rituals',
    'picked for their sacred significance in ceremonies'
  ],
  'unfolds like ancient scrolls': [
    'unfolds like morning mist',
    'emerges like temple incense',
    'develops like distant thunder',
    'blooms like mountain flowers'
  ],
  'the veil between worlds grows thin': [
    'reality seems to shimmer and bend',
    'the boundary between sacred and mundane dissolves',
    'temporal boundaries blur into eternity',
    'the material world fades into spirit'
  ],
  'marks the sacred turning of seasons': [
    'celebrates the cycle of renewal',
    'honors the passage of celestial time',
    'acknowledges the rhythm of temple life',
    'embraces the flow of natural change'
  ]
} as const;

/**
 * Cache configuration constants
 */
export const CLEANUP_CACHE_CONFIG = {
  PHRASE_CACHE_SIZE_LIMIT: 25,
  PROSE_CACHE_SIZE_LIMIT: 30,
  FESTIVAL_CACHE_LIMIT: 8
} as const; 