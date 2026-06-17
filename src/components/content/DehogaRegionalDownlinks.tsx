import Link from 'next/link';

type LinkItem = { href: string; label: string };

/**
 * Down-Links von der DEHOGA-{Bundesland}-Sub-Pillar auf Regional-Cluster-Spokes
 * (Kochkurse / Kochvereine) derselben Region. Gegenstück zu DehogaHubUplink
 * (GESETZ 14: bidirektional). Rendert nur Gruppen mit Einträgen.
 */
export function DehogaRegionalDownlinks({
  bundeslandName,
  kochkurse,
  kochvereine,
}: {
  bundeslandName: string;
  kochkurse: LinkItem[];
  kochvereine: LinkItem[];
}) {
  if (kochkurse.length === 0 && kochvereine.length === 0) return null;
  const chip =
    'inline-block rounded-full border border-foreground/15 bg-background px-4 py-1.5 text-sm font-semibold text-foreground hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors';
  return (
    <section className="not-prose my-12 rounded-2xl border border-foreground/10 bg-surface p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-2">Gastro-Szene &amp; Singles in {bundeslandName}</h2>
      <p className="text-foreground/70 mb-6">
        Du arbeitest im Gastgewerbe in {bundeslandName} und suchst Anschluss? Lerne Gleichgesinnte kennen — beim Kochkurs für Singles oder im Kochverein deiner Region.
      </p>
      {kochkurse.length > 0 && (
        <div className="mb-5">
          <h3 className="text-sm font-bold uppercase tracking-wide text-brand-orange mb-3">
            Kochkurse für Singles in {bundeslandName}
          </h3>
          <div className="flex flex-wrap gap-2">
            {kochkurse.map((l) => (
              <Link key={l.href} href={l.href} className={chip}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      {kochvereine.length > 0 && (
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-brand-orange mb-3">
            Kochvereine in {bundeslandName}
          </h3>
          <div className="flex flex-wrap gap-2">
            {kochvereine.map((l) => (
              <Link key={l.href} href={l.href} className={chip}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
