import { Link } from "@tanstack/react-router";
import { Phone, Zap, MapPin, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

export const PHONE = "0221 65079264";
export const PHONE_HREF = "tel:+4922165079264";

const NAV = [
  ["Home", "#home"],
  ["Über uns", "#ueber-uns"],
  ["Leistungen", "#leistungen"],
  ["Bewertungen", "#bewertungen"],
  ["3-Schritte-Prozess", "#prozess"],
  ["Kontakt", "#kontakt"],
] as const;

export function Logo({ light }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
        <Sparkles className="h-5 w-5" />
      </span>
      <span className={`font-display leading-tight ${light ? "text-primary-foreground" : "text-primary-deep"}`}>
        <span className="block text-lg font-bold">Fleckenlos</span>
        <span className="block text-[11px] font-medium uppercase tracking-widest opacity-70">Gebäudereinigung</span>
      </span>
    </span>
  );
}

export function Header({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const href = (h: string) => (home ? h : `/${h}`);
  return (
    <header className="sticky top-0 z-40">
      <div className="bg-primary-deep text-primary-foreground text-xs sm:text-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2">
          <a href={PHONE_HREF} className="flex items-center gap-1.5 font-semibold hover:text-gold">
            <Phone className="h-3.5 w-3.5" /> {PHONE}
          </a>
          <span className="hidden items-center gap-1.5 md:flex">
            <Zap className="h-3.5 w-3.5 text-gold" /> Notfall & kurzfristige Termine möglich
          </span>
          <span className="flex items-center gap-1.5 opacity-90">
            <MapPin className="h-3.5 w-3.5" /> Düsseldorf · Essen · Köln · Monheim
          </span>
        </div>
      </div>
      <div className="border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" aria-label="Fleckenlos Startseite"><Logo /></Link>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Hauptnavigation">
            {NAV.map(([l, h]) => (
              <a key={h} href={href(h)} className="text-sm font-medium text-foreground/80 hover:text-primary">{l}</a>
            ))}
          </nav>
          <a href={href("#kontakt")} className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-gold-foreground shadow-gold transition hover:-translate-y-0.5 sm:inline-flex">
            Jetzt Angebot anfordern
          </a>
          <button className="lg:hidden p-2" aria-label="Menü öffnen" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="border-t px-4 pb-4 lg:hidden">
            {NAV.map(([l, h]) => (
              <a key={h} href={href(h)} onClick={() => setOpen(false)} className="block py-3 font-medium border-b last:border-0">{l}</a>
            ))}
            <a href={href("#kontakt")} onClick={() => setOpen(false)} className="mt-3 block rounded-full bg-gold py-3 text-center font-bold text-gold-foreground">
              Jetzt Angebot anfordern
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Logo light />
          <p className="text-sm opacity-80">Zuverlässige Reinigungsleistungen für Büros, Praxen, Bau & Gewerbe im Rhein- und Ruhrgebiet.</p>
        </div>
        <div className="text-sm space-y-2">
          <h3 className="font-bold text-base mb-2">Kontakt</h3>
          <p>Fleckenlos Gebäudereinigung</p>
          <p>Telefon: <a href={PHONE_HREF} className="underline hover:text-gold">{PHONE}</a></p>
          <p className="opacity-80">Einsatzgebiet: Rhein-Ruhr-Region</p>
        </div>
        <div className="text-sm space-y-2">
          <h3 className="font-bold text-base mb-2">Rechtliches</h3>
          <Link to="/impressum" className="block hover:text-gold">Impressum</Link>
          <Link to="/datenschutz" className="block hover:text-gold">Datenschutzerklärung</Link>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs opacity-75 space-y-1">
          <p>© {new Date().getFullYear()} Fleckenlos Gebäudereinigung. Alle Rechte vorbehalten.</p>
          <p>
            Website entwickelt & betreut von HARDAN Industries (Rankestraße 18, 45144 Essen) · Technische Anfragen:{" "}
            <a href="mailto:contact.hardanindustries@gmail.com" className="underline">contact.hardanindustries@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
