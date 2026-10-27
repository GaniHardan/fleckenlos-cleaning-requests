import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, PHONE } from "@/components/site/Chrome";

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
  component: () => (
    <div>
      <Header home={false} />
      <main className="mx-auto max-w-3xl space-y-6 px-4 pb-16 pt-32 leading-relaxed">
        <h1 className="text-4xl font-bold text-primary-deep">Datenschutzerklärung</h1>
        <section><h2 className="text-xl font-bold">1. Verantwortlicher</h2>
          <p>Fleckenlos Gebäudereinigung, Inhaber Herr Zada, [Anschrift], Telefon: {PHONE}.</p></section>
        <section><h2 className="text-xl font-bold">2. Kontaktformular & Chat</h2>
          <p>Wenn Sie uns über das Kontaktformular oder den Chat eine Anfrage senden, verarbeiten wir Name, E-Mail-Adresse, Telefonnummer, gewünschte Leistung und Ihre Nachricht zur Bearbeitung der Anfrage und Erstellung eines Angebots (Art. 6 Abs. 1 lit. b DSGVO). Die Daten werden auf Servern unseres Hosting-Dienstleisters gespeichert und gelöscht, sobald sie für den Zweck nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten bestehen.</p></section>
        <section><h2 className="text-xl font-bold">3. Server-Logfiles</h2>
          <p>Beim Aufruf der Website werden technisch notwendige Daten (z. B. IP-Adresse, Datum, Uhrzeit, Browser) verarbeitet, um die Website sicher bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO).</p></section>
        <section><h2 className="text-xl font-bold">4. Ihre Rechte</h2>
          <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch (Art. 15–21 DSGVO).</p></section>
        <section><h2 className="text-xl font-bold">5. Beschwerderecht bei der Aufsichtsbehörde</h2>
          <p>Zuständige Aufsichtsbehörde: Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW), Kavalleriestraße 2–4, 40213 Düsseldorf, www.ldi.nrw.de.</p></section>
        <section><h2 className="text-xl font-bold">6. Technische Betreuung</h2>
          <p>HARDAN Industries, Rankestraße 18, 45144 Essen, contact.hardanindustries@gmail.com.</p></section>
      </main>
      <Footer />
    </div>
  ),
});
