/**
 * Air Nomad Lore System - Extends Base Lore System
 * 
 * Deep cultural integration with technique-specific lore, ingredient synergy,
 * named festivals, sacred events, and contextual legendary ingredient handling.
 * 
 * Creates immersive Avatar-world narratives that feel authentic to the Air Nomad culture.
 */

import { selectWithAntiClustering } from '../grammar/weighted-selection.js';
import {
  BaseLocation,
  BaseFestival,
  BaseTechniqueLore,
  BaseIngredientSynergy,
  BaseLegendaryIngredientContext,
  BaseSpiritualFigure,
  BaseNationLoreSystem,
  BaseLoreUtils
} from '../lore/base-lore-system.js';

/** Air Nomad specific location interface with semantic typing */
export interface AirNomadLocation extends BaseLocation {
  type: 'temple' | 'sanctuary' | 'monastery' | 'sacred_site' | 'sky_city';
  region: 'eastern' | 'western' | 'northern' | 'southern' | 'wandering';
}

/** Air Nomad specific technique lore interface with additional properties */
export interface AirNomadTechniqueLore extends BaseTechniqueLore {
  seasonalConnections: string[];
  ingredientSynergies: string[];
}

/** Air Nomad specific legendary ingredient context with additional restrictions */
export interface AirNomadLegendaryIngredientContext extends BaseLegendaryIngredientContext {
  preparationRequirements: string[];
  culturalRestrictions: string[];
}

/** Air Nomad specific spiritual figure with nation identifier */
export interface AirNomadSpiritualFigure extends BaseSpiritualFigure {
  nation: 'air_nomads';
}

/** Real Air Nomad locations with deep cultural context */
export const AIR_NOMAD_LOCATIONS: AirNomadLocation[] = [
  // The Four Air Temples
  {
    name: 'Eastern Air Temple',
    type: 'temple',
    region: 'eastern',
    specialties: ['sunrise meditation', 'cherry blossom cuisine', 'wind current reading'],
    culturalFocus: ['female airbenders', 'spiritual teaching', 'seasonal harmony'],
    historicalSignificance: 10
  },
  {
    name: 'Western Air Temple',
    type: 'temple', 
    region: 'western',
    specialties: ['inverted architecture', 'floating gardens', 'gravity-defying cooking'],
    culturalFocus: ['male airbenders', 'architectural innovation', 'atmospheric manipulation'],
    historicalSignificance: 10
  },
  {
    name: 'Northern Air Temple',
    type: 'temple',
    region: 'northern', 
    specialties: ['technological innovation', 'mechanized preparation', 'steam-powered facilities'],
    culturalFocus: ['adaptation', 'ingenuity', 'modern integration'],
    historicalSignificance: 8
  },
  {
    name: 'Southern Air Temple',
    type: 'temple',
    region: 'southern',
    specialties: ['peaceful meditation', 'sky bison bonding', 'pure tradition'],
    culturalFocus: ['contemplation', 'animal harmony', 'ancient ways'],
    historicalSignificance: 10
  },
  
  // Sacred Sites and Sanctuaries
  {
    name: 'Guru Pathik\'s Hermitage',
    type: 'sacred_site',
    region: 'eastern',
    specialties: ['chakra alignment', 'onion and banana juice', 'spiritual cleansing'],
    culturalFocus: ['enlightenment', 'energy work', 'mystical preparation'],
    historicalSignificance: 9
  },
  {
    name: 'Sky Bison Sanctuary',
    type: 'sanctuary',
    region: 'wandering',
    specialties: ['sky bison care', 'aerial cooking', 'migration food'],
    culturalFocus: ['animal bonding', 'nomadic lifestyle', 'freedom'],
    historicalSignificance: 9
  },
  {
    name: 'Windswept Peaks Monastery',
    type: 'monastery',
    region: 'northern',
    specialties: ['high-altitude preparation', 'mountain herbs', 'extreme weather cooking'],
    culturalFocus: ['endurance', 'simplicity', 'elemental harmony'],
    historicalSignificance: 7
  },
  {
    name: 'Cloud Walker Temple',
    type: 'temple',
    region: 'wandering',
    specialties: ['aerial meditation', 'cloud harvesting', 'wind-powered kitchens'],
    culturalFocus: ['freedom', 'wandering', 'sky mastery'],
    historicalSignificance: 8
  },
  {
    name: 'Avatar Yangchen Memorial Pavilion',
    type: 'sacred_site',
    region: 'eastern',
    specialties: ['historical recipes', 'diplomatic cuisine', 'peace offerings'],
    culturalFocus: ['diplomacy', 'history', 'cultural exchange'],
    historicalSignificance: 10
  }
];

