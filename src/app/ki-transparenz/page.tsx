import Link from 'next/link';
import { JsonLd, faqJsonLd } from '@/components/seo/JsonLd';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata = {
  alternates: { canonical: '/ki-transparenz' },
  title: 'KI-Transparenz — Gastrosingles Magazin',
  description:
    'Wie das Gastrosingles Magazin künstliche Intelligenz einsetzt: welche Bilder KI-generiert sind, wie sie gekennzeichnet werden und wer redaktionell verantwortet. Offenlegung nach Art. 50 KI-VO.',
  openGraph: {
    title: 'KI-Transparenz — Gastrosingles Magazin',
    description:
      'Offenlegung nach Art. 50 KI-VO: KI-generierte Bilder, Kennzeichnung und redaktionelle Verantwortung im Gastrosingles Magazin.',
    url: 'https://gastrosingles.de/magazin/ki-transparenz',
    type: 'website' as const,
    siteName: 'Gastrosingles Magazin',
    locale: 'de_DE',
  },
};

const faqItems = [
  {
    question: 'Welche Bilder im Gastrosingles Magazin sind KI-generiert?',
    answer:
      'Alle KI-generierten Bilder tragen direkt am Bild den sichtbaren Hinweis „Bild: KI-generiert" sowie den Credit „Symbolbild · Gastrosingles". Fehlt dieser Hinweis, handelt es sich um ein echtes Foto mit Quellenangabe — etwa von Wikimedia Commons, aus einem Pressekit oder von einem Sender wie ZDF, RTL oder SAT.1.',
  },
  {
    question: 'Zeigen KI-Bilder echte Personen?',
    answer:
      'Nein. Ein KI-Symbolbild zeigt nie eine reale Person, auch wenn der Artikel von einer namentlich genannten Köchin oder einem Koch handelt. Wo ein echtes, lizenziertes Foto der Person verfügbar ist, verwenden wir dieses — erkennbar am Credit mit Fotograf und Lizenz.',
  },
  {
    question: 'Sind die Texte KI-geschrieben?',
    answer:
      'Recherche und Entwurf sind KI-gestützt. Vor der Veröffentlichung prüft Thomas Honold jeden Beitrag redaktionell — Kernfakten werden gegen die Primärquelle gegengeprüft. Sollte ein Format jemals ohne diese Prüfung automatisch veröffentlicht werden, trägt der betreffende Beitrag einen eigenen Hinweis am Textanfang.',
  },
  {
    question: 'Woran erkennt eine Maschine ein KI-Bild von Gastrosingles?',
    answer:
      'Jedes KI-generierte Bild trägt im XMP-Metadatensatz das IPTC-Feld DigitalSourceType mit dem Wert „trainedAlgorithmicMedia". Soziale Netzwerke und Suchmaschinen lesen dieses Feld aus und können den Inhalt eigenständig als KI-generiert ausweisen.',
  },
];

function Abschnitt({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">{titel}</h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-foreground/75">{children}</div>
    </section>
  );
}

