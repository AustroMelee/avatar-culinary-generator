// src/dishGenerator.ts

import { Dish, DishType, Ingredient, Nation, CookingStyle, DishContext, FusionData, IngredientCategory } from './types';
import { airNomadData, airNomadCookingStyles } from './airNomadData';
import { airNomadIngredients } from './airNomadIngredients';
import { waterTribeData, waterTribeCookingStyles } from './waterTribeData';
import { waterTribeIngredients } from './waterTribeIngredients';
import { earthKingdomData, earthKingdomCookingStyles } from './earthKingdomData';
import { earthKingdomIngredients } from './earthKingdomIngredients';
import { fireNationData, fireNationCookingStyles } from './fireNationData';
import { fireNationIngredients } from './fireNationIngredients';
import { TextGenerator } from './textGenerator';

// Maps to get data based on nation ID
const nationDataMap = { 'air-nomads': airNomadData, 'water-tribe': waterTribeData, 'earth-kingdom': earthKingdomData, 'fire-nation': fireNationData };
const nationIngredientsMap = { 'air-nomads': airNomadIngredients, 'water-tribe': waterTribeIngredients, 'earth-kingdom': earthKingdomIngredients, 'fire-nation': fireNationIngredients };
const nationStylesMap = { 'air-nomads': airNomadCookingStyles, 'water-tribe': waterTribeCookingStyles, 'earth-kingdom': earthKingdomCookingStyles, 'fire-nation': fireNationCookingStyles };

// Recipe Blueprints and Culinary Map from previous steps
type RecipeSkeleton = { [key in IngredientCategory]?: number };
const RECIPE_BLUEPRINTS: Record<DishType, RecipeSkeleton> = {
    'main-course': { protein: 1, vegetable: 2, base: 1, flavoring: 1 },
    'side-dish': { vegetable: 2, flavoring: 1 },
    'snack': { protein: 1, vegetable: 1 },
    'dessert': { fruit: 2, flavoring: 1, garnish: 1 },
    'soup-stew': { protein: 1, vegetable: 2, base: 1, flavoring: 1 },
    'salad': { vegetable: 2, garnish: 1, protein: 1 },
    'beverage': { fruit: 1, flavoring: 1 },
};

const NATION_CULINARY_MAP: Record<Nation, Record<DishType, string[]>> = {
    'air-nomads': {
        'main-course': ['Baking', 'Steaming', 'Light Sauté', 'Simmering', 'Piemaking'],
        'side-dish': ['Steaming', 'Light Sauté', 'Simmering', 'Baking'],
        'snack': ['Minimalist Assembly', 'Baking', 'Light Sauté'],
        'dessert': ['Baking', 'Piemaking', 'Minimalist Assembly'],
        'soup-stew': ['Simmering'],
        'salad': ['Minimalist Assembly'],
        'beverage': ['Juicing'],
    },
    'water-tribe': {
        'main-course': ['Stewing', 'Grilling', 'Poaching', 'Boiling'],
        'side-dish': ['Boiling', 'Poaching'],
        'snack': ['Curing', 'Grilling'],
        'dessert': ['Freezing'],
        'soup-stew': ['Stewing'],
        'salad': ['Minimalist Assembly'],
        'beverage': ['Brewing'],
    },
    'earth-kingdom': {
        'main-course': ['Roasting', 'Stir-frying', 'Braising'],
        'side-dish': ['Stir-frying', 'Pickling', 'Steaming'],
        'snack': ['Dumpling Making', 'Steaming'],
        'dessert': ['Baking'],
        'soup-stew': ['Congee Making', 'Braising'],
        'salad': ['Minimalist Assembly'],
        'beverage': ['Brewing'],
    },
    'fire-nation': {
        'main-course': ['Grilling', 'Roasting', 'Wok-frying'],
        'side-dish': ['Steaming', 'Wok-frying'],
        'snack': ['Grilling', 'Roasting'],
        'dessert': ['Baking'],
        'soup-stew': ['Simmering'],
        'salad': ['Minimalist Assembly'],
        'beverage': ['Brewing'],
    },
};

// Helper functions
const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
const getMultipleRandom = <T>(arr: T[], count: number): T[] => {
    if (arr.length === 0) return [];
    const shuffled = shuffleArray(arr);
    return shuffled.slice(0, count);
};

