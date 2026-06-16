import Link from 'next/link';
import { articleHref } from '@/lib/routes';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { TableOfContents } from '@/components/content/TableOfContents';
import { HeartButton } from '@/components/ui/HeartButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';
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
    locale: 'de_DE',
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
    id: 'kueche',
    letter: 'A',
    title: 'Küchenberufe: Vom Commis bis zum Küchenchef',
    tocLabel: 'Küchenberufe: Koch, Küchenchef & Brigade',
    icon: '🍳',
    paragraphs: [
      'Die Küchenbrigade ist die klassische Karriereleiter der Gastronomie: vom Commis über Chef de Partie und Sous Chef bis zum Küchenchef. Jeder Posten hat ein eigenes Berufsbild, eigene Gehälter — und einen eigenen Alltag zwischen Mise en Place und Service-Peak.',
      'Die Ausbildung zum Koch ist der Einstieg in fast alle Küchenkarrieren. Was die einzelnen Posten verdienen und wie der Aufstieg läuft, steht in den Berufsbildern.',
    ],
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
    id: 'service-bar',
    letter: 'B',
    title: 'Service & Bar: Sommelier, Barkeeper & Restaurantfach',
    tocLabel: 'Service & Bar: Sommelier, Barkeeper & Co.',
    icon: '🍷',
    paragraphs: [
      'Der Service ist das Gesicht des Hauses — vom angelernten Kellner über die IHK-Ausbildung im Restaurantfach bis zum Sommelier mit eigener Weinkarte. Trinkgeld, Schichten und Gästekontakt prägen den Alltag stärker als in jedem anderen Gastro-Bereich.',
      'Wer hier arbeitet, verdient je nach Position und Haus sehr unterschiedlich — die Berufsbilder zeigen realistische Spannen inklusive Trinkgeld.',
    ],
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
    id: 'hotel-fuehrung',
    letter: 'C',
    title: 'Hotel & Führung: Hotelfach, Restaurantleitung & Wirt',
    tocLabel: 'Hotel & Führung: Hotelfach & Leitung',
    icon: '🏨',
    paragraphs: [
      'Hotelfachleute sind die Generalisten der Branche: Rezeption, Etage, F&B, Bankett. Wer Führung übernimmt — als Restaurantleiter oder mit dem eigenen Betrieb als Wirt — trägt Umsatzverantwortung und Personalplanung gleich mit.',
    ],
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
    url: `https://gastrosingles.de/magazin${articleHref(a)}`,
  }));

  const tocItems = [
    ...GROUPS.map((g) => ({ label: `${g.letter}. ${g.tocLabel}`, id: g.id })),
    { label: 'Gehalt in der Gastronomie: der Überblick', id: 'gehaltsvergleich' },
  ];

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Berufsbilder Gastronomie: Aufgaben, Gehalt & Karriere — Übersicht',
          description: 'Die wichtigsten Berufe in der Gastronomie im Überblick.',
          url: HUB_URL,
          items,
        })}
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

      {/* Intro + TOC */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-10">
          <p className="text-lg leading-relaxed text-foreground/80 mb-4">
            Die Gastronomie hat mehr Berufsbilder als fast jede andere Branche: eine komplette Küchenbrigade,
            den Service vom Kellner bis zum Sommelier und das Hotelfach mit eigener Karriereleiter. Hier findest
            du alle 18 Berufe im Überblick — mit Aufgaben, realistischen Gehältern und dem Alltag dahinter.
          </p>
          <p className="text-lg leading-relaxed text-foreground/80 mb-8">
            Jede Sektion fasst den Bereich kurz zusammen und verlinkt auf die ausführlichen Berufsbilder mit
            Gehalt, Ausbildung und Karrierewegen.
          </p>
          <TableOfContents items={tocItems} showFaq={false} />
        </section>
      </ScrollReveal>

      {/* Gruppen-Sektionen A–C */}
      {groupArticles.map((g) => (
        <ScrollReveal key={g.id}>
          <section id={g.id} className="max-w-6xl mx-auto px-6 py-10 scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b-2 border-primary flex items-center gap-3">
              <span className="text-3xl">{g.icon}</span>{g.letter}. {g.title}
            </h2>
            <div className="max-w-3xl">
              {g.paragraphs.map((p, i) => (
                <p key={i} className="text-foreground/80 leading-relaxed mb-4">
                  {p}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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

      {/* Gehaltsvergleich */}
      <ScrollReveal>
        <section id="gehaltsvergleich" className="max-w-3xl mx-auto px-6 py-10 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b-2 border-primary">
            Gehalt in der Gastronomie: der Überblick
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Brutto-Monatsspannen je Position — von Tarif bis Spitzenhaus. Die komplette Analyse mit Mindestlohn,
            Tarifvertrag und Trinkgeld-Realität steht im großen{' '}
            <Link href="/berufsbilder/gehalt-gastronomie" className="text-primary font-semibold hover:underline">
              Gehalts-Guide Gastronomie
            </Link>.
          </p>
          <dl className="divide-y divide-foreground/10 rounded-2xl bg-surface border border-foreground/10 overflow-hidden">
            {[
              ['Küchenchef', '3.500–9.000 €', 'kuechenchef'],
              ['Sous Chef / Saucier', '2.900–5.500 €', 'sous-chef'],
              ['Maître d’Hôtel', '3.000–5.500 €', 'maitre-d-hotel'],
              ['Sommelier', '2.400–5.000 €', 'sommelier'],
              ['Koch', '2.300–6.500 €', 'koch'],
              ['Barkeeper', '2.200–4.500 €', 'barkeeper'],
              ['Hotelfachfrau/-mann', '2.100–4.500 €', 'hotelfachfrau'],
              ['Restaurantfach (IHK)', '2.100–3.800 €', 'restaurantfachfrau'],
              ['Kellner (angelernt)', '2.270–2.730 € + Trinkgeld', 'kellner'],
            ].map(([label, value, slug]) => (
              <div key={slug} className="flex justify-between gap-4 px-5 py-3 text-sm">
                <dt className="text-foreground/60">
                  <Link href={`/berufsbilder/${slug}`} className="hover:text-primary transition-colors">
                    {label}
                  </Link>
                </dt>
                <dd className="font-semibold text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="text-center py-12 px-6">
          <h2 className="text-2xl font-bold mb-4">Singles aus diesen Berufen kennenlernen?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Köche, Servicekräfte, Hotelfachleute — auf Gastrosingles triffst du Menschen, die Schichtdienst
            nicht erklärt bekommen müssen. Mehr dazu im{' '}
            <Link href="/singles-partnersuche" className="text-primary hover:underline">
              Partnersuche-Guide für die Gastronomie
            </Link>.
          </p>
          <HeartButton href="https://gastrosingles.de/registration/?AID=GastrosinglesMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
