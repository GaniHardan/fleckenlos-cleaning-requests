import { Wizard } from "@/components/site/Wizard";
import { Head, Reveal } from "./shared";

export function QuoteSection() {
  return (
    <section id="angebot" className="bg-animated relative overflow-hidden border-t py-28">
      <div className="absolute left-1/2 top-0 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <Head
          k="Preis- & Anfrage-Konfigurator"
          t={
            <>
              Ihr Angebot in <span className="text-gradient">3 Klicks.</span>
            </>
          }
          s="Objektart wählen, Fläche schätzen, Kontakt hinterlassen – wir melden uns innerhalb von 24 Stunden mit einem Festpreis."
        />
        <Reveal delay={0.15}>
          <Wizard />
        </Reveal>
      </div>
    </section>
  );
}
