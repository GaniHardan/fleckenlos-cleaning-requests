import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2, HardHat, AppWindow, Stethoscope, Umbrella, Star, Phone, ArrowRight,
  Send, ScanSearch, Sparkles, ChevronLeft, ChevronRight, BadgeCheck, User,
} from "lucide-react";
import heroA from "@/assets/real-5.png.asset.json";
import officeA from "@/assets/real-4.png.asset.json";
import teamA from "@/assets/real-8.png.asset.json";
import roomA from "@/assets/real-3.png.asset.json";
import windowA from "@/assets/real-2.png.asset.json";
const hero = heroA.url, office = officeA.url, team = teamA.url, room = roomA.url, heroLight = windowA.url;
import { Header, Footer, PHONE, PHONE_HREF } from "@/components/site/Chrome";
import { Wizard } from "@/components/site/Wizard";
import { ChatBot } from "@/components/site/ChatBot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fleckenlos Gebäudereinigung – High-End Reinigung Rhein-Ruhr" },
      { name: "description", content: "Makellose Sauberkeit für Büros, Praxen, Bau & Industrie in Düsseldorf, Essen, Köln & Monheim. 5.0 ★ bei Google. Kostenloses Angebot in 2 Minuten." },
      { property: "og:title", content: "Fleckenlos Gebäudereinigung – Makellose Sauberkeit im Rhein-Ruhr-Gebiet" },
      { property: "og:description", content: "High-End Gebäudereinigung: maßgeschneidert, zuverlässig, 5.0 ★ Google-Bewertung." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const REVIEWS = [
  ["Azimi Nasir", "Bauendreinigung", "Ich habe die Bauendreinigung in Anspruch genommen... Herr Zada hat mich freundlich beraten. Pünktlich und professionell!"],
  ["Elli Weber", "Terrassendach", "Terrassendach sieht wieder aus wie neu! Besonders positiv: Hatte sogar kurzfristig noch einen Termin bekommen."],
  ["Calogero Lavore", "Haus & Geschäft", "Immer top – ich lasse mein Haus und mein Geschäft reinigen. Zuverlässig, schnell und sauber!"],
  ["Nils Decker", "Kurzfristiger Termin", "Nachdem ich bei 4 Anbietern abgelehnt wurde, bot mir Fleckenlos sehr kurzfristig einen Termin an. Pünktlich & sehr gründlich!"],
  ["Ella Paul", "Büroreinigung", "Sehr zufrieden mit der wöchentlichen Büroreinigung. Das Team ist zuverlässig, gründlich und freundlich."],
  ["Princess Anna", "Sofort-Termin", "Heute angerufen und sofort einen Termin erhalten. Alles lief reibungslos, preislich super tragbar!"],
] as const;

const KEYWORDS = ["Pünktlich", "Gründlich", "Zertifiziert", "Rhein-Ruhr", "Festpreise", "Kurzfristig", "Diskret", "Versichert"];

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function Stars({ c = "h-4 w-4" }: { c?: string }) {
  return <span className="flex text-primary" aria-label="5 von 5 Sternen">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className={`${c} fill-current`} />)}</span>;
}

function Head({ k, t, s }: { k: string; t: ReactNode; s?: string }) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">{k}</p>
      <h2 className="text-4xl font-bold leading-[1.05] sm:text-5xl">{t}</h2>
      {s && <p className="mt-5 text-lg text-muted-foreground">{s}</p>}
    </Reveal>
  );
}

