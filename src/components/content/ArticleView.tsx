import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { getArticleUrl } from '@/lib/routes';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ClusterHero } from '@/components/content/ClusterHero';
import { TableOfContents } from '@/components/content/TableOfContents';
import { PillarBacklinkCard } from '@/components/content/PillarBacklinkCard';
import { ChefBacklinkCard } from '@/components/content/ChefBacklinkCard';
import { HubBacklinkCard } from '@/components/content/HubBacklinkCard';
import { BerufIntentNav } from '@/components/content/BerufIntentNav';
import { CalloutBox } from '@/components/ui/CalloutBox';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { HeartButton } from '@/components/ui/HeartButton';
import { AuthorBio } from '@/components/ui/AuthorBio';
import { CarouselCards } from '@/components/ui/CarouselCards';
import { MatchQuiz } from '@/components/ui/MatchQuiz';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { StickyTOC } from '@/components/content/StickyTOC';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArticleByline } from '@/components/content/ArticleByline';
import { JsonLd, articleJsonLd, faqJsonLd, videoJsonLd, extractYoutubeEmbed } from '@/components/seo/JsonLd';
import { SECTION_HUBS, SINGLE_HUB } from '@/lib/hubs';

const BASE_URL = 'https://gastrosingles.de/magazin';

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

// Sektion → Breadcrumb-Label + Hub-Href
function sectionCrumb(category: string): { label: string; href: string } {
  if (category === 'tv-koch-shows') return { label: SECTION_HUBS['tv-koch-shows'].title.split(' ❤️')[0], href: '/tv-koch-shows' };
  if (category === 'berufsbilder') return { label: 'Berufsbilder', href: '/berufsbilder' };
  if (category === 'messen') return { label: 'Messen', href: '/messen' };
  return { label: 'Singles & Partnersuche', href: `/${SINGLE_HUB.slug}` };
}

