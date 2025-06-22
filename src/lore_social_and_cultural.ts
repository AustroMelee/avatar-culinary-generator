/**
 * Social and cultural lore entries for fusion dishes
 * Stories about festivals, social gatherings, and cultural blending
 */
import { LoreEntry } from './types';

export const culturalLore: LoreEntry[] = [
  {
    id: 'cultural_fire_nation_embassy_dinner',
    title: 'The Embassy Dinner',
    text: (ctx) => `When the Fire Nation established embassies in the other nations, their chefs faced a challenge: how to represent their culture without overwhelming foreign dignitaries. This dish was the solution—a traditional Fire Nation technique with toned-down spice, adapted for the local palate.`,
    weighting: { fusion: 10, nations: { 'fire-nation': 5 }, themes: ['Ceremonial & Celebratory'], minNations: 2 },
  },
  {
    id: 'cultural_avatar_korra_peacemaking',
    title: 'Korra\'s Peacemaking Meal',
    text: (ctx) => `During a tense negotiation, Avatar Korra famously ordered both parties into the kitchen. She had them prepare this dish together, forcing them to cooperate and combine their distinct culinary styles. The delicious result helped break the diplomatic stalemate.`,
    weighting: { fusion: 10, minNations: 2 },
  },
  {
    id: 'cultural_spirit_world_influence',
    title: 'Spirit World Fusion',
    text: (ctx) => `Since the spirit portals were opened, the influence of the spirits has grown. This dish uses ingredients that thrive near the portals, like Spirit Oasis flowers and Moon Peaches, prepared with a reverence that transcends national borders.`,
    weighting: { fusion: 10, minRarity: 'Rare', ingredients: ['Butterfly Pea Flower', 'Moon Peach'] },
  },
  {
    id: 'cultural_bending_styles',
    title: 'A Duel of Flavors',
    text: (ctx) => `This dish is like a bending duel on a plate. The precise, aggressive heat of Fire Nation wok-frying is pitted against the fluid, adaptable ingredients of the Water Tribe, resulting in a dynamic and exciting contest of flavors.`,
    weighting: { fusion: 10, nations: { 'fire-nation': 5, 'water-tribe': 5 }, styles: ['Wok-frying'] },
  },
  {
    id: 'cultural_white_lotus_gathering',
    title: 'White Lotus Symposium',
    text: (ctx) => `At their secret gatherings, members of the Order of the White Lotus share knowledge from all nations. This dish was created during one such meeting, combining the wisdom of multiple cultures into a single, harmonious meal.`,
    weighting: { fusion: 10, minNations: 2, themes: ['Ancient & Traditional'] },
  },
  {
    id: 'cultural_republic_city_festival',
    title: 'Republic City Unity Festival',
    text: (ctx) => `During the annual Unity Festival, Republic City celebrates its diversity with a grand feast. This dish represents the collaborative effort of chefs from all nations working together to create something greater than the sum of its parts.`,
    weighting: { fusion: 10, minNations: 2, themes: ['Ceremonial & Celebratory'] },
  },
  {
    id: 'cultural_air_nomad_meditation',
    title: 'Meditation Retreat Exchange',
    text: (ctx) => `When Air Nomads host meditation retreats, they invite participants from all nations. This dish emerged from the communal cooking sessions where guests share their traditional recipes while learning Air Nomad mindfulness techniques.`,
    weighting: { fusion: 10, nations: { 'air-nomads': 5 }, minNations: 2, themes: ['Humble & Meditative'] },
  },
  {
    id: 'cultural_water_tribe_celebration',
    title: 'Water Tribe Winter Festival',
    text: (ctx) => `During the Water Tribe's winter festivals, they welcome visitors from warmer lands. This dish was created to help guests adapt to the cold climate, combining traditional Water Tribe preservation methods with exotic ingredients brought by visitors.`,
    weighting: { fusion: 10, nations: { 'water-tribe': 5 }, minNations: 2, themes: ['Ceremonial & Celebratory'] },
  },
]; 