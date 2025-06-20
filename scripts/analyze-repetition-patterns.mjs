#!/usr/bin/env node

/**
 * Phase 6 Step 1: Repetition Pattern Analysis
 * 
 * Analyzes the 50-dish output to identify overused phrases, lead-ins, and templates
 * that are breaking immersion through excessive repetition.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🔬 PHASE 6 STEP 1: REPETITION PATTERN ANALYSIS');
console.log('================================================\n');

// Read the generated dishes file
const dishesPath = join(projectRoot, 'outputs', '50-dishes-sample.txt');
const dishesContent = readFileSync(dishesPath, 'utf8');

// Extract all dish descriptions
const dishSections = dishesContent.split('## Dish').slice(1); // Remove header
const descriptions = dishSections.map(section => {
  const descMatch = section.match(/\*\*Description\*\*:\s*(.*?)\s*\*\*Spiritual Benefit\*\*/s);
  return descMatch ? descMatch[1].trim() : '';
}).filter(desc => desc.length > 0);

console.log(`📊 Analyzing ${descriptions.length} dish descriptions...\n`);

// Analysis functions
function extractLeadIns(descriptions) {
  const leadIns = descriptions.map(desc => {
    const sentences = desc.split('.')[0] + '.'; // First sentence
    return sentences.trim();
  });
  
  return countOccurrences(leadIns);
}

function extractClosingLines(descriptions) {
  const closings = descriptions.map(desc => {
    const sentences = desc.split('.').filter(s => s.trim());
    return sentences[sentences.length - 1]?.trim() + '.';
  }).filter(closing => closing && closing.length > 5);
  
  return countOccurrences(closings);
}

function extractCommonPhrases(descriptions, minLength = 15) {
  const allText = descriptions.join(' ');
  const phrases = [];
  
  // Extract phrases between common punctuation
  const segments = allText.split(/[.!?;]/).map(s => s.trim()).filter(s => s.length > minLength);
  
  return countOccurrences(segments);
}

function extractSensoryPhrases(descriptions) {
  const sensoryPattern = /(displaying|radiating|manifesting|emanating|carrying|accompanied by the|remarkable|that unfolds|provides deeply satisfying)[^.!?]*[.!?]/gi;
  const sensoryPhrases = [];
  
  descriptions.forEach(desc => {
    const matches = desc.match(sensoryPattern);
    if (matches) {
      sensoryPhrases.push(...matches.map(m => m.trim()));
    }
  });
  
  return countOccurrences(sensoryPhrases);
}

function extractEmotionalPhrases(descriptions) {
  const emotionalPattern = /(This profound dish|Traditionally|while also)[^.!?]*[.!?]/gi;
  const emotionalPhrases = [];
  
  descriptions.forEach(desc => {
    const matches = desc.match(emotionalPattern);
    if (matches) {
      emotionalPhrases.push(...matches.map(m => m.trim()));
    }
  });
  
  return countOccurrences(emotionalPhrases);
}

function countOccurrences(items) {
  const counts = {};
  items.forEach(item => {
    if (item && item.length > 0) {
      counts[item] = (counts[item] || 0) + 1;
    }
  });
  
  // Sort by frequency (descending)
  return Object.entries(counts)
    .sort(([,a], [,b]) => b - a)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
}

function reportOverused(title, data, threshold = 5) {
  console.log(`\n🚨 ${title} (>${threshold-1} occurrences):`);
  console.log('='.repeat(title.length + 20));
  
  let foundOverused = false;
  for (const [phrase, count] of Object.entries(data)) {
    if (count >= threshold) {
      const percentage = ((count / 50) * 100).toFixed(1);
      console.log(`\n📈 ${count}x (${percentage}%): "${phrase}"`);
      foundOverused = true;
    }
  }
  
  if (!foundOverused) {
    console.log('\n✅ No severely overused phrases found in this category.');
  }
}

