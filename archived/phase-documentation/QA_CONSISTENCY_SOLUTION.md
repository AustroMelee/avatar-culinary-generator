# QA: Consistency Solution - Web Generator as Single Source of Truth

## ✅ Problem Resolved

**Issue**: CLI/test scripts used local generation logic that differed from the web application, causing output inconsistencies.

**Solution**: Web generator system (`AirNomadDishGenerator` + `CulinaryGenerator`) is now the ONLY generation system used. All CLI scripts must use this same web system.

## 🎯 Single Source of Truth Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Web Generator System                     │
│                                                             │
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │ Web Application │    │ CLI Scripts                     │ │
│  │                 │    │ (Import web generator)          │ │
│  │ main.ts         │    │                                 │ │
│  │ ↓               │    │ generate-dishes-web-system.mjs  │ │
│  │ AirNomadDish    │    │ ↓                               │ │
│  │ Generator       │────┼─→ AirNomadDishGenerator         │ │
│  │ .createDish()   │    │   .createDish()                 │ │
│  └─────────────────┘    └─────────────────────────────────┘ │
│                                                             │
│              SAME CODE • SAME LOGIC • SAME OUTPUT          │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Implementation Status

### ✅ Web Application
- **Generator**: `AirNomadDishGenerator.createMainCourse()`
- **Core Engine**: `CulinaryGenerator` with full feature set
- **Data Sources**: `airNomadIngredients`, `airNomadTechniques`, etc.
- **Features**: Role-based composition, cultural weighting, sensory descriptions
- **Status**: ✅ Production ready - this is the REFERENCE implementation

### 🚧 CLI Scripts
- **Current**: Legacy scripts with local generation logic (DEPRECATED)
- **Target**: CLI scripts that import and use the web generator system
- **Template**: `scripts/generate-dishes-web-system.mjs` (implementation needed)
- **Status**: 🚧 Requires module import implementation

## 🛠️ Implementation Requirements

### For CLI Scripts to Use Web System:

1. **Import Web Generator**:
   ```javascript
   // Import the SAME generator the web uses
   import { AirNomadDishGenerator } from '../src/generator/air-nomad-generator.js';
   // OR from built dist files after 'npm run build'
   ```

2. **Use Exact Same Calls**:
   ```javascript
   // SAME initialization as web application
   const generator = AirNomadDishGenerator.createMainCourse();
   
   // SAME generation call as web application  
   const dish = generator.createDish();
   ```

3. **Format for CLI Output**:
   ```javascript
   // Convert the web dish object to CLI-friendly format
   // but preserve ALL the same data and logic
   function formatDishForCLI(dish) {
     return {
       name: dish.name,
       description: dish.description,
       ingredients: dish.ingredients.map(ing => ing.name),
       technique: dish.technique.name,
       // ... etc
     };
   }
   ```

## 📋 Migration Strategy

### Phase 1: Identify Legacy Scripts ✅
- [x] `scripts/generate-50-dishes-phase6.mjs` - Contains local logic (DEPRECATED)
- [x] Other `scripts/generate-*.mjs` files - Should be replaced

### Phase 2: Create Web-System CLI Bridge 🚧
- [x] Template created: `scripts/generate-dishes-web-system.mjs`
- [ ] Implement proper module importing from web system
- [ ] Test consistency between web and CLI output
- [ ] Add TypeScript compilation step if needed

### Phase 3: Deprecate Legacy Scripts 🚧  
- [ ] Add deprecation warnings to old scripts
- [ ] Update documentation to point to new CLI script
- [ ] Remove local generation logic from CLI scripts

## 🧪 QA Testing Approach

### Consistency Verification:
1. **Generate dishes in web application** (note ingredients, techniques, descriptions)
2. **Generate dishes with new CLI script** using same web generator
3. **Compare outputs**: Should use same ingredient pools, same cultural weights, same composition rules
4. **Verify**: Any differences should be formatting only, NOT content/logic

### Test Cases:
- [x] Web application generates dishes successfully
- [ ] CLI script imports web generator without errors
- [ ] CLI script produces dishes with same ingredients as web
- [ ] CLI script respects same cultural authenticity rules as web
- [ ] CLI script produces same difficulty calculations as web

## 🎯 Success Criteria

✅ **Web Generator Established**: Web application is the definitive generation system  
🚧 **CLI Imports Web**: CLI scripts use the exact same web generator code  
🚧 **No Duplicate Logic**: Zero local generation logic in CLI scripts  
🚧 **Consistent Output**: Web and CLI produce dishes from same logic  
🚧 **Clear Documentation**: Developers know web system is the source of truth  

## 📖 Developer Guidelines

### ✅ DO:
- Use `AirNomadDishGenerator` from the web system for ALL generation
- Import web generator modules in CLI scripts
- Format web generator output for CLI display
- Test against the web application for consistency

### ❌ DON'T:
- Create separate "CLI generators" or "unified generators"
- Duplicate ingredient lists or technique arrays
- Implement local generation logic in scripts  
- Create "modes" or variations of the core logic

## 📂 File Status

### Production (Web System) ✅:
- `src/generator/air-nomad-generator.ts` - Main generator
- `src/generator/culinary-generator.ts` - Core engine
- `src/data/air-nomad/ingredients.ts` - Data source
- `src/data/air-nomad/techniques.ts` - Data source
- `src/main.ts` - Web application entry point

### Template (CLI Bridge) 🚧:
- `scripts/generate-dishes-web-system.mjs` - Template for CLI using web system

### Deprecated (Legacy) ⚠️:
- `scripts/generate-50-dishes-phase6.mjs` - Local logic, should be replaced
- Other legacy `generate-*.mjs` files - Should use web system instead

---

**Status**: 🎯 Single source of truth established (web system)  
**Next Step**: Implement CLI import of web generator modules  
**Goal**: 100% consistency between web application and CLI output 