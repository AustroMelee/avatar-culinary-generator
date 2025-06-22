import { DishContext, NamingRule, Rarity, Nation } from './types';
import { isRuleCompatible } from './validation';
import { historicalNames } from './name_historical';
import { conceptualNames } from './name_conceptual';
import { descriptiveNames } from './name_descriptive';
import { characterInspiredNames } from './name_character_inspired';
import { poeticNames } from './name_poetic';
import { eponymousNames } from './name_eponymous';

export class FusionNameEngine {
    private namebook: NamingRule[];
    private recentlyUsedNames: string[] = []; // Track recently used name IDs
    private readonly MAX_RECENT_HISTORY = 8; // How many recent entries to remember

    constructor() {
        this.namebook = [
            ...historicalNames, 
            ...conceptualNames, 
            ...descriptiveNames,
            ...characterInspiredNames,
            ...poeticNames,
            ...eponymousNames
        ];
    }

    public getName(context: DishContext): string {
        // --- UPGRADED LOGIC WITH REPEAT PREVENTION ---
        const compatibleNames = this.namebook
            .filter(rule => isRuleCompatible(rule.weighting, context)); // Use the global validator

        if (compatibleNames.length === 0) {
            return "Cross-Cultural Medley";
        }

        // --- ENHANCED SCORING WITH REPEAT PREVENTION ---
        const scoredNames = compatibleNames.map(rule => {
            let score = 1;
            const { weighting } = rule;
            
            // Prioritize highly specific rules
            if (weighting.nations && weighting.nations.every(n => context.fusionData.selectedNations.includes(n))) score += 20;
            if (weighting.dishTypes?.includes(context.dishType)) score += 8;
            if (weighting.ingredients?.includes(context.primaryIngredient.name)) score += 15;
            if (weighting.themes?.includes(context.theme)) score += 8;

            // --- REPEAT PREVENTION LOGIC ---
            // Heavy penalty for recently used names
            if (this.recentlyUsedNames.includes(rule.id)) {
                score -= 80; // Massive penalty for recent use
            }

            // Bonus for names that haven't been used recently
            const recentUseCount = this.recentlyUsedNames.filter(id => id === rule.id).length;
            if (recentUseCount === 0) {
                score += 25; // Bonus for fresh names
            } else {
                score -= (recentUseCount * 40); // Increasing penalty for multiple recent uses
            }
            
            return { rule, score };
        });

        // Sort by score and create tiers for better variety
        scoredNames.sort((a, b) => b.score - a.score);
        
        // Create multiple tiers for better variety
        const topTier = scoredNames.slice(0, 3); // Top 3 highest scoring
        const midTier = scoredNames.slice(3, 6); // Next 3 entries
        const allTier = scoredNames.slice(0, 10); // All entries for fallback

        let selectedRule;
        
        // 50% chance to pick from top tier, 35% from mid tier, 15% from all entries
        const random = Math.random();
        if (random < 0.5 && topTier.length > 0) {
            selectedRule = topTier[Math.floor(Math.random() * topTier.length)];
        } else if (random < 0.85 && midTier.length > 0) {
            selectedRule = midTier[Math.floor(Math.random() * midTier.length)];
        } else {
            selectedRule = allTier[Math.floor(Math.random() * allTier.length)];
        }

        // Track this name as recently used
        this.recentlyUsedNames.push(selectedRule.rule.id);
        
        // Keep only the most recent entries in history
        if (this.recentlyUsedNames.length > this.MAX_RECENT_HISTORY) {
            this.recentlyUsedNames = this.recentlyUsedNames.slice(-this.MAX_RECENT_HISTORY);
        }

        return selectedRule.rule.title(context);
    }
} 