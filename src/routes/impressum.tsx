import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/site/Chrome";
import { AGENCY, COMPANY, EMAIL_HREF } from "@/config/company";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum – Fleckenlos Gebäudereinigung" },
      {
        name: "description",
        content: "Impressum und Anbieterkennzeichnung der Fleckenlos Gebäudereinigung.",
      },
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
        <section>
          <h2 className="text-xl font-bold">Angaben gemäß § 5 DDG</h2>
          <p>
            {COMPANY.name}
            <br />
            Inhaber: {COMPANY.owner}
            <br />
            {COMPANY.street}
            <br />
            {COMPANY.zip} {COMPANY.city}
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Kontakt</h2>
          <p>
            Telefon:{" "}
            <a href={COMPANY.phoneHref} className="text-primary hover:underline">
              {COMPANY.phone}
            </a>
            <br />
            E-Mail:{" "}
            <a href={EMAIL_HREF} className="text-primary hover:underline">
              {COMPANY.email}
            </a>
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Umsatzsteuer</h2>
          <p>
            Gemäß § 19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer berechnet und daher
            auch nicht ausgewiesen.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Verantwortlich für den Inhalt</h2>
          <p>{COMPANY.owner}, Anschrift wie oben.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Datenschutz-Aufsichtsbehörde</h2>
          <p>
            Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI
            NRW), Kavalleriestraße 2–4, 40213 Düsseldorf.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Verbraucherstreitbeilegung</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Webdesign & technische Betreuung</h2>
          <p>
            {AGENCY.name}, {AGENCY.address}
            <br />
            E-Mail: {AGENCY.email}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  ),
});
