import { z } from "zod";

/**
 * Shared validation for every lead (quote wizard + chatbot).
 * Used in the browser for instant feedback and again on the server as the
 * single source of truth – never trust the client-side check alone.
 */

export const OBJEKTARTEN = ["Büro", "Praxis", "Baustelle", "Glas / Terrassendach"] as const;
export const HAEUFIGKEITEN = [
  "Einmalig",
  "Wöchentlich",
  "Mehrmals pro Woche",
  "Monatlich",
] as const;
export const SERVICES = [
  "Büroreinigung",
  "Bauendreinigung",
  "Glasreinigung",
  "Terrassendach",
  "Praxisreinigung",
  "Sonstiges",
] as const;

export type Objektart = (typeof OBJEKTARTEN)[number];
export type Haeufigkeit = (typeof HAEUFIGKEITEN)[number];
export type Service = (typeof SERVICES)[number];

/** Objektart (wizard) → service stored on the lead. */
export const SERVICE_FOR_OBJEKTART: Record<Objektart, Service> = {
  Büro: "Büroreinigung",
  Praxis: "Praxisreinigung",
  Baustelle: "Bauendreinigung",
  "Glas / Terrassendach": "Terrassendach",
};

/** Submissions faster than this after opening the form are treated as bots. */
export const MIN_FILL_MS = 3000;

const PHONE_RE = /^[0-9 +\-/()]{6,20}$/;

export const nameSchema = z.string().trim().min(1, "Bitte Namen angeben").max(100);
export const emailSchema = z.string().trim().email("Ungültige E-Mail-Adresse").max(255);
export const phoneSchema = z
  .string()
  .trim()
  .regex(
    PHONE_RE,
    "Bitte gültige Telefonnummer angeben (6–20 Zeichen: Ziffern, Leerzeichen, + - / ( ))",
  )
  // at least a handful of real digits, so "+ - - -" is rejected
  .refine((v) => (v.match(/\d/g)?.length ?? 0) >= 5, "Bitte gültige Telefonnummer angeben");

/** Anti-spam fields every lead carries. `website` is an invisible honeypot. */
const antiSpam = {
  website: z.string().max(200).optional().default(""),
  elapsedMs: z.number().int().min(0),
};

export const quoteLeadSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  objektart: z.enum(OBJEKTARTEN),
  flaeche: z.number().int().min(1).max(100_000),
  haeufigkeit: z.enum(HAEUFIGKEITEN),
  nachricht: z.string().trim().max(2000).optional().default(""),
  ...antiSpam,
});
export type QuoteLeadInput = z.input<typeof quoteLeadSchema>;
export type QuoteLead = z.output<typeof quoteLeadSchema>;

/** Only the contact step of the wizard – validated before submit. */
export const quoteContactSchema = quoteLeadSchema.pick({ name: true, email: true, phone: true });

export type Contact = { kind: "email"; value: string } | { kind: "phone"; value: string };

/** Chatbot contact: a valid e-mail OR a valid phone number. */
export function parseContact(raw: string): Contact | null {
  const v = raw.trim();
  if (emailSchema.safeParse(v).success) return { kind: "email", value: v };
  if (phoneSchema.safeParse(v).success) return { kind: "phone", value: v };
  return null;
}

export const chatLeadSchema = z.object({
  name: nameSchema,
  service: z.enum(SERVICES),
  contact: z
    .string()
    .trim()
    .max(255)
    .refine(
      (v) => parseContact(v) !== null,
      "Bitte gültige E-Mail-Adresse oder Telefonnummer angeben",
    ),
  message: z.string().trim().max(2000).optional(),
  ...antiSpam,
});
export type ChatLeadInput = z.input<typeof chatLeadSchema>;
export type ChatLead = z.output<typeof chatLeadSchema>;

export const CONFIRMATION =
  "Vielen Dank! Ihre Anfrage ist eingegangen. Unser Team meldet sich innerhalb von 24 Stunden persönlich bei Ihnen.";

export const RATE_LIMIT_MESSAGE = "Zu viele Anfragen. Bitte später erneut versuchen oder anrufen.";
