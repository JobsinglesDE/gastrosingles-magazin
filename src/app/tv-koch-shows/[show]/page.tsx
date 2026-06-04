import Link from 'next/link';
import { notFound } from 'next/navigation';
import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';
import { SHOW_HUBS } from '@/lib/hubs';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { withBasePath } from '@/lib/url';

const BASE = 'https://gastrosingles.de/magazin';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SHOW_HUBS).map((show) => ({ show }));
}

export async function generateMetadata({ params }: { params: Promise<{ show: string }> }) {
  const { show } = await params;
  const hub = SHOW_HUBS[show];
  if (!hub) return {};
  const url = `${BASE}/${hub.slug}`;
  return {
    title: hub.seoTitle,
    description: hub.seoDescription,
    alternates: { canonical: url },
    openGraph: { title: hub.seoTitle, description: hub.seoDescription, url, type: 'website', siteName: 'Gastrosingles Magazin', locale: 'de-DE' },
  };
}

export default async function ShowHub({ params }: { params: Promise<{ show: string }> }) {
  const { show } = await params;
  const hub = SHOW_HUBS[show];
  if (!hub) notFound();

  const all = await reader.collections.articles.all();
  const articles = all
    .filter((a) => a.entry.category === 'tv-koch-shows' && a.entry.show === show)
    .sort((a, b) => (b.entry.publishedAt || '').localeCompare(a.entry.publishedAt || ''));

  const url = `${BASE}/${hub.slug}`;

  return (
    <>
      <JsonLd data={collectionPageJsonLd({ name: hub.title, description: hub.description, url, items: articles.map((a) => ({ name: a.entry.title, url: `${BASE}${getArticleUrl(a.slug, a.entry.category, { show: a.entry.show, position: a.entry.position })}` })) })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Magazin', url: BASE },
        { name: 'TV & Koch-Shows', url: `${BASE}/tv-koch-shows` },
        { name: hub.title.split(' ❤️')[0], url },
      ])} />

      <PillarHero
        title={hub.title}
        texts={['Promiköche', 'Klatsch & News', 'Porträts', 'Single-Geschichten']}
        subtitle={hub.description}
        colors={[{ r: 220, g: 60, b: 50 }, { r: 255, g: 145, b: 60 }, { r: 255, g: 200, b: 70 }]}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'TV & Koch-Shows', href: '/tv-koch-shows' },
          { label: hub.title.split(' ❤️')[0], href: `/${hub.slug}` },
        ]} />
      </div>

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={getArticleUrl(a.slug, a.entry.category, { show: a.entry.show, position: a.entry.position })}
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
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">{a.entry.title}</h3>
                  {a.entry.excerpt && <p className="text-xs text-foreground/60 mt-2 line-clamp-2">{a.entry.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
