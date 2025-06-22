/**
 * Location-based lore entries for fusion dishes
 * Stories tied to specific iconic locations where cultures naturally blend
 */
import { LoreEntry } from './types';

export const locationLore: LoreEntry[] = [
  {
    id: 'loc_republic_city_pro_bending',
    title: 'Pro-Bending Arena Snack',
    text: (ctx) => `A high-energy meal sold outside the Pro-bending Arena in Republic City. It combines the quick, fiery cooking of the Fire Nation with the hearty, substantial ingredients of the Earth Kingdom, perfect for a hungry fan.`,
    weighting: { fusion: 10, nations: { 'fire-nation': 5, 'earth-kingdom': 5 }, dishTypes: ['snack', 'main-course'] },
  },
  {
    id: 'loc_misty_palms_oasis',
    title: 'Misty Palms Oasis Cooler',
    text: (ctx) => `A refreshing dish created by members of the Order of the White Lotus at their oasis stronghold. It uses Water Tribe freezing techniques on Si Wong Desert fruits, creating a treat that offers respite from the unrelenting sun.`,
    weighting: { fusion: 10, nations: { 'water-tribe': 5, 'earth-kingdom': 5 }, dishTypes: ['dessert', 'beverage'], ingredients: ['Jicama'] },
  },
  {
    id: 'loc_ember_island_vacation',
    title: 'Ember Island Vacation Treat',
    text: (ctx) => `When the world opened up, Ember Island became a top tourist spot. Local vendors began mixing traditional Fire Nation sweets with exotic Air Nomad fruits, resulting in this delightful, unexpected combination.`,
    weighting: { fusion: 10, nations: { 'fire-nation': 5, 'air-nomads': 5 }, dishTypes: ['dessert'] },
  },
  {
    id: 'loc_zaofu_gourmet',
    title: 'Zaofu Fusion Cuisine',
    text: (ctx) => `In the city of metal, Suyin Beifong's chefs are famous for their innovation. This dish is a prime example, applying the precise, disciplined cooking of another nation to Zaofu's famous metallic vegetables and kale.`,
    weighting: { fusion: 10, nations: { 'earth-kingdom': 5 }, ingredients: ['Kale'], minNations: 2 },
  },
  {
    id: 'loc_kyoshi_island_festival',
    title: 'Kyoshi Festival Fusion',
    text: (ctx) => `During the annual Kyoshi Festival, the island becomes a melting pot of cultures. This dish represents the culinary exchange that happens when visitors from all nations bring their traditional ingredients to share.`,
    weighting: { fusion: 10, minNations: 2, themes: ['Ceremonial & Celebratory'] },
  },
  {
    id: 'loc_northern_air_temple_retreat',
    title: 'Northern Air Temple Retreat',
    text: (ctx) => `When the Air Nomads reclaimed their temples, they invited guests from all nations to learn their peaceful ways. This dish was created by combining the temple's traditional vegetarian fare with the bold flavors brought by visiting dignitaries.`,
    weighting: { fusion: 10, nations: { 'air-nomads': 5 }, minNations: 2, styles: ['Steaming', 'Minimalist Assembly'] },
  },
  {
    id: 'loc_ba_sing_se_marketplace',
    title: 'Ba Sing Se Marketplace Special',
    text: (ctx) => `In the Lower Ring of Ba Sing Se, street vendors compete for customers from all walks of life. This dish emerged when a Water Tribe merchant learned to adapt their traditional recipes to the Earth Kingdom's abundant produce.`,
    weighting: { fusion: 10, nations: { 'water-tribe': 5, 'earth-kingdom': 5 }, categories: ['vegetable'] },
  },
  {
    id: 'loc_southern_water_tribe_port',
    title: 'Southern Water Tribe Port Exchange',
    text: (ctx) => `As trade routes expanded, the Southern Water Tribe's port became a hub of cultural exchange. This dish represents the fusion that occurs when Fire Nation spices meet Water Tribe preservation techniques.`,
    weighting: { fusion: 10, nations: { 'water-tribe': 5, 'fire-nation': 5 }, styles: ['Smoking', 'Curing'] },
  },
]; 