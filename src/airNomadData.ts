// src/airNomadData.ts

import { CookingStyle, NationData } from './types';

export const airNomadCookingStyles: CookingStyle[] = [
    { name: 'Baking', dishSubtype: 'Bake', form: 'handheld', description: 'The monks are skilled bakers, creating everything from fruit pies to fluffy buns in their stone ovens, often using airbending to ensure even cooking.' },
    { name: 'Steaming', dishSubtype: 'Steam', form: 'plated', description: 'A gentle cooking method using aromatic steam to preserve the natural, subtle flavors and textures of vegetables and tofu.' },
    { name: 'Light Sauté', dishSubtype: 'Stir-fry', form: 'plated', description: 'A quick stir in a hot wok with minimal oil, keeping vegetables crisp and vibrant while respecting their essence.' },
    { name: 'Simmering', dishSubtype: 'Curry', form: 'stew', description: 'A slow, gentle cooking in liquid to meld flavors, perfect for creating rich curries and broths.'},
    { name: 'Piemaking', dishSubtype: 'Pie', form: 'pie', description: 'A beloved pastime, creating savory or sweet pies with flaky, air-puffed crusts.'},
    { name: 'Minimalist Assembly', dishSubtype: 'Salad', form: 'salad', description: 'A philosophy of using very little cooking, allowing the pure, inherent taste of the raw ingredients to be the focus of the meal.' },
    { name: 'Juicing', dishSubtype: 'Juice', form: 'beverage', description: 'A simple process of extracting the vibrant, raw essence of fruits and some vegetables into a refreshing drink.' },
];

export const airNomadData: NationData = {
  nation: 'air-nomads',
  dishEmojis: {
    'main-course': ['🍲', '🧆', '🥘'],
    'side-dish': ['🍚', '🥣'],
    'snack': ['🥠', '🥟'],
    'dessert': ['🥧', '🍮', '🥮'],
    'soup-stew': ['🥣', '🍲'],
    'salad': ['🥗', '🥬'],
    'beverage': ['🧋', '🍵', '🥤'],
  },
  nameParts: {
    prefixes: ['Soaring', 'Whispering', 'Monk Gyatso\'s', 'Meditative', 'Peaceful', 'Sky Temple', 'Four Winds', 'Silent'],
    middles: ['Wind', 'Cloud', 'Spirit', 'Lotus', 'Mountain', 'Sunrise', 'Treetop', 'Pilgrim\'s'],
    suffixes: ['Surprise', 'Delight', 'Special', 'Medley', 'Festival'],
  },
};