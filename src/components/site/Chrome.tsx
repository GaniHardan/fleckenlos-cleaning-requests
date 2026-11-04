import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/fleckenlos-logo-circle.png.asset.json";

import { ADDRESS, AGENCY, COMPANY, EMAIL_HREF } from "@/config/company";

const NAV = [
  ["Home", "#top"],
  ["Über uns", "#ueber-uns"],
  ["Leistungen", "#leistungen"],
  ["Galerie", "#galerie"],
  ["Bewertungen", "#bewertungen"],
  ["Kontakt", "#angebot"],
] as const;

export function Logo() {
  return (
    <img
      src={logoAsset.url}
      alt="Fleckenlos Gebäudereinigung"
      width={176}
      height={176}
      className="h-14 w-auto transition duration-300 hover:drop-shadow-[0_0_18px_var(--primary)] sm:h-16"
    />
  );
}

export function Header({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const href = (h: string) => (home ? h : `/${h}`);
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3">
      <div className="mx-auto mb-2 hidden max-w-6xl items-center justify-end gap-6 px-4 text-xs text-muted-foreground lg:flex">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          {ADDRESS}
        </span>
        <a href={EMAIL_HREF} className="flex items-center gap-1.5 hover:text-primary">
          <Mail className="h-3.5 w-3.5 text-primary" />
          {COMPANY.email}
        </a>
      </div>
      <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5">
        <Link to="/" aria-label="Fleckenlos Startseite">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Hauptnavigation">
          {NAV.map(([l, h]) => (
            <a
              key={h}
              href={href(h)}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </nav>
        <a
          href={href("#angebot")}
          className="btn-glow pulse-glow hidden rounded-full px-5 py-2.5 text-sm font-bold sm:block"
        >
          Jetzt Angebot anfordern
        </a>
        <button className="p-2 lg:hidden" aria-label="Menü" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-4 lg:hidden">
          {NAV.map(([l, h]) => (
            <a
              key={h}
              href={href(h)}
              onClick={() => setOpen(false)}
              className="block border-b py-3 font-medium last:border-0"
            >
              {l}
            </a>
          ))}
          <a
            href={href("#angebot")}
            onClick={() => setOpen(false)}
            className="btn-glow mt-3 block rounded-full py-3 text-center font-bold"
          >
            Jetzt Angebot anfordern
          </a>
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
          <p className="text-sm text-muted-foreground">
            Zuverlässige & erstklassige Reinigungsleistungen für Büros, Praxen, Bau & Gewerbe in
            Köln.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <h3 className="mb-3 font-bold">Kontakt</h3>
          <p>{COMPANY.name}</p>
          <p className="text-muted-foreground">{ADDRESS}</p>
          <p>
            E-Mail:{" "}
            <a href={EMAIL_HREF} className="text-primary hover:underline">
              {COMPANY.email}
            </a>
          </p>
          <p>
            Tel:{" "}
            <a href={COMPANY.phoneHref} className="text-primary hover:underline">
              {COMPANY.phone}
            </a>
          </p>
          <p className="text-muted-foreground">Einsatzgebiet: {COMPANY.serviceArea}</p>
        </div>
        <div className="space-y-2 text-sm">
          <h3 className="mb-3 font-bold">Rechtliches</h3>
          <Link to="/impressum" className="block text-muted-foreground hover:text-primary">
            Impressum
          </Link>
          <Link to="/datenschutz" className="block text-muted-foreground hover:text-primary">
            Datenschutz (DSGVO)
          </Link>
          <p className="pt-2 text-xs text-muted-foreground">
            Kleinunternehmer gem. § 19 UStG · Aufsicht: LDI NRW
          </p>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}
          </p>
          <p>
            Webdesign & Digitalisierung von <span className="text-foreground">{AGENCY.name}</span> (
            {AGENCY.address}).
          </p>
        </div>
      </div>
    </footer>
  );
}
