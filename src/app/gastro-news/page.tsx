import Link from 'next/link';
import { articleHref } from '@/lib/routes';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { withBasePath } from '@/lib/url';

const HUB_URL = 'https://gastrosingles.de/magazin/gastro-news';

export const metadata = {
  title: 'Gastro-News & Promiköche',
  description: 'Gastro-News, Promiköche-Porträts, Branchenverbände und Messen. Tim Mälzer, Frank Rosin, Tim Raue & Co. plus DEHOGA, Internorga und Berufsbild-Hubs.',
  alternates: { canonical: HUB_URL },
  openGraph: {
    title: 'Gastro-News & Promiköche — Gastrosingles Magazin',
    description: 'Promiköche, DEHOGA, Messen und Berufsbild-Hubs — die Magazin-Spur von Gastrosingles.',
    url: HUB_URL,
    type: 'website',
    siteName: 'Gastrosingles Magazin',
    locale: 'de-DE',
  },
};

const HUB_COLORS = [
  { r: 220, g: 60, b: 50 },
  { r: 255, g: 145, b: 60 },
  { r: 255, g: 200, b: 70 },
];

const CLUSTERS = [
  {
    title: 'Promiköche Deutschland',
    excerpt: 'Die 10 wichtigsten TV-Köche und Sternekoch-Stars im Porträt. Mälzer, Rosin, Henssler, Raue, Müller, Wiener, Poletto, Linster, Lafer, Rach.',
    href: '/promikoeche-deutschland',
    icon: '⭐',
  },
  {
    title: 'DEHOGA & Branche',
    excerpt: 'Der DEHOGA als Branchenverband plus alle 16 Landesverbände. Was sich in der deutschen Gastro-Politik gerade bewegt.',
    href: '/dehoga',
    icon: '🏛️',
  },
  {
    title: 'Messen & Termine',
    excerpt: 'Internorga Hamburg, Intergastra Stuttgart, Anuga Köln, HOGATEC, IGEHO, BIOFACH und die kleinen Branchen-Treffen.',
    href: '/internorga',
    icon: '🎪',
  },
  {
    title: 'Berufsbild-Hubs',
    excerpt: 'Koch, Sommelier, Patissier, Küchenchef, Chef de Partie, Maître d\'Hôtel — was der Beruf wirklich heisst, mit ehrlichem Blick.',
    href: '/koch',
    icon: '🍳',
  },
];

const PROMIS = [
  'tim-maelzer','frank-rosin','steffen-henssler','nelson-mueller','sarah-wiener',
  'cornelia-poletto','lea-linster','johann-lafer','tim-raue','christian-rach'
];

export default async function GastroNewsHub() {
  const articles = await reader.collections.articles.all();

  // Latest 20 articles sorted by publishedAt desc (per feedback_listing_sort_pflicht)
  const recentArticles = articles
    .filter((a) => a.entry.status === 'published')
    .filter((a) => {
      const cat = a.entry.category;
      return cat === 'tv-koch-shows' || cat === 'berufsbilder' || a.entry.type === 'pillar' || a.entry.type === 'berufsbild' || a.entry.type === 'news' || PROMIS.includes(a.slug);
    })
    .sort((a, b) => {
      const da = a.entry.publishedAt || '';
      const db = b.entry.publishedAt || '';
      return db.localeCompare(da);
    })
    .slice(0, 20);

  const promiArticles = PROMIS
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter(Boolean) as typeof articles;

  const clusterItems = CLUSTERS.map((c) => ({
    name: c.title,
    url: `https://gastrosingles.de/magazin${c.href}`,
  }));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Gastro-News & Promiköche — Magazin-Hub',
          description: 'Promiköche, DEHOGA, Messen und Berufsbild-Hubs auf Gastrosingles.',
          url: HUB_URL,
          items: clusterItems,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://gastrosingles.de/magazin' },
          { name: 'Gastro-News', url: HUB_URL },
        ])}
      />

      <PillarHero
        title="Gastro-News & Promiköche"
        texts={[
          'TV-Köche im Porträt',
          'DEHOGA & Branche',
          'Messen-Übersicht',
          'Berufsbild-Hubs',
          'Magazin-Spur',
        ]}
        subtitle="Promiköche, Branchenverbände, Messen und Berufsbilder — alles, was die deutsche Gastro-Szene gerade bewegt."
        colors={HUB_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Gastro-News', href: '/gastro-news' }]} />
      </div>

      {/* 4 Cluster-Cards */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-primary">Magazin-Bereiche</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CLUSTERS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group block p-6 rounded-2xl bg-surface border border-foreground/10 hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <div className="text-4xl mb-3">{c.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{c.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Promiköche Grid */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-primary">Promiköche im Porträt</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {promiArticles.map((a) => (
              <Link
                key={a.slug}
                href={articleHref(a)}
                className="group block"
              >
                {a.entry.featuredImage && (
                  <img
                    width="400" height="400"
                    src={withBasePath(a.entry.featuredImage)}
                    alt={a.entry.featuredImageAlt || a.entry.title}
                    className="w-full aspect-square object-cover rounded-xl mb-2 group-hover:opacity-90 transition-opacity"
                  />
                )}
                <p className="text-sm font-semibold text-foreground group-hover:text-primary line-clamp-2">{a.entry.title}</p>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Newest Articles */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-primary">Aktuelle Artikel</h2>
          <ul className="divide-y divide-foreground/10">
            {recentArticles.map((a) => (
              <li key={a.slug} className="py-5">
                <Link href={articleHref(a)} className="group flex gap-4 items-start">
                  {a.entry.featuredImage && (
                    <img
                      width="200" height="140"
                      src={withBasePath(a.entry.featuredImage)}
                      alt={a.entry.featuredImageAlt || a.entry.title}
                      className="w-24 h-16 object-cover rounded-lg shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    {a.entry.category && (
                      <p className="text-xs uppercase tracking-widest text-primary font-bold mb-1">{a.entry.category}</p>
                    )}
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{a.entry.title}</p>
                    {a.entry.excerpt && (
                      <p className="text-xs text-foreground/60 mt-1 line-clamp-2">{a.entry.excerpt}</p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </ScrollReveal>
    </>
  );
}
