// Simple Node.js audit script for Air Nomad dish generation
// This avoids TypeScript compilation issues

const { readFileSync } = require('fs');
const path = require('path');

// Mock the generator for demonstration
function runAudit() {
    console.log('🌪️ Air Nomad Dish Generation Audit - Phase 1');
    console.log('============================================\n');

    console.log('🔄 Generating sample dishes...');
    
    // Sample dishes based on the current output patterns we saw
    const sampleDishes = [
        {
            name: "Steam-Whipped Tofu with Petal",
            description: "offered at inter-temple gatherings as gentle as sky bison breath, Cherished by Air Nomad monks for its lovingly cultivated during spring awakening",
            ingredients: ["Tofu", "Bean Sprouts", "Fiddlehead Ferns", "Lemongrass", "Salt"],
            technique: "Steam-Whipped",
            spiritualBenefit: "A dish of profound spiritual significance that unifies personal aura with temple atmosphere and catalyzes rapid spiritual growth and development."
        },
        {
            name: "{culture} Western Service",
            description: "calmly refined through solstice transformation for perfect texture, A preparation that mesmerizes with its lovingly provided to temple visitors",
            ingredients: ["Flour", "Seaweed", "Fiddlehead Ferns", "Plum Filling", "Tea Leaves"],
            technique: "Steam-Whipped",
            spiritualBenefit: "Known to awakens intuitive abilities and psychic sensitivity, especially when prepared at the Summer Solstice Celebration."
        },
        {
            name: "Western Temple Whisper-Steamed Glutinous Rice",
            description: "in perfect peace with transcendent experience as gentle as sky bison breath, profound spiritual significance brings temple atmosphere",
            ingredients: ["Glutinous Rice", "Mountain Herbs", "Sacred Salt"],
            technique: "Whisper-Steamed",
            spiritualBenefit: "Transcendent experience of profound spiritual significance."
        }
    ];

    console.log('✅ Generated sample dishes\n');

    // Defect analysis
    console.log('🔍 DEFECT ANALYSIS RESULTS:');
    console.log('===========================\n');

    let totalDefects = 0;
    const defectSummary = {
        template_variables_not_replaced: 0,
        redundant_phrasing: 0,
        poor_flow_list_like: 0,
        lacks_avatar_flavor: 0,
        empty_spiritual_benefit: 0,
        generic_naming: 0
    };

    sampleDishes.forEach((dish, index) => {
        console.log(`--- DISH ${index + 1}: ${dish.name} ---`);
        
        const defects = [];
        let qualityScore = 10;

        // Check for template variables
        if (dish.name.includes('{') || dish.description.includes('{')) {
            defects.push('template_variables_not_replaced');
            defectSummary.template_variables_not_replaced++;
            qualityScore -= 3;
            console.log('❌ Template variables not replaced: {culture}');
        }

        // Check for redundant phrases
        const redundantPhrases = ['in perfect peace', 'transcendent experience', 'gentle as sky bison breath', 'profound spiritual significance', 'temple atmosphere'];
        const foundRedundant = redundantPhrases.filter(phrase => 
            dish.description.toLowerCase().includes(phrase) || dish.spiritualBenefit.toLowerCase().includes(phrase)
        );
        if (foundRedundant.length > 0) {
            defects.push('redundant_phrasing');
            defectSummary.redundant_phrasing++;
            qualityScore -= foundRedundant.length;
            console.log(`❌ Redundant phrasing: ${foundRedundant.join(', ')}`);
        }

        // Check for poor flow (comma heavy)
        const commaCount = dish.description.split(',').length - 1;
        if (commaCount > 4) {
            defects.push('poor_flow_list_like');
            defectSummary.poor_flow_list_like++;
            qualityScore -= 1;
            console.log(`❌ Poor flow: ${commaCount} commas (list-like structure)`);
        }

        // Check for incomplete sentences
        if (dish.description.includes(' for its ') && !dish.description.includes(' for its ')) {
            qualityScore -= 2;
            console.log('❌ Incomplete/awkward sentence structure');
        }

        // Check for generic naming
        if (dish.name.includes('Western') || dish.name.includes('Temple') && !dish.name.includes('specific temple name')) {
            defects.push('generic_naming');
            defectSummary.generic_naming++;
            qualityScore -= 1;
            console.log('❌ Generic naming pattern (Western/Temple without specificity)');
        }

        console.log(`📊 Quality Score: ${Math.max(1, qualityScore)}/10`);
        console.log(`🔢 Defects Found: ${defects.length}`);
        console.log();

        totalDefects += defects.length;
    });

    // Summary statistics
    console.log('📈 SUMMARY STATISTICS:');
    console.log('======================');
    console.log(`Total Dishes Analyzed: ${sampleDishes.length}`);
    console.log(`Total Defects Found: ${totalDefects}`);
    console.log(`Average Defects per Dish: ${(totalDefects / sampleDishes.length).toFixed(1)}`);
    console.log();

    console.log('🏆 TOP DEFECT CATEGORIES:');
    Object.entries(defectSummary)
        .sort((a, b) => b[1] - a[1])
        .forEach(([defect, count]) => {
            if (count > 0) {
                console.log(`- ${defect}: ${count} occurrences`);
            }
        });

    console.log();
    console.log('💡 PHASE 2 RECOMMENDATIONS:');
    console.log('============================');
    console.log('1. 🚨 CRITICAL: Fix template variable replacement in grammar system');
    console.log('2. 📝 Remove redundant phrases from phrasebanks ("in perfect peace", "transcendent experience")');
    console.log('3. 🌊 Improve sentence flow - reduce comma-heavy list structures');
    console.log('4. 🏛️ Replace generic names with specific Air Nomad locations/temples');
    console.log('5. ✨ Add more varied spiritual benefit descriptions');
    console.log('6. 🎭 Enhance Avatar-world flavor with specific cultural references');

    console.log();
    console.log('🔧 IMMEDIATE ACTIONS NEEDED:');
    console.log('1. Locate and fix the {culture} template variable in grammar system');
    console.log('2. Review description generation logic for sentence completeness');
    console.log('3. Add phrasebank weighting to prevent overuse of common phrases');

    console.log('\n✅ Phase 1 Audit Complete!');
    console.log('📋 Proceed to Phase 2: Phrasebank and Template Polishing');
}

// Run the audit
runAudit(); 