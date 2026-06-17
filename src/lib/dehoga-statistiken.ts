// Strukturierte DEHOGA-Bundesland-Daten (Single Source of Truth) für die GEO-Datenblöcke
// (Betriebszahlen-Cards + Tarif/Gehalt-Tabelle + Table/Dataset-Schema) auf den
// dehoga-{bundesland}-Spokes.
//
// WICHTIG (GESETZ: echte Fakten, nie erfinden): Jede Zahl ist recherchiert und mit Quelle +
// Stand belegt. Fehlt ein Wert, bleibt das Feld weg/undefined — die Komponenten blenden es
// aus, NIE schätzen. Geschützt vor Content-Agent-Erfindung, weil die Zahlen hier (TS) liegen,
// nicht im Frontmatter.
//
// Keys = Spoke-Slug-Suffix (Artikel "dehoga-nrw" -> Key "nrw"). Achtung: "nrw" ≠ der
// bundeslaender.ts-Key "nordrhein-westfalen" — daher eigener `name` pro Eintrag.

export interface GehaltRow {
  beruf: string;
  median: string; // €/Monat brutto, Vollzeit
  q1?: string;
  q3?: string;
}

export interface DehogaTarif {
  einstiegStundenlohn?: string; // z.B. "14,40 €" — nur wenn gültiger Tarif belegt
  laufzeitBis?: string; // z.B. "31.05.2026"
  tarifpartner?: string; // z.B. "DEHOGA NRW / NGG NRW"
  tarifHinweis?: string; // Hinweis bei ausgelaufenem/fehlendem Tarif (z.B. Mindestlohn-Untergrenze)
  quelle?: string;
}

export interface DehogaBundeslandData {
  name: string;
  kurz?: string; // gängige Such-/Anzeigeform (z.B. "NRW"), default = name
  // Verband-Entität (Organization-Schema + about)
  offizielleUrl?: string; // offizielle Landesverband-Website
  sitz?: string; // Sitz der Landesgeschäftsstelle
  aktualisiert?: string; // Stand der Datenpflege (ISO) -> dateModified
  // Betriebszahlen (GEO-Signal, pro Bundesland)
  beschaeftigte?: string; // Gastgewerbe-Beschäftigte
  betriebe?: string; // Gastgewerbe-Betriebe
  umsatzMrd?: string; // Gastgewerbe-Umsatz in Mrd. €
  mitgliedsbetriebe?: string; // DEHOGA-Mitgliedsbetriebe
  bezugsjahr?: string; // Stand der Betriebszahlen
  statQuelle?: string;
  // Tarif (pro Bundesland eigener NGG/DEHOGA-Abschluss)
  tarif?: DehogaTarif;
  // Gehalt nach Beruf — default bundesweit (Entgeltatlas), pro Land überschreibbar
  gehalt?: GehaltRow[];
}

// Bundesweite Median-Gehälter (Entgeltatlas der Bundesagentur für Arbeit, Vollzeit brutto/Monat,
// 2024). Default für alle Länder; regionale Werte können je Eintrag via `gehalt` überschrieben werden.
export const GASTRO_GEHALT_DE: GehaltRow[] = [
  { beruf: 'Koch / Köchin', median: '2.882 €', q1: '2.456 €', q3: '3.408 €' },
  { beruf: 'Hotelfachmann/-frau', median: '2.803 €', q1: '2.467 €', q3: '3.211 €' },
  { beruf: 'Fachkraft Gastronomie', median: '2.526 €', q1: '2.178 €', q3: '2.974 €' },
  { beruf: 'Servicekraft', median: '2.401 €', q1: '2.125 €', q3: '2.751 €' },
];

export const GEHALT_QUELLE =
  'Entgeltatlas der Bundesagentur für Arbeit (Median, Vollzeit brutto, Deutschland, 2024)';

