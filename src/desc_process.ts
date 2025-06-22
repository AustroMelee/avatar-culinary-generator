import { DescriptionRule } from './types';

export const processDescriptions: DescriptionRule[] = [
  {
    id: 'process_slow_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `Patience is the key ingredient. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, is simmered for hours over a low, steady heat, allowing it to become impossibly tender and absorb every drop of the flavorful broth.`;
    },
    weighting: { styles: ['Stewing', 'Braising', 'Simmering'], compatibleForms: ['stew', 'congee'] },
  },
  {
    id: 'process_fast_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      return `This dish is a testament to speed and precision. ${styleDesc} A searingly hot wok, a splash of oil, and the ${ctx.primaryIngredient.name.toLowerCase()} is tossed for mere moments, locking in its vibrant color and crisp texture.`;
    },
    weighting: { styles: ['Wok-frying', 'Light Sauté'] },
  },
  {
    id: 'process_fire_control_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `The mark of a master chef is their control of the flame. ${styleDesc} The coals must be just hot enough to char the outside of the ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, creating a smoky crust while leaving the inside perfectly tender and juicy.`;
    },
    weighting: { styles: ['Grilling', 'Roasting'], nations: ['fire-nation'], compatibleForms: ['roast', 'skewer'] },
  },
  {
    id: 'process_no_cook_enhanced',
    text: (ctx) => {
      const primaryDesc = ctx.primaryIngredient.description.toLowerCase();
      const secondaryDesc = ctx.secondaryIngredient.description.toLowerCase();
      return `The philosophy here is one of minimal interference. The finest ${ctx.primaryIngredient.name.toLowerCase()}, ${primaryDesc}, and freshest ${ctx.secondaryIngredient.name.toLowerCase()}, ${secondaryDesc}, are simply assembled, dressed lightly, and served. The quality of the ingredients speaks for itself.`;
    },
    weighting: { styles: ['Minimalist Assembly'], compatibleForms: ['salad', 'plated'] },
  },
  {
    id: 'process_waterbending_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `A unique technique involving waterbending is used to flash-freeze the ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}. ${styleDesc} This creates microscopic ice crystals for an impossibly smooth texture that melts on the tongue.`;
    },
    weighting: { styles: ['Freezing'], nations: ['water-tribe'], compatibleForms: ['plated'] },
  },
  {
    id: 'process_airbending_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `Airbending is used to ensure perfectly even cooking. ${styleDesc} A gentle, circulating current of air flows through the stone oven, resulting in a bake that is flawlessly golden-brown on all sides, perfectly showcasing the ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}.`;
    },
    weighting: { styles: ['Baking', 'Piemaking'], nations: ['air-nomads'], compatibleForms: ['handheld', 'pie'] },
  },
  
  // --- NEW: Enhanced process descriptions ---
  {
    id: 'process_ingredient_transformation',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      const suitability = ctx.primaryIngredient.suitability.join(' and ');
      
      return `The key to this dish is how ${styleDesc} transforms the ${ctx.primaryIngredient.name.toLowerCase()}. ${ingredientDesc} This ingredient is particularly well-suited for ${suitability}, and the careful cooking process ensures its unique character remains the star.`;
    },
    weighting: { minIngredients: 1 },
  },
  
  {
    id: 'process_nation_technique',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      const nationPhilosophy = getNationPhilosophy(ctx.fusionData.selectedNations[0]);
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      
      return `${styleDesc} ${nationPhilosophy} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, is prepared with the wisdom of generations, resulting in a dish that honors both tradition and innovation.`;
    },
    weighting: { minIngredients: 1 },
  },
  
  {
    id: 'process_synergy_creation',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      const synergyScore = ctx.primaryIngredient.synergies?.[ctx.secondaryIngredient.name] || 0;
      
      if (synergyScore > 7) {
        return `${styleDesc} The legendary synergy between ${ctx.primaryIngredient.name.toLowerCase()} and ${ctx.secondaryIngredient.name.toLowerCase()} is carefully nurtured through this cooking process, creating a dish where each ingredient elevates the other to new heights.`;
      } else {
        return `${styleDesc} The careful balance between ${ctx.primaryIngredient.name.toLowerCase()} and ${ctx.secondaryIngredient.name.toLowerCase()} is achieved through precise timing and temperature control, ensuring both ingredients shine in their own right.`;
      }
    },
    weighting: { minIngredients: 2 },
  },
];

// Helper function to get nation-specific philosophy
function getNationPhilosophy(nation: string): string {
    switch (nation) {
        case 'air-nomads':
            return 'This technique embodies the Air Nomad principle of detachment and freedom, allowing ingredients to express their natural essence.';
        case 'water-tribe':
            return 'This method reflects the Water Tribe\'s adaptability and flow, working with the natural properties of each ingredient.';
        case 'earth-kingdom':
            return 'This approach honors the Earth Kingdom\'s connection to the land and tradition, creating dishes that are both nourishing and grounding.';
        case 'fire-nation':
            return 'This technique demonstrates the Fire Nation\'s mastery of heat and control, transforming ingredients through the respectful application of power.';
        default:
            return 'This method combines the best techniques from across the four nations, creating something truly unique.';
    }
} 