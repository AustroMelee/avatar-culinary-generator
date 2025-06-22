// src/airNomadData.ts

import { NationData, CookingStyle } from './types';

export const airNomadCookingStyles: CookingStyle[] = [
    { name: 'Baking', dishSubtype: 'Bake', description: 'The monks are skilled bakers, creating everything from fruit pies to fluffy buns in their stone ovens, often using airbending to ensure even cooking.' },
    { name: 'Steaming', dishSubtype: 'Steam', description: 'A gentle cooking method using aromatic steam to preserve the natural, subtle flavors and textures of vegetables and tofu.' },
    { name: 'Light Sauté', dishSubtype: 'Stir-fry', description: 'A quick stir in a hot wok with minimal oil, keeping vegetables crisp and vibrant while respecting their essence.' },
    { name: 'Simmering', dishSubtype: 'Curry', description: 'A slow, gentle cooking in liquid to meld flavors, perfect for creating rich curries and broths.'},
    { name: 'Piemaking', dishSubtype: 'Pie', description: 'A beloved pastime, creating savory or sweet pies with flaky, air-puffed crusts.'},
    { name: 'Minimalist Assembly', dishSubtype: 'Salad', description: 'A philosophy of using very little cooking, allowing the pure, inherent taste of the raw ingredients to be the focus of the meal.' },
];

export const airNomadData: NationData = {
  nation: 'air-nomads',
  dishEmojis: ['🍲', '🥗', '🥧', '🥠', '🥟', '🍜', '🧋', '🍮', '🫕', '🫔'],
  
  nameParts: {
    prefixes: ['Soaring', 'Whispering', 'Monk Gyatso\'s', 'Meditative', 'Peaceful', 'Sky Temple', 'Four Winds', 'Silent'],
    middles: ['Wind', 'Cloud', 'Spirit', 'Lotus', 'Mountain', 'Sunrise', 'Treetop', 'Pilgrim\'s'],
    suffixes: ['Surprise', 'Delight', 'Special'],
  },
};