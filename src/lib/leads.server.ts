/**
 * Server-only lead pipeline: spam checks → rate limit → store → e-mail.
 * Never import this from client code; server functions load it dynamically.
 *
 * Dependencies (store, mailer, clock) are injected so the logic is unit-testable.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  MIN_FILL_MS,
  RATE_LIMIT_MESSAGE,
  SERVICE_FOR_OBJEKTART,
  parseContact,
  type ChatLead,
  type QuoteLead,
} from "./lead-schema";

export const RATE_LIMIT_PER_IP_PER_HOUR = 5;
export const RATE_LIMIT_TOTAL_PER_HOUR = 100;

export type LeadSource = "formular" | "chatbot";

export type LeadRow = {
  name: string;
  email: string | null;
  phone: string | null;
  service: string | null;
  message: string | null;
  source: LeadSource;
  ip_hash: string | null;
};

export interface LeadStore {
  countSince(sinceIso: string, ipHash?: string): Promise<number>;
  insert(row: LeadRow): Promise<string>;
  setMailStatus(id: string, status: "sent" | "failed"): Promise<void>;
}

export type LeadMail = { subject: string; html: string; text: string; replyTo?: string };
export type Mailer = (mail: LeadMail) => Promise<void>;

export type LeadDeps = {
  store: LeadStore;
  mailer: Mailer;
  ipHash: string | null;
  now?: () => Date;
};

export class LeadError extends Error {
  constructor(
    message: string,
    readonly code: "rate_limited" | "store_failed",
  ) {
    super(message);
    this.name = "LeadError";
  }
}

export type LeadResult = { ok: true };

/** Bots fill the honeypot or submit faster than any human could. */
export function isSpam(input: { website?: string; elapsedMs: number }): boolean {
  return (input.website ?? "").trim() !== "" || input.elapsedMs < MIN_FILL_MS;
}

export function escapeHtml(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function hashIp(
  ip: string | undefined | null,
  salt: string | undefined,
): Promise<string | null> {
  if (!ip || !salt) return null;
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

async function enforceRateLimit(store: LeadStore, ipHash: string | null, now: Date) {
  const since = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
  const [perIp, total] = await Promise.all([
    ipHash ? store.countSince(since, ipHash) : Promise.resolve(0),
    store.countSince(since),
  ]);
  if (perIp >= RATE_LIMIT_PER_IP_PER_HOUR || total >= RATE_LIMIT_TOTAL_PER_HOUR) {
    throw new LeadError(RATE_LIMIT_MESSAGE, "rate_limited");
  }
}

function buildMail(source: LeadSource, fields: [string, string][], replyTo?: string): LeadMail {
  const label = source === "formular" ? "Formular" : "Chatbot";
  const rows = fields
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding:4px 12px 4px 0">${escapeHtml(k)}</th><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  return {
    subject: "Neue Online-Anfrage aus Köln – Fleckenlos Gebäudereinigung",
    html: `<h2>Neue Anfrage über ${label}</h2><table>${rows}</table>`,
    text: fields.map(([k, v]) => `${k}: ${v}`).join("\n"),
    ...(replyTo ? { replyTo } : {}),
  };
}

async function storeAndMail(deps: LeadDeps, row: LeadRow, mail: LeadMail): Promise<LeadResult> {
  let id: string;
  try {
    id = await deps.store.insert(row);
  } catch (e) {
    // no personal data in logs – only the error itself
    console.error("lead insert failed", e instanceof Error ? e.message : e);
    throw new LeadError(
      "Anfrage konnte nicht gespeichert werden. Bitte erneut versuchen oder anrufen.",
      "store_failed",
    );
  }

  let status: "sent" | "failed" = "sent";
  try {
    await deps.mailer(mail);
  } catch (e) {
    status = "failed";
    console.error(`lead mail failed (lead ${id})`, e instanceof Error ? e.message : e);
  }
  try {
    await deps.store.setMailStatus(id, status);
  } catch (e) {
    console.error(
      `lead mail_status update failed (lead ${id})`,
      e instanceof Error ? e.message : e,
    );
  }
  // Data is stored – the customer sees success even if the mail failed.
  return { ok: true };
}

export async function processQuoteLead(data: QuoteLead, deps: LeadDeps): Promise<LeadResult> {
  if (isSpam(data)) return { ok: true };
  await enforceRateLimit(deps.store, deps.ipHash, deps.now?.() ?? new Date());

  const message = `Objektart: ${data.objektart} · Fläche: ca. ${data.flaeche} qm · Häufigkeit: ${data.haeufigkeit}${data.nachricht ? ` · Nachricht: ${data.nachricht}` : ""}`;
  const row: LeadRow = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    service: SERVICE_FOR_OBJEKTART[data.objektart],
    message,
    source: "formular",
    ip_hash: deps.ipHash,
  };
  const mail = buildMail(
    "formular",
    [
      ["Name", data.name],
      ["E-Mail", data.email],
      ["Telefon", data.phone],
      ["Objektart", data.objektart],
      ["Leistung", SERVICE_FOR_OBJEKTART[data.objektart]],
      ["Fläche (qm)", String(data.flaeche)],
      ["Häufigkeit", data.haeufigkeit],
      ["Nachricht", data.nachricht || "–"],
    ],
    data.email,
  );
  return storeAndMail(deps, row, mail);
}

