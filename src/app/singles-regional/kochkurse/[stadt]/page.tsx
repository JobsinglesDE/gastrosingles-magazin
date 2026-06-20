import Link from 'next/link';
import { notFound } from 'next/navigation';
import { reader } from '@/lib/keystatic';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ClusterHero } from '@/components/content/ClusterHero';
import { TableOfContents } from '@/components/content/TableOfContents';
import { StickyTOC } from '@/components/content/StickyTOC';
import { ArticleByline } from '@/components/content/ArticleByline';
import { CalloutBox } from '@/components/ui/CalloutBox';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { HeartButton } from '@/components/ui/HeartButton';
import { AuthorBio } from '@/components/ui/AuthorBio';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, articleJsonLd, faqJsonLd, kochkursPlaceJsonLd } from '@/components/seo/JsonLd';
import { CityStats } from '@/components/staedte/CityStats';
import { CitySources } from '@/components/staedte/CitySources';
import { KOCHKURS_CITIES, getKochkursUrl } from '@/lib/kochkurs-cities';
import { DehogaHubUplink } from '@/components/content/DehogaHubUplink';
import { zensusFor } from '@/lib/kochkurs-zensus';
import { IconyActivityWidget } from '@/components/content/IconyActivityWidget';
import { plzForCity } from '@/lib/city-plz';

const BASE_URL = 'https://gastrosingles.de/magazin';
type Params = Promise<{ stadt: string }>;

