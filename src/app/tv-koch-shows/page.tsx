import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { SHOW_HUBS, SECTION_HUBS } from '@/lib/hubs';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { withBasePath } from '@/lib/url';

const BASE = 'https://gastrosingles.de/magazin';
const HUB = SECTION_HUBS['tv-koch-shows'];
const URL = `${BASE}/${HUB.slug}`;

export const metadata = {
  title: HUB.seoTitle,
  description: HUB.seoDescription,
  alternates: { canonical: URL },
  openGraph: { title: HUB.seoTitle, description: HUB.seoDescription, url: URL, type: 'website', siteName: 'Gastrosingles Magazin', locale: 'de-DE' },
};

export default async function TvKochShowsIndex() {
  const all = await reader.collections.articles.all();
  const shows = Object.entries(SHOW_HUBS).map(([key, hub]) => {
    const count = all.filter((a) => a.entry.category === 'tv-koch-shows' && a.entry.show === key).length;
    const cover = all.find((a) => a.entry.category === 'tv-koch-shows' && a.entry.show === key && a.entry.featuredImage);
    return { key, hub, count, image: cover?.entry.featuredImage || null };
  });

  return (
    <>
      <JsonLd data={collectionPageJsonLd({ name: HUB.title, description: HUB.description, url: URL, items: shows.map((s) => ({ name: s.hub.title, url: `${BASE}/${s.hub.slug}` })) })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Magazin', url: BASE },
        { name: 'TV & Koch-Shows', url: URL },
      ])} />

      <PillarHero
        title={HUB.title}
        texts={['Küchenschlacht', 'Kitchen Impossible', 'Grill den Henssler', 'Promiköche']}
        subtitle={HUB.description}
        colors={[{ r: 220, g: 60, b: 50 }, { r: 255, g: 145, b: 60 }, { r: 255, g: 200, b: 70 }]}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'TV & Koch-Shows', href: '/tv-koch-shows' }]} />
      </div>

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {shows.map((s) => (
              <Link
                key={s.key}
                href={`/${s.hub.slug}`}
                className="group block bg-surface rounded-2xl overflow-hidden border border-foreground/10 hover:border-primary/50 transition-colors"
              >
                {s.image && (
                  <img
                    width="600" height="320"
                    src={withBasePath(s.image)}
                    alt={s.hub.title}
                    className="w-full aspect-[16/9] object-cover group-hover:scale-[1.02] transition-transform"
                  />
                )}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{s.hub.title}</h2>
                  <p className="text-sm text-foreground/60 mt-2 line-clamp-2">{s.hub.description}</p>
                  <p className="text-xs text-primary font-bold mt-3">{s.count} Artikel</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
