/**
 * Poetic Names Module
 * 
 * This module provides an alternative to the more direct naming conventions, 
 * offering names that are more metaphorical and artistic.
 */

import { NamingRule } from './types';
import { pick } from './utils';

export const poeticNames: NamingRule[] = [
  {
    id: 'poetic_elemental_essence',
    title: (ctx) => `${pick(['Whispering', 'Dancing', 'Sleeping'])} ${ctx.primaryIngredient.name}`,
    text: `A name that reflects the gentle, almost spiritual nature of the primary ingredient.`,
    weighting: { fusion: false, nations: ['air-nomads', 'water-tribe'], themes: ['Humble & Meditative'] },
  },
  {
    id: 'poetic_earth_and_sky',
    title: (ctx) => `${pick(['Sky', 'Sun', 'Cloud'])} meets ${pick(['Stone', 'Root', 'Clay'])}`,
    text: `A fusion name symbolizing the connection between the sky-faring Air Nomads and the grounded Earth Kingdom.`,
    weighting: { fusion: true, minNations: 2, nations: ['air-nomads', 'earth-kingdom'] },
  },
  {
    id: 'poetic_volcano_heart',
    title: (ctx) => `Heart of the Volcano`,
    text: `A name for a dish of unparalleled spiciness and intensity.`,
    weighting: { fusion: false, nations: ['fire-nation'], ingredients: ['Fire Chili', 'Togarashi Spice'] },
  },
  {
    id: 'poetic_sea_and_flame',
    title: (ctx) => `Sea and Flame in a Bowl`,
    text: `A name representing the elemental clash and harmony between Water and Fire.`,
    weighting: { fusion: true, minNations: 2, nations: ['water-tribe', 'fire-nation'] },
  },
  {
    id: 'poetic_four_corners',
    title: (ctx) => `Taste of the Four Corners`,
    text: `A name reserved for a complex dish that incorporates elements from every nation.`,
    weighting: { fusion: true, minNations: 4 },
  },
  {
    id: 'poetic_moonlight_serenade',
    title: (ctx) => `Moonlight Serenade`,
    text: `A name for dishes that are best enjoyed under the light of the moon, often featuring delicate flavors.`,
    weighting: { fusion: false, nations: ['water-tribe'], themes: ['Humble & Meditative'] },
  },
  {
    id: 'poetic_dragon_whisper',
    title: (ctx) => `Dragon's Whisper`,
    text: `A name for dishes that carry the ancient wisdom and power of the dragons, often featuring rare or legendary ingredients.`,
    weighting: { fusion: false, nations: ['fire-nation'], themes: ['Ancient & Traditional'] },
  },
  {
    id: 'poetic_wind_song',
    title: (ctx) => `Song of the Wind`,
    text: `A name that captures the free-spirited nature of the Air Nomads, often for light and airy dishes.`,
    weighting: { fusion: false, nations: ['air-nomads'], themes: ['Humble & Meditative'] },
  },
  {
    id: 'poetic_earth_mother',
    title: (ctx) => `Earth Mother's Embrace`,
    text: `A name for hearty, comforting dishes that feel like a warm embrace from the earth itself.`,
    weighting: { fusion: false, nations: ['earth-kingdom'], themes: ['Humble & Meditative'] },
  },
  {
    id: 'poetic_spirit_world_echo',
    title: (ctx) => `Echo of the Spirit World`,
    text: `A name for dishes that seem to bridge the gap between the physical and spiritual realms.`,
    weighting: { fusion: true, minNations: 2, themes: ['Ancient & Traditional'] },
  },
]; 