import { notFound } from 'next/navigation';
import { MarketplaceContent } from '../../../components/MarketplaceContent';
import { getCategoryBySlug } from '../../../lib/data';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { area?: string; lang?: string };
}) {
  if (!getCategoryBySlug(params.slug)) {
    notFound();
  }

  return (
    <MarketplaceContent
      categorySlug={params.slug}
      selectedArea={searchParams?.area ?? 'Kompally'}
      selectedLang={searchParams?.lang ?? 'en'}
      currentPath={`/category/${params.slug}`}
    />
  );
}