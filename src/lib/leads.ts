import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const SERVICES = ["Büroreinigung", "Bauendreinigung", "Glasreinigung", "Terrassendach", "Sonstiges"] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(1, "Bitte Namen angeben").max(100),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(255),
  phone: z.string().trim().min(5, "Bitte Telefonnummer angeben").max(40),
  service: z.enum(SERVICES),
  message: z.string().trim().max(2000).optional(),
});

export async function submitLead(
  data: { name: string; email?: string | undefined; phone?: string | undefined; service?: string | undefined; message?: string | undefined },
  source: "formular" | "chatbot",
) {
  const { error } = await supabase.from("leads").insert({
    name: data.name,
    email: data.email || null,
    phone: data.phone || null,
    service: data.service || null,
    message: data.message || null,
    source,
  });
  if (error) throw error;
}

export const CONFIRMATION =
  "Vielen Dank! Ihre Anfrage ist eingegangen. Unser Team meldet sich innerhalb von 24 Stunden persönlich bei Ihnen.";
