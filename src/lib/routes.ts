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
