type IntakePayload = {
  eventType?: string;
  leadId?: string;
  submittedAt?: string;
  language?: string;
  pagePath?: string;
  company?: string;
  person?: string;
  email?: string;
  phone?: string;
  privacyConsent?: boolean;
  totalScore?: number;
  level?: {
    title?: string;
    text?: string;
  };
  dimensionScores?: unknown[];
  answers?: Record<string, unknown>;
  website?: string;
  turnstileToken?: string;
};

const allowedEventTypes = new Set(["started", "completed", "completed_resend"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const env = (key: string) => Deno.env.get(key)?.trim() || "";

const corsHeadersFor = (request: Request) => {
  const origin = request.headers.get("origin") || "";
  const allowedOrigins = env("ALLOWED_ORIGINS")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) {
    return null;
  }

  return {
    "access-control-allow-origin": origin || "*",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "authorization, content-type",
    "vary": "origin"
  };
};

const jsonResponse = (request: Request, body: Record<string, unknown>, status = 200) => {
  const corsHeaders = corsHeadersFor(request) || {};
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "content-type": "application/json; charset=utf-8"
    }
  });
};

const cleanText = (value: unknown, maxLength: number, fieldName: string, required = true) => {
  const text = typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
  if (required && !text) throw new Error(`${fieldName} is required`);
  if (text.length > maxLength) throw new Error(`${fieldName} is too long`);
  return text || null;
};

const cleanScore = (value: unknown) => {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0 || value > 100) {
    throw new Error("totalScore must be an integer between 0 and 100");
  }
  return value;
};

const sha256Hex = async (value: string) => {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

const sourceIpHash = async (request: Request) => {
  const salt = env("IP_HASH_SALT");
  if (!salt) return null;
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = request.headers.get("cf-connecting-ip") || forwarded || "";
  return ip ? await sha256Hex(`${salt}:${ip}`) : null;
};

const verifyTurnstile = async (payload: IntakePayload, request: Request) => {
  const secret = env("TURNSTILE_SECRET_KEY");
  if (!secret) return true;
  if (!payload.turnstileToken) return false;

  const formData = new FormData();
  formData.set("secret", secret);
  formData.set("response", payload.turnstileToken);
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = request.headers.get("cf-connecting-ip") || forwarded || "";
  if (ip) formData.set("remoteip", ip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData
  });
  if (!response.ok) return false;
  const result = await response.json();
  return Boolean(result.success);
};

