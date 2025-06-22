// src/airNomadIngredients.ts

import { Ingredient } from './types';

export const airNomadIngredients: Ingredient[] = [
    // --- FRUIT ---
    { name: 'Apple', emoji: '🍎', rarity: 'Common', category: 'fruit', flavorProfile: 'sweet', isPlural: false, suitability: ['pie', 'bake', 'salad', 'juice'], description: 'A crisp, versatile fruit, often used in both pies and refreshing juices.' },
    { name: 'Banana', emoji: '🍌', rarity: 'Common', category: 'fruit', flavorProfile: 'sweet', isPlural: false, suitability: ['pie', 'bake', 'juice'], description: 'A soft, sweet fruit that provides quick energy for long meditation sessions.' },
    { name: 'Moon Peach', emoji: '🍑', rarity: 'Rare', category: 'fruit', flavorProfile: 'sweet', isPlural: false, suitability: ['pie', 'salad', 'garnish'], description: 'A rare, mystical fruit said to bloom only under the full moon.' },
    { name: 'Lychee Nuts', emoji: '🥭', rarity: 'Uncommon', category: 'fruit', flavorProfile: 'sweet', isPlural: true, suitability: ['pie', 'salad', 'juice', 'garnish'], description: 'Small, fragrant fruits with a delicate sweetness and floral aroma.' },
    { name: 'Mango', emoji: '🥭', rarity: 'Uncommon', category: 'fruit', flavorProfile: 'sweet', isPlural: false, suitability: ['pie', 'curry', 'salad', 'juice'], description: 'A tropical fruit with rich, sweet flesh perfect for both sweet and savory dishes.' },
    { name: 'Coconut', emoji: '🥥', rarity: 'Uncommon', category: 'fruit', flavorProfile: 'sweet', isPlural: false, suitability: ['pie', 'bake', 'curry'], description: 'A versatile fruit providing both meat and milk for various culinary uses.' },
    { name: 'Plums', emoji: '🫐', rarity: 'Common', category: 'fruit', flavorProfile: 'sweet', isPlural: true, suitability: ['pie', 'bake', 'juice'], description: 'Juicy, tart fruits that are often preserved or baked into pastries.' },

    // --- VEGETABLES ---
    { name: 'Cabbage', emoji: '🥬', rarity: 'Common', category: 'vegetable', flavorProfile: 'savory', isPlural: false, suitability: ['steam', 'stir-fry', 'curry', 'salad', 'dumpling'], description: 'A leafy green that forms the base of many hearty Air Nomad dishes.' },
    { name: 'Carrot', emoji: '🥕', rarity: 'Common', category: 'vegetable', flavorProfile: 'sweet', isPlural: false, suitability: ['steam', 'stir-fry', 'curry', 'salad', 'dumpling', 'bake', 'juice'], description: 'A sweet root vegetable that adds color and crunch to meals.' },
    { name: 'Bean Sprouts', emoji: '🌱', rarity: 'Common', category: 'vegetable', flavorProfile: 'neutral', isPlural: true, suitability: ['steam', 'stir-fry', 'salad'], description: 'Tender, crisp sprouts that add a fresh, clean flavor.' },
    { name: 'Onion', emoji: '🧅', rarity: 'Common', category: 'vegetable', flavorProfile: 'pungent', isPlural: false, suitability: ['stir-fry', 'curry', 'dumpling', 'bake', 'pie'], description: 'A foundational vegetable that adds savory depth to countless recipes.' },
    { name: 'Potato', emoji: '🥔', rarity: 'Common', category: 'vegetable', flavorProfile: 'neutral', isPlural: false, suitability: ['steam', 'curry', 'bake', 'pie'], description: 'A starchy, comforting staple grown in high-altitude temple gardens.' },
    { name: 'Tomato', emoji: '🍅', rarity: 'Common', category: 'vegetable', flavorProfile: 'savory', isPlural: false, suitability: ['curry', 'salad', 'bake'], description: 'A juicy, bright vegetable used in sauces, salads, and baked dishes.' },
    { name: 'Pickles', emoji: '🥒', rarity: 'Common', category: 'vegetable', flavorProfile: 'savory', isPlural: true, suitability: ['salad', 'garnish'], description: 'Cucumbers preserved in a tangy brine, adding a sharp kick to meals.' },
    { name: 'Peppers', emoji: '🌶️', rarity: 'Common', category: 'vegetable', flavorProfile: 'savory', isPlural: true, suitability: ['steam', 'stir-fry', 'curry', 'salad'], description: 'A colorful vegetable that adds a mild, sweet heat.' },

    // --- FUNGI ---
    { name: 'Oyster Mushrooms', emoji: '🍄', rarity: 'Common', category: 'fungi', flavorProfile: 'umami', isPlural: true, suitability: ['steam', 'stir-fry', 'curry', 'pie'], description: 'Delicate, fan-shaped mushrooms with a subtle, savory flavor.' },
    { name: 'Shiitake Mushrooms', emoji: '🍄', rarity: 'Uncommon', category: 'fungi', flavorProfile: 'umami', isPlural: true, suitability: ['steam', 'stir-fry', 'curry', 'pie', 'dumpling'], description: 'Rich, meaty mushrooms prized for their deep umami flavor and medicinal properties.' },

    // --- BASE ---
    { name: 'Light Vegetable Broth', emoji: '🥣', rarity: 'Common', category: 'base', flavorProfile: 'savory', isPlural: false, suitability: ['curry', 'steam'], description: 'A clear, savory broth made from mountain vegetables, used as a base for soups and stews.' },
    { name: 'Rice', emoji: '🍚', rarity: 'Common', category: 'base', flavorProfile: 'neutral', isPlural: false, suitability: ['steam', 'curry', 'stir-fry', 'salad', 'bake'], description: 'The staple grain of Air Nomad cuisine, symbolizing simplicity and sustenance.' },
    { name: 'Barley', emoji: '🌾', rarity: 'Common', category: 'base', flavorProfile: 'neutral', isPlural: false, suitability: ['steam', 'curry', 'bake'], description: 'A hearty grain that provides warmth and nourishment during cold mountain nights.' },
    { name: 'Flour', emoji: '🌾', rarity: 'Common', category: 'base', flavorProfile: 'neutral', isPlural: false, suitability: ['bake', 'pie', 'dumpling'], description: 'Finely milled grain used for baking breads, pies, and dumplings.' },
    { name: 'Mountain Noodles', emoji: '🍜', rarity: 'Common', category: 'base', flavorProfile: 'neutral', isPlural: true, suitability: ['steam', 'stir-fry', 'curry'], description: 'Simple, elegant noodles made from mountain spring water and flour.' },

    // --- PROTEIN ---
    { name: 'Tofu', emoji: '⬜', rarity: 'Common', category: 'protein', flavorProfile: 'neutral', isPlural: false, suitability: ['steam', 'stir-fry', 'curry', 'bake', 'salad', 'dumpling'], description: 'Versatile soybean curd that absorbs the flavors of any dish.' },
    { name: 'Mung Beans', emoji: '🫘', rarity: 'Common', category: 'protein', flavorProfile: 'savory', isPlural: true, suitability: ['curry', 'salad', 'steam'], description: 'Small, nutritious legumes that sprout easily and provide essential protein.' },
    { name: 'Lentils of the Four Winds', emoji: '🫘', rarity: 'Common', category: 'protein', flavorProfile: 'savory', isPlural: true, suitability: ['curry', 'bake', 'pie'], description: 'Sacred legumes said to be blessed by the four winds, providing strength and wisdom.' },
    { name: 'Temple Nuts', emoji: '🌰', rarity: 'Common', category: 'protein', flavorProfile: 'savory', isPlural: true, suitability: ['salad', 'bake', 'garnish'], description: 'Nuts harvested from the sacred trees surrounding Air Nomad temples.' },
    
    // --- FLAVORING ---
    { name: 'Garlic', emoji: '🧄', rarity: 'Common', category: 'flavoring', flavorProfile: 'pungent', isPlural: false, suitability: ['steam', 'stir-fry', 'curry', 'bake', 'pie', 'dumpling'], description: 'A pungent bulb that adds depth and character to any dish.' },
    { name: 'Ginger', emoji: '🫚', rarity: 'Common', category: 'flavoring', flavorProfile: 'pungent', isPlural: false, suitability: ['steam', 'stir-fry', 'curry', 'bake', 'pie', 'dumpling', 'juice'], description: 'A warming root that adds spice and aids digestion, valued for its medicinal properties.' },
    { name: 'Vanilla', emoji: '🍦', rarity: 'Rare', category: 'flavoring', flavorProfile: 'sweet', isPlural: false, suitability: ['bake', 'pie', 'juice'], description: 'A rare, aromatic spice that adds subtle sweetness and complexity to desserts.' },
    { name: "Monk's Honey", emoji: '🍯', rarity: 'Uncommon', category: 'flavoring', flavorProfile: 'sweet', isPlural: false, suitability: ['bake', 'pie', 'juice', 'garnish'], description: 'Pure honey collected by Air Nomad monks, said to contain the essence of mountain flowers.' },
    { name: 'Bird\'s Eye Chili', emoji: '🌶️', rarity: 'Rare', category: 'flavoring', flavorProfile: 'pungent', isPlural: false, suitability: ['curry', 'stir-fry'], description: 'A tiny, fiery chili that adds intense heat, used sparingly by the brave.' },
];