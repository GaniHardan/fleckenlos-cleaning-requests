# Fleckenlos Gebäudereinigung – Website

Landingpage der Fleckenlos Gebäudereinigung (Köln & Rheinland) mit Angebots-Konfigurator,
Chat-Assistent und DSGVO-konformer Anfrage-Verarbeitung.
Der ursprüngliche Projekt-Brief liegt unter [`docs/original-brief.md`](docs/original-brief.md).

## Stack

- **TanStack Start** (React 19, file-based Routing, Server Functions), Vite, Bun
- **Tailwind CSS v4**, framer-motion, lucide-react, lokal eingebundene Schriften (@fontsource Manrope/Sora)
- **Lovable Cloud**: Hosting (Cloudflare Workers) und Supabase (Postgres)
- **Resend** für den E-Mail-Versand der Anfragen
- **zod** für die Validierung (ein Schema für Client und Server), **vitest** für Tests

## Projektstruktur

| Pfad | Inhalt |
| --- | --- |
| `src/routes/` | Seiten (`index`, `impressum`, `datenschutz`) und die Cron-Route `api/cron/purge-leads` |
| `src/components/sections/` | Abschnitte der Startseite (Hero, Services, About, Gallery, Process, Reviews, QuoteSection) |
| `src/components/site/` | Header/Footer, Angebots-Wizard, Chatbot, Honeypot |
| `src/content/` | Texte, Bewertungen, Keywords, Bilder |
| `src/config/company.ts` | **Alle** Firmen- und Kontaktdaten (Telefon, E-Mail, Adresse, Google-Profil) |
| `src/lib/lead-schema.ts` | Gemeinsames zod-Schema für Formular und Chat |
| `src/lib/leads.functions.ts` | Server Functions `sendQuoteRequest` und `submitChatLead` |
| `src/lib/leads.server.ts` | Server-Logik: Spam-Schutz, Rate-Limit, Speichern, Mailversand |
| `drizzle/migrations/` | Datenbank-Migrationen |

### Ablauf einer Anfrage

1. Honeypot-Feld `website` gefüllt oder Absenden < 3 s nach dem Öffnen → Erfolg anzeigen, nichts speichern.
2. Rate-Limit: max. 5 Anfragen pro gehashter IP und 100 insgesamt pro Stunde.
3. Speichern in `public.leads` (nur über den Service-Role-Client auf dem Server).
4. Mail an `LEAD_INBOX`; Ergebnis in `mail_status` (`sent`/`failed`). Bei Mailfehler sieht der Kunde trotzdem Erfolg.
5. Anfragen älter als 12 Monate werden täglich gelöscht (pg_cron, sonst Cron-Route).

## Lokales Setup

Voraussetzung: [Bun](https://bun.sh) ≥ 1.2.

```sh
bun install
bun run dev        # Entwicklungsserver
bun run build      # Produktions-Build
bunx tsc --noEmit  # Typprüfung
bun run lint       # ESLint + Prettier
bun run test       # vitest
```

Die Datei `.env` enthält nur **öffentliche** Werte (Supabase-URL und Publishable Key), die der
Browser-Client braucht. Geheime Werte gehören nie in `.env` oder in `VITE_`-Variablen.

## Benötigte Secrets (Lovable Cloud → Secrets)

| Name | Zweck |
| --- | --- |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-Zugriff auf die Datenbank (von Lovable Cloud bereitgestellt) |
| `RESEND_API_KEY` | API-Key für den Mailversand |
| `LEAD_INBOX` | Empfängeradresse für neue Anfragen |
| `LEAD_FROM` | Absender, z. B. `Fleckenlos Website <anfragen@fleckenlos.nrw>` (Domain in Resend verifizieren, **Region EU / eu-west-1**) |
| `LEAD_IP_SALT` | Zufälliger, geheimer Wert für das Hashen der IP-Adressen (z. B. `openssl rand -hex 32`) |
| `LOVABLE_CRON_SECRET` | Nur für die Fallback-Cron-Route (von Lovable Cloud bereitgestellt) |

Öffentlich (bereits in `.env`): `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PROJECT_ID`
und die gleichnamigen `VITE_`-Varianten.

## Deployment

Das Projekt ist mit [Lovable](https://lovable.dev/projects/0dafd016-76d4-4c79-8635-54cbba84e3f1)
verbunden. Commits auf `main` werden automatisch in Lovable übernommen und dort veröffentlicht
(Live: https://fleckenlos-cleaning-requests.lovable.app). Migrationen in `drizzle/migrations/`
wendet Lovable Cloud beim Deploy an.

Wichtig: Veröffentlichte Git-History nicht umschreiben (kein Force-Push, kein Rebase), siehe `AGENTS.md`.

Falls `pg_cron` in der Datenbank nicht verfügbar ist (Hinweis im Migrations-Log), die Route
`POST /api/cron/purge-leads` täglich mit `Authorization: Bearer $LOVABLE_CRON_SECRET` aufrufen lassen.

GitHub Actions (`.github/workflows/ci.yml`) prüft bei jedem Push und Pull Request:
`bun install --frozen-lockfile`, `tsc --noEmit`, `eslint .`, `vitest run`.
