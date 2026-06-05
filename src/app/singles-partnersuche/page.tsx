import Link from 'next/link';
import { articleHref } from '@/lib/routes';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { HeartButton } from '@/components/ui/HeartButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { SINGLE_HUB } from '@/lib/hubs';

const HUB_URL = 'https://gastrosingles.de/magazin/singles-partnersuche';

export const metadata = {
  title: SINGLE_HUB.seoTitle,
  description: SINGLE_HUB.seoDescription,
  alternates: { canonical: HUB_URL },
  openGraph: {
    title: SINGLE_HUB.seoTitle,
    description: SINGLE_HUB.seoDescription,
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

const PILLARS = [
  {
    title: 'Köche & Küche',
    excerpt: 'Partnersuche zwischen Service-Stress, Sonntags-Pass und 60-Stunden-Woche. Für Köche, Sous Chefs, Patissiers und Wirte.',
    href: '/singles-partnersuche/koeche',
    icon: '🍳',
  },
  {
    title: 'Service & Hotelfach',
    excerpt: 'Dating für Restaurantfachfrau, Hotelfachmann, Sommelier und Barkeeperin. Frühdienst, Spätschicht, Nachtbar.',
    href: '/singles-partnersuche/service',
    icon: '🍷',
  },
];

export default async function SinglesPartnersuche() {
  const articles = await reader.collections.articles.all();

  const pillarItems = PILLARS.map((p) => ({
    name: p.title,
    url: `https://gastrosingles.de/magazin${p.href}`,
  }));

  const highlightSlugs = [
    'partnersuche-koeche',
    'sommelier-sucht-frau',
    'wirt-sucht-frau',
    'hochzeit-im-restaurant',
  ];
  const highlights = highlightSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter(Boolean) as typeof articles;

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Partnersuche Gastronomie — Hub für Köche & Service',
          description: 'Dating-Guides für Köche, Sommeliers, Wirte und Service-Kräfte in der Gastronomie.',
          url: HUB_URL,
          items: pillarItems,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://gastrosingles.de/magazin' },
          { name: 'Singles & Partnersuche', url: HUB_URL },
        ])}
      />

      <PillarHero
        title="Singles & Partnersuche"
        texts={[
          'Liebe in der Gastronomie',
          'Schichtdienst trifft Beziehung',
          'Pass & Liebe',
          'Service-Match',
          'Gastrosingles',
        ]}
        subtitle="Partnersuche für Köche, Sommeliers, Wirte und Servicekräfte. Branchen-Verständnis ohne Erklärung."
        colors={HUB_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Singles & Partnersuche', href: '/singles-partnersuche' }]} />
      </div>

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-brand-orange">Wähle deinen Bereich</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group block p-6 rounded-2xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
              >
                <div className="text-4xl mb-3">{p.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-brand-orange transition-colors">{p.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {highlights.length > 0 && (
        <ScrollReveal>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-brand-orange">Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {highlights.map((a) => (
                <ArticleCard
                  key={a.slug}
                  title={a.entry.title}
                  excerpt={a.entry.excerpt}
                  href={articleHref(a)}
                  image={a.entry.featuredImage || undefined}
                  imageAlt={a.entry.featuredImageAlt || undefined}
                  category={a.entry.category}
                  date={a.entry.publishedAt || undefined}
                />
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <section className="text-center py-12 px-6">
          <h2 className="text-2xl font-bold mb-4">Bereit für die Partnersuche?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Singles in der Gastronomie warten auf dich. Köche, Sommeliers, Wirte und Service-Kräfte.
          </p>
          <HeartButton href="https://gastrosingles.de/?AID=GastrosinglesMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
