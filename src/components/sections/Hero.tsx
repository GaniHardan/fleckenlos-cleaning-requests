import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { COMPANY, EMAIL_HREF } from "@/config/company";
import { IMG } from "@/content/images";
import { KEYWORDS } from "@/content/keywords";
import { Stars } from "./shared";

export function Hero({ onQuote }: { onQuote: () => void }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 220]);
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <motion.img
        style={{ y: heroY }}
        src={IMG.hero}
        alt="Herr Zada von Fleckenlos mit Reinigungsausrüstung vor dem Firmenwagen"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute inset-0 h-[115%] w-full object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-32">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { duration: 0.6 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="glass mb-8 inline-flex flex-wrap items-center gap-2 rounded-full px-4 py-2 text-sm"
        >
          <Stars /> <b>{COMPANY.googleRating} Google Bewertung</b>{" "}
          <span className="text-muted-foreground">| Ihr Gebäudereiniger in Köln</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-5xl font-extrabold leading-[0.98] sm:text-6xl lg:text-[5.5rem]"
        >
          Erstklassige Sauberkeit & Werterhalt für Ihr Gebäude{" "}
          <span className="text-gradient">in Köln.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl"
        >
          Büroreinigung, Bauendreinigung, Glas- & Spezialreinigung – pünktlich, gründlich und
          flexibel.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <button
            onClick={onQuote}
            className="btn-glow flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold"
          >
            Kostenloses Angebot anfordern <ArrowRight className="h-5 w-5" />
          </button>
          <a
            href={EMAIL_HREF}
            className="glass lift flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold"
          >
            <Mail className="h-4 w-4 text-primary" /> E-Mail schreiben
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-14 flex items-center gap-2 text-sm text-muted-foreground"
        >
          <span
            className="h-2 w-2 rounded-full bg-primary"
            style={{ animation: "pulse-dot 2s infinite" }}
          />
          Kurzfristige Termine verfügbar · {COMPANY.serviceArea}
        </motion.div>
      </div>
    </section>
  );
}

export function Marquee() {
  return (
    <div className="border-y bg-card/40 py-5" aria-hidden>
      <div className="flex w-max animate-marquee">
        {[...KEYWORDS, ...KEYWORDS, ...KEYWORDS, ...KEYWORDS].map((k, n) => (
          <span
            key={n}
            className="flex items-center gap-8 px-4 font-display text-2xl font-semibold text-muted-foreground"
          >
            {k} <Sparkles className="h-4 w-4 text-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}