// Alle Werte recherchiert mit Quelle (2026-06-17). Abgelaufene Tarif-Laufzeiten ausgeblendet,
// unbelegte Werte weggelassen (GESETZ: nie schätzen). Beschäftigte = Gastgewerbe (Beherbergung
// + Gastronomie); bei BB/RLP sozialversicherungspflichtig (svB), sonst tätige Personen gesamt.
export const DEHOGA_STATS: Record<string, DehogaBundeslandData> = {
  nrw: {
    name: 'Nordrhein-Westfalen', kurz: 'NRW',
    offizielleUrl: 'https://www.dehoga-nrw.de', sitz: 'Neuss', aktualisiert: '2026-06-17',
    beschaeftigte: '312.000', umsatzMrd: '21', mitgliedsbetriebe: '30.000', bezugsjahr: '2023',
    statQuelle: 'IT.NRW (Gastgewerbe NRW, 2023), DEHOGA NRW',
    tarif: { tarifpartner: 'DEHOGA NRW / NGG NRW', tarifHinweis: 'Branchentarifvertrag zum 31.05.2026 ausgelaufen, Neuverhandlung läuft — gesetzlicher Mindestlohn 13,90 €/Std (seit 01.01.2026) gilt als Untergrenze.', quelle: 'DEHOGA NRW / NGG NRW, Tarifregister NRW (Stand 06/2026)' },
  },
  'baden-wuerttemberg': {
    name: 'Baden-Württemberg', kurz: 'BW',
    offizielleUrl: 'https://www.dehogabw.de', sitz: 'Stuttgart', aktualisiert: '2026-06-17',
    beschaeftigte: '282.200', umsatzMrd: '15,9', mitgliedsbetriebe: '25.000', bezugsjahr: '2023',
    statQuelle: 'Statistisches Landesamt BW (Gastgewerbe 2023), DEHOGA Baden-Württemberg',
    tarif: { einstiegStundenlohn: '14,10 €', laufzeitBis: '31.03.2028', tarifpartner: 'DEHOGA BW / NGG', quelle: 'dehogabw.de / NGG Südwest' },
  },
  bayern: {
    name: 'Bayern',
    offizielleUrl: 'https://www.dehoga-bayern.de', sitz: 'München', aktualisiert: '2026-06-17',
    beschaeftigte: '372.800', mitgliedsbetriebe: '40.000', bezugsjahr: '2023',
    statQuelle: 'Bayerisches Landesamt für Statistik (Gastgewerbe 2023), DEHOGA Bayern',
    tarif: { laufzeitBis: '31.08.2026', tarifpartner: 'DEHOGA Bayern / NGG', quelle: 'dehoga-bayern.de' },
  },
  berlin: {
    name: 'Berlin',
    offizielleUrl: 'https://www.dehoga-berlin.de', sitz: 'Berlin', aktualisiert: '2026-06-17',
    beschaeftigte: '140.700', mitgliedsbetriebe: '2.500–3.500', bezugsjahr: '2023',
    statQuelle: 'Amt für Statistik Berlin-Brandenburg (Gastgewerbe 2023), DEHOGA Berlin',
    tarif: { einstiegStundenlohn: '15,15 €', laufzeitBis: '30.06.2027', tarifpartner: 'DEHOGA Berlin / NGG', quelle: 'Senatsverwaltung Berlin / DEHOGA Berlin' },
  },
  brandenburg: {
    name: 'Brandenburg',
    offizielleUrl: 'https://www.dehoga-brandenburg.de', sitz: 'Potsdam', aktualisiert: '2026-06-17',
    beschaeftigte: '29.763', mitgliedsbetriebe: '3.500–5.000', bezugsjahr: '2024',
    statQuelle: 'Bundesagentur für Arbeit (svB Gastgewerbe Brandenburg, 09/2024), DEHOGA Brandenburg',
  },
  bremen: {
    name: 'Bremen',
    offizielleUrl: 'https://www.dehoga-bremen.de', sitz: 'Bremen', aktualisiert: '2026-06-17',
    mitgliedsbetriebe: '1.200–1.800',
    statQuelle: 'DEHOGA Bremen',
  },
  hamburg: {
    name: 'Hamburg',
    offizielleUrl: 'https://www.dehoga-hamburg.de', sitz: 'Hamburg', aktualisiert: '2026-06-17',
    mitgliedsbetriebe: '5.000–7.000',
    statQuelle: 'DEHOGA Hamburg',
    tarif: { laufzeitBis: '31.12.2026', tarifpartner: 'DEHOGA Hamburg / NGG', tarifHinweis: 'Aktueller Stufen-Stundenlohn (ab 01/2026) nicht offiziell veröffentlicht; gesetzlicher Mindestlohn 13,90 €/Std gilt als Untergrenze.', quelle: 'DEHOGA Hamburg / NGG' },
  },
  hessen: {
    name: 'Hessen',
    offizielleUrl: 'https://www.dehoga-hessen.de', sitz: 'Wiesbaden', aktualisiert: '2026-06-17',
    mitgliedsbetriebe: '12.000–14.000',
    statQuelle: 'DEHOGA Hessen',
  },
  'mecklenburg-vorpommern': {
    name: 'Mecklenburg-Vorpommern', kurz: 'MV',
    offizielleUrl: 'https://www.dehoga-mv.de', aktualisiert: '2026-06-17',
    beschaeftigte: '48.000', mitgliedsbetriebe: '4.000–5.500', bezugsjahr: '2022',
    statQuelle: 'Statistisches Amt MV (Gastgewerbe 2022), DEHOGA MV',
    tarif: { einstiegStundenlohn: '14,40 €', laufzeitBis: '31.03.2027', tarifpartner: 'DEHOGA MV / NGG', quelle: 'Entgelttarifvertrag DEHOGA MV / NGG — Mindestlohn 13,90 € + 0,50 € Tarifaufschlag (ab 01.01.2026)' },
  },
  niedersachsen: {
    name: 'Niedersachsen',
    offizielleUrl: 'https://www.dehoga-niedersachsen.de', sitz: 'Hannover', aktualisiert: '2026-06-17',
    beschaeftigte: '195.739', mitgliedsbetriebe: '15.000–18.000', bezugsjahr: '2023',
    statQuelle: 'DEHOGA Niedersachsen Branchenstatistik / LSN (2023)',
    tarif: { laufzeitBis: '30.04.2028', tarifpartner: 'DEHOGA Niedersachsen / NGG', quelle: 'DEHOGA Niedersachsen / NGG' },
  },
  'rheinland-pfalz': {
    name: 'Rheinland-Pfalz',
    offizielleUrl: 'https://www.dehoga-rlp.de', sitz: 'Bad Kreuznach', aktualisiert: '2026-06-17',
    beschaeftigte: '47.100', mitgliedsbetriebe: '8.000–10.000', bezugsjahr: '2023',
    statQuelle: 'Bundesagentur für Arbeit (svB Gastgewerbe RLP, 2023), DEHOGA Rheinland-Pfalz',
    tarif: { tarifpartner: 'DEHOGA RLP / NGG Südwest', tarifHinweis: 'Kein gültiger Branchentarifvertrag (Verhandlungen 03/2026 gescheitert) — gesetzlicher Mindestlohn 13,90 €/Std (seit 01.01.2026) gilt als Untergrenze.', quelle: 'DEHOGA Rheinland-Pfalz / NGG Südwest (Stand 06/2026)' },
  },
  saarland: {
    name: 'Saarland',
    offizielleUrl: 'https://www.dehogasaar.de', sitz: 'Saarbrücken', aktualisiert: '2026-06-17',
    mitgliedsbetriebe: '1.500–2.500',
    statQuelle: 'DEHOGA Saarland',
    tarif: { laufzeitBis: '30.09.2026', tarifpartner: 'DEHOGA Saarland / NGG', quelle: 'dehogasaar.de / NGG' },
  },
  sachsen: {
    name: 'Sachsen',
    offizielleUrl: 'https://www.dehoga-sachsen.de', sitz: 'Dresden', aktualisiert: '2026-06-17',
    beschaeftigte: '78.460', mitgliedsbetriebe: '7.000', bezugsjahr: '2023',
    statQuelle: 'Statistisches Landesamt Sachsen (Gastgewerbe 2023), DEHOGA Sachsen',
    tarif: { laufzeitBis: '31.12.2026', tarifpartner: 'DEHOGA Sachsen / NGG', quelle: 'dehoga-sachsen.de' },
  },
  'sachsen-anhalt': {
    name: 'Sachsen-Anhalt',
    offizielleUrl: 'https://www.dehoga-sachsen-anhalt.de', sitz: 'Magdeburg', aktualisiert: '2026-06-17',
    beschaeftigte: '40.500', mitgliedsbetriebe: '3.500', bezugsjahr: '2024',
    statQuelle: 'Branchenstatistik (svB + geringfügig, 2024), DEHOGA Sachsen-Anhalt',
    tarif: { laufzeitBis: '31.07.2026', tarifpartner: 'DEHOGA Sachsen-Anhalt / NGG', quelle: 'Tarifregister Sachsen-Anhalt' },
  },
  'schleswig-holstein': {
    name: 'Schleswig-Holstein',
    offizielleUrl: 'https://www.dehoga-sh.de', sitz: 'Kiel', aktualisiert: '2026-06-17',
    beschaeftigte: '80.000', mitgliedsbetriebe: '6.000', bezugsjahr: '2025',
    statQuelle: 'Landesregierung Schleswig-Holstein (Gastgewerbe-Geltungsbereich, 2025), DEHOGA SH',
    tarif: { einstiegStundenlohn: '14,97 €', laufzeitBis: '30.06.2026', tarifpartner: 'DEHOGA SH / NGG', tarifHinweis: 'Laufzeit endet 30.06.2026, Folgetarif in Verhandlung.', quelle: 'Landesregierung SH (Allgemeinverbindlicherklärung 03/2025) / DEHOGA SH' },
  },
  thueringen: {
    name: 'Thüringen',
    offizielleUrl: 'https://www.dehoga-thueringen.de', sitz: 'Erfurt', aktualisiert: '2026-06-17',
    mitgliedsbetriebe: '3.500',
    statQuelle: 'DEHOGA Thüringen',
    tarif: { einstiegStundenlohn: '15,40 €', laufzeitBis: '30.04.2027', tarifpartner: 'DEHOGA Thüringen / NGG', quelle: 'NGG / DEHOGA Thüringen — Tarifstufe ab 01.07.2026 (Laufzeit bis 30.04.2027)' },
  },
  // --- NRW-Regionalverbände (eigene Sub-Pillars unter dehoga-nrw; eigene DFS-Terme:
  //     "dehoga nordrhein" 590/mo, "dehoga westfalen" 210/mo — verschieden von "dehoga nrw" 480).
  //     Beschäftigte/Umsatz sind NUR NRW-gesamt verfügbar (keine RB-Aufschlüsselung) → bewusst
  //     weggelassen (GESETZ: nie eine regionsfremde Gesamtzahl als Regionswert ausweisen). ---
  nordrhein: {
    name: 'DEHOGA Nordrhein', kurz: 'Nordrhein',
    offizielleUrl: 'https://www.dehoga-nordrhein.de', sitz: 'Neuss', aktualisiert: '2026-06-17',
    mitgliedsbetriebe: '5.800',
    statQuelle: 'DEHOGA Nordrhein (Regierungsbezirke Düsseldorf + Köln)',
    tarif: { tarifpartner: 'DEHOGA NRW / NGG NRW', tarifHinweis: 'Branchentarifvertrag zum 31.05.2026 ausgelaufen, Neuverhandlung läuft — gesetzlicher Mindestlohn 13,90 €/Std (seit 01.01.2026) gilt als Untergrenze.', quelle: 'DEHOGA NRW / NGG NRW, Tarifregister NRW (Stand 06/2026)' },
  },
  westfalen: {
    name: 'DEHOGA Westfalen', kurz: 'Westfalen',
    offizielleUrl: 'https://www.dehoga-westfalen.de', sitz: 'Hamm', aktualisiert: '2026-06-17',
    statQuelle: 'DEHOGA Westfalen (Regierungsbezirke Arnsberg + Münster)',
    tarif: { tarifpartner: 'DEHOGA NRW / NGG NRW', tarifHinweis: 'Branchentarifvertrag zum 31.05.2026 ausgelaufen, Neuverhandlung läuft — gesetzlicher Mindestlohn 13,90 €/Std (seit 01.01.2026) gilt als Untergrenze.', quelle: 'DEHOGA NRW / NGG NRW, Tarifregister NRW (Stand 06/2026)' },
  },
};

