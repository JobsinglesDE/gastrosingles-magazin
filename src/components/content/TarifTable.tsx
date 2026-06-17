// Tarif- & Gehaltstabelle je DEHOGA-Bundesland. Tarif-Eckdaten (NGG/DEHOGA-Landesabschluss) +
// Median-Gehälter nach Beruf (Entgeltatlas). Datenquelle: dehoga-statistiken.ts (Quelle+Stand).
import {
  GASTRO_GEHALT_DE,
  GEHALT_QUELLE,
  type DehogaBundeslandData,
} from '@/lib/dehoga-statistiken';

export function TarifTable({ d }: { d: DehogaBundeslandData }) {
  const gehalt = d.gehalt ?? GASTRO_GEHALT_DE;
  const hasTarif = Boolean(d.tarif?.einstiegStundenlohn || d.tarif?.laufzeitBis || d.tarif?.tarifHinweis);
  if (!hasTarif && gehalt.length === 0) return null;
  const kurz = d.kurz ?? d.name;

  return (
    <section className="not-prose my-12 scroll-mt-24" id="dehoga-tarif-gehalt">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-1">
        DEHOGA {kurz}: Tarifvertrag &amp; Gehalt 2026
      </h2>
      <p className="text-foreground/60 mb-6 text-sm">
        Was Beschäftigte in {d.name} verdienen — Tarif-Eckdaten und Median-Gehälter nach Beruf.
      </p>

      {hasTarif && (
        <div className="mb-6 rounded-2xl border border-foreground/10 bg-surface p-5">
          <h3 className="text-sm font-bold uppercase tracking-wide text-brand-orange mb-3">
            Tarifvertrag Gastgewerbe {kurz}
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {d.tarif?.einstiegStundenlohn && (
              <div className="flex justify-between border-b border-foreground/5 py-1">
                <dt className="text-foreground/60">Einstiegslohn (ungelernt)</dt>
                <dd className="font-bold tabular-nums text-foreground">{d.tarif.einstiegStundenlohn}/Std.</dd>
              </div>
            )}
            {d.tarif?.laufzeitBis && (
              <div className="flex justify-between border-b border-foreground/5 py-1">
                <dt className="text-foreground/60">Tarif-Laufzeit bis</dt>
                <dd className="font-bold tabular-nums text-foreground">{d.tarif.laufzeitBis}</dd>
              </div>
            )}
            {d.tarif?.tarifpartner && (
              <div className="flex justify-between border-b border-foreground/5 py-1">
                <dt className="text-foreground/60">Tarifpartner</dt>
                <dd className="font-semibold text-foreground text-right">{d.tarif.tarifpartner}</dd>
              </div>
            )}
          </dl>
          {d.tarif?.tarifHinweis && (
            <p className="mt-3 text-xs text-foreground/70">{d.tarif.tarifHinweis}</p>
          )}
          {d.tarif?.quelle && (
            <p className="mt-3 text-[11px] text-foreground/40">Quelle: {d.tarif.quelle}.</p>
          )}
        </div>
      )}

      {gehalt.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-foreground/10">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-foreground/5 text-left">
                <th className="p-3 font-bold">Beruf</th>
                <th className="p-3 font-bold text-right tabular-nums">Einstieg (25 %)</th>
                <th className="p-3 font-bold text-right tabular-nums">Median</th>
                <th className="p-3 font-bold text-right tabular-nums">Spitze (75 %)</th>
              </tr>
            </thead>
            <tbody>
              {gehalt.map((g) => (
                <tr key={g.beruf} className="border-t border-foreground/10">
                  <td className="p-3 font-semibold text-foreground">{g.beruf}</td>
                  <td className="p-3 text-right tabular-nums text-foreground/70">{g.q1 ?? '—'}</td>
                  <td className="p-3 text-right tabular-nums font-bold text-foreground">{g.median}</td>
                  <td className="p-3 text-right tabular-nums text-foreground/70">{g.q3 ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-[11px] text-foreground/40">
        Gehalt: {GEHALT_QUELLE}. Regionale Abweichung: Ballungsräume wie Köln/Düsseldorf liegen meist über, ländliche Regionen unter dem Schnitt.
      </p>
    </section>
  );
}
