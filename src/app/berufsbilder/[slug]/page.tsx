import { reader } from '@/lib/keystatic';
import ArticleView, { buildArticleMetadata } from '@/components/content/ArticleView';
import { BundeslandStats } from '@/components/content/BundeslandStats';
import { TarifTable } from '@/components/content/TarifTable';
import { JsonLd, dehogaDatasetJsonLd, dehogaSalaryJsonLd } from '@/components/seo/JsonLd';
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
    return (
      <ArticleView
        slug={slug}
        afterBody={
          <>
            {dataset && <JsonLd data={dataset} />}
            {salary && <JsonLd data={salary} />}
            <BundeslandStats d={dehoga} />
            <TarifTable d={dehoga} />
          </>
        }
      />
    );
  }

  return <ArticleView slug={slug} />;
}
