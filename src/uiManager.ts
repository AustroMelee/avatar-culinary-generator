import { DishGenerator } from './dishGenerator';
import { ThemeManager } from './themeManager';
import { Dish, Nation, DishType, Ingredient } from './types';
import { loadingQuotes } from './loadingQuotes';

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
// A pool of ingredient emojis for the loading animation
const loadingIngredientEmojis = ['🥕', '🍄', '🌿', '🌶️', '🥩', '🐟', '🥬', '🧅', '🥔', '🍚', '🍜', '🥟'];

export class UIManager {
  // --- Element References ---
  private static generateButton: HTMLButtonElement;
  private static nationChecklistContainer: HTMLDivElement;
  private static dishTypeSelector: HTMLDivElement;
  private static dishContainer: HTMLDivElement;
  private static themeToggleButton: HTMLButtonElement;
  private static loadingOverlay: HTMLDivElement;
  private static loadingQuoteElement: HTMLParagraphElement;
  private static fallingIngredientsContainer: HTMLDivElement;
  private static nationCheckboxes: NodeListOf<HTMLInputElement>;

  // --- State ---
  private static selectedNations: Nation[] = ['air-nomads'];
  private static selectedDishType: DishType = 'main-course';

  /**
   * Initializes the UI Manager by querying elements and attaching listeners.
   */
  public static initialize(): void {
    // Query all necessary DOM elements
    this.generateButton = document.getElementById('generate-button') as HTMLButtonElement;
    this.nationChecklistContainer = document.getElementById('nation-checklist-container') as HTMLDivElement;
    this.dishTypeSelector = document.getElementById('dish-type-selector') as HTMLDivElement;
    this.dishContainer = document.getElementById('dish-container') as HTMLDivElement;
    this.themeToggleButton = document.getElementById('theme-toggle') as HTMLButtonElement;
    this.loadingOverlay = document.getElementById('loading-overlay') as HTMLDivElement;
    this.loadingQuoteElement = document.getElementById('loading-quote') as HTMLParagraphElement;
    this.fallingIngredientsContainer = document.getElementById('falling-ingredients') as HTMLDivElement;
    this.nationCheckboxes = document.querySelectorAll('input[name="nation"]');
    
    if (!this.generateButton || !this.nationChecklistContainer || !this.dishTypeSelector || !this.dishContainer || !this.themeToggleButton || !this.loadingOverlay || !this.loadingQuoteElement || !this.fallingIngredientsContainer) {
        console.error("A critical UI element could not be found. Aborting initialization.");
        return;
    }

    this.attachEventListeners();
    this.setupNationChecklist();
    this.setupCustomSelect(this.dishTypeSelector, this.handleDishTypeChange.bind(this));
  }

