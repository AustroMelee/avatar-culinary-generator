import { DescriptionRule } from './types';

export const sensoryDescriptions: DescriptionRule[] = [
  // --- Aroma ---
  {
    id: 'aroma_spicy',
    text: (ctx) => `The first impression is the aroma: a sharp, invigorating wave of ${ctx.primaryIngredient.flavorProfile} spice from the ${ctx.primaryIngredient.name.toLowerCase()}, promising a dish that will awaken the senses.`,
    weighting: { flavorProfiles: ['pungent'], nations: ['fire-nation'] },
  },
  {
    id: 'aroma_herbal',
    text: (ctx) => `A calming, herbal fragrance rises from the bowl, a scent of fresh ${ctx.primaryIngredient.name.toLowerCase()} that speaks of open plains and sun-warmed fields.`,
    weighting: { categories: ['vegetable'], nations: ['earth-kingdom', 'air-nomads'], compatibleForms: ['stew', 'congee', 'plated'] },
  },
  {
    id: 'aroma_savory',
    text: (ctx) => `The rich, savory scent of ${ctx.cookingStyle.name.toLowerCase()} ${ctx.primaryIngredient.name.toLowerCase()} is the definition of comfort, a warm and welcoming aroma that promises a hearty, satisfying meal.`,
    weighting: { flavorProfiles: ['umami', 'savory'], styles: ['Roasting', 'Stewing', 'Braising'] },
  },

  // --- Texture ---
  {
    id: 'texture_contrast',
    text: (ctx) => `The genius of this dish lies in its textural contrast. The yielding tenderness of the ${getAdjective(ctx.primaryIngredient, ctx)} ${ctx.primaryIngredient.name.toLowerCase()} gives way to the satisfying, crisp bite of ${ctx.secondaryIngredient.name.toLowerCase()}.`,
    weighting: { fusion: true, minIngredients: 2 },
  },
  {
    id: 'texture_hearty',
    text: (ctx) => `This is a meal of substance. Each bite offers a hearty, satisfying chew, a testament to the resilient ingredients and the patient cooking method that makes them so tender.`,
    weighting: { nations: ['earth-kingdom', 'water-tribe'], categories: ['protein', 'base'] },
  },
  {
    id: 'texture_light',
    text: (ctx) => `An almost weightless dish, the texture is as light as air. The ingredients are prepared to be delicate and ethereal on the palate, a fleeting but memorable experience.`,
    weighting: { nations: ['air-nomads'], styles: ['Steaming', 'Minimalist Assembly'] },
  },

  // --- Flavor ---
  {
    id: 'flavor_complex',
    text: (ctx) => `The flavor is a complex journey. It begins with the earthy base of ${ctx.primaryIngredient.name.toLowerCase()}, builds to a peak of ${ctx.secondaryIngredient.flavorProfile} intensity, and finishes with a clean, refreshing note.`,
    weighting: { minIngredients: 3, minRarity: 'Uncommon' },
  },
  {
    id: 'flavor_simple',
    text: (ctx) => `Simplicity is the defining characteristic of this dish. There are no complex sauces or spices to hide behind. There is only the pure, honest, and delicious flavor of perfectly cooked ${ctx.primaryIngredient.name.toLowerCase()}.`,
    weighting: { themes: ['Humble & Meditative'], maxIngredients: 2 },
  },
  {
    id: 'flavor_sweet',
    text: (ctx) => `A delightful dessert, this dish is a celebration of natural sweetness. The pure flavor of ${ctx.primaryIngredient.name.toLowerCase()} is elevated, not masked, creating a treat that is both satisfying and light.`,
    weighting: { dishTypes: ['dessert'] },
  },
];

// Helper function to be used in modules
const getAdjective = (ingredient: any, context: any): string => {
    // A simplified placeholder. Your real getAdjective function is in grammar.ts
    return "tender";
}; 