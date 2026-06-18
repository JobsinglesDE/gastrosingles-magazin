import Link from 'next/link';
import { articleHref } from '@/lib/routes';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, eventJsonLd } from '@/components/seo/JsonLd';
import { withBasePath } from '@/lib/url';
import { MESSE_STATS, hasMesseEvent, type MesseData } from '@/lib/messe-statistiken';

const BASE = 'https://gastrosingles.de/magazin';
const HUB_URL = `${BASE}/messen`;

export const metadata = {
  title: 'Gastro-Messen 2026 & 2027: Termine, Tickets & Übersicht',
  description:
    'Messekalender Gastronomie: INTERNORGA, Anuga, BIOFACH, INTERGASTRA & Co. — alle Termine, Orte und Tickets der wichtigsten Gastro- und Hotelmessen in Deutschland und der Schweiz.',
  alternates: { canonical: HUB_URL },
  openGraph: {
    title: 'Gastro-Messen 2026 & 2027 — der Messekalender',
    description: 'Alle wichtigen Gastronomie- und Hotellerie-Messen mit Terminen, Orten und Tickets im Überblick.',
    url: HUB_URL,
    type: 'website',
    siteName: 'Gastrosingles Magazin',
    locale: 'de_DE',
  },
};

const HUB_COLORS = [
  { r: 220, g: 60, b: 50 },
  { r: 255, g: 145, b: 60 },
  { r: 255, g: 200, b: 70 },
];

const MESSEN_SLUGS = ['internorga', 'intergastra', 'anuga', 'hogatec', 'igeho', 'biofach', 'sueffa', 'gastro-vision'];

const MON = ['', 'Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'];
function terminLabel(d?: MesseData): string {
  if (!d) return '';
  if (d.eingestellt) return 'eingestellt';
  if (!d.startDate) return '';
  const [y, m] = d.startDate.split('-').map(Number);
  return `${MON[m]} ${y}`;
}
function sortKey(d?: MesseData): string {
  if (!d || d.eingestellt) return '9999-99-99';
  return d.startDate ?? '9998-99-99';
}

export default async function MessenHub() {
  const articles = await reader.collections.articles.all();
  const messenArticles = MESSEN_SLUGS
    .map((slug) => {
      const a = articles.find((x) => x.slug === slug);
      return a ? { ...a, stats: MESSE_STATS[slug] as MesseData | undefined } : null;
    })
    .filter(Boolean)
    .sort((a: any, b: any) => sortKey(a.stats).localeCompare(sortKey(b.stats))) as any[];

  const items = messenArticles.map((a) => ({
    name: a.entry.title,
    url: `${BASE}${articleHref(a)}`,
  }));

  // Event-Schema je terminierter Messe (GEO/AEO + Rich Results für „gastro messen 2026").
  const events = messenArticles
    .filter((a) => hasMesseEvent(a.stats))
    .map((a) =>
      eventJsonLd({
        name: `${a.stats.name} ${a.stats.stadt} ${a.stats.jahr ?? ''}`.trim(),
        startDate: a.stats.startDate,
        endDate: a.stats.endDate,
        venue: a.stats.venue,
        venueAdresse: a.stats.venueAdresse,
        stadt: a.stats.stadt,
        veranstalter: a.stats.veranstalter,
        organizerUrl: a.stats.offizielleUrl,
        url: `${BASE}${articleHref(a)}`,
        image: `${BASE}${a.entry.featuredImage ?? ''}`,
      }),
    )
    .filter(Boolean);

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Gastro-Messen 2026 & 2027 — Messekalender Gastronomie',
          description: 'Übersicht der wichtigsten Gastronomie- und Hotellerie-Messen in Deutschland und der Schweiz mit Terminen, Orten und Tickets.',
          url: HUB_URL,
          items,
        })}
      />
      {events.map((e, i) => (
        <JsonLd key={i} data={e as Record<string, unknown>} />
      ))}

      <PillarHero
        title="Gastro-Messen 2026 & 2027"
        texts={[
          'INTERNORGA · Anuga · BIOFACH',
          'Termine · Tickets · Aussteller',
          'Der Messekalender Gastronomie',
          'Hamburg · Köln · Nürnberg · Stuttgart',
        ]}
        subtitle="Alle wichtigen Gastronomie- und Hotellerie-Messen in Deutschland und der Schweiz — mit Terminen, Orten und Tickets im Überblick."
        colors={HUB_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Gastro-News', href: '/gastro-news' },
          { label: 'Messen', href: '/messen' },
        ]} />
      </div>

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-primary">
            Gastro-Messen im Überblick — nach Termin
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {messenArticles.map((a) => {
              const d: MesseData | undefined = a.stats;
              const termin = terminLabel(d);
              return (
                <Link
                  key={a.slug}
                  href={articleHref(a)}
                  className="group block bg-surface rounded-2xl overflow-hidden border border-foreground/10 hover:border-primary/50 transition-colors"
                >
                  {a.entry.featuredImage && (
                    <img
                      width="400" height="240"
                      src={withBasePath(a.entry.featuredImage)}
                      alt={a.entry.featuredImageAlt || a.entry.title}
                      className="w-full aspect-[5/3] object-cover group-hover:scale-[1.02] transition-transform"
                    />
                  )}
                  <div className="p-4">
                    {termin && (
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wide text-brand-orange mb-1">
                        {termin}{d?.stadt ? ` · ${d.stadt}` : ''}
                      </span>
                    )}
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {a.entry.title}
                    </h3>
                    {d?.turnus && !d.eingestellt && (
                      <p className="text-xs text-foreground/60 mt-2 capitalize">{d.turnus}</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
