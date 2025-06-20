/**
 * Theme Management System for Avatar Nations
 * Redesigned with canonical Avatar colors and optimal contrast ratios
 */

export type NationType = 'air-nomads' | 'water-tribe' | 'earth-kingdom' | 'fire-nation';
export type ThemeVariant = 'light' | 'dark';

export interface NationTheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: {
    primary: string;
    secondary: string;
    card: string;
    overlay: string;
  };
  text: {
    primary: string;
    secondary: string;
    accent: string;
  };
  borders: {
    primary: string;
    secondary: string;
  };
  shadows: {
    light: string;
    medium: string;
    heavy: string;
  };
  gradients: {
    background: string;
    card: string;
    button: string;
  };
  rarity: {
    uncommon: {
      color: string;
      background: string;
      border: string;
    };
    rare: {
      background: string;
      border: string;
    };
    legendary: {
      background: string;
      border: string;
      glow: string;
    };
  };
}

/**
 * Air Nomad Theme Configuration
 * Canonical orange/yellow with spiritual saffron tones (like monk robes)
 * High contrast ratios for optimal readability
 */
const AIR_NOMAD_THEMES: Record<ThemeVariant, NationTheme> = {
  light: {
    name: 'Air Nomads Light',
    primary: '#FF9500', // Canonical Air Nomad orange
    secondary: '#FFB84D', // Lighter orange
    accent: '#FFC107', // Golden yellow accent
    background: {
      primary: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B3 100%)', // Soft cream gradient
      secondary: '#FFFDF7', // Almost white with warm tint
      card: 'rgba(255, 255, 255, 0.95)', // Clean white cards
      overlay: 'rgba(255, 249, 240, 0.98)' // Warm white overlay
    },
    text: {
      primary: '#2E1500', // Dark brown for maximum contrast
      secondary: '#5D2F00', // Medium brown
      accent: '#E6850E' // Darker orange for text
    },
    borders: {
      primary: '#FFD699', // Light orange border
      secondary: '#F0F0F0' // Neutral light border
    },
    shadows: {
      light: '0 2px 8px rgba(255, 149, 0, 0.15)',
      medium: '0 4px 15px rgba(255, 149, 0, 0.25)',
      heavy: '0 8px 32px rgba(255, 149, 0, 0.35)'
    },
    gradients: {
      background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B3 100%)',
      card: 'linear-gradient(145deg, #FFFFFF 0%, #FFF8F0 100%)',
      button: 'linear-gradient(45deg, #FF9500, #E6850E)'
    },
    rarity: {
      uncommon: {
        color: '#2E7D32', // Forest green - high contrast on light backgrounds
        background: 'rgba(46, 125, 50, 0.15)',
        border: 'rgba(46, 125, 50, 0.4)'
      },
      rare: {
        background: 'rgba(255, 149, 0, 0.15)', // Orange background matching theme
        border: 'rgba(255, 149, 0, 0.4)'
      },
      legendary: {
        background: 'rgba(255, 193, 7, 0.15)', // Golden background
        border: 'rgba(255, 193, 7, 0.4)',
        glow: 'rgba(255, 193, 7, 0.3)'
      }
    }
  },
  dark: {
    name: 'Air Nomads Dark',
    primary: '#FFB74D', // Bright orange for dark theme
    secondary: '#FFCC80', // Lighter orange
    accent: '#FFD54F', // Golden yellow
    background: {
      primary: 'linear-gradient(135deg, #1A0F00 0%, #2D1A00 50%, #1A0F00 100%)', // Deep brown gradient
      secondary: '#2D1A00', // Dark brown
      card: 'rgba(45, 26, 0, 0.9)', // Semi-transparent dark brown
      overlay: 'rgba(61, 35, 0, 0.95)' // Darker overlay
    },
    text: {
      primary: '#FFF8E1', // Cream white for high contrast
      secondary: '#FFECB3', // Light cream
      accent: '#FFB74D' // Orange accent text
    },
    borders: {
      primary: 'rgba(255, 183, 77, 0.3)', // Orange border with transparency
      secondary: 'rgba(255, 236, 179, 0.2)' // Light border
    },
    shadows: {
      light: '0 2px 8px rgba(0, 0, 0, 0.4)',
      medium: '0 4px 15px rgba(0, 0, 0, 0.5)',
      heavy: '0 8px 32px rgba(0, 0, 0, 0.6)'
    },
    gradients: {
      background: 'linear-gradient(135deg, #1A0F00 0%, #2D1A00 50%, #1A0F00 100%)',
      card: 'linear-gradient(145deg, rgba(45, 26, 0, 0.9) 0%, rgba(61, 35, 0, 0.8) 100%)',
      button: 'linear-gradient(45deg, #FFB74D, #FF9500)'
    },
    rarity: {
      uncommon: {
        color: '#4CAF50', // Bright green for dark theme contrast
        background: 'rgba(76, 175, 80, 0.2)',
        border: 'rgba(76, 175, 80, 0.5)'
      },
      rare: {
        background: 'rgba(255, 183, 77, 0.2)', // Orange background matching theme
        border: 'rgba(255, 183, 77, 0.5)'
      },
      legendary: {
        background: 'rgba(255, 213, 79, 0.2)', // Golden background
        border: 'rgba(255, 213, 79, 0.5)',
        glow: 'rgba(255, 213, 79, 0.4)'
      }
    }
  }
};

