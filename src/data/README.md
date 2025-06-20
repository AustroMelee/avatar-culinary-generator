# Data Architecture - Expansion-Proof Design

This document explains the reorganized data architecture that supports expansion to all Avatar nations while maintaining Air Nomad specificity.

## Directory Structure

```
src/data/
├── lore/                           # Generic lore system framework
│   └── base-lore-system.ts        # Base interfaces for any nation
├── grammar/                        # Generic utilities (cross-nation)
│   ├── weighted-selection.js      # Selection algorithms
│   ├── flow-engine.js             # Text generation utilities
│   └── enhanced-phrasebanks.js    # Generic phrase banks
├── air-nomad/                      # Air Nomad specific implementation
│   ├── index.ts                   # Clean export interface
│   ├── ingredients.ts             # Air Nomad ingredients + legendary items
│   ├── techniques.ts              # Air Nomad cooking techniques
│   └── lore-system.ts             # Air Nomad lore implementation
└── cultural-combinations.ts        # Cross-cultural interaction rules
```

## Design Principles

### 1. **Nation-Specific Separation**
- Each nation gets its own directory (`air-nomad/`, future: `water-tribes/`, `earth-kingdom/`, `fire-nation/`)
- All nation-specific data (ingredients, techniques, lore) stays within its directory
- Prevents naming conflicts and allows independent development

### 2. **Generic Framework Foundation**
- `src/data/lore/base-lore-system.ts` provides interfaces any nation can implement
- `src/data/grammar/` contains utilities usable by all nations
- Ensures consistency while allowing cultural customization

### 3. **Clean Import Interfaces**
- Each nation directory has an `index.ts` that exports everything cleanly
- External modules import from `../data/air-nomad/` instead of deep paths
- Future nations can follow the same pattern

## Base Lore System Framework

The `BaseNationLoreSystem` interface requires every nation to implement:

```typescript
interface BaseNationLoreSystem {
  locations: BaseLocation[];
  festivals: BaseFestival[];
  techniqueLore: BaseTechniqueLore[];
  ingredientSynergies: BaseIngredientSynergy[];
  legendaryIngredients: BaseLegendaryIngredientContext[];
  spiritualFigures: BaseSpiritualFigure[];
  
  // Standardized lookup functions
  getLocationLore(locationName: string): BaseLocation | undefined;
  getFestivalContext(): BaseFestival;
  getTechniqueLore(techniqueName: string): BaseTechniqueLore | undefined;
  getIngredientSynergy(ingredients: string[], technique: string): BaseIngredientSynergy | undefined;
  getLegendaryIngredientContext(ingredientName: string): BaseLegendaryIngredientContext | undefined;
}
```

## Air Nomad Implementation Example

The Air Nomad implementation shows how to extend the base system:

```typescript
// Extend base interfaces with nation-specific properties
export interface AirNomadLocation extends BaseLocation {
  type: 'temple' | 'sanctuary' | 'monastery' | 'sacred_site' | 'sky_city';
  region: 'eastern' | 'western' | 'northern' | 'southern' | 'wandering';
}

// Implement the base system
export class AirNomadLoreSystem implements BaseNationLoreSystem {
  locations: BaseLocation[] = AIR_NOMAD_LOCATIONS;
  // ... other implementations
}
```

## Future Nation Expansion

To add a new nation (e.g., Water Tribes):

### 1. Create Nation Directory
```
src/data/water-tribes/
├── index.ts                    # Export interface
├── ingredients.ts              # Water Tribe ingredients
├── techniques.ts               # Water Tribe techniques
└── lore-system.ts             # Water Tribe lore implementation
```

### 2. Implement Base Interfaces
```typescript
// In water-tribes/lore-system.ts
export class WaterTribeLoreSystem implements BaseNationLoreSystem {
  locations: BaseLocation[] = WATER_TRIBE_LOCATIONS;
  festivals: BaseFestival[] = WATER_TRIBE_FESTIVALS;
  // ... implement all required methods
}
```

### 3. Define Nation-Specific Extensions
```typescript
export interface WaterTribeLocation extends BaseLocation {
  type: 'igloo' | 'ice_palace' | 'coastal_village' | 'sacred_spring';
  region: 'northern' | 'southern' | 'swamp';
}
```

### 4. Update Generator Systems
- The culinary generator can accept any `BaseNationLoreSystem`
- Add nation selection logic to main application
- Cultural combinations can define cross-nation interactions

## Benefits of This Architecture

### ✅ **Expansion-Proof**
- Adding new nations doesn't break existing code
- Each nation's data is completely isolated
- Generic utilities remain shared and reusable

### ✅ **Type Safety**
- All nations implement the same interface contract
- TypeScript catches missing implementations
- Consistent API across all nations

### ✅ **Maintainability**
- Clear separation of concerns
- Easy to find and modify nation-specific content
- Documentation co-located with implementation

### ✅ **Cultural Authenticity**
- Each nation can have completely different data structures
- Nation-specific properties (Air Nomad sky cities, Water Tribe igloos)
- Flexible enough for unique cultural elements

## Migration Notes

### Breaking Changes
- Import paths changed from `../data/air-nomad-ingredients.js` to `../data/air-nomad/ingredients.js`
- Lore system moved from `../data/grammar/avatar-lore-system.js` to `../data/air-nomad/lore-system.js`

### Backward Compatibility
- All function signatures remain the same
- Legacy exports maintained for gradual migration
- Existing dish generation continues to work

This architecture ensures the Avatar Food Generator can grow to encompass all four nations while maintaining the deep cultural authenticity that makes each nation's cuisine unique and immersive. 