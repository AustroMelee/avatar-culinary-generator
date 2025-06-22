// src/textGenerator.ts

import { Grammar } from './grammar';
import { DishContext, NationData, Ingredient } from './types';

// Helper to get a random element from an array
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export class TextGenerator {
    private grammar: Grammar;

    constructor() {
        this.grammar = new Grammar();
    }

    /**
     * Generates a dynamic name for the dish using the nation's name parts.
     * This requires nationData to be present in the context.
     */
    public generateName(context: DishContext): string {
        const { nameParts } = context.nationData;
        const prefix = pick(nameParts.prefixes);
        const middle = pick(nameParts.middles);
        const suffix = pick(nameParts.suffixes);
        const { dishSubtype } = context.cookingStyle;
        const { primaryIngredient, secondaryIngredient } = context;

        // NEW: Let's clean up ingredient names for use in titles (e.g., "Lentils of the Four Winds" -> "Lentil")
        const getCleanIngredientName = (ing: Ingredient) => {
            if (ing.name.includes('Lentils')) return 'Lentil';
            if (ing.name.includes('Mung Beans')) return 'Mung Bean';
            return ing.name.split(' ')[0]; // "Moon Peach" -> "Moon", "Potato" -> "Potato"
        };
        
        const primaryName = getCleanIngredientName(primaryIngredient);

        const rand = Math.random();

        // --- NEW & IMPROVED PATTERNS ---

        // Pattern 1 (High Priority): [Prefix] [Ingredient] [Dish Subtype] -> "Meditative Lentil Curry"
        if (rand < 0.4) {
            return `${prefix} ${primaryName} ${dishSubtype}`;
        } 
        // Pattern 2: [Middle] [Ingredient] [Suffix] -> "Sunrise Apple Delight"
        else if (rand < 0.7) {
            return `${middle} ${primaryName} ${suffix}`;
        }
        // Pattern 3: [Prefix] [Middle] [Dish Subtype] -> "Sky Temple Wind Pie" (the old classic)
        else if (rand < 0.9) {
            return `${prefix} ${middle} ${dishSubtype}`;
        } 
        // Pattern 4 (Fallback): [Middle] [Suffix] -> "Treetop Surprise"
        else {
            return `${middle} ${suffix}`;
        }
    }

    /**
     * Generates a multi-sentence description, ensuring variety.
     */
    public generateDescription(context: DishContext): string {
        // Use the new, more powerful grammar builder
        let usedTags: string[] = [];
        
        const { sentence: firstSentence, usedTag: firstTag } = this.grammar.buildDescriptionSentence(context, usedTags);
        usedTags.push(firstTag);
        
        const { sentence: secondSentence } = this.grammar.buildDescriptionSentence(context, usedTags);

        return `${firstSentence} ${secondSentence}`;
    }

    /**
     * Generates a lore sentence for the dish.
     */
    public generateLore(context: DishContext): string {
        // Use the new lore builder
        return this.grammar.buildLoreSentence(context);
    }
}