/**
 * Water Tribe Theme Configuration  
 * Deep ocean blues and pristine ice whites
 * Distinct from Air Nomads with cooler, deeper tones
 */
const WATER_TRIBE_THEMES: Record<ThemeVariant, NationTheme> = {
  light: {
    name: 'Water Tribe Light',
    primary: '#0288D1', // Deep ocean blue
    secondary: '#03A9F4', // Lighter ocean blue
    accent: '#00BCD4', // Cyan accent
    background: {
      primary: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', // Ice blue gradient
      secondary: '#FAFFFE', // Pure white with blue hint
      card: 'rgba(255, 255, 255, 0.95)', // Clean white cards
      overlay: 'rgba(227, 242, 253, 0.98)' // Ice blue overlay
    },
    text: {
      primary: '#01579B', // Deep blue for contrast
      secondary: '#0277BD', // Medium blue
      accent: '#0288D1' // Primary blue for accent text
    },
    borders: {
      primary: '#90CAF9', // Light blue border
      secondary: '#E0E0E0' // Neutral border
    },
    shadows: {
      light: '0 2px 8px rgba(2, 136, 209, 0.15)',
      medium: '0 4px 15px rgba(2, 136, 209, 0.25)',
      heavy: '0 8px 32px rgba(2, 136, 209, 0.35)'
    },
    gradients: {
      background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
      card: 'linear-gradient(145deg, #FFFFFF 0%, #F3F9FF 100%)',
      button: 'linear-gradient(45deg, #0288D1, #01579B)'
    },
    rarity: {
      uncommon: {
        color: '#2E7D32', // Forest green for contrast on light blue
        background: 'rgba(46, 125, 50, 0.15)',
        border: 'rgba(46, 125, 50, 0.4)'
      },
      rare: {
        background: 'rgba(2, 136, 209, 0.15)', // Blue background matching theme
        border: 'rgba(2, 136, 209, 0.4)'
      },
      legendary: {
        background: 'rgba(38, 198, 218, 0.15)', // Cyan background
        border: 'rgba(38, 198, 218, 0.4)',
        glow: 'rgba(38, 198, 218, 0.3)'
      }
    }
  },
  dark: {
    name: 'Water Tribe Dark',
    primary: '#29B6F6', // Bright blue for dark theme
    secondary: '#4FC3F7', // Lighter blue
    accent: '#26C6DA', // Cyan accent
    background: {
      primary: 'linear-gradient(135deg, #0D1B2A 0%, #1B263B 50%, #0D1B2A 100%)', // Deep ocean gradient
      secondary: '#1B263B', // Dark navy
      card: 'rgba(27, 38, 59, 0.9)', // Semi-transparent navy
      overlay: 'rgba(21, 32, 43, 0.95)' // Darker overlay
    },
    text: {
      primary: '#E1F5FE', // Ice white for high contrast
      secondary: '#B3E5FC', // Light blue
      accent: '#29B6F6' // Blue accent text
    },
    borders: {
      primary: 'rgba(41, 182, 246, 0.3)', // Blue border with transparency
      secondary: 'rgba(179, 229, 252, 0.2)' // Light border
    },
    shadows: {
      light: '0 2px 8px rgba(0, 0, 0, 0.4)',
      medium: '0 4px 15px rgba(0, 0, 0, 0.5)',
      heavy: '0 8px 32px rgba(0, 0, 0, 0.6)'
    },
    gradients: {
      background: 'linear-gradient(135deg, #0D1B2A 0%, #1B263B 50%, #0D1B2A 100%)',
      card: 'linear-gradient(145deg, rgba(27, 38, 59, 0.9) 0%, rgba(21, 32, 43, 0.8) 100%)',
      button: 'linear-gradient(45deg, #29B6F6, #0288D1)'
    },
    rarity: {
      uncommon: {
        color: '#4CAF50', // Bright green for dark theme contrast
        background: 'rgba(76, 175, 80, 0.2)',
        border: 'rgba(76, 175, 80, 0.5)'
      },
      rare: {
        background: 'rgba(41, 182, 246, 0.2)', // Blue background matching theme
        border: 'rgba(41, 182, 246, 0.5)'
      },
      legendary: {
        background: 'rgba(38, 198, 218, 0.2)', // Cyan background
        border: 'rgba(38, 198, 218, 0.5)',
        glow: 'rgba(38, 198, 218, 0.4)'
      }
    }
  }
};

