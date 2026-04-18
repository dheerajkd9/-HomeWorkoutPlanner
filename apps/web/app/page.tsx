import Link from 'next/link';
import { categories, stores } from '../lib/data';
import { FiltersSidebar } from '../components/FiltersSidebar';
import { MarketShell } from '../components/MarketShell';
import { StoreRow } from '../components/StoreRow';

export default function HomePage() {
  return (
    <MarketShell>
      <main className="market-layout">
        <FiltersSidebar />
        <section className="market-main">
          <div className="market-toolbar">
            <div>
              <p className="result-count">{stores.length} shops found</p>
              <h1 className="market-title">Live daily meat prices across Hyderabad</h1>
            </div>
            <div className="toolbar-tags">
              <span>6 am to 12 pm</span>
              <span>Country chicken</span>
              <span>Poultry chicken</span>
              <span>Rating = 4</span>
            </div>
          </div>

          <div className="list-headline">
            <div>Store</div>
            <div>Live stats</div>
            <div>Maps</div>
          </div>

          <div className="store-list">
            {stores.map((store) => (
              <StoreRow key={store.id} store={store} />
            ))}
          </div>

          <section className="split-section">
            <div>
              <p className="eyebrow">Bulk events</p>
              <h2>Book biryani, wedding, and festival quantities with prep notes built in.</h2>
              <p>Stores can publish bulk-friendly pricing, schedule pickup or delivery slots, and expose precise cutting specifications before the order is accepted.</p>
              <div className="cta-row">
                <Link href="/owner" className="primary-link">View store dashboard</Link>
                <Link href="/admin" className="secondary-link">Open admin console</Link>
              </div>
            </div>
            <div className="bulk-panel">
              <div><span className="mini-label">Event order</span><strong>120 guests</strong></div>
              <div><span className="mini-label">Cut preference</span><strong>Biryani cut with marrow bones separate</strong></div>
              <div><span className="mini-label">Scheduling</span><strong>Tomorrow, 5:30 am pickup</strong></div>
            </div>
          </section>

          <section className="catalog-section">
            <div>
              <p className="eyebrow">Catalog</p>
              <h2>Chicken, fish, goat, eggs, and pickles in one shared customer flow.</h2>
            </div>
            <div className="catalog-grid">
              {categories.map((category) => (
                <div key={category.id} className="catalog-item">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </MarketShell>
  );
}
