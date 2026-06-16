import { reader } from '@/lib/keystatic';
import { PersonHubPage } from '@/components/content/PersonHubPage';
import { getPersonHubUrl } from '@/lib/routes';

const BASE = 'https://gastrosingles.de/magazin';

export const dynamicParams = false;

export async function generateStaticParams() {
  const persons = await reader.collections.persons.all();
  return persons
    .filter((p) => p.entry.status !== 'draft')
    .map((p) => ({ koch: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ koch: string }> }) {
  const { koch } = await params;
  const person = await reader.collections.persons.read(koch);
  if (!person) return {};
  const url = `${BASE}${getPersonHubUrl(koch)}`;
  const title = person.seoTitle || `${person.name} — Steckbrief, Karriere & alle Artikel`;
  const description = person.seoDescription || person.intro || undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'profile',
      siteName: 'Gastrosingles Magazin',
      locale: 'de_DE',
      images: person.featuredImage ? [person.featuredImage] : [],
    },
  };
}

export default async function KochHub({ params }: { params: Promise<{ koch: string }> }) {
  const { koch } = await params;
  return <PersonHubPage slug={koch} />;
}