/** Named festivals and sacred events with specific cultural context */
export const AIR_NOMAD_FESTIVALS: BaseFestival[] = [
  {
    name: 'Festival of Four Winds',
    season: 'autumn',
    purpose: 'Honor the cardinal directions and their spiritual significance',
    traditionalFoods: ['wind-aligned dishes', 'directional spice blends', 'compass-rose cakes'],
    spiritualFocus: ['balance', 'direction', 'cosmic harmony'],
    participants: ['all air nomads', 'sky bison', 'wind spirits'],
    rarity: 'common'
  },
  {
    name: 'Day of Ascending', 
    season: 'spring',
    purpose: 'Celebrate young airbenders\' first solo flight',
    traditionalFoods: ['lightness-inducing meals', 'floating desserts', 'sky-blue beverages'],
    spiritualFocus: ['growth', 'achievement', 'freedom'],
    participants: ['young airbenders', 'mentors', 'sky bison'],
    rarity: 'uncommon'
  },
  {
    name: 'Sky Bison Appreciation Ceremony',
    season: 'summer',
    purpose: 'Honor the sacred bond between airbenders and sky bison',
    traditionalFoods: ['sky bison favorite treats', 'shared meals', 'harmony dishes'],
    spiritualFocus: ['companionship', 'gratitude', 'interspecies bond'],
    participants: ['airbenders', 'sky bison herds'],
    rarity: 'common'
  },
  {
    name: 'Guru\'s Festival of Repose',
    season: 'winter',
    purpose: 'Deep meditation retreat honoring spiritual masters',
    traditionalFoods: ['meditation-enhancing broths', 'chakra-aligned meals', 'cleansing teas'],
    spiritualFocus: ['introspection', 'wisdom', 'spiritual growth'],
    participants: ['spiritual gurus', 'advanced masters', 'seekers'],
    rarity: 'rare'
  },
  {
    name: 'Monk\'s Awakening Festival',
    season: 'spring',
    purpose: 'Celebrate spiritual enlightenment and new understanding',
    traditionalFoods: ['clarity-bringing dishes', 'awakening spices', 'enlightenment desserts'],
    spiritualFocus: ['awakening', 'realization', 'consciousness'],
    participants: ['monks', 'spiritual students', 'enlightened masters'],
    rarity: 'uncommon'
  },
  {
    name: 'Bison\'s Reverie',
    season: 'autumn',
    purpose: 'Sky bison meditation and bonding ceremony',
    traditionalFoods: ['reverie cakes', 'dreaming teas', 'bonding treats'],
    spiritualFocus: ['dreams', 'connection', 'peaceful rest'],
    participants: ['sky bison', 'their airbender partners', 'sleep spirits'],
    rarity: 'uncommon'
  },
  {
    name: 'Harmonic Convergence Feast',
    season: 'year_round',
    purpose: 'Rare cosmic alignment celebration',
    traditionalFoods: ['spirit world delicacies', 'cosmic alignment dishes', 'energy fusion meals'],
    spiritualFocus: ['cosmic unity', 'spiritual convergence', 'world balance'],
    participants: ['all airbenders', 'spirits', 'avatars'],
    rarity: 'legendary'
  },
  {
    name: 'Vow of Silence Retreat',
    season: 'winter',
    purpose: 'Silent meditation and contemplation period',
    traditionalFoods: ['simple sustenance', 'quiet preparation', 'wordless sharing'],
    spiritualFocus: ['silence', 'inner listening', 'profound peace'],
    participants: ['contemplative monks', 'hermits', 'serious students'],
    rarity: 'rare'
  },
  {
    name: 'Wind Walker\'s Pilgrimage',
    season: 'summer',
    purpose: 'Journey to sacred sites across the world',
    traditionalFoods: ['travel provisions', 'portable meals', 'journey sustenance'],
    spiritualFocus: ['pilgrimage', 'devotion', 'sacred travel'],
    participants: ['pilgrims', 'wandering monks', 'spiritual seekers'],
    rarity: 'uncommon'
  }
];

