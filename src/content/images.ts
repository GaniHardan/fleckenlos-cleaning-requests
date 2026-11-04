import heroA from "@/assets/real-5.png.asset.json";
import officeA from "@/assets/real-4.png.asset.json";
import teamA from "@/assets/real-8.png.asset.json";
import roomA from "@/assets/real-3.png.asset.json";
import windowA from "@/assets/real-2.png.asset.json";
import sixA from "@/assets/real-6.png.asset.json";
import sevenA from "@/assets/real-7.png.asset.json";

export const IMG = {
  hero: heroA.url,
  office: officeA.url,
  team: teamA.url,
  room: roomA.url,
  window: windowA.url,
  roof: sixA.url,
  result: sevenA.url,
} as const;

export const GALLERY = [
  { src: IMG.hero, cat: "Fuhrpark & Einsatz", alt: "Herr Zada vor dem Fleckenlos-Firmenwagen" },
  { src: IMG.roof, cat: "Vorher / Nachher", alt: "Gereinigtes Terrassendach" },
  { src: IMG.team, cat: "Team bei der Arbeit", alt: "Team bei der Arbeit mit Hebebühne" },
  { src: IMG.window, cat: "Team bei der Arbeit", alt: "Präzise Fensterreinigung" },
  { src: IMG.office, cat: "Vorher / Nachher", alt: "Vorher-Nachher Großraumreinigung" },
  { src: IMG.room, cat: "Vorher / Nachher", alt: "Gereinigter Innenraum" },
  { src: IMG.result, cat: "Vorher / Nachher", alt: "Arbeitsergebnis Fleckenlos" },
] as const;

export const GALLERY_CATS = [
  "Alle",
  "Fuhrpark & Einsatz",
  "Team bei der Arbeit",
  "Vorher / Nachher",
] as const;
