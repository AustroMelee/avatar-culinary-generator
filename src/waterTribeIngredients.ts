import { Ingredient } from './types';

/**
 * Water Tribe ingredients reflect their maritime culture and harsh environment.
 * Includes sea creatures, tundra plants, and preservation techniques.
 */
export const waterTribeIngredients: Ingredient[] = [
    // --- PROTEIN (From the Sea) ---
    { name: 'Sea Prunes', emoji: '🐙', rarity: 'Common', category: 'protein', flavorProfile: 'savory', isPlural: true, suitability: ['stew', 'poach', 'boil'], description: 'A staple of the Southern Water Tribe, these small, tender cephalopods are a primary source of protein.' },
    { name: 'Arctic Hen', emoji: '🐧', rarity: 'Common', category: 'protein', flavorProfile: 'savory', isPlural: false, suitability: ['stew', 'grill'], description: 'A flightless bird whose meat is rich and hearty, perfect for warming stews.' },
    { name: 'Tiger Seal', emoji: '🦭', rarity: 'Uncommon', category: 'protein', flavorProfile: 'savory', isPlural: false, suitability: ['stew', 'grill', 'cure'], description: 'A prized catch, providing tough but flavorful meat that is often cured for long voyages.' },
    { name: 'Moon-gilled Salmon', emoji: '🐟', rarity: 'Rare', category: 'protein', flavorProfile: 'umami', isPlural: false, suitability: ['poach', 'grill'], description: 'A beautiful fish whose gills shimmer with moonlight, known for its delicate, buttery flavor.' },
    { name: 'Glacier Shrimp', emoji: '🦐', rarity: 'Common', category: 'protein', flavorProfile: 'sweet', isPlural: true, suitability: ['poach', 'stew', 'boil'], description: 'Small, sweet shrimp found in the frigid waters beneath glaciers, sometimes dried into powder.' },
    { name: 'Giant Sea Crab', emoji: '🦀', rarity: 'Rare', category: 'protein', flavorProfile: 'savory', isPlural: false, suitability: ['stew', 'boil'], description: 'A delicacy of the Northern Water Tribe, considered by many to be the most sought-after food in the Northern Sea.'},
    { name: 'Platypus Bear', emoji: '🐻', rarity: 'Legendary', category: 'protein', flavorProfile: 'savory', isPlural: false, suitability: ['stew', 'grill'], description: 'An enormous and dangerous beast, served whole only at the grandest of Northern Water Tribe feasts.' },
    { name: 'Squid', emoji: '🦑', rarity: 'Common', category: 'protein', flavorProfile: 'savory', isPlural: false, suitability: ['stew', 'boil'], description: 'A common catch used in many popular soups and stews across both tribes.'},

    // --- VEGETABLES / FLORA (From the Tundra and Sea) ---
    { name: 'Kelp', emoji: '🌿', rarity: 'Common', category: 'vegetable', flavorProfile: 'umami', isPlural: false, suitability: ['poach', 'stew', 'boil', 'salad'], description: 'Versatile sea-vegetable used for noodles, wraps, and seasoning.' },
    { name: 'Sea Salt Root', emoji: '🥔', rarity: 'Common', category: 'vegetable', flavorProfile: 'savory', isPlural: false, suitability: ['stew', 'grill', 'boil'], description: 'A starchy root vegetable that grows in coastal soil, naturally infused with a mild saltiness.' },
    { name: 'Tundra Berries', emoji: '🫐', rarity: 'Common', category: 'vegetable', flavorProfile: 'savory', isPlural: true, suitability: ['stew', 'garnish', 'cure'], description: 'Hardy, tart berries that add a burst of acidity to rich, savory stews.' },
    { name: 'Ice-crystal Lettuce', emoji: '🥬', rarity: 'Uncommon', category: 'vegetable', flavorProfile: 'neutral', isPlural: false, suitability: ['salad'], description: 'A crisp, pale lettuce that thrives in the cold, with a texture like biting into fresh snow.' },
    { name: 'Dandelion Greens', emoji: '🌱', rarity: 'Uncommon', category: 'vegetable', flavorProfile: 'savory', isPlural: true, suitability: ['garnish', 'salad'], description: 'Bitter greens used as a garnish to cut through the richness of blubber and fatty meats.'},
    { name: 'Taro Root', emoji: '🍠', rarity: 'Rare', category: 'vegetable', flavorProfile: 'sweet', isPlural: false, suitability: ['stew', 'boil', 'freeze'], description: 'A sweet, starchy root grown in the Spirit Oasis, used to make a paste for mooncakes.'},
    
    // --- BASE (The foundation of a meal) ---
    { name: 'Seaweed Noodles', emoji: '🍜', rarity: 'Common', category: 'base', flavorProfile: 'umami', isPlural: true, suitability: ['stew', 'boil', 'poach'], description: 'Slippery, savory noodles made from processed kelp, a staple in brothy dishes.' },
    { name: 'Pearl-grain Rice', emoji: '🍚', rarity: 'Uncommon', category: 'base', flavorProfile: 'neutral', isPlural: false, suitability: ['stew', 'poach', 'boil'], description: 'A short-grain, sticky rice traded from the Earth Kingdom, considered a luxury.' },
    { name: 'Thick Blubber Broth', emoji: '🥣', rarity: 'Common', category: 'base', flavorProfile: 'savory', isPlural: false, suitability: ['stew', 'poach'], description: 'A rich, high-energy broth made from rendered seal blubber, essential for survival.' },
    { name: 'Imported Flour', emoji: '🌾', rarity: 'Uncommon', category: 'base', flavorProfile: 'neutral', isPlural: false, suitability: ['bake'], description: 'A luxury from the Earth Kingdom, used to make special breads and cookies after the War.'},

    // --- FRUIT & DESSERT ---
    { name: 'Snow Plums', emoji: '🍑', rarity: 'Common', category: 'fruit', flavorProfile: 'sweet', isPlural: true, suitability: ['freeze', 'brew'], description: 'Sweet, pale plums that have a unique, icy crunch when eaten raw.' },
    { name: 'Polar Berries', emoji: '🍓', rarity: 'Uncommon', category: 'fruit', flavorProfile: 'sweet', isPlural: true, suitability: ['freeze', 'brew'], description: 'Extremely sweet berries used to make frozen desserts and sweet drinks.' },
    { name: 'Arctic Cloudberries', emoji: '🫐', rarity: 'Rare', category: 'fruit', flavorProfile: 'sweet', isPlural: true, suitability: ['freeze', 'brew'], description: 'Golden-orange berries that grow close to the ground, prized for their unique tart-sweet flavor.' },
    { name: 'Sweetened Seal Milk', emoji: '🥛', rarity: 'Common', category: 'dairy', flavorProfile: 'sweet', isPlural: false, suitability: ['freeze', 'brew'], description: 'Rich, creamy milk used as the base for most Water Tribe frozen desserts.' },

    // --- FLAVORING & GARNISH ---
    { name: 'Glacier Salt', emoji: '🧂', rarity: 'Common', category: 'flavoring', flavorProfile: 'savory', isPlural: false, suitability: ['poach', 'stew', 'grill', 'cure', 'boil'], description: 'Coarse salt harvested from ancient glacial deposits.' },
    { name: 'Tundra Herbs', emoji: '🌿', rarity: 'Common', category: 'flavoring', flavorProfile: 'pungent', isPlural: true, suitability: ['stew', 'grill', 'cure'], description: 'A mix of hardy, aromatic herbs that grow on the sparse tundra.' },
    { name: 'Whale Oil', emoji: '💧', rarity: 'Common', category: 'flavoring', flavorProfile: 'umami', isPlural: false, suitability: ['grill', 'stew'], description: 'A rich, savory oil used for cooking and fueling lamps, defining the smoky taste of grilled foods.' },
    { name: 'Butterfly Pea Flower', emoji: '🌸', rarity: 'Legendary', category: 'flavoring', flavorProfile: 'sweet', isPlural: false, suitability: ['brew'], description: 'A rare flower from the Spirit Oasis, its extract is used in spiritual teas, turning them a beautiful blue.'},
    { name: 'Glacier Mint', emoji: '🍃', rarity: 'Uncommon', category: 'garnish', flavorProfile: 'sweet', isPlural: false, suitability: ['freeze', 'garnish', 'brew'], description: 'A potent mint that provides a cooling sensation, often used in drinks and desserts.' },
]; 