export async function processChatLead(data: ChatLead, deps: LeadDeps): Promise<LeadResult> {
  if (isSpam(data)) return { ok: true };
  await enforceRateLimit(deps.store, deps.ipHash, deps.now?.() ?? new Date());

  const contact = parseContact(data.contact)!; // guaranteed by chatLeadSchema
  const email = contact.kind === "email" ? contact.value : null;
  const phone = contact.kind === "phone" ? contact.value : null;
  const message = data.message && data.message.toLowerCase() !== "fertig" ? data.message : null;

  const row: LeadRow = {
    name: data.name,
    email,
    phone,
    service: data.service,
    message,
    source: "chatbot",
    ip_hash: deps.ipHash,
  };
  const mail = buildMail(
    "chatbot",
    [
      ["Name", data.name],
      ["Leistung", data.service],
      [contact.kind === "email" ? "E-Mail" : "Telefon", contact.value],
      ["Nachricht", message ?? "–"],
    ],
    email ?? undefined,
  );
  return storeAndMail(deps, row, mail);
}

/* ------------------------------------------------------------------ */
/* Production wiring (Supabase service role + Resend)                  */
/* ------------------------------------------------------------------ */

// Untyped client on purpose: the generated Database types are refreshed by
// Lovable after the migration (new columns ip_hash / mail_status).
export function supabaseLeadStore(sb: SupabaseClient): LeadStore {
  return {
    async countSince(sinceIso, ipHash) {
      let q = sb
        .from("leads")
        .select("id", { count: "exact", head: true })
        .gte("created_at", sinceIso);
      if (ipHash) q = q.eq("ip_hash", ipHash);
      const { count, error } = await q;
      if (error) throw new Error(error.message);
      return count ?? 0;
    },
    async insert(row) {
      const { data, error } = await sb.from("leads").insert(row).select("id").single();
      if (error) throw new Error(error.message);
      return (data as { id: string }).id;
    },
    async setMailStatus(id, status) {
      const { error } = await sb.from("leads").update({ mail_status: status }).eq("id", id);
      if (error) throw new Error(error.message);
    },
  };
}

/** Resend (https://resend.com). Use a sending domain created in the EU region (eu-west-1). */
export function resendMailer(env: {
  apiKey: string | undefined;
  to: string | undefined;
  from: string | undefined;
}): Mailer {
  return async (mail) => {
    if (!env.apiKey) {
      throw new Error("mail not configured (RESEND_API_KEY / LEAD_INBOX / LEAD_FROM missing)");
    }
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: { Authorization: `Bearer ${env.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.from || "Fleckenlos Website <onboarding@resend.dev>",
        to: [env.to || "info@fleckenlos.nrw"],
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
      }),
    });
    if (!res.ok) throw new Error(`resend responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
  };
}

export async function productionDeps(clientIp: string | undefined): Promise<LeadDeps> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return {
    store: supabaseLeadStore(supabaseAdmin as unknown as SupabaseClient),
    mailer: resendMailer({
      apiKey: process.env["RESEND_API_KEY"],
      to: process.env["LEAD_INBOX"],
      from: process.env["LEAD_FROM"],
    }),
    ipHash: await hashIp(clientIp, process.env["LEAD_IP_SALT"]),
  };
}
