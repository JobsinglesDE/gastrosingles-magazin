// Betriebszahlen-Karten je DEHOGA-Bundesland (GEO-Signal). Datenquelle: dehoga-statistiken.ts
// (amtlich/recherchiert, Quelle+Stand). Pattern angelehnt an CityStats (Kochkurs-Städte).
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import type { DehogaBundeslandData } from '@/lib/dehoga-statistiken';

function Card({ value, label }: { value: string; label: string }) {
  return (
    <AnimatedGradientBorder borderRadius={18} borderWidth={2} className="h-full">
      <div className="h-full rounded-2xl bg-surface p-4 text-center flex flex-col justify-center">
        <div className="text-3xl sm:text-4xl lg:text-2xl font-extrabold leading-tight tracking-tight tabular-nums text-foreground">
          {value}
        </div>
        <div className="mt-1 text-xs uppercase tracking-wide text-foreground/50">{label}</div>
      </div>
    </AnimatedGradientBorder>
  );
}

export function BundeslandStats({ d }: { d: DehogaBundeslandData }) {
  const cards: { value: string; label: string }[] = [];
  if (d.beschaeftigte) cards.push({ value: d.beschaeftigte, label: 'Beschäftigte im Gastgewerbe' });
  if (d.mitgliedsbetriebe) cards.push({ value: `~${d.mitgliedsbetriebe}`, label: 'DEHOGA-Mitgliedsbetriebe' });
  if (d.umsatzMrd) cards.push({ value: `${d.umsatzMrd} Mrd. €`, label: 'Gastgewerbe-Umsatz/Jahr' });
  if (d.betriebe) cards.push({ value: d.betriebe, label: 'Gastgewerbe-Betriebe' });
  if (d.tarif?.einstiegStundenlohn) cards.push({ value: d.tarif.einstiegStundenlohn, label: 'Tarif-Einstiegslohn/Std.' });

  if (cards.length === 0) return null;
  const kurz = d.kurz ?? d.name;

  return (
    <section className="not-prose my-12 scroll-mt-24" id="dehoga-zahlen">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-1">
        Gastgewerbe {kurz} in Zahlen
      </h2>
      <p className="text-foreground/60 mb-6 text-sm">
        DEHOGA {kurz}: die wichtigsten Branchen-Kennzahlen{d.bezugsjahr ? ` (Stand ${d.bezugsjahr})` : ''}.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {cards.map((c) => (
          <Card key={c.label} value={c.value} label={c.label} />
        ))}
      </div>
      {d.statQuelle && (
        <p className="mt-4 text-[11px] text-foreground/40">Quelle: {d.statQuelle}.</p>
      )}
    </section>
  );
}
