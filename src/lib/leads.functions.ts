import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export const LEAD_INBOX = "info@fleckenlos.nrw";

const input = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(40),
  objektart: z.string().trim().max(40),
  service: z.string().trim().max(40).optional(),
  flaeche: z.number().int().min(1).max(100000),
  haeufigkeit: z.string().trim().max(40),
});

export const sendQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => input.parse(d))
  .handler(async ({ data }) => {
    const message = `Objektart: ${data.objektart} · Fläche: ca. ${data.flaeche} qm · Häufigkeit: ${data.haeufigkeit}`;

    // 1) Store a copy so no lead is ever lost
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const sb = createClient(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false },
      global: {
        fetch: (i, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(i, { ...init, headers: h });
        },
      },
    });
    const { error } = await sb.from("leads").insert({
      name: data.name, email: data.email, phone: data.phone,
      service: data.service ?? null, message, source: "formular",
    });
    if (error) console.error("lead insert failed", error);

    // 2) Email to the owner via FormSubmit
    const res = await fetch(`https://formsubmit.co/ajax/${LEAD_INBOX}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://fleckenlos-cleaning-requests.lovable.app",
        Referer: "https://fleckenlos-cleaning-requests.lovable.app/",
      },
      body: JSON.stringify({
        _subject: "Neuer Lead für Fleckenlos Gebäudereinigung",
        _template: "table",
        _captcha: "false",
        _replyto: data.email,
        Name: data.name,
        "E-Mail": data.email,
        Telefon: data.phone,
        Objektart: data.objektart,
        "Fläche (qm)": String(data.flaeche),
        Häufigkeit: data.haeufigkeit,
      }),
    });
    const body = await res.text();
    console.log(`formsubmit [${res.status}]: ${body}`);
    if (!res.ok && error) throw new Error("Anfrage konnte nicht gesendet werden");
    return { ok: true };
  });
