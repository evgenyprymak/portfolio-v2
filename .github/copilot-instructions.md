# Repo-specific instructions for AI coding assistants

This file contains focused, actionable guidance for an AI coding agent working in this repository. Follow these rules to be productive and make minimal safe changes.

1. High-level architecture
   - This is a single-page React app built with Vite + TypeScript. See `vite.config.ts` (base path `/portfolio/`) and `package.json` scripts (`dev`, `build`, `preview`).
   - Routing: `src/App.tsx` uses `react-router-dom` (HashRouter). Main routes live in `src/` (e.g., `MainPage.tsx`, various `ProjectDetails*.tsx`).
   - Components: Reusable UI components are under `src/components/`. Many components are small function components styled with CSS files under `src/css/` (e.g., `Header.tsx`, `CanvasRippleCard.tsx`, `ImageGallery.tsx`).
   - Static assets: images and fonts are under `public/` and `public/assets/`. Vite serves `public/` as static root; `vite.config.ts` sets `base: '/portfolio/'` so builds assume the site will be hosted under `/portfolio/`.

2. Build / dev / deployment
   - Local dev with HMR: npm run dev (executes `vite`).
   - Full build: npm run build runs `tsc -b && vite build`. TypeScript project builds are enabled (see `tsconfig.*.json`).
   - Preview production build: npm run preview.
   - Clean: npm run clean (uses `rimraf dist`).
   - Deploy: npm run deploy (uses `gh-pages -d dist`). The `homepage` in package.json points to the GitHub Pages path `https://evgenyprymak.github.io/portfolio/`.

3. Project-specific conventions and patterns
   - Hash routing: `App.tsx` uses `HashRouter` instead of BrowserRouter. Keep this in mind when adding routes or linking.
   - CSS by-component: Components import specific CSS files from `src/css/` (e.g., `import '../css/Header.css'`). Avoid moving or bundling styles differently unless updating imports.
   - Public assets usage: components often reference assets using relative paths that map to `public/` (for example `assets/procedural/` — see `ImageGallery.tsx` where basePath defaults to `'assets/procedural/'`). When adding images, add them to `public/assets/...` and reference them with the same relative path.
   - Complex visual components: `CanvasRippleCard.tsx` contains hand-written WebGL and canvas code. Small changes here can easily break rendering; prefer minimal, well-tested edits and keep behavior behind feature flags if possible.
   - Accessibility: some components set ARIA attributes (e.g., `CanvasRippleCard` uses role/group and `aria-label`). Preserve or improve ARIA when modifying UI.
   - Language/comments: There are comments in Russian in several files; treat them as documentation and do not remove without understanding.

4. TypeScript and linting
   - TypeScript is enabled and built before Vite build (`tsc -b`). Check `tsconfig.app.json` and `tsconfig.node.json` if you need to adjust type roots or project references.
   - Lint: `npm run lint` runs ESLint; project includes `eslint.config.js`. Respect existing ESLint rules when adding code.

5. Testing and verification steps for changes
   - Quick dev verification:
     - Start dev server: `npm run dev`.
     - Open app at the local origin shown by Vite (HashRouter routes require `#` prefixed paths).
   - Production verification:
     - Build: `npm run build`. This runs TypeScript build then Vite build.
     - Preview: `npm run preview` and open the preview URL.
   - If you change TS config or adds new types, run `npm run build` to surface type errors.

6. Common files to reference for examples
   - `src/App.tsx` — routing setup and entrypoints for pages.
   - `src/main.tsx` — React entry and root render.
   - `vite.config.ts` — base path and plugin config.
   - `package.json` — scripts and dependencies.
   - `src/components/CanvasRippleCard.tsx` — example of complex canvas/WebGL logic; copy patterns (refs, requestAnimationFrame cleanup, resize handler) if adding similar code.
   - `src/components/ImageGallery.tsx` — example of framer-motion, react-intersection-observer, and component-level animation triggers.

7. Safe-edit checklist (apply before committing changes)
   - Run `npm run build` locally; fix any TypeScript errors.
   - Run `npm run lint` and address new lint issues.
   - Smoke test dev server (`npm run dev`) for UI regressions on changed pages.
   - If modifying public assets, ensure paths match `public/assets/*` and update any referencing components.

8. Examples of common changes and how to implement them
   - Add a new route/page:
     - Create `src/NewPage.tsx` exporting a default React component.
     - Add an entry in `src/App.tsx` routes (use HashRouter path). Keep routes consistent with existing numeric project routes.
   - Add images for `ImageGallery`:
     - Place files under `public/assets/procedural/`.
     - Update `src/components/ImageNamesProcedural.tsx` (or the `ImageNames` list) to include file names.
   - Small UI change in `CanvasRippleCard`:
     - Limit edits to non-GL helper code (layout or props) and avoid changing shader code unless you can fully test WebGL rendering in dev and preview.

9. When you're uncertain
   - If a requested change touches complex rendering (WebGL) or global build config, propose a small, reversible PR with a focused test page.
   - Ask the repo owner for clarifications when changing deployment base path or TS project references—these affect builds and GitHub Pages deployment.

---

If you'd like, I can iterate on this file to add more specific code examples or pre-approved quick-fixes (e.g., updating React or Vite config). What would you like me to add or clarify?