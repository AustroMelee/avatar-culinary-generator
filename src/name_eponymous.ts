/**
 * Eponymous Names Module
 * 
 * This module creates names that are eponymous—named after a specific person, 
 * place, or group—which adds a rich sense of history and provenance.
 */

import { NamingRule } from './types';
import { pick } from './utils';

export const eponymousNames: NamingRule[] = [
  {
    id: 'name_guru_pathik',
    title: (ctx) => `Guru Pathik's Chakra Bowl`,
    description: `A simple, vegetarian meal designed by the guru to open the body's chakras.`,
    weighting: { fusion: false, nations: ['air-nomads', 'earth-kingdom'], dishTypes: ['salad', 'soup-stew'], noMeat: true },
  },
  {
    id: 'name_kyoshi_warrior',
    title: (ctx) => `Kyoshi Warrior's Ration`,
    description: `A compact, high-energy meal designed for the defenders of Kyoshi Island.`,
    weighting: { fusion: false, nations: ['earth-kingdom'], dishTypes: ['snack'] },
  },
  {
    id: 'name_avatar_roku',
    title: (ctx) => `Roku's Regret`,
    description: `A Fire Nation dish prepared with cooling Water Tribe ingredients, a somber reflection on past mistakes.`,
    weighting: { fusion: true, minNations: 2, nations: ['fire-nation', 'water-tribe'], themes: ['Humble & Meditative'] },
  },
  {
    id: 'name_cabbage_merchant',
    title: (ctx) => `The Cabbage Merchant's Lament`,
    description: `A simple cabbage stew. Surprisingly delicious, yet carries an inexplicable aura of sadness and misfortune.`,
    weighting: { fusion: false, nations: ['earth-kingdom'], ingredients: ['Cabbage'] },
  },
  {
    id: 'name_admiral_zhao',
    title: (ctx) => `Zhao's Conquest Feast`,
    description: `An arrogant, overly-spiced dish, combining the finest ingredients of two nations, meant to be served after a successful invasion.`,
    weighting: { fusion: true, minNations: 2, themes: ['Ceremonial & Celebratory'], ingredients: ['Pork Belly', 'Fire Chili'] },
  },
  {
    id: 'name_king_bumi',
    title: (ctx) => `King Bumi's Madness`,
    description: `A dish that combines seemingly incompatible ingredients in a way that somehow works perfectly, just like the mad genius of Omashu's king.`,
    weighting: { fusion: true, minNations: 2, themes: ['Invigorating & Playful'] },
  },
  {
    id: 'name_jet_freedom_fighter',
    title: (ctx) => `Jet's Forest Stew`,
    description: `A hearty stew made with ingredients foraged from the forest, representing the resourcefulness and determination of the Freedom Fighters.`,
    weighting: { fusion: false, nations: ['earth-kingdom'], dishTypes: ['soup-stew'], themes: ['Humble & Meditative'] },
  },
  {
    id: 'name_princess_azula',
    title: (ctx) => `Azula's Precision`,
    description: `A dish that requires exact timing and perfect technique to prepare, reflecting the princess's obsession with perfection and control.`,
    weighting: { fusion: false, nations: ['fire-nation'], themes: ['Ceremonial & Celebratory'] },
  },
  {
    id: 'name_iroh_tea_master',
    title: (ctx) => `Uncle Iroh's Wisdom`,
    description: `A simple but profound dish that teaches patience and balance, much like the wisdom of the Dragon of the West.`,
    weighting: { fusion: false, nations: ['fire-nation'], themes: ['Humble & Meditative'] },
  },
  {
    id: 'name_sokka_warrior',
    title: (ctx) => `Sokka's Strategy`,
    description: `A dish that combines practical nutrition with clever preparation techniques, reflecting the Water Tribe warrior's tactical mind.`,
    weighting: { fusion: false, nations: ['water-tribe'], dishTypes: ['main-course'] },
  },
];