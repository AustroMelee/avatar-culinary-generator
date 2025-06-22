import { NamingRule } from './types';
import { pick } from './utils';

export const conceptualNames: NamingRule[] = [
  {
    id: 'balance_in_a_bowl',
    title: (ctx) => `Balance in a Bowl`,
    text: `A dish designed to represent the spiritual balance between the elements.`,
    weighting: { fusion: true, minNations: 4 },
  },
  {
    id: 'four_nations_medley',
    title: (ctx) => `Four-Nations Medley`,
    text: `A harmonious blend of ingredients and techniques from across the world.`,
    weighting: { fusion: true, minNations: 4 },
  },
  {
    id: 'unity_noodles',
    title: (ctx) => `Unity Noodles`,
    text: `A symbol of cooperation, where ingredients from different nations come together in a single, satisfying dish.`,
    weighting: { fusion: true, minNations: 2, ingredients: ['Mountain Noodles', 'Seaweed Noodles', 'Egg Noodles'] },
  },
  {
    id: 'elemental_harmony',
    title: (ctx) => `Elemental Harmony ${ctx.cookingStyle.dishSubtype}`,
    text: `A dish that seeks to find the common ground between different elemental philosophies.`,
    weighting: { fusion: true, minNations: 2, themes: ['Humble & Meditative'] },
  },
  {
    id: 'the_avatar_special',
    title: (ctx) => `The Avatar's Special`,
    text: `A complex dish that only a true master of all culinary elements could create.`,
    weighting: { fusion: true, minNations: 3 },
  },
  {
    id: 'diplomats_luncheon',
    title: (ctx) => `Diplomat's Luncheon`,
    text: `A light but respectable meal, designed to be inoffensive and pleasing to dignitaries from all nations.`,
    weighting: { fusion: true, minNations: 2, dishTypes: ['side-dish', 'salad'] },
  },
  {
    id: 'harmony_blend',
    title: (ctx) => `Harmony Blend ${ctx.cookingStyle.dishSubtype}`,
    text: `A dish that embodies the balance between different elements and cultures.`,
    weighting: { fusion: true, minNations: 2, themes: ['Humble & Meditative'] },
  },
  {
    id: 'elemental_fusion',
    title: (ctx) => `Elemental Fusion ${ctx.primaryIngredient.name}`,
    text: `A dish that represents the unity of the four elements in perfect balance.`,
    weighting: { fusion: true, minNations: 4, themes: ['Ceremonial & Celebratory'] },
  },
  {
    id: 'spirit_world_essence',
    title: (ctx) => `Spirit World Essence ${ctx.cookingStyle.dishSubtype}`,
    text: `A dish inspired by the mystical energies of the Spirit World.`,
    weighting: { fusion: true, minNations: 2, themes: ['Ancient & Traditional'] },
  },
  {
    id: 'avatar_state_awakening',
    title: (ctx) => `Avatar State Awakening ${ctx.primaryIngredient.name}`,
    text: `A dish that captures the moment when all elements unite in perfect harmony.`,
    weighting: { fusion: true, minNations: 3, themes: ['Ceremonial & Celebratory'] },
  },
  {
    id: 'cosmic_balance',
    title: (ctx) => `Cosmic Balance ${ctx.cookingStyle.dishSubtype}`,
    text: `A dish that reflects the eternal dance between order and chaos in the universe.`,
    weighting: { fusion: true, minNations: 2, themes: ['Humble & Meditative'] },
  },
  {
    id: 'eternal_flame_water',
    title: (ctx) => `Eternal Flame Water ${ctx.primaryIngredient.name}`,
    text: `A dish that symbolizes the impossible union of fire and water elements.`,
    weighting: { fusion: true, nations: ['fire-nation', 'water-tribe'], themes: ['Invigorating & Playful'] },
  },
  {
    id: 'earth_sky_meditation',
    title: (ctx) => `Earth-Sky Meditation ${ctx.cookingStyle.dishSubtype}`,
    text: `A dish that bridges the grounded nature of earth with the freedom of air.`,
    weighting: { fusion: true, nations: ['earth-kingdom', 'air-nomads'], themes: ['Humble & Meditative'] },
  },
  {
    id: 'yin_yang_harmony',
    title: (ctx) => `Yin-Yang Harmony ${ctx.primaryIngredient.name}`,
    text: `A dish that embodies the ancient philosophy of complementary opposites.`,
    weighting: { fusion: true, minNations: 2, themes: ['Ancient & Traditional'] },
  },
  {
    id: 'primal_essence',
    title: (ctx) => `Primal Essence ${ctx.cookingStyle.dishSubtype}`,
    text: `A dish that connects to the most fundamental forces of nature.`,
    weighting: { fusion: true, minNations: 2, themes: ['Ancient & Traditional'] },
  },
  {
    id: 'unity_manifestation',
    title: (ctx) => `Unity Manifestation ${ctx.primaryIngredient.name}`,
    text: `A dish that represents the coming together of all nations in peace.`,
    weighting: { fusion: true, minNations: 3, themes: ['Ceremonial & Celebratory'] },
  },
  {
    id: 'balance_of_elements',
    title: (ctx) => `Balance of the Elements ${ctx.cookingStyle.dishSubtype}`,
    text: `A dish designed to represent the spiritual balance between different elemental philosophies.`,
    weighting: { fusion: true, minNations: 3 },
  },
  {
    id: 'four_nations_harmony',
    title: (ctx) => `Four-Nations Harmony ${pick(['Medley', 'Bowl', 'Feast']) || 'Medley'}`,
    text: `A harmonious blend of ingredients and techniques from across the world, celebrating global unity.`,
    weighting: { fusion: true, minNations: 4 },
  },
  {
    id: 'pan_national_unity',
    title: (ctx) => `Pan-National Unity Noodles`,
    text: `A symbol of cooperation, where noodles from different cultures are brought together in a single, satisfying dish.`,
    weighting: { fusion: true, minNations: 2, ingredients: ['Mountain Noodles', 'Seaweed Noodles', 'Egg Noodles'] },
  },
  {
    id: 'avatar_special_enhanced',
    title: (ctx) => `The Avatar's ${ctx.primaryIngredient.name} Special`,
    text: `A complex dish that only a true master of all culinary elements could create.`,
    weighting: { fusion: true, minNations: 3 },
  },
  {
    id: 'diplomats_luncheon_enhanced',
    title: (ctx) => `The Diplomat's Luncheon`,
    text: `A light but respectable meal, designed to be inoffensive and pleasing to dignitaries from all nations.`,
    weighting: { fusion: true, minNations: 2, dishTypes: ['side-dish', 'salad'], themes: ['Ceremonial & Celebratory'] },
  },
]; 