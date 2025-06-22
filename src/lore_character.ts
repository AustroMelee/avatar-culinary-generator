import { LoreEntry } from './types';

export const characterLore: LoreEntry[] = [
  // --- Iroh ---
  {
    id: 'char_iroh_tea',
    title: 'The Jasmine Dragon\'s Secret',
    text: (ctx) => `While developing the menu for The Jasmine Dragon, Iroh discovered that a pinch of ${ctx.primaryIngredient.name.toLowerCase()} added a surprising but delightful note to his classic jasmine tea. "Sharing tea with a fascinating stranger is one of life's true delights," he would say, "and so is sharing a secret ingredient!"`,
    weighting: { nations: { 'earth-kingdom': 10 }, dishTypes: ['beverage'], ingredients: ['Ginseng'] },
  },
  {
    id: 'char_iroh_white_lotus',
    title: 'The White Lotus Pai Sho Tile',
    text: (ctx) => `Iroh once told Zuko that the key to this dish, like the strategy of Pai Sho, is patience. "You cannot rush the flavors. You must wait, and listen. Only when the ingredients are ready will they reveal their true potential." It's a favorite among Grand Lotuses of the Order.`,
    weighting: { fusion: 10, themes: ['Ancient & Traditional'] },
  },

  // --- Katara & Sokka ---
  {
    id: 'char_katara_memory',
    title: 'Her Mother\'s Recipe',
    text: (ctx) => `This is one of the few dishes Katara remembers her mother, Kya, making before she was gone. The smell of the ${ctx.primaryIngredient.name.toLowerCase()} simmering in the broth brings back bittersweet memories of a happier, simpler time in the Southern Water Tribe.`,
    weighting: { nations: { 'water-tribe': 15 }, dishTypes: ['soup-stew'] },
  },
  {
    id: 'char_sokka_invention',
    title: 'Sokka\'s "Invention"',
    text: (ctx) => `During their travels, Sokka once tried to "improve" this dish by adding a secret ingredient he found: cactus juice. The results were... memorable. This is the original, pre-juice recipe, a testament to the idea that some things are best left unchanged.`,
    weighting: { fusion: 8, themes: ['Invigorating & Playful'] },
  },
  {
    id: 'char_sokka_blubbered_jerky',
    title: 'A Warrior\'s Snack',
    text: (ctx) => `Sokka insists that this blubbered seal jerky is the "backbone of the Southern Water Tribe warrior." It's tough, chewy, and provides enough energy for a full day of boomerang and sarcasm practice. He claims he can tell a person's character by how they eat it.`,
    weighting: { nations: { 'water-tribe': 12 }, dishTypes: ['snack'], ingredients: ['Tiger Seal'] },
  },

  // --- Toph ---
  {
    id: 'char_toph_simple_food',
    title: 'No-Frills Fuel',
    text: (ctx) => `Toph Beifong has no time for fancy, delicate food. This is the kind of meal she prefers: simple, hearty, and to the point. No confusing sauces, no unnecessary garnishes. Just solid, dependable ${ctx.primaryIngredient.name.toLowerCase()}, straight from the earth. "It's got substance," she'd say.`,
    weighting: { nations: { 'earth-kingdom': 15 }, themes: ['Humble & Meditative'] },
  },

  // --- Aang & Zuko ---
  {
    id: 'char_aang_vegetarian',
    title: 'Aang\'s Delight',
    text: (ctx) => `As a vegetarian, Aang was always delighted to find dishes like this during his journey. It's a meal that celebrates the bounty of the earth without causing harm to any living creature, a perfect reflection of his own values.`,
    weighting: { nations: { 'air-nomads': 10, 'earth-kingdom': 5 }, noMeat: true },
  },
  {
    id: 'char_zuko_honor',
    title: 'A Dish of Honor',
    text: (ctx) => `After joining Team Avatar, Zuko struggled to learn the other nations' customs. He once tried to cook this meal for the group to show his willingness to change. He burned it, of course, but Katara secretly helped him fix it. It became a quiet symbol of his changing path.`,
    weighting: { fusion: 12, themes: ['Ceremonial & Celebratory'] },
  },
]; 