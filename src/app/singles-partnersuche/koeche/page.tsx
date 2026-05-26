import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { CircularTestimonials } from '@/components/ui/CircularTestimonials';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';

const KOECHE_URL = 'https://gastrosingles.de/magazin/singles-partnersuche/koeche';

export const metadata = {
  title: 'Partnersuche Köche — Dating trotz Schichtdienst und Service',
  description: 'Partnersuche für Köche und Gastronomie-Profis: Guides zu Online-Dating, erstem Date nach Service, Sommelier, Sous Chef, Wirt, Hochzeit im Restaurant.',
  alternates: { canonical: KOECHE_URL },
  openGraph: {
    title: 'Partnersuche Köche — Dating zwischen Service und Pass',
    description: 'Singles in der Gastronomie treffen. Hier versteht man Schichtdienst, Adrenalin-Abfall und 60-Stunden-Wochen ohne Erklärung.',
    url: KOECHE_URL,
    type: 'website',
    siteName: 'Gastrosingles Magazin',
    locale: 'de-DE',
  },
};

const KOECHE_COLORS = [
  { r: 220, g: 60, b: 50 },
  { r: 255, g: 145, b: 60 },
  { r: 255, g: 200, b: 70 },
];

const testimonials = [
  {
    quote: 'Nach drei Jahren in der Sterne-Küche hatte ich Tinder gelöscht. Hier hab ich nach zwei Wochen jemanden getroffen, der nicht fragt, warum ich am Wochenende arbeite, sondern wann ich frei habe.',
    name: 'Marco K.',
    role: 'Sous Chef, Hamburg',
  },
  {
    quote: 'Sommelier sucht Frau klang nach ZDF-Kontaktanzeige. Bei Gastrosingles haben mich Frauen geschrieben, die wissen, was eine Vinothek-Eröffnung bedeutet. Eine davon ist heute meine Partnerin.',
    name: 'Felix R.',
    role: 'Sommelier, München',
  },
  {
    quote: 'Wirtin sein und nebenbei jemanden finden, das funktioniert nicht zwischen Mittagsgeschäft und Sperrstunde. Hier waren alle in meinem Match-Radius selbst aus der Branche. Das macht den Unterschied.',
    name: 'Anna H.',
    role: 'Wirtin Landgasthof, Baden-Württemberg',
  },
];

const SECTIONS = [
  {
    title: '🍳 Grundlagen & Realität',
    intro: 'Warum Partnersuche in der Gastronomie anders läuft. Schichtdienst, Adrenalin-Abfall, Sonntage am Pass.',
    slugs: [
      'partnersuche-koeche',
      'partnersuche-restaurantfachkraft',
      'partnersuche-barkeeper',
    ],
  },
  {
    title: '💬 Position & Lebenslage',
    intro: 'Sous Chef, Sommelier, Wirt. Jede Position in der Brigade hat eigene Dating-Realitäten.',
    slugs: [
      'sous-chef-sucht-frau',
      'sommelier-sucht-frau',
      'wirt-sucht-frau',
    ],
  },
  {
    title: '💍 Hochzeit & Familie in der Gastronomie',
    intro: 'Wenn Gastronomen heiraten, läuft das anders. Restaurant-Hochzeit, Familienbetrieb, Schichtplan mit Kind.',
    slugs: [
      'hochzeit-im-restaurant',
    ],
  },
];

const SECTIONS_AFTER_CTA = [
  {
    title: '💬 Online-Dating-Strategien',
    intro: 'Für Köche und Service-Kräfte ist Online-Dating die effizienteste Methode. Profil, erste Nachricht, Diskretion am eigenen Arbeitsplatz.',
    slugs: [
      'dating-profil-gastronomie',
      'erste-nachricht-gastro-dating-app',
      'gastrosingles-vs-tinder-nischen-dating',
      'online-dating-gastronomie-strategien',
    ],
  },
  {
    title: '☕ Erstes Date & Kennenlernen',
    intro: 'Wenn dein freier Vormittag die einzige Quality-Time ist, brauchen erste Dates ein anderes Drehbuch.',
    slugs: [
      'erstes-date-gastronomie-schichten',
      'kennenlernen-online-dating-gastronomie',
      'gespraechsthemen-erstes-date-gastro',
      'weinprobe-als-erstes-date',
    ],
  },
  {
    title: '❤️ Beziehung & Alltag im Gastro-Beruf',
    intro: 'Der Beruf sitzt als dritter Partner am Tisch. Wie Paare den Schichtrhythmus halten, ohne sich gegenseitig zu verlieren.',
    slugs: [
      'beziehung-mit-koch-realitaet',
      'beziehung-mit-sommelier-weinabende',
      'dating-im-schichtdienst-gastro',
      'partnersuche-ue50-gastronomie',
    ],
  },
  {
    title: '🎓 Netzwerke & Branchen-Treffs',
    intro: 'INTERNORGA, INTERGASTRA, DEHOGA-Landesverbände, Kochvereine. Wo Gastro-Singles sich abseits von Apps begegnen.',
    slugs: [
      'internorga-hamburg-singles-networking',
      'intergastra-stuttgart-gastro-dating',
      'dehoga-landesverbaende-uebersicht',
      'vkd-kochvereine-deutschland-uebersicht',
    ],
  },
  {
    title: '❓ Häufige Fragen',
    intro: 'Die Fragen, die jeder Koch beim Thema Dating einmal hat. Kompakt beantwortet.',
    slugs: [
      'faq-partnersuche-gastronomie',
      'kollegen-daten-kueche-ja-nein',
      'zeitmanagement-60h-woche-dating-koch',
      'partner-ohne-gastro-erfahrung-koch',
    ],
  },
];

