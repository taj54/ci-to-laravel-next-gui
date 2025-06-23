# CI to Laravel Migration Interface

**Version: v1.0.0**

This project provides a web-based interface to connect with the Outbase Conversion App for migrating CodeIgniter projects to Laravel. It is built with [Next.js](https://nextjs.org), React, and Material UI.

## Overview

- **Not a standalone migration tool.**  
  This interface connects to the Outbase Conversion App backend, which performs the actual migration logic.

## Features

- Upload your CodeIgniter project as a `.zip` file.
- Automatic detection of CodeIgniter version.
- Configure Laravel project name, version, and Sail installation.
- Start migration and view detailed logs and results.
- User-friendly interface with step-by-step workflow.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ci-to-laravel-next-gui.git
   cd ci-to-laravel-next-gui
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend API

This tool expects a backend API (default: `http://127.0.0.1:8000/api/migration`) for migration logic. See [`src/utils/migrationApi.ts`](src/utils/migrationApi.ts) for API endpoints.

## Project Structure

- [`src/app`](src/app): Next.js app directory (pages, layout, styles)
- [`src/components`](src/components): React UI components
- [`src/hooks`](src/hooks): Custom React hooks for migration logic
- [`src/types`](src/types): TypeScript types and interfaces
- [`src/utils`](src/utils): Utility functions (API, fetch helpers)

## Customization

- Update API endpoints in [`src/utils/migrationApi.ts`](src/utils/migrationApi.ts) if your backend runs elsewhere.
- UI is built with Material UI and Tailwind CSS (see [`src/app/globals.css`](src/app/globals.css)).

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Lint code

## Authors

- Taj (tajulislamj200@gmail.com)
## License

MIT

---

© {year} Migration Tools Inc. All rights reserved.
