import { HubBacklinkCard } from './HubBacklinkCard';
import { getArticleUrl } from '@/lib/routes';
import { dehogaSlugForBundesland } from '@/lib/dehoga-statistiken';

/**
 * Up-Link von einem Regional-Cluster-Spoke (Kochkurs / Kochverein) auf die
 * DEHOGA-{Bundesland}-Sub-Pillar. Stärkt den Hub mit Themen-/Geo-relevantem
 * Unterfutter (GESETZ 14: bidirektional zur DehogaRegionalDownlinks-Gegenseite).
 */
export function DehogaHubUplink({
  bundeslandSlug,
  bundeslandName,
}: {
  bundeslandSlug: string;
  bundeslandName: string;
}) {
  const href = getArticleUrl(dehogaSlugForBundesland(bundeslandSlug), 'berufsbilder');
  return (
    <HubBacklinkCard
      heading={`DEHOGA ${bundeslandName}: Tarif, Gehalt & Branchenverband`}
      text={`Du arbeitest im Gastgewerbe in ${bundeslandName}? Der DEHOGA-Landesverband ${bundeslandName} im Überblick — Tarif-Eckdaten, Median-Gehälter nach Beruf, Betriebszahlen und wer die Branche vor Ort vertritt.`}
      href={href}
      cta={`DEHOGA ${bundeslandName} ansehen →`}
    />
  );
}
