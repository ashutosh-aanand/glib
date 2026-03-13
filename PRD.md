# Product Requirements Document (PRD): Glib

## Project Overview
- **Project Name:** Glib (Guitar Library Repository)
- **Platform:** Progressive Web App (PWA) / Responsive Web
- **Current Status:** Architecture & Design Phase
- **Primary Tech Stack:** Astro, Starlight, React, Vite, Tailwind CSS, pnpm

## 1. Executive Summary
Glib is a high-performance, developer-centric progressive web application designed to act as a comprehensive reference manual for guitarists. Built on the Astro Starlight documentation framework, it replaces cluttered, ad-heavy tab websites with a clean, instantly searchable repository of guitar theory, interactive chord diagrams, tablatures, and curated video lessons.

## 2. Target Audience
- **Self-Taught Players:** Users needing a reliable, structured source of truth for technique and theory.
- **Working Musicians:** Players who need lightning-fast, offline access to reference materials (for example: chord voicings and scale boxes) during rehearsals or gigs.
- **Developer-Musicians:** Users who appreciate a clean IDE-like aesthetic and the ability to contribute via Markdown.

## 3. Core Features (MVP)

### 3.1 The Reference Library (Content Engine)
- **Theory Manual:** Markdown-based documentation explaining scales, modes, intervals, and the CAGED system.
- **Interactive Chord Registry:** MDX pages rendering dynamic SVG chord diagrams based on data objects, categorizing chords by root and quality.
- **Lick & Riff Database:** High-quality tablature rendered in responsive, horizontally scrollable code blocks, categorized by genre and difficulty.
- **Curated Video Index:** Embedded external video lessons (YouTube/Vimeo) mapped to specific concepts or licks, complete with exact timestamps.

### 3.2 Search & Navigation
- **Global Instant Search:** Millisecond-latency search powered by Pagefind (Starlight default), triggered via `Cmd/Ctrl + K`.
- **Hierarchical Sidebar:** Deeply nested, logical navigation (for example: `Library > Blues > Turnarounds > Level 1`).

### 3.3 PWA & Offline Capabilities
- **Offline Mode:** Comprehensive caching of MDX routes and SVG assets via `vite-plugin-pwa` so the app functions entirely without an internet connection.
- **Installability:** Add to Home Screen support with a custom manifest and branding.

## 4. Technical Architecture

### 4.1 The Tech Stack
- **Core Framework:** Astro 4.x
- **Documentation Engine:** `@astrojs/starlight`
- **Component Library:** React 18 (`@astrojs/react`) for interactive elements.
- **Styling:** Tailwind CSS plus custom typography for standardizing tab spacing.
- **Icons:** `lucide-react`
- **Build Tool & Dev Server:** Vite
- **Package Manager:** pnpm (mandatory for dependency efficiency)
- **Music Rendering:** `react-chords` (or equivalent) for fretboards; `alpha-tab` or custom `<Tablature>` wrappers for standard tabs.

### 4.2 Directory Structure
```text
src/
├── components/
│   ├── react/            # Interactive or complex UI (ChordBox, LickTab)
│   └── astro/            # Static wrappers (Tablature block)
├── content/
│   ├── config.ts         # Zod schemas defining data structures
│   └── docs/             # Starlight routing directory
│       ├── index.mdx     # Landing page
│       ├── theory/       # .md/.mdx files
│       ├── chords/       # .mdx files importing <ChordBox />
│       └── licks/        # .mdx files importing <LickTab />

astro.config.mjs          # Integrations: starlight, react, tailwind, pwa
tailwind.config.cjs
package.json
```

### 4.3 Data Schema (Zod)
All markdown/MDX content must adhere to strict frontmatter typing to ensure the database remains structured.

**Lick schema example:**
- `title`: string
- `description`: string
- `key`: string
- `difficulty`: enum (`Beginner`, `Intermediate`, `Advanced`)
- `tags`: array of strings
- `videoUrl`: URL string (optional)

## 5. UI / UX Guidelines
- **Design Philosophy:** Documentation for Guitarists. The UI should feel like Stripe Docs or a modern developer tool: high contrast, minimal distraction, and data-dense.
- **Theme:** Dark mode optimized by default to reduce eye strain during late-night practice sessions.
- **Responsiveness:** Tablature is notoriously difficult on mobile. All `<Tablature>` components must be wrapped in `overflow-x-auto` containers with strict monospace fonts to prevent line breaking.
- **Component Hydration:** Use Astro `client:visible` or `client:idle` directives for React components to maintain SSG speeds until user interaction is strictly necessary.

## 6. Non-Functional Requirements
- **Performance:** Must maintain a 95+ Lighthouse score across all categories (Performance, Accessibility, Best Practices, SEO).
- **Load Time:** First Contentful Paint (FCP) must be under 1.0 second.
- **Accessibility (a11y):** All SVGs must contain proper `aria-label`s describing the chord or scale. Starlight's default semantic HTML structure must be maintained.

## 7. Future Roadmap (Post-MVP)
- **V2:** Interactive fretboard quizzes (identifying notes/intervals).
- **V3:** Open-source contribution pipeline allowing users to submit new licks via GitHub pull requests.
- **V4:** MIDI integration allowing users to connect digital instruments to track practice accuracy.
