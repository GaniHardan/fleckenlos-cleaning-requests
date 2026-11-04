import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { COMPANY } from "@/config/company";
import { REVIEWS } from "@/content/reviews";
import { Head, Reveal, Stars } from "./shared";

export function Reviews() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % REVIEWS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const r = REVIEWS[i]!;
  return (
    <section id="bewertungen" className="mx-auto max-w-6xl px-4 py-28">
      <div className="grid items-center gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Head
            k="Live Trust-Center"
            t={
              <>
                {COMPANY.googleRating} von 5.
                <br />
                <span className="text-gradient">{COMPANY.googleReviewCount} Stimmen.</span>
              </>
            }
          />
          <Reveal>
            <div className="glass inline-flex items-center gap-4 rounded-2xl p-5">
              <span className="font-display text-5xl font-extrabold">{COMPANY.googleRating}</span>
              <div>
                <Stars c="h-5 w-5" />
                <a
                  href={COMPANY.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4 text-primary" /> Alle Bewertungen auf Google
                  ansehen
                </a>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-3">
          <Reveal>
            <div className="glass relative min-h-[300px] overflow-hidden rounded-3xl p-8 sm:p-10">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
              <AnimatePresence mode="wait">
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45 }}
                  className="relative"
                >
                  <div className="flex items-center justify-between">
                    <Stars c="h-5 w-5" />
                    <a
                      href={COMPANY.googleReviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-primary" /> Alle Bewertungen auf
                      Google ansehen
                    </a>
                  </div>
                  <blockquote className="mt-6 font-display text-2xl font-medium leading-snug sm:text-3xl">
                    „{r.text}“
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-primary font-bold text-primary-foreground">
                      {r.name.charAt(0)}
                    </span>
                    <span>
                      <b className="block">{r.name}</b>
                      <span className="text-sm text-muted-foreground">{r.tag}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </Reveal>
          <div className="mt-6 flex items-center gap-3">
            <button
              aria-label="Vorherige Bewertung"
              onClick={() => setI((i + REVIEWS.length - 1) % REVIEWS.length)}
              className="glass lift grid h-11 w-11 place-items-center rounded-full"
            >
              <ChevronLeft />
            </button>
            <button
              aria-label="Nächste Bewertung"
              onClick={() => setI((i + 1) % REVIEWS.length)}
              className="glass lift grid h-11 w-11 place-items-center rounded-full"
            >
              <ChevronRight />
            </button>
            <div className="ml-2 flex gap-1.5">
              {REVIEWS.map((_, n) => (
                <button
                  key={n}
                  aria-label={`Bewertung ${n + 1}`}
                  onClick={() => setI(n)}
                  className={`h-1.5 rounded-full transition-all ${n === i ? "w-8 bg-primary" : "w-3 bg-muted"}`}
                />
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Auszug aus unseren Google-Bewertungen. Die Bewertungen werden von uns nicht auf Echtheit
            geprüft.
          </p>
        </div>
      </div>
    </section>
  );
}
