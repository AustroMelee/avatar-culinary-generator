import { DishContext, DescriptionRule, Rarity, FlavorProfile, IngredientCategory, DishTheme } from './types';
import { isRuleCompatible } from './validation';
import { sensoryDescriptions } from './desc_sensory';
import { processDescriptions } from './desc_process';
import { thematicDescriptions } from './desc_thematic';

export class DescriptionEngine {
    private descriptionbook: DescriptionRule[];

    constructor() {
        this.descriptionbook = [...sensoryDescriptions, ...processDescriptions, ...thematicDescriptions];
    }

    public getDescription(context: DishContext): string {
        const { primaryIngredient } = context;

        const compatibleDescriptions = this.descriptionbook
            .filter(rule => isRuleCompatible(rule.weighting, context));

        if (compatibleDescriptions.length === 0) {
            return `A simple and satisfying dish, notable for its use of ${primaryIngredient.name.toLowerCase()}.`;
        }

        // --- NEW HYPER-CONTEXTUAL SCORING ---
        const scoredDescriptions = compatibleDescriptions.map(rule => {
            let score = 1; // Base score

            // Check if the description text itself contains the ingredient's name.
            // This is a powerful, direct way to ensure relevance.
            const descriptionText = rule.text(context).toLowerCase();
            if (descriptionText.includes(primaryIngredient.name.toLowerCase().split(' ')[0])) {
                score += 50;
            }

            // Give a huge bonus if the weighting explicitly matches the primary ingredient's category or flavor.
            if (rule.weighting.categories?.includes(primaryIngredient.category)) {
                score += 20;
            }
            if (rule.weighting.flavorProfiles?.includes(primaryIngredient.flavorProfile)) {
                score += 20;
            }

            // Smaller bonuses for other context matches.
            if (rule.weighting.styles?.includes(context.cookingStyle.name)) score += 10;
            if (rule.weighting.themes?.includes(context.theme)) score += 15;

            return { rule, score };
        });

        // Pick from the top 3 highest-scoring options to maintain some variety.
        scoredDescriptions.sort((a, b) => b.score - a.score);
        const topTier = scoredDescriptions.slice(0, 3);
        const selected = topTier[Math.floor(Math.random() * topTier.length)];
        
        return selected.rule.text(context);
    }
} 