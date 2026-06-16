import type { MetadataRoute } from 'next';
import { reader } from '@/lib/keystatic';
import { getArticleUrl, getPersonHubUrl } from '@/lib/routes';
import { ALL_HUBS } from '@/lib/hubs';

const BASE = 'https://gastrosingles.de/magazin';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, regional, stories, kochvereine, kochkurse, persons] = await Promise.all([
    reader.collections.articles.all(),
    reader.collections.regional.all().catch(() => []),
    reader.collections.stories.all(),
    reader.collections.kochvereine.all(),
    reader.collections.kochkurse.all().catch(() => []),
    reader.collections.persons.all().catch(() => []),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/singles-partnersuche`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/singles-partnersuche/koeche`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/singles-partnersuche/service`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/singles-regional`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/singles-regional/kochvereine`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/singles-regional/kochkurse`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/erfolgsgeschichten`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/ueber-uns`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/kontakt`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/gastro-news`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/messen`, priority: 0.7, changeFrequency: 'monthly' },
    // Sektion- + Show-/Beruf-Hubs (zentral aus hubs.ts, je mit ❤️-Meta)
    ...ALL_HUBS.map((h) => ({
      url: `${BASE}/${h.slug}`,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    })),
  ];

  const articlePages: MetadataRoute.Sitemap = articles
    .filter((a) => a.entry.status === 'published')
    .map((a) => ({
      url: `${BASE}${getArticleUrl(a.slug, a.entry.category, { show: a.entry.show, position: a.entry.position })}`,
      priority: a.entry.isFeatured ? 0.9 : 0.7,
      changeFrequency: 'monthly' as const,
    }));

  const storyPages: MetadataRoute.Sitemap = stories.map((s) => ({
    url: `${BASE}/erfolgsgeschichten/${s.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  const regionalPages: MetadataRoute.Sitemap = (regional || []).map((r) => ({
    url: `${BASE}/regional/${r.entry.kanton}/${r.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }));

  // Kochvereine
  const vereinBundeslaender = [...new Set(kochvereine.map((a) => a.entry.bundesland))];
  const vereinBundeslandPages: MetadataRoute.Sitemap = vereinBundeslaender.map((b) => ({
    url: `${BASE}/singles-regional/kochvereine/${b}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));
  const vereinPages: MetadataRoute.Sitemap = kochvereine
    .filter((a) => a.entry.status === 'published')
    .map((a) => ({
      url: `${BASE}/singles-regional/kochvereine/${a.entry.bundesland}/${a.entry.stadt}`,
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    }));

  // Koch-Personen-Hubs
  const koechePages: MetadataRoute.Sitemap = (persons || [])
    .filter((p) => p.entry.status !== 'draft')
    .map((p) => ({
      url: `${BASE}${getPersonHubUrl(p.slug)}`,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    }));
  const koecheIndex: MetadataRoute.Sitemap = [
    { url: `${BASE}/koeche`, priority: 0.8, changeFrequency: 'weekly' as const },
  ];

  const all = [...staticPages, ...koecheIndex, ...koechePages, ...articlePages, ...storyPages, ...regionalPages, ...vereinBundeslandPages, ...vereinPages];
  // Dedupe nach URL (SINGLE_HUB taucht in staticPages + ALL_HUBS auf)
  const seen = new Set<string>();
  return all.filter((e) => (seen.has(e.url) ? false : (seen.add(e.url), true)));
}
