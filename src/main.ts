import { SovereignDishGenerator } from './generator/sovereign-dish-generator.js';
import { AirNomadDataProvider } from './data/air-nomad-data-provider.js';
import { DishDisplay } from './ui/dish-display.js';
import { initializeEmojiRenderer, enhanceDishDisplayWithEmojis } from './ui/emoji-renderer.js';
import { LoadingAnimationController } from './ui/loading-animation.js';
import type { GeneratedAirNomadDish } from './types.js';

/**
 * Yields execution to the event loop to prevent UI blocking
 * Implements performance optimization for long-running generation tasks
 */
async function yieldToEventLoop(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Non-blocking dish generation with beautiful Air Nomad loading animation
 * Uses the SOVEREIGN ARCHITECTURE: Core Generator + Nation Config
 */
async function generateDishWithLoadingAnimation(): Promise<void> {
  const generateButton = document.getElementById('generate-button') as HTMLButtonElement;
  const dishDisplay = new DishDisplay('dish-container');
  const loadingController = new LoadingAnimationController('body');
  
  try {
    // Disable button to prevent spam clicking
    generateButton.disabled = true;
    generateButton.textContent = 'Generating...';
    
    // Start the beautiful 5-second loading animation
    await loadingController.startLoadingAnimation();
    
    // Yield to allow UI update after animation
    await yieldToEventLoop();
    
    // SOVEREIGN ARCHITECTURE: One True Generator + Nation Data Provider
    const sovereignGenerator = new SovereignDishGenerator();
    const airNomadConfig = AirNomadDataProvider.forMainCourse();
    const dish = sovereignGenerator.createDish<any, any, GeneratedAirNomadDish>(airNomadConfig);
    
    // Yield before rendering
    await yieldToEventLoop();
    
    // Display the generated dish
    dishDisplay.renderDish(dish);
    
    // Enhance with emojis
    const dishContainer = document.getElementById('dish-container');
    if (dishContainer && dish) {
      const dishData = {
        name: dish.name,
        ingredients: dish.ingredients.map(ing => ing.name),
        culturalSignificance: dish.culturalBenefit,
        nation: 'air-nomads'
      };
      enhanceDishDisplayWithEmojis(dishContainer, dishData);
    }
    
  } catch (error) {
    console.error('Error generating dish:', error);
    
    // Hide loading animation on error
    loadingController.forceStop();
    
    // Display error message to user
    const displayContainer = document.getElementById('dish-container');
    if (displayContainer) {
      displayContainer.innerHTML = `
        <div class="error-message">
          <h3>Generation Error</h3>
          <p>Unable to generate dish. Please try again.</p>
          <small>Error: ${error instanceof Error ? error.message : 'Unknown error'}</small>
        </div>
      `;
    }
  } finally {
    // Reset UI state
    generateButton.disabled = false;
    generateButton.textContent = 'Generate New Dish';
  }
}

/**
 * Application initialization and event binding
 * Sets up sovereign generation workflow with loading animation system
 */
async function initializeApplication(): Promise<void> {
  console.log('🍲 Air Nomad Food Generator - Sovereign Architecture Initialized...');
  
  // Initialize emoji system
  try {
    await initializeEmojiRenderer();
    console.log('✅ Emoji system initialized');
  } catch (error) {
    console.warn('⚠️ Emoji system failed to initialize:', error);
  }
  
  // Set up generate button with async/await handling
  const generateButton = document.getElementById('generate-button') as HTMLButtonElement;
  if (generateButton) {
    generateButton.addEventListener('click', async () => {
      await generateDishWithLoadingAnimation();
    });
  } else {
    console.warn('Generate button not found in DOM');
  }
  
  // Generate initial dish on page load (with loading animation)
  setTimeout(async () => {
    await generateDishWithLoadingAnimation();
  }, 100); // Small delay to allow DOM to settle
  
  console.log('✨ Sovereign Architecture: SovereignDishGenerator + Air Nomad Data Provider + Loading Animation');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', async () => {
    await initializeApplication();
  });
} else {
  await initializeApplication();
}

// Make functions available globally for debugging
(window as any).generateDish = generateDishWithLoadingAnimation;
(window as any).yieldToEventLoop = yieldToEventLoop; 