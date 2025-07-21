# Developer Guide

**Version: v1.0.0**

This guide provides technical details for developers working on the CI to Laravel Migration Interface. For a general overview, see the [`README.md`](README.md).

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Frontend Development](#frontend-development)
  - [Technologies](#technologies)
  - [Components](#components)
  - [Hooks](#hooks)
  - [Styling](#styling)
- [API Interaction](#api-interaction)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ci-to-laravel-next-gui.git
    cd ci-to-laravel-next-gui
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

The project follows a standard Next.js App Router structure:

-   `.next/`: Next.js build output.
-   `node_modules/`: Project dependencies.
-   `public/`: Static assets (images, fonts).
-   `src/`: Source code.
    -   `app/`: Next.js App Router directory.
        -   `layout.tsx`: Root layout component.
        -   `page.tsx`: Main application page.
        -   `globals.css`: Global styles (Tailwind CSS).
    -   `components/`: Reusable React components.
    -   `hooks/`: Custom React hooks for business logic.
    -   `types/`: TypeScript type definitions.
    -   `utils/`: Utility functions, including API communication.
-   `eslint.config.mjs`: ESLint configuration.
-   `next.config.ts`: Next.js configuration.
-   `postcss.config.mjs`: PostCSS configuration (for Tailwind CSS).
-   `tsconfig.json`: TypeScript configuration.

## Frontend Development

### Technologies

-   **Framework:** [Next.js](https://nextjs.org) (App Router)
-   **UI Library:** [React](https://react.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **UI Components:** [Material-UI (MUI)](https://mui.com/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)

### Components

-   `DetectedVersionBanner.tsx`: Displays the detected CodeIgniter version.
-   `ErrorAlert.tsx`: A generic component for displaying error messages.
-   `MigrationForm.tsx`: The main form for configuring migration options (Laravel version, project name, etc.).
-   `MigrationResult.tsx`: Displays the results of the migration, including logs and download links.
-   `UploadStep.tsx`: The initial component for uploading the CodeIgniter project `.zip` file.

### Hooks

Custom hooks encapsulate the application's logic and state management.

-   `useUploadAndDetect.ts`: Handles the file upload and sends it to the backend to detect the CodeIgniter version.
-   `useStartMigration.ts`: Manages the state and logic for starting the migration process with the configured options.
-   `useMigration.ts`: The main hook that orchestrates the entire migration flow, combining the upload, detection, and migration steps.

### Styling

Styling is handled using a combination of Material-UI components and Tailwind CSS utility classes.

-   **Material-UI:** Provides the core component library (Buttons, TextFields, etc.).
-   **Tailwind CSS:** Used for layout, spacing, and custom styling. Global styles and Tailwind directives are defined in `src/app/globals.css`.

## API Interaction

All communication with the backend migration API is centralized in `src/utils/migrationApi.ts`. This file defines the functions for each API endpoint.

-   **`detectVersion(formData)`**: Uploads the project zip to detect the CI version.
-   **`startMigration(options)`**: Starts the migration with user-defined settings.
-   **`getMigrationStatus(id)`**: Polls for the migration status.
-   **`getMigrationResult(id)`**: Fetches the final migration result.

The `fetchWithTimeout` utility in `src/utils/fetchWithTimeout.ts` is used to prevent indefinite network requests.

If the backend API URL changes, update the `API_BASE_URL` constant in `src/utils/migrationApi.ts`.

## Scripts

-   `npm run dev`: Start the development server.
-   `npm run build`: Create a production-ready build.
-   `npm run start`: Start the production server.
-   `npm run lint`: Run ESLint to check for code quality and style issues.

## Contributing

We welcome contributions! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes and push them to your fork.
4.  Open a pull request with a clear description of your changes.

## License

This project is released under the [MIT License](LICENSE).
