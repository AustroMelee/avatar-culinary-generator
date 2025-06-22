import { CookingStyle, NationData } from './types';

/**
 * Water Tribe cooking styles reflect their practical, communal approach to food.
 * Methods are often simple, direct, and designed for survival in harsh conditions.
 */
export const waterTribeCookingStyles: CookingStyle[] = [
    { name: 'Stewing', dishSubtype: 'Stew', description: 'A slow simmering of ingredients in a single pot, creating a hearty, communal meal to share against the cold.' },
    { name: 'Poaching', dishSubtype: 'Poach', description: 'A gentle cooking method in seasoned sea-broth, preserving the delicate texture of fish and sea-prunes.' },
    { name: 'Grilling', dishSubtype: 'Grill', description: 'Cooking over an open flame, fueled by whale oil, giving a smoky char to meats and vegetables.' },
    { name: 'Curing', dishSubtype: 'Cure', description: 'A preservation technique using sea salt and tundra herbs to create savory, long-lasting dried meats and fish.' },
    { name: 'Freezing', dishSubtype: 'Freeze', description: 'Using waterbending to flash-freeze sweet creams and berries into delightful, icy desserts.' },
    { name: 'Boiling', dishSubtype: 'Boil', description: 'A simple and efficient method to cook roots, meats, and kelp in bubbling water.' },
    { name: 'Brewing', dishSubtype: 'Brew', description: 'Steeping rare herbs and flowers from the tundra or Spirit Oasis to create warming or spiritual teas.' },
    { name: 'Minimalist Assembly', dishSubtype: 'Salad', description: 'A simple preparation method for fresh seaweed and tundra greens, allowing their natural flavors to shine.' },
];

/**
 * Water Tribe nation data including naming conventions and dish emojis.
 * Reflects their connection to the sea, ice, and spiritual traditions.
 */
export const waterTribeData: NationData = {
  nation: 'water-tribe',
  dishEmojis: {
    'main-course': ['🐟', '🍢', '🦀'],
    'side-dish': ['🍜', '🌿', '🥣'],
    'snack': ['🥩', '🍤'], // Represents jerky
    'dessert': ['🍧', '🧊', '🥮'], // Mooncakes
    'soup-stew': ['🍲', '🥣'],
    'salad': ['🌿', '🥗'], // Seaweed salads
    'beverage': ['🧉', '🍵'],
  },
  nameParts: {
    prefixes: ['Arctic', 'Southern', 'Moon Spirit\'s', 'Tidal', 'Glacial', 'Hunter\'s', 'Icy', 'Deep Sea'],
    middles: ['Wave', 'Ice', 'Seal', 'Tundra', 'Spirit', 'Pearl', 'Coral', 'Midnight'],
    suffixes: ['Feast', 'Catch', 'Bounty', 'Stew', 'Delight', 'Broth', 'Jerky'],
  },
}; 