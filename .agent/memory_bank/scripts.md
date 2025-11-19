# Scripts & Commands

## NPM Scripts (`package.json`)

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `astro dev` | Starts the local development server. |
| `build` | `astro build` | Builds the site for production. |
| `preview` | `astro preview` | Previews the production build locally. |
| `astro` | `astro` | Runs the Astro CLI directly. |

## Development Workflow
1. **Start Dev Server**: `npm run dev`
2. **Build**: `npm run build`
3. **Preview**: `npm run preview`

## Deployment
- The project is configured for Vercel deployment (`@astrojs/vercel`).
- Pushing to the main branch likely triggers a Vercel build.