const supabaseRequest = async (path: string, init: RequestInit) => {
  const supabaseUrl = env("SUPABASE_URL");
  const serviceRoleKey = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase environment is not configured");

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      "content-type": "application/json",
      ...(init.headers || {})
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase request failed: ${response.status} ${text}`);
  }

  return response;
};

const reportText = (payload: {
  company: string;
  person: string;
  email: string;
  phone: string | null;
  totalScore: number | null;
  levelTitle: string | null;
  levelText: string | null;
  dimensionScores: unknown[];
}) => {
  const dimensionRows = Array.isArray(payload.dimensionScores)
    ? payload.dimensionScores
        .map((item) => {
          if (!item || typeof item !== "object") return null;
          const row = item as { title?: unknown; score?: unknown };
          const title = typeof row.title === "string" ? row.title : "Valdkond";
          const score = typeof row.score === "number" ? row.score : "-";
          return `${title}: ${score}/100`;
        })
        .filter(Boolean)
        .join("\n")
    : "";

  return [
    "02Signal AI kiirkontroll",
    "",
    `Ettevõte: ${payload.company}`,
    `Nimi: ${payload.person}`,
    `Email: ${payload.email}`,
    `Telefon: ${payload.phone || "-"}`,
    "",
    `Tulemus: ${payload.totalScore ?? "-"}/100`,
    payload.levelTitle || "",
    payload.levelText || "",
    "",
    "Valdkonnad:",
    dimensionRows || "-"
  ].join("\n");
};

const sendNotification = async (payload: {
  company: string;
  person: string;
  email: string;
  phone: string | null;
  totalScore: number | null;
  levelTitle: string | null;
  levelText: string | null;
  dimensionScores: unknown[];
}) => {
  const apiKey = env("RESEND_API_KEY");
  if (!apiKey) return { sent: false, error: "RESEND_API_KEY is not configured" };

  const to = env("NOTIFY_EMAIL") || "info@02signal.ai";
  const from = env("EMAIL_FROM") || "02Signal <info@02signal.ai>";
  const text = reportText(payload);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `AI kiirkontroll: ${payload.company}`,
      text
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    return { sent: false, error: `Resend failed: ${response.status} ${errorText}` };
  }

  return { sent: true, error: null };
};

Deno.serve(async (request) => {
  const corsHeaders = corsHeadersFor(request);
  if (!corsHeaders) {
    return jsonResponse(request, { ok: false, error: "Origin is not allowed" }, 403);
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse(request, { ok: false, error: "Method not allowed" }, 405);
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 100_000) {
    return jsonResponse(request, { ok: false, error: "Payload is too large" }, 413);
  }

  let payload: IntakePayload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse(request, { ok: false, error: "Invalid JSON" }, 400);
  }

  try {
    if (payload.website) {
      return jsonResponse(request, { ok: true, stored: false, dropped: true }, 202);
    }

    if (!(await verifyTurnstile(payload, request))) {
      return jsonResponse(request, { ok: false, error: "Human verification failed" }, 400);
    }

    const eventType = cleanText(payload.eventType, 32, "eventType") || "";
    if (!allowedEventTypes.has(eventType)) throw new Error("Unsupported eventType");

    const leadId = cleanText(payload.leadId, 80, "leadId") || "";
    const company = cleanText(payload.company, 160, "company") || "";
    const person = cleanText(payload.person, 120, "person") || "";
    const email = (cleanText(payload.email, 180, "email") || "").toLowerCase();
    const phone = cleanText(payload.phone, 80, "phone", false);
    const language = cleanText(payload.language || "et", 8, "language") || "et";
    const pagePath = cleanText(payload.pagePath || "/et/kiirkontroll/", 120, "pagePath") || "/et/kiirkontroll/";

    if (!emailPattern.test(email)) throw new Error("email is invalid");
    if (payload.privacyConsent !== true) throw new Error("privacyConsent is required");

    const isCompleted = eventType === "completed" || eventType === "completed_resend";
    const totalScore = isCompleted ? cleanScore(payload.totalScore) : null;
    const levelTitle = isCompleted ? cleanText(payload.level?.title, 160, "level.title", false) : null;
    const levelText = isCompleted ? cleanText(payload.level?.text, 600, "level.text", false) : null;
    const dimensionScores = isCompleted && Array.isArray(payload.dimensionScores) ? payload.dimensionScores : [];
    if (dimensionScores.length > 10) throw new Error("dimensionScores has too many rows");
    const answers = isCompleted && payload.answers && typeof payload.answers === "object" && !Array.isArray(payload.answers)
      ? payload.answers
      : {};
    if (Object.keys(answers).length > 60) throw new Error("answers has too many fields");
    const now = new Date().toISOString();
    const userAgent = cleanText(request.headers.get("user-agent"), 400, "userAgent", false);
    const ipHash = await sourceIpHash(request);

    const leadRow: Record<string, unknown> = {
      lead_id: leadId,
      status: isCompleted ? "completed" : "started",
      language,
      page_path: pagePath,
      company,
      person,
      email,
      phone,
      privacy_consent: true,
      last_event_type: eventType,
      user_agent: userAgent,
      source_ip_hash: ipHash,
      updated_at: now
    };

    if (eventType === "started") {
      leadRow.started_at = now;
    }

    if (isCompleted) {
      leadRow.completed_at = now;
      leadRow.total_score = totalScore;
      leadRow.level_title = levelTitle;
      leadRow.level_text = levelText;
      leadRow.dimension_scores = dimensionScores;
      leadRow.answers = answers;
    }

    await supabaseRequest("diagnostic_leads?on_conflict=lead_id", {
      method: "POST",
      headers: {
        prefer: "resolution=merge-duplicates"
      },
      body: JSON.stringify(leadRow)
    });

    const emailResult = isCompleted
      ? await sendNotification({ company, person, email, phone, totalScore, levelTitle, levelText, dimensionScores })
      : { sent: false, error: null };

    await supabaseRequest("diagnostic_events", {
      method: "POST",
      body: JSON.stringify({
        lead_id: leadId,
        event_type: eventType,
        event_status: emailResult.sent ? "stored_email_sent" : emailResult.error ? "stored_email_failed" : "stored",
        total_score: totalScore,
        email_sent: emailResult.sent,
        email_error: emailResult.error ? String(emailResult.error).slice(0, 800) : null,
        user_agent: userAgent,
        source_ip_hash: ipHash
      })
    });

    return jsonResponse(request, {
      ok: true,
      stored: true,
      emailSent: emailResult.sent
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse(request, { ok: false, error: message }, 400);
  }
});
