/**
 * EMOJI RENDERER SYSTEM
 * 
 * Provides beautiful emoji rendering using Twemoji for SVG output.
 * Integrates with the Avatar Food Generator UI to display emojis
 * alongside dishes, ingredients, and cultural elements.
 * 
 * Features:
 * - SVG rendering via Twemoji
 * - Semantic CSS classes for styling
 * - Avatar nation theming
 * - Responsive sizing
 */

import twemoji from 'twemoji';
import type { EmojiRecord, CulturalEmojiSet } from '../data/emoji/emoji-pool.js';
import { 
  getRandomFoodEmoji, 
  getRandomNationEmoji, 
  searchEmojis,
  initializeEmojiPool 
} from '../data/emoji/emoji-pool.js';

export type EmojiRenderOptions = {
  size?: 'small' | 'medium' | 'large' | 'xl';
  className?: string;
  alt?: string;
  nation?: string;
  category?: 'primary' | 'secondary' | 'cultural';
};

export type EmojiDisplayContext = 'dish-name' | 'ingredient' | 'technique' | 'cultural' | 'decoration';

/**
 * Renders emoji as SVG using Twemoji
 * Creates beautiful, scalable emoji graphics for the web interface
 */
export function renderEmojiAsSvg(
  emoji: EmojiRecord, 
  options: EmojiRenderOptions = {}
): HTMLElement {
  const { size = 'medium', className = '', alt, nation } = options;
  
  // Create container element
  const container = document.createElement('span');
  container.className = `emoji-container emoji-${size} ${className}`;
  container.textContent = emoji.char;
  
  // Add nation-specific theming
  if (nation) {
    container.classList.add(`emoji-nation-${nation}`);
  }
  
  // Set alt text for accessibility
  if (alt) {
    container.setAttribute('aria-label', alt);
  } else {
    container.setAttribute('aria-label', emoji.name);
  }
  
  // Apply Twemoji SVG transformation
  twemoji.parse(container, {
    folder: 'svg',
    ext: '.svg',
    base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/',
    className: `twemoji emoji-svg emoji-${size}`
  });
  
  return container;
}

/**
 * Creates emoji display for dish names
 * Adds contextual emoji to enhance dish presentation
 */
export function createDishNameEmoji(dishName: string, nation: string = 'air-nomads'): HTMLElement | null {
  // Try to find relevant emoji based on dish name keywords
  const searchTerms = dishName.toLowerCase().split(' ');
  let emoji: EmojiRecord | null = null;
  
  // Search for specific ingredient/technique emojis first
  for (const term of searchTerms) {
    const matches = searchEmojis(term);
    if (matches.length > 0) {
      emoji = matches[0];
      break;
    }
  }
  
  // Fallback to nation-specific emoji
  if (!emoji) {
    emoji = getRandomNationEmoji(nation, 'primary');
  }
  
  // Final fallback to generic food emoji
  if (!emoji) {
    emoji = getRandomFoodEmoji();
  }
  
  if (!emoji) return null;
  
  return renderEmojiAsSvg(emoji, {
    size: 'medium',
    className: 'dish-name-emoji',
    nation,
    alt: `${emoji.name} emoji for ${dishName}`
  });
}

/**
 * Creates ingredient emoji display
 * Shows relevant emoji for specific ingredients
 */
export function createIngredientEmoji(ingredientName: string, nation: string = 'air-nomads'): HTMLElement | null {
  // Search for ingredient-specific emoji
  const matches = searchEmojis(ingredientName);
  let emoji: EmojiRecord | null = null;
  
  if (matches.length > 0) {
    emoji = matches[0];
  } else {
    // Fallback to nation-appropriate emoji
    emoji = getRandomNationEmoji(nation, 'secondary');
  }
  
  if (!emoji) return null;
  
  return renderEmojiAsSvg(emoji, {
    size: 'small',
    className: 'ingredient-emoji',
    nation,
    alt: `${emoji.name} emoji for ${ingredientName}`
  });
}

/**
 * Creates cultural context emoji
 * Displays emojis that represent cultural elements like festivals or traditions
 */
export function createCulturalEmoji(context: string, nation: string = 'air-nomads'): HTMLElement | null {
  const emoji = getRandomNationEmoji(nation, 'cultural');
  if (!emoji) return null;
  
  return renderEmojiAsSvg(emoji, {
    size: 'medium',
    className: 'cultural-emoji',
    nation,
    alt: `${emoji.name} emoji for ${context}`
  });
}

/**
 * Creates decorative emoji for visual enhancement
 * Adds subtle visual elements to improve UI aesthetics
 */
export function createDecorativeEmoji(nation: string = 'air-nomads'): HTMLElement | null {
  const emoji = getRandomNationEmoji(nation, 'secondary');
  if (!emoji) return null;
  
  return renderEmojiAsSvg(emoji, {
    size: 'small',
    className: 'decorative-emoji',
    nation,
    alt: `Decorative ${emoji.name} emoji`
  });
}

/**
 * Enhanced dish display with emoji integration
 * Adds emojis to various parts of the dish display for visual richness
 */
