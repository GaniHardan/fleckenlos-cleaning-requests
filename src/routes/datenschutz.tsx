import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Header, Footer } from "@/components/site/Chrome";
import { AGENCY, COMPANY, EMAIL_HREF, PRIVACY } from "@/config/company";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung – Fleckenlos Gebäudereinigung" },
      { name: "description", content: "Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO." },
      { property: "og:title", content: "Datenschutzerklärung – Fleckenlos Gebäudereinigung" },
      { property: "og:description", content: "DSGVO-Informationen der Fleckenlos Gebäudereinigung." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Datenschutz,
});

function S({ n, t, children }: { n: number; t: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold">{n}. {t}</h2>
      {children}
    </section>
  );
}

/** Anbieter · Zweck · Rechtsgrundlage · Speicherdauer */
function Facts({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="grid gap-x-4 gap-y-1 text-sm sm:grid-cols-[10rem_1fr]">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="font-semibold">{k}</dt>
          <dd className="text-muted-foreground">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Datenschutz() {
  return (
    <div>
      <Header home={false} />
      <main className="mx-auto max-w-3xl space-y-8 px-4 pb-16 pt-32 leading-relaxed">
        <h1 className="text-4xl font-bold text-primary-deep">Datenschutzerklärung</h1>

        <S n={1} t="Verantwortlicher">
          <p>
            {COMPANY.name}, Inhaber {COMPANY.owner}, {COMPANY.street}, {COMPANY.zip} {COMPANY.city}
            <br />
            Telefon: {COMPANY.phone} · E-Mail: <a href={EMAIL_HREF} className="text-primary hover:underline">{COMPANY.email}</a>
          </p>
          <p className="text-sm text-muted-foreground">
            Technische Betreuung der Website (Auftragsverarbeiter): {AGENCY.name}, {AGENCY.address}, {AGENCY.email}.
          </p>
        </S>

        <S n={2} t="Hosting und Auslieferung der Website">
          <p>Die Website wird über die Plattform Lovable betrieben und über das Netzwerk von Cloudflare ausgeliefert.</p>
          <Facts rows={[
            ["Anbieter", "Lovable Labs Incorporated AB (Schweden); Cloudflare, Inc. (USA)"],
            ["Zweck", "Bereitstellung, Auslieferung und Absicherung der Website (u. a. Schutz vor Angriffen)"],
            ["Rechtsgrundlage", "Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren, stabilen Betrieb)"],
            ["Drittland", "Übermittlung in die USA auf Grundlage des EU-US Data Privacy Framework (Angemessenheitsbeschluss der EU-Kommission vom 10.07.2023), ergänzend Standardvertragsklauseln"],
            ["Speicherdauer", "siehe Abschnitt „Server-Logfiles“"],
          ]} />
        </S>

        <S n={3} t="Server-Logfiles">
          <p>Beim Aufruf der Website verarbeiten unsere Hosting-Dienstleister automatisch technische Daten: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Referrer-URL, Browser und Betriebssystem.</p>
          <Facts rows={[
            ["Anbieter", "Lovable / Cloudflare (siehe Abschnitt 2)"],
            ["Zweck", "Technische Bereitstellung, Fehleranalyse, Abwehr von Missbrauch"],
            ["Rechtsgrundlage", "Art. 6 Abs. 1 lit. f DSGVO"],
            ["Speicherdauer", "Kurzfristig, in der Regel höchstens 30 Tage; danach Löschung oder Anonymisierung"],
          ]} />
        </S>

        <S n={4} t="Kontaktformular und Chat">
          <p>Wenn Sie uns über das Angebotsformular oder den Chat eine Anfrage senden, verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse und/oder Telefonnummer, die gewünschte Leistung, Angaben zum Objekt (z. B. Objektart, Fläche, Häufigkeit) sowie Ihre Nachricht.</p>
          <Facts rows={[
            ["Zweck", "Bearbeitung Ihrer Anfrage und Erstellung eines Angebots"],
            ["Rechtsgrundlage", "Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen auf Ihre Anfrage)"],
            ["Speicherdauer", "Automatische Löschung nach 12 Monaten, sofern kein Auftrag zustande kommt; bei Auftragserteilung gelten die gesetzlichen Aufbewahrungsfristen (§ 147 AO, § 257 HGB)"],
            ["Pflicht", "Die Angaben sind freiwillig; ohne Kontaktdaten können wir Ihre Anfrage aber nicht beantworten."],
          ]} />
        </S>

        <S n={5} t="Datenbank">
          <p>Anfragen werden in einer Datenbank gespeichert, damit keine Anfrage verloren geht.</p>
          <Facts rows={[
            ["Anbieter", <>Supabase, Inc. (über Lovable Cloud), Serverstandort: {PRIVACY.supabaseRegion}</>],
            ["Zweck", "Sichere Speicherung der Anfragen aus Formular und Chat"],
            ["Rechtsgrundlage", "Art. 6 Abs. 1 lit. b DSGVO; Auftragsverarbeitung nach Art. 28 DSGVO"],
            ["Drittland", "Supabase, Inc. hat ihren Sitz außerhalb der EU; soweit ein Zugriff aus Drittländern möglich ist, erfolgt er auf Grundlage von Standardvertragsklauseln"],
            ["Speicherdauer", "12 Monate (automatische Löschung, siehe Abschnitt 4)"],
          ]} />
        </S>

        <S n={6} t="E-Mail-Versand">
          <p>Damit wir Ihre Anfrage sofort erhalten, wird sie per E-Mail an unser Postfach weitergeleitet.</p>
          <Facts rows={[
            ["Anbieter", <>{PRIVACY.mailProvider}; Versand über die EU-Region (Irland)</>],
            ["Zweck", "Zustellung Ihrer Anfrage an uns"],
            ["Rechtsgrundlage", "Art. 6 Abs. 1 lit. b DSGVO; Auftragsverarbeitung nach Art. 28 DSGVO"],
            ["Drittland", "USA, auf Grundlage des EU-US Data Privacy Framework bzw. von Standardvertragsklauseln"],
            ["Speicherdauer", "Beim Anbieter nur so lange, wie für die Zustellung und den Nachweis erforderlich (in der Regel max. 30 Tage); in unserem Postfach wie in Abschnitt 4"],
          ]} />
        </S>

        <S n={7} t="Spam-Schutz">
          <p>Zum Schutz vor automatisierten Massenanfragen begrenzen wir die Zahl der Anfragen pro Absender. Dazu speichern wir zu jeder Anfrage einen kryptografischen Hashwert (SHA-256 mit geheimem Schlüssel) Ihrer IP-Adresse. Die IP-Adresse selbst wird nicht gespeichert; aus dem Hashwert lässt sie sich nicht ohne Weiteres zurückrechnen. Außerdem verwenden wir ein unsichtbares Formularfeld und eine Mindest-Ausfüllzeit, um Bots zu erkennen.</p>
          <Facts rows={[
            ["Zweck", "Schutz vor Spam und Missbrauch des Formulars und des Chats"],
            ["Rechtsgrundlage", "Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem funktionsfähigen, missbrauchsfreien Anfragekanal)"],
            ["Speicherdauer", "Zusammen mit der Anfrage, höchstens 12 Monate"],
          ]} />
        </S>

        <S n={8} t="Schriftarten, Cookies und Tracking">
          <p>Alle Schriftarten werden lokal von unserem Server geladen; es findet keine Verbindung zu Google-Servern statt. Wir setzen keine Cookies zu Analyse- oder Werbezwecken und verwenden keine Tracking-Dienste. Der Link „Alle Bewertungen auf Google ansehen“ führt zu Google; dort gilt die Datenschutzerklärung von Google. Daten werden erst übertragen, wenn Sie den Link anklicken.</p>
        </S>

        <S n={9} t="Ihre Rechte">
          <p>Sie haben jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21). Eine formlose Nachricht an <a href={EMAIL_HREF} className="text-primary hover:underline">{COMPANY.email}</a> genügt.</p>
        </S>

        <S n={10} t="Beschwerderecht bei der Aufsichtsbehörde">
          <p>Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Für uns zuständig ist: Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW), Kavalleriestraße 2–4, 40213 Düsseldorf, www.ldi.nrw.de.</p>
        </S>

        <p className="text-sm text-muted-foreground">Stand: {PRIVACY.lastUpdated}</p>
      </main>
      <Footer />
    </div>
  );
}
