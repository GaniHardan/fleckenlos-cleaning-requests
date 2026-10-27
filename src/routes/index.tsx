import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2, HardHat, AppWindow, Home as HomeIcon, Stethoscope, Umbrella, Clock, Zap, BadgeEuro,
  Star, Phone, ShieldCheck, MapPin, PhoneCall, ClipboardCheck, Sparkles, X, ChevronLeft, ChevronRight, Check,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import team from "@/assets/team.jpg";
import { Header, Footer, PHONE, PHONE_HREF } from "@/components/site/Chrome";
import { ContactForm } from "@/components/site/ContactForm";
import { ChatBot } from "@/components/site/ChatBot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fleckenlos Gebäudereinigung – Rhein-Ruhr | Büro, Bau & Glas" },
      { name: "description", content: "Büro-, Bauend-, Glas- und Terrassendachreinigung in Düsseldorf, Essen, Köln & Monheim. 5.0 ★ bei Google. Kurzfristige Termine. Jetzt kostenloses Angebot anfordern." },
      { property: "og:title", content: "Fleckenlos Gebäudereinigung – Rhein- und Ruhrgebiet" },
      { property: "og:description", content: "Pünktlich, gründlich, flexibel: Reinigung für Büros, Praxen, Bau & Gewerbe. 5.0 ★ Google-Bewertung." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SERVICES = [
  { icon: Building2, t: "Büro- & Unterhaltsreinigung", d: "Wöchentliche oder tägliche Sauberkeit für eine produktive Arbeitsatmosphäre.", more: ["Arbeitsplätze, Küchen & Sanitär", "Feste Reinigungsteams", "Flexible Intervalle – täglich bis wöchentlich"] },
  { icon: HardHat, t: "Bauendreinigung & Baustellenreinigung", d: "Gründliche Entfernung von Baustaub und Müll – bezugsfertig & pünktlich.", more: ["Grob-, Fein- & Endreinigung", "Termingerechte Übergabe", "Persönlicher Ansprechpartner: Herr Zada"] },
  { icon: AppWindow, t: "Glas- & Fensterreinigung", d: "Streifenfreier Glanz und fantastischer Ausblick für Gewerbe & Wohngebäude.", more: ["Fenster, Rahmen & Falze", "Schaufenster & Glasfassaden", "Wintergärten"] },
  { icon: Umbrella, t: "Terrassendach- & Sonderreinigung", d: "Spezialreinigung für Terrassendächer, Überdächer und schwierige Flächen – wie neu!", more: ["Glas- & Polycarbonatdächer", "Entfernung von Moos & Algen", "Schonende Spezialmittel"] },
  { icon: Stethoscope, t: "Praxis- & Gewerbereinigung", d: "Hygiene auf höchstem Standard für Arztpraxen, Verkaufsräume & Geschäftsgebäude.", more: ["Hygienegerechte Reinigung", "Reinigung außerhalb der Öffnungszeiten", "Verkaufs- & Empfangsflächen"] },
  { icon: HomeIcon, t: "Haushalts- & Grundreinigung", d: "Einmalige oder regelmäßige Tiefenreinigung für private Immobilien.", more: ["Grundreinigung bei Ein- & Auszug", "Regelmäßige Haushaltsreinigung", "Küche, Bad & Böden in der Tiefe"] },
];

const REVIEWS = [
  ["Azimi Nasir", "Ich habe die Bauendreinigung in Anspruch genommen... Herr Zada hat mich freundlich beraten. Pünktlich und professionell!"],
  ["Elli Weber", "Terrassendach sieht wieder aus wie neu! Besonders positiv: Hatte sogar kurzfristig noch einen Termin bekommen."],
  ["Ella Paul", "Sehr zufrieden mit der wöchentlichen Büroreinigung. Das Team ist zuverlässig, gründlich und freundlich."],
  ["Nils Decker", "Nachdem ich bei 4 Anbietern abgelehnt wurde, bot mir Fleckenlos sehr kurzfristig einen Termin an. Pünktlich & sehr gründlich!"],
  ["Princess Anna", "Heute angerufen und sofort einen Termin erhalten. Alles lief reibungslos, preislich super tragbar!"],
  ["Calogero Lavore", "Immer top – ich lasse mein Haus und mein Geschäft reinigen. Zuverlässig, schnell und sauber!"],
];

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return <span className="flex text-gold" aria-label="5 von 5 Sternen">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`${className} fill-current`} />)}</span>;
}

function SectionHead({ k, t, s }: { k: string; t: string; s?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">{k}</p>
      <h2 className="text-3xl font-bold text-primary-deep sm:text-4xl">{t}</h2>
      {s && <p className="mt-4 text-muted-foreground">{s}</p>}
    </div>
  );
}

