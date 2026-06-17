import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import ArticleView, { buildArticleMetadata } from '@/components/content/ArticleView';
import { ArticleCard } from '@/components/content/ArticleCard';

export async function generateMetadata() {
  return buildArticleMetadata('dehoga');
}

/**
 * DEHOGA-Pillar: identische URL wie vorher (/berufsbilder/dehoga, shadowt [slug]),
 * aber mit Landesverband-Media-Cards statt nur Textlinks im Fließtext.
 */
export default async function DehogaPillar() {
  const articles = await reader.collections.articles.all();
  const landesverbaende = articles
    .filter((a) => a.slug.startsWith('dehoga-') && a.entry.status === 'published')
    .sort((a, b) => a.entry.title.localeCompare(b.entry.title, 'de'));

  return (
    <ArticleView
      slug="dehoga"
      beforeBody={
        <section id="landesverbaende" className="not-prose my-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Alle 16 DEHOGA-Landesverbände im Überblick
          </h2>
          <p className="text-foreground/70 leading-relaxed mb-8">
            Jeder Landesverband hat eigene Schwerpunkte, Tarifabschlüsse und Veranstaltungen — von der
            Oktoberfest-Gastronomie in Bayern bis zur Küsten-Saison in Schleswig-Holstein. Hier geht es zu
            den Porträts:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {landesverbaende.map((a) => (
              <ArticleCard
                key={a.slug}
                title={a.entry.title}
                excerpt={a.entry.excerpt}
                href={`/berufsbilder/${a.slug}`}
                image={a.entry.featuredImage || undefined}
                imageAlt={a.entry.featuredImageAlt || undefined}
                category={a.entry.category}
                date={a.entry.publishedAt || undefined}
              />
            ))}
          </div>
          <p className="mt-8 text-sm text-foreground/60">
            Mehr zur Branche:{' '}
            <Link href="/berufsbilder" className="text-brand-orange font-semibold hover:underline">
              alle 18 Gastro-Berufsbilder
            </Link>{' '}
            und der{' '}
            <Link href="/berufsbilder/gehalt-gastronomie" className="text-brand-orange font-semibold hover:underline">
              Gehalts-Guide Gastronomie
            </Link>.
          </p>
        </section>
      }
    />
  );
}
