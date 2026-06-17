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
  berlin: { slug: 'berlin', name: 'Berlin', bundesland: 'berlin', bundeslandName: 'Berlin', lat: 52.52, lng: 13.405, volume: 3600, neighbors: ['potsdam', 'magdeburg', 'leipzig', 'halle', 'dresden', 'chemnitz', 'rostock'] },
  hamburg: { slug: 'hamburg', name: 'Hamburg', bundesland: 'hamburg', bundeslandName: 'Hamburg', lat: 53.5511, lng: 9.9937, volume: 3600, neighbors: ['luebeck', 'kiel', 'bremen', 'oldenburg', 'hannover', 'flensburg', 'braunschweig'] },
  muenchen: { slug: 'muenchen', name: 'München', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 48.1351, lng: 11.582, volume: 3600, neighbors: ['rosenheim', 'augsburg', 'landshut', 'ingolstadt', 'kempten', 'regensburg', 'ulm'] },
  koeln: { slug: 'koeln', name: 'Köln', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 50.9375, lng: 6.9603, volume: 2900, neighbors: ['bonn', 'duesseldorf', 'wuppertal', 'moenchengladbach', 'krefeld', 'duisburg', 'essen'] },
  stuttgart: { slug: 'stuttgart', name: 'Stuttgart', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 48.7758, lng: 9.1829, volume: 1900, neighbors: ['ludwigsburg', 'tuebingen', 'reutlingen', 'heilbronn', 'karlsruhe', 'aalen', 'ulm'] },
  frankfurt: { slug: 'frankfurt', name: 'Frankfurt am Main', bundesland: 'hessen', bundeslandName: 'Hessen', lat: 50.1109, lng: 8.6821, volume: 1900, neighbors: ['darmstadt', 'wiesbaden', 'mainz', 'aschaffenburg', 'mannheim', 'marburg', 'heidelberg'] },
  duesseldorf: { slug: 'duesseldorf', name: 'Düsseldorf', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.2277, lng: 6.7735, volume: 1900, neighbors: ['krefeld', 'duisburg', 'moenchengladbach', 'wuppertal', 'essen', 'koeln', 'bochum'] },
  hannover: { slug: 'hannover', name: 'Hannover', bundesland: 'niedersachsen', bundeslandName: 'Niedersachsen', lat: 52.3759, lng: 9.732, volume: 1900, neighbors: ['braunschweig', 'bielefeld', 'goettingen', 'paderborn', 'bremen', 'osnabrueck', 'kassel'] },
  muenster: { slug: 'muenster', name: 'Münster', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.9607, lng: 7.6261, volume: 1600, neighbors: ['osnabrueck', 'dortmund', 'bochum', 'bielefeld', 'essen', 'paderborn', 'duisburg'] },
  nuernberg: { slug: 'nuernberg', name: 'Nürnberg', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 49.4521, lng: 11.0767, volume: 1300, neighbors: ['erlangen', 'bamberg', 'bayreuth', 'ingolstadt', 'regensburg', 'wuerzburg', 'aalen'] },
  leipzig: { slug: 'leipzig', name: 'Leipzig', bundesland: 'sachsen', bundeslandName: 'Sachsen', lat: 51.3397, lng: 12.3731, volume: 1300, neighbors: ['halle', 'chemnitz', 'dresden', 'magdeburg', 'erfurt', 'potsdam', 'berlin'] },
  dresden: { slug: 'dresden', name: 'Dresden', bundesland: 'sachsen', bundeslandName: 'Sachsen', lat: 51.0504, lng: 13.7373, volume: 1000, neighbors: ['chemnitz', 'leipzig', 'halle', 'potsdam', 'berlin', 'magdeburg', 'erfurt'] },
  dortmund: { slug: 'dortmund', name: 'Dortmund', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.5136, lng: 7.4653, volume: 880, neighbors: ['bochum', 'essen', 'wuppertal', 'duisburg', 'muenster', 'duesseldorf', 'krefeld'] },
  bremen: { slug: 'bremen', name: 'Bremen', bundesland: 'bremen', bundeslandName: 'Bremen', lat: 53.0793, lng: 8.8017, volume: 880, neighbors: ['oldenburg', 'hamburg', 'hannover', 'osnabrueck', 'bielefeld', 'braunschweig', 'muenster'] },
  // --- Phase 2, Welle 1 (Top-10 nach "kochkurs <stadt>"-Volumen) ---
  mainz: { slug: 'mainz', name: 'Mainz', bundesland: 'rheinland-pfalz', bundeslandName: 'Rheinland-Pfalz', lat: 49.9929, lng: 8.2473, volume: 880, neighbors: ['wiesbaden', 'darmstadt', 'frankfurt', 'mannheim', 'koblenz', 'aschaffenburg', 'heidelberg'] },
  karlsruhe: { slug: 'karlsruhe', name: 'Karlsruhe', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 49.0069, lng: 8.4037, volume: 880, neighbors: ['heidelberg', 'mannheim', 'ludwigsburg', 'heilbronn', 'stuttgart', 'tuebingen', 'reutlingen'] },
  bonn: { slug: 'bonn', name: 'Bonn', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 50.7374, lng: 7.0982, volume: 880, neighbors: ['koeln', 'koblenz', 'wuppertal', 'duesseldorf', 'moenchengladbach', 'aachen', 'krefeld'] },
  bielefeld: { slug: 'bielefeld', name: 'Bielefeld', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 52.0302, lng: 8.5325, volume: 880, neighbors: ['paderborn', 'osnabrueck', 'muenster', 'hannover', 'dortmund', 'kassel', 'bochum'] },
  augsburg: { slug: 'augsburg', name: 'Augsburg', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 48.3705, lng: 10.8978, volume: 880, neighbors: ['muenchen', 'ingolstadt', 'ulm', 'aalen', 'kempten', 'landshut', 'rosenheim'] },
  ulm: { slug: 'ulm', name: 'Ulm', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 48.4011, lng: 9.9876, volume: 880, neighbors: ['aalen', 'reutlingen', 'augsburg', 'tuebingen', 'stuttgart', 'ravensburg', 'kempten'] },
  regensburg: { slug: 'regensburg', name: 'Regensburg', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 49.0134, lng: 12.1016, volume: 880, neighbors: ['landshut', 'ingolstadt', 'nuernberg', 'erlangen', 'muenchen', 'bayreuth', 'augsburg'] },
  mannheim: { slug: 'mannheim', name: 'Mannheim', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 49.4875, lng: 8.466, volume: 720, neighbors: ['heidelberg', 'darmstadt', 'karlsruhe', 'mainz', 'heilbronn', 'wiesbaden', 'frankfurt'] },
  freiburg: { slug: 'freiburg', name: 'Freiburg im Breisgau', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 47.999, lng: 7.8421, volume: 720, neighbors: ['konstanz', 'tuebingen', 'reutlingen', 'karlsruhe', 'stuttgart', 'ravensburg', 'ludwigsburg'] },
  braunschweig: { slug: 'braunschweig', name: 'Braunschweig', bundesland: 'niedersachsen', bundeslandName: 'Niedersachsen', lat: 52.2689, lng: 10.5268, volume: 720, neighbors: ['hannover', 'magdeburg', 'goettingen', 'kassel', 'halle', 'paderborn', 'bielefeld'] },
  // --- Welle 2 ---
  wuerzburg: { slug: 'wuerzburg', name: 'Würzburg', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 49.7913, lng: 9.9534, volume: 720, neighbors: ['aschaffenburg', 'bamberg', 'erlangen', 'fulda', 'nuernberg', 'heilbronn', 'darmstadt'] },
  osnabrueck: { slug: 'osnabrueck', name: 'Osnabrück', bundesland: 'niedersachsen', bundeslandName: 'Niedersachsen', lat: 52.2799, lng: 8.0472, volume: 720, neighbors: ['bielefeld', 'muenster', 'paderborn', 'dortmund', 'oldenburg', 'bremen', 'bochum'] },
  wiesbaden: { slug: 'wiesbaden', name: 'Wiesbaden', bundesland: 'hessen', bundeslandName: 'Hessen', lat: 50.0782, lng: 8.2398, volume: 590, neighbors: ['mainz', 'frankfurt', 'darmstadt', 'koblenz', 'aschaffenburg', 'mannheim', 'heidelberg'] },
  kassel: { slug: 'kassel', name: 'Kassel', bundesland: 'hessen', bundeslandName: 'Hessen', lat: 51.3127, lng: 9.4797, volume: 590, neighbors: ['goettingen', 'paderborn', 'marburg', 'fulda', 'bielefeld', 'erfurt', 'hannover'] },
  darmstadt: { slug: 'darmstadt', name: 'Darmstadt', bundesland: 'hessen', bundeslandName: 'Hessen', lat: 49.8728, lng: 8.6512, volume: 590, neighbors: ['frankfurt', 'mainz', 'wiesbaden', 'aschaffenburg', 'mannheim', 'heidelberg', 'heilbronn'] },
  bochum: { slug: 'bochum', name: 'Bochum', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.4818, lng: 7.2162, volume: 590, neighbors: ['essen', 'dortmund', 'wuppertal', 'duisburg', 'duesseldorf', 'krefeld', 'muenster'] },
  aachen: { slug: 'aachen', name: 'Aachen', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 50.7753, lng: 6.0839, volume: 590, neighbors: ['moenchengladbach', 'koeln', 'duesseldorf', 'bonn', 'krefeld', 'duisburg', 'wuppertal'] },
  oldenburg: { slug: 'oldenburg', name: 'Oldenburg', bundesland: 'niedersachsen', bundeslandName: 'Niedersachsen', lat: 53.1435, lng: 8.2146, volume: 590, neighbors: ['bremen', 'osnabrueck', 'bielefeld', 'hamburg', 'hannover', 'muenster', 'paderborn'] },
  koblenz: { slug: 'koblenz', name: 'Koblenz', bundesland: 'rheinland-pfalz', bundeslandName: 'Rheinland-Pfalz', lat: 50.3569, lng: 7.589, volume: 590, neighbors: ['bonn', 'wiesbaden', 'mainz', 'koeln', 'frankfurt', 'darmstadt', 'trier'] },
  magdeburg: { slug: 'magdeburg', name: 'Magdeburg', bundesland: 'sachsen-anhalt', bundeslandName: 'Sachsen-Anhalt', lat: 52.1205, lng: 11.6276, volume: 480, neighbors: ['halle', 'braunschweig', 'leipzig', 'potsdam', 'berlin', 'hannover', 'erfurt'] },

