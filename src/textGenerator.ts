// src/textGenerator.ts

import { LoreEngine } from './loreEngine';
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
    private loreEngine: LoreEngine;
    private nameEngine: FusionNameEngine;
    private descriptionEngine: DescriptionEngine;

    constructor() {
        this.loreEngine = new LoreEngine();
        this.nameEngine = new FusionNameEngine();
        this.descriptionEngine = new DescriptionEngine();
    }

    /**
     * Generates a dynamic name for the dish using the nation's name parts.
     * This requires nationData to be present in the context.
     */
    public generateName(context: DishContext): { title: string; flavorText: string } {
        const { selectedNations } = context.fusionData;

        // If it's a fusion dish, use the new engine.
        if (selectedNations.length > 1) {
            const result = this.nameEngine.getName(context);
            return { title: result.title, flavorText: result.flavorText };
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

        const title = `${prefix} ${primaryName} ${suffix}`;
        
        return { title, flavorText: '' }; // Single-nation dishes have no flavor text
    }

    /**
     * Generates a description using the new DescriptionEngine.
     */
    public generateDescription(context: DishContext): string {
        // Delegate description generation to the new engine
        return this.descriptionEngine.getDescription(context);
    }

    /**
     * Generates a lore sentence for the dish.
     */
    public generateLore(context: DishContext): { title: string; text: string } {
        return this.loreEngine.getLore(context);
    }
}