export class DishGenerator {
    private textGenerator: TextGenerator;
    private ingredients: Ingredient[] = [];
    private cookingStyles: CookingStyle[] = [];
    private fusionData: FusionData;
    
    // --- NEW: SHORT-TERM MEMORY ---
    private history: { primaryIngredient: string, cookingStyle: string }[] = [];
    private readonly HISTORY_LIMIT = 3; // Remember the last 3 dishes

    constructor(nations: Nation[]) {
        if (nations.length === 0) throw new Error("At least one nation must be selected.");

        this.textGenerator = new TextGenerator();
        this.fusionData = {
            selectedNations: nations,
            nameParts: { prefixes: [], middles: [], suffixes: [] },
            dishEmojis: { 'main-course': [], 'side-dish': [], snack: [], dessert: [], 'soup-stew': [], salad: [], beverage: [] },
        };

        nations.forEach(nation => {
            const data = nationDataMap[nation];
            const ingredients = nationIngredientsMap[nation];
            const styles = nationStylesMap[nation];

            this.ingredients.push(...ingredients);
            this.cookingStyles.push(...styles);
            this.fusionData.nameParts.prefixes.push(...data.nameParts.prefixes);
            this.fusionData.nameParts.middles.push(...data.nameParts.middles);
            this.fusionData.nameParts.suffixes.push(...data.nameParts.suffixes);
            for (const key in data.dishEmojis) {
                const dishType = key as DishType;
                this.fusionData.dishEmojis[dishType].push(...data.dishEmojis[dishType]);
            }
        });

        this.ingredients = [...new Map(this.ingredients.map(item => [item.name, item])).values()];
        this.cookingStyles = [...new Map(this.cookingStyles.map(item => [item.name, item])).values()];
    }

    private addToHistory(context: DishContext): void {
        this.history.push({
            primaryIngredient: context.primaryIngredient.name,
            cookingStyle: context.cookingStyle.name,
        });
        if (this.history.length > this.HISTORY_LIMIT) {
            this.history.shift(); // Keep history size limited
        }
    }

    private isRepetitive(context: DishContext): boolean {
        return this.history.some(entry =>
            entry.primaryIngredient === context.primaryIngredient.name &&
            entry.cookingStyle === context.cookingStyle.name
        );
    }

    public generateDish(dishType: DishType): Dish {
        let context: DishContext;
        let attempts = 0;

        // --- NEW: GENERATION LOOP WITH MEMORY CHECK ---
        // Try up to 10 times to generate a non-repetitive dish.
        do {
            context = this.createLinkedContext(dishType);
            attempts++;
        } while (this.isRepetitive(context) && attempts < 10);

        // Add the new, unique dish to history
        this.addToHistory(context);
        
        const name = this.textGenerator.generateName(context);
        const description = this.textGenerator.generateDescription(context);
        const lore = this.textGenerator.generateLore(context);

        const emojiPool = this.fusionData.dishEmojis[dishType] || [];
        const emoji = emojiPool.length > 0 ? getRandom(emojiPool) : '❓';

        return {
            name, description, lore, emoji,
            nations: this.fusionData.selectedNations,
            dishType,
            ingredients: context.allIngredients,
            cookingStyle: context.cookingStyle,
        };
    }
    
    private createLinkedContext(dishType: DishType): DishContext {
        let validStyleNames: string[] = [];
        this.fusionData.selectedNations.forEach(nation => {
            validStyleNames.push(...(NATION_CULINARY_MAP[nation][dishType] || []));
        });
        validStyleNames = [...new Set(validStyleNames)];

        if (validStyleNames.length === 0) throw new Error(`No valid styles for this fusion on dish type: ${dishType}`);

        const validStyles = this.cookingStyles.filter(style => validStyleNames.includes(style.name));
        const cookingStyle = getRandom(validStyles);
        const allIngredients = this.selectIngredients(dishType, cookingStyle);
        
        const blueprint = RECIPE_BLUEPRINTS[dishType];
        const minIngredients = Object.values(blueprint).reduce((sum, val) => sum + val, 0);
        if (allIngredients.length < minIngredients && allIngredients.length < 2) {
            throw new Error(`Could not select enough suitable ingredients.`);
        }

        return {
            theme: getRandom(['Humble & Meditative', 'Ceremonial & Celebratory', 'Invigorating & Playful', 'Ancient & Traditional']),
            primaryIngredient: allIngredients[0],
            secondaryIngredient: allIngredients.length > 1 ? allIngredients[1] : allIngredients[0],
            cookingStyle,
            allIngredients,
            fusionData: this.fusionData,
            dishType,
        };
    }

