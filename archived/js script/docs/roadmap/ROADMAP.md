# Project Roadmap: Towards an Infinite Generator

This document outlines the strategic roadmap for evolving the Avatar Food Generator from its current state into a deeply narrative, seemingly infinite experience. Our guiding principle is to expand **horizontally** (more content) from the **vertically integrated** "Golden Standard" we have already established.

---

## Phase 1: Solidify the Air Nomads (The Perfect Vertical Slice)

**Goal:** Ensure every possible dish generated for the Air Nomads meets the "Golden Standard" of quality. This involves moving beyond just `Main Course` to perfect every dish type for this single nation.

**Methodology:** A mix of targeted data expansion and fine-tuning the generator logic for each specific context.

### Steps:

1.  **Systematize the Golden Templates:**
    *   Create new Golden Template files in `src/templates/gold/` for each Air Nomad dish type (e.g., `AirNomad_Dessert_GoldenPrompt.md`, `AirNomad_Beverage_GoldenPrompt.md`).
    *   These will define the unique voice and structure for each context. A beverage should not be described like a stew.

2.  **Targeted Data Expansion:**
    *   Review each dish type and identify data gaps in `airNomads.js`.
    *   **Action Items:**
        *   Add new ingredients suitable for desserts, snacks, and beverages.
        *   Write new `servingTraditions` and `chefTips` that are specific to these contexts (e.g., a tip for keeping a beverage warm).
        *   Expand `loreHints` to trigger stories relevant to different meal types.

