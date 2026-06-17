import { reader } from '@/lib/keystatic';
import ArticleView, { buildArticleMetadata } from '@/components/content/ArticleView';
import { JsonLd, eventJsonLd } from '@/components/seo/JsonLd';
import { HubBacklinkCard } from '@/components/content/HubBacklinkCard';
import { MesseStats } from '@/components/content/MesseStats';
import { messeStatsForSlug, hasMesseEvent, MESSE_DEHOGA_LAND } from '@/lib/messe-statistiken';
import { getArticleUrl } from '@/lib/routes';

const BASE_URL = 'https://gastrosingles.de/magazin';

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await reader.collections.articles.all();
  return articles
    .filter((a) => a.entry.category === 'messen')
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return buildArticleMetadata(slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = messeStatsForSlug(slug);
  const url = `${BASE_URL}/messen/${slug}`;

  // Event-Schema nur für die nächste terminierte Ausgabe (GESETZ: keine vergangenen/erfundenen Termine).
  const event = d && hasMesseEvent(d)
    ? eventJsonLd({
        name: `${d.name} ${d.stadt} ${d.jahr ?? ''}`.trim(),
        startDate: d.startDate,
        endDate: d.endDate,
        venue: d.venue,
        venueAdresse: d.venueAdresse,
        stadt: d.stadt,
        veranstalter: d.veranstalter,
        url,
        image: `${BASE_URL}/images/articles/${slug}/${slug}.webp`,
      })
    : null;

  const beforeBody = d ? (
    <>
      {event && <JsonLd data={event} />}
      <MesseStats d={d} />
    </>
  ) : undefined;

  // Unterfutter (GESETZ 14 bidirektional): Up-Link auf den passenden DEHOGA-Landesverband.
  const land = MESSE_DEHOGA_LAND[slug];
  const afterBody = land ? (
    <HubBacklinkCard
      heading={`DEHOGA ${land.name}: Tarif, Gehalt & Branchenverband`}
      text={`${d?.name ?? 'Diese Messe'} findet in ${d?.stadt ?? land.name} statt. Wer im Gastgewerbe in ${land.name} arbeitet, findet beim DEHOGA-Landesverband ${land.name} Tarif-Eckdaten, Median-Gehälter und die Branchen-Infos der Region.`}
      href={getArticleUrl(land.slug, 'berufsbilder')}
      cta={`DEHOGA ${land.name} ansehen →`}
    />
  ) : undefined;

  return (
    <ArticleView
      slug={slug}
      beforeBody={beforeBody}
      afterBody={afterBody}
      dateModified={hasMesseEvent(d) ? '2026-06-17' : undefined}
    />
  );
}
