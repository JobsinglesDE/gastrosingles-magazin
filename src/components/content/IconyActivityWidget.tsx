import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';

/**
 * ICONY Aktivitäts-Widget — zeigt echte aktive Singles aus der jeweiligen Stadt.
 * Stadt-spezifisch via PLZ (z=) → kein City-Mismatch (anders als bei cold News-Traffic;
 * auf Stadt-/Regional-Seiten ist die Stadt bekannt, deshalb hier das Aktivitäts-Widget).
 *
 * Optimiert laut ICONY-Entwicklerleitfaden:
 *  - t=0 (Aktivitäts-Widget mit Bildern), pc=FF7A00 (gastro Brand-Orange)
 *  - z={PLZ} stadt-spezifisch (leer = random DE → bewusst NICHT, wir wollen lokal)
 *  - as/ae = Altersfilter 18–50, loading=lazy, responsive (max-width:100%)
 *
 * Platzierung: oberes Drittel der Stadt-Seite (nach Intro-Hook).
 */
export function IconyActivityWidget({
  plz,
  stadtName,
  platform = 'gastrosingles',
  aid = 'gastrosinglesmagazin',
}: {
  plz?: string;
  stadtName: string;
  platform?: string;
  aid?: string;
}) {
  const params = new URLSearchParams({
    w: '300',
    h: '300',
    t: '0',
    id: platform,
    pc: 'FF7A00',
    aid,
    as: '18',
    ae: '50',
  });
  if (plz) params.set('z', plz);

  return (
    <div className="my-8">
      <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
        <div className="px-6 py-6 text-center">
          <p className="text-sm font-semibold text-foreground/80 mb-4">
            Diese Singles aus {stadtName} sind gerade aktiv
          </p>
          <div className="flex justify-center">
            <iframe
              src={`https://js.icony.com/frame/?${params.toString()}`}
              title={`Aktive Singles aus ${stadtName} bei Gastrosingles`}
              loading="lazy"
              width={300}
              height={300}
              style={{ border: 0, maxWidth: '100%' }}
            />
          </div>
        </div>
      </AnimatedGradientBorder>
    </div>
  );
}
