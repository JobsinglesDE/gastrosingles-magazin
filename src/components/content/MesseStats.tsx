// Fakten-Block je Messe-Spoke (Termin/Ort/Turnus/Besucher) — GEO/AEO-Direktantwort + sichtbar oben.
// Datenquelle: messe-statistiken.ts (recherchiert, Quelle+Stand). Pattern wie BundeslandStats (DEHOGA).
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import type { MesseData } from '@/lib/messe-statistiken';

const MONATE = ['', 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

function fmtTermin(start?: string, end?: string): string | null {
  if (!start) return null;
  const [ys, ms, ds] = start.split('-').map(Number);
  if (!end) return `${ds}. ${MONATE[ms]} ${ys}`;
  const [ye, me, de] = end.split('-').map(Number);
  if (ys === ye && ms === me) return `${ds}.–${de}. ${MONATE[ms]} ${ys}`;
  if (ys === ye) return `${ds}. ${MONATE[ms]} – ${de}. ${MONATE[me]} ${ys}`;
  return `${ds}. ${MONATE[ms]} ${ys} – ${de}. ${MONATE[me]} ${ye}`;
}

function Card({ value, label }: { value: string; label: string }) {
  return (
    <AnimatedGradientBorder borderRadius={18} borderWidth={2} className="h-full">
      <div className="h-full rounded-2xl bg-surface p-4 text-center flex flex-col justify-center">
        <div className="text-xl sm:text-2xl font-extrabold leading-tight tracking-tight text-foreground">{value}</div>
        <div className="mt-1 text-xs uppercase tracking-wide text-foreground/50">{label}</div>
      </div>
    </AnimatedGradientBorder>
  );
}

export function MesseStats({ d }: { d: MesseData }) {
  // Eingestellte Messe: ehrlicher Hinweis statt Termin-Karten (GESETZ: nie als „kommend" ausweisen).
  if (d.eingestellt) {
    return (
      <section className="not-prose my-8 rounded-2xl border border-foreground/10 bg-surface p-5" id="messe-fakten">
        <p className="text-foreground/70 text-sm">{d.hinweis ?? 'Diese Messe findet derzeit nicht mehr statt.'}</p>
      </section>
    );
  }

  const termin = fmtTermin(d.startDate, d.endDate);
  const cards: { value: string; label: string }[] = [];
  if (termin) cards.push({ value: termin, label: 'Nächster Termin' });
  cards.push({ value: d.stadt, label: 'Ort' });
  if (d.turnus) cards.push({ value: d.turnus.charAt(0).toUpperCase() + d.turnus.slice(1), label: 'Turnus' });
  if (d.fachbesucher) cards.push({ value: d.fachbesucher, label: 'Fachbesucher' });
  if (d.aussteller) cards.push({ value: d.aussteller, label: 'Aussteller' });
  if (cards.length === 0) return null;

  return (
    <section className="not-prose my-12 scroll-mt-24" id="messe-fakten">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-1">{d.name} {d.stadt}: Termin &amp; Fakten</h2>
      <p className="text-foreground/60 mb-6 text-sm">Die wichtigsten Eckdaten zur {d.name} auf einen Blick.</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {cards.map((c) => (
          <Card key={c.label} value={c.value} label={c.label} />
        ))}
      </div>
      {d.hinweis && <p className="mt-4 text-xs text-foreground/60">{d.hinweis}</p>}
      {(d.venue || d.veranstalter || d.quelle) && (
        <p className="mt-2 text-[11px] text-foreground/40">
          {d.venue ? `Veranstaltungsort: ${d.venue}${d.stadt ? `, ${d.stadt}` : ''}. ` : ''}
          {d.veranstalter ? `Veranstalter: ${d.veranstalter}. ` : ''}
          {d.quelle ? `Quelle: ${d.quelle}.` : ''}
        </p>
      )}
    </section>
  );
}
