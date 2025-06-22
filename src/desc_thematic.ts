import { DescriptionRule } from './types';

export const thematicDescriptions: DescriptionRule[] = [
  {
    id: 'theme_ceremonial',
    text: (ctx) => `This is more than a meal; it's a centerpiece. Prepared for festivals and ceremonies, its presentation is as important as its taste, designed to be shared and admired by all.`,
    weighting: { themes: ['Ceremonial & Celebratory'] },
  },
  {
    id: 'theme_humble',
    text: (ctx) => `A truly humble dish, born from the principle that simple food, prepared with care and intention, can be more satisfying than the most elaborate feast.`,
    weighting: { themes: ['Humble & Meditative'], minRarity: 'Common' },
  },
  {
    id: 'theme_warrior',
    text: (ctx) => `This is fuel for a warrior. It is a dense, high-energy meal, designed to provide the strength and stamina needed for rigorous training or a long march.`,
    weighting: { nations: ['fire-nation', 'water-tribe'], categories: ['protein'] },
  },
  {
    id: 'theme_traveler',
    text: (ctx) => `A traveler's best friend. The ingredients are easily preserved and can be cooked over an open flame with minimal fuss, providing a taste of home no matter how far one has journeyed.`,
    weighting: { dishTypes: ['snack'], styles: ['Curing', 'Grilling'] },
  },
  {
    id: 'theme_artisan',
    text: (ctx) => `The creation of this dish is considered an art form. The precise knife work on the ${ctx.primaryIngredient.name.toLowerCase()} and the delicate balance of flavors are the marks of a true culinary artist.`,
    weighting: { minRarity: 'Rare', styles: ['Dumpling Making', 'Minimalist Assembly'] },
  },
  {
    id: 'theme_fusion',
    text: (ctx) => `This dish represents the exciting future of global cuisine. It bravely combines the ${ctx.primaryIngredient.flavorProfile} notes of ${ctx.fusionData.selectedNations[0]} ingredients with the ${ctx.cookingStyle.name} technique of another, creating a bold and unforgettable new experience.`,
    weighting: { fusion: true, minNations: 2 },
  },
]; 