/**
 * Earth Kingdom Theme Configuration
 * Rich emerald greens and earth browns with stone fortress aesthetics
 * Warm, grounded feeling with excellent contrast
 */
const EARTH_KINGDOM_THEMES: Record<ThemeVariant, NationTheme> = {
  light: {
    name: 'Earth Kingdom Light',
    primary: '#388E3C', // Forest green
    secondary: '#66BB6A', // Lighter green
    accent: '#8BC34A', // Fresh green accent
    background: {
      primary: 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 100%)', // Light green gradient
      secondary: '#FAFFFE', // Almost white with green hint
      card: 'rgba(255, 255, 255, 0.95)', // Clean white cards
      overlay: 'rgba(241, 248, 233, 0.98)' // Light green overlay
    },
    text: {
      primary: '#1B5E20', // Dark green for contrast
      secondary: '#2E7D32', // Medium green
      accent: '#388E3C' // Primary green for accent text
    },
    borders: {
      primary: '#A5D6A7', // Light green border
      secondary: '#E0E0E0' // Neutral border
    },
    shadows: {
      light: '0 2px 8px rgba(56, 142, 60, 0.15)',
      medium: '0 4px 15px rgba(56, 142, 60, 0.25)',
      heavy: '0 8px 32px rgba(56, 142, 60, 0.35)'
    },
    gradients: {
      background: 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 100%)',
      card: 'linear-gradient(145deg, #FFFFFF 0%, #F9FDF7 100%)',
      button: 'linear-gradient(45deg, #388E3C, #2E7D32)'
    },
    rarity: {
      uncommon: {
        color: '#2E7D32', // Forest green matching theme
        background: 'rgba(46, 125, 50, 0.15)',
        border: 'rgba(46, 125, 50, 0.4)'
      },
      rare: {
        background: 'rgba(56, 142, 60, 0.15)', // Green background matching theme
        border: 'rgba(56, 142, 60, 0.4)'
      },
      legendary: {
        background: 'rgba(139, 195, 74, 0.15)', // Fresh green background
        border: 'rgba(139, 195, 74, 0.4)',
        glow: 'rgba(139, 195, 74, 0.3)'
      }
    }
  },
  dark: {
    name: 'Earth Kingdom Dark',
    primary: '#66BB6A', // Bright green for dark theme
    secondary: '#81C784', // Lighter green
    accent: '#9CCC65', // Fresh green
    background: {
      primary: 'linear-gradient(135deg, #0F1B0C 0%, #1B2E15 50%, #0F1B0C 100%)', // Deep forest gradient
      secondary: '#1B2E15', // Dark forest green
      card: 'rgba(27, 46, 21, 0.9)', // Semi-transparent dark green
      overlay: 'rgba(24, 39, 18, 0.95)' // Darker overlay
    },
    text: {
      primary: '#E8F5E8', // Light green white for contrast
      secondary: '#C8E6C9', // Light green
      accent: '#66BB6A' // Green accent text
    },
    borders: {
      primary: 'rgba(102, 187, 106, 0.3)', // Green border with transparency
      secondary: 'rgba(200, 230, 201, 0.2)' // Light border
    },
    shadows: {
      light: '0 2px 8px rgba(0, 0, 0, 0.4)',
      medium: '0 4px 15px rgba(0, 0, 0, 0.5)',
      heavy: '0 8px 32px rgba(0, 0, 0, 0.6)'
    },
    gradients: {
      background: 'linear-gradient(135deg, #0F1B0C 0%, #1B2E15 50%, #0F1B0C 100%)',
      card: 'linear-gradient(145deg, rgba(27, 46, 21, 0.9) 0%, rgba(24, 39, 18, 0.8) 100%)',
      button: 'linear-gradient(45deg, #66BB6A, #388E3C)'
    },
    rarity: {
      uncommon: {
        color: '#4CAF50', // Bright green for dark theme contrast
        background: 'rgba(76, 175, 80, 0.2)',
        border: 'rgba(76, 175, 80, 0.5)'
      },
      rare: {
        background: 'rgba(102, 187, 106, 0.2)', // Green background matching theme
        border: 'rgba(102, 187, 106, 0.5)'
      },
      legendary: {
        background: 'rgba(156, 204, 101, 0.2)', // Fresh green background
        border: 'rgba(156, 204, 101, 0.5)',
        glow: 'rgba(156, 204, 101, 0.4)'
      }
    }
  }
};

