import Link from 'next/link';

type Tab = { label: string; href: string; active: boolean };

// Geschlechts-Varianten teilen sich EINE Ausbildung-Seite (Kannibalisierung vermeiden)
const INTENT_ALIAS: Record<string, string> = {
  'hotelfachmann-ausbildung': 'hotelfachfrau-ausbildung',
  'restaurantfachmann-ausbildung': 'restaurantfachfrau-ausbildung',
};

/**
 * Intent-Leiste auf Berufsbild-Seiten: Übersicht · Ausbildung · Gehalt.
 * Jeder Tab ist eine eigene URL (Spoke), keine Anker — rankt eigenständig.
 * Gehalt-geflippte Rollen (kellner, koch …) SIND die Gehalt-Seite → kein eigener Gehalt-Tab.
 */
export function BerufIntentNav({
  beruf,
  activeSlug,
  availableSlugs,
}: {
  beruf: string;
  activeSlug: string;
  availableSlugs: string[];
}) {
  const resolve = (slug: string) => INTENT_ALIAS[slug] ?? slug;
  const candidates = [
    { label: 'Übersicht', slug: beruf },
    { label: 'Ausbildung', slug: resolve(`${beruf}-ausbildung`) },
    { label: 'Gehalt', slug: resolve(`${beruf}-gehalt`) },
  ];
  const tabs: Tab[] = candidates
    .filter((c) => availableSlugs.includes(c.slug))
    .map((c) => ({
      label: c.label,
      href: `/berufsbilder/${c.slug}`,
      active: c.slug === activeSlug,
    }));

  if (tabs.length < 2) return null;

  return (
    <nav aria-label="Berufsbild-Themen" className="my-6">
      <ul className="flex flex-wrap gap-2 list-none pl-0">
        {tabs.map((t) => (
          <li key={t.href}>
            {t.active ? (
              <span
                aria-current="page"
                className="inline-block px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold"
              >
                {t.label}
              </span>
            ) : (
              <Link
                href={t.href}
                className="inline-block px-4 py-2 rounded-full bg-surface border border-foreground/15 text-sm font-semibold text-foreground/80 hover:border-primary/60 hover:text-primary transition-colors"
              >
                {t.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
