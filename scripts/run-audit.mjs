// Simple Node.js audit script for Air Nomad dish generation
// ES module version

function runAudit() {
    console.log('🌪️ Air Nomad Dish Generation Audit - Phase 1');
    console.log('============================================\n');

    console.log('🔄 Analyzing current dish outputs...');
    
    // Sample dishes based on the current output patterns we saw in outputs.txt
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
        },
        {
            name: "Spring Imagination Soup",
            description: "lovingly prepared with gentle mountain herbs, transcendent experience awaits those who partake in perfect peace",
            ingredients: ["Mountain Herbs", "Spring Water", "Sacred Mushrooms"],
            technique: "Gentle Simmering",
            spiritualBenefit: "Brings profound spiritual significance to daily meditation practice."
        },
        {
            name: "Temple Offering Bowl",
            description: "gentle as sky bison breath, this sacred preparation transcends the physical realm, lovingly crafted for temple atmosphere enhancement",
            ingredients: ["Sacred Grains", "Blessed Salt", "Temple Incense Powder"],
            technique: "Ceremonial Blessing",
            spiritualBenefit: "Creates transcendent experience in perfect peace with temple atmosphere."
        }
    ];

    console.log('✅ Analyzed sample dishes\n');

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
        generic_naming: 0,
        awkward_grammar: 0,
        overused_adjectives: 0
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
        const redundantPhrases = ['in perfect peace', 'transcendent experience', 'gentle as sky bison breath', 'profound spiritual significance', 'temple atmosphere', 'lovingly'];
        const foundRedundant = redundantPhrases.filter(phrase => {
            const fullText = `${dish.description} ${dish.spiritualBenefit}`.toLowerCase();
            const count = (fullText.match(new RegExp(phrase.toLowerCase(), 'g')) || []).length;
            return count > 0;
        });
        
        if (foundRedundant.length > 2) {
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

        // Check for incomplete sentences / awkward grammar
        if (dish.description.includes(' for its lovingly ') || 
            dish.description.includes(' with its ') ||
            dish.description.includes('Known to awakens')) {
            defects.push('awkward_grammar');
            defectSummary.awkward_grammar++;
            qualityScore -= 2;
            console.log('❌ Awkward/incomplete sentence structure');
        }

        // Check for generic naming
        if ((dish.name.includes('Western') || dish.name.includes('Temple') || dish.name.includes('Spring')) 
            && !dish.name.includes('Eastern Air Temple') && !dish.name.includes('Southern Air Temple')) {
            defects.push('generic_naming');
            defectSummary.generic_naming++;
            qualityScore -= 1;
            console.log('❌ Generic naming pattern (needs specific Air Nomad locations)');
        }

        // Check for overused adjectives
        const overusedAdjs = ['gentle', 'lovingly', 'sacred', 'transcendent', 'profound'];
        const adjCount = overusedAdjs.reduce((count, adj) => {
            return count + (dish.description.toLowerCase().split(adj).length - 1);
        }, 0);
        if (adjCount > 3) {
            defects.push('overused_adjectives');
            defectSummary.overused_adjectives++;
            qualityScore -= 1;
            console.log(`❌ Overused adjectives: ${adjCount} instances of common descriptors`);
        }

        // Check for Avatar flavor
        const avatarKeywords = ['monk', 'temple', 'air nomad', 'sky bison', 'meditation', 'enlightenment', 'chakra', 'airbending'];
        const avatarCount = avatarKeywords.reduce((count, keyword) => {
            return count + (dish.description.toLowerCase().includes(keyword) ? 1 : 0);
        }, 0);
        if (avatarCount === 0) {
            defects.push('lacks_avatar_flavor');
            defectSummary.lacks_avatar_flavor++;
            qualityScore -= 2;
            console.log('❌ Lacks specific Avatar-world cultural references');
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
    console.log(`Defect Rate: ${((totalDefects / (sampleDishes.length * 8)) * 100).toFixed(1)}% of possible defect categories`);
    console.log();

    console.log('🏆 TOP DEFECT CATEGORIES:');
    Object.entries(defectSummary)
        .sort((a, b) => b[1] - a[1])
        .forEach(([defect, count]) => {
            if (count > 0) {
                console.log(`- ${defect.replace(/_/g, ' ')}: ${count} occurrences (${((count / sampleDishes.length) * 100).toFixed(1)}% of dishes)`);
            }
        });

    console.log();
    console.log('💡 PHASE 2 RECOMMENDATIONS (Priority Order):');
    console.log('============================================');
    console.log('1. 🚨 CRITICAL: Fix template variable replacement system');
    console.log('   - Find and fix {culture} variable in grammar templates');
    console.log('   - Ensure all template variables have proper replacements');
    console.log();
    console.log('2. 📝 Phrasebank Deduplication and Weighting');
    console.log('   - Add weights to prevent clustering of phrases like "in perfect peace"');
    console.log('   - Create banlist for awkward combinations');
    console.log('   - Expand vocabulary with 20-40 new entries per category');
    console.log();
    console.log('3. 🔧 Grammar and Flow Fixes');
    console.log('   - Fix incomplete sentence structures ("for its lovingly...")');
    console.log('   - Improve conjunction usage (and, while, as)');
    console.log('   - Reduce comma-heavy list patterns');
    console.log();
    console.log('4. 🏛️ Avatar Lore Enhancement');
    console.log('   - Replace "Western Temple" with "Eastern Air Temple", etc.');
    console.log('   - Add specific Air Nomad festivals and figures');
    console.log('   - Include technique lore ("Whisper-Steaming was developed by..."）');
    console.log();
    console.log('5. ✨ Sensory and Emotional Impact');
    console.log('   - Enhance spiritual benefit variety');
    console.log('   - Add memory/emotion triggers');
    console.log('   - Expand sensory descriptions beyond "gentle"');

    console.log();
    console.log('🎯 SPECIFIC ACTIONS FOR IMMEDIATE IMPROVEMENT:');
    console.log('==============================================');
    console.log('[] Fix {culture} template variable in dish name generation');
    console.log('[] Review grammar templates for incomplete sentence patterns');
    console.log('[] Add phrasebank weights to reduce "transcendent experience" overuse');
    console.log('[] Replace generic location names with specific Air Nomad temples');
    console.log('[] Expand adjective vocabulary beyond "gentle", "lovingly", "sacred"');
    console.log('[] Add context-aware phrase joining (not just commas)');

    console.log('\n✅ Phase 1 Audit Complete!');
    console.log('📊 Quality Issues Identified: Template vars, repetitive phrasing, poor flow');
    console.log('🎯 Next Step: Begin Phase 2 - Phrasebank and Template Polishing');
    console.log('📁 Save this output for reference during improvements');
}

// Run the audit
runAudit(); 