// --- Welle 3 ---
  luebeck: { slug: 'luebeck', name: 'Lübeck', bundesland: 'schleswig-holstein', bundeslandName: 'Schleswig-Holstein', lat: 53.8655, lng: 10.6866, volume: 480, neighbors: ['hamburg', 'kiel', 'rostock', 'flensburg', 'bremen', 'hannover', 'braunschweig'] },
  kiel: { slug: 'kiel', name: 'Kiel', bundesland: 'schleswig-holstein', bundeslandName: 'Schleswig-Holstein', lat: 54.3233, lng: 10.1228, volume: 480, neighbors: ['luebeck', 'flensburg', 'hamburg', 'rostock', 'bremen', 'oldenburg', 'hannover'] },
  heidelberg: { slug: 'heidelberg', name: 'Heidelberg', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 49.3988, lng: 8.6724, volume: 480, neighbors: ['mannheim', 'karlsruhe', 'heilbronn', 'darmstadt', 'ludwigsburg', 'mainz', 'aschaffenburg'] },
  essen: { slug: 'essen', name: 'Essen', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.4556, lng: 7.0116, volume: 480, neighbors: ['bochum', 'duisburg', 'wuppertal', 'duesseldorf', 'dortmund', 'krefeld', 'moenchengladbach'] },
  erfurt: { slug: 'erfurt', name: 'Erfurt', bundesland: 'thueringen', bundeslandName: 'Thüringen', lat: 50.9787, lng: 11.0328, volume: 480, neighbors: ['halle', 'goettingen', 'leipzig', 'fulda', 'kassel', 'bayreuth', 'bamberg'] },
  goettingen: { slug: 'goettingen', name: 'Göttingen', bundesland: 'niedersachsen', bundeslandName: 'Niedersachsen', lat: 51.5413, lng: 9.9158, volume: 480, neighbors: ['kassel', 'paderborn', 'braunschweig', 'hannover', 'erfurt', 'bielefeld', 'fulda'] },
  rostock: { slug: 'rostock', name: 'Rostock', bundesland: 'mecklenburg-vorpommern', bundeslandName: 'Mecklenburg-Vorpommern', lat: 54.0924, lng: 12.0991, volume: 390, neighbors: ['luebeck', 'kiel', 'hamburg', 'flensburg', 'berlin', 'potsdam', 'magdeburg'] },
  chemnitz: { slug: 'chemnitz', name: 'Chemnitz', bundesland: 'sachsen', bundeslandName: 'Sachsen', lat: 50.8278, lng: 12.9214, volume: 390, neighbors: ['dresden', 'leipzig', 'halle', 'erfurt', 'bayreuth', 'magdeburg', 'potsdam'] },
  wuppertal: { slug: 'wuppertal', name: 'Wuppertal', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.2562, lng: 7.1508, volume: 320, neighbors: ['essen', 'bochum', 'duesseldorf', 'duisburg', 'dortmund', 'koeln', 'krefeld'] },
  potsdam: { slug: 'potsdam', name: 'Potsdam', bundesland: 'brandenburg', bundeslandName: 'Brandenburg', lat: 52.3906, lng: 13.0645, volume: 320, neighbors: ['berlin', 'magdeburg', 'halle', 'leipzig', 'dresden', 'braunschweig', 'chemnitz'] },