/**
 * Fire Nation Theme Configuration
 * Intense reds and golds with volcanic palace aesthetics
 * High energy feel with careful contrast management
 */
const FIRE_NATION_THEMES: Record<ThemeVariant, NationTheme> = {
  light: {
    name: 'Fire Nation Light',
    primary: '#D32F2F', // Deep red
    secondary: '#F44336', // Brighter red
    accent: '#FF9800', // Orange/gold accent
    background: {
      primary: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', // Light red gradient
      secondary: '#FFFBFA', // Almost white with red hint
      card: 'rgba(255, 255, 255, 0.95)', // Clean white cards
      overlay: 'rgba(255, 235, 238, 0.98)' // Light red overlay
    },
    text: {
      primary: '#B71C1C', // Dark red for contrast
      secondary: '#C62828', // Medium red
      accent: '#D32F2F' // Primary red for accent text
    },
    borders: {
      primary: '#EF9A9A', // Light red border
      secondary: '#E0E0E0' // Neutral border
    },
    shadows: {
      light: '0 2px 8px rgba(211, 47, 47, 0.15)',
      medium: '0 4px 15px rgba(211, 47, 47, 0.25)',
      heavy: '0 8px 32px rgba(211, 47, 47, 0.35)'
    },
    gradients: {
      background: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)',
      card: 'linear-gradient(145deg, #FFFFFF 0%, #FFF8F7 100%)',
      button: 'linear-gradient(45deg, #D32F2F, #B71C1C)'
    },
    rarity: {
      uncommon: {
        color: '#2E7D32', // Forest green for contrast on red background
        background: 'rgba(46, 125, 50, 0.15)',
        border: 'rgba(46, 125, 50, 0.4)'
      },
      rare: {
        background: 'rgba(211, 47, 47, 0.15)', // Red background matching theme
        border: 'rgba(211, 47, 47, 0.4)'
      },
      legendary: {
        background: 'rgba(255, 152, 0, 0.15)', // Orange/gold background
        border: 'rgba(255, 152, 0, 0.4)',
        glow: 'rgba(255, 152, 0, 0.3)'
      }
    }
  },
  dark: {
    name: 'Fire Nation Dark',
    primary: '#EF5350', // Bright red for dark theme
    secondary: '#FF7043', // Orange-red
    accent: '#FFB74D', // Gold accent
    background: {
      primary: 'linear-gradient(135deg, #1A0606 0%, #2E0A0A 50%, #1A0606 100%)', // Deep crimson gradient
      secondary: '#2E0A0A', // Dark red
      card: 'rgba(46, 10, 10, 0.9)', // Semi-transparent dark red
      overlay: 'rgba(42, 12, 12, 0.95)' // Darker overlay
    },
    text: {
      primary: '#FFEBEE', // Light red white for contrast
      secondary: '#FFCDD2', // Light red
      accent: '#EF5350' // Red accent text
    },
    borders: {
      primary: 'rgba(239, 83, 80, 0.3)', // Red border with transparency
      secondary: 'rgba(255, 205, 210, 0.2)' // Light border
    },
    shadows: {
      light: '0 2px 8px rgba(0, 0, 0, 0.4)',
      medium: '0 4px 15px rgba(0, 0, 0, 0.5)',
      heavy: '0 8px 32px rgba(0, 0, 0, 0.6)'
    },
    gradients: {
      background: 'linear-gradient(135deg, #1A0606 0%, #2E0A0A 50%, #1A0606 100%)',
      card: 'linear-gradient(145deg, rgba(46, 10, 10, 0.9) 0%, rgba(42, 12, 12, 0.8) 100%)',
      button: 'linear-gradient(45deg, #EF5350, #D32F2F)'
    },
    rarity: {
      uncommon: {
        color: '#4CAF50', // Bright green for dark theme contrast
        background: 'rgba(76, 175, 80, 0.2)',
        border: 'rgba(76, 175, 80, 0.5)'
      },
      rare: {
        background: 'rgba(239, 83, 80, 0.2)', // Red background matching theme
        border: 'rgba(239, 83, 80, 0.5)'
      },
      legendary: {
        background: 'rgba(255, 183, 77, 0.2)', // Gold background
        border: 'rgba(255, 183, 77, 0.5)',
        glow: 'rgba(255, 183, 77, 0.4)'
      }
    }
  }
};

