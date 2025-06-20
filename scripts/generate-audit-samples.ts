#!/usr/bin/env node

import { AirNomadDishGenerator } from '../src/generator/air-nomad-generator.js';
import { GeneratedAirNomadDish } from '../src/types.js';

/**
 * Audit sample generator for identifying defects in Air Nomad dish generation
 * Generates large batches of dishes for systematic quality analysis
 */

// Configuration constants
const SAMPLE_COUNT = 120; // Generate 120 samples for comprehensive audit

/**
 * Detected defect types for systematic categorization
 */
type DefectType = 
  | 'redundant_phrasing'
  | 'template_variables_not_replaced'
  | 'awkward_combinations' 
  | 'lacks_avatar_flavor'
  | 'poor_flow_list_like'
  | 'overused_adjectives'
  | 'empty_spiritual_benefit'
  | 'generic_naming'
  | 'repetitive_structure';

/**
 * Audit entry for each generated dish with defect tracking
 */
type AuditEntry = {
  dishId: number;
  name: string;
  description: string;
  ingredients: string;
  technique: string;
  difficulty: string;
  servingSize: number;
  spiritualBenefit: string;
  detectedDefects: DefectType[];
  qualityScore: number; // 1-10 scale
  notes: string;
};

/**
 * Pattern detection for common defects
 */
class DefectDetector {
  private static readonly REDUNDANT_PHRASES = [
    'in perfect peace',
    'transcendent experience',
    'gentle as sky bison breath',
    'profound spiritual significance',
    'temple atmosphere',
    'spiritual growth and development'
  ];

  private static readonly TEMPLATE_VARIABLE_PATTERNS = [
    /\{[^}]+\}/g, // Any {variable} patterns
    /\{\w+\}/g,   // {word} patterns
  ];

  private static readonly OVERUSED_ADJECTIVES = [
    'lovingly',
    'gentle',
    'profound',
    'transcendent',
    'peaceful',
    'sacred'
  ];

  private static readonly GENERIC_PATTERNS = [
    /Spring \w+/g,
    /Western \w+/g,
    /Temple \w+/g
  ];

  /**
   * Analyzes a dish for various defect types and quality issues
   */
  static analyzeDish(dish: GeneratedAirNomadDish): { defects: DefectType[], qualityScore: number, notes: string } {
    const defects: DefectType[] = [];
    const notes: string[] = [];
    let qualityScore = 10; // Start with perfect score and deduct

    const fullText = `${dish.name} ${dish.description} ${dish.spiritualBenefit || ''}`;

    // Check for template variables not replaced
    this.TEMPLATE_VARIABLE_PATTERNS.forEach(pattern => {
      const matches = fullText.match(pattern);
      if (matches) {
        defects.push('template_variables_not_replaced');
        qualityScore -= 3;
        notes.push(`Template variables found: ${matches.join(', ')}`);
      }
    });

    // Check for redundant phrasing
    const foundRedundantPhrases = this.REDUNDANT_PHRASES.filter(phrase => 
      fullText.toLowerCase().includes(phrase.toLowerCase())
    );
    if (foundRedundantPhrases.length > 0) {
      defects.push('redundant_phrasing');
      qualityScore -= foundRedundantPhrases.length;
      notes.push(`Redundant phrases: ${foundRedundantPhrases.join(', ')}`);
    }

    // Check for overused adjectives (multiple instances)
    const adjectiveCounts = new Map<string, number>();
    this.OVERUSED_ADJECTIVES.forEach(adj => {
      const count = (fullText.toLowerCase().match(new RegExp(adj, 'g')) || []).length;
      if (count > 1) {
        adjectiveCounts.set(adj, count);
      }
    });
    if (adjectiveCounts.size > 0) {
      defects.push('overused_adjectives');
      qualityScore -= 1;
      notes.push(`Overused adjectives: ${Array.from(adjectiveCounts.entries()).map(([adj, count]) => `${adj}(${count})`).join(', ')}`);
    }

    // Check for generic naming patterns
    const genericMatches = this.GENERIC_PATTERNS.some(pattern => pattern.test(dish.name));
    if (genericMatches) {
      defects.push('generic_naming');
      qualityScore -= 2;
      notes.push('Generic naming pattern detected');
    }

    // Check for empty or very short spiritual benefit
    if (!dish.spiritualBenefit || dish.spiritualBenefit.trim().length < 20) {
      defects.push('empty_spiritual_benefit');
      qualityScore -= 1;
      notes.push('Spiritual benefit is empty or too brief');
    }

    // Check for list-like structure (excessive commas)
    const commaCount = dish.description.split(',').length - 1;
    if (commaCount > 4) {
      defects.push('poor_flow_list_like');
      qualityScore -= 1;
      notes.push(`Excessive comma usage (${commaCount} commas)`);
    }

    // Check for Avatar flavor (should contain spiritual/cultural references)
    const avatarKeywords = ['monk', 'temple', 'air nomad', 'spiritual', 'sky bison', 'meditation', 'enlightenment', 'chakra'];
    const avatarReferences = avatarKeywords.filter(keyword => 
      fullText.toLowerCase().includes(keyword.toLowerCase())
    ).length;
    if (avatarReferences === 0) {
      defects.push('lacks_avatar_flavor');
      qualityScore -= 2;
      notes.push('No Avatar-specific cultural references found');
    }

    // Ensure quality score doesn't go below 1
    qualityScore = Math.max(1, qualityScore);

    return {
      defects,
      qualityScore,
      notes: notes.join('; ')
    };
  }
}

