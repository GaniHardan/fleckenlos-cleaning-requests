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
  /** Google-Unternehmensprofil. */
  googleReviewsUrl: "https://share.google/xsHJpRMYV3WcWPGLR",
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
  supabaseRegion: "EU (Irland, Dublin – eu-west-1)",
  mailProvider: "Resend, Inc. (USA)",
  lastUpdated: "04.11.2026",
} as const;
