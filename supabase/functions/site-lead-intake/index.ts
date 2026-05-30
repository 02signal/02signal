type SiteLeadPayload = {
  leadId?: string;
  sourceSite?: string;
  sourcePath?: string;
  company?: string;
  registryCode?: string;
  person?: string;
  role?: string;
  email?: string;
  phone?: string;
  companySize?: string;
  topic?: string;
  message?: string;
  consentContact?: boolean;
  consentFundingUpdates?: boolean;
  consentVersion?: string;
  website?: string;
  turnstileToken?: string;
};

const allowedSites = new Set(["02signal.ai", "automatiseerimine.ee", "digiteekaart.ee"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const registryPattern = /^\d{8}$/;

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

const cleanMultilineText = (value: unknown, maxLength: number, fieldName: string, required = false) => {
  const text = typeof value === "string" ? value.trim().replace(/\r\n/g, "\n") : "";
  if (required && !text) throw new Error(`${fieldName} is required`);
  if (text.length > maxLength) throw new Error(`${fieldName} is too long`);
  return text || null;
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

const verifyTurnstile = async (payload: SiteLeadPayload, request: Request) => {
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

const reportText = (lead: {
  sourceSite: string;
  company: string;
  registryCode: string | null;
  person: string;
  role: string | null;
  email: string;
  phone: string | null;
  companySize: string | null;
  topic: string;
  message: string | null;
  consentFundingUpdates: boolean;
}) => {
  return [
    `Uus päring: ${lead.sourceSite}`,
    "",
    `Ettevõte: ${lead.company}`,
    `Registrikood: ${lead.registryCode || "-"}`,
    `Kontakt: ${lead.person}`,
    `Roll: ${lead.role || "-"}`,
    `Email: ${lead.email}`,
    `Telefon: ${lead.phone || "-"}`,
    `Suurus: ${lead.companySize || "-"}`,
    `Teema: ${lead.topic}`,
    `Soovib toetuste teateid: ${lead.consentFundingUpdates ? "jah" : "ei"}`,
    "",
    "Sõnum:",
    lead.message || "-"
  ].join("\n");
};

const sendNotification = async (lead: {
  sourceSite: string;
  company: string;
  registryCode: string | null;
  person: string;
  role: string | null;
  email: string;
  phone: string | null;
  companySize: string | null;
  topic: string;
  message: string | null;
  consentFundingUpdates: boolean;
}) => {
  const apiKey = env("RESEND_API_KEY");
  if (!apiKey) return { sent: false, error: "RESEND_API_KEY is not configured" };

  const to = env("NOTIFY_EMAIL") || "info@02signal.ai";
  const from = env("EMAIL_FROM") || "02Signal <info@02signal.ai>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `${lead.sourceSite}: ${lead.topic}`,
      text: reportText(lead)
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
  if (contentLength > 80_000) {
    return jsonResponse(request, { ok: false, error: "Payload is too large" }, 413);
  }

  let payload: SiteLeadPayload;
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

    const leadId = cleanText(payload.leadId, 80, "leadId") || "";
    const sourceSite = cleanText(payload.sourceSite, 80, "sourceSite") || "";
    const sourcePath = cleanText(payload.sourcePath || "/", 120, "sourcePath") || "/";
    const company = cleanText(payload.company, 160, "company") || "";
    const registryCode = cleanText(payload.registryCode, 16, "registryCode", false);
    const person = cleanText(payload.person, 120, "person") || "";
    const role = cleanText(payload.role, 120, "role", false);
    const email = (cleanText(payload.email, 180, "email") || "").toLowerCase();
    const phone = cleanText(payload.phone, 80, "phone", false);
    const companySize = cleanText(payload.companySize, 80, "companySize", false);
    const topic = cleanText(payload.topic, 160, "topic") || "";
    const message = cleanMultilineText(payload.message, 4000, "message", false);
    const consentVersion = cleanText(payload.consentVersion || "2026-05-30", 40, "consentVersion") || "2026-05-30";

    if (!allowedSites.has(sourceSite)) throw new Error("Unsupported sourceSite");
    if (!emailPattern.test(email)) throw new Error("email is invalid");
    if (registryCode && !registryPattern.test(registryCode)) throw new Error("registryCode must be 8 digits");
    if (payload.consentContact !== true) throw new Error("consentContact is required");

    const now = new Date().toISOString();
    const userAgent = cleanText(request.headers.get("user-agent"), 400, "userAgent", false);
    const ipHash = await sourceIpHash(request);
    const consentFundingUpdates = payload.consentFundingUpdates === true;

    await supabaseRequest("site_leads?on_conflict=lead_id", {
      method: "POST",
      headers: {
        prefer: "resolution=merge-duplicates"
      },
      body: JSON.stringify({
        lead_id: leadId,
        source_site: sourceSite,
        source_path: sourcePath,
        company,
        registry_code: registryCode,
        person,
        role,
        email,
        phone,
        company_size: companySize,
        topic,
        message,
        consent_contact: true,
        consent_funding_updates: consentFundingUpdates,
        consent_version: consentVersion,
        user_agent: userAgent,
        source_ip_hash: ipHash,
        updated_at: now
      })
    });

    const emailResult = await sendNotification({
      sourceSite,
      company,
      registryCode,
      person,
      role,
      email,
      phone,
      companySize,
      topic,
      message,
      consentFundingUpdates
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
