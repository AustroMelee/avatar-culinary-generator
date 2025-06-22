// src/dishGenerator.ts

import { Dish, DishType, Ingredient, Nation, CookingStyle, DishContext, DishTheme, IngredientCategory, NationData } from './types';
import { airNomadData, airNomadCookingStyles } from './airNomadData';
import { airNomadIngredients } from './airNomadIngredients';
import { waterTribeData, waterTribeCookingStyles } from './waterTribeData';
import { waterTribeIngredients } from './waterTribeIngredients';
import { earthKingdomData, earthKingdomCookingStyles } from './earthKingdomData';
import { earthKingdomIngredients } from './earthKingdomIngredients';
import { fireNationData, fireNationCookingStyles } from './fireNationData';
import { fireNationIngredients } from './fireNationIngredients';
import { TextGenerator } from './textGenerator';

// A type for our recipe skeletons
type RecipeSkeleton = { [key in IngredientCategory]?: number };

// Map of DishType to its skeleton
const RECIPE_BLUEPRINTS: Record<DishType, RecipeSkeleton> = {
    'main-course': { protein: 1, vegetable: 2, base: 1, flavoring: 1 },
    'side-dish': { vegetable: 2, flavoring: 1 },
    'snack': { protein: 1, vegetable: 1 },
    'dessert': { fruit: 2, flavoring: 1, garnish: 1 },
    'soup-stew': { protein: 1, vegetable: 2, base: 1, flavoring: 1 },
    'salad': { vegetable: 2, garnish: 1, protein: 1 },
    'beverage': { fruit: 1, flavoring: 1 },
};

// *** THE COMPLETED FOUR NATIONS CULINARY MAP ***
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
        'salad': ['Minimalist Assembly'], // For seaweed salads
        'beverage': ['Brewing'],
    },
    'earth-kingdom': {
        'main-course': ['Roasting', 'Stir-frying', 'Braising'],
        'side-dish': ['Stir-frying', 'Pickling', 'Steaming'],
        'snack': ['Dumpling Making', 'Steaming'], // Buns and dumplings
        'dessert': ['Baking'], // Tarts and cakes
        'soup-stew': ['Congee Making', 'Braising'],
        'salad': ['Minimalist Assembly'],
        'beverage': ['Brewing'], // Teas
    },
    'fire-nation': {
        'main-course': ['Grilling', 'Roasting', 'Wok-frying'],
        'side-dish': ['Steaming', 'Wok-frying'],
        'snack': ['Grilling', 'Roasting'], // For skewers and flakes
        'dessert': ['Baking'], // For tarts
        'soup-stew': ['Simmering'],
        'salad': ['Minimalist Assembly'], // Spicy salads
        'beverage': ['Brewing'], // Spiced teas/drinks
    },
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
        switch (nation) {
            case 'air-nomads':
                this.nationData = airNomadData;
                this.ingredients = airNomadIngredients;
                this.cookingStyles = airNomadCookingStyles;
                break;
            case 'water-tribe':
                this.nationData = waterTribeData;
                this.ingredients = waterTribeIngredients;
                this.cookingStyles = waterTribeCookingStyles;
                break;
            case 'earth-kingdom':
                this.nationData = earthKingdomData;
                this.ingredients = earthKingdomIngredients;
                this.cookingStyles = earthKingdomCookingStyles;
                break;
            case 'fire-nation':
                this.nationData = fireNationData;
                this.ingredients = fireNationIngredients;
                this.cookingStyles = fireNationCookingStyles;
                break;
            default:
                console.warn(`Data for nation "${nation}" not found, defaulting to Air Nomads.`);
                this.nationData = airNomadData;
                this.ingredients = airNomadIngredients;
                this.cookingStyles = airNomadCookingStyles;
        }
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
        // 1. Get the list of valid style names from the NATION-AWARE map.
        const validStyleNames = NATION_CULINARY_MAP[this.nationData.nation][dishType];
        if (!validStyleNames || validStyleNames.length === 0) {
            throw new Error(`No valid cooking styles defined for dish type '${dishType}' in nation '${this.nationData.nation}'`);
        }

        const validStyles = this.cookingStyles.filter(style => validStyleNames.includes(style.name));
        const cookingStyle = getRandom(validStyles);
        const allIngredients = this.selectIngredients(dishType, cookingStyle);
        
        if (allIngredients.length === 0) {
            throw new Error(`Could not find any ingredients for ${dishType} with style ${cookingStyle.name}.`);
        }
        if (allIngredients.length < 2 && dishType !== 'snack' && dishType !== 'beverage') {
            throw new Error(`Could not select enough suitable ingredients for dish type: ${dishType} with style ${cookingStyle.name}.`);
        }

        const themes: DishTheme[] = ['Humble & Meditative', 'Ceremonial & Celebratory', 'Invigorating & Playful', 'Ancient & Traditional'];

        return {
            theme: getRandom(themes),
            primaryIngredient: allIngredients[0],
            secondaryIngredient: allIngredients.length > 1 ? allIngredients[1] : allIngredients[0],
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
            ingredientPool = ingredientPool.filter(i => i.flavorProfile !== 'sweet');
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