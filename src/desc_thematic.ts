import { DescriptionRule } from './types';

export const thematicDescriptions: DescriptionRule[] = [
  {
    id: 'theme_ceremonial_enhanced',
    text: (ctx) => {
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      const rarityText = ctx.primaryIngredient.rarity === 'Legendary' ? 'legendary' : ctx.primaryIngredient.rarity.toLowerCase();
      return `This is more than a meal; it's a centerpiece. The ${rarityText} ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, is prepared for festivals and ceremonies. Its presentation is as important as its taste, designed to be shared and admired by all who gather.`;
    },
    weighting: { themes: ['Ceremonial & Celebratory'] },
  },
  {
    id: 'theme_humble_enhanced',
    text: (ctx) => {
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      const nationPhilosophy = getNationPhilosophy(ctx.fusionData.selectedNations[0]);
      return `A truly humble dish, born from the principle that simple food, prepared with care and intention, can be more satisfying than the most elaborate feast. The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, ${nationPhilosophy.toLowerCase()}`;
    },
    weighting: { themes: ['Humble & Meditative'], minRarity: 'Common' },
  },
  {
    id: 'theme_warrior_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `This is fuel for a warrior. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, creates a dense, high-energy meal designed to provide the strength and stamina needed for rigorous training or a long march.`;
    },
    weighting: { nations: ['fire-nation', 'water-tribe'], categories: ['protein'] },
  },
  {
    id: 'theme_traveler_enhanced',
    text: (ctx) => {
      const locationDesc = ctx.primaryIngredient.location === 'Generic' ? 'distant lands' : `${ctx.primaryIngredient.location.toLowerCase()}`;
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `A traveler's best friend. The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, is easily preserved and can be cooked over an open flame with minimal fuss, providing a taste of ${locationDesc} no matter how far one has journeyed.`;
    },
    weighting: { dishTypes: ['snack'], styles: ['Curing', 'Grilling'] },
  },
  {
    id: 'theme_artisan_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `The creation of this dish is considered an art form. ${styleDesc} The precise preparation of the ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, and the delicate balance of flavors are the marks of a true culinary artist.`;
    },
    weighting: { minRarity: 'Rare', styles: ['Dumpling Making', 'Minimalist Assembly'] },
  },
  {
    id: 'theme_fusion_enhanced',
    text: (ctx) => {
      const primaryDesc = ctx.primaryIngredient.description.toLowerCase();
      const secondaryDesc = ctx.secondaryIngredient.description.toLowerCase();
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      
      return `This dish represents the exciting future of global cuisine. It bravely combines the ${ctx.primaryIngredient.flavorProfile} notes of ${ctx.primaryIngredient.name.toLowerCase()}, ${primaryDesc}, with the ${ctx.secondaryIngredient.name.toLowerCase()}, ${secondaryDesc}. ${styleDesc} This creates a bold and unforgettable new experience that honors multiple culinary traditions.`;
    },
    weighting: { fusion: true, minNations: 2 },
  },
  
  // --- NEW: Enhanced thematic descriptions ---
  {
    id: 'theme_nation_heritage',
    text: (ctx) => {
      const nationPhilosophy = getNationPhilosophy(ctx.fusionData.selectedNations[0]);
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      const locationDesc = ctx.primaryIngredient.location === 'Generic' ? 'the heart of the nation' : `${ctx.primaryIngredient.location.toLowerCase()}`;
      
      return `${nationPhilosophy} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, hails from ${locationDesc} and carries with it the wisdom and traditions of generations past. This dish honors that heritage while embracing the present moment.`;
    },
    weighting: { minIngredients: 1 },
  },
  
  {
    id: 'theme_seasonal_celebration',
    text: (ctx) => {
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      const suitability = ctx.primaryIngredient.suitability.join(' and ');
      return `This dish celebrates the bounty of the season. The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, is at its peak of flavor and is particularly well-suited for ${suitability}. This creates a dish that captures the essence of the moment and the joy of seasonal abundance.`;
    },
    weighting: { minIngredients: 1 },
  },
  
  {
    id: 'theme_community_gathering',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, is prepared in quantities large enough to feed a community. This dish is meant to be shared, bringing people together around the table to celebrate friendship, family, and the simple joy of good food.`;
    },
    weighting: { compatibleForms: ['stew', 'congee', 'roast'] },
  },
];

// Helper function to get nation-specific philosophy
function getNationPhilosophy(nation: string): string {
    switch (nation) {
        case 'air-nomads':
            return 'This dish embodies the Air Nomad principle of detachment and freedom';
        case 'water-tribe':
            return 'This dish reflects the Water Tribe\'s adaptability and flow';
        case 'earth-kingdom':
            return 'This dish honors the Earth Kingdom\'s connection to the land and tradition';
        case 'fire-nation':
            return 'This dish demonstrates the Fire Nation\'s mastery of heat and control';
        default:
            return 'This dish combines the best traditions from across the four nations';
    }
} 