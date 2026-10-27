import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, PHONE } from "@/components/site/Chrome";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum – Fleckenlos Gebäudereinigung" },
      { name: "description", content: "Impressum und Anbieterkennzeichnung der Fleckenlos Gebäudereinigung." },
      { property: "og:title", content: "Impressum – Fleckenlos Gebäudereinigung" },
      { property: "og:description", content: "Anbieterkennzeichnung gemäß § 5 DDG." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <div>
      <Header home={false} />
      <main className="mx-auto max-w-3xl space-y-6 px-4 pb-16 pt-32 leading-relaxed">
        <h1 className="text-4xl font-bold text-primary-deep">Impressum</h1>
        <section><h2 className="text-xl font-bold">Angaben gemäß § 5 DDG</h2>
          <p>Fleckenlos Gebäudereinigung<br />Inhaber: Herr Zada<br />[Straße und Hausnummer]<br />[PLZ Ort]</p></section>
        <section><h2 className="text-xl font-bold">Kontakt</h2><p>Telefon: {PHONE}<br />E-Mail: [E-Mail-Adresse]</p></section>
        <section><h2 className="text-xl font-bold">Umsatzsteuer</h2>
          <p>Gemäß § 19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer berechnet und daher auch nicht ausgewiesen.</p></section>
        <section><h2 className="text-xl font-bold">Verbraucherstreitbeilegung</h2>
          <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p></section>
        <section><h2 className="text-xl font-bold">Webdesign & technische Betreuung</h2>
          <p>HARDAN Industries, Rankestraße 18, 45144 Essen<br />E-Mail: contact.hardanindustries@gmail.com</p></section>
      </main>
      <Footer />
    </div>
  ),
});
