import { SovereignDishGenerator } from './generator/sovereign-dish-generator.js';
import { AirNomadDataProvider } from './data/air-nomad-data-provider.js';
import { DishDisplay } from './ui/dish-display.js';
import { initializeEmojiRenderer, enhanceDishDisplayWithEmojis } from './ui/emoji-renderer.js';
import { LoadingAnimationController } from './ui/loading-animation.js';
import { themeManager } from './ui/theme-manager.js';
import type { GeneratedAirNomadDish } from './types.js';

/**
 * Yields execution to the event loop to prevent UI blocking
 * Implements performance optimization for long-running generation tasks
 */
async function yieldToEventLoop(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Set up theme control event handlers
 * Enables theme switching and nation selection
 */
function setupThemeControls(): void {
  // Theme toggle button
  const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;
  if (themeToggle) {
    // Update button text based on current theme
    const currentTheme = themeManager.getCurrentTheme();
    themeToggle.textContent = currentTheme.variant === 'dark' ? '☀️ Light Theme' : '🌙 Dark Theme';
    
    themeToggle.addEventListener('click', () => {
      themeManager.toggleVariant();
      const newTheme = themeManager.getCurrentTheme();
      themeToggle.textContent = newTheme.variant === 'dark' ? '☀️ Light Theme' : '🌙 Dark Theme';
      console.log(`🎨 Switched to ${newTheme.theme?.name}`);
    });
  } else {
    console.warn('Theme toggle button not found in DOM');
  }
  
  // Nation selector
  const nationSelector = document.getElementById('nation-selector') as HTMLSelectElement;
  if (nationSelector) {
    // Set current nation
    const currentTheme = themeManager.getCurrentTheme();
    nationSelector.value = currentTheme.nation;
    
    nationSelector.addEventListener('change', (event) => {
      const selectedNation = (event.target as HTMLSelectElement).value as any;
      themeManager.switchNation(selectedNation);
      console.log(`🎨 Switched to ${selectedNation} theme`);
      
      // Update generate button text based on selected nation
      const generateButton = document.getElementById('generate-button') as HTMLButtonElement;
      if (generateButton) {
        const nationNames = {
          'air-nomads': 'Air Nomad',
          'water-tribe': 'Water Tribe',
          'earth-kingdom': 'Earth Kingdom',
          'fire-nation': 'Fire Nation'
        };
        generateButton.textContent = `Generate ${nationNames[selectedNation as keyof typeof nationNames]} Dish`;
      }
    });
  } else {
    console.warn('Nation selector not found in DOM');
  }
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
  
  // Initialize theme system with Air Nomad dark theme
  try {
    themeManager.initializeFromStorage();
    console.log('🎨 Theme system initialized with Air Nomad dark theme');
  } catch (error) {
    console.warn('⚠️ Theme system failed to initialize:', error);
  }
  
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
  
  // Set up theme controls
  setupThemeControls();
  
  // Show initial empty state (no automatic generation)
  const dishDisplay = new DishDisplay('dish-container');
  dishDisplay.renderDish(null); // Shows the "Click to generate" message
  
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