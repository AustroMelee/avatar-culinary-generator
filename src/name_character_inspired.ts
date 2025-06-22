/**
 * Character-inspired naming rules for fusion dishes
 * Names inspired by the actions and personalities of Avatar characters
 */
import { NamingRule } from './types';
import { pick } from './utils';

export const characterInspiredNames: NamingRule[] = [
  {
    id: 'zuko_honor_quest',
    title: (ctx) => `Zuko's Redemption ${ctx.cookingStyle.dishSubtype}`,
    text: `A dish of conflicting flavors that ultimately find harmony, much like the Fire Lord's journey.`,
    weighting: { fusion: true, nations: ['fire-nation'], minNations: 2, themes: ['Humble & Meditative'] },
  },
  {
    id: 'katara_healing_arts',
    title: (ctx) => `Katara's Healing ${pick(['Broth', 'Tea', 'Congee', 'Soup']) || 'Broth'}`,
    text: `A comforting meal combining the restorative herbs of one culture with the nourishing bases of another.`,
    weighting: { fusion: true, nations: ['water-tribe'], dishTypes: ['soup-stew', 'beverage'] },
  },
  {
    id: 'sokka_invention',
    title: (ctx) => `Sokka's "Strategic" Meat-and-Veggie Surprise`,
    text: `A highly practical, if unconventional, combination of whatever could be found and cooked quickly. For the strategist on the go!`,
    weighting: { fusion: true, minNations: 2, themes: ['Invigorating & Playful'] },
  },
  {
    id: 'toph_earthly_delight',
    title: (ctx) => `Toph's Unpretentious ${ctx.primaryIngredient.name} Plate`,
    text: `A no-frills dish that combines solid, dependable ingredients. It might not look fancy, but it's got substance.`,
    weighting: { fusion: true, nations: ['earth-kingdom'] },
  },
  {
    id: 'aang_vegetarian_innovation',
    title: (ctx) => `Aang's Vegetarian ${ctx.cookingStyle.dishSubtype}`,
    text: `A creative dish that respects Air Nomad vegetarian principles while incorporating bold flavors from other cultures.`,
    weighting: { fusion: true, nations: ['air-nomads'], minNations: 2, noMeat: true },
  },
  {
    id: 'iroh_tea_house_experiment',
    title: (ctx) => `Iroh's Tea House ${ctx.primaryIngredient.name} Special`,
    text: `A dish created in Iroh's tea house, combining traditional comfort food with exotic Fire Nation techniques.`,
    weighting: { fusion: true, nations: ['earth-kingdom', 'fire-nation'], themes: ['Humble & Meditative'] },
  },
  {
    id: 'suki_kyoshi_warrior_training',
    title: (ctx) => `Suki's Training ${ctx.cookingStyle.dishSubtype}`,
    text: `A dish designed to provide the perfect balance of nutrition and energy for intensive Kyoshi Warrior training sessions.`,
    weighting: { fusion: true, nations: ['earth-kingdom'], minNations: 2, themes: ['Invigorating & Playful'] },
  },
  {
    id: 'azula_perfection_obsession',
    title: (ctx) => `Azula's Perfectionist ${ctx.primaryIngredient.name}`,
    text: `A dish representing the attempt to create the ultimate fusion cuisine, combining the most prestigious elements of multiple nations.`,
    weighting: { fusion: true, nations: ['fire-nation'], minNations: 2 },
  },
  {
    id: 'mai_detached_elegance',
    title: (ctx) => `Mai's Detached Elegance ${ctx.cookingStyle.dishSubtype}`,
    text: `A sophisticated dish that appears simple but contains hidden complexity, much like the character herself.`,
    weighting: { fusion: true, nations: ['fire-nation'], minNations: 2, themes: ['Ceremonial & Celebratory'] },
  },
  {
    id: 'ty_lee_cheerful_acrobatics',
    title: (ctx) => `Ty Lee's Cheerful ${ctx.primaryIngredient.name} Medley`,
    text: `A bright, energetic dish that combines unexpected ingredients in a way that somehow just works.`,
    weighting: { fusion: true, nations: ['fire-nation'], minNations: 2, themes: ['Invigorating & Playful'] },
  },
  {
    id: 'jet_freedom_fighter',
    title: (ctx) => `Jet's Freedom Fighter ${ctx.cookingStyle.dishSubtype}`,
    text: `A hearty, practical meal that could be prepared quickly in the wilderness, combining Earth Kingdom staples with whatever could be foraged.`,
    weighting: { fusion: true, nations: ['earth-kingdom'], minNations: 2, themes: ['Invigorating & Playful'] },
  },
  {
    id: 'long_feng_conspiracy',
    title: (ctx) => `Long Feng's Secret ${ctx.primaryIngredient.name}`,
    text: `A dish that appears to be one thing but contains hidden elements from other cultures, much like the Dai Li's secretive nature.`,
    weighting: { fusion: true, nations: ['earth-kingdom'], minNations: 2, themes: ['Ancient & Traditional'] },
  },
]; 