export default function KiTransparenz() {
  return (
    <div data-theme="dark" className="min-h-screen" style={{ background: '#0F1318', color: '#E8E8E8' }}>
      <JsonLd data={faqJsonLd(faqItems)} />

      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 particle-overlay opacity-50" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 particle-text">KI-Transparenz</h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Wo im Gastrosingles Magazin künstliche Intelligenz mitarbeitet — und woran du es erkennst.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-24">
        <ScrollReveal>
          <p className="text-base leading-relaxed text-foreground/80 mb-12 border-l-2 border-brand-orange pl-5">
            Wir setzen KI dort ein, wo sie uns schneller macht — bei der Recherche und bei
            Symbolbildern. Wir setzen sie nicht ein, um dir vorzuspielen, ein Foto sei echt.
            Diese Seite legt offen, was womit erstellt wurde. Sie erfüllt die
            Transparenzpflicht aus Artikel&nbsp;50 der EU-Verordnung über künstliche
            Intelligenz (KI-VO), die seit dem 2.&nbsp;August&nbsp;2026 gilt.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <Abschnitt titel="Bilder">
            <p>
              Ein Teil unserer Artikelbilder ist KI-generiert. Diese Bilder sind{' '}
              <strong className="text-white">doppelt gekennzeichnet</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                sichtbar am Bild mit dem Hinweis <em className="text-white/90">„Bild: KI-generiert"</em>{' '}
                und dem Credit <em className="text-white/90">„Symbolbild · Gastrosingles"</em> — lesbar
                auch für Screenreader, weil der Hinweis im Seitentext steht und nicht nur ins Bild
                gebrannt ist;
              </li>
              <li>
                maschinenlesbar in den Bild-Metadaten über das IPTC-Feld{' '}
                <code className="text-[13px] text-brand-orange">DigitalSourceType</code> mit dem Wert{' '}
                <code className="text-[13px] text-brand-orange">trainedAlgorithmicMedia</code>.
              </li>
            </ul>
            <p>
              <strong className="text-white">Ein KI-Bild zeigt nie eine reale Person.</strong> Wenn ein
              Artikel von einer namentlich genannten Person handelt und ein echtes, lizenziertes Foto
              verfügbar ist, verwenden wir dieses — mit Fotograf und Lizenz im Credit, etwa von
              Wikimedia Commons, aus einem Pressekit oder von einem Sender. Trägt ein Bild keinen
              KI-Hinweis, ist es ein echtes Foto.
            </p>
          </Abschnitt>
        </ScrollReveal>

        <ScrollReveal>
          <Abschnitt titel="Texte">
            <p>
              Recherche und Entwurf unserer Beiträge sind KI-gestützt. Vor der Veröffentlichung wird
              jeder Beitrag redaktionell geprüft: Kernfakten gehen gegen die Primärquelle, Zitate
              werden am Original abgeglichen. Verantwortlich dafür ist{' '}
              <Link href="/ueber-uns" className="text-brand-orange hover:underline">
                Thomas Honold
              </Link>
              , Küchenmeister und Gründer von Gastrosingles.de.
            </p>
            <p>
              Damit greift die redaktionelle Ausnahme des Art.&nbsp;50 Abs.&nbsp;4 UAbs.&nbsp;2 KI-VO.
              Sollte ein Format jemals ohne diese menschliche Prüfung automatisch veröffentlicht
              werden, trägt der betreffende Beitrag einen eigenen Hinweis am Textanfang.
            </p>
          </Abschnitt>
        </ScrollReveal>

        <ScrollReveal>
          <Abschnitt titel="Videos">
            <p>
              Videos auf unserem YouTube-Kanal, die KI-generiertes Bildmaterial enthalten, sind in der
              Videobeschreibung als solche ausgewiesen und zusätzlich über die YouTube-Kennzeichnung
              „veränderte oder synthetische Inhalte" markiert.
            </p>
          </Abschnitt>
        </ScrollReveal>

        <ScrollReveal>
          <Abschnitt titel="Was wir nicht tun">
            <ul className="list-disc pl-5 space-y-2">
              <li>Wir geben KI-Bilder nie als echte Aufnahmen einer realen Person aus.</li>
              <li>Wir kennzeichnen echte Pressefotos nie fälschlich als KI — das würde die Lizenzangabe des Rechteinhabers entwerten.</li>
              <li>Wir erfinden keine Zitate und keine Bildquellen.</li>
            </ul>
          </Abschnitt>
        </ScrollReveal>

        <ScrollReveal>
          <Abschnitt titel="Fragen dazu?">
            <p>
              Wenn dir eine Kennzeichnung fehlt oder falsch erscheint, sag uns Bescheid — wir
              korrigieren das. Am schnellsten geht das über unser{' '}
              <Link href="/kontakt" className="text-brand-orange hover:underline">
                Kontaktformular
              </Link>
              .
            </p>
            <p className="text-sm text-foreground/50">
              Rechtsgrundlage: Verordnung (EU) 2024/1689 (KI-VO), Art. 50 Abs. 4 und 5 —
              anwendbar ab 2. August 2026. Stand dieser Seite: 1. August 2026.
            </p>
          </Abschnitt>
        </ScrollReveal>
      </div>
    </div>
  );
}
