import { useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitChatLead } from "@/lib/leads.functions";
import { CONFIRMATION, RATE_LIMIT_MESSAGE, SERVICES, parseContact, type Service } from "@/lib/lead-schema";
import { COMPANY } from "@/config/company";
import { Honeypot } from "./Honeypot";

type Step = "service" | "name" | "phone" | "message" | "done";
const PROMPTS: Record<Step, string> = {
  service: "Hallo! 👋 Wobei dürfen wir Ihnen helfen?",
  name: "Super! Wie ist Ihr Name?",
  phone: "Unter welcher Telefonnummer oder E-Mail erreichen wir Sie?",
  message: "Kurz zum Objekt (Größe in qm, Wunschtermin)? Oder einfach „fertig“.",
  done: CONFIRMATION,
};
export const INVALID_CONTACT =
  "Das sieht leider nicht nach einer gültigen E-Mail-Adresse oder Telefonnummer aus. Könnten Sie sie bitte noch einmal eingeben?";

/** Free-text answer → known service; unknown answers become "Sonstiges". */
function toService(v: string): { service: Service; note?: string } {
  const hit = SERVICES.find((s) => s.toLowerCase() === v.toLowerCase());
  return hit ? { service: hit } : { service: "Sonstiges", note: v };
}

export function ChatBot() {
  const send$ = useServerFn(submitChatLead);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("service");
  const [log, setLog] = useState<{ me: boolean; t: string }[]>([{ me: false, t: PROMPTS.service }]);
  const [data, setData] = useState<{ service: Service; note?: string; name: string; contact: string }>({ service: "Sonstiges", name: "", contact: "" });
  const [input, setInput] = useState("");
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const openedAt = useRef(0);

  function toggle() {
    if (!open && openedAt.current === 0) openedAt.current = Date.now();
    setOpen(!open);
  }

  async function answer(val: string) {
    const v = val.trim().slice(0, 500);
    if (!v || busy) return;
    const next = [...log, { me: true, t: v }];
    setInput("");
    let ns: Step = step;
    if (step === "service") { setData({ ...data, ...toService(v.slice(0, 60)) }); ns = "name"; }
    else if (step === "name") { setData({ ...data, name: v.slice(0, 100) }); ns = "phone"; }
    else if (step === "phone") {
      if (!parseContact(v)) { setLog([...next, { me: false, t: INVALID_CONTACT }]); return; }
      setData({ ...data, contact: v.slice(0, 255) }); ns = "message";
    }
    else if (step === "message") {
      const text = v.toLowerCase() === "fertig" ? "" : v;
      const message = [data.note && `Anliegen: ${data.note}`, text].filter(Boolean).join("\n").slice(0, 2000);
      setBusy(true);
      try {
        await send$({ data: { name: data.name, service: data.service, contact: data.contact, message: message || undefined, website, elapsedMs: Date.now() - openedAt.current } });
        ns = "done";
      } catch (e) {
        const t = e instanceof Error && e.message === RATE_LIMIT_MESSAGE ? RATE_LIMIT_MESSAGE : `Leider ist ein Fehler aufgetreten. Bitte rufen Sie uns an: ${COMPANY.phone}`;
        setLog([...next, { me: false, t }]);
        return;
      } finally { setBusy(false); }
    }
    setStep(ns);
    setLog([...next, { me: false, t: PROMPTS[ns] }]);
  }

  return (
    <>
      <button onClick={toggle} aria-label="Chat öffnen"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-card transition hover:scale-105">
        {open ? <X /> : <MessageCircle />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[480px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border bg-background shadow-card" role="dialog" aria-label="Fleckenlos Chat">
          <div className="bg-gradient-primary px-5 py-4 text-primary-foreground">
            <p className="font-display font-bold">Fleckenlos Assistent</p>
            <p className="text-xs opacity-80">Antwort in unter 24 Stunden</p>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-4">
            {log.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${m.me ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}>{m.t}</div>
            ))}
            {step === "service" && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SERVICES.map((s) => (
                  <button key={s} onClick={() => answer(s)} className="rounded-full border border-primary px-3 py-1 text-xs font-semibold text-primary hover:bg-secondary">{s}</button>
                ))}
              </div>
            )}
          </div>
          {step !== "done" && (
            <form onSubmit={(e) => { e.preventDefault(); answer(input); }} className="relative border-t p-3">
              <p className="mb-2 text-[11px] text-muted-foreground">Mit dem Absenden stimmen Sie unserer <a href="/datenschutz" className="underline">Datenschutzerklärung</a> zu.</p>
              <Honeypot value={website} onChange={setWebsite} />
              <div className="flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded-full border border-input px-4 text-sm outline-none focus:border-primary" placeholder="Ihre Antwort…" aria-label="Ihre Antwort" />
                <button disabled={busy} className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-60" aria-label="Senden"><Send className="h-4 w-4" /></button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
}
