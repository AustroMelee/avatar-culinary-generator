// src/dishGenerator.ts

import { Dish, DishType, Ingredient, Nation, CookingStyle, DishContext, DishTheme, IngredientCategory, NationData } from './types';
import { airNomadData, airNomadCookingStyles } from './airNomadData';
import { airNomadIngredients } from './airNomadIngredients';
import { TextGenerator } from './textGenerator';

// A type for our recipe skeletons
type RecipeSkeleton = { [key in IngredientCategory]?: number };

// Map of DishType to its skeleton
const RECIPE_BLUEPRINTS: Record<DishType, RecipeSkeleton> = {
    'main-course': { protein: 1, vegetable: 2, base: 1, flavoring: 1 },
    'side-dish': { vegetable: 2, flavoring: 1 },
    'snack': { protein: 1, vegetable: 1 },
    'dessert': { fruit: 2, base: 1, flavoring: 1 },
    'soup-stew': { protein: 1, vegetable: 2, base: 1, flavoring: 1 },
    'salad': { vegetable: 3, protein: 1, garnish: 1 },
    'beverage': { fruit: 2, flavoring: 1 },
};

// *** THE CORE ARCHITECTURAL FIX ***
// This map links each DishType to an array of valid CookingStyle NAMES.
const DISH_STYLE_MAP: Record<DishType, string[]> = {
    'main-course': ['Baking', 'Steaming', 'Light Sauté', 'Simmering', 'Piemaking'],
    'side-dish': ['Steaming', 'Light Sauté', 'Simmering', 'Baking'],
    'snack': ['Minimalist Assembly', 'Baking', 'Light Sauté'],
    'dessert': ['Baking', 'Piemaking', 'Minimalist Assembly'], // No more 'Steamed' desserts!
    'soup-stew': ['Simmering'], // Soups can only be simmered.
    'salad': ['Minimalist Assembly'], // Salads are only assembled.
    'beverage': ['Juicing'], // Beverages are only juiced.
};

// *** NEW: A ROBUST SHUFFLE FUNCTION (FISHER-YATES) ***
function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
    }
    return newArray;
}

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// --- UPGRADED getMultipleRandom to use the new shuffle ---
const getMultipleRandom = <T>(arr: T[], count: number): T[] => {
    if (arr.length === 0) return [];
    // Before: const shuffled = [...arr].sort(() => 0.5 - Math.random());
    // After:
    const shuffled = shuffleArray(arr);
    return shuffled.slice(0, count);
};

export class DishGenerator {
    private textGenerator: TextGenerator;
    private ingredients: Ingredient[];
    private cookingStyles: CookingStyle[];
    private nationData: NationData;

    constructor(nation: Nation) {
        this.textGenerator = new TextGenerator();
        this.nationData = airNomadData;
        this.ingredients = airNomadIngredients;
        this.cookingStyles = airNomadCookingStyles;
    }

    public generateDish(dishType: DishType): Dish {
        const context = this.createLinkedContext(dishType);
        
        const name = this.textGenerator.generateName(context);
        const description = this.textGenerator.generateDescription(context);
        const lore = this.textGenerator.generateLore(context);

        const emojiPool = this.nationData.dishEmojis[dishType] || this.nationData.dishEmojis['snack']; // Fallback to snack
        const emoji = getRandom(emojiPool);

        return {
            name, description, lore,
            nation: this.nationData.nation,
            dishType,
            emoji,
            ingredients: context.allIngredients,
            cookingStyle: context.cookingStyle,
        };
    }
    
    // --- REWRITTEN createLinkedContext ---
    private createLinkedContext(dishType: DishType): DishContext {
        // 1. Get the list of valid style names for the given dish type.
        const validStyleNames = DISH_STYLE_MAP[dishType];
        if (!validStyleNames || validStyleNames.length === 0) {
            throw new Error(`No valid cooking styles defined for dish type: ${dishType}`);
        }

        // 2. Filter the master list of cooking styles to get the valid ones.
        const validStyles = this.cookingStyles.filter(style => validStyleNames.includes(style.name));
        
        // 3. Pick a random style from the *valid* list.
        const cookingStyle = getRandom(validStyles);
        
        // 4. Select ingredients that are compatible with this valid style.
        const allIngredients = this.selectIngredients(dishType, cookingStyle);
        
        // Ensure we have enough ingredients to proceed.
        if (allIngredients.length < 2) {
            throw new Error(`Could not select enough suitable ingredients for dish type: ${dishType} with style ${cookingStyle.name}.`);
        }

        const themes: DishTheme[] = ['Humble & Meditative', 'Ceremonial & Celebratory', 'Invigorating & Playful', 'Ancient & Traditional'];

        return {
            theme: getRandom(themes),
            primaryIngredient: allIngredients[0],
            secondaryIngredient: allIngredients[1],
            cookingStyle,
            allIngredients,
            nationData: this.nationData,
        };
    }

    // This function is now robust because it's only ever called with a valid combination.
    private selectIngredients(dishType: DishType, cookingStyle: CookingStyle): Ingredient[] {
        const subtype = cookingStyle.dishSubtype.toLowerCase();
        const skeleton = RECIPE_BLUEPRINTS[dishType];
        if (!skeleton) throw new Error(`No recipe blueprint found for dish type: ${dishType}`);

        const isSweetDish = dishType === 'dessert' || dishType === 'beverage';
        let ingredientPool = this.ingredients.filter(i => i.suitability.includes(subtype));

        if (isSweetDish) {
            ingredientPool = ingredientPool.filter(i => i.flavorProfile === 'sweet');
        } else {
            ingredientPool = ingredientPool.filter(i => ['savory', 'neutral', 'pungent', 'umami'].includes(i.flavorProfile));
            if (dishType === 'soup-stew') {
                ingredientPool = ingredientPool.filter(i => i.name.includes('Broth') || i.category !== 'base');
            }
        }
        
        let selectedIngredients: Ingredient[] = [];
        let usedNames = new Set<string>();

        for (const category in skeleton) {
            const cat = category as IngredientCategory;
            const count = skeleton[cat]!;
            
            const categoryPool = ingredientPool.filter(i => i.category === cat && !usedNames.has(i.name));
            const found = getMultipleRandom(categoryPool, count);

            found.forEach(ing => {
                selectedIngredients.push(ing);
                usedNames.add(ing.name);
            });
        }
        
        return selectedIngredients;
    }
}