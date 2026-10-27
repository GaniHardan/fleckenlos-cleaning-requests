import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { CONFIRMATION, SERVICES, submitLead } from "@/lib/leads";

type Step = "service" | "name" | "phone" | "message" | "done";
const PROMPTS: Record<Step, string> = {
  service: "Hallo! 👋 Wobei dürfen wir Ihnen helfen?",
  name: "Super! Wie ist Ihr Name?",
  phone: "Unter welcher Telefonnummer oder E-Mail erreichen wir Sie?",
  message: "Kurz zum Objekt (Größe in qm, Wunschtermin)? Oder einfach „fertig“.",
  done: CONFIRMATION,
};

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("service");
  const [log, setLog] = useState<{ me: boolean; t: string }[]>([{ me: false, t: PROMPTS.service }]);
  const [data, setData] = useState({ service: "", name: "", contact: "" });
  const [input, setInput] = useState("");

  async function answer(val: string) {
    const v = val.trim().slice(0, 500);
    if (!v) return;
    const next = [...log, { me: true, t: v }];
    setInput("");
    let ns: Step = step;
    if (step === "service") { setData({ ...data, service: v }); ns = "name"; }
    else if (step === "name") { setData({ ...data, name: v.slice(0, 100) }); ns = "phone"; }
    else if (step === "phone") { setData({ ...data, contact: v.slice(0, 255) }); ns = "message"; }
    else if (step === "message") {
      const isMail = data.contact.includes("@");
      try {
        await submitLead({
          name: data.name, service: data.service.slice(0, 60),
          email: isMail ? data.contact : undefined, phone: isMail ? undefined : data.contact.slice(0, 40),
          message: v.toLowerCase() === "fertig" ? undefined : v,
        }, "chatbot");
        ns = "done";
      } catch {
        setLog([...next, { me: false, t: "Leider ist ein Fehler aufgetreten. Bitte rufen Sie uns an: 0221 65079264" }]);
        return;
      }
    }
    setStep(ns);
    setLog([...next, { me: false, t: PROMPTS[ns] }]);
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} aria-label="Chat öffnen"
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
            <form onSubmit={(e) => { e.preventDefault(); answer(input); }} className="flex gap-2 border-t p-3">
              <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded-full border border-input px-4 text-sm outline-none focus:border-primary" placeholder="Ihre Antwort…" />
              <button className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground" aria-label="Senden"><Send className="h-4 w-4" /></button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
