/** Auszug aus den Google-Bewertungen (Name, Leistung, Zitat). */
export type Review = { name: string; tag: string; text: string };

export const REVIEWS: readonly Review[] = [
  {
    name: "Azimi Nasir",
    tag: "Bauendreinigung",
    text: "Ich habe die Bauendreinigung in Anspruch genommen... Herr Zada hat mich freundlich beraten. Pünktlich und professionell!",
  },
  {
    name: "Elli Weber",
    tag: "Terrassendach",
    text: "Terrassendach sieht wieder aus wie neu! Besonders positiv: Hatte sogar kurzfristig noch einen Termin bekommen.",
  },
  {
    name: "Calogero Lavore",
    tag: "Haus & Geschäft",
    text: "Immer top – ich lasse mein Haus und mein Geschäft reinigen. Zuverlässig, schnell und sauber!",
  },
  {
    name: "Nils Decker",
    tag: "Kurzfristiger Termin",
    text: "Nachdem ich bei 4 Anbietern abgelehnt wurde, bot mir Fleckenlos sehr kurzfristig einen Termin an. Pünktlich & sehr gründlich!",
  },
  {
    name: "Ella Paul",
    tag: "Büroreinigung",
    text: "Sehr zufrieden mit der wöchentlichen Büroreinigung. Das Team ist zuverlässig, gründlich und freundlich.",
  },
  {
    name: "Princess Anna",
    tag: "Sofort-Termin",
    text: "Heute angerufen und sofort einen Termin erhalten. Alles lief reibungslos, preislich super tragbar!",
  },
];
