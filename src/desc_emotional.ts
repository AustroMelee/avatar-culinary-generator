/**
 * Emotional Descriptions Module
 * 
 * This module provides descriptions that focus on the feeling or state of mind 
 * the dish is meant to evoke, connecting the food to the inner world of the consumer.
 */

import { DescriptionRule } from './types';

export const emotionalDescriptions: DescriptionRule[] = [
  {
    id: 'emo_nostalgia_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      const locationDesc = ctx.primaryIngredient.location === 'Generic' ? 'home' : `${ctx.primaryIngredient.location.toLowerCase()}`;
      
      return `There is a powerful feeling of nostalgia to this dish. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, can transport one back to the comfort of their childhood ${locationDesc}, evoking memories of simpler times and cherished traditions.`;
    },
    weighting: { themes: ['Humble & Meditative', 'Ancient & Traditional'] },
  },
  {
    id: 'emo_invigorating_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `This is not a meal for quiet contemplation; it is a jolt of pure energy. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, delivers sharp, ${ctx.primaryIngredient.flavorProfile} flavors designed to awaken the body and prepare it for action.`;
    },
    weighting: { themes: ['Invigorating & Playful'], nations: ['fire-nation'] },
  },
  {
    id: 'emo_serenity_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `To eat this dish is to experience a moment of profound serenity. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, creates flavors that are clean, balanced, and harmonious, encouraging a state of inner peace and mindfulness with every bite.`;
    },
    weighting: { themes: ['Humble & Meditative'], nations: ['air-nomads'] },
  },
  {
    id: 'emo_comfort_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `This is the culinary equivalent of a warm blanket on a cold night. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, creates a dish of pure comfort, designed to soothe the soul and fortify the spirit against the harsh world outside.`;
    },
    weighting: { nations: ['water-tribe', 'earth-kingdom'], dishTypes: ['soup-stew'] },
  },
  {
    id: 'emo_curiosity_enhanced',
    text: (ctx) => {
      const primaryDesc = ctx.primaryIngredient.description.toLowerCase();
      const secondaryDesc = ctx.secondaryIngredient.description.toLowerCase();
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      
      return `This fusion dish inspires curiosity. ${styleDesc} The unexpected pairing of ${ctx.primaryIngredient.name.toLowerCase()}, ${primaryDesc}, with ${ctx.secondaryIngredient.name.toLowerCase()}, ${secondaryDesc}, challenges convention and invites the diner to explore new culinary horizons.`;
    },
    weighting: { fusion: true, minNations: 2 },
  },
  {
    id: 'emo_joy_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `This dish brings pure, unadulterated joy. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, creates bright flavors and playful presentation designed to make the eater smile, lifting spirits and creating a sense of celebration with every mouthful.`;
    },
    weighting: { themes: ['Invigorating & Playful', 'Ceremonial & Celebratory'] },
  },
  {
    id: 'emo_reflection_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `This meal encourages deep reflection. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, creates subtle, complex flavors that require careful attention to fully appreciate, creating a meditative experience that allows the mind to wander and contemplate.`;
    },
    weighting: { themes: ['Humble & Meditative'], nations: ['air-nomads', 'water-tribe'] },
  },
  {
    id: 'emo_courage_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      return `Eating this dish requires courage. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, delivers intense, bold flavors that are not for the faint of heart, but those who dare to try it are rewarded with a sense of accomplishment and newfound bravery.`;
    },
    weighting: { nations: ['fire-nation'], flavorProfiles: ['pungent'], themes: ['Invigorating & Playful'] },
  },
  {
    id: 'emo_gratitude_enhanced',
    text: (ctx) => {
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      const locationDesc = ctx.primaryIngredient.location === 'Generic' ? 'the earth' : `${ctx.primaryIngredient.location.toLowerCase()}`;
      
      return `This dish inspires gratitude. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, hails from ${locationDesc} and reminds the eater of nature's bounty and the skill of those who prepared it, creating a sense of thankfulness for the meal.`;
    },
    weighting: { themes: ['Humble & Meditative'], nations: ['earth-kingdom'] },
  },
  {
    id: 'emo_wonder_enhanced',
    text: (ctx) => {
      const primaryDesc = ctx.primaryIngredient.description.toLowerCase();
      const secondaryDesc = ctx.secondaryIngredient.description.toLowerCase();
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      
      return `This dish evokes a sense of wonder. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()}, ${primaryDesc}, combined with ${ctx.secondaryIngredient.name.toLowerCase()}, ${secondaryDesc}, creates flavors so unexpected and delightful that it reminds the eater of the magic and mystery that still exists in the world.`;
    },
    weighting: { fusion: true, minNations: 3, themes: ['Ancient & Traditional'] },
  },
  
  // --- NEW: Enhanced emotional descriptions ---
  {
    id: 'emo_connection_enhanced',
    text: (ctx) => {
      const nationPhilosophy = getNationPhilosophy(ctx.fusionData.selectedNations[0]);
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      
      return `This dish creates a deep sense of connection. ${styleDesc} ${nationPhilosophy.toLowerCase()}. The ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, connects the eater to the land, the people, and the traditions that brought this meal to life.`;
    },
    weighting: { minIngredients: 1 },
  },
  
  {
    id: 'emo_achievement_enhanced',
    text: (ctx) => {
      const rarityText = ctx.primaryIngredient.rarity === 'Legendary' ? 'legendary' : ctx.primaryIngredient.rarity.toLowerCase();
      const ingredientDesc = ctx.primaryIngredient.description.toLowerCase();
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this technique');
      
      return `Eating this dish feels like an achievement. ${styleDesc} The ${rarityText} ${ctx.primaryIngredient.name.toLowerCase()}, ${ingredientDesc}, represents the culmination of skill, patience, and dedication, making each bite feel like a reward for the effort that went into its creation.`;
    },
    weighting: { minRarity: 'Rare' },
  },
  
  {
    id: 'emo_harmony_enhanced',
    text: (ctx) => {
      const synergyScore = ctx.primaryIngredient.synergies?.[ctx.secondaryIngredient.name] || 0;
      const styleDesc = ctx.cookingStyle.description.toLowerCase().replace(ctx.cookingStyle.name.toLowerCase(), 'this method');
      
      if (synergyScore > 7) {
        return `This dish creates a profound sense of harmony. ${styleDesc} The legendary synergy between ${ctx.primaryIngredient.name.toLowerCase()} and ${ctx.secondaryIngredient.name.toLowerCase()} creates something that feels perfectly balanced, as if the universe itself has aligned to create this moment of culinary perfection.`;
      } else {
        return `This dish creates a sense of harmony through contrast. ${styleDesc} The ${ctx.primaryIngredient.name.toLowerCase()} and ${ctx.secondaryIngredient.name.toLowerCase()} work together despite their differences, teaching the eater that beauty often lies in the balance of opposites.`;
      }
    },
    weighting: { minIngredients: 2 },
  },
];

// Helper function to get nation-specific philosophy
function getNationPhilosophy(nation: string): string {
    switch (nation) {
        case 'air-nomads':
            return 'This dish embodies the Air Nomad principle of detachment and freedom';
        case 'water-tribe':
            return 'This dish reflects the Water Tribe\'s adaptability and flow';
        case 'earth-kingdom':
            return 'This dish honors the Earth Kingdom\'s connection to the land and tradition';
        case 'fire-nation':
            return 'This dish demonstrates the Fire Nation\'s mastery of heat and control';
        default:
            return 'This dish combines the best traditions from across the four nations';
    }
} 