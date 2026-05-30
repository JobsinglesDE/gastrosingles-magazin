import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { withBasePath } from '@/lib/url';

const HUB_URL = 'https://gastrosingles.de/magazin/promikoeche';

export const metadata = {
  title: 'Promiköche Deutschland — Übersicht aller TV-Köche',
  description: 'Übersicht: Tim Mälzer, Frank Rosin, Steffen Henssler, Tim Raue, Nelson Müller, Sarah Wiener, Cornelia Poletto, Léa Linster, Johann Lafer und Christian Rach. Mit Bild, Restaurant und Steckbrief.',
  alternates: { canonical: HUB_URL },
  openGraph: {
    title: 'Promiköche Deutschland — Übersicht',
    description: 'Die zehn wichtigsten deutschen TV-Köche im Überblick mit Bild, Restaurant und Steckbrief.',
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

const PROMIS = [
  { slug: 'tim-maelzer', kurz: 'Bullerei Hamburg · Kitchen Impossible' },
  { slug: 'frank-rosin', kurz: 'Rosin\'s Dorsten · Rosins Restaurants' },
  { slug: 'steffen-henssler', kurz: 'Henssler Hamburg · Grill den Henssler' },
  { slug: 'tim-raue', kurz: 'Restaurant Tim Raue Berlin · 2 Sterne · Chef\'s Table' },
  { slug: 'nelson-mueller', kurz: 'Schote Essen · 1 Stern · ZDF' },
  { slug: 'sarah-wiener', kurz: 'Sarah-Wiener-Stiftung · ARD · EU-Parlament' },
  { slug: 'cornelia-poletto', kurz: 'Casa Poletto Hamburg · NDR' },
  { slug: 'lea-linster', kurz: 'Léa Linster Frisange Luxemburg · Bocuse d\'Or 1989' },
  { slug: 'johann-lafer', kurz: 'Stromburg · ZDF · Lafer-Lichter-Lecker' },
  { slug: 'christian-rach', kurz: 'Tafelhaus Hamburg · Rachs Restaurantschule' },
];

export default async function PromikoecheHub() {
  const articles = await reader.collections.articles.all();
  const promiArticles = PROMIS.map((p) => {
    const a = articles.find((x) => x.slug === p.slug);
    return a ? { ...a, kurz: p.kurz } : null;
  }).filter(Boolean) as any[];

  const items = promiArticles.map((a) => ({
    name: a.entry.title,
    url: `https://gastrosingles.de/magazin/${a.slug}`,
  }));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Promiköche Deutschland — Übersicht',
          description: 'Die zehn bekanntesten deutschen TV-Köche im Überblick.',
          url: HUB_URL,
          items,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://gastrosingles.de/magazin' },
          { name: 'Gastro-News', url: 'https://gastrosingles.de/magazin/gastro-news' },
          { name: 'Promiköche', url: HUB_URL },
        ])}
      />

      <PillarHero
        image={withBasePath('/images/hubs/promikoeche-hero.webp')}
        imageAlt="Promiköche Deutschland — Tim Mälzer, Frank Rosin, Steffen Henssler, Tim Raue, Nelson Müller, Sarah Wiener, Cornelia Poletto, Léa Linster, Johann Lafer und Christian Rach"
        title="Promiköche Deutschland"
        texts={[
          '10 TV-Köche im Porträt',
          'Sternekoch-Stars',
          'Tim Mälzer & Co.',
          'Vom Reality-TV zur Sterne-Schule',
        ]}
        subtitle="Die zehn bekanntesten deutschen TV-Köche und Sternekoch-Stars im Überblick — mit Restaurants, Sendungen und Karrierewegen."
        colors={HUB_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Gastro-News', href: '/gastro-news' },
          { label: 'Promiköche', href: '/promikoeche' },
        ]} />
      </div>

      {/* 10 Promiköche-Grid */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-primary">Alle 10 Promiköche im Überblick</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promiArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className="group block bg-surface rounded-2xl overflow-hidden border border-foreground/10 hover:border-primary/50 transition-colors"
              >
                {a.entry.featuredImage && (
                  <img
                    width="400" height="300"
                    src={withBasePath(a.entry.featuredImage)}
                    alt={a.entry.featuredImageAlt || a.entry.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-[1.02] transition-transform"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {a.entry.title}
                  </h3>
                  <p className="text-xs text-foreground/60 mt-2">{a.kurz}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Link zum Pillar-Text */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Mehr lesen</h2>
          <p className="text-foreground/70 mb-6">
            Das ausführliche Hintergrund-Porträt aller zehn Promiköche mit Reality-TV-Schule, Sterne-Spitze und gesellschaftlich-aktiver Köche.
          </p>
          <Link
            href="/promikoeche-deutschland"
            className="inline-block px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors"
          >
            Zum ausführlichen Promiköche-Porträt →
          </Link>
        </section>
      </ScrollReveal>
    </>
  );
}
