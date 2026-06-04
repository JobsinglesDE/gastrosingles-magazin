// src/lib/hubs.ts
// Single Source of Truth für alle Hub-/Kategorie-Metadaten.
// REGEL (Tommy): jeder Hub hat title+❤️, description, seoTitle+❤️ (≤60), seoDescription (≤160).

export type Hub = {
  slug: string; // Pfad-Segment relativ zu basePath, ohne führenden Slash
  title: string; // H1 / Anzeigename, MUSS ❤️ enthalten
  description: string; // Intro-Absatz auf der Hub-Seite
  seoTitle: string; // <title>, MUSS ❤️ enthalten, ≤60 Zeichen
  seoDescription: string; // meta description, ≤160 Zeichen
};

// Sektion 1: TV & Shows — show-basiert.
// Nur Hubs mit echtem Content (kein Thin Content). Content-Lücken (DFS-Volumen, 0 Artikel):
//   küchenschlacht 110k, the-taste 27k → künftige Spokes, NICHT als leerer Hub.
export const SHOW_HUBS: Record<string, Hub> = {
  'kitchen-impossible': {
    slug: 'tv-koch-shows/kitchen-impossible',
    title: 'Kitchen Impossible ❤️ — Mälzer & die Kochduelle',
    description:
      'Kitchen Impossible mit Tim Mälzer: Duelle, prominente Gäste und das Privatleben der Star-Köche.',
    seoTitle: 'Kitchen Impossible ❤️ Mälzer & Gäste',
    seoDescription:
      'Kitchen Impossible: Tim Mälzers Kochduelle, die prominenten Gäste und ihre Liebes-Geschichten.',
  },
  'grill-den-henssler': {
    slug: 'tv-koch-shows/grill-den-henssler',
    title: 'Grill den Henssler ❤️ — Steffen & die Promis',
    description:
      'Grill den Henssler: Steffen Henssler gegen prominente Hobbyköche — Show, Köche und Klatsch.',
    seoTitle: 'Grill den Henssler ❤️ Steffen & Promis',
    seoDescription:
      'Grill den Henssler: Steffen Henssler, die prominenten Gegner und das Leben hinter der Kochshow.',
  },
  'rosins-restaurants': {
    slug: 'tv-koch-shows/rosins-restaurants',
    title: 'Rosins Restaurants ❤️ — Frank Rosin & die Rettung',
    description:
      'Rosins Restaurants: Frank Rosin rettet kriselnde Lokale — die Show, der Koch und sein Privatleben.',
    seoTitle: 'Rosins Restaurants ❤️ Frank Rosin',
    seoDescription:
      'Rosins Restaurants: Frank Rosins Lokal-Rettungen, sein Werdegang und das Leben hinter der Kabel-eins-Show.',
  },
  'promi-koeche': {
    slug: 'tv-koch-shows/promi-koeche',
    title: 'Promi-Köche ❤️ — Porträts, Vermögen & Privatleben',
    description:
      'Die bekanntesten Promi-Köche im Porträt: Johann Lafer, Cornelia Poletto, Sarah Wiener & Co. — Karriere, Vermögen und Privatleben.',
    seoTitle: 'Promi-Köche ❤️ Porträts & Vermögen',
    seoDescription:
      'Promi-Köche im Porträt: Lafer, Poletto, Rach, Linster, Wiener — Karriere, Restaurants, Vermögen und Privatleben.',
  },
};