3.  **Context-Aware Generator Logic:**
    *   Refine the generator modules (`conceptGenerator`, `preparationGenerator`, etc.) to be aware of the `dishType`.
    *   **Action Items:**
        *   Modify `preparationGenerator` to use verbs like "brewed," "steeped," or "infused" for beverages, and "baked" or "chilled" for desserts.
        -   Modify `conceptGenerator` to produce narratives appropriate for the context (e.g., a snack's concept might focus on portability and energy).

4.  **Quality Assurance & Iteration:**
    *   For each dish type, generate a batch of 20+ outputs.
    *   Compare each output against its corresponding Golden Template.
    *   Refine data and logic until the quality is consistently high across all Air Nomad dish types.

---

## Phase 2: Horizontal Expansion (Mastering All Nations & Culinary Fusion)

**Goal:** Apply the methodology from Phase 1 to the Water Tribes, Earth Kingdom, and Fire Nation, giving each a distinct culinary identity, while simultaneously mastering the art of the **cross-nation fusion dish**.

**Methodology:** A massive content and data expansion effort, guided by the creation of new Golden Templates for each individual nation and for fusion concepts.

### Steps:

1.  **Golden Templates for Every Culture:**
    *   Create a `Main Course` Golden Template for the Water Tribes, Earth Kingdom, and Fire Nation. This will codify their unique "voice."
        *   **Fire Nation:** Disciplined, intense, dramatic, flavorful.
        *   **Earth Kingdom:** Hearty, traditional, sturdy, communal.
        *   **Water Tribes:** Fresh, spiritual, preserved, oceanic.
    *   Expand this to cover all other dish types for each nation.

2.  **Massive Data Entry & Worldbuilding:**
    *   This is the core of this phase. Go through `waterTribes.js`, `earthKingdom.js`, and `fireNation.js` and dramatically expand them.
    *   **Action Items:**
        *   Add dozens of new, culturally specific ingredients.
        *   Write large pools of nation-specific `servingTraditions` and `chefTips`.
        *   Massively expand the `loreLibrary` with stories and characters unique to each culture.

3.  **Mastering Culinary Fusion:**
    *   Improve the logic for handling dishes that draw from multiple nations to create truly unique fusion concepts.
    *   **Action Items:**
        *   Create fusion-specific templates for concepts and preparation that acknowledge the blend of cultures.
        *   Decide how to handle conflicting cultural styles (e.g., does a Fire/Water fusion dish tend towards spicy or soothing?).
        *   Ensure lore templates can reflect the meeting of two cultures, such as a story about the first Earth Kingdom chef in a Fire Nation colony.

---

## Phase 3: The Infinite Generator (Advanced Proceduralism)

**Goal:** Move beyond template-based generation to a more systemic, procedural approach that can create truly unique, "one-in-a-billion" outputs.

**Methodology:** Introduce new systems that can construct narrative elements from smaller "atoms" of data, rather than just combining pre-written sentences.

### Steps:

1.  **Dynamic Lore Engine:**
    *   Create systems to procedurally generate key nouns for lore.
        *   **Character Engine:** A simple system to generate names and roles (e.g., "Chef Jian," "Masteress Priya," "Poacher Oshi").
        *   **Event Engine:** Generate simple events (e.g., "during the Hundred Year War," "to celebrate the winter solstice," "as a dare between young benders").
    *   Create a grammar engine (e.g., a simple Tracery-like system) to combine these elements into unique lore sentences: `[character] first perfected this dish [event] after discovering that [ingredient1] could be combined with [ingredient2].`

2.  **Ingredient Synergy System:**
    *   Create explicit relationships between ingredients in the data files.
    *   **Action Items:**
        *   Add a `synergies` field to ingredients. For example, `Summit Ginseng` could have a synergy with `Moon Peach`.
        *   When a synergy is detected in a dish, it could unlock:
            *   A unique `lore_event` key.
            *   A special `flavor_bonus` phrase that gets added to the flavor notes.
            *   A guaranteed, specific `chefTip`.

3.  **Dynamic Template Modification:**
    *   Instead of just picking a static template, allow the generator to modify it based on context.
    *   **Action Items:**
        *   If the `theme` is 'Royal', automatically prepend adverbs like "masterfully" or "impeccably" to preparation verbs.
        *   If a `legendary` ingredient is present, add a clause to the `concept` text that specifically mentions its rarity and significance.

4.  **User-Facing Progression (Stretch Goal):**
    *   Create a system that uses the browser's `localStorage` to track a user's "discoveries."
    *   Certain rare ingredients or lore events could be "locked" until the user has generated a certain number of dishes or specific combinations, creating a long-term engagement loop and a feeling of personal progression. 

---

## Recommended plan of action according to Roadmap requirements

### PHASE 1: Air Nomad Vertical Perfection

**Step-by-step:**

1.  **Golden Template Expansion**
    *   For each Air Nomad dish type, hand-craft a "gold" prompt and document it.
    *   Annotate with what makes it perfect (see previous plan).

2.  **Context-Aware Data Expansion**
    *   For each new dish type:
        *   Add 5–10 new ingredients, traditions, tips, and lore hooks in `airNomads.js`.
        *   Tag ingredients for suitability (snack, dessert, beverage).
        *   Build synergies for future use.

3.  **Generator Logic Upgrades**
    *   Refactor all generator modules to take `dishType` and context into account.
    *   For beverages, use "brewed," "steeped," "infused," etc.
    *   For snacks: "portable," "energizing," etc.
    *   For desserts: "sweetened," "chilled," "delicately balanced," etc.

4.  **QA**
    *   Use batch generation and `goldenCompare.js` to ensure every output matches or exceeds the golds.
    *   Review and log edge cases.

### PHASE 2: Horizontal Expansion & Fusion

1.  **Golden Templates For Each Nation**
    *   Hand-write main course, snack, dessert, beverage "gold" templates for each culture.
    *   Document nation-specific culinary themes and values (e.g., "Fire Nation food is dramatic, full of heat, often with ritualized preparation and fire symbolism").

2.  **Data Expansion**
    *   Build deep ingredient, tradition, and lore pools for each nation.
    *   For fusion: Tag ingredients as "fusion-friendly" and note likely pairings.

3.  **Fusion Logic**
    *   Add "fusion templates" in `procedural/`, and logic in generator modules.
    *   When two nations are chosen, blend the voice, ingredients, rituals, and possible flavor/lore events.
        *   e.g., "This Fire/Earth dumpling brings together smoky chilies and starchy mountain roots, traditionally served at the Autumn Equinox festival in Ba Sing Se's Lower Ring."

### PHASE 3: Infinite Proceduralism

1.  **Dynamic Lore Engine**
    *   Build a simple engine (`dynamicLoreEngine.js`) using "narrative atoms": characters, events, places, culinary inventions.
    *   Use Tracery, template grammars, or custom logic to combine data into unique, one-off microstories.
        *   e.g., "Chef Hana first prepared this soup during a monsoon at the Northern Water Tribe, after discovering that cloudberries and ocean kelp were a perfect pairing."

2.  **Ingredient Synergy System**
    *   For every ingredient, add an array of synergies in its data entry.
    *   When generator detects a synergy in a dish, it triggers:
        *   Special flavor phrase
        *   Unique lore event
        *   Specific chef's tip, tradition, or preparation step

3.  **Dynamic Template Modifiers**
    *   Add hooks for theme (e.g., "Royal", "Festival", "Spirit World").
    *   Rare/legendary ingredient triggers: extra lines in concept, lore, or flavor notes.

4.  **User Progression/Discovery System**
    *   On every generation, log rare finds to `localStorage`.
    *   Build a simple "discovery page" UI so users can track their personal culinary adventures ("You've unlocked 3/7 Legendary Air Nomad Ingredients!").
    *   "Locked" lore/ingredient combos encourage deeper exploration.

### Best Practices for Devs/Contributors
*   Never add templates/data without cross-checking against golden standards.
*   Expand hand-written golds with each new theme, season, or nation before proceduralizing.
*   Batch-test and log every major update for edge cases, low-quality outputs, or broken logic.
*   Document every rare/event/legendary trigger in comments and in a dev-facing markdown.
*   Whenever the procedural system can't match a gold, analyze why—refactor the procedural system, not the gold. 