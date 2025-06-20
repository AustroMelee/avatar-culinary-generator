import type { AirNomadIngredient } from '../../types.js';

/**
 * Complete collection of Air Nomad ingredients available for dish generation
 * Organized by category with appropriate rarity and cultural weight values
 * Each ingredient includes role classification for balanced dish composition
 */
export const airNomadIngredients: AirNomadIngredient[] = [
  // Grains - Foundation of Air Nomad sustenance (alphabetized)
  { name: 'Basmati Rice', category: 'grain', role: 'main', rarity: 'uncommon', culturalWeight: 8, isSacred: false },
  { name: 'Flour', category: 'grain', role: 'main', rarity: 'common', culturalWeight: 6, isSacred: false },
  { name: 'Glutinous Rice', category: 'grain', role: 'main', rarity: 'common', culturalWeight: 7, isSacred: false },
  { name: 'Noodles', category: 'grain', role: 'main', rarity: 'common', culturalWeight: 7, isSacred: false },
  { name: 'Pastry', category: 'grain', role: 'main', rarity: 'common', culturalWeight: 6, isSacred: false },
  { name: 'Rice', category: 'grain', role: 'main', rarity: 'common', culturalWeight: 8, isSacred: false },
  { name: 'Rice Flour', category: 'grain', role: 'main', rarity: 'common', culturalWeight: 7, isSacred: false },
  { name: 'Roasted Barley Flour', category: 'grain', role: 'main', rarity: 'uncommon', culturalWeight: 9, isSacred: false },

  // Vegetables - Fresh mountain produce (alphabetized)
  { name: 'Bamboo Shoots', category: 'vegetable', role: 'vegetable', rarity: 'uncommon', culturalWeight: 9, isSacred: false },
  { name: 'Bean Sprouts', category: 'vegetable', role: 'vegetable', rarity: 'common', culturalWeight: 7, isSacred: false },
  { name: 'Bell Peppers', category: 'vegetable', role: 'vegetable', rarity: 'common', culturalWeight: 6, isSacred: false },
  { name: 'Cabbage', category: 'vegetable', role: 'vegetable', rarity: 'common', culturalWeight: 7, isSacred: false },
  { name: 'Carrot', category: 'vegetable', role: 'vegetable', rarity: 'common', culturalWeight: 6, isSacred: false },
  { name: 'Chayote', category: 'vegetable', role: 'vegetable', rarity: 'uncommon', culturalWeight: 7, isSacred: false },
  { name: 'Chrysanthemum Greens', category: 'vegetable', role: 'vegetable', rarity: 'uncommon', culturalWeight: 9, isSacred: false },
  { name: 'Fiddlehead Ferns', category: 'vegetable', role: 'vegetable', rarity: 'rare', culturalWeight: 9, isSacred: false },
  { name: 'Lotus Root', category: 'vegetable', role: 'vegetable', rarity: 'uncommon', culturalWeight: 10, isSacred: false },
  { name: 'Onion', category: 'vegetable', role: 'vegetable', rarity: 'common', culturalWeight: 6, isSacred: false },
  { name: 'Oyster Mushroom', category: 'vegetable', role: 'vegetable', rarity: 'uncommon', culturalWeight: 8, isSacred: false },
  { name: 'Pickles', category: 'vegetable', role: 'garnish', rarity: 'common', culturalWeight: 6, isSacred: false },
  { name: 'Potato', category: 'vegetable', role: 'vegetable', rarity: 'common', culturalWeight: 5, isSacred: false },
  { name: 'Red Cabbage', category: 'vegetable', role: 'vegetable', rarity: 'common', culturalWeight: 7, isSacred: false },
  { name: 'Scallions', category: 'vegetable', role: 'garnish', rarity: 'common', culturalWeight: 6, isSacred: false },
  { name: 'Seaweed', category: 'vegetable', role: 'vegetable', rarity: 'uncommon', culturalWeight: 8, isSacred: false },
  { name: 'Shiitake', category: 'vegetable', role: 'vegetable', rarity: 'uncommon', culturalWeight: 8, isSacred: false },
  { name: 'Snow Lotus Petals', category: 'vegetable', role: 'garnish', rarity: 'legendary', culturalWeight: 10, isSacred: true },
  { name: 'Taro', category: 'vegetable', role: 'main', rarity: 'uncommon', culturalWeight: 7, isSacred: false },
  { name: 'Tomato', category: 'vegetable', role: 'vegetable', rarity: 'common', culturalWeight: 5, isSacred: false },
  { name: 'Water Chestnuts', category: 'vegetable', role: 'vegetable', rarity: 'uncommon', culturalWeight: 8, isSacred: false },
  { name: 'Yam', category: 'vegetable', role: 'main', rarity: 'common', culturalWeight: 6, isSacred: false },

  // Proteins - Plant-based Air Nomad diet (alphabetized)
  { name: 'Almonds', category: 'protein', role: 'garnish', rarity: 'uncommon', culturalWeight: 7, isSacred: false },
  { name: 'Azuki Beans', category: 'protein', role: 'main', rarity: 'uncommon', culturalWeight: 8, isSacred: false },
  { name: 'Cashews', category: 'protein', role: 'garnish', rarity: 'uncommon', culturalWeight: 7, isSacred: false },
  { name: 'Coconut', category: 'protein', role: 'garnish', rarity: 'uncommon', culturalWeight: 7, isSacred: false },
  { name: 'Egg Whites', category: 'protein', role: 'main', rarity: 'common', culturalWeight: 2, isSacred: false }, // Reduced cultural weight - not traditional Air Nomad
  { name: 'Eggs', category: 'protein', role: 'main', rarity: 'common', culturalWeight: 2, isSacred: false }, // Reduced cultural weight - not traditional Air Nomad
  { name: 'Jackfruit', category: 'protein', role: 'main', rarity: 'uncommon', culturalWeight: 8, isSacred: false },
  { name: 'Lychee Nuts', category: 'protein', role: 'garnish', rarity: 'uncommon', culturalWeight: 8, isSacred: false },
  { name: 'Mung Beans', category: 'protein', role: 'main', rarity: 'common', culturalWeight: 8, isSacred: false },
  { name: 'Pine Nuts', category: 'protein', role: 'garnish', rarity: 'rare', culturalWeight: 9, isSacred: false },
  { name: 'Silken Tofu', category: 'protein', role: 'main', rarity: 'uncommon', culturalWeight: 9, isSacred: false },
  { name: 'Tofu', category: 'protein', role: 'main', rarity: 'common', culturalWeight: 9, isSacred: false },

  // Fruits - Natural sweetness and sacred offerings (alphabetized)
  { name: 'Apple', category: 'fruit', role: 'fruit', rarity: 'common', culturalWeight: 7, isSacred: false },
  { name: 'Banana', category: 'fruit', role: 'fruit', rarity: 'common', culturalWeight: 7, isSacred: false },
  { name: 'Cloudberries', category: 'fruit', role: 'fruit', rarity: 'legendary', culturalWeight: 10, isSacred: true },
  { name: 'Dried Apricots', category: 'fruit', role: 'fruit', rarity: 'uncommon', culturalWeight: 8, isSacred: false },
  { name: 'Goji Berries', category: 'fruit', role: 'garnish', rarity: 'rare', culturalWeight: 9, isSacred: false },
  { name: 'Longan Fruit', category: 'fruit', role: 'fruit', rarity: 'uncommon', culturalWeight: 8, isSacred: false },
  { name: 'Moon Peaches', category: 'fruit', role: 'fruit', rarity: 'legendary', culturalWeight: 10, isSacred: true },
  { name: 'Raisins', category: 'fruit', role: 'garnish', rarity: 'common', culturalWeight: 7, isSacred: false },

  // Seasonings and Aromatics - Spiritual enhancement (alphabetized)
  { name: 'Butter', category: 'seasoning', role: 'seasoning', rarity: 'common', culturalWeight: 4, isSacred: false }, // Reduced weight - not traditional Air Nomad
  { name: 'Crystal Cave Minerals', category: 'seasoning', role: 'seasoning', rarity: 'rare', culturalWeight: 10, isSacred: true },
  { name: 'Fruit Extracts', category: 'seasoning', role: 'seasoning', rarity: 'uncommon', culturalWeight: 7, isSacred: false },
  { name: 'Ginger', category: 'seasoning', role: 'seasoning', rarity: 'common', culturalWeight: 8, isSacred: false },
  { name: 'Himalayan Salt', category: 'seasoning', role: 'seasoning', rarity: 'rare', culturalWeight: 9, isSacred: false },
  { name: 'Jasmine Blossoms', category: 'seasoning', role: 'garnish', rarity: 'rare', culturalWeight: 10, isSacred: true },
  { name: 'Lemon Zest', category: 'seasoning', role: 'seasoning', rarity: 'uncommon', culturalWeight: 7, isSacred: false },
  { name: 'Lemongrass', category: 'seasoning', role: 'seasoning', rarity: 'uncommon', culturalWeight: 8, isSacred: false },
  { name: 'Milk Powder', category: 'seasoning', role: 'seasoning', rarity: 'common', culturalWeight: 4, isSacred: false }, // Reduced weight - not traditional Air Nomad
  { name: 'Plum Filling', category: 'seasoning', role: 'seasoning', rarity: 'uncommon', culturalWeight: 8, isSacred: false },
  { name: 'Red Bean Paste', category: 'seasoning', role: 'seasoning', rarity: 'uncommon', culturalWeight: 8, isSacred: false },
  { name: 'Rock Sugar', category: 'seasoning', role: 'seasoning', rarity: 'uncommon', culturalWeight: 7, isSacred: false },
  { name: 'Sacred Lotus Root', category: 'seasoning', role: 'seasoning', rarity: 'legendary', culturalWeight: 10, isSacred: true },
  { name: 'Salt', category: 'seasoning', role: 'seasoning', rarity: 'common', culturalWeight: 6, isSacred: false },
  { name: 'Soy Sauce', category: 'seasoning', role: 'seasoning', rarity: 'common', culturalWeight: 7, isSacred: false },
  { name: 'Sugar', category: 'seasoning', role: 'seasoning', rarity: 'common', culturalWeight: 6, isSacred: false },
  { name: 'Sweet Fillings', category: 'seasoning', role: 'seasoning', rarity: 'common', culturalWeight: 7, isSacred: false },
  { name: 'Tea Leaves', category: 'seasoning', role: 'seasoning', rarity: 'uncommon', culturalWeight: 10, isSacred: false },
  { name: 'Toasted Sesame Seeds', category: 'seasoning', role: 'garnish', rarity: 'uncommon', culturalWeight: 7, isSacred: false },
  { name: 'Wild Honey', category: 'seasoning', role: 'seasoning', rarity: 'rare', culturalWeight: 9, isSacred: false },
  { name: 'Wind Flower Nectar', category: 'seasoning', role: 'seasoning', rarity: 'legendary', culturalWeight: 10, isSacred: true },

  // Liquids - Pure mountain sources (alphabetized)
  { name: 'Butter Tea', category: 'liquid', role: 'liquid', rarity: 'uncommon', culturalWeight: 10, isSacred: false },
  { name: 'Cream', category: 'liquid', role: 'liquid', rarity: 'uncommon', culturalWeight: 4, isSacred: false }, // Reduced weight - not traditional Air Nomad
  { name: 'Creamy Sauce', category: 'liquid', role: 'liquid', rarity: 'uncommon', culturalWeight: 4, isSacred: false }, // Reduced weight - not traditional Air Nomad
  { name: 'Milk', category: 'liquid', role: 'liquid', rarity: 'common', culturalWeight: 4, isSacred: false }, // Reduced weight - not traditional Air Nomad
  { name: 'Sky Bison Milk', category: 'liquid', role: 'liquid', rarity: 'legendary', culturalWeight: 10, isSacred: true },
  { name: 'Soy Milk', category: 'liquid', role: 'liquid', rarity: 'common', culturalWeight: 8, isSacred: false },
  { name: 'Vegetable Broth', category: 'liquid', role: 'liquid', rarity: 'common', culturalWeight: 8, isSacred: false },
  { name: 'Yak Milk', category: 'liquid', role: 'liquid', rarity: 'rare', culturalWeight: 8, isSacred: false } // Festival use with sky bison
];

