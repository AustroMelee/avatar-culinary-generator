/**
 * Character fusion lore entries for fusion dishes
 * Stories about characters and their cross-cultural experiences
 */
import { LoreEntry } from './types';

export const characterFusionLore: LoreEntry[] = [
  {
    id: 'char_zuko_tea_appreciation',
    title: 'Zuko\'s Tea Lesson',
    text: (ctx) => `Iroh taught Zuko that appreciating other cultures is a source of strength. He had Zuko learn to prepare this classic Earth Kingdom dish, but challenged him to enhance it using the precise heat control of a Firebender, a lesson in both cooking and diplomacy.`,
    weighting: { fusion: 10, nations: { 'earth-kingdom': 5, 'fire-nation': 5 } },
  },
  {
    id: 'char_katara_healing_broth',
    title: 'Katara\'s Healing Broth',
    text: (ctx) => `During her travels, Katara learned about the healing properties of Air Nomad herbs. She began incorporating them into her traditional Water Tribe broths, creating a soup that could not only warm the body but also soothe the spirit.`,
    weighting: { fusion: 10, nations: { 'water-tribe': 5, 'air-nomads': 5 }, dishTypes: ['soup-stew'] },
  },
  {
    id: 'char_sokka_strategy_snack',
    title: 'The Strategist\'s Snack',
    text: (ctx) => `Sokka believed that a good strategist must understand their opponent's resources. He "invented" this snack by combining cured Water Tribe meat with easily stored Earth Kingdom grains, creating the perfect, non-perishable food for a long campaign.`,
    weighting: { fusion: 10, nations: { 'water-tribe': 5, 'earth-kingdom': 5 }, dishTypes: ['snack'] },
  },
  {
    id: 'char_toph_beifong_banquet',
    title: 'The Beifong Banquet',
    text: (ctx) => `Despite her preference for simple food, Toph's family insisted on serving opulent dishes at their banquets. Their chefs would often import exotic Fire Nation ingredients to create flashy, impressive meals like this one to impress their high-society guests.`,
    weighting: { fusion: 10, nations: { 'earth-kingdom': 5, 'fire-nation': 5 }, minRarity: 'Uncommon' },
  },
  {
    id: 'char_aang_vegetarian_fusion',
    title: 'Aang\'s Vegetarian Innovation',
    text: (ctx) => `As the bridge between nations, Aang often experimented with combining different culinary traditions. This dish represents his attempt to create a satisfying meal that respects Air Nomad vegetarian principles while incorporating the bold flavors of other cultures.`,
    weighting: { fusion: 10, nations: { 'air-nomads': 5 }, minNations: 2, noMeat: true },
  },
  {
    id: 'char_iroh_tea_house_experiment',
    title: 'Iroh\'s Tea House Experiment',
    text: (ctx) => `In his tea house, Iroh loved to experiment with new combinations. This dish was created when he decided to serve traditional Earth Kingdom comfort food alongside his signature Fire Nation tea, resulting in a unique fusion that became a customer favorite.`,
    weighting: { fusion: 10, nations: { 'earth-kingdom': 5, 'fire-nation': 5 }, themes: ['Humble & Meditative'] },
  },
  {
    id: 'char_suki_kyoshi_warrior_training',
    title: 'Suki\'s Training Meal',
    text: (ctx) => `As leader of the Kyoshi Warriors, Suki often hosted visiting warriors from other nations. This dish was created to provide the perfect balance of nutrition and energy for their intensive training sessions, combining local ingredients with techniques from visiting masters.`,
    weighting: { fusion: 10, nations: { 'earth-kingdom': 5 }, minNations: 2, themes: ['Invigorating & Playful'] },
  },
  {
    id: 'char_azula_perfection_obsession',
    title: 'Azula\'s Perfectionist Creation',
    text: (ctx) => `Even in exile, Azula maintained her obsession with perfection. This dish represents her attempt to create the ultimate fusion cuisine, combining the most prestigious elements of multiple nations into a dish that would prove her superiority.`,
    weighting: { fusion: 10, nations: { 'fire-nation': 5 }, minNations: 2, minRarity: 'Uncommon' },
  },
]; 