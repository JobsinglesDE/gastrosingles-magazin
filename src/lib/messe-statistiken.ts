// Strukturierte Messe-Daten (Single Source of Truth) für Event-Schema + Fakten-Block + Hub-Kalender
// der /messen-Spokes. GESETZ: echte Fakten, recherchiert mit Quelle, NIE erfinden. Datum = NÄCHSTE
// Ausgabe nach 2026-06-17 (vergangene Ausgaben nie als „kommend" ausweisen). Fehlt ein Wert →
// Feld weg, Komponente blendet aus. Eingestellte Messen: kein Event-Schema (eingestellt: true).
// Stand der Recherche: 2026-06-17.

export interface MesseData {
  name: string;
  kurz?: string;
  stadt: string;
  land?: string; // Default DE
  venue?: string;
  venueAdresse?: string;
  startDate?: string; // ISO YYYY-MM-DD, nächste Ausgabe
  endDate?: string;
  jahr?: string; // Anzeige-Jahr der nächsten Ausgabe
  turnus?: string; // 'jährlich' | 'zweijährlich'
  veranstalter?: string; // Organization (Event-Schema organizer)
  offizielleUrl?: string;
  fachbesucher?: string; // letzte Ausgabe (+ Jahr im String)
  aussteller?: string;
  eingestellt?: boolean; // keine künftige Ausgabe → kein Event-Schema, nicht im Kalender
  hinweis?: string; // z.B. Umbenennung / Einstellung
  quelle?: string;
}

export const MESSE_STATS: Record<string, MesseData> = {
  internorga: {
    name: 'INTERNORGA', stadt: 'Hamburg',
    venue: 'Hamburg Messe und Congress', venueAdresse: 'Messeplatz 1, 20357 Hamburg',
    startDate: '2027-03-12', endDate: '2027-03-16', jahr: '2027', turnus: 'jährlich',
    veranstalter: 'Hamburg Messe und Congress GmbH', offizielleUrl: 'https://www.internorga.com',
    fachbesucher: '~85.000 (2026)', quelle: 'internorga.com / Hamburg Messe / AUMA (Stand 06/2026)',
  },
  anuga: {
    name: 'Anuga', stadt: 'Köln',
    venue: 'Koelnmesse', venueAdresse: 'Messeplatz 1, 50679 Köln',
    startDate: '2027-10-09', endDate: '2027-10-13', jahr: '2027', turnus: 'zweijährlich',
    veranstalter: 'Koelnmesse GmbH', offizielleUrl: 'https://www.anuga.com',
    fachbesucher: '>145.000 (2025)', quelle: 'anuga.com / Koelnmesse (Stand 06/2026)',
  },
  biofach: {
    name: 'BIOFACH', stadt: 'Nürnberg',
    venue: 'Messezentrum Nürnberg', venueAdresse: 'Messezentrum, 90471 Nürnberg',
    startDate: '2027-02-16', endDate: '2027-02-19', jahr: '2027', turnus: 'jährlich',
    veranstalter: 'NürnbergMesse GmbH', offizielleUrl: 'https://www.biofach.de',
    fachbesucher: '~32.000 (2026)', aussteller: '~2.200 (2026)', quelle: 'biofach.de / NürnbergMesse (Stand 06/2026)',
  },
  intergastra: {
    name: 'INTERGASTRA', stadt: 'Stuttgart',
    venue: 'Messe Stuttgart', venueAdresse: 'Messepiazza 1, 70629 Stuttgart',
    startDate: '2028-02-12', endDate: '2028-02-16', jahr: '2028', turnus: 'zweijährlich',
    veranstalter: 'Landesmesse Stuttgart GmbH', offizielleUrl: 'https://www.messe-stuttgart.de/intergastra/',
    fachbesucher: '>80.000 (2026)', aussteller: '~1.250 (2026)', quelle: 'messe-stuttgart.de / Aggregatoren (Stand 06/2026)',
  },
  igeho: {
    name: 'IGEHO', stadt: 'Basel', land: 'CH',
    venue: 'Messe Basel', venueAdresse: 'Messeplatz 10, 4058 Basel',
    startDate: '2027-11-13', endDate: '2027-11-17', jahr: '2027', turnus: 'zweijährlich',
    veranstalter: 'MCH Group', offizielleUrl: 'https://www.igeho.ch',
    quelle: 'igeho.ch / MCH Messe Basel (Stand 06/2026)',
  },
  sueffa: {
    name: 'SÜFFA', kurz: 'Süffa', stadt: 'Stuttgart',
    venue: 'Messe Stuttgart', venueAdresse: 'Messepiazza 1, 70629 Stuttgart',
    startDate: '2026-11-07', endDate: '2026-11-09', jahr: '2026', turnus: 'zweijährlich',
    veranstalter: 'Landesmesse Stuttgart GmbH', offizielleUrl: 'https://www.messe-stuttgart.de/sueffa/',
    quelle: 'messe-stuttgart.de (Stand 06/2026)',
  },
  'gastro-vision': {
    name: '370GRAD', kurz: '370GRAD (ehem. Gastro Vision)', stadt: 'Hamburg',
    venue: 'Empire Riverside Hotel Hamburg',
    startDate: '2027-03-12', endDate: '2027-03-15', jahr: '2027', turnus: 'jährlich',
    veranstalter: 'Gastro Vision GmbH & Co. KG', offizielleUrl: 'https://370grad.vision',
    hinweis: 'Die Gastro Vision wurde 2022 in „370GRAD" umbenannt.',
    quelle: '370grad.vision (Stand 06/2026)',
  },
  hogatec: {
    name: 'HOGATEC', stadt: 'Düsseldorf',
    offizielleUrl: 'https://www.hogatec.de', eingestellt: true,
    hinweis: 'Die HOGATEC wurde eingestellt — die letzte Ausgabe fand 2012 statt, eine geplante Fortsetzung kam nicht zustande.',
    quelle: 'Messe Düsseldorf / Branchenpresse',
  },
};

/** messe-Slug (Artikel "internorga") → DEHOGA-{Land}-Hub für den Up-Link (CH ohne Hub). */
export const MESSE_DEHOGA_LAND: Record<string, { slug: string; name: string }> = {
  internorga: { slug: 'dehoga-hamburg', name: 'Hamburg' },
  'gastro-vision': { slug: 'dehoga-hamburg', name: 'Hamburg' },
  anuga: { slug: 'dehoga-nrw', name: 'NRW' },
  hogatec: { slug: 'dehoga-nrw', name: 'NRW' },
  biofach: { slug: 'dehoga-bayern', name: 'Bayern' },
  intergastra: { slug: 'dehoga-baden-wuerttemberg', name: 'Baden-Württemberg' },
  sueffa: { slug: 'dehoga-baden-wuerttemberg', name: 'Baden-Württemberg' },
  // igeho: Basel/CH — kein DEHOGA-Landesverband
};

export function messeStatsForSlug(slug: string): MesseData | null {
  return MESSE_STATS[slug] ?? null;
}

/** True, wenn eine künftige Ausgabe terminiert ist (→ Event-Schema + Kalender-Eintrag). */
export function hasMesseEvent(d: MesseData | null): boolean {
  return Boolean(d && !d.eingestellt && d.startDate && d.endDate);
}