    private selectIngredients(dishType: DishType, cookingStyle: CookingStyle): Ingredient[] {
        const subtype = cookingStyle.dishSubtype.toLowerCase();
        const skeleton = RECIPE_BLUEPRINTS[dishType];
        if (!skeleton) throw new Error(`No recipe blueprint found for dish type: ${dishType}`);
    
        // --- REVISED FILTERING LOGIC ---
        // 1. Broaden the suitability check. An ingredient is valid if it matches the specific subtype OR the general dishType.
        let baseIngredientPool = this.ingredients.filter(i => 
            i.suitability.includes(subtype) || i.suitability.includes(dishType)
        );
    
        // 2. Make flavor filtering a preference, not a hard rule, especially for beverages.
        const isSweetDish = dishType === 'dessert'; // Only desserts are strictly sweet
        if (isSweetDish) {
            // For desserts, we still strongly prefer sweet ingredients.
            const sweetPool = baseIngredientPool.filter(i => i.flavorProfile === 'sweet');
            if (sweetPool.length > 2) { // Ensure there's a decent pool
                baseIngredientPool = sweetPool;
            }
        } else if (dishType !== 'beverage') {
            // For most non-beverage, non-dessert dishes, filter out sweet things.
            baseIngredientPool = baseIngredientPool.filter(i => i.flavorProfile !== 'sweet');
        }
        // For beverages, we allow ALL flavor profiles (sweet, savory, neutral, etc.)
    
        let finalSelection: Ingredient[] = [];
        let usedNames = new Set<string>();
    
        // A helper to get a weighted random ingredient from a pool
        const getWeightedRandom = (pool: Ingredient[], contextIngredients: Ingredient[] = []): Ingredient | undefined => {
            if (pool.length === 0) return undefined;
    
            const scoredPool = pool.map(ingredient => {
                let score = 1; // Base score
    
                // Boost score for ingredients from the selected nations
                if (this.fusionData.selectedNations.includes(ingredient.nation)) {
                    score += 5;
                }
    
                // Boost score for synergies with already selected ingredients
                if (contextIngredients.length > 0 && ingredient.synergies) {
                    contextIngredients.forEach(ctxIng => {
                        if (ingredient.synergies![ctxIng.name]) {
                            score += ingredient.synergies![ctxIng.name];
                        }
                    });
                }
    
                // Boost for matching location (stronger for single-nation, moderate for fusion)
                if (this.fusionData.selectedNations.length === 1 && ingredient.location !== 'Generic') {
                    score += 5;
                } else if (this.fusionData.selectedNations.length > 1 && ingredient.location !== 'Generic') {
                    score += 2;
                }
    
                return { ingredient, score };
            });
    
            const totalScore = scoredPool.reduce((sum, item) => sum + item.score, 0);
            let randomPoint = Math.random() * totalScore;
    
            for (const item of scoredPool) {
                randomPoint -= item.score;
                if (randomPoint <= 0) {
                    return item.ingredient;
                }
            }
            return pool[0]; // Fallback
        };
    
        // Fill the skeleton category by category
        for (const category in skeleton) {
            const cat = category as IngredientCategory;
            const count = skeleton[cat]!;
    
            for (let i = 0; i < count; i++) {
                // Filter pool for the current category, excluding already used ingredients
                const categoryPool = baseIngredientPool.filter(ing => ing.category === cat && !usedNames.has(ing.name));
                if (categoryPool.length === 0) continue; // Skip if no ingredients are available
    
                // Get a synergistically-chosen ingredient
                const chosen = getWeightedRandom(categoryPool, finalSelection);
    
                if (chosen) {
                    finalSelection.push(chosen);
                    usedNames.add(chosen.name);
                }
            }
        }
    
        return finalSelection;
    }
}