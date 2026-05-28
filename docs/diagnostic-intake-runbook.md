# 02Signal Kiirkontrolli Andmevoog

Staatus: esimene tootmiskõlblik skelett.

Eesmärk: inimene ei tohi kaduma minna ka siis, kui ta küsimustikku lõpuni ei täida või e-maili saatmine ebaõnnestub.

## Otsus

Kasutame esimeses versioonis seda voogu:

```text
02signal.ai kiirkontroll
-> Supabase Edge Function
-> Supabase tabelid
-> Resend teavitus 02Signalile
-> hiljem n8n-ops järeltegevused
```

Mitte kasutada päris kliendiandmete jaoks koolituse n8n-i `n8n.02signal.com`. See on õppijate ja koolituse tööpind. AMOS-i standardi järgi on `n8n-ops` sisemine operatiivne orkestreerija, mitte avalik esimene vastuvõtupunkt.

## Miks nii

- Andmebaas on esimene tõde: kui Resend ei saada, jääb kontakt alles.
- `started` sündmus salvestab kontakti kohe pärast `Alusta` vajutust.
- `completed` sündmus lisab skoori, vastused ja kokkuvõtte.
- Resend saadab ainult teavituse, mitte ei ole andmete hoidmise koht.
- Secret’id jäävad Supabase Edge Functioni keskkonda, mitte brauserisse.

## Mis on repos valmis

```text
supabase/migrations/20260528190000_diagnostic_intake.sql
supabase/functions/diagnostic-intake/index.ts
supabase/config.toml
```

Tabelid:

- `diagnostic_leads`: üks rida inimese kohta, uuendatakse `lead_id` järgi.
- `diagnostic_events`: sündmuste logi, näiteks `started`, `completed`, `completed_resend`.

RLS on mõlemal tabelil sees ja avalikke poliitikaid ei ole. Brauser ei kirjuta otse tabelisse. Kirjutab ainult serveripoolne Edge Function service-role õigusega.

## Seadistuse sammud

1. Loo Supabase projekt.

   Soovituslik nimi: `02signal-production`.

2. Paigalda või ava Supabase CLI.

   Kontroll:

   ```bash
   supabase --version
   ```

3. Logi CLI-ga sisse.

   ```bash
   supabase login
   ```

4. Seo repo Supabase projektiga.

   ```bash
   supabase link --project-ref <SUPABASE_PROJECT_REF>
   ```

5. Rakenda andmebaasi migratsioon.

   ```bash
   supabase db push
   ```

6. Loo lokaalne secretite fail. Seda ei commit’ita.

   Fail:

   ```text
   supabase/.env.diagnostic.local
   ```

   Sisu:

   ```bash
   SUPABASE_URL=https://<SUPABASE_PROJECT_REF>.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<supabase-service-role-key>
   RESEND_API_KEY=<resend-api-key>
   NOTIFY_EMAIL=info@02signal.ai
   EMAIL_FROM=02Signal <info@02signal.ai>
   ALLOWED_ORIGINS=https://02signal.ai,https://www.02signal.ai
   IP_HASH_SALT=<long-random-string>
   ```

   Ära lisa `TURNSTILE_SECRET_KEY` enne, kui veebilehele on Cloudflare Turnstile widget lisatud.

7. Laadi secret’id Supabase Edge Functioni.

   ```bash
   supabase secrets set --env-file supabase/.env.diagnostic.local
   ```

8. Deploy Edge Function.

   ```bash
   supabase functions deploy diagnostic-intake --no-verify-jwt
   ```

9. Lisa Vercelis avalik endpoint.

   Vercel project -> Settings -> Environment Variables:

   ```text
   PUBLIC_DIAGNOSTIC_WEBHOOK_URL=https://<SUPABASE_PROJECT_REF>.functions.supabase.co/diagnostic-intake
   ```

   See väärtus on avalik URL. Secret’e seal ei ole.

10. Redeploy Vercelis.

## Test

Testi kõigepealt `started` sündmust:

```bash
curl -i \
  -H "content-type: application/json" \
  -H "origin: https://02signal.ai" \
  -d '{
    "eventType": "started",
    "leadId": "manual-test-001",
    "language": "et",
    "pagePath": "/et/kiirkontroll/",
    "company": "Test OÜ",
    "person": "Test Kasutaja",
    "email": "test@example.com",
    "phone": "+372 5555 0000",
    "privacyConsent": true
  }' \
  https://<SUPABASE_PROJECT_REF>.functions.supabase.co/diagnostic-intake
```

Oodatav vastus:

```json
{"ok":true,"stored":true,"emailSent":false}
```

Seejärel testi `completed` sündmust:

```bash
curl -i \
  -H "content-type: application/json" \
  -H "origin: https://02signal.ai" \
  -d '{
    "eventType": "completed",
    "leadId": "manual-test-001",
    "language": "et",
    "pagePath": "/et/kiirkontroll/",
    "company": "Test OÜ",
    "person": "Test Kasutaja",
    "email": "test@example.com",
    "phone": "+372 5555 0000",
    "privacyConsent": true,
    "totalScore": 62,
    "level": {
      "title": "Sobib tööde ülevaatus",
      "text": "Teil on mõni koht, kus AI võib aidata, aga esimene töö tuleb hoolikalt valida."
    },
    "dimensionScores": [
      {"title": "Korduv töö", "score": 75},
      {"title": "Teadmised", "score": 60}
    ],
    "answers": {"q1": 3}
  }' \
  https://<SUPABASE_PROJECT_REF>.functions.supabase.co/diagnostic-intake
```

Oodatav tulemus:

- `diagnostic_leads` tabelis on üks `manual-test-001` rida staatusega `completed`;
- `diagnostic_events` tabelis on kaks rida;
- `NOTIFY_EMAIL` aadressile tuleb Resend teavitus;
- kui Resend ebaõnnestub, jääb Supabase’i rida alles.

## Turvareeglid

- Supabase service-role key ei lähe Vercelisse ega frontend’i.
- Resend API key ei lähe Vercelisse ega frontend’i.
- RLS jääb sisse, avalikke tabelipoliitikaid ei lisata.
- `ALLOWED_ORIGINS` peab tootmises olema ainult `https://02signal.ai,https://www.02signal.ai`.
- `IP_HASH_SALT` peab olema pikk juhuslik väärtus ja seda ei commit’ita.
- Kliendiandmeid ei saadeta koolituse n8n-i.
- n8n kasutatakse hiljem järeltegevuseks: päevakokkuvõte, CRM-i rida, meeldetuletus, mitte esimese andmehoidlana.

## Järgmine samm

Pärast esimese live-testi õnnestumist lisame:

1. Cloudflare Turnstile roboti vastu.
2. Supabase view pooleli jäänud kontaktide jaoks.
3. n8n-ops päevakokkuvõtte: uued `started` ja `completed` read -> üks rahulik email või Telegram sõnum.
4. Lihtsa admin-vaate, kust saab tulemusi lugeda ilma Supabase dashboard’i avamata.
