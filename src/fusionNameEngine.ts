import { DishContext, NamingRule, Rarity, Nation } from './types';
import { isRuleCompatible } from './validation';
import { historicalNames } from './name_historical';
import { conceptualNames } from './name_conceptual';
import { descriptiveNames } from './name_descriptive';
import { characterInspiredNames } from './name_character_inspired';

export class FusionNameEngine {
    private namebook: NamingRule[];

    constructor() {
        this.namebook = [
            ...historicalNames, 
            ...conceptualNames, 
            ...descriptiveNames,
            ...characterInspiredNames
        ];
    }

    public getName(context: DishContext): { title: string; flavorText: string } {
        // --- UPGRADED LOGIC ---
        const compatibleNames = this.namebook
            .filter(rule => isRuleCompatible(rule.weighting, context)); // Use the global validator

        if (compatibleNames.length === 0) {
            return { title: "Cross-Cultural Medley", flavorText: "A simple but tasty fusion." };
        }

        // --- NEW, SIMPLIFIED SCORING ---
        const scoredNames = compatibleNames.map(rule => {
            let score = 1;
            const { weighting } = rule;
            
            // Prioritize highly specific rules
            if (weighting.nations && weighting.nations.every(n => context.fusionData.selectedNations.includes(n))) score += 20;
            if (weighting.dishTypes?.includes(context.dishType)) score += 8;
            if (weighting.ingredients?.includes(context.primaryIngredient.name)) score += 15;
            if (weighting.themes?.includes(context.theme)) score += 8;
            
            return { rule, score };
        });

        // Weighted Random Selection
        const totalScore = scoredNames.reduce((sum, item) => sum + item.score, 0);
        let randomPoint = Math.random() * totalScore;
        for (const item of scoredNames) {
            randomPoint -= item.score;
            if (randomPoint <= 0) {
                return { 
                    title: item.rule.title(context),
                    flavorText: item.rule.text
                };
            }
        }
        
        const fallbackRule = scoredNames[scoredNames.length - 1].rule;
        return { 
            title: fallbackRule.title(context),
            flavorText: fallbackRule.text
        }; // Fallback
    }
} 