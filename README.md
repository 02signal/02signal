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

## Diagnostic Form Data Collection

The Estonian self-diagnostic page is available at `/et/kiirkontroll/`.

By default it works without a backend: after the visitor completes the form, the page calculates the report in the browser and opens an email to `info@02signal.ai` with the score summary.

For database collection, add a public n8n webhook URL in Vercel:

```bash
PUBLIC_DIAGNOSTIC_WEBHOOK_URL=https://n8n.example.com/webhook/...
```

Recommended n8n workflow:

1. Webhook Trigger receives JSON from the page.
2. Google Sheets node appends one row with contact details, total score, five dimension scores, and timestamp.
3. Email node sends the report summary to `info@02signal.ai`.
4. Optional: email a short thank-you message to the respondent.

Do not put private API keys in the frontend. The webhook URL is public by design; keep validation and any secret credentials inside n8n.
