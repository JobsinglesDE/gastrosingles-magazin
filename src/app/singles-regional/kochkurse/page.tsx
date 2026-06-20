import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';
import { KochkurseNearby, type NearbyCity } from '@/components/content/KochkurseNearby';
import { KOCHKURS_CITIES, getKochkursUrl } from '@/lib/kochkurs-cities';

const PILLAR_URL = 'https://gastrosingles.de/magazin/singles-regional/kochkurse';

export const metadata = {
  title: 'Kochkurs für Singles: gemeinsam kochen, leichter verlieben',
  description: 'Single-Kochkurs statt Bar-Smalltalk: Wo gemeinsames Kochen Singles in deiner Stadt verbindet — Berlin, Hamburg, München, Köln und mehr. Ehrlicher Guide, kein Fake-Kurs.',
  alternates: { canonical: PILLAR_URL },
  openGraph: {
    title: 'Kochkurs für Singles — gemeinsam kochen, leichter verlieben',
    description: 'Warum gemeinsames Kochen das ehrlichste erste Date ist — plus Kochkurs-für-Singles-Guides für über 20 Großstädte.',
    url: PILLAR_URL,
    type: 'website',
    siteName: 'Gastrosingles Magazin',
    locale: 'de_DE',
  },
};

const KOCHKURS_COLORS = [
  { r: 255, g: 122, b: 0 },
  { r: 47, g: 181, b: 184 },
  { r: 66, g: 154, b: 69 },
];

export default async function KochkursePillar() {
  const all = await reader.collections.kochkurse.all();
  const published = all.filter((a) => a.entry.status === 'published');
  const publishedSlugs = new Set(published.map((a) => a.entry.stadt));

  // Nearby-Widget + Grid: nur veröffentlichte Städte, mit Geo-Daten aus KOCHKURS_CITIES
  const cities: NearbyCity[] = Object.values(KOCHKURS_CITIES)
    .filter((c) => publishedSlugs.has(c.slug))
    .map((c) => ({ slug: c.slug, name: c.name, bundeslandName: c.bundeslandName, lat: c.lat, lng: c.lng }));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Kochkurs für Singles — Singles Regional',
          description: 'Kochkurs-für-Singles-Guides für Deutschlands Großstädte: warum gemeinsames Kochen verbindet und wo Singles sich treffen.',
          url: PILLAR_URL,
          items: cities.map((c) => ({ name: `Kochkurs für Singles ${c.name}`, url: `${PILLAR_URL}/${c.slug}` })),
        })}
      />

      <PillarHero
        title="Kochkurs für Singles"
        texts={[
          'Gemeinsam kochen',
          'Single-Kochkurs statt Smalltalk',
          'Kochen für Singles',
          'Date am Herd',
          'Kochkurs für Singles',
        ]}
        subtitle="Warum gemeinsames Kochen das ehrlichste erste Date ist — und wo Singles in deiner Stadt am Herd zusammenfinden."
        colors={KOCHKURS_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Kochkurse für Singles', href: '/singles-regional/kochkurse' },
        ]} />
      </div>

      {/* Funnel-Pitch */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Ein Kochkurs für Singles nimmt dem Kennenlernen das Verkrampfte. Statt euch über einen Tisch hinweg auszufragen, schnippelt ihr nebeneinander, lacht über zu viel Knoblauch und teilt am Ende einen Teller, den ihr selbst gemacht habt. Niemand muss Smalltalk erfinden – das Rezept gibt den Takt vor.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Genau deshalb funktioniert gemeinsames Kochen als Date so gut: Man sieht, wie jemand mit Stress, Fehlern und Teamarbeit umgeht, lange bevor es romantisch wird. Wir zeigen dir Stadt für Stadt, wo die Single-Kochkurse laufen, welche Szene dahintersteckt und wie du den Schritt vom Herd zum echten Treffen gehst.
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

      {/* In der Nähe — targetet "kochkurs in der nähe" (5.400/mo) + Client-Geo-Widget */}
      <ScrollReveal>
        {cities.length > 0 ? (
          <KochkurseNearby cities={cities} />
        ) : (
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">Kochkurse für Singles in deiner Nähe</h2>
            <p className="text-foreground/70">Die Stadt-Guides sind in Vorbereitung.</p>
          </section>
        )}
      </ScrollReveal>

      {/* Warum-Abschnitt: single kochkurs / kochen für singles */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Warum ein Single-Kochkurs besser funktioniert als ein Date in der Bar
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Beim Kochen für Singles geht es nie nur ums Essen. Eine gemeinsame Aufgabe senkt die Hemmschwelle: Ihr habt sofort ein Thema, eine Rolle und ein Ziel. Wer schneidet, wer würzt, wer probiert – kleine Entscheidungen, die mehr über einen Menschen verraten als jede Vorstellungsrunde.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Ein Kochkurs für Singles ist außerdem zeitlich begrenzt und klar strukturiert. Kein endloser Abend mit Erwartungsdruck, sondern zwei, drei Stunden mit gemeinsamem Resultat. Läuft der Funke über, ergibt sich das nächste Treffen fast von selbst – beim gemeinsamen Kochen zu Hause.
          </p>
        </section>
      </ScrollReveal>

      {/* Quellennachweise (Cluster-Ebene) — E-E-A-T + AI-Citability. Extern = nofollow (GESETZ). */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-10">
          <div className="rounded-2xl border border-foreground/10 bg-surface/50 p-5 text-sm text-foreground/70">
            <h2 className="text-base font-bold text-foreground mb-2">Quellen &amp; Methodik</h2>
            <ul className="space-y-1.5 leading-relaxed">
              <li>
                <strong className="text-foreground/80">Demografie der Städte:</strong> Zensus 2022, Statistisches Bundesamt
                (Destatis) und Statistische Landesämter, Stichtag 15.05.2022 — Einwohner, Familienstand und Geschlecht je
                kreisfreier Stadt.{' '}
                <a href="https://www.zensus2022.de/" rel="nofollow noopener" target="_blank" className="underline hover:text-brand-orange">
                  zensus2022.de
                </a>
              </li>
              <li>
                <strong className="text-foreground/80">Gastrosingles Singles-Index:</strong> gewichteter Score aus Ledigen-Quote,
                Geschlechter-Balance und Altersstruktur — deterministisch aus den amtlichen Daten berechnet, keine Schätzung
                einzelner Profile.
              </li>
              <li>
                <strong className="text-foreground/80">Kochkurs-Anbieter:</strong> recherchierte, real existierende Kochschulen
                und Buchungsplattformen je Stadt; externe Links ohne Gewähr (kein Affiliate, nofollow). Gastrosingles ist kein
                Kochkurs-Veranstalter, sondern eine Dating-Plattform für die Gastro-Branche.
              </li>
              <li className="text-foreground/50 text-xs">
                Angaben ohne Gewähr. Kurstermine und -preise ändern sich; maßgeblich ist die jeweilige Anbieter-Seite. Stand der
                Recherche: Juni 2026.
              </li>
            </ul>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Lieber direkt zum Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Kochbegeisterte Singles aus ganz Deutschland — auf Gastrosingles.de.
          </p>
          <HeartButton href="https://gastrosingles.de/?AID=GastrosinglesMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
