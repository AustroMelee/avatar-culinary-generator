import { DescriptionRule } from './types';

export const sensoryDescriptions: DescriptionRule[] = [
  // --- Aroma ---
  {
    id: 'aroma_spicy_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      return `The first impression is the aroma: a sharp, invigorating wave of ${ctx.primaryIngredient.flavorProfile} spice from the ${ctx.primaryIngredient.name.toLowerCase()}. ${styleDesc} This creates a scent that promises to awaken the senses and test one's mettle.`;
    },
    weighting: { flavorProfiles: ['pungent'], nations: ['fire-nation'] },
  },
  {
    id: 'aroma_herbal_enhanced',
    text: (ctx) => {
      const locationDesc = ctx.primaryIngredient.location === 'Generic' ? 'open plains and sun-warmed fields' : `${ctx.primaryIngredient.location.toLowerCase()}`;
      return `A calming, herbal fragrance rises from the bowl, a scent of fresh ${ctx.primaryIngredient.name.toLowerCase()} that speaks of ${locationDesc}. ${ctx.primaryIngredient.description} This aroma promises a dish that connects diners to the natural world.`;
    },
    weighting: { categories: ['vegetable'], nations: ['earth-kingdom', 'air-nomads'], compatibleForms: ['stew', 'congee', 'plated'] },
  },
  {
    id: 'aroma_savory_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      return `The rich, savory scent of ${ctx.cookingStyle.name.toLowerCase()} ${ctx.primaryIngredient.name.toLowerCase()} is the definition of comfort. ${styleDesc} This creates a warm and welcoming aroma that promises a hearty, satisfying meal.`;
    },
    weighting: { flavorProfiles: ['umami', 'savory'], styles: ['Roasting', 'Stewing', 'Braising'] },
  },

  // --- Texture ---
  {
    id: 'texture_contrast_synergy',
    text: (ctx) => {
      const primaryAdj = getAdjectiveForIngredient(ctx.primaryIngredient);
      const secondaryAdj = getAdjectiveForIngredient(ctx.secondaryIngredient);
      const synergyScore = ctx.primaryIngredient.synergies?.[ctx.secondaryIngredient.name] || 0;
      const synergyText = synergyScore > 5 ? 'creating a perfectly balanced and harmonious whole' : 'creating an interesting contrast of flavors';
      
      return `The genius of this dish lies in its textural synergy. The ${primaryAdj} ${ctx.primaryIngredient.name.toLowerCase()} provides a perfect counterpoint to the ${secondaryAdj} bite of the ${ctx.secondaryIngredient.name.toLowerCase()}, ${synergyText}.`;
    },
    weighting: { fusion: true, minIngredients: 2 },
  },
  {
    id: 'texture_hearty_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      return `This is a meal of substance. ${styleDesc} Each bite offers a hearty, satisfying chew, a testament to the resilient ${ctx.primaryIngredient.name.toLowerCase()} and the patient cooking method that makes it so tender.`;
    },
    weighting: { nations: ['earth-kingdom', 'water-tribe'], categories: ['protein', 'base'] },
  },
  {
    id: 'texture_light_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      const nationPhilosophy = ctx.fusionData.selectedNations.includes('air-nomads') ? 'reflecting the Air Nomad principle of detachment' : 'creating a fleeting but memorable experience';
      
      return `An almost weightless dish, the texture of the ${ctx.primaryIngredient.name.toLowerCase()} is as light as air. ${styleDesc} This results in a delicate and ethereal experience on the palate, ${nationPhilosophy}.`;
    },
    weighting: { nations: ['air-nomads'], styles: ['Steaming', 'Minimalist Assembly'] },
  },

  // --- Flavor ---
  {
    id: 'flavor_complex_enhanced',
    text: (ctx) => {
      const primaryDesc = ctx.primaryIngredient.description.toLowerCase();
      const secondaryDesc = ctx.secondaryIngredient.description.toLowerCase();
      
      return `The flavor is a complex journey. It begins with the ${primaryDesc} of ${ctx.primaryIngredient.name.toLowerCase()}, builds to a peak of ${ctx.secondaryIngredient.flavorProfile} intensity from the ${ctx.secondaryIngredient.name.toLowerCase()}, and finishes with a clean, refreshing note that lingers on the palate.`;
    },
    weighting: { minIngredients: 3, minRarity: 'Uncommon' },
  },
  {
    id: 'flavor_simple_enhanced',
    text: (ctx) => {
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `Simplicity is the defining characteristic of this dish. There are no complex sauces or spices to hide behind. There is only the pure, honest, and delicious flavor of perfectly cooked ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}.`;
    },
    weighting: { themes: ['Humble & Meditative'], maxIngredients: 2 },
  },
  {
    id: 'flavor_sweet_enhanced',
    text: (ctx) => {
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `A delightful dessert, this dish is a celebration of natural sweetness. The pure flavor of ${ctx.primaryIngredient.name.toLowerCase()} is elevated, not masked. ${ingredientDesc} This creates a treat that is both satisfying and light.`;
    },
    weighting: { dishTypes: ['dessert'] },
  },
  
  // --- NEW: Ingredient-specific descriptions ---
  {
    id: 'flavor_ingredient_specific',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      return `The key to this dish is how ${styleDesc} transforms the ${ctx.primaryIngredient.name.toLowerCase()}. ${ctx.primaryIngredient.description} This careful process ensures its unique character remains the star of the dish.`;
    },
    weighting: { minIngredients: 1 }, // A generic but powerful template
  },
  
  // --- NEW: Synergy-focused descriptions ---
  {
    id: 'flavor_synergy_highlight',
    text: (ctx) => {
      const synergyScore = ctx.primaryIngredient.synergies?.[ctx.secondaryIngredient.name] || 0;
      if (synergyScore > 7) {
        return `The ${ctx.primaryIngredient.name.toLowerCase()} and ${ctx.secondaryIngredient.name.toLowerCase()} are legendary partners in this dish. Their natural synergy creates a flavor profile that is greater than the sum of its parts, a testament to generations of culinary wisdom.`;
      } else if (synergyScore > 3) {
        return `The ${ctx.primaryIngredient.name.toLowerCase()} and ${ctx.secondaryIngredient.name.toLowerCase()} complement each other beautifully in this dish. Their flavors dance together, creating a harmonious balance that delights the palate.`;
      } else {
        return `The ${ctx.primaryIngredient.name.toLowerCase()} and ${ctx.secondaryIngredient.name.toLowerCase()} create an interesting contrast in this dish. Their different characteristics work together to create a unique and memorable flavor experience.`;
      }
    },
    weighting: { minIngredients: 2 },
  },
];

// Enhanced helper function to get adjectives based on ingredient properties
function getAdjectiveForIngredient(ingredient: any): string {
    // Flavor-based adjectives
    if (ingredient.flavorProfile === 'pungent') return 'sharp';
    if (ingredient.flavorProfile === 'sweet') return 'delicate';
    if (ingredient.flavorProfile === 'umami') return 'rich';
    if (ingredient.flavorProfile === 'savory') return 'robust';
    
    // Category-based adjectives
    if (ingredient.category === 'vegetable') return 'crisp';
    if (ingredient.category === 'protein') return 'tender';
    if (ingredient.category === 'fruit') return 'juicy';
    if (ingredient.category === 'base') return 'substantial';
    if (ingredient.category === 'garnish') return 'bright';
    if (ingredient.category === 'dairy') return 'creamy';
    if (ingredient.category === 'fungi') return 'earthy';
    
    // Rarity-based adjectives
    if (ingredient.rarity === 'Legendary') return 'exquisite';
    if (ingredient.rarity === 'Rare') return 'precious';
    if (ingredient.rarity === 'Uncommon') return 'distinctive';
    
    return 'yielding';
} 