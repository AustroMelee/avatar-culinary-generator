// src/dishGenerator.ts

import { Dish, DishType, Ingredient, Nation, CookingStyle, DishContext, DishTheme, IngredientCategory, NationData } from './types';
import { airNomadData, airNomadCookingStyles } from './airNomadData';
import { airNomadIngredients } from './airNomadIngredients';
import { TextGenerator } from './textGenerator';

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getMultipleRandom = <T>(arr: T[], count: number): T[] => {
    if (arr.length === 0) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
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
            default:
                // Fallback for unimplemented nations
                console.warn(`Data for nation "${nation}" not found, defaulting to Air Nomads.`);
                this.nationData = airNomadData;
                this.ingredients = airNomadIngredients;
                this.cookingStyles = airNomadCookingStyles;
                // throw new Error(`Data for nation "${nation}" not found.`);
        }
    }

    public generateDish(dishType: DishType): Dish {
        const context = this.createLinkedContext(dishType);
        
        const name = this.textGenerator.generateName(context);
        const description = this.textGenerator.generateDescription(context);
        const lore = this.textGenerator.generateLore(context);

        return {
            name, description, lore,
            nation: this.nationData.nation,
            dishType,
            emoji: getRandom(this.nationData.dishEmojis),
            ingredients: context.allIngredients,
            cookingStyle: context.cookingStyle,
        };
    }

    private createLinkedContext(dishType: DishType): DishContext {
        const cookingStyle = getRandom(this.cookingStyles);
        const allIngredients = this.selectIngredients(dishType, cookingStyle);
        
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
            nationData: this.nationData, // <-- ADD THIS LINE
        };
    }

    private selectIngredients(dishType: DishType, cookingStyle: CookingStyle): Ingredient[] {
        const subtype = cookingStyle.dishSubtype.toLowerCase();

        // Utility to get ONE random ingredient from a pool of a specific category
        const getOneFromPool = (pool: Ingredient[], category: IngredientCategory): Ingredient | undefined => {
            const categoryPool = pool.filter(i => i.category === category);
            return getMultipleRandom(categoryPool, 1)[0];
        };

        const suitablePool = this.ingredients.filter(i => i.suitability.includes(subtype));
        
        let selected: Ingredient[] = [];

        if (dishType === 'dessert') {
            const sweetPool = suitablePool.filter(i => i.flavorProfile === 'sweet');
            // Select one primary fruit, then a secondary one that is different
            const primaryFruit = getOneFromPool(sweetPool, 'fruit');
            if (primaryFruit) {
                const secondaryPool = sweetPool.filter(ing => ing.category === 'fruit' && ing.name !== primaryFruit.name);
                const secondaryFruit = getOneFromPool(secondaryPool, 'fruit');
                selected.push(primaryFruit, secondaryFruit!);
            }
            selected.push(getOneFromPool(sweetPool, 'flavoring'));
            selected.push(getOneFromPool(suitablePool, 'base')); // e.g., flour for a pie crust

        } else { // For main-course, soup-stew, etc.
            const savoryPool = suitablePool.filter(i => ['savory', 'neutral', 'pungent', 'umami'].includes(i.flavorProfile));
            
            // --- NEW, SMARTER SELECTION LOGIC ---
            // 1. Get one primary protein
            const protein = getOneFromPool(savoryPool, 'protein');
            if(protein) selected.push(protein);

            // 2. Get two different vegetables
            const primaryVeg = getOneFromPool(savoryPool, 'vegetable');
            if (primaryVeg) {
                const secondaryVegPool = savoryPool.filter(ing => ing.category === 'vegetable' && ing.name !== primaryVeg.name);
                const secondaryVeg = getOneFromPool(secondaryVegPool, 'vegetable');
                selected.push(primaryVeg, secondaryVeg!);
            }

            // 3. Get one base
            const base = getOneFromPool(savoryPool, 'base');
            if(base) selected.push(base);

            // 4. Get a flavoring
            const flavoring = getOneFromPool(savoryPool, 'flavoring');
            if(flavoring) selected.push(flavoring);
        }
        
        // Remove any undefined/null items and duplicates, ensuring a clean list.
        const finalSelection = selected.filter(Boolean);
        return [...new Map(finalSelection.map(item => [item.name, item])).values()];
    }
}