import { SovereignDishGenerator } from './sovereign-dish-generator.js';
import { createAirNomadConfiguration, AirNomadDataProvider } from '../data/air-nomad-data-provider.js';
import type { 
  DishType, 
  GeneratedAirNomadDish
} from '../types.js';

/**
 * AIR NOMAD COMPATIBILITY ADAPTER
 * 
 * DEPRECATED: This class is maintained for backward compatibility only.
 * The actual generation logic now lives in the sovereign SovereignDishGenerator.
 * This adapter just calls the sovereign generator with Air Nomad configuration.
 * 
 * ARCHITECTURAL NOTE: 
 * - This is a THIN WRAPPER with zero generation logic
 * - All actual work delegated to SovereignDishGenerator
 * - Provides familiar API during transition period
 * 
 * @deprecated Use SovereignDishGenerator.createDish(AirNomadDataProvider.forMainCourse()) directly
 */
export class AirNomadDishGenerator {
  private readonly sovereignGenerator: SovereignDishGenerator;
  private readonly dishType: DishType;
  private readonly allowLegendaryIngredients: boolean;

  /**
   * Creates a new Air Nomad dish generator adapter
   * @deprecated Use SovereignDishGenerator with AirNomadDataProvider instead
   */
  constructor(dishType: DishType = 'main_course', allowLegendaryIngredients: boolean = false) {
    this.sovereignGenerator = new SovereignDishGenerator();
    this.dishType = dishType;
    this.allowLegendaryIngredients = allowLegendaryIngredients;
  }

  /**
   * Creates an authentic Air Nomad main course
   * @deprecated Use AirNomadDataProvider.forMainCourse() with SovereignDishGenerator
   */
  static createMainCourse(allowLegendaryIngredients: boolean = false): AirNomadDishGenerator {
    return new AirNomadDishGenerator('main_course', allowLegendaryIngredients);
  }

  /**
   * Creates a traditional Air Nomad side dish
   * @deprecated Use AirNomadDataProvider.forSideDish() with SovereignDishGenerator
   */
  static createSideDish(allowLegendaryIngredients: boolean = false): AirNomadDishGenerator {
    return new AirNomadDishGenerator('side_dish', allowLegendaryIngredients);
  }

  /**
   * Creates a sacred ceremonial offering
   * @deprecated Use AirNomadDataProvider.forCeremonialOffering() with SovereignDishGenerator
   */
  static createCeremonialOffering(allowLegendaryIngredients: boolean = true): AirNomadDishGenerator {
    return new AirNomadDishGenerator('ceremonial_offering', allowLegendaryIngredients);
  }

  /**
   * Generates a complete Air Nomad dish using the sovereign architecture
   * @deprecated Use SovereignDishGenerator.createDish() directly
   */
  createDish(): GeneratedAirNomadDish {
    const config = createAirNomadConfiguration(this.dishType, this.allowLegendaryIngredients);
    return this.sovereignGenerator.createDish<any, any, GeneratedAirNomadDish>(config);
  }
} 