/** Technique-specific lore system */
export const AIR_NOMAD_TECHNIQUE_LORE: AirNomadTechniqueLore[] = [
  {
    technique: 'Whisper-Steamed',
    origin: 'Developed by silent monks at the Southern Air Temple for meditation-compatible cooking',
    traditionalUse: 'Used for cleansing ceremonies and purification rituals, especially with lemongrass and mountain herbs',
    spiritualSignificance: 'Represents the gentle approach to life - achieving goals through minimal force and maximum awareness',
    legendaryPractitioners: ['Monk Gyatso', 'Sister Iio', 'Master Jinora'],
    seasonalConnections: ['spring cleansing', 'dawn meditation', 'new moon ceremonies'],
    ingredientSynergies: ['lemongrass + mountain spring water = cleansing ceremony', 'tea leaves + wild honey = meditation enhancement']
  },
  {
    technique: 'Steam-Whipped',
    origin: 'Invented at the Northern Air Temple by innovative airbenders seeking efficient preparation methods',
    traditionalUse: 'Essential for creating the light, airy textures favored in sky bison feeding rituals',
    spiritualSignificance: 'Embodies the transformation of simple ingredients through the power of controlled breath and movement',
    legendaryPractitioners: ['Master Mechanist', 'Guru Laghima', 'Avatar Yangchen'],
    seasonalConnections: ['windy season preparation', 'storm cooking', 'high-altitude meals'],
    ingredientSynergies: ['tofu + air currents = sky-like lightness', 'mushrooms + steam = cloud texture']
  },
  {
    technique: 'Cloud-Braised',
    origin: 'Ancient technique passed down from the first airbenders who learned from sky bison feeding habits',
    traditionalUse: 'Sacred to the Sky Bison Appreciation Ceremony, used to prepare offerings that honor the bond between species',
    spiritualSignificance: 'Teaches patience and trust in natural processes, allowing ingredients to transform in their own time',
    legendaryPractitioners: ['The Original Airbenders', 'Sky Bison Herders', 'Avatar Aang'],
    seasonalConnections: ['monsoon season', 'cloud formation periods', 'misty mountain mornings'],
    ingredientSynergies: ['root vegetables + sky bison milk = ancient bond', 'rice + cloud moisture = perfect absorption']
  },
  {
    technique: 'Wind-Dried',
    origin: 'Created by nomadic airbenders who needed preservation methods during long sky bison journeys',
    traditionalUse: 'Essential for preparing travel provisions and ceremonial offerings that must last through pilgrimages',
    spiritualSignificance: 'Represents the removal of excess and the preservation of essence - a lesson in letting go of the unnecessary',
    legendaryPractitioners: ['Wandering Guru Pathik', 'Nomadic Masters', 'Travel Specialists'],
    seasonalConnections: ['dry season preservation', 'journey preparation', 'harvest processing'],
    ingredientSynergies: ['fruits + mountain air = concentrated sweetness', 'herbs + wind currents = preserved healing power']
  },
  {
    technique: 'Levitation-Cooked',
    origin: 'Developed by master airbenders as the ultimate expression of airbending artistry in cuisine',
    traditionalUse: 'Reserved for the most sacred ceremonies and Avatar visitations, demonstrating mastery over the elements',
    spiritualSignificance: 'Symbolizes transcendence of earthly limitations and the elevation of the mundane to the divine',
    legendaryPractitioners: ['Avatar Yangchen', 'Guru Laghima', 'Legendary Air Masters'],
    seasonalConnections: ['spiritual celebrations', 'mastery demonstrations', 'cosmic events'],
    ingredientSynergies: ['sacred ingredients + spiritual energy = transcendent meals', 'rare herbs + levitation = enhanced potency']
  },
  {
    technique: 'Meditation-Infused',
    origin: 'Taught by Guru Pathik as a method to combine spiritual practice with daily sustenance preparation',
    traditionalUse: 'Used exclusively during spiritual retreats and when preparing meals for enlightened masters',
    spiritualSignificance: 'Infuses food with spiritual intention and meditative energy, creating nourishment for both body and soul',
    legendaryPractitioners: ['Guru Pathik', 'Enlightened Hermits', 'Spiritual Gurus'],
    seasonalConnections: ['meditation seasons', 'spiritual retreats', 'contemplative periods'],
    ingredientSynergies: ['tea + meditation = enlightenment aid', 'simple ingredients + deep focus = profound nourishment']
  },
  {
    technique: 'Sky-Roasted',
    origin: 'Developed by airbenders living at extreme altitudes who learned to harness thin air and intense sunlight',
    traditionalUse: 'Traditional for high-altitude festivals and ceremonies celebrating the sky and open air',
    spiritualSignificance: 'Represents the airbender philosophy of finding opportunity in challenging conditions',
    legendaryPractitioners: ['High-Altitude Masters', 'Mountain Hermits', 'Sky Temple Residents'],
    seasonalConnections: ['clear sky days', 'mountain ceremonies', 'altitude celebrations'],
    ingredientSynergies: ['root vegetables + high altitude = concentrated flavors', 'grains + sky roasting = enhanced nutrition']
  }
];

