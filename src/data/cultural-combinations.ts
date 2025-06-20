// import { IngredientRole } from '../types.js'; // Available for future role-based combinations

/**
 * Cultural combination system for tracking iconic ingredient pairings
 * Provides cultural weight multipliers and significance analysis
 */

/**
 * Represents an iconic cultural combination with significance multiplier
 */
export type CulturalCombination = {
  name: string;
  ingredients: readonly string[];
  culturalWeightMultiplier: number;
  description: string;
  significance: string;
};

/**
 * Air Nomad cultural combinations with traditional pairings
 * These combinations provide enhanced cultural significance when used together
 */
export const AIR_NOMAD_CULTURAL_COMBINATIONS: readonly CulturalCombination[] = [
  {
    name: 'Sacred Mountain Offering',
    ingredients: ['Snow Lotus Petals', 'Wild Honey', 'Jasmine Blossoms'],
    culturalWeightMultiplier: 3.0,
    description: 'A sacred trinity representing purity, sweetness, and enlightenment',
    significance: 'Used in the highest temple ceremonies and spiritual initiations'
  },
  {
    name: 'Enlightenment Trinity',
    ingredients: ['Moon Peaches', 'Tea Leaves', 'Cloudberries'],
    culturalWeightMultiplier: 2.8,
    description: 'The traditional combination for deep meditation practices',
    significance: 'Enhances spiritual awareness and meditative focus'
  },
  {
    name: 'Monastery Sustenance',
    ingredients: ['Rice', 'Tofu', 'Soy Sauce', 'Scallions'],
    culturalWeightMultiplier: 2.2,
    description: 'The fundamental nourishment of Air Nomad daily life',
    significance: 'Provides balanced nutrition for long meditation sessions'
  },
  {
    name: 'Mountain Harmony Bowl',
    ingredients: ['Bamboo Shoots', 'Shiitake', 'Lotus Root', 'Chrysanthemum Greens'],
    culturalWeightMultiplier: 2.5,
    description: 'A balanced representation of mountain vegetable harmony',
    significance: 'Celebrates the connection between Air Nomads and mountain ecosystems'
  },
  {
    name: 'Airbender\'s Focus',
    ingredients: ['Glutinous Rice', 'Azuki Beans', 'Ginger', 'Wild Honey'],
    culturalWeightMultiplier: 2.4,
    description: 'Traditional pre-training meal for enhanced concentration',
    significance: 'Believed to improve airbending precision and stamina'
  },
  {
    name: 'Celestial Brew',
    ingredients: ['Tea Leaves', 'Jasmine Blossoms', 'Wild Honey', 'Butter Tea'],
    culturalWeightMultiplier: 2.6,
    description: 'Sacred beverage for spiritual ceremonies',
    significance: 'Opens the mind to higher spiritual planes'
  },
  {
    name: 'Sky Bison Tribute',
    ingredients: ['Yak Milk', 'Wild Honey', 'Apple', 'Coconut'],
    culturalWeightMultiplier: 2.4,
    description: 'Traditional offering to honor the sacred sky bison',
    significance: 'Strengthens the bond between Air Nomads and their flying companions'
  }
] as const;

/**
 * Analysis result for dish cultural significance
 */
export type CulturalSignificanceAnalysis = {
  overallCulturalScore: number;
  culturalCombinations: CulturalCombination[];
  spiritualSignificance: string[];
  traditionLevel: 'daily' | 'ceremonial' | 'sacred';
};

/**
 * Utility class for analyzing cultural combinations and significance
 * Provides methods to evaluate dish authenticity and spiritual importance
 */
