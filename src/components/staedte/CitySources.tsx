// "Quellen & Datenstand" — Transparenz über Datenherkunft (Zensus, Anbieter, OSM).
// Stärkt E-E-A-T (belegte Fakten) + AI-Citability (Primärquelle + Datum genannt).
// Externe Quell-Links = nofollow (GESETZ: extern immer nofollow).
import { computeSinglesIndex, INDEX_VERSION, type RawCityStats } from '@/lib/singles-index';

export interface AnbieterRef {
  name: string;
  url?: string | null;
}

export function CitySources({
  e,
  stadtName,
  anbieter,
}: {
  e: RawCityStats;
  stadtName: string;
  anbieter?: AnbieterRef[];
}) {
  const idx = computeSinglesIndex(e);
  const hasStats = e.ledigeQuote != null || e.singlehaushalteQuote != null || e.maennerQuote != null;
  return (
    <section className="my-10 rounded-2xl border border-foreground/10 bg-surface/50 p-5 text-sm text-foreground/70">
      <h2 className="text-base font-bold text-foreground mb-2">Quellen &amp; Datenstand</h2>
      <ul className="space-y-1.5 leading-relaxed">
        {hasStats && (
          <li>
            <strong className="text-foreground/80">Demografie:</strong> Zensus 2022, Statistisches Bundesamt (Destatis) —
            Einwohner, Familienstand und Geschlecht für {stadtName} (kreisfreie Stadt). Die Ledigen-Zahl basiert auf der
            amtlichen Ledigen-Quote.{' '}
            <a href="https://www.zensus2022.de/" rel="nofollow noopener" target="_blank" className="underline hover:text-brand-orange">
              zensus2022.de
            </a>
          </li>
        )}
        {idx && (
          <li>
            <strong className="text-foreground/80">Gastrosingles Singles-Index (v{INDEX_VERSION}):</strong> gewichteter Score aus
            Single-Dichte (Ledigen-Quote), Geschlechter-Balance und Altersstruktur — deterministisch aus den amtlichen Daten
            berechnet, keine Schätzung einzelner Profile.
          </li>
        )}
        {anbieter && anbieter.length > 0 && (
          <li>
            <strong className="text-foreground/80">Kochkurs-Anbieter:</strong>{' '}
            {anbieter.map((a, i) => (
              <span key={a.name}>
                {a.url ? (
                  <a href={a.url} rel="nofollow noopener" target="_blank" className="underline hover:text-brand-orange">
                    {a.name}
                  </a>
                ) : (
                  a.name
                )}
                {i < anbieter.length - 1 ? ', ' : ''}
              </span>
            ))}
            . Angebote der jeweiligen Anbieter, Stand der Recherche.
          </li>
        )}
        <li className="text-foreground/50 text-xs">
          Angaben ohne Gewähr. Kurstermine und -preise ändern sich; maßgeblich ist die jeweilige Anbieter-Seite. Gastrosingles
          ist kein Kochkurs-Veranstalter, sondern eine Dating-Plattform für die Gastro-Branche.
        </li>
      </ul>
    </section>
  );
}
