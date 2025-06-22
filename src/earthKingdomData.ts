import { CookingStyle, NationData } from './types';

/**
 * Earth Kingdom cuisine is defined by its heartiness, diversity, and connection to the land.
 * Methods are often robust, making use of intense heat from coal and earth ovens.
 */
export const earthKingdomCookingStyles: CookingStyle[] = [
    { 
        name: 'Roasting', 
        dishSubtype: 'Roast', 
        form: 'roast',
        description: 'A slow-cooking method using the dry, powerful heat of an earth or stone oven to tenderize meats and vegetables.' 
    },
    { 
        name: 'Stir-frying', 
        dishSubtype: 'Stir-fry', 
        form: 'plated',
        description: 'A fast, high-heat technique from the streets of Ba Sing Se, tossing ingredients in a hot wok with savory sauces.' 
    },
    { 
        name: 'Braising', 
        dishSubtype: 'Braise', 
        form: 'stew',
        description: 'A combination method of searing ingredients before simmering them slowly in a flavorful liquid, resulting in incredibly tender dishes.' 
    },
    { 
        name: 'Dumpling Making', 
        dishSubtype: 'Dumpling', 
        form: 'dumpling',
        description: 'The intricate art of wrapping savory fillings in a delicate dough, which can then be steamed, boiled, or pan-fried.' 
    },
    { 
        name: 'Baking', 
        dishSubtype: 'Bake', 
        form: 'handheld',
        description: 'Used to create a vast array of goods, from simple breads for travelers to the elaborate cakes and tarts of the Upper Ring.' 
    },
    { 
        name: 'Congee Making', 
        dishSubtype: 'Congee', 
        form: 'congee',
        description: 'A slow, patient simmering of rice in a large amount of water, creating a thick, comforting porridge known as Jook.' 
    },
    { 
        name: 'Pickling', 
        dishSubtype: 'Pickle', 
        form: 'plated',
        description: 'A preservation method using salt and vinegar to create tangy, crisp vegetables that last for seasons.' 
    },
    { 
        name: 'Steaming', 
        dishSubtype: 'Steam', 
        form: 'plated',
        description: 'A gentle method used to cook delicate fish, vegetables, and filled buns, preserving their natural texture and flavor.' 
    },
    { 
        name: 'Minimalist Assembly', 
        dishSubtype: 'Salad', 
        form: 'salad',
        description: 'Preparing fresh, crisp vegetables with a simple dressing, a common practice for quick meals in the countryside.' 
    },
    { 
        name: 'Brewing', 
        dishSubtype: 'Brew', 
        form: 'beverage',
        description: 'The art of steeping leaves, such as ginseng or jasmine, in hot water to create the nation\'s most beloved beverage: tea.' 
    },
];

/**
 * Earth Kingdom nation data with diverse naming conventions and dish emojis
 * reflecting the largest and most varied nation in the Avatar world.
 */
export const earthKingdomData: NationData = {
    nation: 'earth-kingdom',
    dishEmojis: {
        'main-course': ['🍖', '🥡', '🍚'],
        'side-dish': ['🥬', '🥦', '🥢'],
        'snack': ['🥟', '🥠', '🍢'],
        'dessert': ['🥮', '🍡', '🍮'],
        'soup-stew': ['🍲', '🥣'],
        'salad': ['🥗', '🥒'],
        'beverage': ['🫖', '🍵'],
    },
    nameParts: {
        prefixes: ['Ba Sing Se', 'Omashu', 'Kyoshi', 'Jade', 'Earthen', 'Sturdy', 'Golden', 'Granite'],
        middles: ['Wall', 'Rock', 'Badger-mole', 'Crystal', 'Ginseng', 'Rice', 'Merchant\'s', 'Farmer\'s'],
        suffixes: ['Feast', 'Special', 'Stir-fry', 'Dumpling', 'Delight', 'Bao', 'Jook'],
    },
}; 