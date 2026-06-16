import Link from 'next/link';
import { articleHref } from '@/lib/routes';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';
import { withBasePath } from '@/lib/url';

const HUB_URL = 'https://gastrosingles.de/magazin/messen';

export const metadata = {
  title: 'Gastro-Messen Deutschland — Übersicht',
  description: 'Übersicht aller wichtigen Gastro-Messen: Internorga Hamburg, Intergastra Stuttgart, Anuga Köln, HOGATEC Düsseldorf, IGEHO Basel, BIOFACH Nürnberg, Süffa, Gastro-Vision.',
  alternates: { canonical: HUB_URL },
  openGraph: {
    title: 'Gastro-Messen Deutschland — Übersicht',
    description: 'Internorga, Intergastra, Anuga & Co. — alle wichtigen Gastro-Messen in DACH im Überblick.',
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

const MESSEN = [
  { slug: 'internorga', kurz: 'Hamburg · jährlich März · Leitmesse Außer-Haus-Markt' },
  { slug: 'intergastra', kurz: 'Stuttgart · alle 2 Jahre · Gastronomie + Hotellerie' },
  { slug: 'anuga', kurz: 'Köln · alle 2 Jahre · Weltleitmesse Food + Beverage' },
  { slug: 'hogatec', kurz: 'Düsseldorf · Gastronomie + Hotellerie + Catering' },
  { slug: 'igeho', kurz: 'Basel · alle 2 Jahre · Schweizer Branchenleitmesse' },
  { slug: 'biofach', kurz: 'Nürnberg · jährlich · Weltleitmesse Bio-Lebensmittel' },
  { slug: 'sueffa', kurz: 'Stuttgart · alle 2 Jahre · Metzgerhandwerk + Fleischerei' },
  { slug: 'gastro-vision', kurz: 'Hamburg · jährlich · Boutique-Messe Trendsetter' },
];

export default async function MessenHub() {
  const articles = await reader.collections.articles.all();
  const messenArticles = MESSEN.map((m) => {
    const a = articles.find((x) => x.slug === m.slug);
    return a ? { ...a, kurz: m.kurz } : null;
  }).filter(Boolean) as any[];

  const items = messenArticles.map((a) => ({
    name: a.entry.title,
    url: `https://gastrosingles.de/magazin${articleHref(a)}`,
  }));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Gastro-Messen Deutschland — Übersicht',
          description: 'Übersicht der wichtigsten Gastronomie- und Hotellerie-Messen im DACH-Raum.',
          url: HUB_URL,
          items,
        })}
      />

      <PillarHero
        title="Gastro-Messen"
        texts={[
          'Internorga · Intergastra · Anuga',
          '8 Branchen-Leitmessen',
          'Termine & Trends',
          'Hamburg · Stuttgart · Köln',
        ]}
        subtitle="Die wichtigsten Gastronomie- und Hotellerie-Messen in Deutschland, Österreich und der Schweiz im Überblick."
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
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-primary">8 Gastro-Messen im Überblick</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {messenArticles.map((a) => (
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
    </>
  );
}
