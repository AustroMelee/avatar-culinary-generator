/**
 * LOADING ANIMATION SYSTEM
 * 
 * Provides engaging 5-second loading experience with:
 * - Large animated emojis (spinning, floating, bouncing)
 * - Fun captions about dish creation
 * - Fake progress bar with realistic timing
 * - Prevents spam clicking while entertaining users
 */

export type LoadingAnimationType = 'spin' | 'float' | 'bounce' | 'pulse' | 'shake';
export type LoadingPhase = 'gathering' | 'cooking' | 'seasoning' | 'plating' | 'blessing';

export interface LoadingState {
  phase: LoadingPhase;
  progress: number;
  emoji: string;
  caption: string;
  animation: LoadingAnimationType;
}

/**
 * Fun captions for each phase of dish creation
 * Creates narrative immersion during loading
 */
const LOADING_CAPTIONS: Record<LoadingPhase, string[]> = {
  gathering: [
    "🌿 Gathering sacred ingredients from the temple gardens...",
    "🍃 Selecting the finest Air Nomad herbs and fruits...",
    "🌸 Consulting the ancient ingredient scrolls...",
    "🌱 Choosing ingredients blessed by the spirits..."
  ],
  cooking: [
    "🔥 Channeling spiritual energy into cooking techniques...",
    "🍜 Applying centuries-old Air Nomad cooking wisdom...",
    "💨 Harnessing the power of airbending for perfect timing...",
    "⚡ Infusing the dish with meditative focus..."
  ],
  seasoning: [
    "🧂 Adding the perfect balance of spiritual seasonings...",
    "🌿 Harmonizing flavors with ancient spice blends...",
    "✨ Adjusting taste to achieve inner peace...",
    "🍯 Sweetening with temple monastery honey..."
  ],
  plating: [
    "🍽️ Arranging ingredients with artistic precision...",
    "🎨 Creating beautiful presentation worthy of the Avatar...",
    "🌟 Crafting a dish that pleases both eye and spirit...",
    "🏺 Plating with the grace of Air Nomad masters..."
  ],
  blessing: [
    "🙏 Receiving blessings from the Air Nomad spirits...",
    "🧘 Meditating on the dish's spiritual significance...",
    "🕯️ Consecrating the meal for spiritual nourishment...",
    "✨ Adding final touches of cosmic harmony..."
  ]
};

/**
 * Air Nomad themed loading emojis for each phase
 * Maintains cultural authenticity during loading
 */
const PHASE_EMOJIS: Record<LoadingPhase, string[]> = {
  gathering: ['🌿', '🍃', '🌱', '🌸', '🍎', '🥕'],
  cooking: ['🍜', '🔥', '💨', '⚡', '🥘', '🍲'],
  seasoning: ['🧂', '🌿', '✨', '🍯', '🌾', '🌰'],
  plating: ['🍽️', '🎨', '🌟', '🏺', '🍵', '🥗'],
  blessing: ['🙏', '🧘', '🕯️', '✨', '☯️', '🔮']
};

/**
 * Creates engaging loading animation with rotating phases
 * Each phase lasts 1 second for total 5-second experience
 */
