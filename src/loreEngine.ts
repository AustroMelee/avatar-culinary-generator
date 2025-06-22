import { DishContext, LoreEntry, Rarity } from './types';
import { isRuleCompatible } from './validation';
import { philosophicalLore } from './lore_philosophical';
import { historicalLore } from './lore_historical';
import { characterLore } from './lore_character';
import { locationLore } from './lore_locations';
import { tradeLore } from './lore_trade_and_commerce';
import { culturalLore } from './lore_social_and_cultural';
import { characterFusionLore } from './lore_character_fusion';

export class LoreEngine {
    private lorebook: LoreEntry[];

    constructor() {
        // Combine all lore from the different modules into one master list
        this.lorebook = [
            ...philosophicalLore, 
            ...historicalLore, 
            ...characterLore,
            ...locationLore,
            ...tradeLore,
            ...culturalLore,
            ...characterFusionLore
        ];
    }

    public getLore(context: DishContext): { title: string; text: string } {
        const { fusionData, primaryIngredient } = context;

        // First, filter for strict compatibility. This part is working correctly.
        const compatibleLore = this.lorebook
            .filter(entry => isRuleCompatible(entry.weighting, context));

        if (compatibleLore.length === 0) {
            return { title: 'A Simple Meal', text: 'This humble dish needs no story but its own simple existence.' };
        }

        // --- NEW HYPER-CONTEXTUAL SCORING ---
        const scoredLore = compatibleLore.map(entry => {
            let score = 1; // Base score

            // Massive bonus for mentioning the primary ingredient by name.
            if (entry.weighting.ingredients?.includes(primaryIngredient.name)) {
                score += 50;
            }

            // Bonus for matching the dish's nations EXACTLY (for fusion).
            if (entry.weighting.minNations && entry.weighting.minNations === fusionData.selectedNations.length) {
                score += 25;
            }
            
            // Bonus for matching a single nation perfectly.
            if (entry.weighting.nations && fusionData.selectedNations.length === 1) {
                if (entry.weighting.nations[fusionData.selectedNations[0]]) {
                    score += 20;
                }
            }

            // Smaller bonuses for other context matches.
            if (entry.weighting.styles?.includes(context.cookingStyle.name)) score += 5;
            if (entry.weighting.dishTypes?.includes(context.dishType)) score += 5;
            if (entry.weighting.themes?.includes(context.theme)) score += 10;
            
            return { entry, score };
        });

        scoredLore.sort((a, b) => b.score - a.score);
        const topTier = scoredLore.slice(0, 5);
        const selected = topTier[Math.floor(Math.random() * topTier.length)];
        return { title: selected.entry.title, text: selected.entry.text(context) };
    }
} 