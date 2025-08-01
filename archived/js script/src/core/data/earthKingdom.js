export const earthKingdom = {
  ingredients: {
    grains: [
      {
        name: 'Golden Terrace Rice',
        type: 'grain',
        rolePreference: ['base'],
        canBeBase: true,
        weight: 'medium',
        rawCompatible: false,
        tags: [
          'staple',
          'earth_kingdom',
          'earthy',
          'nutty',
          'versatile',
          'grain',
          'sweet_compatible',
          'light_grain',
          'can_be_sweetened_neutral',
          'solid_food_component',
          'savory_compatible',
          'soup_compatible',
          'stew_compatible',
          'fluffy',
        ],
        rarity: 'common',
        flavorNotes: [
          'a nutty aroma',
          'a slightly sweet finish',
          'a fluffy texture',
          'an absorbent quality',
          'a golden hue',
          'an aromatic grain scent',
        ],
        loreHints: ['ba_sing_se', 'harvest_festival'],
      },
    ],
    fruitsVegetablesFungi: [
      {
        name: 'Fermented Lotus Root Chips',
        type: 'vegetable',
        rolePreference: ['primary', 'accent', 'garnish'],
        canBeBase: true,
        weight: 'light',
        rawCompatible: true,
        tags: [
          'root_veg',
          'crunchy',
          'earth_kingdom',
          'fermented',
          'tangy',
          'vegetable',
          'fermented_savory',
          'umami',
          'portable_snack_form',
          'street_food_snack',
          'crispy',
        ],
        rarity: 'uncommon',
        flavorNotes: [
          'a tangy sourness',
          'a crisp texture',
          'a hint of umami',
          'a savory crunch',
          'a pickled earthiness',
        ],
        loreHints: ['ancient_preservation', 'earth_bender_snack'],
      },
      {
        name: 'Cactus Juice',
        type: 'liquid',
        rolePreference: ['primary', 'liquid', 'base'],
        canBeBase: true,
        weight: 'medium',
        rawCompatible: true,
        tags: [
          'earth_kingdom',
          'liquid',
          'sweet_compatible',
          'nectar_base',
          'dessert_base_ok',
          'beverage_component',
          'liquid_ish',
          'sweet_sour_balance',
        ],
        rarity: 'common',
        flavorNotes: [
          'a sweet and sour profile',
          'a refreshing quality',
          'a silken mouthfeel',
          'a yogurt-like tang',
          'a cool touch',
        ],
        loreHints: ['sokka_quencher'],
      },
      {
        name: 'Badgermole Truffles',
        type: 'Fungus',
        rolePreference: ['accent', 'seasoning'],
        canBeBase: false,
        weight: 'light',
        rawCompatible: true,
        tags: ['earth_kingdom', 'fungus', 'rare', 'pungent', 'earthy'],
        rarity: 'epic',
        flavorNotes: ['an intense, musky earthiness', 'a powerful aroma'],
        loreHints: ['badgermole_delicacy'],
      },
      {
        name: 'Omashu Jingu-Peaches',
        type: 'Fruit',
        rolePreference: ['primary', 'base'],
        canBeBase: true,
        weight: 'heavy',
        rawCompatible: true,
        tags: ['earth_kingdom', 'fruit', 'juicy', 'sweet'],
        rarity: 'uncommon',
        flavorNotes: ['an explosive juiciness', 'a honeyed sweetness', 'a firm flesh'],
        loreHints: ['king_bumi_favorite'],
      },
      {
        name: 'Jade Vine Shoots',
        type: 'Vegetable',
        rolePreference: ['primary', 'accent'],
        canBeBase: false,
        weight: 'light',
        rawCompatible: true,
        tags: ['earth_kingdom', 'vegetable', 'crisp', 'tender', 'noble'],
        rarity: 'uncommon',
        flavorNotes: ['a tender-crisp texture', 'a clean, green flavor', 'a mildly sweet taste'],
        loreHints: ['ba_sing_se_feast'],
      },
    ],
    proteins: [
      {
        name: 'Jennamite',
        type: 'crystal',
        rolePreference: ['primary', 'liquid', 'base'],
        canBeBase: true,
        weight: 'medium',
        rawCompatible: true,
        tags: [
          'earth_kingdom',
          'liquid',
          'sweet_compatible',
          'nectar_base',
          'dessert_base_ok',
          'beverage_component',
          'liquid_ish',
          'sweet_sour_balance',
        ],
        rarity: 'common',
        flavorNotes: [
          'a sweet and sour profile',
          'a refreshing quality',
          'a silken mouthfeel',
          'a yogurt-like tang',
          'a cool touch',
        ],
        loreHints: ['crystal_caves'],
      },
      {
        name: 'Sand-Shark Jerky',
        type: 'Meat',
        rolePreference: ['primary', 'snack'],
        canBeBase: false,
        weight: 'medium',
        rawCompatible: true,
        tags: ['earth_kingdom', 'desert', 'meat', 'spicy', 'jerky'],
        rarity: 'common',
        flavorNotes: ['a leathery chew', 'a smoky and spicy saltiness'],
        loreHints: ['sandbender_travel_food'],
      },
    ],
  },
  cookingStyles: [
    { name: 'hearty roasting', tags: ['earthKingdomTradition', 'roasting'] },
  ],
  adjectives: ['Earthen Heart', 'Stone Fortress', 'Ba Sing Se Imperial'],
  nameFormats: [
    {
      pattern: '{nationAdj} {mainIngredient} {format}',
      slots: {
        nationAdj: ['Ba Sing Se Grand'],
        mainIngredient: 'use_selected_main_ingredient',
        format: 'use_dish_format',
      },
    },
  ],
  platingNotes: ['Served generously on sturdy earthenware or heavy pottery.'],
  nationDishTypeProfiles: {
    'Main Course': {
      allowedTags: [
        'grain',
        'protein',
        'vegetable',
        'earthy',
        'hearty',
        'savory_compatible',
      ],
      disallowedTags: ['fiery', 'delicate', 'floral'],
    },
  },
};
