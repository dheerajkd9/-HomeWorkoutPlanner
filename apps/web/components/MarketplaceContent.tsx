import Link from 'next/link';
import { getCategoryBySlug } from '../lib/data';
import { icons } from '../lib/ui-icons';
import { categoryLabels, normalizeLang, uiCopy } from '../lib/ui-copy';
import { getMarketplaceData } from '../lib/server-data';
import { FiltersSidebar } from './FiltersSidebar';
import { MarketShell } from './MarketShell';
import { MarketplaceTable } from './MarketplaceTable';

export async function MarketplaceContent({
  categorySlug,
  selectedArea,
  currentPath,
  selectedLang,
}: {
  categorySlug: string;
  selectedArea: string;
  currentPath: string;
  selectedLang?: string;
}) {
  const category = getCategoryBySlug(categorySlug);
  const lang = normalizeLang(selectedLang);
  const copy = uiCopy[lang];
  const { stores, liveFeed } = await getMarketplaceData(categorySlug, selectedArea);

  if (!category) {
    return null;
  }

  const featuredDeals = stores.slice(0, 4).map((store) => ({
    name: store.name,
    offer: store.deliveryVendors[0]?.offer ?? 'Store delivery available',
    vendor: store.deliveryVendors[0]?.name ?? 'Store Fleet',
    area: store.area,
  }));

  return (
    <MarketShell activeCategorySlug={categorySlug} currentPath={currentPath} selectedArea={selectedArea} selectedLang={lang}>
      <main className="market-layout market-layout-wide">
        <FiltersSidebar categorySlug={categorySlug} selectedLang={lang} />
        <section className="market-main">
          <div className="market-toolbar">
            <div>
              <p className="result-count">{stores.length} {copy.listedStores}</p>
              <h1 className="market-title">
                <span className="title-icon" aria-hidden="true">{category.icon}</span>
                {selectedArea} {categoryLabels[lang][categorySlug] ?? category.name} {copy.heroTitleSuffix}
              </h1>
              <p className="hero-support">{copy.heroSupport}</p>
            </div>
            <div className="toolbar-stack">
              <div className="toolbar-card">
                <span className="mini-label">{copy.selectedArea}</span>
                <strong>{selectedArea}</strong>
              </div>
              <div className="toolbar-card">
                <span className="mini-label">{copy.storeCount}</span>
                <strong>{stores.length}</strong>
              </div>
              <div className="toolbar-card">
                <span className="mini-label">{copy.liveFeed}</span>
                <strong>{liveFeed?.provider ?? 'public listings + platform seed'}</strong>
              </div>
            </div>
          </div>

          <section className="offers-panel">
            <div className="section-copy">
              <p className="result-count">Deals</p>
              <h2>{copy.offersTitle}</h2>
              <p className="hero-support">{copy.offersSubtitle}</p>
            </div>
            <div className="offers-grid">
              {featuredDeals.map((deal) => (
                <article key={`${deal.name}-${deal.vendor}`} className="offer-card">
                  <span className="offer-badge">{icons.tag} {deal.vendor}</span>
                  <strong>{deal.name}</strong>
                  <p>{deal.offer}</p>
                  <span>{deal.area}</span>
                </article>
              ))}
            </div>
          </section>

          <div className="cta-strip">
            <Link href="/customer" className="primary-link">{copy.customerDashboard}</Link>
            <Link href="/owner" className="secondary-link">{copy.ownerDashboard}</Link>
            <Link href="/admin" className="secondary-link">{copy.adminOperations}</Link>
          </div>

          <MarketplaceTable stores={stores as any} categorySlug={categorySlug} selectedLang={lang} />
        </section>
      </main>
    </MarketShell>
  );
}