// --- Welle 4 ---
  moenchengladbach: { slug: 'moenchengladbach', name: 'Mönchengladbach', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.1805, lng: 6.4428, volume: 320, neighbors: ['krefeld', 'duesseldorf', 'duisburg', 'koeln', 'essen', 'wuppertal', 'aachen'] },
  ingolstadt: { slug: 'ingolstadt', name: 'Ingolstadt', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 48.7665, lng: 11.4258, volume: 320, neighbors: ['regensburg', 'augsburg', 'landshut', 'muenchen', 'nuernberg', 'erlangen', 'aalen'] },
  heilbronn: { slug: 'heilbronn', name: 'Heilbronn', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 49.1427, lng: 9.2109, volume: 320, neighbors: ['ludwigsburg', 'stuttgart', 'heidelberg', 'karlsruhe', 'mannheim', 'tuebingen', 'reutlingen'] },
  bamberg: { slug: 'bamberg', name: 'Bamberg', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 49.8917, lng: 10.8917, volume: 320, neighbors: ['erlangen', 'bayreuth', 'nuernberg', 'wuerzburg', 'fulda', 'erfurt', 'aschaffenburg'] },
  saarbruecken: { slug: 'saarbruecken', name: 'Saarbrücken', bundesland: 'saarland', bundeslandName: 'Saarland', lat: 49.2401, lng: 6.9969, volume: 260, neighbors: ['trier', 'karlsruhe', 'mannheim', 'heidelberg', 'mainz', 'wiesbaden', 'koblenz'] },
  krefeld: { slug: 'krefeld', name: 'Krefeld', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.3388, lng: 6.5853, volume: 260, neighbors: ['duisburg', 'duesseldorf', 'moenchengladbach', 'essen', 'wuppertal', 'bochum', 'koeln'] },
  duisburg: { slug: 'duisburg', name: 'Duisburg', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.4344, lng: 6.7623, volume: 260, neighbors: ['krefeld', 'essen', 'duesseldorf', 'bochum', 'wuppertal', 'moenchengladbach', 'dortmund'] },
  tuebingen: { slug: 'tuebingen', name: 'Tübingen', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 48.5216, lng: 9.0576, volume: 260, neighbors: ['reutlingen', 'stuttgart', 'ludwigsburg', 'ulm', 'heilbronn', 'karlsruhe', 'aalen'] },
  trier: { slug: 'trier', name: 'Trier', bundesland: 'rheinland-pfalz', bundeslandName: 'Rheinland-Pfalz', lat: 49.7596, lng: 6.6442, volume: 260, neighbors: ['saarbruecken', 'koblenz', 'bonn', 'mainz', 'wiesbaden', 'aachen', 'koeln'] },
  marburg: { slug: 'marburg', name: 'Marburg', bundesland: 'hessen', bundeslandName: 'Hessen', lat: 50.8021, lng: 8.7665, volume: 260, neighbors: ['fulda', 'kassel', 'frankfurt', 'wiesbaden', 'aschaffenburg', 'koblenz', 'mainz'] },

