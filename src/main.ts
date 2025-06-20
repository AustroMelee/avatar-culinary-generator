import { AirNomadMainDishGenerator } from './generator/air-nomad-generator.js';
import { DishDisplay } from './ui/dish-display.js';
import { GeneratedAirNomadDish } from './types.js';

// UI constants
const GENERATE_BUTTON_ID = 'generate-button';
const DISH_CONTAINER_ID = 'dish-container';
const BUTTON_TEXT_GENERATING = 'Generating...';
const BUTTON_TEXT_DEFAULT = 'Generate Air Nomad Dish';
const GENERATION_DELAY_MS = 500;

/**
 * Main application controller that orchestrates dish generation and display
 * Handles user interactions and coordinates between generator and UI components
 */
class App {
  private generator: AirNomadMainDishGenerator;
  private dishDisplay: DishDisplay;
  private generateButton: HTMLButtonElement;
  private currentDish: GeneratedAirNomadDish | null = null;

  /**
   * Initializes the application with generator, display, and event handlers
   * Throws error if required DOM elements are not found
   */
  constructor() {
    try {
      this.generator = new AirNomadMainDishGenerator();
      this.dishDisplay = new DishDisplay(DISH_CONTAINER_ID);
      
      const button = document.getElementById(GENERATE_BUTTON_ID) as HTMLButtonElement;
      if (!button) {
        throw new Error(`App: Cannot find generate button with id '${GENERATE_BUTTON_ID}'. Ensure the button exists in the DOM.`);
      }
      this.generateButton = button;
      
      this.attachEventListeners();
    } catch (error) {
      throw new Error(`App initialization failed: ${error instanceof Error ? error.message : 'Unknown initialization error'}`);
    }
  }

  /**
   * Attaches event listeners to UI elements for user interaction handling
   * Sets up click handler for dish generation button
   */
  private attachEventListeners(): void {
    this.generateButton.addEventListener('click', () => {
      this.handleDishGeneration();
    });
  }

  /**
   * Handles the complete dish generation workflow with UI feedback
   * Manages button states and provides visual feedback during generation
   */
  private async handleDishGeneration(): Promise<void> {
    try {
      this.setGeneratingState();
      
      // Add delay for better user experience and visual feedback
      await this.delayExecution(GENERATION_DELAY_MS);

      this.currentDish = this.generator.createDish();
      this.dishDisplay.renderDish(this.currentDish);

      this.resetButtonState();
    } catch (error) {
      this.resetButtonState();
      throw new Error(`handleDishGeneration: Failed to generate dish - ${error instanceof Error ? error.message : 'Unknown generation error'}`);
    }
  }

  /**
   * Sets UI to generating state with disabled button and loading display
   * Prevents multiple simultaneous generation requests
   */
  private setGeneratingState(): void {
    this.generateButton.disabled = true;
    this.generateButton.textContent = BUTTON_TEXT_GENERATING;
    this.dishDisplay.showGeneratingState();
  }

  /**
   * Resets button to default state after generation completes
   * Re-enables user interaction for subsequent generations
   */
  private resetButtonState(): void {
    this.generateButton.disabled = false;
    this.generateButton.textContent = BUTTON_TEXT_DEFAULT;
  }

  /**
   * Creates a promise-based delay for improved user experience
   * Allows time for loading animations and prevents jarring instant updates
   */
  private delayExecution(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
}

/**
 * Initialize the application when the DOM is fully loaded
 * Ensures all required elements exist before attempting to create the app
 */
document.addEventListener('DOMContentLoaded', () => {
  try {
    new App();
  } catch (error) {
    console.error('Failed to initialize Air Nomad Culinary Dash application:', error);
    // FIXME: Add user-facing error display instead of just console logging
  }
}); 