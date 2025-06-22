// src/themeManager.ts

import { Nation } from './types';

// Defines the color palettes for each nation theme
const themes = {
  'air-nomads': {
    light: {
      '--theme-primary': '#D97706', // Deep Orange
      '--theme-secondary': '#FBBF24', // Amber
      '--theme-accent': '#38BDF8', // Sky Blue
      '--theme-gradient-background': 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', // Pale Yellow -> Yellow
      '--theme-text-primary': '#422006', // Dark Brown
      '--theme-text-secondary': '#78350F', // Muted Brown
      '--theme-bg-card': 'rgba(255, 251, 235, 0.9)', // Off-white with yellow tint
      '--theme-border-primary': 'rgba(217, 119, 6, 0.2)', // Faint orange
      '--dropdown-arrow-color': '#D97706',
      // Additional properties for compatibility
      '--theme-bg-primary': 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
      '--theme-bg-secondary': '#FEF3C7',
      '--theme-bg-overlay': 'rgba(255, 251, 235, 0.95)',
      '--theme-text-accent': '#38BDF8',
      '--theme-border-secondary': '#FDE68A',
      '--theme-shadow-light': '0 2px 8px rgba(217, 119, 6, 0.1)',
      '--theme-shadow-medium': '0 4px 15px rgba(217, 119, 6, 0.2)',
      '--theme-shadow-heavy': '0 8px 32px rgba(217, 119, 6, 0.3)',
      '--theme-gradient-card': 'linear-gradient(145deg, #FEF3C7 0%, #FDE68A 100%)',
      '--theme-gradient-button': 'linear-gradient(45deg, #D97706, #B45309)',
    },
    dark: {
      '--theme-primary': '#FBBF24', // Amber
      '--theme-secondary': '#F87171', // Reddish accent
      '--theme-accent': '#67E8F9', // Bright Sky Blue
      '--theme-gradient-background': 'linear-gradient(135deg, #4A2B0F 0%, #2A1C0A 100%)', // Dark Brown -> Black-Brown
      '--theme-text-primary': '#FEF3C7', // Pale Yellow
      '--theme-text-secondary': '#FDE68A', // Muted Yellow
      '--theme-bg-card': 'rgba(42, 28, 10, 0.9)', // Dark brown card
      '--theme-border-primary': 'rgba(251, 191, 36, 0.3)', // Faint amber
      '--dropdown-arrow-color': '#FBBF24',
      // Additional properties for compatibility
      '--theme-bg-primary': 'linear-gradient(135deg, #4A2B0F 0%, #2A1C0A 100%)',
      '--theme-bg-secondary': '#2A1C0A',
      '--theme-bg-overlay': 'rgba(42, 28, 10, 0.95)',
      '--theme-text-accent': '#67E8F9',
      '--theme-border-secondary': '#4A2B0F',
      '--theme-shadow-light': '0 2px 8px rgba(251, 191, 36, 0.1)',
      '--theme-shadow-medium': '0 4px 15px rgba(251, 191, 36, 0.2)',
      '--theme-shadow-heavy': '0 8px 32px rgba(251, 191, 36, 0.3)',
      '--theme-gradient-card': 'linear-gradient(145deg, #2A1C0A 0%, #4A2B0F 100%)',
      '--theme-gradient-button': 'linear-gradient(45deg, #FBBF24, #F59E0B)',
      '--gradient-color-1': '#4A2B0F',
      '--gradient-color-2': '#2A1C0A',
    }
  },
  'water-tribe': {
    light: {
      '--theme-primary': '#0E7490', // Deep Cyan
      '--theme-secondary': '#67E8F9', // Bright Cyan
      '--theme-accent': '#F0F9FF', // Off-white (like snow)
      '--theme-gradient-background': 'linear-gradient(135deg, #E0F2FE 0%, #A5F3FC 100%)', // Pale Blue -> Pale Cyan
      '--theme-text-primary': '#164E63', // Very Dark Blue
      '--theme-text-secondary': '#0891B2', // Muted Cyan
      '--theme-bg-card': 'rgba(240, 249, 255, 0.9)', // Off-white with blue tint
      '--theme-border-primary': 'rgba(14, 116, 144, 0.2)',
      '--dropdown-arrow-color': '#0E7490',
      // Additional properties for compatibility
      '--theme-bg-primary': 'linear-gradient(135deg, #E0F2FE 0%, #A5F3FC 100%)',
      '--theme-bg-secondary': '#E0F2FE',
      '--theme-bg-overlay': 'rgba(240, 249, 255, 0.95)',
      '--theme-text-accent': '#F0F9FF',
      '--theme-border-secondary': '#A5F3FC',
      '--theme-shadow-light': '0 2px 8px rgba(14, 116, 144, 0.1)',
      '--theme-shadow-medium': '0 4px 15px rgba(14, 116, 144, 0.2)',
      '--theme-shadow-heavy': '0 8px 32px rgba(14, 116, 144, 0.3)',
      '--theme-gradient-card': 'linear-gradient(145deg, #E0F2FE 0%, #A5F3FC 100%)',
      '--theme-gradient-button': 'linear-gradient(45deg, #0E7490, #0C4A6E)',
    },
    dark: {
      '--theme-primary': '#67E8F9', // Bright Cyan
      '--theme-secondary': '#A5F3FC', // Lighter Cyan
      '--theme-accent': '#F0F9FF', // Off-white
      '--theme-gradient-background': 'linear-gradient(135deg, #1F2937 0%, #082F49 100%)', // Dark Gray-Blue -> Deep Blue
      '--theme-text-primary': '#F0F9FF', // Off-white
      '--theme-text-secondary': '#A5F3FC', // Pale Cyan
      '--theme-bg-card': 'rgba(15, 23, 42, 0.9)', // Very dark blue card
      '--theme-border-primary': 'rgba(103, 232, 249, 0.3)',
      '--dropdown-arrow-color': '#67E8F9',
      // Additional properties for compatibility
      '--theme-bg-primary': 'linear-gradient(135deg, #1F2937 0%, #082F49 100%)',
      '--theme-bg-secondary': '#082F49',
      '--theme-bg-overlay': 'rgba(15, 23, 42, 0.95)',
      '--theme-text-accent': '#F0F9FF',
      '--theme-border-secondary': '#1F2937',
      '--theme-shadow-light': '0 2px 8px rgba(103, 232, 249, 0.1)',
      '--theme-shadow-medium': '0 4px 15px rgba(103, 232, 249, 0.2)',
      '--theme-shadow-heavy': '0 8px 32px rgba(103, 232, 249, 0.3)',
      '--theme-gradient-card': 'linear-gradient(145deg, #082F49 0%, #1F2937 100%)',
      '--theme-gradient-button': 'linear-gradient(45deg, #67E8F9, #06B6D4)',
      '--gradient-color-1': '#1F2937',
      '--gradient-color-2': '#082F49',
    },
  },
  'earth-kingdom': {
    light: {
        '--theme-primary': '#16A34A', // Strong Green
        '--theme-secondary': '#FACC15', // Gold
        '--theme-accent': '#A16207', // Dark Gold
        '--theme-gradient-background': 'linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%)', // Pale Green
        '--theme-text-primary': '#14532D', // Very Dark Green
        '--theme-text-secondary': '#15803D', // Muted Green
        '--theme-bg-card': 'rgba(240, 253, 244, 0.9)', // Off-white with green tint
        '--theme-border-primary': 'rgba(22, 163, 74, 0.2)',
        '--dropdown-arrow-color': '#16A34A',
        // Additional properties for compatibility
        '--theme-bg-primary': 'linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%)',
        '--theme-bg-secondary': '#F0FDF4',
        '--theme-bg-overlay': 'rgba(240, 253, 244, 0.95)',
        '--theme-text-accent': '#A16207',
        '--theme-border-secondary': '#D1FAE5',
        '--theme-shadow-light': '0 2px 8px rgba(22, 163, 74, 0.1)',
        '--theme-shadow-medium': '0 4px 15px rgba(22, 163, 74, 0.2)',
        '--theme-shadow-heavy': '0 8px 32px rgba(22, 163, 74, 0.3)',
        '--theme-gradient-card': 'linear-gradient(145deg, #F0FDF4 0%, #D1FAE5 100%)',
        '--theme-gradient-button': 'linear-gradient(45deg, #16A34A, #15803D)',
      },
      dark: {
        '--theme-primary': '#4ADE80', // Bright Green
        '--theme-secondary': '#FDE047', // Bright Gold
        '--theme-accent': '#FEF08A', // Pale Gold
        '--theme-gradient-background': 'linear-gradient(135deg, #1C1917 0%, #172513 100%)', // Dark Brown-Gray -> Dark Green
        '--theme-text-primary': '#D1FAE5', // Pale Green
        '--theme-text-secondary': '#A7F3D0', // Lighter Green
        '--theme-bg-card': 'rgba(23, 37, 19, 0.9)', // Very dark green card
        '--theme-border-primary': 'rgba(74, 222, 128, 0.3)',
        '--dropdown-arrow-color': '#4ADE80',
        // Additional properties for compatibility
        '--theme-bg-primary': 'linear-gradient(135deg, #1C1917 0%, #172513 100%)',
        '--theme-bg-secondary': '#172513',
        '--theme-bg-overlay': 'rgba(23, 37, 19, 0.95)',
        '--theme-text-accent': '#FEF08A',
        '--theme-border-secondary': '#1C1917',
        '--theme-shadow-light': '0 2px 8px rgba(74, 222, 128, 0.1)',
        '--theme-shadow-medium': '0 4px 15px rgba(74, 222, 128, 0.2)',
        '--theme-shadow-heavy': '0 8px 32px rgba(74, 222, 128, 0.3)',
        '--theme-gradient-card': 'linear-gradient(145deg, #172513 0%, #1C1917 100%)',
        '--theme-gradient-button': 'linear-gradient(45deg, #4ADE80, #22C55E)',
        '--gradient-color-1': '#1C1917',
        '--gradient-color-2': '#172513',
      },
  },
  'fire-nation': {
    light: {
        '--theme-primary': '#DC2626', // Strong Red
        '--theme-secondary': '#F97316', // Orange
        '--theme-accent': '#44403C', // Dark Gray (Volcanic Rock)
        '--theme-gradient-background': 'linear-gradient(135deg, #FEF2F2 0%, #FDBA74 100%)', // Pale Red -> Pale Orange
        '--theme-text-primary': '#450A0A', // Very Dark Red
        '--theme-text-secondary': '#991B1B', // Muted Red
        '--theme-bg-card': 'rgba(254, 242, 242, 0.9)', // Off-white with red tint
        '--theme-border-primary': 'rgba(220, 38, 38, 0.2)',
        '--dropdown-arrow-color': '#DC2626',
        // Additional properties for compatibility
        '--theme-bg-primary': 'linear-gradient(135deg, #FEF2F2 0%, #FDBA74 100%)',
        '--theme-bg-secondary': '#FEF2F2',
        '--theme-bg-overlay': 'rgba(254, 242, 242, 0.95)',
        '--theme-text-accent': '#44403C',
        '--theme-border-secondary': '#FDBA74',
        '--theme-shadow-light': '0 2px 8px rgba(220, 38, 38, 0.1)',
        '--theme-shadow-medium': '0 4px 15px rgba(220, 38, 38, 0.2)',
        '--theme-shadow-heavy': '0 8px 32px rgba(220, 38, 38, 0.3)',
        '--theme-gradient-card': 'linear-gradient(145deg, #FEF2F2 0%, #FDBA74 100%)',
        '--theme-gradient-button': 'linear-gradient(45deg, #DC2626, #B91C1C)',
      },
      dark: {
        '--theme-primary': '#F87171', // Bright Red
        '--theme-secondary': '#FB923C', // Bright Orange
        '--theme-accent': '#FCD34D', // Gold
        '--theme-gradient-background': 'linear-gradient(135deg, #171717 0%, #440a0a 100%)', // Black -> Dark Red
        '--theme-text-primary': '#FEE2E2', // Pale Red
        '--theme-text-secondary': '#FECACA', // Lighter Red
        '--theme-bg-card': 'rgba(30, 7, 7, 0.9)', // Very dark red card
        '--theme-border-primary': 'rgba(248, 113, 113, 0.3)',
        '--dropdown-arrow-color': '#F87171',
        // Additional properties for compatibility
        '--theme-bg-primary': 'linear-gradient(135deg, #171717 0%, #440a0a 100%)',
        '--theme-bg-secondary': '#440a0a',
        '--theme-bg-overlay': 'rgba(30, 7, 7, 0.95)',
        '--theme-text-accent': '#FCD34D',
        '--theme-border-secondary': '#171717',
        '--theme-shadow-light': '0 2px 8px rgba(248, 113, 113, 0.1)',
        '--theme-shadow-medium': '0 4px 15px rgba(248, 113, 113, 0.2)',
        '--theme-shadow-heavy': '0 8px 32px rgba(248, 113, 113, 0.3)',
        '--theme-gradient-card': 'linear-gradient(145deg, #440a0a 0%, #171717 100%)',
        '--theme-gradient-button': 'linear-gradient(45deg, #F87171, #EF4444)',
        '--gradient-color-1': '#171717',
        '--gradient-color-2': '#440a0a',
      },
  },
};

