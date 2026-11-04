import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stars({ c = "h-4 w-4" }: { c?: string }) {
  return (
    <span className="flex text-primary" aria-label="5 von 5 Sternen">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={`${c} fill-current`} />
      ))}
    </span>
  );
}

export function Head({ k, t, s }: { k: string; t: ReactNode; s?: string }) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">{k}</p>
      <h2 className="text-4xl font-bold leading-[1.05] sm:text-5xl">{t}</h2>
      {s && <p className="mt-5 text-lg text-muted-foreground">{s}</p>}
    </Reveal>
  );
}
