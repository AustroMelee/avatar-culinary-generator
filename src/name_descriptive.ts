import { NamingRule } from './types';

const nationAdjectives: Record<string, string> = {
    'air-nomads': 'Soaring',
    'water-tribe': 'Tidal',
    'earth-kingdom': 'Earthen',
    'fire-nation': 'Blazing',
};

export const descriptiveNames: NamingRule[] = [
  {
    id: 'golden_sunset_blend',
    title: (ctx) => `Golden Sunset Blend ${ctx.cookingStyle.dishSubtype}`,
    description: `A dish that captures the warm, golden light of sunset over the Fire Nation.`,
    weighting: { fusion: true, nations: ['fire-nation'], themes: ['Invigorating & Playful'] },
  },
  {
    id: 'misty_mountain_medley',
    title: (ctx) => `Misty Mountain Medley ${ctx.primaryIngredient.name}`,
    description: `A dish inspired by the fog-shrouded peaks of the Earth Kingdom mountains.`,
    weighting: { fusion: true, nations: ['earth-kingdom'], themes: ['Humble & Meditative'] },
  },
  {
    id: 'crystal_ice_harmony',
    title: (ctx) => `Crystal Ice Harmony ${ctx.cookingStyle.dishSubtype}`,
    description: `A dish that reflects the pristine beauty of Water Tribe ice formations.`,
    weighting: { fusion: true, nations: ['water-tribe'], themes: ['Ancient & Traditional'] },
  },
  {
    id: 'floating_cloud_delight',
    title: (ctx) => `Floating Cloud Delight ${ctx.primaryIngredient.name}`,
    description: `A dish that embodies the lightness and freedom of Air Nomad culture.`,
    weighting: { fusion: true, nations: ['air-nomads'], themes: ['Humble & Meditative'] },
  },
  {
    id: 'emerald_jade_fusion',
    title: (ctx) => `Emerald Jade Fusion ${ctx.cookingStyle.dishSubtype}`,
    description: `A dish that combines the rich green hues of Earth Kingdom jade with other elements.`,
    weighting: { fusion: true, minNations: 2, themes: ['Ancient & Traditional'] },
  },
  {
    id: 'crimson_flame_water',
    title: (ctx) => `Crimson Flame Water ${ctx.primaryIngredient.name}`,
    description: `A dish that marries the intensity of fire with the fluidity of water.`,
    weighting: { fusion: true, nations: ['fire-nation', 'water-tribe'], themes: ['Invigorating & Playful'] },
  },
  {
    id: 'azure_sky_earth',
    title: (ctx) => `Azure Sky Earth ${ctx.cookingStyle.dishSubtype}`,
    description: `A dish that bridges the vast blue sky with the solid foundation of earth.`,
    weighting: { fusion: true, nations: ['air-nomads', 'earth-kingdom'], themes: ['Humble & Meditative'] },
  },
  {
    id: 'golden_amber_blend',
    title: (ctx) => `Golden Amber Blend ${ctx.primaryIngredient.name}`,
    description: `A dish that captures the warm, honeyed tones of autumn harvests.`,
    weighting: { fusion: true, minNations: 2, themes: ['Ceremonial & Celebratory'] },
  },
  {
    id: 'silver_moonlight_essence',
    title: (ctx) => `Silver Moonlight Essence ${ctx.cookingStyle.dishSubtype}`,
    description: `A dish that reflects the mystical silver light of the moon over the Spirit World.`,
    weighting: { fusion: true, minNations: 2, themes: ['Ancient & Traditional'] },
  },
  {
    id: 'ruby_sunrise_special',
    title: (ctx) => `Ruby Sunrise Special ${ctx.primaryIngredient.name}`,
    description: `A dish that celebrates the brilliant red dawn of a new day across all nations.`,
    weighting: { fusion: true, minNations: 3, themes: ['Ceremonial & Celebratory'] },
  },
  {
    id: 'hyphenated_style',
    title: (ctx) => {
      const adj1 = nationAdjectives[ctx.fusionData.selectedNations[0]];
      const adj2 = nationAdjectives[ctx.fusionData.selectedNations[1]];
      return `${adj1}-${adj2} ${ctx.cookingStyle.dishSubtype}`;
    },
    description: `A direct fusion of two distinct national styles.`,
    weighting: { fusion: true, minNations: 2, maxNations: 2 },
  },
  {
    id: 'technique_focus',
    title: (ctx) => `${ctx.fusionData.selectedNations[0].split('-')[0]} Style ${ctx.cookingStyle.name}`,
    description: `Applying a traditional cooking method to ingredients from another land.`,
    weighting: { fusion: true, minNations: 2 },
  },
  {
    id: 'ingredient_spotlight',
    title: (ctx) => `Spiced ${ctx.primaryIngredient.name} with a ${ctx.fusionData.selectedNations[1].split('-')[0]} Twist`,
    description: `A dish that highlights a key ingredient prepared with foreign spices and techniques.`,
    weighting: { fusion: true, minNations: 2 },
  },
  {
    id: 'cross_cultural_dumpling',
    title: (ctx) => `Four-Elements Dumpling`,
    description: `A dumpling whose filling contains a signature ingredient from each of the four nations.`,
    weighting: { fusion: true, minNations: 4, dishTypes: ['snack'] },
  },
  {
    id: 'fusion_broth',
    title: (ctx) => `Republic City Broth Bowl`,
    description: `A complex broth combining the flavor bases of multiple nations.`,
    weighting: { fusion: true, minNations: 2, dishTypes: ['soup-stew'] },
  },
  {
    id: 'unexpected_pairing',
    title: (ctx) => `${ctx.primaryIngredient.name} and ${ctx.secondaryIngredient.name} Skewers`,
    description: `An unusual but delicious pairing of ingredients from different corners of the world.`,
    weighting: { fusion: true, minNations: 2 },
  },
];