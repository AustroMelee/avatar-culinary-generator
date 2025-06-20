import { SovereignDishGenerator } from './generator/sovereign-dish-generator.js';
import { AirNomadDataProvider } from './data/air-nomad-data-provider.js';
import { DishDisplay } from './ui/dish-display.js';
import { initializeEmojiRenderer, enhanceDishDisplayWithEmojis } from './ui/emoji-renderer.js';
import type { GeneratedAirNomadDish } from './types.js';

/**
 * Yields execution to the event loop to prevent UI blocking
 * Implements performance optimization for long-running generation tasks
 */
async function yieldToEventLoop(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Non-blocking dish generation with yielding points
 * Uses the SOVEREIGN ARCHITECTURE: Core Generator + Nation Config
 */
async function generateDishWithYielding(): Promise<void> {
  const loadingElement = document.getElementById('loading') as HTMLElement;
  const generateButton = document.getElementById('generate-button') as HTMLButtonElement;
  const dishDisplay = new DishDisplay('dish-container');
  
  try {
    // Show loading state
    if (loadingElement) loadingElement.style.display = 'block';
    generateButton.disabled = true;
    generateButton.textContent = 'Generating...';
    
    dishDisplay.showGeneratingState();
    
    // Yield to allow UI update
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
    if (loadingElement) loadingElement.style.display = 'none';
    generateButton.disabled = false;
    generateButton.textContent = 'Generate New Dish';
  }
}

/**
 * Application initialization and event binding
 * Sets up sovereign generation workflow
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
      await generateDishWithYielding();
    });
  } else {
    console.warn('Generate button not found in DOM');
  }
  
  // Generate initial dish on page load
  setTimeout(async () => {
    await generateDishWithYielding();
  }, 100); // Small delay to allow DOM to settle
  
  console.log('✨ Sovereign Architecture: SovereignDishGenerator + Air Nomad Data Provider');
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
(window as any).generateDish = generateDishWithYielding;
(window as any).yieldToEventLoop = yieldToEventLoop; 