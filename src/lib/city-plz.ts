/**
 * Zentrale PLZ pro Stadt-Slug (Stadtzentrum) — für das ICONY-Aktivitäts-Widget (z=).
 * Slug = ASCII (gleiche Slugs wie kochkurse/kochvereine/regional/dehoga), shared.
 * Quelle: Innenstadt-/Hauptpost-PLZ der jeweiligen Stadt.
 */
export const CITY_PLZ: Record<string, string> = {
  berlin: '10115', hamburg: '20095', muenchen: '80331', koeln: '50667',
  stuttgart: '70173', frankfurt: '60311', duesseldorf: '40213', hannover: '30159',
  muenster: '48143', nuernberg: '90402', leipzig: '04109', dresden: '01067',
  dortmund: '44135', bremen: '28195', mainz: '55116', karlsruhe: '76133',
  bonn: '53111', bielefeld: '33602', augsburg: '86150', ulm: '89073',
  regensburg: '93047', mannheim: '68159', freiburg: '79098', braunschweig: '38100',
  wuerzburg: '97070', osnabrueck: '49074', wiesbaden: '65183', kassel: '34117',
  darmstadt: '64283', bochum: '44787', aachen: '52062', oldenburg: '26122',
  koblenz: '56068', magdeburg: '39104', luebeck: '23552', kiel: '24103',
  heidelberg: '69117', essen: '45127', erfurt: '99084', goettingen: '37073',
  rostock: '18055', chemnitz: '09111', wuppertal: '42103', potsdam: '14467',
  moenchengladbach: '41061', ingolstadt: '85049', heilbronn: '74072', bamberg: '96047',
  saarbruecken: '66111', krefeld: '47798', duisburg: '47051', tuebingen: '72070',
  trier: '54290', marburg: '35037', paderborn: '33098', ludwigsburg: '71634',
  fulda: '36037', rosenheim: '83022', landshut: '84028', kempten: '87435',
  erlangen: '91052', aschaffenburg: '63739', halle: '06108', flensburg: '24937',
  reutlingen: '72764', ravensburg: '88212', konstanz: '78462', bayreuth: '95444',
  aalen: '73430',
};

/** PLZ für einen Stadt-Slug (undefined → Widget zeigt random DE statt lokal). */
export function plzForCity(slug: string): string | undefined {
  return CITY_PLZ[slug];
}
