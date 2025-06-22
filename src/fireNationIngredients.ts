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
        description: 'A tough, powerful beast whose meat is often made into sausages or roasted for feasts.',
        nation: 'fire-nation',
        location: 'Fire Nation Capital',
        synergies: { 'Fire Chili': 10 },
        loreSnippet: 'The Komodo Rhino is revered for its strength and resilience, qualities that are said to transfer to those who consume its meat.'
    },
    { 
        name: 'Komodo Chicken', 
        emoji: '🐔', 
        rarity: 'Common', 
        category: 'protein', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['roast', 'grill', 'wok-fry'], 
        description: 'A common bird in the Fire Nation, often roasted whole or served on skewers.',
        nation: 'fire-nation',
        location: 'Fire Nation Capital',
        synergies: { 'Fire Chili': 7 }
    },
    { 
        name: 'Bangus Fish', 
        emoji: '🐟', 
        rarity: 'Common', 
        category: 'protein', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['wok-fry', 'steam'], 
        description: 'A staple fish from the coastal waters, typically fried until crisp.',
        nation: 'fire-nation',
        location: 'Generic'
    },
    { 
        name: 'Sea Slug', 
        emoji: '🐌', 
        rarity: 'Uncommon', 
        category: 'protein', 
        flavorProfile: 'umami', 
        isPlural: false, 
        suitability: ['grill', 'steam'], 
        description: 'A delicacy from Shu Jing, often smoked over hot coals to achieve a chewy, savory texture.',
        nation: 'fire-nation',
        location: 'Generic'
    },
    { 
        name: 'Hippo-ox', 
        emoji: '🐂', 
        rarity: 'Common', 
        category: 'protein', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['roast', 'grill'], 
        description: 'A large, hearty animal providing tough but flavorful meat for roasts and skewers.',
        nation: 'fire-nation',
        location: 'Generic'
    },
    { 
        name: 'Fertilized Turtle Duck Egg', 
        emoji: '🥚', 
        rarity: 'Rare', 
        category: 'protein', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['steam', 'simmer'], 
        description: 'A controversial delicacy enjoyed by some Fire Nation nobility.',
        nation: 'fire-nation',
        location: 'Generic'
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
        description: 'The defining ingredient of the nation\'s cuisine, used to bring intense heat and flavor.',
        nation: 'fire-nation',
        location: 'Generic',
        synergies: { 'Komodo Rhino': 10, 'Komodo Chicken': 7 },
        loreSnippet: 'It is said that a true Firebender can tell the quality of the chili by the intensity of their inner heat.'
    },
    { 
        name: 'Ash Banana', 
        emoji: '🍌', 
        rarity: 'Uncommon', 
        category: 'vegetable', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['bake', 'roast'], 
        description: 'A savory, starchy banana that grows in volcanic soil, often baked into breads.',
        nation: 'fire-nation',
        location: 'Ember Island'
    },
    { 
        name: 'Tomato-Carrot', 
        emoji: '🥕', 
        rarity: 'Common', 
        category: 'vegetable', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['wok-fry', 'simmer', 'roast'], 
        description: 'A hybrid vegetable with the sweetness of a carrot and the acidity of a tomato.',
        nation: 'fire-nation',
        location: 'Generic'
    },
    { 
        name: 'Scallion', 
        emoji: '🌱', 
        rarity: 'Common', 
        category: 'vegetable', 
        flavorProfile: 'pungent', 
        isPlural: true, 
        suitability: ['wok-fry', 'garnish', 'steam'], 
        description: 'Used ubiquitously as an aromatic finisher, adding a sharp, bright flavor.',
        nation: 'fire-nation',
        location: 'Generic'
    },
    { 
        name: 'Peas', 
        emoji: '🫛', 
        rarity: 'Common', 
        category: 'vegetable', 
        flavorProfile: 'sweet', 
        isPlural: true, 
        suitability: ['wok-fry', 'simmer'], 
        description: 'Small, sweet peas that add a pop of color and texture to rice and noodle dishes.',
        nation: 'fire-nation',
        location: 'Generic'
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
        description: 'A hardy, ancient grain that can be cooked into a porridge or ground into flour.',
        nation: 'fire-nation',
        location: 'Generic'
    },
    { 
        name: 'Millet', 
        emoji: '🌾', 
        rarity: 'Common', 
        category: 'base', 
        flavorProfile: 'neutral', 
        isPlural: false, 
        suitability: ['roast', 'bake'], 
        description: 'A small grain often toasted to create a nutty, satisfying travel snack.',
        nation: 'fire-nation',
        location: 'Generic'
    },
    { 
        name: 'Rice', 
        emoji: '🍚', 
        rarity: 'Common', 
        category: 'base', 
        flavorProfile: 'neutral', 
        isPlural: false, 
        suitability: ['steam', 'wok-fry', 'simmer'], 
        description: 'The staple grain, steamed perfectly to accompany spicy dishes.',
        nation: 'fire-nation',
        location: 'Generic'
    },
    { 
        name: 'Fire Noodles', 
        emoji: '🍜', 
        rarity: 'Common', 
        category: 'base', 
        flavorProfile: 'neutral', 
        isPlural: true, 
        suitability: ['wok-fry', 'simmer'], 
        description: 'Chewy wheat noodles, often served extra spicy for breakfast.',
        nation: 'fire-nation',
        location: 'Fire Nation Capital'
    },
    { 
        name: 'Fire-Proof Dough', 
        emoji: '🍞', 
        rarity: 'Common', 
        category: 'base', 
        flavorProfile: 'neutral', 
        isPlural: false, 
        suitability: ['bake'], 
        description: 'A special dough used for making fire cakes and other pastries that can withstand intense heat.',
        nation: 'fire-nation',
        location: 'Fire Nation Capital'
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
        description: 'A sweet, juicy fruit with a spiny shell, resembling a dragon\'s paw.',
        nation: 'fire-nation',
        location: 'Fire Nation Capital'
    },
    { 
        name: 'Ember Island Cherries', 
        emoji: '🍒', 
        rarity: 'Common', 
        category: 'fruit', 
        flavorProfile: 'sweet', 
        isPlural: true, 
        suitability: ['dessert', 'bake'], 
        description: 'Sweet and tart cherries grown exclusively on Ember Island, perfect for making ice cream.',
        nation: 'fire-nation',
        location: 'Ember Island',
        synergies: { 'Sweet Cream': 10 }
    },
    { 
        name: 'Star Apple', 
        emoji: '⭐', 
        rarity: 'Uncommon', 
        category: 'fruit', 
        flavorProfile: 'sweet', 
        isPlural: false, 
        suitability: ['dessert'], 
        description: 'A fruit with toxic skin but incredibly sweet, star-patterned flesh.',
        nation: 'fire-nation',
        location: 'Fire Nation Capital'
    },
    { 
        name: 'Sweet Cream', 
        emoji: '🍦', 
        rarity: 'Common', 
        category: 'dairy', 
        flavorProfile: 'sweet', 
        isPlural: false, 
        suitability: ['dessert'], 
        description: 'A rich cream used as a base for ice creams and a topping for hotcakes.',
        nation: 'fire-nation',
        location: 'Ember Island',
        synergies: { 'Ember Island Cherries': 10 }
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
        description: 'A spicy blend used to season grilled and roasted foods.',
        nation: 'fire-nation',
        location: 'Generic'
    },
    { 
        name: 'Garlic', 
        emoji: '🧄', 
        rarity: 'Common', 
        category: 'flavoring', 
        flavorProfile: 'pungent', 
        isPlural: false, 
        suitability: ['wok-fry', 'simmer', 'roast'], 
        description: 'A pungent bulb used as a base for many Fire Nation dishes.',
        nation: 'fire-nation',
        location: 'Generic'
    },
    { 
        name: 'Ginger', 
        emoji: '🫚', 
        rarity: 'Uncommon', 
        category: 'flavoring', 
        flavorProfile: 'savory', 
        isPlural: false, 
        suitability: ['wok-fry', 'steam', 'roast'], 
        description: 'A spicy root used to add warmth and depth to dishes.',
        nation: 'fire-nation',
        location: 'Generic'
    },
    { 
        name: 'Palm Sugar', 
        emoji: '🍬', 
        rarity: 'Common', 
        category: 'flavoring', 
        flavorProfile: 'sweet', 
        isPlural: false, 
        suitability: ['dessert', 'bake'], 
        description: 'A sweetener made from palm sap, used in desserts and sauces.',
        nation: 'fire-nation',
        location: 'Generic'
    },
    { 
        name: 'Flaming Fire Flakes', 
        emoji: '🔥', 
        rarity: 'Common', 
        category: 'garnish', 
        flavorProfile: 'pungent', 
        isPlural: true, 
        suitability: ['garnish', 'snack'], 
        description: 'Crispy, spicy flakes used as a topping or snack.',
        nation: 'fire-nation',
        location: 'Generic'
    },
    { 
        name: 'Sea Slug Paste', 
        emoji: '🌶️', 
        rarity: 'Common', 
        category: 'flavoring', 
        flavorProfile: 'umami', 
        isPlural: false, 
        suitability: ['garnish', 'flavoring'],
        description: 'A fermented, pungent paste made from sea slugs, used sparingly to add deep umami flavor.',
        nation: 'fire-nation',
        location: 'Generic'
    },
    
    // --- NEW BEVERAGE & SALAD INGREDIENTS ---
    { name: 'Spiced Tomato Juice', emoji: '🧃', rarity: 'Common', category: 'flavoring', flavorProfile: 'savory', isPlural: false, suitability: ['beverage'], description: 'The juice of sun-ripened tomatoes mixed with a blend of mild Fire Nation spices, served chilled.', nation: 'fire-nation', location: 'Generic' },
    { name: 'Volcanic Glass Noodles', emoji: '🍜', rarity: 'Uncommon', category: 'base', flavorProfile: 'neutral', isPlural: true, suitability: ['salad', 'soup-stew'], description: 'Translucent, chewy noodles made from sweet potato starch, often served cold in salads.', nation: 'fire-nation', location: 'Fire Nation Capital' },
    { name: 'Ember-Roasted Peppers', emoji: '🌶️', rarity: 'Common', category: 'vegetable', flavorProfile: 'savory', isPlural: true, suitability: ['salad', 'garnish'], description: 'Sweet peppers roasted directly in embers until the skin is blackened and the flesh is tender. A smoky salad component.', nation: 'fire-nation', location: 'Ember Island' },
    { name: 'Blackened Snake-Cucumber', emoji: '🥒', rarity: 'Common', category: 'vegetable', flavorProfile: 'savory', isPlural: false, suitability: ['salad'], description: 'A long, thin cucumber with dark skin, grilled lightly to impart a smoky flavor before being added to salads.', nation: 'fire-nation', location: 'Generic' },
    { name: 'Dragonfruit', emoji: '🐲', rarity: 'Uncommon', category: 'fruit', flavorProfile: 'sweet', isPlural: false, suitability: ['salad', 'beverage', 'dessert'], description: 'A visually stunning fruit with a mild sweetness, its vibrant pink flesh is often used in fruit salads and drinks.', nation: 'fire-nation', location: 'Ember Island' },
    { name: 'Passionfruit', emoji: '🍓', rarity: 'Common', category: 'fruit', flavorProfile: 'sweet', isPlural: false, suitability: ['beverage', 'dessert', 'garnish'], description: 'A tart, aromatic fruit whose pulp is used to flavor a variety of sweet drinks and desserts.', nation: 'fire-nation', location: 'Generic' },
    { name: 'Chili-Lime Seasoning', emoji: '🧂', rarity: 'Common', category: 'flavoring', flavorProfile: 'pungent', isPlural: false, suitability: ['salad', 'garnish'], description: 'A classic Fire Nation seasoning blend of dried chili powder and lime zest, perfect for sprinkling over fresh fruit and salads.', nation: 'fire-nation', location: 'Generic' },
    { name: 'Hibiscus Tea', emoji: '🌺', rarity: 'Common', category: 'flavoring', flavorProfile: 'sweet', isPlural: false, suitability: ['beverage'], description: 'A tart, crimson-colored tea made from dried hibiscus flowers, served either hot or iced.', nation: 'fire-nation', location: 'Fire Nation Capital' },
    { name: 'Shaved Ice', emoji: '🍧', rarity: 'Common', category: 'base', flavorProfile: 'neutral', isPlural: false, suitability: ['dessert', 'beverage'], description: 'Finely shaved ice used as a base for many refreshing treats, often topped with sweet syrups.', nation: 'fire-nation', location: 'Ember Island' },
    { name: 'Charred Pineapple', emoji: '🍍', rarity: 'Uncommon', category: 'fruit', flavorProfile: 'sweet', isPlural: false, suitability: ['salad', 'dessert', 'grill'], description: 'Pineapple slices grilled until caramelized and smoky, adding a sweet and tangy element to savory salads.', nation: 'fire-nation', location: 'Ember Island' }
]; 