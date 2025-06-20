# Documentation: Golden Prompt Templates

This folder contains "golden standard" examples of generated outputs. These files serve as the benchmark for quality and narrative depth that all new features and data should be measured against.

## How These Prompts Were Created

The examples in this folder are the result of a multi-stage refinement process:

1.  **Intensive Batch Review:** Generated dozens of outputs to identify common patterns, weaknesses, and grammatical awkwardnesses.
2.  **Iterative Template Writing:** Refactored the generator's templates (`flavorNotesGenerator`, `preparationGenerator`, etc.) based on the review, focusing on more sophisticated and flexible sentence structures.
3.  **Worldbuilding Integration:** Expanded the data files with more specific lore, cultural details, and sensory notes to provide the generator with richer material to work with.
4.  **Layered Logic:** Implemented systems for context-aware generation, such as:
    *   Prioritizing special lore for rare ingredient combinations.
    *   Creating fallback systems for traditions and tips (special -> nation-specific -> generic).
    *   Highlighting rare ingredients in the UI and flavor notes.

## How to Use These Files

These files are the ultimate reference for quality assurance.

-   **When Adding/Editing Data:** After adding new ingredients or modifying templates, generate a few examples. Compare them against the relevant golden prompt. Does the new output "sing" at the same level? Is it as evocative, grammatically correct, and narratively coherent? If not, continue refining.
-   **For QA and Bug Reporting:** Use these files as a baseline for bug reports. Instead of saying "the output is weird," you can say, "The generated preparation description for this dish falls below the standard of the Golden Template because..." This provides a clear, actionable issue.
-   **As a Living Document:** As the generator improves, new outputs may surpass the quality of the current golden examples. When a truly exceptional dish is generated, add it to this folder (or replace an existing one) to set a new, higher standard for the project. 