/** Ingredient synergy system for contextual lore */
export const AIR_NOMAD_INGREDIENT_SYNERGIES: BaseIngredientSynergy[] = [
  {
    ingredients: ['Lemongrass', 'Mountain Spring Water'],
    technique: 'Whisper-Steamed',
    context: 'Temple Cleansing Ceremony',
    loreHook: 'This sacred combination has been used for over a thousand years in Eastern Air Temple purification rituals, where the gentle steam carries prayers to the wind spirits',
    spiritualMeaning: 'Represents purification of both body and spirit, washing away negative energy like morning mist',
    rarity: 'common'
  },
  {
    ingredients: ['Tea Leaves', 'Wild Honey', 'Meditation'],
    technique: 'Meditation-Infused',
    context: 'Guru\'s Festival of Repose',
    loreHook: 'Guru Pathik himself perfected this blend during his centuries of hermitage, claiming it opens the crown chakra and facilitates communion with cosmic energy',
    spiritualMeaning: 'The sweetness of enlightenment combined with the clarity of focused mind creates perfect spiritual nourishment',
    rarity: 'rare'
  },
  {
    ingredients: ['Mushrooms', 'Sky Bison Milk'],
    technique: 'Cloud-Braised',
    context: 'Sky Bison Appreciation Ceremony',
    loreHook: 'This ancient pairing honors the first bond between airbenders and sky bison, recreating the forest floor meals that brought the species together ten thousand years ago',
    spiritualMeaning: 'Symbolizes the sacred partnership between human and animal, earth and sky, demonstrating that all life is interconnected',
    rarity: 'uncommon'
  },
  {
    ingredients: ['Tofu', 'Air Currents'],
    technique: 'Steam-Whipped',
    context: 'Day of Ascending Celebration',
    loreHook: 'Young airbenders traditionally prepare this dish for their first solo flight ceremony, with the texture representing the lightness they must achieve in both body and spirit',
    spiritualMeaning: 'The transformation of dense ingredients into airy perfection mirrors the airbender\'s journey from earthbound student to free-flying master',
    rarity: 'common'
  },
  {
    ingredients: ['Sacred Lotus Root', 'Spirit World Essence'],
    technique: 'Levitation-Cooked',
    context: 'Harmonic Convergence Feast',
    loreHook: 'Only prepared during the rarest of cosmic events when the barrier between worlds grows thin, allowing spirit world ingredients to be harvested by enlightened masters',
    spiritualMeaning: 'Represents the ultimate unity between physical and spiritual realms, nourishing both mortal form and eternal spirit',
    rarity: 'legendary'
  },
  {
    ingredients: ['Fruits', 'Mountain Air'],
    technique: 'Wind-Dried',
    context: 'Wind Walker\'s Pilgrimage',
    loreHook: 'Pilgrims carry these concentrated spiritual provisions on their sacred journeys, with each bite containing the essence of the mountain winds that dried them',
    spiritualMeaning: 'The preservation process removes the temporary to reveal the eternal, teaching pilgrims to focus on lasting spiritual truths',
    rarity: 'uncommon'
  }
];

