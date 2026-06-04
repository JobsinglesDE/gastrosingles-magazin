import { SHOW_HUBS } from './hubs';

/**
 * Kanonische Artikel-URL aus der Sektion (category).
 * - tv-koch-shows + show → /tv-koch-shows/{show}/{slug}
 * - tv-koch-shows ohne show → /tv-koch-shows/{slug}
 * - berufsbilder → /berufsbilder/{slug}
 * - partnersuche (Default) → /singles-partnersuche/{slug}
 */
export function getArticleUrl(
  slug: string,
  category: string,
  opts?: { show?: string; position?: string },
): string {
  switch (category) {
    case 'tv-koch-shows': {
      const show = opts?.show && SHOW_HUBS[opts.show] ? opts.show : '';
      return show ? `/tv-koch-shows/${show}/${slug}` : `/tv-koch-shows/${slug}`;
    }
    case 'berufsbilder':
      return `/berufsbilder/${slug}`;
    case 'partnersuche':
    default:
      return `/singles-partnersuche/${slug}`;
  }
}

/** Bequemer Helfer: URL aus einem Keystatic-Collection-Item ({slug, entry}). */
export function articleHref(item: {
  slug: string;
  entry: { category: string; show?: string; position?: string };
}): string {
  return getArticleUrl(item.slug, item.entry.category, {
    show: item.entry.show,
    position: item.entry.position,
  });
}
