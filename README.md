# 02Signal Website

Public website and conversion landing pages for 02Signal.

## Stack

- Astro
- TypeScript
- Static output for Vercel
- Multilingual routes: Estonian, English, Russian

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Connect this repository to Vercel and set the production domain to `02signal.ai`.

Recommended Vercel settings:

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`

## Content Model

The first page is an AI pilot process-audit landing page. Shared copy lives in `src/data/site.ts`; page layout is assembled from reusable Astro components.
