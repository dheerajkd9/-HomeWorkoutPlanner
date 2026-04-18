import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MarketShell } from '../../../components/MarketShell';
import { getStorePageData } from '../../../lib/server-data';

export default async function StorePage({ params }: { params: { slug: string } }) {
  const store = await getStorePageData(params.slug);

  if (!store) {
    notFound();
  }

  return (
    <MarketShell activeCategorySlug="chicken" currentPath={`/store/${store.slug}`} selectedArea={store.area}>
      <main className="detail-page">
        <section className="detail-hero">
          <div>
            <p className="eyebrow">{store.area} | {store.zone ?? 'Hyderabad'}</p>
            <h1>{store.name}</h1>
            <p className="detail-copy">{store.description ?? 'DB-backed store detail page with pricing, cuts, and delivery modes.'}</p>
            <div className="hero-facts">
              <span>Rating {Number(store.rating ?? store.avg_rating ?? 4.5).toFixed(1)}</span>
              <span>{store.hours ?? 'Open today'}</span>
              <span>{Array.isArray(store.orderModes) ? store.orderModes.join(' | ') : 'Delivery | Pickup | Scheduled order'}</span>
            </div>
          </div>
          <div className="hero-sidecard">
            <p className="mini-label">Delivery vendors</p>
            {(store.deliveryVendors ?? []).map((vendor: any) => (
              <strong key={vendor.name}>{vendor.name} - {vendor.eta}</strong>
            ))}
          </div>
        </section>

        <section className="detail-grid">
          <div>
            <div className="section-header">
              <div>
                <p className="eyebrow">Products and cuts</p>
                <h2>Browse every category, cutting note, and daily price</h2>
              </div>
              <Link href="/login/customer" className="primary-link">Customer login</Link>
            </div>
            <div className="product-list">
              {(store.products ?? []).map((product: any) => (
                <article key={product.id} className="product-row">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.notes || 'Store can accept custom prep instructions.'}</p>
                    <div className="cut-list">
                      {(product.cuts ?? []).map((cut: string) => (
                        <span key={cut}>{cut}</span>
                      ))}
                    </div>
                  </div>
                  <div className="product-price">
                    <strong>INR {product.price ?? product.price_per_unit}</strong>
                    <span>per {product.unit}</span>
                    <em>{product.availability ?? 'in-stock'}</em>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="detail-sidebar">
            <section>
              <p className="eyebrow">Coverage</p>
              <h3>Service area</h3>
              <ul>
                {(store.serviceArea ?? [store.area]).map((area: string) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </section>
          </aside>
        </section>
      </main>
    </MarketShell>
  );
}
