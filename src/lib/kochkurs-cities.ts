/**
 * Launch-Set für den "Kochkurs für Singles"-Cluster (dfs-validiert nach
 * "kochkurs {stadt}"-Volumen). Slug = ASCII (heutige Umlaut-Regression-Lehre:
 * NIE Umlaute in Slugs/Pfaden/hrefs — nur in name/Text).
 *
 * neighbors[] = geografisch nahe Städte aus demselben Set für Cross-Links
 * (Pillar↔Spoke + Nachbarn), lat/lng für Place-Geo-Schema + KochkurseNearby-Widget.
 */
export interface KochkursCity {
  /** ASCII-Slug, = stadt-Feld in der Collection */
  slug: string;
  /** Anzeigename mit Umlauten (nur Text, nie Pfad) */
  name: string;
  /** Bundesland-Slug (für Schema areaServed / addressRegion) */
  bundesland: string;
  /** Bundesland-Anzeigename */
  bundeslandName: string;
  lat: number;
  lng: number;
  /** dfs "kochkurs {stadt}" Suchvolumen/Monat (Stand 2026-06) */
  volume: number;
  /** Nachbar-Slugs für Cross-Links */
  neighbors: string[];
}

export const KOCHKURS_CITIES: Record<string, KochkursCity> = {
  berlin: { slug: 'berlin', name: 'Berlin', bundesland: 'berlin', bundeslandName: 'Berlin', lat: 52.52, lng: 13.405, volume: 3600, neighbors: ['leipzig', 'dresden', 'hamburg'] },
  hamburg: { slug: 'hamburg', name: 'Hamburg', bundesland: 'hamburg', bundeslandName: 'Hamburg', lat: 53.5511, lng: 9.9937, volume: 3600, neighbors: ['bremen', 'hannover', 'berlin'] },
  muenchen: { slug: 'muenchen', name: 'München', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 48.1351, lng: 11.582, volume: 3600, neighbors: ['nuernberg', 'stuttgart'] },
  koeln: { slug: 'koeln', name: 'Köln', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 50.9375, lng: 6.9603, volume: 2900, neighbors: ['duesseldorf', 'dortmund', 'frankfurt'] },
  stuttgart: { slug: 'stuttgart', name: 'Stuttgart', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 48.7758, lng: 9.1829, volume: 1900, neighbors: ['muenchen', 'frankfurt', 'nuernberg'] },
  frankfurt: { slug: 'frankfurt', name: 'Frankfurt am Main', bundesland: 'hessen', bundeslandName: 'Hessen', lat: 50.1109, lng: 8.6821, volume: 1900, neighbors: ['stuttgart', 'koeln', 'nuernberg'] },
  duesseldorf: { slug: 'duesseldorf', name: 'Düsseldorf', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.2277, lng: 6.7735, volume: 1900, neighbors: ['koeln', 'dortmund', 'muenster'] },
  hannover: { slug: 'hannover', name: 'Hannover', bundesland: 'niedersachsen', bundeslandName: 'Niedersachsen', lat: 52.3759, lng: 9.732, volume: 1900, neighbors: ['bremen', 'hamburg', 'leipzig'] },
  muenster: { slug: 'muenster', name: 'Münster', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.9607, lng: 7.6261, volume: 1600, neighbors: ['dortmund', 'duesseldorf', 'koeln'] },
  nuernberg: { slug: 'nuernberg', name: 'Nürnberg', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 49.4521, lng: 11.0767, volume: 1300, neighbors: ['muenchen', 'stuttgart', 'leipzig'] },
  leipzig: { slug: 'leipzig', name: 'Leipzig', bundesland: 'sachsen', bundeslandName: 'Sachsen', lat: 51.3397, lng: 12.3731, volume: 1300, neighbors: ['dresden', 'berlin', 'hannover'] },
  dresden: { slug: 'dresden', name: 'Dresden', bundesland: 'sachsen', bundeslandName: 'Sachsen', lat: 51.0504, lng: 13.7373, volume: 1000, neighbors: ['leipzig', 'berlin', 'nuernberg'] },
  dortmund: { slug: 'dortmund', name: 'Dortmund', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.5136, lng: 7.4653, volume: 880, neighbors: ['duesseldorf', 'muenster', 'koeln'] },
  bremen: { slug: 'bremen', name: 'Bremen', bundesland: 'bremen', bundeslandName: 'Bremen', lat: 53.0793, lng: 8.8017, volume: 880, neighbors: ['hamburg', 'hannover'] },
};

/** Slugs in Launch-Reihenfolge (nach Volumen absteigend). */
export const KOCHKURS_CITY_SLUGS = Object.keys(KOCHKURS_CITIES);

export function kochkursCity(slug: string): KochkursCity | undefined {
  return KOCHKURS_CITIES[slug];
}

/** Spoke-URL (ohne /magazin-basePath — Next.js Link ergänzt das). */
export function getKochkursUrl(stadt: string): string {
  return `/singles-regional/kochkurse/${stadt}`;
}
