// Zensus-Datenblock pro Stadt (Kochkurs-Spokes). Einwohner + Familienstand + Geschlecht
// stammen aus amtlichen Zensus-2022-Daten (kreisfreie Städte: Kreis = Stadt). Die Zahlen
// kommen aus der zentralen Daten-Lib (kochkurs-zensus.ts), NIE aus dem Frontmatter —
// so kann kein Content-Agent sie erfinden (GESETZ: Stats nie erfinden). Singles-Index =
// deterministisch berechnet (lib/singles-index.ts).
import type { ReactNode } from 'react';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { computeSinglesIndex, type RawCityStats } from '@/lib/singles-index';

export type CityStatFields = RawCityStats & {
  einwohner?: string | null;
  ledigeAnzahl?: string | null;
  geschlechterquote?: string | null; // "MM,M / FF,F %" (Männer / Frauen)
};

function parseGeschlecht(v?: string | null): { maenner: string; frauen: string } | null {
  if (!v) return null;
  const nums = v.replace(/%/g, '').split('/').map((s) => s.trim()).filter(Boolean);
  if (nums.length < 2) return null;
  return { maenner: `${nums[0]} %`, frauen: `${nums[1]} %` };
}

function Card({ children }: { children: ReactNode }) {
  return (
    <AnimatedGradientBorder borderRadius={18} borderWidth={2} className="h-full">
      <div className="h-full rounded-2xl bg-surface p-5 text-center flex flex-col justify-center">{children}</div>
    </AnimatedGradientBorder>
  );
}

export function CityStats({ name, e }: { name: string; e: CityStatFields }) {
  const g = parseGeschlecht(e.geschlechterquote);
  const idx = computeSinglesIndex(e);
  if (!e.einwohner && !e.ledigeAnzahl && !g && !idx) return null;
  return (
    <section className="my-12">
      <h2 id="stadt-in-zahlen" className="text-2xl sm:text-3xl font-extrabold mb-1 scroll-mt-24">{name} in Zahlen</h2>
      <p className="text-foreground/60 mb-6 text-sm">Amtliche Daten aus dem Zensus 2022 — für deine Region.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {idx && (
          <AnimatedGradientBorder borderRadius={18} borderWidth={2} className="h-full">
            <div className="h-full rounded-2xl bg-brand-orange text-white p-5 text-center flex flex-col justify-center">
              <div className="text-4xl sm:text-5xl font-extrabold leading-tight">
                {idx.score}
                <span className="text-xl sm:text-2xl font-bold text-white/70">/100</span>
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide text-white/85">Singles-Index</div>
              <div className="mt-3 h-1.5 w-full rounded-full bg-white/25 overflow-hidden">
                <div className="h-full rounded-full bg-white/90" style={{ width: `${idx.score}%` }} />
              </div>
              <div className="mt-2 text-[11px] text-white/85">{idx.label}</div>
            </div>
          </AnimatedGradientBorder>
        )}

        {e.ledigeAnzahl && (
          <Card>
            <div className="text-4xl sm:text-5xl font-extrabold leading-tight text-foreground">{e.ledigeAnzahl}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-foreground/50">Ledige in {name}</div>
          </Card>
        )}

        {e.einwohner && (
          <Card>
            <div className="text-4xl sm:text-5xl font-extrabold leading-tight text-foreground">{e.einwohner}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-foreground/50">Einwohner (Stadt)</div>
          </Card>
        )}

        {g && (
          <Card>
            <div className="grid grid-cols-2 divide-x divide-foreground/10">
              <div className="px-2">
                <div className="text-xs uppercase tracking-wide text-foreground/50 mb-0.5">♀ Frauen</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-foreground">{g.frauen}</div>
              </div>
              <div className="px-2">
                <div className="text-xs uppercase tracking-wide text-foreground/50 mb-0.5">♂ Männer</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-foreground">{g.maenner}</div>
              </div>
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-wide text-foreground/40">in der Stadt</div>
          </Card>
        )}
      </div>
    </section>
  );
}
