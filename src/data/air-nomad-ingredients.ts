import { AirNomadIngredient } from '../types.js';

/**
 * Complete collection of Air Nomad ingredients available for dish generation
 * Organized by category with appropriate rarity and cultural weight values
 */
export const airNomadIngredients: AirNomadIngredient[] = [
  // Grains
  { name: 'Sky Barley', category: 'grain', rarity: 'common', culturalWeight: 9 },
  { name: 'Cloud Rice', category: 'grain', rarity: 'uncommon', culturalWeight: 8 },
  { name: 'Wind Wheat', category: 'grain', rarity: 'common', culturalWeight: 7 },
  { name: 'Floating Quinoa', category: 'grain', rarity: 'rare', culturalWeight: 10 },

  // Vegetables
  { name: 'Air Cabbage', category: 'vegetable', rarity: 'common', culturalWeight: 10 },
  { name: 'Mountain Turnips', category: 'vegetable', rarity: 'common', culturalWeight: 6 },
  { name: 'Floating Lotus Root', category: 'vegetable', rarity: 'uncommon', culturalWeight: 9 },
  { name: 'Wind Peppers', category: 'vegetable', rarity: 'uncommon', culturalWeight: 8 },
  { name: 'Sky Bison Grass', category: 'vegetable', rarity: 'rare', culturalWeight: 10 },

  // Proteins
  { name: 'Cloud Tofu', category: 'protein', rarity: 'common', culturalWeight: 9 },
  { name: 'Wind-Dried Nuts', category: 'protein', rarity: 'common', culturalWeight: 7 },
  { name: 'Spirit Beans', category: 'protein', rarity: 'uncommon', culturalWeight: 10 },
  { name: 'Levitating Lentils', category: 'protein', rarity: 'rare', culturalWeight: 9 },

  // Seasonings
  { name: 'Mountain Salt', category: 'seasoning', rarity: 'common', culturalWeight: 5 },
  { name: 'Sky Pepper', category: 'seasoning', rarity: 'uncommon', culturalWeight: 8 },
  { name: 'Meditation Herbs', category: 'seasoning', rarity: 'uncommon', culturalWeight: 10 },
  { name: 'Sacred Wind Spice', category: 'seasoning', rarity: 'legendary', culturalWeight: 10 },

  // Liquids
  { name: 'Spring Water', category: 'liquid', rarity: 'common', culturalWeight: 6 },
  { name: 'Cloud Milk', category: 'liquid', rarity: 'uncommon', culturalWeight: 9 },
  { name: 'Airbender Tea', category: 'liquid', rarity: 'rare', culturalWeight: 10 }
]; 