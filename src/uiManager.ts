import { DishGenerator } from './dishGenerator';
import { ThemeManager } from './themeManager';
import { Dish, Nation, DishType, Ingredient } from './types';

export class UIManager {
  // --- Element References ---
  private static generateButton: HTMLButtonElement;
  private static dishContainer: HTMLDivElement;
  private static nationSelector: HTMLDivElement;
  private static dishTypeSelector: HTMLDivElement;
  private static decorativeSymbols: NodeListOf<HTMLImageElement>;
  private static themeToggleButton: HTMLButtonElement;

  // --- State ---
  private static selectedNation: Nation = 'air-nomads';
  private static selectedDishType: DishType = 'main-course';

  /**
   * Initializes the UI Manager by querying elements and attaching listeners.
   */
  public static initialize(): void {
    // Query all necessary DOM elements
    this.generateButton = document.getElementById('generate-button') as HTMLButtonElement;
    this.dishContainer = document.getElementById('dish-container') as HTMLDivElement;
    this.nationSelector = document.getElementById('nation-selector') as HTMLDivElement;
    this.dishTypeSelector = document.getElementById('dish-type-selector') as HTMLDivElement;
    this.decorativeSymbols = document.querySelectorAll('.decorative-symbol');
    this.themeToggleButton = document.getElementById('theme-toggle') as HTMLButtonElement;
    
    if (!this.generateButton || !this.dishContainer || !this.nationSelector || !this.dishTypeSelector || !this.themeToggleButton) {
        console.error("A critical UI element could not be found. Aborting initialization.");
        return;
    }

    this.attachEventListeners();
    this.setupCustomSelect(this.nationSelector, this.handleNationChange.bind(this));
    this.setupCustomSelect(this.dishTypeSelector, this.handleDishTypeChange.bind(this));
    
    this.updateThemeUI(); 
  }