export async function buildArticleMetadata(slug: string) {
  const article = await reader.collections.articles.read(slug);
  if (!article) return {};

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const url = `${BASE_URL}${getArticleUrl(slug, article.category, { show: article.show, position: article.position })}`;
  const image = article.featuredImage
    ? `${BASE_URL}${article.featuredImage}`
    : `${BASE_URL}/logos/jobsingles-logo.webp`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [{ url: image, width: 1256, height: 710, alt: title }],
      siteName: 'Gastrosingles Magazin',
      locale: 'de_DE',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function ArticleView({
  slug,
  afterBody,
  beforeBody,
  aboutEntity,
  dateModified,
}: {
  slug: string;
  afterBody?: React.ReactNode;
  beforeBody?: React.ReactNode;
  aboutEntity?: Record<string, unknown>;
  dateModified?: string;
}) {
  const article = await reader.collections.articles.read(slug, { resolveLinkedFiles: true });
  if (!article) notFound();

  const author = article.author
    ? await reader.collections.authors.read(article.author)
    : null;

  const allArticles = await reader.collections.articles.all();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== slug && a.entry.category === article.category && a.entry.type === 'cluster')
    .slice(0, 6)
    .map((a) => ({
      title: a.entry.title,
      excerpt: a.entry.excerpt,
      href: getArticleUrl(a.slug, a.entry.category, { show: a.entry.show, position: a.entry.position }),
      image: a.entry.featuredImage || undefined,
      category: a.entry.category,
    }));

  const canonicalPath = getArticleUrl(slug, article.category, { show: article.show, position: article.position });
  const crumb = sectionCrumb(article.category);
  const ytEmbed = extractYoutubeEmbed(article.content);
  // Mid-Text-CTA: dynamisch in die echte Textmitte (nach dem mittleren H2) statt fix nach H2 #2.
  const midH2 = Math.max(1, Math.round(extractH2s(article.content).length / 2));

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url: `${BASE_URL}${canonicalPath}`,
          image: article.featuredImage ? `${BASE_URL}${article.featuredImage}` : undefined,
          datePublished: article.publishedAt || undefined,
          dateModified: dateModified || undefined,
          authorName: author?.name,
          authorUrl: author?.socialLinks?.find((l) => l.platform === 'Website')?.url ?? undefined,
          isNews: article.isNews === true,
          about: aboutEntity,
        })}
      />
      {article.faqItems && article.faqItems.length > 0 && (
        <JsonLd data={faqJsonLd(article.faqItems)} />
      )}
      {ytEmbed && (
        <JsonLd data={videoJsonLd({ name: article.title, description: article.excerpt, videoId: ytEmbed.videoId, uploadDate: article.publishedAt || undefined })} />
      )}

      <ClusterHero
        title={article.title}
        excerpt={article.excerpt}
        category={article.category}
        image={article.featuredImage || undefined}
        imageAlt={article.featuredImageAlt || undefined}
        imageCredit={article.featuredImageCredit || undefined}
        date={article.publishedAt || undefined}
      />

      <StickyTOC items={extractH2s(article.content)} />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: crumb.label, href: crumb.href },
          { label: article.title, href: canonicalPath },
        ]} />

        {article.category === 'berufsbilder' && !slug.startsWith('dehoga') && (
          <BerufIntentNav
            beruf={article.type === 'berufsbild' ? slug : article.position || ''}
            activeSlug={slug}
            availableSlugs={allArticles
              .filter((a) => a.entry.category === 'berufsbilder' && a.entry.status === 'published')
              .map((a) => a.slug)}
          />
        )}

        <ArticleByline publishedAt={article.publishedAt || undefined} />

        <TableOfContents items={extractH2s(article.content)} />

        {article.calloutQuestion && (
          <CalloutBox question={article.calloutQuestion}>
            {article.calloutAnswer}
          </CalloutBox>
        )}

        {beforeBody}

        <ArticleBody
          content={article.content}
          insertAfterH2={midH2}
          insertElement={
            <AnimatedGradientBorder borderRadius={12} borderWidth={2} className="my-8">
              <div className="p-6 text-center">
                <p className="text-sm text-foreground/70 mb-3">Du suchst Singles aus der Gastronomie?</p>
                <HeartButton href="https://gastrosingles.de/registration/?AID=GastrosinglesMagazin">
                  Jetzt kostenfrei anmelden
                </HeartButton>
              </div>
            </AnimatedGradientBorder>
          }
        />

        {afterBody}

        {/* CTA Stopper nach Content */}
        <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-12">
          <div className="py-10 px-6 bg-surface-dark text-white text-center">
            <p className="text-lg font-bold mb-2">Genug gelesen?</p>
            <p className="text-white/60 text-sm mb-5">Finde Singles, die deinen Alltag verstehen.</p>
            <HeartButton href="https://gastrosingles.de/registration/?AID=GastrosinglesMagazin">
              Jetzt kostenfrei mitmachen
            </HeartButton>
          </div>
        </AnimatedGradientBorder>

        {article.takeaways && article.takeaways.length > 0 && (
          <TakeawayBox items={article.takeaways} />
        )}

        {/* Mini Quiz */}
        <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-12">
          <div className="py-8 px-6">
            <p className="text-center text-sm font-bold text-foreground/50 uppercase tracking-widest mb-4">Finde deinen Match-Typ</p>
            <MatchQuiz />
          </div>
        </AnimatedGradientBorder>

        {article.faqItems && article.faqItems.length > 0 && (
          <>
            <h2 id="haeufige-fragen" className="text-2xl font-bold mt-16 mb-2 scroll-mt-24">Häufige Fragen</h2>
            <FAQAccordion items={article.faqItems} />
          </>
        )}

        {/* Author Bio */}
        {author && (
          <AuthorBio
            name={author.name}
            slug={article.author || undefined}
            role={author.role}
            bio={author.bio}
            avatar={author.avatar || undefined}
            socialLinks={author.socialLinks}
          />
        )}

        {/* Pillar Backlink — NUR Partnersuche-Cluster → koeche/service-Guide */}
        {article.category === 'partnersuche' &&
          article.specialization &&
          ['kueche', 'service', 'bar', 'hotel', 'management'].includes(article.specialization) && (
            <PillarBacklinkCard specialization={article.specialization || undefined} />
          )}

        {/* DEHOGA-Cluster → DEHOGA-Pillar; DEHOGA-Pillar → Berufsbilder-Übersicht */}
        {article.category === 'berufsbilder' && slug.startsWith('dehoga') && (
          <HubBacklinkCard
            {...(slug === 'dehoga'
              ? {
                  heading: 'Alle Berufsbilder der Gastronomie',
                  text: 'Koch, Sommelier, Hotelfach & Co.: 18 Gastro-Berufe mit Aufgaben, Gehalt und Karrierewegen im Überblick.',
                  href: '/berufsbilder',
                  cta: 'Zur Berufsbilder-Übersicht →',
                }
              : {
                  heading: 'DEHOGA: Der Branchenverband im Überblick',
                  text: 'Bundesverband, Tarifverträge, Ausbildung und alle 16 Landesverbände — der komplette DEHOGA-Guide.',
                  href: '/berufsbilder/dehoga',
                  cta: 'Zum DEHOGA-Überblick →',
                })}
          />
        )}

        {/* Berufsbilder: Spokes → Beruf-Hub, Beruf-Hubs → Übersicht */}
        {article.category === 'berufsbilder' && !slug.startsWith('dehoga') && (
          <HubBacklinkCard
            {...(article.type !== 'berufsbild' && article.position && allArticles.some((a) => a.slug === article.position)
              ? {
                  heading: allArticles.find((a) => a.slug === article.position)!.entry.title,
                  text:
                    allArticles.find((a) => a.slug === article.position)!.entry.excerpt ||
                    'Das komplette Berufsbild mit Aufgaben, Gehalt und Karrierewegen.',
                  href: `/berufsbilder/${article.position}`,
                  cta: 'Zum kompletten Berufsbild →',
                }
              : {
                  heading: 'Alle Berufsbilder der Gastronomie',
                  text: 'Koch, Sommelier, Hotelfach & Co.: 18 Gastro-Berufe mit Aufgaben, Gehalt und Karrierewegen im Überblick.',
                  href: '/berufsbilder',
                  cta: 'Zur Berufsbilder-Übersicht →',
                })}
          />
        )}

        {/* Koch-Hub Backlink (Spoke → Hub) */}
        {article.person && <ChefBacklinkCard personSlug={article.person} />}
      </div>

      {/* Related Articles Carousel */}
      {relatedArticles.length > 0 && (
        <CarouselCards title="Weitere Artikel" items={relatedArticles} />
      )}

      {/* Bottom CTA */}
      <section className="text-center py-16 px-6">
        <HeartButton href="https://gastrosingles.de/registration/?AID=GastrosinglesMagazin">
          Jetzt kostenfrei mitmachen
        </HeartButton>
      </section>
    </>
  );
}
