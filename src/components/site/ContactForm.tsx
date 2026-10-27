import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { CONFIRMATION, SERVICES, leadSchema, submitLead } from "@/lib/leads";

const field = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setState("sending");
    try {
      await submitLead(parsed.data, "formular");
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done")
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-background p-10 text-center shadow-card" role="status">
        <CheckCircle2 className="h-14 w-14 text-primary" />
        <p className="text-lg font-semibold">{CONFIRMATION}</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-3xl bg-background p-6 shadow-card sm:grid-cols-2 sm:p-8">
      {[
        ["name", "Name / Ansprechpartner", "text"],
        ["email", "E-Mail-Adresse", "email"],
        ["phone", "Telefonnummer / WhatsApp", "tel"],
      ].map(([n, l, t]) => (
        <label key={n} className={n === "name" ? "sm:col-span-2" : ""}>
          <span className="mb-1.5 block text-sm font-semibold">{l} *</span>
          <input name={n} type={t} className={field} maxLength={n === "email" ? 255 : 100} />
          {errors[n] && <span className="mt-1 block text-xs text-destructive">{errors[n]}</span>}
        </label>
      ))}
      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-sm font-semibold">Leistungsart *</span>
        <select name="service" className={field} defaultValue="Büroreinigung">
          {SERVICES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-sm font-semibold">Nachricht / Objektgröße in qm</span>
        <textarea name="message" rows={4} maxLength={2000} className={field} placeholder="z. B. Büro, ca. 250 qm, 2× pro Woche" />
      </label>
      <p className="text-xs text-muted-foreground sm:col-span-2">
        Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer <a href="/datenschutz" className="underline">Datenschutzerklärung</a> zu.
      </p>
      {state === "error" && <p className="text-sm text-destructive sm:col-span-2">Senden fehlgeschlagen. Bitte erneut versuchen oder anrufen.</p>}
      <button disabled={state === "sending"} className="flex items-center justify-center gap-2 rounded-full bg-gold py-4 font-bold text-gold-foreground shadow-gold transition hover:-translate-y-0.5 disabled:opacity-70 sm:col-span-2">
        {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" />} Angebot kostenlos anfordern
      </button>
    </form>
  );
}
