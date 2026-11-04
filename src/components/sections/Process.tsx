import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/content/process";
import { Head, Reveal } from "./shared";

export function Process() {
  return (
    <section id="prozess" className="relative border-y bg-card/30 py-28">
      <div className="mx-auto max-w-6xl px-4">
        <Head k="Die 3-Schritte-Partnerschaft" t="Vom Klick zum Glanz." />
        <div className="relative grid gap-12 md:grid-cols-3">
          <motion.div
            className="absolute left-0 right-0 top-8 hidden h-px origin-left bg-gradient-primary md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          {PROCESS_STEPS.map(({ icon: Icon, title, text }, n) => (
            <Reveal key={title} delay={0.3 + n * 0.25}>
              <div className="relative">
                <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-background shadow-gold">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <p className="mt-8 font-display text-6xl font-extrabold text-muted">0{n + 1}</p>
                <h3 className="mt-2 text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
