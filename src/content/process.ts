import { ScanSearch, Send, Sparkles, type LucideIcon } from "lucide-react";

export const PROCESS_STEPS: readonly { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Send,
    title: "Digitale Anfrage",
    text: "In 2 Minuten über unseren Konfigurator oder per Anruf.",
  },
  {
    icon: ScanSearch,
    title: "Vor-Ort-Analyse & Festpreis",
    text: "Kostenlose Besichtigung – Sie erhalten ein transparentes Festpreis-Angebot.",
  },
  {
    icon: Sparkles,
    title: "Glänzendes Ergebnis",
    text: "Pünktliche, gründliche Reinigung mit gemeinsamer Abnahme.",
  },
];
