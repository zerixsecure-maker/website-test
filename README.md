# Zerix Securities — Website

Light-theme, animated marketing site for Zerix Securities. Built with [Astro](https://astro.build).

## Run locally
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Deploy (Vercel)
Import this repo at vercel.com/new. Framework preset is auto-detected as **Astro**; no settings needed.
Every push to `main` redeploys; every other branch gets its own preview URL.

## Structure
- `src/pages/` — one file per page (`index.astro` is the home page)
- `src/layouts/Base.astro` — shared `<head>`, fonts, scroll-reveal script
- `src/styles/global.css` — design tokens (colours from the logo) and all styles
- `public/logo.png` — logo / favicon
