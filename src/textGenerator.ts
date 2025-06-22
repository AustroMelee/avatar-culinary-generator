// src/textGenerator.ts

import { FusionNameEngine } from './fusionNameEngine';
import { DescriptionEngine } from './descriptionEngine';
import { DishContext, Ingredient, Nation } from './types';

const nationAdjectives: Record<Nation, string> = {
    'air-nomads': 'Soaring',
    'water-tribe': 'Tidal',
    'earth-kingdom': 'Earthen',
    'fire-nation': 'Blazing'
};

// Helper to get a random element from an array
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export class TextGenerator {
    private nameEngine: FusionNameEngine;
    private descriptionEngine: DescriptionEngine;

    constructor() {
        this.nameEngine = new FusionNameEngine();
        this.descriptionEngine = new DescriptionEngine();
    }

    /**
     * Generates a dynamic name for the dish using the nation's name parts.
     * This requires nationData to be present in the context.
     */
    public generateName(context: DishContext): string {
        const { selectedNations } = context.fusionData;

        // If it's a fusion dish, use the new engine.
        if (selectedNations.length > 1) {
            return this.nameEngine.getName(context);
        }
        
        // --- UPGRADED SINGLE-NATION NAME LOGIC ---
        const { nameParts } = context.fusionData;
        const { primaryIngredient, cookingStyle, theme } = context;

        const prefix = pick(nameParts.prefixes);
        const middle = pick(nameParts.middles);
        const primaryName = primaryIngredient.name.split(' ')[0];
        
        // Contextual Suffixes based on theme
        let suffix = '';
        switch (theme) {
            case 'Ceremonial & Celebratory':
                suffix = pick(['Feast', 'Festival', 'Bounty']);
                break;
            case 'Humble & Meditative':
                suffix = pick(['Special', 'Surprise', 'Medley']);
                break;
            case 'Ancient & Traditional':
                suffix = cookingStyle.dishSubtype;
                break;
            default: // Invigorating & Playful
                suffix = pick(['Delight', 'Surprise']);
                break;
        }

        return `${prefix} ${primaryName} ${suffix}`;
    }

    /**
     * Generates a description using the new DescriptionEngine.
     */
    public generateDescription(context: DishContext): string {
        // Delegate description generation to the new engine
        return this.descriptionEngine.getDescription(context);
    }

    /**
     * Generates intelligent Chef's Notes that explain why the dish is cohesive.
     * This makes the generator feel intelligent by providing culinary rationale.
     */
    public generateRationale(context: DishContext): string[] {
        const notes: string[] = [];
        const { primaryIngredient, secondaryIngredient, cookingStyle, allIngredients, fusionData } = context;

        // --- Note 1: Synergy Check ---
        if (secondaryIngredient && primaryIngredient.synergies?.[secondaryIngredient.name]) {
            notes.push(`The pairing of **${primaryIngredient.name}** and **${secondaryIngredient.name}** is a classic combination, creating a delightful harmony of flavors.`);
        }

        // --- Note 2: Technique Check ---
        // Make the cooking style's description more generic for use here
        const styleDesc = cookingStyle.description.toLowerCase()
            .replace(/a |an |the /i, '') // remove leading articles
            .replace(new RegExp(cookingStyle.name, 'ig'), 'this technique');
        notes.push(`The choice of **${cookingStyle.name}** is key; ${styleDesc}, which perfectly suits the **${primaryIngredient.name}**.`);

        // --- Note 3: Rarity/Theme Check ---
        const rareIngredient = allIngredients.find(i => i.rarity === 'Rare' || i.rarity === 'Legendary');
        if (rareIngredient && context.theme === 'Ceremonial & Celebratory') {
            notes.push(`The inclusion of the prestigious **${rareIngredient.name}** marks this as a dish for special occasions, truly befitting a ceremonial feast.`);
        }

        // --- Note 4: Fusion Check ---
        if (fusionData.selectedNations.length > 1) {
            const nation1 = fusionData.selectedNations[0].split('-')[0].replace(/\b\w/g, l => l.toUpperCase());
            const nation2 = fusionData.selectedNations[1].split('-')[0].replace(/\b\w/g, l => l.toUpperCase());
            notes.push(`This modern fusion dish bravely combines the culinary traditions of the **${nation1}** and the **${nation2}**, creating an experience that is both new and familiar.`);
        }

        // --- Note 5: Lore Snippet Check ---
        const ingredientsWithLore = allIngredients.filter(i => i.loreSnippet);
        if (ingredientsWithLore.length > 0) {
            // Pick one ingredient with lore to highlight
            const ingredientToHighlight = pick(ingredientsWithLore);
            if(ingredientToHighlight) {
              notes.push(`On **${ingredientToHighlight.name}**: *"${ingredientToHighlight.loreSnippet}"*`);
            }
        }
        
        // Shuffle and return a maximum of 3 notes to keep it concise
        return notes.sort(() => 0.5 - Math.random()).slice(0, 3);
    }
}