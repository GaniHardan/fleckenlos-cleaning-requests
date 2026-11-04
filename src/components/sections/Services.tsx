import {
  AppWindow,
  ArrowRight,
  Building2,
  HardHat,
  Stethoscope,
  Umbrella,
  User,
} from "lucide-react";
import { IMG } from "@/content/images";
import { SERVICES_CONTENT as C } from "@/content/services";
import { Head, Reveal } from "./shared";

export function Services({ onQuote }: { onQuote: () => void }) {
  return (
    <section id="leistungen" className="mx-auto max-w-6xl px-4 py-28">
      <Head
        k={C.kicker}
        t={
          <>
            Reinigung auf <span className="text-gradient">Spitzenniveau.</span>
          </>
        }
        s={C.subline}
      />
      <div className="grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-3">
        <Reveal className="md:col-span-2 md:row-span-2">
          <div className="group glass lift relative h-full overflow-hidden rounded-3xl p-8">
            <Building2 className="h-10 w-10 text-primary" />
            <h3 className="mt-6 text-3xl font-bold">{C.office.title}</h3>
            <p className="mt-3 max-w-md text-muted-foreground">{C.office.text}</p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[IMG.office, IMG.team, IMG.room].map((src, n) => (
                <div key={n} className="aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass lift h-full rounded-3xl p-7">
            <HardHat className="h-8 w-8 text-primary" />
            <h3 className="mt-5 text-xl font-bold">{C.construction.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{C.construction.text}</p>
            <p className="mt-5 flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-primary" /> Ansprechpartner:{" "}
              <b>{C.construction.contact}</b>
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="group relative h-full overflow-hidden rounded-3xl border p-7">
            <img
              src={IMG.window}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-30 transition duration-700 group-hover:scale-110 group-hover:opacity-45"
            />
            <div className="relative">
              <AppWindow className="h-8 w-8 text-primary" />
              <h3 className="mt-5 text-xl font-bold">{C.glass.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{C.glass.text}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-1">
          <div className="glass lift h-full rounded-3xl p-7">
            <Umbrella className="h-8 w-8 text-primary" />
            <h3 className="mt-5 text-xl font-bold">{C.roof.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{C.roof.text}</p>
          </div>
        </Reveal>
        <Reveal delay={0.2} className="md:col-span-2">
          <div className="lift relative h-full overflow-hidden rounded-3xl border bg-gradient-primary p-8 text-primary-foreground">
            <Stethoscope className="h-9 w-9" />
            <h3 className="mt-5 text-2xl font-bold">{C.practice.title}</h3>
            <p className="mt-2 max-w-md opacity-80">{C.practice.text}</p>
            <button
              onClick={onQuote}
              className="mt-6 inline-flex items-center gap-2 font-bold underline-offset-4 hover:underline"
            >
              Angebot anfragen <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
