/**
 * Trade and commerce lore entries for fusion dishes
 * Stories that come from trade routes, merchants, and economic exchange between nations
 */
import { LoreEntry } from './types';

export const tradeLore: LoreEntry[] = [
  {
    id: 'trade_cabbage_corp',
    title: 'Cabbage Corp Special',
    text: (ctx) => `Following the success of his company, the Cabbage Merchant began experimenting with international shipping. This dish was an early attempt to create a product for the Fire Nation market, blending his signature cabbage with their intense spices.`,
    weighting: { fusion: 10, nations: { 'earth-kingdom': 5, 'fire-nation': 5 }, ingredients: ['Cabbage', 'Fire Chili'] },
  },
  {
    id: 'trade_southern_water_tribe_imports',
    title: 'The First Spice Shipment',
    text: (ctx) => `After the war, the first trade ships to the Southern Water Tribe brought spices from the Fire Nation. The tribal elders were skeptical, but the younger generation eagerly combined the fiery flavors with their traditional stews, creating this bold new dish.`,
    weighting: { fusion: 10, nations: { 'water-tribe': 5, 'fire-nation': 5 }, dishTypes: ['soup-stew'] },
  },
  {
    id: 'trade_air_nomad_pilgrimage',
    title: 'Pilgrim\'s Exchange',
    text: (ctx) => `Modern Air Nomads, now free to travel the world, often trade recipes with the communities they visit. An acolyte visiting Kyoshi Island might learn to prepare local fish with their own meditative, gentle cooking techniques.`,
    weighting: { fusion: 10, nations: { 'air-nomads': 5, 'earth-kingdom': 5 }, styles: ['Steaming', 'Minimalist Assembly'] },
  },
  {
    id: 'trade_republic_city_docks',
    title: 'Dockworker\'s Lunch',
    text: (ctx) => `A quick, cheap, and filling meal popular with the dockworkers of Republic City. It takes a simple Earth Kingdom grain base and mixes in whatever protein is most plentiful from the Water Tribe fishing boats that day.`,
    weighting: { fusion: 10, nations: { 'earth-kingdom': 5, 'water-tribe': 5 }, categories: ['base', 'protein'] },
  },
  {
    id: 'trade_silk_road_spices',
    title: 'Silk Road Spice Route',
    text: (ctx) => `The ancient trade routes through the Earth Kingdom brought exotic spices from distant lands. This dish represents the fusion that occurred when Fire Nation merchants learned to incorporate these rare seasonings into their traditional recipes.`,
    weighting: { fusion: 10, nations: { 'fire-nation': 5, 'earth-kingdom': 5 }, minRarity: 'Uncommon' },
  },
  {
    id: 'trade_northern_water_tribe_whaling',
    title: 'Northern Whaling Exchange',
    text: (ctx) => `The Northern Water Tribe's whaling industry brought them into contact with traders from all nations. This dish emerged when they began trading their preserved whale meat for exotic Air Nomad fruits and herbs.`,
    weighting: { fusion: 10, nations: { 'water-tribe': 5, 'air-nomads': 5 }, categories: ['protein', 'fruit'] },
  },
  {
    id: 'trade_emerald_city_market',
    title: 'Emerald City Market Fusion',
    text: (ctx) => `In the heart of Republic City's market district, vendors from all nations compete for customers. This dish was created by a Water Tribe fishmonger who learned to prepare his catch using Fire Nation techniques to appeal to the diverse clientele.`,
    weighting: { fusion: 10, nations: { 'water-tribe': 5, 'fire-nation': 5 }, categories: ['protein'] },
  },
  {
    id: 'trade_air_temple_supplies',
    title: 'Temple Supply Run',
    text: (ctx) => `When Air Nomads visit Earth Kingdom villages to trade for supplies, they often share their unique cooking methods. This dish represents the exchange that happens when local farmers learn to prepare their produce using Air Nomad techniques.`,
    weighting: { fusion: 10, nations: { 'air-nomads': 5, 'earth-kingdom': 5 }, categories: ['vegetable'] },
  },
]; 