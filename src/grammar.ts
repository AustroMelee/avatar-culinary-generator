// src/grammar.ts

import { DishContext, SentenceFragment, FragmentTag, Ingredient } from './types';

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// --- FINAL, UPGRADED Adjective Helper ---
const getAdjective = (ingredient: Ingredient, context: DishContext): string => {
    const { cookingStyle } = context;
    const { category, flavorProfile } = ingredient;
    const isSweet = flavorProfile === 'sweet';

    // Handle by Cooking Style first
    if (cookingStyle.name === 'Baking' || cookingStyle.name === 'Piemaking') {
        if (category === 'protein') return pick(['hearty', 'savory-baked', 'tender']);
        if (category === 'vegetable') return pick(['golden-baked', 'roasted', 'tender']);
        if (isSweet) return pick(['sweetly baked', 'warm', 'caramelized', 'delicate']);
        return pick(['hearty', 'flaky', 'savory']); // Flaky is now a fallback, great for pastry
    }
    if (cookingStyle.name === 'Steaming') {
        if (isSweet) return pick(['gently steamed', 'lightly sweet', 'infused']);
        return pick(['delicate', 'tender-steamed', 'aromatic']);
    }
    if (cookingStyle.name === 'Light Sauté') {
        return pick(['crisp-tender', 'lightly sautéed', 'vibrant']);
    }
    if (cookingStyle.name === 'Simmering') {
        if (isSweet) return pick(['gently simmered', 'fruit-infused', 'syrupy']);
        return pick(['slow-simmered', 'rich', 'hearty', 'savory']);
    }
    if (cookingStyle.name === 'Minimalist Assembly' || cookingStyle.name === 'Juicing') {
        if (isSweet) return pick(['fresh', 'juicy', 'naturally sweet', 'vibrant']);
        return pick(['crisp', 'vibrant', 'garden-fresh', 'zesty']);
    }

    // Generic Fallback
    return isSweet ? pick(['sweet', 'delightful']) : pick(['savory', 'hearty']);
};

// --- NEW, EXPANDED FRAGMENT POOLS ---

const descriptionFragments: SentenceFragment[] = [
    { 
        tag: 'ingredient_centric', 
        text: (ctx) => `At its heart, this dish celebrates the ${getAdjective(ctx.primaryIngredient, ctx)} flavor of ${ctx.primaryIngredient.name.toLowerCase()}` 
    },
    { 
        tag: 'ingredient_centric', 
        text: (ctx) => `The experience begins with ${ctx.primaryIngredient.name.toLowerCase()}${ctx.secondaryIngredient ? `, perfectly complemented by the essence of ${ctx.secondaryIngredient.name.toLowerCase()}` : ', a simple and pure flavor experience'}` 
    },
    { 
        tag: 'style_centric', 
        text: (ctx) => `${ctx.cookingStyle.name} brings out a unique harmony between the ingredients, creating a texture that is both satisfying and light` 
    },
    { 
        tag: 'style_centric', 
        text: (ctx) => `Through the art of ${ctx.cookingStyle.name.toLowerCase()}, the ingredients meld into a single, delightful experience${ctx.secondaryIngredient ? `, led by the ${getAdjective(ctx.primaryIngredient, ctx)} ${ctx.primaryIngredient.name.toLowerCase()}` : ''}`
    },
    { 
        tag: 'theme_centric', 
        text: (ctx) => `In keeping with its '${ctx.theme}' theme, the preparation is simple yet profound, allowing the natural flavors to shine` 
    },
    { 
        tag: 'theme_centric', 
        text: (ctx) => `This dish is a perfect reflection of the '${ctx.theme}' philosophy, emphasizing clarity and purity in every bite`
    },
];

const loreFragments: SentenceFragment[] = [
    { 
        tag: 'tradition', 
        text: (ctx) => `An ancient recipe passed down through generations of monks, it is said that preparing this dish fosters a deep connection to the element of air.` 
    },
    { 
        tag: 'philosophy', 
        text: (ctx) => `The patterns made by the steam (or crust) are often used as a meditative focus, representing the transient and beautiful nature of life.` 
    },
    { 
        tag: 'legend', 
        text: (ctx) => `Legend says that Avatar Yangchen herself favored a similar dish, enjoying it after long sessions of meditation to reground herself.` 
    },
    { 
        tag: 'practical', 
        text: (ctx) => `Often prepared for young Air Acolytes, this meal teaches the importance of patience and finding joy in simple, wholesome things.` 
    },
];

export class Grammar {
  /**
   * Builds a rich, varied description sentence.
   */
  public buildDescriptionSentence(context: DishContext, usedTags: string[] = []): { sentence: string, usedTag: string } {
    // Filter out tags we've already used to ensure variety
    const availableFragments = descriptionFragments.filter(f => !usedTags.includes(f.tag));
    
    // If we've somehow used all tags, just return a generic one
    const fragment = pick(availableFragments.length > 0 ? availableFragments : descriptionFragments);

    const sentence = fragment.text(context);
    return {
        sentence: sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.',
        usedTag: fragment.tag
    };
  }

  /**
   * Builds a lore sentence from the new pool.
   */
  public buildLoreSentence(context: DishContext): string {
      const fragment = pick(loreFragments);
      return fragment.text(context);
  }
}