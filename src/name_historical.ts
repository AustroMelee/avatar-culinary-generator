import { NamingRule } from './types';
import { pick } from './utils';

export const historicalNames: NamingRule[] = [
  {
    id: 'republic_city_market',
    title: (ctx) => `Republic City Market ${ctx.cookingStyle.dishSubtype}`,
    description: `A popular street food found in the bustling markets where all cultures meet.`,
    weighting: { fusion: true, minNations: 2, dishTypes: ['snack', 'main-course'] },
  },
  {
    id: 'iroh_jasmine_dragon',
    title: (ctx) => `Jasmine Dragon's ${pick(['Secret', 'Finest', 'Special']) || 'Special'} ${ctx.primaryIngredient.name}`,
    description: `A specialty from Iroh's famous tea shop, blending techniques from his travels.`,
    weighting: { fusion: true, minNations: 2, ingredients: ['Ginseng', 'Lychee', 'Tea Leaves'] },
  },
  {
    id: 'colonial_fusion',
    title: (ctx) => `Colonial ${ctx.cookingStyle.dishSubtype} with ${ctx.primaryIngredient.name}`,
    description: `A dish originating from the former Fire Nation colonies, a true blend of two powerful cultures.`,
    weighting: { fusion: true, nations: ['fire-nation', 'earth-kingdom'] },
  },
  {
    id: 'aang_summit_feast',
    title: (ctx) => `Avatar Aang's Unity Feast ${pick(['Bao', 'Roast', 'Salad']) || 'Bao'}`,
    description: `Inspired by the feasts held by Avatar Aang to promote harmony among the nations after the war.`,
    weighting: { fusion: true, minNations: 3, themes: ['Ceremonial & Celebratory'] },
  },
  {
    id: 'southern_reconstruction_stew',
    title: (ctx) => `Southern Reconstruction Stew`,
    description: `A hearty meal created during the rebuilding of the Southern Water Tribe, using Earth Kingdom staples to supplement traditional polar ingredients.`,
    weighting: { fusion: true, nations: ['water-tribe', 'earth-kingdom'], dishTypes: ['soup-stew'] },
  },
  {
    id: 'ba_sing_se_university',
    title: (ctx) => `Ba Sing Se University ${ctx.cookingStyle.dishSubtype}`,
    description: `A scholarly dish created by university chefs experimenting with cultural exchange.`,
    weighting: { fusion: true, minNations: 2, dishTypes: ['main-course', 'dessert'] },
  },
  {
    id: 'avatar_kyoshi_festival',
    title: (ctx) => `Avatar Kyoshi Festival ${ctx.primaryIngredient.name}`,
    description: `A celebratory dish served during festivals honoring Avatar Kyoshi's legacy.`,
    weighting: { fusion: true, minNations: 2, themes: ['Ceremonial & Celebratory'] },
  },
  {
    id: 'white_lotus_society',
    title: (ctx) => `White Lotus Society ${ctx.cookingStyle.dishSubtype}`,
    description: `A refined dish shared among the secretive White Lotus Society members.`,
    weighting: { fusion: true, minNations: 2, themes: ['Ancient & Traditional'] },
  },
  {
    id: 'emerald_city_trade',
    title: (ctx) => `Emerald City Trade Route ${ctx.primaryIngredient.name}`,
    description: `A dish that evolved along the bustling trade routes connecting the four nations.`,
    weighting: { fusion: true, minNations: 2, themes: ['Invigorating & Playful'] },
  },
  {
    id: 'air_temple_meditation',
    title: (ctx) => `Air Temple Meditation ${ctx.cookingStyle.dishSubtype}`,
    description: `A peaceful dish served during meditation sessions at the Air Temples.`,
    weighting: { fusion: true, minNations: 2, themes: ['Humble & Meditative'] },
  },
  {
    id: 'fire_nation_coronation',
    title: (ctx) => `Fire Nation Coronation ${ctx.primaryIngredient.name}`,
    description: `A royal dish prepared for coronation ceremonies in the Fire Nation.`,
    weighting: { fusion: true, minNations: 2, themes: ['Ceremonial & Celebratory'] },
  },
  {
    id: 'water_tribe_ice_festival',
    title: (ctx) => `Water Tribe Ice Festival ${ctx.cookingStyle.dishSubtype}`,
    description: `A festive dish served during the annual ice festivals of the Water Tribes.`,
    weighting: { fusion: true, minNations: 2, themes: ['Ceremonial & Celebratory'] },
  },
  {
    id: 'earth_kingdom_harvest',
    title: (ctx) => `Earth Kingdom Harvest ${ctx.primaryIngredient.name}`,
    description: `A bountiful dish celebrating the rich harvests of the Earth Kingdom.`,
    weighting: { fusion: true, minNations: 2, themes: ['Humble & Meditative'] },
  },
  {
    id: 'southern_reconstruction',
    title: (ctx) => `Southern Reconstruction Stew`,
    description: `A hearty meal created during the reconstruction of the Southern Water Tribe, using Earth Kingdom staples to supplement traditional ingredients.`,
    weighting: { fusion: true, nations: ['water-tribe', 'earth-kingdom'], dishTypes: ['soup-stew'] },
  },
  {
    id: 'sun_warrior_pilgrimage',
    title: (ctx) => `Sun Warrior Pilgrim's Roast`,
    description: `A dish prepared by those who make the difficult journey to the ancient Sun Warrior civilization, combining Fire Nation discipline with ancient traditions.`,
    weighting: { fusion: true, nations: ['fire-nation'], themes: ['Ancient & Traditional'] },
  },
  {
    id: 'pro_bending_arena_snack',
    title: (ctx) => `Pro-Bending Arena ${ctx.cookingStyle.dishSubtype}`,
    description: `A high-energy meal sold outside the Pro-Bending Arena in Republic City, combining quick Fire Nation cooking with hearty Earth Kingdom ingredients.`,
    weighting: { fusion: true, nations: ['fire-nation', 'earth-kingdom'], dishTypes: ['snack', 'main-course'] },
  },
  {
    id: 'misty_palms_oasis_cooler',
    title: (ctx) => `Misty Palms Oasis Cooler`,
    description: `A refreshing dish created by members of the Order of the White Lotus at their oasis stronghold, using Water Tribe freezing techniques on desert fruits.`,
    weighting: { fusion: true, nations: ['water-tribe', 'earth-kingdom'], dishTypes: ['dessert', 'beverage'] },
  },
  {
    id: 'ember_island_vacation_treat',
    title: (ctx) => `Ember Island Vacation Treat`,
    description: `When the world opened up, Ember Island became a top tourist spot. Local vendors began mixing traditional Fire Nation sweets with exotic Air Nomad fruits.`,
    weighting: { fusion: true, nations: ['fire-nation', 'air-nomads'], dishTypes: ['dessert'] },
  },
];