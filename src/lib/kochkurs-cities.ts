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
  berlin: { slug: 'berlin', name: 'Berlin', bundesland: 'berlin', bundeslandName: 'Berlin', lat: 52.52, lng: 13.405, volume: 3600, neighbors: ['leipzig', 'dresden', 'braunschweig'] },
  hamburg: { slug: 'hamburg', name: 'Hamburg', bundesland: 'hamburg', bundeslandName: 'Hamburg', lat: 53.5511, lng: 9.9937, volume: 3600, neighbors: ['bremen', 'hannover', 'braunschweig'] },
  muenchen: { slug: 'muenchen', name: 'München', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 48.1351, lng: 11.582, volume: 3600, neighbors: ['augsburg', 'regensburg', 'ulm'] },
  koeln: { slug: 'koeln', name: 'Köln', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 50.9375, lng: 6.9603, volume: 2900, neighbors: ['bonn', 'duesseldorf', 'dortmund'] },
  stuttgart: { slug: 'stuttgart', name: 'Stuttgart', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 48.7758, lng: 9.1829, volume: 1900, neighbors: ['karlsruhe', 'ulm', 'mannheim'] },
  frankfurt: { slug: 'frankfurt', name: 'Frankfurt am Main', bundesland: 'hessen', bundeslandName: 'Hessen', lat: 50.1109, lng: 8.6821, volume: 1900, neighbors: ['mainz', 'mannheim', 'karlsruhe'] },
  duesseldorf: { slug: 'duesseldorf', name: 'Düsseldorf', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.2277, lng: 6.7735, volume: 1900, neighbors: ['koeln', 'dortmund', 'bonn'] },
  hannover: { slug: 'hannover', name: 'Hannover', bundesland: 'niedersachsen', bundeslandName: 'Niedersachsen', lat: 52.3759, lng: 9.732, volume: 1900, neighbors: ['braunschweig', 'bielefeld', 'bremen'] },
  muenster: { slug: 'muenster', name: 'Münster', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.9607, lng: 7.6261, volume: 1600, neighbors: ['dortmund', 'bielefeld', 'duesseldorf'] },
  nuernberg: { slug: 'nuernberg', name: 'Nürnberg', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 49.4521, lng: 11.0767, volume: 1300, neighbors: ['regensburg', 'augsburg', 'ulm'] },
  leipzig: { slug: 'leipzig', name: 'Leipzig', bundesland: 'sachsen', bundeslandName: 'Sachsen', lat: 51.3397, lng: 12.3731, volume: 1300, neighbors: ['dresden', 'berlin', 'braunschweig'] },
  dresden: { slug: 'dresden', name: 'Dresden', bundesland: 'sachsen', bundeslandName: 'Sachsen', lat: 51.0504, lng: 13.7373, volume: 1000, neighbors: ['leipzig', 'berlin', 'regensburg'] },
  dortmund: { slug: 'dortmund', name: 'Dortmund', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.5136, lng: 7.4653, volume: 880, neighbors: ['muenster', 'duesseldorf', 'koeln'] },
  bremen: { slug: 'bremen', name: 'Bremen', bundesland: 'bremen', bundeslandName: 'Bremen', lat: 53.0793, lng: 8.8017, volume: 880, neighbors: ['hamburg', 'hannover', 'bielefeld'] },
  // --- Phase 2, Welle 1 (Top-10 nach "kochkurs <stadt>"-Volumen) ---
  mainz: { slug: 'mainz', name: 'Mainz', bundesland: 'rheinland-pfalz', bundeslandName: 'Rheinland-Pfalz', lat: 49.9929, lng: 8.2473, volume: 880, neighbors: ['frankfurt', 'mannheim', 'karlsruhe'] },
  karlsruhe: { slug: 'karlsruhe', name: 'Karlsruhe', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 49.0069, lng: 8.4037, volume: 880, neighbors: ['mannheim', 'stuttgart', 'mainz'] },
  bonn: { slug: 'bonn', name: 'Bonn', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 50.7374, lng: 7.0982, volume: 880, neighbors: ['koeln', 'duesseldorf', 'dortmund'] },
  bielefeld: { slug: 'bielefeld', name: 'Bielefeld', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 52.0302, lng: 8.5325, volume: 880, neighbors: ['muenster', 'hannover', 'dortmund'] },
  augsburg: { slug: 'augsburg', name: 'Augsburg', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 48.3705, lng: 10.8978, volume: 880, neighbors: ['muenchen', 'ulm', 'regensburg'] },
  ulm: { slug: 'ulm', name: 'Ulm', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 48.4011, lng: 9.9876, volume: 880, neighbors: ['augsburg', 'stuttgart', 'muenchen'] },
  regensburg: { slug: 'regensburg', name: 'Regensburg', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 49.0134, lng: 12.1016, volume: 880, neighbors: ['nuernberg', 'muenchen', 'augsburg'] },
  mannheim: { slug: 'mannheim', name: 'Mannheim', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 49.4875, lng: 8.466, volume: 720, neighbors: ['karlsruhe', 'mainz', 'frankfurt'] },
  freiburg: { slug: 'freiburg', name: 'Freiburg im Breisgau', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 47.999, lng: 7.8421, volume: 720, neighbors: ['karlsruhe', 'stuttgart', 'ulm'] },
  braunschweig: { slug: 'braunschweig', name: 'Braunschweig', bundesland: 'niedersachsen', bundeslandName: 'Niedersachsen', lat: 52.2689, lng: 10.5268, volume: 720, neighbors: ['hannover', 'bielefeld', 'hamburg'] },
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
