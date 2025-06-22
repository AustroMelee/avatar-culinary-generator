import { LoreEntry } from './types';

export const philosophicalLore: LoreEntry[] = [
  // --- Air Nomad Philosophy ---
  {
    id: 'air_non_attachment',
    title: 'The Unburdened Spirit',
    text: (ctx) => `This simple dish reflects the Air Nomad principle of detachment. Like the wind, flavors are not meant to be possessed, only experienced in the moment. The clean taste of ${ctx.primaryIngredient.name.toLowerCase()} is a reminder that true nourishment comes not from richness, but from clarity.`,
    weighting: { nations: { 'air-nomads': 15 }, styles: ['Steaming', 'Minimalist Assembly'] },
  },
  {
    id: 'air_tranquility',
    title: 'A Meditative Meal',
    text: (ctx) => `Air Nomad chefs believe the energy of the cook is transferred to the food. This meal is prepared in total silence and focus, a moving meditation. It is said that eating it helps quiet the mind, making it a favorite before deep meditation sessions.`,
    weighting: { nations: { 'air-nomads': 12 }, themes: ['Humble & Meditative'] },
  },
  {
    id: 'air_freedom',
    title: 'The Open Sky',
    text: (ctx) => `The lightness of this dish is intentional, a culinary representation of freedom. It is unburdened by heavy sauces or complex spices, much like an airbender is unburdened by earthly possessions, free to roam the four winds.`,
    weighting: { nations: { 'air-nomads': 10 }, dishTypes: ['salad', 'beverage'] },
  },

  // --- Water Tribe Philosophy ---
  {
    id: 'water_community',
    title: 'The Shared Pot',
    text: (ctx) => `In the frigid poles, community is survival. This ${ctx.cookingStyle.dishSubtype.toLowerCase()} is traditionally cooked in a single, large pot in the center of the hut, its warmth a beacon drawing the family together. To share this meal is to reaffirm the bonds of the tribe.`,
    weighting: { nations: { 'water-tribe': 15 }, styles: ['Stewing', 'Boiling'], compatibleForms: ['stew', 'congee'] },
  },
  {
    id: 'water_harmony',
    title: 'Push and Pull',
    text: (ctx) => `The Water Tribe philosophy of harmony—the push and pull of the tides, of action and inaction—is embodied in this dish. The bold flavor of ${ctx.primaryIngredient.name.toLowerCase()} is balanced by the gentle, yielding broth, a perfect union of strength and grace.`,
    weighting: { nations: { 'water-tribe': 12 }, themes: ['Ancient & Traditional'] },
  },
  {
    id: 'water_respect_spirits',
    title: 'A Gift from the Ocean',
    text: (ctx) => `Every animal caught is considered a gift from the Ocean and Moon Spirits. No part is wasted. This dish uses ${ctx.primaryIngredient.name.toLowerCase()} in its entirety, a sign of respect and gratitude for the life that sustains the tribe.`,
    weighting: { nations: { 'water-tribe': 10 }, categories: ['protein'] },
  },

  // --- Earth Kingdom Philosophy ---
  {
    id: 'earth_resilience',
    title: 'The Unbreakable Will',
    text: (ctx) => `This is a farmer's meal, born of resilience and patience. It is hearty, substantial, and dependable—much like the people of the Earth Kingdom themselves. It provides the strength to stand firm against any hardship, to wait for the turning of the seasons.`,
    weighting: { nations: { 'earth-kingdom': 15 }, categories: ['vegetable', 'base'] },
  },
  {
    id: 'earth_neutral_jing',
    title: 'Waiting and Listening',
    text: (ctx) => `The principle of Neutral Jing—waiting and listening for the right moment to act—is crucial in preparing this dish. The ingredients must be simmered (or roasted) for hours, patiently waiting for the exact moment they achieve peak tenderness and flavor.`,
    weighting: { nations: { 'earth-kingdom': 12 }, styles: ['Roasting', 'Braising', 'Congee Making'] },
  },
  {
    id: 'earth_diversity',
    title: 'A Kingdom in a Bowl',
    text: (ctx) => `The Earth Kingdom is a mosaic of countless towns and cultures. This dish, with its many varied ingredients, represents that diversity. Each component is distinct, yet they come together to create a harmonious and stronger whole, just like the kingdom itself.`,
    weighting: { nations: { 'earth-kingdom': 10 }, minIngredients: 4, compatibleForms: ['stew', 'congee', 'plated'] },
  },

  // --- Fire Nation Philosophy ---
  {
    id: 'fire_discipline',
    title: 'The Inner Fire',
    text: (ctx) => `Firebending is not about rage; it is about breath, control, and discipline. The intense heat used to create this dish must be perfectly controlled. A moment's distraction, and the meal is ruined. It is a dish that demands respect for the flame.`,
    weighting: { nations: { 'fire-nation': 15 }, styles: ['Grilling', 'Wok-frying'] },
  },
  {
    id: 'fire_ambition',
    title: 'A Taste of Power',
    text: (ctx) => `This is a dish of ambition, served in the halls of power and the war rooms of generals. Its bold, spicy flavors are meant to invigorate the mind and fuel the drive for greatness. It is not a meal for the timid.`,
    weighting: { nations: { 'fire-nation': 12 }, ingredients: ['Fire Chili', 'Togarashi Spice'] },
  },
  {
    id: 'fire_passion',
    title: 'The Heart of the Volcano',
    text: (ctx) => `The Fire Nation is a land of passion, and this dish is its culinary expression. The searing heat and explosive flavor of ${ctx.primaryIngredient.name.toLowerCase()} are meant to be felt as much as tasted—a jolt of energy and life.`,
    weighting: { nations: { 'fire-nation': 10 }, themes: ['Invigorating & Playful'] },
  },

  // --- Fusion Philosophy ---
  {
    id: 'fusion_republic_city',
    title: 'The Melting Pot',
    text: (ctx) => `Born in the bustling markets of Republic City, this dish is a symbol of a new era. It takes the ${ctx.fusionData.selectedNations[0].split('-')[0]} tradition of using ${ctx.primaryIngredient.name.toLowerCase()} and combines it with the ${ctx.fusionData.selectedNations[1].split('-')[0]} method of ${ctx.cookingStyle.name.toLowerCase()}, creating something entirely new.`,
    weighting: { fusion: 15, minNations: 2 },
  },
  {
    id: 'fusion_harmony',
    title: 'The Balance of Elements',
    text: (ctx) => `Avatar Aang taught that the four nations are meant to live in harmony. This dish is a celebration of that ideal, proving that even the most different of ingredients and techniques can be brought together to create a balanced and beautiful whole.`,
    weighting: { fusion: 12, minNations: 4 },
  },
]; 