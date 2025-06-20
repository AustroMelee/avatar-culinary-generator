# Changelog: 2024-06-27 - Build & Path Fixes

This update addresses a critical build failure that was preventing successful deployment. The root cause was a series of incorrect relative import paths introduced during a previous refactor.

## Key Fixes:

- **Build Failure Resolution**: The primary build error was `Could not resolve './utils.js'`. This occurred in multiple files within the `src/core/` directory (`nameGenerator.js`, `descriptionGenerator.js`, `loreGenerator.js`).
    - **Cause**: The files were attempting to import from a `utils.js` file within their own directory (`./`), but the utility functions had either been moved or were no longer necessary (dead code).
    - **Solution**: Corrected the issue by removing the incorrect imports and all associated dead code from the affected modules. This resolved the module resolution errors and has allowed the project to be published successfully.

- **Documentation Update**: The `.cursorcontext` file has been updated with a "Common Pitfalls" section that specifically details this error, serving as a reminder to always verify relative paths during development. 