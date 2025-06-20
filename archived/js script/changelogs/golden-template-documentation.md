# Changelog: Golden Template Documentation

This update establishes a formal quality control process for the generator by creating a "Golden Standard" for output. This provides a clear benchmark to guide future development, data entry, and quality assurance.

## New Documentation Files

1.  **`src/templates/gold/AirNomad_MainCourse_GoldenPrompt.md`**
    -   Contains a hand-picked, high-quality example of a generated dish.
    -   This example is heavily annotated with comments explaining *why* each section is considered "gold standard" (e.g., sensory language, narrative coherence, worldbuilding depth).
    -   It serves as the definitive quality target for all generated content.

2.  **`src/templates/gold/GOLDEN_PROMPT_README.md`**
    -   Explains the purpose and methodology behind the golden templates.
    -   Provides clear instructions for developers and content creators on how to use these files for:
        -   **Quality Assurance:** Comparing new outputs against the benchmark.
        -   **Bug Reporting:** Providing a concrete example of where quality falls short.
        -   **Future Development:** Guiding the creation of new templates and data.
    -   Establishes the "Golden Templates" as a living document, to be updated as the generator's quality improves. 