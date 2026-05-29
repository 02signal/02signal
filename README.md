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

## Analytics

Google Analytics 4 is loaded only when `PUBLIC_GA_MEASUREMENT_ID` is set. The site shows a small analytics consent banner and stores the choice in `localStorage`.

Vercel environment variable:

```bash
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Keep private analytics or tag-manager secrets out of the frontend. Only public measurement IDs belong in `PUBLIC_*` variables.

Tracked GA4 events:

| Event | Meaning | PII |
|---|---|---|
| `service_page_view` | Visitor viewed a service or guide page. Includes `service_name`, `service_title`, `page_type`. | No |
| `kiirkontroll_start` | Visitor submitted contact consent and started the diagnostic questions. | No |
| `kiirkontroll_completed` | Visitor reached the diagnostic result. Includes score bucket and result level. | No |
| `lead_email_click` | Visitor clicked or submitted an email lead action. Includes source and selected non-PII options when available. | No |
| `phone_click` | Visitor clicked the public 02Signal phone number. | No |

## Content Model

The first page is a practical AI start-plan and small-assistant landing page. Shared copy lives in `src/data/site.ts`; page layout is assembled from reusable Astro components.

## Diagnostic Form Data Collection

The Estonian AI quick-check page is available at `/et/kiirkontroll/`.

The page first collects contact details and consent. When the visitor clicks `Alusta`, the page can send a `started` event to a webhook. When the visitor completes the diagnostic, it sends a `completed` event with the score and answers. This lets us keep both unfinished leads and completed reports.

By default it still works without a backend: after the visitor completes the form, the page calculates the report in the browser and opens an email fallback to `info@02signal.ai` with the score summary.

The current recommended production intake is Supabase Edge Function + Supabase tables + Resend notification. See the runbook:

```text
docs/diagnostic-intake-runbook.md
```

After deploying the Edge Function, add its public URL in Vercel:

```bash
PUBLIC_DIAGNOSTIC_WEBHOOK_URL=https://<SUPABASE_PROJECT_REF>.functions.supabase.co/diagnostic-intake
```

Payload event types:

- `started`: contact details, consent, generated `leadId`, timestamp, language, page path.
- `completed`: contact details, consent, same `leadId`, total score, level, dimension scores, raw answers.
- `completed_resend`: same as `completed`, sent when the visitor clicks the send button again.

Production workflow:

1. Supabase Edge Function receives the form payload.
2. Server-side code validates required fields, honeypot, consent, and optional Turnstile token.
3. Supabase stores the lead and diagnostic result using server-side credentials.
4. Resend sends the internal notification and optional customer confirmation.
5. If email sending fails, the database row still remains the source of truth.
6. n8n-ops can later process Supabase rows for daily digest or follow-up tasks.

Do not put private API keys in the frontend. The webhook URL is public by design; keep validation and any secret credentials inside Supabase Edge Function or another server-side service. Do not send real 02Signal lead data to the training n8n instance at `n8n.02signal.com`.