/**
 * Complete theme registry for all Avatar nations
 */
const NATION_THEMES: Record<NationType, Record<ThemeVariant, NationTheme>> = {
  'air-nomads': AIR_NOMAD_THEMES,
  'water-tribe': WATER_TRIBE_THEMES,
  'earth-kingdom': EARTH_KINGDOM_THEMES,
  'fire-nation': FIRE_NATION_THEMES
};

/**
 * Theme Manager Class
 * Handles theme application and persistence
 */
export class ThemeManager {
  private currentNation: NationType = 'air-nomads';
  private currentVariant: ThemeVariant = 'dark'; // Default to dark theme
  private appliedTheme: NationTheme | null = null;

  /**
   * Apply theme to the DOM
   */
  applyTheme(nation: NationType = this.currentNation, variant: ThemeVariant = this.currentVariant): void {
    const theme = NATION_THEMES[nation][variant];
    this.appliedTheme = theme;
    this.currentNation = nation;
    this.currentVariant = variant;

    // Apply CSS custom properties to document root
    const root = document.documentElement;
    
    // Color properties
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-secondary', theme.secondary);
    root.style.setProperty('--theme-accent', theme.accent);
    
    // Background properties
    root.style.setProperty('--theme-bg-primary', theme.background.primary);
    root.style.setProperty('--theme-bg-secondary', theme.background.secondary);
    root.style.setProperty('--theme-bg-card', theme.background.card);
    root.style.setProperty('--theme-bg-overlay', theme.background.overlay);
    
    // Text properties
    root.style.setProperty('--theme-text-primary', theme.text.primary);
    root.style.setProperty('--theme-text-secondary', theme.text.secondary);
    root.style.setProperty('--theme-text-accent', theme.text.accent);
    
    // Border properties
    root.style.setProperty('--theme-border-primary', theme.borders.primary);
    root.style.setProperty('--theme-border-secondary', theme.borders.secondary);
    
    // Shadow properties
    root.style.setProperty('--theme-shadow-light', theme.shadows.light);
    root.style.setProperty('--theme-shadow-medium', theme.shadows.medium);
    root.style.setProperty('--theme-shadow-heavy', theme.shadows.heavy);
    
    // Gradient properties
    root.style.setProperty('--theme-gradient-background', theme.gradients.background);
    root.style.setProperty('--theme-gradient-card', theme.gradients.card);
    root.style.setProperty('--theme-gradient-button', theme.gradients.button);

    // Rarity properties for ingredient badges
    root.style.setProperty('--rarity-uncommon-color', theme.rarity.uncommon.color);
    root.style.setProperty('--rarity-uncommon-bg', theme.rarity.uncommon.background);
    root.style.setProperty('--rarity-uncommon-border', theme.rarity.uncommon.border);
    root.style.setProperty('--rarity-rare-bg', theme.rarity.rare.background);
    root.style.setProperty('--rarity-rare-border', theme.rarity.rare.border);
    root.style.setProperty('--rarity-legendary-bg', theme.rarity.legendary.background);
    root.style.setProperty('--rarity-legendary-border', theme.rarity.legendary.border);
    root.style.setProperty('--rarity-legendary-glow', theme.rarity.legendary.glow);

    // Add nation and variant classes to body
    document.body.className = `theme-${nation} theme-${variant}`;
    
    // Store in localStorage for persistence
    localStorage.setItem('avatar-theme-nation', nation);
    localStorage.setItem('avatar-theme-variant', variant);
    
    console.log(`🎨 Applied ${theme.name} theme`);
  }

