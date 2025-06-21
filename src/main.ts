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
 * Set up custom nation selector functionality
 * Handles dropdown opening/closing and option selection
 */
function setupCustomNationSelector(): void {
  const selector = document.getElementById('nation-selector') as HTMLElement;
  const selectedOption = selector?.querySelector('.selected-option') as HTMLElement;
  const dropdownOptions = selector?.querySelector('.dropdown-options') as HTMLElement;
  const options = selector?.querySelectorAll('.option') as NodeListOf<HTMLElement>;
  
  if (!selector || !selectedOption || !dropdownOptions || !options) {
    console.warn('Custom nation selector elements not found in DOM');
    return;
  }

  // Set current nation as selected
  const currentTheme = themeManager.getCurrentTheme();
  updateSelectedOption(currentTheme.nation);
  
  // Toggle dropdown on click
  selectedOption.addEventListener('click', () => {
    const isOpen = selectedOption.classList.contains('open');
    
    if (isOpen) {
      selectedOption.classList.remove('open');
      dropdownOptions.classList.remove('show');
    } else {
      selectedOption.classList.add('open');
      dropdownOptions.classList.add('show');
    }
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (event) => {
    if (!selector.contains(event.target as Node)) {
      selectedOption.classList.remove('open');
      dropdownOptions.classList.remove('show');
    }
  });
  
  // Handle option selection
  options.forEach(option => {
    option.addEventListener('click', (event) => {
      event.stopPropagation();
      const selectedNation = option.getAttribute('data-value') as any;
      
      // Update UI
      updateSelectedOption(selectedNation);
      selectedOption.classList.remove('open');
      dropdownOptions.classList.remove('show');
      
      // Update theme
      themeManager.switchNation(selectedNation);
      console.log(`🎨 Switched to ${selectedNation} theme`);
      
      // Update generate button text
      updateGenerateButtonText(selectedNation);
    });
  });
  
  function updateSelectedOption(nation: string): void {
    // Update selected option display
    const option = selector.querySelector(`[data-value="${nation}"]`) as HTMLElement;
    if (option) {
      const icon = option.querySelector('.nation-icon') as HTMLImageElement;
      const text = option.querySelector('span') as HTMLSpanElement;
      
      if (icon && text) {
        const selectedContent = selectedOption.querySelector('.selected-option-content') as HTMLElement;
        const selectedIcon = selectedContent.querySelector('.nation-icon') as HTMLImageElement;
        const selectedText = selectedContent.querySelector('span') as HTMLSpanElement;
        
        selectedIcon.src = icon.src;
        selectedIcon.alt = icon.alt;
        selectedText.textContent = text.textContent;
        
        // Update data-value attribute
        selector.setAttribute('data-value', nation);
        
        // Update decorative symbols to match selected nation
        updateDecorativeSymbols(nation, icon.src, icon.alt);
      }
    }
    
    // Update selected state in options
    options.forEach(opt => opt.classList.remove('selected'));
    option?.classList.add('selected');
  }
  
  function updateDecorativeSymbols(nation: string, iconSrc: string, iconAlt: string): void {
    // Update left side symbols
    const leftSymbols = document.querySelectorAll('.nation-symbols-left .decorative-symbol') as NodeListOf<HTMLImageElement>;
    leftSymbols.forEach(symbol => {
      symbol.src = iconSrc;
      symbol.alt = iconAlt;
    });
    
    // Update right side symbols
    const rightSymbols = document.querySelectorAll('.nation-symbols-right .decorative-symbol') as NodeListOf<HTMLImageElement>;
    rightSymbols.forEach(symbol => {
      symbol.src = iconSrc;
      symbol.alt = iconAlt;
    });
  }
  
  function updateGenerateButtonText(nation: string): void {
    const generateButton = document.getElementById('generate-button') as HTMLButtonElement;
    if (generateButton && !generateButton.disabled) {
      generateButton.textContent = 'Generate';
    }
  }
}

/**
 * Set up custom dish type selector functionality
 */
function setupDishTypeSelector(): void {
  const selector = document.getElementById('dish-type-selector') as HTMLElement;
  const selectedOption = selector?.querySelector('.selected-option') as HTMLElement;
  const dropdownOptions = selector?.querySelector('.dropdown-options') as HTMLElement;
  const options = selector?.querySelectorAll('.option') as NodeListOf<HTMLElement>;

  if (!selector || !selectedOption || !dropdownOptions || !options) {
    console.warn('Custom dish type selector elements not found in DOM');
    return;
  }

  selectedOption.addEventListener('click', () => {
    const isOpen = selectedOption.classList.contains('open');
    if (isOpen) {
      selectedOption.classList.remove('open');
      dropdownOptions.classList.remove('show');
    } else {
      selectedOption.classList.add('open');
      dropdownOptions.classList.add('show');
    }
  });

  document.addEventListener('click', (event) => {
    if (!selector.contains(event.target as Node)) {
      selectedOption.classList.remove('open');
      dropdownOptions.classList.remove('show');
    }
  });

  options.forEach(option => {
    option.addEventListener('click', (event) => {
      event.stopPropagation();
      const selectedValue = option.getAttribute('data-value');
      
      const icon = option.querySelector('.dish-type-icon')?.textContent;
      const text = option.querySelector('span:last-child')?.textContent;

      if (icon && text && selectedValue) {
        const selectedContent = selectedOption.querySelector('.selected-option-content') as HTMLElement;
        selectedContent.querySelector('.dish-type-icon')!.textContent = icon;
        selectedContent.querySelector('span:last-child')!.textContent = text;
        selector.setAttribute('data-value', selectedValue);
      }

      options.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');

      selectedOption.classList.remove('open');
      dropdownOptions.classList.remove('show');
    });
  });
}

/**
 * Set up theme control event handlers
 * Enables theme switching and nation selection
 */
function setupThemeControls(): void {
  // Theme toggle button
  const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;
  if (themeToggle) {
    // Update button with just emoji based on current theme
    const currentTheme = themeManager.getCurrentTheme();
    themeToggle.textContent = currentTheme.variant === 'dark' ? '☀️' : '🌙';
    
    themeToggle.addEventListener('click', () => {
      themeManager.toggleVariant();
      const newTheme = themeManager.getCurrentTheme();
      themeToggle.textContent = newTheme.variant === 'dark' ? '☀️' : '🌙';
      console.log(`🎨 Switched to ${newTheme.theme?.name}`);
    });
  } else {
    console.warn('Theme toggle button not found in DOM');
  }
  
  // Custom nation selector
  setupCustomNationSelector();
  setupDishTypeSelector();
}

/**
 * Non-blocking dish generation with beautiful Air Nomad loading animation
 * Uses the SOVEREIGN ARCHITECTURE: Core Generator + Nation Config
 */
async function generateDishWithLoadingAnimation(): Promise<void> {
  const generateButton = document.getElementById('generate-button') as HTMLButtonElement;
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
    
    // Create dish display with emoji mappings
    const dishDisplay = new DishDisplay('dish-container', (airNomadConfig as any).ingredientEmojiMappings);
    
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
    generateButton.textContent = 'Generate';
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