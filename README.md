# Glib

Chords, Riffs, and Wisdom—documented for the modern player.

## Development

```bash
pnpm install
pnpm dev
```

## Quality checks

```bash
pnpm lint:deps
pnpm lint:content
pnpm check
pnpm build
```

## Project structure

- `src/content/docs`: Starlight pages (theory, chords, licks).
- `src/components/react`: Interactive React components (e.g., `ChordBox`).
- `src/components/astro`: Static-friendly Astro wrappers (e.g., `Tablature`).
- `src/content/config.ts`: Frontmatter schema for typed content.
- `src/styles/global.css`: Starlight theme and dark-mode visual tuning.
- `public/icons`: PWA application icons used by the web manifest.
- `scripts/validate-content.mjs`: fast frontmatter validation for docs content.
