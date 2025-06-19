const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

/**
 * Reads the first H1 heading from a markdown file to use as a summary.
 * @param {string} filePath - The path to the markdown file, relative to the project root.
 * @returns {string} The extracted summary text.
 */
const getSummaryFromReadme = (filePath) => {
  const fullPath = path.join(projectRoot, filePath);
  if (!fs.existsSync(fullPath)) return '';
  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    const firstLine = content.split('\n')[0];
    // Extracts text from markdown H1, e.g., "# Core Logic (`src/core`)" -> "Core Logic (`src/core`)"
    const match = firstLine.match(/^#\s+(.*)/);
    return match ? match[1] : firstLine;
  } catch (error) {
    console.error(`Error reading summary from ${filePath}:`, error);
    return '';
  }
};

/**
 * Main function to generate the project's README.md.
 */
const generateReadme = () => {
  try {
    // 1. Read project metadata from the manifest file
    const manifestPath = path.join(projectRoot, 'docs', 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    // 2. Build module descriptions from their own README files
    const coreDesc = getSummaryFromReadme('src/core/README.md');
    const utilsDesc = getSummaryFromReadme('src/utils/README.md');

    // 3. Assemble the README content from a template
    const readmeContent = `# ${manifest.projectName}

## Overview

${manifest.description}

**[Live Version &rarr;](${manifest.liveUrl})** *(Link not active, placeholder for deployment)*

## Project Structure

This project is built with vanilla JavaScript, HTML, and CSS, with a focus on a clean, modular architecture.

-   \`index.html\`: The main entry point and user interface.
-   \`styles/\`: Contains all CSS for styling the application.
-   \`src/\`: Contains all the JavaScript source code.
    -   \`main.js\`: The primary script that handles UI events and orchestrates the generation process.
    -   \`core/\`: ${coreDesc}
    -   \`utils/\`: ${utilsDesc}
    -   \`types.js\`: JSDoc type definitions for code clarity and consistency.
-   \`docs/\`: High-level project documentation.
-   \`changelogs/\`: A log of all major changes and refactors.

For a more detailed breakdown of the project architecture, see the [**Project Overview Document**](./docs/PROJECT_OVERVIEW.md).

## How to Run Locally

1.  Clone this repository to your local machine.
2.  Open the \`index.html\` file in your web browser.

No special builds or dependencies are required.

## Updating Documentation

To regenerate this README file after making changes to module documentation or the project manifest, run the following command from the project root:
\`\`\`
node scripts/generate-readme.js
\`\`\`

## Contributing

${manifest.contributing}
`;

    // 4. Write the assembled content to the root README.md file
    fs.writeFileSync(path.join(projectRoot, 'README.md'), readmeContent.trim());

    console.log('✅ README.md generated successfully!');
  } catch (error) {
    console.error('❌ Failed to generate README.md:', error);
  }
};

generateReadme();