export class LoadingAnimationController {
  private container: HTMLElement;
  private progressInterval: number | null = null;
  private phaseTimeout: number | null = null;
  private currentPhase: LoadingPhase = 'gathering';
  private currentProgress = 0;
  private onComplete?: () => void;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId) || document.body;
  }

  /**
   * Starts the 5-second loading animation sequence
   * Creates immersive Air Nomad dish preparation experience
   */
  async startLoadingAnimation(onComplete?: () => void): Promise<void> {
    this.onComplete = onComplete;
    this.currentProgress = 0;
    this.currentPhase = 'gathering';

    // Create loading UI
    this.createLoadingUI();

    // Start progress bar animation
    this.startProgressAnimation();

    // Cycle through phases every 1 second
    this.cyclePhases();

    // Auto-complete after 5 seconds
    setTimeout(() => {
      this.completeLoading();
    }, 5000);
  }

  /**
   * Creates beautiful loading UI with animated emoji and progress bar
   */
  private createLoadingUI(): void {
    const loadingHTML = `
      <div class="loading-overlay">
        <div class="loading-content">
          <div class="loading-emoji-container">
            <div class="loading-emoji" id="loading-emoji">🌿</div>
          </div>
          <div class="loading-caption" id="loading-caption">
            🌿 Gathering sacred ingredients from the temple gardens...
          </div>
          <div class="loading-progress-container">
            <div class="loading-progress-bar">
              <div class="loading-progress-fill" id="loading-progress-fill"></div>
            </div>
            <div class="loading-progress-text" id="loading-progress-text">0%</div>
          </div>
          <div class="loading-subtitle">
            Creating a completely unique Air Nomad dish! ✨
          </div>
        </div>
      </div>
    `;

    this.container.insertAdjacentHTML('beforeend', loadingHTML);
    this.addLoadingStyles();
  }

  /**
   * Cycles through cooking phases with appropriate emojis and captions
   */
  private cyclePhases(): void {
    const phases: LoadingPhase[] = ['gathering', 'cooking', 'seasoning', 'plating', 'blessing'];
    let phaseIndex = 0;

    const nextPhase = () => {
      if (phaseIndex < phases.length) {
        this.currentPhase = phases[phaseIndex];
        this.updatePhaseDisplay();
        phaseIndex++;
        
        this.phaseTimeout = window.setTimeout(nextPhase, 1000);
      }
    };

    nextPhase();
  }

  /**
   * Updates emoji and caption for current phase
   */
  private updatePhaseDisplay(): void {
    const emojiElement = document.getElementById('loading-emoji');
    const captionElement = document.getElementById('loading-caption');

    if (emojiElement && captionElement) {
      // Get random emoji for this phase
      const phaseEmojis = PHASE_EMOJIS[this.currentPhase];
      const randomEmoji = phaseEmojis[Math.floor(Math.random() * phaseEmojis.length)];

      // Get random caption for this phase
      const phaseCaptions = LOADING_CAPTIONS[this.currentPhase];
      const randomCaption = phaseCaptions[Math.floor(Math.random() * phaseCaptions.length)];

      // Update with smooth transition
      emojiElement.style.opacity = '0';
      captionElement.style.opacity = '0';

      setTimeout(() => {
        emojiElement.textContent = randomEmoji;
        captionElement.textContent = randomCaption;
        
        // Apply random animation
        const animations: LoadingAnimationType[] = ['spin', 'float', 'bounce', 'pulse'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        
        emojiElement.className = `loading-emoji loading-${randomAnimation}`;
        
        emojiElement.style.opacity = '1';
        captionElement.style.opacity = '1';
      }, 200);
    }
  }

  /**
   * Animates progress bar with realistic timing
   */
  private startProgressAnimation(): void {
    const progressFill = document.getElementById('loading-progress-fill') as HTMLElement;
    const progressText = document.getElementById('loading-progress-text') as HTMLElement;

    this.progressInterval = window.setInterval(() => {
      this.currentProgress += Math.random() * 4 + 1; // Random progress increments
      
      if (this.currentProgress > 100) {
        this.currentProgress = 100;
      }

      if (progressFill && progressText) {
        progressFill.style.width = `${this.currentProgress}%`;
        progressText.textContent = `${Math.floor(this.currentProgress)}%`;
      }

      if (this.currentProgress >= 100) {
        this.clearProgressInterval();
      }
    }, 100);
  }

  /**
   * Completes loading animation and calls callback
   */
  private completeLoading(): void {
    this.clearAllIntervals();
    
    // Ensure progress shows 100%
    const progressFill = document.getElementById('loading-progress-fill') as HTMLElement;
    const progressText = document.getElementById('loading-progress-text') as HTMLElement;
    
    if (progressFill && progressText) {
      progressFill.style.width = '100%';
      progressText.textContent = '100%';
    }

    // Show completion message briefly
    const captionElement = document.getElementById('loading-caption');
    if (captionElement) {
      captionElement.textContent = '✨ Your mystical Air Nomad dish is ready! ✨';
    }

    // Remove loading UI after brief delay
    setTimeout(() => {
      this.removeLoadingUI();
      if (this.onComplete) {
        this.onComplete();
      }
    }, 500);
  }

  /**
   * Removes loading UI from DOM
   */
  private removeLoadingUI(): void {
    const loadingOverlay = this.container.querySelector('.loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.remove();
    }
  }

  /**
   * Clears all intervals to prevent memory leaks
   */
  private clearAllIntervals(): void {
    this.clearProgressInterval();
    if (this.phaseTimeout) {
      clearTimeout(this.phaseTimeout);
      this.phaseTimeout = null;
    }
  }

  private clearProgressInterval(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  /**
   * Adds CSS styles for loading animations
   */
  private addLoadingStyles(): void {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(255,245,220,0.95), rgba(245,255,250,0.95));
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease-in;
      }

      .loading-content {
        text-align: center;
        background: white;
        padding: 3rem;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        border: 3px solid #e8f5e8;
        max-width: 500px;
        width: 90%;
      }

      .loading-emoji-container {
        margin-bottom: 2rem;
      }

      .loading-emoji {
        font-size: 4rem;
        display: inline-block;
        transition: opacity 0.3s ease;
      }

      .loading-spin {
        animation: spin 2s linear infinite;
      }

      .loading-float {
        animation: float 3s ease-in-out infinite;
      }

      .loading-bounce {
        animation: bounce 1.5s ease-in-out infinite;
      }

      .loading-pulse {
        animation: pulse 2s ease-in-out infinite;
      }

      .loading-shake {
        animation: shake 0.5s ease-in-out infinite;
      }

      .loading-caption {
        font-size: 1.2rem;
        color: #2c5530;
        margin-bottom: 2rem;
        font-weight: 500;
        transition: opacity 0.3s ease;
        line-height: 1.4;
      }

      .loading-progress-container {
        margin-bottom: 1.5rem;
      }

      .loading-progress-bar {
        width: 100%;
        height: 20px;
        background: #e8f5e8;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 0.5rem;
        border: 2px solid #d4ebd4;
      }

      .loading-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #4CAF50, #8BC34A, #CDDC39);
        border-radius: 8px;
        transition: width 0.3s ease;
        background-size: 200% 100%;
        animation: shimmer 2s linear infinite;
      }

      .loading-progress-text {
        font-size: 1rem;
        color: #2c5530;
        font-weight: 600;
      }

      .loading-subtitle {
        font-size: 1rem;
        color: #666;
        font-style: italic;
        margin-top: 1rem;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }

      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-30px); }
        60% { transform: translateY(-15px); }
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }

      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `;

    document.head.appendChild(styleSheet);
  }

  /**
   * Force stops loading animation (for cleanup)
   */
  public forceStop(): void {
    this.clearAllIntervals();
    this.removeLoadingUI();
  }
} 