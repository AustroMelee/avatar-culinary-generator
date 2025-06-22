import { CookingStyle, NationData } from './types';

/**
 * Fire Nation cuisine is about control, precision, and the respectful application of power.
 * Methods involve intense, controlled heat and a deep appreciation for spice.
 */
export const fireNationCookingStyles: CookingStyle[] = [
    { 
        name: 'Grilling', 
        dishSubtype: 'Grill', 
        description: 'Cooking over precisely controlled hot coals, searing meats and vegetables to perfection with a signature smoky flavor.' 
    },
    { 
        name: 'Roasting', 
        dishSubtype: 'Roast', 
        description: 'Using the intense, dry heat of a volcanic-stone oven to cook large cuts of meat or whole komodo chickens.' 
    },
    { 
        name: 'Wok-frying', 
        dishSubtype: 'Wok-fry', 
        description: 'A high-speed, high-heat method that uses minimal oil to create intensely flavorful and spicy dishes.' 
    },
    { 
        name: 'Steaming', 
        dishSubtype: 'Steam', 
        description: 'A disciplined technique using steam to gently cook delicate fish and dumplings, often infused with spices.' 
    },
    { 
        name: 'Simmering', 
        dishSubtype: 'Simmer', 
        description: 'Slowly cooking ingredients in a spiced broth or sauce, allowing flavors to meld and deepen over time.' 
    },
    { 
        name: 'Baking', 
        dishSubtype: 'Bake', 
        description: 'Creating perfectly uniform fire cakes, tarts, and buns in meticulously heated ovens.' 
    },
    { 
        name: 'Minimalist Assembly', 
        dishSubtype: 'Salad', 
        description: 'A rare but potent dish, typically featuring sliced fire chilies and other bold ingredients served raw to test one\'s mettle.' 
    },
    { 
        name: 'Brewing', 
        dishSubtype: 'Brew', 
        description: 'Creating powerful, often spicy, teas and tonics intended to invigorate the body and spirit before firebending.' 
    },
];

/**
 * Fire Nation nation data with strong, commanding naming conventions and dish emojis
 * reflecting the intense and powerful nature of Fire Nation cuisine.
 */
export const fireNationData: NationData = {
    nation: 'fire-nation',
    dishEmojis: {
        'main-course': ['🔥', '🍖', '🌶️'],
        'side-dish': ['🍜', '🍚', '🥢'],
        'snack': ['🍢', '🍘', '🥟'],
        'dessert': ['🍰', '🍮', '🍒'],
        'soup-stew': ['🍲', '🥣'],
        'salad': ['🌶️', '🥗'], // Typically spicy
        'beverage': ['🍹', '🧉'],
    },
    nameParts: {
        prefixes: ['Ember Island', 'Royal', 'Volcanic', 'Sun Warrior\'s', 'Blazing', 'Imperial', 'Dragon\'s', 'Obsidian'],
        middles: ['Flame', 'Ash', 'Soot', 'Caldera', 'Spire', 'Magma', 'Phoenix', 'Inferno'],
        suffixes: ['Flakes', 'Feast', 'Roast', 'Sizzle', 'Delight', 'Skewer', 'Fury'],
    },
}; 