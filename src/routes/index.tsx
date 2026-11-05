import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header, Footer } from "@/components/site/Chrome";
import { Wizard } from "@/components/site/Wizard";
import { ChatBot } from "@/components/site/ChatBot";
import { Hero, Marquee } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Gallery } from "@/components/sections/Gallery";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { QuoteSection } from "@/components/sections/QuoteSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fleckenlos Gebäudereinigung Köln – Büro-, Bau- & Glasreinigung" },
      {
        name: "description",
        content:
          "Erstklassige & zuverlässige Gebäudereinigung in Köln. Büroreinigung, Bauendreinigung & Glasreinigung von Fleckenlos. Jetzt in 3 Klicks Angebot anfordern!",
      },
      {
        property: "og:title",
        content: "Fleckenlos Gebäudereinigung Köln – Büro-, Bau- & Glasreinigung",
      },
      {
        property: "og:description",
        content: "Erstklassige & zuverlässige Gebäudereinigung in Köln. Büroreinigung, Bauendreinigung & Glasreinigung von Fleckenlos. Jetzt in 3 Klicks Angebot anfordern!",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [wizard, setWizard] = useState(false);
  const openQuote = () => setWizard(true);

  return (
    <div id="top" className="overflow-x-hidden">
      <Header />
      <main>
        <Hero onQuote={openQuote} />
        <Marquee />
        <Services onQuote={openQuote} />
        <About />
        <Gallery />
        <Process />
        <Reviews />
        <QuoteSection />
      </main>
      <Footer />
      <ChatBot />

      <AnimatePresence>
        {wizard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-background/70 p-4 backdrop-blur-md"
            onClick={() => setWizard(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              role="dialog"
              aria-modal="true"
              aria-label="Angebots-Konfigurator"
              className="w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Wizard onClose={() => setWizard(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
