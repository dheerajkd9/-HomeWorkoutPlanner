import { MarketplaceContent } from '../components/MarketplaceContent';

export default async function HomePage({ searchParams }: { searchParams?: { area?: string } }) {
  return <MarketplaceContent categorySlug="chicken" selectedArea={searchParams?.area ?? 'All Hyderabad'} currentPath="/" />;
}