// --- Phase 3, Welle 5 (DFS-validiert, >= 260/mo, ueber Welle-4-Floor) ---
  paderborn: { slug: 'paderborn', name: 'Paderborn', bundesland: 'nordrhein-westfalen', bundeslandName: 'Nordrhein-Westfalen', lat: 51.7189, lng: 8.7575, volume: 590, neighbors: ['bielefeld', 'kassel', 'osnabrueck', 'muenster', 'goettingen', 'dortmund', 'hannover'] },
  ludwigsburg: { slug: 'ludwigsburg', name: 'Ludwigsburg', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 48.8974, lng: 9.1916, volume: 390, neighbors: ['stuttgart', 'heilbronn', 'tuebingen', 'reutlingen', 'karlsruhe', 'aalen', 'heidelberg'] },
  fulda: { slug: 'fulda', name: 'Fulda', bundesland: 'hessen', bundeslandName: 'Hessen', lat: 50.5558, lng: 9.6808, volume: 320, neighbors: ['marburg', 'aschaffenburg', 'kassel', 'frankfurt', 'wuerzburg', 'darmstadt', 'erfurt'] },
  rosenheim: { slug: 'rosenheim', name: 'Rosenheim', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 47.8561, lng: 12.1289, volume: 320, neighbors: ['muenchen', 'landshut', 'augsburg', 'ingolstadt', 'regensburg', 'kempten', 'ulm'] },
  landshut: { slug: 'landshut', name: 'Landshut', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 48.5372, lng: 12.1517, volume: 260, neighbors: ['regensburg', 'ingolstadt', 'muenchen', 'rosenheim', 'augsburg', 'nuernberg', 'erlangen'] },
  kempten: { slug: 'kempten', name: 'Kempten (Allgäu)', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 47.7267, lng: 10.3168, volume: 260, neighbors: ['ravensburg', 'ulm', 'augsburg', 'konstanz', 'muenchen', 'reutlingen', 'aalen'] },
  erlangen: { slug: 'erlangen', name: 'Erlangen', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 49.5897, lng: 11.0040, volume: 260, neighbors: ['nuernberg', 'bamberg', 'bayreuth', 'wuerzburg', 'ingolstadt', 'regensburg', 'aalen'] },
  aschaffenburg: { slug: 'aschaffenburg', name: 'Aschaffenburg', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 49.9769, lng: 9.1582, volume: 260, neighbors: ['frankfurt', 'darmstadt', 'wuerzburg', 'mainz', 'wiesbaden', 'heidelberg', 'mannheim'] },

