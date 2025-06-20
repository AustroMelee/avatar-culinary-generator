import { CLEANUP_CACHE_CONFIG } from '../../constants/cleanup-patterns.js';
import { FESTIVALS_AND_RITUALS, WILDCARD_EVENTS } from '../../constants/festivals.js';
import { selectWithAntiClustering } from '../../data/grammar/weighted-selection.js';

/**
 * Optimized LRU cache implementation for O(1) insertion and eviction
 * Uses Map data structure to maintain insertion order efficiently
 */
class LRUCache<T> {
  private cache = new Map<T, boolean>();
  private readonly maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  /**
   * Adds item to cache with O(1) complexity
   * Automatically evicts oldest item if cache exceeds size limit
   */
  add(item: T): void {
    // Remove if already exists to update position
    if (this.cache.has(item)) {
      this.cache.delete(item);
    }
    
    // Add to end (most recent)
    this.cache.set(item, true);
    
    // Evict oldest if over limit (O(1) operation)
    if (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
  }

  /**
   * Checks if item exists in cache with O(1) complexity
   */
  has(item: T): boolean {
    return this.cache.has(item);
  }

  /**
   * Clears all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Removes oldest entries while keeping some memory
   * Used for soft reset functionality
   */
  partialClear(keepCount: number): void {
    const currentSize = this.cache.size;
    const removeCount = Math.max(0, currentSize - keepCount);
    
    let removed = 0;
    for (const key of this.cache.keys()) {
      if (removed >= removeCount) break;
      this.cache.delete(key);
      removed++;
    }
  }

  /**
   * Gets current cache size
   */
  get size(): number {
    return this.cache.size;
  }
}

/**
 * High-performance fragment caching system with optimized LRU management
 * Prevents phrase repetition across consecutive dishes with O(1) operations
 */
export class FragmentCache {
  private proseFragments = new LRUCache<string>(CLEANUP_CACHE_CONFIG.PROSE_CACHE_SIZE_LIMIT);
  private festivals = new LRUCache<string>(CLEANUP_CACHE_CONFIG.FESTIVAL_CACHE_LIMIT);
  private phraseAlternatives = new LRUCache<string>(CLEANUP_CACHE_CONFIG.PHRASE_CACHE_SIZE_LIMIT);

  /**
   * Enhanced phrase selection that prevents recent repetition
   * Replaces selectWithAntiClustering with cache-aware selection
   */
  selectUniqueFragment(fragments: readonly string[]): string {
    // Filter out recently used fragments  
    const availableFragments = fragments.filter(fragment => !this.proseFragments.has(fragment));
    
    // If all fragments were recently used, clear cache and use any
    if (availableFragments.length === 0) {
      this.proseFragments.clear();
      return selectWithAntiClustering([...fragments]);
    }
    
    const selected = selectWithAntiClustering(availableFragments);
    
    // Add to LRU cache (O(1) operation)
    this.proseFragments.add(selected);
    
    return selected;
  }

  /**
   * Selects festival with anti-repetition tracking using optimized LRU cache
   */
  selectUniqueFestival(): string {
    const availableFestivals = FESTIVALS_AND_RITUALS.filter(festival => !this.festivals.has(festival));
    const selectedFestival = availableFestivals.length > 0 
      ? this.selectUniqueFragment(availableFestivals)
      : this.selectUniqueFragment(FESTIVALS_AND_RITUALS);
    
    // Add to LRU cache (O(1) operation)
    this.festivals.add(selectedFestival);
    
    return selectedFestival;
  }

  /**
   * Selects phrase alternative with optimized LRU caching
   */
  selectUniquePhrase(alternatives: readonly string[]): string {
    // Filter out recently used phrases
    const availableAlternatives = alternatives.filter(alt => !this.phraseAlternatives.has(alt));
    
    // If all alternatives were recently used, clear cache and use any
    if (availableAlternatives.length === 0) {
      this.phraseAlternatives.clear();
      return alternatives[Math.floor(Math.random() * alternatives.length)];
    }
    
    const selected = availableAlternatives[Math.floor(Math.random() * availableAlternatives.length)];
    
    // Add to LRU cache (O(1) operation)
    this.phraseAlternatives.add(selected);
    
    return selected;
  }

  /**
   * Inserts wildcard events for structural variety
   * Adds unexpected narrative elements to break template patterns
   */
  insertWildcardEvent(proseBlock: string): string {
    if (Math.random() < 0.25) { // 25% chance of wildcard
      const wildcard = this.selectUniqueFragment(WILDCARD_EVENTS);
      
      // Insert wildcard at a natural break point
      const insertPoints = [
        proseBlock.indexOf('. ') + 2,
        proseBlock.indexOf(', ') + 2,
        proseBlock.indexOf(' while ') + 1
      ].filter(point => point > 1);
      
      if (insertPoints.length > 0) {
        const insertPoint = insertPoints[Math.floor(Math.random() * insertPoints.length)];
        return proseBlock.slice(0, insertPoint) + wildcard + proseBlock.slice(insertPoint);
      }
    }
    
    return proseBlock;
  }

  /**
   * Resets all caches for new generation batch
   */
  reset(): void {
    this.proseFragments.clear();
    this.festivals.clear();
    this.phraseAlternatives.clear();
  }

  /**
   * Soft reset - reduces sensitivity for new batch without full clear
   * Uses optimized partial clearing for better performance
   */
  softReset(): void {
    // Use optimized partial clearing with LRU caches
    this.proseFragments.partialClear(15);
    this.festivals.partialClear(4);
    this.phraseAlternatives.partialClear(15);
  }
} 