/** NRW-Sub-Pillar → ihre Regionalverbände (Down-Link). Key = bundeslaender.ts-Slug. */
export const DEHOGA_SUBREGIONS: Record<string, { slug: string; name: string }[]> = {
  'nordrhein-westfalen': [
    { slug: 'dehoga-nordrhein', name: 'DEHOGA Nordrhein' },
    { slug: 'dehoga-westfalen', name: 'DEHOGA Westfalen' },
  ],
};

/** Regionalverband-Spoke → Eltern-Landesverband (Up-Link). Key = DEHOGA_STATS-Region-Key. */
export const DEHOGA_PARENT: Record<string, { slug: string; name: string }> = {
  nordrhein: { slug: 'dehoga-nrw', name: 'NRW' },
  westfalen: { slug: 'dehoga-nrw', name: 'NRW' },
};

/** DEHOGA-{Land}-Hub → Gastro-Messen der Region (Down-Link, GESETZ 14 bidirektional).
 *  Key = bundeslaender.ts-Slug bzw. Region-Key (nordrhein). messe-Slug = Artikel in /messen/.
 *  Eingestellte Messen (hogatec) bewusst NICHT verlinkt. */
export const DEHOGA_MESSEN_MAP: Record<string, { slug: string; name: string }[]> = {
  hamburg: [
    { slug: 'internorga', name: 'INTERNORGA Hamburg' },
    { slug: 'gastro-vision', name: '370GRAD Hamburg' },
  ],
  'nordrhein-westfalen': [{ slug: 'anuga', name: 'Anuga Köln' }],
  nordrhein: [{ slug: 'anuga', name: 'Anuga Köln' }],
  bayern: [{ slug: 'biofach', name: 'BIOFACH Nürnberg' }],
  'baden-wuerttemberg': [
    { slug: 'intergastra', name: 'INTERGASTRA Stuttgart' },
    { slug: 'sueffa', name: 'SÜFFA Stuttgart' },
  ],
};

