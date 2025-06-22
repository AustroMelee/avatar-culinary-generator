import { DescriptionRule } from './types';

export const processDescriptions: DescriptionRule[] = [
  {
    id: 'process_slow',
    text: (ctx) => `Patience is the key ingredient. The ${ctx.primaryIngredient.name.toLowerCase()} is simmered for hours over a low, steady heat, allowing it to become impossibly tender and absorb every drop of the flavorful broth.`,
    weighting: { styles: ['Stewing', 'Braising', 'Congee Making'], compatibleForms: ['stew', 'congee'] },
  },
  {
    id: 'process_fast',
    text: (ctx) => `This dish is a testament to speed and precision. A searingly hot wok, a splash of oil, and the ingredients are tossed for mere moments, locking in their vibrant color and crisp texture.`,
    weighting: { styles: ['Wok-frying', 'Light Sauté'] },
  },
  {
    id: 'process_fire_control',
    text: (ctx) => `The mark of a master chef is their control of the flame. The coals must be just hot enough to char the outside of the ${ctx.primaryIngredient.name.toLowerCase()}, creating a smoky crust while leaving the inside perfectly tender and juicy.`,
    weighting: { styles: ['Grilling', 'Roasting'], nations: ['fire-nation'], compatibleForms: ['roast', 'skewer'] },
  },
  {
    id: 'process_no_cook',
    text: (ctx) => `The philosophy here is one of minimal interference. The finest ${ctx.primaryIngredient.name.toLowerCase()} and freshest ${ctx.secondaryIngredient.name.toLowerCase()} are simply assembled, dressed lightly, and served. The quality of the ingredients speaks for itself.`,
    weighting: { styles: ['Minimalist Assembly'], compatibleForms: ['salad', 'plated'] },
  },
  {
    id: 'process_waterbending',
    text: (ctx) => `A unique technique involving waterbending is used to flash-freeze the ${ctx.primaryIngredient.name.toLowerCase()} and sweetened cream, creating microscopic ice crystals for an impossibly smooth texture that melts on the tongue.`,
    weighting: { styles: ['Freezing'], nations: ['water-tribe'], compatibleForms: ['plated'] },
  },
  {
    id: 'process_airbending',
    text: (ctx) => `Airbending is used to ensure perfectly even cooking. A gentle, circulating current of air flows through the stone oven, resulting in a bake that is flawlessly golden-brown on all sides.`,
    weighting: { styles: ['Baking', 'Piemaking'], nations: ['air-nomads'], compatibleForms: ['handheld', 'pie'] },
  },
]; 