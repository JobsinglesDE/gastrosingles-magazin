import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { CircularTestimonials } from '@/components/ui/CircularTestimonials';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';

const SERVICE_URL = 'https://gastrosingles.de/magazin/singles-partnersuche/service';

export const metadata = {
  title: 'Partnersuche Service & Hotelfach',
  description: 'Partnersuche für Restaurantfachfrau, Hotelfachmann, Sommelier und Barkeeperin. Guides zu Schichtdienst, Nachtbar, Hotelrezeption und Weinabend-Dating.',
  alternates: { canonical: SERVICE_URL },
  openGraph: {
    title: 'Partnersuche Service & Hotelfach in der Gastronomie',
    description: 'Singles im Service und Hotelfach treffen. Schichtdienst, Nachtbar, Tresenwelten — hier versteht man deinen Rhythmus.',
    url: SERVICE_URL,
    type: 'website',
    siteName: 'Gastrosingles Magazin',
    locale: 'de-DE',
  },
};

const SERVICE_COLORS = [
  { r: 90, g: 50, b: 140 },
  { r: 200, g: 70, b: 90 },
  { r: 255, g: 170, b: 60 },
];

const testimonials = [
  {
    quote: 'Nach drei Jahren Hotelrezeption hatte ich vergessen, wann ich das letzte Mal jemanden ausserhalb der Schicht getroffen habe. Hier hab ich nach vier Wochen ein Match gefunden, der den Frühdienst nicht für ein Problem hält.',
    name: 'Sandra M.',
    role: 'Hotelfachfrau, Köln',
  },
  {
    quote: 'Sommeliers werden auf Mainstream-Apps gefragt, ob sie wirklich nur Wein trinken. Hier traf ich Frauen, die selbst aus der Branche kommen und die ersten zwei Sätze überspringen.',
    name: 'Felix R.',
    role: 'Sommelier, München',
  },
  {
    quote: 'Cocktailbar bis 3 Uhr und am nächsten Tag halb ausgeschlafen ein Date um 14 Uhr im Café — bei normalen Apps unmöglich, hier Normalität.',
    name: 'Tabea K.',
    role: 'Barkeeperin, Berlin',
  },
];

const SECTIONS = [
  {
    title: '🍷 Grundlagen Service & Hotelfach',
    intro: 'Restaurantfach, Hotelfach, Sommelier, Bar. Warum klassische Dating-Apps für Service-Berufe nicht greifen.',
    slugs: [
      'partnersuche-restaurantfachkraft',
      'partnersuche-barkeeper',
      'sommelier-sucht-frau',
    ],
  },
  {
    title: '👤 Position & Lebenslage',
    intro: 'Jede Position im Service hat eigene Realitäten. Vom Frühdienst-Hotelfach bis zur Late-Night-Bar.',
    slugs: [
      'hotelfachfrau-sucht-mann',
      'barkeeperin-sucht-mann',
      'sous-chef-sucht-frau',
    ],
  },
  {
    title: '🍸 Date-Ideen für Service & Sommelier',
    intro: 'Weinprobe, freier Vormittag, Café zwischen den Schichten — wo Service-Kräfte Dates wirklich unterbringen.',
    slugs: [
      'weinprobe-als-erstes-date',
      'erstes-date-gastronomie-schichten',
    ],
  },
];

const SECTIONS_AFTER_CTA = [
  {
    title: '💬 Online-Dating für Service-Profis',
    intro: 'Profil-Tipps, erste Nachricht und warum branchen-interne Matches die Erklärungs-Hürde halbieren.',
    slugs: [
      'kennenlernen-online-dating-gastronomie',
      'dating-im-schichtdienst-gastro',
    ],
  },
  {
    title: '❤️ Beziehung & Alltag im Service',
    intro: 'Nachtbar, Hotel-Schichten, Sonntagsmarkt — wie Service-Paare den Rhythmus halten.',
    slugs: [
      'beziehung-mit-koch-realitaet',
      'wirt-sucht-frau',
      'hochzeit-im-restaurant',
    ],
  },
];

