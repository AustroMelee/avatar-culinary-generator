import { DishContext, DescriptionRule, Rarity, FlavorProfile, IngredientCategory, DishTheme } from './types';
import { isRuleCompatible } from './validation';
import { sensoryDescriptions } from './desc_sensory';
import { processDescriptions } from './desc_process';
import { thematicDescriptions } from './desc_thematic';
import { comparativeDescriptions } from './desc_comparative';
import { emotionalDescriptions } from './desc_emotional';

export class DescriptionEngine {
    private descriptionbook: DescriptionRule[];
    // --- NEW: Short-term memory to prevent repeats ---
    private recentlyUsedRuleIds: string[] = [];
    private readonly MAX_HISTORY = 10; // Remember the last 10 used rule IDs

    constructor() {
        this.descriptionbook = [
            ...sensoryDescriptions,
            ...processDescriptions,
            ...thematicDescriptions,
            ...comparativeDescriptions,
            ...emotionalDescriptions
        ];
    }

    private addToHistory(ruleId: string): void {
        this.recentlyUsedRuleIds.push(ruleId);
        if (this.recentlyUsedRuleIds.length > this.MAX_HISTORY) {
            this.recentlyUsedRuleIds.shift(); // Keep history size limited
        }
    }

    public getDescription(context: DishContext): string {
        const { primaryIngredient, cookingStyle, theme, allIngredients } = context;

        // 1. Filter for rules that are strictly compatible
        const compatibleRules = this.descriptionbook
            .filter(rule => isRuleCompatible(rule.weighting, context));

        if (compatibleRules.length === 0) {
            return `A simple and satisfying dish, notable for its use of ${primaryIngredient.name.toLowerCase()}.`;
        }

        // 2. Score each compatible rule based on relevance
        const scoredRules = compatibleRules.map(rule => {
            let score = 1.0; // Base score

            // --- CONTEXTUAL BONUSES ---
            // Huge bonus if the rule's weighting specifically matches the primary context
            if (rule.weighting.categories?.includes(primaryIngredient.category)) score += 20;
            if (rule.weighting.flavorProfiles?.includes(primaryIngredient.flavorProfile)) score += 20;
            if (rule.weighting.styles?.includes(cookingStyle.name)) score += 15;
            if (rule.weighting.themes?.includes(theme)) score += 15;
            
            // Bonus for rarity matches
            if (rule.weighting.minRarity) {
                const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Legendary'];
                const ruleRarityIndex = rarityOrder.indexOf(rule.weighting.minRarity);
                const ingredientRarityIndex = rarityOrder.indexOf(primaryIngredient.rarity);
                if (ingredientRarityIndex >= ruleRarityIndex) {
                    score += 10; // Bonus for matching or exceeding rarity requirements
                }
            }

            // Bonus for ingredient count matches
            if (rule.weighting.minIngredients && allIngredients.length >= rule.weighting.minIngredients) {
                score += 8;
            }
            if (rule.weighting.maxIngredients && allIngredients.length <= rule.weighting.maxIngredients) {
                score += 8;
            }

            // --- NATION-SPECIFIC BONUSES ---
            if (rule.weighting.nations?.includes(primaryIngredient.nation)) {
                score += 25; // High bonus for nation match
            }

            // --- FUSION BONUSES ---
            if (rule.weighting.fusion && context.fusionData.selectedNations.length > 1) {
                score += 20;
            }
            if (rule.weighting.minNations && context.fusionData.selectedNations.length >= rule.weighting.minNations) {
                score += 15;
            }

            // --- SYNERGY BONUSES ---
            // Check if the rule mentions synergies and we have good synergy data
            if (context.secondaryIngredient && primaryIngredient.synergies?.[context.secondaryIngredient.name]) {
                const synergyScore = primaryIngredient.synergies[context.secondaryIngredient.name];
                if (synergyScore > 5) {
                    score += 15; // Bonus for high synergy combinations
                }
            }

            // --- REPEAT PREVENTION ---
            // Heavy penalty if this rule ID was used recently
            if (this.recentlyUsedRuleIds.includes(rule.id)) {
                score *= 0.1; // Reduce score by 90% to heavily discourage reuse
            }

            // Additional penalty for multiple recent uses
            const recentUseCount = this.recentlyUsedRuleIds.filter(id => id === rule.id).length;
            if (recentUseCount > 0) {
                score *= Math.pow(0.5, recentUseCount); // Exponential penalty for multiple uses
            }

            return { rule, score };
        });

        // 3. Sort by score in descending order
        scoredRules.sort((a, b) => b.score - a.score);

        // 4. Use "Tiered Randomness" to select the final rule
        // This prevents the same top-scoring rule from being chosen every time.
        const topTier = scoredRules.slice(0, 3); // The 3 best matches
        const midTier = scoredRules.slice(3, 8); // The next 5 good matches

        let chosenRuleContainer;
        const rand = Math.random();

        if (rand < 0.6 && topTier.length > 0) {
            // 60% chance to pick from the absolute best
            chosenRuleContainer = topTier[Math.floor(Math.random() * topTier.length)];
        } else if (rand < 0.9 && midTier.length > 0) {
            // 30% chance to pick from the next best
            chosenRuleContainer = midTier[Math.floor(Math.random() * midTier.length)];
        } else {
            // 10% chance to pick from any of the top scored rules as a fallback
            chosenRuleContainer = scoredRules[Math.floor(Math.random() * Math.min(scoredRules.length, 10))];
        }
        
        // Failsafe if something went wrong
        if (!chosenRuleContainer) {
            chosenRuleContainer = scoredRules[0];
        }

        // 5. Generate text, add to history, and return
        const finalRule = chosenRuleContainer.rule;
        this.addToHistory(finalRule.id); // Add the chosen rule's ID to our memory
        
        return finalRule.text(context);
    }
} 