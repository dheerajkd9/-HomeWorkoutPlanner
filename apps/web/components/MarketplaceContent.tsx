import Link from 'next/link';
import { getCategoryBySlug, getStoresForCategory } from '../lib/data';
import { FiltersSidebar } from './FiltersSidebar';
import { MarketShell } from './MarketShell';
import { MarketplaceTable } from './MarketplaceTable';

export function MarketplaceContent({
  categorySlug,
  selectedArea,
  currentPath,
}: {
  categorySlug: string;
  selectedArea: string;
  currentPath: string;
}) {
  const category = getCategoryBySlug(categorySlug);
  const stores = getStoresForCategory(categorySlug, selectedArea);

  if (!category) {
    return null;
  }

  return (
    <MarketShell activeCategorySlug={categorySlug} currentPath={currentPath} selectedArea={selectedArea}>
      <main className="market-layout market-layout-wide">
        <FiltersSidebar categorySlug={categorySlug} />
        <section className="market-main">
          <div className="market-toolbar">
            <div>
              <p className="result-count">{stores.length} Hyderabad stores listed</p>
              <h1 className="market-title">{category.name} marketplace and ERP network</h1>
              <p className="hero-support">{category.description} Search by Hyderabad area, compare live daily prices, pick a delivery vendor, and jump into customer or store workflows.</p>
            </div>
            <div className="toolbar-stack">
              <div className="toolbar-card">
                <span className="mini-label">Selected area</span>
                <strong>{selectedArea}</strong>
              </div>
              <div className="toolbar-card">
                <span className="mini-label">Store count</span>
                <strong>{stores.length}</strong>
              </div>
              <div className="toolbar-card">
                <span className="mini-label">SaaS workflow</span>
                <strong>Customer, Store, Admin</strong>
              </div>
            </div>
          </div>

          <div className="cta-strip">
            <Link href="/customer" className="primary-link">Customer dashboard</Link>
            <Link href="/owner" className="secondary-link">Store ERP dashboard</Link>
            <Link href="/admin" className="secondary-link">Admin operations</Link>
          </div>

          <MarketplaceTable stores={stores} categorySlug={categorySlug} />
        </section>
      </main>
    </MarketShell>
  );
}