export function dehogaStatsForSlug(slug: string): DehogaBundeslandData | null {
  const key = slug.replace(/^dehoga-/, '');
  return DEHOGA_STATS[key] ?? null;
}

export function hasDehogaData(d: DehogaBundeslandData | null): boolean {
  if (!d) return false;
  return Boolean(
    d.beschaeftigte || d.betriebe || d.umsatzMrd || d.mitgliedsbetriebe || d.tarif,
  );
}

/** Bundesland-Slug (bundeslaender.ts) → DEHOGA-Artikel-Slug. NRW-Sonderfall (Key 'nrw'). */
export function dehogaSlugForBundesland(bundeslandSlug: string): string {
  return bundeslandSlug === 'nordrhein-westfalen' ? 'dehoga-nrw' : `dehoga-${bundeslandSlug}`;
}

/** DEHOGA-Artikel-Slug → Bundesland-Slug (bundeslaender.ts). Umkehr von dehogaSlugForBundesland.
 *  Für Nicht-Bundesland-Spokes (z.B. dehoga-nordrhein) liefert es einen Nicht-BUNDESLAENDER-Key
 *  → Aufrufer muss gegen BUNDESLAENDER prüfen. */
export function bundeslandSlugForDehoga(articleSlug: string): string {
  const key = articleSlug.replace(/^dehoga-/, '');
  return key === 'nrw' ? 'nordrhein-westfalen' : key;
}