// --- Phase 3, Welle 6 (DFS-validiert, 210/mo) ---
  halle: { slug: 'halle', name: 'Halle (Saale)', bundesland: 'sachsen-anhalt', bundeslandName: 'Sachsen-Anhalt', lat: 51.4825, lng: 11.9700, volume: 210, neighbors: ['leipzig', 'magdeburg', 'erfurt', 'chemnitz', 'potsdam', 'dresden', 'braunschweig'] },
  flensburg: { slug: 'flensburg', name: 'Flensburg', bundesland: 'schleswig-holstein', bundeslandName: 'Schleswig-Holstein', lat: 54.7937, lng: 9.4469, volume: 210, neighbors: ['kiel', 'luebeck', 'hamburg', 'rostock', 'bremen', 'oldenburg', 'hannover'] },
  reutlingen: { slug: 'reutlingen', name: 'Reutlingen', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 48.4914, lng: 9.2043, volume: 210, neighbors: ['tuebingen', 'stuttgart', 'ludwigsburg', 'ulm', 'heilbronn', 'aalen', 'karlsruhe'] },
  ravensburg: { slug: 'ravensburg', name: 'Ravensburg', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 47.7811, lng: 9.6122, volume: 210, neighbors: ['konstanz', 'kempten', 'ulm', 'reutlingen', 'tuebingen', 'stuttgart', 'augsburg'] },
  konstanz: { slug: 'konstanz', name: 'Konstanz', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 47.6603, lng: 9.1758, volume: 210, neighbors: ['ravensburg', 'kempten', 'reutlingen', 'tuebingen', 'ulm', 'freiburg', 'stuttgart'] },
  bayreuth: { slug: 'bayreuth', name: 'Bayreuth', bundesland: 'bayern', bundeslandName: 'Bayern', lat: 49.9456, lng: 11.5713, volume: 210, neighbors: ['bamberg', 'erlangen', 'nuernberg', 'regensburg', 'wuerzburg', 'erfurt', 'ingolstadt'] },
  aalen: { slug: 'aalen', name: 'Aalen', bundesland: 'baden-wuerttemberg', bundeslandName: 'Baden-Württemberg', lat: 48.8378, lng: 10.0933, volume: 210, neighbors: ['ulm', 'ludwigsburg', 'stuttgart', 'heilbronn', 'reutlingen', 'augsburg', 'tuebingen'] },
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