export class ThemeManager {
  private static currentNations: Nation[] = ['air-nomads'];
  private static currentMode: 'light' | 'dark' = 'light';

  /**
   * Initializes the manager, sets default themes, and detects user's system preference.
   */
  public static initialize(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.currentMode = prefersDark ? 'dark' : 'light';
    this.setNations(this.currentNations);
  }
  
  /**
   * Sets the nation theme(s) and reapplies the current light/dark mode.
   */
  public static setNations(nations: Nation[]): void {
    if (nations.length === 0) {
      // Default to air nomads if no nations are selected
      this.currentNations = ['air-nomads'];
    } else {
      this.currentNations = nations;
    }
    const theme = this.generateDynamicTheme(this.currentNations, this.currentMode);
    this.applyTheme(theme);
  }

  /**
   * Toggles between light and dark mode and reapplies.
   */
  public static toggleLightDark(): void {
    this.currentMode = this.currentMode === 'light' ? 'dark' : 'light';
    this.setNations(this.currentNations); // Re-apply theme with new mode
  }

  /**
   * Applies a given theme object to the document.
   * @param theme - A dictionary of CSS variable keys and their values.
   */
  private static applyTheme(theme: Record<string, string>): void {
    const root = document.documentElement;
    const body = document.body;

    for (const [key, value] of Object.entries(theme)) {
      root.style.setProperty(key, value);
    }
    
    body.className = ''; 
    this.currentNations.forEach(nation => {
      body.classList.add(`theme-${nation}`);
    });

    body.dataset.theme = this.currentMode;
  }

