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
  einstiegStundenlohn?: string; // z.B. "13,32 €"
  laufzeitBis?: string; // z.B. "31.05.2026"
  tarifpartner?: string; // z.B. "DEHOGA NRW / NGG NRW"
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

export const DEHOGA_STATS: Record<string, DehogaBundeslandData> = {
  // --- Pilot: Nordrhein-Westfalen (2026-06-17) ---
  nrw: {
    name: 'Nordrhein-Westfalen',
    kurz: 'NRW',
    offizielleUrl: 'https://www.dehoga-nrw.de',
    sitz: 'Neuss',
    aktualisiert: '2026-06-17',
    beschaeftigte: '312.000',
    umsatzMrd: '21',
    mitgliedsbetriebe: '30.000',
    bezugsjahr: '2023',
    statQuelle: 'IT.NRW (Gastgewerbe NRW, 2023), DEHOGA NRW',
    tarif: {
      einstiegStundenlohn: '13,32 €',
      laufzeitBis: '31.05.2026',
      tarifpartner: 'DEHOGA NRW / NGG NRW',
      quelle: 'tarifregister.nrw.de / DEHOGA NRW',
    },
    // gehalt: bundesweiter Default (Entgeltatlas)
  },
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
