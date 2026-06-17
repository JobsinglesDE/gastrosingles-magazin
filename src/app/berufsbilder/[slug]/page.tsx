import { reader } from '@/lib/keystatic';
import ArticleView, { buildArticleMetadata } from '@/components/content/ArticleView';
import { BundeslandStats } from '@/components/content/BundeslandStats';
import { TarifTable } from '@/components/content/TarifTable';
import { JsonLd, dehogaDatasetJsonLd, dehogaSalaryJsonLd, dehogaOrgNode } from '@/components/seo/JsonLd';
import { dehogaStatsForSlug, hasDehogaData, GASTRO_GEHALT_DE } from '@/lib/dehoga-statistiken';

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
    return (
      <ArticleView
        slug={slug}
        aboutEntity={orgNode}
        dateModified={dehoga.aktualisiert}
        beforeBody={
          <>
            {dataset && <JsonLd data={dataset} />}
            {salary && <JsonLd data={salary} />}
            <nav
              aria-label={`DEHOGA ${kurz} Themen`}
              className="not-prose my-6 flex flex-wrap gap-2 text-sm font-semibold"
            >
              <a href="#dehoga-zahlen" className="rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-brand-orange hover:bg-brand-orange hover:text-white transition-colors">Betriebszahlen</a>
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