export class CulturalCombinationUtils {
  /**
   * Analyzes a dish's cultural significance based on ingredient combinations
   * Returns enhanced cultural weight and spiritual significance information
   */
  static analyzeDishCulturalSignificance(
    ingredientNames: string[]
    // techniqueName: string // Available for future technique-based analysis
  ): CulturalSignificanceAnalysis {
    const foundCombinations: CulturalCombination[] = [];
    
    // Check for complete cultural combinations
    for (const combo of AIR_NOMAD_CULTURAL_COMBINATIONS) {
      const hasAllIngredients = combo.ingredients.every(ingredient =>
        ingredientNames.includes(ingredient)
      );
      
      if (hasAllIngredients) {
        foundCombinations.push(combo);
      }
    }
    
    // Calculate overall cultural score
    let overallScore = 1.0; // Base score
    
    // Apply cultural combination multipliers
    for (const combo of foundCombinations) {
      overallScore *= combo.culturalWeightMultiplier;
    }
    
    // Generate spiritual significance based on combinations
    const spiritualSignificance: string[] = [];
    for (const combo of foundCombinations) {
      spiritualSignificance.push(combo.significance);
    }
    
    // Determine tradition level
    let traditionLevel: 'daily' | 'ceremonial' | 'sacred' = 'daily';
    if (overallScore >= 3.0) {
      traditionLevel = 'sacred';
    } else if (overallScore >= 2.0) {
      traditionLevel = 'ceremonial';
    }
    
    return {
      overallCulturalScore: overallScore,
      culturalCombinations: foundCombinations,
      spiritualSignificance,
      traditionLevel
    };
  }
  
  /**
   * Gets all cultural combinations that include the specified ingredient
   * Useful for ingredient selection suggestions
   */
  static getCombinationsWithIngredient(ingredientName: string): CulturalCombination[] {
    return AIR_NOMAD_CULTURAL_COMBINATIONS.filter(combo =>
      combo.ingredients.includes(ingredientName)
    );
  }
  
  /**
   * Finds the most significant cultural combination from a list of ingredients
   * Returns the combination with the highest cultural weight multiplier
   */
  static getMostSignificantCombination(ingredientNames: string[]): CulturalCombination | null {
    const applicableCombinations = AIR_NOMAD_CULTURAL_COMBINATIONS.filter(combo =>
      combo.ingredients.every(ingredient => ingredientNames.includes(ingredient))
    );
    
    if (applicableCombinations.length === 0) {
      return null;
    }
    
    return applicableCombinations.reduce((most, current) =>
      current.culturalWeightMultiplier > most.culturalWeightMultiplier ? current : most
    );
  }
  
  /**
   * Calculates the cultural authenticity score for a complete dish
   * Considers ingredient combinations, technique appropriateness, and cultural context
   */
  static calculateAuthenticityScore(
    ingredientNames: string[],
    techniqueName: string
    // dishType: string // Available for future dish-type specific scoring
  ): {
    score: number;
    factors: string[];
    recommendations: string[];
  } {
    const factors: string[] = [];
    const recommendations: string[] = [];
    let score = 1.0;
    
    // Analyze cultural combinations
    const analysis = this.analyzeDishCulturalSignificance(ingredientNames);
    if (analysis.culturalCombinations.length > 0) {
      score = analysis.overallCulturalScore;
      factors.push(`Contains ${analysis.culturalCombinations.length} traditional combination(s)`);
    } else {
      recommendations.push('Consider adding traditional ingredient combinations');
    }
    
    // Check for sacred ingredients
    const sacredIngredients = ['Snow Lotus Petals', 'Moon Peaches', 'Cloudberries', 'Jasmine Blossoms'];
    const hasSacred = ingredientNames.some(name => sacredIngredients.includes(name));
    if (hasSacred) {
      score *= 1.5;
      factors.push('Contains sacred ingredients');
    }
    
    // Technique appropriateness (simplified)
    const ceremonialTechniques = ['Wind Blessing', 'Sky Bison Style', 'Temple Preparation'];
    if (ceremonialTechniques.includes(techniqueName)) {
      score *= 1.3;
      factors.push('Uses ceremonial technique');
    }
    
    return {
      score,
      factors,
      recommendations
    };
  }
} 