import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { GALLERY, GALLERY_CATS } from "@/content/images";
import { Head } from "./shared";

export function Gallery() {
  const [cat, setCat] = useState<string>("Alle");
  const [open, setOpen] = useState<number | null>(null);
  const items = GALLERY.filter((g) => cat === "Alle" || g.cat === cat);
  const cur = open === null ? null : items[open];
  return (
    <section id="galerie" className="mx-auto max-w-6xl px-4 py-28">
      <Head
        k="Galerie"
        t={
          <>
            Echte Einsätze. <span className="text-gradient">Echte Ergebnisse.</span>
          </>
        }
        s="Fuhrpark, Team und Arbeitsergebnisse – klicken zum Vergrößern."
      />
      <div className="mb-8 flex flex-wrap gap-2">
        {GALLERY_CATS.map((c) => (
          <button
            key={c}
            onClick={() => {
              setCat(c);
              setOpen(null);
            }}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${cat === c ? "border-primary bg-primary/15 text-primary" : "glass"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <motion.div layout className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <AnimatePresence>
          {items.map((g, n) => (
            <motion.button
              layout
              key={g.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setOpen(n)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border"
              aria-label={`${g.alt} vergrößern`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 grid place-items-center bg-background/50 opacity-0 transition group-hover:opacity-100">
                <ZoomIn className="h-8 w-8 text-primary" />
              </span>
              <span className="glass absolute bottom-2 left-2 rounded-full px-3 py-1 text-xs">
                {g.cat}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {cur && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-background/90 p-4 backdrop-blur-md"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Bildansicht"
          >
            <button className="absolute right-5 top-5" aria-label="Schließen">
              <X className="h-8 w-8" />
            </button>
            <button
              className="glass absolute left-4 grid h-12 w-12 place-items-center rounded-full"
              aria-label="Vorheriges Bild"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((open! + items.length - 1) % items.length);
              }}
            >
              <ChevronLeft />
            </button>
            <motion.img
              key={cur.src}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={cur.src}
              alt={cur.alt}
              className="max-h-[85vh] max-w-full rounded-2xl shadow-card"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="glass absolute right-4 grid h-12 w-12 place-items-center rounded-full"
              aria-label="Nächstes Bild"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((open! + 1) % items.length);
              }}
            >
              <ChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
