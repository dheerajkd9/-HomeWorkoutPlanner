import { MarketplaceContent } from '../components/MarketplaceContent';

export default async function HomePage({ searchParams }: { searchParams?: { area?: string; lang?: string } }) {
  return <MarketplaceContent categorySlug="chicken" selectedArea={searchParams?.area ?? 'Kompally'} selectedLang={searchParams?.lang ?? 'en'} currentPath="/" />;
}