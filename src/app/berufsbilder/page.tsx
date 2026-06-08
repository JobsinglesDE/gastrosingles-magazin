import Link from 'next/link';
import { articleHref } from '@/lib/routes';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { withBasePath } from '@/lib/url';
import { SECTION_HUBS } from '@/lib/hubs';

const HUB_URL = 'https://gastrosingles.de/magazin/berufsbilder';
const HUB = SECTION_HUBS['berufsbilder'];

export const metadata = {
  title: HUB.seoTitle,
  description: HUB.seoDescription,
  alternates: { canonical: HUB_URL },
  openGraph: {
    title: HUB.seoTitle,
    description: HUB.seoDescription,
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

// Gruppiert nach Bereich, mit Kurz-Info (Aufgabe / Gehalt-Range)
const GROUPS = [
  {
    title: 'Küche',
    icon: '🍳',
    berufe: [
      { slug: 'koch', kurz: 'Allrounder am Pass · 2.300–6.500 €' },
      { slug: 'kuechenchef', kurz: 'Brigade-Führung · 3.500–9.000 €' },
      { slug: 'sous-chef', kurz: 'Stellvertreter Küchenchef · 2.900–5.500 €' },
      { slug: 'chef-de-partie', kurz: 'Posten-Chef · 2.600–4.200 €' },
      { slug: 'commis-de-cuisine', kurz: 'Brigade-Einstieg · 2.000–2.700 €' },
      { slug: 'saucier', kurz: 'Saucenposten · 2.900–5.500 €' },
      { slug: 'entremetier', kurz: 'Gemüse + Suppen · 2.500–4.000 €' },
      { slug: 'garde-manger', kurz: 'Kalter Posten · 2.600–4.300 €' },
      { slug: 'patissier', kurz: 'Konditor + Patisserie · 2.400–4.500 €' },
    ],
  },
  {
    title: 'Service & Bar',
    icon: '🍷',
    berufe: [
      { slug: 'sommelier', kurz: 'Wein-Experte · 2.400–5.000 €' },
      { slug: 'barkeeper', kurz: 'Bar + Cocktails · 2.200–4.500 €' },
      { slug: 'chef-de-rang', kurz: 'Service-Posten-Chef · 2.500–4.000 €' },
      { slug: 'maitre-d-hotel', kurz: 'Restaurant-Repräsentation · 3.000–5.500 €' },
      { slug: 'restaurantfachfrau', kurz: 'IHK-Service · 2.100–3.800 €' },
      { slug: 'restaurantfachmann', kurz: 'IHK-Service · 2.100–3.800 €' },
      { slug: 'kellner', kurz: 'Service angelernt + Trinkgeld · 2.270–2.730 €' },
    ],
  },
  {
    title: 'Hotel & Führung',
    icon: '🏨',
    berufe: [
      { slug: 'hotelfachfrau', kurz: 'Rezeption + Etage · 2.100–4.500 €' },
      { slug: 'hotelfachmann', kurz: 'Front Office + F&B · 2.100–4.500 €' },
      { slug: 'restaurantleiter', kurz: 'Service-Leitung + Umsatz · 2.800–4.500 €' },
      { slug: 'wirt', kurz: 'Selbständiger Gastronom · sehr variabel' },
    ],
  },
];

export default async function BerufsbilderHub() {
  const articles = await reader.collections.articles.all();
  const groupArticles = GROUPS.map((g) => ({
    ...g,
    berufe: g.berufe.map((b) => {
      const a = articles.find((x) => x.slug === b.slug);
      return a ? { ...a, kurz: b.kurz } : null;
    }).filter(Boolean) as any[],
  }));

  const items = groupArticles.flatMap((g) => g.berufe).map((a) => ({
    name: a.entry.title,
    url: `https://gastrosingles.de/magazin/${a.slug}`,
  }));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Berufsbilder Gastronomie — Übersicht',
          description: 'Die wichtigsten Berufe in der Gastronomie im Überblick.',
          url: HUB_URL,
          items,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://gastrosingles.de/magazin' },
          { name: 'Gastro-News', url: 'https://gastrosingles.de/magazin/gastro-news' },
          { name: 'Berufsbilder', url: HUB_URL },
        ])}
      />

      <PillarHero
        title="Berufsbilder Gastronomie"
        texts={[
          '18 Gastro-Berufe',
          'Koch · Sommelier · Patissier',
          'Aufgaben, Gehalt, Realität',
          'Küche · Service · Hotel',
        ]}
        subtitle="Die 18 wichtigsten Berufe in der Gastronomie im Überblick — mit Aufgaben, Gehalt-Bandbreite und Dating-Realität im Schichtdienst."
        colors={HUB_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Gastro-News', href: '/gastro-news' },
          { label: 'Berufsbilder', href: '/berufsbilder' },
        ]} />
      </div>

      {groupArticles.map((g) => (
        <ScrollReveal key={g.title}>
          <section className="max-w-6xl mx-auto px-6 py-10">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-primary flex items-center gap-3">
              <span className="text-3xl">{g.icon}</span>{g.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {g.berufe.map((a) => (
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
      ))}
    </>
  );
}
