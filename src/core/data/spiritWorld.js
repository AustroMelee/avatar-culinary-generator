export const spiritWorld = {
  ingredients: {
    general: [
      {
        name: 'Luminous Fungi Clusters',
        type: 'fungi',
        rolePreference: ['primary', 'garnish', 'base'],
        canBeBase: true,
        weight: 'light',
        rawCompatible: true,
        tags: [
          'spirit_world',
          'ethereal',
          'glowing',
          'mystical',
          'umami_light',
          'fungi',
          'sweet_compatible',
          'dessert_base_ok',
          'spiritual_essence',
          'beverage_component',
          'delicate',
          'shifting_texture',
        ],
        rarity: 'epic',
        flavorNotes: [
          'delicate_umami',
          'moonlight_taste',
          'shifting_texture',
          'faintly_sweet',
          'otherworldly',
          'translucent',
          'pulsing',
        ],
        loreHints: ['Luminous Fungi Clusters'],
      },
    ],
  },
  cookingStyles: [
    {
      name: 'naturally occurring/manifesting',
      tags: ['spiritWorldNature', 'ethereal', 'uniqueSpirit', 'no_cook'],
    },
  ],
  adjectives: ['Spirit Grove', 'Luminous Path', "Whispering Woods'"],
  nameFormats: [
    {
      pattern: '{adj} {mainIngredient} Nectar',
      slots: {
        adj: ['Glimmering'],
        mainIngredient: 'use_selected_main_ingredient',
      },
    },
  ],
  platingNotes: ['Naturally beautiful and seemingly effortless presentation.'],
  nationDishTypeProfiles: {
    Nectar: {
      allowedTags: [
        'ethereal',
        'sweet',
        'fruit',
        'nectar_source',
        'spiritual_essence',
        'fungi',
        'liquid_ish',
        'delicate',
        'subtle',
        'beverage_component',
        'infusible_herb',
        'creamy',
      ],
      disallowedTags: [
        'solid_food_component',
        'pungent_spice',
        'savory_scramble',
        'strong_fish',
      ],
    },
  },
};