  /**
   * Attaches all primary event listeners for the application.
   */
  private static attachEventListeners(): void {
    this.generateButton.addEventListener('click', this.handleGenerateClick.bind(this));
    
    // The toggle button now correctly calls the ThemeManager
    this.themeToggleButton.addEventListener('click', () => {
        ThemeManager.toggleLightDark();
        this.updateThemeUI();
    });

    // Add ONE global click listener to close all dropdowns when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-nation-selector, .custom-dish-type-selector').forEach(el => {
            el.querySelector('.selected-option')?.classList.remove('open');
            el.querySelector('.dropdown-options')?.classList.remove('show');
        });
    });
  }

  // NEW function to sync the UI icon with the current theme
  private static updateThemeUI(): void {
    const isDark = document.body.dataset.theme === 'dark';
    this.themeToggleButton.textContent = isDark ? '☀️' : '🌙';
  }

  /**
   * Handles the logic for the "Generate" button click.
   */
  private static handleGenerateClick(): void {
    this.dishContainer.innerHTML = `<div class="dish-display generating">The spirits are cooking... Please wait.</div>`;
    this.generateButton.disabled = true;

    // Simulate a brief delay for a better user experience, mimics processing time
    setTimeout(() => {
        try {
            const generator = new DishGenerator(this.selectedNation);
            const dish = generator.generateDish(this.selectedDishType);
            this.renderDish(dish);
        } catch (error) {
            console.error("Failed to generate dish:", error);
            this.renderError(error as Error);
        } finally {
            this.generateButton.disabled = false;
        }
    }, 500);
  }
  
  /**
   * Handles changes from the Nation selector dropdown.
   */
  private static handleNationChange(value: string): void {
      this.selectedNation = value as Nation;
      // Tell ThemeManager to handle the change
      ThemeManager.setNation(this.selectedNation); 
      this.updateDecorativeSymbols();
      console.log(`Nation changed to: ${this.selectedNation}`);
  }

  /**
   * Handles changes from the Dish Type selector dropdown.
   */
  private static handleDishTypeChange(value: string): void {
      this.selectedDishType = value as DishType;
      console.log(`Dish type changed to: ${this.selectedDishType}`);
  }

  /**
   * Updates the decorative nation symbols on the page to match the current theme.
   */
  private static updateDecorativeSymbols(): void {
    const assetMap: Record<Nation, string> = {
      'air-nomads': 'air_nation-B2k_nS_3.png',
      'water-tribe': 'water_nation-B7rWlJEQ.png',
      'earth-kingdom': 'earth_nation-C3FaE_j9.png',
      'fire-nation': 'fire_nation-BClEM4ky.png'
    };
    const path = `/assets/${assetMap[this.selectedNation]}`;
    const altText = this.selectedNation.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    this.decorativeSymbols.forEach(img => {
        img.src = path;
        img.alt = altText;
    });
  }

  /**
   * Renders the generated dish data into the DOM.
   */
  private static renderDish(dish: Dish): void {
    const ingredientsHTML = dish.ingredients.map(ing => this.renderIngredient(ing)).join('');

    const dishHTML = `
      <div class="dish-display">
        <h2><span class="dish-emoji">${dish.emoji}</span> ${dish.name}</h2>
        <div class="dish-sections">
          <div class="description-section">
            <h3>Description</h3>
            <p class="description">${dish.description}</p>
          </div>
          <div class="lore-section">
            <h3>Lore</h3>
            <p class="lore">${dish.lore}</p>
          </div>
        </div>
        <div class="dish-details">
          <div class="ingredients">
            <h3>Ingredients</h3>
            <ul>
              ${ingredientsHTML}
            </ul>
          </div>
          <div class="technique">
            <h3>Cooking Style: ${dish.cookingStyle.name}</h3>
            <p>${dish.cookingStyle.description}</p>
          </div>
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
      return `
          <li class="ingredient-item ${rarityClass}">
              <span class="ingredient-emoji">${ingredient.emoji}</span>
              <span class="ingredient-name">${ingredient.name}</span>
              <span class="ingredient-rarity">${ingredient.rarity.toUpperCase()}</span>
          </li>
      `;
  }
  
  /**
   * Renders an error message in the dish container.
   */
  private static renderError(error: Error): void {
    const errorHTML = `
        <div class="error-message">
            <h3>A Storm in the Kitchen!</h3>
            <p>It seems the generator encountered an issue. The spirits might be a bit unbalanced today.</p>
            <small>Error: ${error.message}</small>
            <button class="retry-button" onclick="document.getElementById('generate-button').click()">Try Again</button>
        </div>
    `;
    this.dishContainer.innerHTML = errorHTML;
  }

  // --- REWRITTEN AND SIMPLIFIED DROPDOWN LOGIC ---
  private static setupCustomSelect(container: HTMLDivElement, onChange: (value: string) => void): void {
    const selectedOption = container.querySelector('.selected-option') as HTMLDivElement;
    const dropdownOptions = container.querySelector('.dropdown-options') as HTMLDivElement;
    const selectedContent = selectedOption.querySelector('.selected-option-content') as HTMLDivElement;
    const options = Array.from(dropdownOptions.querySelectorAll('.option')) as HTMLDivElement[];

    if (!selectedOption || !dropdownOptions || !selectedContent) return;

    // Handles OPENING the dropdown
    selectedOption.addEventListener('click', (e) => {
        e.stopPropagation(); // Stop this click from reaching the document and closing the dropdown immediately
        const isOpen = dropdownOptions.classList.contains('show');
        
        // First, close all other dropdowns
        document.querySelectorAll('.dropdown-options.show').forEach(el => {
            if (el !== dropdownOptions) {
                el.classList.remove('show');
                el.previousElementSibling?.classList.remove('open');
            }
        });

        // Then, toggle the current one
        selectedOption.classList.toggle('open');
        dropdownOptions.classList.toggle('show');
    });

    // Handles SELECTING an option
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation(); // Crucial: Stop the click from bubbling up further
            const newValue = option.dataset.value!;

            // Update display and state only if the value has changed
            if (container.dataset.value !== newValue) {
                selectedContent.innerHTML = option.innerHTML;
                container.dataset.value = newValue;
                onChange(newValue);
            }

            // Close the dropdown
            selectedOption.classList.remove('open');
            dropdownOptions.classList.remove('show');
        });
    });
  }
}