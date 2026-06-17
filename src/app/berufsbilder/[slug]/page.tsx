import { reader } from '@/lib/keystatic';
import ArticleView, { buildArticleMetadata } from '@/components/content/ArticleView';
import { BundeslandStats } from '@/components/content/BundeslandStats';
import { TarifTable } from '@/components/content/TarifTable';
import { JsonLd, dehogaDatasetJsonLd, dehogaSalaryJsonLd, dehogaOrgNode } from '@/components/seo/JsonLd';
import { dehogaStatsForSlug, hasDehogaData, GASTRO_GEHALT_DE, bundeslandSlugForDehoga, DEHOGA_SUBREGIONS, DEHOGA_PARENT } from '@/lib/dehoga-statistiken';
import { BUNDESLAENDER, bundeslandName } from '@/lib/bundeslaender';
import { KOCHKURS_CITIES, getKochkursUrl } from '@/lib/kochkurs-cities';
import { DehogaRegionalDownlinks } from '@/components/content/DehogaRegionalDownlinks';
import { HubBacklinkCard } from '@/components/content/HubBacklinkCard';
import { getArticleUrl } from '@/lib/routes';

const BASE_URL = 'https://gastrosingles.de/magazin';

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await reader.collections.articles.all();
  return articles
    .filter((a) => a.entry.category === 'berufsbilder' && a.slug !== 'dehoga')
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return buildArticleMetadata(slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // DEHOGA-Landesverband-Spokes: strukturierte GEO-Datenblöcke (Betriebszahlen + Tarif/Gehalt)
  // + Dataset/Salary-Schema. Daten aus dehoga-statistiken.ts (echte Fakten, Quelle+Stand).
  const dehoga = slug.startsWith('dehoga-') ? dehogaStatsForSlug(slug) : null;
  if (dehoga && hasDehogaData(dehoga)) {
    const url = `${BASE_URL}/berufsbilder/${slug}`;
    const dataset = dehogaDatasetJsonLd({ url, d: dehoga });
    const salary = dehogaSalaryJsonLd({ gehalt: dehoga.gehalt ?? GASTRO_GEHALT_DE });
    const orgNode = dehogaOrgNode({ d: dehoga, pageUrl: url });
    const kurz = dehoga.kurz ?? dehoga.name;

    const hasStats = Boolean(
      dehoga.beschaeftigte || dehoga.mitgliedsbetriebe || dehoga.umsatzMrd || dehoga.betriebe || dehoga.tarif?.einstiegStundenlohn,
    );

    // afterBody: 16 Bundesländer → Down-Links (Regionalverbände + Kochkurse/Kochvereine als Unterfutter);
    // Regionalverband-Spokes (dehoga-nordrhein/-westfalen) → Up-Link auf den Eltern-Landesverband.
    // Beides bidirektional (GESETZ 14).
    const blSlug = bundeslandSlugForDehoga(slug);
    let dehogaAfterBody: React.ReactNode = null;
    if (BUNDESLAENDER[blSlug]) {
      const blName = bundeslandName(blSlug);
      const kochkurse = Object.values(KOCHKURS_CITIES)
        .filter((c) => c.bundesland === blSlug)
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 6)
        .map((c) => ({ href: getKochkursUrl(c.slug), label: `Kochkurs ${c.name}` }));
      const allKv = await reader.collections.kochvereine.all();
      const kochvereine = allKv
        .filter((k) => k.entry.status === 'published' && k.entry.bundesland === blSlug)
        .slice(0, 6)
        .map((k) => {
          const ort = k.entry.title?.match(/^Kochverein\s+(.+?)\s*:/)?.[1]?.trim() || k.entry.stadt;
          return { href: `/singles-regional/kochvereine/${blSlug}/${k.entry.stadt}`, label: `Kochverein ${ort}` };
        });
      const verbaende = (DEHOGA_SUBREGIONS[blSlug] ?? []).map((r) => ({
        href: getArticleUrl(r.slug, 'berufsbilder'),
        label: r.name,
      }));
      dehogaAfterBody = (
        <DehogaRegionalDownlinks bundeslandName={blName} verbaende={verbaende} kochkurse={kochkurse} kochvereine={kochvereine} />
      );
    } else if (DEHOGA_PARENT[blSlug]) {
      const p = DEHOGA_PARENT[blSlug];
      dehogaAfterBody = (
        <HubBacklinkCard
          heading={`DEHOGA ${p.name}: der Landesverband im Überblick`}
          text={`${dehoga.name} ist ein Regionalverband im DEHOGA-Landesverband ${p.name}. Den kompletten Überblick — Betriebszahlen, Tarifvertrag und Median-Gehälter für ganz ${p.name} — gibt es auf der Landesverbands-Seite.`}
          href={getArticleUrl(p.slug, 'berufsbilder')}
          cta={`Zu DEHOGA ${p.name} →`}
        />
      );
    }

    return (
      <ArticleView
        slug={slug}
        aboutEntity={orgNode}
        dateModified={dehoga.aktualisiert}
        afterBody={dehogaAfterBody}
        beforeBody={
          <>
            {dataset && <JsonLd data={dataset} />}
            {salary && <JsonLd data={salary} />}
            <nav
              aria-label={`DEHOGA ${kurz} Themen`}
              className="not-prose my-6 flex flex-wrap gap-2 text-sm font-semibold"
            >
              {hasStats && <a href="#dehoga-zahlen" className="rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-brand-orange hover:bg-brand-orange hover:text-white transition-colors">Betriebszahlen</a>}
              <a href="#dehoga-tarif-gehalt" className="rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-brand-orange hover:bg-brand-orange hover:text-white transition-colors">Tarifvertrag &amp; Gehalt</a>
              <a href="#haeufige-fragen" className="rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-brand-orange hover:bg-brand-orange hover:text-white transition-colors">Häufige Fragen</a>
            </nav>
            <BundeslandStats d={dehoga} />
            <TarifTable d={dehoga} />
          </>
        }
      />
    );
  }

  return <ArticleView slug={slug} />;
}