function reportTopPatterns(title, data, limit = 10) {
  console.log(`\n📊 Top ${limit} ${title}:`);
  console.log('='.repeat(title.length + 15));
  
  const entries = Object.entries(data).slice(0, limit);
  entries.forEach(([phrase, count], index) => {
    const percentage = ((count / 50) * 100).toFixed(1);
    console.log(`\n${index + 1}. ${count}x (${percentage}%): "${phrase.substring(0, 80)}${phrase.length > 80 ? '...' : ''}"`);
  });
}

// Run analysis
console.log('🔍 ANALYZING LEAD-INS & OPENING SENTENCES');
const leadIns = extractLeadIns(descriptions);
reportOverused('OVERUSED LEAD-INS', leadIns, 5);
reportTopPatterns('Lead-in Patterns', leadIns, 8);

console.log('\n\n🔍 ANALYZING CLOSING LINES & SERVING CONTEXT');
const closings = extractClosingLines(descriptions);
reportOverused('OVERUSED CLOSING LINES', closings, 3);
reportTopPatterns('Closing Patterns', closings, 8);

console.log('\n\n🔍 ANALYZING SENSORY PHRASES');
const sensoryPhrases = extractSensoryPhrases(descriptions);
reportOverused('OVERUSED SENSORY PHRASES', sensoryPhrases, 3);
reportTopPatterns('Sensory Patterns', sensoryPhrases, 10);

console.log('\n\n🔍 ANALYZING EMOTIONAL & SPIRITUAL PHRASES');
const emotionalPhrases = extractEmotionalPhrases(descriptions);
reportOverused('OVERUSED EMOTIONAL PHRASES', emotionalPhrases, 3);
reportTopPatterns('Emotional Patterns', emotionalPhrases, 10);

console.log('\n\n🔍 ANALYZING COMMON PHRASE PATTERNS');
const commonPhrases = extractCommonPhrases(descriptions, 20);
reportOverused('OVERUSED COMMON PHRASES', commonPhrases, 3);

// Memory Echo Analysis
console.log('\n\n🔍 MEMORY ECHO UTILIZATION ANALYSIS');
console.log('=======================================');

const memoryEchoPatterns = [
  'Said to linger', 'Believed to awaken', 'Whispered to echo', 'Known to imprint',
  'Rumored to grant', 'Thought to create', 'Alleged to be', 'Claimed to visit'
];

let memoryEchoCount = 0;
const foundEchoes = [];

descriptions.forEach((desc, index) => {
  memoryEchoPatterns.forEach(pattern => {
    if (desc.toLowerCase().includes(pattern.toLowerCase())) {
      memoryEchoCount++;
      foundEchoes.push({ dish: index + 1, pattern, excerpt: desc.substring(desc.toLowerCase().indexOf(pattern.toLowerCase()), desc.toLowerCase().indexOf(pattern.toLowerCase()) + 100) });
    }
  });
});

console.log(`\n📊 Memory Echo Usage: ${memoryEchoCount}/50 dishes (${(memoryEchoCount/50*100).toFixed(1)}%)`);
if (foundEchoes.length > 0) {
  console.log('\n🌟 Found Memory Echoes:');
  foundEchoes.forEach(echo => {
    console.log(`   Dish ${echo.dish}: "${echo.excerpt}..."`);
  });
} else {
  console.log('\n❌ No memory echoes detected in generated output');
}

// Grammar Issues Analysis
console.log('\n\n🔍 GRAMMAR & SYNTAX ISSUES');
console.log('============================');

const grammarIssues = [];

descriptions.forEach((desc, index) => {
  // Check for double "traditionally"
  if (desc.includes('Traditionally traditionally')) {
    grammarIssues.push({ dish: index + 1, issue: 'Double "traditionally"', excerpt: desc.substring(desc.indexOf('Traditionally traditionally'), desc.indexOf('Traditionally traditionally') + 60) });
  }
  
  // Check for awkward "with ingredients" repetition
  if (desc.match(/with ingredients.*with ingredients/i)) {
    grammarIssues.push({ dish: index + 1, issue: 'Ingredient phrase repetition', excerpt: desc.substring(desc.indexOf('with ingredients'), desc.indexOf('with ingredients') + 80) });
  }
  
  // Check for forced sound descriptions
  if (desc.includes('accompanied by the') && desc.includes('during preparation')) {
    const soundMatch = desc.match(/accompanied by the ([^,]*), during preparation/i);
    if (soundMatch) {
      grammarIssues.push({ dish: index + 1, issue: 'Forced sound description', excerpt: soundMatch[0] });
    }
  }
});