  /**
   * Generates a theme, blending colors if multiple nations are selected.
   */
  private static generateDynamicTheme(nations: Nation[], mode: 'light' | 'dark'): Record<string, string> {
    if (nations.length <= 1) {
      const nation = nations[0] || 'air-nomads';
      return themes[nation][mode];
    }

    // --- Comprehensive Blending Logic ---
    const blendedTheme = { ...themes[nations[0]][mode] };
    
    // 1. Generate blended gradients for different UI components
    const bgGradientColors = mode === 'dark' 
      ? nations.map(n => themes[n][mode]['--gradient-color-1'])
      : nations.map(n => themes[n][mode]['--theme-primary']);

    const buttonGradientColors = nations.map(n => themes[n][mode]['--theme-primary']);
    
    const cardGradientColors = mode === 'dark'
      ? nations.map(n => themes[n][mode]['--gradient-color-2'])
      : nations.map(n => themes[n][mode]['--theme-secondary']);

    blendedTheme['--theme-gradient-background'] = `linear-gradient(135deg, ${bgGradientColors.join(', ')})`;
    blendedTheme['--theme-gradient-button'] = `linear-gradient(45deg, ${buttonGradientColors.join(', ')})`;
    // Apply a subtle, blended gradient to cards and dropdowns
    blendedTheme['--theme-bg-card'] = `linear-gradient(145deg, ${cardGradientColors.join(', ')})`;
    blendedTheme['--theme-bg-secondary'] = `linear-gradient(145deg, ${cardGradientColors.join(', ')})`;

    // 2. Standardize text colors for readability
    if (mode === 'dark') {
      blendedTheme['--theme-text-primary'] = '#F0F9FF';
      blendedTheme['--theme-text-secondary'] = '#A5F3FC';
    } else {
      blendedTheme['--theme-text-primary'] = '#164E63';
      blendedTheme['--theme-text-secondary'] = '#0891B2';
    }
    
    // 3. Set primary, secondary, and accent colors from the first 3 nations
    const primaryColors = nations.map(n => themes[n][mode]['--theme-primary']);
    blendedTheme['--theme-primary'] = primaryColors[0];
    blendedTheme['--theme-secondary'] = primaryColors[1] || primaryColors[0];
    blendedTheme['--theme-accent'] = primaryColors[2] || primaryColors[1] || primaryColors[0];
    blendedTheme['--dropdown-arrow-color'] = primaryColors[0];

    return blendedTheme;
  }
}