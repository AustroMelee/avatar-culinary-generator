import { LoreEntry } from './types';

export const historicalLore: LoreEntry[] = [
  // --- Hundred Year War Era ---
  {
    id: 'history_war_rations',
    title: 'Soldier\'s Marching Stew',
    text: (ctx) => `During the darkest days of the Hundred Year War, Earth Kingdom soldiers needed rations that were light to carry but deeply nourishing. This stew, made from preserved ${ctx.primaryIngredient.name.toLowerCase()} and hardy roots, could be rehydrated over a small fire, providing a warm meal far from home.`,
    weighting: { nations: { 'earth-kingdom': 10 }, dishTypes: ['soup-stew'], compatibleForms: ['stew'] },
  },
  {
    id: 'history_kyoshi_island',
    title: 'Kyoshi\'s Defense',
    text: (ctx) => `When Chin the Conqueror threatened Kyoshi Island, the villagers prepared simple, quick meals like this to feed the Kyoshi Warriors during the standoff. It is said that Avatar Kyoshi herself shared a bowl of ${ctx.primaryIngredient.name.toLowerCase()} with her warriors the night before she split the peninsula from the mainland.`,
    weighting: { nations: { 'earth-kingdom': 8 }, ingredients: ['Kyoshi Elephant Koi', 'River Fish'], compatibleForms: ['stew', 'congee', 'plated'] },
  },
  {
    id: 'history_sozins_comet',
    title: 'Comet-Fired Roast',
    text: (ctx) => `On the day of Sozin's Comet, Fire Nation armies prepared massive feasts, roasting ${ctx.primaryIngredient.name.toLowerCase()} with the immense power granted by the comet. This dish was meant to be the first meal served in the conquered city of Ba Sing Se, a symbol of ultimate victory.`,
    weighting: { nations: { 'fire-nation': 12 }, styles: ['Roasting'], minRarity: 'Rare', compatibleForms: ['roast'] },
  },

  // --- Post-War / Republic City Era ---
  {
    id: 'history_republic_city_founding',
    title: 'The Unity Dumpling',
    text: (ctx) => `Served at the first-ever meeting of the United Republic Council, this dumpling was designed as a symbol of unity. It contains ingredients from every nation—${ctx.primaryIngredient.name.toLowerCase()} representing the ${ctx.primaryIngredient.category}, and other spices representing the others—all wrapped in a single, harmonious package.`,
    weighting: { fusion: 20, dishTypes: ['snack'], styles: ['Dumpling Making'], compatibleForms: ['dumpling'] },
  },
  {
    id: 'history_zuko_first_feast',
    title: 'The Fire Lord\'s Peace',
    text: (ctx) => `For his first official state dinner as Fire Lord, Zuko famously refused the traditional 100-course spicy feast. Instead, he requested this simple, humble meal to show his people that the era of aggressive opulence was over, and an era of peace and humility had begun.`,
    weighting: { nations: { 'fire-nation': 10 }, themes: ['Humble & Meditative'] },
  },

  // --- Ancient History / Avatar Legends ---
  {
    id: 'history_yangchen_offering',
    title: 'Yangchen\'s Offering',
    text: (ctx) => `Legend says that Avatar Yangchen would prepare this meal not for herself, but as an offering to the spirits of the mountains. She believed that by feeding the spirits with the purest ingredients from the land, she could foster peace and balance in the mortal world.`,
    weighting: { nations: { 'air-nomads': 15 }, themes: ['Ancient & Traditional', 'Ceremonial & Celebratory'], minRarity: 'Rare' },
  },
  {
    id: 'history_wan_voyage',
    title: 'The First Journey',
    text: (ctx) => `When Avatar Wan was banished, he survived on simple foods like this, learning to cook with his newfound firebending. This dish is a recreation of what he might have eaten on his journey, a meal of survival that paved the way for the age of the Avatar.`,
    weighting: { fusion: 10, ingredients: ['Fire Chili'] },
  },
]; 