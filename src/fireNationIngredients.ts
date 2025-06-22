import { Ingredient } from './types';

/**
 * Fire Nation ingredients represent the intense, spicy, and powerful cuisine of volcanic islands.
 * From fiery peppers to tropical fruits and robust meats, reflecting the nation's disciplined approach to cooking.
 */
export const fireNationIngredients: Ingredient[] = [
    // --- PROTEIN ---
    { 
        name: 'Komodo Rhino', 
        emoji: '🦏', 
        rarity: 'Uncommon', 
        category: 'protein', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['roast', 'grill', 'simmer'], 
        description: 'A tough, powerful beast whose meat is often made into sausages or roasted for feasts.' 
    },
    { 
        name: 'Komodo Chicken', 
        emoji: '🐔', 
        rarity: 'Common', 
        category: 'protein', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['roast', 'grill', 'wok-fry'], 
        description: 'A common bird in the Fire Nation, often roasted whole or served on skewers.' 
    },
    { 
        name: 'Bangus Fish', 
        emoji: '🐟', 
        rarity: 'Common', 
        category: 'protein', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['wok-fry', 'steam'], 
        description: 'A staple fish from the coastal waters, typically fried until crisp.' 
    },
    { 
        name: 'Sea Slug', 
        emoji: '🐌', 
        rarity: 'Uncommon', 
        category: 'protein', 
        flavorProfile: 'umami', 
        isPlural: false, 
        suitability: ['grill', 'steam'], 
        description: 'A delicacy from Shu Jing, often smoked over hot coals to achieve a chewy, savory texture.' 
    },
    { 
        name: 'Hippo-ox', 
        emoji: '🐂', 
        rarity: 'Common', 
        category: 'protein', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['roast', 'grill'], 
        description: 'A large, hearty animal providing tough but flavorful meat for roasts and skewers.' 
    },
    { 
        name: 'Fertilized Turtle Duck Egg', 
        emoji: '🥚', 
        rarity: 'Rare', 
        category: 'protein', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['steam', 'simmer'], 
        description: 'A controversial delicacy enjoyed by some Fire Nation nobility.' 
    },

    // --- VEGETABLES ---
    { 
        name: 'Fire Chili', 
        emoji: '🌶️', 
        rarity: 'Common', 
        category: 'vegetable', 
        flavorProfile: 'pungent', 
        isPlural: false, 
        suitability: ['roast', 'grill', 'wok-fry', 'simmer', 'steam', 'salad'], 
        description: 'The defining ingredient of the nation\'s cuisine, used to bring intense heat and flavor.' 
    },
    { 
        name: 'Ash Banana', 
        emoji: '🍌', 
        rarity: 'Uncommon', 
        category: 'vegetable', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['bake', 'roast'], 
        description: 'A savory, starchy banana that grows in volcanic soil, often baked into breads.' 
    },
    { 
        name: 'Tomato-Carrot', 
        emoji: '🥕', 
        rarity: 'Common', 
        category: 'vegetable', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['wok-fry', 'simmer', 'roast'], 
        description: 'A hybrid vegetable with the sweetness of a carrot and the acidity of a tomato.' 
    },
    { 
        name: 'Scallion', 
        emoji: '🌱', 
        rarity: 'Common', 
        category: 'vegetable', 
        flavorProfile: 'pungent', 
        isPlural: true, 
        suitability: ['wok-fry', 'garnish', 'steam'], 
        description: 'Used ubiquitously as an aromatic finisher, adding a sharp, bright flavor.' 
    },
    { 
        name: 'Peas', 
        emoji: '🫛', 
        rarity: 'Common', 
        category: 'vegetable', 
        flavorProfile: 'sweet', 
        isPlural: true, 
        suitability: ['wok-fry', 'simmer'], 
        description: 'Small, sweet peas that add a pop of color and texture to rice and noodle dishes.' 
    },

    // --- BASE ---
    { 
        name: 'Sorghum', 
        emoji: '🌾', 
        rarity: 'Common', 
        category: 'base', 
        flavorProfile: 'neutral', 
        isPlural: false, 
        suitability: ['simmer', 'bake'], 
        description: 'A hardy, ancient grain that can be cooked into a porridge or ground into flour.' 
    },
    { 
        name: 'Millet', 
        emoji: '🌾', 
        rarity: 'Common', 
        category: 'base', 
        flavorProfile: 'neutral', 
        isPlural: false, 
        suitability: ['roast', 'bake'], 
        description: 'A small grain often toasted to create a nutty, satisfying travel snack.' 
    },
    { 
        name: 'Rice', 
        emoji: '🍚', 
        rarity: 'Common', 
        category: 'base', 
        flavorProfile: 'neutral', 
        isPlural: false, 
        suitability: ['steam', 'wok-fry', 'simmer'], 
        description: 'The staple grain, steamed perfectly to accompany spicy dishes.' 
    },
    { 
        name: 'Fire Noodles', 
        emoji: '🍜', 
        rarity: 'Common', 
        category: 'base', 
        flavorProfile: 'neutral', 
        isPlural: true, 
        suitability: ['wok-fry', 'simmer'], 
        description: 'Chewy wheat noodles, often served extra spicy for breakfast.' 
    },
    { 
        name: 'Fire-Proof Dough', 
        emoji: '🍞', 
        rarity: 'Common', 
        category: 'base', 
        flavorProfile: 'neutral', 
        isPlural: false, 
        suitability: ['bake'], 
        description: 'A special dough used for making fire cakes and other pastries that can withstand intense heat.' 
    },

    // --- FRUIT & DESSERT ---
    { 
        name: 'Dragon Paw Fruit', 
        emoji: '🐲', 
        rarity: 'Rare', 
        category: 'fruit', 
        flavorProfile: 'sweet', 
        isPlural: false, 
        suitability: ['dessert'], 
        description: 'A sweet, juicy fruit with a spiny shell, resembling a dragon\'s paw.' 
    },
    { 
        name: 'Ember Island Cherries', 
        emoji: '🍒', 
        rarity: 'Common', 
        category: 'fruit', 
        flavorProfile: 'sweet', 
        isPlural: true, 
        suitability: ['dessert', 'bake'], 
        description: 'Sweet and tart cherries grown exclusively on Ember Island, perfect for making ice cream.' 
    },
    { 
        name: 'Star Apple', 
        emoji: '🌟', 
        rarity: 'Uncommon', 
        category: 'fruit', 
        flavorProfile: 'sweet', 
        isPlural: false, 
        suitability: ['dessert'], 
        description: 'A fruit with toxic skin but incredibly sweet, star-patterned flesh.' 
    },
    { 
        name: 'Sweet Cream', 
        emoji: '🍦', 
        rarity: 'Common', 
        category: 'dairy', 
        flavorProfile: 'sweet', 
        isPlural: false, 
        suitability: ['dessert'], 
        description: 'A rich cream used as a base for ice creams and a topping for hotcakes.' 
    },

    // --- FLAVORING & GARNISH ---
    { 
        name: 'Togarashi Spice', 
        emoji: '🌶️', 
        rarity: 'Common', 
        category: 'flavoring', 
        flavorProfile: 'pungent', 
        isPlural: false, 
        suitability: ['grill', 'roast', 'wok-fry', 'simmer'], 
        description: 'A complex, seven-spice blend that is the signature seasoning of the Fire Nation.' 
    },
    { 
        name: 'Karashi Mustard', 
        emoji: '💛', 
        rarity: 'Common', 
        category: 'flavoring', 
        flavorProfile: 'pungent', 
        isPlural: false, 
        suitability: ['garnish', 'side-dish'], 
        description: 'An intensely hot and iconic mustard, used as a condiment for meats and dumplings.' 
    },
    { 
        name: 'Black Volcanic Salt', 
        emoji: '🧂', 
        rarity: 'Uncommon', 
        category: 'flavoring', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['grill', 'roast'], 
        description: 'Salt harvested from volcanic fields, infused with minerals that give it a sharp, smoky flavor.' 
    },
    { 
        name: 'Palm Sugar', 
        emoji: '🍯', 
        rarity: 'Common', 
        category: 'flavoring', 
        flavorProfile: 'sweet', 
        isPlural: false, 
        suitability: ['bake', 'dessert', 'beverage'], 
        description: 'A rich, caramel-like sugar harvested from palm trees, used to sweeten desserts and beverages.' 
    },
    { 
        name: 'Flaming Fire Flakes', 
        emoji: '🔥', 
        rarity: 'Common', 
        category: 'garnish', 
        flavorProfile: 'pungent', 
        isPlural: true, 
        suitability: ['garnish', 'snack'], 
        description: 'Thin, crispy flakes made from spiced dough, a popular and fiery snack.' 
    },
]; 