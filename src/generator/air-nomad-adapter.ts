import { SovereignDishGenerator } from './sovereign-dish-generator.js';
import { createAirNomadConfiguration, AirNomadDataProvider } from '../data/air-nomad-data-provider.js';
import type { 
  DishType, 
  GeneratedAirNomadDish
} from '../types.js';

/**
 * DEPRECATED: AIR NOMAD DISH GENERATOR ADAPTER
 * 
 * This class is maintained for backward compatibility only.
 * The actual generation logic now lives in the sovereign FrameworkCoreDishGenerator.
 * This adapter just calls the core generator with Air Nomad configuration.
 * 
 * @deprecated Use FrameworkCoreDishGenerator.createDish(AirNomadConfigs.mainCourse()) directly
 */
export class AirNomadDishGenerator {
  private readonly sovereignGenerator: SovereignDishGenerator;
  private readonly dishType: DishType;
  private readonly allowLegendaryIngredients: boolean;

  /**
   * Creates a new Air Nomad dish generator adapter
   * @deprecated Use FrameworkCoreDishGenerator with AirNomadConfigs instead
   */
  constructor(dishType: DishType = 'main_course', allowLegendaryIngredients: boolean = false) {
    this.sovereignGenerator = new SovereignDishGenerator();
    this.dishType = dishType;
    this.allowLegendaryIngredients = allowLegendaryIngredients;
  }

  /**
   * Creates an authentic Air Nomad main course
   * @deprecated Use AirNomadConfigs.mainCourse() with FrameworkCoreDishGenerator
   */
  static createMainCourse(allowLegendaryIngredients: boolean = false): AirNomadDishGenerator {
    return new AirNomadDishGenerator('main_course', allowLegendaryIngredients);
  }

  /**
   * Creates a traditional Air Nomad side dish
   * @deprecated Use AirNomadConfigs.sideDish() with FrameworkCoreDishGenerator
   */
  static createSideDish(allowLegendaryIngredients: boolean = false): AirNomadDishGenerator {
    return new AirNomadDishGenerator('side_dish', allowLegendaryIngredients);
  }

  /**
   * Creates a sacred ceremonial offering
   * @deprecated Use AirNomadConfigs.ceremonialOffering() with FrameworkCoreDishGenerator
   */
  static createCeremonialOffering(allowLegendaryIngredients: boolean = true): AirNomadDishGenerator {
    return new AirNomadDishGenerator('ceremonial_offering', allowLegendaryIngredients);
  }

  /**
   * Generates a complete Air Nomad dish using the sovereign architecture
   * @deprecated Use FrameworkCoreDishGenerator.createDish() directly
   */
  createDish(): GeneratedAirNomadDish {
    const config = createAirNomadConfiguration(this.dishType, this.allowLegendaryIngredients);
    return this.sovereignGenerator.createDish<any, any, GeneratedAirNomadDish>(config);
  }
} 