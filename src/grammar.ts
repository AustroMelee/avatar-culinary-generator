// src/grammar.ts

import { DishContext, SentenceFragment, FragmentTag, Ingredient, Nation } from './types';

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// --- NATION-AWARE ADJECTIVES ---
const getAdjective = (ingredient: Ingredient, context: DishContext): string => {
    const { cookingStyle, nationData } = context;
    const { category, flavorProfile } = ingredient;
    const isSweet = flavorProfile === 'sweet';

    // Air Nomad Adjectives
    if (nationData.nation === 'air-nomads') {
        if (cookingStyle.name === 'Baking' || cookingStyle.name === 'Piemaking') {
            if (category === 'protein') return pick(['hearty', 'savory-baked', 'tender']);
            if (isSweet) return pick(['sweetly baked', 'warm', 'caramelized', 'delicate']);
            return pick(['golden-baked', 'flaky', 'savory']);
        }
        if (cookingStyle.name === 'Light Sauté') return pick(['crisp-tender', 'lightly sautéed', 'vibrant']);
    }

    // Water Tribe Adjectives
    if (nationData.nation === 'water-tribe') {
        if (cookingStyle.name === 'Stewing') return pick(['hearty', 'rich', 'warming', 'slow-cooked']);
        if (cookingStyle.name === 'Grilling') return pick(['fire-charred', 'smoky', 'bold']);
        if (cookingStyle.name === 'Poaching') return pick(['delicate', 'gently poached', 'brothy']);
        if (cookingStyle.name === 'Curing') return pick(['sea-salted', 'wind-dried', 'savory']);
        if (cookingStyle.name === 'Freezing') return pick(['ice-crystalized', 'frost-kissed', 'chilled']);
    }
    
    // Generic Fallback
    return isSweet ? pick(['sweet', 'delightful']) : pick(['savory', 'hearty']);
};

// --- NATION-SPECIFIC LORE FRAGMENTS ---
const nationLoreFragments: Record<Nation, SentenceFragment[]> = {
    'air-nomads': [
        { tag: 'philosophy', text: (ctx) => `The patterns made by the steam (or crust) are often used as a meditative focus, representing the transient and beautiful nature of life.` },
        { tag: 'tradition', text: (ctx) => `An ancient recipe passed down through generations of monks, it is said that preparing this dish fosters a deep connection to the element of air.` },
        { tag: 'legend', text: (ctx) => `Legend says that Avatar Yangchen herself favored a similar dish, enjoying it after long sessions of meditation to reground herself.` },
        { tag: 'practical', text: (ctx) => `Often prepared for young Air Acolytes, this meal teaches the importance of patience and finding joy in simple, wholesome things.` },
    ],
    'water-tribe': [
        { tag: 'philosophy', text: (ctx) => `This dish represents the tribe's philosophy: use what the spirits provide, waste nothing, and share everything with the community.` },
        { tag: 'tradition', text: (ctx) => `A communal meal, this dish is often cooked in a single large pot in the center of the hut, its warmth warding off the polar night.` },
        { tag: 'legend', text: (ctx) => `It is said that the first hunters who caught ${ctx.primaryIngredient.name.toLowerCase()} learned to prepare it this way by observing moon spirits.` },
        { tag: 'practical', text: (ctx) => `The methods used to prepare this food are ancient, designed to provide maximum warmth and energy for hunters braving the icy wastes.` },
    ],
    // Placeholders for future nations
    'earth-kingdom': [],
    'fire-nation': [],
};

// Generic description fragments that work for any nation
const descriptionFragments: SentenceFragment[] = [
    { tag: 'ingredient_centric', text: (ctx) => `At its heart, this dish celebrates the ${getAdjective(ctx.primaryIngredient, ctx)} flavor of ${ctx.primaryIngredient.name.toLowerCase()}.` },
    { tag: 'ingredient_centric', text: (ctx) => `The experience begins with ${ctx.primaryIngredient.name.toLowerCase()}${ctx.secondaryIngredient ? `, perfectly complemented by the essence of ${ctx.secondaryIngredient.name.toLowerCase()}.` : ', a simple and pure flavor experience.'}` },
    { tag: 'style_centric', text: (ctx) => `${ctx.cookingStyle.name} brings out a unique harmony between the ingredients, creating a texture that is both satisfying and light.` },
    { tag: 'theme_centric', text: (ctx) => `In keeping with its '${ctx.theme}' theme, the preparation is simple yet profound, allowing the natural flavors to shine.` },
];

export class Grammar {
  /**
   * Builds a rich, varied description sentence.
   */
  public buildDescriptionSentence(context: DishContext, usedTags: string[] = []): { sentence: string, usedTag: string } {
    const availableFragments = descriptionFragments.filter(f => !usedTags.includes(f.tag));
    const fragment = pick(availableFragments.length > 0 ? availableFragments : descriptionFragments);
    return {
        sentence: fragment.text(context),
        usedTag: fragment.tag
    };
  }

  /**
   * Builds a lore sentence from the new pool.
   */
  public buildLoreSentence(context: DishContext): string {
      const nation = context.nationData.nation;
      // Get the specific lore pool for the current nation
      const lorePool = nationLoreFragments[nation];
      
      // If the pool is empty (e.g., for a future nation), provide a fallback.
      if (!lorePool || lorePool.length === 0) {
          return "Every dish tells a story, and the tale of this one is waiting to be written.";
      }

      const fragment = pick(lorePool);
      return fragment.text(context);
  }
}