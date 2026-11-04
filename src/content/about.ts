import { Clock, MapPin, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { ADDRESS } from "@/config/company";

export const ABOUT_TEXT =
  "Fleckenlos Gebäudereinigung steht für zuverlässige & erstklassige Reinigungsleistungen für Büros, Praxen, Bau & Gewerbe – persönlich betreut von Herrn Zada.";

export const ABOUT_VALUES: readonly { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: "Zuverlässig",
    text: "Feste Ansprechpartner und verbindliche Termine.",
  },
  { icon: Clock, title: "Flexibel", text: "Auch kurzfristig und außerhalb Ihrer Öffnungszeiten." },
  {
    icon: Sparkles,
    title: "Gründlich",
    text: "Moderne Ausrüstung für sichtbar saubere Ergebnisse.",
  },
  { icon: MapPin, title: "Lokal", text: ADDRESS },
];