export default async function KoechePillar() {
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
          name: 'Partnersuche Köche — Der komplette Guide für die Gastronomie',
          description: 'Dating für Köche, Sous Chefs, Sommeliers, Barkeeper, Wirte und Service-Kräfte. Von Online-Dating bis zur Hochzeit im eigenen Restaurant.',
          url: KOECHE_URL,
          items: schemaItems,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://gastrosingles.de/magazin' },
          { name: 'Singles & Partnersuche', url: 'https://gastrosingles.de/magazin/singles-partnersuche' },
          { name: 'Für Köche', url: KOECHE_URL },
        ])}
      />
      <PillarHero
        title="Köche Singles"
        texts={[
          'Liebe nach Service',
          'Wer versteht Schichtdienst?',
          'Koch sucht Köchin',
          'Pass-Romanze',
          'Köche Singles',
        ]}
        subtitle="Partnersuche für Köche, Sommeliers, Wirte und Service-Kräfte. Schichtdienst, Adrenalin-Abfall, ehrliches Verständnis."
        colors={KOECHE_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
          { label: 'Für Köche', href: '/singles-partnersuche/koeche' },
        ]} />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Über eine Million Menschen arbeiten im deutschen Gastgewerbe. Allein 16.308 junge
                Menschen begannen 2024 eine Ausbildung zum Koch oder zur Köchin, ein Plus von
                6,5 Prozent gegenüber dem Vorjahr (DEHOGA-Zahlenspiegel). Dazu kommen Sommeliers,
                Barkeeper, Restaurantfachkräfte, Hotelfachleute und Wirte mit eigenem Betrieb. Was
                sie verbindet: Service-Stunden, die andere Berufsgruppen nicht kennen, ein
                Adrenalin-Abfall nach Mitternacht, der wie ein Kater ohne Alkohol wirkt, und
                Partner, die irgendwann aufgeben zu fragen, wann der nächste freie Abend ist.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Eine Knorr- und Tinder-Studie 2025 zeigt: 83 Prozent der Singles zwischen 18 und 27
                halten Kochen für eine Green Flag, 56 Prozent würden bei kulinarischer Kompetenz
                eher matchen. Im Real-Life-Dating der Branche kehrt sich das aber um. Wer freitags
                bis Sonntag am Pass steht, taucht in den Suchfiltern von Tinder nicht auf, weil
                Tinder den Schichtdienst nicht abbildet. Halbherzige Matches, abgesagte Dates und
                Partnerschaften, die sich wie eine zusätzliche Doppelschicht anfühlen, sind die
                Folge.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Gastrosingles.de ist anders aufgesetzt. Hier triffst du Menschen, die dein
                Arbeitsleben kennen, weil sie selbst Sommelier, Barkeeperin, Patissier oder
                Wirtin sind, oder weil sie wissen, was es heißt, sonntags zu zweit zu frühstücken
                statt zu zweit zu brunchen. Keine Erklärungen. Kein Rechtfertigen der
                60-Stunden-Wochen. Echte Verbindungen zwischen Menschen, die den Beruf
                wertschätzen. Meld dich an, dein Match wartet zwischen zwei Schichten.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Top CTA */}
      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://gastrosingles.de/?AID=GastroMagazin-koeche">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* Thematic Sections — before middle CTA */}
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

      {/* Middle CTA */}
      <ScrollReveal>
        <section className="max-w-xl mx-auto px-6 py-10 text-center">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-background rounded-xl p-8 flex flex-col items-center gap-4">
              <p className="text-lg font-semibold">
                Jetzt Gastro-Singles in deiner Region finden
              </p>
              <HeartButton href="https://gastrosingles.de/?AID=GastroMagazin-koeche">
                Jetzt kostenlos registrieren
              </HeartButton>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Thematic Sections — after middle CTA */}
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

      {/* Testimonials */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-8">
          <CircularTestimonials items={testimonials} />
        </section>
      </ScrollReveal>

      {/* Bottom CTA */}
      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Bereit für dein Gastro-Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Tausende Gastro-Singles warten. Menschen, die deinen Service-Rhythmus kennen.
          </p>
          <HeartButton href="https://gastrosingles.de/?AID=GastroMagazin-koeche">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
