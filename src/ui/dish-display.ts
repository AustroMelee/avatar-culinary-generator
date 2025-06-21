import type { GeneratedAirNomadDish } from '../types.js';

// UI display constants
const EMPTY_STATE_MESSAGE = 'Click "Generate Dish" to create an Air Nomad culinary masterpiece!';
const GENERATING_STATE_MESSAGE = '🌪️ Consulting the Ancient Scrolls...';
// const GENERATING_STATE_EMOJI = '🌪️'; // Available for future UI enhancements

/**
 * Handles visual presentation of generated Air Nomad dishes in the DOM
 * Manages display states and formatting for optimal user experience
 */
export class DishDisplay {
  private container: HTMLElement;
  private emojiMappings: Record<string, string> = {};

  /**
   * Creates a new dish display controller bound to a specific DOM element
   * Throws error if the target element cannot be found
   */
  constructor(containerId: string, emojiMappings: Record<string, string> = {}) {
    const element = document.getElementById(containerId);
    if (!element) {
      throw new Error(`DishDisplay: Cannot find element with id '${containerId}'. Ensure the target element exists in the DOM.`);
    }
    this.container = element;
    this.emojiMappings = emojiMappings;
  }

  /**
   * Renders a generated dish or empty state message in the display container
   * Handles null dishes gracefully by showing placeholder content
   */
  renderDish(dish: GeneratedAirNomadDish | null): void {
    try {
      if (!dish) {
        this.renderEmptyState();
        return;
      }

      this.renderCompleteDish(dish);
    } catch (error) {
      throw new Error(`DishDisplay.renderDish: Failed to render dish - ${error instanceof Error ? error.message : 'Unknown rendering error'}`);
    }
  }

  /**
   * Shows loading state with thematic Air Nomad messaging
   * Provides visual feedback during dish generation process
   */
  showGeneratingState(): void {
    this.container.innerHTML = `
      <div class="dish-display generating">
        <p>${GENERATING_STATE_MESSAGE}</p>
      </div>
    `;
  }

  /**
   * Renders empty state when no dish is available
   * Shows completely empty container with no visible elements
   */
  private renderEmptyState(): void {
    this.container.innerHTML = '';
  }

  /**
   * Renders a complete dish with all details formatted for display
   * Includes ingredients, technique, and metadata in structured layout
   */
  private renderCompleteDish(dish: GeneratedAirNomadDish): void {
    const ingredientsHtml = this.formatIngredientsHtml(dish.ingredients);
    
    // Find legendary ingredient or use the first ingredient's emoji
    const legendaryIngredient = dish.ingredients.find(i => i.rarity === 'legendary');
    const primaryIngredient = legendaryIngredient || dish.ingredients[0];
    const dishEmoji = primaryIngredient ? this.emojiMappings[primaryIngredient.name] || '🍲' : '🍲';

    // Defensively remove any emojis that might be in the name string itself
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/ug;
    const cleanDishName = dish.name.replace(emojiRegex, '').trim();

    this.container.innerHTML = `
      <div class="dish-display">
        <h2 class="dish-name"><span class="dish-emoji">${dishEmoji}</span> ${cleanDishName}</h2>
        
        <div class="dish-sections">
          <div class="description-section">
            <h3>Description</h3>
            <p class="description">${dish.description}</p>
          </div>
          
          ${dish.lore ? `
          <div class="lore-section">
            <h3>Lore</h3>
            <p class="lore">${dish.lore}</p>
          </div>
          ` : ''}
        </div>
        
        <div class="dish-details">
          <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul class="ingredients-list">
              ${ingredientsHtml}
            </ul>
          </div>
          
          <div class="technique">
            <h3>Technique:</h3>
            <p><strong>${dish.technique.name}</strong></p>
            <p>${(dish.technique as any).description || 'Traditional Air Nomad preparation method'}</p>
          </div>
          
          <div class="metadata">
            <p><strong>Difficulty:</strong> ${dish.difficulty}</p>
            <p><strong>Serves:</strong> ${dish.servingSize}</p>
            ${this.formatSpiritualBenefitHtml((dish as any).spiritualBenefitDescription || (dish as any).spiritualBenefit)}
          </div>
        </div>
      </div>
    `;

    // Store current dish for clipboard function
    (window as any).currentDish = dish;
    
    // Set up clipboard function if not already set
    if (!(window as any).copyDishToClipboard) {
      (window as any).copyDishToClipboard = () => this.copyDishToClipboard();
    }

    // Create copy button as a fixed positioned element
    this.createCopyButton();
    
    // Create screenshot button within the dish display
    this.createScreenshotButton();
  }

