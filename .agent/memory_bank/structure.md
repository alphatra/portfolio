# Project Structure

## Directory Layout

### Root
- `astro.config.mjs`: Astro configuration.
- `tailwind.config.mjs`: Tailwind CSS configuration.
- `package.json`: Dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.
- `src/`: Source code.
- `public/`: Static assets (images, fonts, etc.).

### `src/`
- **`assets/`**: Static assets imported in code.
- **`components/`**: React and Astro components.
  - `magicui/`: Animated UI components.
  - `ui/`: Generic UI components (buttons, inputs).
  - Feature components: `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `BentoCard.tsx`, etc.
- **`content/`**: Content collections (Markdown/MDX files for blog/projects).
- **`i18n/`**: Internationalization logic and translation files.
- **`layouts/`**: Page layouts (e.g., `Layout.astro`).
- **`lib/`**: Utility functions and helpers.
- **`pages/`**: Application routes.
  - `index.astro`: Home page.
  - `about.astro`: About page.
  - `blog/`: Blog routes.
  - `projects/`: Project routes.
  - `api/`: API endpoints.
- **`styles/`**: Global CSS files (`index.css` etc.).

## Key Components
- **`Navbar`**: Main navigation.
- **`Footer`**: Site footer.
- **`Hero`**: Landing page hero section.
- **`BentoContainer` / `BentoCard`**: Grid layout for showcasing content.
- **`GlobeCard`**: Interactive 3D globe.
- **`ThemeToggle`**: Light/Dark mode switcher.

## Data Flow
- **Content**: Managed via Astro Content Collections (`src/content`).
- **State**: React state for interactive components; Astro handles static generation.
- **Styling**: Tailwind CSS utility classes + global styles in `src/styles`.
