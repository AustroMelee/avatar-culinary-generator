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
        const { primaryIngredient } = context;

        const getCleanIngredientName = (ing: Ingredient) => {
            if (ing.name.includes('Lentils')) return 'Lentil';
            if (ing.name.includes('Mung Beans')) return 'Mung Bean';
            if (ing.name.includes('Nuts')) return 'Nut';
            return ing.name.split(' ')[0];
        };
        
        const primaryName = getCleanIngredientName(primaryIngredient);

        const rand = Math.random();

        // --- FINAL, POLISHED PATTERNS ---
        
        // Always use the subtype if it's specific and descriptive (Curry, Pie, Juice, Salad)
        if (['Curry', 'Pie', 'Juice', 'Salad', 'Stir-fry'].includes(dishSubtype)) {
             if (rand < 0.6) return `${prefix} ${primaryName} ${dishSubtype}`; // "Meditative Lentil Curry"
             return `${middle} ${primaryName} ${dishSubtype}`; // "Cloud Apple Juice"
        }

        // Generic patterns for Bake, Steam, etc.
        if (rand < 0.4) {
            return `${prefix} ${primaryName} ${suffix}`; // "Soaring Potato Delight"
        } 
        else if (rand < 0.7) {
            return `${middle} ${primaryName} Medley`; // "Sunrise Tofu Medley"
        }
        else {
            return `${prefix} ${middle} Special`; // "Sky Temple Wind Special"
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