  /**
   * Creates a fixed positioned copy button
   */
  private createCopyButton(): void {
    // Remove existing copy button if it exists
    const existingButton = document.querySelector('.copy-dish-button');
    if (existingButton) {
      existingButton.remove();
    }

    // Create new copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-dish-button';
    copyButton.textContent = '📋';
    copyButton.title = 'Copy dish details to clipboard';
    copyButton.addEventListener('click', () => this.copyDishToClipboard());

    // Add to the dish display container so it can be positioned absolutely
    const dishDisplay = this.container.querySelector('.dish-display');
    if (dishDisplay) {
      dishDisplay.appendChild(copyButton);
    }
  }

  /**
   * Creates the screenshot mode button within the dish display
   */
  private createScreenshotButton(): void {
    // Remove existing screenshot button if it exists
    const existingButton = document.querySelector('.screenshot-toggle');
    if (existingButton) {
      existingButton.remove();
    }

    // Create new screenshot button
    const screenshotButton = document.createElement('button');
    screenshotButton.className = 'screenshot-toggle';
    screenshotButton.textContent = '📸';
    screenshotButton.title = 'Hide all UI and show only the dish for screenshots';
    
    // Toggle screenshot mode functionality
    screenshotButton.addEventListener('click', () => {
      document.body.classList.toggle('screenshot-mode');
      // Update button text
      screenshotButton.textContent = document.body.classList.contains('screenshot-mode')
        ? '✖'
        : '📸';
      
      if (document.body.classList.contains('screenshot-mode')) {
        console.log('📸 Entered screenshot mode');
      } else {
        console.log('🖼️ Exited screenshot mode');
      }
    });

    // Add to the dish display container so it can be positioned absolutely
    const dishDisplay = this.container.querySelector('.dish-display');
    if (dishDisplay) {
      dishDisplay.appendChild(screenshotButton);
    }
  }

  /**
   * Copies the current dish details to clipboard in a nicely formatted text
   */
  private async copyDishToClipboard(): Promise<void> {
    const dish = (window as any).currentDish;
    if (!dish) {
      console.warn('No dish available to copy');
      return;
    }

    try {
      const formattedText = this.formatDishForClipboard(dish);
      await navigator.clipboard.writeText(formattedText);
      
      // Show feedback
      this.showCopyFeedback();
      console.log('✨ Dish copied to clipboard successfully!');
    } catch (error) {
      console.error('Failed to copy dish to clipboard:', error);
      // Fallback for older browsers
      this.fallbackCopyToClipboard(this.formatDishForClipboard(dish));
    }
  }

  /**
   * Formats dish data into a clean, readable text format for copying
   */
  private formatDishForClipboard(dish: GeneratedAirNomadDish): string {
    // Find legendary ingredient or use the first ingredient's emoji
    const legendaryIngredient = dish.ingredients.find(i => i.rarity === 'legendary');
    const primaryIngredient = legendaryIngredient || dish.ingredients[0];
    const dishEmoji = primaryIngredient ? this.emojiMappings[primaryIngredient.name] || '🍲' : '🍲';
    
    // Defensively remove any emojis that might have been added to the name string
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/ug;
    const cleanDishName = dish.name.replace(emojiRegex, '').trim();
    
    let formattedText = '';

    // Title with emoji
    formattedText += `${dishEmoji} ${cleanDishName}\n`;
    formattedText += '='.repeat(cleanDishName.length + 3) + '\n\n';

    // Description
    formattedText += '📝 DESCRIPTION\n';
    formattedText += '-'.repeat(13) + '\n';
    formattedText += `${dish.description}\n\n`;

    // Lore (if available)
    if (dish.lore) {
      formattedText += '📜 LORE\n';
      formattedText += '-'.repeat(6) + '\n';
      formattedText += `${dish.lore}\n\n`;
    }

    // Ingredients
    formattedText += '🥘 INGREDIENTS\n';
    formattedText += '-'.repeat(13) + '\n';
    
    // Group ingredients by category for cleaner formatting
    const groupedIngredients = this.groupIngredientsByCategory(dish.ingredients);
    
    Object.entries(groupedIngredients).forEach(([category, ingredientList]) => {
      const groupEmoji = this.getGroupEmoji(category);
      formattedText += `\nGROUP: ${groupEmoji} ${category}\n`;
      
      ingredientList.forEach(ingredient => {
        const specificEmoji = this.emojiMappings[ingredient.name] || '🌿';
        const rarityIcon = this.getRarityIcon(ingredient.rarity);
        const rarityName = ingredient.rarity.charAt(0).toUpperCase() + ingredient.rarity.slice(1);
        formattedText += `----${specificEmoji} ${ingredient.name} ${rarityIcon} ${rarityName}\n`;
      });
    });

    // Metadata
    formattedText += `\n📊 DETAILS\n`;
    formattedText += '-'.repeat(9) + '\n';
    formattedText += `Difficulty: ${dish.difficulty}\n`;
    formattedText += `Serves: ${dish.servingSize}\n`;

    // Spiritual benefit if available
    const spiritualBenefit = (dish as any).spiritualBenefitDescription || (dish as any).spiritualBenefit;
    if (spiritualBenefit) {
      const formattedBenefit = this.formatSpiritualBenefitText(spiritualBenefit);
      formattedText += `Spiritual Benefit: ${formattedBenefit}\n`;
    }

    formattedText += '\n✨ Generated by Avatar Food Generator ✨';

    return formattedText;
  }

