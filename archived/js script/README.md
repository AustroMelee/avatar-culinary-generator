# Avatar: The Last Airbender Food Generator

## Overview

A web-based creative tool for generating fictional dish concepts inspired by the world of 'Avatar: The Last Airbender' and 'The Legend of Korra.'

**[Live Version &rarr;](https://your-live-url-here.com)** _(Link not active, placeholder for deployment)_

## Project Structure

This project is built with vanilla JavaScript, HTML, and CSS, with a focus on a clean, modular architecture.

- `index.html`: The main entry point and user interface.
- `styles/`: Contains all CSS for styling the application.
- `src/`: Contains all the JavaScript source code.
  - `main.js`: The primary script that handles UI events and orchestrates the generation process.
  - `core/`: Core Logic (`src/core`)
  - `utils/`: Utility Modules (`src/utils`)
  - `types.js`: JSDoc type definitions for code clarity and consistency.
- `docs/`: High-level project documentation.
- `changelogs/`: A log of all major changes and refactors.

For a more detailed breakdown of the project architecture, see the [**Project Overview Document**](./docs/PROJECT_OVERVIEW.md).

## How to Run Locally

1.  Clone this repository to your local machine.
2.  Open the `index.html` file in your web browser.

No special builds or dependencies are required.

## Updating Documentation

To regenerate this README file after making changes to module documentation or the project manifest, run the following command from the project root:

```
node scripts/generate-readme.js
```

## Contributing

This project is open to contributions. If you have ideas for new ingredients, themes, or features, please feel free to open an issue or submit a pull request. The data is designed to be easily extensible—new ingredients can be added by simply editing the files in the `src/core/data/` directory.