function Index() {
  const [wizard, setWizard] = useState(false);
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % REVIEWS.length), 6000); return () => clearInterval(t); }, []);
  const r = REVIEWS[i]!;

  return (
    <div className="overflow-x-hidden">
      <Header />
      <main>
        {/* HERO */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden">
          <motion.img src={hero} alt="Herr Zada von Fleckenlos mit Reinigungsausrüstung vor dem Firmenwagen"
            initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
          <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-32">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: [0, -6, 0] }} transition={{ opacity: { duration: 0.6 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
              className="glass mb-8 inline-flex flex-wrap items-center gap-2 rounded-full px-4 py-2 text-sm">
              <Stars /> <b>5.0</b> <span className="text-muted-foreground">Google Bewertung basierend auf 72+ verifizierten Kunden</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl text-5xl font-extrabold leading-[0.98] sm:text-6xl lg:text-[5.5rem]">
              Makellose Sauberkeit für Ihr Unternehmen im <span className="text-gradient">Rhein-Ruhr-Gebiet.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl">
              High-End Gebäudereinigung für Büros, Praxen, Bau und Industrie. Maßgeschneidert, zuverlässig und mit modernster Ausrüstung.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setWizard(true)} className="btn-glow flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold">
                Kostenloses Angebot in 2 Min. <ArrowRight className="h-5 w-5" />
              </button>
              <a href={PHONE_HREF} className="glass lift flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold">
                <Phone className="h-4 w-4 text-primary" /> Direkt anrufen: {PHONE}
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-14 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" style={{ animation: "pulse-dot 2s infinite" }} />
              Heute noch Termine verfügbar · Düsseldorf · Essen · Köln · Monheim
            </motion.div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="border-y bg-card/40 py-5" aria-hidden>
          <div className="flex w-max animate-marquee">
            {[...KEYWORDS, ...KEYWORDS, ...KEYWORDS, ...KEYWORDS].map((k, n) => (
              <span key={n} className="flex items-center gap-8 px-4 font-display text-2xl font-semibold text-muted-foreground">
                {k} <Sparkles className="h-4 w-4 text-primary" />
              </span>
            ))}
          </div>
        </div>

        {/* BENTO */}
        <section id="leistungen" className="mx-auto max-w-6xl px-4 py-28">
          <Head k="Leistungsportfolio" t={<>Reinigung auf <span className="text-gradient">Spitzenniveau.</span></>} s="Fünf Disziplinen, ein Anspruch: makellos." />
          <div className="grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-3">
            <Reveal className="md:col-span-2 md:row-span-2">
              <div className="group glass lift relative h-full overflow-hidden rounded-3xl p-8">
                <Building2 className="h-10 w-10 text-primary" />
                <h3 className="mt-6 text-3xl font-bold">Büro- & Unterhaltsreinigung</h3>
                <p className="mt-3 max-w-md text-muted-foreground">Tägliche oder wöchentliche Sauberkeit für eine produktive Arbeitsatmosphäre – mit festen Teams und festen Zeiten.</p>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[office, team, room].map((src, n) => (
                    <div key={n} className="aspect-[4/3] overflow-hidden rounded-2xl">
                      <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass lift h-full rounded-3xl p-7">
                <HardHat className="h-8 w-8 text-primary" />
                <h3 className="mt-5 text-xl font-bold">Bauendreinigung & Baustellen</h3>
                <p className="mt-2 text-sm text-muted-foreground">Baustaub raus, Übergabe rein – bezugsfertig und pünktlich.</p>
                <p className="mt-5 flex items-center gap-2 text-sm"><User className="h-4 w-4 text-primary" /> Ansprechpartner: <b>Herr Zada</b></p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="group relative h-full overflow-hidden rounded-3xl border p-7">
                <img src={heroLight} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30 transition duration-700 group-hover:scale-110 group-hover:opacity-45" />
                <div className="relative">
                  <AppWindow className="h-8 w-8 text-primary" />
                  <h3 className="mt-5 text-xl font-bold">Glas- & Fensterreinigung</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Streifenfrei für Gewerbe & Privat.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-1">
              <div className="glass lift h-full rounded-3xl p-7">
                <Umbrella className="h-8 w-8 text-primary" />
                <h3 className="mt-5 text-xl font-bold">Terrassendach- & Sonderreinigung</h3>
                <p className="mt-2 text-sm text-muted-foreground">Glas-, Polycarbonat- und Überdächer – wieder wie neu.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2} className="md:col-span-2">
              <div className="lift relative h-full overflow-hidden rounded-3xl border bg-gradient-primary p-8 text-primary-foreground">
                <Stethoscope className="h-9 w-9" />
                <h3 className="mt-5 text-2xl font-bold">Praxis- & Gewerbehygiene</h3>
                <p className="mt-2 max-w-md opacity-80">Hygiene auf höchstem Standard für Arztpraxen, Verkaufsräume & Geschäftsgebäude – außerhalb Ihrer Öffnungszeiten.</p>
                <button onClick={() => setWizard(true)} className="mt-6 inline-flex items-center gap-2 font-bold underline-offset-4 hover:underline">Angebot anfragen <ArrowRight className="h-4 w-4" /></button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TIMELINE */}
        <section id="prozess" className="relative border-y bg-card/30 py-28">
          <div className="mx-auto max-w-6xl px-4">
            <Head k="Die 3-Schritte-Partnerschaft" t="Vom Klick zum Glanz." />
            <div className="relative grid gap-12 md:grid-cols-3">
              <motion.div className="absolute left-0 right-0 top-8 hidden h-px origin-left bg-gradient-primary md:block"
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeInOut" }} />
              {[
                [Send, "Digitale Anfrage", "In 2 Minuten über unseren Konfigurator oder per Anruf."],
                [ScanSearch, "Vor-Ort-Analyse & Festpreis", "Kostenlose Besichtigung – Sie erhalten ein transparentes Festpreis-Angebot."],
                [Sparkles, "Glänzendes Ergebnis", "Pünktliche, gründliche Reinigung mit gemeinsamer Abnahme."],
              ].map(([I, t, d], n) => {
                const Icon = I as typeof Send;
                return (
                  <Reveal key={n} delay={0.3 + n * 0.25}>
                    <div className="relative">
                      <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-background shadow-gold"><Icon className="h-7 w-7 text-primary" /></div>
                      <p className="mt-8 font-display text-6xl font-extrabold text-muted">0{n + 1}</p>
                      <h3 className="mt-2 text-2xl font-bold">{t as string}</h3>
                      <p className="mt-3 text-muted-foreground">{d as string}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="bewertungen" className="mx-auto max-w-6xl px-4 py-28">
          <div className="grid items-center gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Head k="Live Trust-Center" t={<>5.0 von 5.<br /><span className="text-gradient">72+ Stimmen.</span></>} />
              <Reveal>
                <div className="glass inline-flex items-center gap-4 rounded-2xl p-5">
                  <span className="font-display text-5xl font-extrabold">5.0</span>
                  <div><Stars c="h-5 w-5" /><p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><BadgeCheck className="h-4 w-4 text-primary" /> Verifiziert auf Google</p></div>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-3">
              <Reveal>
                <div className="glass relative min-h-[300px] overflow-hidden rounded-3xl p-8 sm:p-10">
                  <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
                  <AnimatePresence mode="wait">
                    <motion.figure key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }} className="relative">
                      <div className="flex items-center justify-between"><Stars c="h-5 w-5" /><span className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-muted-foreground"><BadgeCheck className="h-3.5 w-3.5 text-primary" /> Google-Rezension</span></div>
                      <blockquote className="mt-6 font-display text-2xl font-medium leading-snug sm:text-3xl">„{r[2]}“</blockquote>
                      <figcaption className="mt-8 flex items-center gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-primary font-bold text-primary-foreground">{r[0].charAt(0)}</span>
                        <span><b className="block">{r[0]}</b><span className="text-sm text-muted-foreground">{r[1]}</span></span>
                      </figcaption>
                    </motion.figure>
                  </AnimatePresence>
                </div>
              </Reveal>
              <div className="mt-6 flex items-center gap-3">
                <button aria-label="Vorherige Bewertung" onClick={() => setI((i + REVIEWS.length - 1) % REVIEWS.length)} className="glass lift grid h-11 w-11 place-items-center rounded-full"><ChevronLeft /></button>
                <button aria-label="Nächste Bewertung" onClick={() => setI((i + 1) % REVIEWS.length)} className="glass lift grid h-11 w-11 place-items-center rounded-full"><ChevronRight /></button>
                <div className="ml-2 flex gap-1.5">{REVIEWS.map((_, n) => <button key={n} aria-label={`Bewertung ${n + 1}`} onClick={() => setI(n)} className={`h-1.5 rounded-full transition-all ${n === i ? "w-8 bg-primary" : "w-3 bg-muted"}`} />)}</div>
              </div>
            </div>
          </div>
        </section>

        {/* WIZARD INLINE */}
        <section id="angebot" className="relative overflow-hidden border-t py-28">
          <div className="absolute left-1/2 top-0 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
            <Head k="Preis- & Anfrage-Konfigurator" t={<>Ihr Angebot in <span className="text-gradient">3 Klicks.</span></>} s="Objektart wählen, Fläche schätzen, Kontakt hinterlassen – wir melden uns innerhalb von 24 Stunden mit einem Festpreis." />
            <Reveal delay={0.15}><Wizard /></Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />

      <AnimatePresence>
        {wizard && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] grid place-items-center bg-background/70 p-4 backdrop-blur-md" onClick={() => setWizard(false)}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} role="dialog" aria-modal="true" aria-label="Angebots-Konfigurator" className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <Wizard onClose={() => setWizard(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
