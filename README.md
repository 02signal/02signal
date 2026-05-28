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

The page first collects contact details and consent. When the visitor clicks `Alusta`, the page can send a `started` event to a webhook. When the visitor completes the diagnostic, it sends a `completed` event with the score and answers. This lets us keep both unfinished leads and completed reports.

By default it still works without a backend: after the visitor completes the form, the page calculates the report in the browser and opens an email fallback to `info@02signal.ai` with the score summary.

For collection, add a public webhook URL in Vercel:

```bash
PUBLIC_DIAGNOSTIC_WEBHOOK_URL=https://n8n.example.com/webhook/...
```

Payload event types:

- `started`: contact details, consent, generated `leadId`, timestamp, language, page path.
- `completed`: contact details, consent, same `leadId`, total score, level, dimension scores, raw answers.
- `completed_resend`: same as `completed`, sent when the visitor clicks the send button again.

Fast MVP workflow:

1. Webhook Trigger receives JSON from the page.
2. Store `started` and `completed` rows in Supabase or Google Sheets.
3. Send a notification email to `info@02signal.ai`.
4. Optional: email a short thank-you message to the respondent.

Recommended production workflow:

1. Public webhook or Supabase Edge Function receives the form payload.
2. Server-side code validates required fields, honeypot, consent, and optional Turnstile token.
3. Supabase stores the lead and diagnostic result using server-side credentials.
4. Resend sends the internal notification and optional customer confirmation.
5. If email sending fails, the database row still remains the source of truth.

Do not put private API keys in the frontend. The webhook URL is public by design; keep validation and any secret credentials inside n8n, a Vercel server function, or a Supabase Edge Function.
