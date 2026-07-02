import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { articleHref } from '@/lib/routes';

// Motor → Money: Koch-Personen-Hubs (Henssler, Rosin & Co.) sind der Traffic-Motor,
// ranken aber siloed. Diese Brücke leitet Link-Equity gezielt auf die Gehalt-/Branchen-
// Money-Seiten (gehalt-gastronomie = grösster CTR-Hebel, DEHOGA-Pillar) — mit den
// Artikel-Titeln als deskriptive Anker. Nicht auflösbare Slugs werden still gefiltert.
const DEFAULT_MONEY_SLUGS = ['gehalt-gastronomie', 'dehoga', 'koch-ausbildung'];

export async function ChefMoneyLinks({
  slugs = DEFAULT_MONEY_SLUGS,
  heading = 'Gehalt & Branche in der Gastronomie',
}: {
  slugs?: string[];
  heading?: string;
}) {
  const items = (
    await Promise.all(
      slugs.map(async (s) => {
        const a = await reader.collections.articles.read(s);
        return a && a.status === 'published'
          ? { slug: s, title: a.title, category: a.category, show: (a as { show?: string }).show }
          : null;
      }),
    )
  ).filter((x): x is NonNullable<typeof x> => !!x);

  if (items.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((it) => (
          <Link
            key={it.slug}
            href={articleHref({ slug: it.slug, entry: { category: it.category, show: it.show } })}
            className="block p-4 rounded-lg bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
          >
            <div className="text-xs uppercase text-foreground/50 mb-1">Berufsbild · gastrosingles</div>
            <div className="text-base font-bold text-foreground">{it.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