function toId(text: string) {
  return text.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function collectText(n: any): string {
  if (typeof n === 'string') return n;
  if (n?.type === 'text') return n.attributes?.content ?? '';
  return (n?.children ?? []).map(collectText).join('');
}
function extractH2s(content: any): { label: string; id: string }[] {
  const node = 'node' in content ? content.node : content;
  const items: { label: string; id: string }[] = [];
  function walk(n: any) {
    if (n?.type === 'heading' && n?.attributes?.level === 2) {
      const text = collectText(n);
      if (text) items.push({ label: text, id: toId(text) });
    }
    (n?.children ?? []).forEach(walk);
  }
  walk(node);
  return items;
}

export async function generateStaticParams() {
  const all = await reader.collections.kochkurse.all();
  return all
    .filter((a) => a.entry.status === 'published')
    .map((a) => ({ stadt: a.entry.stadt }));
}

async function findEntry(stadt: string) {
  const all = await reader.collections.kochkurse.all();
  const found = all.find((a) => a.entry.status === 'published' && a.entry.stadt === stadt);
  if (!found) return null;
  const full = await reader.collections.kochkurse.read(found.slug, { resolveLinkedFiles: true });
  return full ? { slug: found.slug, entry: full } : null;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { stadt } = await params;
  const entry = await findEntry(stadt);
  if (!entry) return {};
  const e = entry.entry;
  const url = `${BASE_URL}${getKochkursUrl(stadt)}`;
  const title = e.seoTitle || e.title;
  const description = e.seoDescription || e.excerpt;
  const image = e.featuredImage ? `${BASE_URL}${e.featuredImage}` : `${BASE_URL}/logos/jobsingles-logo.webp`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, type: 'article',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      siteName: 'Gastrosingles Magazin', locale: 'de_DE',
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function KochkursStadtPage({ params }: { params: Params }) {
  const { stadt } = await params;
  const city = KOCHKURS_CITIES[stadt];
  const entry = await findEntry(stadt);
  if (!entry) notFound();

  const e = entry.entry;
  const cityName = city?.name || stadt;
  const url = `${BASE_URL}${getKochkursUrl(stadt)}`;
  const tocItems = extractH2s(e.content);
  const lat = e.lat ? parseFloat(e.lat) : city?.lat;
  const lng = e.lng ? parseFloat(e.lng) : city?.lng;

  const author = await reader.collections.authors.read('tommy-honold');
  const zensus = zensusFor(stadt);
  const anbieter = (e.anbieter || []).filter((a) => a.name);

  // Nachbarstädte aus KOCHKURS_CITIES.neighbors, nur veröffentlichte Spokes
  const allKurse = await reader.collections.kochkurse.all();
  const publishedSlugs = new Set(
    allKurse.filter((k) => k.entry.status === 'published').map((k) => k.entry.stadt)
  );
  const neighborSlugs = (city?.neighbors || []).filter((n) => publishedSlugs.has(n)).slice(0, 6);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: e.title,
          description: e.excerpt,
          url,
          image: e.featuredImage ? `${BASE_URL}${e.featuredImage}` : undefined,
          datePublished: e.publishedAt || undefined,
          dateModified: e.publishedAt || undefined,
          authorName: author?.name,
        })}
      />
      {e.faqItems && e.faqItems.length > 0 && <JsonLd data={faqJsonLd(e.faqItems)} />}
      {/* BreadcrumbList wird von der <Breadcrumbs>-Komponente emittiert (inkl. Magazin-Root) — kein doppelter Block hier. */}
      <JsonLd
        data={kochkursPlaceJsonLd({
          stadt: cityName,
          bundesland: city?.bundeslandName || '',
          lat,
          lng,
          url,
        })}
      />

      <ClusterHero
        title={e.title}
        excerpt={e.excerpt}
        category="Kochkurs für Singles"
        image={e.featuredImage || undefined}
        imageAlt={e.featuredImageAlt || undefined}
        imageCredit={e.featuredImageCredit || undefined}
        date={e.publishedAt || undefined}
      />

      <StickyTOC items={tocItems} />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Kochkurse für Singles', href: '/singles-regional/kochkurse' },
          { label: cityName, href: getKochkursUrl(stadt) },
        ]} />

        <ArticleByline publishedAt={e.publishedAt || undefined} />

        <TableOfContents items={tocItems} />

        {e.calloutQuestion && (
          <CalloutBox question={e.calloutQuestion}>{e.calloutAnswer}</CalloutBox>
        )}

        {/* ICONY Aktivitäts-Widget — oberes Drittel, stadt-spezifische PLZ (kein City-Mismatch) */}
        <IconyActivityWidget plz={plzForCity(stadt)} stadtName={cityName} />

        {zensus && <CityStats name={cityName} e={zensus} />}

        <ArticleBody
          content={e.content}
          insertAfterH2={2}
          insertElement={
            <AnimatedGradientBorder borderRadius={12} borderWidth={2} className="my-8">
              <div className="p-6 text-center">
                <p className="text-sm text-foreground/70 mb-3">Du kochst gern und suchst jemanden, der den Geschmack teilt?</p>
                <HeartButton href={`https://gastrosingles.de/registration/?AID=GastrosinglesMagazin`}>
                  Jetzt kostenfrei anmelden
                </HeartButton>
              </div>
            </AnimatedGradientBorder>
          }
        />

        {/* CTA Stopper nach Content */}
        <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-12">
          <div className="py-10 px-6 bg-surface-dark text-white text-center">
            <p className="text-lg font-bold mb-2">Genug gelesen?</p>
            <p className="text-white/60 text-sm mb-5">Finde kochbegeisterte Singles in {cityName}.</p>
            <HeartButton href={`https://gastrosingles.de/registration/?AID=GastrosinglesMagazin`}>
              Jetzt kostenfrei mitmachen
            </HeartButton>
          </div>
        </AnimatedGradientBorder>

        {e.takeaways && e.takeaways.length > 0 && <TakeawayBox items={e.takeaways} />}

        {anbieter.length > 0 && (
          <section className="mt-16">
            <h2 id="kochkurs-anbieter" className="text-2xl font-bold mb-2 scroll-mt-24">
              Kochkurs-Anbieter in {cityName}
            </h2>
            <p className="text-foreground/60 text-sm mb-5">
              Echte Anbieter mit Single- oder Gruppen-Kochkursen. Externe Links — wir betreiben keine eigenen Kurse.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {anbieter.map((a) => (
                <div key={a.name} className="p-4 rounded-lg bg-surface border border-foreground/10">
                  <div className="text-base font-bold text-foreground">
                    {a.url ? (
                      <a href={a.url} target="_blank" rel="nofollow noopener noreferrer" className="hover:text-brand-orange hover:underline">
                        {a.name}
                      </a>
                    ) : (
                      a.name
                    )}
                  </div>
                  {a.note && <p className="text-sm text-foreground/60 mt-1 leading-relaxed">{a.note}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {e.faqItems && e.faqItems.length > 0 && (
          <>
            <h2 id="haeufige-fragen" className="text-2xl font-bold mt-16 mb-2 scroll-mt-24">Häufige Fragen</h2>
            <FAQAccordion items={e.faqItems} />
          </>
        )}

        {(zensus || anbieter.length > 0) && (
          <CitySources e={zensus || {}} stadtName={cityName} anbieter={anbieter.map((a) => ({ name: a.name, url: a.url }))} />
        )}

        {author && (
          <AuthorBio
            name={author.name}
            slug="tommy-honold"
            role={author.role}
            bio={author.bio}
            avatar={author.avatar || undefined}
            socialLinks={author.socialLinks}
          />
        )}

        {/* Übersicht-/Pillar-Rücklink IMMER (auch ohne Nachbarn) — Pflicht: jeder Cluster-Spoke verlinkt auf die Pillar */}
        <section className="mt-16">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
              Mehr Kochkurse für Singles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {neighborSlugs.map((n) => {
                const nc = KOCHKURS_CITIES[n];
                return (
                  <Link
                    key={n}
                    href={getKochkursUrl(n)}
                    className="block p-4 rounded-lg bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
                  >
                    <div className="text-xs uppercase text-foreground/50 mb-1">Nachbarstadt</div>
                    <div className="text-base font-bold text-foreground">Kochkurs für Singles {nc?.name || n}</div>
                  </Link>
                );
              })}
              <Link
                href="/singles-regional/kochkurse"
                className="block p-4 rounded-lg bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
              >
                <div className="text-xs uppercase text-foreground/50 mb-1">Übersicht</div>
                <div className="text-base font-bold text-foreground">Alle Städte: Kochkurs für Singles</div>
              </Link>
            </div>
          </section>

        {city?.bundesland && (
          <DehogaHubUplink bundeslandSlug={city.bundesland} bundeslandName={city.bundeslandName} />
        )}
      </div>

      {/* Bottom CTA */}
      <section className="text-center py-16 px-6">
        <HeartButton href={`https://gastrosingles.de/registration/?AID=GastrosinglesMagazin`}>
          Jetzt kostenfrei mitmachen
        </HeartButton>
      </section>
    </>
  );
}