function Index() {
  const [modal, setModal] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const pages = 3; // 2 per page on desktop
  const svc = modal !== null ? SERVICES[modal] : null;

  return (
    <div>
      <Header />
      <main>
        {/* HERO */}
        <section id="home" className="relative overflow-hidden">
          <img src={hero} alt="Glänzende Glasfassade eines Bürogebäudes" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 text-primary-foreground sm:py-28 lg:py-36">
            <div className="mb-8 flex flex-wrap gap-2">
              <span className="flex items-center gap-2 rounded-full bg-background/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                <b>5.0</b> <Stars /> Google Bewertung (72+ Rezensionen)
              </span>
              <span className="flex items-center gap-2 rounded-full bg-background/15 px-4 py-2 text-sm font-semibold backdrop-blur"><ShieldCheck className="h-4 w-4 text-accent" /> Über 3 Jahre Erfahrung</span>
              <span className="flex items-center gap-2 rounded-full bg-background/15 px-4 py-2 text-sm font-semibold backdrop-blur"><MapPin className="h-4 w-4 text-accent" /> Rhein-Ruhr-Region</span>
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
              Erstklassige Sauberkeit & Werterhalt für Ihr Gebäude im Rhein- und Ruhrgebiet
            </h1>
            <p className="mt-6 max-w-2xl text-lg opacity-90">
              Ob Büroreinigung, Bauendreinigung, Terrassendach- oder Glasreinigung – pünktlich, gründlich und flexibel. Auch kurzfristige Termine möglich!
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#kontakt" className="rounded-full bg-gold px-8 py-4 text-center font-bold text-gold-foreground shadow-gold transition hover:-translate-y-0.5">Kostenloses Angebot anfordern</a>
              <a href={PHONE_HREF} className="flex items-center justify-center gap-2 rounded-full border-2 border-primary-foreground/60 px-8 py-4 font-bold transition hover:bg-background/10">
                <Phone className="h-4 w-4" /> Telefon: {PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* VALUE PROPS */}
        <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-4">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [Clock, "Maximale Pünktlichkeit & Zuverlässigkeit", "Feste Termine, auf die Sie sich zu 100% verlassen können."],
              [Zap, "Flexibel & Kurzfristig", "Sie brauchen schnell Hilfe? Wir bieten auch sehr kurzfristige Reinigungstermine."],
              [BadgeEuro, "Faire Pauschalpreise", "Volle Preistransparenz ohne versteckte Kosten – maßgeschneidert auf Ihr Objekt."],
            ].map(([I, t, d]) => {
              const Icon = I as typeof Clock;
              return (
                <div key={t as string} className="rounded-2xl border bg-background p-7 shadow-card">
                  <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-6 w-6" /></span>
                  <h3 className="text-lg font-bold text-primary-deep">{t as string}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ABOUT */}
        <section id="ueber-uns" className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 lg:grid-cols-2">
          <div className="relative">
            <img src={team} alt="Das Fleckenlos-Team bei der Büroreinigung" loading="lazy" width={1200} height={912} className="rounded-3xl object-cover shadow-card" />
            <div className="absolute -bottom-6 -right-2 rounded-2xl bg-gradient-primary p-5 text-primary-foreground shadow-card sm:right-6">
              <p className="font-display text-3xl font-extrabold">3+ Jahre</p>
              <p className="text-sm opacity-90">makellose Sauberkeit</p>
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">Über uns</p>
            <h2 className="text-3xl font-bold text-primary-deep sm:text-4xl">Das Fleckenlos Team</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Fleckenlos Gebäudereinigung steht für höchste Qualität, Freundlichkeit und gründliche Arbeit. Unter der Führung von Herrn Zada sorgt unser geschultes Team seit über 3 Jahren für makellose Sauberkeit in Büros, Praxen, Gewerbeobjekten und Privathaushalten im gesamten Rhein-Ruhr-Gebiet.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Geschultes Fachpersonal", "Persönliche Beratung durch Herrn Zada", "Büros, Praxen & Gewerbe", "Privathaushalte"].map((x) => (
                <li key={x} className="flex items-center gap-2 font-semibold"><Check className="h-5 w-5 text-primary" /> {x}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* SERVICES */}
        <section id="leistungen" className="bg-card py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHead k="Leistungen" t="Unser Leistungsportfolio" s="Professionelle Reinigung für jedes Objekt – klicken Sie für Details." />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s, i) => (
                <button key={s.t} onClick={() => setModal(i)} className="group rounded-2xl border bg-background p-7 text-left shadow-card transition hover:-translate-y-1 hover:border-primary">
                  <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground"><s.icon className="h-7 w-7" /></span>
                  <h3 className="text-lg font-bold text-primary-deep">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                  <span className="mt-5 inline-block text-sm font-bold text-primary group-hover:underline">Mehr erfahren →</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="prozess" className="mx-auto max-w-7xl px-4 py-24">
          <SectionHead k="So einfach geht's" t="In 3 Schritten zum sauberen Objekt" />
          <div className="relative grid gap-10 md:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-10 hidden border-t-2 border-dashed border-primary/30 md:block" />
            {[
              [PhoneCall, "Schnelle Anfrage", `Per Formular oder Anruf unter ${PHONE}.`],
              [ClipboardCheck, "Besichtigung & Festpreis-Angebot", "Kostenlos und unverbindlich vor Ort oder digital."],
              [Sparkles, "Professionelle Reinigung & Abnahme", "Gründlich, pünktlich und zur vollsten Zufriedenheit."],
            ].map(([I, t, d], i) => {
              const Icon = I as typeof PhoneCall;
              return (
                <div key={t as string} className="relative text-center">
                  <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-card">
                    <Icon className="h-8 w-8" />
                    <span className="absolute -right-1 -top-1 grid h-8 w-8 place-items-center rounded-full bg-gold text-sm font-extrabold text-gold-foreground">{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-primary-deep">Schritt {i + 1}: {t as string}</h3>
                  <p className="mt-2 text-muted-foreground">{d as string}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* REVIEWS */}
        <section id="bewertungen" className="bg-gradient-primary py-24 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 flex flex-col items-center text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">Echte Google-Rezensionen</p>
              <h2 className="text-3xl font-bold sm:text-4xl">Das sagen unsere Kunden</h2>
              <div className="mt-6 flex items-center gap-3 rounded-full bg-background/15 px-6 py-3">
                <span className="font-display text-3xl font-extrabold">5.0</span><Stars className="h-5 w-5" /><span className="text-sm opacity-90">72 Rezensionen</span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${slide * 100}%)` }}>
                {Array.from({ length: pages }).map((_, p) => (
                  <div key={p} className="grid w-full shrink-0 gap-6 px-1 md:grid-cols-2">
                    {REVIEWS.slice(p * 2, p * 2 + 2).map(([n, q]) => (
                      <figure key={n} className="rounded-2xl bg-background p-7 text-foreground shadow-card">
                        <Stars />
                        <blockquote className="mt-4 text-lg leading-relaxed">„{q}“</blockquote>
                        <figcaption className="mt-5 flex items-center gap-3">
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary font-bold text-primary">{n[0]}</span>
                          <span><b className="block">{n}</b><span className="text-xs text-muted-foreground">Google-Rezension</span></span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button aria-label="Vorherige Bewertungen" onClick={() => setSlide((slide + pages - 1) % pages)} className="grid h-11 w-11 place-items-center rounded-full bg-background/15 hover:bg-background/25"><ChevronLeft /></button>
              {Array.from({ length: pages }).map((_, i) => (
                <button key={i} aria-label={`Seite ${i + 1}`} onClick={() => setSlide(i)} className={`h-2.5 rounded-full transition-all ${i === slide ? "w-8 bg-gold" : "w-2.5 bg-background/40"}`} />
              ))}
              <button aria-label="Nächste Bewertungen" onClick={() => setSlide((slide + 1) % pages)} className="grid h-11 w-11 place-items-center rounded-full bg-background/15 hover:bg-background/25"><ChevronRight /></button>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="kontakt" className="bg-card py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">Kontakt</p>
              <h2 className="text-3xl font-bold text-primary-deep sm:text-4xl">Jetzt kostenloses & unverbindliches Angebot anfordern</h2>
              <p className="mt-5 text-muted-foreground">Schildern Sie uns kurz Ihr Objekt – wir melden uns innerhalb von 24 Stunden mit einem fairen Festpreis-Angebot.</p>
              <a href={PHONE_HREF} className="mt-8 flex items-center gap-4 rounded-2xl bg-background p-5 shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><Phone /></span>
                <span><span className="block text-sm text-muted-foreground">Lieber direkt anrufen?</span><b className="text-xl text-primary-deep">{PHONE}</b></span>
              </a>
            </div>
            <div className="lg:col-span-3"><ContactForm /></div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />

      {svc && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-foreground/50 p-4" onClick={() => setModal(null)}>
          <div role="dialog" aria-modal="true" aria-label={svc.t} className="w-full max-w-lg rounded-3xl bg-background p-8 shadow-card" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground"><svc.icon className="h-7 w-7" /></span>
              <button aria-label="Schließen" onClick={() => setModal(null)}><X /></button>
            </div>
            <h3 className="mt-5 text-2xl font-bold text-primary-deep">{svc.t}</h3>
            <p className="mt-3 text-muted-foreground">{svc.d}</p>
            <ul className="mt-5 space-y-2">{svc.more.map((m) => <li key={m} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-primary" />{m}</li>)}</ul>
            <a href="#kontakt" onClick={() => setModal(null)} className="mt-8 block rounded-full bg-gold py-3.5 text-center font-bold text-gold-foreground shadow-gold">Angebot anfordern</a>
          </div>
        </div>
      )}
    </div>
  );
}