/** Legendary and sacred ingredient contexts */
export const AIR_NOMAD_LEGENDARY_INGREDIENTS: AirNomadLegendaryIngredientContext[] = [
  {
    ingredient: 'Sacred Lotus Root',
    rarity: 'sacred',
    origin: 'Grows only in the spirit oasis protected by the Moon and Ocean spirits',
    loreText: 'Legend speaks of lotus roots that bridge the material and spirit worlds, harvested only during the full moon by airbenders who have achieved enlightenment. Each root contains memories of a thousand lifetimes and the wisdom of the ancient spirits.',
    preparationRequirements: ['full moon harvest', 'enlightened master', 'spirit world blessing', 'purification ceremony'],
    spiritualPowers: ['spirit world communication', 'past life memories', 'enhanced spiritual sensitivity', 'bridge between worlds'],
    culturalRestrictions: ['Avatar ceremonies only', 'harmonic convergence', 'spiritual emergencies', 'never for personal gain']
  },
  {
    ingredient: 'Sky Bison Milk',
    rarity: 'legendary', 
    origin: 'Freely given by ancient sky bison during bonding ceremonies',
    loreText: 'More than sustenance, sky bison milk represents the ultimate trust between species. Only offered during moments of profound spiritual connection, it carries the sky bison\'s memories of cloud-dancing and wind-riding across the ages.',
    preparationRequirements: ['willing sky bison', 'spiritual bond', 'ceremonial context', 'mutual respect'],
    spiritualPowers: ['enhanced airbending', 'sky bison communication', 'wind current reading', 'aerial grace'],
    culturalRestrictions: ['never demanded', 'only during ceremonies', 'must be freely given', 'requires spiritual bond']
  },
  {
    ingredient: 'Wind Flower Nectar',
    rarity: 'rare',
    origin: 'Blooms only at the highest peaks during windstorms',
    loreText: 'These ethereal flowers bloom for mere minutes during the fiercest mountain storms, their nectar said to contain the essence of pure wind. Collecting it requires an airbender to literally dance with the tempest.',
    preparationRequirements: ['storm dancing', 'peak climbing', 'perfect timing', 'fearless heart'],
    spiritualPowers: ['storm resistance', 'enhanced agility', 'wind mastery', 'fearlessness'],
    culturalRestrictions: ['coming of age ceremonies', 'master trials', 'storm season only', 'solo collection required']
  },
  {
    ingredient: 'Crystal Cave Minerals',
    rarity: 'rare',
    origin: 'Deep within the crystal catacombs where earthbenders and airbenders first met in peace',
    loreText: 'These crystalline formations grow in the sacred caves where ancient earthbenders and airbenders made their first peace treaty. The minerals are said to contain the harmony of opposing elements.',
    preparationRequirements: ['diplomatic blessing', 'elemental balance', 'peaceful intention', 'inter-nation cooperation'],
    spiritualPowers: ['elemental harmony', 'diplomatic wisdom', 'conflict resolution', 'cultural understanding'],
    culturalRestrictions: ['peace ceremonies', 'diplomatic events', 'inter-nation festivals', 'harmony celebrations']
  }
];