/**
 * Main audit sample generation and analysis system
 */
class AuditSampleGenerator {
  private generator: AirNomadDishGenerator;
  private auditEntries: AuditEntry[] = [];

  constructor() {
    this.generator = AirNomadDishGenerator.createMainCourse(true); // Allow legendary for variety
  }

  /**
   * Generates the specified number of dish samples
   */
  generateSamples(): void {
    console.log(`Generating ${SAMPLE_COUNT} dish samples for audit...`);
    
    for (let i = 1; i <= SAMPLE_COUNT; i++) {
      try {
        const dish = this.generator.createDish();
        const analysis = DefectDetector.analyzeDish(dish);

        const auditEntry: AuditEntry = {
          dishId: i,
          name: dish.name,
          description: dish.description,
          ingredients: dish.ingredients.map(ing => ing.name).join('; '),
          technique: `${dish.technique.name} - ${dish.technique.description}`,
          difficulty: dish.difficulty,
          servingSize: dish.servingSize,
          spiritualBenefit: dish.spiritualBenefit || 'None',
          detectedDefects: analysis.defects,
          qualityScore: analysis.qualityScore,
          notes: analysis.notes
        };

        this.auditEntries.push(auditEntry);

        // Progress indicator
        if (i % 10 === 0) {
          console.log(`Generated ${i}/${SAMPLE_COUNT} samples...`);
        }

      } catch (error) {
        console.error(`Error generating dish ${i}:`, error);
      }
    }

    console.log(`Successfully generated ${this.auditEntries.length} dishes for audit.`);
  }

