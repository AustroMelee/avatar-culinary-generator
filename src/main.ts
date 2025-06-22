// src/main.ts

import { UIManager } from './uiManager';
import { ThemeManager } from './themeManager';

/**
 * App Initializer
 * This function runs when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the Theme Manager FIRST to set the default theme
  ThemeManager.initialize();

  // Initialize the UI Manager, which handles all user interactions and rendering
  UIManager.initialize();

  // Manually trigger a UI update to sync the theme icon on initial load
  UIManager.updateThemeUI();

  console.log("Avatar Culinary Dish Generator Initialized!");
});