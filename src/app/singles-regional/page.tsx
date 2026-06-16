import { reader } from '@/lib/keystatic';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';

const BASE_URL = 'https://gastrosingles.de/magazin';

export const metadata = {
  title: 'Singles Regional: Kochvereine & Kochkurse für Singles',
  description: 'Regionale Gastronomie-Netzwerke und Kochkurse für Singles: VKD-Zweigvereine nach Bundesland plus Kochkurs-Guides für über 20 Großstädte.',
  alternates: { canonical: `${BASE_URL}/singles-regional` },
  openGraph: {
    title: 'Singles Regional — Gastronomie-Netzwerke',
    description: 'VKD-Kochvereine, Landesverbände, Branchen-Treffs nach Bundesland.',
    url: `${BASE_URL}/singles-regional`,
    type: 'website',
    siteName: 'Gastrosingles Magazin',
    locale: 'de_DE',
  },
};

export default async function SinglesRegionalHub() {
  const kochvereine = await reader.collections.kochvereine.all();
  const published = kochvereine.filter((k) => k.entry.status === 'published');
  const byBundesland = published.reduce<Record<string, number>>((acc, k) => {
    const bl = k.entry.bundesland;
    acc[bl] = (acc[bl] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Singles Regional — Gastronomie-Netzwerke',
          description: 'VKD-Kochvereine, Landesverbände der Köche und Branchen-Treffs nach Bundesland.',
          url: `${BASE_URL}/singles-regional`,
          items: [
            { name: 'Kochvereine', url: `${BASE_URL}/singles-regional/kochvereine` },
            { name: 'Kochkurse für Singles', url: `${BASE_URL}/singles-regional/kochkurse` },
          ],
        })}
      />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Breadcrumbs items={[{ label: 'Singles Regional', href: '/singles-regional' }]} />

        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">Singles Regional</h1>
        <p className="text-lg text-foreground/75 leading-relaxed max-w-3xl mb-12">
          Gastronomie-Netzwerke in deiner Nähe. Köche, Sommeliers, Wirte und Service-Profis
          treffen sich in regional verankerten Vereinen des VKD (Verband der Köche Deutschlands).
          Wer dort wach hingeht statt nur fachlich zu netzwerken, lernt Menschen kennen, die den
          eigenen Berufsrhythmus verstehen ohne Erklärung.
        </p>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">Kochvereine — VKD-Zweigvereine</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed max-w-3xl">
            115 Zweigvereine in 9 Landesverbänden, rund 6.100 Mitglieder bundesweit. Pro Verein
            findest du Sitz, Vorstand, Mitgliederzahl, Aktivitäten und konkrete Anknüpfungspunkte
            für den Einstieg in die Branche.
          </p>
          <Link
            href="/singles-regional/kochvereine"
            className="inline-block px-6 py-3 rounded-lg bg-brand-orange text-white font-semibold hover:bg-brand-orange/90 transition"
          >
            Zu den Kochvereinen
          </Link>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">Kochkurs für Singles — Stadt für Stadt</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed max-w-3xl">
            Gemeinsam kochen ist das ehrlichste erste Date. In über 20 Städten zeigen wir, wo Singles
            am Herd zusammenfinden, welche Anbieter es gibt und wie aus dem Kochkurs ein echtes Treffen
            wird — von Berlin über München bis Köln.
          </p>
          <Link
            href="/singles-regional/kochkurse"
            className="inline-block px-6 py-3 rounded-lg bg-brand-orange text-white font-semibold hover:bg-brand-orange/90 transition"
          >
            Zu den Kochkursen für Singles
          </Link>
        </section>

        {Object.keys(byBundesland).length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">Direkt zum Bundesland</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Object.entries(byBundesland)
                .sort((a, b) => b[1] - a[1])
                .map(([bl, count]) => (
                  <Link
                    key={bl}
                    href={`/singles-regional/kochvereine/${bl}`}
                    className="block px-4 py-3 rounded-lg bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
                  >
                    <div className="text-base font-bold capitalize">{bl.replace(/-/g, ' ')}</div>
                    <div className="text-xs text-foreground/50 mt-1">{count} Verein{count > 1 ? 'e' : ''}</div>
                  </Link>
                ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
