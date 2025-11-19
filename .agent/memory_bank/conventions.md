# Coding Conventions

## Tech Stack Standards
- **Framework**: Astro (Static Site Generation + Islands Architecture).
- **UI**: React for interactive components.
- **Styling**: Tailwind CSS.

## Component Guidelines
- **File Naming**: PascalCase for components (e.g., `MyComponent.tsx`, `MyLayout.astro`).
- **Structure**:
  - Imports first.
  - Interfaces/Types.
  - Component definition.
  - Exports.
- **Styling**:
  - Use `clsx` or `cn` utility for conditional classes.
  - Use `tailwind-merge` to handle class conflicts.
  - Avoid inline styles; use Tailwind utility classes.

## State Management
- Use React `useState`/`useEffect` for local component state.
- Use Astro's static generation where possible to minimize client-side JS.

## Content
- Use Astro Content Collections (`src/content`) for structured data (blog posts, projects).
- Type-safe content querying.

## Internationalization
- Follow the patterns in `src/i18n` for adding new languages or strings.
