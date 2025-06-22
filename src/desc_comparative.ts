/**
 * Comparative Descriptions Module
 * 
 * This module adds a new flavor to descriptions by comparing the dish's taste 
 * or texture to a more abstract or sensory concept, making them more evocative.
 */

import { DescriptionRule } from './types';

export const comparativeDescriptions: DescriptionRule[] = [
  {
    id: 'comp_like_first_snow_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `The texture is surprisingly light, like the first snowfall of winter—it is clean, crisp, and melts away almost instantly on the tongue. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, creates a feeling of pure tranquility that lingers long after the last bite.`;
    },
    weighting: { nations: ['water-tribe'], styles: ['Freezing', 'Poaching'] },
  },
  {
    id: 'comp_like_warm_earth_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `Eating this dish is like the feeling of warm earth after a summer rain. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, creates something that is comforting, deeply savory, and feels fundamentally grounding to the spirit.`;
    },
    weighting: { nations: ['earth-kingdom'], categories: ['base', 'vegetable'], styles: ['Roasting', 'Braising', 'Simmering'] },
  },
  {
    id: 'comp_like_summer_breeze_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `The flavor is like a warm summer breeze through a mountain temple; it's gentle, carries the subtle fragrance of ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}. ${styleDesc} This leaves you feeling lighter than before, as if touched by the wind itself.`;
    },
    weighting: { nations: ['air-nomads'], flavorProfiles: ['sweet', 'neutral'] },
  },
  {
    id: 'comp_like_a_spark_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `The taste is not a slow burn, but a sudden, delightful spark. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, delivers a sharp jolt of ${ctx.primaryIngredient.flavorProfile} flavor that instantly sharpens the mind and invigorates the body.`;
    },
    weighting: { nations: ['fire-nation'], flavorProfiles: ['pungent'] },
  },
  {
    id: 'comp_like_a_busy_market_enhanced',
    text: (ctx) => {
      const primaryDesc = ctx.primaryIngredient.description.toLowerCase();
      const secondaryDesc = ctx.secondaryIngredient.description.toLowerCase();
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      
      return `This fusion dish tastes like a walk through a Republic City market. Every bite is different—a hint of ${ctx.primaryIngredient.name.toLowerCase()}, ${primaryDesc}, here, a touch of ${ctx.secondaryIngredient.name.toLowerCase()}, ${secondaryDesc}, there. ${styleDesc} It is chaotic, but wonderfully so, a celebration of diversity and unity.`;
    },
    weighting: { fusion: true, minNations: 2, minIngredients: 4 },
  },
  {
    id: 'comp_like_morning_dew_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `The dish is as refreshing as morning dew on fresh leaves. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, brings a burst of pure, clean flavor that awakens the senses like the first light of dawn.`;
    },
    weighting: { nations: ['air-nomads'], flavorProfiles: ['sweet', 'neutral'], themes: ['Humble & Meditative'] },
  },
  {
    id: 'comp_like_forge_heat_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `The heat builds like a blacksmith's forge—steady, intense, and purposeful. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, doesn't just burn; it transforms, bringing out depths of flavor that only fire can reveal.`;
    },
    weighting: { nations: ['fire-nation'], styles: ['Roasting', 'Grilling'], flavorProfiles: ['pungent'] },
  },
  {
    id: 'comp_like_ocean_depths_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `The flavor has the depth and complexity of the ocean itself—layers upon layers of taste that reveal themselves slowly. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, creates secrets from the deep that unfold with each bite.`;
    },
    weighting: { nations: ['water-tribe'], categories: ['protein'], styles: ['Stewing', 'Poaching'] },
  },
  {
    id: 'comp_like_ancient_stone_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `The texture is as solid and reliable as ancient stone, yet surprisingly tender. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, carries the weight of tradition and the comfort of something that has stood the test of time.`;
    },
    weighting: { nations: ['earth-kingdom'], categories: ['base'], styles: ['Braising', 'Simmering'] },
  },
  {
    id: 'comp_like_spirit_world_enhanced',
    text: (ctx) => {
      const primaryDesc = ctx.primaryIngredient.description.toLowerCase();
      const secondaryDesc = ctx.secondaryIngredient.description.toLowerCase();
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      
      return `Eating this dish is like catching a glimpse of the Spirit World—ethereal, otherworldly, and impossible to fully describe. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${primaryDesc}, and ${ctx.secondaryIngredient.name.toLowerCase()}, ${secondaryDesc}, create flavors that seem to exist in a realm beyond ordinary taste.`;
    },
    weighting: { fusion: true, minNations: 3, themes: ['Ancient & Traditional'] },
  },
  
  // --- NEW: Enhanced comparative descriptions ---
  {
    id: 'comp_like_ingredient_essence',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      const rarityText = ctx.primaryIngredient.rarity === 'Legendary' ? 'legendary' : ctx.primaryIngredient.rarity.toLowerCase();
      
      return `The flavor is like capturing the very essence of the ${ctx.primaryIngredient.name.toLowerCase()}. ${styleDesc} This ${rarityText} ingredient, ${ingredientDesc}, is transformed into something that tastes like the purest expression of its nature, as if you're tasting the ingredient for the first time.`;
    },
    weighting: { minIngredients: 1 },
  },
  
  {
    id: 'comp_like_nation_landscape',
    text: (ctx) => {
      const nation = ctx.fusionData.selectedNations[0];
      const landscape = getNationLandscape(nation);
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      
      return `Eating this dish is like experiencing the landscape of ${nation.split('-')[0]}. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, evokes ${landscape}, creating a taste that transports you to another place entirely.`;
    },
    weighting: { minIngredients: 1 },
  },
  
  {
    id: 'comp_like_synergy_harmony',
    text: (ctx) => {
      const synergyScore = ctx.primaryIngredient.synergies?.[ctx.secondaryIngredient.name] || 0;
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      
      if (synergyScore > 7) {
        return `The flavor is like a perfectly orchestrated symphony—every note in perfect harmony. ${styleDesc} The legendary synergy between ${ctx.primaryIngredient.name.toLowerCase()} and ${ctx.secondaryIngredient.name.toLowerCase()} creates something that is greater than the sum of its parts, like two voices becoming one.`;
      } else {
        return `The flavor is like a dance between two partners—sometimes leading, sometimes following, but always moving together. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()} and ${ctx.secondaryIngredient.name.toLowerCase()} create a rhythm that is both surprising and satisfying.`;
      }
    },
    weighting: { minIngredients: 2 },
  },
];

// Helper function to get nation-specific landscape descriptions
function getNationLandscape(nation: string): string {
    switch (nation) {
        case 'air-nomads':
            return 'the crisp mountain air and floating temples';
        case 'water-tribe':
            return 'the vast, frozen tundra and endless ocean';
        case 'earth-kingdom':
            return 'the rolling hills and ancient forests';
        case 'fire-nation':
            return 'the volcanic islands and scorching deserts';
        default:
            return 'distant, exotic lands';
    }
} 