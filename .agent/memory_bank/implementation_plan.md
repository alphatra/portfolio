# System & Content Upgrade Plan

## 1. i18n System Optimization
**Problem**: User reports lag/delay in translation.
**Analysis**: The current `useSyncExternalStore` is efficient, but the dictionary lookup happens on every render.
**Solution**:
- Refactor `src/i18n/index.ts` to ensure immediate updates.
- Verify that `t` and `ta` are memoized correctly.
- Add a "transition" state to smooth out the switch (visual feedback).

## 2. Accessibility Suite Upgrade
**Goal**: Make it "super customizable".
**Features to Add**:
- **Dyslexia Friendly Font**: Toggle to switch to a dyslexia-friendly font (e.g., OpenDyslexic or a sans-serif fallback).
- **Saturation Control**: Grayscale / High Saturation modes.
- **Cursor Size**: Large cursor option.
- **Line Height**: Adjustable line spacing.
- **UI**: Redesign the menu to be a nice glassmorphism panel.

## 3. "Scientific" About Me
**Goal**: Reflect "Physics + AI" aspirations.
**Content Strategy**:
- Use metaphors connecting Physics (Entropy, Quantum mechanics) with AI (Neural Nets, Optimization).
- Structure: "The Singularity of Code & Matter" -> "Research" -> "Engineering".
- Tone: Academic, visionary, yet grounded.

## 4. Visual Polish (Projects, Blog, Guestbook)
**Goal**: Match the new "Premium Dark/Glass" aesthetic.
**Changes**:
- **Projects**: Update cards to use `BentoCard` style (glass, glow).
- **Blog**: Redesign the list view to look like a research journal or futuristic data feed.
- **Guestbook**: Make it look like a digital terminal or a glass tablet.

## Execution Order
1.  **i18n Fix**: Optimize the core engine.
2.  **Accessibility**: Implement the new menu and global class logic.
3.  **Content**: Rewrite `AboutMe.tsx`.
4.  **Design**: Update the remaining sections.
