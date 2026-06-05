import { reader } from '@/lib/keystatic';
import { getPersonHubUrl } from '@/lib/routes';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SeriesCard } from '@/components/content/SeriesCard';
import { JsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';

const BASE = 'https://gastrosingles.de/magazin';

export async function generateMetadata() {
  const url = `${BASE}/koeche`;
  const title = 'TV-Köche — Steckbriefe & Porträts ❤️';
  const description =
    'Tim Mälzer, Tim Raue, Frank Rosin, Johann Lafer und mehr: Steckbriefe, Karriere und alle Artikel zu den bekanntesten TV-Köchen Deutschlands.';
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', siteName: 'Gastrosingles Magazin', locale: 'de-DE' },
  };
}

export default async function KoecheIndex() {
  const persons = (await reader.collections.persons.all())
    .filter((p) => p.entry.status !== 'draft')
    .sort((a, b) => a.entry.name.localeCompare(b.entry.name, 'de'));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'TV-Köche',
          description: 'Steckbriefe und Porträts der bekanntesten TV-Köche.',
          url: `${BASE}/koeche`,
          items: persons.map((p) => ({
            name: p.entry.name,
            url: `${BASE}${getPersonHubUrl(p.slug)}`,
          })),
        })}
      />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: 'Köche', href: '/koeche' }]} />

        <header className="mt-6 mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-orange">
            Köche
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 mb-4">
            TV-Köche im Porträt
          </h1>
          <p className="text-foreground/70 leading-relaxed max-w-2xl">
            Steckbrief, Karriere und alle Artikel zu den bekanntesten TV-Köchen — von Tim Mälzer
            bis Johann Lafer.
          </p>
        </header>

        {persons.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {persons.map((p) => (
              <SeriesCard
                key={p.slug}
                title={p.entry.name}
                excerpt={p.entry.intro || p.entry.role || ''}
                href={getPersonHubUrl(p.slug)}
                image={p.entry.featuredImage || undefined}
                imageAlt={p.entry.featuredImageAlt || undefined}
                seriesLabel={p.entry.role || 'Koch'}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
