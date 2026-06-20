import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';
import { BUNDESLAENDER, BUNDESLAND_SLUGS } from '@/lib/bundeslaender';

const PILLAR_URL = 'https://gastrosingles.de/magazin/singles-regional/kochvereine';

export const metadata = {
  title: 'Kochvereine Deutschland: alle VKD-Zweigvereine im Ueberblick',
  description: 'Alle deutschen Landesverbände und Zweigvereine des VKD: Fortbildungen, Kochwettbewerbe und Mitgliederversammlungen als informelle Gastro-Partnersuche.',
  alternates: { canonical: PILLAR_URL },
  openGraph: {
    title: 'Kochvereine — Networking mit Liebes-Potenzial',
    description: 'Pro Bundesland: Vereins-Sitz, Mitgliederzahl, Top-Events und wie Gastro-Singles diese nutzen.',
    url: PILLAR_URL,
    type: 'website',
    siteName: 'Gastrosingles Magazin',
    locale: 'de_DE',
  },
};

const VEREIN_COLORS = [
  { r: 15, g: 139, b: 141 },
  { r: 47, g: 181, b: 184 },
  { r: 255, g: 122, b: 0 },
];

export default async function KochvereinePillar() {
  const all = await reader.collections.kochvereine.all();
  const published = all.filter((a) => a.entry.status === 'published');

  function countByBL(slug: string) {
    return published.filter((a) => a.entry.bundesland === slug).length;
  }

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Kochvereine — Singles Regional',
          description: 'Alle 115 VKD-Zweigvereine in 9 Landesverbaenden — Mainz, Stuttgart, Muenchen, Hamburg und mehr.',
          url: PILLAR_URL,
          items: BUNDESLAND_SLUGS.map((s) => ({
            name: BUNDESLAENDER[s].name,
            url: `${PILLAR_URL}/${s}`,
          })),
        })}
      />

      <PillarHero
        title="Kochvereine"
        texts={[
          '115 VKD-Zweigvereine',
          'Branchen-Netzwerk + Privates',
          'Kochwettbewerb trifft Liebe',
          'Branchen-Treffs mit Mehrwert',
          'Kochvereine',
        ]}
        subtitle="Alle 115 Zweigvereine des Verbandes der Koeche Deutschlands — und wie Gastro-Singles diese Treffs ueber das Fachprogramm hinaus nutzen."
        colors={VEREIN_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Kochvereine', href: '/singles-regional/kochvereine' },
        ]} />
      </div>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Ein VKD-Zweigverein ist nicht der erste Ort, an den du beim Wort &laquo;Liebe&raquo; denkst. Aber genau hier sammeln sich Koeche, Patissiers, Sommeliers und Servicekraefte regelmaessig: Kochwettbewerbe, Mitgliederversammlungen, Branchen-Stammtische. Wer dort wach hingeht statt nur fachlich zu netzwerken, trifft Menschen, die deinen Beruf nicht erst erklaert bekommen muessen.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Waehle dein Bundesland: wir zeigen dir, welche Vereins-Events tatsaechlich Gaeste begruessen, welche Zweigvereins-Stammtische offen sind, und wie du den Schritt von Branche zu Privatem wagst, ohne unprofessionell zu wirken.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://gastrosingles.de/?AID=GastrosinglesMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* Bundesland-Grid */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Wähle dein Bundesland
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Jedes Bundesland gehoert zu einem von 9 VKD-Landesverbaenden mit eigenen Zweigvereinen.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {BUNDESLAND_SLUGS.map((slug) => {
              const bl = BUNDESLAENDER[slug];
              const count = countByBL(slug);
              return (
                <Link
                  key={slug}
                  href={`/singles-regional/kochvereine/${slug}`}
                  className="group relative block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors"
                >
                  <div className="text-3xl mb-2">{bl.emoji}</div>
                  <div className="text-base font-bold text-foreground group-hover:text-brand-orange transition-colors leading-tight">
                    {bl.name}
                  </div>
                  <div className="text-xs text-foreground/50 mt-2">
                    {count > 0 ? `${count} Verein${count > 1 ? 'e' : ''}` : 'In Vorbereitung'}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Direkt zur Stadt
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Alle Kochvereine auf einen Blick, sortiert nach Stadt.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {published
              .slice()
              .sort((a, b) => (a.entry.stadt || '').localeCompare(b.entry.stadt || ''))
              .map((k) => (
                <Link
                  key={k.slug}
                  href={`/singles-regional/kochvereine/${k.entry.bundesland}/${k.entry.stadt}`}
                  className="block px-4 py-3 rounded-lg bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
                >
                  <div className="text-base font-bold text-foreground capitalize">
                    {(k.entry.stadt || '').replace(/-/g, ' ')}
                  </div>
                  <div className="text-xs text-foreground/50 mt-1">
                    {BUNDESLAENDER[k.entry.bundesland]?.name || k.entry.bundesland}
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Lieber direkt zum Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Gastro-Singles aus jedem Bundesland — auf Gastrosingles.de.
          </p>
          <HeartButton href="https://gastrosingles.de/?AID=GastrosinglesMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
