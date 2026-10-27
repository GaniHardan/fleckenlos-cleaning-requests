import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

export const PHONE = "0221 65079264";
export const PHONE_HREF = "tel:+4922165079264";

const NAV = [
  ["Leistungen", "#leistungen"],
  ["Ablauf", "#prozess"],
  ["Bewertungen", "#bewertungen"],
  ["Angebot", "#angebot"],
] as const;

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-gold"><Sparkles className="h-5 w-5" /></span>
      <span className="font-display leading-tight">
        <span className="block text-lg font-bold tracking-tight">Fleckenlos</span>
        <span className="block text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">Gebäudereinigung</span>
      </span>
    </span>
  );
}

export function Header({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const href = (h: string) => (home ? h : `/${h}`);
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5">
        <Link to="/" aria-label="Fleckenlos Startseite"><Logo /></Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Hauptnavigation">
          {NAV.map(([l, h]) => <a key={h} href={href(h)} className="text-sm font-medium text-muted-foreground transition hover:text-foreground">{l}</a>)}
        </nav>
        <a href={PHONE_HREF} className="btn-glow hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold sm:flex"><Phone className="h-4 w-4" />{PHONE}</a>
        <button className="p-2 md:hidden" aria-label="Menü" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-4 md:hidden">
          {NAV.map(([l, h]) => <a key={h} href={href(h)} onClick={() => setOpen(false)} className="block border-b py-3 font-medium last:border-0">{l}</a>)}
          <a href={PHONE_HREF} className="btn-glow mt-3 block rounded-full py-3 text-center font-bold">Anrufen: {PHONE}</a>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-3">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground">High-End Gebäudereinigung für Büros, Praxen, Bau und Gewerbe im Rhein-Ruhr-Gebiet.</p>
        </div>
        <div className="space-y-2 text-sm">
          <h3 className="mb-3 font-bold">Kontakt</h3>
          <p>Fleckenlos Gebäudereinigung</p>
          <p>Tel: <a href={PHONE_HREF} className="text-primary hover:underline">{PHONE}</a></p>
          <p className="text-muted-foreground">Düsseldorf · Essen · Köln · Monheim</p>
        </div>
        <div className="space-y-2 text-sm">
          <h3 className="mb-3 font-bold">Rechtliches</h3>
          <Link to="/impressum" className="block text-muted-foreground hover:text-primary">Impressum</Link>
          <Link to="/datenschutz" className="block text-muted-foreground hover:text-primary">Datenschutz</Link>
          <p className="pt-2 text-xs text-muted-foreground">Kleinunternehmer gem. § 19 UStG</p>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Fleckenlos Gebäudereinigung</p>
          <p>Entwickelt & optimiert von <span className="text-foreground">HARDAN Industries</span> (Rankestraße 18, 45144 Essen) · <a href="mailto:contact.hardanindustries@gmail.com" className="hover:text-primary">contact.hardanindustries@gmail.com</a></p>
        </div>
      </div>
    </footer>
  );
}
