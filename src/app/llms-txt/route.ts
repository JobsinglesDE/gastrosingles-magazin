import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';

const BASE = 'https://gastrosingles.de/magazin';

export async function GET() {
  const [articles, regional, series, stories] = await Promise.all([
    reader.collections.articles.all(),
    reader.collections.regional.all(),
    reader.collections.series.all(),
    reader.collections.stories.all(),
  ]);

  const published = {
    articles: articles.filter((a) => a.entry.status !== 'draft'),
    regional,
    series: series.filter((s) => s.entry.status !== 'draft'),
    stories,
  };

  const lines: string[] = [];

  lines.push('# Gastrosingles Magazin — gastrosingles.de');
  lines.push('');
  lines.push('Dating-Magazin für Singles in der Gastronomie: Köche, Sommeliers, Wirte und Servicekräfte.');
  lines.push('Partnersuche-Tipps, Cluster-Guides für jeden Gastro-Bereich, Erfolgsgeschichten und Regional-Pages');
  lines.push("plus regionale Kochvereine und Branchen-Treffs.");
  lines.push('');
  lines.push('## Sitemaps');
  lines.push('');
  lines.push(`- [XML Sitemap](${BASE}/sitemap.xml): Alle öffentlichen URLs`);
  lines.push(`- [News Sitemap](${BASE}/news-sitemap.xml): Aktuelle Artikel (letzte 48h)`);
  lines.push('');

  lines.push('## Partnersuche & Dating');
  lines.push('');
  for (const a of published.articles) {
    const url = `${BASE}${getArticleUrl(a.slug, a.entry.type, a.entry.series)}`;
    const desc = a.entry.excerpt || a.entry.seoDescription || '';
    lines.push(`- [${a.entry.title}](${url})${desc ? ` - ${desc}` : ''}`);
  }
  lines.push('');


  lines.push('## Regionale Guides');
  lines.push('');
  for (const r of published.regional) {
    const kanton = r.entry.kanton.toLowerCase().replace(/\s+/g, '-');
    const url = `${BASE}/regional/${kanton}/${r.slug}`;
    const desc = r.entry.excerpt || r.entry.seoDescription || '';
    lines.push(`- [${r.entry.title}](${url})${desc ? ` - ${desc}` : ''}`);
  }
  lines.push('');

  lines.push('## Erfolgsgeschichten');
  lines.push('');
  for (const s of published.stories) {
    const url = `${BASE}/erfolgsgeschichten/${s.slug}`;
    const desc = s.entry.excerpt || s.entry.seoDescription || '';
    lines.push(`- [${s.entry.title}](${url})${desc ? ` - ${desc}` : ''}`);
  }
  lines.push('');

  lines.push('## Kontakt');
  lines.push('');
  lines.push('- Website: https://gastrosingles.de');
  lines.push('- Magazin: https://gastrosingles.de/magazin');
  lines.push('- Netzwerk: JobSingles.de — Dating für Berufe');
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
