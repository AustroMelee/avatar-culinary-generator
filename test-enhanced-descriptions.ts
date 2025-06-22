/**
 * Test Script for Enhanced Description System
 * This demonstrates the intelligent theme selection and rich descriptions
 */

import { DishGenerator } from './src/dishGenerator';
import { DescriptionEngine } from './src/descriptionEngine';
import { DishType, Nation } from './src/types';

// Test the enhanced system
function testEnhancedDescriptions() {
    console.log("🍽️  Testing Enhanced Description System\n");

    // Test different nation combinations
    const testCases = [
        { nations: ['fire-nation'], name: 'Fire Nation' },
        { nations: ['air-nomads'], name: 'Air Nomads' },
        { nations: ['water-tribe'], name: 'Water Tribe' },
        { nations: ['earth-kingdom'], name: 'Earth Kingdom' },
        { nations: ['fire-nation', 'earth-kingdom'], name: 'Fire-Earth Fusion' },
    ];

    const dishTypes: DishType[] = ['main-course', 'dessert', 'snack'];

    testCases.forEach(testCase => {
        console.log(`\n🔥 ${testCase.name} Dishes:`);
        console.log("=" .repeat(50));

        const generator = new DishGenerator(testCase.nations as Nation[]);
        const descriptionEngine = new DescriptionEngine();

        dishTypes.forEach(dishType => {
            try {
                const dish = generator.generateDish(dishType);
                console.log(`\n📋 ${dishType.toUpperCase()}:`);
                console.log(`Name: ${dish.name}`);
                console.log(`Cooking Style: ${dish.cookingStyle.name}`);
                console.log(`Primary Ingredient: ${dish.ingredients[0]?.name} (${dish.ingredients[0]?.rarity})`);
                console.log(`Description: ${dish.description}`);
                console.log("---");
            } catch (error) {
                console.log(`❌ Error generating ${dishType}: ${error}`);
            }
        });
    });

    console.log("\n✨ Enhanced Description System Test Complete!");
}

// Run the test if this file is executed directly
if (typeof window === 'undefined') {
    // Node.js environment
    testEnhancedDescriptions();
} else {
    // Browser environment - add to window for console testing
    (window as any).testEnhancedDescriptions = testEnhancedDescriptions;
    console.log("🧪 Enhanced description test available. Run 'testEnhancedDescriptions()' in console.");
} 