/** Named spiritual figures and their culinary connections */
export const AIR_NOMAD_SPIRITUAL_FIGURES: AirNomadSpiritualFigure[] = [
  {
    name: 'Guru Pathik',
    specialty: 'Chakra-aligning cuisine and spiritual cleansing foods',
    signature: 'Onion and banana juice for crown chakra opening',
    wisdom: 'Food is energy, and energy is life - choose ingredients that elevate consciousness',
    nation: 'air_nomads'
  },
  {
    name: 'Monk Gyatso', 
    specialty: 'Joyful cooking that brings lightness to the spirit',
    signature: 'Fruit pies that make sky bison and airbenders equally delighted',
    wisdom: 'Cooking should be an act of love, bringing joy to all who partake',
    nation: 'air_nomads'
  },
  {
    name: 'Avatar Yangchen',
    specialty: 'Diplomatic cuisine that bridges cultural differences',
    signature: 'Harmony bowls that represent all four nations in perfect balance',
    wisdom: 'A shared meal can accomplish what a hundred treaties cannot',
    nation: 'air_nomads'
  },
  {
    name: 'Sister Iio',
    specialty: 'Gentle healing foods for body and spirit recovery',
    signature: 'Whisper-steamed medicinal broths infused with mountain herbs',
    wisdom: 'True healing nourishes not just the body, but the soul\'s deepest needs',
    nation: 'air_nomads'
  },
  {
    name: 'Master Jinora',
    specialty: 'Modern interpretations of ancient spiritual recipes',
    signature: 'Spirit vine teas that enhance meditation and astral projection',
    wisdom: 'Ancient wisdom finds new expression in each generation\'s kitchen',
    nation: 'air_nomads'
  }
];

/**
 * Air Nomad Lore System Implementation
 * 
 * Complete implementation of the BaseNationLoreSystem interface for Air Nomads
 */
export class AirNomadLoreSystem implements BaseNationLoreSystem {
  locations: BaseLocation[] = AIR_NOMAD_LOCATIONS;
  festivals: BaseFestival[] = AIR_NOMAD_FESTIVALS;
  techniqueLore: BaseTechniqueLore[] = AIR_NOMAD_TECHNIQUE_LORE;
  ingredientSynergies: BaseIngredientSynergy[] = AIR_NOMAD_INGREDIENT_SYNERGIES;
  legendaryIngredients: BaseLegendaryIngredientContext[] = AIR_NOMAD_LEGENDARY_INGREDIENTS;
  spiritualFigures: BaseSpiritualFigure[] = AIR_NOMAD_SPIRITUAL_FIGURES;

  /**
   * Gets location-specific lore for a given temple or sacred site
   */
  getLocationLore(locationName: string): BaseLocation | undefined {
    return BaseLoreUtils.findLocationLore(this.locations, locationName);
  }

  /**
   * Gets festival context for seasonal events
   */
  getFestivalContext(): BaseFestival {
    const festivalNames = this.festivals.map(f => f.name);
    const selectedName = selectWithAntiClustering(festivalNames);
    return this.festivals.find(f => f.name === selectedName) || this.festivals[0];
  }

  /**
   * Gets technique-specific lore for deep cultural context
   */
  getTechniqueLore(techniqueName: string): BaseTechniqueLore | undefined {
    return BaseLoreUtils.findTechniqueLore(this.techniqueLore, techniqueName);
  }

  /**
   * Gets ingredient synergy lore for specific combinations
   */
  getIngredientSynergy(ingredients: string[], technique: string): BaseIngredientSynergy | undefined {
    return BaseLoreUtils.findIngredientSynergy(this.ingredientSynergies, ingredients, technique);
  }

  /**
   * Gets legendary ingredient context for rare/sacred ingredients
   */
  getLegendaryIngredientContext(ingredientName: string): BaseLegendaryIngredientContext | undefined {
    return BaseLoreUtils.findLegendaryIngredientContext(this.legendaryIngredients, ingredientName);
  }
}

/** Singleton instance for easy access */
export const airNomadLoreSystem = new AirNomadLoreSystem();

// Legacy function exports for backward compatibility
export const getLocationLore = airNomadLoreSystem.getLocationLore.bind(airNomadLoreSystem);
export const getFestivalContext = airNomadLoreSystem.getFestivalContext.bind(airNomadLoreSystem);
export const getTechniqueLore = airNomadLoreSystem.getTechniqueLore.bind(airNomadLoreSystem);
export const getIngredientSynergy = airNomadLoreSystem.getIngredientSynergy.bind(airNomadLoreSystem);
export const getLegendaryIngredientContext = airNomadLoreSystem.getLegendaryIngredientContext.bind(airNomadLoreSystem); 