// Sektion 2: Berufe
export const BERUF_HUBS: Record<string, Hub> = {
  'koch': {
    slug: 'berufsbilder/koch',
    title: 'Koch & Köchin ❤️ — Ausbildung, Gehalt & Singles',
    description:
      'Berufsbild Koch: Ausbildung, Gehalt, Alltag in der Küche — und warum Köche oft Single sind.',
    seoTitle: 'Koch werden ❤️ Ausbildung & Gehalt',
    seoDescription:
      'Berufsbild Koch: Ausbildung, Gehalt und der Küchen-Alltag — plus Dating-Tipps für Gastro-Singles.',
  },
  'sommelier': {
    slug: 'berufsbilder/sommelier',
    title: 'Sommelier ❤️ — Ausbildung, Aufgaben & Karriere',
    description:
      'Berufsbild Sommelier: Weinexpertise, Ausbildungsweg und Karrierechancen in der Spitzengastronomie.',
    seoTitle: 'Sommelier ❤️ Ausbildung & Karriere',
    seoDescription:
      'Sommelier werden: Ausbildung, Aufgaben und Karriere rund um den Wein in der gehobenen Gastronomie.',
  },
  'kuechenchef': {
    slug: 'berufsbilder/kuechenchef',
    title: 'Küchenchef ❤️ — Aufgaben, Gehalt & Aufstieg',
    description:
      'Berufsbild Küchenchef: Verantwortung, Gehalt und der Weg an die Spitze der Brigade.',
    seoTitle: 'Küchenchef ❤️ Aufgaben & Gehalt',
    seoDescription:
      'Küchenchef werden: Aufgaben, Gehalt und Karriereweg in der Profiküche — kompakt erklärt.',
  },
  'barkeeper': {
    slug: 'berufsbilder/barkeeper',
    title: 'Barkeeper ❤️ — Job, Ausbildung & Bar-Leben',
    description:
      'Berufsbild Barkeeper: Ausbildung, Cocktail-Handwerk und das Nachtleben hinter der Bar.',
    seoTitle: 'Barkeeper ❤️ Ausbildung & Job',
    seoDescription:
      'Barkeeper werden: Ausbildung, Aufgaben und das Leben hinter der Bar — plus Singles aus der Nachtgastronomie.',
  },
};

// Sektion 3: Singles (Conversion-Hub, schlank)
export const SINGLE_HUB: Hub = {
  slug: 'singles-partnersuche',
  title: 'Gastro-Singles ❤️ — Partnersuche für Gastronomie & Hotellerie',
  description:
    'Partnersuche für Menschen aus Gastronomie und Hotellerie: Schichtdienst, Wochenenddienst im Service — und trotzdem die große Liebe finden.',
  seoTitle: 'Gastro-Singles ❤️ Partnersuche Gastronomie',
  seoDescription:
    'Gastro-Singles: Partnersuche für Köche, Service & Hotellerie. Dating trotz Schichtdienst — finde Menschen, die deinen Alltag verstehen.',
};

// Section-Index-Hubs (oberste Ebene)
export const SECTION_HUBS: Record<string, Hub> = {
  'tv-koch-shows': {
    slug: 'tv-koch-shows',
    title: 'TV & Koch-Shows ❤️ — Promiköche, Klatsch & News',
    description:
      'Alle Koch-Shows auf einen Blick: Küchenschlacht, Kitchen Impossible, Grill den Henssler, The Taste — Köche, Kandidaten und Klatsch.',
    seoTitle: 'Koch-Shows ❤️ Promiköche & TV-News',
    seoDescription:
      'TV-Koch-Shows: Küchenschlacht, Kitchen Impossible, Grill den Henssler & The Taste — Promiköche, Kandidaten und News.',
  },
  'berufsbilder': {
    slug: 'berufsbilder',
    title: 'Gastro-Berufsbilder ❤️ — Koch, Sommelier, Barkeeper & Co.',
    description:
      'Berufe in Gastronomie und Hotellerie: Ausbildung, Gehalt und Alltag von Koch bis Sommelier.',
    seoTitle: 'Gastro-Berufe ❤️ Koch, Sommelier & Co.',
    seoDescription:
      'Gastro-Berufsbilder: Koch, Küchenchef, Sommelier, Barkeeper — Ausbildung, Gehalt und Karrierewege im Überblick.',
  },
};

// Alle Hubs flach (für Sitemap + QC)
export const ALL_HUBS: Hub[] = [
  SINGLE_HUB,
  ...Object.values(SECTION_HUBS),
  ...Object.values(SHOW_HUBS),
  ...Object.values(BERUF_HUBS),
];
