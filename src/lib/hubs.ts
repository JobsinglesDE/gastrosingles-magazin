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

// Sektion 1: TV & Shows — show-basiert
export const SHOW_HUBS: Record<string, Hub> = {
  'kuechenschlacht': {
    slug: 'tv-koch-shows/kuechenschlacht',
    title: 'Die Küchenschlacht ❤️ — Köche, Kandidaten & Single-News',
    description:
      'Alles rund um Die Küchenschlacht: die Profiköche, Kandidaten und wer hinter den Herden Single ist.',
    seoTitle: 'Die Küchenschlacht ❤️ Köche & Kandidaten',
    seoDescription:
      'Die Küchenschlacht: Profiköche, Kandidaten und Single-Geschichten aus der ZDF-Kochshow — täglich frisch.',
  },
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
  'the-taste': {
    slug: 'tv-koch-shows/the-taste',
    title: 'The Taste ❤️ — Juroren, Kandidaten & Liebe',
    description:
      'The Taste: die vier Coaches, die Kandidaten und wer in der Kochshow das Single-Leben hinter sich lässt.',
    seoTitle: 'The Taste ❤️ Coaches & Kandidaten',
    seoDescription:
      'The Taste: Juroren, Kandidaten und Single-Geschichten aus der Sat.1-Kochshow im Überblick.',
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
