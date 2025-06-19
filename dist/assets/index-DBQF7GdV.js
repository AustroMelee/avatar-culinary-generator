(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) o(a);
  new MutationObserver((a) => {
    for (const n of a)
      if (n.type === 'childList')
        for (const r of n.addedNodes)
          r.tagName === 'LINK' && r.rel === 'modulepreload' && o(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(a) {
    const n = {};
    return (
      a.integrity && (n.integrity = a.integrity),
      a.referrerPolicy && (n.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === 'use-credentials'
        ? (n.credentials = 'include')
        : a.crossOrigin === 'anonymous'
          ? (n.credentials = 'omit')
          : (n.credentials = 'same-origin'),
      n
    );
  }
  function o(a) {
    if (a.ep) return;
    a.ep = !0;
    const n = l(a);
    fetch(a.href, n);
  }
})();
const $ = ['Hearty', 'Delicate', 'Crispy', 'Savory'],
  U = ['Delight', 'Feast', 'Surprise', 'Medley'],
  x = {
    byIngredientHint: {
      'Moon Peach': ['Grown only in the light of a full moon...'],
      'Arctic Char': ['A staple for warriors traversing the frozen wastes...'],
    },
    generic: ['A dish with a long and storied history...'],
    _placeholders: {
      Geographical_Feature: ['Whispering Mountains', 'Singing Valley'],
    },
  },
  R = {
    ingredients: {
      dairy: [
        {
          name: 'Sky Bison Yoghurt',
          type: 'dairy',
          rolePreference: ['primary', 'liquid', 'base'],
          canBeBase: !0,
          weight: 'medium',
          rawCompatible: !0,
          tags: [
            'creamy',
            'fermented',
            'air_nomad',
            'staple',
            'tangy',
            'mild',
            'vegetarian',
            'dairy',
            'sweet_compatible',
            'nectar_base',
            'dessert_base_ok',
            'beverage_component',
            'liquid_ish',
            'sweet_sour_balance',
          ],
          rarity: 'common',
          flavorNotes: [
            'creamy',
            'tangy',
            'mildly_sweet',
            'refreshing',
            'silken',
            'yogurt-tang',
            'cool-touch',
          ],
          loreHints: ['sky_bison', 'nomadic_spirit'],
        },
      ],
      flavoringsHerbsSpices: [
        {
          name: 'Lavender Buds',
          type: 'herb',
          rolePreference: ['accent', 'garnish', 'seasoning'],
          canBeBase: !1,
          weight: 'light',
          rawCompatible: !0,
          tags: [
            'floral',
            'aromatic',
            'air_nomad',
            'delicate',
            'calming',
            'herb',
            'sweet_compatible',
            'sweet_herb',
            'infusible_herb',
            'beverage_component',
            'fragile_garnish',
          ],
          rarity: 'uncommon',
          flavorNotes: [
            'floral',
            'sweet_herbaceous',
            'calming_aroma',
            'gentle-perfume',
            'airy-fragrance',
          ],
          loreHints: ['meditation', 'temple_garden'],
        },
      ],
      fruitsVegetablesFungi: [
        {
          name: 'Moon Peach',
          type: 'fruit',
          rolePreference: ['primary', 'garnish', 'base'],
          canBeBase: !0,
          weight: 'medium',
          rawCompatible: !0,
          tags: [
            'sweet',
            'juicy',
            'air_nomad',
            'delicate',
            'stone_fruit',
            'fruit',
            'nectar_source',
            'sweet_compatible',
            'dessert_fruit',
            'dessert_primary_ok',
            'dessert_base_ok',
            'beverage_component',
            'fruit_puree_candidate',
            'fragile_garnish',
            'honeyed',
          ],
          rarity: 'common',
          flavorNotes: [
            'honeyed_sweet',
            'floral_aroma',
            'velvety_texture',
            'dream-like',
            'succulent',
            'luscious',
          ],
          loreHints: ['Moon Peach'],
        },
      ],
      grains: [
        {
          name: 'Barley Tsampa',
          type: 'grain',
          rolePreference: ['base'],
          canBeBase: !0,
          weight: 'heavy',
          rawCompatible: !1,
          tags: [
            'staple',
            'earthy',
            'air_nomad',
            'hearty',
            'roasted_flour',
            'grain',
            'sweet_compatible',
            'heavy_grain',
            'solid_food_component',
            'nutty',
          ],
          rarity: 'common',
          flavorNotes: [
            'nutty',
            'toasted',
            'earthy_sweet',
            'wholesome',
            'robust',
            'sustaining',
          ],
          loreHints: ['guru_pathik', 'travel_food'],
        },
      ],
    },
    cookingStyles: [
      { name: 'gentle steaming', tags: ['airNomadTradition', 'steaming'] },
    ],
    adjectives: ['Sky Temple', 'Meditative', 'Gentle Wind'],
    nameFormats: [
      {
        pattern: '{themeAdj} {nationAdj} {mainIngredient} {format}',
        slots: {
          themeAdj: ['Sacred'],
          nationAdj: ['Skyborne'],
          mainIngredient: 'use_selected_main_ingredient',
          format: 'use_dish_format',
        },
      },
    ],
    platingNotes: [
      'Served with minimalist elegance on simple, unadorned pottery.',
    ],
    nationDishTypeProfiles: {
      Dessert: {
        allowedTags: ['fruit', 'sweet_compatible'],
        disallowedTags: ['pungent_spice'],
      },
    },
  },
  L = {
    ingredients: {
      animalProducts: [
        {
          name: 'Arctic Char',
          type: 'protein',
          rolePreference: ['primary'],
          canBeBase: !0,
          weight: 'medium',
          rawCompatible: !0,
          tags: ['fish', 'seafood', 'water_tribe'],
          rarity: 'common',
          flavorNotes: ['rich_omega'],
          loreHints: ['arctic_hunt'],
        },
      ],
      plants: [
        {
          name: 'Sea Plums',
          type: 'fruit',
          rolePreference: ['accent'],
          canBeBase: !1,
          weight: 'light',
          rawCompatible: !0,
          tags: ['fruit', 'tart', 'water_tribe'],
          rarity: 'uncommon',
          flavorNotes: ['briny_tart'],
          loreHints: ['coastal_foraging'],
        },
      ],
    },
    cookingStyles: [
      { name: 'boiling', tags: ['waterTribeTradition', 'soupFriendly'] },
    ],
    adjectives: ['Frozen Tundra', 'Arctic Moon', 'Ocean Spirit'],
    nameFormats: [
      {
        pattern: '{nationAdj} {mainIngredient} Stew',
        slots: {
          nationAdj: ['Frozen Deep'],
          mainIngredient: 'use_selected_main_ingredient',
        },
      },
    ],
    platingNotes: ['Presented in sturdy, hand_carved wooden bowls.'],
    nationDishTypeProfiles: {
      'Soup/Stew': { allowedTags: ['fish', 'seafood'], disallowedTags: [] },
    },
  },
  P = {
    ingredients: {
      grains: [
        {
          name: 'Golden Terrace Rice',
          type: 'grain',
          rolePreference: ['base'],
          canBeBase: !0,
          weight: 'medium',
          rawCompatible: !1,
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
            'nutty',
            'slightly_sweet',
            'fluffy_texture',
            'absorbent',
            'golden-hue',
            'aromatic-grain',
          ],
          loreHints: ['ba_sing_se', 'harvest_festival'],
        },
      ],
      fruitsVegetablesSeedsFungi: [
        {
          name: 'Fermented Lotus Root Chips',
          type: 'vegetable',
          rolePreference: ['primary', 'accent', 'garnish'],
          canBeBase: !0,
          weight: 'light',
          rawCompatible: !0,
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
            'tangy_sour',
            'crisp_texture',
            'umami_hint',
            'savory-crunch',
            'pickled-earth',
          ],
          loreHints: ['ancient_preservation', 'earth_bender_snack'],
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
  },
  M = {
    ingredients: {
      grains: [
        {
          name: "Dragon's Breath Infused Rice",
          type: 'grain',
          rolePreference: ['base'],
          canBeBase: !0,
          weight: 'medium',
          rawCompatible: !1,
          tags: [
            'spicy_hint',
            'fire_nation',
            'aromatic',
            'staple',
            'grain',
            'sweet_compatible',
            'light_grain',
            'solid_food_component',
            'savory_compatible',
            'fragrant_spice',
            'soup_compatible',
            'stew_compatible',
            'fluffy',
          ],
          rarity: 'uncommon',
          flavorNotes: [
            'fluffy_texture',
            'subtle_smoky',
            'warm_spice_aroma',
            'saffron_color',
            'fragrant',
            'lightly-spiced',
          ],
          loreHints: ['volcanic_steam', 'sun_warrior_ritual'],
        },
      ],
      fruitsVegetablesFungi: [
        {
          name: 'Ember Chili',
          type: 'spice',
          rolePreference: ['seasoning', 'accent'],
          canBeBase: !1,
          weight: 'light',
          rawCompatible: !0,
          tags: [
            'vegetable',
            'chili',
            'spicy',
            'fiery',
            'fire_nation',
            'staple',
            'versatile_heat',
            'spice',
            'pungent_spice',
            'savory_compatible',
          ],
          rarity: 'common',
          flavorNotes: [
            'varied_fiery_heat',
            'smoky_undertones',
            'fruity_notes_in_some',
            'sharp_spice',
            'blazing',
            'tingling',
          ],
          loreHints: ['sozins_comet_pepper', 'spice_tolerance_test'],
        },
      ],
    },
    cookingStyles: [
      {
        name: 'grilling over open flames',
        tags: ['fireNationTradition', 'grilling'],
      },
    ],
    adjectives: ['Volcanic Peak', 'Ember Island', 'Inferno Kissed'],
    nameFormats: [
      {
        pattern: '{nationAdj} {mainIngredient}',
        slots: {
          nationAdj: ["Fiery Soul's"],
          mainIngredient: 'use_selected_main_ingredient',
        },
      },
    ],
    platingNotes: ['Presented with dramatic flair on dark, heavy plates.'],
    nationDishTypeProfiles: {
      'Main Course': {
        allowedTags: [
          'grain',
          'protein',
          'vegetable',
          'spicy',
          'fiery',
          'smoky',
          'umami',
          'savory_compatible',
        ],
        disallowedTags: ['delicate', 'floral'],
      },
    },
  },
  F = {
    ingredients: {
      general: [
        {
          name: 'Artisan Sourdough',
          type: 'grain',
          rolePreference: ['base'],
          canBeBase: !0,
          weight: 'medium',
          rawCompatible: !1,
          tags: [
            'bread',
            'united_republic',
            'cafe_staple',
            'grain',
            'can_be_sweetened_neutral',
            'solid_food_component',
            'crispy_bread_component',
            'savory_compatible',
          ],
          rarity: 'common',
          flavorNotes: [
            'tangy_sour',
            'chewy_crust',
            'airy-crumb',
            'rustic-aroma',
          ],
          loreHints: ['republic_city_bakery'],
        },
      ],
    },
    cookingStyles: [
      {
        name: 'fusion cuisine (primary)',
        tags: ['unitedRepublicModern', 'fusion'],
      },
    ],
    adjectives: ['Republic City Metro', 'Modern Fusion', "Avatar Korra's Era"],
    nameFormats: [
      {
        pattern: '{adj} {mainIngredient1}_{mainIngredient2} Fusion',
        slots: {
          adj: ['Dynamic'],
          mainIngredient1: 'use_selected_main_ingredient',
          mainIngredient2: 'use_selected_secondary_ingredient',
        },
      },
    ],
    platingNotes: ['Modern, artistic, and eclectic presentation.'],
    nationDishTypeProfiles: {
      'Main Course': {
        allowedTags: [
          'grain',
          'noodle',
          'protein',
          'vegetable',
          'fusion',
          'umami',
          'spicy',
          'savory_compatible',
        ],
        disallowedTags: ['delicate', 'floral'],
      },
    },
  },
  j = {
    ingredients: {
      general: [
        {
          name: 'Luminous Fungi Clusters',
          type: 'fungi',
          rolePreference: ['primary', 'garnish', 'base'],
          canBeBase: !0,
          weight: 'light',
          rawCompatible: !0,
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
    platingNotes: [
      'Naturally beautiful and seemingly effortless presentation.',
    ],
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
  },
  D = {
    Spiritual: {
      adj: ['Spirit_Touched'],
      conceptMod: 'infused with a subtle spiritual energy.',
      plating: 'minimalist, natural elements.',
      loreHints: ['meditation'],
    },
    Royal: {
      adj: ["Regal Dragon's"],
      conceptMod: 'fit for the highest royalty.',
      plating: 'elaborate, often with intricate carvings.',
      loreHints: ['coronation'],
    },
  };
let C = Math.random;
function W(e) {
  let t = 0;
  for (let l = 0; l < e.length; l++)
    (t = (t << 5) - t + e.charCodeAt(l)), (t |= 0);
  return function () {
    return (t = (1664525 * t + 1013904223) % 2 ** 32), t / 2 ** 32;
  };
}
function G(e) {
  e
    ? (console.log(`Using seeded RNG with seed: "${e}"`), (C = W(e)))
    : (console.log('Using standard RNG (Math.random).'), (C = Math.random));
}
function f(e) {
  if (!(!e || !Array.isArray(e) || e.length === 0))
    return e[Math.floor(C() * e.length)];
}
function z(e, t) {
  return (
    (e = Math.ceil(e)),
    (t = Math.floor(t)),
    e > t ? e : Math.floor(C() * (t - e + 1)) + e
  );
}
const K = Object.freeze({
    FIRE: 'Fire Nation',
    WATER: 'Water Tribes',
    AIR: 'Air Nomads',
    EARTH: 'Earth Kingdom',
    SPIRIT: 'Spirit World',
    REPUBLIC: 'United Republic',
  }),
  S = Object.freeze({
    MAIN_COURSE: 'Main Course',
    SIDE_DISH: 'Side Dish',
    DESSERT: 'Dessert',
    SOUP: 'Soup',
    SALAD: 'Salad',
    BEVERAGE: 'Beverage',
    NECTAR: 'Nectar',
    SAUCE_CONDIMENT: 'Sauce/Condiment',
  });
Object.freeze(Object.fromEntries(Object.entries(K).map(([e, t]) => [t, e])));
const k = (e, t = !1) =>
    e && e.name ? (t ? e.name.split(' (')[0] : e.name) : 'Unknown Ingredient',
  q = (e) =>
    e && Array.isArray(e.type)
      ? e.type
      : typeof e.type == 'string'
        ? [e.type]
        : [],
  H = (e) => (e && Array.isArray(e.tags) ? e.tags : []),
  V = (e) => (e && e.rarity ? e.rarity : 'common'),
  Q = (e) => (e && Array.isArray(e.flavorNotes) ? e.flavorNotes : []);
function Z(e) {
  if (!e) return !1;
  const t = H(e),
    l = Q(e),
    o = q(e);
  return (
    t.includes('sweet_compatible') ||
    t.includes('dessert_fruit') ||
    t.includes('sweet') ||
    l.some((a) => a.includes('sweet')) ||
    o.includes('sweetener')
  );
}
function O(e, t, l, o, a) {
  var c, d;
  if (!e) return !1;
  const n = H(e);
  if (n.includes('placeholder')) return !0;
  const r = o.length > 0 ? o[0] : null,
    i = r
      ? (d = (c = a[r]) == null ? void 0 : c.nationDishTypeProfiles) == null
        ? void 0
        : d[l]
      : null;
  if (i) {
    if (i.disallowedTags && i.disallowedTags.some((s) => n.includes(s)))
      return !1;
    i.allowedTags && i.allowedTags.some((s) => n.includes(s));
  }
  return (
    l === 'Soup/Stew' &&
      t === 'base' &&
      n.some((s) =>
        ['liquid_base', 'liquid_ish', 'broth_potential'].includes(s)
      ),
    ['Dessert', 'Nectar', 'Beverage'].includes(l) &&
      (t === 'base' || t === 'primary') &&
      Z(e),
    !0
  );
}
function Y(e, t, l) {
  const o = {
    airNomads: R,
    waterTribes: L,
    earthKingdom: P,
    fireNation: M,
    unitedRepublic: F,
    spiritWorld: j,
  };
  let a = [],
    n = {},
    r = [],
    i = [];
  const c = Object.keys(o).reduce((s, m) => {
    if (o[m].ingredients) {
      const u = m
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (p) => p.toUpperCase());
      s[u] = m;
    }
    return s;
  }, {});
  e.forEach((s) => {
    const m = c[s];
    m &&
      o[m] &&
      (r.push(m),
      i.push(s),
      (n[m] = o[m]),
      Object.values(o[m].ingredients).forEach((u) => {
        Array.isArray(u) &&
          a.push(
            ...u.map((p) => ({ ...p, sourceNation: s, sourceNationKey: m }))
          );
      }));
  });
  let d = a.filter((s) => O(s, 'any', t, r, o));
  return (
    (d = [...new Map(d.map((s) => [k(s), s])).values()]),
    {
      availableIngredientObjects: d,
      selectedNationsData: n,
      finalNationKeys: r,
      nationDisplayNames: i,
    }
  );
}
function J(e, t, l, o, a) {
  let n,
    r = t.filter((c) => {
      const d = k(c);
      if (l.has(d)) {
        const s = V(c);
        return s !== 'common' && s !== 'uncommon';
      }
      return !0;
    });
  if (r.length === 0) return;
  const i = o.filter((c) => a[c] === 0);
  if (o.length > 1 && i.length > 0) {
    const c = f(i);
    let d = r.filter((s) => s.sourceNationKey === c);
    d.length > 0 && (n = f(d));
  }
  if (!n) {
    let c = o && o.length > 0 ? o[0] : null,
      d = r.filter((s) => s.sourceNationKey === c);
    n = f(d.length > 0 ? d : r);
  }
  return n;
}
const v = (e, t = !1) =>
    e && e.name ? (t ? e.name.split(' (')[0] : e.name) : 'Unknown Ingredient',
  T = (e) => (e && Array.isArray(e.tags) ? e.tags : []),
  X = (e) => (e && Array.isArray(e.flavorNotes) ? e.flavorNotes : []);
function ee(e, t) {
  if (typeof e != 'string') return '';
  let l = e;
  return (
    (l = l.replace(/\{(.*?)\}/g, (o, a) => {
      const n = a.trim();
      if (t.hasOwnProperty(n)) {
        let r = t[n];
        return (
          typeof r == 'object' && r !== null && r.name && (r = v(r, !0)),
          String(r)
        );
      }
      return o;
    })),
    l.replace(/\{([A-Za-z_]+)\}/g, (o, a) =>
      t[a] !== void 0 ? String(t[a]) : `[${a.replace(/_/g, ' ').toLowerCase()}]`
    )
  );
}
function te(e, t, l, o, a, n, r) {
  let i = [];
  const c = n && n.length > 0 ? n[0] : null,
    d = c ? e[c] : null,
    s = r && r.length > 0 ? r[0] : 'Elemental',
    m = D[a];
  let u = {
    dishType: l,
    format: o,
    mainIngredient: 'Essence',
    secondaryIngredient: 'Whispers',
    themeAdj: m && Array.isArray(m.adj) ? f(m.adj) : '',
    nationAdj:
      d && Array.isArray(d.adjectives) ? f(d.adjectives) : s.split(' ')[0],
    flavorAdj:
      f(
        $.filter((g) => !g.endsWith('y') && !g.endsWith('ing') && g.length > 5)
      ) || 'Flavorful',
    culturalSymbol: 'Elemental Harmony',
    avatarName: f(['Roku', 'Kyoshi', 'Yangchen', 'Aang', 'Korra', 'Wan']),
    emotion: f(['Joyful', 'Nostalgic', 'Spirited', 'Bold', 'Comforting']),
    mainIngredient1: 'Component A',
    mainIngredient2: 'Component B',
  };
  const p = t.find(
      (g) => g && g.role === 'primary' && !T(g).includes('placeholder')
    ),
    _ = t.find((g) => g && g.role === 'base' && !T(g).includes('placeholder'));
  let y = p || _;
  y ? (u.mainIngredient = v(y, !0)) : (u.mainIngredient = f(U)),
    (u.mainIngredient1 = u.mainIngredient);
  let b = t.find(
    (g) =>
      g && g.role === 'accent' && !T(g).includes('placeholder') && v(g) !== v(y)
  );
  b
    ? (u.secondaryIngredient = v(b, !0))
    : (u.secondaryIngredient = (X(y)[0] || 'Subtle').split('_')[0] + ' Notes'),
    (u.mainIngredient2 = u.secondaryIngredient),
    n &&
      n.length > 0 &&
      n.forEach((g) => {
        e[g] && e[g].nameFormats && i.push(...e[g].nameFormats);
      }),
    m && m.nameFormats && i.push(...m.nameFormats);
  let I = f(i.filter((g) => g && g.pattern));
  return (
    I || (I = { pattern: '{nationAdj} {mainIngredient} {format}', slots: {} }),
    ee(I.pattern, u).replace(/\s+/g, ' ').trim() || 'Unnamed Culinary Creation'
  );
}
const ne = (e, t = !1) =>
    e && e.name ? (t ? e.name.split(' (')[0] : e.name) : 'Unknown Ingredient',
  re = (e) => (e && Array.isArray(e.tags) ? e.tags : []),
  ae = (e) => (e && Array.isArray(e.loreHints) ? e.loreHints : []);
function ie(e, t, l, o, a, n) {
  const r = x || { byIngredientHint: {}, generic: [], _placeholders: {} };
  let i = [];
  const c = r._placeholders,
    d = t && t.length > 0 ? t[0] : 'an unknown land';
  if (
    (e
      .filter((u) => u && !re(u).includes('placeholder'))
      .forEach((u) => {
        const p = ne(u, !0),
          _ = ae(u);
        r.byIngredientHint[p] &&
          i.push({ text: f(r.byIngredientHint[p]), priority: 0.5 }),
          _.forEach((y) => {
            r.byIngredientHint[y] &&
              i.push({ text: f(r.byIngredientHint[y]), priority: 1 });
          });
      }),
    r.generic && i.push({ text: f(r.generic), priority: 3 }),
    i.length === 0)
  )
    return 'The history of this dish is shrouded in delicious mystery.';
  i.sort((u, p) => u.priority - p.priority);
  let s = i[0].text,
    m = {
      nation_name: d,
      Dish_Name: n,
      Dish_Type: a.toLowerCase(),
      ...Object.keys(c).reduce(
        (u, p) => (c[p] && Array.isArray(c[p]) && (u[p] = f(c[p])), u),
        {}
      ),
    };
  return s.replace(/\{(\w+)\}/g, (u, p) => m[p] || u);
}
function oe(e, t, l, o, a, n, r, i) {
  let c = [],
    d = [],
    s = r.join(' and '),
    m = l.toLowerCase();
  c.push(`A ${m} creation that embodies the distinctive spirit of ${s}.`);
  const u = a && D[a];
  u && u.conceptMod && c.push(u.conceptMod);
  let p = `This dish is brought to life through traditional techniques, honoring the traditions of ${r.join(' and ')}.`;
  d.push(p);
  let _ = '';
  const y = n && n.length > 0 ? n[0] : 'earthKingdom',
    b = i[y];
  b &&
    b.platingNotes &&
    (_ = 'Presentation is an art form here. ' + f(b.platingNotes)),
    d.push(_);
  const I = c.join(' '),
    h = d.join(' ');
  return { concept: I, notes: h };
}
const B = (e, t = !1) =>
  e && e.name ? (t ? e.name.split(' (')[0] : e.name) : 'Unknown Ingredient';
function se(e, t, l, o) {
  const a = {
      airNomads: R,
      waterTribes: L,
      earthKingdom: P,
      fireNation: M,
      unitedRepublic: F,
      spiritWorld: j,
    },
    {
      availableIngredientObjects: n,
      selectedNationsData: r,
      finalNationKeys: i,
      nationDisplayNames: c,
    } = Y(t, e);
  let d = [],
    s = new Set(),
    m = {};
  i.forEach((h) => (m[h] = 0));
  const p = { ...{ base: 1, primary: 1, seasoning: 1, accent: 1, garnish: 1 } };
  [S.BEVERAGE, S.NECTAR, S.SAUCE_CONDIMENT].includes(e) &&
    ((p.primary = z(0, 1)), (p.garnish = 0));
  for (const h in p) {
    let g = p[h];
    for (; g > 0; ) {
      let A = n.filter((N) =>
          O(N, h, e, i, a)
            ? (N.rolePreference && N.rolePreference.includes(h)) ||
              (h === 'base' && N.canBeBase)
            : !1
        ),
        w = J(h, A, s, i, m);
      !w && A.length > 0 && (w = f(A.filter((N) => !s.has(B(N))))),
        w &&
          ((w.role = h),
          d.push(w),
          s.add(B(w)),
          i.includes(w.sourceNationKey) && m[w.sourceNationKey]++),
        g--;
    }
  }
  const _ = te(r, d, e, l, o, i, c),
    { concept: y, notes: b } = oe(_, d, e, l, o, i, c, a),
    I = ie(d, c, i, o, e, _);
  return { name: _, concept: y, ingredients: d, notes: b, lore: I };
}
function E(e) {
  if (typeof e != 'string') return e;
  let t = e;
  const l = 'aeiou';
  return (
    (t = t.replace(
      /\b(an)\s+([uU][nN][iI][qQ][uU][eE]|[uU][nN][iI][FfSsTtCc]|[eE][uU])/g,
      'a $2'
    )),
    (t = t.replace(/\b(a|an)\s+\1\b/gi, '$1')),
    (t = t.replace(/\b(a|an) +([a-zA-Z\{][\w\{]*)/gi, (o, a, n) => {
      const r = n[0].toLowerCase(),
        i =
          l.includes(r) &&
          !n.toLowerCase().startsWith('uni') &&
          !n.toLowerCase().startsWith('eu') &&
          !n.toLowerCase().startsWith('one');
      return a.toLowerCase() === 'a' && i
        ? `an ${n}`
        : a.toLowerCase() === 'an' && !i
          ? `a ${n}`
          : o;
    })),
    (t = t.replace(
      /its (a|an) (\w+ [\w_'-]+) and (its|the) (a|an)? \2/gi,
      'its $2'
    )),
    (t = t.replace(/its (a|an) (\w+ [\w_'-]+) and \2/gi, 'its $2')),
    (t = t.replace(/its (a|an) (\w+) character/gi, 'its $2 character')),
    (t = t.replace(/its (a|an) (\w+) essence/gi, 'its $2 essence')),
    (t = t.replace(
      /\bof an? ancient set of an? ancient\b/gi,
      'of a set of ancient'
    )),
    (t = t.replace(/\b(\w+)\s+\1\b/gi, '$1')),
    (t = t.replace(/a touch of an elegant touch/gi, 'an elegant touch')),
    t.replace(/\s+/g, ' ').trim()
  );
}
function le() {
  (document.getElementById('dishName').textContent =
    'Conjuring a new culinary masterpiece...'),
    (document.getElementById('dishConcept').textContent =
      'The spirits of the four nations are whispering their secrets...'),
    (document.getElementById('ingredientList').innerHTML = ''),
    (document.getElementById('dishNotes').textContent =
      'Please wait while the elemental kitchens are hard at work.'),
    (document.getElementById('dishLore').style.display = 'none'),
    (document.getElementById('dishResult').style.display = 'block');
}
function ce(e) {
  const { name: t, concept: l, ingredients: o, notes: a, lore: n } = e;
  (document.getElementById('dishName').textContent = E(t)),
    (document.getElementById('dishConcept').textContent = E(l));
  const r = document.getElementById('ingredientList');
  (r.innerHTML = ''),
    o.forEach((i) => {
      const c = document.createElement('li'),
        d = i.rarity && i.rarity !== 'common' ? `; Rarity: ${i.rarity}` : '';
      (c.textContent = `${i.name} (Role: ${i.role || 'unknown'}; Type: ${i.type}; Source: ${i.sourceNation || 'Unknown'})${d}`),
        r.appendChild(c);
    }),
    (document.getElementById('dishNotes').textContent = E(a)),
    n
      ? ((document.getElementById('loreText').textContent = E(n)),
        (document.getElementById('dishLore').style.display = 'block'))
      : (document.getElementById('dishLore').style.display = 'none'),
    (document.getElementById('dishResult').style.display = 'block');
}
function de(e) {
  (document.getElementById('dishName').textContent = 'A Culinary Mishap!'),
    (document.getElementById('dishConcept').textContent =
      'The spirits seem to be in disarray. An error occurred during generation.'),
    (document.getElementById('ingredientList').innerHTML = ''),
    (document.getElementById('dishNotes').textContent =
      `Error details: ${e.message}. Please check the console for more information.`),
    (document.getElementById('dishLore').style.display = 'none'),
    (document.getElementById('dishResult').style.display = 'block');
}
document.addEventListener('DOMContentLoaded', () => {
  const e = new URLSearchParams(window.location.search).get('seed');
  G(e);
  const t = document.getElementById('generate-btn');
  if (!t) {
    console.error(
      "CRITICAL ERROR: The button with id 'generate-btn' was not found. Script cannot execute."
    );
    return;
  }
  t.addEventListener('click', () => {
    const l = document.getElementById('dish-type-select').value,
      o = Array.from(
        document.querySelectorAll("input[name='nation']:checked")
      ).map((r) => r.value),
      a = document.getElementById('theme-select').value,
      n = 'Default';
    if (o.length === 0) {
      alert('Please select at least one nation!');
      return;
    }
    le(),
      setTimeout(() => {
        try {
          const r = se(l, o, n, a);
          ce(r);
        } catch (r) {
          console.error('Error during dish generation:', r), de(r);
        }
      }, 50);
  });
});
