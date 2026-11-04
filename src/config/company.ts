/**
 * Single source of truth for all company / contact data.
 * Header, Footer, Impressum, Datenschutz, Wizard and Chatbot read from here.
 *
 * Source: Impressum on https://fleckenlos-gebaeudereinigung.de/impressum/ (Nov 2026).
 */
export const COMPANY = {
  name: "Fleckenlos Gebäudereinigung",
  owner: "Ali Rahim Zada",
  ownerShort: "Herr Zada",
  street: "Oskar-Schindler-Straße 9",
  zip: "50769",
  city: "Köln",
  phone: "0221 71732304",
  phoneHref: "tel:+4922171732304",
  email: "info@fleckenlos.nrw",
  serviceArea: "Köln & Umgebung (Rheinland)",
  /** Google-Unternehmensprofil. TODO: durch den direkten Profil-Link ersetzen. */
  googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Fleckenlos+Geb%C3%A4udereinigung+K%C3%B6ln",
  /** Anzahl laut Google-Widget auf fleckenlos-gebaeudereinigung.de (Stand 04.11.2026). */
  googleReviewCount: 64,
  googleRating: "5.0",
} as const;

export const ADDRESS = `${COMPANY.street}, ${COMPANY.zip} ${COMPANY.city}`;
export const EMAIL_HREF = `mailto:${COMPANY.email}`;

export const AGENCY = {
  name: "HARDAN Industries",
  address: "Rankestraße 18, 45144 Essen",
  email: "contact.hardanindustries@gmail.com",
} as const;

/** Data-protection facts shown in the privacy policy. */
export const PRIVACY = {
  /**
   * TODO vor Livegang: Region im Supabase-Dashboard ablesen
   * (Project Settings → General → Region) und hier eintragen, z. B. "EU (Frankfurt, eu-central-1)".
   */
  supabaseRegion: "[REGION]",
  mailProvider: "Resend, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA",
  lastUpdated: "04.11.2026",
} as const;
