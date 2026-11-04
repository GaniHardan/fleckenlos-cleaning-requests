import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Stethoscope, HardHat, Umbrella, CheckCircle2, Loader2, ArrowLeft, ArrowRight, X, MessageCircle, Mail } from "lucide-react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { sendQuoteRequest } from "@/lib/leads.functions";
import { playClick, playSuccess } from "@/lib/sound";
import { EMAIL } from "@/components/site/Chrome";

const WHATSAPP_NUMBER = "4922165079295";

const TYPES = [
  { v: "Büro", s: "Büroreinigung", icon: Building2 },
  { v: "Praxis", s: "Sonstiges", icon: Stethoscope },
  { v: "Baustelle", s: "Bauendreinigung", icon: HardHat },
  { v: "Glas / Terrassendach", s: "Terrassendach", icon: Umbrella },
] as const;

const FREQ = ["Einmalig", "Wöchentlich", "Mehrmals pro Woche", "Monatlich"] as const;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Bitte Namen angeben").max(100),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(255),
  phone: z.string().trim().min(5, "Bitte Telefonnummer angeben").max(40),
});

const field = "w-full rounded-xl border border-input bg-glass px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

export function Wizard({ onClose }: { onClose?: () => void }) {
  const send$ = useServerFn(sendQuoteRequest);
  const [step, setStep] = useState(0);
  const [type, setType] = useState<(typeof TYPES)[number] | null>(null);
  const [qm, setQm] = useState(250);
  const [freq, setFreq] = useState<string>("Wöchentlich");
  const [c, setC] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const go = (n: number) => { playClick(); setStep(n); };

  async function send() {
    playClick();
    const p = contactSchema.safeParse(c);
    if (!p.success) {
      const e: Record<string, string> = {};
      p.error.issues.forEach((i) => (e[String(i.path[0])] = i.message));
      return setErrors(e);
    }
    setErrors({});
    setState("sending");
    try {
      await send$({ data: { ...p.data, objektart: type?.v ?? "–", service: type?.s, flaeche: qm, haeufigkeit: freq } });
      playSuccess();
      setState("done");
    } catch { setState("error"); }
  }

  return (
    <div className="glass relative rounded-3xl p-6 shadow-card sm:p-8">
      {onClose && <button onClick={onClose} aria-label="Schließen" className="absolute right-5 top-5 text-muted-foreground hover:text-foreground"><X /></button>}
      {state !== "done" && (
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Schritt {step + 1} von 3</p>
          <div className="mt-3 flex gap-2">{[0, 1, 2].map((i) => <span key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`} />)}</div>
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div key={state === "done" ? "done" : step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
          {state === "done" ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center" role="status">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }}>
                <CheckCircle2 className="h-16 w-16 text-primary" />
              </motion.div>
              <h3 className="text-2xl font-bold">Anfrage erfolgreich gesendet!</h3>
              <p className="max-w-sm text-muted-foreground">Vielen Dank, {c.name}. Wir melden uns innerhalb von 24 Stunden persönlich mit Ihrem Angebot.</p>
            </div>
          ) : step === 0 ? (
            <>
              <h3 className="mb-5 text-2xl font-bold">Welche Objektart?</h3>
              <div className="grid grid-cols-2 gap-3">
                {TYPES.map((t) => (
                  <button key={t.v} onClick={() => { setType(t); go(1); }}
                    className={`lift flex flex-col items-start gap-3 rounded-2xl border p-5 text-left ${type?.v === t.v ? "border-primary bg-primary/10" : "bg-glass"}`}>
                    <t.icon className="h-7 w-7 text-primary" /><span className="font-bold">{t.v}</span>
                  </button>
                ))}
              </div>
            </>
          ) : step === 1 ? (
            <>
              <h3 className="mb-2 text-2xl font-bold">Fläche & Häufigkeit</h3>
              <p className="mb-6 text-sm text-muted-foreground">Eine grobe Schätzung reicht völlig.</p>
              <p className="mb-4 text-center font-display text-6xl font-extrabold text-gradient">{qm}<span className="text-2xl"> qm</span></p>
              <input type="range" min={20} max={5000} step={10} value={qm} onChange={(e) => setQm(Number(e.target.value))} className="w-full" aria-label="Fläche in Quadratmetern" />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>20 qm</span><span>5.000+ qm</span></div>
              <p className="mb-3 mt-8 text-sm font-semibold">Gewünschte Häufigkeit</p>
              <div className="grid grid-cols-2 gap-2">
                {FREQ.map((f) => (
                  <button key={f} onClick={() => { playClick(); setFreq(f); }} className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${freq === f ? "border-primary bg-primary/15 text-primary" : "bg-glass"}`}>{f}</button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="mb-5 text-2xl font-bold">Ihre Kontaktdaten</h3>
              <div className="space-y-4">
                {([["name", "Name / Ansprechpartner", "text"], ["email", "E-Mail-Adresse", "email"], ["phone", "Telefon / WhatsApp", "tel"]] as const).map(([n, l, t]) => (
                  <label key={n} className="block">
                    <span className="mb-1.5 block text-sm font-semibold">{l}</span>
                    <input type={t} value={c[n]} maxLength={n === "email" ? 255 : 100} onChange={(e) => setC({ ...c, [n]: e.target.value })} className={field} />
                    {errors[n] && <span className="mt-1 block text-xs text-destructive">{errors[n]}</span>}
                  </label>
                ))}
                <p className="text-xs text-muted-foreground">Mit dem Absenden stimmen Sie unserer <a href="/datenschutz" className="underline">Datenschutzerklärung</a> zu.</p>
                {state === "error" && <p className="text-sm text-destructive">Senden fehlgeschlagen. Bitte erneut versuchen oder an info@fleckenlos.nrw schreiben.</p>}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      {state !== "done" && (
        <div className="mt-8 flex items-center justify-between">
          <button disabled={step === 0} onClick={() => go(step - 1)} className="flex items-center gap-1 text-sm font-semibold text-muted-foreground disabled:opacity-0"><ArrowLeft className="h-4 w-4" /> Zurück</button>
          {step === 1 && <button onClick={() => go(2)} className="btn-glow flex items-center gap-2 rounded-full px-6 py-3 font-bold">Weiter <ArrowRight className="h-4 w-4" /></button>}
          {step === 2 && <button onClick={send} disabled={state === "sending"} className="btn-glow flex items-center gap-2 rounded-full px-6 py-3 font-bold disabled:opacity-70">{state === "sending" && <Loader2 className="h-4 w-4 animate-spin" />} Anfrage verbindlich abschicken</button>}
        </div>
      )}
    </div>
  );
}
