import { Ingredient } from './types';

/**
 * Earth Kingdom ingredients represent the largest and most diverse pantry in the Avatar world.
 * From common farm produce to rare delicacies and unique ingredients of Kyoshi Island.
 */
export const earthKingdomIngredients: Ingredient[] = [
    // --- PROTEIN ---
    { 
        name: 'Pork Belly', 
        emoji: '🥓', 
        rarity: 'Common', 
        category: 'protein', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['roast', 'braise', 'stir-fry'], 
        description: 'A rich, fatty cut of meat, often slow-braised until it is meltingly tender.' 
    },
    { 
        name: 'Chicken', 
        emoji: '🍗', 
        rarity: 'Common', 
        category: 'protein', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['roast', 'braise', 'stir-fry', 'congee'], 
        description: 'A versatile meat found on farms across the kingdom, used in countless dishes.' 
    },
    { 
        name: 'Ground Meat', 
        emoji: '🥩', 
        rarity: 'Common', 
        category: 'protein', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['dumpling', 'stir-fry'], 
        description: 'A mixture of seasoned ground meats, perfect for filling dumplings and bao.' 
    },
    { 
        name: 'River Fish', 
        emoji: '🐟', 
        rarity: 'Common', 
        category: 'protein', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['braise', 'stir-fry', 'steam'], 
        description: 'Freshwater fish from the kingdom\'s many rivers, often braised with ginger and soy.' 
    },
    { 
        name: 'Kyoshi Elephant Koi', 
        emoji: '🎏', 
        rarity: 'Legendary', 
        category: 'protein', 
        flavorProfile: 'umami', 
        isPlural: false, 
        suitability: ['roast', 'braise', 'steam'], 
        description: 'A massive, revered fish from Kyoshi Island, its seared flesh is a gourmet delicacy.' 
    },
    { 
        name: 'Duck', 
        emoji: '🦆', 
        rarity: 'Uncommon', 
        category: 'protein', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['roast', 'braise'], 
        description: 'Often roasted whole until the skin is crisp, a celebratory dish in Ba Sing Se.'
    },
    { 
        name: 'Platypus Bear Egg', 
        emoji: '🥚', 
        rarity: 'Rare', 
        category: 'protein', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['congee', 'stir-fry'], 
        description: 'An enormous egg with a rich yolk, large enough to be a meal in itself.'
    },
    { 
        name: 'Tofu', 
        emoji: '⬜', 
        rarity: 'Common', 
        category: 'protein', 
        flavorProfile: 'neutral', 
        isPlural: false, 
        suitability: ['stir-fry', 'braise', 'dumpling', 'congee'], 
        description: 'Made from soybeans, a versatile protein that absorbs the flavor of the sauces it\'s cooked in.' 
    },

    // --- VEGETABLES ---
    { 
        name: 'Bok Choy', 
        emoji: '🥬', 
        rarity: 'Common', 
        category: 'vegetable', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['stir-fry', 'braise', 'dumpling', 'steam'], 
        description: 'A crisp, leafy green with a mild, sweet flavor, a staple in stir-fries.' 
    },
    { 
        name: 'Taro Root', 
        emoji: '🍠', 
        rarity: 'Common', 
        category: 'vegetable', 
        flavorProfile: 'neutral', 
        isPlural: false, 
        suitability: ['roast', 'braise', 'congee', 'bake'], 
        description: 'A starchy root vegetable, providing a hearty and satisfying element to any meal.' 
    },
    { 
        name: 'Bamboo Shoots', 
        emoji: '🎋', 
        rarity: 'Common', 
        category: 'vegetable', 
        flavorProfile: 'neutral', 
        isPlural: true, 
        suitability: ['stir-fry', 'braise', 'dumpling'], 
        description: 'Young, tender shoots with a crisp texture and delicate flavor.' 
    },
    { 
        name: 'Scallions', 
        emoji: '🌱', 
        rarity: 'Common', 
        category: 'vegetable', 
        flavorProfile: 'pungent', 
        isPlural: true, 
        suitability: ['stir-fry', 'dumpling', 'congee', 'garnish'], 
        description: 'A key aromatic, adding a sharp, fresh onion flavor to everything it touches.' 
    },
    { 
        name: 'Jicama', 
        emoji: '🥔', 
        rarity: 'Uncommon', 
        category: 'vegetable', 
        flavorProfile: 'sweet', 
        isPlural: false, 
        suitability: ['stir-fry', 'salad'], 
        description: 'A crunchy, juicy root vegetable that is often eaten raw or lightly cooked.' 
    },
    { 
        name: 'Pickled Cabbage', 
        emoji: '🥬', 
        rarity: 'Common', 
        category: 'vegetable', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['pickle', 'garnish', 'side-dish'], 
        description: 'Cabbage preserved in a tangy brine, a staple side dish providing a sharp contrast to rich meats.'
    },
    { 
        name: 'Cabbage', 
        emoji: '🥬', 
        rarity: 'Common', 
        category: 'vegetable', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['stir-fry', 'dumpling', 'congee'], 
        description: 'The humble and resilient staple of the common folk, used in everything from soups to buns.' 
    },
    { 
        name: 'Lotus Root', 
        emoji: '🌸', 
        rarity: 'Uncommon', 
        category: 'vegetable', 
        flavorProfile: 'neutral', 
        isPlural: false, 
        suitability: ['stir-fry', 'salad', 'braise'], 
        description: 'A beautiful, crunchy root with a lacy pattern, symbolizing purity.' 
    },
    { 
        name: 'Kale', 
        emoji: '🌿', 
        rarity: 'Uncommon', 
        category: 'vegetable', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['stir-fry', 'salad', 'bake'], 
        description: 'A sturdy green, famously used in the modern, gourmet cuisine of Zaofu.' 
    },
    
    // --- BASE ---
    { 
        name: 'White Rice', 
        emoji: '🍚', 
        rarity: 'Common', 
        category: 'base', 
        flavorProfile: 'neutral', 
        isPlural: false, 
        suitability: ['stir-fry', 'braise', 'congee', 'side-dish', 'steam'], 
        description: 'The foundational grain of the Earth Kingdom, served with nearly every meal.' 
    },
    { 
        name: 'Dumpling Wrappers', 
        emoji: '🥟', 
        rarity: 'Common', 
        category: 'base', 
        flavorProfile: 'neutral', 
        isPlural: true, 
        suitability: ['dumpling'], 
        description: 'Thin sheets of dough, ready to be filled with savory mixtures and cooked.' 
    },
    { 
        name: 'Rich Meat Broth', 
        emoji: '🥣', 
        rarity: 'Common', 
        category: 'base', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['braise', 'congee'], 
        description: 'A deep, flavorful broth made from simmering bones and aromatics for hours.' 
    },
    { 
        name: 'Egg Noodles', 
        emoji: '🍜', 
        rarity: 'Common', 
        category: 'base', 
        flavorProfile: 'neutral', 
        isPlural: true, 
        suitability: ['stir-fry', 'braise'], 
        description: 'Hearty, chewy noodles enriched with egg, perfect for soaking up savory sauces.' 
    },
    { 
        name: 'Flour', 
        emoji: '🌾', 
        rarity: 'Common', 
        category: 'base', 
        flavorProfile: 'neutral', 
        isPlural: false, 
        suitability: ['bake', 'dumpling'], 
        description: 'A basic necessity for making breads, buns, and pastries.' 
    },

    // --- FRUIT & DESSERT ---
    { 
        name: 'Red Bean Paste', 
        emoji: '🫘', 
        rarity: 'Common', 
        category: 'fruit', 
        flavorProfile: 'sweet', 
        isPlural: false, 
        suitability: ['dumpling', 'bake'], 
        description: 'A sweet, rich paste made from adzuki beans, used as a filling in many desserts.' 
    },
    { 
        name: 'Moon Peach', 
        emoji: '🍑', 
        rarity: 'Rare', 
        category: 'fruit', 
        flavorProfile: 'sweet', 
        isPlural: false, 
        suitability: ['bake', 'dessert'], 
        description: 'A legendary fruit from the hills of the Lower Ring, used in special occasion cakes.' 
    },
    { 
        name: 'Lychee', 
        emoji: '🥭', 
        rarity: 'Uncommon', 
        category: 'fruit', 
        flavorProfile: 'sweet', 
        isPlural: false, 
        suitability: ['dessert', 'beverage', 'bake'], 
        description: 'A sweet, floral fruit used in fine desserts and the crust of egg tarts.' 
    },
    { 
        name: 'Egg Custard', 
        emoji: '🍮', 
        rarity: 'Common', 
        category: 'dairy', 
        flavorProfile: 'sweet', 
        isPlural: false, 
        suitability: ['bake'], 
        description: 'A sweet, creamy custard that forms the filling of the famous Ba Sing Se egg tarts.' 
    },
    
    // --- FLAVORING & GARNISH ---
    { 
        name: 'Ginseng', 
        emoji: '🪵', 
        rarity: 'Rare', 
        category: 'flavoring', 
        flavorProfile: 'pungent', 
        isPlural: false, 
        suitability: ['braise', 'congee', 'beverage'], 
        description: 'A prized root known for its restorative properties and strong, earthy flavor.' 
    },
    { 
        name: 'Soy Sauce', 
        emoji: '🫙', 
        rarity: 'Common', 
        category: 'flavoring', 
        flavorProfile: 'umami', 
        isPlural: false, 
        suitability: ['stir-fry', 'braise', 'dumpling'], 
        description: 'The essential savory seasoning of the Earth Kingdom, brewed from fermented soybeans.' 
    },
    { 
        name: 'Ginger', 
        emoji: '🫚', 
        rarity: 'Common', 
        category: 'flavoring', 
        flavorProfile: 'pungent', 
        isPlural: false, 
        suitability: ['stir-fry', 'braise', 'congee', 'beverage'], 
        description: 'A sharp, spicy root used to add warmth and complexity to nearly any dish.' 
    },
    { 
        name: 'Honey', 
        emoji: '🍯', 
        rarity: 'Common', 
        category: 'flavoring', 
        flavorProfile: 'sweet', 
        isPlural: false, 
        suitability: ['bake', 'dessert', 'beverage'], 
        description: 'A natural sweetener from the kingdom\'s wildflower meadows, used to sweeten cakes and teas.' 
    },
    { 
        name: 'Jennamite', 
        emoji: '💎', 
        rarity: 'Legendary', 
        category: 'garnish', 
        flavorProfile: 'sweet', 
        isPlural: false, 
        suitability: ['dessert', 'garnish'], 
        description: 'A fast-growing rock candy from the caves of Omashu. A dangerous but delicious garnish.' 
    },
]; 