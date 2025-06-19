# Avatar Food Generator - Project Overview

## 1. Project Goal

The primary goal of this project is to create a web-based, procedural generator that creates fictional dish concepts inspired by the world of "Avatar: The Last Airbender" and "The Legend of Korra." The generator aims for a high degree of creativity, thematic consistency, and user interactivity, producing not just a name but a concept, a list of ingredients, and a piece of lore for each dish.

## 2. Core Features

- **Procedural Dish Generation**: The application procedurally generates a dish based on user selections.
- **Multi-Nation Fusion**: Users can select one or more nations to inspire the dish, allowing for culinary fusion (e.g., a Fire Nation / Earth Kingdom collaboration).
- **Thematic Influence**: Users can select a "theme" (e.g., "Ancient," "Spirited," "Modern") that influences the generated name, description, and lore.
- **Detailed Output**: Each generation produces:
  - A **Dish Name**: Stylistically appropriate for the selected nations.
  - A **Concept**: A short, evocative description of the dish.
  - An **Ingredient List**: The specific components of the dish.
  - **Flavor Notes**: A brief on the dish's taste profile.
  - **Lore**: A small story or historical note about the dish's origins.
- **Seeded Generation**: The generator supports a seeded pseudo-random number generator via a `?seed=your_seed` URL parameter for reproducible results and debugging.

## 3. Technical Architecture

The project is a modern, front-end application built with vanilla JavaScript (ES Modules). The architecture emphasizes separation of concerns and maintainability.

- **Build Tool**: The project uses **Vite** for its development server and production builds. This provides features like Hot Module Replacement (HMR) and optimized build outputs.
- **Directory Structure**:
  - `src/core/`: Contains the main business logic for generation (`dishGenerator.js`, `nameGenerator.js`, etc.).
  - `src/core/data/`: Houses all the raw data for the generator. Nation-specific data (ingredients, etc.) is broken down into individual files (e.g., `fireNation.js`), while generic data (themes, lore) resides in its own modules.
  - `src/utils/`: Contains helper functions for DOM manipulation (`domUtils.js`) and randomization (`random.js`).
  - `src/`: The root source directory, containing the main entry point (`main.js`) and type definitions (`types.js`).
- **Path Aliases**: To simplify imports, the project is configured with path aliases (e.g., `@core/`, `@data/`) managed by Vite.
- **Data-Driven Design**: The generator's logic is heavily reliant on the structured data in `src/core/data/`. The creative output comes from combining these data points in novel ways, rather than hardcoded logic. All nation data is exported via a single barrel file (`@data/index.js`) for easy consumption by the core logic.
- **Code Style & Formatting**: Code consistency is enforced by **Prettier**, with rules defined in `.prettierrc.json`. An `.editorconfig` file ensures consistent editor settings.

## 4. How to Run the Project

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run the Development Server**:

    ```bash
    npm run dev
    ```

    This will start the Vite development server, typically available at `http://localhost:5173`.

3.  **Format Code**:
    ```bash
    npm run format
    ```
    This will automatically format all project files according to the Prettier rules.

## 5. How to Contribute

Please refer to the `.cursorcontext` file in the project root. It contains detailed guidelines for contributing, including step-by-step instructions for adding new ingredients and a summary of the architectural patterns to follow.