  /**
   * Exports audit results to console for manual review and copy-paste
   */
  displayAuditResults(): void {
    console.log('\n🌪️ PHASE 1 AUDIT RESULTS');
    console.log('========================\n');

    // Summary statistics
    const totalDefects = this.auditEntries.reduce((sum, entry) => sum + entry.detectedDefects.length, 0);
    const dishesWithDefects = this.auditEntries.filter(entry => entry.detectedDefects.length > 0).length;
    const avgQuality = this.auditEntries.reduce((sum, entry) => sum + entry.qualityScore, 0) / this.auditEntries.length;

    console.log('EXECUTIVE SUMMARY:');
    console.log(`- ${dishesWithDefects}/${this.auditEntries.length} dishes (${(dishesWithDefects/this.auditEntries.length*100).toFixed(1)}%) have defects`);
    console.log(`- ${totalDefects} total defects identified`);
    console.log(`- Average quality score: ${avgQuality.toFixed(2)}/10`);
    console.log(`- ${this.auditEntries.filter(e => e.qualityScore <= 5).length} dishes scored ≤5/10 (critical)\n`);

    // Most common defects
    const defectCounts = new Map<DefectType, number>();
    this.auditEntries.forEach(entry => {
      entry.detectedDefects.forEach(defect => {
        defectCounts.set(defect, (defectCounts.get(defect) || 0) + 1);
      });
    });

    console.log('TOP DEFECTS:');
    Array.from(defectCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([defect, count]) => {
        console.log(`- ${defect}: ${count} occurrences (${(count/this.auditEntries.length*100).toFixed(1)}%)`);
      });

    console.log('\n');

    // Sample problematic dishes
    console.log('SAMPLE PROBLEMATIC DISHES:');
    this.auditEntries
      .filter(entry => entry.qualityScore <= 6)
      .slice(0, 5)
      .forEach(entry => {
        console.log(`\n--- ${entry.name} (Score: ${entry.qualityScore}/10) ---`);
        console.log(`Description: ${entry.description}`);
        console.log(`Spiritual Benefit: ${entry.spiritualBenefit}`);
        console.log(`Defects: ${entry.detectedDefects.join(', ')}`);
        console.log(`Notes: ${entry.notes}`);
      });

    console.log('\n');

    // Recommendations
    console.log('RECOMMENDATIONS FOR PHASE 2:');
    console.log('1. Template Variable Fix (Critical): Replace all {variable} patterns');
    console.log('2. Phrasebank Deduplication: Remove overused phrases like "in perfect peace"');
    console.log('3. Avatar Lore Enhancement: Add more specific Air Nomad cultural references');
    console.log('4. Flow Improvement: Reduce comma-heavy list-like structures');
    console.log('5. Spiritual Benefit Enhancement: Ensure meaningful spiritual benefits');
    console.log('6. Adjective Variety: Expand vocabulary to reduce repetition');

    console.log('\n');
    console.log('CSV DATA (copy to spreadsheet):');
    console.log('DishID,Name,Description,Ingredients,Technique,Difficulty,ServingSize,SpiritualBenefit,DefectTypes,QualityScore,Notes');
    
    this.auditEntries.slice(0, 20).forEach(entry => {
      const csvRow = [
        entry.dishId,
        `"${entry.name.replace(/"/g, '""')}"`,
        `"${entry.description.replace(/"/g, '""')}"`,
        `"${entry.ingredients.replace(/"/g, '""')}"`,
        `"${entry.technique.replace(/"/g, '""')}"`,
        entry.difficulty,
        entry.servingSize,
        `"${entry.spiritualBenefit.replace(/"/g, '""')}"`,
        `"${entry.detectedDefects.join('; ')}"`,
        entry.qualityScore,
        `"${entry.notes.replace(/"/g, '""')}"`
      ].join(',');
      console.log(csvRow);
    });

    console.log('\n... (showing first 20 entries, full data available for export)');
  }
}

/**
 * Main execution function
 */
function main(): void {
  try {
    const auditGenerator = new AuditSampleGenerator();
    
    console.log('🌪️ Air Nomad Dish Generation Audit - Phase 1');
    console.log('============================================');
    
    auditGenerator.generateSamples();
    auditGenerator.displayAuditResults();
    
    console.log('\n✅ Phase 1 audit completed successfully!');
    console.log('📋 Copy the CSV data above to analyze in a spreadsheet');
    console.log('🔍 Review the sample problematic dishes for improvement patterns');
    
  } catch (error) {
    console.error('❌ Audit failed:', error);
  }
}

// Execute the audit
main();

export { AuditSampleGenerator, DefectDetector, type DefectType, type AuditEntry }; 