  /**
   * Switch between light and dark variants
   */
  toggleVariant(): void {
    const newVariant: ThemeVariant = this.currentVariant === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentNation, newVariant);
  }

  /**
   * Switch to a different nation theme
   */
  switchNation(nation: NationType): void {
    this.applyTheme(nation, this.currentVariant);
  }

  /**
   * Get current theme information
   */
  getCurrentTheme(): { nation: NationType; variant: ThemeVariant; theme: NationTheme | null } {
    return {
      nation: this.currentNation,
      variant: this.currentVariant,
      theme: this.appliedTheme
    };
  }

  /**
   * Load theme from localStorage or apply default
   */
  initializeFromStorage(): void {
    const savedNation = localStorage.getItem('avatar-theme-nation') as NationType || 'air-nomads';
    const savedVariant = localStorage.getItem('avatar-theme-variant') as ThemeVariant || 'dark';
    
    this.applyTheme(savedNation, savedVariant);
  }

  /**
   * Get all available nations
   */
  getAvailableNations(): NationType[] {
    return Object.keys(NATION_THEMES) as NationType[];
  }

  /**
   * Get theme for specific nation and variant
   */
  getTheme(nation: NationType, variant: ThemeVariant): NationTheme {
    return NATION_THEMES[nation][variant];
  }
}

// Export singleton instance
export const themeManager = new ThemeManager(); 