export default async function ServicePillar() {
  const articles = await reader.collections.articles.all();

  function getSectionArticles(slugs: string[]) {
    return slugs
      .map((slug) => articles.find((a) => a.slug === slug))
      .filter(Boolean) as typeof articles;
  }

  const allSectionSlugs = [...SECTIONS, ...SECTIONS_AFTER_CTA].flatMap((s) => s.slugs);
  const schemaItems = allSectionSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter(Boolean)
    .map((a) => ({
      name: a!.entry.title,
      url: `https://gastrosingles.de/magazin/${a!.slug}`,
    }));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Partnersuche Service & Hotelfach — Der Guide für Restaurantfach, Bar und Sommelier',
          description: 'Dating für Restaurantfachfrau, Hotelfachmann, Sommelier, Barkeeperin und Service-Kräfte. Von Online-Dating bis Beziehungsalltag im Schichtdienst.',
          url: SERVICE_URL,
          items: schemaItems,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://gastrosingles.de/magazin' },
          { name: 'Singles & Partnersuche', url: 'https://gastrosingles.de/magazin/singles-partnersuche' },
          { name: 'Für Service & Hotelfach', url: SERVICE_URL },
        ])}
      />
      <PillarHero
        title="Service Singles"
        texts={[
          'Liebe nach Sperrstunde',
          'Wer versteht Frühdienst?',
          'Sommelier sucht Frau',
          'Bar-Romanze',
          'Service Singles',
        ]}
        subtitle="Partnersuche für Restaurantfachfrau, Hotelfachmann, Sommelier und Barkeeperin. Schichten, Tresen, freie Vormittage."
        colors={SERVICE_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
          { label: 'Für Service & Hotelfach', href: '/singles-partnersuche/service' },
        ]} />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Service-Kräfte sind das Rückgrat der deutschen Gastronomie. Restaurantfachfrau,
                Hotelfachmann, Sommelier, Barkeeperin, Restaurantleitung, Maître d'Hotel.
                Während Köche unsichtbar in der Küche stehen, sind Service-Profis die,
                die mit dem Gast reden, die Weinkarte erklären, die Hotelrezeption nachts
                übernehmen. Was sie verbindet: ein Berufsalltag, in dem man mit hundert
                Menschen am Tag spricht und am Ende keinen davon wiedersieht.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Die Dating-Realität ist hart. Frühdienst um 5:30 in der Hotelküche, Spätdienst
                bis 1 Uhr nachts in der Cocktailbar, Sonntagsbrunch-Service bis 16 Uhr. Wer
                in einer klassischen Dating-App seinen Wochenplan erklärt, klingt nach Klage.
                Wer auf Tinder einen Drink Freitagabend vorgeschlagen bekommt, sagt zum
                fünfzehnten Mal ab und hört irgendwann auf zu antworten. Das ist der Punkt,
                an dem Service-Profis aufgeben.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Gastrosingles.de ist anders strukturiert. Hier treffen Service-Kräfte auf
                Menschen, die wissen, was Schichtwechsel bedeutet, weil sie selbst in der
                Branche stehen oder zumindest die Logistik akzeptieren. Keine Erklärungen,
                keine schräge Frage nach dem Sonntag. Echte Verbindungen für Menschen, die
                sich nicht zwischen Beruf und Beziehung entscheiden müssen. Meld dich an,
                dein Match wartet zwischen Schicht und Brunch.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://gastrosingles.de/?AID=GastroMagazin-service">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {SECTIONS.map((section) => {
        const sectionArticles = getSectionArticles(section.slugs);
        if (sectionArticles.length === 0) return null;
        return (
          <ScrollReveal key={section.title}>
            <section className="max-w-6xl mx-auto px-6 py-10">
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-brand-orange">
                {section.title}
              </h2>
              {section.intro && (
                <p className="text-foreground/70 mb-8 leading-relaxed">{section.intro}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sectionArticles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    title={article.entry.title}
                    excerpt={article.entry.excerpt}
                    href={`/${article.slug}`}
                    image={article.entry.featuredImage || undefined}
                    imageAlt={article.entry.featuredImageAlt || undefined}
                    category={article.entry.category}
                    date={article.entry.publishedAt || undefined}
                  />
                ))}
              </div>
            </section>
          </ScrollReveal>
        );
      })}

      <ScrollReveal>
        <section className="max-w-xl mx-auto px-6 py-10 text-center">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-background rounded-xl p-8 flex flex-col items-center gap-4">
              <p className="text-lg font-semibold">
                Jetzt Service- und Hotelfach-Singles finden
              </p>
              <HeartButton href="https://gastrosingles.de/?AID=GastroMagazin-service">
                Jetzt kostenlos registrieren
              </HeartButton>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {SECTIONS_AFTER_CTA.map((section) => {
        const sectionArticles = getSectionArticles(section.slugs);
        if (sectionArticles.length === 0) return null;
        return (
          <ScrollReveal key={section.title}>
            <section className="max-w-6xl mx-auto px-6 py-10">
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-brand-orange">
                {section.title}
              </h2>
              {section.intro && (
                <p className="text-foreground/70 mb-8 leading-relaxed">{section.intro}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sectionArticles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    title={article.entry.title}
                    excerpt={article.entry.excerpt}
                    href={`/${article.slug}`}
                    image={article.entry.featuredImage || undefined}
                    imageAlt={article.entry.featuredImageAlt || undefined}
                    category={article.entry.category}
                    date={article.entry.publishedAt || undefined}
                  />
                ))}
              </div>
            </section>
          </ScrollReveal>
        );
      })}

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-8">
          <CircularTestimonials items={testimonials} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Bereit für dein Service-Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Service-Singles in deiner Region warten — Menschen, die deinen Tresen-Rhythmus kennen.
          </p>
          <HeartButton href="https://gastrosingles.de/?AID=GastroMagazin-service">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
