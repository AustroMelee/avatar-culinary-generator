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

  /**
   * Creates a new dish display controller bound to a specific DOM element
   * Throws error if the target element cannot be found
   */
  constructor(containerId: string) {
    const element = document.getElementById(containerId);
    if (!element) {
      throw new Error(`DishDisplay: Cannot find element with id '${containerId}'. Ensure the target element exists in the DOM.`);
    }
    this.container = element;
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
    const spiritualBenefitHtml = this.formatSpiritualBenefitHtml((dish as any).spiritualBenefit);

    this.container.innerHTML = `
      <div class="dish-display">
        <h2>${dish.name}</h2>
        <p class="description">${dish.description}</p>
        
        <div class="dish-details">
          <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
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
            ${this.formatSpiritualBenefitHtml((dish as any).spiritualBenefit)}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Converts ingredient array to formatted HTML list items
   * Applies CSS classes based on ingredient rarity for visual styling
   */
  private formatIngredientsHtml(ingredients: GeneratedAirNomadDish['ingredients']): string {
    return ingredients.map(ingredient => 
      `<li class="rarity-${ingredient.rarity}">${ingredient.name}</li>`
    ).join('');
  }

  /**
   * Formats spiritual benefit for display, handling undefined values gracefully
   * Returns empty string if no spiritual benefit is present
   */
  private formatSpiritualBenefitHtml(spiritualBenefit: string | undefined): string {
    return spiritualBenefit ? 
      `<p><strong>Spiritual Benefit:</strong> ${spiritualBenefit}</p>` : 
      '';
  }
} 