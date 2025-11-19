# Design Modernization Plan

## Goal
Elevate the portfolio's aesthetic to be more "modern," "premium," and "interesting" by introducing advanced visual effects, better typography, and dynamic interactions.

## Proposed Changes

### 1. Typography Overhaul
- **Font**: Switch to **"Outfit"** (modern, geometric sans-serif) for headings and **"Inter"** for body text.
- **Implementation**: Import fonts in `src/layouts/Layout.astro` and update Tailwind theme.

### 2. Visual Effects (Glassmorphism & Glows)
- **Glassmorphism**: Update the `.card` utility in `src/styles/global.css` to use `backdrop-filter: blur()`, semi-transparent backgrounds, and subtle white borders.
- **Ambient Glows**: Add animated background blobs or mesh gradients behind the Hero and Bento Grid to create depth.

### 3. Hero Section Upgrade
- **Spotlight Effect**: Add a moving spotlight effect that follows the mouse (using `framer-motion` or CSS variables).
- **Dynamic Background**: Enhance the existing grid with a "mask" that fades out at edges or reacts to mouse movement.

### 4. Micro-interactions
- **Cards**: Add `hover:scale-[1.02]`, `hover:shadow-xl`, and border glow effects to all cards.
- **Buttons**: Add magnetic hover effects or "shimmer" borders.

## Implementation Steps
1.  **Fonts**: Update `Layout.astro` and `global.css`.
2.  **Global Styles**: Refine `.card` and add new utility classes for glows/glass.
3.  **Hero Component**: Refactor `Hero.tsx` to include the new visual effects.
4.  **Bento Cards**: Update `BentoCard.tsx` (and container) to use the new styles.

## Verification
- Visual inspection via `npm run dev`.
- Check responsiveness on mobile.
- Verify dark/light mode contrast.
