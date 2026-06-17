// Amtliche Zensus-2022-Daten je Kochkurs-Stadt (Stichtag 15.05.2022, Statistisches
// Bundesamt). Werte via zensus-puller.py auf KREIS-Ebene (GEOLK4); kreisfreie Stadt = Kreis
// -> stadtgenau. Kreisangehörige Städte stehen ohne Stats (siehe Liste am Ende).
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
  hamburg:     { einwohner: '1.808.846', ledigeAnzahl: '927.708', ledigeQuote: '51,3', maennerQuote: '48,7', durchschnittsalter: '41,8', geschlechterquote: '48,7 / 51,3' },
  muenchen:    { einwohner: '1.478.638', ledigeAnzahl: '769.530', ledigeQuote: '52,0', maennerQuote: '48,9', durchschnittsalter: '41,3', geschlechterquote: '48,9 / 51,1' },
  // --- Phase 2: 35 kreisfreie Kochkurs-Städte (Zensus-Puller, Kreis=Stadt, 2026-06-17) ---
  mainz: { einwohner: '220.386', ledigeAnzahl: '111.978', ledigeQuote: '50,8', maennerQuote: '48,5', durchschnittsalter: '41,1', geschlechterquote: '48,5 / 51,5' },
  karlsruhe: { einwohner: '305.408', ledigeAnzahl: '150.604', ledigeQuote: '49,3', maennerQuote: '50,6', durchschnittsalter: '42,3', geschlechterquote: '50,6 / 49,4' },
  bonn: { einwohner: '321.544', ledigeAnzahl: '159.894', ledigeQuote: '49,7', maennerQuote: '48,1', durchschnittsalter: '41,7', geschlechterquote: '48,1 / 51,9' },
  bielefeld: { einwohner: '330.072', ledigeAnzahl: '154.065', ledigeQuote: '46,7', maennerQuote: '48,5', durchschnittsalter: '42,5', geschlechterquote: '48,5 / 51,5' },
  augsburg: { einwohner: '294.647', ledigeAnzahl: '136.850', ledigeQuote: '46,4', maennerQuote: '49,2', durchschnittsalter: '42,3', geschlechterquote: '49,2 / 50,8' },
  ulm: { einwohner: '127.116', ledigeAnzahl: '60.582', ledigeQuote: '47,7', maennerQuote: '49,2', durchschnittsalter: '41,7', geschlechterquote: '49,2 / 50,8' },
  regensburg: { einwohner: '145.901', ledigeAnzahl: '74.742', ledigeQuote: '51,2', maennerQuote: '48,7', durchschnittsalter: '41,3', geschlechterquote: '48,7 / 51,3' },
  mannheim: { einwohner: '313.693', ledigeAnzahl: '150.785', ledigeQuote: '48,1', maennerQuote: '49,8', durchschnittsalter: '42,0', geschlechterquote: '49,8 / 50,2' },
  freiburg: { einwohner: '233.040', ledigeAnzahl: '128.276', ledigeQuote: '55,0', maennerQuote: '47,7', durchschnittsalter: '40,3', geschlechterquote: '47,7 / 52,3' },
  braunschweig: { einwohner: '252.816', ledigeAnzahl: '118.549', ledigeQuote: '46,9', maennerQuote: '49,5', durchschnittsalter: '43,5', geschlechterquote: '49,5 / 50,5' },
  wuerzburg: { einwohner: '131.316', ledigeAnzahl: '68.701', ledigeQuote: '52,3', maennerQuote: '47,5', durchschnittsalter: '42,4', geschlechterquote: '47,5 / 52,5' },
  osnabrueck: { einwohner: '164.898', ledigeAnzahl: '82.977', ledigeQuote: '50,3', maennerQuote: '48,5', durchschnittsalter: '41,9', geschlechterquote: '48,5 / 51,5' },
  wiesbaden: { einwohner: '284.260', ledigeAnzahl: '130.383', ledigeQuote: '45,9', maennerQuote: '48,3', durchschnittsalter: '42,6', geschlechterquote: '48,3 / 51,7' },
  kassel: { einwohner: '195.012', ledigeAnzahl: '92.593', ledigeQuote: '47,5', maennerQuote: '48,6', durchschnittsalter: '42,4', geschlechterquote: '48,6 / 51,4' },
  darmstadt: { einwohner: '161.767', ledigeAnzahl: '82.666', ledigeQuote: '51,1', maennerQuote: '50,7', durchschnittsalter: '40,5', geschlechterquote: '50,7 / 49,3' },
  bochum: { einwohner: '354.288', ledigeAnzahl: '155.038', ledigeQuote: '43,8', maennerQuote: '49,1', durchschnittsalter: '44,2', geschlechterquote: '49,1 / 50,9' },
  oldenburg: { einwohner: '172.759', ledigeAnzahl: '81.839', ledigeQuote: '47,4', maennerQuote: '48,3', durchschnittsalter: '42,7', geschlechterquote: '48,3 / 51,7' },
  koblenz: { einwohner: '112.963', ledigeAnzahl: '49.850', ledigeQuote: '44,1', maennerQuote: '49,0', durchschnittsalter: '43,4', geschlechterquote: '49,0 / 51,0' },
  magdeburg: { einwohner: '241.517', ledigeAnzahl: '113.922', ledigeQuote: '47,2', maennerQuote: '49,1', durchschnittsalter: '44,7', geschlechterquote: '49,1 / 50,9' },
  luebeck: { einwohner: '215.958', ledigeAnzahl: '97.929', ledigeQuote: '45,3', maennerQuote: '48,0', durchschnittsalter: '44,9', geschlechterquote: '48,0 / 52,0' },
  kiel: { einwohner: '249.132', ledigeAnzahl: '130.983', ledigeQuote: '52,6', maennerQuote: '48,9', durchschnittsalter: '42,0', geschlechterquote: '48,9 / 51,1' },
  heidelberg: { einwohner: '153.809', ledigeAnzahl: '86.687', ledigeQuote: '56,4', maennerQuote: '47,8', durchschnittsalter: '39,3', geschlechterquote: '47,8 / 52,2' },
  essen: { einwohner: '571.039', ledigeAnzahl: '254.627', ledigeQuote: '44,6', maennerQuote: '48,5', durchschnittsalter: '43,7', geschlechterquote: '48,5 / 51,5' },
  erfurt: { einwohner: '218.200', ledigeAnzahl: '102.691', ledigeQuote: '47,1', maennerQuote: '48,6', durchschnittsalter: '44,1', geschlechterquote: '48,6 / 51,4' },
  rostock: { einwohner: '203.470', ledigeAnzahl: '98.123', ledigeQuote: '48,2', maennerQuote: '48,7', durchschnittsalter: '45,4', geschlechterquote: '48,7 / 51,3' },
  chemnitz: { einwohner: '240.078', ledigeAnzahl: '104.676', ledigeQuote: '43,6', maennerQuote: '48,8', durchschnittsalter: '46,6', geschlechterquote: '48,8 / 51,2' },
  wuppertal: { einwohner: '356.768', ledigeAnzahl: '153.137', ledigeQuote: '42,9', maennerQuote: '49,2', durchschnittsalter: '43,1', geschlechterquote: '49,2 / 50,8' },
  potsdam: { einwohner: '182.806', ledigeAnzahl: '90.286', ledigeQuote: '49,4', maennerQuote: '48,2', durchschnittsalter: '42,6', geschlechterquote: '48,2 / 51,8' },
  moenchengladbach: { einwohner: '264.089', ledigeAnzahl: '112.286', ledigeQuote: '42,5', maennerQuote: '49,3', durchschnittsalter: '43,7', geschlechterquote: '49,3 / 50,7' },
  ingolstadt: { einwohner: '136.468', ledigeAnzahl: '59.546', ledigeQuote: '43,6', maennerQuote: '50,6', durchschnittsalter: '41,7', geschlechterquote: '50,6 / 49,4' },
  heilbronn: { einwohner: '128.303', ledigeAnzahl: '56.529', ledigeQuote: '44,1', maennerQuote: '50,2', durchschnittsalter: '41,8', geschlechterquote: '50,2 / 49,8' },
  bamberg: { einwohner: '72.764', ledigeAnzahl: '34.898', ledigeQuote: '48,0', maennerQuote: '48,2', durchschnittsalter: '42,9', geschlechterquote: '48,2 / 51,8' },
  krefeld: { einwohner: '230.666', ledigeAnzahl: '93.936', ledigeQuote: '40,7', maennerQuote: '48,9', durchschnittsalter: '44,2', geschlechterquote: '48,9 / 51,1' },
  duisburg: { einwohner: '501.415', ledigeAnzahl: '208.972', ledigeQuote: '41,7', maennerQuote: '49,5', durchschnittsalter: '42,8', geschlechterquote: '49,5 / 50,5' },
  trier: { einwohner: '102.727', ledigeAnzahl: '49.683', ledigeQuote: '48,4', maennerQuote: '48,7', durchschnittsalter: '42,0', geschlechterquote: '48,7 / 51,3' },
  // --- Welle 5: 5 kreisfreie (Zensus-Puller 2026-06-17) ---
  rosenheim:   { einwohner: '63.284', ledigeAnzahl: '28.224', ledigeQuote: '44,6', maennerQuote: '49,0', durchschnittsalter: '42,8', geschlechterquote: '49,0 / 51,0' },
  landshut:    { einwohner: '67.880', ledigeAnzahl: '29.916', ledigeQuote: '44,1', maennerQuote: '48,7', durchschnittsalter: '43,3', geschlechterquote: '48,7 / 51,3' },
  kempten:     { einwohner: '65.050', ledigeAnzahl: '28.537', ledigeQuote: '43,9', maennerQuote: '48,8', durchschnittsalter: '43,8', geschlechterquote: '48,8 / 51,2' },
  erlangen:    { einwohner: '112.220', ledigeAnzahl: '55.001', ledigeQuote: '49,0', maennerQuote: '49,4', durchschnittsalter: '41,6', geschlechterquote: '49,4 / 50,6' },
  aschaffenburg: { einwohner: '71.692', ledigeAnzahl: '30.587', ledigeQuote: '42,7', maennerQuote: '48,8', durchschnittsalter: '43,9', geschlechterquote: '48,8 / 51,2' },
  // --- Welle 6: 3 kreisfreie (Zensus-Puller 2026-06-17) ---
  halle:       { einwohner: '226.586', ledigeAnzahl: '111.153', ledigeQuote: '49,1', maennerQuote: '48,1', durchschnittsalter: '44,3', geschlechterquote: '48,1 / 51,9' },
  flensburg:   { einwohner: '95.015', ledigeAnzahl: '47.754', ledigeQuote: '50,3', maennerQuote: '49,3', durchschnittsalter: '42,2', geschlechterquote: '49,3 / 50,7' },
  bayreuth:    { einwohner: '72.289', ledigeAnzahl: '34.036', ledigeQuote: '47,1', maennerQuote: '49,0', durchschnittsalter: '43,5', geschlechterquote: '49,0 / 51,0' },
  // Ohne Zensus-Stats (kreisangehörig/Verbund -> nicht stadt-isolierbar; Familienstand nur bis Kreis):
  // aachen (Staedteregion 05334), goettingen (LK 03159), saarbruecken (RV 10041),
  // tuebingen (LK 08416), marburg (LK 06534), paderborn (LK 05774), ludwigsburg (LK 08118),
  // fulda (LK 06631), reutlingen (LK 08415), ravensburg (LK 08436), konstanz (LK 08335),
  // aalen (Ostalbkreis 08136). CityStats blendet aus, nie schaetzen (GESETZ).
};

export function zensusFor(slug: string): ZensusCity | undefined {
  return KOCHKURS_ZENSUS[slug];
}