  /**
   * Attaches all primary event listeners for the application.
   */
  private static attachEventListeners(): void {
    this.generateButton.addEventListener('click', () => this.handleGenerateClick());
    this.themeToggleButton.addEventListener('click', () => {
      ThemeManager.toggleLightDark();
      this.updateThemeUI();
    });
    // Only one global click handler for closing dropdowns
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const isDropdownClick = target.closest('.custom-dish-type-selector');
      if (!isDropdownClick) {
        document.querySelectorAll('.dropdown-options.show').forEach(el => {
          el.classList.remove('show');
          el.previousElementSibling?.classList.remove('open');
        });
      }
    });

    this.nationCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => this.handleNationChange());
    });
  }

  // NEW function to sync the UI icon with the current theme
  public static updateThemeUI(): void {
    const isDark = document.body.dataset.theme === 'dark';
    this.themeToggleButton.textContent = isDark ? '🌙' : '☀️';
  }

  /**
   * Handles the logic for the "Generate" button click.
   */
  private static handleGenerateClick(): void {
    this.generateButton.disabled = true;
    this.loadingOverlay.classList.add('show');

    // Clear any old ingredients
    this.fallingIngredientsContainer.innerHTML = '';

    // Create and animate the ingredients and quotes
    const animationDuration = 1800; // Total duration in ms
    const numIngredients = 5; // How many ingredients to drop
    const intervalTime = animationDuration / (numIngredients + 1);

    for (let i = 0; i < numIngredients; i++) {
        setTimeout(() => {
            this.dropIngredient();
            // Change quote halfway through
            if (i === Math.floor(numIngredients / 2)) {
                this.loadingQuoteElement.style.opacity = '0';
                setTimeout(() => {
                    this.loadingQuoteElement.textContent = pick(loadingQuotes.filter(q => q !== this.loadingQuoteElement.textContent));
                    this.loadingQuoteElement.style.opacity = '1';
                }, 150);
            }
        }, i * intervalTime);
    }

    // Generate the dish after the animation has run
    setTimeout(() => {
        try {
            const generator = new DishGenerator(this.selectedNations as any);
            const dish = generator.generateDish(this.selectedDishType as any);
            this.renderDish(dish); // This will now render an "invisible" card
            this.triggerAnimations(); // This new function will make it appear
        } catch (error) {
            console.error("Failed to generate dish:", error);
            this.renderError(error as Error);
        } finally {
            this.loadingOverlay.classList.remove('show');
            this.generateButton.disabled = false;
        }
    }, animationDuration);
  }

  // --- NEW HELPER FUNCTION to create a single falling ingredient ---
  private static dropIngredient(): void {
    const ingredient = document.createElement('span');
    ingredient.className = 'falling-ingredient';
    ingredient.textContent = pick(loadingIngredientEmojis);

    // Randomize horizontal position and rotation for variety
    const randomX = Math.random() * 80 + 10; // 10% to 90%
    const randomRotate = Math.random() * 90 - 45; // -45deg to 45deg
    ingredient.style.left = `${randomX}%`;
    ingredient.style.transform = `rotate(${randomRotate}deg)`;
    
    this.fallingIngredientsContainer.appendChild(ingredient);

    // Clean up the DOM element after its animation is finished
    setTimeout(() => {
        ingredient.remove();
    }, 1500); // Should match the animation duration in CSS
  }
  
  /**
   * Handles changes from the Dish Type selector dropdown.
   */
  private static handleDishTypeChange(value: string): void {
      this.selectedDishType = value as DishType;
      console.log(`Dish type changed to: ${this.selectedDishType}`);
  }

  private static handleNationChange(): void {
    this.selectedNations = Array.from(this.nationCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value as Nation);
    
    // Ensure at least one nation is always selected
    if (this.selectedNations.length === 0) {
      // If user unchecks the last box, re-check it
      const lastUnchecked = Array.from(this.nationCheckboxes).find(cb => !cb.checked);
      if(lastUnchecked) {
        lastUnchecked.checked = true;
        this.selectedNations.push(lastUnchecked.value as Nation);
      }
    }

    // Disable checkboxes if only one is selected to prevent zero selection
    this.nationCheckboxes.forEach(cb => { 
      cb.disabled = (this.selectedNations.length === 1 && cb.checked); 
    });

    // Update the theme based on all selected nations
    ThemeManager.setNations(this.selectedNations);
  }

  /**
   * Renders the generated dish data into the DOM.
   */
  private static renderDish(dish: Dish): void {
    const ingredientsHTML = dish.ingredients.map((ing, index) => `
      <li class="ingredient-item reveal" style="--delay: ${index * 100}ms;">
        <span class="ingredient-emoji">${ing.emoji}</span>
        <span class="ingredient-name">${ing.name}</span>
        <span class="ingredient-separator">•</span>
        <span class="rarity-pill rarity-${ing.rarity.toLowerCase()}">${ing.rarity}</span>
      </li>
    `).join('');

    const nationPillsHTML = dish.nations.map(nation => {
        const nationName = nation.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        return `<span class="nation-pill nation-pill--${nation}">${nationName}</span>`;
    }).join('');

    // --- REDESIGNED HTML STRUCTURE WITH ANIMATIONS ---
    const dishHTML = `
      <div class="dish-display parchment-layout">
        <div class="dish-header reveal" style="--delay: 0ms;">
          <span class="dish-emoji">${dish.emoji}</span>
          <div class="dish-title-container">
            <h2>${dish.name}</h2>
          </div>
        </div>
        <div class="nation-pills-container reveal" style="--delay: 50ms;">
          ${nationPillsHTML}
        </div>
        
        <div class="dish-main-content">
          <div class="content-section description-section callout-box reveal" style="--delay: 150ms;">
            <h3>Description</h3>
            <p>${dish.description}</p>
          </div>

          <div class="content-section ingredients-section reveal" style="--delay: 200ms;">
            <h3>Ingredients</h3>
            <ul>${ingredientsHTML}</ul>
          </div>

          <div class="content-section technique-section callout-box reveal" style="--delay: 250ms;">
            <h3>Technique</h3>
            <p><strong>${dish.cookingStyle.name}:</strong> ${dish.cookingStyle.description}</p>
          </div>

          <!-- CHEF'S NOTES / RATIONALE SECTION -->
          ${dish.rationale.length > 0 ? `
            <div class="content-section rationale-section reveal" style="--delay: 300ms;">
              <div class="rationale-inner">
                <h3>Chef's Notes</h3>
                <ul>
                  ${dish.rationale.map(note => {
                    const formattedNote = note
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>');
                    return `<li>${formattedNote}</li>`;
                  }).join('')}
                </ul>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
    this.dishContainer.innerHTML = dishHTML;
  }

  /**
   * Renders a single ingredient list item.
   */
  private static renderIngredient(ingredient: Ingredient): string {
      const rarityClass = `rarity-${ingredient.rarity.toLowerCase()}`;
      const rarityDot = `<span class="rarity-dot ${ingredient.rarity.toLowerCase()}">●</span>`;
      return `
          <div class="ingredient-item-grouped ${rarityClass}">
              <span class="ingredient-emoji">${ingredient.emoji}</span>
              <span class="ingredient-name">${ingredient.name}</span>
              <span class="ingredient-rarity">${rarityDot} ${ingredient.rarity}</span>
          </div>
      `;
  }
  
  /**
   * Renders an error message in the dish container.
   */
  private static renderError(error: Error): void {
    const errorHTML = `
        <div class="error-message">
            <h3>Oops! Something went wrong</h3>
            <p>${error.message}</p>
            <small>Try selecting different nations or dish types.</small>
            <button class="retry-button" onclick="location.reload()">Try Again</button>
        </div>
    `;
    this.dishContainer.innerHTML = errorHTML;
  }

  // --- BULLETPROOF DROPDOWN LOGIC ---
  private static setupCustomSelect(container: HTMLDivElement, onChange: (value: string) => void): void {
    const selectedOption = container.querySelector('.selected-option') as HTMLDivElement;
    const dropdownOptions = container.querySelector('.dropdown-options') as HTMLDivElement;
    const selectedContent = selectedOption.querySelector('.selected-option-content') as HTMLDivElement;
    const options = Array.from(dropdownOptions.querySelectorAll('.option')) as HTMLDivElement[];

    if (!selectedOption || !dropdownOptions || !selectedContent) return;

    // On init: set UI to match current value
    const initialValue = container.dataset.value;
    const initialOption = options.find(opt => opt.dataset.value === initialValue);
    if (initialOption) {
      selectedContent.innerHTML = initialOption.innerHTML;
    }

    // Open/close dropdown on click
    selectedOption.addEventListener('click', (e) => {
      // If the click originated from inside the dropdown options, do nothing
      if ((e.target as HTMLElement).closest('.dropdown-options')) return;
      e.stopPropagation();
      // Close all other dropdowns
      document.querySelectorAll('.dropdown-options.show').forEach(el => {
        if (el !== dropdownOptions) {
          el.classList.remove('show');
          el.previousElementSibling?.classList.remove('open');
        }
      });
      // If already open, close it; otherwise, open it
      const isOpen = selectedOption.classList.contains('open');
      if (isOpen) {
        selectedOption.classList.remove('open');
        dropdownOptions.classList.remove('show');
      } else {
        selectedOption.classList.add('open');
        dropdownOptions.classList.add('show');
      }
    });

    // Only update value/UI on option click (use pointerdown for maximum robustness)
    options.forEach(option => {
      option.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        const newValue = option.dataset.value!;
        if (container.dataset.value !== newValue) {
          selectedContent.innerHTML = option.innerHTML;
          container.dataset.value = newValue;
          onChange(newValue);
        }
        // Always close dropdown after selection
        selectedOption.classList.remove('open');
        dropdownOptions.classList.remove('show');
      });
    });

    // Prevent bubbling from dropdown content
    dropdownOptions.addEventListener('click', (e) => e.stopPropagation());
  }

  private static setupNationChecklist(): void {
    // Initial call to set the theme based on the default checked nation
    this.handleNationChange();
  }

  // NEW function to trigger the reveal animations after a short delay
  private static triggerAnimations(): void {
    const elementsToReveal = this.dishContainer.querySelectorAll<HTMLElement>('.reveal');
    
    // A small delay to ensure elements are in the DOM before animating
    setTimeout(() => {
        elementsToReveal.forEach(el => {
            el.classList.add('animate');
        });
    }, 100);
  }
}