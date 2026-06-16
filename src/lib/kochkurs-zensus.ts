// Amtliche Zensus-2022-Daten je Kochkurs-Stadt (Stichtag 15.05.2022, Statistisches
// Bundesamt / Statistische Landesämter). Alle 14 sind kreisfreie Städte/Stadtkreise →
// Familienstand auf Stadtebene verfügbar (keine Hochrechnungs-Unschärfe).
//
// WICHTIG (GESETZ): Diese Zahlen sind amtlich/recherchiert und werden NIE von Content-Agents
// gefüllt oder verändert. Fehlt ein Wert, bleibt das Feld null (CityStats blendet es aus) —
// nie schätzen. Stichprobe gegen amtliche Quelle verifiziert (Leipzig exakt:
// 598.899 EW / 312.075 ledig = 52,1 % / Ø 41,8 — Statistisches Landesamt Sachsen).
//
// Felder passen auf RawCityStats (lib/singles-index.ts) + CityStats.

export interface ZensusCity {
  einwohner: string | null;
  ledigeAnzahl: string | null;
  ledigeQuote: string | null;
  maennerQuote: string | null;
  durchschnittsalter: string | null;
  geschlechterquote: string | null; // "MM,M / FF,F" (Männer / Frauen)
}

export const KOCHKURS_ZENSUS: Record<string, ZensusCity> = {
  berlin:      { einwohner: '3.598.006', ledigeAnzahl: '2.032.924', ledigeQuote: '52,8', maennerQuote: '48,9', durchschnittsalter: '42,4', geschlechterquote: '48,9 / 51,1' },
  koeln:       { einwohner: '1.017.355', ledigeAnzahl: null,        ledigeQuote: '49,4', maennerQuote: '48,3', durchschnittsalter: '42,1', geschlechterquote: '48,3 / 51,7' },
  frankfurt:   { einwohner: '743.268',   ledigeAnzahl: '378.808',   ledigeQuote: '51,0', maennerQuote: '49,0', durchschnittsalter: '40,5', geschlechterquote: '49,0 / 51,0' },
  duesseldorf: { einwohner: '611.258',   ledigeAnzahl: '297.959',   ledigeQuote: '48,7', maennerQuote: '48,3', durchschnittsalter: '42,6', geschlechterquote: '48,3 / 51,7' },
  stuttgart:   { einwohner: '610.458',   ledigeAnzahl: '304.764',   ledigeQuote: '49,9', maennerQuote: '49,7', durchschnittsalter: '41,7', geschlechterquote: '49,7 / 50,3' },
  leipzig:     { einwohner: '598.899',   ledigeAnzahl: '312.075',   ledigeQuote: '52,1', maennerQuote: '49,0', durchschnittsalter: '41,8', geschlechterquote: '49,0 / 51,0' },
  dortmund:    { einwohner: '598.246',   ledigeAnzahl: '268.728',   ledigeQuote: '44,9', maennerQuote: '49,3', durchschnittsalter: '42,9', geschlechterquote: '49,3 / 50,7' },
  bremen:      { einwohner: '575.071',   ledigeAnzahl: '277.849',   ledigeQuote: '48,3', maennerQuote: '49,2', durchschnittsalter: '42,8', geschlechterquote: '49,2 / 50,8' },
  dresden:     { einwohner: '557.782',   ledigeAnzahl: '281.112',   ledigeQuote: '50,4', maennerQuote: '49,4', durchschnittsalter: '42,9', geschlechterquote: '49,4 / 50,6' },
  nuernberg:   { einwohner: '522.554',   ledigeAnzahl: '237.703',   ledigeQuote: '45,5', maennerQuote: '48,9', durchschnittsalter: '43,0', geschlechterquote: '48,9 / 51,1' },
  hannover:    { einwohner: '513.291',   ledigeAnzahl: '256.418',   ledigeQuote: '50,0', maennerQuote: '48,8', durchschnittsalter: '42,3', geschlechterquote: '48,8 / 51,2' },
  muenster:    { einwohner: '303.772',   ledigeAnzahl: '161.290',   ledigeQuote: '53,1', maennerQuote: '47,8', durchschnittsalter: '41,2', geschlechterquote: '47,8 / 52,2' },
  // TODO: Hamburg + München — amtliche Ledigen-Quote noch nicht belegt (Zensus-Token tot,
  // Pressemitteilungen ohne Familienstand). Sobald belegt: hier ergänzen. Bis dahin kein
  // Stats-Block auf diesen beiden Spokes (CityStats rendert nur bei vorhandenen Daten).
};

export function zensusFor(slug: string): ZensusCity | undefined {
  return KOCHKURS_ZENSUS[slug];
}
