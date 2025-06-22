import { DishContext, Rarity, NamingRule, DescriptionRule } from './types';

// The master list of all possible weighting properties.
type Weighting = NamingRule['weighting'] | DescriptionRule['weighting'];
const RARITY_SCORE: Record<Rarity, number> = { 'Common': 1, 'Uncommon': 2, 'Rare': 3, 'Legendary': 4 };

/**
 * Checks if a rule is strictly compatible with the current dish context.
 * Returns `true` if compatible, `false` otherwise.
 */
export function isRuleCompatible(weighting: Weighting, context: DishContext): boolean {
    const { fusionData, primaryIngredient, cookingStyle, dishType, allIngredients, theme } = context;

    // --- STRICT VALIDATION CHECKS ---

    // If a rule specifies compatible dish types, the dish MUST be one of them.
    if ('dishTypes' in weighting && weighting.dishTypes && !weighting.dishTypes.includes(dishType)) {
        return false;
    }
    // If a rule specifies compatible cooking styles, the dish MUST use one of them.
    if ('styles' in weighting && weighting.styles && !weighting.styles.includes(cookingStyle.name)) {
        return false;
    }
    // If a rule specifies compatible dish forms, the dish MUST have that form.
    if ('compatibleForms' in weighting && weighting.compatibleForms && !weighting.compatibleForms.includes(cookingStyle.form)) {
        return false;
    }
    // If a rule specifies compatible themes, the dish MUST have that theme.
    if ('themes' in weighting && weighting.themes && !weighting.themes.includes(theme)) {
        return false;
    }

    // --- NATION AND FUSION CHECKS ---
    if ('fusion' in weighting && weighting.fusion && fusionData.selectedNations.length < 2) return false;
    if ('nations' in weighting && weighting.nations && Array.isArray(weighting.nations)) {
        if (!weighting.nations.every(n => fusionData.selectedNations.includes(n))) {
            return false;
        }
    }
    if ('nations' in weighting && weighting.nations && typeof weighting.nations === 'object' && !Array.isArray(weighting.nations)) {
        if (!fusionData.selectedNations.some(n => weighting.nations![n])) {
            return false;
        }
    }
    
    // --- COUNT-BASED CHECKS ---
    if ('minNations' in weighting && weighting.minNations && fusionData.selectedNations.length < weighting.minNations) return false;
    if ('maxNations' in weighting && weighting.maxNations && fusionData.selectedNations.length > weighting.maxNations) return false;
    if ('minIngredients' in weighting && weighting.minIngredients && allIngredients.length < weighting.minIngredients) return false;
    if ('maxIngredients' in weighting && weighting.maxIngredients && allIngredients.length > weighting.maxIngredients) return false;

    // --- RARITY CHECK ---
    const maxRarity = Math.max(...allIngredients.map(i => RARITY_SCORE[i.rarity]));
    if ('minRarity' in weighting && weighting.minRarity && maxRarity < RARITY_SCORE[weighting.minRarity]) {
        return false;
    }

    // --- NO MEAT CHECK ---
    if ('noMeat' in weighting && weighting.noMeat) {
        const hasMeat = allIngredients.some(i => i.category === 'protein' && i.flavorProfile !== 'neutral');
        if (hasMeat) {
            return false;
        }
    }

    return true; // If it passes all checks, it's compatible.
} 