/**
 * Filtered collection containing only strictly vegetarian ingredients
 * Excludes eggs and dairy products for traditional Air Nomad vegan diet
 */
export const strictVegetarianIngredients = airNomadIngredients.filter(ingredient => {
  // Exclude eggs and dairy products for strict Air Nomad diet
  const nonVegetarianItems = ['Eggs', 'Egg Whites', 'Butter', 'Milk', 'Cream', 'Creamy Sauce', 'Milk Powder'];
  return !nonVegetarianItems.includes(ingredient.name);
});

/**
 * Helper function to get ingredients by role for balanced dish composition
 * Enables role-based ingredient selection algorithms
 */
export function getIngredientsByRole(role: string, useStrictVegetarian: boolean = true): AirNomadIngredient[] {
  const ingredientPool = useStrictVegetarian ? strictVegetarianIngredients : airNomadIngredients;
  return ingredientPool.filter(ingredient => ingredient.role === role);
}

/**
 * Helper function to get high cultural weight ingredients for authentic Air Nomad dishes
 * Filters ingredients above specified cultural weight threshold
 */
export function getHighCulturalWeightIngredients(threshold: number = 7, useStrictVegetarian: boolean = true): AirNomadIngredient[] {
  const ingredientPool = useStrictVegetarian ? strictVegetarianIngredients : airNomadIngredients;
  return ingredientPool.filter(ingredient => ingredient.culturalWeight >= threshold);
} 