import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ABOUT_TEXT, ABOUT_VALUES } from "@/content/about";
import { IMG } from "@/content/images";
import { Head, Reveal } from "./shared";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section id="ueber-uns" ref={ref} className="relative overflow-hidden border-y py-28">
      <motion.img
        style={{ y }}
        src={IMG.roof}
        alt=""
        aria-hidden
        className="absolute inset-0 h-[125%] w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <Head
          k="Über uns"
          t={
            <>
              Ihr Partner für Sauberkeit <span className="text-gradient">in Köln.</span>
            </>
          }
          s={ABOUT_TEXT}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {ABOUT_VALUES.map(({ icon: Icon, title, text }, n) => (
            <Reveal key={title} delay={n * 0.1}>
              <div className="glass lift h-full rounded-2xl p-6">
                <Icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