export function enhanceDishDisplayWithEmojis(
  dishContainer: HTMLElement,
  dishData: {
    name: string;
    ingredients: string[];
    culturalSignificance?: string;
    nation?: string;
  }
): void {
  const nation = dishData.nation || 'air-nomads';
  
  // Add emoji to dish name
  /*
  const dishNameElement = dishContainer.querySelector('.dish-name');
  if (dishNameElement) {
    const nameEmoji = createDishNameEmoji(dishData.name, nation);
    if (nameEmoji) {
      // Add emoji and spacing to dish name
      const spacer = document.createTextNode(' ');
      dishNameElement.insertBefore(nameEmoji, dishNameElement.firstChild);
      dishNameElement.insertBefore(spacer, nameEmoji.nextSibling);
    }
  }
  */
  
  // Add emojis to ingredients
  const ingredientElements = dishContainer.querySelectorAll('.ingredient-item');
  ingredientElements.forEach((element, index) => {
    if (index < dishData.ingredients.length) {
      const ingredientEmoji = createIngredientEmoji(dishData.ingredients[index], nation);
      if (ingredientEmoji) {
        // Add some spacing and insert emoji at the beginning
        const spacer = document.createTextNode(' ');
        element.insertBefore(ingredientEmoji, element.firstChild);
        element.insertBefore(spacer, ingredientEmoji.nextSibling);
      }
    }
  });
  
  // Add cultural emoji if cultural significance is mentioned
  if (dishData.culturalSignificance) {
    const culturalSection = dishContainer.querySelector('.cultural-significance');
    if (culturalSection) {
      const culturalEmoji = createCulturalEmoji(dishData.culturalSignificance, nation);
      if (culturalEmoji) {
        culturalSection.insertBefore(culturalEmoji, culturalSection.firstChild);
      }
    }
  }
  
  // Add decorative emojis to enhance visual appeal
  const decorativePositions = dishContainer.querySelectorAll('.emoji-decoration-point');
  decorativePositions.forEach(() => {
    const decorativeEmoji = createDecorativeEmoji(nation);
    if (decorativeEmoji) {
      // Add to decoration points if they exist
    }
  });
}

/**
 * Creates emoji picker interface for user interaction
 * Allows users to browse and select emojis (future feature)
 */
export function createEmojiPicker(
  targetElement: HTMLElement,
  nation: string = 'air-nomads',
  onEmojiSelect?: (emoji: EmojiRecord) => void
): HTMLElement {
  const picker = document.createElement('div');
  picker.className = `emoji-picker emoji-picker-${nation}`;
  
  const title = document.createElement('h3');
  title.textContent = `${nation.replace('-', ' ')} Emojis`;
  title.className = 'emoji-picker-title';
  picker.appendChild(title);
  
  const grid = document.createElement('div');
  grid.className = 'emoji-grid';
  
  // This would be populated with actual emoji data
  // For now, showing the structure
  picker.appendChild(grid);
  
  return picker;
}

/**
 * Initializes emoji rendering system
 * Sets up emoji pool and applies CSS for proper display
 */
export async function initializeEmojiRenderer(): Promise<void> {
  try {
    // Initialize the emoji pool
    await initializeEmojiPool();
    
    // Add CSS for emoji styling
    addEmojiStyles();
    
    console.log('✅ Emoji Renderer Initialized');
  } catch (error) {
    console.error('Failed to initialize emoji renderer:', error);
  }
}

/**
 * Adds CSS styles for emoji display
 * Ensures emojis are properly sized and positioned
 */
function addEmojiStyles(): void {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    .emoji-container {
      display: inline-block;
      vertical-align: middle;
      margin: 0 0.2em;
    }
    
    .emoji-small .twemoji {
      width: 1em;
      height: 1em;
    }
    
    .emoji-medium .twemoji {
      width: 1.2em;
      height: 1.2em;
    }
    
    .emoji-large .twemoji {
      width: 1.5em;
      height: 1.5em;
    }
    
    .emoji-xl .twemoji {
      width: 2em;
      height: 2em;
    }
    
    .dish-name-emoji {
      margin-right: 0.5em;
    }
    
    .ingredient-emoji {
      margin-right: 0.3em;
    }
    
    .cultural-emoji {
      margin-left: 0.3em;
    }
    
    .decorative-emoji {
      opacity: 0.7;
      margin: 0 0.1em;
    }
    
    /* Nation-specific theming */
    .emoji-nation-air-nomads {
      filter: hue-rotate(60deg) brightness(1.1);
    }
    
    .emoji-nation-water-tribe {
      filter: hue-rotate(200deg) brightness(1.1);
    }
    
    .emoji-nation-earth-kingdom {
      filter: hue-rotate(90deg) brightness(0.9);
    }
    
    .emoji-nation-fire-nation {
      filter: hue-rotate(0deg) brightness(1.2);
    }
    
    .emoji-picker {
      background: white;
      border: 2px solid #ddd;
      border-radius: 8px;
      padding: 1em;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .emoji-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(3em, 1fr));
      gap: 0.5em;
      max-height: 200px;
      overflow-y: auto;
    }
  `;
  
  document.head.appendChild(styleSheet);
}

// Export utility functions for broader use
export {
  getRandomFoodEmoji,
  getRandomNationEmoji,
  searchEmojis
}; 