  /**
   * Gets rarity icon for text formatting
   */
  private getRarityIcon(rarity: string): string {
    const rarityConfig = {
      'common': '●',
      'uncommon': '◆',
      'rare': '★',
      'legendary': '✦'
    };
    return rarityConfig[rarity as keyof typeof rarityConfig] || '?';
  }

  /**
   * Shows visual feedback when copy is successful
   */
  private showCopyFeedback(): void {
    const copyButton = document.querySelector('.copy-dish-button') as HTMLButtonElement;
    if (copyButton) {
      const originalText = copyButton.textContent;
      copyButton.textContent = '✅';
      copyButton.style.background = '#28a745';
      
      setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.style.background = '';
      }, 2000);
    }
  }

  /**
   * Fallback copy method for older browsers
   */
  private fallbackCopyToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showCopyFeedback();
      console.log('✨ Dish copied to clipboard using fallback method!');
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textArea);
  }

  /**
   * Converts ingredient array to grouped column layout by category
   * Groups ingredients under their categories to avoid repetition
   * Format: Group headers with indented ingredients underneath
   */
  private formatIngredientsHtml(ingredients: GeneratedAirNomadDish['ingredients']): string {
    // Group ingredients by category
    const groupedIngredients = this.groupIngredientsByCategory(ingredients);
    
    // Generate HTML for each group
    const groupsHtml = Object.entries(groupedIngredients).map(([category, ingredientList]) => {
      const groupEmoji = this.getGroupEmoji(category);
      
      // Generate group header
      const groupHeader = `<li class="ingredient-group-header"><span class="group-label">[GROUP]:</span> <span class="group-emoji">${groupEmoji}</span><span class="group-name">${category}</span></li>`;
      
      // Generate ingredients for this group
      const ingredientsHtml = ingredientList.map(ingredient => {
        const rarityLabel = this.formatRarityLabel(ingredient.rarity);
        const specificEmoji = this.emojiMappings[ingredient.name] || '🌿';
        
        return `<li class="ingredient-item-grouped rarity-${ingredient.rarity}">${specificEmoji} ${ingredient.name} <span style="float: right; opacity: 0.7;">${rarityLabel}</span></li>`;
      }).join('');
      
      return groupHeader + ingredientsHtml;
    }).join('');
    
    return groupsHtml;
  }

  /**
   * Formats rarity labels with appropriate styling and icons
   * Provides clear visual indication of ingredient rarity
   */
  private formatRarityLabel(rarity: string): string {
    const rarityConfig = {
      'common': { label: 'Common', icon: '●' },
      'uncommon': { label: 'Uncommon', icon: '◆' },
      'rare': { label: 'Rare', icon: '★' },
      'legendary': { label: 'Legendary', icon: '✦' }
    };

    const config = rarityConfig[rarity as keyof typeof rarityConfig] || { label: 'Unknown', icon: '?' };
    return `${config.icon} ${config.label}`;
  }

  /**
   * Formats spiritual benefit for display, handling undefined values gracefully
   * Returns empty string if no spiritual benefit is present
   * Converts underscore format to human-readable text if needed
   */
  private formatSpiritualBenefitHtml(spiritualBenefit: string | undefined): string {
    if (!spiritualBenefit) return '';
    
    // Convert underscore format to human-readable text if needed
    const formattedBenefit = this.formatSpiritualBenefitText(spiritualBenefit);
    
    return `<p><strong>Spiritual Benefit:</strong> ${formattedBenefit}</p>`;
  }

  /**
   * Converts spiritual benefit from underscore format to human-readable text
   * Handles both enum values and description strings gracefully
   */
  private formatSpiritualBenefitText(benefit: string): string {
    // If it already looks like a proper description, return as-is
    if (benefit.includes(' ') && !benefit.includes('_') && benefit.length > 30) {
      return benefit;
    }
    
    // Convert underscore enum format to human-readable text
    const conversions: Record<string, string> = {
      'enhances_meditation_focus': 'Enhances meditation focus and mental clarity',
      'promotes_inner_peace': 'Promotes inner peace and emotional balance',
      'stimulates_chakra_alignment': 'Stimulates chakra alignment and energy flow',
      'awakens_spiritual_awareness': 'Awakens spiritual awareness and divine connection',
      'fosters_community_harmony': 'Fosters community harmony and mutual understanding',
      'connects_to_ancestral_wisdom': 'Connects to ancestral wisdom and ancient teachings',
      'purifies_mind_and_body': 'Purifies mind and body of negative energy',
      'facilitates_air_nomad_traditions': 'Facilitates Air Nomad traditions and customs'
    };
    
    // Return converted text or fallback to formatted version
    return conversions[benefit] || benefit.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  /**
   * Extracts ingredient category information from the emoji mappings
   * Maps ingredient names to their semantic category groups for better organization
   */
  private getIngredientCategory(ingredientName: string): string {
    // CONSOLIDATED CATEGORIES - Group similar ingredients together
    const categoryMappings: Record<string, string> = {
      // === GRAINS & STARCHES ===
      'Basmati Rice': 'GRAINS & STARCHES',
      'Flour': 'GRAINS & STARCHES',
      'Glutinous Rice': 'GRAINS & STARCHES',
      'Noodles': 'GRAINS & STARCHES',
      'Pastry': 'GRAINS & STARCHES',
      'Rice': 'GRAINS & STARCHES',
      'Rice Flour': 'GRAINS & STARCHES',
      'Roasted Barley Flour': 'GRAINS & STARCHES',
      'Taro': 'GRAINS & STARCHES',
      'Potato': 'GRAINS & STARCHES',
      'Yam': 'GRAINS & STARCHES',
      
      // === VEGETABLES & GREENS ===
      'Bamboo Shoots': 'VEGETABLES & GREENS',
      'Bean Sprouts': 'VEGETABLES & GREENS',
      'Bell Peppers': 'VEGETABLES & GREENS',
      'Cabbage': 'VEGETABLES & GREENS',
      'Carrot': 'VEGETABLES & GREENS',
      'Chayote': 'VEGETABLES & GREENS',
      'Chrysanthemum Greens': 'VEGETABLES & GREENS',
      'Fiddlehead Ferns': 'VEGETABLES & GREENS',
      'Lotus Root': 'VEGETABLES & GREENS',
      'Onion': 'VEGETABLES & GREENS',
      'Red Cabbage': 'VEGETABLES & GREENS',
      'Tomato': 'VEGETABLES & GREENS',
      'Water Chestnuts': 'VEGETABLES & GREENS',
      'Seaweed': 'VEGETABLES & GREENS',
      'Oyster Mushroom': 'VEGETABLES & GREENS',
      'Shiitake': 'VEGETABLES & GREENS',
      
      // === PROTEINS & LEGUMES ===
      'Almonds': 'PROTEINS & LEGUMES',
      'Azuki Beans': 'PROTEINS & LEGUMES',
      'Cashews': 'PROTEINS & LEGUMES',
      'Egg Whites': 'PROTEINS & LEGUMES',
      'Eggs': 'PROTEINS & LEGUMES',
      'Lychee Nuts': 'PROTEINS & LEGUMES',
      'Mung Beans': 'PROTEINS & LEGUMES',
      'Pine Nuts': 'PROTEINS & LEGUMES',
      'Silken Tofu': 'PROTEINS & LEGUMES',
      'Tofu': 'PROTEINS & LEGUMES',
      'Toasted Sesame Seeds': 'PROTEINS & LEGUMES',
      
      // === FRUITS & SWEETENERS ===
      'Apple': 'FRUITS & SWEETENERS',
      'Banana': 'FRUITS & SWEETENERS',
      'Cloudberries': 'FRUITS & SWEETENERS',
      'Coconut': 'FRUITS & SWEETENERS',
      'Dried Apricots': 'FRUITS & SWEETENERS',
      'Goji Berries': 'FRUITS & SWEETENERS',
      'Jackfruit': 'FRUITS & SWEETENERS',
      'Longan Fruit': 'FRUITS & SWEETENERS',
      'Moon Peaches': 'FRUITS & SWEETENERS',
      'Raisins': 'FRUITS & SWEETENERS',
      'Rock Sugar': 'FRUITS & SWEETENERS',
      'Sugar': 'FRUITS & SWEETENERS',
      'Wild Honey': 'FRUITS & SWEETENERS',
      'Sweet Fillings': 'FRUITS & SWEETENERS',
      'Plum Filling': 'FRUITS & SWEETENERS',
      'Red Bean Paste': 'FRUITS & SWEETENERS',
      
      // === HERBS & SEASONINGS ===
      'Butter': 'HERBS & SEASONINGS',
      'Crystal Cave Minerals': 'HERBS & SEASONINGS',
      'Fruit Extracts': 'HERBS & SEASONINGS',
      'Ginger': 'HERBS & SEASONINGS',
      'Himalayan Salt': 'HERBS & SEASONINGS',
      'Jasmine Blossoms': 'HERBS & SEASONINGS',
      'Lemon Zest': 'HERBS & SEASONINGS',
      'Lemongrass': 'HERBS & SEASONINGS',
      'Sacred Lotus Root': 'HERBS & SEASONINGS',
      'Salt': 'HERBS & SEASONINGS',
      'Scallions': 'HERBS & SEASONINGS',
      'Snow Lotus Petals': 'HERBS & SEASONINGS',
      'Tea Leaves': 'HERBS & SEASONINGS',
      'Wind Flower Nectar': 'HERBS & SEASONINGS',
      'Pickles': 'HERBS & SEASONINGS',
      
      // === LIQUIDS & SAUCES ===
      'Butter Tea': 'LIQUIDS & SAUCES',
      'Cream': 'LIQUIDS & SAUCES',
      'Creamy Sauce': 'LIQUIDS & SAUCES',
      'Milk': 'LIQUIDS & SAUCES',
      'Milk Powder': 'LIQUIDS & SAUCES',
      'Sky Bison Milk': 'LIQUIDS & SAUCES',
      'Soy Milk': 'LIQUIDS & SAUCES',
      'Soy Sauce': 'LIQUIDS & SAUCES',
      'Vegetable Broth': 'LIQUIDS & SAUCES',
      'Yak Milk': 'LIQUIDS & SAUCES'
    };

    // Return specific category or fallback to generic
    return categoryMappings[ingredientName] || 'OTHER INGREDIENTS';
  }

  /**
   * Maps ingredient categories to their representative group emojis
   * Provides visual context for ingredient categories
   */
  private getGroupEmoji(category: string): string {
    const categoryLower = category.toLowerCase();
    
    if (categoryLower.includes('grains') || categoryLower.includes('starches')) return '🌾';
    if (categoryLower.includes('vegetables') || categoryLower.includes('greens')) return '🥬';
    if (categoryLower.includes('proteins') || categoryLower.includes('legumes')) return '🥩';
    if (categoryLower.includes('fruits') || categoryLower.includes('sweeteners')) return '🍯';
    if (categoryLower.includes('herbs') || categoryLower.includes('seasonings')) return '🌿';
    if (categoryLower.includes('liquids') || categoryLower.includes('sauces')) return '💧';
    
    return '🥘'; // Default for other ingredients
  }

  /**
   * Groups ingredients by their category for organized display
   * Returns a map of category names to arrays of ingredients
   */
  private groupIngredientsByCategory(ingredients: GeneratedAirNomadDish['ingredients']): Record<string, Array<GeneratedAirNomadDish['ingredients'][0]>> {
    const groups: Record<string, Array<GeneratedAirNomadDish['ingredients'][0]>> = {};
    
    for (const ingredient of ingredients) {
      const category = this.getIngredientCategory(ingredient.name);
      
      if (!groups[category]) {
        groups[category] = [];
      }
      
      groups[category].push(ingredient);
    }
    
    return groups;
  }
} 