/**
 * A library of lore templates, keyed by `loreHints` from ingredients.
 * This allows for ingredient-driven lore generation.
 */
export const LORE_LIBRARY = {
  // General & Fallback
  default: [
    'A dish with a history yet to be written, perhaps by you.',
    'The origins of this recipe are lost to time, but its flavor is unforgettable.',
    'A simple meal, but one that has sustained wandering monks for generations.',
  ],

  // Ingredient-Specific Lore
  sky_bison: [
    'Legend holds that the secret to this dish was first shared with the Air Nomads by a friendly sky bison, who considered its main ingredient a delicacy.',
    'This meal is often prepared to honor the memory of Appa, the most legendary of all sky bison, who was known for his love of fresh fruit and vegetables.',
  ],
  nomadic_spirit: [
    'This is a traveler\'s meal, designed to be prepared with few tools over a small campfire, embodying the resourcefulness of the nomadic spirit.',
  ],
  meditation: [
    'The scent of this dish is often used as a focus for meditation. Monks believe its calming aroma helps to clear the mind and open the spirit.',
  ],
  temple_garden: [
    'The ingredients for this dish are grown in the serene hanging gardens of the {temple_name}, tended to by monks as a form of active meditation.',
  ],
  guru_pathik: [
    'Guru Pathik was said to have subsisted on a version of this dish while meditating at the Eastern Air Temple, unlocking his chakras with its pure energy.',
  ],
  
  // Special Lore for Rare/Specific Combos
  ECLIPSE_DISH: [
    'This rare dish is only prepared during a solar eclipse, when the line between the physical and spirit worlds is thin. It is said to grant the diner a brief glimpse into their own past lives.',
  ],
  LAGHIMA_FEAST: [
    'An ancient recipe, this dish is served only once a decade to honor the wisdom of Guru Laghima, the legendary airbender who unlocked the secret of weightlessness. It is believed to lighten the diner\'s spirit, if not their body.',
  ],
};

// Data for populating lore templates
export const LORE_PLACEHOLDERS = {
  monks: ['Monk Gyatso', 'Yangchen', 'Tenzin'],
  temples: ['Western Air Temple', 'Eastern Air Temple', 'Southern Air Temple', 'Northern Air Temple'],
  bison: ['Appa', 'Oogi', 'Juicy'],
}; 