if (grammarIssues.length > 0) {
  console.log(`\n🚨 Found ${grammarIssues.length} grammar/syntax issues:`);
  grammarIssues.forEach(issue => {
    console.log(`\n   Dish ${issue.dish} - ${issue.issue}:`);
    console.log(`   "${issue.excerpt}..."`);
  });
} else {
  console.log('\n✅ No major grammar issues detected');
}

// Contextual Mismatch Analysis
console.log('\n\n🔍 CONTEXTUAL MISMATCH ANALYSIS');
console.log('================================');

const contextMismatches = [];

descriptions.forEach((desc, index) => {
  // Check for emotional mismatches with dish context
  if (desc.includes('Creates the warm feeling of coming home') && (desc.includes('Temple Bell Mushrooms') || desc.includes('Crystal Cave Minerals'))) {
    contextMismatches.push({ dish: index + 1, issue: 'Emotional mismatch - mystical ingredients with homey emotions', excerpt: 'Creates warm feeling + mystical ingredients' });
  }
  
  // Check for sound descriptions with non-cooked dishes
  if (desc.includes('air-dried') && desc.includes('sizzle')) {
    contextMismatches.push({ dish: index + 1, issue: 'Sound mismatch - sizzling with air-drying', excerpt: 'Air-dried + sizzle sound' });
  }
});

if (contextMismatches.length > 0) {
  console.log(`\n🚨 Found ${contextMismatches.length} contextual mismatches:`);
  contextMismatches.forEach(mismatch => {
    console.log(`\n   Dish ${mismatch.dish} - ${mismatch.issue}`);
    console.log(`   Context: ${mismatch.excerpt}`);
  });
} else {
  console.log('\n✅ No major contextual mismatches detected');
}

// Summary Report
console.log('\n\n' + '='.repeat(80));
console.log('📋 PHASE 6 STEP 1 SUMMARY: CRITICAL ISSUES IDENTIFIED');
console.log('='.repeat(80));

const totalLeadInRepeats = Object.values(leadIns).filter(count => count >= 5).length;
const totalSensoryRepeats = Object.values(sensoryPhrases).filter(count => count >= 3).length;
const totalEmotionalRepeats = Object.values(emotionalPhrases).filter(count => count >= 3).length;

console.log(`\n🎯 PRIORITY FIXES NEEDED:`);
console.log(`   🚨 ${totalLeadInRepeats} overused lead-in patterns (>5 occurrences)`);
console.log(`   🚨 ${totalSensoryRepeats} overused sensory phrases (>3 occurrences)`);
console.log(`   🚨 ${totalEmotionalRepeats} overused emotional phrases (>3 occurrences)`);
console.log(`   🚨 ${grammarIssues.length} grammar/syntax issues`);
console.log(`   🚨 ${contextMismatches.length} contextual mismatches`);
console.log(`   🚨 Memory echo system severely underutilized (${memoryEchoCount}/50 = ${(memoryEchoCount/50*100).toFixed(1)}%)`);

console.log(`\n🎯 NEXT STEPS FOR PHASE 6:`);
console.log(`   Step 2: Generate 40+ alternative lead-ins with rarity weighting`);
console.log(`   Step 3: Implement adjacency rules to prevent phrase clustering`);
console.log(`   Step 4: Expand sound/texture vocabulary from 20 → 80 entries`);
console.log(`   Step 5: Build 20-30 custom memory echo sentences with proper triggering`);
console.log(`   Step 6: Add <2% surprise/humorous moments for variety`);

console.log('\n🔬 Phase 6 Step 1 Analysis Complete! 🔬'); 